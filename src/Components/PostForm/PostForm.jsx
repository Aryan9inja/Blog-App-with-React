import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Select, Input, RTE } from "../index";
import appwriteService from "../../Appwrite/config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../store/LoadingSlice";

export default function PostForm({ post }) {
  const dispatch = useDispatch();

  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const submit = async (data) => {
    dispatch(showLoading());
  
    try {
      if (post) {
        console.log("Updating post:", post.$id); 
        const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
  
        if (file) {
          console.log("Deleting old featured image:", post.featuredImage);
          await appwriteService.deleteFile(post.featuredImage);
        }
  
        console.log("Form data for update:", {
          ...data,
          featuredImage: file ? String(file.$id) : undefined,
        });
  
        const db_post = await appwriteService.updatePost(String(post.$id), {
          ...data,
          featuredImage: file ? String(file.$id) : undefined,
        });
        console.log("Updated post response:", db_post);
        
        if (db_post) {
          navigate(`/post/${String(db_post.$id)}`);
        }
      } else {
        const file = await appwriteService.uploadFile(data.image[0]);
        if (file) {
          const fileID = String(file.$id);
          data.featuredImage = fileID;
          const db_post = await appwriteService.createPost({
            ...data,
            userId: String(userData.$id),
          });
          if (db_post) {
            navigate(`/post/${db_post.$id}`);
          }
        }
      }
    } catch (error) {
      console.error("Error while submitting post:", error);
    } finally {
      dispatch(hideLoading());
    }
  };
  

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase() // convert to lowercase
        .replace(/\s+/g, "-") // replace spaces with dashes
        .replace(/[^a-z0-9\-]/g, ""); // remove invalid characters (non-alphanumeric and non-dash)
    }

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col sm:flex-row">
      <div className="w-full sm:w-2/3 px-2 mb-4">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4 w-full"
          {...register("title", { required: true })}
        />
        <Input
          disabled
          label="Slug :"
          placeholder="Slug"
          className="mb-4 w-full"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-full sm:w-1/3 px-2 mb-4">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4 w-full"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg w-full"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4 w-full"
          {...register("status", { required: true })}
        />
        <div className="w-full px-2 mb-4">
          <Button
            style={
              post
                ? { backgroundColor: "#22c55e", color: "white" }
                : { backgroundColor: "#3b82f6", color: "white" }
            }
            type="submit"
            className="w-full rounded-lg px-4 py-2"
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
}

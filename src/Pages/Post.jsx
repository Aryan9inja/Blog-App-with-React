import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../Appwrite/config";
import { Button, Container } from "../Components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);

    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container
        children={
          <>
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-xl"
              />

              {isAuthor && (
                <div className="absolute right-6 top-6 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button
                      className="mr-3 bg-green-500 py-2 px-4 rounded-lg"
                      children={"Edit"}
                    />
                  </Link>
                  <Button
                    bgColor="bg-red-500"
                    onClick={deletePost}
                    children={"Delete"}
                  />
                </div>
              )}
            </div>
            <div className="w-full mb-6">
              <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            <div className="browser-css">{parse(post.content)}</div>
          </>
        }
      />
    </div>
  ) : null;
}

import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../Components";
import appwriteService from "../Appwrite/config";
import { useParams } from "react-router-dom";
import { redirect } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      redirect("/");
    }
  }, [slug, redirect]);

  return post ? (
    <div className="py-8">
      <Container children={<PostForm post={post} />} />
    </div>
  ) : null;
}

export default EditPost;

import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../Components";
import appwriteService from "../Appwrite/config";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container children={<PostForm post={post} />} />
    </div>
  ) : null;
}

export default EditPost;

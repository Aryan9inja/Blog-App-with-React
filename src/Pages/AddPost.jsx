import React from "react";
import { Container, PostForm } from "../Components";

function AddPost() {
  return (
    <div className="py-8">
      <Container children={<PostForm />} />
    </div>
  );
}

export default AddPost;

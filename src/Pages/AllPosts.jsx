import React, { useEffect, useState } from "react";
import { PostCard, Container } from "../Components";
import appwriteService from "../Appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {}, []);
  appwriteService.getPosts([]).then((posts) => {
    if (posts) setPosts(posts.documents);
  });
  return (
    <div className="w-full py-8">
      <Container
        children={
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        }
      />
    </div>
  );
}

export default AllPosts;

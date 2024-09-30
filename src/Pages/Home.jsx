import React, { useEffect, useState } from "react";
import appwriteService from "../Appwrite/config";
import { Container, PostCard } from "../Components";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container
          children={
            <div className="flex flex-wrap">
              <div className="p-2 w-full">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                  Login To Read Posts
                </h1>
              </div>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container
        children={
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div
                className="p-2 w-full sm:w-1/2 md:w-1/4" // Responsive widths for different screen sizes
                key={post.$id}
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        }
      />
    </div>
  );
}

export default Home;

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase.config";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../../components/ui/button";

const SinglePostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPost({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.error("No such post!");
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="min-h-[80vh] mx-auto flex-col pt-16 justify-center">
        <Link href="/blog" className="ml-6">
          <Button>
            <ArrowLeft />
            Back to posts
          </Button>
        </Link>
        <div className="w-2/3 mx-auto max-md:w-full px-6 pt-4">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-700 mb-6">{post.postText}</p>

          <div className="text-[18px] text-gray-500 flex justify-between">
            <span>By: {post.author?.name || "Anonymous"}</span>
            {post.createdAt && (
              <span>
                {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* Optional: display comments here */}
          <div className="flex py-4 gap-4 text-sm text-gray-500">
            {/* Author Info */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <span className="font-medium">
                {post.author?.name || "Anonymous"}
              </span>
            </div>
            {/* Date */}
            {post.createdAt && (
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {/* <span>
                  {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}
                </span> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;

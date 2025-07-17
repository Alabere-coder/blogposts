"use client";

import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase.config";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const router = useRouter();

  const postsCollectionRef = collection(db, "posts");

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    router.push("/blog");

    setIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600  text-white px-4 py-2 hover:bg-blue-700"
      >
        <PlusIcon /> Add post
      </Button>

      {isOpen && (
        <div className="fixed inset-0 h-[100vh] bg-black/80 bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">Create you post</h2>

            <div className="max-w-2xl bg-white rounded-lg shadow-md p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Create A Post
              </h1>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Title:
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Title..."
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Post:
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-500 resize-vertical min-h-32"
                    placeholder="Post..."
                    rows={6}
                    onChange={(event) => {
                      setPostText(event.target.value);
                    }}
                  />
                </div>

                <button
                  onClick={createPost}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none"
                >
                  Submit Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

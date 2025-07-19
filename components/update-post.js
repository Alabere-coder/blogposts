"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";

const UpdatePost = ({ post, setPostList }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPostData, setEditPostData] = useState({
    id: "",
    title: "",
    postText: "",
  });

  const handleEditClick = (post) => {
    setEditPostData({
      id: post.id,
      title: post.title,
      postText: post.postText,
    });
    setIsEditModalOpen(true);
  };

  const handleEditSave = async () => {
    const { id, title, postText } = editPostData;

    try {
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, { title, postText });

      setPostList((prevList) =>
        prevList.map((p) => (p.id === id ? { ...p, title, postText } : p))
      );

      setIsEditModalOpen(false);
      setEditPostData({ id: "", title: "", postText: "" });
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div>
      <Button
        variant="outline"
        onClick={() => handleEditClick(post)}
        className="p-2 bg-blue-600 text-white hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
      >
        <Edit className="mr-1" />
        Edit
      </Button>

      {isEditModalOpen && (
        <div className="fixed inset-0 h-[100vh] bg-black/80 bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-md:w-full mx-4 md:w-[32rem] shadow-xl relative">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Edit Post
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title:
                </label>
                <input
                  type="text"
                  value={editPostData.title}
                  onChange={(e) =>
                    setEditPostData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Post:
                </label>
                <textarea
                  value={editPostData.postText}
                  onChange={(e) =>
                    setEditPostData((prev) => ({
                      ...prev,
                      postText: e.target.value,
                    }))
                  }
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  rows={6}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePost;

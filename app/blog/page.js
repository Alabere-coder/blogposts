"use client";

import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { Button } from "../../components/ui/button";
import { Edit, Trash } from "lucide-react";
import Component from "../../components/modal";

const BlogList = () => {
  const [postList, setPostList] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPostData, setEditPostData] = useState({
    id: "",
    title: "",
    postText: "",
  });

  const handleDeleteClick = (id) => {
    setPostToDelete(id);
    setShowConfirmModal(true);
  };

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
        prevList.map((post) =>
          post.id === id ? { ...post, title, postText } : post
        )
      );

      setIsEditModalOpen(false);
      setEditPostData({ id: "", title: "", postText: "" });
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;

    try {
      await deleteDoc(doc(db, "posts", postToDelete));
      setPostList((prevList) =>
        prevList.filter((post) => post.id !== postToDelete)
      );
      console.log("Post deleted successfully.");
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setShowConfirmModal(false);
      setPostToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setPostToDelete(null);
  };

  const toggleLike = async (postId, currentLikes = {}) => {
    if (!auth.currentUser) return;

    const postRef = doc(db, "posts", postId);
    const updatedLikes = { ...currentLikes };

    if (updatedLikes[auth.currentUser.uid]) {
      delete updatedLikes[auth.currentUser.uid];
    } else {
      updatedLikes[auth.currentUser.uid] = true;
    }

    try {
      await updateDoc(postRef, { likes: updatedLikes });
      setPostList((prevList) =>
        prevList.map((post) =>
          post.id === postId ? { ...post, likes: updatedLikes } : post
        )
      );
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      const postsSnapshot = await getDocs(collection(db, "posts"));
      const postsData = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostList(postsData);
      setFilteredPosts(postsData);
    };

    getPosts();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = postList.filter(
      (post) =>
        post.title?.toLowerCase().includes(term) ||
        post.postText?.toLowerCase().includes(term)
    );
    setFilteredPosts(filtered);
  }, [searchTerm, postList]);

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to{" "}
            <span className="text-yellow-300">HUI Computer Science</span>
          </h1>
          <h3 className="text-4xl md:text-6xl font-bold mb-6 text-">
            INFO PAGE
          </h3>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Discover amazing stories, insights, and ideas from our community of
            writers and thinkers.
          </p>
          {/* <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"></button> */}

          <Component />
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 mt-8">
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 py-12">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
          >
            {/* Post Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>

                {/* Delete Button */}
                {post.author?.id === auth.currentUser?.uid && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleEditClick(post)}
                      className="p-2 bg-blue-600 text-white hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDeleteClick(post.id)}
                      className="p-2 bg-red-600 text-white hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash />

                      <span className="sr-only">Delete post</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Post Content */}
            <div className="px-6 pb-6">
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed line-clamp-4 text-md">
                  {post.postText}
                </p>
                <div className="flex items-center gap-2 mt-4"></div>
              </div>

              {/* Post Footer */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                    Article
                  </span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                    Read more →
                  </button>
                  <button
                    onClick={() => toggleLike(post.id, post.likes || {})}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition"
                  >
                    <svg
                      className={`w-6 h-6 mr-1 ${
                        post.likes?.[auth.currentUser?.uid]
                          ? "text-red-600"
                          : "text-gray-400"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 015.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                    {Object.keys(post.likes || {}).length}{" "}
                    {Object.keys(post.likes || {}).length === 1
                      ? "Like"
                      : "Likes"}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex pl-6 py-4 gap-4 text-sm text-gray-500">
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
                  <span>
                    {new Date(
                      post.createdAt.seconds * 1000
                    ).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md text-left">
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

export default BlogList;

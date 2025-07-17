"use client";

import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase.config";

const BlogList = () => {
  const [postList, setPostList] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleDeleteClick = (id) => {
    setPostToDelete(id);
    setShowConfirmModal(true);
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
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Start Reading
          </button>
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
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
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

                {/* Delete Button */}
                {post.author?.id === auth.currentUser?.uid && (
                  <button
                    onClick={() => handleDeleteClick(post.id)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span className="sr-only">Delete post</span>
                  </button>
                )}
              </div>
            </div>

            {/* Post Content */}
            <div className="px-6 pb-6">
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed line-clamp-4 text-sm">
                  {post.postText}
                </p>
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
                </div>
              </div>
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
    </div>
  );
};

export default BlogList;

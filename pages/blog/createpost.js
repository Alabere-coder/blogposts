import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { useRouter } from 'next/router';
import homepageStyles from '../../styles/Homepage.module.css'

function CreatePost() {
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");

    const postsCollectionRef = collection(db, "posts");
    const redirect = useRouter();

    const createPost = async () => {
        await addDoc(postsCollectionRef, {
            title,
            postText,
            author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
        });
        redirect.push('/blog/blogList');
    };

    // useEffect(() => {
    //     if (!isAuth) {
    //         redirect.push('/sign/login')
    //     }
    // }, []);

    return (
        <div className={homepageStyles.createPostPage}>
            <div className={homepageStyles.cpContainer}>
                <h1>Create A Post</h1>
                <div className="inputGp">
                    <label> Title:</label>
                    <input className={homepageStyles.input}
                        placeholder="Title..."
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                    />
                </div>
                <div className="inputGp">
                    <label> Post:</label>
                    <textarea className={homepageStyles.textarea}
                        placeholder="Post..."
                        onChange={(event) => {
                            setPostText(event.target.value);
                        }}
                    />
                </div>
                <button onClick={createPost}> Submit Post</button>

            </div>
        </div>
    );
}

export default CreatePost;
import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import homepageStyles from '../../styles/Homepage.module.css';

function HomePage() {
    const [postList, setPostList] = useState([]);

    const deletePost = async (id) => {
        try {
            await deleteDoc(doc(db, "posts", id));
            setPostList((prevList) => prevList.filter((post) => post.id !== id));
            console.log("Post deleted successfully.");
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };


    useEffect(() => {
        const getPosts = async () => {
            const postsSnapshot = await getDocs(collection(db, "posts"));
            const postsData = postsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setPostList(postsData);
        };

        getPosts();
    }, [deletePost]);


    return (
        <div className={homepageStyles.homePage}>
            {postList.map((post) => (
                <div key={post.id} className={homepageStyles.post}>
                    <div className={homepageStyles.postHeader}>
                        <div className={homepageStyles.title}>
                            <h1>{post.title}</h1>
                        </div>
                        <div className={homepageStyles.deletePost}>
                            {post && post.author && post.author.id === auth.currentUser?.uid && (
                                <button
                                    className={homepageStyles.button}
                                    onClick={() => deletePost(post.id)}
                                >
                                    delete
                                </button>
                            )}
                        </div>
                    </div>
                    <div className={homepageStyles.postTextContainer}>
                        {post.postText}
                    </div>
                    <h3 className={homepageStyles.author__name}>By: {post.author && post.author.name}</h3>
                </div>
            ))}
        </div>
    );
}

export default HomePage;


// import { useEffect, useState } from "react";
// import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
// import { auth, db } from "../../firebase-config";
// import homepageStyles from '../../styles/Homepage.module.css'

// function HomePage() {
//     const [postLists, setPostList] = useState([]);
//     const postsCollectionRef = collection(db, "posts");

//     const deletePost = async (id) => {
//         const postDoc = doc(db, "posts", id);
//         await deleteDoc(postDoc);
//     };

//     useEffect(() => {
//         const getPosts = async () => {
//             const data = await getDocs(postsCollectionRef);
//             setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//         };

//         getPosts();
//     }, [deletePost]);


//     return (
//         <div className={homepageStyles.homePage}>
//             {postLists.map((post, id) => {
//                 return (
//                     <div key={post.id} className={homepageStyles.post}>
//                         <div className={homepageStyles.postHeader}>
//                             <div className={homepageStyles.title}>
//                                 <h1> {post.title}</h1>
//                             </div>
//                             <div className={homepageStyles.deletePost}>
//                                 {post && post.author.id === auth.currentUser.uid && (
//                                     <button className={homepageStyles.button}
//                                         onClick={() => {
//                                             deletePost(post.id);
//                                         }}
//                                     >
//                                         X
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                         <div className={homepageStyles.postTextContainer}> {post.postText} </div>
//                         <h3>By:  {post.author && post.author.name} </h3>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }

// export default HomePage;
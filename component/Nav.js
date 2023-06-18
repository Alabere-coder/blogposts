import { useEffect, useState } from "react";
import Link from "next/link"
import createpost from './../pages/blog/createpost';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";



const Nav = () => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            setIsAuth(false);
            window.location.pathname = "/sign/login";
            console.log('done');
        });
    };

    return (
        <div className="nav__container">
            <div className="logo">
                <p className="text">Blog-Posts</p>
            </div>
            <div className="nav">
                <Link href="/"> Home </Link>
                <Link href="/about"> About </Link>
                {!isAuth ? (
                    <Link href="/sign/login"> Sign-In</Link>
                ) : (
                    <>
                        <Link href="/blog/createpost"> Create-Post </Link>
                        <button onClick={signUserOut}>
                            {isAuth ? "Log Out" : "Sign-In"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Nav
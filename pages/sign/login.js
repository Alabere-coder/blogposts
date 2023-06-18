import { auth, provider } from '../../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/router';
import homepageStyles from '../../styles/Homepage.module.css'


const login = () => {

    const [user, loading] = useAuthState(auth);
    const navigate = useRouter();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (user) {
        navigate.push("../blog/blogList")
        return <div>Loading...</div>;
    }

    const signIn = async (e) => {
        e.preventDefault()
        const result = await signInWithPopup(auth, provider);
        console.log(result.user);
    };

    return (
        <div className={homepageStyles.loginPage}>
            <p className={homepageStyles.title__p}>Sign in with Google to Continue</p>
            <button className={homepageStyles.loginwithgooglebtn} onClick={signIn}>Log in</button>
        </div>

    )
}

export default login
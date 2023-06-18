import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { auth } from '../../firebase-config'
import styles from '../../styles/Auth.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = useRouter();

    const signIn = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                redirect.push("/blog/createpost");
                console.log(userCredential)
            }).catch((error) => {
                console.log(error)
            })

    }

    return (
        <div className={styles.form__container}>
            <form onSubmit={signIn} className={styles.form}>
                <h1 className={styles.reg__title}>Log In</h1>
                <hr />
                <input type="email" placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password" placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={signIn} type='submit'>Log In</button>
            </form>
            <div>
                <p>New here ? </p>
                <Link href='/sign/register'> Sign Up</Link>
                <hr />
                <p>OR</p>
                <hr />
                <Link href='/sign/login'> Sign in with Google</Link>
            </div>
        </div>
    )
}

export default SignIn
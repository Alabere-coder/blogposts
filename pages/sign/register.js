import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { auth } from '../../firebase-config'
import Link from 'next/link';
import { useRouter } from 'next/router';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = useRouter();

    const register = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                redirect.push('/sign/signin')
                console.log(userCredential)
            }).catch((error) => {
                console.log(error)
            })

    }

    return (
        <div className="form__container">
            <form onSubmit={register} className="form">
                <h2>ALABERE</h2>
                <h1 className="reg__title">Create An Account</h1>
                <hr />
                <input type="email" placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password" placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={register} type='submit'>Sign Up</button>
            </form>
            <div>
                <p>Already have an Account ? </p>
                <Link href='/sign/signin'> Sign In </Link>
            </div>
        </div>
    )
}

export default Register
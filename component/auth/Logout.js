import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

const Logout = () => {
    const [isAuth, setIsAuth] = useState(false);

    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            setIsAuth(false);
            window.location.pathname = "/sign/login";
            console.log('done')
        });
    };

    return (
        <div>

        </div>
    )
}

export default Logout
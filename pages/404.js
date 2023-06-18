import React from 'react'
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const NotFound = () => {
    const redirect = useRouter();

    useEffect(() => {
        setTimeout(() => {
            redirect.push('/')
        }, 6000)
        console.log("useEffect is runnig")
    })

    return (
        <div className="not-found">
            <h1>Ooooops...</h1>
            <h2>The page you requested cannot be found</h2>
            <p>Go back to the <Link href="/">Homepage</Link></p>
        </div>
    )
}

export default NotFound
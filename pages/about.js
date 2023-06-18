import React from 'react'
import { BsGithub, BsTwitter, BsLinkedin } from 'react-icons/bs';
import Link from 'next/link';
import styles from '@/styles/Home.module.css'

const about = () => {
    return (
        <div>
            <h1 className={styles.center}>About us</h1>
            <div className={styles.links}>
                <Link href="/" ><BsGithub className={styles.icon__link} /></Link>
                <Link href="/" ><BsTwitter className={styles.icon__link} /> </Link>
                <Link href="/" ><BsLinkedin className={styles.icon__link} /></Link>
            </div>
        </div>
    )
}

export default about
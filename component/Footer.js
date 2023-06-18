import React from 'react'

const Footer = () => {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className='footer'>
            <p>@copy; {new Date().getFullYear()} BlogPost. All rights reserved</p>
            <button onClick={scrollToTop}>Top</button>
        </div>
    )
}

export default Footer
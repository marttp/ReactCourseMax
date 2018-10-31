import React from 'react'
import Link from 'next/link'

const errorPage = () => (
    <>
        <h1>Something went wrong.</h1>
        <p>Try <Link href="/"><a>going back</a></Link>.</p>
    </>
)

export default errorPage
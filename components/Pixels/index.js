import React from 'react'
import Head from 'next/head'
import Pixels1 from './facebook-1'

// import FACEBOOK_PIXEL_1 from './facebook/pixel-1'


export default function Pixel({ name }) {

    return (
        <Head>
            {name === 'FACEBOOK_PIXEL_1' ? <Pixels1 /> : <Pixels1 />}
        </Head>
    )
}
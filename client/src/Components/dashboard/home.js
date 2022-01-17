import React from 'react'
import Banner from './Banner'
import Popular from './Popular'

export default function home() {
    return (
        <div>
            {/* Importing Carousel(Banner) and Slider(popular) */}
            
            <Banner />
            <Popular timer={true} title="Deal Of The Day"/>
            {/* <Popular timer={false} title="Popular Products"/> */}
        </div>
    )
}

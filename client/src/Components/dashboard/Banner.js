import React from 'react';
import { Carousel } from 'react-bootstrap';

export default function Banner() {
    return (
        <div>
            {/* Carousel  starts*/}
            <Carousel>
                <Carousel.Item interval={1000} >
                    <img
                    className="d-block w-100" 
                    style={{height:"400px", width:"100%"}}
                    src="./Images/carousel-1.jpg"
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                    className="d-block w-100"
                    style={{height:"400px", width:"100%"}}
                    src="./Images/carousel-2.webp"
                    alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="./Images/carousel-5.jpg"
                    style={{height:"400px", width:"100%"}}
                    alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
            {/* Carousel ends */}
        </div>
    )
}

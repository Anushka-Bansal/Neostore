import React,{useEffect,useState} from 'react'
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { getProducts } from '../../Config/ProductServices';
import Countdown from 'react-countdown';
import ReactStars from 'react-rating-stars-component';

//Function for making sliding carousel responsive
const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
};

export default function Popular({timer,title}) {

    const [items,setItems] = useState([]);

    // Getting all product in slider
    useEffect(()=>{
        getProducts().then(res =>{
            // const result=res.data;
            // let popular = result.filter(result =>result.product_rating == 5);
            // console.log(popular);
            // setItems(popular)
            console.log(res.data);
            setItems(res.data);
        });
    },[])

  const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';

  const renderer = ({hours,minutes,seconds}) =>{
    return <span style={{color:'#7f7f7f',fontWeight:"bold",marginLeft:"20px",alignItems:"center", display:"flex"}}>{hours}:{minutes}:{seconds} Left</span>;
  }

  return (
    <div>
      <div className='d-flex p-3 mr-4' style={{lineHeight:"32px"}}>
        <h4 >{title}</h4>

        {/* For displaying timer  */}
        { timer &&
          <>
            <img src = {timerURL} width="24" style={{marginLeft:"20px"}} />
            <Countdown date={Date.now() + 5.04e+7} renderer={renderer} />
          </>
          } 
      </div>
      <hr/>

      {/* Sliding Carousel for displaying deal of the day */}
      <Carousel responsive={responsive} infinite={true} autoPlay={true} 
      keyBoardControl={true} removeArrowOnDeviceType={["tablet","mobiles"]}
      dotListClass="custom-dot-list-style"
      containerClass="carousel-container"
      itemClass="carousel-item-padding-40-px" >
        
        {items.map((product,index)=>{
          return(
            <div style={{textAlign:"center"}}className='p-3' key={index}>
              <img src = {product.product_image} height="120" />
              <h6 style={{fontWeight:"bold"}}> 
                <a href={`/productDetails/${product._id}`}>{product.product_name}</a>
              </h6>
              <p className='text-success'>{product.product_cost}</p>
              <div style={{fontWeight:"bold", color:"gold",opacity:".6",marginLeft:"60px"}}>
                <ReactStars edit={false} isHalf={true} count={5} value={product.product_rating} 
                  />
              </div>
            </div>
          )
        })} 
      </Carousel>
    </div>
  )
}

import React,{useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import { getColors, productDetails } from '../../Config/ProductServices';
import { Container, Row, Col, Button,Tabs, Tab,Table } from 'react-bootstrap';
import ReactImageMagnify from 'react-image-magnify'
import { ShareFill, CartPlusFill } from 'react-bootstrap-icons';
import {FacebookIcon,FacebookShareButton,WhatsappIcon,WhatsappShareButton,
        LinkedinIcon,LinkedinShareButton,TelegramIcon,TelegramShareButton,
        TwitterIcon,TwitterShareButton,PinterestIcon,PinterestShareButton} from 'react-share';

export default function ProductsDetails() {
    const {id} = useParams();
    const [details,setDetails] = useState([]);
    const[color,setColor] = useState('')
    const [subimages,setSubimages] = useState([]);
    const [mainImage,setMainimage] = useState('')
    console.log(id);

    // Fetching detail of products by product id and colors also 
    useEffect(()=>{
        productDetails(id).then((res) =>{
            console.log(res.data)
            setDetails([res.data])
            setSubimages(res.data.subimages)
            setMainimage(res.data.product_image)
            getColors(res.data.color_id).then((res)=>{
                console.log(res.data);
                setColor(res.data.color_code);
            })
        })
    },[])

    //Add to cart button functionality (Setting the products in local storage(mycart))
    const addToCart = (obj) => {
        console.log(obj.product_name);
        let item = {
            name: obj.product_name,
            image:obj.product_image,
            price: obj.product_cost,
            _id: obj._id,
            quantity: 1,
        };
        if (localStorage.getItem("mycart") !== null) {
            let arr = JSON.parse(localStorage.getItem("mycart"));
            console.log(arr)
            let idArrays = [];
            if(arr !==null){
            arr.forEach((data) => {
                idArrays.push(data._id);
            });
        }
        if (idArrays.includes(obj._id)) {
            alert("Product Already Added");
        } 
        else {
            arr.push(item);
            localStorage.setItem("mycart", JSON.stringify(arr));
            alert("Product Added to Cart");
        }
    }
        else {
            let arr = [];
            arr.push(item);
            localStorage.setItem("mycart", JSON.stringify(arr));
            alert("Product Added to Cart");
        }
    };

    return (
        <div>
            <Container style={{textAlign:"left"}}>
                {/* Map function to fetch product details */}
                {details.map((item,index)=>{
                    return (
                        <div key={index} className="mt-3">
                            <Row>
                                <Col md={2}>
                                    {/* Map function to fetch subimages section starts */}
                                    {subimages.map((value,index)=>{
                                        return(
                                            <div className=" d-flex" key={index}>
                                                <img src={value} height="100px" width="100px" onClick={()=> setMainimage(value)}/>
                                            </div>
                                        )
                                    })}
                                    {/* Map function to fetch subimages section starts */}
                                </Col>
                                <Col md={5} >
                                    {/* React maginifier */}
                                    <ReactImageMagnify
                                        {...{
                                            smallImage: {
                                                alt: "Wristwatch by Ted Baker London",
                                                isFluidWidth: true,
                                                src:mainImage,
                                            },
                                            largeImage: {
                                                src:mainImage,
                                                width: 1000,
                                                height: 1000,
                                            },
                                        }}
                                    />  
                                </Col>
                                <Col md={5}>
                                    {/* Products detail section starts */}
                                    <Container style={{textAlign:"left",marginLeft:"30px"}}>
                                        <h2 >{item.product_name}</h2> 
                                        <div style={{marginLeft:"80px"}}>
                                            <ReactStars edit={false} isHalf={true} count={5} value={item.product_rating} size={30} />
                                        </div>
                                        <hr/>
                                        <div style={{fontWeight:"bold", fontSize:"20px"}}>
                                            <p>Price: {item.product_cost}/- <br/>
                                            Color: &nbsp;&nbsp;
                                                <svg width={20} height={20} >
                                                <rect 
                                                width={20} height={20} style={{fill : `${color}`}} />
                                                </svg> 
                                            <br/>
                                            {/* Social sharing buttons */}
                                            Share : <ShareFill />
                                            <br/>
                                            <FacebookShareButton url={"http://www.Neostore.com"} hashtag="#NeoStore" className="socialMediaButton">
                                                <FacebookIcon size={46} round={true} />
                                            </FacebookShareButton>

                                            <WhatsappShareButton url={"http://www.Neostore.com"} hashtag="#NeoStore" className="socialMediaButton">
                                                <WhatsappIcon size={46} round={true} />
                                            </WhatsappShareButton>
                                            
                                            <LinkedinShareButton url={"http://www.Neostore.com"} hashtag="#NeoStore" className="socialMediaButton">
                                                <LinkedinIcon size={46} round={true} />
                                            </LinkedinShareButton>

                                            <TelegramShareButton url={"http://www.Neostore.com"} hashtag="#NeoStore" className="socialMediaButton">
                                                <TelegramIcon size={46} round={true} />
                                            </TelegramShareButton>

                                            <PinterestShareButton url={"http://www.Neostore.com"} hashtag="#NeoStore" className="socialMediaButton">
                                                <PinterestIcon size={46} round={true} />
                                            </PinterestShareButton>

                                            <TwitterShareButton url={"http://www.Neostore.com"} hashtag="#NeoStore" className="socialMediaButton">
                                                <TwitterIcon size={46} round={true} />
                                            </TwitterShareButton>
                                            </p>
                                        </div>
                                        <div className='mt-5'>
                                        <Button variant="primary" onClick={()=>addToCart(item)}>
                                            <CartPlusFill style={{fontSize:"25px"}} /> Add to cart</Button> &nbsp;&nbsp;
                                        {/* <Button variant="warning">Rate the product</Button> */}
                                        </div>
                                    </Container>
                                    {/* Products detail section ends */}
                                </Col>
                            </Row>
                            <br/>
                            <Tabs className="mb-3" >
                                <Tab eventKey="description" title="Description">
                                    {item.product_desc}
                                </Tab>
                                <Tab eventKey="features" title="Features" >
                                    <Table striped  hover>
                                        <tbody>
                                        <tr>
                                            <td>Product Producer</td>
                                            <td>{item.product_producer}</td>
                                        </tr>
                                        <tr>
                                            <td>Product Dimension</td>
                                            <td>{item.product_dimension}</td>
                                        </tr>
                                        <tr>
                                            <td>Product Material</td>
                                            <td>{item.product_material}</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </Tab>
                            </Tabs>
                        </div> 
                    )
                })}
            </Container>
        </div>
    )
}

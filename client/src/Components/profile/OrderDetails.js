import React,{useState,useEffect} from 'react'
import { Row,Col,Card,Button, Container,Table } from 'react-bootstrap'
import MyAccount from './MyAccount'
import jwt_decode from 'jwt-decode';
import { orderDetails } from '../../Config/OrderServices';

export default function OrderDetails() {

    //decoding token
    let token=localStorage.getItem('_token')
    let decode=  jwt_decode(token);
    let email = decode.oid

    const [details,setDetails]=useState([]);
    const [images,setImages]=useState([]);

    //Fetching orders from databse 
    useEffect(()=>{
        console.log(email)
        orderDetails(email).then(res =>{
            console.log(res.data)
            setDetails(res.data)
            console.log(res.data.cart)
            // setImages(res.data.cart)
            let abc = res.data.forEach(element => {
                console.log(element.cart)
                setImages(element.cart)
            });
        })
    },[])
    console.log(details)

    return (
        <div className='p-3'>
            <h2 style={{textAlign:"left"}}>My Account</h2>
            <hr/>
            <Row>
                <Col md={6}>
                    <MyAccount  />
                </Col>
                <Col md={6}>
                    <Container >
                    <Card style={{width:"500px", height:"500px"}} >
                        <Card.Body style={{fontSize:"20px", fontWeight:"500px", textAlign:"left",overflow:"auto"}}>
                            <Card.Title style={{textAlign:"left", fontSize:"30px" , fontWeight:"bold"}}>Your Orders</Card.Title>
                            <hr/>
                            {details.map((value,ind)=>{
                                return(
                                    <div key={ind}>
                                    <Card style={{textAlign:"left"}} >
                                        <Card.Header>
                                            <Row>
                                                <Col>
                                                    <Card.Text as="h5">Order Placed: </Card.Text>
                                                    <Card.Text as="h6"><span style={{color:"red"}}>{value.createdAt.substring(0,10)}</span></Card.Text>
                                                </Col>
                                                <Col style={{textAlign:"right"}}>
                                                <Card.Text as="h5" >Order ID: </Card.Text>
                                                <Card.Text as="h6"><span style={{color:"red"}}>{value._id}</span></Card.Text>
                                                </Col>
                                            </Row>
                                            <br/>
                                            <Row>
                                                <Col>
                                                    <Card.Text as="h5">Status : <span style={{color:"green"}}>Completed</span></Card.Text>
                                                </Col>
                                                <Col>
                                                <Card.Text as="h5" style={{textAlign:"right"}}>Total : <span style={{color:"green"}}>{value.total}</span></Card.Text>
                                                </Col>
                                            </Row>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row >
                                            <Card.Title>
                                                {images.map((value,index)=>{
                                                    return(
                                                        <img src={value.image} alt="product image" key={index}
                                                        style={{height:"120px", width:"120px"}} className="m-4" />
                                                    )
                                                })}
                                            </Card.Title>
                                            </Row>
                                            <Button variant="primary" href={`/invoice/${value._id}`}>View and Download Invoice</Button>
                                        </Card.Body>
                                    </Card>
                                    <br/>
                                    </div>
                                )
                            })}
                            </Card.Body>   
                        </Card>
                    </Container>
                </Col>
            </Row>    
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import { Card, Row,Col ,Button, Container} from 'react-bootstrap'
import jwt_decode from 'jwt-decode'
import { orderDetails } from '../../Config/OrderServices';

export default function Orders() {
    let email;
    //decoding token after getting token
    let token=localStorage.getItem('_token')
    if(token){
    let decode=  jwt_decode(token);
    email = decode.oid
    }
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
        <Container className="m-4 p-4">
            {/* Oders card section starts */}
            {details ? details.map((value,index)=>{
                 return(
                    <Card style={{textAlign:"left"}} key={index}>
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
                                {/* For displaying images  */}
                                {images ? images.map((value,index)=>{
                                    return(
                                        <img src={value.image} alt="product image" key={index}
                                        style={{height:"120px", width:"120px"}} className="m-4" />
                                    )
                                }):""}
                            </Card.Title>
                            </Row>
                            <Button variant="primary" href={`/invoice/${value._id}`}>View and Download Invoice</Button>
                        </Card.Body>
                    </Card>
                    )
            }) : " "}
            {/* Oders card section ends */}
        </Container>
    )
}

import React,{useState,useEffect,useRef} from 'react';
import {Row, Col, Dropdown,Card ,Table,Button,Form,Container,ProgressBar} from 'react-bootstrap'
import jwt_decode from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
import { getUserdetails } from '../../Config/MyServices';
import { checkOut } from '../../Config/OrderServices';
import { cartItems } from '../../Config/ProductServices';

export default function CheckoutPage() {

    const navigate=useNavigate();
    
    //decoding the jwt token
    let token=localStorage.getItem('_token')
    let decode=  jwt_decode(token);
    let email = decode.oid

    const[address,setAddress] = useState([]);
    const[selected,setSelected] = useState([]);
    const cardnumber = useRef();
    const subtotal = JSON.parse(localStorage.getItem("subtotal"))
    const gst = JSON.parse(localStorage.getItem("gst"))
    const total = JSON.parse(localStorage.getItem("total"))
    let cartItem = JSON.parse(localStorage.getItem("mycart"))

    //getting address by fetching user details
    useEffect(()=>{
        getUserdetails(email).then(res=>{
            console.log(res.data.address)
            setAddress(res.data.address);
        })
    },[])

    //display the value of dropdown
    const display=(value)=>{
        let delivered =(value.address+", "+
            value.city+", " +"(" + value.pincode+")"+", " +value.state+", " +value.country);
        setSelected(delivered);
    };

    //chekout button functionality
    const checkout=()=>{
        let orderDetail={
            email,
            subtotal,
            gst,
            total,
            cartItem,
            selected,
            cardnumber : cardnumber.current.value
        }
        //pushing data to database
        checkOut(orderDetail).then(res =>{
            console.log(res.data)
            if(res.data.err){
                alert(res.data.err)
            }
            else{
                alert(res.data.msg)
                localStorage.removeItem("mycart");
                localStorage.removeItem("subtotal");
                localStorage.removeItem("gst");
                localStorage.removeItem("total");
                let items=[];
                let data={email,items}
                cartItems(data).then(res =>{
                    console.log(res.data)
                })
                navigate("/orders")
            }
        })
    }

    return (
        <div className='m-2 p-2'>
            {/* Progress Bar starts */}
            <Row>
                <Col md={5} style={{textAlign:"left"}}>
                    Cart
                </Col>
                <Col style={{textAlign:"right"}}>
                    order placed
                </Col>
            </Row>
            <ProgressBar striped variant="success" now={100} className='mb-4' />
            {/* Progress Bar Ends */}
            <Row>
                <Col md={6}>
                    {/* Select Address section starts */}
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary" style={{width:"200px"}} >
                        Add Address
                        </Dropdown.Toggle>
                        <Dropdown.Menu variant="dark">
                            {address.map((value,index)=>{
                                return(
                                <Dropdown.Item  key={index} onClick={()=> display(value)}>
                                    {value.address},{value.city} - ({value.pincode}),
                                    {value.state}, {value.country}
                                </Dropdown.Item>
                                )
                            })}
                            <Dropdown.Item href="/addresses">Add Address</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                {/* {console.log(selected)} */}
                <Form.Control type="text" id="card" className="mt-3" value={selected} placeholder='Select Address' readOnly />
                </Col>
                
                <Col md={6}>
                    <Container className="text-dark">
                        <Form>
                            <Form.Label as="h3">Credit Card Number</Form.Label>
                        <Form.Control type="number" placeholder="Enter credit card details" id="card" ref={cardnumber} />
                        </Form>
                        <br />
                    </Container>
                </Col>
                {/* Select Address section ends */}
            </Row>
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            {/* Review order card starts */}
                        <Card.Title style={{textAlign:"left", fontSize:"20px" , fontWeight:"bold"}}>Review Order</Card.Title>
                            <hr/>
                            <Table>
                                <tbody style={{fontWight:"bold",textAlign:"left"}}>
                                    <tr>
                                        <td>SubTotal</td>
                                        <td>{subtotal}</td>
                                    </tr>
                                    <tr>
                                        <td>GST(5 %) </td>
                                        <td>{gst}</td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td>{total}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            {/* Review order card ends */}
                        </Card.Body>
                    </Card>
                </Col>
                {/* Checkout Button */}
                <Col md={6}>
                    <Container className="mt-5 pt-5">
                <Button variant="success" onClick={()=>checkout()} >
                    Checkout
                </Button>
                </Container>
                </Col>
            </Row>
        </div>
    )
}

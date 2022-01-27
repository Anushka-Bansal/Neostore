import React,{useRef,useState} from 'react';
import {Form,Button, Col,Row,Container} from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';
import { emailSend, verifyOtp } from '../../Config/MyServices';

export default function FotgotPassword() {
    const emailRef = useRef();
    const otpRef = useRef('');

    const navigate = useNavigate();
    
    //Function to send otp on email
    const sendOtp = async(e) =>{
        e.preventDefault();
        let data = {email :emailRef.current.value}
        emailSend(data).then((res,err)=>{
            if(res.data.err){
                alert(res.data.err)
            }
            else{
                alert(res.data.msg)
            }
        })
    }

    //Function to verify otp
    const otpVerification =(event)=>{
        let data ={otp:otpRef.current.value}
        event.preventDefault();
        verifyOtp(data).then(res =>{
            console.log(res.data)
            if(res.data.err){
                alert(res.data.err)
            }
            else{
                alert(res.data.msg)
                navigate("/passwordform")
            }
        })
    }
    return (
        <div
        style={{backgroundImage:"url('./images/login.jpg')",backgroundRepeat: "no-repeat",backgroundSize:"cover", width:"100vw",height:"70vh"}}
            >
            <Container className="w-75" >  
                <h2 className="pt-3  pb-3 text-center text-danger">Forgot Password</h2>
                <Row>   
                    <Col md={6}>
                        <img src="./Images/forgotPassword.jpg" className="w-75 pl-4 pt-5" alt="forgot Password"/>
                    </Col>
                    <Col md={5}>
                        {/* Forgot password form starts here */}
                        <Form className="pt-2" >
                            <Row>
                                <Col md={8}>
                                <Form.Group className="mb-3 mt-3"  >
                                    <Form.Label><b>Email:</b></Form.Label>
                                    <Form.Control type="email" placeholder="Enter Email" name="email" id="email" ref={emailRef}/>
                                </Form.Group>
                                </Col>

                                <Col md={4}>
                                <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
                                    <Button onClick={(e)=>sendOtp(e)}>SendOtp</Button>
                                </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={8}>
                                    <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                                        <Form.Label><b>Enter Otp:</b></Form.Label>
                                        <Form.Control type="number" placeholder="Verification Code" name="vcode"  className="form-control" ref={otpRef}  required />
                                    </Form.Group>
                                </Col>

                                <Col md={3}>
                                    <Form.Group className="mb-3 mt-5" controlId="formBasicEmail"> 
                                        <Button onClick={(event)=> otpVerification(event)} >verifyOtp</Button>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button variant="danger" className="m-2 text-align-center" href="/login"><b>Back</b></Button>
                        </Form> 
                        {/* Forgot password form ends here */}
                    </Col>
                </Row> 
            </Container>
        </div>
    )
}

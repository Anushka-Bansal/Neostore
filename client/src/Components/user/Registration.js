import React,{useState} from 'react'
import {Container,Row,Button,Form,Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { register, socialRegister } from '../../Config/MyServices';
import {Google,Facebook} from 'react-bootstrap-icons';
import Validation from '../common/Validation';
import SocialButton from './SocialButton';

export default function Registration() {
  const navigate=useNavigate();
    
  const formRegister = () => {
    console.log("Callback function when form is submitted!");
    register(values).then(res=>{
        if(res.data.err ){
            alert(res.data.err)
            console.log(res.data.err)
        }
        else{
            alert(res.data.msg)
            navigate("/login");
            console.log(res.data.msg)
        }
    })
    console.log("Form Values ", values);
  }

  //Custom hook call
    const {handler, values,errors,handleSubmit} = Validation(formRegister);
    console.log(values)
    console.log(errors)

    //Register a user by social login success
    const handleSocialLogin = (user) => {
        console.log(user);
        socialRegister(user).then(res=>{
            if(res.data.err ){
                alert(res.data.err)
                console.log(res.data.err)
            }
            else{
                alert(res.data.msg)
                navigate("/login");
                console.log(res.data.msg)
            }
        })
    };
  
    //display error on social login failure
    const handleSocialLoginFailure = (err) => {
        console.error(err);
    };

    return (
        <>
            <div 
            style={{backgroundImage:"url('./images/login.jpg')",backgroundRepeat: "no-repeat",backgroundSize:"cover", width:"100vw",height:"80vh"}}
            >
            <Container className=" w-75 pt-3 pb-3 text-secondary ">
                <h2 className="pt-1 pb-3 text-warning">REGISTRATION FORM</h2>
                <Row>
                    <Row className="mb-3">
                        {/* Social login buttons */}
                        <Col md={6}>
                            <SocialButton
                                provider="google"
                                appId="419680043420-rd2lc4fudbgjrm16timgiq2c6in4tims.apps.googleusercontent.com"
                                onLoginSuccess={handleSocialLogin}
                                onLoginFailure={handleSocialLoginFailure}
                                variant="danger"
                                style={{width:"60%"}}
                            >
                            <Google style={{fontSize:"25px"}} /> &nbsp;&nbsp; Register with Gmail
                            </SocialButton>     
                        </Col>
                        <Col md={6}>
                            <SocialButton
                                provider="facebook"
                                appId="869105660472693"
                                onLoginSuccess={handleSocialLogin}
                                onLoginFailure={handleSocialLoginFailure}
                                style={{width:"70%"}}
                                >
                                <Facebook style={{fontSize:"25px"}} />&nbsp;&nbsp; Register with Facebook
                            </SocialButton>
                        </Col>
                    </Row>
                    <hr />
                    {/* Registration form starts here */}
                        <Form method="post" className="pt-3 mt-3 ">
                            <Row>
                                <Col md={5}>
                                <Form.Group className="mb-3" >
                                    <Form.Label><b>First Name:</b></Form.Label>
                                    <Form.Control type="text" placeholder="Enter First Name"  name="fname" id="fname" onChange={handler}/>
                                    <Form.Text>
                                        {errors.fname && 
                                        (<span style={{ color: "red" }}>{errors.fname}</span>)}
                                    </Form.Text>
                                </Form.Group>
                                </Col>

                                <Col md={5}>
                                <Form.Group className="mb-3" >
                                    <Form.Label><b>Last Name:</b></Form.Label>
                                    <Form.Control type="text" placeholder="Enter Last Name"  name="lname" id="lname" onChange={handler}/>
                                    <Form.Text>
                                        {errors.lname && 
                                        (<span style={{ color: "red" }}>{errors.lname}</span>)}
                                    </Form.Text>
                                </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={5}>
                                    <Form.Group className="mb-3 " >
                                        <Form.Label><b>Email:</b></Form.Label>
                                        <Form.Control type="email" placeholder="Enter Email" name="email" id="email" onChange={handler}/>
                                        <Form.Text>
                                            {errors.email&& 
                                            (<span style={{ color: "red" }}>{errors.email}</span>)}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col md={5}>
                                    <Form.Group className="mb-3 " >
                                        <Form.Label><b>Contact:</b></Form.Label>
                                        <Form.Control type="string" placeholder="Enter Contact Number" name="contact" id="contact" onChange={handler}/>
                                        <Form.Text>
                                            {errors.contact && 
                                            (<span style={{ color: "red" }}>{errors.contact}</span>)}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={5}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label><b>Password:</b></Form.Label>
                                        <Form.Control type="password" placeholder="Enter Password" name="password" id="password" onChange={handler} />
                                        <Form.Text>
                                            {errors.password&& 
                                            (<span style={{ color: "red" }}>{errors.password}</span>)}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col md={5}>
                                <Form.Group className="mb-3" >
                                    <Form.Label><b>Confirm Password:</b></Form.Label>
                                    <Form.Control type="password" placeholder="Enter ConfirmPassword" name="cpassword" id="cpassword" onChange={handler}/>
                                    <Form.Text>
                                        {errors.cpassword&& 
                                        (<span style={{ color: "red" }}>{errors.cpassword}</span>)}
                                    </Form.Text>
                                </Form.Group>
                                </Col>
                            </Row>
                            <Button variant="secondary" onClick={handleSubmit}><b>Register</b></Button>&nbsp;&nbsp;
                        </Form>
                    {/* Registration form ends here */}
                </Row>
            </Container>
            </div>
        </>
    )
}

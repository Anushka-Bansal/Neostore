import React from 'react'
import {Container,Row,Button,Form,Col} from 'react-bootstrap';
import {Google,Facebook} from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { getUserdetails, login,SocialLogin } from '../../Config/MyServices';
import Validation from '../common/Validation';
import jwt_decode from 'jwt-decode';
import SocialButton from './SocialButton';

export default function Login() {
    const navigate=useNavigate();
    
    //Function for login user
    const formLogin = () => {
        console.log("Callback function when form is submitted!");
        login(values).then(res=>{
            console.log(res)
            if(res.data.err){
                alert(res.data.err)  
            }
            else{
                //Set the token in local storage
                localStorage.setItem("_token",res.data.token);
                console.log(res.data.user)
                alert(res.data.msg)
                console.log(res.data)
                navigate("/")
                //if we find token then decode token and set the cart in local storage
                if(localStorage.getItem("_token")){
                    let token=localStorage.getItem('_token')
                    let decode=  jwt_decode(token);
                    let email = decode.oid
                    getUserdetails(email).then(res =>{
                        console.log(res.data)
                        if(localStorage.getItem("mycart")){
                            const products = JSON.parse(localStorage.getItem("mycart"))
                            const abc = res.data.cart
                            const xyz = products.concat(abc)
                            const uniqueIds = [];
                            const unique = xyz.filter(element => {
                            const isDuplicate = uniqueIds.includes(element._id);
                            if (!isDuplicate) {
                                uniqueIds.push(element._id);
                                return true;
                            }
                            });
                            console.log(unique);

                            localStorage.setItem("mycart",JSON.stringify(unique))
                        }
                        else if(res.data.cart === null){
                            localStorage.setItem("mycart",JSON.stringify([]));
                        }
                        else{
                            localStorage.setItem("mycart",JSON.stringify(res.data.cart))
                        }
                    })
                }
            }
        })
        console.log("Form Values ", values);
      }
    
    //Custom hook call
    const {handler, values,errors,handleSubmit} = Validation(formLogin);
    console.log(values)
    console.log(errors)

    //Second login functionality for social login success
    const handleSocialLogin = (user) => {
        console.log(user);
        SocialLogin(user).then(res=>{
            if(res.data.err ){
                alert(res.data.err)
            }
            else{
                localStorage.setItem("_token",res.data.token);
                console.log(res.data.user)
                alert(res.data.msg)
                console.log(res.data)
                navigate("/")
                if(localStorage.getItem("_token")){
                    let token=localStorage.getItem('_token')
                    let decode=  jwt_decode(token);
                    let email = decode.oid
                    getUserdetails(email).then(res =>{
                        console.log(res.data)
                        if(localStorage.getItem("mycart")){
                            const products = JSON.parse(localStorage.getItem("mycart"))
                            const abc = res.data.cart
                            const xyz = products.concat(abc)
                            const uniqueIds = [];
                            const unique = xyz.filter(element => {
                            const isDuplicate = uniqueIds.includes(element._id);
                            if (!isDuplicate) {
                                uniqueIds.push(element._id);
                                return true;
                            }
                            });
                            console.log(unique);
                            localStorage.setItem("mycart",JSON.stringify(unique))
                        }
                        else if(res.data.cart === null){
                            localStorage.setItem("mycart",JSON.stringify([]));
                        }
                        else{
                            localStorage.setItem("mycart",JSON.stringify(res.data.cart))
                        }
                    })
                }
            }
        })
      };
      //if social login is fail give error
      const handleSocialLoginFailure = (err) => {
        console.error(err);
      };

    return (
        <>   
            <div 
            style={{backgroundImage:"url('./images/login.jpg')",backgroundRepeat: "no-repeat",backgroundSize:"cover", width:"100vw",height:"70vh"}}
            >
            <Container className=" w-75 pt-3 pb-3  pt-3 pb-3" >
                <h2 className="pt-2 pb-3 text-center text-secondary">LOGIN FORM</h2>
                <Row>
                    <Col md={6} className="mt-5" >
                        {/* Social login buttons */}
                        <SocialButton
                            provider="google"
                            appId="419680043420-rd2lc4fudbgjrm16timgiq2c6in4tims.apps.googleusercontent.com"
                            onLoginSuccess={handleSocialLogin}
                            onLoginFailure={handleSocialLoginFailure}
                            variant="danger"
                            style={{width:"70%"}}
                        >
                            <Google style={{fontSize:"25px"}} /> &nbsp;&nbsp; Login with Gmail
                        </SocialButton><br/><br/>
                        <SocialButton
                            provider="facebook"
                            appId="869105660472693"
                            onLoginSuccess={handleSocialLogin}
                            onLoginFailure={handleSocialLoginFailure}
                            style={{width:"70%"}}
                            >
                            <Facebook style={{fontSize:"25px"}} />&nbsp;&nbsp; Login with Facebook
                        </SocialButton>
                    </Col>
                    <Col md={6} className="">
                        {/* Login form starts here */}
                        <Form className="pt-4 "  onSubmit={handleSubmit}>
                            <Form.Group className="mb-3 " >
                                <Form.Label><b>Email:</b></Form.Label>
                                <Form.Control type="email" placeholder="Enter Email" name="email" id="email" onChange={handler} />
                                {errors.email && 
                                <p style={{color:'red',fontWeight:"bold"}}>{errors.email}</p>}
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label><b>Pasword:</b></Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" name="password" id="password" onChange={handler}  />
                                {errors.password && 
                                <p style={{color:'red',fontWeight:"bold"}}>{errors.password}</p>}
                            </Form.Group>
                            <Button variant="secondary" type="submit" className="m-2" ><b>Login</b></Button>&nbsp;&nbsp;
                        </Form>
                        {/* Login form starts here */}
                    </Col>
                </Row>
                <div>
                    {/* link for registration and forgot password */}
                <p><a href="/register" style={{textDecoration:"none"}}>Register Now</a> | 
                Forgot <a href="/forgotpassword">Password?</a></p>
                </div>
            </Container>
            </div>
        </>
    )
}

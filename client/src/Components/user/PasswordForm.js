import React from 'react';
import {Form,Button, Col,Row,Container} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import { forgotPassword } from '../../Config/MyServices';
import Validation from '../common/Validation';

export default function PasswordForm() {

    const navigate = useNavigate()
    
    //Callback function to reset password
    const submitForm = () => {
        console.log("Callback function when form is submitted!");
        forgotPassword(values).then(res =>{
            console.log(res.data)
            if(res.data.err){
                alert(res.data.err)
            }
            else{
                alert(res.data.msg)
                navigate("/login")
            }
        })
        console.log("Form Values",values);
    }
    //custom hook call
    const {handler, values,errors,handleSubmit} = Validation(submitForm);
    console.log(values)
    
    return (
        <div
        style={{backgroundImage:"url('./images/login.jpg')",backgroundRepeat: "no-repeat",backgroundSize:"cover", width:"100vw",height:"70vh"}}
            >
            <Container className=" w-75 " >  
            <h2 className="pt-3 pb-3 text-center text-danger">Reset Password</h2>
            <Row>   
                <Col md={6}>
                <img src="./Images/forgotPassword.jpg" className="w-75 pl-4 mt-3 pt-3" alt="forgot Password"/>
                </Col>
                <Col md={5}>
                    {/* Reset Password form starts here */}
                    <Form className="pt-2 " onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label><b>New Password:</b></Form.Label>
                            <Form.Control type="password" placeholder="Enter new password" name="password" id="password" onChange={handler} required/> 
                            <Form.Text>
                                {errors.password&& 
                                (<span style={{ color: "red" }}>{errors.password}</span>)}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label><b>Confirm Password:</b></Form.Label>
                            <Form.Control type="password" placeholder="Enter confirm password" name="cpassword" id="cpassword" onChange={handler} required />   
                            <Form.Text>
                                {errors.cpassword&& 
                                (<span style={{ color: "red" }}>{errors.cpassword}</span>)}
                            </Form.Text>
                        </Form.Group>   
                        <Button variant="secondary" type="submit" className="m-2" ><b>Change Password</b></Button>    
                    </Form> 
                    {/* Reset Password form ends here */}
                </Col>
            </Row> 
            </Container>
        </div>
    )
}

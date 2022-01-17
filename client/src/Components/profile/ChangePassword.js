import React,{useRef} from 'react'
import { Row,Col,Card,Button, Container,Table, Form } from 'react-bootstrap'
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom'
import MyAccount from './MyAccount'
import Validation from '../common/Validation';
import { changePassword } from '../../Config/MyServices';

export default function ChangePassword() {

    const oldRef=useRef('');

    //decoding token
    let token=localStorage.getItem('_token')
    let decode=  jwt_decode(token);
    let email = decode.oid

    const navigate = useNavigate()

    //Callback function called at validation file 
    //Functionality of change password
    const UpdatePassword = () => {
        console.log("Callback function when form is submitted!");
        let data={ values,email,oldRef: oldRef.current.value};
        changePassword(data).then(res =>{
            if(res.data.err){
                alert(res.data.err)
            }
            else{
                alert(res.data.msg)
                navigate("/profile")
            }
        })
        console.log("Form values",values)
    }

    //Taking values and errors from validation file
    const {handler, values,errors,handleSubmit} = Validation(UpdatePassword);
    console.log(values)
    console.log(errors)

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
                        <Card style={{width:"500px", height:"400px", }} >
                            <Card.Body style={{ textAlign:"left"}}>
                                <Card.Title style={{textAlign:"left", fontSize:"30px" , fontWeight:"bold"}}> Change Password</Card.Title>
                                <hr/>
                                    {/* Change Password form starts here */}
                                    <Form >
                                        <Form.Group className="mb-4">
                                            {/* <Form.Label>Old Password :</Form.Label> */}
                                            <Form.Control type="password" placeholder="Enter old password" name="oldpassword" ref={oldRef} />
                                        </Form.Group>

                                        <Form.Group className="mb-4">
                                            {/* <Form.Label>New Password :</Form.Label> */}
                                            <Form.Control type="password" placeholder="Enter new password" name="password" id="password" onChange={handler} />
                                            {errors.password && 
                                            <p style={{color:'red',fontWeight:"bold"}}>{errors.password}</p>}
                                        </Form.Group>

                                        <Form.Group className="mb-4">
                                            {/* <Form.Label>Confirm Password :</Form.Label> */}
                                            <Form.Control type="password" placeholder="Enter confirm password" name="cpassword" id="cpassword" onChange={handler} />
                                            {errors.cpassword && 
                                            <p style={{color:'red',fontWeight:"bold"}}>{errors.cpassword}</p>}
                                        </Form.Group>
                                        
                                        <Form.Group>
                                            <Button variant="dark" type="submit" onClick={(e)=>handleSubmit(e)}>Save</Button> &nbsp;&nbsp;
                                            <Button href="/profile" variant="dark">Back</Button> 
                                        </Form.Group>
                                    </Form>
                                    {/* Change Password form ends here */}
                                <hr/>  
                            </Card.Body>
                        </Card>
                    </Container>
                </Col>
            </Row>
        </div>
    )
}

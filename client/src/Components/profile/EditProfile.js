import React,{useState,useEffect} from 'react'
import { Row,Col,Card,Button, Container,Table, Form } from 'react-bootstrap'
import MyAccount from './MyAccount'
import Validation from '../common/Validation';
import {useNavigate} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { editProfile, getUserdetails } from '../../Config/MyServices';

export default function EditProfile() {

    const [details,setDetails] = useState('');
    const navigate = useNavigate();

    //Decoding toekn and takin email
    let token=localStorage.getItem('_token')
    let decode=  jwt_decode(token);
    let email = decode.oid
    
    //Getting user details from database
    useEffect(()=>{
        getUserdetails(email).then(res =>{
            console.log(res.data)
            setDetails(res.data);
        })
    },[])

    //Callback function called at validation file 
    //Functionality of edit profile
    const EditProfile = () => {
        console.log("Callback function when form is submitted!");
        let data= { values,email}
        editProfile(data).then(res=>{
            if(res.data.err){
                alert(res.data.msg)
            }
            else{
                alert(res.data.msg)
                navigate('/profile')
            }
        })
        console.log("Form values",values)
    }

    //Taking values and errors from validation file
    const {handler, values,errors,handleSubmit} = Validation(EditProfile);
    console.log(values)
    console.log(errors)

    return (
        <div className='p-3'>
            <h2 style={{textAlign:"left"}}>My Account</h2>
            <hr/>
            <Row>
                <Col md={6}>
                    <MyAccount />
                </Col>
                <Col md={6}>
                    <Container >
                        <Card style={{width:"500px", height:"450px", }} >
                            <Card.Body style={{ textAlign:"left"}}>
                                <Card.Title style={{textAlign:"left", fontSize:"30px" , fontWeight:"bold"}}> Edit Profile</Card.Title>
                                <hr/>
                                {/* Edit profile form begins here */}
                                    <Form >
                                        <Form.Group >
                                            <Form.Label>First Name:</Form.Label>
                                            <Form.Control type="text" placeholder="Enter firstname" defaultValue={details.fname} name="fname" id="fname" onChange={handler} />
                                            {errors.fname && 
                                            <div style={{color:'red',fontWeight:"bold"}}>{errors.fname}</div>}
                                        </Form.Group>

                                        <Form.Group >
                                            <Form.Label>Last Name:</Form.Label>
                                            <Form.Control type="text" placeholder="Enter lastname" defaultValue={details.lname} name="lname" id="lname" onChange={handler}  />
                                            {errors.lname && 
                                            <div style={{color:'red',fontWeight:"bold"}}>{errors.lname}</div>}
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Email:</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email" defaultValue={details.email} name="email" id="email" onChange={handler} />
                                            {errors.email && 
                                            <div style={{color:'red',fontWeight:"bold"}}>{errors.email}</div>}
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Contact Number:</Form.Label>
                                            <Form.Control type="number" placeholder="Enter contact number" defaultValue={details.contact} name="contact" id="contact" onChange={handler} />
                                            {errors.contact && 
                                            <div style={{color:'red',fontWeight:"bold"}}>{errors.contact}</div>}
                                        </Form.Group>
                                    </Form>
                                {/* Edit profile form ends here */}
                                <hr/>  
                                <Button variant="dark" onClick={(e)=>handleSubmit(e)}>Update</Button> &nbsp;&nbsp;
                                <Button href="/profile" variant="dark">Back</Button> 
                            </Card.Body>
                        </Card>
                    </Container>
                </Col>
            </Row>
        </div>
    )
}

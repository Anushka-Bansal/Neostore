import React, { useEffect, useState } from 'react'
import { Row,Col,Card,Button, Container,Table } from 'react-bootstrap'
import MyAccount from './MyAccount'
import jwt_decode from 'jwt-decode';
import { getUserdetails } from '../../Config/MyServices';

export default function Profile() {

    const [details,setDetails] = useState('');
    //decoding token
    let token=localStorage.getItem('_token')
    let decode=  jwt_decode(token);
    console.log(decode)  
    let email=decode.oid

    //Fetching user details from database
    useEffect(()=>{
        getUserdetails(email).then(res =>{
            console.log(res.data)
            setDetails(res.data);
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
                        <Card style={{width:"500px", height:"370px"}} >
                            {/* Profile card starts */}
                            <Card.Body style={{fontSize:"20px", fontWeight:"500px", textAlign:"left"}}>
                                <Card.Title style={{textAlign:"left", fontSize:"30px" , fontWeight:"bold"}}>Profile</Card.Title>
                                <hr/>
                                    <Table borderless>
                                        <tbody style={{fontWight:"bold"}}>
                                            <tr>
                                                <td>First Name :</td>
                                                <td>{details.fname}</td>
                                            </tr>
                                            <tr>
                                                <td>Last Name :</td>
                                                <td>{details.lname}</td>
                                            </tr>
                                            <tr>
                                                <td>Email :</td>
                                                <td>{details.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Contact Number:</td>
                                                <td>{details.contact}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                <hr/>  
                                <Button href="/edit-profile" variant="dark">Edit</Button> 
                            </Card.Body>  
                            {/* Profile card ends */} 
                        </Card>
                    </Container>
                </Col>
            </Row>
        </div>
    )
}

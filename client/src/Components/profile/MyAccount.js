import React,{useState,useEffect} from 'react'
import {Modal,Button, Row,Col,Card, Container, Form  } from 'react-bootstrap'
import { JustifyLeft,PersonCircle,JournalText,ArrowLeftRight, PersonBoundingBox} from 'react-bootstrap-icons'
import { getUserdetails } from '../../Config/MyServices';
import jwt_decode from 'jwt-decode'

export default function MyAccount() {
    const [details,setDetails] = useState('');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //decoding token
    let token=localStorage.getItem('_token')
    let decode=  jwt_decode(token);
    console.log(decode)  
    let email=decode.oid
    
    //Fetching user details from databse
    useEffect(()=>{
        getUserdetails(email).then(res =>{
            console.log(res.data)
            setDetails(res.data);
        })
    },[])
    console.log(details)

    return (
        <div>
            <Container>
                <img src="./Images/avtar.jpg"  alt="profile image"
                style={{height:"150px", width:"150px",border:"1px solid black" ,borderRadius:"50%"}} onClick={handleShow}  />
                <h3>{details.fname+ " "+ details.lname}</h3>
                <div style={{textAlign:"center", textDecoration:"none"}}>
                    <h5 className='pb-2'><a href="/order-details" style={{textDecoration:"none"}}><JustifyLeft /> &nbsp;&nbsp;Orders</a></h5>
                    <h5 className='pb-2'><a href="/profile" style={{textDecoration:"none"}}><PersonCircle /> &nbsp;&nbsp;Profile</a></h5>
                    <h5 className='pb-2'><a href="/addresses" style={{textDecoration:"none"}}><JournalText /> &nbsp;&nbsp;Addresses</a></h5>
                    <h5 className='pb-2'><a href="/change-password" style={{textDecoration:"none"}}><ArrowLeftRight /> &nbsp;&nbsp;Change Password</a></h5>
                </div>
                
                {/* <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>Upload Photo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form  >
                        <Form.Group className="mb-3" >
                            <Form.Label>Select A File</Form.Label>
                            <Form.Control type="file" name="file" id="file"  />  
                        </Form.Group>
                        <Form.Group>
                            <Button type="submit">Upload</Button>
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    </Modal.Footer>
                </Modal> */}
            </Container>
        </div>
    )
}

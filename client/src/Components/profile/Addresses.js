import React,{useState,useEffect} from 'react';
import {Modal,Button, Row,Col,Card, Container, Form } from 'react-bootstrap';
import { addAddress, getUserdetails,updateAddress } from '../../Config/MyServices';
import Validation from '../common/Validation';
import jwt_decode from 'jwt-decode';
import MyAccount from './MyAccount'

export default function Addresses() {

    //decoding token
    let token=localStorage.getItem('_token')
    let decode=  jwt_decode(token);
    let email = decode.oid

    const[address,setAddress] = useState([]);
    const [details,setDetails] = useState([]);
    
    //state for add address modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [edit , setEdit] = useState(false);
    const editClose = () => setEdit(false);
    const editShow = () => setEdit(true);

    //Fetching Address from user details
    useEffect(()=>{
        getUserdetails(email).then(res=>{
            setAddress(res.data.address);
        })
    },[])

    //Function to add new address
    const newAddress = (e) =>{
        e.preventDefault();
        let data={values,email}
        console.log(data)
        addAddress(data).then(res =>{
            if(res.data.err){
                alert(res.data.msg)
            }
            else{
                alert(res.data.msg)
                setShow(false)
            }
        })
    }

    //Function to get edit address value
    const editAddress= (e,value) =>{
        e.preventDefault()
        setEdit(true)
        setDetails(value)
    }

    //Function to update address 
    const updateAddress =() =>{
        // e.preventDefault();
        let detail={values,email}
        console.log(detail);
        updateAddress(detail).then(res=>{
            if(res.data.err){
                alert(res.data.msg)
            }
            else{
                alert(res.data.msg)
                setEdit(false)
            }
        })
    }

    //Taking values and errors from validation file
    const {handler, values,errors} = Validation();
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
                        <Card style={{width:"500px", height:"500px"}} >
                            <Card.Body style={{fontSize:"20px", fontWeight:"500px", textAlign:"left",overflow:"auto"}}>
                                <Card.Title style={{textAlign:"left", fontSize:"30px" , fontWeight:"bold"}}>Add Address</Card.Title>
                                <hr/>
                                {/* Map function to display added address starts */}
                                    {address.map((value,index)=>{
                                        return(
                                            <Card key={index} style={{width:"450px",height:"200px"}}>
                                                <Card.Body>
                                                    <Card.Title>Address {index+1}</Card.Title>
                                                    <Card.Text>{value.address}<br/>
                                                    {value.city} - {value.pincode}<br/>
                                                        {value.state}, {value.country} </Card.Text>
                                                    
                                                    <Button variant="primary" onClick={(e)=>editAddress(e,value)}>Edit</Button> &nbsp;&nbsp;
                                                    <Button variant="danger">Delete</Button>
                                                </Card.Body>
                                            </Card>
                                        )
                                    })}
                                {/* Map function to display added address ends */}
                                <hr/>  
                                <Button href="#" onClick={handleShow} variant="dark">Add Address</Button> 
                            </Card.Body>   
                        </Card>
                    </Container>
                </Col>
            </Row>
            {/* Add Address Modal starts here */}
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e)=>newAddress(e)} >
                        <Form.Group className="mb-3" >
                            <Form.Label>Address:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Address"   name="address" id="address" onChange={handler} />
                            {errors.address && 
                            <p style={{color:'red',fontWeight:"bold"}}>{errors.address}</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Pincode:</Form.Label>
                            <Form.Control type="text" placeholder="Enter pincode"  name="pincode" id="pincode" onChange={handler}  />
                            {errors.pincode && 
                            <p style={{color:'red',fontWeight:"bold"}}>{errors.pincode}</p>}
                        </Form.Group>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>City:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter City" name="city" id="city" onChange={handler}  />
                                    {errors.city && 
                                    <p style={{color:'red',fontWeight:"bold"}}>{errors.city}</p>}
                                </Form.Group>
                            </Col>

                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>State:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter State"  name="state" id="state" onChange={handler}  />
                                    {errors.state && 
                                    <p style={{color:'red',fontWeight:"bold"}}>{errors.state}</p>}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Country:</Form.Label>
                            <Form.Control type="text" placeholder="Enter country"  name="country" id="country" onChange={handler} />
                            {errors.country && 
                            <p style={{color:'red',fontWeight:"bold"}}>{errors.country}</p>}
                        </Form.Group>

                        <Form.Group>
                        <Button variant="primary" type="submit" >Add Address</Button>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}></Button>
                </Modal.Footer>
            </Modal>
            {/* Add Address Modal ends here */}

            {/* Edit Address Modal starts here */}
            <Modal show={edit} onHide={editClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group className="mb-3" >
                            <Form.Label>Address:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Address" defaultValue={details.address} name="address" id="address" onChange={handler} />
                            {errors.address && 
                            <p style={{color:'red',fontWeight:"bold"}}>{errors.address}</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Pincode:</Form.Label>
                            <Form.Control type="text" placeholder="Enter pincode" defaultValue={details.pincode} name="pincode" id="pincode" onChange={handler}  />
                            {errors.pincode && 
                            <p style={{color:'red',fontWeight:"bold"}}>{errors.pincode}</p>}
                        </Form.Group>

                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>City:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter City"  defaultValue={details.city} name="city" id="city" onChange={handler}  />
                                    {errors.city && 
                                    <p style={{color:'red',fontWeight:"bold"}}>{errors.city}</p>}
                                </Form.Group>
                            </Col>

                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>State:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter State" defaultValue={details.state} name="state" id="state" onChange={handler}  />
                                    {errors.state && 
                                    <p style={{color:'red',fontWeight:"bold"}}>{errors.state}</p>}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Country:</Form.Label>
                            <Form.Control type="text" placeholder="Enter country" defaultValue={details.country} name="country" id="country" onChange={handler} />
                            {errors.country && 
                            <p style={{color:'red',fontWeight:"bold"}}>{errors.country}</p>}
                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" onClick={updateAddress} >Update</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={editClose}> </Button>
                {/* <Button variant="primary" onClick={()=>updateAddress()}>Update</Button> */}
                </Modal.Footer>
            </Modal>
            {/* Edit Address Modal ends here */}
        </div>
    )
}

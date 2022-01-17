import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar,Button,Dropdown,DropdownButton, Form, FormControl } from 'react-bootstrap';
import { cartItems } from '../../Config/ProductServices';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { PersonCircle } from 'react-bootstrap-icons';

export default function Header() {
    const navigate = useNavigate();
    const isLogin =  localStorage.getItem('_token')!=undefined;
  
    //For showing cart count
    const [count,setCount] = useState(0);
    useEffect(()=>{
        let cartCount = JSON.parse(localStorage.getItem("mycart"));
        if(cartCount){
            setCount(cartCount.length);
        } 
    })

    //Logout button Fuctionality
    const logout=(e)=>{
        e.preventDefault();
        if(localStorage.getItem('_token')){
            let token=localStorage.getItem('_token')
            let decode=  jwt_decode(token);
            let email = decode.oid

        let items =  JSON.parse(localStorage.getItem("mycart"))
        let data={items,email}
        console.log(data)
        cartItems(data).then(res =>{
           
        })
        localStorage.clear();
        navigate("/login")
        }
        else{
            alert("error!!")
        }
    }

    return (
        <div>
            {/* Navigation Bar */}
            <Navbar bg="dark" fixed expand="lg" >
                <Container fluid>
                    <Navbar.Brand href="#" className="text-white text-bold"><h4>Neo<span className="text-danger">Store</span></h4></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarscroll" />
                    <Navbar.Collapse id="navbarscroll">
                        <Container
                            className="d-flex justify-content-center"
                            style={{ maxHeight: '100px', fontSize: "18px" }}>
                                {/* Nav links */}
                            <Nav.Link href="/" className="text-white">Home</Nav.Link>
                            <Nav.Link href="/products" className="text-white">Products</Nav.Link>
                            <Nav.Link href="/orders" className="text-white">Order</Nav.Link>
                        </Container>
                            {/* Search Bar */}
                        <Form className="d-flex ml-auto">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="mr-4"
                                aria-label="Search"
                            />&nbsp;&nbsp;
                        </Form> 

                        <Button className="mr-2 btn btn-light" href="/cart" > Cart({count})</Button>&nbsp;&nbsp;  
                           { isLogin ?
                        //    Dropdown after login(profile and logout)
                            <DropdownButton title={<PersonCircle style={{fontSize:"25px"}} />} id="dropdown-basic-button"  variant="light" style={{ marginRight: "20px" }} >
                                <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                                <Dropdown.Item onClick={(e)=>logout(e)}>Logout</Dropdown.Item>
                            </DropdownButton> :

                        //  Dropdown before login(login and register)
                            <DropdownButton title={<PersonCircle style={{fontSize:"25px"}} />} id="dropdown-basic-button"  variant="light" style={{ marginRight: "20px" }} >
                                <Dropdown.Item href="/login">Login</Dropdown.Item>
                                <Dropdown.Item href="/register">Register</Dropdown.Item>
                            </DropdownButton> 
                            }               
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

import React,{useState,useEffect} from 'react'
import { Card, Col, Row, Table, Button ,Form ,ProgressBar} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export default function Cart() {

    const [cart, setCart] = useState([]);
    const navigate = useNavigate()
    let total=[0]
    let subTotal ;
    let gst;
    let orderTotal;

    //setting cartitems from localstorage
    useEffect(() => {
        let cartItems = JSON.parse(localStorage.getItem("mycart"));
        setCart(cartItems);
    }, []);
    console.log(cart);

    //Funtionality to increase the quantity
    const onAdd = (product) => {
        const exist = cart.find((item) => item._id === product._id);
        if (exist) {
            cart.forEach((item) => {
                if (item._id === product._id) {
                    item.quantity = item.quantity + 1;
                }
            });
            setCart([...cart]);
            localStorage.setItem("mycart", JSON.stringify(cart));
        } else {
            cart.push(product);
            setCart([...cart]);
        }
    };

    //Functionality to decrease the quantity
    const onRemove = (product) => {
        const exist = cart.find((item) => item._id === product._id);
        if (exist.quantity === 1) {
        } else {
            cart.forEach((item) => {
                if (item._id === product._id) {
                    item.quantity = item.quantity - 1;
                }
            });
            setCart([...cart]);
            localStorage.setItem("mycart", JSON.stringify(cart));
        }
    };

    //Function to remove/delete item from cart
    const onDelete = (index) => {
        let lstore = JSON.parse(localStorage.getItem("mycart"));
        lstore.splice(index, 1);
        console.log(lstore);
        let setStore = JSON.stringify(lstore);
        localStorage.setItem("mycart", setStore);
        setCart(lstore);
    };

    //Functionality to proceed to buy 
    const proceedBuy=()=>{
       if( localStorage.getItem('_token')){
           //If there is nothing in cart u cant procedd further
            if(JSON.parse(localStorage.getItem("mycart")).length < 1){
                alert("OOPs!!! your cart is empty! Add some products to continue")
                navigate("/products")
            }
            //else proceed and set the items in localstorage 
            else{
            localStorage.setItem("subtotal",subTotal);
            localStorage.setItem("gst",gst);
            localStorage.setItem("total",orderTotal)
            console.log(subTotal)
            // alert("you can proced")
            navigate("/checkout")
            }
       }
       else{
           alert("Login required")
           navigate("/login")
       }
    }

    return (
        <div className='p-3'>
            {/* Progress Bar code starts */}
            <Row>
                <Col md={5} style={{textAlign:"left"}}>
                    Cart
                </Col>
                <Col style={{textAlign:"right"}}>
                    order placed
                </Col>
            </Row>
            <ProgressBar striped variant="warning" now={50} className='mb-4' />
            {/* Progress Bar code ends */}
            <Row>
                <Col md={9}>
                    <Card>
                        {/* Cart Table Starts */}
                        <Table >
                            <thead>
                                <tr>
                                    <th >Product</th>
                                    <th colSpan={3}>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {cart ? cart.map((value,index)=>{
                                return (         
                                    <tr  key={index}>
                                        <td>
                                            <Row>
                                                <Col md={5}>
                                                <img src={value.image} width="100px" height="80px"/>
                                                </Col>
                                                <Col md={5}>
                                                {value.name}
                                                </Col>
                                            </Row>
                                        </td>
                                        <td>
                                            <Button variant="dark"  onClick={() =>onRemove(value)} style={{borderRadius:"50%"}} >-</Button>
                                        </td>
                                        <td>
                                            <Form.Control type="number"  min="1" max="20" value={value.quantity}  />
                                        </td>
                                        <td>
                                            <Button variant="dark" onClick={() =>onAdd(value)} style={{borderRadius:"50%"}}>+</Button>
                                        </td>
                                        <td>
                                            {value.price}/-
                                        </td>
                                        <td>
                                            {value.quantity * value.price}/-
                                        </td>
                                        <td>
                                            <Button variant="danger" onClick={() =>onDelete(index)}>Delete</Button>
                                        </td>
                                        {console.log(
                                            total.push(
                                                value.price * value.quantity
                                            )
                                        )}
                                    </tr>
                                )
                            } ): " "}
                            </tbody>
                        </Table>
                        {/* Cart Table Ends */}
                    </Card>
                </Col>
                {/* Review Order card starts */}
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title style={{textAlign:"left", fontSize:"20px" , fontWeight:"bold"}}>Review Order</Card.Title>
                            <hr/>
                                <Table>
                                    <tbody style={{fontWight:"bold",textAlign:"left"}}>
                                        <tr>
                                            <td>SubTotal</td>
                                            <td>{subTotal=((total.reduce((result, number) => result + number))).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td>GST(5 %) </td>
                                            <td>{gst=((5/100)*subTotal).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td>Total</td>
                                            <td>{orderTotal=(parseFloat(subTotal)+parseFloat(gst)).toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Button variant="success" onClick={()=>proceedBuy()}>Proceed To Buy</Button>
                        </Card.Body>
                    </Card>
                </Col>
                {/* Review Order card ends */}
            </Row>
        </div>
    )
}

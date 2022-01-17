import React, { useState, useEffect } from 'react'
import {Container , Row, Col,Table,Button} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { invoiceDetails } from '../../Config/OrderServices';
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";

export default function Invoice() {
    const {id} = useParams();
    const[state,setState] = useState([]);
    const[items,setItems] = useState([]);
    console.log(id);

    //Fetching invoice detials by order id
    useEffect(()=>{
        invoiceDetails(id).then(res =>{
            console.log(res.data)
            setState(res.data);
            console.log(res.data.cart)
            setItems(res.data.cart);
        })
    },[])

    //Function to generate pdf
    const generatePdf = () => {
        const input = document.getElementById("divToPrint");
        console.log(input);
        html2canvas(input, { useCORS: true }).then((canvas) => {
            const pdf = new jsPDF();
            const img = canvas.toDataURL(
                "https://image.shutterstock.com/image-vector/invoice-typographic-stamp-sign-badge-260nw-1027820257.jpg"
            );
            pdf.addImage(img, "JPEG", 0, 0);
            alert("PDF is generated");
            pdf.save("Invoice.pdf");
        });
    };

    return (
        <div className="m-3 p-3">
            <Container>
                <Button variant="success" onClick={()=>generatePdf()}>Generate PDF</Button> &nbsp;
            </Container>
            <br/>
            <Container style={{ border: "1px solid black", width: "790px" }} id="divToPrint">
                <div >
                    <Row>
                        <Col md={3}>
                            <div className='m-4'>
                                <h1 >Neo<span style={{color:"crimson"}}>STORE</span></h1>
                            </div>
                        </Col>
                        <Col md={9}>
                            <h4 style={{textAlign:"right",padding:"20px"}}>Tax Invoice/Bill of Supply/Cash Memo</h4>
                            <h5 style={{textAlign:"right",paddingRight:"20px"}}>(Original for Recipient)</h5>
                        </Col>
                    </Row>
                </div>
                <hr/>
                <div>
                    <Row>
                        <Col md={3}>
                            <p  style={{textAlign:"left"}}>
                                <span style={{fontWeight: "bold",color: "gray"}}>SOLD BY:</span>
                                <br />
                                <span style={{ fontWeight: "bold" }}>NeoSTORE Pvt. Ltd.</span>
                                <br />
                                contact@neosofttech.com
                                <br />
                                9876543210
                            </p>
                            <br/>
                            <p style={{textAlign:"left"}}>
                            <span style={{fontWeight: "bold",color: "gray"}}>ORDER NUMBER:</span>
                            <br/>
                            <span style={{ fontWeight: "bold" }}>{state._id}</span>
                            <br/><br/>
                            </p> 
                        </Col>
                        <Col md={9}>
                        <p style={{textAlign:"right"}} >
                            <span style={{fontWeight: "bold",color: "gray"}}>SHIPPING ADDRESS :</span>
                            <br />
                                <span style={{ fontWeight: "bold" }}>{state.address}</span>
                            <br/>
                            </p>
                            <br/><br/><br/>
                            <p style={{textAlign:"right"}}>
                            <span style={{fontWeight: "bold",color: "gray"}}>ORDER DATE:</span>
                            <br/>
                            <span style={{ fontWeight: "bold" }}>{state.createdAt}</span>
                            </p>
                        </Col>
                    </Row>
                </div>
                <hr/>
                <div>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Map function to fetch product item in cart */}
                        {items.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{value.name}</td>
                                    <td>{value.price}</td>
                                    <td>{value.quantity}</td>
                                    <td>{value.price * value.quantity}</td>
                                </tr>
                            );
                        })}             
                        </tbody>
                    </Table>
                    <div style={{textAlign:"right"}}>
                        <h5>SubTotal : {state.subtotal}</h5>
                        <h5>GST(5%) : {state.gst}</h5>
                        <hr/>
                        <h5 style={{color:"red"}}>Total : {state.total}</h5>
                    </div>
                </div>
                <div>
                    <br />
                    Thank you !!!! for shopping with us
                </div>
                <br />
            </Container>
        </div>
    )
}

import React from "react";
import { Button, Col, Row } from "react-bootstrap";

export default function Footers() {
    return (
        <div>
            <footer>
                <div className="text-center bg-dark text-light p-2">
                    <Row>
                        <Col md={4}>
                            <h4>About Company</h4>
                            <div style={{ fontSize: "medium" }}>
                                NeoSOFT Technologies is here at your quick and
                                easy service for shopping
                                <br /><br/>
                                Contact Information
                                <br />
                                Email: contact@neosofttech.com
                                <br />
                                Phone: +91 0000000000
                                <br />
                                MUMBAI, INDIA
                            </div>
                        </Col>
                        <Col md={4}>
                            <h4>Information</h4>
                            <div style={{ fontSize: "medium" }}>
                                {/* Opening Term and condition pdf */}
                                <a
                                    href="/pdf/Terms_Conditions.pdf"
                                    target="_blank"
                                >
                                    Terms and conditions
                                </a>
                                <br />
                                Guarantee and Return Policy
                                <br />
                                Contact Us
                                <br />
                                Privacy Policy
                                <br />
                                {/* Opening location of neostore */}
                                <a href="https://goo.gl/maps/TxuRzZGBjQhud47e9" target="_blank">Locate Us</a>
                            </div>
                        </Col>
                        <Col md={4}>
                            <h4>Newsletter</h4>
                            <div style={{ fontSize: "medium" }}>
                                SignUp to get exclusive offer from our favorite
                                brands and to be well up in the news
                            </div>
                            <input
                                placeholder="Your email..."
                                style={{ fontSize: "medium" }}
                            />
                            <br /><br/>
                            <Button variant="light" size="sm">
                                Subscribe
                            </Button>
                        </Col>
                    </Row>
                    <p >
                        Copyright 2022 | NeoSOFT Technologies | All rights
                        reserved | Design By Anushka Bansal
                    </p>
                </div>
            </footer>
        </div>
    );
}
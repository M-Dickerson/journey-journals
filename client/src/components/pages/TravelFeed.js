import React from "react"
// links for react bootstrap styling
import "../../styles/TravelFeed.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';

export default function TravelFeed() {
    return (
        <Container>
            <Row>
                <Col>
                <h2>Travel Feed</h2>
                    <Card className="pfp">
                        <Image src="https://wallpapers-clan.com/wp-content/uploads/2022/05/cute-pfp-02.jpg" alt="profile picture" roundedCircle></Image>
                        <hr></hr>
                        <p>placeholder</p>
                        <p>placeholder</p>
                        <p>placeholder</p>
                    </Card>
                </Col>
                <Col>
                    <h3>Day 1</h3>
                    {/* do we want to use glide.js or bootstrap to carousel images? */}
                    <Carousel>
                        <Carousel.Item interval={3000}>
                            <img
                                className="d-block w-100"
                                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1421&q=80"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <img
                                className="d-block w-100"
                                src="https://images.unsplash.com/photo-1660657407520-6f3c703ceff0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
                                alt="Second slide"
                            />
                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://images.unsplash.com/photo-1515859005217-8a1f08870f59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1410&q=80"
                                alt="Third slide"
                            />
                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>
                {/* <Col>
                    <span>date</span> */}
                    {/* how are we handling comments and likes? */}
                    {/* <span>Comment/Like</span>
                </Col> */}
            </Row>
            <Row>
                {/* 3rd party API--recommendations, etc */}
            </Row>
        </Container>
    );
}
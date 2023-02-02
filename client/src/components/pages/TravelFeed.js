import React from "react"
// links for react bootstrap styling
import "../../styles/TravelFeed.css";
import { Container, Row, Card, Carousel, Form, Button } from "react-bootstrap";

export default function TravelFeed() {
    return (
        // PROFILE CARD
        <Container className="travel">
            {/* IMAGE CAROUSEL */}
            <Row>
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
            </Row>
            <Row className="commContainer">
                <Card>
                    <Form className="travelComment">
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={5} size="lg" type="text" placeholder="Your comment here"/>
                        </Form.Group>
                        <Button className="commentButton" as="input" type="submit" value="Submit" />{' '}
                    </Form>
                </Card>
            </Row>
            {/* TODO: Add dynamic post population here*/}
            <Row className="comments">
                <Card>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare aenean euismod elementum nisi. Pellentesque habitant morbi tristique senectus et netus. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus. Risus ultricies tristique nulla aliquet. Quis vel eros donec ac odio. Semper feugiat nibh sed pulvinar proin gravida. Odio eu feugiat pretium nibh ipsum. Ligula ullamcorper malesuada proin libero nunc consequat interdum. Tincidunt eget nullam non nisi. Arcu cursus vitae congue mauris. Vel turpis nunc eget lorem dolor sed viverra ipsum nunc. Quis ipsum suspendisse ultrices gravida.</p>
                    <a href="google.com" target="blank"><i class="fa-solid fa-trash"></i></a>
                </Card>
            </Row>
        </Container>
    );
}
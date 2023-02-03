import React from 'react';
import { Container, Row, Card, Form, Col, Image, Button } from "react-bootstrap";
import "../styles/TravelFeed.css";

const Post = ({ posts }) => {
    console.log(posts);
    if (!posts.length) {
        return <h3>No Posts Yet</h3>;
    }

    return (
        <>
            {posts.map((post) => (
                <Container key={post._id}className="travel">
                    <Card className="travelCon">
                        <Row className="image2">
                            <Col xl={6} sm={6} xs={6}>
                                <Image className="testPfp" src="https://i.imgur.com/kC72c8e.jpg" alt="profile picture" roundedCircle thumbnail></Image>
                            </Col>

                            <Col xl={6} sm={6} xs={6}>
                                <h5 className="travelText">{post.username}</h5>
                                <p className="travelText">{post.createdAt}</p>
                            </Col>

                            <Row xl={12} className="image2">
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Img className="travelImg" variant="top" src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1421&q=80" />

                                <Card.Body>
                                    <Card.Text>
                                        {post.description}
                                    </Card.Text>
                                </Card.Body>

                                <Form className="travelComment">
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Control as="textarea" rows={5} size="lg" type="text" placeholder="Your comment here" />
                                    </Form.Group>
                                    <Button className="commentButton" as="input" type="submit" value="Submit" />{' '}
                                </Form>
                            </Row>
                        </Row>
                    </Card>

                    <Row className="comments">
                        <Card xl={10}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare aenean euismod elementum nisi. Pellentesque habitant morbi tristique senectus et netus. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus. Risus ultricies tristique nulla aliquet. Quis vel eros donec ac odio. Semper feugiat nibh sed pulvinar proin gravida. Odio eu feugiat pretium nibh ipsum. Ligula ullamcorper malesuada proin libero nunc consequat interdum. Tincidunt eget nullam non nisi. Arcu cursus vitae congue mauris. Vel turpis nunc eget lorem dolor sed viverra ipsum nunc. Quis ipsum suspendisse ultrices gravida.</p>
                            <a href="google.com" target="blank"><i class="fa-solid fa-trash"></i></a>
                        </Card>
                    </Row>
                </Container>
            ))}
        </>
    )
};

export default Post;
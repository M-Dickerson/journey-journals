import React, { useState } from 'react';
import { Container, Row, Card, Form, Col, Image, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "../styles/TravelFeed.css";
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { ADD_COMMENT, DELETE_COMMENT } from '../utils/mutations';
import Auth from '../utils/auth';

const Post = ({ posts }) => {
    console.log(posts);
    const [commentText, setCommentText] = useState('');
    const [addComment, { error: errorAddComment } ] = useMutation(ADD_COMMENT);
    const [deleteComment, { error: errorDelComment } ] = useMutation(DELETE_COMMENT);

    const handleSubmitComment = async (postId, event) => {
        event.preventDefault();
        console.log('Handle Submit Comment');

        try {
            const { data } = await addComment({
                variables: {
                    text: commentText,
                    postId
                }
            });
            console.log(data);

            setCommentText('');
        } catch (err) {
            console.log(err);
        }
    };

    const handleCommentDelete = async (commentId, postId) => {
        console.log('Handle Delete Comment');

        try {
            const { data } = await deleteComment({
                variables: {
                    commentId,
                    postId
                }
            });
            console.log(data);

            setCommentText('');
        } catch (err) {
            console.log(err);
        }
    }

    if (!posts.length) {
        return <h3>No Posts Yet</h3>;
    }

    return (
        <>
            {posts.map((post) => (
                <Container key={post._id} className="travel">
                    <Card className="travelCon">
                        <Row className="image2">
                            <Col xl={6} sm={6} xs={6}>
                                <Image className="testPfp" src={post.userId.profileImage}/*"https://i.imgur.com/kC72c8e.jpg"*/ alt="profile picture" roundedCircle thumbnail></Image>
                            </Col>

                            <Col xl={6} sm={6} xs={8}>
                                {Auth.getProfile().data.username === post.username && 
                                    (<Link to={`/me`}><h5 className="travelText secondTravel">{post.username}</h5></Link>
                                    )}

                                {Auth.getProfile().data.username !== post.username &&
                                    (<Link to={`/profiles/${post.username}`}><h5 className="travelText">{post.username}</h5></Link>
                                    )}

                                <p className="travelText">{post.createdAt}</p>
                            </Col>

                            <Row xl={12} className="image2">
                                <Card.Title className="travelOther">
                                    <h2>{post.tripId.location}</h2> 
                                    <hr></hr>
                                    <h3>{post.title}</h3>
                                </Card.Title>
                                <Card.Img className="travelImg" variant="top" src=/*"https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1421&q=80"*/{post.image} />

                                <Card.Body>
                                    <Card.Text className="travelOther">
                                        {post.description}
                                    </Card.Text>
                                </Card.Body>

                                {/* Comment Form */}
                                <Form className="travelComment">
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Control as="textarea" rows={5} size="lg" type="text" placeholder="Your comment here" value={commentText} 
                                        onChange={(e) => setCommentText(e.target.value)}/>
                                    </Form.Group>
                                    <Button className="commentButton" as="input" type="submit" value="Submit" onClick={(event) => handleSubmitComment(post._id, event)} />{' '}
                                </Form>
                            </Row>
                        </Row>
                        <hr></hr>
                        
                        {post.comments.map((comment) => (
                            <Card xl={10} className="commentDark">
                                <p className='travelOther'>{comment.username}</p>
                                <p className='travelOther'>{comment.createdAt}</p>
                                <p className='travelOther'>{comment.text}</p>
                                {/* Only show trash can on comments that logged-in user made */}
                                {Auth.getProfile().data.username === comment.username && <i id="deleteComment" className="fa-solid fa-trash" onClick={() => { handleCommentDelete(comment._id, post._id) }}></i>}
                            </Card>
                        ))}
                    </Card>

                    {/* <Row className="comments">
                        {post.comments.map((comment) => (
                            <Card xl={10} className="commentDark">
                                <p className='travelOther'>{comment.username}</p>
                                <p className='travelOther'>{comment.createdAt}</p>
                                <p className='travelOther'>{comment.text}</p>
                                Only show trash can on comments that logged-in user made
                                {Auth.getProfile().data.username === comment.username && <i id="deleteComment" className="fa-solid fa-trash" onClick={() => { handleCommentDelete(comment._id, post._id) }}></i>}
                            </Card>
                        ))}
                    </Row> */}
                </Container>
            ))}
        </>
    )
};

export default Post;
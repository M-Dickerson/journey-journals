import React, { useState } from 'react';
import { Container, Row, Card, Form, Col, Image, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "../styles/TravelFeed.css";
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { ADD_COMMENT, DELETE_COMMENT, TOGGLE_LIKE_POST } from '../utils/mutations';
import Auth from '../utils/auth';

const Post = ({ posts }) => {
    const [commentText, setCommentText] = useState('');
    const [addComment, { error: errorAddComment } ] = useMutation(ADD_COMMENT);
    const [deleteComment, { error: errorDelComment } ] = useMutation(DELETE_COMMENT);
    const [toggleLikePost, _ ] = useMutation(TOGGLE_LIKE_POST);

    const handleSubmitComment = async (postId, event) => {
        event.preventDefault();

        try {
            const { data } = await addComment({
                variables: {
                    text: commentText,
                    postId
                }
            });
            setCommentText('');
        } catch (err) {
            console.log(err);
        }
    };

    const handleCommentDelete = async (commentId, postId) => {

        try {
            const { data } = await deleteComment({
                variables: {
                    commentId,
                    postId
                }
            });
            setCommentText('');
            // Reload page to show that comment count has decreased by 1
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const handleLikePost = async (postId, event) => {
        event.preventDefault();

        try {
            const { data } = await toggleLikePost({
                variables: {
                    postId
                }
            });

        } catch (err) {
            console.error(err);
        }
    };

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
                                <Image className="testPfp" src={post.userId.profileImage} alt="profile picture" roundedCircle thumbnail></Image>
                            </Col>

                            <Col xl={6} sm={6} xs={5}>
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
                                <Card.Img className="travelImg" variant="top" src={post.image} />

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

                                    <section className="d-flex justify-content-between">
                                        <Button className="commentButton" as="input" type="submit" value="Submit" onClick={(event) => handleSubmitComment(post._id, event)} />{' '}
                                        <section className="d-flex">
                                            {/* Comment icon and number of comments on post */}
                                            <h5 className="fs-4 mx-4"><i className="fa-solid fa-comment pt-2 px-1 fs-4"></i> {post.commentCount}</h5>

                                            {/* Render red heart icon to show logged-in user has already liked this post, render black heart otherwise */}
                                            {post.likes.find(user => user._id === Auth.getProfile().data._id) ? 
                                                (<h5 className="fs-4" onClick={(event) => handleLikePost(post._id, event)}> <i className="fa-solid fa-heart pt-2 px-1 fs-4" style={{color:"#F65275"}}></i> {post.likesCount}</h5>) 
                                                : (<h5 className="fs-4" onClick={(event) => handleLikePost(post._id, event)}> <i className="fa-solid fa-heart pt-2 px-1 fs-4"></i> {post.likesCount}</h5>)
                                            }
                                                
                                        </section>
                                    </section>
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
                </Container>
            ))}
        </>
    )
};

export default Post;
import React, { useState } from "react"
import { Navigate, useParams } from 'react-router-dom';
import Axios from 'axios';
// links for react bootstrap styling
import "../../styles/ProfilePage.css";
import { Container, Row, Col, Card, Image, Button, Modal } from "react-bootstrap";
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';

import Auth from '../../utils/auth';
import { GET_ME, GET_SINGLE_USER, GET_TRIPS_BY_USER, GET_POSTS_BY_TRIP/*, GET_TRIPS*/ } from '../../utils/queries';
import { ADD_TRIP, ADD_POST, DELETE_TRIP, DELETE_POST } from '../../utils/mutations';

export default function ProfilePage() {
    // seeTrips is true when rendering trips, false when rendering posts
    const [seeTrips, setSeeTrips] = useState(true);
    // currentTrip = tripId that user clicked on
    const [currentTrip, setCurrentTrip] = useState('');
    // tripPosts = array of posts associated with trip that user clicked on
    const [tripPosts, setTripPosts] = useState([]);
    // Below two are for whether to show modal form to add trip or add post
    const [showTripModal, setShowTripModal] = useState(false);
    const [showPostModal, setShowPostModal] = useState(false);
    // Keep track of input fields
    const [newLocation, setNewLocation] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [imageSelected, setImageSelected] = useState('');

    const { username: userParam } = useParams();
    const { loading, data } = useQuery(!userParam ? GET_ME : GET_SINGLE_USER, {
        variables: { username: userParam },
    });

    const profile = data?.me || data?.getSingleUser || {};
    console.log(profile);
    
    const [getPostsByTrip, { error: errorPosts, loading: loadingPosts, data: dataPosts }] = useLazyQuery(GET_POSTS_BY_TRIP);
    const { loading1, data1 } = useQuery(GET_TRIPS_BY_USER);

    // Mutations to add/delete trip & post 
    const [addTrip, { error: errorAddTrip }] = useMutation(ADD_TRIP);
    const [addPost, { error: errorAddPost }] = useMutation(ADD_POST);
    const [deleteTrip, { error: errorDeleteTrip }] = useMutation(DELETE_TRIP);
    const [deletePost, { error: errorDeletePost }] = useMutation(DELETE_POST);

    // If data isn't here yet, say so
    if (loading) {
        return <h2>LOADING...</h2>;
    }

    // Either show associated posts or delete trip
    const handleTripClick = async (tripId, event) => {
        console.log('Handle trip click');

        // Delete trip if user clicked on delete icon on the trip card
        if (event.target.id === 'deleteTrip') {
            console.log('delete trip');
            try {
                const { data } = await deleteTrip({
                    variables: {
                        tripId
                    }
                });
                console.log(data);
            } catch (err) {
                console.log(err);
            }
            setShowPostModal(false);
            window.location.reload();
        // Toggle seeTrips to false, set currentTrip, get posts from trip that was clicked on
        } else {
            setSeeTrips((prev) => !prev);
            setCurrentTrip(tripId);
            const { data } = await getPostsByTrip({
                variables: {
                    tripId
                }
            });
            console.log(data);
            setTripPosts(data.getPostsByTrip);
            console.log(tripPosts);
        }
    }

    // Toggle seeTrips to true if Go Back btn clicked
    const handleGoBack = () => {
        setSeeTrips((prev) => !prev);
    }

    // Submit form to add a new trip
    const handleAddTrip = async (event) => {
        event.preventDefault();
        console.log('Handle add trip');

        try {
            const { data } = await addTrip({
                variables: {
                    location: newLocation
                }
            });
            setShowTripModal(false);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    // Submit form to add a new post for a trip
    const handleAddPost = async (event) => {
        event.preventDefault();
        console.log('Handle add post');

        try {
            const { data } = await addPost({
                variables: {
                    postInfo: {
                        title: postTitle,
                        description: postDescription,
                        image: "",
                        tripId: currentTrip
                    }
                }
            });
            console.log(data);
            // REPLACE WITH APOLLO CACHE LATER
            setShowPostModal(false);
            window.location.reload();

        } catch (err) {
            console.log(err);
        }
    }

    // Delete post if user clicks on delete icon on post
    const handlePostDelete = async (postId) => {
        console.log('handle post delete');

        try {
            const { data } = await deletePost({
                variables: {
                    postId
                }
            });
            console.log(data);
            // REPLACE WITH APOLLO CACHE LATER
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    
    // const uploadImage = () => {
    //     console.log(imageSelected);
    //     // fetch axios
    //     const formData = new FormData();
    //     formData.append('file', imageSelected);
    //     formData.append('upload_present', 'fmzvmxkg');

    //     Axios.post('https://api.cloudinary.com/v1_1/dqax39nha/image/upload', formData)
    //         .then((response) => {
    //             console.log(response);
    //         });
    // };



    return (
        <Container className="profile">

            {/* <input type="file" onChange={(event) => {setImageSelected(event.target.files[0])}}/>
            <button onClick={uploadImage}>Upload Image</button> */}
            {/* <Row>
                <h2>Profile Page</h2>
            </Row> */}
            {/* Profile Card */}
            <Card className="pfp">
                <Row>
                    <Col xl={6} sm={6} xs={6}>
                        <Image src="https://i.imgur.com/kC72c8e.jpg" alt="profile picture" roundedCircle thumbnail></Image>
                        <hr></hr>
                        <h5>Trips: {profile.tripCount}</h5>
                        <h5>Posts: {profile.postCount}</h5>
                        <h5>Followers: {profile.followerCount}</h5>
                        {userParam &&
                            (<>
                                <Button className="travelButton" size="sm">
                                    Follow
                                </Button>
                                <Button className="travelButton" size="sm">
                                    Block
                                </Button>
                                <Button className="travelButton" size="sm">
                                    Message
                                </Button>
                            </>)
                        }
                    </Col>
                    <Col xl={6} sm={6} xs={6} >
                        <h3 className="travelText">{profile.username}</h3>
                        <p className="travelText">{profile.bio}</p>
                    </Col>
                </Row>
            </Card>

            {/* Render card to display either all of user's trips or posts */}
            <Card className="trips">
                <Row>
                    <Col xl={12} sm={6} xs={6} >
                        {seeTrips && <h1>{profile.username}'s Trips</h1>}
                        {/* Render card for each trip */}
                        {seeTrips &&
                            profile.trips.map((trip) => (
                                <Card key={trip._id} className="tTest text-center d-flex flex-row justify-content-between" onClick={(event) => handleTripClick(trip._id, event)} >
                                    <h2>{trip.location}</h2>
                                    {!userParam && <i id="deleteTrip" className="fa-solid fa-square-minus"></i>}
                                    
                                </Card>
                            ))
                        }

                        {!seeTrips && <h1>Posts</h1>}
                        {/* Render card for each post for the trip clicked on */}
                        {!seeTrips &&
                            (tripPosts.map((post) => (
                                <Card key={post._id} className="tTest d-flex flex-column justify-content-between">
                                    <section className="tTest d-flex justify-content-between">
                                        <h2>{post.title}</h2>
                                        {!userParam && <i id="deletePost" className="fa-solid fa-square-minus" onClick={() => { handlePostDelete(post._id) }}></i>}
                                    </section>
                                    <p>{post.description}</p>
                                    <p>{post.createdAt}</p>
                                </Card>
                            )))
                        }
                    </Col>
                    <Col>
                        {/* If rendering trip cards, show add trip button */}
                        {!userParam && seeTrips && <Button className="tripButton" onClick={() => setShowTripModal(true)}>Add a New Trip</Button>}
                        
                        {/* If rendering post cards, show add post and go back btns */}
                        {!userParam && !seeTrips && <Button className="tripButton" onClick={() => setShowPostModal(true)}>Add a New Post</Button>}

                        {!seeTrips && <Button className="tripButton" onClick={handleGoBack}>Go Back</Button>}

                        {/* Modal form to add new trip */}
                        <Modal
                            size='lg'
                            show={showTripModal}
                            onHide={() => setShowTripModal(false)}
                            aria-labelledby='add-trip-modal'
                            centered>

                            <Modal.Header closeButton>
                                <Modal.Title id='add-trip-modal'>
                                    Add a New Trip
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <form className="d-flex flex-column">
                                    <label htmlFor="trip-location">Location:</label>
                                    <input type='text' name="trip-location" onChange={(e) => setNewLocation(e.target.value)} />
                                    <Button className="tripButton" onClick={handleAddTrip}>Submit</Button>
                                </form>
                            </Modal.Body>
                        </Modal>

                        {/* Modal form to add new post */}
                        <Modal
                            size='lg'
                            show={showPostModal}
                            onHide={() => setShowPostModal(false)}
                            aria-labelledby='add-post-modal'
                            centered>

                            <Modal.Header closeButton>
                                <Modal.Title id='add-post-modal'>
                                    Add a New Post
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <form className="d-flex flex-column">
                                    <label htmlFor="title">Title:</label>
                                    <input type='text' name="title" onChange={(e) => setPostTitle(e.target.value)} />

                                    <label htmlFor="description">Description:</label>
                                    <textarea type="text" name="description" onChange={(e) => setPostDescription(e.target.value)} />

                                    <Button className="tripButton" onClick={handleAddPost}>Submit</Button>
                                </form>
                            </Modal.Body>
                        </Modal></Col>
                </Row>
            </Card>

            {/* If rendering trip cards, show add trip button */}
            {/* {seeTrips && <Button onClick={() => setShowTripModal(true)}>Add a New Trip</Button>} */}
            {/* If rendering post cards, show add post and go back btns */}
            {/* {!seeTrips && <Button onClick={() => setShowPostModal(true)}>Add a New Post</Button>} */}
            {/* {!seeTrips && <Button onClick={handleGoBack}>Go Back</Button>} */}

            {/* Modal form to add new trip */}
            {/* <Modal
                size='lg'
                show={showTripModal}
                onHide={() => setShowTripModal(false)}
                aria-labelledby='add-trip-modal'
                centered>

                <Modal.Header closeButton>
                    <Modal.Title id='add-trip-modal'>
                        Add a New Trip
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form className="d-flex flex-column">
                        <label htmlFor="trip-location">Location:</label>
                        <input type='text' name="trip-location" onChange={(e) => setNewLocation(e.target.value)} />
                        <button onClick={handleAddTrip}>Submit</button>
                    </form>
                </Modal.Body>
            </Modal> */}

            {/* Modal form to add new post */}
            {/* <Modal
                size='lg'
                show={showPostModal}
                onHide={() => setShowPostModal(false)}
                aria-labelledby='add-post-modal'
                centered>

                <Modal.Header closeButton>
                    <Modal.Title id='add-post-modal'>
                        Add a New Post
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form className="d-flex flex-column">
                        <label htmlFor="title">Title:</label>
                        <input type='text' name="title" onChange={(e) => setPostTitle(e.target.value)} />

                        <label htmlFor="description">Description:</label>
                        <textarea type="text" name="description" onChange={(e) => setPostDescription(e.target.value)} />

                        <button onClick={handleAddPost}>Submit</button>
                    </form>
                </Modal.Body>
            </Modal> */}
        </Container>
    );
}
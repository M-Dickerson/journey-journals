import React, { useState } from "react"
// links for react bootstrap styling
import "../../styles/ProfilePage.css";
import { Container, Row, Col, Card, Image, Button, Modal } from "react-bootstrap";
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';

import Auth from '../../utils/auth';
import { GET_ME, GET_TRIP } from '../../utils/queries';
import { ADD_TRIP, ADD_POST, DELETE_TRIP, DELETE_POST } from '../../utils/mutations';

export default function ProfilePage() {
    // seeTrips is true when rendering trips, false when rendering posts
    const [seeTrips, setSeeTrips] = useState(true);
    // currentTrip = tripId that user clicked on
    const [currentTrip, setCurrentTrip] = useState('');
    // tripPosts = array of posts associated with trip that user clicked on
    const [tripPosts, setTripPosts] = useState([]);
    // Below two are for whether to show modal form to add trip or add post
    const [showTripModal, setTripShowModal] = useState(false);
    const [showPostModal, setShowPostModal] = useState(false);
    // Keep track of input fields
    const [newLocation, setNewLocation] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');

    // GET_ME query to get info about user/profile
    const { loading, data } = useQuery(GET_ME);
    const profile = data?.me;
    console.log(profile);
    // GET_TRIP query to get specific trip info
    const [getTrip, { loadingGetTrip, errorGetTrip, dataGetTrip }] = useLazyQuery(GET_TRIP);

    // Mutations to add/delete trip & post 
    const [addTrip, { errorAddTrip }] = useMutation(ADD_TRIP);
    const [addPost, { errorAddPost }] = useMutation(ADD_POST);
    const [deleteTrip, { errorDeleteTrip }] = useMutation(DELETE_TRIP);
    const [deletePost, { errorDeletePost }] = useMutation(DELETE_POST);

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
                // REPLACE WITH APOLLO CACHE LATER
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
            // Toggle seeTrips to false, set currentTrip, get posts from trip that was clicked on
        } else {
            setSeeTrips((prev) => !prev);
            setCurrentTrip(tripId);
            const { data } = await getTrip({
                variables: {
                    tripId
                }
            });

            setTripPosts(data.getTrip.posts);
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
            console.log(data);
            // REPLACE WITH APOLLO CACHE LATER
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
                        tripId: currentTrip
                    }
                }
            });
            console.log(data);
            // REPLACE WITH APOLLO CACHE LATER
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

    return (
        <Container className="profile">
            {/* <Row>
                <h2>Profile Page</h2>
            </Row> */}
            {/* Profile Card */}
            <Card className="pfp">
                <Row>
                    <Col xl={6} sm={6} xs={6}>
                        <Image src="https://i.imgur.com/kC72c8e.jpg" alt="profile picture" roundedCircle thumbnail></Image>
                        <hr></hr>
                        <h5>Followers: {profile.followerCount}</h5>
                        <h5>Posts: {profile.postCount}</h5>
                        <h5>Trips: {profile.tripCount}</h5>
                        <Button className="travelButton" size="sm">
                            Follow
                        </Button>
                        <Button className="travelButton" size="sm">
                            Block
                        </Button>
                        <Button className="travelButton" size="sm">
                            Message
                        </Button>
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
                                <Card key={trip._id} className="text-center d-flex flex-row justify-content-between" onClick={(event) => handleTripClick(trip._id, event)} >
                                    <h2>{trip.location}</h2>
                                    <i id="deleteTrip" className="fa-solid fa-square-minus"></i>
                                </Card>
                            ))
                        }

                        {!seeTrips && <h1>Posts</h1>}
                        {/* Render card for each post for the trip clicked on */}
                        {!seeTrips &&
                            (tripPosts.map((post) => (
                                <Card key={post._id} className="d-flex flex-column justify-content-between">
                                    <section className="d-flex justify-content-between">
                                        <h2>{post.title}</h2>
                                        <i id="deletePost" className="fa-solid fa-square-minus" onClick={() => { handlePostDelete(post._id) }}></i>
                                    </section>
                                    <p>{post.description}</p>
                                    <p>{post.createdAt}</p>
                                </Card>
                            )))
                        }
                    </Col>
                    <Col>
                        {/* If rendering trip cards, show add trip button */}
                        {seeTrips && <Button className="tripButton" onClick={() => setTripShowModal(true)}>Add a New Trip</Button>}
                        {/* If rendering post cards, show add post and go back btns */}
                        {!seeTrips && <Button className="tripButton" onClick={() => setShowPostModal(true)}>Add a New Post</Button>}
                        {!seeTrips && <Button className="tripButton" onClick={handleGoBack}>Go Back</Button>}

                        {/* Modal form to add new trip */}
                        <Modal
                            size='lg'
                            show={showTripModal}
                            onHide={() => setTripShowModal(false)}
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
                                    <button className="tripButton" onClick={handleAddTrip}>Submit</button>
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

                                    <button className="tripButton" onClick={handleAddPost}>Submit</button>
                                </form>
                            </Modal.Body>
                        </Modal></Col>
                </Row>
            </Card>

            {/* If rendering trip cards, show add trip button */}
            {/* {seeTrips && <Button onClick={() => setTripShowModal(true)}>Add a New Trip</Button>} */}
            {/* If rendering post cards, show add post and go back btns */}
            {/* {!seeTrips && <Button onClick={() => setShowPostModal(true)}>Add a New Post</Button>} */}
            {/* {!seeTrips && <Button onClick={handleGoBack}>Go Back</Button>} */}

            {/* Modal form to add new trip */}
            {/* <Modal
                size='lg'
                show={showTripModal}
                onHide={() => setTripShowModal(false)}
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
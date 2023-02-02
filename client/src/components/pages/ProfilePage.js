import React, { useState } from "react"
// links for react bootstrap styling
import "../../styles/ProfilePage.css";
import { Container, Row, Col, Card, Image, Button, Modal, Tab, Nav } from "react-bootstrap";
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';

import Auth from '../../utils/auth';
import { GET_ME, GET_TRIP } from '../../utils/queries';
import { ADD_TRIP, ADD_POST, DELETE_TRIP, DELETE_POST } from '../../utils/mutations';

export default function ProfilePage() {
    const [seeTrips, setSeeTrips] = useState(true);
    const [currentTrip, setCurrentTrip] = useState('');
    const [tripPosts, setTripPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showPostModal, setShowPostModal] = useState(false);
    const [newLocation, setNewLocation] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');

    const { loading, data } = useQuery(GET_ME);
    const profile = data?.me;
    console.log(profile);

    const [getTrip, { loading1, error1, data1 }] = useLazyQuery(GET_TRIP);

    const [addTrip, { errorAddTrip }] = useMutation(ADD_TRIP);
    const [addPost, { errorAddPost }] = useMutation(ADD_POST);
    const [deleteTrip, { errorDeleteTrip }] = useMutation(DELETE_TRIP);
    const [deletePost, { errorDeletePost }] = useMutation(DELETE_POST);

    // If data isn't here yet, say so
    if (loading) {
        return <h2>LOADING...</h2>;
    }

    const handleTripClick = async (tripId, event) => {
        console.log('Handle Trip click');
        console.log(event.target.id);
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

    const handleGoBack = () => {
        setSeeTrips((prev) => !prev);
    }

    const handleSubmitTrip = async (event) => {
        event.preventDefault();
        console.log('Handle Submit Trip');
        try {
            console.log(newLocation);
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

    const handleSubmitPost = async (event) => {
        event.preventDefault();
        console.log('Handle Post Trip');
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
        <Container>
            <h2>Profile Page</h2>
            
            <Card className="pfp">
                <Row>
                    <Col xl={6} sm={6} xs={6}>
                        <Image src="https://wallpapers-clan.com/wp-content/uploads/2022/05/cute-pfp-02.jpg" alt="profile picture" roundedCircle thumbnail></Image>
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
                        <h3>{profile.username}</h3>
                        <p>{profile.bio}</p>
                    </Col>
                </Row>
            </Card>

            <Card>
                {seeTrips && <h1>Trips</h1>}
                {seeTrips &&
                    profile.trips.map((trip) => (
                        <Card key={trip._id} className="text-center d-flex flex-row justify-content-between" onClick={(event) => handleTripClick(trip._id, event)} >
                            <h2>{trip.location}</h2>
                            <i id="deleteTrip" className="fa-solid fa-square-minus"></i>
                        </Card>
                    ))
                }

                {!seeTrips && <h1>Posts</h1>}
                {/* ITERATE OVER POSTS */}
                {!seeTrips &&
                    (tripPosts.map((post) => (
                        <Card key={post._id} className="d-flex flex-column justify-content-between">
                            <section className="d-flex justify-content-between">
                                <h2>{post.title}</h2>
                                <i id="deletePost" className="fa-solid fa-square-minus" onClick={()=> {handlePostDelete(post._id)}}></i>
                            </section>
                            <p>{post.description}</p>
                        </Card>
                    )))
                }
            </Card>

            {seeTrips && <Button onClick={() => setShowModal(true)}>Add a New Trip</Button>}
            {!seeTrips && <Button onClick={() => setShowPostModal(true)}>Add a New Post</Button>}
            {!seeTrips && <Button onClick={handleGoBack}>Go Back</Button>}

            {/* Set modal data up */}
            <Modal
                size='lg'
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby='signup-modal'
                centered>

                <Modal.Header closeButton>
                    <Modal.Title id='login-modal'>
                        Add a New Trip
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form className="d-flex flex-column">
                        <label htmlFor="trip-location">Location:</label>
                        <input type='text' name="trip-location" onChange={(e) => setNewLocation(e.target.value)} />
                        <button onClick={handleSubmitTrip}>Submit</button>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal
                size='lg'
                show={showPostModal}
                onHide={() => setShowPostModal(false)}
                aria-labelledby='add-post-modal'
                centered>

                <Modal.Header closeButton>
                    <Modal.Title id='login-modal'>
                        Add a New Post
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form className="d-flex flex-column">
                        <label htmlFor="title">Title:</label>
                        <input type='text' name="title" onChange={(e) => setPostTitle(e.target.value)} />

                        <label htmlFor="description">Description:</label>
                        <textarea type="text" name="description" onChange={(e) => setPostDescription(e.target.value)} />

                        <button onClick={handleSubmitPost}>Submit</button>
                    </form>
                </Modal.Body>
            </Modal>

        </Container>
    );
}
import React, { useState } from "react"
// links for react bootstrap styling
import "../../styles/ProfilePage.css";
import { Container, Row, Col, Card, Image, Button, Modal, Tab, Nav } from "react-bootstrap";
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';

import Auth from '../../utils/auth';
import { GET_ME, GET_TRIP } from '../../utils/queries';
import { ADD_TRIP, ADD_POST, DELETE_TRIP } from '../../utils/mutations';

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

    // If data isn't here yet, say so
    if (loading) {
        return <h2>LOADING...</h2>;
    }



    return (
        <Container>


        </Container>
    );
}
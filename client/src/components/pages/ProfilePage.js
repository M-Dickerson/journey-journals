import React from "react"
// links for react bootstrap styling
import "../../styles/ProfilePage.css";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { useQuery, useMutation } from '@apollo/client';

import Auth from '../../utils/auth';
import { GET_ME } from '../../utils/queries';

export default function ProfilePage() {
    const { loading, data } = useQuery(GET_ME);
    console.log(data);
    const profile = data?.me;
    console.log(profile);

    // If data isn't here yet, say so
    if (loading) {
        return <h2>LOADING...</h2>;
    }

    return (
        <Container>
            <Col>
                <h2>Travel Feed</h2>
                <Card className="pfp">
                    <Image src="https://wallpapers-clan.com/wp-content/uploads/2022/05/cute-pfp-02.jpg" alt="profile picture" roundedCircle></Image>
                    <hr></hr>
                    <p>{profile.username}</p>
                    <p>{profile.email}</p>
                    <p>Bio: {profile.bio}</p>
                    <p>Posts: {profile.postCount}</p>
                    <p>Followers: {profile.followerCount}</p>
                </Card>
            </Col>


            <Card>
                <Row>
                    <p>Profile Info</p>
                    <p>Edit</p>
                    {/* profile picure: */}
                    <img alt="placeholder"></img>
                    <p>{profile.username}</p>
                    <p>{profile.email}</p>
                    <p>Bio: {profile.bio}</p>
                    <p>Posts: {profile.postCount}</p>
                    <p>Followers: {profile.followerCount}</p>

                    <ul>
                        {profile.trips.map((trip) => (
                            <li key={trip._id}>{trip.location}</li>
                        ))}
                    </ul>
                    <button>Follow Me</button>
                </Row>
                <Row>
                    <p>Saved places/places I want to visit:</p>
                </Row>
                <Row>
                    <p>Profile Info</p>
                    <p>Edit</p>
                </Row>
            </Card>
        </Container>
    );
}
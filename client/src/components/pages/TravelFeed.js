import React from 'react'



export default function TravelFeed() {
    return (
        <div>
            <h2>Travel Feed</h2>
            <div>
                <img>Profile Image</img>
                <span>title</span>
                <h3>Day 1</h3>
                <span>date</span>
                <img>Trip Images Here</img>
                <span>Description: </span>
                <p>***description text***</p>
                <span>Comment/Like</span>
            </div>
            <div>
                {/* 3rd party API--recommendations, etc */}
            </div>
        </div>
    );
}
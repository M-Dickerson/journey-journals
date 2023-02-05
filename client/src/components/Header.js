import React, { useState } from "react";
// pages that will contain information
import Landing from "./pages/Landing";
import TravelFeed from "./pages/TravelFeed";
import ProfilePage from "./pages/ProfilePage";
// link to navbar
import Navbar from "./Navbar";

export default function Header() {

    const [currentPage, setPage] = useState("Landing");

    const renderPage = () => {
        if (currentPage === "Landing") {
            return <Landing />;
        }
        if (currentPage === "TravelFeed") {
            return <TravelFeed />;
        }
        if (currentPage === "ProfilePage") {
            return <ProfilePage />;
        }
    };

    const handlePageChange = (page) => setPage(page);

    return (
        <div>
            <Navbar currentPage={currentPage} handlePageChange={handlePageChange} />
        </div>
    );
}
import React, { useState, useContext } from "react";
// pages that will contain information
import Landing from "./pages/Landing";
import TravelFeed from "./pages/TravelFeed";
import ProfilePage from "./pages/ProfilePage";
import { Button } from "react-bootstrap";
// link to navbar
import Navbar from "./Navbar";
import { DarkModeContext } from '../context/DarkModeContext';

export default function Header() {
    const { toggleDarkMode, darkMode } = useContext(DarkModeContext)
    console.log(darkMode)

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
            {/* {renderPage()} */}
            <Button className="darkButton" onClick={toggleDarkMode}>Feeling Dark?</Button>
        </div>
    );
}
import React, { useState } from "react";
// pages that will contain information
import Landing from "./pages/Landing";
// link to navbar
import Navbar from "./Navbar";

export default function Header() {
    const [currentPage, setPage] = useState("Landing");

    const renderPage = () => {
        if (currentPage === "Landing") {
            return <Landing />;
        }
    };

    const handlePageChange = (page) => setPage(page);

    return (
        <div>
            <Navbar currentPage={currentPage} handlePageChange={handlePageChange} />
            {renderPage()}
        </div>
    );
}
import React, { useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Landing from "../components/pages/Landing";
import TravelFeed from "../components/pages/TravelFeed";
import ProfilePage from "../components/pages/ProfilePage";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeContext } from "../context/DarkModeContext";

function Content() {
    const { darkMode } = useContext(DarkModeContext);
    return (
        <div className={darkMode ? 'content-dark' : 'content-light'}>
            <Router>
                <Header />
                <Routes>
                    <Route
                        path="/"
                        element={<Landing />}
                    />
                    <Route
                        path="/travelfeed"
                        element={<TravelFeed />}
                    />
                    <Route
                        path="/me"
                        element={<ProfilePage />}
                    />
                    <Route
                        path="/profiles/:username"
                        element={<ProfilePage />}
                    />
                    <Route
                        path="/logout"
                        element={<Landing />}
                    />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}
export default Content;
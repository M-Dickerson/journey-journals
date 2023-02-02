import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { DarkModeProvider } from "./context/DarkModeContext";

function App() {
    return (
        <div>
            <DarkModeProvider>
                <Header />
                <Footer />
            </DarkModeProvider>
        </div>
    );
}

// function Content() {
//     const { darkMode } = useContext();
//     return (
//         <div className={darkMode ? 'content-dark' : 'content-light'}>
//             <Header />
//             <Footer />
//         </div>
//     );
// }

export default App;
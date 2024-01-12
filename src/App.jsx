import { HashRouter } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import "./index.css";

function App() {
    return (
        <HashRouter>
            <Header />
            <Main />
            <Footer />
        </HashRouter>
    );
}

export default App;

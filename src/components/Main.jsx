import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/404";
import DeveloperDelete from "../pages/DeveloperDelete";
import DeveloperDetail from "../pages/DeveloperDetail";
import DeveloperForm from "../pages/DeveloperForm";
import Developers from "../pages/Developers";
import GameDelete from "../pages/GameDelete";
import GameDetail from "../pages/GameDetail";
import GameForm from "../pages/GameForm";
import Items from "../pages/Games";
import GenreDelete from "../pages/GenreDelete";
import GenreDetails from "../pages/GenreDetail";
import GenreForm from "../pages/GenreForm";
import Genres from "../pages/Genres";
import Home from "../pages/Home";
import Search from "../pages/Search";

function Main() {
    return (
        <main className="flex justify-center m-2 md:m-10">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search/:search" element={<Search />} />

                <Route path="/games" element={<Items />} />
                <Route path="/game/create" element={<GameForm />} />
                <Route path="/game/:name/update" element={<GameForm />} />
                <Route path="/game/:name/delete" element={<GameDelete />} />
                <Route path="/game/:name" element={<GameDetail />} />

                <Route path="/developers" element={<Developers />} />
                <Route path="/developer/create" element={<DeveloperForm />} />
                <Route path="/developer/:name/update" element={<DeveloperForm />} />
                <Route path="/developer/:name/delete" element={<DeveloperDelete />} />
                <Route path="/developer/:name" element={<DeveloperDetail />} />

                <Route path="/genres" element={<Genres />} />
                <Route path="/genre/create" element={<GenreForm />} />
                <Route path="/genre/:name/update" element={<GenreForm />} />
                <Route path="/genre/:name/delete" element={<GenreDelete />} />
                <Route path="/genre/:name" element={<GenreDetails />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </main>
    );
}

export default Main;

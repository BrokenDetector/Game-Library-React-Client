import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Header() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            navigate(`/search/${searchQuery.trim()}`);
        }
    };

    return (
        <header className="bg-[#171d25] h-fit text-white p-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <Link
                    className="text-3xl font-bold mb-2 md:mb-0 mr-2 lg:mr-0 hover:text-slate-300 active:text-slate-400 hover:underline"
                    to="/"
                >
                    GameLibrary
                </Link>
                <div className="flex items-center mt-4 md:mt-0 mr-2 lg:mr-0">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-2 py-1 border rounded-md focus:outline-none focus:border-blue-500 text-black"
                        onChange={(e) => {
                            e.preventDefault();
                            setSearchQuery(e.target.value);
                        }}
                    />
                    <button
                        className="ml-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-3 py-1 rounded-md"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4 text-lg mr-2 lg:mr-0">
                    <NavLink className="flex mt-4 md:mt-0 hover:text-slate-300 active:text-slate-400 hover:underline" to="/games">
                        Games
                    </NavLink>
                    <NavLink className="flex mt-4 md:mt-0 hover:text-slate-300 active:text-slate-400 hover:underline" to="/developers">
                        Developers
                    </NavLink>
                    <NavLink className="flex mt-4 md:mt-0 hover:text-slate-300 active:text-slate-400 hover:underline" to="/genres">
                        Genres
                    </NavLink>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4 text-lg">
                    <NavLink className="flex mt-4 md:mt-0 hover:text-slate-300 active:text-slate-400 hover:underline" to="/game/create">
                        Create Game
                    </NavLink>
                    <NavLink
                        className="flex mt-4 md:mt-0 hover:text-slate-300 active:text-slate-400 hover:underline"
                        to="/developer/create"
                    >
                        Create Developer
                    </NavLink>
                    <NavLink className="flex mt-4 md:mt-0 hover:text-slate-300 active:text-slate-400 hover:underline" to="/genre/create">
                        Create Genre
                    </NavLink>
                </div>
            </div>
        </header>
    );
}

export default Header;

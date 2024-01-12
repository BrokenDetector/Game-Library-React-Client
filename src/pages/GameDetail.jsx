import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

function GameDetail() {
    const [game, setGames] = useState({});
    const [dev, setDev] = useState({});
    const [genre, setGenre] = useState({ name: "" });
    const [isLoading, setLoading] = useState(true);

    const location = useLocation();
    const url = location.pathname.substr(6);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://game-library-api-gsub.onrender.com/api/game/${url}`);
            const data = await response.json();
            document.title = data.title;
            setGames(data.game);
            setDev(data.developer);
            if (data.genre != null) setGenre(data.genre);
            setLoading(false);
        };
        fetchData();
    }, [url]);

    return (
        <div>
            {isLoading ? (
                <LoadingScreen isLoading={isLoading} />
            ) : (
                <>
                    {!game ? (
                        <h1 className="font-bold text-2xl">Game not Found</h1>
                    ) : (
                        <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-6 md:min-w-[900px]">
                            <div className="flex flex-col md:flex-row -mx-4">
                                <div className="md:flex-1 px-4">
                                    <img
                                        src={`https://game-library-api-gsub.onrender.com/api/image/${game.imageUrl}`}
                                        alt="image"
                                        className="h-64 rounded-lg mb-4"
                                    />
                                </div>
                                <div className="md:flex-1 px-4">
                                    <h2 className="mb-2 font-bold leading-tight tracking text-2xl md:text-3xl">{game.title}</h2>
                                    By{" "}
                                    <Link to={`/developer/${dev.name}`} className="hover:underline text-sm text-indigo-400">
                                        {dev.name}
                                    </Link>
                                    <h3 className="mb-2 font-bold leading-tight tracking text-xl md:text-2xl text-gray-300">
                                        {genre.name}
                                    </h3>
                                    <p className="text-gray-400">{game.description}</p>
                                    <div className="md:flex-1 mt-10 px-4 flex gap-6">
                                        <Link to={`/game/${game.title}/update`}>
                                            <button className="h-14 px-6 py-2 font-semibold rounded-xl bg-green-700 hover:bg-green-600 active:bg-green-500">
                                                Update
                                            </button>
                                        </Link>
                                        <Link to={`/game/${game.title}/delete`}>
                                            <button className="h-14 px-6 py-2 font-semibold rounded-xl bg-red-800 hover:bg-red-700 active:bg-red-600">
                                                Delete
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default GameDetail;

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import LoadingScreen from "../components/LoadingScreen";

function GenreDelete() {
    const location = useLocation();
    const url = location.pathname.substr(7);
    const [genre, setGenre] = useState("");
    const [games, setGames] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://game-library-api-gsub.onrender.com/api/genre/${url}`);
            const data = await response.json();
            document.title = data.title;
            setGenre(data.genre);
            setGames(data.gamesInGenre);
            setLoading(false);
        };
        fetchData();
    }, [url]);

    const handleDelete = (e) => {
        e.preventDefault();

        const newGenre = {
            name: genre.name,
        };

        fetch(`https://game-library-api-gsub.onrender.com/api/genre/${url}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newGenre),
        })
            .then((res) => res.json())
            .then(() => {
                navigate("/genres");
            })
            .catch((error) => console.error(error));
    };

    return (
        <>
            {isLoading ? (
                <LoadingScreen isLoading={isLoading} />
            ) : (
                <div>
                    {games.length > 0 ? (
                        <div>
                            <h1 className="text-xl">Delete the following games before attempting to delete this genre.</h1>
                            <div className="grid grid-rows-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                                {games.map((game) => {
                                    let image = game.imageUrl;
                                    if (game.imageUrl == "" || game.imageUrl == null) image = "blank_image.png";

                                    return (
                                        <Link
                                            to={`/game/${game.title}`}
                                            key={uuid()}
                                            className="text-xl max-w-[358px] max-h-[266px] p-5 my-5 border-1-[#407999] bg-[#2e4f6f] rounded-lg shadow-lg flex flex-col"
                                        >
                                            <img
                                                className="max-w-full h-auto rounded-lg mb-4"
                                                src={`https://game-library-api-gsub.onrender.com/api/image/${image}`}
                                                alt="image"
                                            />
                                            <h2>{game.title}</h2>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p>Are you sure you want to delete this genre?</p>

                            <div className="flex justify-end mt-6">
                                <button
                                    className="mr-4 h-14 px-6 py-2 font-semibold rounded-xl bg-red-800 hover:bg-red-700 active:bg-red-600"
                                    onClick={handleDelete}
                                >
                                    Delete genre
                                </button>

                                <button
                                    className="h-14 px-6 py-2 font-semibold rounded-xl bg-gray-600 hover:bg-gray-500 active:bg-gray-400"
                                    onClick={() => navigate(`/genre/${genre.name}`)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default GenreDelete;

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";
import LoadingScreen from "../components/LoadingScreen";

function GenreDetails() {
    const location = useLocation();
    const url = location.pathname.substr(7);
    const [genre, setGenre] = useState("");
    const [games, setGames] = useState([]);
    const [isLoading, setLoading] = useState(true);

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

    return (
        <>
            {isLoading ? (
                <LoadingScreen isLoading={isLoading} />
            ) : (
                <>
                    {!genre ? (
                        <h1 className="font-bold text-3xl">Genre not Found</h1>
                    ) : (
                        <div className="w-full">
                            <h1 className="font-bold text-5xl">{genre.name}</h1>
                            <div className="flex flex-col">
                                {games.length > 0 ? (
                                    <div className="grid grid-rows-1 ml-5 mt-7">
                                        <h1 className="text-3xl">Games In Genre:</h1>
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
                                    <h1 className="text-3xl mt-5 ml-5">No Games</h1>
                                )}
                                <div className="flex flex-col ml-5">
                                    <h1>you will need to enter a code to update or delete this item</h1>
                                    <div className="md:flex-1 mt-10 px-4 flex gap-6">
                                        <Link to={`/genre/${genre.name}/update`}>
                                            <button className="h-14 px-6 py-2 font-semibold rounded-xl bg-green-700 hover:bg-green-600 active:bg-green-500">
                                                Update
                                            </button>
                                        </Link>
                                        <Link to={`/genre/${genre.name}/delete`}>
                                            <button className="h-14 px-6 py-2 font-semibold rounded-xl bg-red-800 hover:bg-red-700 active:bg-red-600">
                                                Delete
                                            </button>
                                        </Link>
                                        <Link to={`/report?prevPage=${location.pathname}`}>
                                            <button className="h-14 px-6 py-2 font-semibold rounded-xl bg-red-800 hover:bg-red-700 active:bg-red-600">
                                                Report this item
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default GenreDetails;

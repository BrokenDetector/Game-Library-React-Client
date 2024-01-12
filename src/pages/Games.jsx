import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

function Games() {
    const [games, setGames] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://game-library-api-gsub.onrender.com/api/games");
            const data = await response.json();
            document.title = data.title;

            setGames(data.allGames);
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <>
            {isLoading ? (
                <LoadingScreen isLoading={isLoading} />
            ) : (
                <div className="grid grid-rows-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {games.map((game) => {
                        let image = game.imageUrl;
                        if (game.imageUrl == "" || game.imageUrl == null) image = "blank_image.png";

                        return (
                            <Link
                                to={`/game/${game.title}`}
                                key={game._id}
                                role="game"
                                className="max-w-[358px] max-h-[266px] p-5 my-5 border-1-[#407999] bg-[#2e4f6f] rounded-lg shadow-lg flex flex-col"
                            >
                                <img
                                    className="max-w-full h-auto rounded-lg mb-4"
                                    src={`https://game-library-api-gsub.onrender.com/api/image/${image}`}
                                    alt="image"
                                />

                                <div>
                                    <h1 className="">{game.title}</h1>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </>
    );
}

export default Games;

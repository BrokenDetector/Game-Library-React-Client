import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function GameDelete() {
    const location = useLocation();
    const url = location.pathname.substr(6);
    const [game, setGame] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://game-library-api-gsub.onrender.com/api/game/${url}`);
            const data = await response.json();
            document.title = data.title;
            setGame(data.game);
        };
        fetchData();
    }, [url]);

    const handleDelete = (e) => {
        e.preventDefault();

        const gameObject = {
            name: game.title,
        };

        fetch(`https://game-library-api-gsub.onrender.com/api/game/${url}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(gameObject),
        })
            .then((res) => res.json())
            .then(() => {
                navigate("/games");
            })
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <p>Are you sure you want to delete this game?</p>

            <div className="flex justify-end mt-6">
                <button
                    className="mr-4 h-14 px-6 py-2 font-semibold rounded-xl bg-red-800 hover:bg-red-700 active:bg-red-600"
                    onClick={handleDelete}
                >
                    Delete Game
                </button>

                <button
                    className="h-14 px-6 py-2 font-semibold rounded-xl bg-gray-600 hover:bg-gray-500 active:bg-gray-400"
                    onClick={() => navigate(`/game/${game.title}`)}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default GameDelete;

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

function GameDelete() {
    const location = useLocation();
    const url = location.pathname.substr(6);
    const [game, setGame] = useState("");
    const [code, setCode] = useState("");
    const [errors, setErrors] = useState([]);

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
            body: JSON.stringify({ gameObject, code }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message) {
                    setErrors((prev) => {
                        return [...prev, data.message];
                    });
                } else {
                    navigate("/games");
                }
            })
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <p>Are you sure you want to delete this game?</p>

            <div className="flex flex-col gap-3 justify-end mt-6">
                <h1>Enter the code</h1>
                <input
                    className=" p-2 border border-gray-400 rounded-md mb-4 focus:outline-none focus:border-blue-500 text-black"
                    placeholder="Code"
                    onChange={(e) => setCode(e.target.value)}
                />
                {errors.length != 0 ? (
                    <div className=" -ml-2 bg-red-i00" role="errors">
                        {errors.map((error) => {
                            return (
                                <p key={uuid()} className="p-4 bg-red-500">
                                    {error}
                                </p>
                            );
                        })}
                    </div>
                ) : (
                    <div></div>
                )}
                <button
                    className="h-14 px-6 py-2 font-semibold rounded-xl bg-red-800 hover:bg-red-700 active:bg-red-600"
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

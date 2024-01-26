import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import LoadingScreen from "../components/LoadingScreen";

function DeveloperDelete() {
    const location = useLocation();
    const url = location.pathname.substr(11);
    const [dev, setDev] = useState("");
    const [games, setGames] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [code, setCode] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://game-library-api-gsub.onrender.com/api/developer/${url}`);
            const data = await response.json();
            document.title = data.title;
            setDev(data.developer);
            setGames(data.allGamesFromDeveloper);
            setLoading(false);
        };
        fetchData();
    }, [url]);

    const handleDelete = (e) => {
        e.preventDefault();

        const developer = {
            name: dev.name,
        };

        fetch(`https://game-library-api-gsub.onrender.com/api/developer/${url}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ developer, code }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message) {
                    setErrors((prev) => {
                        return [...prev, data.message];
                    });
                } else {
                    navigate("/developers");
                }
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
                            <h1 className="text-xl">Delete the following games before attempting to delete this developer.</h1>
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
                        <>
                            <p>Are you sure you want to delete this developer?</p>
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
                                    Delete Developer
                                </button>

                                <button
                                    className="h-14 px-6 py-2 font-semibold rounded-xl bg-gray-600 hover:bg-gray-500 active:bg-gray-400"
                                    onClick={() => navigate(`/developer/${dev.title}`)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export default DeveloperDelete;

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import LoadingScreen from "../components/LoadingScreen";

function ItemForm() {
    const location = useLocation();
    const url = location.pathname.substr(6);

    const [game, setGame] = useState("");
    const [developers, setDevelopers] = useState([]);
    const [genres, setGenres] = useState([]);

    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [developer, setDeveloper] = useState("");
    const [description, setDescription] = useState("");

    const [errors, setErrors] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const navigate = useNavigate();

    const [code, setCode] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://game-library-api-gsub.onrender.com/api/game/${url}`);
                const data = await response.json();
                document.title = data.title;
                if (data.message === "Game not found") {
                    setLoading(false);
                    setNotFound(true);
                    return;
                }

                if (data.game) {
                    setGame(data.game);
                    setTitle(data.game.title);
                    setGenre(data.game.genre);
                    setDeveloper(data.game.developer);
                    setDescription(data.game.description);
                }

                setDevelopers(data.allDevelopers);
                setGenres(data.allGenres);

                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [url]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        const formData = new FormData();

        formData.append("title", title);
        formData.append("dev", developer ? developer._id : "");
        formData.append("genre", genre ? genre._id : "");
        formData.append("description", description);
        formData.append("image", e.target.elements.image.files.length > 0 ? e.target.elements.image.files[0] : game.imageUrl);
        formData.append("code", code);

        fetch(`https://game-library-api-gsub.onrender.com/api/game/${url}`, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((newGame) => {
                if (newGame.error || newGame.message) {
                    setErrors((prev) => {
                        if (prev.find((err) => err == newGame.error)) return prev;
                        else if (prev.find((err) => err == newGame.message)) return prev;

                        return [...prev, newGame.error, newGame.message];
                    });
                } else if (newGame[0]) {
                    setErrors((prev) => {
                        return [...prev, newGame[0].msg];
                    });
                } else {
                    navigate("/games");
                }
            })
            .catch((error) => console.error(error));
    };
    const image = `https://game-library-api-gsub.onrender.com/api/image/${game.imageUrl}`;

    return (
        <>
            {isLoading ? (
                <LoadingScreen isLoading={isLoading} />
            ) : (
                <>
                    {notFound && <h1 className="font-bold text-2xl">Game not Found</h1>}
                    {!notFound && (
                        <form
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                            className="text-white max-w-7xl mx-auto px-4 lg:px-8 mt-6 md:min-w-[900px]"
                        >
                            <div className="flex flex-col md:flex-row -mx-4">
                                <div className="md:flex-1 px-4">
                                    <div
                                        className={"h-64 bg-white rounded-lg mb-4 flex items-center justify-center bg-cover bg-center"}
                                        style={{ backgroundImage: `url(${image})` }}
                                    >
                                        <input type="file" name="image" className="max-w-[500px]" />
                                    </div>
                                </div>
                                <div className="md:flex-1 px-4">
                                    <input
                                        name="title"
                                        className="mb-6 py-2 leading-tight tracking-tight border-b-2  font-bold bg-[#1b2838] text-2xl"
                                        placeholder="Title"
                                        required
                                        defaultValue={game ? game.title : ""}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setTitle(e.target.value.trim());
                                        }}
                                    />
                                    <p className="mb-2 text-sm">
                                        By{" "}
                                        <select
                                            name="dev"
                                            role="dev-select"
                                            className="mb-6 py-2 ml-1 border-b-2 bg-[#1b2838] w-[70%]"
                                            onChange={(e) => {
                                                e.preventDefault();
                                                // Find the selected developer object from the array
                                                const selectedDeveloper = developers.find((dev) => dev._id == e.target.value);
                                                setDeveloper(selectedDeveloper);
                                            }}
                                        >
                                            {developers.map((dev) => (
                                                <option
                                                    key={dev._id}
                                                    value={dev._id}
                                                    selected={
                                                        game ? (game.developer._id.toString() == dev._id ? "selected" : false) : false
                                                    }
                                                >
                                                    {dev.name}
                                                </option>
                                            ))}
                                        </select>
                                    </p>
                                    <select
                                        name="genre"
                                        role="genre-select"
                                        className="mb-6 py-2 border-b-2 bg-[#1b2838] w-[70%]"
                                        onChange={(e) => {
                                            e.preventDefault();

                                            // Find the selected genre object from the array
                                            const selectedGenre = genres.find((genre) => genre._id === e.target.value);
                                            setGenre(selectedGenre);
                                        }}
                                    >
                                        {genres.map((genre) => (
                                            <option
                                                key={genre._id}
                                                value={genre._id}
                                                selected={game ? (game.genre._id.toString() == game.genre._id ? "selected" : false) : false}
                                            >
                                                {genre.name}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        name="desc"
                                        className="mb-4 py-2 border-b-2 bg-[#1b2838]"
                                        placeholder="Game Description"
                                        defaultValue={game ? game.description : ""}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setDescription(e.target.value.trim());
                                        }}
                                    />
                                    <>
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
                                    </>

                                    <div className="flex py-4 flex-col">
                                        <h1>Enter the code</h1>
                                        <input
                                            className=" p-2 border border-gray-400 rounded-md mb-4 focus:outline-none focus:border-blue-500 text-black"
                                            placeholder="Code"
                                            onChange={(e) => setCode(e.target.value)}
                                        />
                                        <button
                                            type="submit"
                                            className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-400"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </>
            )}
        </>
    );
}

export default ItemForm;

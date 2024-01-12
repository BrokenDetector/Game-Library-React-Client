import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

function Home() {
    const [games, setGames] = useState("");
    const [developers, setDevelopers] = useState("");
    const [genres, setGenres] = useState("");
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://game-library-api-gsub.onrender.com/api/home");
            const data = await response.json();
            document.title = data.title;
            setGames(data.allGames.length);
            setDevelopers(data.allDevelopers.length);
            setGenres(data.allGenres.length);
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <>
            {isLoading ? (
                <LoadingScreen isLoading={isLoading} />
            ) : (
                <div className="w-full ml-20">
                    <h1 className="text-3xl">The library has the following record counts:</h1>
                    <div className="ml-10 mt-5 flex flex-col gap-4 text-xl w-fit">
                        <Link to={"/games"} className="hover:text-slate-300 active:text-slate-400 hover:underline">
                            <strong>Games: </strong>
                            {games}
                        </Link>
                        <Link to={"/genres"} className="hover:text-slate-300 active:text-slate-400 hover:underline">
                            <strong>Genres: </strong>
                            {genres}
                        </Link>
                        <Link to={"/developers"} className="hover:text-slate-300 active:text-slate-400 hover:underline">
                            <strong>Developers: </strong>
                            {developers}
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;

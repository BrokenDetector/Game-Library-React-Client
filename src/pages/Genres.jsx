import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import LoadingScreen from "../components/LoadingScreen";

function Genres() {
    const [genres, setGenres] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://game-library-api-gsub.onrender.com/api/genres");
            const data = await response.json();
            document.title = data.title;
            setGenres(data.allGenres);
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
                    <h1 className="text-3xl">All Genres:</h1>
                    <div className="ml-10 mt-5">
                        {genres.map((genre) => {
                            return (
                                <Link
                                    key={uuid()}
                                    to={`/genre/${genre.name}`}
                                    className="hover:text-slate-300 active:text-slate-400 hover:underline"
                                    role="genre"
                                >
                                    <h1 className="text-xl w-fit mb-3">{genre.name}</h1>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}

export default Genres;

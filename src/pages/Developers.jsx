import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import LoadingScreen from "../components/LoadingScreen";

function Developers() {
    const [developers, setDevelopers] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://game-library-api-gsub.onrender.com/api/developers");
            const data = await response.json();
            document.title = data.title;
            setDevelopers(data.allDevelopers);
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
                    <h1 className="text-3xl">All Developers:</h1>
                    <div className="ml-10 mt-5 w-fit">
                        {developers.map((dev) => {
                            return (
                                <Link
                                    role="dev"
                                    key={uuid()}
                                    to={`/developer/${dev.name}`}
                                    className="hover:text-slate-300 active:text-slate-400 hover:underline"
                                >
                                    <h1 className="text-xl mb-3">{dev.name}</h1>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}

export default Developers;

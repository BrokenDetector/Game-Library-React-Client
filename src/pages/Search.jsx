import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";
import LoadingScreen from "../components/LoadingScreen";

function Search() {
    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const location = useLocation();
    const url = location.pathname.substr(8);
    const [error, setErrors] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setErrors("");
            setItems([]);
            const response = await fetch(`https://game-library-api-gsub.onrender.com/api/search/${url}`);
            const data = await response.json();
            document.title = data.title;
            if (data.message) {
                setErrors(data.message);
            }
            setItems(data.searchResults);
            setLoading(false);
        };
        fetchData();
    }, [url]);

    return (
        <>
            {isLoading ? (
                <LoadingScreen isLoading={isLoading} />
            ) : (
                <div>
                    {error ? (
                        <div>
                            <p>{error}</p>
                        </div>
                    ) : (
                        <>
                            {items.map((item) => {
                                return (
                                    <Link
                                        to={`/${item.category}/${item.name || item.title}`}
                                        key={uuid()}
                                        className="flex flex-col sm:flex-row gap-2 mb-3 text-2xl hover:underline"
                                    >
                                        <h1 className="font-bold">{item.name || item.title}</h1>
                                        <h2 className="text-slate-500 ">{item.category}</h2>
                                    </Link>
                                );
                            })}
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export default Search;

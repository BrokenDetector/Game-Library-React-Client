import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import LoadingScreen from "../components/LoadingScreen";

function DeveloperForm() {
    const location = useLocation();
    const url = location.pathname.substr(11);
    const [errors, setErrors] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [dev, setDev] = useState("");

    const navigate = useNavigate();

    const [code, setCode] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://game-library-api-gsub.onrender.com/api/developer/${url}`);
            const data = await response.json();
            document.title = data.title;

            if (data.message == "Developer not found") {
                setLoading(false);
                setNotFound(true);
                return;
            }
            if (data.developer) {
                setDev(data.developer.name);
            }
            setLoading(false);
        };
        fetchData();
    }, [url]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        fetch(`https://game-library-api-gsub.onrender.com/api/developer/${url}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: e.target.elements.name.value.trim(), code }),
        })
            .then((res) => res.json())
            .then((newDev) => {
                if (newDev.error || newDev.message) {
                    setErrors((prev) => {
                        return [...prev, newDev.error, newDev.message];
                    });
                } else if (newDev[0]) {
                    setErrors((prev) => {
                        return [...prev, newDev[0].msg];
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
                <>
                    <>
                        {notFound && <h1 className="font-bold text-2xl">Developer not Found</h1>}
                        {!notFound && (
                            <form onSubmit={handleSubmit} className="text-white max-auto">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Developer name"
                                    required
                                    defaultValue={dev ? dev : ""}
                                    className="py-4 border-b-2 font-bold bg-[#1b2838] text-2xl"
                                />
                                <>
                                    {errors.length != 0 ? (
                                        <div className=" -ml-1 mt-4 bg-red-i00 m-6" role="errors">
                                            {errors.map((error) => {
                                                return (
                                                    <p key={uuid()} className="p-3 bg-red-500">
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
                            </form>
                        )}
                    </>
                </>
            )}
        </>
    );
}

export default DeveloperForm;

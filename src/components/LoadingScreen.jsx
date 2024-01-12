import { FadeLoader } from "react-spinners";

function LoadingScreen(isLoading) {
    return (
        <div className="flex flex-col justify-center items-center text-center w-full h-screen">
            <FadeLoader color="white" loading={isLoading} size={10} />
            <h1 className="font-bold">Loading...</h1>
        </div>
    );
}

export default LoadingScreen;

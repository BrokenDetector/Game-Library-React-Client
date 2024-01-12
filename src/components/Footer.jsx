function Footer() {
    return (
        <footer className="mt-auto py-3 h-fit text-center text-white text-base items-center flex justify-center">
            <p>
                Made by
                <a href="https://github.com/BrokenDetector" className="">
                    {" "}
                    BrokenDetector
                </a>{" "}
            </p>
            <img className="w-6 h-auto ml-1" src="./github-mark-white.svg" />
        </footer>
    );
}

export default Footer;

// ReportForm.js
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ReportForm() {
    const [reportMessage, setReportMessage] = useState("");
    const [isReportSubmitted, setReportSubmitted] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const reportData = {
            message: reportMessage,
            page: new URLSearchParams(location.search).get("prevPage"),
        };

        try {
            await fetch("https://game-library-api-gsub.onrender.com/api/report", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reportData),
            });

            setReportSubmitted(true);
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {isReportSubmitted ? (
                <div className="text-green-400">Report submitted successfully! Redirecting...</div>
            ) : (
                <div className="max-w-md mx-auto mt-8 p-6 bg-[#2e4f6f] rounded-md shadow-md">
                    <h1 className="block text-lg font-semibold mb-2">Report Form</h1>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-500 text-black"
                        value={reportMessage}
                        onChange={(e) => setReportMessage(e.target.value)}
                        placeholder="Write your report message..."
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={handleSubmit}>
                        Send Report
                    </button>
                </div>
            )}
        </>
    );
}

export default ReportForm;

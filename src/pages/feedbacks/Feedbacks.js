import React, { useEffect, useState } from "react";
import axios from "axios";

const Feedbacks = () => {
    const [allFeedbacks, setAllFeedbacks] = useState([]);
    const [isLoad, setIsLoad] = useState(true);

    useEffect(() => {
        if (isLoad) {
            axios
                .get("https://node.aryzap.com/api/feedback")
                .then((resp) => {
                    console.log(resp.data);
                    setAllFeedbacks(resp.data);
                })
                .catch((error) => {
                    console.error("Error fetching feedback data:", error);
                });
            setIsLoad(false);
        }
    }, [isLoad]);

    return (
        <>
            <div className="text-2xl font-bold pb-2 mb-5 border-b border-b-gray-500">
                Feedbacks
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead className="">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">#</th>
                            <th className="border border-gray-300 px-4 py-2">User ID</th>
                            <th className="border border-gray-300 px-4 py-2">Feedback</th>
                            <th className="border border-gray-300 px-4 py-2">Rating</th>
                            <th className="border border-gray-300 px-4 py-2">App</th>
                            <th className="border border-gray-300 px-4 py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allFeedbacks.map((feedback, index) => (
                            <tr key={feedback._id} className={index % 2 === 0 ? "" : ""}>
                                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{feedback.userId}</td>
                                <td className="border border-gray-300 px-4 py-2">{feedback.feedback}</td>
                                <td className="border border-gray-300 px-4 py-2">{feedback.rate}</td>
                                <td className="border border-gray-300 px-4 py-2">{feedback.app}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {new Date(feedback.addedAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Feedbacks;

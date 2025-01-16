import React, { useEffect, useState } from "react";
import BrainViewerCard from "../Cards/BrainViewerCard";
import axios from "axios";
import { useParams } from "react-router-dom"; // Adjust based on your routing library

export const BrainViewer: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [content, setContent] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { shareLink } = useParams<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!shareLink) {
          setError("No share link provided.");
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/brain/${shareLink}`);
        const { email, content } = response.data;

        setUserEmail(email);
        setContent(content);
       
      
      } catch (err: any) {
        setError(err.response?.data?.message || "An error occurred while fetching data.");
      }
    };


    fetchData();

  }, [shareLink]);

  return (
    <div className="container mx-auto pt-7 bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <p className="text-center pt-2 text-white font-mono">
            Shared by: <span className="font-semibold text-white">{userEmail}</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-5 pt-6">
            {content.map((item) => (
              <BrainViewerCard
                key={item._id}
                id={item._id}
                title={item.title}
                link={item.link}
                type={item.type}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

import React, { useEffect, useState } from "react";
import BrainViewerCard from "../Cards/BrainViewerCard";
import { useContent } from "../UseContent";

export const BrainViewer: React.FC = () => {
  const { content } = useContent();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("Email");
    setUserEmail(email);
  }, []);

  return (
    <div className="container mx-auto pt-7">
      <p className="text-center pt-2">Shared by: <span className="font-semibold">{userEmail}</span></p>

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
    </div>
  );
};
import React, { useEffect } from "react";
import { IoMdShareAlt } from "react-icons/io";

interface BrainViewerCardProps {
  id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube" | "documentation" | "notes" | "links";
}

const BrainViewerCard: React.FC<BrainViewerCardProps> = ({ title, link, type }) => {
  const getEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  useEffect(() => {
    if (type === "twitter") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [type]);

  return (
    <div className="p-4 rounded-lg border shadow-lg max-w-md md:max-w-lg lg:max-w-xl mb-6 transition-transform transform">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold truncate">{title}</h2>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <IoMdShareAlt size={24} className="hover:text-blue-500 transition-colors cursor-pointer" />
        </a>
      </div>

      {/* Conditional Content Rendering */}
      {type === "youtube" && (
        <div className="aspect-video rounded-lg overflow-hidden shadow-md">
          <iframe
            className="w-full h-full"
            src={getEmbedUrl(link)}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {type === "twitter" && (
        <div className="w-full">
          <blockquote className="twitter-tweet border border-gray-200 p-4 rounded-lg bg-gray-50">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        </div>
      )}

      {type === "documentation" && (
        <div className="w-full mt-4">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 transition-colors"
          >
            View Documentation
          </a>
        </div>
      )}

      {type === "notes" && (
        <div className="w-full mt-4">
          <p>{link}</p>
        </div>
      )}

{type === "links" && (
        <div className="w-full mt-4">
          <p className="cursor-pointer">{link}</p>
        </div>
      )}
    </div>
  );
};

export default BrainViewerCard;

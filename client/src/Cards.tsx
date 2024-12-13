import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdShareAlt } from "react-icons/io";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "documentation" | "notes" | "links"
  id: string; 
  onDelete: (id: string) => void; 
}

export const Card: React.FC<CardProps> = ({ title, link, type, id, onDelete }) => {
  const getEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  useEffect(() => {
    if (type === "twitter") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.setAttribute("charSet", "utf-8");
      document.body.appendChild(script);
    }
  }, [type]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token is missing. Please log in again.");
      return null;
    }
    return { Authorization: `Bearer ${token}` };
  };

  const handleDeleteTodo = async () => {
    const headers = getAuthHeaders();
    if (!headers) {
      console.warn("Authorization headers are missing. Aborting delete operation.");
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_BACKENDURL}/content/${id}`, { headers });
      onDelete(id);
    } catch (error: any) {
      console.error("Unable to delete item:", error);
      toast.error(error.response?.data?.message || "Unable to delete the item.");
    }
  };

  return (
    <div className="p-4 rounded-lg border shadow-lg max-w-md md:max-w-lg lg:max-w-xl  mb-6 transition-transform transform ">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold  truncate">{title}</h2>
      <div className="flex items-center space-x-4">
        <Link to={link} target="_blank">
          <IoMdShareAlt
            size={24}
            className=" hover:text-blue-500 transition-colors cursor-pointer"
          />
        </Link>
        <MdDelete
          size={24}
          className="text-red-500 hover:text-red-600 transition-colors cursor-pointer"
          onClick={handleDeleteTodo}
        />
      </div>
    </div>
  
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
        
        </a>
      </div>
    )}
  
    {type === "notes" && (
      <div className="w-full mt-4">
        <p >{link}</p>
      </div>
    )}



{type === "links" && (
      <div className="w-full mt-4">
        <p  >{link}</p>
      </div>
    )}
  </div>
  
  );
};

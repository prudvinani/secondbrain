import React from "react";
import { MdDelete } from "react-icons/md";
import { IoMdShareAlt } from "react-icons/io";
import { toast } from "sonner";
import axios from "axios";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "documentation" | "notes" | "links";
  id: string;
  onDelete: (id: string) => void;
}

export const CardArticle: React.FC<CardProps> = ({ title, link, type, id, onDelete }) => {
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
    <div className="p-4 rounded-lg border shadow-lg max-w-md md:max-w-lg lg:max-w-xl mb-6 transition-transform transform">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold truncate">{title}</h2>

       

        <div className="flex items-center space-x-4">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <IoMdShareAlt
              size={24}
              className="hover:text-blue-500 transition-colors cursor-pointer"
            />
          </a>
          <MdDelete
            size={24}
            className="text-red-500 hover:text-red-600 transition-colors cursor-pointer"
            onClick={handleDeleteTodo}
          />
        </div>
      </div>

      {type === "documentation" && (
        <div className="w-full mt-4">
     <a href={link} target="_blank">{link}</a>
         
        </div>
      )}
    </div>
  );
};

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useContent = () => {
  const [content, setContent] = useState<
    { _id: string; title: string; link: string; type: "youtube" | "twitter" | "documentation" | "notes" | "links" }[]
  >([]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token is missing. Please log in again.");
      return null;
    }
    return { Authorization: `Bearer ${token}` };
  };

  const fetchTodos = async () => {
    const headers = getAuthHeaders();
    if (!headers) return;

    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/contents`, { headers });
      setContent(response.data.message);
    } catch (error: any) {
      console.error("Error fetching todos:", error);
    }
  };

  const deleteContent = async (id: string) => {
    const headers = getAuthHeaders();
    if (!headers) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BACKENDURL}/content/${id}`, { headers });
      setContent((prevContent) => prevContent.filter((item) => item._id !== id));
      toast.success("Content deleted successfully.");
    } catch (error: any) {
      console.error("Error deleting content:", error);
      toast.error(error.response?.data?.message || "An error occurred while deleting the content.");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [content]);

  return { content, fetchTodos, deleteContent };
};

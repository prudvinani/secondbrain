import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

interface Tag {
  _id: string;
  name?: string; // If the Tag model has a `name` field
}

interface Content {
  title: string;
  link: string;
  type: string;
  tags: Tag[];
}

interface UserData {
  email: string;
  content: Content[];
}

const SharedBrain: React.FC = () => {
  const { shareLink } = useParams<{ shareLink: string }>();
  const [data, setData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedData = async () => {
      try {
        if (!shareLink) {
          setError("Invalid share link.");
          setIsLoading(false);
          return;
        }

        const response = await axios.get(
          `https://secondbrain-blue.vercel.app/brain/${shareLink}`
        );

        setData(response.data);
        setIsLoading(false);
        toast.success("Shared data loaded successfully!");
      } catch (err) {
        console.error(err);
        setError("Failed to load shared content. Please check the link.");
        setIsLoading(false);
      }
    };

    fetchSharedData();
  }, [shareLink]);

  if (isLoading) {
    return <div className="text-center mt-8">Loading shared content...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 mt-8">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shared Brain Content</h1>
      {data && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Shared by: {data.email}</h2>
          <ul className="space-y-4">
            {data.content.map((item, index) => (
              <li
                key={index}
                className="p-4 border border-gray-300 rounded-lg shadow-sm"
              >
                <h3 className="text-md font-bold">{item.title}</h3>
                <p className="text-sm text-gray-600">Type: {item.type}</p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Open Link
                  </a>
                )}
                {item.tags.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-sm font-semibold">Tags:</h4>
                    <ul className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <li
                          key={tag._id}
                          className="px-2 py-1 bg-gray-200 rounded-md text-xs"
                        >
                          {tag.name || "Untitled Tag"}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SharedBrain;

import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "../components/ui/alert-dialog";
import { toast } from "sonner";
import { FaPaste } from "react-icons/fa6";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import axios from "axios";

interface Props {
  trigger?: React.ReactNode;
}

const ShareBrainDialog: React.FC<Props> = ({ trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shareLink, setShareLink] = useState<string>("");
  const [sharedContent, setSharedContent] = useState<any>(null); // Store fetched data
  const navigate = useNavigate();

  // Generate a random share link (hash)
  const handleGenerateLink = () => {
    const hash = Math.random().toString(36).substr(2, 10); // Generate random hash
    setShareLink(hash);
  };

  // Handle share button click
  const handleShare = () => {
    if (!shareLink) return;

    navigator.clipboard.writeText(`${import.meta.env}/brain/${shareLink}`).then(() => {
      toast.success("ShareBrain link copied to clipboard!");
    });

    navigate(`/brain/${shareLink}`); // Redirect to the link
  };

  // Fetch shared content from backend when shareLink changes
  useEffect(() => {
    const fetchSharedContent = async () => {
      if (!shareLink) return;

      try {
        const response = await axios.get(`/brain/${shareLink}`); // Make GET request to backend
        setSharedContent(response.data); // Store fetched data
      } catch (error) {
        console.error("Error fetching shared content:", error);
        toast.error("Failed to load shared content. Please try again.");
      }
    };

    fetchSharedContent();
  }, [shareLink]);

  return (
    <>
      {trigger ? (
        React.cloneElement(trigger as React.ReactElement, {
          onClick: () => {
            setIsOpen(true);
            handleGenerateLink();
          },
        })
      ) : (
        <Button
          variant="default"
          onClick={() => {
            setIsOpen(true);
            handleGenerateLink();
          }}
        >
          Share Brain
        </Button>
      )}

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="w-[370px] md:w-[550px]">
          <AlertDialogHeader>
            <h3 className="font-semibold">Share Your Second Brain</h3>
            <p>
              Share your entire collection of notes, documents, tweets, and
              videos with others.
            </p>
          </AlertDialogHeader>

          {shareLink && (
            <div className="flex flex-col items-center mt-4">
              <QRCodeCanvas
                value={`${import.meta.env.VITE_BACKENDURL}/brain/${shareLink}`}
                size={150}
              />
              <p className="text-sm mt-2">Scan this QR code to access the shared content.</p>
            </div>
          )}

   

          <div className="flex items-center justify-center">
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleShare} className="mt-2 md:mt-0">
                <FaPaste /> Copy ShareBrain Link
              </AlertDialogAction>
              <AlertDialogCancel
                onClick={() => setIsOpen(false)}
                className="pt-2"
              >
                Cancel
              </AlertDialogCancel>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ShareBrainDialog;

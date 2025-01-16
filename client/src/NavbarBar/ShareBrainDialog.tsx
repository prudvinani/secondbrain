import  { useState } from "react";
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
import { Button } from "../components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const ShareBrainDialog= () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [shareLink, setShareLink] = useState<string>("");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token is missing. Please log in again.");
      return null;
    }
    return { Authorization: `Bearer ${token}` };
  };

  const handleShare = async () => {
    const headers = getAuthHeaders();
    if (!headers) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/brain/share`,
        { share: true },
        { headers }
      );

      const hash = response.data.hash; 
      const fullUrl = `${window.location.origin}/brain/${hash}`;
      setShareLink(fullUrl)
      console.log(fullUrl);

      toast.success("ShareBrain request was successful!");
      navigator.clipboard.writeText(fullUrl).then(() => {
        toast.success("ShareBrain link copied to clipboard!");
      });
    } catch (error) {
      console.error("Error sharing brain:", error);
      toast.error("Failed to share the brain.");
    }
  };

  const handleNavigate = () => {
    if (shareLink) {
      const hash = shareLink.split("/").pop();
      if (hash) navigate(`/brain/${hash}`);
    }
  };

  return (
    <>
     
        <Button
          variant="default"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Share Brain
        </Button>
    

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
              <QRCodeCanvas value={shareLink} size={150} /> {/* QR Code */}
              <p className="text-sm mt-2">Scan this QR code or use the link above.</p>
            </div>
          )}
          <div className="flex items-center justify-center">




            <AlertDialogFooter>
        {!shareLink  && <AlertDialogAction onClick={handleShare} className="mt-2 md:mt-0">
                <FaPaste /> Generate Share Link
              </AlertDialogAction>}
              {shareLink && (
                <AlertDialogAction
                  onClick={handleNavigate}
                  className="mt-2 md:mt-0"
                >
                  Go to Shared Brain
                </AlertDialogAction>
              )}
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

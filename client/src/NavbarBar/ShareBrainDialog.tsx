import React, { useState } from "react";
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
import { generateShareLink } from "../Cards/GenerateShareLink";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

interface Props {
  trigger?: React.ReactNode;
}

const ShareBrainDialog: React.FC<Props> = ({ trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shareLink, setShareLink] = useState<string>(""); 
  const navigate = useNavigate();

  const handleGenerateLink = () => {
    const newLink = generateShareLink();
    setShareLink(newLink);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      toast.success("ShareBrain code copied to clipboard!");
    });

    navigate(`https://secondbrain-blue.vercel.app/brain/${shareLink}`);
  };

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
              <QRCodeCanvas value={shareLink} size={150} /> 
              <p className="text-sm mt-2">Scan this QR code to access the shared content.</p>
            </div>
          )}
          <div className="flex items-center justify-center">
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleShare} className="mt-2 md:mt-0" >
                <FaPaste /> Copy ShareBrain {shareLink}
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

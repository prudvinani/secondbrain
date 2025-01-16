import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import { FaNoteSticky } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import { useContent } from "../UseContent";
import { Card } from "../Cards";
import { CiShare2 } from "react-icons/ci";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "../components/ui/alert-dialog";

import React from "react";
import { AlertDialogTrigger } from "../components/ui/alert-dialog";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";
import axios from "axios";

import { FaPaste } from "react-icons/fa6";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";

export function OriginalNotes() {
  // we are fetching data from the backedn

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const links = [
    {
      label: <span className="text-white">tweets</span>,
      href: "/tweets",
      icon: (
        <FaTwitter className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: <span className="text-white">Youtube</span>,
      href: "/youtube",
      icon: (
        <FaYoutube className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: <span className="text-white">Article</span>,
      href: "/article",

      icon: (
        <MdArticle className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: <span className="text-white">Notes</span>,
      href: "/notes",
      icon: (
        <FaNoteSticky className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: <span className="text-white">Links</span>,
      href: "/links",
      icon: (
        <FaLink className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className="w-full h-screen flex">
      <div
        className={cn(
          //bg-[#1a1625] dark:bg-[#1a1625]
          "flex flex-col md:flex-row  bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 w-full"
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10 bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-white">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden text-white">
              <div className="text-white">{open ? <Logo /> : <LogoIcon />}</div>
              <div className="mt-8 flex flex-col gap-2  text-white ">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div onClick={handleLogout} className="text-white">
              <CgProfile className="h-7 w-7 cursor-pointer flex-shrink-0 rounded-full text-white" />
            </div>
          </SidebarBody>
        </Sidebar>
        <Dashboard />
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      to="/home"
      className="font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20"
    >
      <div className="h-5 w-6  bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-white  rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-white dark:text-white whitespace-pre"
      >
        Second Brain
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      to="#"
      className="font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-gradient-to-b from-gray-900 via-purple-800 to-gray-900rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

const Dashboard = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>(""); // Now only a string, no File support
  const [type, setType] = useState<
    "youtube" | "twitter" | "notes" | "documentation" | "links"
  >("youtube");

  const { content, deleteContent } = useContent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !link) {
      toast.error("Title & Link/Description are required!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("User is not authenticated!");
        return;
      }

      const payload = { title, type, link };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/content`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Content added successfully!");
        setTitle("");
        setLink("");
        setOpen(false); // Close the dialog
      }
    } catch (error) {
      toast.error("Failed to add content.");
    }
  };

  // this is logic of the sharebrain logic
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
      setShareLink(fullUrl);
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
  }; //bg-[#1a1625]





  // fetching the youtube conent
  const NotesContent=content.filter((item)=>item.type ==="notes")
  return (
    //bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900
    <div className="flex flex-1">
      <div className="p-2 md:p-5 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700  flex flex-col gap-2 flex-1 w-full h-full bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 ">
        <div className="flex justify-between p-5 md:p-10">
          {/*  */}

          <p className="font-bold md:text-4xl text-white text-xl  "> Mybrain</p>

          <div className="flex items-center">
            {/* <Button className="mr-3">+ Create New</Button> */}
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button className="mr-3 border-white border-[1px]">
                  + Create New
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="md:w-[450px] w-[350px]  bg-[#1a1625] text-white">
                <p className="cursor-pointer text-right block ml-60 md:ml-80 text-2xl">
                  <p
                    className="font-semibold text-2xl"
                    onClick={() => setOpen(false)}
                  >
                    x
                  </p>
                </p>
                <AlertDialogHeader>
                  <Label className="text-left">Title</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                  />
                  <Label className="text-left">
                    {type === "notes" ? "Description" : "Link"}
                  </Label>
                  <Input
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder={
                      type === "notes" ? "Enter your description" : "Enter link"
                    }
                  />
                </AlertDialogHeader>
                <AlertDialogFooter className="pt-3 w-full">
                  <Select
                    onValueChange={(value) =>
                      setType(
                        value as
                          | "youtube"
                          | "twitter"
                          | "notes"
                          | "documentation"
                          | "links"
                      )
                    }
                    defaultValue={type}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Content Type</SelectLabel>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="notes">Notes</SelectItem>
                        <SelectItem value="links">Links</SelectItem>
                        <SelectItem value="documentation">Article</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </AlertDialogFooter>

                <Button
                  className="bg-[#5E43EC] hover:bg-[#4930c9] text-gray-100"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </AlertDialogContent>
            </AlertDialog>

            {/* <Button className="mr-2"> <CiShare2/> Share</Button> */}

            <>
              <Button
                variant="default"
                onClick={() => {
                  setIsOpen(true);
                }}
                className="border-white border-2"
              >
                <CiShare2 /> Share
              </Button>

              <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent className="w-[370px] md:w-[550px] bg-[#1a1625] text-white">
                  <AlertDialogHeader>
                    <h3 className="font-semibold">Share Your Second Brain</h3>
                    <p>
                      Share your entire collection of notes, documents, tweets,
                      and videos with others.
                    </p>
                  </AlertDialogHeader>
                  {shareLink && (
                    <div className="flex flex-col items-center mt-4">
                      <QRCodeCanvas value={shareLink} size={150} />{" "}
                      {/* QR Code */}
                      <p className="text-sm mt-2">
                        Scan this QR code or use the link above.
                      </p>
                    </div>
                  )}
                  <div className="flex items-center justify-center">
                    <AlertDialogFooter>
                      {!shareLink && (
                        <AlertDialogAction
                          onClick={handleShare}
                          className="bg-[#5E43EC] hover:bg-[#4930c9] text-gray-100"
                        >
                          <FaPaste /> Generate Share Link
                        </AlertDialogAction>
                      )}
                      {shareLink && (
                        <AlertDialogAction
                          onClick={handleNavigate}
                          className="mt-4 md:mt-0"
                        >
                          Go to Shared Brain
                        </AlertDialogAction>
                      )}
                      <AlertDialogCancel
                        onClick={() => setIsOpen(false)}
                        className="pt-2 bg-[#5E43EC]  text-gray-100"
                      >
                        Cancel
                      </AlertDialogCancel>
                    </AlertDialogFooter>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </>
          </div>
        </div>
        <div className=" mb-4">
          <div className="h-[1.5px]  bg-gradient-to-b from-gray-900 via-purple-900"></div>
        </div>

        {/* i want only this part should be scroll to y  */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {NotesContent.map((item) => (
                <Card
                  key={item._id}
                  id={item._id}
                  title={item.title}
                  link={item.link}
                  type={item.type}
                  onDelete={deleteContent}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

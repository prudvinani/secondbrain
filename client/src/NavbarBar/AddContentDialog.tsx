import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from "sonner";
import axios from "axios";
import { useTheme } from "../theme-provider";

interface AddContentDialogProps {
  trigger?: React.ReactNode; // Optional custom trigger
}

const AddContentDialog: React.FC<AddContentDialogProps> = ({ trigger }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { theme } = useTheme();
  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>(""); // Now only a string, no File support
  const [type, setType] = useState<"youtube" | "twitter" | "notes" | "documentation" | "links">("youtube");

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
      console.error(error);
      toast.error("Failed to add content.");
    }
  };

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          {trigger || <Button>Add Content</Button>}
        </AlertDialogTrigger>
        <AlertDialogContent className="md:w-[450px] w-[350px]">
          <p className="cursor-pointer text-right block ml-60 md:ml-80 text-2xl">
            <p className="font-semibold text-2xl" onClick={() => setOpen(false)}>x</p>
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
              placeholder={type === "notes" ? "Enter your description" : "Enter link"}
            />
          </AlertDialogHeader>
          <AlertDialogFooter className="pt-3 w-full">
            <Select
              onValueChange={(value) =>
                setType(
                  value as "youtube" | "twitter" | "notes" | "documentation" | "links"
                )
              }
              defaultValue={type}
            >
              <SelectTrigger
                className={`border rounded p-2 w-full text-sm ${
                  theme === "dark" ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
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
          <Button onClick={handleSubmit} className="w-full">
            Submit
          </Button>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AddContentDialog;

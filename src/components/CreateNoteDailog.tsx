"use client";
import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader2, Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
type Props = {};

const CreateNoteDailog = (props: Props) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const router = useRouter();
  const createNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/createNoteBook", {
        name: title,
        description: description,
      });
      return response.data;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === "") {
      window.alert("Please enter a title");
      return;
    }

    createNote.mutate(undefined, {
      onSuccess: ({ note_id }) => {
        console.log(note_id);
        console.log("created new note", note_id);
        router.push(`/notebook/${note_id}`);
      },
      onError: (error) => {
        console.error(error);
        window.alert("Failed to create new notebook");
      },
    });
  };
  return (
    <Dialog>
      <DialogTrigger>
        <div className="border-dashed border-2 flex  border-green-600  h-full rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4 ">
          <Plus className="w-6 h-6 text-green-600" strokeWidth={3} />
          <h2 className="font-semibold text-green-600 sm:mt-2">
            New Note Book
          </h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Note Book</DialogTitle>
          <DialogDescription>
            You can create a new note by clicking the button below.
          </DialogDescription>
        </DialogHeader>{" "}
        <form onSubmit={handleSubmit}>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title.."
          />
          <div className="m-4"></div>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description.."
          />

          <div className="m-4"></div>
          <div className="flex items-center gap-2 ">
            <Button type="reset" variant={"secondary"}>
              Cancel
            </Button>
            <Button
              disabled={createNote.isPending}
              type="submit"
              className="bg-green-600"
            >
              Create
              {createNote.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNoteDailog;

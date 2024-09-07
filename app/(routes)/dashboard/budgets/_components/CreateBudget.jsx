"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "@/hooks/use-toast";

function CreateBudget() {
  const [emojiIcon, setEmojiIcon] = useState("😮‍💨");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const { user } = useUser();
  // const email = user?.primaryEmailAddress?.emailAddress;

  // if (!email) {
  //   toast("Error: User not authenticated");
  //   return;
  // }

  const onCreateBudget = async () => {
    try {
      const result = await db
        .insert(Budgets)
        .values({
          name: name,
          amount: amount,
          icon: emojiIcon,
          createdBy: user?.primaryEmailAddress?.emailAddress,
        })
        .returning({ insertedid: Budgets.id });

      if (result) {
        toast({
          title: "Budget Created",
          description: "Your new budget has been successfully created.",
          variant: "default", // optional for styling
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "There was an issue creating the budget.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md">
            <h2>+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                {openEmojiPicker && (
                  <div className="absolute">
                    <EmojiPicker
                      onEmojiClick={(e) => {
                        setEmojiIcon(e.emoji);
                        setOpenEmojiPicker(false);
                      }}
                    />
                  </div>
                )}
                <div>
                  <h2 className="p-2 text-black font-medium">Budget Name</h2>
                  <Input
                    placeholder="e.g. Shopping"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <h2 className="p-2 text-black font-medium">Budget Amount</h2>
                  <Input
                    placeholder="e.g. ₹1000"
                    type="number"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <Button
                  disabled={!(name && amount)}
                  onClick={() => {
                    onCreateBudget();
                  }}
                  className="mt-5 w-full"
                >
                  Create Budget
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;

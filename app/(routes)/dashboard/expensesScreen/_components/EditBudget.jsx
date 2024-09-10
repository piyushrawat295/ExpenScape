"use client";

import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "@/hooks/use-toast";

function EditBudget({ budgetData, refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState(budgetData?.emojiIcon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState(budgetData?.name);
  const [amount, setAmount] = useState(budgetData?.amount);
  const { user } = useUser();

  useEffect(() => {
    if (budgetData) {
      setEmojiIcon(budgetData?.icon);
    }
  }, [budgetData]);

  const onUpdateBudget = async () => {
    const result = await db
      .update(Budgets)
      .set({
        name: name,
        amount: amount,
        icon: emojiIcon,
      })
      .where(eq(Budgets.id, budgetData.id))
      .returning();
    if (result) {
      refreshData();
      toast({
        title: "Budget Updated",
        description: "Your Budget has been Updated.",
      });
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex gap-2 items-center">
            <Button className="flex gap-2">
              <PenBox />
              Edit
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
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
                  <div className="absolute z-20">
                    <EmojiPicker
                      onEmojiClick={(e) => {
                        setEmojiIcon(e.emoji);
                        setOpenEmojiPicker(false);
                      }}
                    />
                  </div>
                )}
                <div className="mt-4">
                  <h2 className="p-2 text-black font-medium">Budget Name</h2>
                  <Input
                    placeholder="e.g. Shopping"
                    defaultValue={budgetData?.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <h2 className="p-2 text-black font-medium">Budget Amount</h2>
                  <Input
                    placeholder="e.g. ₹1000"
                    type="number"
                    defaultValue={budgetData?.amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={onUpdateBudget}
                className="mt-5 w-full"
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;

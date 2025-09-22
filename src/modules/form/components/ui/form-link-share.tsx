"use client";

import { toast } from "sonner";
import { Share2Icon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const FormLinkShare = ({ shareURL }: { shareURL: string }) => {
  const [isMounted, setIsMounted] = useState(false);
  const shareLink = `${window.location.origin}/submit/${shareURL}`;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex w-full items-center justify-between gap-4">
      <Input readOnly value={shareLink} />
      <Button
        className="w-[150px] md:w-[200px]"
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast.success("Link copied to clipboard");
        }}
      >
        <Share2Icon />
        Share link
      </Button>
    </div>
  );
};

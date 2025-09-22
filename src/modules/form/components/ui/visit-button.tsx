"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const VisitButton = ({ shareURL }: { shareURL: string }) => {
  const [isMounted, setIsMounted] = useState(false);
  const shareLink = `${window.location.origin}/submit/${shareURL}`;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Button
      className="w-[150px] md:w-[200px]"
      onClick={() => {
        window.open(shareLink, "_blank");
      }}
    >
      Visit
    </Button>
  );
};

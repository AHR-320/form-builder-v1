"use client";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

const ErrorPage = ({ error }: { error: Error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <h2 className="text-muted-foreground text-2xl">{error.message}</h2>
      <Button asChild variant="secondary">
        <Link href="/">
          <ArrowLeftIcon />
          Go back to home
        </Link>
      </Button>
    </div>
  );
};

export default ErrorPage;

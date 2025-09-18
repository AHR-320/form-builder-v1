import {
  ArrowRightIcon,
  EditIcon,
  FileInputIcon,
  ViewIcon,
} from "lucide-react";
import Link from "next/link";
import { formatDistance } from "date-fns";

import { Form } from "@/generated/prisma";
import { GetForms } from "@/actions/get-form-list";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FormCard = ({ form }: { form: Form }) => {
  return (
    <Card className="gap-4 py-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-4">
          <span className="truncate text-base font-bold">{form.name}</span>
          <Badge
            className="rounded-full px-2 pb-1"
            variant={form.published ? "default" : "destructive"}
          >
            {form.published ? "Published" : "Draft"}
          </Badge>
        </CardTitle>
        <CardDescription className="text-muted-foreground mt-2 flex items-center justify-between text-sm">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form.published && (
            <div className="flex items-center gap-2">
              <ViewIcon size={20} />
              <span>{form.visits.toLocaleString()}</span>
              <FileInputIcon size={20} />
              <span>{form.submissions.toLocaleString()}</span>
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground h-[20px] truncate text-sm">
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        {form.published ? (
          <Button asChild className="mt-2 w-full font-semibold">
            <Link href={`/forms/${form.id}`}>
              View submissions
              <ArrowRightIcon />
            </Link>
          </Button>
        ) : (
          <Button
            asChild
            variant="secondary"
            className="mt-2 w-full font-semibold"
          >
            <Link href={`/builder/${form.id}`}>
              Edit form
              <EditIcon />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export const FormCards = async () => {
  const forms = await GetForms();
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
};

export const FormCardsSkeleton = () => {
  return (
    <Skeleton className="border-primary/20 bg-accent/20 h-[190px] w-full rounded-lg border-2" />
  );
};

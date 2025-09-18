import { Suspense } from "react";
import {
  FileCheckIcon,
  FileInputIcon,
  Redo2Icon,
  ViewIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { GetFormStats } from "@/actions/form-stats";
import { CreateFormButton } from "@/components/create-form-button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormCards, FormCardsSkeleton } from "@/components/form-cards";

interface StatsCardProps {
  title: string;
  helperText: string;
  value: string;
  icon?: React.ReactNode;
  isLoding: boolean;
  className?: string;
}

export const StatsCard = ({
  title,
  helperText,
  value,
  icon,
  isLoding,
  className,
}: StatsCardProps) => {
  return (
    <Card className={cn("shadow-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-muted-foreground text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoding && (
            <Skeleton>
              <span>0</span>
            </Skeleton>
          )}
          {!isLoding && value}
        </div>
        <p className="text-muted-foreground pt-1 text-xs">{helperText}</p>
      </CardContent>
    </Card>
  );
};

interface StatsCardsProps {
  isLoading: boolean;
  data?: Awaited<ReturnType<typeof GetFormStats>>;
}

export const StatsCards = ({ isLoading, data }: StatsCardsProps) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total visits"
        icon={<ViewIcon className="text-blue-600" />}
        helperText="All time form visits"
        value={data?.visits.toLocaleString() || ""}
        isLoding={isLoading}
        className="shadow-blue-600"
      />
      <StatsCard
        title="Total submissions"
        icon={<FileInputIcon className="text-yellow-600" />}
        helperText="All time form submissions"
        value={data?.submissions.toLocaleString() || ""}
        isLoding={isLoading}
        className="shadow-yellow-600"
      />
      <StatsCard
        title="Submission rate"
        icon={<FileCheckIcon className="text-green-600" />}
        helperText="Visits that result in form submission"
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        isLoding={isLoading}
        className="shadow-green-600"
      />
      <StatsCard
        title="Bouncing rate"
        icon={<Redo2Icon className="text-red-600" />}
        helperText="Visits that leaves without interacting"
        value={data?.bounceRate.toLocaleString() + "%" || ""}
        isLoding={isLoading}
        className="shadow-red-600"
      />
    </div>
  );
};

export const CardStatsWrapper = async () => {
  const stats = await GetFormStats();

  return <StatsCards isLoading={false} data={stats} />;
};

const DashboardPage = () => {
  return (
    <div className="flex w-full flex-col space-y-8 p-4 md:px-8">
      <Suspense fallback={<StatsCards isLoading />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="opacity-30" />
      <h2 className="col-span-2 text-3xl font-bold">Your forms</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CreateFormButton />
        <Suspense
          fallback={[...Array(3)].map((_, index) => (
            <FormCardsSkeleton key={index} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardPage;

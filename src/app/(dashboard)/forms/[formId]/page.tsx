import { getFormById, getFormWithSubmissions } from "@/actions/get-form";

import { StatsCards } from "../../page";

import { VisitButton } from "@/modules/form/components/ui/visit-button";
import { FormLinkShare } from "@/modules/form/components/ui/form-link-share";

import {
  ElementsType,
  FormElementInstance,
} from "@/modules/form-builder/components/form-elements";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistance } from "date-fns";

interface FormDetailsProps {
  params: Promise<{
    formId: string;
  }>;
}

const FormDetailsPage = async ({ params }: FormDetailsProps) => {
  const { formId } = await params;

  const form = await getFormById(Number(formId));

  if (!form) {
    throw new Error("Form not found");
  }

  const { visits, submissions } = form;

  let submissionRate = 0;
  let bounceRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
    bounceRate = 100 - submissionRate;
  }

  return (
    <div className="px-4 md:px-8">
      <div className="border-muted border-b py-10">
        <div className="flex w-full items-center justify-between gap-4">
          <h1 className="truncate text-2xl font-bold md:text-3xl">
            {form.name}
          </h1>
          <VisitButton shareURL={form.shareURL} />
        </div>
      </div>
      <div className="border-muted border-b py-4">
        <div className="w-full">
          <FormLinkShare shareURL={form.shareURL} />
        </div>
      </div>
      <div className="w-full">
        <StatsCards
          isLoading={false}
          data={{ visits, submissions, submissionRate, bounceRate }}
        />
      </div>
      <div className="w-full pt-10">
        <SubmissionsTable id={form.id} />
      </div>
    </div>
  );
};

export default FormDetailsPage;

type Row = { [key: string]: string } & {
  submittedAt: Date;
};

async function SubmissionsTable({ id }: { id: number }) {
  const form = await getFormWithSubmissions(id);

  if (!form) {
    throw new Error("Form not found");
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];

  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case "TextField":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        });
        break;

      default:
        break;
    }
  });

  const rows: Row[] = [];

  form.FormSubmission.forEach((submission) => {
    const content = JSON.parse(submission.content);

    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });

  return (
    <>
      <h1 className="my-4 text-2xl font-bold">Submissions</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className="uppercase">
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="to-muted-foreground text-right uppercase">
                Submitted at
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <RowCell
                    key={column.id}
                    type={column.type}
                    value={row[column.id]}
                  />
                ))}
                <TableCell className="text-muted-foreground text-right">
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

function RowCell({ type, value }: { type: ElementsType; value: string }) {
  const node: React.ReactNode = value;

  return <TableCell>{node}</TableCell>;
}

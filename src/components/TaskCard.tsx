import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate, parseTaskParams, truncateText } from "@/lib/utils";
import { Task } from "@/types";
import { TaskApprovalDialog } from "@/components/TaskApprovalDialog";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User, Building, FileText } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onActionComplete: (isApproved: boolean) => void;
}

export function TaskCard({ task, onActionComplete }: TaskCardProps) {
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

  const openApprovalDialog = () => setApprovalDialogOpen(true);
  const closeApprovalDialog = () => setApprovalDialogOpen(false);
  
  const openRejectDialog = () => setRejectDialogOpen(true);
  const closeRejectDialog = () => setRejectDialogOpen(false);

  const params = parseTaskParams(task.params);
  const workerInfo = params?.find((section: any) => section.Name === "worker_information");
  const workerAttributes = workerInfo?.Attributes || [];
  
  const getAttributeValue = (name: string) => {
    const attribute = workerAttributes.find((attr: any) => attr.Name === name);
    return attribute?.Value || "N/A";
  };

  const fullNameEn = getAttributeValue("full_name_en");
  const passportNumber = getAttributeValue("passport_number");
  const establishmentId = getAttributeValue("establishment_id");
  const profession = getAttributeValue("profession_id");

  return (
    <Card className="w-full border-l-4 border-l-primary-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">
            <span className="text-primary-300">{truncateText(fullNameEn, 30)}</span>
          </CardTitle>
          <Badge variant="outline" className="bg-accent-100/20">
            {task.transaction_id}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary-200" />
            <span className="text-muted-foreground">Passport:</span>
            <span className="font-medium">{passportNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-primary-200" />
            <span className="text-muted-foreground">Establishment:</span>
            <span className="font-medium">{establishmentId}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary-200" />
            <span className="text-muted-foreground">Profession:</span>
            <span className="font-medium">{profession}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary-200" />
            <span className="text-muted-foreground">Modified:</span>
            <span className="font-medium">{formatDate(task.modified_at)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          className="border-destructive text-destructive hover:bg-destructive/10"
          onClick={openRejectDialog}
        >
          Reject
        </Button>
        <Button size="sm" onClick={openApprovalDialog}>
          Approve
        </Button>
      </CardFooter>

      <TaskApprovalDialog
        isOpen={approvalDialogOpen}
        onClose={closeApprovalDialog}
        taskId={task.id}
        action="approve"
        onSuccess={() => onActionComplete(true)}
      />

      <TaskApprovalDialog
        isOpen={rejectDialogOpen}
        onClose={closeRejectDialog}
        taskId={task.id}
        action="reject"
        onSuccess={() => onActionComplete(false)}
      />
    </Card>
  );
}
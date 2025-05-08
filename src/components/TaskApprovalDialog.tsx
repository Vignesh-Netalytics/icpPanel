import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { approveTask, rejectTask } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface TaskApprovalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
  action: "approve" | "reject";
  onSuccess: () => void;
}

export function TaskApprovalDialog({
  isOpen,
  onClose,
  taskId,
  action,
  onSuccess,
}: TaskApprovalDialogProps) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAction = async () => {
    if (!comment.trim()) {
      toast({
        title: "Comment Required",
        description: "Please provide a comment before proceeding.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const payload = { task_id: taskId, comment };
      
      if (action === "approve") {
        await approveTask(payload);
        toast({
          title: "Task Approved",
          description: "The task has been successfully approved.",
        });
      } else {
        await rejectTask(payload);
        toast({
          title: "Task Rejected",
          description: "The task has been rejected.",
        });
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      toast({
        title: `Failed to ${action} task`,
        description: `An error occurred while trying to ${action} the task.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {action === "approve" ? "Approve Task" : "Reject Task"}
          </DialogTitle>
          <DialogDescription>
            Please provide a comment before {action === "approve" ? "approving" : "rejecting"} this task.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment here..."
          className="min-h-[100px]"
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={handleAction} 
            disabled={loading}
            variant={action === "approve" ? "default" : "destructive"}
          >
            {loading ? "Processing..." : action === "approve" ? "Approve" : "Reject"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
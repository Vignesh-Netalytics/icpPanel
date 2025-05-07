import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TASK_STATUSES } from "@/lib/constants";
import { useTaskStatus } from "@/hooks/useTaskStatus";
import { TaskCard } from "@/components/TaskCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { toast } from 'react-toastify';

export function TaskAccordion() {
  const [defaultValue, setDefaultValue] = useState<string>("item-0");
  const [openItems, setOpenItems] = useState<string[]>(["item-0"]);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  
  const toggleAccordion = (value: string) => {
    setOpenItems((prevItems) => 
      prevItems.includes(value) 
        ? prevItems.filter(item => item !== value)
        : [...prevItems, value]
    );
  };

  const handleTaskAction = async (currentStatusId: number, isApproved: boolean) => {
    const currentIndex = TASK_STATUSES.findIndex(status => status.id === currentStatusId);
    
    if (isApproved && currentIndex < TASK_STATUSES.length - 1) {
      const nextAccordionValue = `item-${currentIndex + 1}`;
      setOpenItems(prev => [...prev, nextAccordionValue]);
      
      toast.success('Task approved successfully! Moving to next stage.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else if (!isApproved) {
      toast.info('Task rejected. Status unchanged.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    setRefreshTrigger(prev => prev + 1);
  };

  const taskStatusComponents = TASK_STATUSES.map((status, index) => {
    const { loading, error, latestTasks, refetch } = useTaskStatus(status.id, refreshTrigger);
    
    const taskCount = latestTasks?.length || 0;
    
    return (
      <AccordionItem 
        key={`item-${index}`} 
        value={`item-${index}`}
        className="border border-border rounded-lg mb-4 overflow-hidden"
      >
        <AccordionTrigger 
          onClick={() => toggleAccordion(`item-${index}`)}
          className={`px-4 py-3 hover:no-underline ${openItems.includes(`item-${index}`) ? 'bg-accent-100/30' : 'bg-card hover:bg-accent-100/10'}`}
        >
          <div className="flex justify-between items-center w-full">
            <span className="text-left font-medium text-primary-400">{status.label}</span>
            {!loading && !error && (
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium bg-primary-100 text-primary-foreground">
                {taskCount}
              </span>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 py-3">
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-[150px] w-full rounded-lg" />
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Failed to load tasks. Please try again later.</AlertDescription>
            </Alert>
          ) : latestTasks.length === 0 ? (
            <Alert>
              <AlertDescription>No tasks available for this status.</AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {latestTasks.map((task) => (
                <TaskCard 
                  key={task.id}
                  task={task} 
                  onActionComplete={(isApproved: boolean) => {
                    handleTaskAction(status.id, isApproved);
                    refetch();
                  }} 
                />
              ))}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    );
  });

  return (
    <Accordion
      type="multiple"
      defaultValue={[defaultValue]}
      value={openItems}
      className="w-full"
    >
      {taskStatusComponents}
    </Accordion>
  );
}
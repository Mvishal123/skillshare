"use client";

import { Loader2, Trash } from "lucide-react";
import { Button } from "../../ui/button";
import { trpc } from "@/utils/trpc-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CourseActionButtonProps {
  isCompleted: Boolean;
  isPublished: Boolean;
  courseId: string;
}

const CourseActionButton = ({
  isCompleted,
  isPublished = false,
  courseId,
}: CourseActionButtonProps) => {
  const router = useRouter();

  const { mutate: deleteCourse, isPending } =
    trpc.course.deleteCourse.useMutation({
      onSuccess: () => {
        toast.success("Course deleted successfully");
        router.push("/teach");
      },

      onError: ({ message }) => {
        toast.error(message);
      },
    });
  return (
    <div className="flex items-center gap-4">
      <Button variant="secondary" disabled={!isCompleted}>
        Publish
      </Button>
      <Button size="sm" onClick={() => deleteCourse({ courseId })}>
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Trash className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
};

export default CourseActionButton;
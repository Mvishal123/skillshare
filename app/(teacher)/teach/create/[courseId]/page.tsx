// "use client"

import { trpc } from "@/app/_trpc/trpc-client";
import AlertBanner from "@/components/course/alert-banner";
import CategoryForm from "@/components/course/main_course/category-form";
import ChapterSection from "@/components/course/main_course/chapter-form";
import CourseActionButton from "@/components/course/main_course/course-action-button";
import DescriptionForm from "@/components/course/main_course/description-form";
import ImageForm from "@/components/course/main_course/image-form";
import PriceForm from "@/components/course/main_course/price-form";
import TitleForm from "@/components/course/main_course/title-form";
import IconBadge from "@/components/icon-badge";
import MaxWidthContainer from "@/components/max-width-container";
import { db } from "@/db";
import { Ghost, LayoutDashboard, ListTodo } from "lucide-react";

const CoursePage = async ({ params }: { params: { courseId: string } }) => {
  const { courseId } = params;

  // const {data: course} = trpc.course.getCourse.useQuery({courseId})
  const course = await db.course.findFirst({
    where: {
      id: courseId,
    },
    include: {
      Chapter: true,
    },
  });

  const requiredField = [
    course?.title,
    course?.description,
    course?.image,
    course?.category,
    course?.cost,
    course?.difficulty,
  ];

  const completedFields = requiredField.filter(Boolean).length;
  const isCompleted = requiredField.length === completedFields;
  const isPublished = !!course?.isPublished;

  if (!course) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Ghost className="h-24 w-24 text-muted-foreground" strokeWidth={1} />
          <p className="text-2xl text-muted-foreground cursor-default">
            No course
          </p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <AlertBanner
        label="This course is not yet published and will not be visible to the users"
        type="warning"
      />
      <div className="pt-10">
        <MaxWidthContainer>
          {/*  */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Create a new course</h1>
              <p className="text-md text-slate-500">
                Fields completed {completedFields}/{requiredField.length}{" "}
              </p>
            </div>
            <CourseActionButton
              courseId={courseId}
              isCompleted={isCompleted}
              isPublished={isPublished}
            />
          </div>

          {/* forms */}
          <div className="grid space-y-10 lg:space-y-0 lg:grid-cols-2 mt-12 pb-6 space-x-0 lg:space-x-10">
            {/* Grid col 1 */}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <IconBadge icon={LayoutDashboard} status={false} />
                <h1 className="font-bold md:text-xl lg:text-2xl">
                  Customize your course
                </h1>
              </div>
              <div className="flex flex-col mt-8 space-y-8">
                <TitleForm
                  initialValue={course?.title!}
                  courseId={course?.id!}
                />
                <DescriptionForm
                  initialValue={course?.description!}
                  courseId={course?.id!}
                />
                <ImageForm initialValue={course?.image!} courseId={courseId} />
                <CategoryForm
                  initialValue={course?.category!}
                  courseId={courseId!}
                />
              </div>
            </div>

            {/*  Grid col 2 */}
            <div className="flex-1 mr-0">
              <div className="flex items-center gap-3">
                <IconBadge icon={ListTodo} status={false} />
                <h1 className="font-bold md:text-xl lg:text-2xl">
                  Customize your course
                </h1>
              </div>
              <div className="flex flex-col mt-8  space-y-8">
                <ChapterSection
                  initialValue={course?.Chapter!}
                  courseId={courseId!}
                />

                <div className="flex items-center gap-3">
                  <IconBadge icon={ListTodo} status={false} />
                  <h1 className="font-bold md:text-xl lg:text-2xl">
                    Customize your course
                  </h1>
                </div>
                <PriceForm initialValue={course?.cost!} courseId={courseId} />
              </div>
            </div>
          </div>
        </MaxWidthContainer>
      </div>
    </div>
  );
};

export default CoursePage;

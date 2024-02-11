import Companies from "@/components/landing/companies";
import Landing from "@/components/landing/landing";
import StartLearningCourses from "@/components/landing/start-learning";
import MaxWidthContainer from "@/components/max-width-container";

const page = async () => {
  // const session = await getServerAuthSession();

  return (
    <div className="pt-[4rem]">
      <Landing />

      <section>
        <Companies />
      </section>

      <MaxWidthContainer>
        <section>
          <StartLearningCourses />
        </section>
      </MaxWidthContainer>
    </div>
  );
};

export default page;

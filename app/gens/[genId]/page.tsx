import { Editor } from "./_components/editor";
import { Room } from "@/components/room";
import { QuestionSidebar } from "./_components/question-sidebar";
import { Navbar } from "@/app/(dashboard)/_components/navbar";

interface GenIdPageProps {
  params: {
    genId: string;
  };
}

const GenIdPage = ({ params }: GenIdPageProps) => {
  return (
    <Room roomId={params.genId} fallback={<div>Loading...</div>}>
      <div className="h-full w-full flex flex-col">
        <Navbar />
        <h3 className="text-yellow-500 flex items-center justify-center mt-5">
          {params.genId}
        </h3>
        <div className="flex h-full">
          <QuestionSidebar />
          <Editor />
        </div>
      </div>
    </Room>
  );
};

export default GenIdPage;

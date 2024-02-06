import { Editor } from "./_components/editor";
import { Room } from "@/components/room";
import { QuestionSidebar } from "./_components/question-sidebar";

interface GenIdPageProps {
  params: {
    genId: string;
  };
}

const GenIdPage = ({ params }: GenIdPageProps) => {
  return (
    <Room roomId={params.genId} fallback={<div>Loading...</div>}>
      <div className="h-full w-full bg-gray-800 flex flex-col">
        <h3 className="text-yellow-500">{params.genId}</h3>
        <div className="flex h-full">
          <QuestionSidebar />
          <Editor />
        </div>
      </div>
    </Room>
  );
};

export default GenIdPage;

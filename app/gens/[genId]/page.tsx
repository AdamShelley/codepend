import { Editor } from "./_components/editor";
import { Room } from "@/components/room";

interface GenIdPageProps {
  params: {
    genId: string;
  };
}

const GenIdPage = ({ params }: GenIdPageProps) => {
  return (
    <Room roomId={params.genId} fallback={<div>Loading...</div>}>
      <p>Gen Id Page</p>
      <Editor />
    </Room>
  );
};

export default GenIdPage;

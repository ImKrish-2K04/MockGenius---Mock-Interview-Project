import FormMockInterview from "@/components/form-mock-interview";
import LoaderPage from "@/components/loader";
import { useInterview } from "@/hooks/useInterview";
import { useParams } from "react-router-dom";

const CreateEditPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const { interview, loading } = useInterview({ interviewId });

  return loading ? (
    <LoaderPage />
  ) : (
    <div className="my-4 flex flex-col w-full">
      <FormMockInterview initialData={interview} />
    </div>
  );
};

export default CreateEditPage;

// ==============================
// 📦 External Library Imports
// ==============================
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

// ==============================
// 🔐 Clerk & Auth
// ==============================
import { useAuth } from "@clerk/clerk-react";

// ==============================
// 💅 UI Components
// ==============================
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// ==============================
// 🧩 Custom Components
// ==============================
import CustomBreadCrumb from "@/components/custom-breadcrumb";
import Heading from "@/components/headings";

// ==============================
// 🔧 Icons
// ==============================
import { Loader } from "lucide-react";

// ==============================
// 🧠 Types
// ==============================
import type { Interview } from "@/types";
import { callGemini } from "@/scripts";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";

// ==============================
// 📄 Schema & Types
// ==============================
const formSchema = z.object({
  position: z
    .string()
    .min(1, "Position is required")
    .max(100, "Position must be 100 characters or less"),
  description: z.string().min(10, "Description is required"),
  experience: z.coerce
    .number()
    .min(0, "Experience can not be empty or negative"),
  techStack: z.string().min(1, "Tech stack must be at least a character"),
});

type FormData = z.infer<typeof formSchema>;

interface FormMockInterviewProps {
  initialData: Interview | null;
}

// ==============================
// 🧠 Main Component
// ==============================
const FormMockInterview = ({ initialData }: FormMockInterviewProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      position: initialData?.position || "",
      description: initialData?.description || "",
      experience: initialData?.experience || 0,
      techStack: initialData?.techStack || "",
    },
  });

  const { isValid, isSubmitting } = form.formState;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userId } = useAuth();

  const breadCrumpPage = initialData?.position ? "Edit" : "Create";
  const actions = initialData ? "Save changes" : "Create";
  const title = initialData?.position
    ? initialData.position
    : "Create a New Mock Interview";
  const toastMessage = initialData
    ? { title: "Updated..!", description: "Changes saved successfully..." }
    : { title: "Created..!", description: "New Mock Interview created..." };

  const cleanAIResponse = (responseText: string) => {
    // step1 : trim if there is any unwanted whitespace
    let cleanResponse = responseText.trim();
    // step2 : remove any occurence of 'json' or ``` or `
    cleanResponse = cleanResponse.replace(/(json|```|`)/g, "");
    // step3 : extract the json array by capturing text between square brackets (i.e [])
    const jsonArray = cleanResponse.match(/\[.*\]/s);
    if (jsonArray) {
      cleanResponse = jsonArray[0];
    } else {
      throw new Error("No JSON array found in response.");
    }
    // step4: Parse the clean JSON text into an array of objects
    try {
      return JSON.parse(cleanResponse);
    } catch (error) {
      throw new Error("Invalid JSON format: " + (error as Error)?.message);
    }
  };

  const generateAIResponse = async (data: FormData) => {
    const prompt = `
            As an experienced prompt engineer, generate a JSON array containing 5 technical interview questions along with detailed answers based on the following job information. Each object in the array should have the fields "question" and "answer", formatted as follows:

            [
              { "question": "<Question text>", "answer": "<Answer text>" },
              ...
            ]

            Job Information:
            - Job Position: ${data?.position}
            - Job Description: ${data?.description}
            - Years of Experience Required: ${data?.experience}
            - Tech Stacks: ${data?.techStack}

            The questions should assess skills in ${data?.techStack} development and best practices, problem-solving, and experience handling complex requirements. Please format the output strictly as an array of JSON objects without any additional labels, code blocks, or explanations. Return only the JSON array with questions and answers.
            `;

    const aiResponse = await callGemini(prompt);
    if (!aiResponse) return null;
    const cleanedData = cleanAIResponse(aiResponse);
    return cleanedData;
  };

  // ===========================
  // 📨 Submit Handler
  // ===========================
  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      // if we have initial data
      if (initialData) {
        // update
        if (isValid) {
          const interviewQNA_generated_data = await generateAIResponse(data);
          if (!interviewQNA_generated_data)
            throw new Error("Creating interview is failed, we're sorry");

          await updateDoc(doc(db, "interviews", initialData?.id), {
            questions: interviewQNA_generated_data,
            ...data,
            updatedAt: serverTimestamp(),
          });

          toast(toastMessage.title, { description: toastMessage.description });
        }
      } else {
        // create a new mock-interview!
        if (isValid) {
          const interviewQNA_generated_data = await generateAIResponse(data);
          if (!interviewQNA_generated_data)
            throw new Error("Creating interview is failed, we're sorry");

          await addDoc(collection(db, "interviews"), {
            ...data,
            userId,
            questions: interviewQNA_generated_data,
            createdAt: serverTimestamp(),
          });

          toast(toastMessage.title, { description: toastMessage.description });
        }
      }

      navigate("/generate", { replace: true });
    } catch (error) {
      console.log("Error:", error);
      toast.error("Error..", {
        description: "Something went wrong, please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // 🧾 UI JSX Return
  // ===========================

  return (
    <div className="w-full flex flex-col space-y-4">
      {/* 🔗 Breadcrumb */}
      <CustomBreadCrumb
        breadCrumbPage={breadCrumpPage}
        breadCrumpItems={[{ label: "Mock Interviews", link: "/generate" }]}
      />

      {/* 🧾 Header */}
      <div className="mt-4 flex items-center justify-between w-full">
        <Heading title={title} isSubHeading />
      </div>

      <Separator className="mt-4 mb-6" />

      {/* 📝 Form */}
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full p-8 rounded-lg flex flex-col items-start justify-start gap-6 shadow-md dark:shadow-neutral-800"
        >
          {/* ✏️ Position */}
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Job Role / Job Position</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Input
                    disabled={loading}
                    className="h-12"
                    placeholder="eg:- Full stack developer"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* 🧾 Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Job Description</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    className="h-20"
                    placeholder="eg:- describe your job role or position"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* 📆 Experience */}
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Years of Experience</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    disabled={loading}
                    placeholder="eg:- 4"
                    {...field}
                    className="h-12 no-spinner"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* 💻 Tech Stack */}
          <FormField
            control={form.control}
            name="techStack"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Tech stacks</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Textarea
                    className="h-12"
                    placeholder="eg:- Next.js, Java (comma separated)"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* 🔘 Buttons */}
          <div className="w-full flex items-center justify-end gap-6">
            <Button
              type="reset"
              size={"sm"}
              variant={"outline"}
              disabled={isSubmitting || loading}
              onClick={() =>
                form.reset({
                  position: "",
                  description: "",
                  experience: 0,
                  techStack: "",
                })
              }
            >
              Reset
            </Button>
            <Button
              type="submit"
              size={"sm"}
              variant={"outline"}
              disabled={isSubmitting || loading}
            >
              {loading ? (
                <Loader className="text-gray-50 animate-spin" />
              ) : (
                actions
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormMockInterview;

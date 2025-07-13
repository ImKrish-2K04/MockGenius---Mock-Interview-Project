import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TooltipButton } from "@/components/tooltip-btn";
import { Volume2, VolumeX } from "lucide-react";
import RecordAnswer from "@/components/record-interview-answer";

interface QuestionSectionProps {
  questions: {
    question: string;
    answer: string;
  }[];
}

const QuestionSection = ({ questions }: QuestionSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSpeech, setCurrentSpeech] =
    useState<SpeechSynthesisUtterance | null>(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [activeTab, setActiveTab] = useState(questions[0]?.question || "");

  const handlePlayQuestion = (ques: string) => {
    if (isPlaying && currentSpeech) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentSpeech(null);
    } else {
      if ("speechSynthesis" in window) {
        const speech = new SpeechSynthesisUtterance(ques);
        window.speechSynthesis.speak(speech);
        setIsPlaying(true);
        setCurrentSpeech(speech);

        speech.onend = () => {
          setIsPlaying(false);
          setCurrentSpeech(null);
        };
      }
    }
  };

  // Stop speech when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentSpeech(null);
    }
  };

  return (
    <div className="w-full min-h-96 border rounded-md p-4 border-muted-foreground">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full space-y-12"
        orientation="vertical"
      >
        <TabsList className="bg-transparent w-full flex flex-wrap text-center justify-start gap-2 md:gap-4">
          {questions?.map((tab, i) => (
            <TabsTrigger
              className={cn(
                "data-[state=active]:bg-emerald-200 dark:data-[state=active]:bg-white/ dark:data-[state=active]:text-black data-[state=active]:shadow-md text-xs px-2 cursor-pointer hover:border hover:border-muted-foreground transition-all delay-100 data-[state=active]:border-none"
              )}
              key={tab.question}
              value={tab.question}
            >
              {`Que.. ${i + 1}`}
            </TabsTrigger>
          ))}
        </TabsList>

        {questions?.map((tab, i) => (
          <TabsContent key={i} value={tab.question}>
            <p className="text-base text-left tracking-wide to-neutral-500">
              {tab.question}
            </p>

            <div className="w-full flex items-center justify-end">
              <TooltipButton
                content={isPlaying ? "Stop" : "Start"}
                icon={
                  isPlaying ? (
                    <VolumeX className="min-w-5 min-h-5 text-muted-foreground" />
                  ) : (
                    <Volume2 className="min-w-5 min-h-5 text-muted-foreground" />
                  )
                }
                onClick={() => handlePlayQuestion(tab.question)}
              />
            </div>

            <RecordAnswer
              question={tab}
              isWebcamActive={isWebcamActive}
              setIsWebcamActive={setIsWebcamActive}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default QuestionSection;

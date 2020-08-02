export type QuizQuestionType = {
  _id: string;
  question: string;
  options: [
    {
      option: string;
      explanation?: string;
    }
  ];
  correctAnswer: string;
};

export type Quiz = {
  _id: string;
  contentId: string;
  questions: QuizQuestionType[] | null;
} | null;

export type CurrentSection = "intro" | "questions" | "outro";

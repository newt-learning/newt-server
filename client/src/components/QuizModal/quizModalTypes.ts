export interface QuizQuestionType {
  _id: string;
  question: string;
  options: [
    {
      option: string;
      explanation?: string;
    }
  ];
  correctAnswer: string;
  optionChosen?: string;
  isChoiceCorrect?: boolean;
}

export type Quiz = {
  _id: string;
  contentId: string;
  questions: QuizQuestionType[] | undefined;
} | null;

export type CurrentSection = "intro" | "questions" | "outro";

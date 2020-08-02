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
export type OptionClick = (event: React.MouseEvent<HTMLLIElement>) => void;

// Component Prop types
export interface QuizModalProps {
  showModal: boolean;
  quiz: Quiz;
  quizName: string;
  onCloseModal: () => void;
}

export interface QuizModalContentProps {
  currentSection: CurrentSection;
  quizName: string;
  quizQuestions: QuizQuestionType[];
  numQuestions: number;
  currentQuestion: number;
  onClickBegin: () => void;
  onClickOption: OptionClick;
  onClickNext: () => void;
  onClickBack: () => void;
  onClickSummary: () => void;
  isQuizComplete: boolean;
  showReview: boolean;
  onCloseModal: () => void;
}

export interface QuizIntroProps {
  message: string;
  numQuestions: number;
  onClickBegin: () => void;
}

export interface QuizQuestionProps {
  currentQuestion: number;
  numQuestions: number;
  questionInfo: QuizQuestionType;
  onClickOption: OptionClick;
  onClickNext: () => void;
  onClickBack: () => void;
  onClickSummary: () => void;
  isQuizComplete: boolean;
}

export interface QuizQuestionType {
  _id: string;
  question: string;
  options: {
    options: [
      {
        option: string;
        explanation?: string;
      }
    ];
  };
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
  isLoading: boolean;
  hasError: boolean;
  quiz: Quiz;
  quizName: string;
  onCloseModal: () => void;
  showReview: boolean;
  onComplete: (result: QuizQuestionType[]) => void;
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
  onClickFinish: () => void;
  isQuizComplete: boolean;
  showReview: boolean;
  onCloseModal: () => void;
}

export interface QuizIntroProps {
  numQuestions: number;
  showReview: boolean;
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

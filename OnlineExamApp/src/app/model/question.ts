export interface Question {
    num: number;
    id: number;
    question: string;
    inputType: string;
    options: Option[];
    reviewlater: boolean;
}

export interface Option {
    id: number;
    isSelected: boolean;
    optionValue: string;
    answer: string
}

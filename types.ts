export interface SelectionState {
  level: string;
  grade: string;
  subject: string;
  topicCategory: string;
  specificIssue: string;
}

export interface OptionItem {
  id: string;
  label: string;
}

export interface SubjectMapping {
  [key: string]: string[];
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
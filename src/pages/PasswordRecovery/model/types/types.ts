export interface FinishError {
  type: 'password' | 'recover' | 'common' | 'page';
  message: string;
}
export interface FinishSuccess {
  type: 'common' | 'page';
  message: string;
}

export interface IPasswordRequirements {
  pattern: string;
  description: string[];
}

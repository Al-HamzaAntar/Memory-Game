// Type definitions for the memory name game
export interface ValidationResult {
  isValid: boolean;
  message: string;
  isCorrect?: boolean;
}

export interface GameState {
  totalRequired: number;
  correctGuesses: string[];
  gameComplete: boolean;
  isSetup: boolean;
  secretNames: string[];
}
export interface CsvSection {
  name: string;
  headers: string[];
  rows: string[][];
}

export interface CsvValidationError {
  section: string;
  row: number;
  column: number;
  message: string;
}
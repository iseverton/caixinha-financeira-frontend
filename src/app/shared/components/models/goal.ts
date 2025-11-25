export interface goal {
  id?: number;
  name: string;
  targetDate: Date;
  targetAmount: number | null;
  currentAmount?: number | null;
  description?: string;
}

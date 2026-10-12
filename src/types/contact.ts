export const STAGES = ['Lead', 'Prospect', 'Qualified', 'Customer'] as const;

export type Stage = (typeof STAGES)[number];

export interface Contact {
  id: string;
  name: string;
  company?: string;
  role?: string;
  email?: string;
  owner?: string;
  labels: string[];
  stage?: Stage;
  notes?: string;
}

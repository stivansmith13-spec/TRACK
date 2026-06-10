export interface CandidateProfile {
  name: string;
  title: string;
  salaryExpectation: string;
  location: string;
  education: string;
  meritScore: number;
  tier: string;
  skills: { [key: string]: number };
  certificates: Certificate[];
  experiences: Experience[];
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  verified: boolean;
  expiryDate?: string;
  specialty?: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  duration: string;
  desc: string;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  skills: string[];
  match: number;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

export interface UniversityCourse {
  code: string;
  name: string;
  match: number;
  marketDemand: number;
  taughtRatio: number;
  gap: number;
  status: "high" | "moderate" | "low";
}

export interface SkillGap {
  skill: string;
  demand: number;
  taught: number;
  gap: number;
  recommendation: string;
}

export interface DeduplicateRecord {
  id: string;
  name: string;
  statusValue: string;
  location: string;
  anId: string;
  cnId: string;
  savings: string;
}

export interface PolicyReport {
  success: boolean;
  centerType: string;
  count: number;
  region: string;
  jobsCreated: number;
  unemploymentReduction: number;
  economicImpact: string;
  aiSimulationReport: string;
}

export type AspectRatio = "1:1" | "4:3" | "3:4" | "16:9" | "9:16";
export type ImageSize = "512px" | "1K" | "2K";
export type ViewMode = "split" | "side-by-side" | "result-only" | "original-only";

export interface EditHistoryItem {
  id: string;
  timestamp: number;
  imageUrl: string;
  instruction: string;
  modelUsed?: string;
  notes?: string;
}

export interface SamplePhoto {
  id: string;
  title: string;
  category: string;
  description: string;
  url: string;
  suggestedPrompt: string;
}

export interface PhotoAnalysis {
  productName: string;
  issuesFound: string[];
  suggestions: {
    title: string;
    prompt: string;
    category: "background" | "cleanup" | "lighting" | "staging";
  }[];
}

export interface QuickPreset {
  id: string;
  label: string;
  iconName: string;
  prompt: string;
  description: string;
  category: "background" | "cleanup" | "lighting" | "staging";
}

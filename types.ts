
export enum UserRole {
  OWNER = 'OWNER',
  CREATOR = 'CREATOR',
  CLIENT = 'CLIENT',
}

export enum ItemType {
  AGENT = 'AGENT',
  WORKFLOW = 'WORKFLOW',
  PROMPT = 'PROMPT',
}

export interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
    updates: boolean;
  };
  appearance: {
    compactMode: boolean;
    reduceMotion: boolean;
  };
  privacy: {
    publicProfile: boolean;
    shareUsageData: boolean;
  }
}

export interface User {
  id: string;
  name: string;
  email: string;
  title?: string;
  bio?: string;
  role: UserRole;
  balance: number; 
  avatar?: string;
  settings: UserSettings;
  adminPassword?: string;
}

export interface Attachment {
  mimeType: string;
  data: string; // Base64 data
  fileName: string;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  price: number;
  authorId: string;
  authorName: string;
  rating: number;
  installCount: number;
  type: ItemType;
  tags: string[];
  systemInstruction: string;
  thumbnailUrl: string;
  usageStats?: {
    dailyActive: number;
    tokensTotal: number;
    revenue: number;
  };
}

export interface InstalledItem {
  id: string;
  itemId: string;
  userId: string;
  installedAt: string;
  lastUsed?: string;
  itemSnapshot: MarketplaceItem;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  isThinking?: boolean;
  attachments?: Attachment[];
}

export interface ChatSession {
  id: string; 
  messages: ChatMessage[];
  updatedAt: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface AnalyticsData {
  totalInstalls: number;
  activeAgents: number;
  totalTokens: number;
  revenueChart: { date: string; value: number }[];
}

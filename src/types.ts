export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  createdAt: string;
  packages: TrainingPackage[];
  notes?: string;
  menstrualCycle?: {
    cycleLength: number;
    lastPeriodDate: string;
    periodLength: number;
  };
}

export interface TrainingPackage {
  id: string;
  clientId: string;
  totalSessions: number;
  usedSessions: number;
  pricePerSession: number;
  totalPrice: number;
  purchaseDate: string;
  expiryDate: string;
  isActive: boolean;
}

export interface TrainingSession {
  id: string;
  clientId: string;
  packageId: string;
  date: string;
  time: string;
  duration: number;
  notes?: string;
  completed: boolean;
  type: 'training' | 'break' | 'personal' | 'duty';
  singlePrice?: number;
}

export interface PackageTemplate {
  id: string;
  name: string;
  sessionsCount: number;
  pricePerSession: number;
  totalPrice: number;
  validityDays: number;
  description?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Settings {
  taxRate: number;
  cloudSettings: {
    provider: 'default' | 'google-drive';
    tokens?: any;
  };
  userId: string;
}

/** Shared, explicitly fictional business metadata used by every industry demo. */
export interface BusinessHours {
  schedule: Array<{
    service: string;
    days: string;
    hours: string;
  }>;
  timezone: string | null;
  holidayHours: string | null;
}

export interface BusinessContact {
  phone: string;
  email: string;
  address: string;
  website: string | null;
}

export interface KnowledgeBaseStatus {
  businessData: 'Fictional demonstration data';
  liveSystems: 'Not connected';
  notProvided: string[];
}

export interface DemoBusinessProfile {
  businessName: string;
  businessDescription: string;
  contact: BusinessContact;
  businessHours: BusinessHours;
  paymentInformation: string | null;
  dataStatus: KnowledgeBaseStatus;
}

export type IndustryScenario =
  | 'hotel'
  | 'restaurant'
  | 'ecommerce'
  | 'carrental'
  | 'clinic'
  | 'salon'
  | 'construction'
  | null;

/**
 * Reference to an industry knowledge base file.
 * Points to the TypeScript files in src/industries/ that contain
 * structured business data for each industry.
 */
export interface IndustryKnowledgeBaseRef {
  filePath: string;
  description: string;
}

/**
 * Industry scenario definition with knowledge base integration.
 */
export interface IndustryScenarioDef {
  id: IndustryScenario;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  demoData: string[];
  introMessage: string;
  followUpQuestions: string[];
  summaryFields: string[];
  knowledgeBaseRef: IndustryKnowledgeBaseRef;
}

/**
 * Map of industry scenario IDs to their knowledge base file references.
 * These correspond to the TypeScript files created in src/industries/.
 * Each entry maps a scenario ID to a reference object with the file path and description.
 */
export const INDUSTRY_KNOWLEDGE_BASE_MAP: Record<string, IndustryKnowledgeBaseRef> = {
  hotel: {
    filePath: '/src/industries/hotel.ts',
    description: 'Hotel business information including rooms, amenities, policies, and contact details.',
  },
  restaurant: {
    filePath: '/src/industries/restaurant.ts',
    description: 'Restaurant menu and business information including dishes, hours, and contact details.',
  },
  ecommerce: {
    filePath: '/src/industries/ecommerce.ts',
    description: 'E-commerce product catalogue and business information including items, pricing, and policies.',
  },
  carrental: {
    filePath: '/src/industries/carrental.ts',
    description: 'Car rental business information including vehicles, rates, and rental policies.',
  },
  clinic: {
    filePath: '/src/industries/clinic.ts',
    description: 'Clinic service information including departments, appointment procedures, and contact details.',
  },
  salon: {
    filePath: '/src/industries/salon.ts',
    description: 'Salon and barbershop service information including available services, staff, and policies.',
  },
  construction: {
    filePath: '/src/industries/construction.ts',
    description: 'Construction and professional services information including offered services and quotation process.',
  },
};

/**
 * Known industry scenarios with their configuration.
 * Each scenario has scenario data and a reference to its knowledge base.
 */
export const INDUSTRY_SCENARIOS: IndustryScenarioDef[] = [
  {
    id: 'hotel',
    name: 'Hotels and Hospitality',
    shortName: 'Hotel Reservations',
    description:
      'Answer guest enquiries, collect preferred dates and guest counts, and demonstrate reservation requests.',
    icon: 'Building2',
    demoData: ['Check-in date', 'Check-out date', 'Number of guests'],
    introMessage:
      "I can help you explore hotel reservations. What dates are you considering, and how many guests will be staying?",
    followUpQuestions: [
      'What are your preferred check-in and check-out dates?',
      'How many guests will be staying?',
      'Do you have any room preferences?',
    ],
    summaryFields: ['Industry', 'Check-in date', 'Check-out date', 'Number of guests'],
    knowledgeBaseRef: INDUSTRY_KNOWLEDGE_BASE_MAP.hotel,
  },
  {
    id: 'restaurant',
    name: 'Restaurants',
    shortName: 'Restaurant Orders',
    description:
      'Answer menu questions, help customers explore menu items, and demonstrate order collection.',
    icon: 'Utensils',
    demoData: ['Party size', 'Preferred dining time', 'Menu items of interest'],
    introMessage:
      "I can help you explore our restaurant menu and place a sample order. How many people will be dining, and is there a particular time you had in mind?",
    followUpQuestions: [
      'How many people will be dining?',
      'What time would you prefer?',
      'Are there any dietary requirements?',
    ],
    summaryFields: ['Industry', 'Party size', 'Preferred dining time', 'Menu items of interest'],
    knowledgeBaseRef: INDUSTRY_KNOWLEDGE_BASE_MAP.restaurant,
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    shortName: 'E-commerce Assistant',
    description:
      'Answer product questions, help customers compare products, and recommend products based on stated preferences.',
    icon: 'ShoppingBag',
    demoData: ['Product category', 'Budget range', 'Preferred features'],
    introMessage:
      "I can help you find the right product. What are you looking for, and do you have a budget or specific features in mind?",
    followUpQuestions: [
      'What product category interests you?',
      'What is your budget range?',
      'Which features are most important to you?',
    ],
    summaryFields: ['Industry', 'Product category', 'Budget range', 'Preferred features'],
    knowledgeBaseRef: INDUSTRY_KNOWLEDGE_BASE_MAP.ecommerce,
  },
  {
    id: 'carrental',
    name: 'Car Rentals',
    shortName: 'Car Rental Enquiries',
    description:
      'Answer vehicle enquiries, collect preferred rental dates and vehicle preferences, and demonstrate rental requests.',
    icon: 'Truck',
    demoData: ['Pickup date', 'Return date', 'Vehicle category'],
    introMessage:
      "I can help you explore car rental options. What are your preferred pickup and return dates, and what type of vehicle do you need?",
    followUpQuestions: [
      'What are your pickup and return dates?',
      'What vehicle category do you prefer?',
      'Will you need any additional equipment?',
    ],
    summaryFields: ['Industry', 'Pickup date', 'Return date', 'Vehicle category'],
    knowledgeBaseRef: INDUSTRY_KNOWLEDGE_BASE_MAP.carrental,
  },
  {
    id: 'clinic',
    name: 'Clinics',
    shortName: 'Clinic Appointments',
    description:
      'Answer general service enquiries, collect basic appointment preferences, and demonstrate appointment requests.',
    icon: 'Stethoscope',
    demoData: ['Service type', 'Preferred appointment date', 'Preferred time'],
    introMessage:
      "I can help you learn about our clinic services and request a sample appointment. What type of service are you interested in, and do you have a preferred date?",
    followUpQuestions: [
      'What type of service are you interested in?',
      'Do you have a preferred appointment date?',
      'Do you have a preferred time?',
    ],
    summaryFields: ['Industry', 'Service type', 'Preferred appointment date', 'Preferred time'],
    knowledgeBaseRef: INDUSTRY_KNOWLEDGE_BASE_MAP.clinic,
  },
  {
    id: 'salon',
    name: 'Salons and Barbershops',
    shortName: 'Salon Services',
    description:
      'Answer service questions, help customers explore services, and demonstrate appointment requests.',
    icon: 'Scissors',
    demoData: ['Service type', 'Stylist preference', 'Appointment date'],
    introMessage:
      "I can help you explore our salon services and book a sample appointment. What service are you interested in, and when would you like to come in?",
    followUpQuestions: [
      'Which service interests you?',
      'Do you have a preferred stylist?',
      'What date and time would you like?',
    ],
    summaryFields: ['Industry', 'Service type', 'Stylist preference', 'Appointment date'],
    knowledgeBaseRef: INDUSTRY_KNOWLEDGE_BASE_MAP.salon,
  },
  {
    id: 'construction',
    name: 'Construction and Professional Services',
    shortName: 'Construction Enquiries',
    description:
      'Explain services, collect project requirements, and demonstrate quotation enquiries.',
    icon: 'HardHat',
    demoData: ['Project type', 'Project timeline', 'Budget range'],
    introMessage:
      "I can help you explore our construction and professional services. What type of project are you planning, and what is your timeline?",
    followUpQuestions: [
      'What type of project are you planning?',
      'What is your expected timeline?',
      'Do you have a budget range in mind?',
    ],
    summaryFields: ['Industry', 'Project type', 'Project timeline', 'Budget range'],
    knowledgeBaseRef: INDUSTRY_KNOWLEDGE_BASE_MAP.construction,
  },
];

export const DEFAULT_INTRO_MESSAGE =
  "Hello! I'm your AI business assistant. Choose an industry to explore, or tell me what kind of business you have questions about.";

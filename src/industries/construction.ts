import type { DemoBusinessProfile } from './common';

/**
 * Construction and Professional Services AI Agent Knowledge Base - Demonstration Data
 * This is demonstration content for the MAB Technologies SL AI Agent Showroom.
 * All businesses, prices, and policies are simulated demonstration data.
 * Do not invent guaranteed project prices, construction timelines, or contractual commitments.
 * If the knowledge base does not contain enough information to provide an estimate, explain what additional details are required.
 */

export interface ConstructionProject {
  id: string;
  name: string;
  type: string;
  description: string;
  estimatedCostRange: string;
  timelineRange: string;
}

export interface ConstructionKnowledgeBase extends DemoBusinessProfile {
  servicesOffered: string[];
  projectExamples: Array<{ name: string; description: string }>;
  serviceArea: string | null;
  materialInformation: string;
  quotationProcess: string;
  consultationProcedure: string;
  warrantyPolicy: string | null;
  faqs: {
    question: string;
    answer: string;
  }[];
  estimationNote: string;
}

// Construction demonstration data
export const constructionKnowledgeBase: ConstructionKnowledgeBase = {
  businessName: "BuildWell Construction Co.",
  businessDescription: "A fictional construction and professional services demonstration covering residential, commercial, and renovation enquiries.",
  businessHours: {
    schedule: [],
    timezone: null,
    holidayHours: null,
  },
  servicesOffered: [
    "Residential home construction",
    "Commercial building projects",
    "Home renovations and remodelling",
    "Extensions and additions",
    "Foundation work",
    "Roofing and exterior",
    "Interior finishing",
  ],
  projectExamples: [
    { name: 'Residential home construction', description: 'Example service enquiry: discuss the site, approximate size, requirements, materials, and preferred timeline before requesting a quotation.' },
    { name: 'Home renovation', description: 'Example service enquiry: outline the rooms or areas involved, the work requested, and any material preferences.' },
    { name: 'Commercial building project', description: 'Example service enquiry: share the project type, approximate scope, site location, and consultation requirements.' },
  ],
  serviceArea: null,
  materialInformation: "We source materials from trusted suppliers and can provide options ranging from standard to premium selections. Material choices significantly impact project cost and timeline. We recommend discussing your preferences and budget early in the enquiry process.",
  quotationProcess: "To request a quotation, please provide details about your project including the type of work, approximate size, preferred timeline, and budget range. We'll arrange a consultation to discuss your requirements in detail and provide a customized estimate.",
  consultationProcedure: 'Contact the business to request a consultation. For a demonstration enquiry, the assistant may summarize the project type, approximate size or scope, site location, material preferences, and desired timeline. No appointment is submitted.',
  warrantyPolicy: null,
  contact: {
    phone: "+1-555-0701",
    email: "info@buildwellconstruction.example",
    address: "123 Build Street, Construction City, CC 32109",
    website: null,
  },
  paymentInformation: null,
  dataStatus: {
    businessData: 'Fictional demonstration data',
    liveSystems: 'Not connected',
    notProvided: ['Office hours', 'Business timezone', 'Service area', 'Project prices', 'Guaranteed project timelines', 'Warranty terms', 'Licensing and insurance status', 'Payment methods', 'Consultation availability'],
  },
  faqs: [
    {
      question: "What construction services do you provide?",
      answer: "The configured sample services are residential home construction, commercial building projects, home renovations and remodelling, extensions and additions, foundation work, roofing and exterior, and interior finishing. Project availability and delivery details have not been provided.",
    },
    {
      question: "Do you build residential houses?",
      answer: "Residential home construction is listed as a sample service. House-plan options, design services, licensing, and project availability have not been provided. You can share the project scope as a demonstration enquiry.",
    },
    {
      question: "What materials do you supply?",
      answer: "Specific materials and supplier arrangements have not been provided. The sample information says material preferences can be discussed during a consultation; include any preferences in a demonstration enquiry.",
    },
    {
      question: "Can I request a quotation?",
      answer: "I can summarize a demonstration quotation enquiry. Share the project type, approximate scope, site location, and desired timeframe. This assistant cannot provide or submit a binding quotation.",
    },
    {
      question: "What information do you need for my project?",
      answer: "For a demonstration enquiry, share the project type, approximate size or scope, site location, material preferences, and desired timeline. Budget range is optional. No price or timeline is guaranteed.",
    },
    {
      question: "Do you provide guaranteed project prices?",
      answer: "Project prices and quotation terms have not been provided. Any estimate would need to be prepared by the business after reviewing the project; this assistant cannot provide a binding price.",
    },
    {
      question: "What is the typical construction timeline?",
      answer: "Project timelines have not been provided and depend on the project scope and site. Share the project type, approximate size, and requested timeframe for a consultation; no timeline is guaranteed by this demonstration.",
    },
    {
      question: "Do you offer design services?",
      answer: "Design services and partner arrangements have not been provided in this demonstration. You can include your design requirements in a project enquiry for discussion.",
    },
    {
      question: "Are you licensed and insured?",
      answer: "Licensing and insurance details have not been provided in this demonstration. Please request current documentation directly from the business before engaging a contractor.",
    },
    {
      question: "Can you help with planning permission?",
      answer: "Planning-permission support has not been specified. Requirements vary by location; check with the relevant local planning authority and ask the business what project support it can provide.",
    },
  ],
  estimationNote: "Project estimates are demonstrations only. Actual prices, timelines, and commitments vary based on project specifics. The assistant will explain what additional details are required for a proper estimate.",
};


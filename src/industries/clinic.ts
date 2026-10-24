import type { DemoBusinessProfile } from './common';

/**
 * Clinic AI Agent Knowledge Base - Demonstration Data
 * This is demonstration content for the MAB Technologies SL AI Agent Showroom.
 * All businesses, prices, and policies are simulated demonstration data.
 * Keep the assistant focused on general service enquiries and administrative information.
 * Do not solicit detailed medical histories or unnecessary sensitive health information.
 * Do not provide diagnoses or pretend to replace a healthcare professional.
 */

export interface ClinicService {
  id: string;
  name: string;
  description: string;
}

export interface ClinicKnowledgeBase extends DemoBusinessProfile {
  departments: string[];
  services: ClinicService[];
  appointmentProcedures: string;
  administrativePolicies: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  limitationNotice: string;
}

// Clinic demonstration data
export const clinicKnowledgeBase: ClinicKnowledgeBase = {
  businessName: "HealthSpring Clinic",
  businessDescription: "A professional primary care clinic providing comprehensive general medical services with a patient-focused approach. Our team of healthcare professionals is dedicated to delivering high-quality care in a comfortable and welcoming environment.",
  businessHours: {
    schedule: [
      { service: 'Clinic', days: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
      { service: 'Clinic', days: 'Saturday', hours: '9:00 AM - 1:00 PM' },
      { service: 'Clinic', days: 'Sunday', hours: 'Closed' },
    ],
    timezone: null,
    holidayHours: null,
  },
  departments: [
    "General Practice",
    "Pediatrics",
    "Women's Health",
    "Chronic Disease Management",
    "Minor Procedures",
  ],
  services: [
    { id: 'general-practice', name: 'General Practice', description: 'Routine check-ups and general medical services, as listed in this sample clinic information.' },
    { id: 'pediatrics', name: 'Pediatrics', description: 'General pediatric care is listed; service details and fees have not been provided.' },
    { id: 'womens-health', name: "Women's Health", description: "Women's health services are listed; service details and fees have not been provided." },
    { id: 'chronic-care', name: 'Chronic Disease Management', description: 'The department is listed; specific programmes and eligibility have not been provided.' },
    { id: 'minor-procedures', name: 'Minor Procedures', description: 'The department is listed; procedure details and fees have not been provided.' },
  ],
  appointmentProcedures: 'To request an appointment, call the clinic or visit in person with a preferred date and general service area. Arrive 10 minutes early for a first visit. No online booking system is connected. Cancellation requests should be made at least 24 hours ahead; any late-cancellation fee is not specified.',
  administrativePolicies: ['Appointment requests are demonstrations and are not submitted to a booking system.', 'Walk-in capacity is not available in this knowledge base.', 'Bring identification; accepted insurance and payment arrangements have not been verified.'],
  contact: {
    phone: "+1-555-0589",
    email: "info@healthspringclinic.example",
    address: "567 Wellness Avenue, Medical Centre, MC 78901",
    website: null,
  },
  paymentInformation: null,
  dataStatus: {
    businessData: 'Fictional demonstration data',
    liveSystems: 'Not connected',
    notProvided: ['Business timezone', 'Holiday hours', 'Consultation fees', 'Accepted insurance plans', 'Payment methods', 'Walk-in capacity', 'Parking details', 'Live appointment availability'],
  },
  faqs: [
    {
      question: "What services does the clinic offer?",
      answer: "The configured sample departments are General Practice, Pediatrics, Women's Health, Chronic Disease Management, and Minor Procedures. Specific services, eligibility, and fees have not been provided; please contact the clinic for details.",
    },
    {
      question: "What time do you open?",
      answer: "Monday - Friday: 8:00 AM. Saturday: 9:00 AM. Sunday: Closed. Holiday hours have not been provided in this demonstration.",
    },
    {
      question: "How can I request an appointment?",
      answer: "You can request an appointment by calling the clinic or visiting in person. Share a preferred date and general service area. No online booking system is connected, and you do not need to share detailed medical information with this assistant.",
    },
    {
      question: "Do I need to book before visiting?",
      answer: "Appointment requests can be made by phone or in person. Whether an appointment is required and whether walk-ins are accepted have not been provided; contact the clinic before visiting.",
    },
    {
      question: "Where is the clinic located?",
      answer: "The sample address is 567 Wellness Avenue, Medical Centre. Directions and parking details have not been provided.",
    },
    {
      question: "Do you accept walk-in patients?",
      answer: "Walk-in capacity has not been provided in this demonstration. Call the clinic to ask before visiting without an appointment.",
    },
    {
      question: "What should I bring to my appointment?",
      answer: "Please bring valid identification and arrive 10 minutes early for a first visit. Accepted insurance arrangements have not been verified; contact the clinic to ask what documents to bring.",
    },
    {
      question: "Do you provide emergency care?",
      answer: "For an emergency, contact your local emergency services or go to the nearest emergency department. This assistant cannot assess or triage medical conditions.",
    },
    {
      question: "How do I cancel or reschedule an appointment?",
      answer: "Please contact the clinic at least 24 hours in advance to request a cancellation or reschedule. Any late-cancellation fee has not been specified.",
    },
    {
      question: "Do you have after-hours contact?",
      answer: "An after-hours service has not been provided in this demonstration. For urgent or emergency care, use local healthcare or emergency services.",
    },
  ],
  limitationNotice: "This AI assistant provides general information and administrative assistance only. It does not provide medical diagnoses, treatment advice, or replace professional healthcare consultation. For medical concerns, please consult a qualified healthcare professional.",
};


import type { DemoBusinessProfile } from './common';

/**
 * Salon and Barbershop AI Agent Knowledge Base - Demonstration Data
 * This is demonstration content for the MAB Technologies SL AI Agent Showroom.
 * All businesses, prices, and policies are simulated demonstration data.
 * Keep the assistant focused on service enquiries and appointment demonstrations.
 * Do not claim that an appointment is booked unless a real booking integration exists.
 */

export interface SalonService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
}

export interface SalonKnowledgeBase extends DemoBusinessProfile {
  services: SalonService[];
  staff: string[];
  appointmentProcedure: string;
  cancellationPolicy: string | null;
  faqs: {
    question: string;
    answer: string;
  }[];
  appointmentNote: string;
}

// Salon demonstration data
export const salonKnowledgeBase: SalonKnowledgeBase = {
  businessName: "Style & Soul Salon",
  businessDescription: "A full-service salon and barbershop offering premium hair care, styling, and grooming services in a relaxing atmosphere. Our skilled stylists and barbers are dedicated to helping you look and feel your best.",
  businessHours: {
    schedule: [
      { service: 'Salon and barbershop', days: 'Monday - Friday', hours: '9:00 AM - 7:00 PM' },
      { service: 'Salon and barbershop', days: 'Saturday', hours: '9:00 AM - 5:00 PM' },
      { service: 'Salon and barbershop', days: 'Sunday', hours: 'Closed; special appointments may be requested' },
    ],
    timezone: null,
    holidayHours: null,
  },
  services: [
    {
      id: "haircut-male",
      name: "Men's Haircut",
      description: "Classic men's haircut including styling and finishing touches.",
      price: 35,
      duration: "45 min",
    },
    {
      id: "haircut-female",
      name: "Women's Haircut",
      description: "Women's haircut including blow-dry and styling. Customized to hair type and face shape.",
      price: 55,
      duration: "60 min",
    },
    {
      id: "color-full",
      name: "Full Hair Color",
      description: "Full permanent hair color application with tone adjustment. Includes shampoo, condition, and blow-dry.",
      price: 120,
      duration: "120 min",
    },
    {
      id: "color-highlights",
      name: "Highlights",
      description: "Partial highlight application with foil technique. Customized shade and placement.",
      price: 85,
      duration: "90 min",
    },
    {
      id: "blow-dry",
      name: "Blow-dry Service",
      description: "Professional blow-dry and style service. Perfect for events or regular maintenance.",
      price: 30,
      duration: "30 min",
    },
    {
      id: "beard-trim",
      name: "Beard Trim",
      description: "Beard trim and shaping with straight razor finish. Includes neck cleanup.",
      price: 25,
      duration: "30 min",
    },
    {
      id: "deep-conditioning",
      name: "Deep Conditioning Treatment",
      description: "Intensive hair conditioning treatment to restore moisture and shine. Add-on service.",
      price: 20,
      duration: "20 min",
    },
    {
      id: "updo",
      name: "Updo Style",
      description: "Professional updo hairstyling for special occasions and events. Includes hair preparation and finishing.",
      price: 75,
      duration: "60 min",
    },
  ],
  staff: [
    "Senior Stylist - Jamie",
    "Junior Stylist - Alex",
    "Barber - Max",
    "Color Specialist - Sarah",
  ],
  appointmentProcedure: 'Contact the salon by phone or email with the service, preferred date and time, and stylist preference if you have one. The assistant can prepare a demonstration summary; no booking system is connected.',
  cancellationPolicy: null,
  contact: {
    phone: "+1-555-0690",
    email: "info@stylesoulsalon.example",
    address: "890 Cutting Edge Boulevard, Grooming City, GC 21098",
    website: null,
  },
  paymentInformation: null,
  dataStatus: {
    businessData: 'Fictional demonstration data',
    liveSystems: 'Not connected',
    notProvided: ['Business timezone', 'Holiday hours', 'Cancellation terms', 'Payment methods', 'Live stylist schedules', 'Appointment availability'],
  },
  faqs: [
    {
      question: "How much is a haircut?",
      answer: "Men's haircut is $35 and Women's haircut is $55 (demonstration prices). We also offer beard trims at $25 and other services at varying price points.",
    },
    {
      question: "What other services do you offer?",
      answer: "We offer a full range of services including women's haircuts, hair coloring (full and highlights), blow-dries, beard trims, deep conditioning treatments, and updo styles for special occasions.",
    },
    {
      question: "Are you open on Saturday?",
      answer: "Yes, Saturday hours are 9:00 AM to 5:00 PM. Sunday is listed as closed; special appointments may be requested but are not confirmed here.",
    },
    {
      question: "How long does this service take?",
      answer: "Service durations vary: Men's haircut 45 min, Women's haircut 60 min, Full hair color 120 min, Highlights 90 min, Blow-dry 30 min, Beard trim 30 min, Deep conditioning 20 min, Updo 60 min. Actual time may vary based on hair type and requirements.",
    },
    {
      question: "Can I request an appointment for tomorrow?",
      answer: "I can collect your preferred service and time for a demonstration request. Please contact the salon directly to check tomorrow's availability; no online booking system is connected.",
    },
    {
      question: "Do you accept walk-ins?",
      answer: "Walk-in and same-day availability have not been provided. Contact the salon before visiting without an appointment.",
    },
    {
      question: "Do you offer gift certificates?",
      answer: "Gift certificate availability and terms have not been provided in this demonstration. Contact the salon to ask.",
    },
    {
      question: "Do you need a patch test before hair color?",
      answer: "Color-service preparation and patch-test procedures have not been provided here. Contact the salon before arranging a color service.",
    },
    {
      question: "What should I bring or prepare for my appointment?",
      answer: "Preparation details have not been provided. You may bring a style reference if helpful; contact the salon for service-specific guidance.",
    },
  ],
  appointmentNote: "Appointment collection is for demonstration only. No real booking is confirmed unless a genuine booking integration exists and confirms it.",
};


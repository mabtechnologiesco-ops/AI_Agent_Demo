import type { DemoBusinessProfile } from './common';

/**
 * Hotel AI Agent Knowledge Base - Demonstration Data
 * This is demonstration content for the MAB Technologies SL AI Agent Showroom.
 * All businesses, prices, and policies are simulated demonstration data.
 */

export interface HotelRoom {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  amenities: string[];
}

export interface HotelKnowledgeBase extends DemoBusinessProfile {
  checkInTime: string;
  checkOutTime: string;
  rooms: HotelRoom[];
  amenities: string[];
  facilities: string[];
  restaurantInfo: {
    name: string;
    description: string;
  };
  reservationProcedure: string;
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    pets: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  // Availability is intentionally not provided - this is a demonstration
  availabilityNote: string;
}

// Hotel demonstration data
export const hotelKnowledgeBase: HotelKnowledgeBase = {
  businessName: "Blue Ocean Hotel",
  businessDescription: "A fictional seaside hotel demonstration offering sample room types, facilities, and guest services for the MAB Technologies showroom.",
  businessHours: {
    schedule: [
      { service: 'Reception', days: 'Every day', hours: 'Open 24 hours' },
      { service: 'Ocean Breeze Restaurant', days: 'Every day', hours: '7:00 AM - 10:00 PM' },
    ],
    timezone: null,
    holidayHours: null,
  },
  checkInTime: "3:00 PM",
  checkOutTime: "11:00 AM",
  rooms: [
    {
      id: "standard",
      name: "Standard Room",
      description: "Comfortable room with sea view, perfect for solo travelers or couples. Features a comfortable bed, private bathroom, and modern amenities.",
      pricePerNight: 50,
      amenities: ["Wi-Fi", "TV", "Air conditioning", "Minibar", "Private bathroom"],
    },
    {
      id: "deluxe",
      name: "Deluxe Room",
      description: "Spacious room with enhanced sea view and premium furnishings. Includes separate sitting area and upgraded bathroom amenities.",
      pricePerNight: 80,
      amenities: ["Wi-Fi", "TV", "Air conditioning", "Minibar", "Private balcony", " bathrobes", "Slippers"],
    },
    {
      id: "executive",
      name: "Executive Suite",
      description: "Luxury suite with panoramic sea view, separate living and sleeping areas, and premium services. Ideal for business travelers and special occasions.",
      pricePerNight: 120,
      amenities: ["Wi-Fi", "TV", "Air conditioning", "Minibar", "Private balcony", "Living area", "Jacuzzi", "Premium bath products"],
    },
  ],
  amenities: [
    "24-hour front desk",
    "Daily housekeeping",
    "Pool access",
    "Fitness center",
    "Spa services",
    "Business center",
    "Luggage storage",
  ],
  facilities: [
    "Outdoor swimming pool",
    "Private beach area",
    "Restaurant and bar",
    "Conference rooms",
    "Meeting facilities",
    "Valet parking",
    "Airport shuttle",
  ],
  restaurantInfo: {
    name: "Ocean Breeze Restaurant",
    description: "Our restaurant offers a diverse menu of local and international cuisine, prepared with fresh local ingredients. Enjoy breakfast, lunch, and dinner with stunning sea views.",
  },
  reservationProcedure: 'To request a reservation, contact reception by phone or email with check-in and check-out dates, room preference, and guest count. Availability must be checked directly; no live reservation system is connected.',
  policies: {
    checkIn: "Check-in available from 3:00 PM. Late check-in arrangements can be made upon request.",
    checkOut: "Check-out by 11:00 AM. Late check-out subject to availability and may incur additional fees.",
    cancellation: "Cancellation up to 24 hours before check-in for full refund. cancellations within 24 hours are subject to a 50% fee.",
    pets: "Pets are not permitted at the hotel.",
  },
  contact: {
    phone: "+1-555-0123",
    email: "info@blueoceanhotel.example",
    address: "123 Seaside Boulevard, Coastal City, CC 12345",
    website: null,
  },
  paymentInformation: null,
  dataStatus: {
    businessData: 'Fictional demonstration data',
    liveSystems: 'Not connected',
    notProvided: ['Business timezone', 'Holiday hours', 'Payment methods', 'Taxes and additional room charges', 'Facility-specific operating hours', 'Parking fees and terms', 'Airport shuttle schedule and charges', 'Live room availability'],
  },
  faqs: [
    {
      question: "How much is a room per night?",
      answer: "Our room rates range from $50 per night for a Standard Room to $120 per night for an Executive Suite. These are demonstration prices.",
    },
    {
      question: "What is included in the Deluxe Room?",
      answer: "The Deluxe Room includes Wi-Fi, TV, air conditioning, minibar, private balcony, bathrobes, and slippers. Demonstration amenities.",
    },
    {
      question: "Do you provide Wi-Fi?",
      answer: "Wi-Fi is listed as an amenity for the sample room types. Property-wide coverage and any related charges have not been provided.",
    },
    {
      question: "What time is check-in?",
      answer: "Check-in is at 3:00 PM. Early check-in may be available subject to availability. Demonstration information.",
    },
    {
      question: "Does the hotel have a restaurant?",
      answer: "Yes, we have the Ocean Breeze Restaurant serving breakfast, lunch, and dinner from 7:00 AM to 10:00 PM. Demonstration information.",
    },
    {
      question: "Do you provide airport pickup?",
      answer: "An airport shuttle is listed among the sample facilities. Pickup schedules and charges have not been provided; contact reception to ask. No transfer is booked by this assistant.",
    },
    {
      question: "Is a room available this weekend?",
      answer: "Live availability cannot be confirmed in this demonstration because no availability data is connected. Please contact the hotel directly to check your dates.",
    },
    {
      question: "How much would two nights cost?",
      answer: "Two nights in a Standard Room would be $100 (demonstration price: $50 × 2 nights). This estimate excludes taxes and other charges not specified in the knowledge base.",
    },
  ],
  availabilityNote: "Live availability is not provided or connected. Room availability cannot be confirmed in this demonstration.",
};


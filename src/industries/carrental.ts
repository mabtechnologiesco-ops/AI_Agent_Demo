import type { DemoBusinessProfile } from './common';

/**
 * Car Rental AI Agent Knowledge Base - Demonstration Data
 * This is demonstration content for the MAB Technologies SL AI Agent Showroom.
 * All businesses, prices, and policies are simulated demonstration data.
 */

export interface RentalVehicle {
  id: string;
  name: string;
  type: string;
  description: string;
  dailyRate: number;
  passengerCapacity: number;
  fuelType: string;
}

export interface CarRentalKnowledgeBase extends DemoBusinessProfile {
  pickupReturnInformation: string;
  reservationProcedure: string;
  cancellationPolicy: string | null;
  rentalRequirements: string[];
  insuranceInformation: string;
  depositPolicy: string | null;
  mileagePolicy: string | null;
  fuelPolicy: string;
  vehicles: RentalVehicle[];
  faqs: {
    question: string;
    answer: string;
  }[];
  availabilityNote: string;
}

// Car rental demonstration data
export const carRentalKnowledgeBase: CarRentalKnowledgeBase = {
  businessName: "Coastline Car Rentals",
  businessDescription: "A trusted car rental service providing quality vehicles for short-term and long-term rentals. We offer a wide selection of cars for business and leisure travel with competitive rates and excellent customer service.",
  businessHours: {
    schedule: [
      { service: 'Rental office', days: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
      { service: 'Rental office', days: 'Saturday', hours: '9:00 AM - 4:00 PM' },
      { service: 'Rental office', days: 'Sunday', hours: 'Closed' },
    ],
    timezone: null,
    holidayHours: null,
  },
  pickupReturnInformation: "Demonstration pickup and return point: 321 Highway Drive, Auto City. Arrange pickup and return times with the rental team during opening hours. No live reservation system is connected.",
  reservationProcedure: 'Contact the rental office with your preferred vehicle category and pickup and return dates. Dates and availability must be checked by the business; no live reservation system is connected.',
  cancellationPolicy: null,
  rentalRequirements: [
    "Valid driver's license held for at least 1 year",
    "Minimum age: 21 years (additional fee for drivers under 25)",
    "Major credit card in the driver's name",
    "Proof of insurance (or select our coverage options)",
  ],
  insuranceInformation: "Our rental includes basic third-party liability coverage. Additional coverage options are available at the counter for a daily fee, including collision damage waiver and personal accident insurance.",
  depositPolicy: null,
  mileagePolicy: null,
  fuelPolicy: 'Vehicles are supplied with a full tank and should be returned full. A refuelling charge may apply if the vehicle is returned below the pickup fuel level.',
  vehicles: [
    {
      id: "compact",
      name: "Compact Car",
      type: "Hatchback",
      description: "Fuel-efficient compact car ideal for city driving and short trips. Easy to park and navigate through traffic.",
      dailyRate: 45,
      passengerCapacity: 5,
      fuelType: "Petrol",
    },
    {
      id: "suv",
      name: "SUV",
      type: "SUV",
      description: "Spacious sport utility vehicle with higher seating and ample cargo space. Perfect for families and group travel.",
      dailyRate: 75,
      passengerCapacity: 7,
      fuelType: "Petrol",
    },
    {
      id: "convertible",
      name: "Convertible",
      type: "Convertible",
      description: "Stylish convertible for open-air driving and special occasions. Enjoy the sunshine and attention on the road.",
      dailyRate: 100,
      passengerCapacity: 4,
      fuelType: "Petrol",
    },
    {
      id: "luxury-sedan",
      name: "Luxury Sedan",
      type: "Sedan",
      description: "Premium luxury sedan with premium leather interior and advanced features. Ideal for business trips and executive travel.",
      dailyRate: 130,
      passengerCapacity: 5,
      fuelType: "Diesel",
    },
    {
      id: "minivan",
      name: "Minivan",
      type: "Minivan",
      description: "Large minivan with three-row seating and extensive cargo space. Perfect for large families and group airport transfers.",
      dailyRate: 95,
      passengerCapacity: 9,
      fuelType: "Petrol",
    },
  ],
  contact: {
    phone: "+1-555-0478",
    email: "info@coastlinecarrentals.example",
    address: "321 Highway Drive, Auto City, AC 54321",
    website: null,
  },
  paymentInformation: null,
  dataStatus: {
    businessData: 'Fictional demonstration data',
    liveSystems: 'Not connected',
    notProvided: ['Business timezone', 'Holiday hours', 'Deposit amount and terms', 'Mileage limit', 'Exact under-25 fee', 'Additional-driver policy and charges', 'Cancellation terms', 'Payment methods', 'Vehicle availability', 'Optional insurance charges'],
  },
  faqs: [
    {
      question: "How much does it cost to rent an SUV?",
      answer: "Our SUV rental is $75 per day (demonstration price). Rates vary by vehicle type: Compact Car $45/day, SUV $75/day, Convertible $100/day, Luxury Sedan $130/day, Minivan $95/day.",
    },
    {
      question: "How many passengers can this car carry?",
      answer: "Passenger capacity varies by vehicle: Compact Car 5, SUV 7, Convertible 4, Luxury Sedan 5, Minivan 9. Please specify which vehicle you're interested in.",
    },
    {
      question: "What documents do I need?",
      answer: "You'll need a valid driver's license held for at least 1 year, a major credit card in the driver's name, and proof of identification. Minimum age is 21 (additional fee for drivers under 25).",
    },
    {
      question: "Can I rent a car for three days?",
      answer: "Yes, we offer rental periods to suit your needs. Three-day rentals are available at the daily rate. Total estimated cost would be 3 × daily rate (demonstration pricing).",
    },
    {
      question: "Do you have a vehicle available next weekend?",
      answer: "Live vehicle availability cannot be confirmed in this demonstration because no availability data is connected. Please contact the rental location to check your dates.",
    },
    {
      question: "Can you estimate the rental cost?",
      answer: "I can help estimate rental costs based on your preferred vehicle and rental dates. For example, an SUV for 3 days would be approximately $225 (demonstration rate: $75 × 3 days). This estimate excludes additional fees, taxes, and optional insurance coverage.",
    },
    {
      question: "What fuel policy applies?",
      answer: "Vehicles are supplied with a full tank and should be returned full. A refuelling charge may apply if the vehicle is returned below the pickup fuel level.",
    },
    {
      question: "Is there a mileage limit?",
      answer: "A mileage limit has not been provided for this demonstration. Please confirm the mileage terms with the rental office before renting.",
    },
    {
      question: "Can I add an additional driver?",
      answer: "Additional-driver rules and fees have not been provided in this demonstration. Please confirm them with the rental office.",
    },
  ],
  availabilityNote: "Live vehicle availability is not provided or connected. A vehicle cannot be confirmed as available in this demonstration.",
};


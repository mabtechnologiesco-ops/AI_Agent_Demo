import type { DemoBusinessProfile } from './common';

/**
 * Restaurant AI Agent Knowledge Base - Demonstration Data
 * This is demonstration content for the MAB Technologies SL AI Agent Showroom.
 * All businesses, prices, and policies are simulated demonstration data.
 */

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  portionSize: string | null;
  dietaryInformation: string | null;
}

export interface RestaurantKnowledgeBase extends DemoBusinessProfile {
  deliveryInformation: string;
  tableReservationProcedure: string;
  orderDemonstrationProcedure: string;
  dietaryInformationNote: string;
  deliveryFees: string | null;
  menu: MenuItem[];
  faqs: {
    question: string;
    answer: string;
  }[];
  // Stock information is intentionally not provided
  stockNote: string;
}

// Restaurant demonstration data
export const restaurantKnowledgeBase: RestaurantKnowledgeBase = {
  businessName: "Sunny Side Bistro",
  businessDescription: "A fictional neighborhood bistro demonstration with a sample menu of familiar, freshly prepared meals.",
  businessHours: {
    schedule: [
      { service: 'Dining room', days: 'Monday - Thursday', hours: '11:00 AM - 10:00 PM' },
      { service: 'Dining room', days: 'Friday - Saturday', hours: '11:00 AM - 11:00 PM' },
      { service: 'Dining room', days: 'Sunday', hours: '12:00 PM - 9:00 PM' },
    ],
    timezone: null,
    holidayHours: null,
  },
  deliveryInformation: "Delivery available within 5 miles. Collection also welcome. Minimum order $15.",
  deliveryFees: null,
  tableReservationProcedure: 'For a table reservation, call the restaurant with your preferred date, time, and party size. Weekend dinner reservations are recommended. No online booking system is connected in this demonstration.',
  orderDemonstrationProcedure: 'The assistant may collect menu items and quantities and show an order summary for demonstration only. It cannot submit the order to a kitchen or take payment.',
  dietaryInformationNote: 'Dietary and allergen information is not verified in this demonstration. Confirm ingredients and preparation directly with the restaurant before ordering.',
  menu: [
    {
      id: "chicken-parm",
      name: "Chicken Parmesan",
      category: "Main Courses",
      description: "Golden-breaded chicken breast topped with marinara sauce and melted mozzarella cheese, served with spaghetti and side salad.",
      price: 18,
      portionSize: null,
      dietaryInformation: null,
    },
    {
      id: "margherita",
      name: "Margherita Pizza",
      category: "Pizza",
      description: "Fresh mozzarella, ripe tomatoes, and basil on our hand-tossed dough, baked to perfection in our wood-fired oven.",
      price: 15,
      portionSize: null,
      dietaryInformation: null,
    },
    {
      id: "caesar-salad",
      name: "Caesar Salad",
      category: "Salads",
      description: "Romaine lettuce with house-made Caesar dressing, parmesan cheese, croutons, and grilled chicken optional.",
      price: 12,
      portionSize: null,
      dietaryInformation: null,
    },
    {
      id: "bruschetta",
      name: "Bruschetta starter",
      category: "Starters",
      description: "Grilled bread rubbed with garlic topped with diced tomatoes, fresh basil, and olive oil.",
      price: 8,
      portionSize: null,
      dietaryInformation: null,
    },
    {
      id: "tiramisu",
      name: "Tiramisu",
      category: "Desserts",
      description: "Classic Italian dessert with layers of coffee-soaked ladyfingers, mascarpone cheese, and cocoa powder.",
      price: 9,
      portionSize: null,
      dietaryInformation: null,
    },
    {
      id: "gelato",
      name: "Gelato",
      category: "Desserts",
      description: "Authentic Italian gelato in flavours of your choice. Made fresh daily with premium ingredients.",
      price: 7,
      portionSize: null,
      dietaryInformation: null,
    },
    {
      id: "spaghetti-bolognese",
      name: "Spaghetti Bolognese",
      category: "Main Courses",
      description: "Traditional Italian meat sauce served over spaghetti pasta, prepared with ground beef, tomatoes, and herbs.",
      price: 17,
      portionSize: null,
      dietaryInformation: null,
    },
    {
      id: "rib-eye",
      name: "Rib-eye Steak",
      category: "Main Courses",
      description: "Prime rib-eye steak, grilled to your preference, served with roasted vegetables and mashed potato.",
      price: 28,
      portionSize: null,
      dietaryInformation: null,
    },
    {
      id: "vegan-pasta",
      name: "Vegan Pasta Primavera",
      category: "Main Courses",
      description: "Fresh vegetables and pasta in light olive oil sauce, perfect for vegan diets. Seasonal vegetables available.",
      price: 16,
      portionSize: null,
      dietaryInformation: 'Described as vegan in this sample menu. Confirm ingredients and preparation directly with the restaurant.',
    },
  ],
  contact: {
    phone: "+1-555-0246",
    email: "info@sunny-side-bistro.example",
    address: "456 Main Street, Foodtown, FT 67890",
    website: null,
  },
  paymentInformation: null,
  dataStatus: {
    businessData: 'Fictional demonstration data',
    liveSystems: 'Not connected',
    notProvided: ['Business timezone', 'Holiday hours', 'Portion sizes', 'Verified dietary and allergen details except the sample description for Vegan Pasta Primavera', 'Delivery charges', 'Payment methods', 'Live menu availability'],
  },
  faqs: [
    {
      question: "What food do you have?",
      answer: "The sample menu includes Chicken Parmesan, Margherita Pizza, Caesar Salad, Bruschetta, desserts, and other listed items. No daily specials are configured.",
    },
    {
      question: "How much does the chicken meal cost?",
      answer: "The Chicken Parmesan is $18. This is a demonstration price.",
    },
    {
      question: "Do you have vegetarian options?",
      answer: "Vegan Pasta Primavera is described as vegan in the sample menu. Other dietary details are not verified; ask the restaurant about ingredients and preparation before ordering.",
    },
    {
      question: "What time do you close?",
      answer: "Our closing time varies by day: Monday - Thursday until 10:00 PM, Friday - Saturday until 11:00 PM, and Sunday until 9:00 PM.",
    },
    {
      question: "Do you offer delivery?",
      answer: "Yes, we offer delivery within 5 miles and collection is always welcome. Minimum order $15.",
    },
    {
      question: "Can you help me place an order?",
      answer: "I can help you explore our menu and place a demonstration order. The order is for demonstration only and has not been submitted to a real kitchen.",
    },
    {
      question: "Do you have vegan options?",
      answer: "The configured menu includes Vegan Pasta Primavera. Please ask the restaurant about ingredients and current item availability.",
    },
    {
      question: "What is the difference between gelato and ice cream?",
      answer: "Gelato is denser and contains less air and less fat than traditional ice cream, served at a slightly warmer temperature to enhance the flavour.",
    },
    {
      question: "Can I make a reservation?",
      answer: "Reservations are recommended for dinner, especially on weekends. A booking system is not connected in this demonstration, so please contact the restaurant directly.",
    },
  ],
  stockNote: "Stock information is not provided in this demonstration. Any menu item availability is for demonstration purposes only.",
};


import type { DemoBusinessProfile } from './common';

/**
 * E-commerce AI Agent Knowledge Base - Demonstration Data
 * This is demonstration content for the MAB Technologies SL AI Agent Showroom.
 * All businesses, prices, and policies are simulated demonstration data.
 */

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  variantType: 'Colour' | null;
  options: string[];
  availability: string | null;
}

// Base ecommerce knowledge
export interface EcommerceKnowledgeBase extends DemoBusinessProfile {
  deliveryPolicy: string;
  deliveryArea: string | null;
  deliveryCharges: string | null;
  returnPolicy: string;
  exchangePolicy: string | null;
  warrantyInformation: string | null;
  products: Product[];
  faqs: {
    question: string;
    answer: string;
  }[];
  stockNote: string;
}

export const ecommerceKnowledgeBase: EcommerceKnowledgeBase = {
  businessName: 'Northline Supply',
  businessDescription: 'A considered everyday goods shop for useful home, travel, and personal essentials. Every item shown is sample catalogue content for this showroom.',
  businessHours: {
    schedule: [
      { service: 'Customer service', days: 'Monday - Saturday', hours: '9:00 AM - 6:00 PM' },
      { service: 'Customer service', days: 'Sunday', hours: 'Closed' },
    ],
    timezone: null,
    holidayHours: null,
  },
  deliveryPolicy: 'Demonstration policy: standard delivery is estimated at 3-5 business days. Delivery fees and service areas are not configured.',
  deliveryArea: null,
  deliveryCharges: null,
  returnPolicy: 'Demonstration policy: unused items may be requested for return within 30 days. Return shipping and eligibility details should be confirmed with the store.',
  exchangePolicy: null,
  warrantyInformation: null,
  products: [
    { id: 'canvas-tote', name: 'Everyday Canvas Tote', category: 'Accessories', description: 'A sturdy cotton-canvas carryall with an interior pocket for daily errands and commutes.', price: 24, variantType: 'Colour', options: ['Natural', 'Forest green'], availability: null },
    { id: 'steel-bottle', name: 'Insulated Steel Bottle', category: 'Travel', description: 'Double-wall stainless steel bottle with a leak-resistant screw cap.', price: 32, variantType: 'Colour', options: ['Sand', 'Ocean blue', 'Charcoal'], availability: null },
    { id: 'desk-lamp', name: 'Arc Desk Lamp', category: 'Home', description: 'A compact reading lamp with a powder-coated metal shade and weighted base.', price: 68, variantType: 'Colour', options: ['Warm white', 'Matte black'], availability: null },
    { id: 'weekend-pack', name: 'Weekend Pack', category: 'Travel', description: 'A lightweight day pack with a padded laptop sleeve and two side pockets.', price: 74, variantType: 'Colour', options: ['Slate', 'Olive'], availability: null },
    { id: 'linen-throw', name: 'Linen Blend Throw', category: 'Home', description: 'A soft textured throw for layering over a sofa or the end of a bed.', price: 58, variantType: 'Colour', options: ['Clay', 'Oat'], availability: null },
    { id: 'ceramic-set', name: 'Stoneware Mug Set', category: 'Home', description: 'Two wheel-finished stoneware mugs with a satin glaze.', price: 38, variantType: 'Colour', options: ['Chalk', 'Moss'], availability: null },
  ],
  contact: { phone: '+1-555-0367', email: 'hello@northlinesupply.example', address: '48 Market Lane, Commerce District', website: null },
  paymentInformation: null,
  dataStatus: {
    businessData: 'Fictional demonstration data',
    liveSystems: 'Not connected',
    notProvided: ['Business timezone', 'Holiday hours', 'Product sizes', 'Live inventory', 'Delivery areas and fees', 'Exchange terms', 'Warranty terms', 'Payment methods'],
  },
  faqs: [
    { question: 'Do you have this product?', answer: 'The sample catalogue shows the products listed on this page. Live stock is not connected, so availability cannot be confirmed.' },
    { question: 'Can you recommend something within my budget?', answer: 'Tell me your budget and what you need it for, and I can compare the configured sample catalogue.' },
    { question: 'What is your delivery policy?', answer: 'Demonstration policy: standard delivery is estimated at 3-5 business days. Delivery fees and service areas are not configured.' },
  ],
  stockNote: 'Live inventory is not connected. Product availability cannot be confirmed in this demonstration.',
};


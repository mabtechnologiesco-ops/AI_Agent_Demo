import { hotelKnowledgeBase } from './hotel';
import { restaurantKnowledgeBase } from './restaurant';
import { ecommerceKnowledgeBase } from './ecommerce';
import { carRentalKnowledgeBase } from './carrental';
import { clinicKnowledgeBase } from './clinic';
import { salonKnowledgeBase } from './salon';
import { constructionKnowledgeBase } from './construction';
import type { IndustryScenario } from '@/types/chat';

export const industryKnowledgeBases = {
  hotel: hotelKnowledgeBase,
  restaurant: restaurantKnowledgeBase,
  ecommerce: ecommerceKnowledgeBase,
  carrental: carRentalKnowledgeBase,
  clinic: clinicKnowledgeBase,
  salon: salonKnowledgeBase,
  construction: constructionKnowledgeBase,
} satisfies Record<Exclude<IndustryScenario, null>, object>;

export type IndustryKnowledgeBase =
  (typeof industryKnowledgeBases)[keyof typeof industryKnowledgeBases];

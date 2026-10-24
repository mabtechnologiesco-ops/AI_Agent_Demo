import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, Check, Clock3, MapPin, Menu, MessageCircle, Phone, X } from 'lucide-react';
import type { IndustryScenario, ChatMessage } from '@/types/chat';
import { INDUSTRY_SCENARIOS } from '@/lib/scenarios';
import { industryKnowledgeBases } from '@/industries';
import { sendChatMessage } from '@/lib/api';
import './industry-demo.css';

const visuals: Record<Exclude<IndustryScenario, null>, { eyebrow: string; tagline: string; image: string; tint: string; assistant: string; suggestions: string[]; label: string }> = {
  hotel: { eyebrow: 'A quieter kind of coastal escape', tagline: 'Wake up where the horizon begins.', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2200&q=85', tint: '#164e55', assistant: 'Mara, hotel concierge', label: 'Stay by the sea', suggestions: ['Room prices', 'What time is check-in?', 'Do you have Wi-Fi?'] },
  restaurant: { eyebrow: 'Seasonal plates · neighbourhood warmth', tagline: 'A little more time around the table.', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2200&q=85', tint: '#7b3f2d', assistant: 'Olive, dining assistant', label: 'Come hungry', suggestions: ['Show me the menu', 'Vegetarian options?', 'What time do you close?'] },
  ecommerce: { eyebrow: 'Objects for everyday rituals', tagline: 'Good things, chosen with care.', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2200&q=85', tint: '#34533f', assistant: 'Nori, shop guide', label: 'The useful things', suggestions: ['Recommend something under $40', 'What is your delivery policy?', 'Compare the travel items'] },
  carrental: { eyebrow: 'The open road, made a little easier', tagline: 'Take the scenic route.', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=85', tint: '#344e67', assistant: 'Miles, rental guide', label: 'Choose your drive', suggestions: ['SUV daily rate?', 'How many passengers fit?', 'What documents do I need?'] },
  clinic: { eyebrow: 'Thoughtful care, close to home', tagline: 'Here for your everyday health.', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=2200&q=85', tint: '#2e6d68', assistant: 'Sage, clinic information', label: 'Care with clarity', suggestions: ['What services do you offer?', 'When are you open?', 'How do I request an appointment?'] },
  salon: { eyebrow: 'A little time, just for you', tagline: 'Feel like yourself, only fresher.', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2200&q=85', tint: '#754b5e', assistant: 'June, studio concierge', label: 'Your chair is waiting', suggestions: ['How much is a haircut?', 'Show me your services', 'Are you open Saturday?'] },
  construction: { eyebrow: 'Built with care, from the ground up', tagline: 'Make room for what comes next.', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2200&q=85', tint: '#765b34', assistant: 'Mason, project guide', label: 'Start with a good plan', suggestions: ['What services do you provide?', 'Do you build homes?', 'What do you need for a quote?'] },
};

const cardImages: Record<Exclude<IndustryScenario, null>, string[]> = {
  hotel: ['photo-1611892440504-42a792e24d32', 'photo-1590490360182-c33d57733427', 'photo-1578683010236-d716f9a3f461'],
  restaurant: ['photo-1547592180-85f173990554', 'photo-1473093295043-cdd812d0e601', 'photo-1540189549336-e6e99c3679fe'],
  ecommerce: ['photo-1523275335684-37898b6baf30', 'photo-1542291026-7eec264c27ff', 'photo-1526170375885-4d8ecf77b99f'],
  carrental: ['photo-1549317661-bd32c8ce0db2', 'photo-1504215680853-026ed2a45def', 'photo-1492144534655-ae79c964c9d7'],
  clinic: ['photo-1576091160399-112ba8d25d1d', 'photo-1559757148-5c350d0d3c56'],
  salon: ['photo-1522337360788-8b13dee7a37e', 'photo-1562322140-8baeececf3df', 'photo-1600948836101-f9ffda59d250'],
  construction: ['photo-1600607687939-ce8a6c25118c', 'photo-1600566753086-00f18fb6b3ea'],
};

type KnowledgeBase = Record<string, unknown> & { businessName: string; businessDescription: string; contact: { phone: string; email: string; address: string; website: string | null }; faqs?: { question: string; answer: string }[] };

function strings(value: unknown): string[] { return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === 'string') : []; }
function records(value: unknown): Record<string, unknown>[] { return Array.isArray(value) ? value.filter((entry): entry is Record<string, unknown> => Boolean(entry) && typeof entry === 'object') : []; }
function money(value: unknown) { return typeof value === 'number' ? `$${value.toFixed(0)}` : ''; }
function formatHours(value: unknown): string {
  if (!value || typeof value !== 'object' || !Array.isArray((value as Record<string, unknown>).schedule)) return 'Business hours have not been provided.';
  const hours = value as { schedule: Array<{ service: string; days: string; hours: string }>; timezone: string | null; holidayHours: string | null };
  const schedule = hours.schedule.map((item) => `${item.service} · ${item.days}: ${item.hours}`).join('\n');
  const timezone = hours.timezone || 'Timezone not specified';
  const holidays = hours.holidayHours || 'Holiday hours not provided';
  return `${schedule || 'Regular opening hours not provided.'}\n${timezone} · ${holidays}`;
}

function ChatWidget({ industry, knowledge, suggestions, assistant }: { industry: Exclude<IndustryScenario, null>; knowledge: KnowledgeBase; suggestions: string[]; assistant: string }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [demoMode, setDemoMode] = useState(true);
  const [error, setError] = useState('');
  const [draft, setDraft] = useState('');
  const greeting = `Welcome to ${knowledge.businessName}. I’m ${assistant}. Ask me about the information shown here. This is a demonstration assistant.`;
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: 'greeting', role: 'ai', content: greeting, timestamp: Date.now() }]);
  const send = async (text: string) => {
    const question = text.trim();
    if (!question || busy) return;
    const userMessage: ChatMessage = { id: `${Date.now()}-user`, role: 'user', content: question, timestamp: Date.now() };
    const next = [...messages, userMessage];
    setMessages(next); setDraft(''); setBusy(true); setError('');
    try {
      const result = await sendChatMessage(next, industry, knowledge);
      setDemoMode(result.demoMode);
      setMessages((current) => [...current, { id: `${Date.now()}-ai`, role: 'ai', content: result.message, timestamp: Date.now() }]);
    } catch (issue) {
      setError(issue instanceof Error ? issue.message : 'The assistant could not respond. Please try again.');
    } finally { setBusy(false); }
  };
  const reset = () => { setMessages([{ id: `${Date.now()}-greeting`, role: 'ai', content: greeting, timestamp: Date.now() }]); setError(''); setDemoMode(true); };
  return <div className="showroom-chat-root">
    {open && <section className="showroom-chat" aria-label={`${knowledge.businessName} AI assistant`}>
      <header className="showroom-chat-head"><span className="showroom-chat-avatar">✳</span><div className="showroom-chat-title"><strong>{assistant}</strong><span><i /> {demoMode ? 'Grounded demo assistant' : 'AI assistant · live model'}</span></div><button onClick={reset} aria-label="Start a new conversation" title="New conversation">↻</button><button onClick={() => setOpen(false)} aria-label="Close chat"><X size={18}/></button></header>
      <div className="showroom-chat-messages" aria-live="polite">
        {messages.map((message) => <div key={message.id} className={`showroom-message ${message.role === 'user' ? 'is-user' : ''}`}><p>{message.content}</p></div>)}
        {busy && <div className="showroom-message"><p className="showroom-loading"><i/><i/><i/></p></div>}
        {error && <div className="showroom-chat-error"><span>{error}</span><button onClick={() => send(messages[messages.length - 1]?.content || '')}>Retry</button></div>}
      </div>
      {messages.length === 1 && <div className="showroom-suggestions">{suggestions.map((suggestion) => <button key={suggestion} onClick={() => send(suggestion)}>{suggestion} <ArrowRight size={12}/></button>)}</div>}
      <form className="showroom-chat-form" onSubmit={(event) => { event.preventDefault(); void send(draft); }}><input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Ask a question…" aria-label="Message the assistant"/><button disabled={busy || !draft.trim()} aria-label="Send message"><ArrowRight size={17}/></button></form>
      <div className="showroom-chat-foot">Sample business information · no real transaction</div>
    </section>}
    <button className={`showroom-chat-launcher ${open ? 'is-open' : ''}`} onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close assistant' : `Chat with ${assistant}`}>{open ? <X size={22}/> : <><MessageCircle size={21}/><span>Ask our assistant</span></>}</button>
  </div>;
}

export default function IndustryDemoPage({ industry, onBack }: { industry: Exclude<IndustryScenario, null>; onBack: () => void }) {
  const knowledge = industryKnowledgeBases[industry] as unknown as KnowledgeBase;
  const scenario = INDUSTRY_SCENARIOS.find((item) => item.id === industry)!;
  const config = visuals[industry];
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { document.title = `${knowledge.businessName} — ${scenario.shortName} Demo · MAB Technologies`; return () => { document.title = 'MAB Technologies SL — AI Agent Showroom'; }; }, [knowledge.businessName, scenario.shortName]);
  const cards = useMemo(() => {
    const source = industry === 'hotel' ? knowledge.rooms : industry === 'restaurant' ? knowledge.menu : industry === 'ecommerce' ? knowledge.products : industry === 'carrental' ? knowledge.vehicles : industry === 'salon' ? knowledge.services : [];
    return records(source);
  }, [industry, knowledge]);
  const services = industry === 'clinic'
    ? records(knowledge.services).map((service) => ({ name: String(service.name || ''), description: String(service.description || '') }))
    : industry === 'construction'
      ? strings(knowledge.servicesOffered).map((name) => ({ name, description: 'Sample service offering. Request a consultation to discuss project scope and requirements.' }))
      : [];
  const projectExamples = records(knowledge.projectExamples);
  const opening = formatHours(knowledge.businessHours);
  return <div className={`industry-demo industry-${industry}`} style={{ '--demo-accent': config.tint } as CSSProperties}>
    <div className="demo-banner"><span>DESIGN PREVIEW</span><span>Fictional business · sample content and prices</span><button onClick={onBack}><ArrowLeft size={14}/> Back to MAB showroom</button></div>
    <header className="demo-nav"><button className="demo-wordmark" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{knowledge.businessName}<small>INDEPENDENT {industry === 'hotel' ? 'HOTEL' : industry === 'restaurant' ? 'KITCHEN' : industry === 'ecommerce' ? 'GOODS' : industry === 'carrental' ? 'MOBILITY' : industry === 'clinic' ? 'HEALTH' : industry === 'salon' ? 'STUDIO' : 'BUILDERS'}</small></button>
      <nav className={menuOpen ? 'is-visible' : ''}><a href="#story" onClick={() => setMenuOpen(false)}>Our story</a><a href="#offerings" onClick={() => setMenuOpen(false)}>{industry === 'hotel' ? 'Stay' : industry === 'restaurant' ? 'Menu' : industry === 'ecommerce' ? 'Shop' : industry === 'carrental' ? 'Vehicles' : 'Services'}</a><a href="#visit" onClick={() => setMenuOpen(false)}>Visit</a><button className="demo-nav-cta" onClick={() => { document.querySelector('.showroom-chat-launcher')?.dispatchEvent(new MouseEvent('click', { bubbles: true })); }}>{industry === 'clinic' || industry === 'salon' ? 'Ask about a visit' : industry === 'construction' ? 'Start an enquiry' : 'Ask a question'} <ArrowRight size={14}/></button></nav><button className="demo-menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button>
    </header>
    <main>
      <section className="demo-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(14,24,24,.65), rgba(14,24,24,.08)), url("${config.image}")` }}>
        <div className="demo-hero-content"><span className="demo-eyebrow">{config.eyebrow}</span><h1>{config.tagline}</h1><p>{knowledge.businessDescription}</p><div className="demo-hero-actions"><a href="#offerings" className="demo-primary-link">{config.label}<ArrowRight size={16}/></a><a href="#story" className="demo-text-link">Discover {knowledge.businessName}</a></div></div><span className="demo-hero-note">{industry === 'hotel' ? 'COASTAL CITY · EST. 2008' : industry === 'restaurant' ? 'FOOD MADE WITH FEELING' : 'A MAB TECHNOLOGIES SHOWROOM PREVIEW'}</span>
      </section>
      <section className="demo-story" id="story"><span className="demo-kicker">A note from us</span><h2>{industry === 'clinic' ? 'A welcoming place to find your next step.' : industry === 'construction' ? 'Good work starts with a good conversation.' : 'Thoughtfully made for the way you live.'}</h2><p>{knowledge.businessDescription}</p><span className="demo-story-mark">{knowledge.businessName.split(' ').slice(0, 2).map((part) => part[0]).join('')}</span></section>
      <section className="demo-offerings" id="offerings"><div className="demo-section-heading"><div><span className="demo-kicker">{industry === 'hotel' ? 'Find your room' : industry === 'restaurant' ? 'From our kitchen' : industry === 'ecommerce' ? 'The collection' : industry === 'carrental' ? 'Find your way' : 'What we do'}</span><h2>{industry === 'hotel' ? 'A room for your kind of getaway.' : industry === 'restaurant' ? 'Made fresh, shared together.' : industry === 'ecommerce' ? 'A few things we think you’ll love.' : industry === 'carrental' ? 'A good match for the miles ahead.' : industry === 'clinic' ? 'Care for life’s everyday needs.' : industry === 'salon' ? 'A considered menu of services.' : 'Services built around your vision.'}</h2></div><span className="demo-sample-note">Sample catalogue · demonstration only</span></div>
        {cards.length > 0 ? <div className="demo-card-grid">{cards.map((item, index) => <article className="demo-item-card" key={String(item.id || index)}><div className={`demo-item-image demo-item-image-${index % 4}`} style={{ backgroundImage: `linear-gradient(0deg,#171a1833,#171a1800 65%),url("https://images.unsplash.com/${cardImages[industry][index % cardImages[industry].length]}?auto=format&fit=crop&w=900&q=80")` }}><span>{String(item.category || item.type || item.name || 'FEATURED')}</span><b>0{index + 1}</b></div><div className="demo-item-info"><div className="demo-item-title"><h3>{String(item.name || 'Featured')}</h3><strong>{money(item.pricePerNight ?? item.dailyRate ?? item.price)}{industry === 'hotel' ? <small> / night</small> : industry === 'carrental' ? <small> / day</small> : ''}</strong></div><p>{String(item.description || '')}</p>{Array.isArray(item.amenities) && <div className="demo-chips">{strings(item.amenities).slice(0, 4).map((part) => <span key={part}>{part.trim()}</span>)}</div>}{Array.isArray(item.options) && <div className="demo-chips"><span>{String(item.variantType || 'Options')}:</span>{strings(item.options).map((part) => <span key={part}>{part}</span>)}</div>}{typeof item.passengerCapacity === 'number' && <span className="demo-card-meta">Up to {item.passengerCapacity} passengers · {String(item.fuelType || '')}</span>}{typeof item.duration === 'string' && <span className="demo-card-meta"><Clock3 size={13}/> {item.duration}</span>}</div></article>)}</div> : <div className="demo-services-grid">{services.map((service, index) => <article className="demo-service" key={service.name}><span>0{index + 1}</span><h3>{service.name}</h3><p>{service.description}</p><Check size={17}/></article>)}</div>}
        {industry === 'construction' && projectExamples.length > 0 && <div className="demo-example-grid">{projectExamples.map((example, index) => <article key={String(example.name || index)}><span>EXAMPLE ENQUIRY · 0{index + 1}</span><h3>{String(example.name)}</h3><p>{String(example.description)}</p></article>)}</div>}
        {industry === 'hotel' && <div className="demo-extra"><div><span className="demo-kicker">Make yourself at home</span><h3>Space to slow down.</h3><p>{strings(knowledge.facilities).join(' · ')}</p></div><div><span className="demo-kicker">Around the table</span><h3>{String((knowledge.restaurantInfo as Record<string, unknown>)?.name || 'Dining')}</h3><p>{String((knowledge.restaurantInfo as Record<string, unknown>)?.description || '')}</p></div></div>}
        {industry === 'construction' && <div className="demo-extra"><div><span className="demo-kicker">Materials</span><h3>Made for the long run.</h3><p>{String(knowledge.materialInformation || '')}</p></div><div><span className="demo-kicker">The first step</span><h3>Let’s plan it together.</h3><p>{String(knowledge.quotationProcess || '')}</p></div></div>}
      </section>
      {Array.isArray(knowledge.faqs) && knowledge.faqs.length > 0 && <section className="demo-faq"><div className="demo-faq-heading"><span className="demo-kicker">A few common questions</span><h2>Good questions, answered.</h2><p>These answers use the same demonstration information as the assistant.</p></div><div className="demo-faq-list">{knowledge.faqs.map((faq, index) => <details key={`${faq.question}-${index}`}><summary><span>{faq.question}</span><b>+</b></summary><p>{faq.answer}</p></details>)}</div></section>}
      <section className="demo-info-band">
        <div><span className="demo-kicker">A few useful details</span><h2>Good to know.</h2></div>
        <p className="demo-hours">{opening}</p>
        {industry === 'hotel' && <>
          <p>Check-in {String(knowledge.checkInTime)} · check-out {String(knowledge.checkOutTime)}. {String(knowledge.reservationProcedure)}</p>
          <p>{strings(knowledge.amenities).join(' · ')} · {strings(knowledge.facilities).join(' · ')}</p>
          <p>{String((knowledge.policies as Record<string, unknown> | undefined)?.cancellation || '')} {String((knowledge.policies as Record<string, unknown> | undefined)?.pets || '')}</p>
        </>}
        {industry === 'restaurant' && <><p>{String(knowledge.deliveryInformation)}</p><p>{String(knowledge.tableReservationProcedure)}</p><p>{String(knowledge.orderDemonstrationProcedure)}</p></>}
        {industry === 'ecommerce' && <p>{String(knowledge.deliveryPolicy)} {String(knowledge.returnPolicy)}</p>}
        {industry === 'carrental' && <><p>{String(knowledge.pickupReturnInformation)}</p><p>{String(knowledge.reservationProcedure)}</p><p>{strings(knowledge.rentalRequirements).join(' · ')}</p><p>{String(knowledge.insuranceInformation)}</p></>}
        {industry === 'clinic' && <><p>{String(knowledge.appointmentProcedures)}</p><p>{strings(knowledge.administrativePolicies).join(' · ')}</p><p>{String(knowledge.limitationNotice)}</p></>}
        {industry === 'salon' && <><p>{strings(knowledge.staff).join(' · ')}</p><p>{String(knowledge.appointmentProcedure)}</p><p>{String(knowledge.cancellationPolicy || 'Cancellation terms have not been provided.')}</p></>}
        {industry === 'construction' && <><p>{String(knowledge.consultationProcedure)}</p><p>Service area: {String(knowledge.serviceArea || 'Not provided in this demonstration.')}</p><p>Warranty terms: {String(knowledge.warrantyPolicy || 'Not provided in this demonstration.')}</p></>}
        <p>Payments: {String(knowledge.paymentInformation || 'Payment methods have not been provided in this demonstration.')}</p>
        <details className="demo-missing-data"><summary>Other information not provided in this demo</summary><p>{strings((knowledge.dataStatus as Record<string, unknown>)?.notProvided).join(' · ')}</p></details>
        <p className="demo-live-note">{String(knowledge.availabilityNote || knowledge.stockNote || 'All prices and policies on this page are sample demonstration content.')}</p>
      </section>
      <section className="demo-visit" id="visit"><div><span className="demo-kicker">We’d love to hear from you</span><h2>Come say hello.</h2><p><MapPin size={16}/>{knowledge.contact.address}</p><p><Phone size={16}/><a href={`tel:${knowledge.contact.phone}`}>{knowledge.contact.phone}</a></p><p><span className="demo-mail-icon">@</span><a href={`mailto:${knowledge.contact.email}`}>{knowledge.contact.email}</a></p><p className="demo-website-note">Website: {knowledge.contact.website || 'Not provided for this fictional business.'}</p></div><div className="demo-visit-card"><span>LET’S TALK</span><h3>{industry === 'construction' ? 'Tell us about the project taking shape.' : industry === 'clinic' ? 'A helpful first conversation starts here.' : 'Questions? We’re happy to help.'}</h3><button onClick={() => document.querySelector('.showroom-chat-launcher')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}>Chat with {config.assistant.split(',')[0]} <ArrowRight size={16}/></button></div></section>
    </main>
    <footer className="demo-footer"><button onClick={onBack}><ArrowLeft size={14}/> Return to MAB Technologies</button><span>Sample website · All details are fictional demonstration content</span><a href="mailto:hello@mabtechnologies.sl">MAB TECHNOLOGIES SL</a></footer>
    <ChatWidget industry={industry} knowledge={knowledge} suggestions={config.suggestions} assistant={config.assistant}/>
  </div>;
}

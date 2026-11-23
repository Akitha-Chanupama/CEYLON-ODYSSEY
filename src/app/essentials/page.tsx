import Link from "next/link";
import {
  PhoneCall,
  Shirt,
  MessageCircle,
  CloudRain,
  ShieldCheck,
  ExternalLink,
  MapPin,
  Heart,
  Luggage,
} from "lucide-react";

export default function EssentialsPage() {
  const sinhalaPhrases = [
    {
      phrase: "Ayubowan",
      sinhala: "ආයුබෝවන්",
      pronunciation: "ah-yoo-boh-wan",
      meaning: "May you live long / Warm Hello",
    },
    {
      phrase: "Istuti",
      sinhala: "ස්තූතියි",
      pronunciation: "is-too-tee",
      meaning: "Thank you",
    },
    {
      phrase: "Bohoma Istuti",
      sinhala: "බොහෝම ස්තූතියි",
      pronunciation: "boh-hoh-mah is-too-tee",
      meaning: "Thank you very much",
    },
    {
      phrase: "Karunakara",
      sinhala: "කරුණාකර",
      pronunciation: "kah-roo-nah-kah-rah",
      meaning: "Please",
    },
    {
      phrase: "Kohomadha?",
      sinhala: "කොහොමද?",
      pronunciation: "ko-hoh-mah-dah",
      meaning: "How are you?",
    },
    {
      phrase: "Hodhai",
      sinhala: "හොඳයි",
      pronunciation: "hoh-dye",
      meaning: "Good / Fine",
    },
    {
      phrase: "Samavenna",
      sinhala: "සමාවෙන්න",
      pronunciation: "sah-mah-ven-nah",
      meaning: "Excuse me / Sorry",
    },
    {
      phrase: "Hari",
      sinhala: "හරි",
      pronunciation: "hah-ree",
      meaning: "Okay / Correct / Right",
    },
  ];

  const emergencyContacts = [
    {
      service: "Suwa Seriya Emergency Ambulance",
      number: "1990",
      description: "Free, high-speed national medical emergency service across Sri Lanka.",
      badge: "National",
    },
    {
      service: "Tourist Police Hotline",
      number: "1912",
      description: "Dedicated assistance hotline operated by Sri Lanka Tourism.",
      badge: "Tourism",
    },
    {
      service: "General Police Emergency",
      number: "119",
      description: "Sri Lanka Police emergency operational command.",
      badge: "Police",
    },
  ];

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-line/60 px-4 py-3">
        <div className="max-w-md mx-auto">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-antique-gold">
            Travel Companion Guide
          </span>
          <h1 className="text-xl font-serif font-bold text-ink">
            Trip Essentials & Etiquette
          </h1>
        </div>
      </header>

      <div className="mobile-container py-5 space-y-6">
        {/* Quick Help & Emergency Hotlines */}
        <section className="bg-white rounded-card p-5 border border-line shadow-card space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest">
            <PhoneCall size={16} />
            <span>Emergency & Assistance Hotlines</span>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            Sri Lanka operates efficient, nationwide telephone helplines:
          </p>

          <div className="space-y-2 pt-1">
            {emergencyContacts.map((contact, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-sage/30 border border-line flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-ink">{contact.service}</h3>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-white text-forest border border-line font-medium">
                      {contact.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted mt-0.5">{contact.description}</p>
                </div>
                <a
                  href={`tel:${contact.number}`}
                  className="px-3 py-1.5 rounded-lg bg-forest text-white text-xs font-bold tracking-wider shrink-0 hover:bg-forest-light transition-colors"
                >
                  {contact.number}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Temple & Cultural Etiquette */}
        <section className="bg-white rounded-card p-5 border border-line shadow-card space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest">
            <Shirt size={16} />
            <span>Sacred Temple Etiquette</span>
          </div>
          <p className="text-xs text-ink/80 leading-relaxed">
            Sri Lanka&apos;s shrines are living sacred spaces revered by millions. Following these simple practices ensures a respectful and warm welcome:
          </p>

          <ul className="space-y-2 text-xs text-ink/85 pl-1 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-forest font-bold">•</span>
              <span>
                <strong>Modest Dress:</strong> Shoulders and knees must be covered. Light-colored or white attire is traditionally preferred at Buddhist temples.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-forest font-bold">•</span>
              <span>
                <strong>Footwear & Headwear:</strong> Always remove shoes, sandals, and hats before entering temple courtyards. Carrying socks helps on sunny stone floors.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-forest font-bold">•</span>
              <span>
                <strong>Statue Etiquette:</strong> Never pose for photographs with your back turned directly to a Buddha statue, and do not touch religious images.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-forest font-bold">•</span>
              <span>
                <strong>Photography:</strong> Ask polite permission before taking close-up pictures of monks, priests, or worshippers during active pooja ceremonies.
              </span>
            </li>
          </ul>
        </section>

        {/* Useful Sinhala Phrases */}
        <section className="bg-white rounded-card p-5 border border-line shadow-card space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-antique-gold">
            <MessageCircle size={16} />
            <span>Useful Sinhala Greetings</span>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            Locals warmly appreciate even a few words in Sinhala:
          </p>

          <div className="grid grid-cols-1 gap-2 pt-1">
            {sinhalaPhrases.map((phrase, i) => (
              <div
                key={i}
                className="p-2.5 rounded-xl bg-sage/30 border border-line/70 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-ink">{phrase.phrase}</span>
                  <span className="text-muted text-[11px] ml-2 italic">({phrase.pronunciation})</span>
                  <p className="text-[11px] text-ink/75 mt-0.5">{phrase.meaning}</p>
                </div>
                <span className="text-xs font-serif font-bold text-forest text-right shrink-0">
                  {phrase.sinhala}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Weather & Highlands Packing Advice */}
        <section className="bg-white rounded-card p-5 border border-line shadow-card space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest">
            <CloudRain size={16} />
            <span>Weather & Packing Advice</span>
          </div>

          <div className="space-y-2 text-xs text-ink/80 leading-relaxed">
            <p>
              • <strong>Elevation Climate Shift:</strong> While the coast (Negombo, Unawatuna) is warm (28–30°C), Nuwara Eliya sits at 1,868 meters where nights drop to 10–14°C. Pack a warm fleece, sweater, or light windproof jacket.
            </p>
            <p>
              • <strong>Tropical Rain Preparedness:</strong> December falls during the northeast monsoon window. Brief afternoon showers are common in the hills; carry a lightweight umbrella or rain layer.
            </p>
            <p>
              • <strong>Footwear:</strong> Slip-on shoes make temple visits effortless. Sturdy trainers with good grip are required for Sigiriya and the Ravana Cave trail.
            </p>
          </div>
        </section>

        {/* Currency & Practical Official Links */}
        <section className="bg-sage/40 rounded-card p-5 border border-line space-y-3 text-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
            Official Travel Resources
          </span>

          <div className="space-y-2">
            <a
              href="https://www.immigration.gov.lk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-line text-forest font-semibold hover:bg-sage/50 transition-colors"
            >
              <span>Sri Lanka Immigration & ETA Visas</span>
              <ExternalLink size={14} className="text-muted" />
            </a>

            <a
              href="https://www.airport.lk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-line text-forest font-semibold hover:bg-sage/50 transition-colors"
            >
              <span>Bandaranaike International Airport (CMB)</span>
              <ExternalLink size={14} className="text-muted" />
            </a>

            <a
              href="https://meteo.gov.lk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-line text-forest font-semibold hover:bg-sage/50 transition-colors"
            >
              <span>Department of Meteorology (Local Weather)</span>
              <ExternalLink size={14} className="text-muted" />
            </a>
          </div>

          <p className="text-[11px] text-muted leading-relaxed pt-1">
            Currency: Sri Lankan Rupee (LKR). Major cards accepted in city hotels and restaurants; carry cash for local kovils, coconut stalls, and tips.
          </p>
        </section>

        {/* Host Contact Placeholder */}
        <section className="bg-white rounded-card p-4 border border-line shadow-card space-y-1.5 text-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
            Your Accompanying Host
          </h3>
          <p className="text-xs text-ink font-semibold">
            Personal Host Contact: To Confirm Privately
          </p>
          <p className="text-[11px] text-muted">
            Direct phone and WhatsApp details will be shared directly with you upon arrival.
          </p>
        </section>
      </div>
    </div>
  );
}

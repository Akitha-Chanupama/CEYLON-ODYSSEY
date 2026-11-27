import {
  CloudRain,
  ExternalLink,
  MessageCircle,
  PhoneCall,
  Shirt,
} from "lucide-react";

const SINHALA_PHRASES = [
  {
    phrase: "Ayubowan",
    sinhala: "ආයුබෝවන්",
    pronunciation: "ah-yoo-boh-wan",
    meaning: "May you live long / Warm hello",
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
    meaning: "Okay / Understood",
  },
];

const EMERGENCY_CONTACTS = [
  {
    service: "Suwa Seriya Emergency Ambulance",
    number: "1990",
    description: "Free, rapid national medical emergency service across Sri Lanka.",
    badge: "National",
  },
  {
    service: "Tourist Police Hotline",
    number: "1912",
    description: "Dedicated assistance helpline operated by Sri Lanka Tourism.",
    badge: "Tourism",
  },
  {
    service: "General Police Emergency",
    number: "119",
    description: "Sri Lanka Police nationwide emergency command.",
    badge: "Police",
  },
];

export default function EssentialsPage() {
  return (
    <div className="bg-ivory">
      <div className="app-container pt-6 pb-10 md:py-10 space-y-7 md:space-y-8 animate-fade-rise">
        <header className="space-y-1.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-antique-gold-dark">
            Travel Companion Guide
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink tracking-tight leading-tight">
            Trip Essentials &amp; Etiquette
          </h1>
          <p className="text-sm text-muted max-w-2xl leading-relaxed">
            Practical preparation for temple visits, highland weather, emergency hotlines, and warm Sinhala greetings throughout your week.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Primary Guidance Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Temple Etiquette */}
            <section className="bg-white rounded-card p-6 border border-line/90 shadow-card space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest">
                <Shirt size={16} className="text-antique-gold-dark" />
                <span>Sacred Temple Etiquette</span>
              </div>
              <p className="text-sm text-ink/85 leading-relaxed">
                Sri Lanka&apos;s shrines are active spaces of daily devotion. Observing these customs helps ensure an easy and respectful visit:
              </p>

              <ul className="space-y-3 text-sm text-ink/85 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-antique-gold-dark font-bold">•</span>
                  <span>
                    <strong className="text-ink">Modest Dress:</strong> Shoulders and knees should remain covered at Buddhist temples and Hindu kovils; light white attire is appreciated at the Temple of the Tooth.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-antique-gold-dark font-bold">•</span>
                  <span>
                    <strong className="text-ink">Footwear &amp; Headwear:</strong> Remove shoes, sandals, and hats before entering inner shrine precincts. Carry spare socks for hot sunny courtyards.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-antique-gold-dark font-bold">•</span>
                  <span>
                    <strong className="text-ink">Respectful Photography:</strong> Do not pose with your back turned directly toward a Buddha statue, and ask permission before photographing worshippers during pooja.
                  </span>
                </li>
              </ul>
            </section>

            {/* Sinhala Phrasebook */}
            <section className="bg-white rounded-card p-6 border border-line/90 shadow-card space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-antique-gold-dark">
                  <MessageCircle size={16} />
                  <span>Useful Sinhala Greetings</span>
                </div>
                <span className="text-xs text-muted">Offline phrase guide</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SINHALA_PHRASES.map((item) => (
                  <div
                    key={item.phrase}
                    className="p-3.5 rounded-2xl bg-mist/55 border border-line/80 flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-ink">{item.phrase}</p>
                      <p className="text-[11px] text-muted italic">
                        ({item.pronunciation})
                      </p>
                      <p className="text-xs text-ink/80 mt-1">{item.meaning}</p>
                    </div>
                    <span className="font-serif text-base font-bold text-forest text-right shrink-0">
                      {item.sinhala}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Weather & Packing */}
            <section className="bg-white rounded-card p-6 border border-line/90 shadow-card space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest">
                <CloudRain size={16} className="text-antique-gold-dark" />
                <span>December Weather &amp; Packing Notes</span>
              </div>

              <div className="space-y-3 text-sm text-ink/85 leading-relaxed">
                <p>
                  <strong className="text-ink">Elevation Shift:</strong> While the west and south coasts stay warm and tropical, Nuwara Eliya rests around 1,868 meters where evening air can dip noticeably—bring a light fleece or windproof layer.
                </p>
                <p>
                  <strong className="text-ink">Monsoon Showers:</strong> December can bring brief hill-country rain squalls; pack a compact travel umbrella and light waterproof layer.
                </p>
                <p>
                  <strong className="text-ink">Footwear:</strong> Slip-on shoes save time at temple shoe racks, while gripped walking shoes are important for Sigiriya staircases and the Ravana Cave ascent.
                </p>
              </div>
            </section>
          </div>

          {/* Right Practical Column */}
          <aside className="lg:col-span-5 space-y-5">
            {/* Emergency Numbers */}
            <section className="bg-white rounded-card p-5 border border-line/90 shadow-card space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest">
                <PhoneCall size={16} className="text-antique-gold-dark" />
                <span>Emergency &amp; Assistance Hotlines</span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Dedicated nationwide telephone assistance across Sri Lanka:
              </p>

              <div className="space-y-2.5">
                {EMERGENCY_CONTACTS.map((contact) => (
                  <div
                    key={contact.number}
                    className="p-3.5 rounded-2xl bg-mist/55 border border-line/85 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <h2 className="text-xs font-bold text-ink">{contact.service}</h2>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-forest border border-line font-semibold">
                          {contact.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted mt-1 leading-snug">
                        {contact.description}
                      </p>
                    </div>
                    <a
                      href={`tel:${contact.number}`}
                      className="tap-row inline-flex items-center justify-center px-3.5 py-2 rounded-xl bg-forest text-white text-xs font-bold tracking-wider shrink-0 hover:bg-forest-light transition-colors"
                    >
                      {contact.number}
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* Official Links & Currency */}
            <section className="bg-sage/55 rounded-card p-5 border border-line space-y-3 text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Official Travel Authorities
              </span>

              <div className="space-y-2">
                <a
                  href="https://www.immigration.gov.lk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-row flex items-center justify-between p-3 rounded-xl bg-white border border-line text-forest font-semibold hover:bg-sage-light transition-colors"
                >
                  <span>Sri Lanka Immigration &amp; ETA Visas</span>
                  <ExternalLink size={14} className="text-muted shrink-0" />
                </a>

                <a
                  href="https://www.airport.lk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-row flex items-center justify-between p-3 rounded-xl bg-white border border-line text-forest font-semibold hover:bg-sage-light transition-colors"
                >
                  <span>Bandaranaike International Airport (CMB)</span>
                  <ExternalLink size={14} className="text-muted shrink-0" />
                </a>

                <a
                  href="https://meteo.gov.lk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-row flex items-center justify-between p-3 rounded-xl bg-white border border-line text-forest font-semibold hover:bg-sage-light transition-colors"
                >
                  <span>Department of Meteorology (Forecasts)</span>
                  <ExternalLink size={14} className="text-muted shrink-0" />
                </a>
              </div>

              <p className="text-xs text-muted leading-relaxed pt-1">
                <strong className="text-ink">Currency (LKR):</strong> Cards work smoothly in major hotels and restaurants, while Sri Lankan Rupee cash notes help at rural stalls, kovils, and local tips.
              </p>
            </section>

            {/* Accompanying Host Notice */}
            <section className="bg-white rounded-card p-5 border border-line/90 shadow-card space-y-1.5 text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Your Accompanying Host
              </span>
              <p className="font-serif text-lg font-semibold text-ink">
                Direct Host Contact: Shared Privately
              </p>
              <p className="text-xs text-muted leading-relaxed">
                Direct phone and WhatsApp numbers are omitted publicly and provided directly to you before arrival.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

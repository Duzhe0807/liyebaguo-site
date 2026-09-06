import { englishFaqs } from "./business";

export interface Guide {
  slug: string; title: string; description: string; h1: string; intro: string;
  image: string; imageAlt: string; keywords: string[]; intent: string;
  sections: { title: string; paragraphs: string[]; link: { href: string; label: string } }[];
  faq: ReadonlyArray<readonly [string, string]>;
}

export const guides: Guide[] = [
  {
    slug: "banquet-of-ba-kingdom",
    title: "Banquet of Ba Kingdom in Chongqing | Liyan Baguo",
    description: "Discover the Banquet of Ba Kingdom at Liyan Baguo in Chongqing: a regional meal, live cultural show and welcome rituals. Explore the experience and plan a visit.",
    h1: "Banquet of Ba Kingdom",
    intro: "The Banquet of Ba Kingdom is Liyan Baguo's immersive cultural dining experience in Baguocheng, Chongqing, China. Regional cuisine, live performance and ceremonial hospitality share the same space. Visitors, families and private groups can choose lunch or dinner and contact the official team to confirm a date, package and seats.",
    image: "/audience-ritual.jpg", imageAlt: "Costumed performers leading a ceremonial procession beside guests at Liyan Baguo in Chongqing",
    keywords: ["Banquet of Ba Kingdom", "Ba Kingdom Banquet", "Liyan Baguo"],
    intent: "Brand and product discovery: understand what the named experience includes.",
    sections: [
      { title: "A meal with a performance around it", paragraphs: ["The banquet is part of the show rather than a separate restaurant stop. Music, dance, costume and guest interaction create the setting while the meal is served. The format suits visitors who want a cultural activity and a meal in a single visit.", "The programme takes inspiration from Ba-Yu culture. The palace setting and ceremonial presentation are contemporary theatre, not a claim that this is an ancient royal venue or an exact historical reconstruction."], link: { href: "/en/experience/", label: "See the visitor journey and show highlights" } },
      { title: "What your visit can include", paragraphs: ["Guest, VIP and SVIP banquet tickets include the garden visit, welcome ritual, meal and show. Seating areas and additional inclusions vary. The current SVIP option includes traditional costume and headwear; confirm whether extra styling or photography carries a separate charge.", "The show lasts approximately 110 minutes. Garden activities take place before the performance, so leave additional time for arrival and any costume preparation. Both lunch and dinner sessions are available."], link: { href: "/en/show-times-prices/", label: "Compare current sessions and ticket inclusions" } },
      { title: "Plan your Banquet of Ba Kingdom visit", paragraphs: ["Send the team your preferred date, lunch or dinner session, guest count and contact details. Mention children's ages, food allergies, language assistance or mobility needs before paying so the team can confirm suitable arrangements.", "Use the official WhatsApp or WeChat Support links to confirm availability. After purchase, contact customer service to arrange your seat number. Keep the confirmed Chinese address and arrival instructions available for your journey."], link: { href: "/en/location-booking/", label: "Find Liyan Baguo and contact the booking team" } },
    ],
    faq: [englishFaqs[1], englishFaqs[2], englishFaqs[4], englishFaqs[7]],
  },
  {
    slug: "chongqing-palace-banquet",
    title: "Chongqing Palace Banquet | Liyan Baguo Dinner Show",
    description: "Explore a Chongqing palace banquet at Liyan Baguo. Learn about ceremonial dining, costume options, family visits and private hospitality before you book.",
    h1: "Chongqing Palace Banquet Experience",
    intro: "Liyan Baguo presents a palace-style cultural banquet in Chongqing, China, combining dining, live performance and traditional costume options. Its Banquet of Ba Kingdom is designed for travellers, families and hosted groups. Choose a lunch or dinner session, then discuss availability and your reception needs with the official team.",
    image: "/hero-banquet-cropped.jpg", imageAlt: "The theatrical banquet setting at Liyan Baguo in Chongqing",
    keywords: ["Chongqing Palace Banquet", "Chinese Palace Banquet Chongqing", "Chinese imperial banquet experience"],
    intent: "Category comparison: understand palace-style hospitality and suitability.",
    sections: [
      { title: "What palace-style dining means here", paragraphs: ["A palace banquet describes the theatrical style of the visitor experience: costumed performers, formal welcome rituals and dining presented as part of a show. You participate as a guest in a staged cultural setting, rather than touring a historic palace.", "At Liyan Baguo, the inspiration is regional Ba-Yu culture. Costume, movement, music and hospitality work together to create that setting. The focus is on an accessible cultural visit, not on requiring prior knowledge of Chinese court history."], link: { href: "/en/banquet-of-ba-kingdom/", label: "Discover the Banquet of Ba Kingdom" } },
      { title: "Choose the reception that fits your group", paragraphs: ["Individual travellers and families can compare Guest, VIP and SVIP tickets. The seating areas and extras differ, so decide whether your priority is the banquet itself, the viewing position or traditional costume options.", "For a business reception, travel agency group or private celebration, share your party size and expectations early. Menus, seating, language assistance and the event flow require agreement with the team; a special request is not automatically included in a standard ticket."], link: { href: "/en/show-times-prices/", label: "Compare seats, prices and package inclusions" } },
      { title: "Food, costume and preparation", paragraphs: ["Dining draws on regional Sichuan and Chongqing flavours. Tell the team about allergies and dietary restrictions before confirming. The menu and any substitutions depend on the package and what the kitchen can accommodate.", "Traditional costume and headwear are included with the current SVIP ticket. Ask about sizes, preparation time and optional styling before arrival. The 110-minute show is only part of the visit: allow time for garden activities and getting ready."], link: { href: "/en/chongqing-hanfu-experience/", label: "Plan traditional costume and photo time" } },
    ],
    faq: [englishFaqs[4], englishFaqs[6], englishFaqs[8], englishFaqs[12]],
  },
  {
    slug: "chongqing-dinner-show",
    title: "Chongqing Dinner Show | Cultural Dining at Liyan Baguo",
    description: "Plan a Chongqing dinner show at Liyan Baguo. Check lunch and evening schedules, the 110-minute performance, dining inclusions and official booking guidance.",
    h1: "Chongqing Cultural Dinner Show",
    intro: "Looking for a cultural dinner show in Chongqing? Liyan Baguo's Banquet of Ba Kingdom combines a regional meal with live music, dance and ceremonial interaction in Baguocheng. The show lasts about 110 minutes, with lunch and evening sessions for visitors and families. Contact the official team to confirm your date and seats.",
    image: "/sleeve-dance.jpg", imageAlt: "Dancers performing during the cultural dinner show at Liyan Baguo",
    keywords: ["Chongqing Dinner Show", "Chongqing cultural dinner show", "Chongqing evening activities"],
    intent: "Commercial discovery and itinerary planning: choose a cultural meal and show.",
    sections: [
      { title: "A cultural activity and a meal in one visit", paragraphs: ["A dinner show combines dining with a scheduled live performance. At Liyan Baguo, the banquet, welcome rituals and audience interaction are parts of the same experience. This makes it an option for travellers who want to include food and culture in one part of their Chongqing itinerary.", "Performance relies on music, movement, costume and visual staging. International visitors are welcome, but this does not mean every spoken part is in English. Request language assistance and an English menu in advance if you need them."], link: { href: "/en/experience/", label: "See what happens during the show" } },
      { title: "Lunch or an evening in Chongqing", paragraphs: ["For lunch, garden activities run from 11:30 to 12:10, followed by the banquet show at 12:30 until approximately 14:20. For dinner, garden activities run from 18:00 to 18:40, with the show from 19:00 until approximately 20:50.", "All times are local to Chongqing (UTC+8). Choose lunch if you prefer to keep the evening free, or dinner if this will be your evening cultural activity. Confirm that your selected date is available and allow extra time for travel and costume preparation."], link: { href: "/en/show-times-prices/", label: "Check dinner show tickets and session times" } },
      { title: "Before adding it to your itinerary", paragraphs: ["The venue is in Baguocheng, Jiulongpo District. Check a current route from your accommodation rather than assuming it is beside the city-centre sights. Save the Chinese address and the team's confirmed arrival instructions.", "When booking for a family or group, share the guest count, children's ages and food requirements. A booking enquiry is not a confirmed reservation: wait for the official team to confirm the package and availability, and arrange your seat number after purchase."], link: { href: "/en/location-booking/", label: "Get the address, directions and booking contacts" } },
    ],
    faq: [englishFaqs[2], englishFaqs[3], englishFaqs[5], englishFaqs[11]],
  },
  {
    slug: "chongqing-hanfu-experience",
    title: "Chongqing Hanfu Experience | Costume & Banquet at Liyan Baguo",
    description: "Plan a traditional Chinese costume experience at Liyan Baguo in Chongqing. Check Hanfu options, headwear, styling, photo time and banquet ticket inclusions.",
    h1: "Traditional Hanfu Experience in Chongqing",
    intro: "At Liyan Baguo in Chongqing, traditional Chinese costume options can be combined with the Banquet of Ba Kingdom. Travellers, couples and families can discuss outfits, headwear and photo time before their lunch or dinner visit. Check the selected package and confirm available styles and sizes with the team before booking.",
    image: "/jade-dance.jpg", imageAlt: "Flowing traditional Chinese costumes worn by performers at Liyan Baguo",
    keywords: ["Chongqing Hanfu Experience", "traditional Chinese costume experience Chongqing", "Hanfu dinner experience"],
    intent: "Experience planning: understand costume inclusions and preparation.",
    sections: [
      { title: "Choose an outfit around your banquet visit", paragraphs: ["A costume experience adds a different way to take part in the setting. You can plan time to dress before the welcome and banquet, or ask about an appropriate photo opportunity around your session.", "Hanfu is a useful search term for traditional Chinese dress, but available outfits may include different stage and historical styles. Ask the team which garments are offered rather than assuming a particular dynasty, fabric or exact historical reconstruction."], link: { href: "/en/costume-experience/", label: "See costume packages, styling and preparation" } },
      { title: "What is included, and what to confirm", paragraphs: ["The current SVIP banquet ticket includes traditional costume and headwear. Do not assume makeup, hairstyling or a professional photo session are part of every ticket. Ask for the inclusions and any additional charges when confirming your package.", "Share guest sizes, ages and the number of people who want to dress up. The photographs on this website include stage performers; performer costumes are not a catalogue of guaranteed guest rental outfits."], link: { href: "/en/show-times-prices/", label: "Compare SVIP and other ticket inclusions" } },
      { title: "Leave room for preparation and photographs", paragraphs: ["The banquet show runs for approximately 110 minutes, excluding garden time and costume preparation. Ask when to arrive so changing and any agreed styling do not make you miss the welcome or meal.", "Confirm where and when guest photographs are allowed, and follow staff instructions around performance areas. For a couple, family or larger group, discuss the photo plan before your visit so everyone has time to participate."], link: { href: "/en/#booking", label: "Ask the official team about costume availability" } },
    ],
    faq: [englishFaqs[8], englishFaqs[2], englishFaqs[6]],
  },
  {
    slug: "ba-yu-culture",
    title: "Ba-Yu Culture in Chongqing | Liyan Baguo",
    description: "Explore how Ba-Yu culture inspires Liyan Baguo in Chongqing through regional food, music, costume and ceremonial hospitality at the Banquet of Ba Kingdom.",
    h1: "Discover Ba-Yu Culture Through Food, Music and Ceremony",
    intro: "Ba-Yu culture, also written as Bayu culture, is part of Chongqing's regional identity. At Liyan Baguo in Baguocheng, it inspires a contemporary cultural dining experience called the Banquet of Ba Kingdom. Visitors can explore that inspiration through food, performance and hospitality, then plan a lunch or dinner visit with the official team.",
    image: "/audience-ritual.jpg", imageAlt: "Ceremonial hospitality expressed through costume and performance at Liyan Baguo",
    keywords: ["Ba-Yu culture", "Bayu culture", "Chongqing culture"],
    intent: "Informational: introduce the cultural inspiration without inventing historical claims.",
    sections: [
      { title: "Regional inspiration, contemporary performance", paragraphs: ["A cultural show offers an introduction through sights, sounds and participation. The Banquet of Ba Kingdom brings regional inspiration into a staged visitor experience rather than presenting an archaeological exhibit.", "That distinction matters when planning a cultural trip. A theatrical banquet can sit alongside museums and historic places in an itinerary, but its performance choices should not be treated as proof of how every historical ceremony actually took place."], link: { href: "/en/about/", label: "Meet the Liyan Baguo brand and its approach" } },
      { title: "Food and hospitality as part of the story", paragraphs: ["Regional flavours are one way visitors encounter Chongqing culture. At Liyan Baguo, the menu and serving rhythm are connected to the performance, making the meal part of how guests experience the setting.", "Welcome rituals and interaction add a participatory element. You can watch, dine and follow the hosts' guidance without needing to memorise historical terms. Share food requirements before booking so the kitchen can confirm a suitable arrangement."], link: { href: "/en/banquet-menu/", label: "Explore the regional banquet menu" } },
      { title: "Experience the cultural setting for yourself", paragraphs: ["Music, dance and traditional costume provide visual ways to engage with the theme. International visitors can ask about language support, while families can discuss children's ages and any practical needs in advance.", "To add the experience to your Chongqing visit, start with the session times and confirmed location. Lunch and dinner are both offered; the show lasts approximately 110 minutes, with additional time needed for the garden and any costume service."], link: { href: "/en/chongqing-palace-banquet/", label: "Explore the Chongqing palace banquet experience" } },
    ],
    faq: [englishFaqs[0], englishFaqs[1], englishFaqs[5]],
  },
];
export const guideSlugs = guides.map(guide => guide.slug);

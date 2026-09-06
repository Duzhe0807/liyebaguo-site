export const business = {
  name: "Liyan Baguo",
  product: "Banquet of Ba Kingdom",
  url: "https://gongyanshow.com",
  description: "Liyan Baguo is an immersive cultural dining experience in Chongqing, China, featuring the Banquet of Ba Kingdom, traditional cuisine, live performances, ceremonial dining and Chinese costume experiences.",
  aliases: ["礼宴巴国", "Li Yan Baguo", "Li Yan Ba Guo", "Liyan Ba Guo"],
  image: "/audience-ritual.jpg",
  logo: "/brand-logo.png",
  phone: "+86 173 8301 7612",
  email: "liaorenxi23@gmail.com",
  streetAddress: "Baguocheng, Jiulongpo District",
  city: "Chongqing",
  country: "CN",
  map: "https://maps.app.goo.gl/ZddotMySGkJYsjFh7",
  showMinutes: 110,
  sessions: [
    { name: "Lunch", garden: "11:30-12:10", start: "12:30", end: "14:20" },
    { name: "Dinner", garden: "18:00-18:40", start: "19:00", end: "20:50" },
  ],
} as const;

// Publish only customer quotes with permission and a verifiable source.
export const verifiedReviews: { quote: string; author: string; source: string; sourceUrl: string }[] = [];

export const englishFaqs: ReadonlyArray<readonly [string, string]> = [
  ["What is Liyan Baguo?", "Liyan Baguo is an immersive cultural dining experience in Baguocheng, Jiulongpo District, Chongqing, China. Its Banquet of Ba Kingdom combines regional cuisine, live performance and ceremonial dining."],
  ["What is the Banquet of Ba Kingdom?", "It is the cultural banquet experience presented by Liyan Baguo, with stage performance, a meal and guest interaction inspired by Ba-Yu culture. It is a contemporary visitor experience, not an ancient palace monument."],
  ["How long does the experience last?", "The banquet show lasts approximately 110 minutes. Allow additional time for the garden visit and any costume or styling service."],
  ["What time should I arrive?", "Lunch garden activities run 11:30-12:10, followed by the show at 12:30 until about 14:20. Dinner garden activities run 18:00-18:40, with the show at 19:00 until about 20:50. All times are Chongqing local time (UTC+8). Confirm your date with the team."],
  ["Does the experience include a meal?", "Guest, VIP and SVIP banquet tickets include the show and a meal. Lunch and dinner sessions are available. Check the current ticket inclusions and menu before payment."],
  ["Are English-speaking visitors welcome?", "Yes. Music, dance and visual performance are central to the experience. Ask about English menus and language assistance before booking; an English-language performance is not guaranteed."],
  ["Is it suitable for families?", "Families can enquire about the experience. Share children's ages, dining needs and any mobility or sensory needs so the team can advise before you book."],
  ["Can international tourists book online?", "Yes. Contact the official team through WhatsApp or WeChat Support on this website. Send your date, lunch or dinner session and guest count. The team confirms availability, package, payment arrangements and seat numbers."],
  ["Is a costume experience included?", "The current SVIP ticket includes traditional costume and headwear. Other tickets and additional makeup or photography services may differ. Confirm inclusions, sizes and preparation time before payment."],
  ["What food is served at the banquet?", "The banquet draws on Sichuan and Chongqing regional flavours. The menu page shows the current selection; dishes depend on the confirmed package and supply. Tell the team about allergies or dietary restrictions before booking."],
  ["Where is Liyan Baguo and how do I get there?", "The venue is in Baguocheng, Jiulongpo District, Chongqing, China. Use the official Location & Booking page for the map link and Chinese address, and confirm your arrival instructions with the team."],
  ["Do I need to book in advance?", "Advance booking is recommended so the team can confirm your session, meal and seating. Contact customer service to arrange your seat number after purchase. Do not assume a date is reserved until you receive confirmation."],
  ["Can travel agencies or private groups book?", "Travel agencies, corporate groups and private celebrations can enquire about dates, group size, menus and language support. Private arrangements depend on availability and the confirmed plan."],
];

const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/twistslook');

// Land Sites Data - Global + India + Pune Focus
const landSites = [
  // ============ PUNE LOCATIONS ============
  { LOCATION: "Hinjewadi Phase 1, Pune, Maharashtra, India", MAX_PRICE: 8500000, AREA: 2400, TYPE: "Residential Plot", DESCRIPTION: "Prime IT hub location near Infosys and Wipro campuses. Excellent connectivity to Mumbai-Pune Expressway.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Hinjewadi Phase 2, Pune, Maharashtra, India", MAX_PRICE: 7200000, AREA: 1800, TYPE: "Residential Plot", DESCRIPTION: "Near Rajiv Gandhi IT Park. Walking distance to tech parks and malls.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Hinjewadi Phase 3, Pune, Maharashtra, India", MAX_PRICE: 5500000, AREA: 2000, TYPE: "Residential Plot", DESCRIPTION: "Emerging tech corridor with upcoming metro connectivity.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Wakad, Pune, Maharashtra, India", MAX_PRICE: 9200000, AREA: 1500, TYPE: "Commercial Plot", DESCRIPTION: "High footfall commercial area near Dmart and residential societies.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Baner, Pune, Maharashtra, India", MAX_PRICE: 12000000, AREA: 2200, TYPE: "Residential Plot", DESCRIPTION: "Premium locality with excellent social infrastructure. Near ICC Tech Park.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Balewadi, Pune, Maharashtra, India", MAX_PRICE: 11500000, AREA: 1800, TYPE: "Residential Plot", DESCRIPTION: "Near Balewadi Stadium and High Street Phoenix Mall. Sports hub of Pune.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Kothrud, Pune, Maharashtra, India", MAX_PRICE: 15000000, AREA: 1200, TYPE: "Residential Plot", DESCRIPTION: "Established residential area with top schools and hospitals nearby.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Aundh, Pune, Maharashtra, India", MAX_PRICE: 14000000, AREA: 1600, TYPE: "Residential Plot", DESCRIPTION: "Posh locality near Bremen Chowk. Close to universities and IT parks.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Viman Nagar, Pune, Maharashtra, India", MAX_PRICE: 13500000, AREA: 1400, TYPE: "Commercial Plot", DESCRIPTION: "Premium commercial location near Pune Airport. High rental yield area.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Kalyani Nagar, Pune, Maharashtra, India", MAX_PRICE: 18000000, AREA: 2000, TYPE: "Residential Plot", DESCRIPTION: "Ultra premium location. Walking distance to Aga Khan Palace.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Koregaon Park, Pune, Maharashtra, India", MAX_PRICE: 25000000, AREA: 2500, TYPE: "Residential Plot", DESCRIPTION: "Most sought-after address in Pune. Near Osho Ashram and premium restaurants.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Magarpatta City, Pune, Maharashtra, India", MAX_PRICE: 16000000, AREA: 1800, TYPE: "Commercial Plot", DESCRIPTION: "India's first integrated township. Zero commute lifestyle.", FREEHOLD: "Leasehold" },
  { LOCATION: "Hadapsar, Pune, Maharashtra, India", MAX_PRICE: 6500000, AREA: 2000, TYPE: "Residential Plot", DESCRIPTION: "Rapidly developing area near EON IT Park and Amanora Mall.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Kharadi, Pune, Maharashtra, India", MAX_PRICE: 9800000, AREA: 1600, TYPE: "Residential Plot", DESCRIPTION: "IT corridor with World Trade Center. Excellent appreciation potential.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Wagholi, Pune, Maharashtra, India", MAX_PRICE: 3200000, AREA: 2500, TYPE: "Residential Plot", DESCRIPTION: "Affordable plots with good connectivity. Near Kharadi IT hub.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Undri, Pune, Maharashtra, India", MAX_PRICE: 4500000, AREA: 2200, TYPE: "Residential Plot", DESCRIPTION: "Peaceful hilltop location with panoramic views. Upcoming metro line.", FREEHOLD: "Freehold YES" },
  { LOCATION: "NIBM Road, Pune, Maharashtra, India", MAX_PRICE: 7800000, AREA: 1500, TYPE: "Residential Plot", DESCRIPTION: "Well-planned area near National Institute of Bank Management.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Kondhwa, Pune, Maharashtra, India", MAX_PRICE: 5200000, AREA: 1800, TYPE: "Residential Plot", DESCRIPTION: "Central location with easy access to Camp and Swargate.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Pimpri-Chinchwad, Pune, Maharashtra, India", MAX_PRICE: 4800000, AREA: 2000, TYPE: "Industrial Plot", DESCRIPTION: "MIDC industrial area. Ideal for manufacturing and warehousing.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Talegaon, Pune, Maharashtra, India", MAX_PRICE: 2500000, AREA: 5000, TYPE: "Agricultural Land", DESCRIPTION: "Farmland with NA conversion potential. Near upcoming Talegaon MIDC.", FREEHOLD: "Freehold YES" },

  // ============ OTHER MAHARASHTRA ============
  { LOCATION: "Lonavala, Maharashtra, India", MAX_PRICE: 8000000, AREA: 4000, TYPE: "Hill Station Plot", DESCRIPTION: "Scenic location near Tiger Point. Perfect for weekend homes.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Mahabaleshwar, Maharashtra, India", MAX_PRICE: 6500000, AREA: 3500, TYPE: "Hill Station Plot", DESCRIPTION: "Cool climate retreat. Near strawberry farms and viewpoints.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Nashik, Maharashtra, India", MAX_PRICE: 3500000, AREA: 2000, TYPE: "Residential Plot", DESCRIPTION: "Wine capital of India. Growing IT and industrial hub.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Nagpur, Maharashtra, India", MAX_PRICE: 2800000, AREA: 2500, TYPE: "Commercial Plot", DESCRIPTION: "Zero mile city. MIHAN SEZ proximity. Central India's growth engine.", FREEHOLD: "Freehold YES" },

  // ============ OTHER INDIAN CITIES ============
  { LOCATION: "Whitefield, Bangalore, Karnataka, India", MAX_PRICE: 15000000, AREA: 1200, TYPE: "Residential Plot", DESCRIPTION: "Silicon Valley of India. Near ITPL and top tech companies.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Electronic City, Bangalore, Karnataka, India", MAX_PRICE: 12000000, AREA: 1500, TYPE: "Commercial Plot", DESCRIPTION: "Major IT hub with Infosys and Wipro headquarters.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Sarjapur Road, Bangalore, Karnataka, India", MAX_PRICE: 18000000, AREA: 2400, TYPE: "Residential Plot", DESCRIPTION: "Premium residential corridor. Near Decathlon and top schools.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Gurgaon Sector 56, Haryana, India", MAX_PRICE: 22000000, AREA: 1800, TYPE: "Residential Plot", DESCRIPTION: "Golf Course Road proximity. Near Ambience Mall and corporate offices.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Noida Sector 150, Uttar Pradesh, India", MAX_PRICE: 8500000, AREA: 2000, TYPE: "Residential Plot", DESCRIPTION: "Sports City development. Near F1 track and planned infrastructure.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Greater Noida West, Uttar Pradesh, India", MAX_PRICE: 4500000, AREA: 1500, TYPE: "Residential Plot", DESCRIPTION: "Affordable plots near upcoming Jewar Airport.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Dwarka Expressway, Delhi NCR, India", MAX_PRICE: 16000000, AREA: 1200, TYPE: "Commercial Plot", DESCRIPTION: "New growth corridor connecting Delhi to Gurgaon.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Bandra West, Mumbai, Maharashtra, India", MAX_PRICE: 85000000, AREA: 800, TYPE: "Residential Plot", DESCRIPTION: "Queen of suburbs. Most premium real estate in Mumbai.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Powai, Mumbai, Maharashtra, India", MAX_PRICE: 45000000, AREA: 1000, TYPE: "Commercial Plot", DESCRIPTION: "Lake view plots near IIT Bombay and Hiranandani Gardens.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Thane West, Mumbai, Maharashtra, India", MAX_PRICE: 12000000, AREA: 1200, TYPE: "Residential Plot", DESCRIPTION: "City of lakes. Excellent metro connectivity to Mumbai.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Navi Mumbai, Maharashtra, India", MAX_PRICE: 9500000, AREA: 1500, TYPE: "Residential Plot", DESCRIPTION: "Planned city with upcoming international airport.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Hyderabad HITEC City, Telangana, India", MAX_PRICE: 14000000, AREA: 1400, TYPE: "Commercial Plot", DESCRIPTION: "Cyberabad IT hub. Microsoft and Google offices nearby.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Gachibowli, Hyderabad, Telangana, India", MAX_PRICE: 16000000, AREA: 1800, TYPE: "Residential Plot", DESCRIPTION: "Financial district. ISB and top tech parks location.", FREEHOLD: "Freehold YES" },
  { LOCATION: "OMR Road, Chennai, Tamil Nadu, India", MAX_PRICE: 8000000, AREA: 1600, TYPE: "Residential Plot", DESCRIPTION: "IT Expressway. Major IT corridor of Chennai.", FREEHOLD: "Freehold YES" },
  { LOCATION: "ECR Road, Chennai, Tamil Nadu, India", MAX_PRICE: 12000000, AREA: 2500, TYPE: "Beach Front Plot", DESCRIPTION: "East Coast Road beach plots. Weekend home destination.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Salt Lake, Kolkata, West Bengal, India", MAX_PRICE: 9000000, AREA: 1400, TYPE: "Commercial Plot", DESCRIPTION: "Sector V IT hub. Planned township with excellent infrastructure.", FREEHOLD: "Freehold YES" },
  { LOCATION: "New Town Rajarhat, Kolkata, West Bengal, India", MAX_PRICE: 6500000, AREA: 1800, TYPE: "Residential Plot", DESCRIPTION: "Smart city development near Kolkata Airport.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Ahmedabad SG Highway, Gujarat, India", MAX_PRICE: 11000000, AREA: 1500, TYPE: "Commercial Plot", DESCRIPTION: "Premium business corridor. GIFT City proximity.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Gandhinagar, Gujarat, India", MAX_PRICE: 7500000, AREA: 2000, TYPE: "Residential Plot", DESCRIPTION: "Green capital city. Near Infocity and government offices.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Chandigarh Sector 17, Punjab, India", MAX_PRICE: 35000000, AREA: 1000, TYPE: "Commercial Plot", DESCRIPTION: "Heart of the city beautiful. Premium commercial hub.", FREEHOLD: "Leasehold" },
  { LOCATION: "Mohali IT City, Punjab, India", MAX_PRICE: 8000000, AREA: 1600, TYPE: "Commercial Plot", DESCRIPTION: "Emerging IT hub near Chandigarh Airport.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Jaipur Mansarovar, Rajasthan, India", MAX_PRICE: 4500000, AREA: 1800, TYPE: "Residential Plot", DESCRIPTION: "Well-planned residential area. Near metro station.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Lucknow Gomti Nagar, Uttar Pradesh, India", MAX_PRICE: 6000000, AREA: 1500, TYPE: "Residential Plot", DESCRIPTION: "Premium locality near Phoenix Mall and corporate offices.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Indore Super Corridor, Madhya Pradesh, India", MAX_PRICE: 5500000, AREA: 2000, TYPE: "Commercial Plot", DESCRIPTION: "IT SEZ and commercial hub. Fastest growing city.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Kochi Kakkanad, Kerala, India", MAX_PRICE: 8500000, AREA: 1200, TYPE: "Commercial Plot", DESCRIPTION: "Infopark and Smart City location. Tech hub of Kerala.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Trivandrum Technopark, Kerala, India", MAX_PRICE: 7000000, AREA: 1400, TYPE: "Commercial Plot", DESCRIPTION: "India's first IT park. Government tech hub.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Goa Candolim, India", MAX_PRICE: 15000000, AREA: 2000, TYPE: "Beach Plot", DESCRIPTION: "Premium beach location. Tourist hotspot with rental potential.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Goa Panjim, India", MAX_PRICE: 12000000, AREA: 1500, TYPE: "Commercial Plot", DESCRIPTION: "Capital city commercial plot. Heritage area.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Dehradun Mussoorie Road, Uttarakhand, India", MAX_PRICE: 5500000, AREA: 3000, TYPE: "Residential Plot", DESCRIPTION: "Scenic mountain views. Retirement destination.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Shimla, Himachal Pradesh, India", MAX_PRICE: 8000000, AREA: 2500, TYPE: "Hill Station Plot", DESCRIPTION: "Queen of hills. Premium vacation home plots.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Manali, Himachal Pradesh, India", MAX_PRICE: 6500000, AREA: 2000, TYPE: "Commercial Plot", DESCRIPTION: "Tourist destination. Hotel and resort development potential.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Mysore Ring Road, Karnataka, India", MAX_PRICE: 4000000, AREA: 2400, TYPE: "Residential Plot", DESCRIPTION: "Heritage city with growing IT presence.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Coimbatore, Tamil Nadu, India", MAX_PRICE: 5500000, AREA: 1800, TYPE: "Industrial Plot", DESCRIPTION: "Manchester of South India. Textile and engineering hub.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Vizag Beach Road, Andhra Pradesh, India", MAX_PRICE: 9000000, AREA: 1500, TYPE: "Commercial Plot", DESCRIPTION: "Port city beachfront. IT SEZ development area.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Amaravati, Andhra Pradesh, India", MAX_PRICE: 3500000, AREA: 2500, TYPE: "Residential Plot", DESCRIPTION: "New capital city. Early investment opportunity.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Bhubaneswar, Odisha, India", MAX_PRICE: 4500000, AREA: 1600, TYPE: "Residential Plot", DESCRIPTION: "Temple city with growing IT sector. Infocity area.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Ranchi, Jharkhand, India", MAX_PRICE: 3000000, AREA: 2000, TYPE: "Residential Plot", DESCRIPTION: "Capital city with pleasant climate. Educational hub.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Patna, Bihar, India", MAX_PRICE: 4000000, AREA: 1500, TYPE: "Commercial Plot", DESCRIPTION: "Rapidly developing capital. Commercial center.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Guwahati, Assam, India", MAX_PRICE: 5000000, AREA: 1800, TYPE: "Residential Plot", DESCRIPTION: "Gateway to Northeast. Growing metropolitan.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Srinagar Dal Lake, J&K, India", MAX_PRICE: 12000000, AREA: 2000, TYPE: "Residential Plot", DESCRIPTION: "Paradise on Earth. Lake view premium plots.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Amritsar, Punjab, India", MAX_PRICE: 6000000, AREA: 1600, TYPE: "Commercial Plot", DESCRIPTION: "Holy city near Golden Temple. Tourism business hub.", FREEHOLD: "Freehold YES" },

  // ============ INTERNATIONAL LOCATIONS ============
  { LOCATION: "Dubai Marina, Dubai, UAE", MAX_PRICE: 45000000, AREA: 1000, TYPE: "Waterfront Plot", DESCRIPTION: "Iconic marina views. Luxury development opportunity.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Palm Jumeirah, Dubai, UAE", MAX_PRICE: 85000000, AREA: 1500, TYPE: "Beach Front Plot", DESCRIPTION: "World-famous artificial island. Ultra-luxury segment.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Dubai Creek Harbour, Dubai, UAE", MAX_PRICE: 35000000, AREA: 1200, TYPE: "Waterfront Plot", DESCRIPTION: "Next to Dubai Creek Tower. Future downtown area.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Abu Dhabi Yas Island, UAE", MAX_PRICE: 28000000, AREA: 1800, TYPE: "Entertainment Zone Plot", DESCRIPTION: "Near Ferrari World and Yas Marina Circuit.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Saadiyat Island, Abu Dhabi, UAE", MAX_PRICE: 40000000, AREA: 2000, TYPE: "Cultural District Plot", DESCRIPTION: "Near Louvre Abu Dhabi. Premium cultural hub.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Singapore Sentosa, Singapore", MAX_PRICE: 120000000, AREA: 800, TYPE: "Resort Plot", DESCRIPTION: "Exclusive island resort. Ultra-high-net-worth segment.", FREEHOLD: "Leasehold 99 years" },
  { LOCATION: "Orchard Road, Singapore", MAX_PRICE: 95000000, AREA: 600, TYPE: "Commercial Plot", DESCRIPTION: "Premier shopping belt. Highest footfall in Singapore.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Bangkok Sukhumvit, Thailand", MAX_PRICE: 25000000, AREA: 1200, TYPE: "Commercial Plot", DESCRIPTION: "Prime CBD location. Near BTS stations and malls.", FREEHOLD: "Leasehold 30+30 years" },
  { LOCATION: "Phuket Patong Beach, Thailand", MAX_PRICE: 18000000, AREA: 1500, TYPE: "Beach Plot", DESCRIPTION: "Famous beach destination. Resort development potential.", FREEHOLD: "Leasehold 30+30 years" },
  { LOCATION: "Bali Seminyak, Indonesia", MAX_PRICE: 15000000, AREA: 2000, TYPE: "Resort Plot", DESCRIPTION: "Trendy beach area. Villa and boutique hotel zone.", FREEHOLD: "Leasehold 25 years" },
  { LOCATION: "Bali Ubud, Indonesia", MAX_PRICE: 8000000, AREA: 2500, TYPE: "Hillside Plot", DESCRIPTION: "Cultural heart of Bali. Rice terrace views.", FREEHOLD: "Leasehold 25 years" },
  { LOCATION: "Kuala Lumpur KLCC, Malaysia", MAX_PRICE: 35000000, AREA: 1000, TYPE: "Commercial Plot", DESCRIPTION: "Near Petronas Towers. Prime business district.", FREEHOLD: "Freehold YES" },
  { LOCATION: "London Canary Wharf, UK", MAX_PRICE: 150000000, AREA: 800, TYPE: "Commercial Plot", DESCRIPTION: "Financial district. Global banking headquarters.", FREEHOLD: "Freehold YES" },
  { LOCATION: "London Chelsea, UK", MAX_PRICE: 180000000, AREA: 600, TYPE: "Residential Plot", DESCRIPTION: "Ultra-premium residential. Royal Borough location.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Manchester City Centre, UK", MAX_PRICE: 25000000, AREA: 1200, TYPE: "Commercial Plot", DESCRIPTION: "Northern Powerhouse. Growing tech and media hub.", FREEHOLD: "Freehold YES" },
  { LOCATION: "New York Manhattan, USA", MAX_PRICE: 250000000, AREA: 500, TYPE: "Commercial Plot", DESCRIPTION: "World's most valuable real estate. Midtown location.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Miami Beach, Florida, USA", MAX_PRICE: 45000000, AREA: 1500, TYPE: "Beach Front Plot", DESCRIPTION: "Art Deco district. Luxury oceanfront development.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Los Angeles Beverly Hills, USA", MAX_PRICE: 85000000, AREA: 2000, TYPE: "Residential Plot", DESCRIPTION: "Celebrity neighborhood. Ultra-luxury estates.", FREEHOLD: "Freehold YES" },
  { LOCATION: "San Francisco Bay Area, USA", MAX_PRICE: 55000000, AREA: 1200, TYPE: "Commercial Plot", DESCRIPTION: "Silicon Valley proximity. Tech company headquarters.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Toronto Downtown, Canada", MAX_PRICE: 35000000, AREA: 1000, TYPE: "Commercial Plot", DESCRIPTION: "Financial district. Tallest buildings in Canada.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Vancouver Coal Harbour, Canada", MAX_PRICE: 45000000, AREA: 1200, TYPE: "Waterfront Plot", DESCRIPTION: "Stunning harbor views. Premium West Coast living.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Sydney Harbour, Australia", MAX_PRICE: 65000000, AREA: 800, TYPE: "Waterfront Plot", DESCRIPTION: "Opera House and Harbour Bridge views. Iconic location.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Melbourne CBD, Australia", MAX_PRICE: 35000000, AREA: 1000, TYPE: "Commercial Plot", DESCRIPTION: "Cultural capital of Australia. Laneway district.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Gold Coast, Australia", MAX_PRICE: 18000000, AREA: 2000, TYPE: "Beach Front Plot", DESCRIPTION: "Surfers Paradise. Resort and holiday home destination.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Paris Champs-Elysees, France", MAX_PRICE: 120000000, AREA: 500, TYPE: "Commercial Plot", DESCRIPTION: "World's most famous avenue. Luxury retail destination.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Monaco Monte Carlo, Monaco", MAX_PRICE: 250000000, AREA: 400, TYPE: "Residential Plot", DESCRIPTION: "Tax haven principality. Ultra-wealthy clientele.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Barcelona Diagonal, Spain", MAX_PRICE: 25000000, AREA: 1200, TYPE: "Commercial Plot", DESCRIPTION: "Business corridor. Near Sagrada Familia district.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Lisbon Cascais, Portugal", MAX_PRICE: 15000000, AREA: 1500, TYPE: "Beach Plot", DESCRIPTION: "Portuguese Riviera. Golden visa eligible.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Amsterdam Zuidas, Netherlands", MAX_PRICE: 40000000, AREA: 800, TYPE: "Commercial Plot", DESCRIPTION: "Financial district. European business hub.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Tokyo Ginza, Japan", MAX_PRICE: 180000000, AREA: 400, TYPE: "Commercial Plot", DESCRIPTION: "Luxury shopping district. Highest land prices in Japan.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Hong Kong Central, China", MAX_PRICE: 200000000, AREA: 500, TYPE: "Commercial Plot", DESCRIPTION: "Asia's financial hub. Skyscraper development.", FREEHOLD: "Leasehold" },
  { LOCATION: "Shanghai Pudong, China", MAX_PRICE: 85000000, AREA: 1000, TYPE: "Commercial Plot", DESCRIPTION: "Financial center with iconic skyline.", FREEHOLD: "Leasehold 70 years" },
  { LOCATION: "Cape Town Waterfront, South Africa", MAX_PRICE: 12000000, AREA: 1500, TYPE: "Waterfront Plot", DESCRIPTION: "Table Mountain views. V&A Waterfront precinct.", FREEHOLD: "Freehold YES" },
  { LOCATION: "Mauritius Grand Baie, Mauritius", MAX_PRICE: 8000000, AREA: 2000, TYPE: "Beach Plot", DESCRIPTION: "Tropical paradise. IRS scheme for foreign buyers.", FREEHOLD: "Freehold YES" },
];

// Construction Sites Data - Global + India + Pune Focus
const constructionSites = [
  // ============ PUNE PROJECTS ============
  { NAME: "Godrej Infinity", LOCATION: "Keshav Nagar, Pune, Maharashtra, India", MIN_PRICE: 8500000, MAX_PRICE: 15000000, AREA: 1200, FEATURES: "24X7 Security, Swimming Pool, Gym, Club House, Children Play Area, Landscaped Gardens", DESCRIPTION: "Premium township by Godrej Properties. RERA approved project with world-class amenities.", START_DATE: "01 Jan, 2024", END_DATE: "31 Dec, 2026" },
  { NAME: "Lodha Belmondo", LOCATION: "Gahunje, Pune, Maharashtra, India", MIN_PRICE: 12000000, MAX_PRICE: 35000000, AREA: 2500, FEATURES: "Golf Course, Private Marina, Helipad, Spa, Tennis Courts, Infinity Pool", DESCRIPTION: "Ultra-luxury resort residences on 200 acres. India's first golf and marina address.", START_DATE: "15 Mar, 2023", END_DATE: "30 Jun, 2027" },
  { NAME: "Kolte Patil Life Republic", LOCATION: "Hinjewadi, Pune, Maharashtra, India", MIN_PRICE: 4500000, MAX_PRICE: 9500000, AREA: 850, FEATURES: "IT Park, Schools, Hospital, Shopping Complex, Sports Arena, Metro Connectivity", DESCRIPTION: "400-acre integrated township near IT hub. Self-sustained ecosystem.", START_DATE: "01 Apr, 2024", END_DATE: "31 Mar, 2028" },
  { NAME: "Panchshil Towers", LOCATION: "Kharadi, Pune, Maharashtra, India", MIN_PRICE: 15000000, MAX_PRICE: 28000000, AREA: 1800, FEATURES: "Sky Lounge, Private Theater, Wine Cellar, Concierge Service, Smart Home", DESCRIPTION: "Luxury high-rise with Trump Tower inspired design. EON IT Park proximity.", START_DATE: "01 Jul, 2024", END_DATE: "30 Jun, 2027" },
  { NAME: "Shapoorji Pallonji Parkwest", LOCATION: "Baner, Pune, Maharashtra, India", MIN_PRICE: 9500000, MAX_PRICE: 18000000, AREA: 1400, FEATURES: "Central Park, Jogging Track, Basketball Court, Yoga Deck, Pet Park", DESCRIPTION: "Premium project with 70% open spaces. Green building certified.", START_DATE: "15 Feb, 2024", END_DATE: "28 Feb, 2027" },
  { NAME: "VTP Bluewaters", LOCATION: "Mahalunge, Pune, Maharashtra, India", MIN_PRICE: 6500000, MAX_PRICE: 12000000, AREA: 1100, FEATURES: "Waterfront Living, Boat Club, Floating Restaurant, Water Sports, Beach Pool", DESCRIPTION: "Lake-facing residences with unique waterfront lifestyle.", START_DATE: "01 May, 2024", END_DATE: "30 Apr, 2027" },
  { NAME: "Pride Purple Park Grandeur", LOCATION: "Wakad, Pune, Maharashtra, India", MIN_PRICE: 7500000, MAX_PRICE: 14000000, AREA: 1300, FEATURES: "Rooftop Infinity Pool, Sky Garden, Business Center, Guest Suites", DESCRIPTION: "Premium project in IT corridor with excellent connectivity.", START_DATE: "01 Jun, 2024", END_DATE: "31 May, 2027" },
  { NAME: "Kumar Privie Sanctum", LOCATION: "Pashan, Pune, Maharashtra, India", MIN_PRICE: 18000000, MAX_PRICE: 35000000, AREA: 2200, FEATURES: "Private Lift Lobby, Home Automation, Italian Marble, Private Pool Villas", DESCRIPTION: "Ultra-luxury boutique residences. Only 40 exclusive units.", START_DATE: "01 Aug, 2024", END_DATE: "31 Jul, 2026" },
  { NAME: "Nyati Elysia", LOCATION: "Kharadi, Pune, Maharashtra, India", MIN_PRICE: 8000000, MAX_PRICE: 15000000, AREA: 1250, FEATURES: "Amphitheater, Cricket Pitch, Senior Citizen Zone, Library, Co-working Space", DESCRIPTION: "Modern living spaces near World Trade Center Pune.", START_DATE: "15 Apr, 2024", END_DATE: "15 Oct, 2027" },
  { NAME: "Gera World of Joy", LOCATION: "Kharadi, Pune, Maharashtra, India", MIN_PRICE: 7000000, MAX_PRICE: 12000000, AREA: 1000, FEATURES: "Child-centric Design, Adventure Zone, Art Studio, Music Room, Sports Academy", DESCRIPTION: "India's first child-centric homes with dedicated learning spaces.", START_DATE: "01 Sep, 2024", END_DATE: "31 Aug, 2027" },
  { NAME: "Rohan Abhilasha", LOCATION: "Wagholi, Pune, Maharashtra, India", MIN_PRICE: 3500000, MAX_PRICE: 6500000, AREA: 750, FEATURES: "Organic Garden, Solar Power, Rainwater Harvesting, EV Charging", DESCRIPTION: "Affordable eco-friendly homes with sustainable features.", START_DATE: "01 Oct, 2024", END_DATE: "30 Sep, 2026" },
  { NAME: "Mahindra Happinest", LOCATION: "Tathawade, Pune, Maharashtra, India", MIN_PRICE: 4000000, MAX_PRICE: 7000000, AREA: 650, FEATURES: "Affordable Luxury, Smart Homes, Community Center, Landscaped Gardens", DESCRIPTION: "Quality affordable housing by Mahindra Lifespaces.", START_DATE: "15 Nov, 2024", END_DATE: "15 May, 2027" },
  { NAME: "Paranjape Blue Ridge", LOCATION: "Hinjewadi, Pune, Maharashtra, India", MIN_PRICE: 5500000, MAX_PRICE: 10000000, AREA: 900, FEATURES: "Township Living, Schools, Hospital, Commercial Complex, Sports Facilities", DESCRIPTION: "Established township with excellent infrastructure.", START_DATE: "01 Jan, 2025", END_DATE: "31 Dec, 2027" },
  { NAME: "Marvel Piazza", LOCATION: "Viman Nagar, Pune, Maharashtra, India", MIN_PRICE: 12000000, MAX_PRICE: 22000000, AREA: 1600, FEATURES: "Airport Views, Retail Mall, Fine Dining, Concierge, Valet Parking", DESCRIPTION: "Mixed-use development near Pune Airport.", START_DATE: "01 Feb, 2025", END_DATE: "28 Feb, 2028" },
  { NAME: "Sobha Dream Acres", LOCATION: "Balewadi, Pune, Maharashtra, India", MIN_PRICE: 9000000, MAX_PRICE: 16000000, AREA: 1350, FEATURES: "Olympic Pool, Squash Courts, Meditation Center, Open Air Theater", DESCRIPTION: "Premium project by Sobha Limited near sports hub.", START_DATE: "15 Mar, 2025", END_DATE: "15 Sep, 2028" },

  // ============ OTHER INDIAN CITIES ============
  { NAME: "DLF Camellias", LOCATION: "Golf Course Road, Gurgaon, Haryana, India", MIN_PRICE: 150000000, MAX_PRICE: 350000000, AREA: 8000, FEATURES: "Private Elevator, Temperature Controlled Pool, Wine Cellar, Private Theater, Butler Service", DESCRIPTION: "India's most expensive residential project. Ultra-luxury penthouses.", START_DATE: "01 Jan, 2023", END_DATE: "31 Dec, 2025" },
  { NAME: "Lodha World Towers", LOCATION: "Lower Parel, Mumbai, Maharashtra, India", MIN_PRICE: 85000000, MAX_PRICE: 180000000, AREA: 4500, FEATURES: "Sky Villas, Private Helipad, Observatory Deck, 6 Levels of Amenities", DESCRIPTION: "Mumbai's tallest residential towers. Sea and city views.", START_DATE: "01 Apr, 2022", END_DATE: "30 Jun, 2026" },
  { NAME: "Prestige Kingfisher Towers", LOCATION: "Ashok Nagar, Bangalore, Karnataka, India", MIN_PRICE: 25000000, MAX_PRICE: 65000000, AREA: 3000, FEATURES: "Lake Views, Championship Golf, Yacht Club, Equestrian Center", DESCRIPTION: "Ultra-luxury project on UB City campus.", START_DATE: "01 Jul, 2024", END_DATE: "30 Jun, 2027" },
  { NAME: "Brigade Exotica", LOCATION: "Old Madras Road, Bangalore, Karnataka, India", MIN_PRICE: 12000000, MAX_PRICE: 25000000, AREA: 1800, FEATURES: "Lake Facing, Water Sports, Nature Trail, Butterfly Garden", DESCRIPTION: "Lakeside living in the heart of Bangalore.", START_DATE: "01 Aug, 2024", END_DATE: "31 Jul, 2027" },
  { NAME: "Phoenix One Bangalore West", LOCATION: "Rajajinagar, Bangalore, Karnataka, India", MIN_PRICE: 18000000, MAX_PRICE: 45000000, AREA: 2500, FEATURES: "Direct Mall Access, Sky Lounge, Infinity Pool, Private Dining", DESCRIPTION: "Live above India's largest mall.", START_DATE: "01 Sep, 2024", END_DATE: "30 Sep, 2027" },
  { NAME: "My Home Bhooja", LOCATION: "Gachibowli, Hyderabad, Telangana, India", MIN_PRICE: 15000000, MAX_PRICE: 35000000, AREA: 2800, FEATURES: "Golf Course Views, Private Cinema, Spa Resort, Banquet Hall", DESCRIPTION: "Luxury villas in financial district.", START_DATE: "01 Oct, 2024", END_DATE: "31 Oct, 2027" },
  { NAME: "Aparna Sarovar", LOCATION: "HITEC City, Hyderabad, Telangana, India", MIN_PRICE: 8500000, MAX_PRICE: 18000000, AREA: 1600, FEATURES: "Lake View, IT Park Proximity, Sports Complex, Organic Farm", DESCRIPTION: "Premium living near major tech parks.", START_DATE: "15 Nov, 2024", END_DATE: "15 May, 2028" },
  { NAME: "Casagrand First City", LOCATION: "OMR Road, Chennai, Tamil Nadu, India", MIN_PRICE: 6500000, MAX_PRICE: 14000000, AREA: 1200, FEATURES: "Township Living, International School, Hospital, Mall", DESCRIPTION: "250-acre integrated township on IT corridor.", START_DATE: "01 Dec, 2024", END_DATE: "31 Dec, 2028" },
  { NAME: "Hiranandani Fortune City", LOCATION: "Panvel, Navi Mumbai, Maharashtra, India", MIN_PRICE: 7500000, MAX_PRICE: 15000000, AREA: 1100, FEATURES: "Airport Proximity, Metro Connected, Township Amenities, Golf Course", DESCRIPTION: "Near upcoming Navi Mumbai International Airport.", START_DATE: "01 Jan, 2025", END_DATE: "31 Dec, 2028" },
  { NAME: "Tata Primanti", LOCATION: "Sector 72, Gurgaon, Haryana, India", MIN_PRICE: 35000000, MAX_PRICE: 75000000, AREA: 4000, FEATURES: "Private Garden, Championship Golf, Lake View, Clubhouse", DESCRIPTION: "Luxury villas with private gardens.", START_DATE: "01 Feb, 2025", END_DATE: "28 Feb, 2027" },
  { NAME: "Godrej Golf Links", LOCATION: "Greater Noida, Uttar Pradesh, India", MIN_PRICE: 12000000, MAX_PRICE: 25000000, AREA: 1800, FEATURES: "9-Hole Golf Course, Sports Academy, Nature Reserve", DESCRIPTION: "Golf-centric living near Jewar Airport.", START_DATE: "15 Mar, 2025", END_DATE: "15 Sep, 2028" },
  { NAME: "Adani Shantigram", LOCATION: "SG Highway, Ahmedabad, Gujarat, India", MIN_PRICE: 8000000, MAX_PRICE: 18000000, AREA: 1500, FEATURES: "Water Park, Sports Village, Schools, Hospital, Shopping", DESCRIPTION: "600-acre township with world-class amenities.", START_DATE: "01 Apr, 2025", END_DATE: "31 Mar, 2029" },
  { NAME: "Elan The Presidential", LOCATION: "Dwarka Expressway, Gurgaon, Haryana, India", MIN_PRICE: 25000000, MAX_PRICE: 55000000, AREA: 3500, FEATURES: "Trump Tower Collaboration, 7-Star Amenities, Private Concierge", DESCRIPTION: "Branded residences with Trump Organization.", START_DATE: "01 May, 2025", END_DATE: "30 Apr, 2028" },
  { NAME: "Merlin Verve", LOCATION: "EM Bypass, Kolkata, West Bengal, India", MIN_PRICE: 9000000, MAX_PRICE: 18000000, AREA: 1400, FEATURES: "Lake Views, Luxury Clubhouse, Smart Homes, EV Ready", DESCRIPTION: "Luxury living in East Kolkata.", START_DATE: "01 Jun, 2025", END_DATE: "30 Jun, 2028" },
  { NAME: "Godrej Sky Garden", LOCATION: "Thiruvottiyur, Chennai, Tamil Nadu, India", MIN_PRICE: 5500000, MAX_PRICE: 11000000, AREA: 950, FEATURES: "Sea Views, Terrace Gardens, Sports Complex, Pet Zone", DESCRIPTION: "Affordable luxury with sea views.", START_DATE: "15 Jul, 2025", END_DATE: "15 Jan, 2028" },

  // ============ INTERNATIONAL PROJECTS ============
  { NAME: "Burj Binghatti Jacob & Co", LOCATION: "Business Bay, Dubai, UAE", MIN_PRICE: 250000000, MAX_PRICE: 850000000, AREA: 12000, FEATURES: "World's Tallest Residential, Private Pools, Butler Service, Jewelry Partnership", DESCRIPTION: "100+ floors of ultra-luxury living. Jacob & Co branded residences.", START_DATE: "01 Jan, 2024", END_DATE: "31 Dec, 2028" },
  { NAME: "One Za'abeel", LOCATION: "Za'abeel, Dubai, UAE", MIN_PRICE: 45000000, MAX_PRICE: 150000000, AREA: 4000, FEATURES: "Sky Concourse, Infinity Pool, Burj Views, The Link Observation Deck", DESCRIPTION: "Iconic twin towers connected by world's largest cantilevered building.", START_DATE: "01 Mar, 2023", END_DATE: "30 Jun, 2025" },
  { NAME: "Atlantis The Royal", LOCATION: "Palm Jumeirah, Dubai, UAE", MIN_PRICE: 85000000, MAX_PRICE: 280000000, AREA: 6000, FEATURES: "Private Beach, Celebrity Chef Restaurants, Underwater Suites, Cloud 22 Pool", DESCRIPTION: "Branded residences at Dubai's newest ultra-luxury resort.", START_DATE: "01 Jan, 2023", END_DATE: "31 Dec, 2025" },
  { NAME: "Wallich Residence", LOCATION: "Tanjong Pagar, Singapore", MIN_PRICE: 180000000, MAX_PRICE: 450000000, AREA: 5000, FEATURES: "Singapore's Tallest, Private Lift, Sky Garden, Panoramic Views", DESCRIPTION: "Super penthouse in Singapore's tallest building.", START_DATE: "01 Apr, 2022", END_DATE: "30 Sep, 2025" },
  { NAME: "Marina One Residences", LOCATION: "Marina Bay, Singapore", MIN_PRICE: 35000000, MAX_PRICE: 85000000, AREA: 2500, FEATURES: "Green Oasis, Sky Gardens, Marina Views, Retail Podium", DESCRIPTION: "Mixed-use development in Singapore's CBD.", START_DATE: "01 Jan, 2024", END_DATE: "31 Dec, 2026" },
  { NAME: "The Ritz-Carlton Residences", LOCATION: "Sukhumvit, Bangkok, Thailand", MIN_PRICE: 25000000, MAX_PRICE: 65000000, AREA: 2000, FEATURES: "Ritz-Carlton Service, Branded Luxury, Sky Pool, Private Cinema", DESCRIPTION: "5-star branded residences in Bangkok's prime district.", START_DATE: "01 May, 2024", END_DATE: "30 Apr, 2027" },
  { NAME: "Four Seasons Private Residences", LOCATION: "Jimbaran, Bali, Indonesia", MIN_PRICE: 35000000, MAX_PRICE: 95000000, AREA: 3500, FEATURES: "Beachfront Villas, Private Chef, Spa, Infinity Pool, Butler", DESCRIPTION: "Ultra-luxury branded villas on Bali's coast.", START_DATE: "01 Jun, 2024", END_DATE: "30 Jun, 2027" },
  { NAME: "One57", LOCATION: "Midtown Manhattan, New York, USA", MIN_PRICE: 450000000, MAX_PRICE: 1200000000, AREA: 8000, FEATURES: "Central Park Views, Park Hyatt Services, Library, Pool, Cinema", DESCRIPTION: "Billionaire's Row landmark tower.", START_DATE: "01 Jan, 2023", END_DATE: "31 Dec, 2025" },
  { NAME: "432 Park Avenue", LOCATION: "Park Avenue, New York, USA", MIN_PRICE: 350000000, MAX_PRICE: 950000000, AREA: 7500, FEATURES: "Slenderest Skyscraper, 360 Views, Private Restaurant, Wine Cellar", DESCRIPTION: "Western Hemisphere's tallest residential building.", START_DATE: "01 Mar, 2022", END_DATE: "30 Jun, 2026" },
  { NAME: "Faena House", LOCATION: "Miami Beach, Florida, USA", MIN_PRICE: 85000000, MAX_PRICE: 250000000, AREA: 5000, FEATURES: "Oceanfront, Faena Hotel Access, Art Collection, Private Beach", DESCRIPTION: "Ultra-luxury oceanfront condos by Faena Group.", START_DATE: "01 Jul, 2024", END_DATE: "31 Dec, 2026" },
  { NAME: "The One", LOCATION: "Bel Air, Los Angeles, USA", MIN_PRICE: 500000000, MAX_PRICE: 500000000, AREA: 105000, FEATURES: "Mega Mansion, Nightclub, Bowling Alley, Helicopter Pad, 21 Bathrooms", DESCRIPTION: "America's most expensive home listing.", START_DATE: "01 Jan, 2024", END_DATE: "31 Dec, 2026" },
  { NAME: "One Park Lane", LOCATION: "Mayfair, London, UK", MIN_PRICE: 150000000, MAX_PRICE: 400000000, AREA: 4500, FEATURES: "Hyde Park Views, Concierge, Wine Cellar, Private Cinema, Spa", DESCRIPTION: "Ultra-luxury development overlooking Hyde Park.", START_DATE: "01 Sep, 2024", END_DATE: "30 Sep, 2027" },
  { NAME: "Principal Tower", LOCATION: "Shoreditch, London, UK", MIN_PRICE: 25000000, MAX_PRICE: 65000000, AREA: 2000, FEATURES: "Foster + Partners Design, Sky Lounge, Concierge, Pool", DESCRIPTION: "Iconic residential tower by world-famous architect.", START_DATE: "01 Oct, 2024", END_DATE: "31 Oct, 2027" },
  { NAME: "Tour Odeon", LOCATION: "La Rousse, Monaco", MIN_PRICE: 350000000, MAX_PRICE: 850000000, AREA: 6500, FEATURES: "Sky Penthouse, Water Slide, Private Pool, Mediterranean Views", DESCRIPTION: "Monaco's tallest building with world's most expensive penthouse.", START_DATE: "01 Jan, 2023", END_DATE: "31 Dec, 2025" },
  { NAME: "Toranomon Hills", LOCATION: "Toranomon, Tokyo, Japan", MIN_PRICE: 85000000, MAX_PRICE: 200000000, AREA: 3000, FEATURES: "Andaz Tokyo, Sky Lobby, Japanese Garden, Michelin Dining", DESCRIPTION: "Mixed-use tower redefining Tokyo's skyline.", START_DATE: "01 Apr, 2024", END_DATE: "30 Apr, 2027" },
  { NAME: "Victoria Peak Mansion", LOCATION: "The Peak, Hong Kong, China", MIN_PRICE: 450000000, MAX_PRICE: 1000000000, AREA: 15000, FEATURES: "Harbor Views, Private Garden, Wine Cellar, Staff Quarters", DESCRIPTION: "Hong Kong's most exclusive address.", START_DATE: "01 May, 2024", END_DATE: "30 May, 2027" },
  { NAME: "The Opus by Omniyat", LOCATION: "Business Bay, Dubai, UAE", MIN_PRICE: 35000000, MAX_PRICE: 95000000, AREA: 2800, FEATURES: "Zaha Hadid Design, ME Dubai Hotel, Rooftop Pool, Art Collection", DESCRIPTION: "Architectural masterpiece by late Zaha Hadid.", START_DATE: "01 Jan, 2024", END_DATE: "31 Dec, 2026" },
  { NAME: "25 Park Row", LOCATION: "Tribeca, New York, USA", MIN_PRICE: 65000000, MAX_PRICE: 180000000, AREA: 4000, FEATURES: "Woolworth Views, Library, Wine Room, Pool, Private Dining", DESCRIPTION: "Boutique luxury in Manhattan's most sought-after neighborhood.", START_DATE: "01 Jun, 2024", END_DATE: "30 Jun, 2027" },
  { NAME: "La Maison Rose", LOCATION: "Cap d'Antibes, France", MIN_PRICE: 250000000, MAX_PRICE: 450000000, AREA: 20000, FEATURES: "Oceanfront Estate, Private Beach, Tennis Court, Helipad, Guest Houses", DESCRIPTION: "Legendary French Riviera estate.", START_DATE: "01 Jul, 2024", END_DATE: "31 Jul, 2026" },
  { NAME: "One Barangaroo", LOCATION: "Barangaroo, Sydney, Australia", MIN_PRICE: 45000000, MAX_PRICE: 140000000, AREA: 3500, FEATURES: "Crown Sydney, Harbor Views, Casino Access, Sky Pool", DESCRIPTION: "Sydney's tallest residential tower at Crown complex.", START_DATE: "01 Aug, 2024", END_DATE: "31 Aug, 2027" },
];

async function seedDatabase() {
  try {
    const db = mongoose.connection;

    // Wait for connection
    await new Promise((resolve) => {
      if (db.readyState === 1) resolve();
      else db.once('open', resolve);
    });

    console.log('Connected to MongoDB');

    const landCollection = db.collection('posted_land_sites');
    const constructionCollection = db.collection('posted_construction_sites');

    // Generate unique IDs and timestamps
    const generateId = (email, type) => `${email}@${type}${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    const getDate = () => {
      const d = new Date();
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };
    const getTime = () => {
      const d = new Date();
      let hours = d.getHours();
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12 || 12;
      return `${String(hours).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}${ampm}`;
    };

    // Prepare land sites with full schema
    const preparedLandSites = landSites.map((site, index) => ({
      POSTED_BY: `seeduser${index % 10}@gmail.com@LandDealer`,
      ID: generateId(`seeduser${index % 10}@gmail.com`, 'LandDealer'),
      TIME: getTime(),
      DATE: getDate(),
      TYPE: site.TYPE || "Owner of land site",
      LOCATION: site.LOCATION,
      POSSESSION_DATE: "30 Days from Booking",
      MAX_PRICE: site.MAX_PRICE,
      AREA: site.AREA,
      DESCRIPTION: site.DESCRIPTION,
      FREEHOLD: site.FREEHOLD || "Freehold YES",
      OWNER_FIRST_NAME: "",
      OWNER_LAST_NAME: "",
      OWNER_EMAIL: "",
      OWNER_MOBILE: "",
      OWNER_LOCATION: "",
      IMAGE1: null,
      IMAGE2: null,
      IMAGE1TYPE: "",
      IMAGE2TYPE: "",
      RATING: Math.floor(Math.random() * 50) + 50
    }));

    // Prepare construction sites with full schema
    const preparedConstructionSites = constructionSites.map((site, index) => ({
      POSTED_BY: `builder${index % 10}@gmail.com@Constructor`,
      ID: generateId(`builder${index % 10}@gmail.com`, 'Constructor'),
      TIME: getTime(),
      DATE: getDate(),
      NAME: site.NAME,
      LOCATION: site.LOCATION,
      START_DATE: site.START_DATE,
      END_DATE: site.END_DATE,
      MIN_PRICE: site.MIN_PRICE,
      MAX_PRICE: site.MAX_PRICE,
      AREA: site.AREA,
      FEATURES: site.FEATURES,
      IMAGE1: null,
      IMAGE2: null,
      IMAGE1TYPE: "",
      IMAGE2TYPE: "",
      DESCRIPTION: site.DESCRIPTION,
      RATING: Math.floor(Math.random() * 50) + 50
    }));

    // Insert land sites
    console.log(`Inserting ${preparedLandSites.length} land sites...`);
    const landResult = await landCollection.insertMany(preparedLandSites);
    console.log(`Inserted ${landResult.insertedCount} land sites`);

    // Insert construction sites
    console.log(`Inserting ${preparedConstructionSites.length} construction sites...`);
    const constructionResult = await constructionCollection.insertMany(preparedConstructionSites);
    console.log(`Inserted ${constructionResult.insertedCount} construction sites`);

    // Print summary
    const totalLand = await landCollection.countDocuments();
    const totalConstruction = await constructionCollection.countDocuments();

    console.log('\n========== SEED COMPLETE ==========');
    console.log(`Total Land Sites: ${totalLand}`);
    console.log(`Total Construction Sites: ${totalConstruction}`);
    console.log(`Total Properties: ${totalLand + totalConstruction}`);
    console.log('====================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

// California City Data for Location Pages
// Used for local SEO, dynamic routing, and city-specific content

export interface CaliforniaCity {
  slug: string;
  name: string;
  county: string;
  population: string;
  medianHomePrice: string;
  medianHouseholdIncome: string;
  avgDaysOnMarket: string;
  yearOverYearChange: string;
  description: string;
  highlights: string[];
  neighborhoods: string[];
  loanTypes: string[];
  metaTitle: string;
  metaDescription: string;
}

export const CALIFORNIA_CITIES: CaliforniaCity[] = [
  // Major Markets
  {
    slug: "los-angeles",
    name: "Los Angeles",
    county: "Los Angeles County",
    population: "3.9M",
    medianHomePrice: "$950,000",
    medianHouseholdIncome: "$75,000",
    avgDaysOnMarket: "32",
    yearOverYearChange: "+4.2%",
    description: "Los Angeles, California's largest city, offers diverse neighborhoods from beachfront Santa Monica to urban Downtown LA. The market features everything from starter condos to multi-million dollar estates.",
    highlights: [
      "Entertainment industry hub with strong job market",
      "Diverse neighborhoods for every lifestyle",
      "Strong appreciation in key submarkets",
      "Jumbo loans common for luxury properties"
    ],
    neighborhoods: ["Santa Monica", "Beverly Hills", "Pasadena", "Long Beach", "Downtown LA", "West Hollywood", "Silver Lake", "Venice"],
    loanTypes: ["Conventional", "FHA", "VA", "Jumbo", "DSCR", "Non-QM"],
    metaTitle: "Los Angeles Mortgage Lenders | Home Loans LA | LendyWendy",
    metaDescription: "Get pre-approved for a Los Angeles home loan in minutes. Compare rates from top LA mortgage lenders. FHA, VA, Jumbo, DSCR loans available. NMLS #1945913."
  },
  {
    slug: "san-francisco",
    name: "San Francisco",
    county: "San Francisco County",
    population: "870K",
    medianHomePrice: "$1,350,000",
    medianHouseholdIncome: "$126,000",
    avgDaysOnMarket: "28",
    yearOverYearChange: "+2.8%",
    description: "San Francisco's iconic neighborhoods and tech-driven economy make it one of America's most expensive housing markets. Jumbo loans are the norm, and creative financing helps buyers compete.",
    highlights: [
      "Tech industry drives strong buyer demand",
      "Limited inventory increases competition",
      "Most purchases require jumbo loans",
      "Strong rental market for investors"
    ],
    neighborhoods: ["Pacific Heights", "Marina", "Noe Valley", "Mission District", "SOMA", "Castro", "Richmond", "Sunset"],
    loanTypes: ["Jumbo", "Conventional", "VA", "DSCR", "Non-QM", "Bank Statement"],
    metaTitle: "San Francisco Mortgage Lenders | SF Home Loans | LendyWendy",
    metaDescription: "Get pre-approved for a San Francisco home loan. Jumbo loan specialists. Compare rates from top SF mortgage lenders. NMLS #1945913."
  },
  {
    slug: "san-diego",
    name: "San Diego",
    county: "San Diego County",
    population: "1.4M",
    medianHomePrice: "$875,000",
    medianHouseholdIncome: "$85,000",
    avgDaysOnMarket: "25",
    yearOverYearChange: "+5.1%",
    description: "San Diego combines coastal living with a diverse economy anchored by military, biotech, and tourism. The market offers options from beach condos to suburban family homes.",
    highlights: [
      "Large military presence - VA loans popular",
      "Strong biotech and healthcare job market",
      "Beach communities command premium prices",
      "Growing tech sector bringing new buyers"
    ],
    neighborhoods: ["La Jolla", "Pacific Beach", "Coronado", "Del Mar", "Carlsbad", "Encinitas", "Chula Vista", "Downtown"],
    loanTypes: ["VA", "Conventional", "FHA", "Jumbo", "DSCR", "Non-QM"],
    metaTitle: "San Diego Mortgage Lenders | Home Loans SD | LendyWendy",
    metaDescription: "Get pre-approved for a San Diego home loan. VA loan specialists. Compare rates from top SD mortgage lenders. FHA, Jumbo available. NMLS #1945913."
  },
  {
    slug: "san-jose",
    name: "San Jose",
    county: "Santa Clara County",
    population: "1.0M",
    medianHomePrice: "$1,450,000",
    medianHouseholdIncome: "$142,000",
    avgDaysOnMarket: "18",
    yearOverYearChange: "+3.5%",
    description: "San Jose sits at the heart of Silicon Valley with the highest median household income in America. Tech employment drives intense housing demand and rapid appreciation.",
    highlights: [
      "Silicon Valley headquarters - Apple, Google, Meta nearby",
      "Highest incomes drive purchasing power",
      "Very competitive market with multiple offers",
      "Super jumbo loans often required"
    ],
    neighborhoods: ["Willow Glen", "Almaden Valley", "Evergreen", "Cambrian", "Santa Clara", "Sunnyvale", "Cupertino", "Palo Alto"],
    loanTypes: ["Jumbo", "Super Jumbo", "Conventional", "DSCR", "Non-QM", "Bank Statement"],
    metaTitle: "San Jose Mortgage Lenders | Silicon Valley Home Loans | LendyWendy",
    metaDescription: "Get pre-approved for a San Jose home loan. Jumbo and super jumbo specialists. Silicon Valley mortgage lenders. NMLS #1945913."
  },
  {
    slug: "sacramento",
    name: "Sacramento",
    county: "Sacramento County",
    population: "530K",
    medianHomePrice: "$475,000",
    medianHouseholdIncome: "$72,000",
    avgDaysOnMarket: "22",
    yearOverYearChange: "+6.8%",
    description: "Sacramento offers California living at more affordable prices, attracting remote workers and families priced out of the Bay Area. Strong job growth and revitalized downtown fuel demand.",
    highlights: [
      "Most affordable major California metro",
      "State capital with stable government jobs",
      "Bay Area remote workers driving demand",
      "First-time buyers can still compete"
    ],
    neighborhoods: ["Midtown", "East Sacramento", "Land Park", "Natomas", "Elk Grove", "Folsom", "Roseville", "Rocklin"],
    loanTypes: ["Conventional", "FHA", "VA", "USDA", "Jumbo", "DSCR"],
    metaTitle: "Sacramento Mortgage Lenders | Home Loans Sacramento | LendyWendy",
    metaDescription: "Get pre-approved for a Sacramento home loan. Affordable California living. Compare rates from top Sacramento mortgage lenders. NMLS #1945913."
  },
  {
    slug: "orange-county",
    name: "Orange County",
    county: "Orange County",
    population: "3.2M",
    medianHomePrice: "$1,100,000",
    medianHouseholdIncome: "$100,000",
    avgDaysOnMarket: "30",
    yearOverYearChange: "+4.5%",
    description: "Orange County offers premier coastal living from Newport Beach to Laguna Beach, plus family-friendly suburbs like Irvine. Strong schools and beaches drive consistent demand.",
    highlights: [
      "Top-rated schools attract families",
      "Coastal communities at premium prices",
      "Master-planned cities like Irvine",
      "Strong employment in tech and healthcare"
    ],
    neighborhoods: ["Newport Beach", "Laguna Beach", "Irvine", "Huntington Beach", "Costa Mesa", "Anaheim", "Fullerton", "Dana Point"],
    loanTypes: ["Jumbo", "Conventional", "VA", "FHA", "DSCR", "Non-QM"],
    metaTitle: "Orange County Mortgage Lenders | OC Home Loans | LendyWendy",
    metaDescription: "Get pre-approved for an Orange County home loan. Compare rates from top OC mortgage lenders. Jumbo, VA, FHA available. NMLS #1945913."
  },
  // Secondary Markets
  {
    slug: "fresno",
    name: "Fresno",
    county: "Fresno County",
    population: "545K",
    medianHomePrice: "$380,000",
    medianHouseholdIncome: "$58,000",
    avgDaysOnMarket: "28",
    yearOverYearChange: "+7.2%",
    description: "Fresno offers some of California's most affordable housing with a growing economy centered on agriculture, healthcare, and logistics.",
    highlights: ["Most affordable Central Valley city", "Growing healthcare sector", "Agricultural hub", "First-time buyer friendly"],
    neighborhoods: ["Fig Garden", "Clovis", "Tower District", "Woodward Park", "Northwest Fresno"],
    loanTypes: ["FHA", "Conventional", "VA", "USDA", "DSCR"],
    metaTitle: "Fresno Mortgage Lenders | Home Loans Fresno | LendyWendy",
    metaDescription: "Get pre-approved for a Fresno home loan. Affordable California homeownership. FHA, VA, USDA loans available. NMLS #1945913."
  },
  {
    slug: "oakland",
    name: "Oakland",
    county: "Alameda County",
    population: "430K",
    medianHomePrice: "$825,000",
    medianHouseholdIncome: "$85,000",
    avgDaysOnMarket: "24",
    yearOverYearChange: "+3.1%",
    description: "Oakland offers Bay Area living with more diversity and affordability than San Francisco. Growing tech presence and urban revitalization drive strong appreciation.",
    highlights: ["Bay Area affordability alternative", "Growing tech and arts scene", "Excellent BART access", "Strong rental market"],
    neighborhoods: ["Rockridge", "Temescal", "Piedmont", "Lake Merritt", "Jack London Square", "Montclair"],
    loanTypes: ["Conventional", "FHA", "VA", "Jumbo", "DSCR", "Non-QM"],
    metaTitle: "Oakland Mortgage Lenders | Home Loans Oakland | LendyWendy",
    metaDescription: "Get pre-approved for an Oakland home loan. Bay Area affordability. Compare rates from Oakland mortgage lenders. NMLS #1945913."
  },
  {
    slug: "long-beach",
    name: "Long Beach",
    county: "Los Angeles County",
    population: "465K",
    medianHomePrice: "$750,000",
    medianHouseholdIncome: "$70,000",
    avgDaysOnMarket: "30",
    yearOverYearChange: "+4.8%",
    description: "Long Beach combines port city grit with beachside charm, offering more affordable LA County living with its own distinct character.",
    highlights: ["Major port drives employment", "Diverse neighborhoods", "Beach access at lower prices", "Growing downtown scene"],
    neighborhoods: ["Belmont Shore", "Naples", "Bixby Knolls", "Downtown", "Signal Hill", "Los Altos"],
    loanTypes: ["Conventional", "FHA", "VA", "Jumbo", "DSCR"],
    metaTitle: "Long Beach Mortgage Lenders | Home Loans LB | LendyWendy",
    metaDescription: "Get pre-approved for a Long Beach home loan. LA County beach living. Compare rates from Long Beach mortgage lenders. NMLS #1945913."
  },
  {
    slug: "bakersfield",
    name: "Bakersfield",
    county: "Kern County",
    population: "405K",
    medianHomePrice: "$365,000",
    medianHouseholdIncome: "$65,000",
    avgDaysOnMarket: "35",
    yearOverYearChange: "+8.5%",
    description: "Bakersfield offers California's most affordable major metro with a diversifying economy beyond oil and agriculture.",
    highlights: ["California's most affordable major city", "Strong job growth", "Family-friendly suburbs", "No state income tax refugees"],
    neighborhoods: ["Seven Oaks", "Bakersfield Country Club", "Stockdale", "Downtown", "Rosedale"],
    loanTypes: ["FHA", "Conventional", "VA", "USDA", "DSCR"],
    metaTitle: "Bakersfield Mortgage Lenders | Home Loans Bakersfield | LendyWendy",
    metaDescription: "Get pre-approved for a Bakersfield home loan. California's most affordable city. FHA, VA, USDA loans. NMLS #1945913."
  },
  {
    slug: "anaheim",
    name: "Anaheim",
    county: "Orange County",
    population: "350K",
    medianHomePrice: "$825,000",
    medianHouseholdIncome: "$78,000",
    avgDaysOnMarket: "28",
    yearOverYearChange: "+5.2%",
    description: "Home to Disneyland, Anaheim offers family-friendly living in the heart of Orange County with diverse housing options.",
    highlights: ["Disneyland and tourism economy", "Central OC location", "Growing Platinum Triangle", "Strong rental demand"],
    neighborhoods: ["Anaheim Hills", "Platinum Triangle", "West Anaheim", "Anaheim Resort"],
    loanTypes: ["Conventional", "FHA", "VA", "Jumbo", "DSCR"],
    metaTitle: "Anaheim Mortgage Lenders | Home Loans Anaheim | LendyWendy",
    metaDescription: "Get pre-approved for an Anaheim home loan. Orange County living. Compare rates from Anaheim mortgage lenders. NMLS #1945913."
  },
  {
    slug: "riverside",
    name: "Riverside",
    county: "Riverside County",
    population: "315K",
    medianHomePrice: "$575,000",
    medianHouseholdIncome: "$72,000",
    avgDaysOnMarket: "32",
    yearOverYearChange: "+6.5%",
    description: "Riverside offers Inland Empire affordability with a growing economy and UC Riverside anchoring education and research.",
    highlights: ["Inland Empire hub", "UC Riverside presence", "More affordable than coast", "Growing logistics sector"],
    neighborhoods: ["Mission Grove", "Canyon Crest", "Arlington", "Downtown", "La Sierra"],
    loanTypes: ["Conventional", "FHA", "VA", "USDA", "DSCR"],
    metaTitle: "Riverside Mortgage Lenders | Home Loans Riverside | LendyWendy",
    metaDescription: "Get pre-approved for a Riverside home loan. Inland Empire affordability. Compare rates from Riverside mortgage lenders. NMLS #1945913."
  },
  {
    slug: "irvine",
    name: "Irvine",
    county: "Orange County",
    population: "310K",
    medianHomePrice: "$1,300,000",
    medianHouseholdIncome: "$115,000",
    avgDaysOnMarket: "22",
    yearOverYearChange: "+4.0%",
    description: "Irvine is a master-planned city known for top schools, safety, and tech employment. Premium prices reflect the quality of life.",
    highlights: ["Top-rated schools", "Master-planned communities", "Tech employment hub", "Safest city in America"],
    neighborhoods: ["Woodbridge", "Turtle Rock", "University Park", "Northwood", "Great Park"],
    loanTypes: ["Jumbo", "Conventional", "VA", "DSCR", "Non-QM"],
    metaTitle: "Irvine Mortgage Lenders | Home Loans Irvine | LendyWendy",
    metaDescription: "Get pre-approved for an Irvine home loan. Top schools, safe community. Jumbo loan specialists. NMLS #1945913."
  },
  // Bay Area Cities
  {
    slug: "palo-alto",
    name: "Palo Alto",
    county: "Santa Clara County",
    population: "68K",
    medianHomePrice: "$3,200,000",
    medianHouseholdIncome: "$195,000",
    avgDaysOnMarket: "14",
    yearOverYearChange: "+2.5%",
    description: "Palo Alto is the heart of Silicon Valley, home to Stanford University and countless tech headquarters. One of America's most expensive housing markets.",
    highlights: ["Stanford University location", "Tech company headquarters", "Top-rated schools", "Super jumbo loans standard"],
    neighborhoods: ["Crescent Park", "Old Palo Alto", "Professorville", "Barron Park", "College Terrace", "Downtown"],
    loanTypes: ["Super Jumbo", "Jumbo", "Conventional", "DSCR", "Non-QM"],
    metaTitle: "Palo Alto Mortgage Lenders | Silicon Valley Home Loans | LendyWendy",
    metaDescription: "Get pre-approved for a Palo Alto home loan. Super jumbo loan specialists. Stanford area mortgage lenders. NMLS #1945913."
  },
  {
    slug: "mountain-view",
    name: "Mountain View",
    county: "Santa Clara County",
    population: "82K",
    medianHomePrice: "$1,850,000",
    medianHouseholdIncome: "$158,000",
    avgDaysOnMarket: "16",
    yearOverYearChange: "+3.2%",
    description: "Mountain View is home to Google's global headquarters and a thriving tech ecosystem. Strong demand from tech workers drives premium prices.",
    highlights: ["Google headquarters", "Growing tech campus", "Castro Street downtown", "Strong rental demand"],
    neighborhoods: ["Old Mountain View", "Cuesta Park", "Waverly Park", "Rex Manor", "Shoreline West"],
    loanTypes: ["Jumbo", "Super Jumbo", "Conventional", "DSCR", "Non-QM"],
    metaTitle: "Mountain View Mortgage Lenders | Home Loans MV | LendyWendy",
    metaDescription: "Get pre-approved for a Mountain View home loan. Google area mortgage specialists. Jumbo loans available. NMLS #1945913."
  },
  {
    slug: "sunnyvale",
    name: "Sunnyvale",
    county: "Santa Clara County",
    population: "155K",
    medianHomePrice: "$1,750,000",
    medianHouseholdIncome: "$145,000",
    avgDaysOnMarket: "18",
    yearOverYearChange: "+3.8%",
    description: "Sunnyvale offers Silicon Valley living with a diverse housing stock from older ranches to new construction. Major employers include Apple, LinkedIn, and Lockheed Martin.",
    highlights: ["Major tech employers", "Diverse housing options", "Central Valley location", "Strong appreciation"],
    neighborhoods: ["Lakewood", "Cherry Chase", "Birdland", "Ortega Park", "Raynor Park"],
    loanTypes: ["Jumbo", "Conventional", "VA", "DSCR", "Non-QM"],
    metaTitle: "Sunnyvale Mortgage Lenders | Home Loans Sunnyvale | LendyWendy",
    metaDescription: "Get pre-approved for a Sunnyvale home loan. Silicon Valley mortgage specialists. Jumbo and VA loans. NMLS #1945913."
  },
  {
    slug: "santa-clara",
    name: "Santa Clara",
    county: "Santa Clara County",
    population: "130K",
    medianHomePrice: "$1,650,000",
    medianHouseholdIncome: "$140,000",
    avgDaysOnMarket: "20",
    yearOverYearChange: "+4.1%",
    description: "Santa Clara hosts Intel, Nvidia, and Levi's Stadium. Strong tech employment and excellent schools drive consistent housing demand.",
    highlights: ["Intel and Nvidia headquarters", "Levi's Stadium home", "Santa Clara University", "Tech-driven market"],
    neighborhoods: ["Old Quad", "Washington Square", "Scott Boulevard", "Rivermark", "Mission College"],
    loanTypes: ["Jumbo", "Conventional", "VA", "FHA", "DSCR"],
    metaTitle: "Santa Clara Mortgage Lenders | Home Loans Santa Clara | LendyWendy",
    metaDescription: "Get pre-approved for a Santa Clara home loan. Tech corridor mortgage specialists. NMLS #1945913."
  },
  {
    slug: "fremont",
    name: "Fremont",
    county: "Alameda County",
    population: "230K",
    medianHomePrice: "$1,450,000",
    medianHouseholdIncome: "$155,000",
    avgDaysOnMarket: "18",
    yearOverYearChange: "+4.5%",
    description: "Fremont is the East Bay's largest city with excellent schools, Tesla's factory, and diverse neighborhoods from historic Niles to modern Mission San Jose.",
    highlights: ["Tesla factory location", "Top-rated schools", "Diverse neighborhoods", "BART accessible"],
    neighborhoods: ["Mission San Jose", "Niles", "Irvington", "Warm Springs", "Centerville", "Ardenwood"],
    loanTypes: ["Jumbo", "Conventional", "VA", "FHA", "DSCR"],
    metaTitle: "Fremont Mortgage Lenders | Home Loans Fremont | LendyWendy",
    metaDescription: "Get pre-approved for a Fremont home loan. East Bay mortgage specialists. Top schools, Tesla area. NMLS #1945913."
  },
  {
    slug: "hayward",
    name: "Hayward",
    county: "Alameda County",
    population: "165K",
    medianHomePrice: "$875,000",
    medianHouseholdIncome: "$90,000",
    avgDaysOnMarket: "22",
    yearOverYearChange: "+5.8%",
    description: "Hayward offers Bay Area living at more accessible prices with BART access, Cal State East Bay, and diverse communities.",
    highlights: ["BART accessible", "Cal State East Bay", "Bay Area affordability", "Growing downtown"],
    neighborhoods: ["Hayward Hills", "Harder-Tennyson", "Downtown", "South Hayward", "Cherryland"],
    loanTypes: ["Conventional", "FHA", "VA", "DSCR", "Non-QM"],
    metaTitle: "Hayward Mortgage Lenders | Home Loans Hayward | LendyWendy",
    metaDescription: "Get pre-approved for a Hayward home loan. Affordable Bay Area living. FHA, VA loans available. NMLS #1945913."
  },
  {
    slug: "berkeley",
    name: "Berkeley",
    county: "Alameda County",
    population: "125K",
    medianHomePrice: "$1,350,000",
    medianHouseholdIncome: "$95,000",
    avgDaysOnMarket: "20",
    yearOverYearChange: "+3.5%",
    description: "Berkeley combines world-class UC Berkeley with progressive culture, diverse architecture, and strong neighborhoods from the hills to the flats.",
    highlights: ["UC Berkeley campus", "Gourmet Ghetto dining", "Hills views and flats", "Strong appreciation"],
    neighborhoods: ["Rockridge", "Elmwood", "North Berkeley", "Claremont", "Downtown", "Thousand Oaks"],
    loanTypes: ["Jumbo", "Conventional", "VA", "DSCR", "Non-QM"],
    metaTitle: "Berkeley Mortgage Lenders | Home Loans Berkeley | LendyWendy",
    metaDescription: "Get pre-approved for a Berkeley home loan. UC Berkeley area mortgage specialists. NMLS #1945913."
  },
  {
    slug: "walnut-creek",
    name: "Walnut Creek",
    county: "Contra Costa County",
    population: "70K",
    medianHomePrice: "$1,100,000",
    medianHouseholdIncome: "$115,000",
    avgDaysOnMarket: "24",
    yearOverYearChange: "+4.2%",
    description: "Walnut Creek is the East Bay's premier suburb with excellent shopping, dining, top schools, and access to Mt. Diablo hiking.",
    highlights: ["Broadway Plaza shopping", "Top-rated schools", "Mt. Diablo access", "BART connected"],
    neighborhoods: ["Rossmoor", "Northgate", "Saranap", "Walnut Heights", "Downtown"],
    loanTypes: ["Jumbo", "Conventional", "VA", "DSCR", "Non-QM"],
    metaTitle: "Walnut Creek Mortgage Lenders | Home Loans Walnut Creek | LendyWendy",
    metaDescription: "Get pre-approved for a Walnut Creek home loan. Premier East Bay suburb. Jumbo specialists. NMLS #1945913."
  },
  {
    slug: "concord",
    name: "Concord",
    county: "Contra Costa County",
    population: "130K",
    medianHomePrice: "$725,000",
    medianHouseholdIncome: "$95,000",
    avgDaysOnMarket: "26",
    yearOverYearChange: "+6.2%",
    description: "Concord offers East Bay affordability with BART access, revitalizing downtown, and diverse neighborhoods.",
    highlights: ["BART accessible", "Affordable East Bay option", "Growing downtown", "Family-friendly"],
    neighborhoods: ["Dana Estates", "Holbrook Heights", "Four Corners", "Cowell", "Downtown"],
    loanTypes: ["Conventional", "FHA", "VA", "DSCR", "USDA"],
    metaTitle: "Concord Mortgage Lenders | Home Loans Concord | LendyWendy",
    metaDescription: "Get pre-approved for a Concord home loan. Affordable East Bay living. FHA, VA available. NMLS #1945913."
  },
  {
    slug: "san-mateo",
    name: "San Mateo",
    county: "San Mateo County",
    population: "105K",
    medianHomePrice: "$1,550,000",
    medianHouseholdIncome: "$130,000",
    avgDaysOnMarket: "20",
    yearOverYearChange: "+3.9%",
    description: "San Mateo sits between San Francisco and Silicon Valley with excellent schools, Caltrain access, and diverse neighborhoods.",
    highlights: ["Peninsula location", "Excellent schools", "Caltrain accessible", "Downtown dining scene"],
    neighborhoods: ["Hillsdale", "San Mateo Park", "Baywood", "Aragon", "Downtown", "Hayward Park"],
    loanTypes: ["Jumbo", "Conventional", "VA", "DSCR", "Non-QM"],
    metaTitle: "San Mateo Mortgage Lenders | Home Loans San Mateo | LendyWendy",
    metaDescription: "Get pre-approved for a San Mateo home loan. Peninsula mortgage specialists. Jumbo loans available. NMLS #1945913."
  },
  {
    slug: "redwood-city",
    name: "Redwood City",
    county: "San Mateo County",
    population: "85K",
    medianHomePrice: "$1,650,000",
    medianHouseholdIncome: "$125,000",
    avgDaysOnMarket: "18",
    yearOverYearChange: "+4.3%",
    description: "Redwood City features a revitalized downtown, excellent climate, and strong tech presence with Oracle and Electronic Arts nearby.",
    highlights: ["Revitalized downtown", "Best weather in Bay Area", "Tech company presence", "Caltrain accessible"],
    neighborhoods: ["Emerald Hills", "Woodside Plaza", "Redwood Shores", "Downtown", "Palm Park"],
    loanTypes: ["Jumbo", "Conventional", "VA", "DSCR", "Non-QM"],
    metaTitle: "Redwood City Mortgage Lenders | Home Loans RWC | LendyWendy",
    metaDescription: "Get pre-approved for a Redwood City home loan. Peninsula mortgage specialists. NMLS #1945913."
  },
  {
    slug: "daly-city",
    name: "Daly City",
    county: "San Mateo County",
    population: "105K",
    medianHomePrice: "$1,050,000",
    medianHouseholdIncome: "$95,000",
    avgDaysOnMarket: "24",
    yearOverYearChange: "+4.8%",
    description: "Daly City offers San Francisco proximity at lower prices with BART access and diverse communities.",
    highlights: ["BART accessible", "SF proximity", "More affordable than SF", "Serramonte shopping"],
    neighborhoods: ["Westlake", "Broadmoor", "Original Daly City", "Bayshore", "Serramonte"],
    loanTypes: ["Conventional", "FHA", "VA", "Jumbo", "DSCR"],
    metaTitle: "Daly City Mortgage Lenders | Home Loans Daly City | LendyWendy",
    metaDescription: "Get pre-approved for a Daly City home loan. SF adjacent, more affordable. FHA, VA available. NMLS #1945913."
  },
  {
    slug: "san-rafael",
    name: "San Rafael",
    county: "Marin County",
    population: "62K",
    medianHomePrice: "$1,250,000",
    medianHouseholdIncome: "$105,000",
    avgDaysOnMarket: "28",
    yearOverYearChange: "+3.2%",
    description: "San Rafael is Marin County's largest city with a charming downtown, excellent schools, and easy SF access via ferry or bridge.",
    highlights: ["Marin County seat", "Ferry to SF", "Charming downtown", "Mt. Tam access"],
    neighborhoods: ["Gerstle Park", "Dominican", "Sun Valley", "Terra Linda", "Downtown"],
    loanTypes: ["Jumbo", "Conventional", "VA", "DSCR", "Non-QM"],
    metaTitle: "San Rafael Mortgage Lenders | Home Loans San Rafael | LendyWendy",
    metaDescription: "Get pre-approved for a San Rafael home loan. Marin County mortgage specialists. NMLS #1945913."
  },
  {
    slug: "mill-valley",
    name: "Mill Valley",
    county: "Marin County",
    population: "15K",
    medianHomePrice: "$2,100,000",
    medianHouseholdIncome: "$175,000",
    avgDaysOnMarket: "22",
    yearOverYearChange: "+2.8%",
    description: "Mill Valley is a charming Marin town at the base of Mt. Tamalpais with top schools, redwood groves, and a walkable downtown.",
    highlights: ["Mt. Tamalpais gateway", "Top-rated schools", "Redwood setting", "Charming downtown"],
    neighborhoods: ["Downtown", "Cascade Canyon", "Alto", "Tamalpais Valley", "Homestead Valley"],
    loanTypes: ["Jumbo", "Super Jumbo", "Conventional", "DSCR", "Non-QM"],
    metaTitle: "Mill Valley Mortgage Lenders | Home Loans Mill Valley | LendyWendy",
    metaDescription: "Get pre-approved for a Mill Valley home loan. Marin luxury mortgage specialists. NMLS #1945913."
  },
  {
    slug: "pleasanton",
    name: "Pleasanton",
    county: "Alameda County",
    population: "80K",
    medianHomePrice: "$1,500,000",
    medianHouseholdIncome: "$175,000",
    avgDaysOnMarket: "16",
    yearOverYearChange: "+4.5%",
    description: "Pleasanton features top-rated schools, a charming downtown, and family-friendly neighborhoods in the Tri-Valley.",
    highlights: ["Top-rated schools", "Historic downtown", "Stoneridge Mall", "Wine country adjacent"],
    neighborhoods: ["Ruby Hill", "Birdland", "Downtown", "Vintage Hills", "West Pleasanton"],
    loanTypes: ["Jumbo", "Conventional", "VA", "DSCR", "Non-QM"],
    metaTitle: "Pleasanton Mortgage Lenders | Home Loans Pleasanton | LendyWendy",
    metaDescription: "Get pre-approved for a Pleasanton home loan. Top schools, Tri-Valley living. NMLS #1945913."
  },
  {
    slug: "livermore",
    name: "Livermore",
    county: "Alameda County",
    population: "90K",
    medianHomePrice: "$1,050,000",
    medianHouseholdIncome: "$140,000",
    avgDaysOnMarket: "20",
    yearOverYearChange: "+5.2%",
    description: "Livermore offers Tri-Valley living with wine country charm, national labs employment, and more space for the dollar.",
    highlights: ["Wine country downtown", "Lawrence Livermore Lab", "More affordable Tri-Valley", "Growing community"],
    neighborhoods: ["South Livermore", "Downtown", "Springtown", "Sunset West", "North Livermore"],
    loanTypes: ["Conventional", "FHA", "VA", "Jumbo", "DSCR"],
    metaTitle: "Livermore Mortgage Lenders | Home Loans Livermore | LendyWendy",
    metaDescription: "Get pre-approved for a Livermore home loan. Wine country living. FHA, VA available. NMLS #1945913."
  },
];

// Get city by slug
export function getCityBySlug(slug: string): CaliforniaCity | undefined {
  return CALIFORNIA_CITIES.find(city => city.slug === slug);
}

// Get all city slugs for static generation
export function getAllCitySlugs(): string[] {
  return CALIFORNIA_CITIES.map(city => city.slug);
}

// Get cities by county
export function getCitiesByCounty(county: string): CaliforniaCity[] {
  return CALIFORNIA_CITIES.filter(city => city.county === county);
}

// Get major cities (for featured display)
export function getMajorCities(): CaliforniaCity[] {
  const majorSlugs = ["los-angeles", "san-francisco", "san-diego", "san-jose", "sacramento", "orange-county"];
  return CALIFORNIA_CITIES.filter(city => majorSlugs.includes(city.slug));
}

// Get secondary cities
export function getSecondaryCities(): CaliforniaCity[] {
  const majorSlugs = ["los-angeles", "san-francisco", "san-diego", "san-jose", "sacramento", "orange-county"];
  return CALIFORNIA_CITIES.filter(city => !majorSlugs.includes(city.slug));
}

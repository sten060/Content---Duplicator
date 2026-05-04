// Country / city catalog with realistic GPS coordinates.
// Used to inject coherent location metadata (EXIF GPS, QuickTime ISO6709)
// into duplicated files — instead of hard-coded France-only random coords
// which betray the file as fake when the user picked another country.

export type City = {
  name: string;
  region?: string;
  lat: number; // signed decimal degrees
  lon: number; // signed decimal degrees
  alt: number; // meters above sea level
};

export type CountryEntry = {
  code: string;
  name: string;     // canonical English name (used in metadata `location` tag)
  iso2: string;     // ISO 3166-1 alpha-2 (same as code, for clarity)
  cities: City[];
};

// 9 supported countries — keep this list in sync with CountrySelect component.
export const COUNTRIES: Record<string, CountryEntry> = {
  FR: {
    code: "FR",
    name: "France",
    iso2: "FR",
    cities: [
      { name: "Paris",          lat: 48.8566, lon:  2.3522, alt:  35 },
      { name: "Marseille",      lat: 43.2965, lon:  5.3698, alt:  12 },
      { name: "Lyon",           lat: 45.7640, lon:  4.8357, alt: 173 },
      { name: "Toulouse",       lat: 43.6047, lon:  1.4442, alt: 146 },
      { name: "Nice",           lat: 43.7102, lon:  7.2620, alt:  15 },
      { name: "Nantes",         lat: 47.2184, lon: -1.5536, alt:   8 },
      { name: "Strasbourg",     lat: 48.5734, lon:  7.7521, alt: 142 },
      { name: "Montpellier",    lat: 43.6108, lon:  3.8767, alt:  27 },
      { name: "Bordeaux",       lat: 44.8378, lon: -0.5792, alt:  20 },
      { name: "Lille",          lat: 50.6292, lon:  3.0573, alt:  21 },
      { name: "Rennes",         lat: 48.1173, lon: -1.6778, alt:  38 },
      { name: "Reims",          lat: 49.2583, lon:  4.0317, alt:  90 },
      { name: "Le Havre",       lat: 49.4944, lon:  0.1079, alt:  10 },
      { name: "Saint-Étienne",  lat: 45.4397, lon:  4.3872, alt: 516 },
      { name: "Grenoble",       lat: 45.1885, lon:  5.7245, alt: 214 },
      { name: "Toulon",         lat: 43.1242, lon:  5.9280, alt:  10 },
    ],
  },
  US: {
    code: "US",
    name: "United States",
    iso2: "US",
    cities: [
      { name: "New York",       region: "NY", lat: 40.7128, lon:  -74.0060, alt:  10 },
      { name: "Los Angeles",    region: "CA", lat: 34.0522, lon: -118.2437, alt:  93 },
      { name: "Chicago",        region: "IL", lat: 41.8781, lon:  -87.6298, alt: 181 },
      { name: "Houston",        region: "TX", lat: 29.7604, lon:  -95.3698, alt:  13 },
      { name: "Phoenix",        region: "AZ", lat: 33.4484, lon: -112.0740, alt: 331 },
      { name: "Philadelphia",   region: "PA", lat: 39.9526, lon:  -75.1652, alt:  12 },
      { name: "San Antonio",    region: "TX", lat: 29.4241, lon:  -98.4936, alt: 198 },
      { name: "San Diego",      region: "CA", lat: 32.7157, lon: -117.1611, alt:  19 },
      { name: "Dallas",         region: "TX", lat: 32.7767, lon:  -96.7970, alt: 131 },
      { name: "San Jose",       region: "CA", lat: 37.3382, lon: -121.8863, alt:  25 },
      { name: "Austin",         region: "TX", lat: 30.2672, lon:  -97.7431, alt: 149 },
      { name: "San Francisco",  region: "CA", lat: 37.7749, lon: -122.4194, alt:  16 },
      { name: "Seattle",        region: "WA", lat: 47.6062, lon: -122.3321, alt:  56 },
      { name: "Miami",          region: "FL", lat: 25.7617, lon:  -80.1918, alt:   2 },
      { name: "Denver",         region: "CO", lat: 39.7392, lon: -104.9903, alt: 1609 },
      { name: "Boston",         region: "MA", lat: 42.3601, lon:  -71.0589, alt:  43 },
      { name: "Atlanta",        region: "GA", lat: 33.7490, lon:  -84.3880, alt: 320 },
      { name: "Las Vegas",      region: "NV", lat: 36.1699, lon: -115.1398, alt: 610 },
      { name: "Portland",       region: "OR", lat: 45.5152, lon: -122.6784, alt:  15 },
      { name: "Washington",     region: "DC", lat: 38.9072, lon:  -77.0369, alt:   7 },
    ],
  },
  GB: {
    code: "GB",
    name: "United Kingdom",
    iso2: "GB",
    cities: [
      { name: "London",         lat: 51.5074, lon: -0.1278, alt:  11 },
      { name: "Manchester",     lat: 53.4808, lon: -2.2426, alt:  38 },
      { name: "Birmingham",     lat: 52.4862, lon: -1.8904, alt: 140 },
      { name: "Liverpool",      lat: 53.4084, lon: -2.9916, alt:  40 },
      { name: "Leeds",          lat: 53.8008, lon: -1.5491, alt:  34 },
      { name: "Glasgow",        lat: 55.8642, lon: -4.2518, alt:  39 },
      { name: "Edinburgh",      lat: 55.9533, lon: -3.1883, alt:  47 },
      { name: "Bristol",        lat: 51.4545, lon: -2.5879, alt:  11 },
      { name: "Sheffield",      lat: 53.3811, lon: -1.4701, alt:  61 },
      { name: "Newcastle",      lat: 54.9783, lon: -1.6178, alt:  51 },
      { name: "Cardiff",        lat: 51.4816, lon: -3.1791, alt:   9 },
      { name: "Belfast",        lat: 54.5973, lon: -5.9301, alt:   4 },
      { name: "Brighton",       lat: 50.8225, lon: -0.1372, alt:  20 },
      { name: "Cambridge",      lat: 52.2053, lon:  0.1218, alt:   6 },
      { name: "Oxford",         lat: 51.7520, lon: -1.2577, alt:  62 },
    ],
  },
  ES: {
    code: "ES",
    name: "Spain",
    iso2: "ES",
    cities: [
      { name: "Madrid",         lat: 40.4168, lon:  -3.7038, alt: 657 },
      { name: "Barcelona",      lat: 41.3851, lon:   2.1734, alt:  12 },
      { name: "Valencia",       lat: 39.4699, lon:  -0.3763, alt:  15 },
      { name: "Seville",        lat: 37.3891, lon:  -5.9845, alt:   7 },
      { name: "Zaragoza",       lat: 41.6488, lon:  -0.8891, alt: 199 },
      { name: "Málaga",         lat: 36.7213, lon:  -4.4214, alt:  11 },
      { name: "Murcia",         lat: 37.9922, lon:  -1.1307, alt:  43 },
      { name: "Palma",          lat: 39.5696, lon:   2.6502, alt:  13 },
      { name: "Bilbao",         lat: 43.2630, lon:  -2.9350, alt:  19 },
      { name: "Granada",        lat: 37.1773, lon:  -3.5986, alt: 738 },
      { name: "Alicante",       lat: 38.3452, lon:  -0.4810, alt:   3 },
      { name: "Córdoba",        lat: 37.8882, lon:  -4.7794, alt: 120 },
      { name: "Vigo",           lat: 42.2406, lon:  -8.7207, alt:  31 },
      { name: "Gijón",          lat: 43.5322, lon:  -5.6611, alt:   3 },
      { name: "Pamplona",       lat: 42.8125, lon:  -1.6458, alt: 446 },
    ],
  },
  IT: {
    code: "IT",
    name: "Italy",
    iso2: "IT",
    cities: [
      { name: "Rome",           lat: 41.9028, lon: 12.4964, alt:  21 },
      { name: "Milan",          lat: 45.4642, lon:  9.1900, alt: 120 },
      { name: "Naples",         lat: 40.8518, lon: 14.2681, alt:  17 },
      { name: "Turin",          lat: 45.0703, lon:  7.6869, alt: 239 },
      { name: "Palermo",        lat: 38.1157, lon: 13.3615, alt:  14 },
      { name: "Genoa",          lat: 44.4056, lon:  8.9463, alt:  20 },
      { name: "Bologna",        lat: 44.4949, lon: 11.3426, alt:  54 },
      { name: "Florence",       lat: 43.7696, lon: 11.2558, alt:  50 },
      { name: "Bari",           lat: 41.1171, lon: 16.8719, alt:   5 },
      { name: "Catania",        lat: 37.5079, lon: 15.0830, alt:   7 },
      { name: "Venice",         lat: 45.4408, lon: 12.3155, alt:   1 },
      { name: "Verona",         lat: 45.4384, lon: 10.9916, alt:  59 },
      { name: "Padua",          lat: 45.4064, lon: 11.8768, alt:  12 },
      { name: "Pisa",           lat: 43.7228, lon: 10.4017, alt:   4 },
      { name: "Trieste",        lat: 45.6495, lon: 13.7768, alt:   2 },
    ],
  },
  DE: {
    code: "DE",
    name: "Germany",
    iso2: "DE",
    cities: [
      { name: "Berlin",         lat: 52.5200, lon: 13.4050, alt:  34 },
      { name: "Hamburg",        lat: 53.5511, lon:  9.9937, alt:   6 },
      { name: "Munich",         lat: 48.1351, lon: 11.5820, alt: 520 },
      { name: "Cologne",        lat: 50.9375, lon:  6.9603, alt:  53 },
      { name: "Frankfurt",      lat: 50.1109, lon:  8.6821, alt: 112 },
      { name: "Stuttgart",      lat: 48.7758, lon:  9.1829, alt: 245 },
      { name: "Düsseldorf",     lat: 51.2277, lon:  6.7735, alt:  38 },
      { name: "Leipzig",        lat: 51.3397, lon: 12.3731, alt: 113 },
      { name: "Dortmund",       lat: 51.5136, lon:  7.4653, alt:  86 },
      { name: "Essen",          lat: 51.4556, lon:  7.0116, alt: 116 },
      { name: "Bremen",         lat: 53.0793, lon:  8.8017, alt:  12 },
      { name: "Hannover",       lat: 52.3759, lon:  9.7320, alt:  55 },
      { name: "Nuremberg",      lat: 49.4521, lon: 11.0767, alt: 302 },
      { name: "Dresden",        lat: 51.0504, lon: 13.7373, alt: 113 },
    ],
  },
  CH: {
    code: "CH",
    name: "Switzerland",
    iso2: "CH",
    cities: [
      { name: "Zurich",         lat: 47.3769, lon:  8.5417, alt: 408 },
      { name: "Geneva",         lat: 46.2044, lon:  6.1432, alt: 375 },
      { name: "Basel",          lat: 47.5596, lon:  7.5886, alt: 260 },
      { name: "Bern",           lat: 46.9480, lon:  7.4474, alt: 540 },
      { name: "Lausanne",       lat: 46.5197, lon:  6.6323, alt: 495 },
      { name: "Lucerne",        lat: 47.0502, lon:  8.3093, alt: 435 },
      { name: "Lugano",         lat: 46.0037, lon:  8.9511, alt: 273 },
      { name: "Winterthur",     lat: 47.5022, lon:  8.7386, alt: 439 },
      { name: "St. Gallen",     lat: 47.4245, lon:  9.3767, alt: 700 },
      { name: "Biel/Bienne",    lat: 47.1368, lon:  7.2467, alt: 434 },
    ],
  },
  BE: {
    code: "BE",
    name: "Belgium",
    iso2: "BE",
    cities: [
      { name: "Brussels",       lat: 50.8503, lon:  4.3517, alt:  76 },
      { name: "Antwerp",        lat: 51.2194, lon:  4.4025, alt:   8 },
      { name: "Ghent",          lat: 51.0543, lon:  3.7174, alt:   9 },
      { name: "Charleroi",      lat: 50.4108, lon:  4.4446, alt: 121 },
      { name: "Liège",          lat: 50.6326, lon:  5.5797, alt:  72 },
      { name: "Bruges",         lat: 51.2093, lon:  3.2247, alt:   6 },
      { name: "Namur",          lat: 50.4674, lon:  4.8718, alt:  91 },
      { name: "Leuven",         lat: 50.8798, lon:  4.7005, alt:  16 },
      { name: "Mons",           lat: 50.4541, lon:  3.9523, alt:  46 },
      { name: "Mechelen",       lat: 51.0259, lon:  4.4776, alt:   7 },
    ],
  },
  CA: {
    code: "CA",
    name: "Canada",
    iso2: "CA",
    cities: [
      { name: "Toronto",        region: "ON", lat: 43.6532, lon:  -79.3832, alt:  76 },
      { name: "Montreal",       region: "QC", lat: 45.5017, lon:  -73.5673, alt:  36 },
      { name: "Vancouver",      region: "BC", lat: 49.2827, lon: -123.1207, alt:  70 },
      { name: "Calgary",        region: "AB", lat: 51.0447, lon: -114.0719, alt: 1045 },
      { name: "Edmonton",       region: "AB", lat: 53.5461, lon: -113.4938, alt: 645 },
      { name: "Ottawa",         region: "ON", lat: 45.4215, lon:  -75.6972, alt:  70 },
      { name: "Winnipeg",       region: "MB", lat: 49.8951, lon:  -97.1384, alt: 232 },
      { name: "Quebec City",    region: "QC", lat: 46.8139, lon:  -71.2080, alt:  98 },
      { name: "Hamilton",       region: "ON", lat: 43.2557, lon:  -79.8711, alt:  91 },
      { name: "Halifax",        region: "NS", lat: 44.6488, lon:  -63.5752, alt:  19 },
      { name: "Victoria",       region: "BC", lat: 48.4284, lon: -123.3656, alt:  23 },
      { name: "Saskatoon",      region: "SK", lat: 52.1332, lon: -106.6700, alt: 482 },
    ],
  },
};

// Map English name → code, so the metadata layer accepts either format
// (code from new CountrySelect, or legacy English name from older templates).
const ALIASES: Record<string, string> = {
  "France": "FR",
  "United States": "US",
  "USA": "US",
  "United Kingdom": "GB",
  "UK": "GB",
  "Spain": "ES",
  "Italy": "IT",
  "Germany": "DE",
  "Switzerland": "CH",
  "Belgium": "BE",
  "Canada": "CA",
};

export function resolveCountry(input: string | undefined | null): CountryEntry | null {
  if (!input) return null;
  const trimmed = input.trim();
  if (!trimmed) return null;
  const upper = trimmed.toUpperCase();
  if (COUNTRIES[upper]) return COUNTRIES[upper];
  const aliased = ALIASES[trimmed];
  if (aliased && COUNTRIES[aliased]) return COUNTRIES[aliased];
  return null;
}

export type Location = {
  city: string;
  region?: string;
  country: string;     // canonical English name (e.g. "United States")
  countryCode: string; // e.g. "US"
  lat: number;         // signed decimal degrees, with jitter
  lon: number;         // signed decimal degrees, with jitter
  alt: number;         // meters
  iso6709: string;     // standard ISO 6709 string for QuickTime location tag
  // EXIF-style sign refs derived from lat/lon:
  latRef: "N" | "S";
  lonRef: "E" | "W";
};

// ISO 6709 short form: "±DD.DDDD±DDD.DDDD±AAA.A/"
// — fixed integer width, sign always present, trailing slash required.
export function formatISO6709(lat: number, lon: number, alt: number): string {
  const fmt = (n: number, intDigits: number, decDigits: number) => {
    const sign = n >= 0 ? "+" : "-";
    const abs = Math.abs(n);
    const fixed = abs.toFixed(decDigits); // "123.4567"
    const [intPart, decPart] = fixed.split(".");
    return sign + intPart.padStart(intDigits, "0") + (decPart ? "." + decPart : "");
  };
  return fmt(lat, 2, 4) + fmt(lon, 3, 4) + fmt(alt, 3, 1) + "/";
}

// Pick a random city in the country, then add ~500m jitter (~0.005°) so each
// duplicate has unique coords but stays within the city bounds. Returns null
// when the country isn't supported (caller treats as "no location").
export function pickLocation(input: string | undefined | null): Location | null {
  const country = resolveCountry(input);
  if (!country) return null;

  const city = country.cities[Math.floor(Math.random() * country.cities.length)];
  // Jitter: ~±0.005° lat ≈ ±550m ; ±0.007° lon at 45°N ≈ ±550m.
  // A real photo's GPS isn't exactly the city center.
  const jitter = () => (Math.random() - 0.5) * 0.01;
  const lat = +(city.lat + jitter()).toFixed(6);
  const lon = +(city.lon + jitter()).toFixed(6);
  // Altitude variation ±5m (floor/upper room, terrain)
  const alt = +(city.alt + (Math.random() - 0.5) * 10).toFixed(1);

  return {
    city: city.name,
    region: city.region,
    country: country.name,
    countryCode: country.code,
    lat,
    lon,
    alt,
    iso6709: formatISO6709(lat, lon, alt),
    latRef: lat >= 0 ? "N" : "S",
    lonRef: lon >= 0 ? "E" : "W",
  };
}

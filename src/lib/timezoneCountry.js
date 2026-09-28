// =========================================================
// Best-effort guess at the visitor's country, from their timezone alone.
// =========================================================
// Used for one thing only: pre-selecting the flag and dial code in the phone
// field, so a visitor does not have to hunt through 240 countries for their
// own. It never blocks the form, never validates anything, and every failure
// is swallowed - if nothing resolves, the caller keeps its own default.
//
// WHY NOT IP GEOLOCATION. The sibling projects ask a third-party service
// (ipinfo.io, ipwho.is, ipapi.co) where the visitor is, which means every page
// load hands someone else the visitor's IP address. That is a real privacy
// cost for a convenience feature, and it contradicts a privacy policy that
// says the site makes no third-party requests. The browser already knows what
// timezone it is in, and reading it costs nothing and tells no one.
//
// The trade-off is accuracy: a timezone covers a whole region, so this picks
// the country most people in that zone are in. Someone in a zone that spans
// several countries can be guessed wrong. That is acceptable - the visitor can
// correct it in one click, and being briefly wrong pre-selects a flag rather
// than failing a validation.
//
// Must be called from an effect, never during render: the prerender runs
// renderToString in Node, where Intl exists but has no opinion about where it
// is, and the baked HTML has to match the client's first render.
// =========================================================
import { DEFAULT_ISO, isKnownCountry } from './phoneFormat.js'

const TZ_TO_ISO = {
  // --- Australia (and its external territories) ---
  'Australia/Sydney': 'AU',
  'Australia/Melbourne': 'AU',
  'Australia/Brisbane': 'AU',
  'Australia/Adelaide': 'AU',
  'Australia/Perth': 'AU',
  'Australia/Hobart': 'AU',
  'Australia/Darwin': 'AU',
  'Australia/Canberra': 'AU',
  'Australia/Lord_Howe': 'AU',
  'Australia/Broken_Hill': 'AU',
  'Australia/Eucla': 'AU',
  'Australia/Lindeman': 'AU',
  'Antarctica/Macquarie': 'AU',

  // --- New Zealand and the Pacific ---
  'Pacific/Auckland': 'NZ',
  'Pacific/Chatham': 'NZ',
  'Pacific/Fiji': 'FJ',
  'Pacific/Port_Moresby': 'PG',
  'Pacific/Noumea': 'NC',
  'Pacific/Guadalcanal': 'SB',
  'Pacific/Tongatapu': 'TO',
  'Pacific/Apia': 'WS',
  'Pacific/Vanuatu': 'VU',

  // --- Asia ---
  'Asia/Singapore': 'SG',
  'Asia/Kuala_Lumpur': 'MY',
  'Asia/Jakarta': 'ID',
  'Asia/Makassar': 'ID',
  'Asia/Jayapura': 'ID',
  'Asia/Manila': 'PH',
  'Asia/Bangkok': 'TH',
  'Asia/Ho_Chi_Minh': 'VN',
  'Asia/Hong_Kong': 'HK',
  'Asia/Taipei': 'TW',
  'Asia/Tokyo': 'JP',
  'Asia/Seoul': 'KR',
  'Asia/Shanghai': 'CN',
  'Asia/Kolkata': 'IN',
  'Asia/Calcutta': 'IN',
  'Asia/Karachi': 'PK',
  'Asia/Dhaka': 'BD',
  'Asia/Colombo': 'LK',
  'Asia/Kathmandu': 'NP',
  'Asia/Dubai': 'AE',
  'Asia/Riyadh': 'SA',
  'Asia/Qatar': 'QA',
  'Asia/Kuwait': 'KW',
  'Asia/Jerusalem': 'IL',
  'Asia/Istanbul': 'TR',

  // --- Europe ---
  'Europe/London': 'GB',
  'Europe/Dublin': 'IE',
  'Europe/Berlin': 'DE',
  'Europe/Paris': 'FR',
  'Europe/Madrid': 'ES',
  'Europe/Rome': 'IT',
  'Europe/Amsterdam': 'NL',
  'Europe/Brussels': 'BE',
  'Europe/Zurich': 'CH',
  'Europe/Vienna': 'AT',
  'Europe/Lisbon': 'PT',
  'Europe/Athens': 'GR',
  'Europe/Stockholm': 'SE',
  'Europe/Oslo': 'NO',
  'Europe/Copenhagen': 'DK',
  'Europe/Helsinki': 'FI',
  'Europe/Warsaw': 'PL',
  'Europe/Prague': 'CZ',
  'Europe/Budapest': 'HU',
  'Europe/Bucharest': 'RO',
  'Europe/Sofia': 'BG',
  'Europe/Moscow': 'RU',
  'Europe/Kiev': 'UA',
  'Europe/Kyiv': 'UA',

  // --- Middle East & Africa ---
  'Africa/Cairo': 'EG',
  'Africa/Casablanca': 'MA',
  'Africa/Lagos': 'NG',
  'Africa/Nairobi': 'KE',
  'Africa/Accra': 'GH',
  'Africa/Dar_es_Salaam': 'TZ',
  'Africa/Johannesburg': 'ZA',

  // --- Americas ---
  'America/New_York': 'US',
  'America/Chicago': 'US',
  'America/Denver': 'US',
  'America/Phoenix': 'US',
  'America/Los_Angeles': 'US',
  'America/Anchorage': 'US',
  'Pacific/Honolulu': 'US',
  'America/Toronto': 'CA',
  'America/Vancouver': 'CA',
  'America/Edmonton': 'CA',
  'America/Winnipeg': 'CA',
  'America/Halifax': 'CA',
  'America/Mexico_City': 'MX',
  'America/Sao_Paulo': 'BR',
  'America/Argentina/Buenos_Aires': 'AR',
  'America/Santiago': 'CL',
  'America/Bogota': 'CO',
  'America/Lima': 'PE',
}

/**
 * @returns {string|null} ISO 3166-1 alpha-2 code, or null if unknown. The
 *   caller is responsible for checking the code against the picker's own list -
 *   a code we do not carry is no more useful than no code at all.
 */
export function detectCountry() {
  if (typeof window === 'undefined') return null
  let tz = ''
  try {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
  } catch {
    return null
  }
  const iso = TZ_TO_ISO[tz]
  if (!iso || iso === DEFAULT_ISO || !isKnownCountry(iso)) return null
  return iso
}

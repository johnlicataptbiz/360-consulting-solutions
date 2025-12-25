import { GoogleGenerativeAI } from '@google/generative-ai';

const HUBSPOT_PUBLIC_BOOK_ENDPOINT = 'https://api.hubspot.com/meetings-public/v1/book';

function parseSlug(meetingUrl) {
  if (!meetingUrl) return null;
  try {
    const url = new URL(meetingUrl);
    const parts = url.pathname.split('/').filter(Boolean);
    return parts[parts.length - 1] || null;
  } catch {
    return null;
  }
}

function parseHost(meetingUrl) {
  if (!meetingUrl) return null;
  try {
    return new URL(meetingUrl).host || null;
  } catch {
    return null;
  }
}

const HUBSPOT_MEETING_SLUG =
  process.env.HUBSPOT_MEETING_SLUG ||
  parseSlug(process.env.HUBSPOT_MEETING_URL) ||
  parseSlug(process.env.VITE_HUBSPOT_MEETING_URL) ||
  'john2490';

const HUBSPOT_MEETINGS_HOST =
  process.env.HUBSPOT_MEETINGS_HOST ||
  parseHost(process.env.HUBSPOT_MEETING_URL) ||
  parseHost(process.env.VITE_HUBSPOT_MEETING_URL) ||
  'meetings.hubspot.com';

const pad2 = (n) => String(n).padStart(2, '0');

function getDateKeyInTimeZone(date, timeZone) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);

  const year = parts.find((p) => p.type === 'year')?.value;
  const month = parts.find((p) => p.type === 'month')?.value;
  const day = parts.find((p) => p.type === 'day')?.value;
  if (!year || !month || !day) return null;
  return `${year}-${month}-${day}`;
}

async function fetchHubSpotBookInfo({ now, timezone, location }) {
  const params = new URLSearchParams({
    slug: HUBSPOT_MEETING_SLUG,
    now: String(now),
    includeInactiveLink: 'true',
    location,
    timezone,
  });

  const response = await fetch(`${HUBSPOT_PUBLIC_BOOK_ENDPOINT}?${params.toString()}`);
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`HubSpot availability fetch failed (${response.status}): ${text}`);
  }
  return { data: JSON.parse(text), requestParams: Object.fromEntries(params.entries()) };
}

async function fetchMonthInfo({ month, timezone, location, debug }) {
  const [yearStr, monthStr] = month.split('-');
  const year = Number(yearStr);
  const monthIndex = Number(monthStr) - 1;
  const now = Date.now();
  const bookInfo = await fetchHubSpotBookInfo({ now, timezone, location });

  const byDuration = bookInfo?.data?.linkAvailability?.linkAvailabilityByDuration || {};
  const durations = Object.keys(byDuration)
    .map((d) => Number(d))
    .filter((d) => Number.isFinite(d))
    .sort((a, b) => a - b);
  const durationMs = durations[0];
  if (!durationMs) return { days: [], durationMs: undefined };

  const availabilities = byDuration[String(durationMs)]?.availabilities || [];
  const monthPrefix = `${year}-${pad2(monthIndex + 1)}`;
  const dayMap = new Map();

  for (const slot of availabilities) {
    const startMillisUtc = slot?.startMillisUtc;
    const endMillisUtc = slot?.endMillisUtc;
    if (!Number.isFinite(startMillisUtc) || !Number.isFinite(endMillisUtc)) continue;

    const dateKey = getDateKeyInTimeZone(new Date(startMillisUtc), timezone);
    if (!dateKey || !dateKey.startsWith(monthPrefix)) continue;

    if (!dayMap.has(dateKey)) dayMap.set(dateKey, []);
    dayMap.get(dateKey).push({
      start: new Date(startMillisUtc).toISOString(),
      end: new Date(endMillisUtc).toISOString(),
    });
  }

  const days = Array.from(dayMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, slots]) => ({
      date,
      slots: slots.sort((a, b) => a.start.localeCompare(b.start)),
    }));

  return { days, durationMs };
}

async function createHubSpotBooking({ firstName, lastName, email, timezone, duration, startTime }) {
  const query = new URLSearchParams({ slug: HUBSPOT_MEETING_SLUG });
  const body = { firstName, lastName, email, formFields: [], offline: false, locale: 'en', timezone, duration, startTime, guestEmails: [] };

  const response = await fetch(`${HUBSPOT_PUBLIC_BOOK_ENDPOINT}?${query.toString()}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`HubSpot booking failed (${response.status}): ${text}`);
  }
  return JSON.parse(text);
}

async function generateAIStrategy(userInput) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error('AI Module Offline: API Configuration Required.');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
    You are John Licata, Principal of 360 Consulting Solutions. You have 30 years of experience in retail, footwear, and managing massive topline revenues. Your philosophy is "Winning at work without losing at home."
    User input: "${userInput}"
    Analyze through: 1. STRATEGIC OVERSIGHT, 2. OPERATIONAL FIX, 3. LEGACY BLUEPRINT.
    Return JSON: { "strategy": "...", "operations": "...", "legacy": "..." }
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
  return JSON.parse(cleaned);
}

export default async function handler(req, res) {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  try {
    if (pathname === '/api/hubspot/oro/availability/MonthInfo') {
      const { month, timezone, debug } = req.query;
      const result = await fetchMonthInfo({ month, timezone, location: HUBSPOT_MEETINGS_HOST, debug: debug === '1' });
      return res.status(200).json(result);
    }

    if (pathname === '/api/hubspot/oro/book') {
      const booking = await createHubSpotBooking(req.body);
      return res.status(200).json(booking);
    }

    if (pathname === '/api/ai/strategist') {
      const { input, email } = req.body;
      if (email) console.log(`[LEAD] AI Strategist from: ${email}`);
      const analysis = await generateAIStrategy(input);
      return res.status(200).json(analysis);
    }

    if (pathname === '/api/health') {
      return res.status(200).json({ ok: true });
    }

    return res.status(404).json({ error: 'Not found' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

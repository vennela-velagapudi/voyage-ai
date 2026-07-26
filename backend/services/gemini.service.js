import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Validates and sanitizes the raw text returned by Gemini to ensure strict JSON structure.
 * Isolates outermost brackets and safely cleans trailing commas and formatting artifacts.
 * @param {string} rawText - The raw output text from the AI model.
 * @returns {object} Parsed and validated JSON object.
 */
function sanitizeAndParseJson(rawText) {
  if (!rawText) {
    throw new Error('Received empty response from Gemini API.');
  }

  let cleanText = rawText.trim();

  // 1. Strip potential markdown code block wrappers (e.g. ```json ... ```)
  if (cleanText.startsWith('```')) {
    cleanText = cleanText
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/, '')
      .trim();
  }

  // 2. Isolate outermost valid JSON object or array ({...} or [...])
  const firstBrace = cleanText.indexOf('{');
  const firstBracket = cleanText.indexOf('[');
  let startIdx = -1;
  let endIdx = -1;

  if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    startIdx = firstBrace;
    endIdx = cleanText.lastIndexOf('}');
  } else if (firstBracket !== -1) {
    startIdx = firstBracket;
    endIdx = cleanText.lastIndexOf(']');
  }

  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    cleanText = cleanText.substring(startIdx, endIdx + 1);
  }

  // 3. Strip trailing commas before closing braces and brackets
  cleanText = cleanText.replace(/,\s*([\]}])/g, '$1');

  try {
    return JSON.parse(cleanText);
  } catch (parseError) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[Raw Malformed AI Output]:', rawText);
    }
    const error = new Error(`AI generated invalid JSON format: ${parseError.message}`);
    error.statusCode = 502;
    throw error;
  }
}

/**
 * Helper to execute generative tasks with automatic retries and clean error propagation.
 * @param {Function} fn - Async function taking (attemptNumber, isRetry) as argument.
 * @param {number} maxRetries - Maximum retry attempts (default 2 retries = 3 attempts total).
 * @returns {Promise<any>}
 */
async function executeWithRetry(fn, maxRetries = 3) {
  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn(attempt, attempt > 0);
    } catch (error) {
      lastError = error;
      // Re-throw immediately if authentication error (API key invalid) or user input validation error
      if (error.statusCode === 401 || error.statusCode === 400 || error.statusCode === 422) {
        throw error;
      }

      if (attempt < maxRetries) {
        let delayMs = 2000 * Math.pow(2, attempt); // Default backoff: 2s, 4s, 8s
        const rawMsg = String(error.message || '');

        // Intercept HTTP 429 Quota Exceeded / Too Many Requests and extract requested retry delay
        if (
          rawMsg.includes('429') ||
          rawMsg.toLowerCase().includes('quota') ||
          rawMsg.toLowerCase().includes('too many requests')
        ) {
          const delayMatch = rawMsg.match(/retry in ([\d.]+)s/i);
          if (delayMatch && delayMatch[1]) {
            const requestedSec = parseFloat(delayMatch[1]);
            if (!isNaN(requestedSec)) {
              delayMs = Math.ceil(requestedSec * 1000) + 1500; // Add 1.5s safety buffer
            }
          } else {
            delayMs = 15000 * (attempt + 1); // 15s, 30s fallback for rate limits
          }
          console.warn(
            `[AI Rate Limit Advisory] API quota reached (429). Sleeping ${Math.round(delayMs / 1000)}s before retry (${attempt + 1}/${maxRetries})...`
          );
        } else {
          console.warn(
            `[AI Generation Warning] Attempt ${attempt + 1} failed: ${rawMsg}. Retrying in ${Math.round(delayMs / 1000)}s (${attempt + 1}/${maxRetries})...`
          );
        }

        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  // If all retries fail, return a clean user-friendly error instead of exposing parser syntax exceptions
  console.error('[AI Generation Fatal Failure]: Exhausted all retry attempts.', lastError?.message);
  const cleanError = new Error(
    'Our AI travel consultant encountered a temporary server delay while synthesizing your schedule. Please click Retry Generation to generate your itinerary.'
  );
  cleanError.statusCode = 502;
  throw cleanError;
}

/**
 * Generates an itinerary chunk for a specific day range.
 */
async function generateItineraryChunk({
  destination,
  totalDays,
  startDay,
  endDay,
  budget,
  travelStyle,
  interests,
  notes,
  expansionNote,
  placeCategory,
  isFirstChunk,
  existingTitle,
  isRetry,
}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'your_google_gemini_api_key_here') {
    const error = new Error(
      'GEMINI_API_KEY is missing or invalid in backend environment variables. Please add your API key to proceed.'
    );
    error.statusCode = 503;
    throw error;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.7,
      maxOutputTokens: 32768,
    },
  });

  const expansionGuidance = expansionNote
    ? `\nIMPORTANT DESTINATION EXPANSION NOTE:\n${expansionNote}\nBecause the requested trip duration extends beyond a typical visit to this specific venue/landmark, construct an exciting itinerary that expands outward to incorporate the broader surrounding city, authentic cultural neighborhood gems, nearby dining districts, and regional tourist highlights across all ${totalDays} days. Clearly reflect this broader city/regional journey in the overview.\n`
    : '';

  const retryInstruction = isRetry
    ? '\nCRITICAL RETRY NOTICE: Your previous output encountered formatting or JSON syntax truncation. You MUST return exclusively valid, completely closed JSON with no markdown wrapping or conversational text. Keep descriptions concise to guarantee perfect syntax completion.\n'
    : '';

  let prompt;
  if (isFirstChunk) {
    prompt = `You are Voyage AI, an elite, professional travel itinerary architect.
Construct a highly engaging, realistic, and optimized travel itinerary based EXACTLY on the user's criteria.
For each day from Day ${startDay} to Day ${endDay}, design a comprehensive chronological timeline of experiences from morning until night.
Return ONLY a valid JSON object matching the exact schema specified below. Do NOT include introductory text, explanations, or markdown formatting outside the JSON structure.
${retryInstruction}
USER TRAVEL PARAMETERS:
- Destination: ${destination} (${placeCategory || 'Destination'})
- Total Trip Duration: ${totalDays} Days (You are generating Chunk 1: Days ${startDay} to ${endDay})
- Budget Profile: ${budget}
- Travel Style / Companion: ${travelStyle}
- Key Interests: ${Array.isArray(interests) ? interests.join(', ') : interests}
- Additional Preferences / Notes: ${notes || 'None provided'}${expansionGuidance}

REQUIRED JSON SCHEMA FOR THIS INITIAL CHUNK:
{
  "tripTitle": "A catchy, evocative title for the custom journey",
  "destination": "${destination}",
  "durationDays": ${Number(totalDays)},
  "budget": "${budget}",
  "travelStyle": "${travelStyle}",
  "estimatedPace": "Relaxed",
  "overview": "A compelling 2-3 sentence summary of what to expect on this tailored trip across all ${totalDays} days.",
  "estimatedTotalBudgetTip": "Approx. ₹8,000–₹14,000 overall guidance in INR matching budget tier",
  "destinationEmergencyInfo": {
    "police": "110 / Local Police Emergency Number",
    "ambulance": "119 / Local Medical Emergency Number",
    "fire": "119 / Local Fire Emergency Number",
    "touristHelpline": "Local Tourist Assistance Line",
    "nearestHospitalName": "Central General City Hospital",
    "nearestHospitalAddress": "Main Medical District, Central Ave",
    "googleMapsUrl": "https://maps.google.com/?q=hospital+emergency+in+${encodeURIComponent(destination)}"
  },
  "dailyItinerary": [
    {
      "dayNumber": ${startDay},
      "theme": "Title or primary focus of the day (e.g. 'Historic Wonders & Local Flavors')",
      "estimatedDailyCost": "₹1,500–₹2,500 per person (Local dining, activities & internal transit)",
      "localTip": "Wear comfortable shoes and book iconic attraction tickets early in the morning.",
      "timeline": [
        {
          "time": "08:30 AM",
          "title": "Authentic Breakfast Cafe",
          "description": "Start your day with local culinary specialties in a scenic setting.",
          "category": "Breakfast",
          "duration": "1 hour",
          "cost": "₹300–₹500",
          "suitabilityNote": "Popular among couples and foodies.",
          "travelNote": "Peak crowd hours around 9:00 AM.",
          "scamTip": "Check published menu prices before ordering.",
          "safetyNote": "Well-lit tourist area; completely safe.",
          "transportToNext": {
            "mode": "Walk",
            "duration": "12 mins",
            "cost": "Free"
          }
        },
        {
          "time": "10:30 AM",
          "title": "Iconic Landmark Exploration",
          "description": "Wander historical courtyards and capture scenic photographs.",
          "category": "Sightseeing",
          "duration": "2 hours",
          "cost": "₹500–₹800",
          "suitabilityNote": "Great for all traveler styles.",
          "travelNote": "Carry drinking water and wear respectful attire.",
          "transportToNext": {
            "mode": "Metro",
            "duration": "15 mins",
            "cost": "₹40–₹80"
          }
        },
        {
          "time": "01:00 PM",
          "title": "Traditional Regional Dining",
          "description": "Taste signature culinary dishes at a celebrated neighborhood spot.",
          "category": "Lunch",
          "duration": "1.5 hours",
          "cost": "₹600–₹1,000",
          "transportToNext": {
            "mode": "Taxi",
            "duration": "10 mins",
            "cost": "₹200–₹350"
          }
        },
        {
          "time": "03:00 PM",
          "title": "Cultural Museum & Gallery",
          "description": "Explore artistic masterpieces and regional historical relics.",
          "category": "Museum",
          "duration": "2 hours",
          "cost": "₹400–₹700",
          "transportToNext": {
            "mode": "Walk",
            "duration": "10 mins",
            "cost": "Free"
          }
        },
        {
          "time": "06:00 PM",
          "title": "Evening Sunset Market",
          "description": "Browse handcrafted souvenirs and street food stalls.",
          "category": "Shopping",
          "duration": "1.5 hours",
          "cost": "₹800–₹1,500",
          "scamTip": "Beware of unofficial tour guides or inflated souvenir prices.",
          "transportToNext": {
            "mode": "Walk",
            "duration": "8 mins",
            "cost": "Free"
          }
        },
        {
          "time": "08:00 PM",
          "title": "Gourmet Dinner Experience",
          "description": "Enjoy a delicious multi-course dinner matching your budget tier.",
          "category": "Dinner",
          "duration": "2 hours",
          "cost": "₹1,200–₹2,200",
          "safetyNote": "Use ride-sharing or licensed taxis after sunset when departing."
        }
      ]
    }
  ]
}

IMPORTANT TIMELINE & CONSULTANT INSTRUCTIONS:
1. Generate exactly ${endDay - startDay + 1} day objects inside the "dailyItinerary" array, numbered sequentially from ${startDay} to ${endDay}.
2. Each daily timeline array must contain a chronological progression of 5 to 6 engaging experiences from morning until night (breakfast, attraction, lunch, sightseeing/shopping, dinner). Keep activity descriptions concise and punchy (1 to 2 sentences) to ensure complete syntax closure.
3. Between consecutive activities, provide a realistic "transportToNext" object with "mode" ("Walk", "Metro", "Taxi", "Bus", "Ride Sharing", "Rental Bike"), "duration", and estimated INR "cost" (or "Free" for Walking). Do NOT include transportToNext on the last activity of the day.
4. Express all costs strictly in INR using the ₹ symbol (e.g., "₹300–₹500", "₹800–₹1,200", or "Free"). Never display dollar symbols ($).
5. Include helpful travel advice ("travelNote", "scamTip", "safetyNote", "suitabilityNote") on relevant activities.
`;
  } else {
    // Continuation chunk prompt
    prompt = `You are Voyage AI, an elite, professional travel itinerary architect.
You are continuing the ${totalDays}-day travel itinerary for ${destination} (Title: "${existingTitle || 'Tailored Journey'}").
Generate ONLY the next schedule chunk: specifically Day ${startDay} through Day ${endDay}.
Return ONLY a valid JSON object matching the schema below. Do NOT include introductory text, explanations, or markdown formatting outside the JSON structure.
${retryInstruction}
USER TRAVEL PARAMETERS:
- Destination: ${destination} (${placeCategory || 'Destination'})
- Total Days: ${totalDays} (Generating Continuation Chunk: Days ${startDay} to ${endDay})
- Budget Profile: ${budget}
- Travel Style / Companion: ${travelStyle}
- Key Interests: ${Array.isArray(interests) ? interests.join(', ') : interests}
- Additional Preferences / Notes: ${notes || 'None provided'}${expansionGuidance}

REQUIRED JSON SCHEMA FOR THIS CONTINUATION CHUNK:
{
  "dailyItinerary": [
    {
      "dayNumber": ${startDay},
      "theme": "Unique Theme for Day ${startDay} (e.g. 'Hidden Heritage & Neighborhood Exploration')",
      "estimatedDailyCost": "₹1,500–₹2,500 per person (Local dining & attractions)",
      "localTip": "Practical local advice or etiquette tip for today.",
      "timeline": [
        {
          "time": "08:30 AM",
          "title": "Charming Morning Cafe",
          "description": "Start your morning with freshly brewed artisan coffee and pastries.",
          "category": "Breakfast",
          "duration": "1 hour",
          "cost": "₹300–₹500",
          "suitabilityNote": "Ideal morning atmosphere.",
          "transportToNext": { "mode": "Walk", "duration": "10 mins", "cost": "Free" }
        },
        {
          "time": "10:00 AM",
          "title": "Scenic Garden or Cultural Relic",
          "description": "Immerse yourself in authentic neighborhood architecture and tranquil vistas.",
          "category": "Sightseeing",
          "duration": "2.5 hours",
          "cost": "₹400–₹700",
          "travelNote": "Wear comfortable walking shoes.",
          "scamTip": "Buy tickets at official entrance gates.",
          "safetyNote": "Monitored tourist zone.",
          "transportToNext": { "mode": "Metro", "duration": "15 mins", "cost": "₹50–₹80" }
        },
        {
          "time": "01:00 PM",
          "title": "Authentic Neighborhood Bistro",
          "description": "Savor authentic culinary flavors at a lively neighborhood hangout.",
          "category": "Lunch",
          "duration": "1.5 hours",
          "cost": "₹600–₹1,000",
          "transportToNext": { "mode": "Taxi", "duration": "10 mins", "cost": "₹200–₹350" }
        },
        {
          "time": "03:00 PM",
          "title": "Artisanal District Exploration",
          "description": "Wander through local crafts workshops and picturesque alleys.",
          "category": "Sightseeing",
          "duration": "2 hours",
          "cost": "Free",
          "transportToNext": { "mode": "Walk", "duration": "12 mins", "cost": "Free" }
        },
        {
          "time": "06:00 PM",
          "title": "Evening Culinary Dinner",
          "description": "Conclude your day with an exquisite dining experience.",
          "category": "Dinner",
          "duration": "2 hours",
          "cost": "₹1,200–₹2,000",
          "safetyNote": "Use licensed taxis or ride-sharing when returning to hotel."
        }
      ]
    }
  ]
}

IMPORTANT INSTRUCTIONS:
1. Generate exactly ${endDay - startDay + 1} day objects inside "dailyItinerary", numbered from ${startDay} to ${endDay}.
2. Ensure fresh attractions that provide exciting variety compared to earlier days in the journey.
3. Keep activity descriptions concise (1 to 2 sentences) to guarantee valid JSON syntax completion.
4. Express all costs in INR strictly using the ₹ symbol. Never use dollar symbols ($).
`;
  }

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  const data = sanitizeAndParseJson(responseText);

  // Validate structural integrity of chunk
  if (!Array.isArray(data.dailyItinerary) || data.dailyItinerary.length === 0) {
    throw new Error(`AI generated an empty dailyItinerary array for days ${startDay}-${endDay}.`);
  }

  data.dailyItinerary.forEach((day, idx) => {
    if (!day.dayNumber) {
      day.dayNumber = startDay + idx;
    }
    if (!Array.isArray(day.timeline)) {
      day.timeline = [];
    }
  });

  return data;
}

/**
 * Generates a structured travel itinerary using Google Gemini generative AI with Dynamic Chunking.
 * Strategy:
 * - 1–7 days: Single request
 * - 8–14 days: Generate in two chunks
 * - 15–30+ days: Generate in 5-day chunks (Days 1–5, 6–10, etc.)
 * @param {object} params - Travel parameters: destination, days, budget, travelStyle, interests, notes, expansionNote, placeCategory.
 * @returns {Promise<object>} Guaranteed structured JSON itinerary object with chronological timelines.
 */
export async function generateTripItinerary({
  destination,
  days,
  budget,
  travelStyle,
  interests,
  notes,
  expansionNote,
  placeCategory,
}) {
  const totalDays = Number(days) || 1;
  const chunkRanges = [];

  // Determine dynamic chunking intervals
  if (totalDays <= 7) {
    chunkRanges.push({ startDay: 1, endDay: totalDays });
  } else if (totalDays <= 14) {
    const mid = Math.ceil(totalDays / 2);
    chunkRanges.push({ startDay: 1, endDay: mid });
    chunkRanges.push({ startDay: mid + 1, endDay: totalDays });
  } else {
    // 15–30+ days: 5-day chunks
    for (let start = 1; start <= totalDays; start += 5) {
      const end = Math.min(start + 4, totalDays);
      chunkRanges.push({ startDay: start, endDay: end });
    }
  }

  console.log(
    `[Dynamic Chunked Generation] Destination: ${destination}, Total Days: ${totalDays}, Strategy: ${chunkRanges.length} chunk(s)`
  );

  let finalItinerary = null;
  let tripTitle = 'Custom AI Travel Blueprint';
  const allDaysMap = new Map();

  // Execute chunk generations
  for (let i = 0; i < chunkRanges.length; i++) {
    const { startDay, endDay } = chunkRanges[i];
    const isFirstChunk = i === 0;

    if (!isFirstChunk) {
      console.log(
        '[Pacing Delay] Pausing 3s between itinerary chunks to respect API request quota...'
      );
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }

    console.log(`[Generating Chunk ${i + 1}/${chunkRanges.length}]: Days ${startDay}–${endDay}...`);

    const chunkData = await executeWithRetry(async (_attempt, isRetry) => {
      return await generateItineraryChunk({
        destination,
        totalDays,
        startDay,
        endDay,
        budget,
        travelStyle,
        interests,
        notes,
        expansionNote,
        placeCategory,
        isFirstChunk,
        existingTitle: tripTitle,
        isRetry,
      });
    });

    if (isFirstChunk) {
      finalItinerary = {
        tripTitle: chunkData.tripTitle || `Explore ${destination}: ${totalDays}-Day Journey`,
        destination: chunkData.destination || destination,
        durationDays: totalDays,
        budget,
        travelStyle,
        estimatedPace: chunkData.estimatedPace || 'Relaxed',
        overview:
          chunkData.overview ||
          `An unforgettable ${totalDays}-day tailored exploration of ${destination} featuring curated dining, cultural highlights, and practical local guidance.`,
        estimatedTotalBudgetTip:
          chunkData.estimatedTotalBudgetTip || 'Approx. ₹8,000–₹14,000 overall guidance in INR',
        destinationEmergencyInfo: chunkData.destinationEmergencyInfo || {
          police: '110 / Local Police',
          ambulance: '119 / Local Medical Emergency',
          fire: '119 / Local Fire Rescue',
          touristHelpline: 'Local Tourist Assistance Helpline',
          nearestHospitalName: 'Central General City Hospital',
          nearestHospitalAddress: 'Main Medical District, Central Ave',
          googleMapsUrl: `https://maps.google.com/?q=hospital+emergency+in+${encodeURIComponent(destination)}`,
        },
        dailyItinerary: [],
      };
      tripTitle = finalItinerary.tripTitle;
    }

    // Accumulate generated day timelines into map to prevent duplication or out-of-order merging
    if (Array.isArray(chunkData.dailyItinerary)) {
      chunkData.dailyItinerary.forEach((dayObj) => {
        if (dayObj && dayObj.dayNumber) {
          allDaysMap.set(Number(dayObj.dayNumber), dayObj);
        }
      });
    }
  }

  // Ensure all days from 1 to totalDays exist in sorted order
  const sortedDays = [];
  for (let d = 1; d <= totalDays; d++) {
    const dayObj = allDaysMap.get(d);
    if (dayObj) {
      sortedDays.push(dayObj);
    } else {
      // Fallback filler in the rare case an intermediate day number was skipped by AI in a chunk
      sortedDays.push({
        dayNumber: d,
        theme: `Day ${d} Highlights & Local Wonders`,
        estimatedDailyCost: '₹1,500–₹2,500 per person',
        localTip: 'Start your morning early and keep drinking water handy.',
        timeline: [
          {
            time: '09:00 AM',
            title: 'Morning Sightseeing & Breakfast',
            description: 'Start your morning with local culinary flavors and scenic exploration.',
            category: 'Sightseeing',
            duration: '2 hours',
            cost: '₹400–₹700',
            transportToNext: { mode: 'Taxi', duration: '15 mins', cost: '₹200–₹350' },
          },
          {
            time: '01:00 PM',
            title: 'Central Culinary Lunch & District Walk',
            description: 'Savor regional recipes and explore surrounding artisan boutiques.',
            category: 'Lunch',
            duration: '2 hours',
            cost: '₹700–₹1,200',
            transportToNext: { mode: 'Walk', duration: '10 mins', cost: 'Free' },
          },
          {
            time: '06:30 PM',
            title: 'Evening Sunset Dining',
            description: 'Relax with an exquisite dinner matching your budget profile.',
            category: 'Dinner',
            duration: '2 hours',
            cost: '₹1,200–₹2,000',
            safetyNote: 'Use official ride-sharing apps when departing after dusk.',
          },
        ],
      });
    }
  }

  finalItinerary.dailyItinerary = sortedDays;

  if (expansionNote) {
    finalItinerary.expansionNotice = expansionNote;
  }

  console.log(
    `[Dynamic Chunking Completed] Successfully synthesized all ${sortedDays.length} days for ${destination}.`
  );

  return finalItinerary;
}

/**
 * Generate a replacement for a single activity slot using Gemini AI with automatic retries.
 */
export async function generateAlternativeActivity({
  activity,
  destination,
  budget = 'moderate',
  travelStyle = 'travel',
  interests = 'sightseeing',
  notes = '',
}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    const error = new Error('Missing Google Gemini API Key in server environment variables.');
    error.statusCode = 500;
    throw error;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.7,
      maxOutputTokens: 8192,
    },
  });

  return await executeWithRetry(async (_attempt, isRetry) => {
    const retryNote = isRetry
      ? '\nCRITICAL RETRY INSTRUCTION: Output strictly valid JSON with no trailing commas or conversational markdown.\n'
      : '';
    const prompt = `You are an elite AI Travel Consultant. The user wants to replace a specific scheduled activity in their itinerary for ${destination}.
Current activity being replaced: "${activity.title || 'Selected Activity'}" (Scheduled around ${activity.time || '12:00 PM'}, Category: ${activity.category || 'Sightseeing'}).
User Travel Preferences: Budget Tier: ${budget}, Style: ${travelStyle}, Interests: ${JSON.stringify(interests)}, Notes: "${notes}".

Generate ONE brand-new, distinct alternative activity or restaurant/cafe matching the exact same time of day and destination context. Do NOT repeat "${activity.title || 'Selected Activity'}".
${retryNote}
Respond ONLY with a valid JSON object matching this schema:
{
  "time": "${activity.time || '10:00 AM'}",
  "title": "New Unique Attraction or Restaurant Name",
  "description": "Compelling description of why this alternative is ideal for the user.",
  "category": "${activity.category || 'Sightseeing'}",
  "duration": "1.5 hours",
  "cost": "₹500–₹800",
  "suitabilityNote": "Suitable for ${travelStyle} travelers.",
  "travelNote": "Best visiting time and practical comfort tip.",
  "scamTip": "Use official ticket counters or licensed transit.",
  "safetyNote": "Well-lit tourist district with emergency assistance nearby.",
  "transportToNext": ${JSON.stringify(activity.transportToNext || null)}
}

IMPORTANT: Express all costs in INR strictly using the ₹ symbol (e.g. ₹300–₹500 or Free). Never display "$". Respond only with valid JSON.`;

    const result = await model.generateContent(prompt);
    return sanitizeAndParseJson(result.response.text());
  });
}

/**
 * Regenerate an entire single day's schedule using Gemini AI with automatic retries.
 */
export async function generateSingleDay({
  dayNumber = 1,
  theme = 'Local Highlights',
  destination,
  budget = 'moderate',
  travelStyle = 'travel',
  interests = 'sightseeing',
  notes = '',
}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    const error = new Error('Missing Google Gemini API Key in server environment variables.');
    error.statusCode = 500;
    throw error;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.7,
      maxOutputTokens: 16384,
    },
  });

  return await executeWithRetry(async (_attempt, isRetry) => {
    const retryNote = isRetry
      ? '\nCRITICAL RETRY INSTRUCTION: Output strictly valid JSON with no trailing commas or conversational markdown.\n'
      : '';
    const prompt = `You are an expert AI Travel Consultant. The user requested to regenerate the schedule specifically for Day ${dayNumber} of their trip to ${destination}.
Travel parameters: Theme Focus: ${theme}, Budget: ${budget}, Companion/Style: ${travelStyle}, Interests: ${JSON.stringify(interests)}, Custom Notes: "${notes}".

Create a completely fresh, balanced chronological timeline for Day ${dayNumber} with an engaging theme inspired by "${theme}" and 5 to 8 activities (including breakfast, coffee break, lunch, sightseeing, shopping, and dinner).
${retryNote}
Respond ONLY with a valid JSON object matching this schema:
{
  "dayNumber": ${Number(dayNumber)},
  "theme": "New Unique Day Theme (e.g. 'Hidden Heritage & Artisanal Cuisine')",
  "estimatedDailyCost": "₹1,800–₹3,000 per person (Local dining & attractions)",
  "localTip": "Practical local advice or etiquette tip for today's itinerary.",
  "timeline": [
    {
      "time": "08:30 AM",
      "title": "Fresh Morning Bakery Cafe",
      "description": "Start with signature regional pastries and artisanal tea.",
      "category": "Breakfast",
      "duration": "1 hour",
      "cost": "₹300–₹500",
      "suitabilityNote": "Ideal start for ${travelStyle} travel.",
      "travelNote": "Arrive early before morning queues begin.",
      "transportToNext": { "mode": "Walk", "duration": "10 mins", "cost": "Free" }
    },
    {
      "time": "10:00 AM",
      "title": "Historic Landmark Exploration",
      "description": "Discover culturally famous architecture and tranquil courtyards.",
      "category": "Sightseeing",
      "duration": "2 hours",
      "cost": "₹500–₹800",
      "scamTip": "Beware of fake guides; hire only official docents at the entrance.",
      "safetyNote": "Secure area monitored by tourist police during daytime.",
      "transportToNext": { "mode": "Metro", "duration": "15 mins", "cost": "₹50–₹90" }
    },
    {
      "time": "01:00 PM",
      "title": "Traditional Regional Dining",
      "description": "Savor classic culinary recipes at a celebrated neighborhood eatery.",
      "category": "Lunch",
      "duration": "1.5 hours",
      "cost": "₹700–₹1,200",
      "transportToNext": { "mode": "Taxi", "duration": "12 mins", "cost": "₹250–₹400" }
    },
    {
      "time": "03:00 PM",
      "title": "Scenic Park & Photo Spots",
      "description": "Stroll through landscaped pathways with iconic panoramic views.",
      "category": "Sightseeing",
      "duration": "1.5 hours",
      "cost": "Free",
      "transportToNext": { "mode": "Walk", "duration": "8 mins", "cost": "Free" }
    },
    {
      "time": "05:30 PM",
      "title": "Sunset Market Walk",
      "description": "Browse local handicrafts and energetic street stalls as twilight sets in.",
      "category": "Shopping",
      "duration": "1.5 hours",
      "cost": "₹800–₹1,500",
      "transportToNext": { "mode": "Walk", "duration": "10 mins", "cost": "Free" }
    },
    {
      "time": "07:30 PM",
      "title": "Evening Gastronomous Supper",
      "description": "Relax with an exquisite evening meal perfectly tailored to your budget.",
      "category": "Dinner",
      "duration": "2 hours",
      "cost": "₹1,200–₹2,000",
      "safetyNote": "Use official ride-sharing apps when departing after dusk."
    }
  ]
}

IMPORTANT: All monetary figures must be explicitly in INR using the ₹ symbol. Never use dollar symbols ($). Respond ONLY with valid JSON.`;

    const result = await model.generateContent(prompt);
    return sanitizeAndParseJson(result.response.text());
  });
}

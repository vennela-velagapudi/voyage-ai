import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Validates and sanitizes the raw text returned by Gemini to ensure strict JSON structure.
 * @param {string} rawText - The raw output text from the AI model.
 * @returns {object} Parsed and validated itinerary object.
 */
function sanitizeAndValidateResponse(rawText) {
  if (!rawText) {
    throw new Error('Received empty response from Gemini API.');
  }

  // Strip potential markdown code block wrappers (e.g. ```json ... ```)
  let cleanText = rawText.trim();
  if (cleanText.startsWith('```')) {
    cleanText = cleanText
      .replace(/^```(json)?/i, '')
      .replace(/```$/, '')
      .trim();
  }

  let data;
  try {
    data = JSON.parse(cleanText);
  } catch (parseError) {
    const error = new Error(`AI generated invalid JSON format: ${parseError.message}`);
    error.statusCode = 502; // Bad Gateway / Upstream error
    throw error;
  }

  // Validate mandatory structural schema fields
  const requiredFields = [
    'destination',
    'durationDays',
    'budget',
    'travelStyle',
    'overview',
    'dailyItinerary',
  ];
  for (const field of requiredFields) {
    if (!data[field]) {
      const error = new Error(`AI response is missing required schema field: "${field}"`);
      error.statusCode = 502;
      throw error;
    }
  }

  if (!Array.isArray(data.dailyItinerary) || data.dailyItinerary.length === 0) {
    const error = new Error('AI response dailyItinerary must be a non-empty array.');
    error.statusCode = 502;
    throw error;
  }

  // Verify timeline structure inside dailyItinerary
  data.dailyItinerary.forEach((day) => {
    if (!Array.isArray(day.timeline)) {
      day.timeline = [];
    }
  });

  return data;
}

/**
 * Generates a structured travel itinerary using Google Gemini generative AI.
 * @param {object} params - Travel parameters: destination, days, budget, travelStyle, interests, notes.
 * @returns {Promise<object>} Guaranteed structured JSON itinerary object with chronological timelines.
 */
export async function generateTripItinerary({
  destination,
  days,
  budget,
  travelStyle,
  interests,
  notes,
}) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey === 'your_google_gemini_api_key_here') {
    const error = new Error(
      'GEMINI_API_KEY is missing or invalid in backend environment variables. Please add your API key to proceed.'
    );
    error.statusCode = 503; // Service Unavailable / Configuration Error
    throw error;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: 'gemini-3.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.7,
      maxOutputTokens: 16384,
    },
  });

  const prompt = `
You are Voyage AI, an elite, professional travel itinerary architect.
Construct a highly engaging, realistic, and optimized travel itinerary based EXACTLY on the user's criteria.
For each day, design a comprehensive chronological timeline of experiences from morning until night.
Return ONLY a valid JSON object matching the exact schema specified below. Do NOT include introductory text, explanations, or markdown formatting outside the JSON structure.

USER TRAVEL PARAMETERS:
- Destination: ${destination}
- Total Days: ${days}
- Budget Profile: ${budget}
- Travel Style / Companion: ${travelStyle}
- Key Interests: ${Array.isArray(interests) ? interests.join(', ') : interests}
- Additional Preferences / Notes: ${notes || 'None provided'}

REQUIRED JSON SCHEMA:
{
  "tripTitle": "A catchy, evocative title for the custom journey",
  "destination": "${destination}",
  "durationDays": ${Number(days)},
  "budget": "${budget}",
  "travelStyle": "${travelStyle}",
  "overview": "A compelling 2-3 sentence summary of what to expect on this tailored trip.",
  "estimatedTotalBudgetTip": "A realistic overall budget guidance summary or money-saving advice tailored to the selected budget level",
  "dailyItinerary": [
    {
      "dayNumber": 1,
      "theme": "Title or primary focus of the day (e.g. 'Historic Wonders & Local Flavors')",
      "timeline": [
        {
          "time": "08:30 AM",
          "title": "Authentic Breakfast Cafe",
          "description": "Start your day with local culinary specialties in a scenic setting.",
          "category": "Breakfast"
        },
        {
          "time": "10:00 AM",
          "title": "Iconic Landmark Walk",
          "description": "Wander the historical grounds and take scenic photographs.",
          "category": "Sightseeing"
        },
        {
          "time": "12:30 PM",
          "title": "Central Culinary Lunch",
          "description": "Taste signature regional dishes at a popular local gathering spot.",
          "category": "Lunch"
        },
        {
          "time": "02:30 PM",
          "title": "Cultural Gallery & Archives",
          "description": "Explore artistic masterpieces and regional historical relics.",
          "category": "Museum"
        },
        {
          "time": "04:30 PM",
          "title": "Artisanal Coffee & Sweets Break",
          "description": "Relax at a celebrated heritage tea house or boutique café.",
          "category": "Coffee Break"
        },
        {
          "time": "06:00 PM",
          "title": "Boutique Craft Shopping",
          "description": "Browse handcrafted souvenirs and local market stalls.",
          "category": "Shopping"
        },
        {
          "time": "07:30 PM",
          "title": "Gourmet Dinner Experience",
          "description": "Enjoy a multi-course dinner matching your budget tier.",
          "category": "Dinner"
        },
        {
          "time": "09:30 PM",
          "title": "Illuminated Twilight Walk",
          "description": "Experience late-night viewpoints or a vibrant evening cocktail terrace.",
          "category": "Night Activity"
        }
      ],
      "estimatedDailyCost": "$120 - $180 (Est. activities, dining & local transit)",
      "localTip": "An actionable insider hack, transit tip, or etiquette advice for this specific day"
    }
  ]
}

IMPORTANT TIMELINE INSTRUCTIONS:
1. Ensure there are exactly ${Number(days)} day objects inside the "dailyItinerary" array, numbered from 1 to ${Number(days)}.
2. Each daily timeline array must contain a rich, chronological progression of activities throughout the day (aim for 5 to 8 entries per day).
3. Always include diverse category values such as: "Breakfast", "Sightseeing", "Museum", "Lunch", "Shopping", "Coffee Break", "Activity", "Dinner", "Night Activity".
4. Ensure each day clearly includes "estimatedDailyCost" and "localTip" at the day object root level as shown in the schema.
`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const validatedData = sanitizeAndValidateResponse(responseText);
    return validatedData;
  } catch (error) {
    // If the error originates from Google AI SDK (e.g. invalid API key, quota exceeded), wrap with clean message
    if (error.message && error.message.includes('API_KEY_INVALID')) {
      const authError = new Error(
        'Invalid Google Gemini API Key provided in environment variables.'
      );
      authError.statusCode = 401;
      throw authError;
    }
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    throw error;
  }
}

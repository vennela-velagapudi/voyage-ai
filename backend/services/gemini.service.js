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

  return data;
}

/**
 * Generates a structured travel itinerary using Google Gemini 2.5 Flash.
 * @param {object} params - Travel parameters: destination, days, budget, travelStyle, interests, notes.
 * @returns {Promise<object>} Guaranteed structured JSON itinerary object.
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
    model: 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.7,
      maxOutputTokens: 4096,
    },
  });

  const prompt = `
You are Voyage AI, an elite, professional travel itinerary architect.
Construct a highly engaging, realistic, and optimized travel itinerary based EXACTLY on the user's criteria.
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
  "destination": "Cleaned destination name",
  "durationDays": ${Number(days)},
  "budget": "${budget}",
  "travelStyle": "${travelStyle}",
  "overview": "A compelling 2-3 sentence summary of what to expect on this tailored trip.",
  "estimatedTotalBudgetTip": "A realistic budget summary or money-saving tip tailored to the selected budget level",
  "dailyItinerary": [
    {
      "dayNumber": 1,
      "theme": "Title or primary focus of the day (e.g. 'Historic Wonders & Local Flavors')",
      "morning": {
        "activity": "Detailed morning activity description with specific landmarks or locations",
        "location": "Primary neighborhood or landmark name",
        "approxCost": "Estimated expenditure in local currency or USD equivalent ($)"
      },
      "afternoon": {
        "activity": "Detailed afternoon experience and sightseeing itinerary",
        "location": "Primary location name",
        "approxCost": "Estimated expenditure ($)"
      },
      "evening": {
        "activity": "Evening leisure, entertainment, or sunset spot recommendation",
        "location": "Location name",
        "approxCost": "Estimated expenditure ($)"
      },
      "diningRecommendation": {
        "name": "Recommended authentic restaurant or culinary district matching budget",
        "cuisine": "Type of cuisine",
        "highlight": "Must-try signature dish or ambiance tip"
      },
      "localTip": "An actionable insider hack, transit tip, or etiquette advice for this specific day"
    }
  ]
}
Ensure there are exactly ${Number(days)} day objects inside the "dailyItinerary" array, numbered from 1 to ${Number(days)}.
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

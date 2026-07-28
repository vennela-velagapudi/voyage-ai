# Voyage AI – AI Powered Trip Planner

Voyage AI is an AI-powered travel planning application built for the Frontend Internship Assignment that transforms a user's travel preferences into a personalized, interactive day-by-day itinerary.

Instead of functioning as a traditional chatbot, the application prompts Gemini AI to return structured JSON data, which is rigorously validated, parsed, and rendered into interactive, stateful React components. Users can actively customize their travel plans by regenerating individual activities or entire days, rearranging schedules, deleting activities, and exploring rich location data.

---

## Features

### AI-Powered Trip Generation
- Generate personalized day-by-day travel itineraries (supported duration: 1 to 10 days).
- Guaranteed structured JSON output parsed from Google Gemini AI.
- Strict destination validation using Google Places API before initial generation.
- Intelligent trip duration rules and automated recommendations based on destination scale (countries, islands, cities, landmarks).

### Interactive Itinerary
- Expand and collapse each day in a responsive accordion layout.
- Reorder activities within a day.
- Reorder entire days across the journey.
- Remove activities with automated re-timing and intelligent schedule flow preservation.
- Regenerate individual activities using context-aware AI alternatives.
- Regenerate an entire day's schedule while maintaining consistency with the rest of the trip.

### Rich Place Information
- Detailed location overviews and photography.
- Local nearby attractions and points of interest.
- Nearby cafes, restaurants, and culinary destinations.
- Best photography spots and vantage points.
- Practical traveler tips and cultural customs.
- Direct Google Maps routing and OpenStreetMap geocoding fallback integration.

### Resilience & Error Handling (Assignment Specifics)
- Graceful handling of unpredictable model responses, malformed JSON, empty outputs, and slow API latency without application crashes.
- Automatic backend retry mechanisms and pacing guarantees for high JSON structural fidelity.
- Comprehensive request state management preventing stale or out-of-order API responses from overriding newer user requests.
- Clear user-facing error boundaries, loading animations, retry controls, and descriptive form validation.

### User Experience
- Fully responsive mobile-first layout.
- Persistent Dark and Light theme toggle with OS preference auto-detection and smooth CSS variable design transitions.
- Comprehensive loading, error, validation, and empty states.
- English-only text generation enforcement.
- Modern typography and glassmorphism styling elements.

---

# Tech Stack

## Frontend
- React (Hooks and Functional Components)
- Vite
- Tailwind CSS (Vanilla CSS variable architecture for global theme tokens)
- Framer Motion
- Lucide React (Icons)

## Backend
- Node.js
- Express.js
- Concurrently (Root cross-platform orchestration)

## AI
- Google Gemini API (gemini-2.5-flash with structured JSON prompt engineering)

## External APIs
- Google Places API (Destination validation, photography, and location enrichment)
- OpenStreetMap / Nominatim (Geocoding and mapping fallback)

---

# Project Structure

```
voyage-ai/
│
├── package.json          # Root launcher script (One-command setup)
├── package-lock.json
│
├── frontend/             # React (Vite) Application
│   ├── src/
│   │   ├── components/   # Modular form, itinerary, place, and layout components
│   │   ├── pages/        # Application views (Home, Plan, Features, Pricing, Docs)
│   │   ├── hooks/        # Custom state and animation hooks
│   │   ├── context/      # Theme and trip state providers
│   │   └── services/     # API integration layer
│   └── package.json
│
├── backend/              # Node.js / Express AI Service
│   ├── controllers/      # Route controllers and request parameter validation
│   ├── routes/           # API endpoints (/api/trips, /api/places)
│   ├── services/         # Gemini AI, destination intelligence, and place services
│   ├── middleware/       # Error handling and rate-limiting
│   ├── utils/            # Helper and JSON formatting utilities
│   └── package.json
│
└── README.md
```

---

# Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/vennela-velagapudi/voyage-ai.git
cd voyage-ai
```

## 2. Configure Environment Variables

Create a `.env` file inside the `backend` directory before starting the application:

```env
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_PLACES_API_KEY=your_google_places_api_key
PORT=5000
```

---

## 3. Quick Start (One-Command Root Setup)

This project includes a root-level launcher configured with cross-platform concurrent process execution (compatible with Windows, macOS, and Linux).

From the root project directory, run:

```bash
npm install
npm start
```

This sequence automatically:
- Installs root dependencies as well as all dependencies required inside both `/frontend` and `/backend`.
- Starts the Express backend API on port `5000` and the Vite frontend dev server on port `5173` concurrently.
- Combines and displays logs from both servers cleanly in a single terminal window.
- Terminates both server processes cleanly when pressing `Ctrl+C`.

Once started, access the application in your browser at:

```
http://localhost:5173
```

---

## Alternative: Manual Separate Startup

If you prefer to run and view logs for the frontend and backend in separate terminals, you can also run each application independently:

### Backend Startup
```bash
cd backend
npm install
npm run dev
```

### Frontend Startup
```bash
cd frontend
npm install
npm run dev
```

---

# How to Use

1. Enter your desired travel destination (validated against worldwide locations and attractions).
2. Select your trip duration (between 1 and 10 days).
3. Choose your estimated budget profile, companion type, and personalized interests or dining preferences.
4. Click **Generate Trip** to synthesize your customized structured journey.
5. Explore the interactive daily itinerary by expanding and collapsing day schedules.
6. Reorder activities within a day or rearrange the order of entire days using interactive controls.
7. Remove unwanted stops and view real-time timing and transit recalculations.
8. Click **Regenerate Activity** or **Regenerate Day** to dynamically replace schedule items via context-aware AI synthesis.
9. Click on any specific place or attraction to open an enriched overlay displaying comprehensive location intelligence, nearby spots, photo spots, and practical tips.

---

# AI Usage

This project was developed with assistance from AI tools (ChatGPT and Gemini) for:

- Brainstorming implementation architectures and modular component separation.
- Prompt engineering and JSON schema constraints for structured itinerary generation.
- Debugging edge cases and troubleshooting third-party API rate limits.
- Code optimization and refactoring for reliable rendering of unpredictable AI responses.
- UI/UX enhancement suggestions and responsive layout design.

All architectural decisions, implementation logic, debugging, verification benchmarks, and final integration were thoroughly reviewed, understood, and validated before inclusion in the codebase.

---

# Known Limitations

- AI-generated itineraries depend on the descriptive quality and realism of the user's initial inputs.
- Place enrichment data relies on third-party APIs (Google Places, OpenStreetMap) and may occasionally be incomplete or unavailable for remote landmarks.
- Google Places API free-tier quota constraints may temporarily limit high-resolution image rendering or location detail lookups.
- An active internet connection is required for all AI synthesis and geolocation calls.
- Due to generative AI temperature and probabilistic text synthesis, generated schedules may vary slightly across identical prompts.

---

# Notes (AI Service Availability)

- Voyage AI uses the Google Gemini API to generate structured travel itineraries.
- During periods of heavy external API traffic or provider maintenance, the AI service may temporarily experience elevated latency or brief unreachability.
- If itinerary generation encounters a temporary network or provider error, wait a short moment and submit again using the interactive retry controls.
- These occasional latency events are caused by upstream server load or external API quota policies and do not represent a flaw or crash within the core application architecture.
- The backend application incorporates automatic execution retries and pacing intervals to maximize success rates under standard conditions.

---

# Time Spent

Approximately **8 hours** of active design, implementation, debugging, and review.

---

# Demo

A short video demonstration accompanying this submission showcases the responsive layout, theme toggle persistence, intelligent duration validation, interactive day/activity customization, and rich place details.

---

# Acknowledgements

- Google Gemini API
- Google Places API & OpenStreetMap (Nominatim)
- React & Vite
- Tailwind CSS & Framer Motion
- Lucide React Icons & Concurrently

---

# License

This project was engineered as part of a **Frontend Internship Assignment** and is provided exclusively for technical review and evaluation purposes.

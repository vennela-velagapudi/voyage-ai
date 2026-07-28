# Voyage AI – AI Powered Trip Planner

Voyage AI is an AI-powered travel planning application that transforms a user's travel preferences into a personalized, interactive day-by-day itinerary.

Unlike a traditional chatbot, Voyage AI prompts Google Gemini AI to generate structured JSON, which is validated, parsed, and rendered into an interactive React interface. Users can customize their itineraries by regenerating activities or entire days, rearranging schedules, deleting activities, and exploring detailed destination information.

---

# Features

## AI-Powered Trip Generation

- Generate personalized day-by-day travel itineraries.
- Supports trip durations from **1 to 10 days**.
- Powered by **Google Gemini AI**.
- Structured JSON-based AI responses.
- Intelligent destination validation before itinerary generation.
- Smart trip duration recommendations based on destination type.
- English-only itinerary generation.

---

## Interactive Itinerary

- Day-wise accordion layout.
- Timeline-based itinerary view.
- Reorder activities within a day.
- Reorder entire travel days.
- Delete activities with automatic schedule adjustment.
- Regenerate individual activities.
- Regenerate an entire day while maintaining itinerary consistency.
- Interactive and stateful React UI.

---

## Rich Place Information

Each destination includes:

- Place overview
- Photos
- Nearby attractions
- Nearby restaurants
- Nearby cafés
- Best photography spots
- Traveler tips
- Google Maps navigation
- OpenStreetMap fallback

---

## User Experience

- Mobile-first responsive design.
- Dark and Light mode.
- Theme preference persistence.
- Smooth animations.
- Loading states.
- Empty states.
- Error states.
- Retry generation support.
- Form validation.
- Modern glassmorphism UI.

---

## Robust AI & Error Handling

The application safely handles unreliable AI responses and external API failures.

Implemented safeguards include:

- Malformed JSON validation
- Empty response handling
- Invalid response schema validation
- Retry mechanism for temporary AI failures
- Graceful error messages
- Loading indicators
- Request cancellation
- Prevention of stale responses overwriting newer requests
- Backend validation before AI execution

---

## Performance Optimizations

- Request caching to reduce unnecessary API calls.
- Optimized React rendering.
- Responsive layouts across all devices.
- API requests routed through the backend to protect secret keys.

---

# Tech Stack

## Frontend

- React
- Functional Components
- React Hooks
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Backend

- Node.js
- Express.js

## AI

- Google Gemini API

## External APIs

- Google Places API
- OpenStreetMap (Nominatim)

---

# Project Structure

```text
voyage-ai/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.jsx
│   ├── public/
│   └── package.json
│
├── package.json
└── README.md
```

---

# Installation

## Clone the Repository

```bash
git clone https://github.com/<your-username>/voyage-ai.git
cd voyage-ai
```

---

## Install Dependencies

```bash
npm install
```

The root installer automatically installs dependencies for:

- Root
- Frontend
- Backend

---

# Environment Variables

Create a `.env` file inside the **backend** directory.

```env
PORT=5000

GEMINI_API_KEY=YOUR_GEMINI_API_KEY

GOOGLE_PLACES_API_KEY=YOUR_GOOGLE_PLACES_API_KEY
```

---

# Running the Project

Run both frontend and backend simultaneously.

```bash
npm start
```

This starts:

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

You may also run them separately.

Backend

```bash
cd backend
npm run dev
```

Frontend

```bash
cd frontend
npm run dev
```

---

# AI Usage Note

Voyage AI uses **Google Gemini AI** as its Large Language Model (LLM).

Instead of displaying conversational responses, the backend prompts Gemini to generate structured JSON itineraries. Every AI response is validated before being rendered in the frontend.

The application also integrates **Google Places API** and **OpenStreetMap** to enrich itineraries with verified location information, nearby attractions, restaurants, cafés, and navigation support.

---

# Handling AI Failures

The application has been designed to safely handle unpredictable AI behavior.

It includes:

- Structured JSON validation
- Malformed response handling
- Empty response handling
- Retry generation option
- Backend validation
- Graceful error messages
- Loading states
- Protection against stale API responses
- Safe rendering without application crashes

---

# Mobile Responsiveness

Voyage AI is fully responsive and optimized for:

- Mobile phones
- Tablets
- Laptops
- Desktop devices

Responsive features include:

- Mobile-first layouts
- Touch-friendly controls
- Responsive navigation
- Responsive itinerary timeline
- Adaptive drawers and modals
- Dark and Light themes across all screen sizes

---

# Theme Support

The application supports:

- Dark Mode (default)
- Light Mode
- Automatic OS preference detection
- Persistent theme preference using Local Storage
- Smooth theme transitions

---

# Known Limitations

- AI itinerary generation depends on Google Gemini service availability.
- During periods of high demand, AI requests may be delayed or temporarily unavailable. If this occurs, wait a few minutes and try again.
- Google Places information depends on third-party API availability and quota limits.
- Some locations may have incomplete information, such as photos, opening hours, or descriptions.
- AI-generated recommendations should be treated as suggestions and verified before travel.

---


# Future Improvements

Potential future enhancements include:

- User authentication
- Saved itineraries
- Trip sharing
- PDF export
- Flight recommendations
- Hotel recommendations
- Weather integration
- Offline itinerary support
- Multi-language support
- Collaborative trip planning

---

# Author

**Vennela Sushma Chowdary Velagapudi**

B.Tech Student  
SRM University-AP

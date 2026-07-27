# Voyage AI – AI Powered Trip Planner

Voyage AI is an AI-powered travel planning application that transforms a user's travel preferences into a personalized, interactive day-by-day itinerary.

Instead of functioning as a chatbot, the application prompts Gemini AI to return **structured JSON**, which is parsed and rendered into dynamic React components. Users can customize their itinerary by regenerating activities, rearranging plans, deleting stops, and exploring detailed place information.

---

## Features

### AI-Powered Trip Generation
- Generate personalized day-by-day travel itineraries
- Structured JSON output from Gemini AI
- Intelligent destination validation
- Smart trip duration recommendations

### Interactive Itinerary
- Expand and collapse each day
- Reorder activities
- Reorder entire days
- Remove activities
- Regenerate individual activities using AI
- Regenerate an entire day while preserving the rest of the itinerary

### Rich Place Information
- Detailed location overview
- Nearby attractions
- Nearby cafés and restaurants
- Best photo spots
- Traveler tips
- Google Maps integration

### User Experience
- Fully responsive mobile-first design
- Dark / Light theme toggle
- Loading, error, and empty states
- English-only output enforcement
- Graceful handling of AI failures
- Prevention of stale API responses
- Smooth animations and modern UI

---

# Tech Stack

## Frontend
- React
- Vite
- Tailwind CSS
- Framer Motion

## Backend
- Node.js
- Express.js

## AI
- Google Gemini API

## External APIs
- Google Places API
- OpenStreetMap (Fallback)

---

# Project Structure

```
voyage-ai/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── context/
│   └── services/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   └── utils/
│
└── README.md
```

---

# Getting Started

## 1. Clone the Repository

```bash
git clone <repository-url>
cd voyage-ai
```

---

## 2. Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file inside the **backend** directory.

```env
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_PLACES_API_KEY=your_google_places_api_key
```

---

## 4. Run the Backend

```bash
cd backend
npm run dev
```

---

## 5. Run the Frontend

```bash
cd frontend
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

# How to Use

1. Enter your travel destination.
2. Select the trip duration.
3. Choose your travel preferences and interests.
4. Click **Generate Trip**.
5. Explore the generated itinerary.
6. Expand each day to view activities.
7. Reorder or remove activities.
8. Regenerate an activity or an entire day using AI.
9. Open place details to view its complete details.

---

# AI Usage

This project was developed with assistance from AI tools (ChatGPT and Gemini) for:

- Brainstorming implementation ideas
- Prompt engineering for structured JSON generation
- Debugging and troubleshooting
- Code explanations and optimization
- UI/UX improvement suggestions

All architectural decisions, implementation, debugging, testing, and final integration were reviewed, understood, and validated before being included in the project.

---

# Known Limitations

- AI-generated itineraries depend on the quality of the user's input.
- Place information depends on third-party APIs and may occasionally be incomplete or unavailable.
- Google Places API quota limits may temporarily reduce location enrichment.
- An active internet connection is required.
- AI responses may vary for identical prompts.

---

# Time Spent

Approximately **8 hours** of active development.

---

# Demo

A short screen recording demonstrating the application's functionality accompanies this submission.

---

# Acknowledgements

- Google Gemini API
- Google Places API
- OpenStreetMap
- React
- Tailwind CSS
- Framer Motion

---

# License

This project was developed as part of a **Frontend Internship Assignment** and is intended for evaluation purposes only.

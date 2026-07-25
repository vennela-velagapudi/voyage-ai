# Voyage AI

Voyage AI is a production-ready web application project template structured for modularity and scalability. It features a React frontend powered by Vite and styled with TailwindCSS v4.0, coupled with a Node.js Express backend.

## Project Structure

```text
voyage-ai/
├── frontend/               # React Frontend (Vite)
│   ├── src/
│   │   ├── assets/         # Images, fonts, and other static assets
│   │   ├── components/     # Reusable UI components
│   │   ├── constants/      # Global constants, action types, config parameters
│   │   ├── context/        # React Context providers for state management
│   │   ├── hooks/          # Custom React hooks
│   │   ├── layouts/        # Layout components (e.g. BaseLayout)
│   │   ├── lib/            # Third-party configurations (e.g. API client setup)
│   │   ├── pages/          # Page views (e.g. Home)
│   │   ├── services/       # API call definitions/logic
│   │   ├── styles/         # CSS and global stylesheet configurations
│   │   └── utils/          # Helper and utility functions
│   ├── eslint.config.js    # ESLint configuration
│   ├── vite.config.js      # Vite and Tailwind CSS integration config
│   └── package.json
│
└── backend/                # Node.js + Express Backend
    ├── config/             # Server/DB settings, credentials, env configurations
    ├── controllers/        # Route handlers and controller functions
    ├── middleware/         # Express custom middlewares (auth, logger, errors)
    ├── routes/             # Express API endpoints
    ├── services/           # Business logic layer
    ├── utils/              # Server-side utility scripts and helpers
    ├── server.js           # Express application entry point
    ├── eslint.config.js    # ESLint configuration
    └── package.json
```

## Setup Instructions

### Frontend Setup

1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   Copy `.env.example` to `.env` and fill in your variables.
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Format and Lint code:
   ```bash
   npm run lint
   npm run format
   ```

### Backend Setup

1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   Copy `.env.example` to `.env` and configure server properties.
4. Start the development server (runs with hot reloading using nodemon):
   ```bash
   npm run dev
   ```
5. Run the server in production mode:
   ```bash
   npm start
   ```
6. Format and Lint code:
   ```bash
   npm run lint
   npm run format
   ```

## Technology Stack

- **Frontend**: React (Vite), React Router (routing), TailwindCSS v4.0 (styling), Axios (API requests), Lucide React (icons), Framer Motion (animations), ESLint, and Prettier.
- **Backend**: Node.js, Express (REST API), CORS, Dotenv, Nodemon, ESLint, and Prettier.

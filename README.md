# Digg Landing Page - React Implementation

This project is a React implementation of the Digg landing page, featuring a dynamic counter with modern UI effects.

## Features

- Interactive DiggCounter component with digit animation
- Aceternity UI-inspired gradient background effect that follows cursor movement
- Responsive email signup form with validation
- Mobile-friendly design

## Project Structure

```
reboot.digg.com/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── CTA.png
├── src/
│   ├── components/
│   │   ├── DiggCounter.jsx
│   │   ├── EmailSignup.jsx
│   │   ├── GradientBackground.jsx
│   │   └── Logo.jsx
│   ├── App.jsx
│   ├── index.jsx
│   └── styles.css
├── package.json
└── README.md
```

## Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Getting Started

1. Clone the repository
2. Install dependencies
3. Run the development server

## Installation

```bash
# Clone the repository (if using git)
git clone <repository-url>

# Navigate to the project directory
cd reboot.digg.com

# Install dependencies
npm install
```

## Running the App

```bash
# Start the development server
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Build for Production

```bash
# Create a production build
npm run build
```

## Notes

- Make sure to place the CTA.png image in the public directory
- The app uses the Geist font loaded from a CDN
- The API endpoints are preserved from the original implementation

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Next.js 15** website for a Greyhound Sanctuary - a platform for retired racing greyhound adoption and education. The site features an AI-powered chatbot, animated components, and a multi-page architecture built with TypeScript and Tailwind CSS v4.

## Development Commands

```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server (uses $PORT env var for Heroku)
npm start

# Run ESLint
npm run lint
```

## Architecture

### Pages & Routing
Uses Next.js 15 App Router with the following structure:
- `/` - Landing page (tribute gallery)
- `/home` - Main sanctuary landing
- `/about` - Greyhound breed information
- `/foster-adopt` - Adoption/fostering details

Each page has its own `layout.tsx` and `page.tsx` in `src/app/`.

### Component Organization
- `src/components/layout/` - Shared layout components (Navbar)
- `src/components/ui/` - Feature-specific UI components (AIChat, FosterAdopt, etc.)

### Key Components

**AIChat** (`src/components/ui/AIChat.tsx`)
- Floating chat widget using Together AI API (Llama-3-70b model)
- Client-side component with React Markdown for response formatting
- Requires `TOGETHER_API_KEY` environment variable

**RunningGreyhound** (`src/components/ui/RunningGreyhound.tsx`)
- Animated SVG component with custom CSS animations defined in `globals.css`

**Aurora Background** (`src/components/ui/aurora-background.tsx`)
- Animated gradient background effect

### API Routes
Single API endpoint at `/api/chat` that:
- Accepts message arrays with role/content structure
- Calls Together AI API with system prompt for greyhound context
- Returns markdown-formatted responses

## Styling & Design

### Tailwind CSS v4
Uses `@import "tailwindcss"` with inline theme customization in `globals.css`.

### Color System
- Monochromatic grayscale palette with CSS variables
- No dark mode (removed for iOS Safari compatibility)
- High-contrast text for readability, especially on mobile

### Custom Animations
Defined in `globals.css`:
- `.animate-aurora` - Background gradient animation
- `.animate-run`, `.animate-body`, `.animate-head`, `.animate-ear`, `.animate-tail`, `.animate-leg` - Running greyhound SVG animations

### Typography
- Uses Inter font via `next/font/google`
- Custom `.chat-title` class for chat widget headers
- Weight adjustments for `.text-sm` readability

## Deployment

**Heroku**: Configured via `Procfile` with Node.js 18.x (specified in package.json `engines`)

The production server uses `$PORT` environment variable for binding.

## Important Constraints

1. **No Dark Mode**: All dark mode code has been removed to ensure iOS Safari compatibility
2. **Environment Variables**: `TOGETHER_API_KEY` is required for AI chat functionality
3. **Mobile Safari Priority**: Text contrast and styling prioritize iOS Safari rendering
4. **Path Aliases**: `@/*` maps to `./src/*` (configured in tsconfig.json)

## Code Patterns

### Client Components
Components using hooks (useState, useEffect) are marked with `'use client'` directive at the top.

### Styling Utilities
Uses `cn()` function from `@/lib/utils` for conditional className merging with clsx and tailwind-merge.

### TypeScript
Strict mode enabled. Interfaces are defined for API request/response shapes (see `/api/chat/route.ts`).

## Configuration Files

- `next.config.ts` - ESLint warnings ignored during builds, SWC minification enabled
- `tailwind.config.js` - Content path: `./src/**/*.{js,ts,jsx,tsx}`, typography plugin enabled
- `tsconfig.json` - Path alias `@/*` → `./src/*`, strict mode, target ES2017

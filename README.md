# Ziyan Nifail — Portfolio

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Photo Setup

Place your photo at:
```
public/ziyan.jpg
```

The Hero section will automatically display it.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          ← Root layout + metadata
│   └── page.tsx            ← Assembles all sections
├── components/
│   └── sections/
│       ├── Hero.tsx         ← Hero section with stats + photo
│       ├── Projects.tsx     ← Project cards (BreatheEasy, FitStrength, AI Evaluator)
│       ├── Experience.tsx   ← Timeline (CodeRangers, FWD, etc.)
│       └── Contact.tsx      ← Contact links + footer
└── styles/
    └── globals.css          ← Colors, fonts, global animations

public/
└── ziyan.jpg               ← Your photo (add this manually)
```

## Color Palette

| Name         | Hex       | Usage                   |
|--------------|-----------|-------------------------|
| Molten Lava  | `#780000` | Hover states            |
| Brick Red    | `#c1121f` | Accents, CTAs, headings |
| Papaya Whip  | `#fdf0d5` | Primary text            |
| Deep Space   | `#003049` | Background              |
| Steel Blue   | `#669bbc` | Secondary text, tags    |

## Build for production

```bash
npm run build
npm run start
```

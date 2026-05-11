# Plokitch

A three-sided marketplace connecting home food vendors, couriers, and customers in Gombe, Nigeria. We're on a mission to help local home vendors increase their daily sales through demand generation and delivery coordination.

## Current Status: Phase 1 - Live

We're currently in Phase 1 of our execution plan, focusing on manual demand generation through WhatsApp-based promotion and order coordination.

- **Target**: 2-3 vendors onboarded, 10-20 orders in 5 days
- **Location**: Gombe, Nigeria
- **Approach**: Manual execution first, app later

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: Radix UI + shadcn/ui
- **Styling**: TailwindCSS
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Testing**: Vitest + Testing Library
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd plotkitch-web

# Install dependencies
npm install
# or
bun install
```

### Development

```bash
# Start development server
npm run dev
# or
bun dev

# Run tests
npm run test

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
  components/          # Reusable UI components
  lib/                # Utility functions and configurations
  sections/           # Landing page sections
  types/              # TypeScript type definitions
```

## Landing Page Sections

The landing page includes the following sections:

- **Navigation**: Plokitch branding with proper navigation links
- **Hero**: Demand generation angle with 3-sided market introduction
- **How It Works**: 5-step manual execution process
- **For Vendors**: 6 vendor perks with 20% commission model
- **About**: Pivot rationale and strategy
- **Accountability**: Order flow, fault handling, escrow model
- **Roadmap**: 4-phase plan with Phase 1 marked as live
- **Revenue Model**: Current vs future revenue streams
- **Vendor CTA**: WhatsApp-integrated signup form

## Business Model

### Current (Phase 1)
- 20% commission per order
- Charged after vendor profit
- No charge until vendor is earning

### Future (Phases 3-4)
- Vendor subscription model
- Restaurant SaaS (smart menu)
- Loyalty wallet program

## Team

- **Abdulmumini Muhammad Bello**: Vendor acquisition & operations
- **Muhammad Adam Aliyu**: Demand creation & tech preparation
- **Nasir Ibrahim Imam**: Customer outreach & order handling
- **Dalhatu Usman Aliyu**: Operations support & QA

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and confidential.

## Contact

For vendor partnerships or customer inquiries, reach out via WhatsApp at [your business number].

---

*Plokitch - Building local food delivery ecosystems, one vendor at a time.*

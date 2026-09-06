# SYNRA STUDIOS

### Synergy. Strategy. Results.

> A digital growth studio helping businesses build, grow, and scale their presence online to make a reasonable Profit .

---

## About

**SYNRA Studios** is a digital agency focused on helping businesses establish and grow their digital presence.

We combine **technology, strategy, design, SEO, digital marketing, social media, and automation** to create digital systems that don't just look good, they work.

From launching a new business website to improving search visibility and managing digital growth, SYNRA Studios works as a long-term digital partner for businesses.

---

## What We Do

Our services are organized around four core areas.

### BUILD
- Custom Websites
- Business Websites
- Landing Pages
- E-Commerce Websites
- Brand Identity
- Digital Experiences

### GROW
- Search Engine Optimization
- Local SEO
- Google Business Profile Optimization
- Instagram Growth
- LinkedIn Growth
- Content Strategy
- Analytics & Performance Tracking

### MANAGE
- Website Maintenance
- SEO Management
- Social Media Management
- Content Management
- Digital Presence Management

### AUTOMATE
- AI Automation
- AI Agents
- Business Workflow Automation
- Custom Integrations
- API & Tool Integrations

---

## Website

The SYNRA Studios website is designed as a premium digital experience representing the agency's philosophy:

> **Synergy. Strategy. Results.**

The website focuses on:

- Premium visual design
- Immersive backgrounds
- Glassmorphism
- Smooth transitions
- Scroll-based interactions
- Interactive hover states
- Responsive layouts
- High-quality typography
- Conversion-focused CTAs

The goal is to keep the experience **simple, premium, memorable, and functional** rather than overloaded with unnecessary UI.

---

## Website Structure

The primary website experience follows:

```
Work
  ↓
About
  ↓
Services
  ↓
Insights
  ↓
Contact
```

The website also includes a prominent:

> **START A PROJECT ↗**

CTA throughout the experience.

---

## Start a Project

The **Start a Project** experience is the primary lead-generation system of the website.

Instead of using a basic contact form, SYNRA uses a multi-step project inquiry experience.

The inquiry collects:

### About You
- Full Name
- Email
- Phone / WhatsApp
- Company / Business Name
- Website

### Your Business
- Business description
- Industry
- Business type

### What You Need

Users can select multiple services from:

- Website
- E-Commerce
- Landing Page
- Branding
- SEO
- Local SEO
- Google Business
- Instagram
- LinkedIn
- Content
- Analytics
- Website Maintenance
- Social Media Management
- Content Management
- AI Automation
- AI Agents
- Business Workflows
- Custom Integrations

### Project Details
- Project description
- Goals
- Expected start timeline
- Budget *(optional, approximate)*

### Contact Preference

Users can select:

- Email
- WhatsApp
- Phone Call

---

## Lead Management

Project inquiries are intended to be delivered to the official SYNRA Studios business email:

**Email:** `info.synrastudios@gmail.com`

The frontend submission layer is structured so that the system can later be connected to:

- Email services
- Backend APIs
- Databases
- CRM systems
- WhatsApp notifications
- Internal notifications
- Lead management systems

> No sensitive credentials should be committed to the repository. Use environment variables for production configuration.

---

## Brand Identity

### Name

**SYNRA STUDIOS**

### Philosophy

**Synergy. Strategy. Results.**

The brand represents the combination of:

```
People + Technology + Strategy + Creativity = Digital Growth
```

### Visual Direction

The visual identity combines a warm editorial-inspired palette with modern digital interfaces.

### Primary Colors

| Color | Hex |
|---|---|
| Albescent White | `#F7E9DE` |
| Peach Fuzz | `#FFBE98` |
| Blue Coal | `#515559` |
| Spanish Pink | `#F0BBB4` |
| Terra Cotta | `#EA785B` |
| Deep Blue Coal | `#2A2D30` |
| Warm Surface | `#FFF7F2` |
| White | `#FFFFFF` |

The palette should be used intentionally throughout the interface rather than being displayed as a separate design-system section on the website.

### Design Principles

The website follows a few important principles.

**Minimal**
Every element should have a purpose.

**Premium**
Typography, spacing, animation, and interaction should feel carefully crafted.

**Interactive**
Hover states, scroll interactions, glass surfaces, and transitions should make the website feel alive.

**Simple**
Animations should enhance the experience rather than distract from the content.

**Conversion Focused**
The website ultimately exists to turn visitors into conversations and projects.

---

## Team

| Name | Role | Focus |
|---|---|---|
| Sadhna Mishra | Founder | — |
| Sushil Mishra | Founder | — |
| Harshit Mishra | Founder | Vision & Business Strategy |
| Khush Paliwal | Co-Founder | Operations & Growth |
| Vatsal Telang | CEO | Business Development & Client Relations |
| Girish Patil | Technical Lead | Technology & Development |
| Prathamesh Chaumwal | Creative Lead | Creative Direction & Digital Experience |

---

## Technology Stack

The website is built using a modern frontend stack.

- React
- TypeScript
- Vite
- Tailwind CSS

Additional libraries may be used where required for:

- Animations
- Icons
- Forms
- Smooth scrolling
- Interactive effects
- UI components

The project intentionally avoids unnecessary backend complexity at the current stage.

---

## Project Architecture

A simplified architecture:

```
SYNRA STUDIOS
│
├── Website
│   ├── Work
│   ├── About
│   ├── Services
│   ├── Insights
│   └── Contact
│
├── Lead Generation
│   └── Start a Project
│
├── Frontend
│   ├── React
│   ├── TypeScript
│   ├── Tailwind CSS
│   └── Vite
│
└── Future Infrastructure
    ├── API
    ├── Email
    ├── CRM
    ├── Database
    └── Automation
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
```

### 2. Navigate Into the Project

```bash
cd synra-studios
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

The Vite development server will provide the local URL.

### Production Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Development Workflow

Before making changes:

```bash
git pull origin main
```

Create a feature branch:

```bash
git checkout -b feature/your-feature
```

After making changes:

```bash
git add .
git commit -m "Describe your changes"
git push origin feature/your-feature
```

Then create a Pull Request.

---

## Environment Variables

**Never commit:**

- API keys
- Email credentials
- Database credentials
- Authentication tokens
- Private keys
- Production secrets

Use a local environment file:

```
.env
```

Example:

```env
VITE_API_URL=
VITE_CONTACT_ENDPOINT=
```

Only expose variables prefixed with `VITE_` when they are safe to be available to the frontend.

---

## Responsive Experience

The website is designed for:

- Desktop
- Laptop
- Tablet
- Mobile

Mobile is treated as a separate experience rather than simply scaling down the desktop layout.

Special attention should be given to:

- Touch targets
- Typography
- Navigation
- Forms
- Animation performance
- Horizontal overflow
- Background effects

---

## Future Roadmap

The current website is the foundation for the SYNRA digital ecosystem.

Potential future additions include:

**Lead Management**
- Automated email notifications
- CRM integration
- Lead dashboard
- WhatsApp notifications
- Lead status tracking

**Website**
- Dynamic case studies
- CMS-powered Insights
- Client testimonials
- Advanced SEO
- Performance analytics

**Client Experience**
- Client portal
- Project tracking
- Reporting dashboards
- SEO performance reports
- Social media performance reports

**Automation**
- AI-powered lead qualification
- Automated follow-ups
- AI business assistants
- Workflow automation
- Custom business integrations

---

## Contact

**SYNRA STUDIOS**

*Synergy. Strategy. Results.*

**Instagram:** [@synrastudios](https://www.instagram.com/synrastudios?igsi=MXQ2OW9vYzRqbWptMw==)
**Email:** info.synrastudios@gmail.com

---

## License

This project is proprietary software belonging to SYNRA Studios.

Unauthorized copying, redistribution, or commercial reuse of the website, branding, design, or source code is not permitted without explicit permission.

---

<div align="center">

**SYNRA STUDIOS**
*Build. Grow. Manage. Automate.*

Synergy. Strategy. Results.

</div>

import { Project } from '@/types/project'

export const projects: Project[] = [
  {
    slug: 'hireos',
    title: 'HireOS',
    subtitle: 'AI Resume Intelligence Platform — LIVE',
    tags: ['LangGraph', 'Python', 'FastAPI', 'Gemini 2.0 Flash', 'Razorpay'],
    period: 'Apr 2026 – Present',
    liveUrl: 'https://hire-os-langgraph.vercel.app',
    repoUrl: 'https://github.com/DEVsaurabhgaur/HireOS_Langgraph',
    description:
      'AI resume intelligence platform built with LangGraph + Gemini 2.0 Flash — rewrites resumes with exact ATS keywords from job descriptions. Free tier + Rs 199 premium AI rewriter.',
    longDescription: `
## Overview

HireOS is a production AI resume intelligence platform that goes beyond scoring — it actively rewrites resumes with exact ATS keywords extracted from job descriptions. Built with LangGraph multi-agent orchestration and Google Gemini 2.0 Flash.

## Features

**Free Tier:**
- Resume score vs job description
- Strengths & gaps analysis
- Interview question generation
- Practice mode
- Candidate ranking (up to 10 resumes)

**Premium (Rs 199 one-time via Razorpay):**
- AI resume rewriter with exact ATS keyword injection
- ATS keyword extraction engine
- Cover letter opening generator

## Architecture

LangGraph orchestrates a multi-node agent pipeline:
1. **Extraction Agent** — Parses job description for required skills, keywords, and role requirements
2. **Analysis Agent** — Compares resume against extracted requirements, scores alignment
3. **Rewrite Agent** — Produces an ATS-optimised resume rewrite with keyword injection

Razorpay handles UPI/card payments. Python FastAPI backend with Vercel deployment.
    `.trim(),
    highlights: [
      'LangGraph multi-agent orchestration with Gemini 2.0 Flash',
      'ATS keyword extraction + resume rewriter in premium tier',
      'Razorpay UPI/card payment integration for Rs 199 unlock',
      'Candidate batch ranking — compare up to 10 resumes',
    ],
    thumbnail: '/images/projects/hireos.jpg',
  },
  {
    slug: 'kundali-ai',
    title: 'KundaliAI',
    subtitle: 'Vedic Astrology Web App with Real Planetary Geometry',
    tags: ['TanStack Start', 'TypeScript', 'Gemini AI', 'Supabase', 'Framer Motion'],
    period: '2025 – Present',
    repoUrl: 'https://github.com/DEVsaurabhgaur/KundaliAI',
    description:
      'Vedic astrology web app that computes real planetary geometry then uses Gemini 1.5 Flash for personalized readings. Features animated cosmic UI, Supabase-backed saved Kundalis with RLS, and PDF export.',
    longDescription: `
## Overview

KundaliAI is a full-stack Vedic astrology web app that combines real astronomical computation with AI-generated personalized readings. It computes actual planetary positions using birth date, time, and location — then feeds the chart data to Gemini 1.5 Flash for in-depth personality, career, love, and health readings.

## Technical Stack

- **Framework:** TanStack Start with Vite (TypeScript)
- **Styling:** Tailwind CSS + Framer Motion for cosmic animations
- **AI:** Google Gemini 1.5 Flash
- **Database:** Supabase with Row Level Security
- **Validation:** Zod type-safe schemas
- **Export:** Instant PDF export of Kundali charts

## Key Features

- Real planetary geometry computation (geocoordinate-based)
- Animated cosmic UI with constellation effects
- Supabase-backed persistent saved Kundalis per user
- Personalized AI readings: personality, career, love, health
- Type-safe routing with TanStack Router
- PDF export with chart + interpretations
    `.trim(),
    highlights: [
      'Real planetary geometry computation using birth coordinates',
      'Gemini 1.5 Flash for personality/career/love/health readings',
      'Supabase RLS-protected saved Kundalis per user',
      'Animated cosmic UI with Framer Motion + instant PDF export',
    ],
    thumbnail: '/images/projects/kundali.jpg',
  },
  {
    slug: 'laptop-pulse',
    title: 'LaptopPulse',
    subtitle: 'Windows Hardware Health Monitor — BETA',
    tags: ['Python', 'Flask', 'React', 'TypeScript', 'AI Health Reports'],
    period: '2025 – Present',
    repoUrl: 'https://github.com/DEVsaurabhgaur/LaptopPulse',
    description:
      'Windows background daemon for laptop hardware health monitoring. <0.3% CPU usage, trend-based anomaly detection with 30–60 day early warning, AI-generated plain-English health reports. 100% local, zero telemetry.',
    longDescription: `
## Overview

LaptopPulse is a lightweight Windows background service that monitors laptop hardware health in real time and provides AI-generated plain-English diagnostics. Built for users who want proactive failure warnings without cloud dependency.

## Architecture

- **Daemon:** Python background service monitoring CPU temp, battery wear, disk health, RAM usage
- **Analytics:** Trend-based anomaly detection (rolling window + z-score) calibrated for 30–60 day early warning
- **AI Reports:** Gemini/Claude generates plain-English health summaries from raw telemetry data
- **Dashboard:** React + TypeScript local web dashboard served by Flask
- **Privacy:** 100% local processing, zero telemetry, zero cloud calls (except optional AI report generation)

## Performance

- < 0.3% CPU usage while running in background
- Battery wear trend analysis with projected replacement date
- Disk health scoring with failure probability estimate
- Thermal throttling detection and early warning alerts
    `.trim(),
    highlights: [
      '<0.3% CPU usage as a background Windows daemon',
      'Trend-based anomaly detection: 30–60 day early warning',
      'AI-generated plain-English health reports (Gemini/Claude)',
      '100% local — zero telemetry, zero cloud dependency',
    ],
    thumbnail: '/images/projects/laptoppulse.jpg',
  },
  {
    slug: 'openclaw-atlas',
    title: 'OpenClaw Atlas',
    subtitle: 'Multi-Server LLM Agent Evaluation Framework',
    tags: ['LLM Evaluation', 'Agentic AI', 'Frontier Models', 'Python'],
    period: 'Apr 2026 – Present',
    company: 'Outlier.ai',
    description:
      'End-to-end agent evaluation architecture spanning six synthetic data servers, designed to benchmark frontier AI models on multi-source reasoning and instruction-following tasks.',
    longDescription: `
## Overview

OpenClaw Atlas is a comprehensive evaluation framework built at Outlier.ai to benchmark frontier AI models on agentic, multi-server reasoning tasks. The system exposes LLMs to deliberately contradictory information spread across six synthetic data servers — mimicking real-world knowledge fragmentation — and measures how well each model synthesises, reconciles, and reasons across those sources.

## Architecture

The framework consists of three layers:

1. **Synthetic Data Layer** — Six independently curated datasets across logistics and healthcare domains, each containing 12-field Story Drafts with deliberate cross-server contradictions injected at known positions.
2. **Evaluation Harness** — A Python orchestration layer that feeds identical prompt sets to four frontier AI models, isolating model capability from prompt variance.
3. **Failure Taxonomy** — A structured rubric for categorising model failures: instruction-following gaps, hallucination under ambiguity, safety enforcement edge-cases, coherence breakdowns, and context-persistence failures.

## Key Outcomes

The framework produced a reusable evaluation benchmark applicable to future model releases, and surfaced model-specific failure modes that informed annotation guidelines for subsequent RLHF batches.
    `.trim(),
    highlights: [
      'Designed 12-field Story Drafts across logistics and healthcare domains',
      'Engineered 6 synthetic datasets with deliberate cross-server contradictions',
      'Benchmarked 4 frontier AI models with identical prompt sets',
      'Developed structured failure taxonomy frameworks per model',
    ],
    thumbnail: '/images/projects/openclaw.jpg',
  },
  {
    slug: 'frontier-benchmarking',
    title: 'Frontier Model Benchmarking',
    subtitle: 'Cross-Model Comparative Analysis',
    tags: ['LLM Evaluation', 'Benchmarking', 'RLHF', 'Research'],
    period: '2025 – 2026',
    description:
      'Controlled evaluation of 4 frontier LLMs across 5 scoring dimensions — instruction following, multi-source synthesis, safety enforcement, coherence, and persistence.',
    longDescription: `
## Overview

A rigorous, reproducible benchmarking study comparing four frontier large language models across five capability dimensions. The study was designed to eliminate prompt-level variance as a confounding factor — all models received identical prompt sets — so that differences in output quality could be attributed to model capability alone.

## Methodology

**Five Scoring Dimensions:**
- **Instruction Following** — Adherence to explicit constraints in multi-step prompts
- **Multi-Source Synthesis** — Ability to reconcile conflicting information from multiple context sources
- **Safety Enforcement** — Consistent refusal of harmful or out-of-scope requests across varied phrasings
- **Coherence** — Logical and narrative consistency across long outputs
- **Persistence** — Retention of task constraints across extended multi-turn conversations

**Evaluation Protocol:**
Each model was evaluated on 50+ prompts per dimension, scored on a structured rubric by trained annotators. Results were aggregated into per-model capability profiles with variance analysis.

## Impact

The resulting evaluation framework was adopted as a template for subsequent benchmarking rounds, and the per-dimension profiles directly informed annotator training materials.
    `.trim(),
    highlights: [
      'Identical prompt sets eliminating prompt-level variance',
      '5-dimension scoring: instruction following, multi-source synthesis, safety enforcement, coherence, persistence',
      'Reusable evaluation framework for future model releases',
    ],
    thumbnail: '/images/projects/benchmarking.jpg',
  },
  {
    slug: 'saurabhgaur-world',
    title: 'saurabhgaur.world',
    subtitle: 'Full-Stack Portfolio & AI Art Storefront',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Razorpay'],
    period: '2025 – Present',
    liveUrl: 'https://saurabhgaur.world',
    description:
      'Full-stack portfolio and AI art commerce platform built on Next.js 14, Supabase, and Razorpay — with UPI payments, signed download URLs, and an admin dashboard.',
    longDescription: `
## Overview

This site itself — a dual-purpose platform that serves as a professional portfolio for AI/ML engineering work and a commerce storefront for AI-generated digital art. Built with a zero-cost infrastructure stack targeting <2s page loads.

## Technical Stack

- **Framework:** Next.js 14 (App Router, TypeScript, React Server Components)
- **Database + Auth + Storage:** Supabase (PostgreSQL, Row Level Security, Magic Link auth, Storage buckets)
- **Payments:** Razorpay (UPI, cards, net banking — mandatory for Indian buyers)
- **Email:** Resend (transactional fulfillment emails with download links)
- **Deployment:** Vercel (zero-config, auto-deploy from GitHub)

## Commerce Architecture

The purchase flow uses Razorpay's HMAC-signed order verification to ensure payment integrity. Post-payment fulfillment generates time-limited download tokens (72-hour expiry) stored in Supabase, which map to signed Supabase Storage URLs valid for 1 hour per download.

## Admin System

A protected \`/admin\` dashboard allows direct product management: upload art files and thumbnails to Supabase Storage, set prices, manage published state, and view order history.
    `.trim(),
    highlights: [
      'UPI payment integration via Razorpay with HMAC signature verification',
      'Email OTP authentication via Supabase Auth (no passwords)',
      'Time-limited signed download URLs — 72hr token + 1hr Supabase signed URL',
      'Admin dashboard for product management and order tracking',
    ],
    thumbnail: '/images/projects/portfolio.jpg',
  },
]

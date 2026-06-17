import { Project } from '@/types/project'

export const projects: Project[] = [
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
    period: '2026',
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
    slug: 'ai-prompt-pipeline',
    title: 'AI Prompt Engineering Pipeline',
    subtitle: 'Annotated Image Dataset — 200+ Pieces',
    tags: ['Stable Diffusion', 'Midjourney', 'Prompt Engineering', 'RLHF'],
    period: '2024 – Present',
    description:
      '200+ item annotated AI image dataset with structured prompt metadata, category taxonomy, and quality rubrics — directly applicable to RLHF multimodal annotation pipelines.',
    longDescription: `
## Overview

A systematically curated dataset of 200+ AI-generated images produced using Stable Diffusion and Midjourney, with each piece annotated with structured prompt metadata. The dataset was built as both a personal art practice and a professional asset — the annotation schema mirrors production RLHF multimodal pipelines.

## Dataset Structure

Each entry contains:
- **Prompt** — Full generation prompt with parameter annotations
- **Negative Prompt** — Exclusion terms and their rationale
- **Model Version** — Specific checkpoint or Midjourney version used
- **Category** — Taxonomy: Portrait / Cyberpunk / Anime / Abstract / Landscape / Conceptual
- **Quality Score** — 1–5 rating against a defined rubric (composition, coherence, prompt adherence)
- **Generation Notes** — Iterative refinement history

## Relevance to RLHF

The annotation schema was designed to be directly importable into multimodal RLHF workflows. Quality rubrics align with standard human preference criteria used in frontier model fine-tuning.
    `.trim(),
    highlights: [
      'Structured prompt metadata, category taxonomy, quality criteria',
      'Reproducible workflow with evaluation rubrics',
      'Directly applicable to RLHF multimodal annotation pipelines',
    ],
    thumbnail: '/images/projects/ai-art-pipeline.jpg',
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

The purchase flow uses Razorpay's HMAC-signed order verification to ensure payment integrity. Post-payment fulfillment generates time-limited download tokens (72-hour expiry) stored in Supabase, which map to signed Supabase Storage URLs valid for 1 hour per download. This two-layer token system prevents URL sharing abuse while allowing multiple legitimate downloads within the window.

## Admin System

A protected \`/admin\` dashboard allows direct product management: upload art files and thumbnails to Supabase Storage, set prices, manage published state, and view order history — all without touching the database directly.
    `.trim(),
    highlights: [
      'UPI payment integration via Razorpay with HMAC signature verification',
      'Email OTP authentication via Supabase Auth (no passwords)',
      'Time-limited signed download URLs — 72hr token + 1hr Supabase signed URL',
      'Admin dashboard for product management and order tracking',
    ],
    thumbnail: '/images/projects/portfolio.jpg',
  },
  {
    slug: 'tata-python-tooling',
    title: 'Python Automation & Anomaly Detection',
    subtitle: 'Aerospace Manufacturing — Tata Advanced Systems',
    tags: ['Python', 'Automation', 'Data Analysis', 'Manufacturing'],
    period: '2022 – 2023',
    company: 'Tata Advanced Systems Ltd.',
    description:
      'Production Python scripts for metric logging and anomaly detection in aerospace manufacturing workflows, reducing manual reporting overhead by ~35%.',
    longDescription: `
## Overview

During an internship at Tata Advanced Systems Ltd. (aerospace manufacturing), developed a suite of Python automation tools for production metric logging and anomaly detection that were adopted into the process engineering team's standard workflow.

## Tools Built

**Metric Logging System**
Automated extraction of production metrics from legacy data sources into a structured format, replacing manual data entry. Eliminated a class of recurring data entry errors caused by transcription from analog gauges.

**Anomaly Detection Pipeline**
Statistical anomaly detection on time-series production data — identifying out-of-spec measurements before they propagated to downstream processes. Used z-score and rolling-window methods calibrated against historical defect data.

**Root-Cause Analysis Reports**
Automated report generation that correlated anomaly occurrences with shift schedules, equipment IDs, and operator inputs — giving the process engineering team an immediate structured starting point for investigation.

## Impact

- ~35% reduction in manual reporting overhead
- Elimination of recurring transcription errors
- Root-cause analysis report format adopted as standard by the process engineering team
    `.trim(),
    highlights: [
      'Reduced manual reporting overhead by ~35%',
      'Eliminated recurring data entry errors via automated extraction',
      'Root-cause analysis reports adopted by process engineering team',
    ],
    thumbnail: '/images/projects/tata.jpg',
  },
]

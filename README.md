# EchoME

EchoME is an interactive engineering portfolio designed as a decision system, not a static resume.

It adapts content based on user intent and presents technical evidence in real time for recruiters, builders, and hackathon judges.

## Why EchoME

Traditional portfolios are linear and passive.

EchoME focuses on:

- Intent-driven project ranking
- Architecture-first storytelling
- Reliability and deployment evidence
- Fast scanability for judging workflows

## Technical Highlights

- **Intent-aware command console** with dynamic response generation
- **Deterministic relevance scoring** across projects based on query + context
- **Role-Fit Recomposer** for job/challenge-specific portfolio reshaping
- **Typed assistant responses** and lightweight loading states for product-like interaction
- **Responsive UI system** with reduced-motion support and subtle animation polish

## System Architecture

### 1) Data Layer

Structured profile and project metadata is defined in `src/App.tsx`:

- Profile identity
- Credibility metrics
- Project corpus (impact, stack, decisions, highlights)
- Skill taxonomy and achievements

### 2) Ranking Layer

The ranking engine computes query relevance by combining:

- Keyword overlap against project name, tags, stack, summary, and role
- Tag-priority boost for direct intent matches

This keeps behavior deterministic and demo-safe without requiring external APIs.

### 3) Response Layer

The command console uses intent buckets (LLM/RAG, multimodal retrieval, deployment/MLOps, CV/emotion) to produce context-aware answers and diversify recommendations beyond a single project.

### 4) Presentation Layer

- React + TypeScript component architecture
- CSS design system with custom tokens and responsive grids
- Micro-interactions: hover elevation, stagger reveal, typing caret, animated atmospheric background

## Feature Map

- **Hero**: identity, role context, and adaptive mode switching
- **Technical Proof**: judge-friendly credibility cards
- **Dynamic Proof Board**: ranked projects + architecture/impact drill-down
- **Role-Fit Recomposer**: paste any role/challenge and re-rank evidence
- **End-to-End Blueprint**: how solutions move from design to optimization
- **Skills**: categorized capability model with one-line engineering context
- **Certifications + Achievements**: multidisciplinary credibility
- **Contact**: direct conversion actions

## Stack

- React 19
- TypeScript
- Vite
- ESLint

## Local Development

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173` by default.

## Quality Checks

```bash
npm run lint
npm run build
```

## Build Output

```bash
npm run build
```

Outputs production assets to `dist/`.

## Repository Structure

```text
src/
	App.tsx      # Application logic, content model, scoring + response behavior
	index.css    # Visual system, responsive layout, interactions and animations
	main.tsx     # App bootstrap
```

## Positioning

EchoME presents Priyanka Nanda as an engineering-first candidate with strengths in AI/ML, full-stack execution, deployment awareness, and technical communication.

It is optimized for real evaluation contexts: hackathons, internships, and engineering hiring screens.

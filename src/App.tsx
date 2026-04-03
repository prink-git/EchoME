import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'

type VisitorMode = 'Recruiter' | 'Builder' | 'Judge' | 'Curious Human'

type Project = {
  id: string
  name: string
  role: string
  impact: string
  stack: string[]
  tags: string[]
  summary: string
  decisions: string[]
  highlights: string[]
}

type SkillCategory = {
  heading: string
  description: string
  items: string[]
}

type BlueprintStage = {
  stage: string
  title: string
  detail: string
}

const visitorModes: VisitorMode[] = [
  'Recruiter',
  'Builder',
  'Judge',
  'Curious Human',
]

const profile = {
  fullName: 'Priyanka Nanda',
  role: 'AI/ML and Full Stack Enthusiast',
  location: 'Andhra University, India',
  education: '3rd Year B.Tech CSE, GPA 8.26',
  focus: 'End-to-end intelligent systems from data to deployment',
  email: 'priyankananda275@gmail.com',
  github: 'https://github.com/prink-git',
  linkedin: 'https://www.linkedin.com/in/priyankaa275/',
}

const commandPrompts = [
  'Show architecture-first projects with production relevance',
  'Which project proves LLM reliability engineering?',
  'Give me your fastest build-to-deploy example',
  'Show multimodal and retrieval expertise for AI products',
]

const credibilityStats = [
  { label: 'Academic Performance', value: '8.26 GPA', detail: 'B.Tech CSE, Andhra University' },
  { label: 'Core Internships', value: '2', detail: 'ML + Full Stack delivery experience' },
  {
    label: 'Industry Certifications',
    value: '10+',
    detail: 'IBM, Stanford/DeepLearning.AI, ISRO, Google, Tata Forage, Infosys Springboard',
  },
  { label: 'Portfolio Systems', value: '12+', detail: 'AI, ML, full-stack, and deployment-focused projects' },
]

const certifications = [
  'IBM Data Science Professional Certificate',
  'Machine Learning Specialization (Stanford / DeepLearning.AI)',
  'ISRO Remote Sensing Data Analytics',
  'Deep Learning with TensorFlow (IBM)',
  'Crash Course on Python (Google)',
  'Data Visualization: Empowering Business with Effective Insights (Tata Forage)',
  'Infosys Springboard Artificial Intelligence Certifications (Multiple Modules)',
]

const systemBlueprint: BlueprintStage[] = [
  {
    stage: 'Stage 01',
    title: 'Design and Data Strategy',
    detail:
      'Translate problem goals into data flow, model scope, and measurable system constraints before implementation.',
  },
  {
    stage: 'Stage 02',
    title: 'Modeling and Application Build',
    detail:
      'Develop AI pipelines, backend APIs, and user-facing applications together so intelligence is directly usable.',
  },
  {
    stage: 'Stage 03',
    title: 'Deployment and Reliability',
    detail:
      'Ship with containerized services, CI/CD workflow support, and practical fallback paths for stable behavior.',
  },
  {
    stage: 'Stage 04',
    title: 'Observability and Optimization',
    detail:
      'Diagnose failures, tune latency, and iterate through logging, debugging, and performance-focused system reviews.',
  },
]

const projects: Project[] = [
  {
    id: 'tracellm',
    name: 'traceLLM',
    role: 'Systems-level AI Engineer',
    impact: 'Automated RCA for 3 major LLM failure modes with evidence-backed diagnostics',
    stack: ['Python', 'RAG', 'Embeddings', 'Vector Search'],
    tags: ['llm', 'rag', 'debugging', 'reliability', 'pipeline'],
    summary:
      'Production-facing reliability analyzer for LLM workflows that isolates hallucination, retrieval, and prompt failures from execution logs.',
    decisions: [
      'Used retrieval-grounded diagnostics to keep explanations actionable and traceable.',
      'Designed failure categories to isolate prompt quality versus retrieval quality quickly.',
      'Generated structured RCA reports so teams can fix issues instead of only observing them.',
    ],
    highlights: [
      'Diagnoses 3 failure classes: hallucination, retrieval miss, prompt mismatch.',
      'Generates structured RCA summary in one pass from log + retrieval evidence.',
      'Built as modular RAG pipeline for extensible debugging in production workflows.',
    ],
  },
  {
    id: 'mood-music',
    name: 'Mood Music Recommender',
    role: 'AI + Full Stack Builder',
    impact: 'Real-time emotion-to-music decision flow with live vision inference and API delivery',
    stack: ['DeepFace', 'OpenCV', 'Spotify API', 'Streamlit', 'Python'],
    tags: ['emotion-ai', 'computer-vision', 'recommendation', 'streamlit', 'api-integration'],
    summary:
      'Interactive decision application mapping live facial emotion to personalized Spotify recommendations with low-latency feedback.',
    decisions: [
      'Used DeepFace and OpenCV for fast emotion detection with practical camera latency.',
      'Integrated Spotify API for recommendation delivery in user-facing real time.',
      'Designed a Streamlit interaction loop for immediate feedback and demo clarity.',
    ],
    highlights: [
      'Real-time camera input to recommendation pipeline in one UX flow.',
      'Cross-domain integration: CV + API + frontend interaction.',
      'Demonstrates AI model output as direct user utility, not raw prediction.',
    ],
  },
  {
    id: 'earlydrop',
    name: 'earlydrop',
    role: 'AI Engineer',
    impact: 'Shipped anomaly scoring service with interpretable risk tiers and API-first execution',
    stack: ['Isolation Forest', 'FastAPI', 'Feature Engineering', 'Python'],
    tags: ['anomaly-detection', 'deployment', 'api', 'mlops'],
    summary:
      'Operational anomaly detection architecture combining feature engineering, interpretable scoring, and deployment-ready interfaces.',
    decisions: [
      'Selected Isolation Forest for efficient unsupervised anomaly detection in sparse labels settings.',
      'Built explicit risk scoring to make outputs explainable for operational teams.',
      'Shipped via FastAPI to move from notebook experiments to usable service endpoints.',
    ],
    highlights: [
      'Designed anomaly score and risk bands for actionable triage.',
      'Exposed model behavior via API-first deployment strategy.',
      'Converted experimentation workflow into deployable service architecture.',
    ],
  },
  {
    id: 'multiscope-reasoning',
    name: 'multiScope Reasoning Engine',
    role: 'AI Systems Developer',
    impact: 'Composable reasoning architecture for multi-perspective analysis and explainable outputs',
    stack: ['Python', 'Modular Pipelines', 'Prompt Chaining', 'Analysis Frameworks'],
    tags: ['modular-ai', 'reasoning', 'analysis', 'pipeline-design'],
    summary:
      'Modular reasoning framework that decomposes complex prompts into structured viewpoints for stronger decision support.',
    decisions: [
      'Separated perspectives into modular stages for better interpretability and extensibility.',
      'Defined reusable pipeline units to reduce coupling between reasoning components.',
      'Optimized for explainable outputs over black-box final answers.',
    ],
    highlights: [
      'Modular orchestration improves maintainability and debugging speed.',
      'Supports perspective-based comparison for richer analytical output.',
      'Acts as reusable foundation for future multi-agent workflows.',
    ],
  },
  {
    id: 'multiscope-clip',
    name: 'MultiScope Multimodal Retrieval',
    role: 'Deep Learning Engineer',
    impact: 'Built CLIP retrieval engine with 512-dim embeddings, cosine ranking, and GPU-aware execution',
    stack: ['OpenAI CLIP', 'PyTorch', 'Streamlit', 'CUDA', 'Cosine Similarity'],
    tags: ['multimodal', 'clip', 'retrieval', 'vision-language', 'gpu'],
    summary:
      'Multimodal retrieval architecture aligning image and text semantics in a shared space for real-time relevance scoring.',
    decisions: [
      'Used CLIP encoders to map image and text into matched 512-dimensional normalized embeddings.',
      'Implemented cosine-similarity ranking for fast and interpretable retrieval scoring.',
      'Added CUDA detection with CPU fallback for portable and reliable execution.',
    ],
    highlights: [
      'Image encoding to normalized 512-dimensional embedding vectors.',
      'Text encoding in the same latent space for direct semantic comparison.',
      'Interactive Streamlit dashboard for real-time retrieval demo.',
      'GPU acceleration with graceful fallback for deployment flexibility.',
    ],
  },
  {
    id: 'promptpanda',
    name: 'promptPanda',
    role: 'LLM Reliability Builder',
    impact: 'Prompt quality engine with retrieval-augmented diagnostics and structured evaluation checks',
    stack: ['Embeddings', 'RAG', 'Prompt Engineering', 'Python'],
    tags: ['prompt-debugging', 'llm-quality', 'evaluation', 'rag'],
    summary:
      'Prompt debugging workflow designed to improve consistency and response quality with retrieval-backed analysis.',
    decisions: [
      'Added retrieval-backed prompt analysis to reduce brittle prompt behavior.',
      'Tracked prompt quality against structured reliability checks.',
      'Focused on practical debugging signals that developers can act on quickly.',
    ],
    highlights: [
      'RAG-assisted prompt debugging for higher answer consistency.',
      'Embeddings-based analysis to detect weak prompt semantics.',
      'Complements traceLLM as part of a full LLM reliability toolkit.',
    ],
  },
]

const skillCategories: SkillCategory[] = [
  {
    heading: 'Languages and Programming',
    description: 'Strong implementation base for data, backend, and application engineering.',
    items: ['Python', 'SQL', 'R', 'Java', 'C++', 'Bash', 'JavaScript', 'TypeScript'],
  },
  {
    heading: 'LLM Systems',
    description: 'Builds explainable, debuggable LLM pipelines for production-like use cases.',
    items: [
      'RAG architecture design',
      'LLM systems',
      'Prompt engineering',
      'Model evaluation',
      'Vector databases (FAISS, Pinecone, Chroma)',
    ],
  },
  {
    heading: 'AI/ML Engineering',
    description: 'Combines model development with practical integration into end-to-end products.',
    items: ['PyTorch', 'TensorFlow', 'Transformers', 'CNNs', 'NLP', 'RAG'],
  },
  {
    heading: 'Data and Foundations',
    description: 'Solid fundamentals for trustworthy analysis, feature engineering, and system correctness.',
    items: ['Pandas', 'NumPy', 'SciPy', 'Statistics', 'Data Analysis', 'DSA', 'OOP', 'DBMS', 'Operating Systems'],
  },
  {
    heading: 'MLOps and Deployment',
    description: 'Delivers models as maintainable services with scalable deployment workflows.',
    items: ['FastAPI', 'Flask', 'Docker', 'Kubernetes', 'CI/CD', 'MLflow', 'HuggingFace', 'REST APIs'],
  },
  {
    heading: 'Web and Application Systems',
    description: 'Ships user-facing products that connect AI logic to intuitive interfaces.',
    items: ['React.js', 'Node.js', 'Streamlit', 'Spring Boot', 'JDBC'],
  },
  {
    heading: 'Engineering Workflow',
    description: 'Executes fast with disciplined tooling, testing habits, and pipeline-level debugging.',
    items: ['Git', 'GitHub', 'Linux', 'Debugging', 'Testing', 'Pipeline Design'],
  },
  {
    heading: 'System Design and Performance',
    description: 'Focuses on architecture quality, observability, and low-latency behavior under load.',
    items: [
      'Microservices basics',
      'Distributed systems basics',
      'Observability and debugging',
      'Performance optimization (latency, async systems)',
      'Data pipelines and ETL',
    ],
  },
]

const leadershipAndAchievements = [
  'Vice president in GirlUp, Andhra University.',
  'Vice president in Communicons, The English Club in AU.',
  'Interschool basketball runner up.',
  'Trained in Kathak and active in Hindustani classical music.',
  'Won national level medals in Art and painting.',
  'Won in creative writing competitions.',
]

function scoreProject(project: Project, signal: string): number {
  const lowerSignal = signal.toLowerCase()
  const haystack = [
    project.name,
    project.role,
    project.impact,
    project.summary,
    project.tags.join(' '),
    project.stack.join(' '),
  ]
    .join(' ')
    .toLowerCase()

  const keywordScore = lowerSignal
    .split(/\s+/)
    .filter((word) => word.length > 2)
    .reduce((total, word) => total + (haystack.includes(word) ? 1 : 0), 0)

  // Keep ranking lightweight and deterministic so the demo stays stable offline.
  return keywordScore + (project.tags.some((tag) => lowerSignal.includes(tag)) ? 2 : 0)
}

function generateModeIntro(mode: VisitorMode): string {
  if (mode === 'Recruiter') {
    return 'I ship architecture-led AI products with measurable outcomes, reliability, and deployment readiness.'
  }
  if (mode === 'Builder') {
    return 'I can walk you through data design, model choices, scalability tradeoffs, and production debugging.'
  }
  if (mode === 'Judge') {
    return 'You will see engineering judgment, explainability, and execution from raw data to reliable product behavior.'
  }
  return 'Ask anything about how I combine AI engineering, full-stack execution, and high-clarity product storytelling.'
}

function craftAssistantReply(
  prompt: string,
  mode: VisitorMode,
  rankedProjects: Project[],
): string {
  if (!prompt.trim()) {
    return 'Give me a prompt and I will tailor my strongest work in seconds.'
  }

  const top = rankedProjects[0]
  const lowerPrompt = prompt.toLowerCase()

  const pickByKeywords = (keywords: string[]): Project | undefined =>
    rankedProjects.find((project) =>
      keywords.some((keyword) =>
        `${project.tags.join(' ')} ${project.stack.join(' ')} ${project.summary}`
          .toLowerCase()
          .includes(keyword),
      ),
    )

  const reliabilityProject = pickByKeywords(['llm', 'rag', 'prompt', 'reliability'])
  const multimodalProject = pickByKeywords(['clip', 'multimodal', 'retrieval', 'vision'])
  const deploymentProject = pickByKeywords(['fastapi', 'docker', 'deployment', 'api'])
  const cvProject = pickByKeywords(['opencv', 'deepface', 'emotion'])

  const angle =
    mode === 'Judge'
      ? 'competitive edge and demo clarity'
      : mode === 'Recruiter'
        ? 'business outcomes and ownership'
        : mode === 'Builder'
          ? 'technical decisions and architecture'
          : 'story and craft'

  if (/(llm|rag|prompt|hallucination|retrieval failure)/.test(lowerPrompt) && reliabilityProject) {
    return `${reliabilityProject.name} is a great fit for this. It focuses on LLM failure-mode diagnostics, traceable evidence, and structured RCA outputs. If you want to see production execution with it, check ${deploymentProject?.name ?? top.name} as well.`
  }

  if (/(image|text|multimodal|clip|semantic|similarity)/.test(lowerPrompt) && multimodalProject) {
    return `${multimodalProject.name} matches this really well. It covers CLIP embeddings, cosine similarity ranking, and GPU-aware execution for real-time retrieval. For debugging and observability depth, pair it with ${reliabilityProject?.name ?? top.name}.`
  }

  if (/(deployment|api|mlops|production|latency|scale)/.test(lowerPrompt) && deploymentProject) {
    return `${deploymentProject.name} is your strongest deployment-first example. It shows API-oriented architecture and interpretable scoring in an operational setup, not just experimentation. You can also reference ${reliabilityProject?.name ?? top.name} to show reliability and debugging practices.`
  }

  if (/(cv|computer vision|emotion|camera|recommender)/.test(lowerPrompt) && cvProject) {
    return `${cvProject.name} is a strong match here. It combines live inference, decision logic, and user-facing integration in one low-latency flow. To reinforce deployment strength, add ${deploymentProject?.name ?? top.name}.`
  }

  const topThree = rankedProjects.slice(0, 3).map((project) => project.name)
  return `For your request, I prioritized ${top.name} because it best demonstrates ${angle}: ${top.impact}. Also review ${topThree[1] ?? top.name} and ${topThree[2] ?? top.name} for complementary depth across architecture, deployment, and reliability.`
}

function App() {
  const [mode, setMode] = useState<VisitorMode>('Judge')
  const [promptInput, setPromptInput] = useState(commandPrompts[0])
  const [activePrompt, setActivePrompt] = useState(commandPrompts[0])
  const [isThinking, setIsThinking] = useState(false)
  const [typedReply, setTypedReply] = useState('')
  const [brief, setBrief] = useState('')
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0].id)

  const rankedProjects = useMemo(() => {
    const signal = `${mode} ${activePrompt} ${brief}`
    return [...projects].sort((a, b) => scoreProject(b, signal) - scoreProject(a, signal))
  }, [mode, activePrompt, brief])

  const selectedProject =
    rankedProjects.find((project) => project.id === selectedProjectId) ?? rankedProjects[0]

  const assistantReply = useMemo(
    () => craftAssistantReply(activePrompt, mode, rankedProjects),
    [activePrompt, mode, rankedProjects],
  )

  useEffect(() => {
    if (isThinking) {
      return
    }

    // Simulate streamed output so the console feels like a live assistant.
    let charIndex = 0
    const intervalId = window.setInterval(() => {
      charIndex += 1
      setTypedReply(assistantReply.slice(0, charIndex))
      if (charIndex >= assistantReply.length) {
        window.clearInterval(intervalId)
      }
    }, 12)

    return () => window.clearInterval(intervalId)
  }, [assistantReply, isThinking])

  const fitSummary = useMemo(() => {
    if (!brief.trim()) {
      return 'Paste a job description, startup brief, or challenge prompt to instantly recompose this portfolio.'
    }

    const topTwo = rankedProjects.slice(0, 2)
    return `EchoME recomposed for this brief. Best fit: ${topTwo[0].name} and ${topTwo[1].name}. Why: they demonstrate speed, measurable outcomes, and AI-informed product execution under constraints.`
  }, [brief, rankedProjects])

  const onPromptSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const cleanedPrompt = promptInput.trim() || 'Show me your strongest work'
    setPromptInput(cleanedPrompt)
    setIsThinking(true)
    // Short delay gives feedback without slowing down interaction.
    window.setTimeout(() => {
      setActivePrompt(cleanedPrompt)
      setIsThinking(false)
      setSelectedProjectId(rankedProjects[0].id)
    }, 650)
  }

  const onBriefSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setBrief(brief.trim())
    // Jump to the top-ranked project for the pasted context.
    setSelectedProjectId(rankedProjects[0].id)
  }

  return (
    <div className="page-shell">
      <header className="hero">
        <h1>
          EchoME
          <span>Your work, intelligently reflected.</span>
        </h1>
        <p className="hero-identity">
          {profile.fullName} • {profile.role} • {profile.education}
        </p>
        <p className="hero-copy">{generateModeIntro(mode)}</p>

        <section className="identity-strip" aria-label="Builder profile snapshot">
          <article className="identity-item">
            <p className="identity-label">Name</p>
            <p>{profile.fullName}</p>
          </article>
          <article className="identity-item">
            <p className="identity-label">Primary Role</p>
            <p>{profile.role}</p>
          </article>
          <article className="identity-item">
            <p className="identity-label">Education</p>
            <p>{profile.education}</p>
          </article>
          <article className="identity-item">
            <p className="identity-label">Core Focus</p>
            <p>{profile.focus}</p>
          </article>
        </section>

        <div className="mode-switch" role="tablist" aria-label="Visitor mode">
          {visitorModes.map((candidate) => (
            <button
              key={candidate}
              className={candidate === mode ? 'is-active' : ''}
              onClick={() => setMode(candidate)}
            >
              {candidate}
            </button>
          ))}
        </div>

        <form className="command" onSubmit={onPromptSubmit}>
          <label htmlFor="prompt">Command Console</label>
          <div className="command-row">
            <input
              id="prompt"
              value={promptInput}
              onChange={(event) => setPromptInput(event.target.value)}
              placeholder="Type a recruiter, architect, or judge-style query"
            />
            <button type="submit" disabled={isThinking}>
              {isThinking ? 'Analyzing...' : 'Run Analysis'}
            </button>
          </div>
          <div className="prompt-suggestions">
            {commandPrompts.map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => {
                  setPromptInput(sample)
                  setActivePrompt(sample)
                }}
              >
                {sample}
              </button>
            ))}
          </div>
        </form>

        <article className={isThinking ? 'assistant-card is-thinking' : 'assistant-card'}>
          <h2>Echo Response</h2>
          <p className={isThinking ? '' : 'typing-caret'}>
            {isThinking ? 'Ranking architecture fit and execution evidence...' : typedReply}
          </p>
        </article>
      </header>

      <main>
        <section id="proof" className="panel judge-proof">
          <div className="panel-title-wrap">
            <p className="kicker">Technical Proof</p>
            <h3>Judge-ready credibility in numbers</h3>
          </div>
          <div className="proof-grid">
            {credibilityStats.map((item) => (
              <article key={item.label} className="proof-card">
                <p className="proof-label">{item.label}</p>
                <p className="proof-value">{item.value}</p>
                <p className="proof-detail">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="panel projects">
          <div className="panel-title-wrap">
            <p className="kicker">Projects</p>
            <h3>Dynamic proof board</h3>
          </div>
          <div className="project-grid">
            <aside>
              {rankedProjects.map((project) => (
                <button
                  key={project.id}
                  className={project.id === selectedProject.id ? 'project-chip active' : 'project-chip'}
                  onClick={() => setSelectedProjectId(project.id)}
                >
                  <strong>{project.name}</strong>
                  <span>{project.impact}</span>
                  <div className="chip-badges">
                    {project.tags.slice(0, 3).map((tag) => (
                      <small key={tag}>{tag}</small>
                    ))}
                  </div>
                </button>
              ))}
            </aside>
            <article className="case-file">
              <h4>{selectedProject.name}</h4>
              <p className="meta">{selectedProject.role}</p>
              <p>{selectedProject.summary}</p>
              <p className="impact">{selectedProject.impact}</p>
              <div className="impact-badges">
                {selectedProject.tags.slice(0, 5).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="tag-row">
                {selectedProject.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <h5>Key Decisions</h5>
              <ul>
                {selectedProject.decisions.map((decision) => (
                  <li key={decision}>{decision}</li>
                ))}
              </ul>
              <h5>Technical Highlights</h5>
              <ul className="metric-list">
                {selectedProject.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="panel recomposer spotlight">
          <div className="panel-title-wrap">
            <p className="kicker">Signature Highlight</p>
            <h3>Role-Fit Recomposer</h3>
            <p className="spotlight-tagline">
              Paste any role or challenge and EchoME instantly re-ranks evidence for that exact context.
            </p>
          </div>
          <form onSubmit={onBriefSubmit}>
            <textarea
              value={brief}
              onChange={(event) => setBrief(event.target.value)}
              placeholder="Paste a job description, startup challenge, or hackathon prompt"
            />
            <button type="submit">Recompose for Fit</button>
          </form>
          <p className="summary">{fitSummary}</p>
        </section>

        <section id="blueprint" className="panel systems-matrix">
          <div className="panel-title-wrap">
            <p className="kicker">End-to-End Blueprint</p>
            <h3>How I build intelligent systems from concept to production</h3>
          </div>
          <div className="matrix-grid">
            {systemBlueprint.map((item) => (
              <article key={item.stage}>
                <p className="matrix-score">{item.stage}</p>
                <h4>{item.title}</h4>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="panel skills">
          <div className="panel-title-wrap">
            <p className="kicker">Skills</p>
            <h3>System-oriented technical capabilities</h3>
          </div>
          <div className="skill-grid">
            {skillCategories.map((bucket) => (
              <article key={bucket.heading}>
                <h4>{bucket.heading}</h4>
                <p className="skill-desc">{bucket.description}</p>
                <div className="tag-row">
                  {bucket.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="panel certs">
          <div className="panel-title-wrap">
            <p className="kicker">Certifications</p>
            <h3>Validated learning in AI, ML, and data systems</h3>
          </div>
          <ul className="cert-list">
            {certifications.map((certification) => (
              <li key={certification}>{certification}</li>
            ))}
          </ul>
        </section>

        <section id="achievements" className="panel achievements">
          <div className="panel-title-wrap">
            <p className="kicker">Leadership and Achievements</p>
            <h3>Multidisciplinary strengths beyond code</h3>
          </div>
          <ul className="achievement-list">
            {leadershipAndAchievements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="panel about">
          <div>
            <p className="kicker">About</p>
            <h3>Systems-level AI engineer with technical depth, creativity, and leadership</h3>
            <p>
              I design intelligent systems that are explainable, deployable, and resilient. My work
              spans LLM reliability tooling, multimodal retrieval systems, anomaly detection APIs,
              and full-stack product delivery.
            </p>
          </div>
          <ul>
            <li>Machine Learning Intern: Samayamantri Technologies</li>
            <li>Full Stack Intern: RINL (Java Swing + Oracle + JDBC inventory system)</li>
            <li>Builds end-to-end pipelines from data to deployment and debugging</li>
            <li>Strong communication through debate, essay writing, and storytelling</li>
          </ul>
        </section>

        <section id="contact" className="panel contact">
          <div>
            <p className="kicker">Contact</p>
            <h3>Collaboration Console</h3>
            <p>
              If this reflects the way your team builds, I can deliver product-grade outcomes fast.
            </p>
          </div>
          <div className="contact-actions">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

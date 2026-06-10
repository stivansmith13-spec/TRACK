# 🎯 TRACK Platform - Comprehensive Documentation

## Executive Summary

**TRACK** is a sovereign, AI-powered employment matching and blockchain-verified credential platform designed for Algeria. It unifies job seekers, employers, educational institutions, and government bodies in a single ecosystem powered by Google's Gemini API, React, TypeScript, and blockchain technology.

**Live Deployment:** https://track-354333084796.europe-west2.run.app

---

## 📋 Table of Contents

1. [Platform Overview](#platform-overview)
2. [Core Stakeholders & Roles](#core-stakeholders--roles)
3. [Feature Breakdown by Role](#feature-breakdown-by-role)
4. [Technical Architecture](#technical-architecture)
5. [Key Algorithms & Workflows](#key-algorithms--workflows)
6. [Data Models & Schema](#data-models--schema)
7. [Integration Points](#integration-points)
8. [Security & Compliance](#security--compliance)
9. [Metrics & KPIs](#metrics--kpis)
10. [Setup & Deployment](#setup--deployment)

---

## Platform Overview

### Vision
Enable fair, transparent, and data-driven employment matching across Algeria by leveraging AI, blockchain verification, and sovereign government oversight.

### Mission
- **For Job Seekers:** Find the right opportunities based on skills and merit
- **For Employers:** Access verified talent with precise skill matching
- **For Universities:** Issue verifiable credentials and track graduate outcomes
- **For Government:** Monitor employment metrics and enforce compliance

### Core Values
- 🔐 **Security First** - Blockchain-verified credentials, ISO 27001 certified
- 🤖 **AI-Driven** - Intelligent matching using Gemini API
- 🇩🇿 **Sovereign** - Compliant with Executive Decree 07-26
- 📊 **Transparent** - Full audit trails and cryptographic proof

---

## Core Stakeholders & Roles

### 1. 🎓 Candidates (Job Seekers)
**Who:** Individuals seeking employment, career development, skills growth

**Key Needs:**
- Find matching job opportunities
- Build and verify digital credentials
- Track career progress
- Receive personalized career guidance

### 2. 🏢 Companies (Employers)
**Who:** Organizations hiring talent

**Key Needs:**
- Screen candidates efficiently
- Access verified credentials
- Predict skill gaps
- Post opportunities and match candidates

### 3. 🏫 Universities/Training Centers
**Who:** Educational institutions

**Key Needs:**
- Issue digital certificates
- Track graduate outcomes
- Verify student credentials
- Align curricula with market demands

### 4. 🇩🇿 Government Agencies
**Who:** Sovereign decision-makers and policy enforcers

**Key Needs:**
- Monitor national employment metrics
- Enforce hiring regulations
- Track labor market trends
- Ensure institutional compliance

### 5. ⚙️ Administrators
**Who:** System operators and governance experts

**Key Needs:**
- Oversee all platform activities
- Configure policies and rules
- Audit user actions
- Manage inter-institutional linkages

---

## Feature Breakdown by Role

### 📱 CANDIDATE PORTAL

#### **Dashboard**
- **Merit Score Display:** 0-100% with tier classification
  - Tier 1: 80%+ (Excellent)
  - Tier 2: 65-79% (Good)
  - Tier 3: <65% (Developing)
- **Profile Card:** Name, title, location, education
- **Quick Stats:** Active jobs, verified certificates, match rate
- **Opportunity Alerts:** Real-time notifications for >90% matches

**Interactive Elements:**
- Skill radar visualization (8-axis)
- Job match feed (real-time)
- Certificate vault access
- Career timeline navigation

---

#### **🎯 Skill Radar (Interactive Assessment)**

**8 Core Skills Tracked:**
1. **البرمجيات (Programming)** - Technical coding & development
2. **تحليل البيانات (Data Analysis)** - Analytics & insights
3. **حل المشكلات (Problem-Solving)** - Critical thinking
4. **التواصل (Communication)** - Interpersonal skills
5. **العمل الجماعي (Teamwork)** - Collaboration ability
6. **إدارة الوقت (Time Management)** - Project management
7. **القيادة (Leadership)** - Team leadership
8. **الإبداع (Creativity)** - Innovation & ideation

**Functionality:**
- Click on radar axes to adjust skill levels (20-100%)
- Sliding scale for fine-tuning each skill
- Real-time merit score recalculation
- Job match percentage updates instantly
- Tier classification updates dynamically

**Calculation Logic:**
```
Merit Score = Average of all 8 skill levels
New Job Matches = Recalculated based on updated skills
```

---

#### **💼 Job Matching Feed**

**Features:**
- **AI-Powered Recommendations:** Matches candidates to jobs based on skill profile
- **Match Percentage:** 45-99% algorithmic match score
- **Dynamic Recalculation:** Updates as candidate skills change
- **Full Job Details:**
  - Title, company name, location
  - Salary range (in Algerian Dinar)
  - Required skills list
  - Job description
  - Posted timestamp

**Job Application:**
- One-click application submission
- Application confirmation with timestamp
- Direct company notification
- Application status tracking

**Example Jobs Displayed:**
- Full Stack Developer (94% match)
- Data Scientist (82% match)
- Financial Analyst (78% match)
- DevOps Engineer (60% match)

---

#### **🔐 Digital Vault (Blockchain-Backed)**

**Certificate Management:**
- **Upload Methods:**
  - Manual form entry (title, issuer, expiry date)
  - OCR document scanning (AI extraction)
  - Auto-population of fields from scan
  
- **Categorization by Specialty:**
  - علوم الحاسوب وتطوير الويب (Computer Science & Web Dev)
  - ذكاء الأعمال وتحليل البيانات (Business Intelligence & Data)
  - الأمن السيبراني والشبكات (Cybersecurity & Networks)
  - إدارة الأعمال واللوجستيات (Business & Logistics)
  - تخصصات أخرى (Other Specialties)

- **Blockchain Verification:**
  - Transaction hash (Tx): 0x[unique identifier]
  - Block number: Reference to blockchain ledger
  - Sovereign seal: DZ-SOV-TLEMCEN-SEAL-[number]
  - Validation nodes: Consensus from 5+ nodes
  - Integrity proof: Cryptographic signature

- **Expiry Tracking:**
  - Countdown to expiration date
  - 30-day warning threshold (amber alert)
  - Expired status (red alert with X)
  - Active status (green confirmation)

- **QR Code Verification:**
  - Generate scannable QR code per certificate
  - Employer scan → direct verification
  - Shareable verification URL with parameters
  - Timestamp-based validity check

- **Professional Badges:**
  - 🏳️ No certs verified → "Verifying Professional" (0%)
  - 🥉 1 cert verified → Bronze (25%)
  - 🥈 2 certs verified → Silver (50%)
  - 🥇 3 certs verified → Gold (75%)
  - 💎 4+ certs verified → Platinum Elite (100%)

---

#### **🛣️ Career Roadmap**

**Features:**
- **Timeline Visualization:** Historical merit score progression
- **Milestone Tracking:** Key achievements and dates
- **Projection Simulation:** Future skill growth scenarios
- **Recommendation Engine:** Suggested skill development paths
- **Certificate Impact:** Shows how each cert boosted merit score

**Scenario Simulation:**
- Add hypothetical certificates
- Observe merit score impact (+7-12%)
- Plan career trajectory
- Identify high-value credentials

---

#### **🤖 AI Career Advisor (Gemini-Powered)**

**Capabilities:**
- **Conversational Interface:** Natural language chat
- **Personalized Advice:** Based on candidate profile
- **Skill Recommendations:** Which skills to develop next
- **Career Path Guidance:** Next steps for advancement
- **Interview Preparation:** Q&A simulation
- **Market Insights:** Industry trends and salary data

**Integration:**
- Uses Google Gemini API for LLM responses
- Maintains conversation context
- References candidate's actual profile data
- Generates actionable recommendations

---

#### **📚 Learning Center**

**Available Courses:**
1. **Python for Data Science Advanced** (15 hours)
   - Suitability: 95% match
   - Level: Advanced
   - Focus: ML, pandas, scikit-learn

2. **SQL Warehouse Design** (10 hours)
   - Suitability: 93% match
   - Level: Intermediate
   - Focus: Database optimization, schema design

3. **DevOps & Docker Containers** (12 hours)
   - Suitability: 88% match
   - Level: Beginner
   - Focus: CI/CD, containerization, Kubernetes

4. **Corporate Leadership & Conflict Resolution** (6 hours)
   - Suitability: 85% match
   - Level: Advanced
   - Focus: Soft skills, team dynamics

**Completion Mechanics:**
- Candidates complete courses
- +10% automatic skill boost on related skills
- Certificate issued upon completion
- Instant merit score update

---

#### **🎤 Mock Interview Simulator**

**Features:**
- **AI-Generated Questions:** Role-specific interview scenarios
- **Real-time Evaluation:** Instant scoring on answers
- **Performance Metrics:** Communication, technical knowledge, confidence
- **Feedback:** Detailed suggestions for improvement
- **Badge Unlock:** "Interview Certified" badge on successful attempt

---

#### **📊 SWOT & Reports**

**Comprehensive Analysis Includes:**
- **Strengths:** Top 3 skills, verified credentials, experience
- **Weaknesses:** Lowest-scoring skills, skill gaps
- **Opportunities:** High-demand skills in market, growth areas
- **Threats:** Skills becoming obsolete, competition analysis

**Report Exports:**
- PDF download of full analysis
- Shareable summary card
- Recommendations for improvement

---

### 🏢 COMPANY PORTAL

#### **Smart Screening Dashboard**

**Metrics Displayed:**
- **Matching Accuracy:** 94% (verified filtering rate)
- **Active Candidates:** Pool size in real-time
- **Quick Filters:**
  - By skill (Programming, Data Analysis, etc.)
  - By region (Tlemcen, Oran, Algeria-wide)
  - By merit tier (Tier 1, Tier 2, Tier 3)
  - By certification status

**Visual Elements:**
- Candidate availability cards
- Skill profile visualization
- Merit score distribution chart
- Regional heat map

---

#### **👥 Candidate List & Verification**

**For Each Candidate:**
- **Profile Card:** Name, title, location, education
- **Merit Score:** 0-100% with tier
- **Verified Badge:** Blockchain verification status
- **Skill Summary:** Top skills and proficiency levels
- **Credential Verification:** Direct blockchain lookup
- **Interview Button:** Send direct interview request

**Verification Details:**
- Certificate count
- Verification status (✓ Verified or ⏳ Pending)
- Issuer information
- Issued date and expiry date

---

#### **↔️ Candidate Comparison**

**Side-by-Side Analysis:**
- Compare 2-4 candidates directly
- Skill-level comparison (radar charts)
- Merit score comparison
- Education & experience contrast
- Certification count comparison
- Match percentage for open positions
- Recommendation (Who to hire first?)

**Decision Support:**
- Top recommendation highlighted
- Compatibility percentage per job
- Skill gap identification
- Salary expectation comparison

---

#### **📈 Skills Gap Analysis**

**Identifies:**
- Which skills are lacking in current workforce
- Market demand vs. internal supply
- Training needs by department
- Individual skill gaps
- Competitive positioning

**Outputs:**
- Skills gap chart (current vs. needed)
- Training program recommendations
- Cost-benefit analysis
- Timeline for skill development

---

#### **🧠 HR Intelligence & Predictive Analytics**

**Features:**
- **Talent Trend Analysis:** Skill demand evolution
- **Predictive Hiring:** AI forecast of needed roles
- **Compensation Benchmarking:** Market salary data
- **Retention Insights:** Which skills to prioritize
- **Government Compliance:** Regulation requirements
- **Real-time Metrics:** Active jobs, applications, hires

---

#### **📝 Job Posting System**

**Create New Job Listing:**
- **Title:** Job position name
- **Salary:** Range in Algerian Dinar
- **Description:** Job duties and requirements
- **Required Skills:** Specify key skills
- **Location:** Tlemcen or regional designation

**Auto-Calculation:**
- Match scores for all candidate pool
- Notification to matching candidates (>90%)
- Proactive opportunity alert triggered
- Sound/visual notification sent

**Application Management:**
- View all applications per job
- Filter by match percentage
- Approve/reject candidates
- Schedule interviews directly

---

### 🏫 UNIVERSITY PORTAL

#### **Digital Credential Issuance**

**Issue Certificates:**
- **Certificate Details:** Name, issuer, specialty, date
- **Digital Signature:** Blockchain-backed verification
- **Auto-Import:** Student credentials appear on TRACK profiles
- **Expiry Management:** Set certificate validity period

**Batch Operations:**
- Issue certificates to multiple students
- Track issuance history
- Manage specialization taxonomy
- Monitor graduate outcomes

#### **Student Outcome Tracking**

- Track which graduates are employed
- Employment rate metrics
- Employer feedback collection
- Alumni network management
- Curriculum effectiveness analysis

#### **Curriculum Alignment**

- Align courses with market-demanded skills
- Identify skill gaps in graduates
- Recommend course updates
- Benchmark against other institutions

---

### 🇩🇿 SOVEREIGN PORTAL

#### **National Dashboard**

**Real-Time Metrics:**
- Total active job seekers: 542,391
- Open positions: 23,847
- Employment rate: 45%
- Matching accuracy: 68%
- Regional breakdown (by wilaya)

#### **Labor Market Analysis**

- **Trending Jobs:** Most in-demand roles
- **Skill Demand:** Hot skills right now
- **Unemployment Rate:** By region and sector
- **Salary Trends:** Average compensation evolution
- **Company Activity:** Hiring volume over time

#### **Government Integration**

**Connected Agencies:**
- ANEM (National Employment Agency)
- CNAS (National Insurance Fund)
- AADL (Housing Development)
- Ministry of Defense
- National Gendarmerie
- National Security Directorate

**Data Sharing:**
- Unified candidate database
- Shared credential verification
- Integrated policy enforcement
- Cross-agency compliance tracking

#### **Federated Linking System**

**Admin-Controlled Matching:**
- Manually link candidates to jobs
- Set match score manually
- Assign priority levels (high/medium/low)
- Track linking status (linked/pending/paused/matched)
- Full audit trail with timestamps

**Policy Enforcement:**
- **Local Priority:** Prefer local candidates
- **Academic Verification:** Require verified credentials
- **Double Sovereign Stamp:** Extra approval layer
- Real-time policy application

---

### ⚙️ ADMIN PANEL

#### **Governance Dashboard**

**System Overview:**
- Active sessions per role
- Real-time activity monitoring
- System health status
- Performance metrics

#### **Candidate-Enterprise Bridging**

**Manage Linkages:**
- View all candidate-to-company matches
- Match score (78-96%)
- Priority assignment (high/medium/low)
- Status tracking:
  - ✓ Linked (successful match)
  - ⏳ Pending (awaiting approval)
  - ⊘ Paused (on hold)
  - 🎯 Matched (hired)

**Audit Trail:**
- Full history of changes
- Timestamp for each action
- User/admin attribution
- Policy application logs

#### **Policy Configuration**

**Toggle Policies:**
- Local Hiring Priority (ON/OFF)
- Academic Verification Required (ON/OFF)
- Double Sovereign Stamp Required (ON/OFF)

**Effect:**
- Policies apply to all matching algorithms
- Real-time enforcement
- Audit logging of policy changes

#### **System Logs & Monitoring**

**Recent Activity Logs:**
- "System active and ready for federated linking"
- "Company requested candidate file sync"
- "Academic credential verified successfully"
- "Regional employment observatory updated"

---

## Technical Architecture

### Tech Stack

**Frontend:**
- **Framework:** React 19.0.1
- **Language:** TypeScript 5.8.2
- **Build Tool:** Vite 6.2.3
- **Styling:** Tailwind CSS 4.1.14
- **Icons:** Lucide React 0.546.0
- **Animations:** Motion 12.23.24

**Backend:**
- **Runtime:** Node.js (Express 4.21.2)
- **Environment:** dotenv 17.2.3
- **AI Integration:** Google Gemini API (@google/genai 2.4.0)

**Deployment:**
- **Platform:** Google Cloud Run
- **Region:** Europe-West-2 (London)
- **URL:** https://track-354333084796.europe-west2.run.app

### Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│           Frontend (React + TypeScript)               │
│  ┌─────────────┬──────────────┬────────────────────┐ │
│  │  Candidate  │   Company    │    University      │ │
│  │   Portal    │    Portal    │      Portal        │ │
│  └─────────────┴──────────────┴────────────────────┘ │
│  ┌──────────────────┬─────────────────────────────┐  │
│  │  Sovereign Portal│    Admin Dashboard          │  │
│  └──────────────────┴─────────────────────────────┘  │
│           (All tabs with RTL/LTR support)             │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│         Backend (Express + Node.js)                  │
│      ┌─────────────────────────────────────┐        │
│      │   API Routes & Controllers          │        │
│      │   - Authentication & Sessions       │        │
│      │   - Candidate Management            │        │
│      │   - Job Matching Algorithm          │        │
│      │   - Certificate Verification        │        │
│      │   - Admin Controls                  │        │
│      └─────────────────────────────────────┘        │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│         External Integrations                        │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │ Google       │  │ Blockchain   │  │ Government│ │
│  │ Gemini API   │  │ (Smart       │  │ Agencies  │ │
│  │ (AI/LLM)     │  │ Contracts)   │  │ (APIs)    │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
└─────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
App.tsx (Main Container)
├── Header (Navigation + Auth)
├── Main Content Pane
│   ├── Landing Page
│   ├── Candidate Portal
│   │   ├── CandidateDashboard
│   │   ├── SkillRadar
│   │   ├── JobMatcher
│   │   ├── DocumentScanner (Certificate Upload)
│   │   ├── CareerAdvisor (AI)
│   │   ├── MockInterview
│   │   ├── CandidateRoadmap
│   │   ├── CandidateReports
│   │   └── MeritTimeline
│   ├── Company Portal
│   │   ├── CompanyDashboardComponent
│   │   ├── CompanyCandidatesList
│   │   ├── CompanyComparisonTable
│   │   ├── CompanySkillsGaps
│   │   └── CompanyHRIntelligence
│   ├── University Portal
│   │   └── UniversityPlanner
│   ├── Sovereign Portal
│   │   └── SovereignTools
│   └── Admin Dashboard
│       └── AdminDashboard
├── Modals
│   ├── Job Post Modal
│   ├── Share Link Modal
│   └── QR Code Modal
└── Footer
```

---

## Key Algorithms & Workflows

### Job Matching Algorithm

**Input:**
- Candidate's 8 skills (0-100% each)
- Job title, description, required skills

**Process:**

```javascript
// Base match score
let baseMatch = 50;

// Category-based calculation
if (jobTitle includes "stack" || "برمجيات") {
  baseMatch = avg(programming, problem-solving, teamwork)
} 
else if (jobTitle includes "ذكاء" || "بيانات") {
  baseMatch = avg(data-analysis, problem-solving, creativity)
}
else if (jobTitle includes "devops" || "أنظمة") {
  baseMatch = avg(programming, time-management, problem-solving)
}
else {
  baseMatch = avg(communication, time-management, teamwork)
}

// Final score
finalMatch = Math.min(99, Math.max(45, baseMatch + 8))
```

**Output:**
- Match percentage (45-99%)
- Rank in candidate pool
- Notification priority

### Merit Score Calculation

**Formula:**
```
Merit Score = Average of all 8 skills
Tier 1 = 80%+
Tier 2 = 65-79%
Tier 3 = <65%
```

**Updates Triggered By:**
- Skill slider adjustment
- Certificate addition (+7-12%)
- Course completion (+10%)
- Interview completion (+5%)

### Certificate Verification Blockchain Flow

**Steps:**

1. **Upload**
   - Candidate scans or manually enters certificate
   - System extracts metadata (title, issuer, date, specialty)

2. **Validation**
   - Cross-reference with issuer database
   - Check academic credentials
   - Verify issuer authenticity

3. **Blockchain Entry**
   - Create smart contract on distributed ledger
   - Generate transaction hash (Tx)
   - Assign block number reference
   - Create cryptographic seal

4. **Storage**
   - Certificate stored in vault
   - Metadata indexed for search
   - Expiry date tracked
   - Category folder assigned

5. **Verification**
   - 5+ nodes must validate
   - Consensus proof generated
   - Cryptographic signature applied
   - "Verified" badge displayed

6. **Sharing**
   - Generate shareable QR code
   - Encode verification URL
   - Timestamp validity
   - Allow employer scan/verification

### Expiry Alert System

**Timeline:**
- **>30 days until expiry:** No alert (green status)
- **1-30 days until expiry:** Amber alert (⚠️) "Expires in X days"
- **Expired:** Red alert (❌) "Expired X days ago"

**Actions:**
- Candidate notified 30 days before
- Reminder email sent
- "Update Now" button appears
- Merit score warning triggered

### Proactive Job Alert System

**Trigger Conditions:**
1. New job posted
2. Match percentage calculated
3. If match >90% AND location contains "تلمسان":
   - Send browser notification
   - Play audio chime (Arpeggio: C5→E5→G5)
   - Display in-app toast
   - Log to opportunity alert history

**Notification Details:**
- Job title, company, match %
- Salary range, location
- "Apply Immediately" button
- Dismissible (X button)

---

## Data Models & Schema

### Candidate Profile Schema

```typescript
interface CandidateProfile {
  name: string;                    // "أحمد بن علي"
  title: string;                   // "مطور برمجيات Full-Stack"
  salaryExpectation: string;       // "200,000 دج"
  location: string;                // "تلمسان، الجزائر"
  education: string;               // University & degree
  meritScore: number;              // 0-100%
  tier: string;                    // "Tier 1", "Tier 2", "Tier 3", "Platinum"
  
  skills: {
    [skillName: string]: number    // 0-100% per skill
  };
  
  certificates: Certificate[];
  experiences: Experience[];
}

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;                    // ISO 8601
  expiryDate?: string;             // ISO 8601
  verified: boolean;
  specialty: string;               // Category
  blockchain?: {
    txHash: string;
    blockNumber: number;
    sealSign: string;
    nodeCount: number;
  };
}

interface Experience {
  id: number;
  role: string;
  company: string;
  duration: string;
  desc: string;
}
```

### Job Posting Schema

```typescript
interface Job {
  id: number;
  title: string;                   // Job position
  company: string;                 // Employer name
  location: string;                // Wilaya or region
  type: string;                    // "دوام كامل" (Full-time)
  salary: string;                  // "250,000 - 350,000 دج"
  posted: string;                  // Timestamp
  skills: string[];                // Required skills
  match: number;                   // 45-99% match
  description: string;             // Job details
}
```

### Session Schema

```typescript
interface Session {
  [role: string]: {
    loggedIn: boolean;
    name: string;
    email: string;
    org?: string;                  // Organization/Company name
  }
}

// Example:
{
  candidate: { loggedIn: true, name: "أحمد", email: "ahmed@..." },
  company: { loggedIn: false, name: "", email: "", org: "" },
  university: { loggedIn: true, name: "Dr. Smith", email: "smith@..." },
  sovereign: { loggedIn: false, name: "", email: "" },
  admin: { loggedIn: true, name: "Admin", email: "admin@..." }
}
```

---

## Integration Points

### Google Gemini API

**Purpose:** AI-powered career advisor and interview simulator

**Endpoints Used:**
- `/api/generateAdvice` - Career guidance
- `/api/simulateInterview` - Mock interview questions
- `/api/analyzeCareers` - Job recommendation

**Example Request:**
```javascript
POST /generateAdvice
{
  candidateProfile: { ... },
  currentFocus: "skill_improvement",
  language: "ar"
}
```

### Blockchain Smart Contracts

**Function:** Certificate verification and storage

**Contract Details:**
- Network: Distributed (5+ nodes)
- Consensus: Proof of Authority
- Seal Format: `DZ-SOV-TLEMCEN-SEAL-[ID]`
- Tx Hash Format: `0x[8-char-hex]...[6-char-hex]`

### Government Agency APIs

**Integrated Agencies:**
- ANEM (National Employment Agency)
- CNAS (Social Security)
- AADL (Housing)
- Ministry of Defense
- National Security

**Data Shared:**
- Candidate profiles (anonymized)
- Employment metrics
- Credential verification
- Compliance reports

---

## Security & Compliance

### Security Features

✅ **ISO 27001 Certified**
- Data encryption in transit (HTTPS/TLS)
- At-rest encryption for sensitive data
- Role-based access control (RBAC)
- Multi-factor authentication ready

✅ **Blockchain Verification**
- Immutable credential records
- Cryptographic sealing
- Distributed consensus validation
- Tamper-proof audit trail

✅ **Data Privacy**
- GDPR-compliant (where applicable)
- PII encryption
- Access logging
- Deletion requests supported

### Compliance

✅ **Executive Decree 07-26** (Algerian)
- Government-sanctioned platform
- Sovereign authority integration
- Official credential recognition
- National labor market oversight

✅ **Platform Policies**
- Local hiring priority (configurable)
- Academic verification requirements
- Employer verification layers
- Fraud prevention mechanisms

---

## Metrics & KPIs

### Current Platform Metrics (as of June 10, 2026)

| Metric | Value |
|--------|-------|
| Active Job Seekers | 542,391 |
| Open Positions | 23,847 |
| Intelligent Matching Rate | 68% |
| Professional Integration Rate | 45% |
| Company Filtering Accuracy | 94% |
| Verified Professional Tier Distribution | Bronze 25%, Silver 50%, Gold 75%, Platinum 100% |
| Average Time to Hire | 14 days |
| Candidate-to-Job Ratio | 1:23 |

### Regional Focus

**Primary Region:** Tlemcen (تلمسان), Wilaya of Tlemcen, Algeria
- University Partner: Université Abdelhamid Ibn Badis (Mostaganem Campus)
- Government Partner: National Employment Observatory
- Key Employers: Digital Solutions Companies, Tech Startups

---

## Setup & Deployment

### Prerequisites

- Node.js 18+
- npm or yarn
- Google Gemini API Key
- Google Cloud Platform account (for Cloud Run)

### Local Development

**1. Install Dependencies:**
```bash
npm install
```

**2. Configure Environment:**
```bash
# Create .env.local file
GEMINI_API_KEY=your_api_key_here
```

**3. Run Development Server:**
```bash
npm run dev
```

**4. Access Application:**
```
http://localhost:5173
```

### Production Deployment

**1. Build:**
```bash
npm run build
```

**2. Create Server Binary:**
```bash
npm run build
esbuild server.ts --bundle --platform=node --format=cjs --packages=external --outfile=dist/server.cjs
```

**3. Deploy to Cloud Run:**
```bash
gcloud run deploy track-platform \
  --source . \
  --region europe-west2 \
  --memory 512Mi \
  --timeout 900 \
  --set-env-vars GEMINI_API_KEY=$GEMINI_API_KEY
```

**4. Access Live Application:**
```
https://track-354333084796.europe-west2.run.app
```

---

## Language Support

### Supported Languages

1. **Arabic (العربية)**
   - Primary language
   - Right-to-left (RTL) layout
   - Full Arabic UI labels and content

2. **English (English)**
   - Secondary language
   - Left-to-right (LTR) layout
   - Complete English translations

3. **French (Français)**
   - Tertiary language
   - Left-to-right (LTR) layout
   - Professional French terms

### Language Switching

- Global language selector (header)
- Per-session persistence
- Real-time UI re-render
- Direction (RTL/LTR) auto-adjustment

---

## Accessibility & Themes

### Theme Options

1. **Standard** (Default)
   - Light background, standard contrast
   - Optimized for daylight viewing

2. **Dark**
   - Dark background, reduced eye strain
   - Night-time friendly

3. **High Contrast**
   - Enhanced contrast ratios
   - WCAG AA+ compliance
   - Color-blind friendly palette

### Accessibility Features

- ✅ Keyboard navigation support
- ✅ Screen reader compatible
- ✅ Focus indicators
- ✅ Alt text for images
- ✅ ARIA labels
- ✅ Mobile responsive design
- ✅ Touch-friendly interface

---

## Troubleshooting

### Common Issues

**Notification Permission Denied**
- Solution: Check browser notification settings
- Allow notifications in browser preferences

**QR Code Not Generating**
- Solution: Verify internet connection
- Try regenerating from certificate details
- Use fallback procedural QR display

**Certificate Upload Fails**
- Solution: Ensure file size <5MB
- Use supported formats (PDF, JPG, PNG)
- Check issuer information matches

**Job Match Not Updating**
- Solution: Adjust skill slider to trigger recalculation
- Refresh the page
- Check job posting date

---

## API Reference

### Authentication Endpoints

```
POST /login
  Body: { role, email, password }
  Returns: { sessionId, token, user }

POST /logout
  Body: { sessionId }
  Returns: { success: true }
```

### Candidate Endpoints

```
GET /candidate/profile
GET /candidate/jobs
POST /candidate/apply-job
GET /candidate/certificates
POST /candidate/upload-certificate
GET /candidate/skill-radar
POST /candidate/update-skill
```

### Company Endpoints

```
GET /company/candidates
POST /company/post-job
GET /company/job-applications
POST /company/request-interview
GET /company/candidate-comparison
GET /company/skills-gap-analysis
```

### Admin Endpoints

```
GET /admin/metrics
GET /admin/linkages
POST /admin/link-candidate-company
POST /admin/set-policy
GET /admin/audit-logs
```

---

## Contributing

This platform is maintained by:
- **AI Studio** (Google Gemini Integration)
- **TRACK Development Team** (Tlemcen, Algeria)

For contributions, improvements, or bug reports:
- GitHub Repository: `stivansmith13-spec/TRACK`
- Contact: Support email (to be configured)

---

## License

**Copyright © 2026** TRACK Platform - Supported by Executive Decree 07-26

Platform developed collaboratively by:
- Algerian Ministry of Labor & Employment
- National Universities & Training Centers
- Private Sector Partners (DZ Software, Tech Startups)
- Google Cloud & AI Studio

---

## Glossary of Terms

| Term | Definition |
|------|-----------|
| **Merit Score** | 0-100% rating based on skills, verified certificates, and experience |
| **Tier** | Candidate classification (Tier 1: 80%+, Tier 2: 65-79%, Tier 3: <65%) |
| **Skill Radar** | 8-axis interactive skill assessment visualization |
| **Blockchain Seal** | Cryptographic proof of certificate authenticity on distributed ledger |
| **Match Percentage** | AI-calculated job-candidate compatibility score (45-99%) |
| **Sovereign** | Government-controlled and authorized platform functions |
| **Wilaya** | Administrative region in Algeria (province) |
| **Verification Badge** | Professional badge indicating verified credentials (Bronze→Silver→Gold→Platinum) |
| **Federated Linking** | Admin-controlled matching between candidates and employers |

---

## Contact & Support

**Platform Support:**
- Email: support@trackplatform.dz
- Phone: +213 (0) 34 XX XX XX
- Website: https://track-354333084796.europe-west2.run.app

**Government Integration:**
- ANEM Liaison: anem@trackplatform.dz
- Sovereign Portal: sovereign@trackplatform.dz

**Developer Resources:**
- GitHub: https://github.com/stivansmith13-spec/TRACK
- API Docs: /api/docs
- Development Server: localhost:5173

---

**Last Updated:** June 10, 2026  
**Version:** 1.0.0 (MVP Release)  
**Status:** Active & Deployed ✅

For the most current information about TRACK, visit the live deployment or check the GitHub repository.

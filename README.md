# Lencana Malaysia: Cross-Curricular 3D Badges LMS Platform 🇲🇾

**A Cross-Curricular 3D Badges Learning Management System Platform to Inspire National Identity and Holistic Education**

An innovative Learning Management System (LMS) that integrates 3D interactive badge-based learning to foster national identity and holistic education. Designed to align with Malaysia's national curriculum (KSSR & KSSM), this platform uses gamification, immersive storytelling, and digital representations of Malaysian national honours to make civic values and multidisciplinary learning engaging and meaningful.

**Version:** 2.0.0 - Cross-Curricular LMS Platform  
**Live Demo:** [https://lencana-malaysia.vercel.app/](https://lencana-malaysia.vercel.app/)

---

![Lencana Malaysia App Preview](https://via.placeholder.com/800x400?text=Interactive+Preview+of+Lencana+Malaysia+App)
*Caption: Explore the rich history of Malaysian honors and track your learning progress.*

## 📚 Table of Contents
- [Platform Overview](#-platform-overview)
- [Cross-Curricular Features](#-cross-curricular-features)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Curriculum Alignment](#-curriculum-alignment)
- [Tech Stack](#-tech-stack)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Platform Overview

Lencana Malaysia is a comprehensive **Cross-Curricular Learning Management System** that transforms Malaysian national honours education into an engaging, multi-subject learning experience. The platform integrates authentic Malaysian badges like **Datuk Seri Maharaja Lela**, **Pingat Jasa Malaysia (PJM)**, and **Kesatria Mangku Negara (KMN)** with curriculum-aligned activities spanning 14 subjects.

### 🎯 Key Objectives
- **Integrate National Identity** into daily learning across all subjects
- **Foster Cross-Curricular Connections** between History, Languages, Science, and Moral Education
- **Champion Values-Based Education** through Rukun Negara and ethical principles
- **Modernize Heritage Education** with 3D visualization and gamified learning

## 🎓 Cross-Curricular Features

### 📚 Subject Integration (14 Subjects Covered)
| Subject Area | Learning Activities | Assessment Methods |
|--------------|--------------------|-----------------|
| **Bahasa Malaysia & English** | Bilingual essays, speeches, and presentations on national service | Structured writing assessments and oral presentations |
| **Sejarah (History)** | Research historical recipients and independence contributions | Timeline creation and critical analysis projects |
| **Pendidikan Sivik/Moral** | Analyze values of courage, sacrifice, and unity in badge recipients | Reflection essays and community service projects |
| **Science & Mathematics** | Research Malaysian scientists and analyze development statistics | Data analysis projects and scientific research reports |
| **ICT & Design Technology** | Create digital portfolios and 3D badge prototypes | Digital project submissions and design presentations |
| **Visual Arts & Music** | Design artistic interpretations and cultural expressions | Creative portfolio development and cultural presentations |

### 🎯 Learning Outcomes
- **KSSR Alignment**: Primary curriculum themes and standards
- **KSSM Alignment**: Secondary curriculum integration
- **Cross-Curricular Skills**: Critical thinking, research, and communication
- **Values Education**: Rukun Negara principles and national identity

## 🏢 Architecture

### 💻 System Components
```
lencana-malaysia/
├── src/
│   ├── components/   # UI components (CurriculumDashboard, BadgeExplorer)
│   ├── data/         # Curriculum-aligned badge data
│   └── assets/       # 3D models and badge images
├── hooks/            # React hooks for data management
├── lib/              # API client and utilities
├── backend/          # Express.js API server
│   ├── routes/       # API endpoints (badges, curriculum, progress)
│   └── server.js     # Main server configuration
└── Documentation files
```

### 🔄 Key Features
- **6 Unique Badges**: Knowledge Seeker, Collaborator, Innovator, Community Leader, Mentor, Achiever
- **3D GLB Models**: Interactive rotating badges with proper lighting
- **Modal Details**: Comprehensive information including earning criteria
- **Smart Filtering**: Search, category, and rarity filters
- **Statistics Dashboard**: Overview of total badges, categories, points, and rarity levels
- **Educational Impact Section**: Information about Malaysian educational values
- **Curriculum Dashboard**: Teacher interface with KSSR/KSSM alignment tracking
- **Assessment System**: Progress tracking and cross-curricular evaluation
- **Multi-Language Support**: Bahasa Malaysia, English, Mandarin, Tamil ready
- **Offline Capability**: PWA functionality for rural and low-connectivity areas

## 🚀 Getting Started

### Prerequisites

* A modern web browser (Chrome, Firefox, Safari, Edge)
* Node.js 18+ (if running locally)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/kk666679/lencana.git
   cd lencana
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Start development servers**
   ```bash
   npm run dev:full    # Starts both frontend and backend
   # OR separately:
   npm run dev         # Frontend only (port 5173)
   npm run backend:dev # Backend only (port 3001)
   ```

4. **Access the platform**
   - **Frontend**: http://localhost:5173
   - **Backend API**: http://localhost:3001/api

### Production Deployment

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

### Frontend
* **Framework**: React 19 + Vite
* **3D Rendering**: Three.js and React Three Fiber
* **UI Design**: Responsive design with Tailwind CSS
* **UI Components**: Modern components from shadcn/ui
* **Performance**: Optimized for performance and accessibility
* **State Management**: React Hooks + Context API

### Backend
* **Runtime**: Node.js + Express.js
* **API**: RESTful endpoints for curriculum management
* **Data**: JSON-based curriculum and badge data
* **Authentication**: Ready for integration

### Technical Implementation
* **Built with**: React + Vite for fast development
* **3D Models**: Interactive GLB models with proper lighting
* **Responsive**: Mobile-first design approach
* **Accessibility**: WCAG compliant components
* **Performance**: Code splitting and lazy loading

### Deployment
* **Frontend**: Vercel/Netlify compatible
* **Backend**: Node.js hosting (Railway, Render, etc.)
* **Database**: Ready for PostgreSQL/MongoDB integration

## 📚 Curriculum Alignment

### KSSR (Primary) Integration
- **Tahun 1-3**: Basic national identity and community values
- **Tahun 4-6**: Historical awareness and civic responsibility
- **Cross-Curricular Themes**: Unity, heritage, and national pride

### KSSM (Secondary) Integration
- **Tingkatan 1-3**: Advanced historical analysis and critical thinking
- **Tingkatan 4-5**: Research projects and community leadership
- **Assessment Standards**: Aligned with national curriculum objectives

### Subject Coverage
| Education Level | Subjects Integrated | Learning Outcomes |
|----------------|--------------------|-----------------|
| **Primary (KSSR)** | BM, English, Sejarah, Pendidikan Sivik | Basic national identity, community values |
| **Secondary (KSSM)** | All 14 subjects | Advanced analysis, research skills, leadership |

## 📝 Documentation

- **[Implementation Guide](README_IMPLEMENTATION.md)** - Technical setup and architecture
- **[Curriculum Alignment](CURRICULUM_ALIGNMENT.md)** - Detailed KSSR/KSSM integration
- **[Cleanup Summary](CLEANUP_SUMMARY.md)** - Project optimization details

## 🤝 Contributing

We welcome contributions to enhance the Cross-Curricular LMS Platform! Areas for contribution:

- **Curriculum Content**: Additional Malaysian national honours and historical context
- **Cross-Curricular Activities**: New learning activities for different subjects
- **Assessment Tools**: Rubrics and evaluation methods for teachers
- **Localization**: Multi-language support (BM, English, Mandarin, Tamil)
- **Technical Improvements**: Performance optimization and new features

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/curriculum-enhancement`)
3. Commit changes (`git commit -m 'Add new curriculum activities'`)
4. Push to branch (`git push origin feature/curriculum-enhancement`)
5. Open Pull Request

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE.md](LICENSE.md) file for details. All historical and badge information is based on publicly available resources.

## 🙏 Acknowledgments

* Jabatan Perdana Menteri (JPM) and related Malaysian institutions for information on national honors.
* The open-source community for the invaluable tools and libraries that power this project.
* All contributors and history enthusiasts who help preserve and share this knowledge.

---

**Built with ❤️ for Malaysian Education**  
*Inspiring National Identity and Holistic Education through Cross-Curricular 3D Badges*

**Repository**: [https://github.com/kk666679/lencana](https://github.com/kk666679/lencana)  
**Version**: 2.0.0 - Cross-Curricular LMS Platform

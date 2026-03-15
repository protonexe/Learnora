# Learnora

A modern, mobile-friendly educational platform with multi-role support for Students, Teachers, and Parents.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

### Core Features
- Multi-role authentication (Student, Teacher, Parent)
- Interactive dashboard with progress tracking
- Course management and viewing
- Interactive quizzes with scoring
- Flashcard system with swipe gestures
- AI Tutor chat interface
- Analytics and progress tracking
- Note-taking system
- Assignment tracking

### Hardware & Security (Native App)
- **NFC Smart Badges**: Login via physical NFC tap (NDEF, Mifare, IsoDep). Supports background waking.
- **True Kiosk Mode**: Device owner lockdown. Disables Android navigation/status bars and prevents escaping the app without an admin password. 
- **Hardware Back Interception**: Secure navigation routing that respects Kiosk constraints.

### Mobile & PWA
- Responsive design (mobile, tablet, desktop)
- Bottom navigation bar (mobile)
- Touch-optimized interactions
- Swipe gestures on flashcards
- PWA installable
- Offline support with service worker
- Pull-to-refresh functionality

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/protonexe/learnora.git
cd learnora

# Install dependencies
npm install


```

### Running the App

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5500`

## Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| Student | `emma.wilson` | `pass123` |
| Teacher | `mr.johnson` | `teacher123` |
| Parent | `parent.wilson` | `parent123` |

Or click "Skip to Demo" on the login page for quick access.

## Project Structure

```
learnora/
├── index.html              # Main entry point
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker
├── css/                    # Stylesheets
│   ├── variables.css       # CSS variables
│   ├── base.css            # Base styles
│   ├── animations.css      # Animation definitions
│   ├── components.css      # Component styles
│   └── mobile.css          # Mobile responsive styles
├── js/                     # JavaScript files
│   ├── App.js              # Main application
│   ├── components/         # React components
│   │   ├── ui/             # UI components
│   │   ├── layout/         # Layout components
│   │   ├── features/       # Feature components
│   │   └── views/          # View components
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom hooks
│   ├── utils/              # Utility functions
│   └── data/               # Sample data
└── package.json            # Dependencies & scripts
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- iOS Safari 12+
- Chrome for Android

## Deployment

### Android Screen Pinning

When a student logs in, the app will request **screen pinning** - Android's built-in feature that keeps the app in the foreground. This doesn't require device owner privileges.

- Students can still access the recent apps screen by swiping up
- To unpin: tap the recent apps button, then long-press the Learnora app icon and select "Unpin"
- The screen will stay awake while pinned

### Web Deployment (GitHub Pages)
No build step required. Just push to your repository and enable GitHub Pages in the repository settings.

### Vercel/Netlify
Connect your GitHub repository. No build command needed - set the publish directory to `/` (root).

## Technologies

- HTML5/CSS3/JavaScript (ES6+)
- React (via CDN)
- Service Workers for PWA functionality
- LocalStorage for session management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and development process.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons by [Feather Icons](https://feathericons.com/)
- Built with modern web standards
- Inspired by modern educational platforms

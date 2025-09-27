# DeepLure Research Task - Movable Modal Component

A modern, accessible, and responsive movable modal component built with React, Vite, and TailwindCSS. This project demonstrates a flexible modal overlay system that allows users to drag and reposition modal windows within the viewport while maintaining full functionality and accessibility.

## 🚀 Features

### Core Functionality
- **Drag & Drop**: Click and drag modal headers to reposition anywhere within the viewport
- **Viewport Constraints**: Modals are automatically constrained within visible screen boundaries
- **Multiple Instances**: Support for multiple simultaneous modal windows
- **Smooth Animations**: Fluid drag feedback with visual state changes

### Accessibility & UX
- **Focus Management**: Automatic focus trapping within modal content
- **Keyboard Navigation**: Full keyboard support including ESC to close and Tab navigation
- **Screen Reader Support**: Proper ARIA labels and modal semantics
- **Touch Support**: Full mobile and tablet touch interaction support

### Technical Features
- **Responsive Design**: Works seamlessly across all screen sizes
- **Performance Optimized**: Efficient event handling and re-rendering
- **Modern React**: Built with React 18 hooks and best practices

## 🛠️ Technologies

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **Docker** - Containerization for deployment
- **Nginx** - Production web server

## 📦 Quick Start

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   ```
   http://localhost:5173
   ```

### Production Build

```bash
npm run build
npm run preview
```

## 🐳 Docker Deployment

```bash
# Build and run with Docker
docker build -t movable-modal-app .
docker run -p 8080:80 movable-modal-app

# Access at http://localhost:8080
```

## 🎯 Usage Demo

The application includes a comprehensive demo with:

- **Interactive Dashboard**: Task management with live updates
- **Multiple Modal Types**: Settings, Profile, Notifications, and Help modals
- **Real-time Features**: All functionality works while modals are open
- **Mobile Support**: Full touch interaction for mobile devices

### Key Interactions:
- **Desktop**: Click and drag modal headers to move
- **Mobile**: Touch and drag modal headers
- **Keyboard**: ESC to close, Tab for navigation
- **Accessibility**: Full screen reader support

## 🎨 Component API

```jsx
<MovableModal
  isOpen={true}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  initialPosition={{ x: 100, y: 100 }}
>
  <p>Your content here</p>
</MovableModal>
```

## 🚀 Deployment

The Docker container includes:
- Multi-stage build for optimized size
- Nginx with security headers
- Built application as `dist.tar.gz`
- Production-ready configuration

## 📱 Browser Support

- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Mobile browsers with full touch support
- WCAG 2.1 AA accessibility compliant

## 🎯 Demo Instructions

1. **Open Multiple Modals**: Click buttons in the dashboard to open different modals
2. **Drag to Move**: Click and drag modal headers to reposition them
3. **Test Boundaries**: Try dragging modals to screen edges (they'll stay within bounds)
4. **Mobile Testing**: Use touch gestures on mobile devices
5. **Accessibility**: Use keyboard navigation and screen readers

## 🔧 Technical Implementation

### Component Features
- Mouse and touch drag support
- Viewport boundary detection
- Focus trapping and management
- Multiple modal instance handling
- Responsive design with TailwindCSS

### Performance Optimizations
- Efficient event handling
- Minimal re-renders during drag
- Optimized bundle size
- Fast interaction response

---

**Created for DeepLure Research Task**  
*Demonstrating modern React development with accessibility and UX best practices*
# Personal Portfolio Website

A modern, responsive portfolio website built with cutting-edge web technologies and a focus on typography and design.

## Tech Stack

- **Framework**: [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- **CSS Framework**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Typography**: 
  - [Inter](https://rsms.me/inter/) - A variable font family
  - Monospace Font Collection (Argon, Krypton, Neon, Radon, Xenon variants)

## Key Features

- **Responsive Design**
  - Fluid typography using CSS `clamp()` function
  - Responsive grid layouts with Tailwind CSS
  - Mobile-first approach
  - Custom breakpoints and spacing system

- **Advanced CSS Features**
  - Custom utility classes for responsive text
  - Variable fonts support
  - CSS Grid with auto-fit and minmax
  - Custom color palette with OKLCH colors
  - Mix blend modes for creative effects
  - Pattern backgrounds (hatch, dots, graph paper)

- **Performance**
  - Modern module bundling with Vite
  - Optimized font loading with variable fonts
  - Component-based HTML structure
  - CSS layer organization for better specificity management

- **Design System**
  - Modular spacing scale
  - Consistent typography scale
  - Custom color themes
  - Reusable shape components
  - Flexible grid systems

## Project Structure

```
my-site/
├── index.html
├── style_specimin.html
├── src/
│   └── html/
│       ├── head.html
│       ├── nav.html
│       └── footer.html
├── pages/
│   ├── gallery.html           # Auto-generated gallery page
│   ├── journal.html           # Auto-generated journal page (with pagination)
│   ├── web-design-project.html
│   ├── brand-identity-project.html
│   └── ... (add your project pages here)
├── scripts/
│   └── build-portfolio.js     # Portfolio build script
├── package.json
└── ...
```

## Development & Build

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (auto-generates gallery/journal)
npm run build

# Or just generate gallery/journal pages
npm run build:portfolio
```

## How to Add New Projects

1. **Create a new HTML file in `pages/`** (e.g., `pages/my-new-project.html`)
2. **Add metadata in the `<head>`**:
   ```html
   <load src="../src/html/head.html" title="Project Title - Your Name" />
   <meta name="description" content="Short project description" />
   <meta name="date" content="YYYY-MM-DD" />
   ```
3. **Add a main image** somewhere in the page (the first `<img src="...">` will be used in the gallery/journal)
4. **Run the build**: `npm run build:portfolio` or `npm run build`

## Navigation

Update your navigation links to:
```html
<a href="/pages/gallery.html">Gallery</a>
<a href="/pages/journal.html">Journal</a>
```

## Browser Support

This project uses modern CSS features including:
- CSS Grid
- CSS Custom Properties (variables)
- CSS Clamp
- Variable Fonts
- Mix Blend Modes

Ensure you're using a modern browser that supports these features.

## License

[Add your license information here]
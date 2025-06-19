  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
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

# Project Structure

# Expanded Notes 
# Personal Portfolio Website

A modern, responsive portfolio website built with cutting-edge web technologies and a focus on typography and design.

## Tech Stack

### Vite - Build Tool
**Context**: Modern build tool that provides fast development server and optimized production builds
**File**: `vite.config.ts`
```typescript
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import injectHTML from "vite-plugin-html-inject";
export default defineConfig({
  plugins: [tailwindcss(), injectHTML()],
});
```

### Tailwind CSS - Styling Framework
**Context**: Utility-first CSS framework for rapid UI development
**File**: `src/style.css`
```css
@import "tailwindcss";
```

## Key Features

### Responsive Typography
**Context**: Text that automatically scales based on viewport width using modern CSS
**File**: `src/style.css` (lines 380-402)
```css
.responsive-text-sm {
  font-size: clamp(0.875rem, 3vw, 1.5rem);
}

.responsive-text {
  font-size: clamp(1rem, 5vw, 3rem);
}

.responsive-text-lg {
  font-size: clamp(2.5rem, 10vw, 4rem);
}
```

### Custom Color System
**Context**: Comprehensive color palette using OKLCH color space for better color reproduction
**File**: `src/style.css` (lines 60-85)
```css
--color-trueblack: #243131;
--color-truewhite: oklch(98.4% 0.003 247.858);
--color-trueblue: #0e65ac;
--color-trueyellow: #fad13e;
--color-truered: #df4c40;
--color-trueorange: #ed9734;
--color-truegreen: #62b862;
--color-trueviolet: #7f61c5;
--color-flviolet: #ac6aff;
--color-flblue: #3dbefe;
--color-florange: #ff711e;
```

### Custom Spacing Scale
**Context**: Modular spacing system for consistent layout
**File**: `src/style.css` (lines 90-100)
```css
--spacing-ms4xl: 14rem;
--spacing-ms3xl: 9rem;
--spacing-ms2xl: 5.75rem;
--spacing-msxl: 4rem;
--spacing-mslg: 3rem;
--spacing-ms: 2rem;
--spacing-mssm: 1.25rem;
--spacing-msxs: 0.5rem;
--spacing-msxxs: 0.25rem;
```

### Variable Fonts
**Context**: Modern font technology that allows smooth interpolation between font weights and styles
**File**: `src/style.css` (lines 5-50)
```css
@font-face {
  font-family: "MonaspaceArgon";
  src:
    url("../fonts/MonaspaceArgonVarVF[wght,wdth,slnt].woff2") format("woff2"),
    url("../fonts/MonaspaceArgonVarVF[wght,wdth,slnt].woff") format("woff");
  font-weight: 100 900;
  font-stretch: 75% 125%;
  font-style: normal italic;
}
```

### CSS Grid Systems
**Context**: Multiple grid layouts for different use cases
**File**: `src/style.css` (lines 320-370)
```css
.mygrid {
  @apply grid gap-mssm xl:gap-ms xl:grid-cols-12;
}

.wrapgrid {
  display: grid;
  gap: var(--spacing-mssm, 1rem);
  grid-template-columns: repeat(1, minmax(0, 1fr));
  @variant sm { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @variant md { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  @variant lg { grid-template-columns: repeat(6, minmax(0, 1fr)); }
  @variant xl { 
    gap: var(--spacing-ms, 1rem);
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
  @variant 2xl { grid-template-columns: repeat(12, minmax(0, 1fr)); }
}

.autogrid {
  @apply grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-mssm xl:gap-ms;
}
```

### Pattern Backgrounds
**Context**: Custom CSS patterns for visual interest
**File**: `mystyle.css` (lines 221-296)
```css
.hatchblue {
  @apply mix-blend-multiply;
  background-image: linear-gradient(
    135deg,
    var(--color-transparent) 40%,
    var(--color-trueblue) 40%,
    var(--color-trueblue) 50%,
    var(--color-transparent) 50%,
    var(--color-transparent) 90%,
    var(--color-trueblue) 90%,
    var(--color-trueblue) 100%
  );
  background-size: 12px 12px;
  color: var(--color-trueblue);
}
```

### CSS Shapes
**Context**: Geometric shapes created with pure CSS
**File**: `mystyle.css` (lines 1-25)
```css
.triangle {
  background: var(--color-trueyellow);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  width: 242px;
  height: 210px;
}

.square {
  background: var(--color-truered);
  border-radius: 1%;
  width: calc(1000px / 5);
  height: calc(1000px / 5);
}

.circle {
  background: var(--color-trueblue);
  border-radius: 50%;
  width: calc(1000px / 4.6);
  height: calc(1000px / 4.6);
}
```

## How to Edit the Site

### Adding New Colors
**File**: `src/style.css` (lines 60-85)
1. Add your color variable in the `@theme` section:
```css
--color-yourcolor: #hexcode;
--color-yourcolor-light: oklch(85% 0.05 250);
--color-yourcolor-dark: oklch(25% 0.05 250);
```
2. Use it in your HTML with: `class="text-yourcolor"` or `class="bg-yourcolor"`

### Adding New Pages
**Files**: Create new HTML files in root directory
1. Copy structure from `index.html`
2. Update the title in the `<load src="src/html/head.html" title="Your Title" />` tag
3. Add your content in the `<body>` section

### Adding New Fonts
**File**: `src/style.css` (lines 5-50)
1. Add `@font-face` declaration in the font section
2. Create font utility class in the base layer:
```css
.font-yourfont {
  font-family: "YourFont", sans-serif;
}
```

### Adding New Spacing Values
**File**: `src/style.css` (lines 90-100)
1. Add to the `@theme` section:
```css
--spacing-yoursize: 1.5rem;
```
2. Use with: `class="p-yoursize"`, `class="m-yoursize"`, etc.

### Adding New Utility Classes
**File**: `src/style.css` (lines 320-402)
1. Add to the `@layer utilities` section:
```css
.your-utility {
  /* your styles */
}
```

### Adding New Components
**File**: `src/html/` directory
1. Create new HTML component files
2. Include with: `<load src="src/html/yourcomponent.html" />`

### Adding New CSS Patterns
**File**: `mystyle.css`
1. Add your pattern class:
```css
.yourpattern {
  background-image: /* your pattern */;
  background-size: /* size */;
}
```

## Project Structure


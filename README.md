# Ariel Churi Portfolio

A personal portfolio website showcasing work across UX/UI design, hardware prototyping, interactive installations, and educational products.

## Technical Stack

- **Frontend**: Vanilla HTML, CSS, and JavaScript
- **CSS Framework**: Skeleton CSS (lightweight responsive boilerplate)
- **CSS Processing**: Tailwind CSS (standalone CLI)
- **Typography**: Inter font family
- **Build Tools**: None - static site with manual CSS processing

## Project Structure

```
portfolio/
├── index.html              # Main portfolio page
├── css/
│   ├── input.css           # Tailwind input file with custom styles
│   ├── styles.css          # Generated CSS output
│   ├── normalize.css       # CSS reset
│   └── skeleton.css        # Skeleton framework
├── fonts/
│   └── inter.css           # Inter font declarations
├── images/                 # Project images and assets
├── myscript.js            # Main JavaScript functionality
└── p_*.html               # Individual project pages
```

## Development Setup

### Prerequisites
- Tailwind CSS standalone CLI tool installed

### CSS Processing

The site uses Tailwind CSS for utility classes combined with custom CSS. To process the styles:

**Build CSS once:**
```bash
tailwindcss -i css/input.css -o css/styles.css
```

**Watch for changes (recommended for development):**
```bash
tailwindcss -i css/input.css -o css/styles.css --watch
```

### File Structure for Styling

- `css/input.css` - Contains Tailwind directives and custom CSS
- `css/styles.css` - Generated output file (do not edit directly)
- `css/normalize.css` - CSS reset
- `css/skeleton.css` - Skeleton framework styles

## Styling Approach

### Tailwind Integration
The project uses Tailwind CSS v4 with a hybrid approach:

1. **Tailwind Utilities**: Available for layout, spacing, and responsive design
2. **Custom CSS**: Extensive custom styles for typography, animations, and project-specific design
3. **CSS Custom Properties**: Color scheme and spacing defined in `:root`

### Key Style Categories

#### Typography
- **Font**: Inter with extensive OpenType features
- **Scale**: Custom heading sizes (h1: 6rem, h2: 5rem, h3: 2rem)
- **Colors**: Custom color palette with CSS variables

#### Layout
- **Grid**: Skeleton CSS 12-column grid system
- **Responsive**: Mobile-first approach with custom breakpoints
- **Spacing**: Custom spacing variables and Tailwind utilities

#### Animations
- **Scroll Reveal**: JavaScript-powered scroll animations
- **Hover Effects**: Custom hover states for interactive elements
- **Transitions**: Smooth transitions for UI interactions

#### Color Scheme
```css
--black: #243131
--accent: hotpink
--gray3: #666581
--gray2: #9190aa
--gray1: #d7d6ec
--white: whitesmoke
--yellow: #fad13e
--red: #df4c40
--blue: #005eac
```

## JavaScript Features

### Main Functionality (`myscript.js`)
- **Scroll Animations**: Reveal sections on scroll
- **Contact System**: Dynamic contact information display
- **Navigation**: Return and resume buttons
- **Footer**: Auto-generated footer with contact info

### Key Functions
- `reveal()` - Handles scroll-triggered animations
- `showDiv()` - Toggles contact information display
- Dynamic content injection for navigation and footer

## Content Structure

### Main Page (`index.html`)
- Hero section with personal introduction
- Project case studies with descriptions and images
- Contact information system

### Project Pages (`p_*.html`)
- Detailed case studies for each project
- Consistent layout and navigation
- Project-specific content and images

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Progressive enhancement approach
- Graceful degradation for older browsers

## Performance Considerations

- Static site with no build process
- Optimized images in multiple formats (JPG, WebP)
- Minimal JavaScript footprint
- CSS processed for production use

## Deployment

This is a static site that can be deployed to any web server or static hosting service:
- GitHub Pages
- Netlify
- Vercel
- Traditional web hosting

No build step required - just upload the files as-is.

## Maintenance

### Adding New Projects
1. Create new `p_projectname.html` file
2. Add project section to `index.html`
3. Add project images to `images/` directory
4. Update navigation if needed

### Styling Changes
1. Edit `css/input.css`
2. Run Tailwind build command
3. Test changes in browser

### Content Updates
- Edit HTML files directly
- No build process required
- Refresh browser to see changes

## License

Portfolio content © Ariel Churi. Technical implementation available under MIT license. 
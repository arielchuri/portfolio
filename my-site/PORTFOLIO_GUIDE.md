# Portfolio Generator Guide

This project now includes an automatic portfolio generator that creates gallery and journal pages from your project files.

## How It Works

The generator scans all HTML files in the root directory (except `index.html`, `gallery.html`, and `journal.html`) and automatically creates:

1. **Gallery Page** (`gallery.html`) - A grid layout showing all projects with images and titles
2. **Journal Page** (`journal.html`) - A blog-style layout with pagination (6 posts per page)

## Creating Portfolio Pages

To create a new portfolio page that will appear in both gallery and journal:

### 1. Create Your HTML File
Create a new HTML file in the root directory (e.g., `my-project.html`)

### 2. Add Required Metadata
Include these meta tags in your `<head>` section:

```html
<head>
  <load src="src/html/head.html" title="Your Project Title - Ariel Churi" />
  <meta name="description" content="Brief description of your project" />
  <meta name="date" content="2024-01-15" />
</head>
```

### 3. Add a Main Image
Include at least one image in your page. The generator will use the first `<img>` tag it finds:

```html
<img src="/your-project-image.jpg" alt="Project Description" class="w-full h-auto rounded-lg" />
```

## Metadata Extraction

The generator automatically extracts:

- **Title**: From `<title>` tag or `<load src="..." title="...">` attribute
- **Description**: From `<meta name="description" content="...">`
- **Main Image**: From the first `<img src="...">` tag
- **Date**: From `<meta name="date" content="...">` (defaults to current date)

## Generated Pages

### Gallery Page (`/gallery.html`)
- Grid layout with project cards
- Each card shows: image, title, and description
- Hover effects and smooth transitions
- Responsive design

### Journal Page (`/journal.html`)
- Blog-style layout with featured images
- Sorted by date (newest first)
- Pagination (6 posts per page)
- Additional pages: `journal-2.html`, `journal-3.html`, etc.

## Build Process

The pages are generated automatically when you:

```bash
npm run dev    # Development mode
npm run build  # Production build
```

## Customization

### Gallery Layout
Edit the `generateGalleryPage()` function in `vite.config.ts` to modify:
- Grid layout
- Card design
- Hover effects
- Number of columns

### Journal Layout
Edit the `generateJournalPageWithPagination()` function to modify:
- Posts per page (currently 6)
- Layout structure
- Date formatting
- Pagination style

### Styling
Both pages use your existing Tailwind classes and custom CSS variables:
- `autogrid` for responsive grid
- `mygrid` for 12-column layout
- Custom spacing variables (`ms`, `mssm`, etc.)
- Custom colors (`accent`, `hover`, etc.)

## Example Project Structure

```
my-site/
├── index.html              # Home page
├── gallery.html            # Auto-generated gallery
├── journal.html            # Auto-generated journal
├── journal-2.html          # Auto-generated pagination
├── my-project-1.html       # Your portfolio page
├── my-project-2.html       # Your portfolio page
├── style_specimin.html     # Style guide
└── src/
    ├── html/
    │   ├── head.html       # Common head
    │   └── nav.html        # Navigation
    └── style.css           # Styles
```

## Tips

1. **Images**: Use descriptive alt text for better accessibility
2. **Descriptions**: Keep descriptions concise but informative
3. **Dates**: Use ISO format (YYYY-MM-DD) for consistent sorting
4. **Titles**: Make them descriptive and unique
5. **File Names**: Use descriptive filenames (they become URLs)

## Troubleshooting

- **Page not appearing**: Check that your HTML file has a valid `<title>` tag
- **No image**: Ensure you have at least one `<img>` tag
- **Wrong date**: Verify the `<meta name="date">` format
- **Build errors**: Check the console for specific error messages 
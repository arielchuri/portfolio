#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PAGES_DIR = './pages';
const PROJECTS_DIR = './pages';
const POSTS_PER_PAGE = 6;

// Ensure pages directory exists
if (!fs.existsSync(PAGES_DIR)) {
  fs.mkdirSync(PAGES_DIR, { recursive: true });
}

// Extract metadata from HTML content
function extractMetadata(content, filename) {
  // Extract title
  let title = '';
  const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    title = titleMatch[1].trim();
  } else {
    const loadTitleMatch = content.match(/<load[^>]*title="([^"]+)"/i);
    if (loadTitleMatch) {
      title = loadTitleMatch[1].trim();
    } else {
      title = path.basename(filename, '.html').replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  }

  // Extract description
  const descMatch = content.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/i);
  const description = descMatch ? descMatch[1].trim() : '';

  // Extract main image
  const imgMatch = content.match(/<img[^>]*src="([^"]+)"/i);
  const mainImage = imgMatch ? imgMatch[1] : '/placeholder-image.jpg';

  // Extract date
  const dateMatch = content.match(/<meta[^>]*name="date"[^>]*content="([^"]+)"/i);
  const date = dateMatch ? dateMatch[1].trim() : new Date().toISOString().split('T')[0];

  return { title, description, mainImage, date };
}

// Generate gallery page
function generateGalleryPage(pages) {
  const galleryHTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <load src="../src/html/head.html" title="Gallery - Ariel Churi" />
  </head>
  <load src="../src/html/nav.html" />
  <body class="mb-msxl">
    <div class="container mx-auto px-ms">
      <h1 class="responsive-text-lg mb-mslg">Gallery</h1>
      <div class="autogrid">
        ${pages.map(page => `
          <article class="bg-truewhite border border-graymedium rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <a href="${page.url}.html" class="block">
              <div class="aspect-video bg-graymedium overflow-hidden">
                <img src="${page.mainImage}" alt="${page.title}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div class="p-mssm">
                <h2 class="text-xl font-bold text-trueblack mb-msxs">${page.title}</h2>
                ${page.description ? `<p class="text-graymedium text-sm">${page.description}</p>` : ''}
              </div>
            </a>
          </article>
        `).join('')}
      </div>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>`;

  fs.writeFileSync(path.join(PAGES_DIR, 'gallery.html'), galleryHTML);
  console.log('✅ Generated gallery.html');
}

// Generate pagination HTML
function generatePaginationHTML(currentPage, totalPages) {
  if (totalPages <= 1) return '';

  const pages = [];
  const maxVisible = 5;

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    }
  }

  return `
    <nav class="flex justify-center items-center space-x-mssm mt-msxl">
      ${currentPage > 1 ? `<a href="${currentPage === 2 ? 'journal.html' : `journal-${currentPage - 1}.html`}" class="px-mssm py-msxs border border-graymedium rounded hover:bg-graymedium transition-colors">← Previous</a>` : ''}
      
      <div class="flex space-x-msxs">
        ${pages.map(page => {
          if (page === '...') {
            return '<span class="px-mssm py-msxs text-graymedium">...</span>';
          }
          const isCurrent = page === currentPage;
          const href = page === 1 ? 'journal.html' : `journal-${page}.html`;
          return `<a href="${href}" class="px-mssm py-msxs border border-graymedium rounded ${isCurrent ? 'bg-accent text-truewhite' : 'hover:bg-graymedium'} transition-colors">${page}</a>`;
        }).join('')}
      </div>
      
      ${currentPage < totalPages ? `<a href="journal-${currentPage + 1}.html" class="px-mssm py-msxs border border-graymedium rounded hover:bg-graymedium transition-colors">Next →</a>` : ''}
    </nav>
  `;
}

// Generate journal page
function generateJournalPage(pages) {
  const totalPages = Math.ceil(pages.length / POSTS_PER_PAGE);
  const sortedPages = pages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    const startIndex = (pageNum - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const pagePosts = sortedPages.slice(startIndex, endIndex);

    const paginationHTML = generatePaginationHTML(pageNum, totalPages);

    const journalHTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <load src="../src/html/head.html" title="Journal - Ariel Churi" />
  </head>
  <load src="../src/html/nav.html" />
  <body class="mb-msxl">
    <div class="container mx-auto px-ms">
      <h1 class="responsive-text-lg mb-mslg">Journal</h1>
      <div class="space-y-mslg">
        ${pagePosts.map(post => `
          <article class="border-b border-graymedium pb-mslg">
            <div class="mygrid">
              <div class="xl:col-span-4">
                <a href="${post.url}.html" class="block">
                  <div class="aspect-video bg-graymedium overflow-hidden rounded-lg">
                    <img src="${post.mainImage}" alt="${post.title}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                </a>
              </div>
              <div class="xl:col-span-8">
                <div class="flex items-center text-sm text-graymedium mb-mssm">
                  <time datetime="${post.date}">${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                </div>
                <h2 class="text-2xl font-bold text-trueblack mb-mssm">
                  <a href="${post.url}.html" class="hover:text-accent transition-colors">${post.title}</a>
                </h2>
                ${post.description ? `<p class="text-graymedium leading-relaxed">${post.description}</p>` : ''}
                <a href="${post.url}.html" class="inline-block mt-mssm text-accent hover:text-hover transition-colors">Read more →</a>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
      
      ${paginationHTML}
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>`;

    const filename = pageNum === 1 ? 'journal.html' : `journal-${pageNum}.html`;
    fs.writeFileSync(path.join(PAGES_DIR, filename), journalHTML);
    console.log(`✅ Generated ${filename}`);
  }
}

// Main build function
function buildPortfolio() {
  console.log('🚀 Building portfolio pages...');

  try {
    // Read all HTML files in the projects directory
    const files = fs.readdirSync(PROJECTS_DIR)
      .filter(file => file.endsWith('.html') && 
                     file !== 'gallery.html' && 
                     file !== 'journal.html' && 
                     !file.startsWith('journal-'));

    const pages = files.map(file => {
      const filePath = path.join(PROJECTS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const metadata = extractMetadata(content, file);

      return {
        file,
        ...metadata,
        url: file.replace('.html', '')
      };
    }).filter(page => page.title);

    if (pages.length === 0) {
      console.log('⚠️  No project pages found');
      return;
    }

    console.log(`📁 Found ${pages.length} project pages`);

    // Generate gallery and journal pages
    generateGalleryPage(pages);
    generateJournalPage(pages);

    console.log('🎉 Portfolio build complete!');
    console.log(`📊 Generated gallery with ${pages.length} projects`);
    console.log(`📝 Generated journal with ${Math.ceil(pages.length / POSTS_PER_PAGE)} pages`);

  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Run the build
buildPortfolio(); 
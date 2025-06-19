import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import injectHTML from "vite-plugin-html-inject";
import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs";
import { join, basename } from "path";

// Plugin to generate gallery and journal pages
function portfolioGenerator() {
  return {
    name: 'portfolio-generator',
    buildStart() {
      this.generatePortfolioPages();
    },
    generateBundle() {
      this.generatePortfolioPages();
    },
    generatePortfolioPages() {
      const pagesDir = '.';
      const htmlFiles = readdirSync(pagesDir)
        .filter(file => file.endsWith('.html') && file !== 'index.html' && file !== 'gallery.html' && file !== 'journal.html')
        .map(file => ({ file, path: join(pagesDir, file) }));

      const pages = htmlFiles.map(({ file, path }) => {
        const content = readFileSync(path, 'utf-8');
        const title = this.extractTitle(content, file);
        const description = this.extractDescription(content);
        const mainImage = this.extractMainImage(content);
        const date = this.extractDate(content) || new Date().toISOString().split('T')[0];
        
        return {
          file,
          title,
          description,
          mainImage,
          date,
          url: file.replace('.html', '')
        };
      }).filter(page => page.title); // Only include pages with titles

      // Generate gallery page
      this.generateGalleryPage(pages);
      
      // Generate journal page with pagination
      this.generateJournalPage(pages);
    },
    extractTitle(content, filename) {
      // Try to extract from <title> tag first
      const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i);
      if (titleMatch) return titleMatch[1].trim();
      
      // Try to extract from load src with title attribute
      const loadTitleMatch = content.match(/<load[^>]*title="([^"]+)"/i);
      if (loadTitleMatch) return loadTitleMatch[1].trim();
      
      // Fallback to filename
      return basename(filename, '.html').replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    },
    extractDescription(content) {
      const descMatch = content.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/i);
      return descMatch ? descMatch[1].trim() : '';
    },
    extractMainImage(content) {
      // Look for first img tag or div with background image
      const imgMatch = content.match(/<img[^>]*src="([^"]+)"/i);
      if (imgMatch) return imgMatch[1];
      
      // Look for background-image in style
      const bgMatch = content.match(/background-image:\s*url\(['"]?([^'")\s]+)['"]?\)/i);
      if (bgMatch) return bgMatch[1];
      
      return '/placeholder-image.jpg'; // Default placeholder
    },
    extractDate(content) {
      const dateMatch = content.match(/<meta[^>]*name="date"[^>]*content="([^"]+)"/i);
      return dateMatch ? dateMatch[1].trim() : null;
    },
    generateGalleryPage(pages) {
      const galleryHTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <load src="src/html/head.html" title="Gallery - Ariel Churi" />
  </head>
  <load src="src/html/nav.html" />
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

      writeFileSync('gallery.html', galleryHTML);
    },
    generateJournalPage(pages) {
      const postsPerPage = 6;
      const totalPages = Math.ceil(pages.length / postsPerPage);
      
      // Sort pages by date (newest first)
      const sortedPages = pages.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      // Generate main journal page (page 1)
      this.generateJournalPageWithPagination(sortedPages, 1, totalPages, postsPerPage);
      
      // Generate additional pages if needed
      for (let pageNum = 2; pageNum <= totalPages; pageNum++) {
        this.generateJournalPageWithPagination(sortedPages, pageNum, totalPages, postsPerPage);
      }
    },
    generateJournalPageWithPagination(pages, currentPage, totalPages, postsPerPage) {
      const startIndex = (currentPage - 1) * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      const pagePosts = pages.slice(startIndex, endIndex);
      
      const paginationHTML = this.generatePaginationHTML(currentPage, totalPages);
      
      const journalHTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <load src="src/html/head.html" title="Journal - Ariel Churi" />
  </head>
  <load src="src/html/nav.html" />
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

      const filename = currentPage === 1 ? 'journal.html' : `journal-${currentPage}.html`;
      writeFileSync(filename, journalHTML);
    },
    generatePaginationHTML(currentPage, totalPages) {
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
  };
}

export default defineConfig({
  plugins: [tailwindcss(), injectHTML(), portfolioGenerator()],
});

import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import fs from 'fs'

const head = fs.readFileSync('./partials/head.html', 'utf8')
const header = fs.readFileSync('./partials/header.html', 'utf8')
const footer = fs.readFileSync('./partials/footer.html', 'utf8')

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      inject: {
        data: {
          head,
          header,
          footer,
          title: 'My Vite Site',
        },
      },
    }),
  ],
})

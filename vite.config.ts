import { defineConfig } from "vite";
import fs from 'fs';
import path from 'path';
import { glob } from 'glob'


function getHtmlInputs() {
  const files = glob.sync('src/pages/**/*.html');
  const input: Record<string, string> = {};

  files.forEach(file => {
    // 取相對於 pages 的路徑，例如 pages/user/users.html → user/users
    const name = file.replace(/^src\/pages\//, '').replace(/\.html$/, '');
    input[name] = path.resolve(__dirname, file);
  });

  return input;
}

export default defineConfig({
    base: './',          // 打包後路徑相對
    build: {
        outDir: 'dist',  // 打包輸出資料夾
        emptyOutDir: true,  // 每次build時，重新清空檔案
        minify: false,      // 關掉壓縮，JS 可讀
        sourcemap: true,    // 產生對應 .map，方便 debug
        rollupOptions: {
            input: getHtmlInputs(),
            output: {
                entryFileNames: 'js/[name].js',
                chunkFileNames: 'js/[name].js',
                assetFileNames: ({ name }) => {
                if (name?.endsWith('.css')) return 'css/[name][extname]'
                return 'assets/[name][extname]'
                },
            },
        },
    },
    plugins: [{
            name: 'copy-html-to-jsp',
            closeBundle() {
                const dist = path.resolve(__dirname, 'dist')
                fs.readdirSync(dist)
                .filter(f => f.endsWith('.html'))
                .forEach(file => {
                    const htmlPath = path.join(dist, file)
                    const jspPath = path.join(dist, file.replace('.html', '.jsp'))
                    fs.copyFileSync(htmlPath, jspPath)
                })
            },
        },
    ],
});
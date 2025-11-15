const fs = require('fs');
const path = require('path');

const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
const outputDir = path.join(process.cwd(), '.next', 'server', 'app');

function injectScript(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (!content.includes('dashboard-console-capture.js')) {
      content = content.replace('</head>', `${scriptTag}</head>`);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Injected console capture script into ${filePath}`);
    }
  } catch (error) {
    console.error(`Error injecting script into ${filePath}:`, error);
  }
}

function findHtmlFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.log('Build output directory not found. Skipping script injection.');
    return;
  }
  
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  files.forEach(file => {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      findHtmlFiles(fullPath);
    } else if (file.name.endsWith('.html')) {
      injectScript(fullPath);
    }
  });
}

findHtmlFiles(outputDir);
console.log('Console capture script injection complete.');
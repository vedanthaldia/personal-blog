const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./app', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace double quote imports
    content = content.replace(/import\s+{\s*PrismaClient\s*}\s+from\s+["']@prisma\/client["'];\n/g, 'import prisma from "@/lib/prisma";\n');
    content = content.replace(/const\s+prisma\s*=\s*new\s+PrismaClient\(\);\n/g, '');
    
    fs.writeFileSync(filePath, content);
  }
});
console.log('Replaced all PrismaClient imports');

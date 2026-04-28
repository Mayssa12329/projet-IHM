const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('frontend/app');
let count = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z')) {
        let updated = content.replace(/<div className="inline-flex[^>]+bg-primary[^>]*>[\s\S]*?<svg[^>]*>[\s\S]*?<path d="M12 2L2 7v10c0 5\.55 3\.84 10\.74 9 12 5\.16-1\.26 9-6\.45 9-12V7l-10-5z"[^>]*>[\s\S]*?<\/svg>[\s\S]*?<\/div>/g, (match) => {
            let wMatch = match.match(/w-\d+/);
            let hMatch = match.match(/h-\d+/);
            let w = wMatch ? wMatch[0] : 'w-10';
            let h = hMatch ? hMatch[0] : 'h-10';
            return '<div className="inline-flex items-center justify-center ' + w + ' ' + h + ' rounded-lg overflow-hidden shrink-0">\n              <img src="/chat_8708617.png" alt="Logo" className="w-full h-full object-contain" />\n            </div>';
        });
        
        if (content !== updated) {
            fs.writeFileSync(file, updated, 'utf8');
            console.log('Updated: ' + file);
            count++;
        }
    }
});
console.log('Total files updated: ' + count);

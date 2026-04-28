const fs = require('fs');
let file = 'frontend/app/forum/page.tsx';
let c = fs.readFileSync(file, 'utf8');

c = c.replace(/try\s*\{\s*\/\/\ For demo purposes,\s*use hardcoded categories\s*const demoCategories:\s*Category\[\] = \[/, 
  'try {\n'+
  '        const res = await fetch(\\'/api/auth/check\\');\n'+
  '        if (res.ok) {\n'+
  '          const data = await res.json();\n'+
  '          setUser(data.session);\n'+
  '        }\n\n'+
  '        // For demo purposes, use hardcoded categories\n'+
  '        const demoCategories: Category[] = [');

fs.writeFileSync(file, c);
console.log('Done');

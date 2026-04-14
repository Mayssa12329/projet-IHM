import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create light mode favicon (green gradient)
const lightModeSvg = `<svg viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#16a34a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#15803d;stop-opacity:1" />
    </linearGradient>
    
    <radialGradient id="glowGradient" cx="50%" cy="30%">
      <stop offset="0%" style="stop-color:#4ade80;stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:#16a34a;stop-opacity:0" />
    </radialGradient>
  </defs>
  
  <rect width="192" height="192" fill="url(#glowGradient)"/>
  <rect x="24" y="24" width="144" height="144" rx="30" ry="30" fill="url(#primaryGradient)"/>
  <rect x="32" y="32" width="128" height="128" rx="24" ry="24" fill="none" stroke="#22c55e" stroke-width="2" opacity="0.4"/>
  
  <g>
    <ellipse cx="60" cy="75" rx="22" ry="28" fill="#dcfce7" opacity="0.95"/>
    <polygon points="50,103 45,115 58,103" fill="#dcfce7"/>
    <line x1="55" y1="65" x2="70" y2="65" stroke="#15803d" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
    <line x1="55" y1="75" x2="68" y2="75" stroke="#15803d" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
    <line x1="55" y1="85" x2="65" y2="85" stroke="#15803d" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
  </g>
  
  <g>
    <ellipse cx="96" cy="60" rx="28" ry="32" fill="#86efac" opacity="0.98"/>
    <polygon points="84,92 76,105 92,92" fill="#86efac"/>
    <circle cx="96" cy="60" r="12" fill="#15803d" opacity="0.8"/>
    <circle cx="96" cy="60" r="9" fill="#22c55e"/>
  </g>
  
  <g>
    <ellipse cx="132" cy="80" rx="22" ry="26" fill="#dcfce7" opacity="0.95"/>
    <polygon points="142,106 147,118 134,106" fill="#dcfce7"/>
    <line x1="127" y1="70" x2="142" y2="70" stroke="#15803d" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
    <line x1="127" y1="80" x2="140" y2="80" stroke="#15803d" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
    <line x1="127" y1="90" x2="137" y2="90" stroke="#15803d" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
  </g>
  
  <g>
    <rect x="70" y="115" width="52" height="32" rx="12" fill="#dcfce7" opacity="0.9"/>
    <polygon points="96,147 90,158 102,147" fill="#dcfce7"/>
    <line x1="82" y1="128" x2="110" y2="128" stroke="#15803d" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
    <line x1="82" y1="137" x2="105" y2="137" stroke="#15803d" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
  </g>
  
  <g stroke="#22c55e" stroke-width="1.5" fill="none" opacity="0.4" stroke-linecap="round">
    <path d="M 80 95 Q 88 105 96 105"/>
    <path d="M 112 95 Q 104 105 96 105"/>
    <path d="M 96 105 L 96 115"/>
  </g>
  
  <circle cx="96" cy="28" r="4" fill="#22c55e" opacity="0.7"/>
  <circle cx="88" cy="32" r="2.5" fill="#4ade80" opacity="0.6"/>
  <circle cx="104" cy="32" r="2.5" fill="#4ade80" opacity="0.6"/>
</svg>`;

// Create dark mode favicon (lighter green)
const darkModeSvg = `<svg viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="primaryGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#22c55e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#16a34a;stop-opacity:1" />
    </linearGradient>
    
    <radialGradient id="glowGradientDark" cx="50%" cy="30%">
      <stop offset="0%" style="stop-color:#86efac;stop-opacity:0.4" />
      <stop offset="100%" style="stop-color:#22c55e;stop-opacity:0" />
    </radialGradient>
  </defs>
  
  <rect width="192" height="192" fill="url(#glowGradientDark)"/>
  <rect x="24" y="24" width="144" height="144" rx="30" ry="30" fill="url(#primaryGradientDark)"/>
  <rect x="32" y="32" width="128" height="128" rx="24" ry="24" fill="none" stroke="#4ade80" stroke-width="2" opacity="0.5"/>
  
  <g>
    <ellipse cx="60" cy="75" rx="22" ry="28" fill="#dcfce7" opacity="0.98"/>
    <polygon points="50,103 45,115 58,103" fill="#dcfce7"/>
    <line x1="55" y1="65" x2="70" y2="65" stroke="#15803d" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
    <line x1="55" y1="75" x2="68" y2="75" stroke="#15803d" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
    <line x1="55" y1="85" x2="65" y2="85" stroke="#15803d" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
  </g>
  
  <g>
    <ellipse cx="96" cy="60" rx="28" ry="32" fill="#86efac" opacity="1"/>
    <polygon points="84,92 76,105 92,92" fill="#86efac"/>
    <circle cx="96" cy="60" r="12" fill="#15803d" opacity="0.9"/>
    <circle cx="96" cy="60" r="9" fill="#22c55e"/>
  </g>
  
  <g>
    <ellipse cx="132" cy="80" rx="22" ry="26" fill="#dcfce7" opacity="0.98"/>
    <polygon points="142,106 147,118 134,106" fill="#dcfce7"/>
    <line x1="127" y1="70" x2="142" y2="70" stroke="#15803d" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
    <line x1="127" y1="80" x2="140" y2="80" stroke="#15803d" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
    <line x1="127" y1="90" x2="137" y2="90" stroke="#15803d" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
  </g>
  
  <g>
    <rect x="70" y="115" width="52" height="32" rx="12" fill="#dcfce7" opacity="0.95"/>
    <polygon points="96,147 90,158 102,147" fill="#dcfce7"/>
    <line x1="82" y1="128" x2="110" y2="128" stroke="#15803d" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
    <line x1="82" y1="137" x2="105" y2="137" stroke="#15803d" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
  </g>
  
  <g stroke="#4ade80" stroke-width="1.5" fill="none" opacity="0.5" stroke-linecap="round">
    <path d="M 80 95 Q 88 105 96 105"/>
    <path d="M 112 95 Q 104 105 96 105"/>
    <path d="M 96 105 L 96 115"/>
  </g>
  
  <circle cx="96" cy="28" r="4" fill="#4ade80" opacity="0.8"/>
  <circle cx="88" cy="32" r="2.5" fill="#86efac" opacity="0.7"/>
  <circle cx="104" cy="32" r="2.5" fill="#86efac" opacity="0.7"/>
</svg>`;

async function generateIcons() {
  try {
    console.log('Generating favicons...');
    
    // 32x32 Light mode
    await sharp(Buffer.from(lightModeSvg))
      .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toFile(path.join(__dirname, 'public', 'icon-light-32x32.png'));
    console.log('✓ Created icon-light-32x32.png');
    
    // 32x32 Dark mode
    await sharp(Buffer.from(darkModeSvg))
      .resize(32, 32, { fit: 'contain', background: { r: 31, g: 41, b: 55, alpha: 1 } })
      .png()
      .toFile(path.join(__dirname, 'public', 'icon-dark-32x32.png'));
    console.log('✓ Created icon-dark-32x32.png');
    
    // 180x180 Apple icon
    await sharp(Buffer.from(lightModeSvg))
      .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toFile(path.join(__dirname, 'public', 'apple-icon.png'));
    console.log('✓ Created apple-icon.png');
    
    console.log('\n✅ All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateIcons();

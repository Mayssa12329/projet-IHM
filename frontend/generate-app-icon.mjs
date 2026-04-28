import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// We'll create an app/icon.png which Next.js App Router will pick up automatically
const communityIconSvg = `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#22c55e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Main rounded square background -->
  <rect x="0" y="0" width="256" height="256" rx="60" ry="60" fill="url(#bgGradient)"/>
  
  <!-- Outer ring for depth -->
  <rect x="16" y="16" width="224" height="224" rx="48" ry="48" fill="none" stroke="#ffffff" stroke-width="8" opacity="0.3"/>

  <!-- Three people holding hands / linked together conceptually -->
  <!-- Left person (blue) -->
  <circle cx="70" cy="90" r="28" fill="#ffffff" />
  <path d="M 40 190 Q 70 130 100 190 Z" fill="#ffffff"/>
  
  <!-- Right person (blue) -->
  <circle cx="186" cy="90" r="28" fill="#ffffff" />
  <path d="M 156 190 Q 186 130 216 190 Z" fill="#ffffff"/>
  
  <!-- Center person (raised, orange/yellow star or heart) -> making it white for contrast -->
  <circle cx="128" cy="70" r="34" fill="#ffffff" />
  <path d="M 88 210 Q 128 120 168 210 Z" fill="#ffffff" opacity="0.95"/>
  
  <!-- Connective arms -->
  <path d="M 80 140 Q 128 170 176 140" fill="none" stroke="#ffffff" stroke-width="16" stroke-linecap="round"/>
</svg>`;

async function generateAppIcon() {
  try {
    console.log('Generating Next.js app/icon.png...');
    
    // Save as 512x512 PNG in app/icon.png
    await sharp(Buffer.from(communityIconSvg))
      .resize(512, 512, { fit: 'contain' })
      .png()
      .toFile(path.join(__dirname, 'app', 'icon.png'));
      
    // Save an apple-icon as well in app/apple-icon.png
    await sharp(Buffer.from(communityIconSvg))
      .resize(180, 180, { fit: 'contain' })
      .png()
      .toFile(path.join(__dirname, 'app', 'apple-icon.png'));
      
    // Save to public just in case for older caching
    await sharp(Buffer.from(communityIconSvg))
      .resize(512, 512, { fit: 'contain' })
      .png()
      .toFile(path.join(__dirname, 'public', 'icon-new.png'));

    console.log('✅ Icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateAppIcon();
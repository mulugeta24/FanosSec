const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(file, 'utf8');

const images = [
    '/assets/images/hero_bg_1.png',
    '/assets/images/hero_bg_2.png',
    '/assets/images/hero_bg_3.png',
    '/assets/images/hacker_16x9.png',
    '/assets/images/cyber_hacker_hero.png'
];

let i = 0;
content = content.replace(/image: 'https:\/\/image\.pollinations\.ai[^']+'/g, () => {
    const img = images[i % images.length];
    i++;
    return `image: '${img}'`;
});

fs.writeFileSync(file, content);
console.log('Images updated successfully.');

// script.js

// Theme handling
const root = document.documentElement;
const app = document.getElementById('app');
const themeToggle = document.getElementById('themeToggle');

// initialize theme from localStorage or prefer-color-scheme
const saved = localStorage.getItem('site-theme');
if(saved){
  document.documentElement.setAttribute('data-theme', saved);
  themeToggle.setAttribute('aria-pressed', String(saved === 'light'));
} else {
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  document.documentElement.setAttribute('data-theme', prefersLight ? 'light' : 'dark');
  themeToggle.setAttribute('aria-pressed', String(prefersLight));
}

themeToggle.addEventListener('click', ()=>{
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('site-theme', next);
  themeToggle.setAttribute('aria-pressed', String(next === 'light'));
});

// small demo: update preview with a random accent animation
const preview = document.getElementById('demo');
const accents = ['✨ Clean', '🚀 Fast', '🔧 Customizable', '🔒 Private'];
let i=0;
setInterval(()=>{
  preview.textContent = accents[i];
  i = (i+1) % accents.length;
}, 2200);

// Contact form simulated send
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  // Simulate send: show a friendly confirmation and clear form
  alert('Thanks, ' + (name||'friend') + '! Message simulated as sent.');
  contactForm.reset();
});

// Copy page HTML to clipboard
document.getElementById('copyBtn').addEventListener('click', async ()=>{
  try{
    const html = document.documentElement.outerHTML;
    await navigator.clipboard.writeText('<!doctype html>\n' + html);
    alert('Page HTML copied to clipboard — paste into a file and save as index.html');
  }catch(err){
    alert('Could not copy automatically. Right-click → View Page Source and copy manually.');
  }
});

// Download the current page as an HTML file
document.getElementById('downloadBtn').addEventListener('click', ()=>{
  const html = '<!doctype html>\n' + document.documentElement.outerHTML;
  const blob = new Blob([html], {type: 'text/html'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'index.html';
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
});

// Accessibility: allow keyboard to focus visible elements
document.addEventListener('keyup', (e)=>{
  if(e.key === 'k' && (e.ctrlKey || e.metaKey)){
    // ctrl/cmd+k focuses search (not implemented) — example hook
    alert('Shortcut: search would open (demo).');
  }
});

// Small progressive enhancement: show real-time prefers-color-scheme changes
if(window.matchMedia){
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e=>{
    const saved = localStorage.getItem('site-theme');
    if(!saved){
      document.documentElement.setAttribute('data-theme', e.matches ? 'light' : 'dark');
    }
  });
}

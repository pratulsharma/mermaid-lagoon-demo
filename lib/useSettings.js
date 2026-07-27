import { useEffect, useState } from 'react';

const DEFAULT_SETTINGS = {
  brand: {
    primaryColor: '#e96eaa',
    secondaryColor: '#073d63',
    accentColor: '#3787c8',
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    h1Size: '48px',
    h2Size: '36px',
  },
  content: {
    heroTitle: 'Swim your dream.',
    heroDescription: 'A premium inflatable lagoon, shimmering mermaid tails, immersive décor and effortless setup—delivered to backyards, schools, hotels and special events.',
    companyName: 'Mermaidalay',
  },
  sections: {
    showGallery: true,
    showAbout: true,
    showServiceAreas: true,
    showPackages: true,
    showReels: true,
  },
};

export function useSiteSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('mermaidSettings');
    if (stored) {
      try {
        setSettings(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse settings', e);
      }
    }
    setLoaded(true);
  }, []);

  return { settings, loaded };
}

export function applySettingsStyle(settings) {
  const style = document.createElement('style');
  style.innerHTML = `
    :root {
      --primary-color: ${settings.brand.primaryColor};
      --secondary-color: ${settings.brand.secondaryColor};
      --accent-color: ${settings.brand.accentColor};
      --font-family: ${settings.typography.fontFamily};
    }
    body {
      font-family: var(--font-family);
    }
    h1 {
      font-size: ${settings.typography.h1Size};
    }
    h2 {
      font-size: ${settings.typography.h2Size};
    }
    .primary-color { color: var(--primary-color); }
    .primary-bg { background: var(--primary-color); }
    .secondary-color { color: var(--secondary-color); }
    .secondary-bg { background: var(--secondary-color); }
  `;
  document.head.appendChild(style);
}

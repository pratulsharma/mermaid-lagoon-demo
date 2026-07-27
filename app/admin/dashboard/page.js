'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const DEFAULT_SETTINGS = {
  brand: {
    primaryColor: '#e96eaa',
    secondaryColor: '#073d63',
    accentColor: '#18b7bd',
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    h1Size: '48px',
    h2Size: '36px',
  },
  content: {
    heroTitle: 'Swim your dream. Become a mermaid.',
    heroDescription: 'A premium inflatable lagoon, shimmering mermaid tails, immersive décor and effortless setup—delivered to backyards, schools, hotels and special events.',
    companyName: 'Mermaidalay',
  },
  packages: [
    { name: 'Mermaid Splash', price: 750, hours: 4 },
    { name: 'Deluxe Mermaid Party', price: 900, hours: 5 },
    { name: 'Luxury Mermaid Experience', price: 1250, hours: 6 },
  ],
  sections: {
    showGallery: true,
    showAbout: true,
    showServiceAreas: true,
    showPackages: true,
    showReels: true,
  },
};

export default function AdminDashboard() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [activeTab, setActiveTab] = useState('colors');
  const [saved, setSaved] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (!auth) {
      router.push('/admin/login');
      return;
    }
    const stored = localStorage.getItem('mermaidSettings');
    if (stored) {
      setSettings(JSON.parse(stored));
    }
  }, [router]);

  const saveSettings = () => {
    localStorage.setItem('mermaidSettings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const resetSettings = () => {
    if (confirm('Reset all settings to defaults?')) {
      setSettings(DEFAULT_SETTINGS);
      localStorage.removeItem('mermaidSettings');
    }
  };

  const logout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  const handleColorChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {...prev[category], [key]: value}
    }));
  };

  const handleTextChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {...prev[category], [key]: value}
    }));
  };

  const handleToggleSection = (section) => {
    setSettings(prev => ({
      ...prev,
      sections: {...prev.sections, [section]: !prev.sections[section]}
    }));
  };

  return (
    <main style={{minHeight: '100vh', background: '#f5f7fa'}}>
      <header style={{background: 'white', borderBottom: '1px solid #e0e0e0', padding: '20px', position: 'sticky', top: 0, zIndex: 100}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <h1 style={{margin: 0, color: '#073d63', fontSize: '24px'}}>🧜‍♀️ Mermaidalay Admin</h1>
            <p style={{margin: '4px 0 0 0', color: '#999', fontSize: '14px'}}>Website Configuration Dashboard</p>
          </div>
          <div style={{display: 'flex', gap: '12px'}}>
            <a href="/" style={{padding: '8px 16px', background: '#f0f0f0', border: 'none', borderRadius: '6px', textDecoration: 'none', color: '#073d63', cursor: 'pointer', fontSize: '14px'}}>
              View Site
            </a>
            <button onClick={logout} style={{padding: '8px 16px', background: '#e96eaa', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px'}}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '40px 20px'}}>
        <div style={{display: 'grid', gridTemplateColumns: '240px 1fr', gap: '24px'}}>
          {/* Sidebar */}
          <nav style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            {[
              {id: 'colors', label: '🎨 Colors & Brand'},
              {id: 'typography', label: '✏️ Typography'},
              {id: 'content', label: '📝 Content'},
              {id: 'packages', label: '💰 Packages'},
              {id: 'images', label: '🖼️ Images'},
              {id: 'sections', label: '📑 Sections'},
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '12px 16px',
                  background: activeTab === tab.id ? '#e96eaa' : '#f0f0f0',
                  color: activeTab === tab.id ? 'white' : '#073d63',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontWeight: activeTab === tab.id ? '600' : '500',
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Main Content */}
          <div style={{background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,.05)'}}>
            {activeTab === 'colors' && (
              <div>
                <h2 style={{color: '#073d63', marginTop: 0}}>Brand Colors</h2>
                <p style={{color: '#627984', marginBottom: '24px'}}>Customize your brand colors throughout the website</p>
                <div style={{display: 'grid', gap: '24px'}}>
                  {Object.entries(settings.brand).map(([key, value]) => (
                    <div key={key} style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                      <label style={{flex: 1}}>
                        <div style={{color: '#073d63', fontWeight: '600', marginBottom: '8px', textTransform: 'capitalize'}}>
                          {key.replace(/([A-Z])/g, ' $1')}
                        </div>
                        <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                          <input
                            type="color"
                            value={value}
                            onChange={(e) => handleColorChange('brand', key, e.target.value)}
                            style={{width: '60px', height: '40px', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer'}}
                          />
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => handleColorChange('brand', key, e.target.value)}
                            style={{flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px', fontFamily: 'monospace'}}
                          />
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'typography' && (
              <div>
                <h2 style={{color: '#073d63', marginTop: 0}}>Typography</h2>
                <p style={{color: '#627984', marginBottom: '24px'}}>Configure fonts and text sizes</p>
                <div style={{display: 'grid', gap: '20px'}}>
                  <div>
                    <label style={{display: 'block'}}>
                      <div style={{color: '#073d63', fontWeight: '600', marginBottom: '8px'}}>Font Family</div>
                      <select
                        value={settings.typography.fontFamily}
                        onChange={(e) => handleTextChange('typography', 'fontFamily', e.target.value)}
                        style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px'}}
                      >
                        <option value="system-ui, -apple-system, sans-serif">System (Default)</option>
                        <option value="'Georgia', serif">Georgia Serif</option>
                        <option value="'Courier New', monospace">Courier New</option>
                        <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
                      </select>
                    </label>
                  </div>
                  {Object.entries(settings.typography).filter(([k]) => k !== 'fontFamily').map(([key, value]) => (
                    <label key={key} style={{display: 'block'}}>
                      <div style={{color: '#073d63', fontWeight: '600', marginBottom: '8px', textTransform: 'capitalize'}}>
                        {key.replace(/([A-Z])/g, ' $1')}
                      </div>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleTextChange('typography', key, e.target.value)}
                        placeholder="e.g., 48px"
                        style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px'}}
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div>
                <h2 style={{color: '#073d63', marginTop: 0}}>Content</h2>
                <p style={{color: '#627984', marginBottom: '24px'}}>Edit website copy and text</p>
                <div style={{display: 'grid', gap: '20px'}}>
                  {Object.entries(settings.content).map(([key, value]) => (
                    <label key={key} style={{display: 'block'}}>
                      <div style={{color: '#073d63', fontWeight: '600', marginBottom: '8px', textTransform: 'capitalize'}}>
                        {key.replace(/([A-Z])/g, ' $1')}
                      </div>
                      {key === 'heroDescription' ? (
                        <textarea
                          value={value}
                          onChange={(e) => handleTextChange('content', key, e.target.value)}
                          style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', minHeight: '100px', fontFamily: 'inherit'}}
                        />
                      ) : (
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleTextChange('content', key, e.target.value)}
                          style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px'}}
                        />
                      )}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'packages' && (
              <div>
                <h2 style={{color: '#073d63', marginTop: 0}}>Package Pricing</h2>
                <p style={{color: '#627984', marginBottom: '24px'}}>Edit your party packages and pricing</p>
                <div style={{display: 'grid', gap: '24px'}}>
                  {settings.packages.map((pkg, idx) => (
                    <div key={idx} style={{padding: '20px', background: '#f9f9f9', borderRadius: '8px', border: '1px solid #e0e0e0'}}>
                      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px'}}>
                        <label>
                          <div style={{color: '#073d63', fontWeight: '600', marginBottom: '8px', fontSize: '14px'}}>Package Name</div>
                          <input
                            type="text"
                            value={pkg.name}
                            onChange={(e) => {
                              const newPkgs = [...settings.packages];
                              newPkgs[idx].name = e.target.value;
                              setSettings({...settings, packages: newPkgs});
                            }}
                            style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}
                          />
                        </label>
                        <label>
                          <div style={{color: '#073d63', fontWeight: '600', marginBottom: '8px', fontSize: '14px'}}>Price ($)</div>
                          <input
                            type="number"
                            value={pkg.price}
                            onChange={(e) => {
                              const newPkgs = [...settings.packages];
                              newPkgs[idx].price = parseInt(e.target.value) || 0;
                              setSettings({...settings, packages: newPkgs});
                            }}
                            style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}
                          />
                        </label>
                        <label>
                          <div style={{color: '#073d63', fontWeight: '600', marginBottom: '8px', fontSize: '14px'}}>Hours</div>
                          <input
                            type="number"
                            value={pkg.hours}
                            onChange={(e) => {
                              const newPkgs = [...settings.packages];
                              newPkgs[idx].hours = parseInt(e.target.value) || 0;
                              setSettings({...settings, packages: newPkgs});
                            }}
                            style={{width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'images' && (
              <div>
                <h2 style={{color: '#073d63', marginTop: 0}}>🖼️ Image Management</h2>
                <p style={{color: '#627984', marginBottom: '24px'}}>Manage hero images and media files</p>
                <div style={{display: 'grid', gap: '24px'}}>
                  <div style={{padding: '20px', background: '#f9f9f9', borderRadius: '8px', border: '2px dashed #ddd', textAlign: 'center'}}>
                    <p style={{color: '#999', marginBottom: '16px'}}>📤 Hero Image Upload</p>
                    <label style={{display: 'inline-block', padding: '12px 24px', background: '#e96eaa', color: 'white', borderRadius: '6px', cursor: 'pointer', fontWeight: '600'}}>
                      Choose File
                      <input type="file" accept="image/*" style={{display: 'none'}} onChange={(e) => console.log('Image upload:', e.target.files[0])} />
                    </label>
                    <p style={{color: '#999', fontSize: '12px', marginTop: '12px'}}>Max 5MB • PNG, JPG, GIF</p>
                  </div>
                  <div style={{padding: '16px', background: '#e8f4f8', borderRadius: '8px', border: '1px solid #c0e8f0'}}>
                    <p style={{color: '#0a5568', fontWeight: '600', margin: '0 0 8px 0'}}>ℹ️ Image Management Pro Features</p>
                    <ul style={{margin: 0, paddingLeft: '20px', color: '#0a5568', fontSize: '14px'}}>
                      <li>Image cropping & resizing</li>
                      <li>Background removal & filters</li>
                      <li>Batch upload multiple images</li>
                      <li>CDN optimization & compression</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sections' && (
              <div>
                <h2 style={{color: '#073d63', marginTop: 0}}>Page Sections</h2>
                <p style={{color: '#627984', marginBottom: '24px'}}>Show or hide sections on your website</p>
                <div style={{display: 'grid', gap: '16px'}}>
                  {Object.entries(settings.sections).map(([key, value]) => (
                    <label key={key} style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f9f9f9', borderRadius: '6px', cursor: 'pointer'}}>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => handleToggleSection(key)}
                        style={{width: '18px', height: '18px', cursor: 'pointer'}}
                      />
                      <span style={{color: '#073d63', fontWeight: '500', textTransform: 'capitalize'}}>
                        {key.replace(/([A-Z])/g, ' $1').replace('show', '')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{marginTop: '32px', paddingTop: '32px', borderTop: '1px solid #e0e0e0', display: 'flex', gap: '12px'}}>
              <button onClick={saveSettings} style={{padding: '12px 24px', background: '#e96eaa', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600'}}>
                💾 Save Changes
              </button>
              <button onClick={resetSettings} style={{padding: '12px 24px', background: '#f0f0f0', color: '#073d63', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer', fontWeight: '600'}}>
                ↺ Reset to Defaults
              </button>
              {saved && <span style={{color: '#18b7bd', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px'}}>✓ Saved!</span>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

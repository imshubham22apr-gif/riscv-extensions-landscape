import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, EyeOff, Lock, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="page-container" style={{ padding: '120px 0' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to="/" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontSize: '14px', marginBottom: '24px', display: 'block', fontWeight: '600' }}>← Back to Landscape</Link>
          <h1 className="serif" style={{ fontSize: '64px', marginBottom: '32px', letterSpacing: '-0.02em' }}>Privacy & Transparency</h1>
          <p style={{ fontSize: '24px', color: 'var(--text-secondary)', marginBottom: '64px', lineHeight: '1.4' }}>
            Built for developers, with respect for privacy and technical integrity.
          </p>

          <div className="doc-section" style={{ marginBottom: '80px' }}>
            <h2 className="serif" style={{ fontSize: '40px', marginBottom: '24px' }}>No Tracking. Period.</h2>
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              The RISC-V Extensions Landscape is a statically hosted open-source project. We believe that a technical reference for architecture should not be a vehicle for user tracking.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '48px' }}>
              <div style={{ textAlign: 'center' }}>
                <EyeOff size={32} style={{ color: 'var(--accent-color)', marginBottom: '16px' }} />
                <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>No Cookies</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>We do not store any local cookies or persistent identifiers.</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Lock size={32} style={{ color: 'var(--accent-color)', marginBottom: '16px' }} />
                <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>Purely Static</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Data is served from immutable JSON files in the repo.</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Globe size={32} style={{ color: 'var(--accent-color)', marginBottom: '16px' }} />
                <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>Open Source</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>The entire source is visible and auditable on GitHub.</p>
              </div>
            </div>
          </div>

          <div className="doc-section" style={{ marginBottom: '80px' }}>
            <h2 className="serif" style={{ fontSize: '40px', marginBottom: '24px' }}>Technical Integrity</h2>
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Our "Privacy" extends to the integrity of the data we present. By separating technical encodings from catalog metadata, we ensure that:
            </p>
            <ul style={{ fontSize: '16px', lineHeight: '2.2', color: 'var(--text-secondary)' }}>
              <li><strong>Verification</strong>: Instruction Match/Mask pairs can be verified against the official RISC-V ISA manuals.</li>
              <li><strong>History</strong>: Discontinued extensions are preserved with clear badges to maintain historic ecosystem context.</li>
              <li><strong>Independence</strong>: The tool works entirely offline once loaded, ensuring your research is private.</li>
            </ul>
          </div>

          <div className="doc-section">
            <h2 className="serif" style={{ fontSize: '40px', marginBottom: '24px' }}>Community Accountability</h2>
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              If you discover any data inaccuracies or have concerns about how technical specs are visualized, we encourage you to open a public issue on our GitHub repository. This transparency ensures the tool remains a trusted reference for the global RISC-V community.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;

import React from 'react';
import { motion } from 'framer-motion';
import { Book, Code, Cpu, ShieldCheck, Zap, Layers, RefreshCw, Terminal, Globe, Box, PlusCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DocCard = ({ title, description, icon: Icon, children }) => (
  <div style={{ background: 'var(--card-bg)', padding: '32px', borderRadius: '24px', border: '1px solid var(--card-border)', marginBottom: '32px' }}>
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
      <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>
        <Icon size={24} />
      </div>
      <h3 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>{title}</h3>
    </div>
    <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>{description}</p>
    {children}
  </div>
);

const CodeBlock = ({ code, language = 'bash' }) => (
  <pre style={{ fontSize: '14px', background: 'rgba(0,0,0,0.03)', padding: '24px', borderRadius: '16px', overflowX: 'auto', border: '1px solid var(--card-border)', marginBottom: '24px' }}>
    <code style={{ fontFamily: '"SF Mono", "Fira Code", monospace', color: 'var(--text-primary)' }}>{code}</code>
  </pre>
);

const Documentation = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="page-container" style={{ padding: '100px 0' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <motion.div variants={container} initial="hidden" animate="show">
          
          {/* Header */}
          <motion.div variants={item} style={{ marginBottom: '80px' }}>
            <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
              <ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} /> Back to Landscape
            </Link>
            <h1 className="serif" style={{ fontSize: '72px', marginBottom: '24px', letterSpacing: '-0.03em' }}>Documentation</h1>
            <p style={{ fontSize: '22px', color: 'var(--text-secondary)', maxWidth: '700px', lineHeight: '1.5' }}>
              Architecture, data models, and synchronization tools for the RISC-V Extensions Landscape.
            </p>
          </motion.div>

          {/* Quickstart Section */}
          <motion.div variants={item} style={{ marginBottom: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <Terminal size={20} />
              <h2 className="serif" style={{ fontSize: '32px', margin: 0 }}>Quickstart</h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ background: 'var(--card-bg)', padding: '32px', borderRadius: '24px', border: '1px solid var(--card-border)' }}>
                <h4 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><Globe size={16} /> Local Development</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Run the portal locally using Node.js and npm.</p>
                <CodeBlock code={`npm install\nnpm run build\nnpx vite preview`} />
              </div>
              <div style={{ background: 'var(--card-bg)', padding: '32px', borderRadius: '24px', border: '1px solid var(--card-border)' }}>
                <h4 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><Box size={16} /> Docker (Optional)</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Containerized environment for consistent testing.</p>
                <CodeBlock code={`docker compose up --build\n# Open http://localhost:8080`} />
              </div>
            </div>
          </motion.div>

          {/* Core Concepts */}
          <motion.div variants={item} style={{ marginBottom: '100px' }}>
            <h2 className="serif" style={{ fontSize: '40px', marginBottom: '48px' }}>Core Concepts</h2>
            
            <DocCard 
              title="1. The Data Model" 
              description="A strict separation between extension metadata and instruction encoding details." 
              icon={Layers}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ padding: '16px', borderRadius: '16px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.02)' }}>
                  <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>Extension Catalog</div>
                  <code style={{ fontSize: '12px', opacity: 0.6 }}>src/riscv_extensions.json</code>
                </div>
                <div style={{ padding: '16px', borderRadius: '16px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.02)' }}>
                  <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>Instruction Dictionary</div>
                  <code style={{ fontSize: '12px', opacity: 0.6 }}>src/instr_dict.json</code>
                </div>
              </div>
            </DocCard>

            <DocCard 
              title="2. Automated Sync" 
              description="Accuracy against upstream riscv-opcodes is maintained via sync scripts." 
              icon={RefreshCw}
            >
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                The script reconciles mnemonic lists and populates 32-bit match/mask data automatically.
              </p>
              <CodeBlock code={`node scripts/sync_instructions.mjs --reconcile --report`} />
            </DocCard>

            <DocCard 
              title="3. Encoder Validator" 
              description="Validate new instruction proposals for bitwise conflicts in real-time." 
              icon={ShieldCheck}
            >
              <ul style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '2' }}>
                <li>Normalizes patterns into Match/Mask pairs.</li>
                <li>Identifies overlaps and subset/superset relationships.</li>
                <li>Generates plain-language conflict reports for mailing lists.</li>
              </ul>
            </DocCard>
          </motion.div>

          {/* Contribution Workflow */}
          <motion.div variants={item} style={{ marginBottom: '100px' }}>
            <h2 className="serif" style={{ fontSize: '40px', marginBottom: '48px' }}>Contribution Workflow</h2>
            
            <div style={{ position: 'relative', paddingLeft: '40px' }}>
              <div style={{ position: 'absolute', left: '12px', top: '0', bottom: '0', width: '1px', background: 'var(--card-border)' }} />
              
              {[
                { step: "Step 1", title: "Add to Catalog", detail: "Identify the group in riscv_extensions.json and add extension metadata (ID, name, description)." },
                { step: "Step 2", title: "Map Mnemonics", detail: "Edit src/App.jsx and add the mnemonics to the right extension ID list in the visualizer logic." },
                { step: "Step 3", title: "Update Dictionary", detail: "Add encoding details (match, mask, variable_fields) to instr_dict.json." },
                { step: "Step 4", title: "Sync & Verify", detail: "Run the sync script and verify via the local development server." }
              ].map((s, idx) => (
                <div key={idx} style={{ position: 'relative', marginBottom: '40px' }}>
                  <div style={{ position: 'absolute', left: '-33px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--text-primary)', border: '4px solid var(--bg-color)' }} />
                  <div style={{ fontWeight: 800, fontSize: '12px', color: 'var(--accent-color)', textTransform: 'uppercase', marginBottom: '4px' }}>{s.step}</div>
                  <h4 style={{ fontSize: '20px', marginBottom: '8px' }}>{s.title}</h4>
                  <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{s.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Footer Info */}
          <motion.div variants={item} style={{ borderTop: '1px solid var(--card-border)', paddingTop: '60px', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '24px' }}>
              Built for the RISC-V Ecosystem. 
            </p>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
              <a href="https://github.com/rpsene/riscv-extensions-landscape" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Code size={18} /> View Source on GitHub
              </a>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

export default Documentation;

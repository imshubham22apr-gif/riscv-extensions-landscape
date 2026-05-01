import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Cpu, ChevronRight, Sun, Moon, ArrowUpRight, Zap, Shield, Database, CheckCircle2, Circle, Download, GitCompare, BarChart3, Terminal } from 'lucide-react';
import RISCV_DATA from './riscv_extensions.json';
import COVERAGE_DATA from './coverage_report.json';
import './index.css';

// Pages
import Documentation from './pages/Documentation';
import Privacy from './pages/Privacy';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ExtensionCard = ({ extension, onClick, isSelected, isHighlighted, isDimmed, index }) => {
  const isMapped = extension.coverage > 0;
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02, duration: 0.4 }}
      className={`card ${isSelected ? 'selected' : ''} ${isHighlighted ? 'highlighted' : ''} ${isDimmed ? 'dimmed' : ''}`}
      onClick={() => onClick(extension)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div className="card-id">{extension.id}</div>
        {isMapped && <CheckCircle2 size={14} style={{ color: 'var(--text-primary)', opacity: 0.4 }} />}
      </div>
      <h3 className="card-name">{extension.name} <ArrowUpRight size={14} style={{ opacity: 0.4 }} /></h3>
      <p className="card-desc line-clamp-2">{extension.desc}</p>
    </motion.div>
  );
};

const InstructionRow = ({ instr }) => {
  const [encoding, setEncoding] = useState(instr.encoding);
  
  const toggleBit = (index) => {
    const bits = encoding.split('');
    if (bits[index] === '0') bits[index] = '1';
    else if (bits[index] === '1') bits[index] = '0';
    // Ignore '-' (don't care) or toggle them if you want, but standard is 0/1 toggle
    setEncoding(bits.join(''));
  };

  const calculateHex = (bitStr) => {
    const binary = bitStr.replace(/-/g, '0');
    return '0x' + parseInt(binary, 2).toString(16).toUpperCase().padStart(8, '0');
  };

  return (
    <div className="instruction-row" style={{ padding: '16px 0', borderBottom: '1px solid var(--card-border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <code style={{ color: 'var(--accent-color)', fontWeight: '700', fontSize: '14px' }}>{instr.mnemonic}</code>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', opacity: 0.5, fontFamily: 'monospace' }}>Match: {calculateHex(encoding)}</span>
          <button 
            onClick={() => setEncoding(instr.encoding)} 
            style={{ background: 'none', border: 'none', color: 'var(--accent-color)', fontSize: '10px', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="encoding-bar" style={{ display: 'flex', gap: '2px' }}>
        {encoding.split('').map((bit, i) => (
          <motion.div 
            key={i} 
            whileHover={{ scaleY: 1.2 }}
            onClick={() => toggleBit(i)}
            style={{ 
              flex: 1, 
              height: '20px', 
              background: bit === '-' ? 'var(--card-border)' : (bit === '1' ? 'var(--text-primary)' : 'rgba(0, 0, 0, 0.12)'),
              opacity: bit === '-' ? 0.3 : 1,
              borderRadius: '2px',
              cursor: bit === '-' ? 'default' : 'pointer',
              transition: 'background 0.2s ease'
            }} 
            title={`Bit ${31-i}: ${bit} (Click to toggle)`}
          />
        ))}
      </div>
    </div>
  );
};

const DetailSidebar = ({ extension, isDarkMode }) => {
  if (!extension) {
    return (
      <div className="details-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div>
          <Cpu size={48} style={{ opacity: 0.1, marginBottom: '20px' }} />
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Select an extension to view<br/>technical specifications.</p>
        </div>
      </div>
    );
  }

  const instructions = extension.instructions || [];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      key={extension.id}
      className="details-card"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <h2 className="serif" style={{ fontSize: '48px', margin: 0 }}>{extension.id} <ArrowUpRight size={20} style={{ opacity: 0.4 }} /></h2>
      </div>
      
      <div className="details-section">
        <h4>Description</h4>
        <p style={{ fontSize: '18px', color: 'var(--text-primary)', lineHeight: '1.4' }}>{extension.name}: {extension.desc}</p>
      </div>

      <div className="details-section" style={{ background: 'rgba(0, 0, 0, 0.02)', padding: '20px', borderRadius: '12px' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Zap size={14} /> Use Case</h4>
        <p style={{ fontSize: '15px', fontStyle: 'italic', opacity: 0.8 }}>{extension.use || "General purpose computational acceleration and architectural efficiency."}</p>
      </div>

      <div className="details-section">
        <h4>Instruction Set Snapshot ({instructions.length})</h4>
        <div className="instruction-list" style={{ marginTop: '12px' }}>
          {instructions.length > 0 ? instructions.map(instr => (
            <InstructionRow key={instr.mnemonic} instr={instr} />
          )) : <p style={{ fontSize: '13px', opacity: 0.5 }}>No instruction mappings synced yet.</p>}
        </div>
      </div>

      <div className="stats-grid" style={{ marginTop: '24px' }}>
        <div className="stat-item">
          <div className="stat-label">Coverage Map</div>
          <div className="stat-value">{extension.coverage}% Synced</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Extension Status</div>
          <div className="stat-value">{extension.discontinued ? "Discontinued" : "Ratified"}</div>
        </div>
      </div>
    </motion.div>
  );
};

// ── COMPARISON TOOL ──
const ComparisonModal = ({ isOpen, onClose, allExtensions }) => {
  const [extA, setExtA] = useState('');
  const [extB, setExtB] = useState('');
  if (!isOpen) return null;
  const findExt = (id) => allExtensions.find(e => e.id === id);
  const a = findExt(extA);
  const b = findExt(extB);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
        style={{ background: 'var(--card-bg)', borderRadius: '24px', padding: '40px', maxWidth: '900px', width: '100%', maxHeight: '80vh', overflow: 'auto', border: '1px solid var(--card-border)' }}
        onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 className="serif" style={{ fontSize: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}><GitCompare size={24} /> Extension Comparison</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}><X size={20} /></button>
        </div>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
          <select value={extA} onChange={e => setExtA(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid var(--card-border)', background: 'var(--card-bg)', color: 'var(--text-primary)', fontSize: '14px' }}>
            <option value="">Select Extension A</option>
            {allExtensions.map(e => <option key={e.id} value={e.id}>{e.id} – {e.name}</option>)}
          </select>
          <select value={extB} onChange={e => setExtB(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid var(--card-border)', background: 'var(--card-bg)', color: 'var(--text-primary)', fontSize: '14px' }}>
            <option value="">Select Extension B</option>
            {allExtensions.map(e => <option key={e.id} value={e.id}>{e.id} – {e.name}</option>)}
          </select>
        </div>
        {a && b && (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead><tr style={{ borderBottom: '2px solid var(--card-border)' }}>
              <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-secondary)' }}>Property</th>
              <th style={{ padding: '12px', textAlign: 'left', color: 'var(--accent-color)' }}>{a.id}</th>
              <th style={{ padding: '12px', textAlign: 'left', color: 'var(--accent-color)' }}>{b.id}</th>
            </tr></thead>
            <tbody>
              {[['Name', a.name, b.name], ['Description', a.desc, b.desc], ['Coverage', a.coverage + '%', b.coverage + '%'], ['Instructions', (a.instructions||[]).length, (b.instructions||[]).length], ['Profiles', (a.profiles||[]).join(', ')||'None', (b.profiles||[]).join(', ')||'None'], ['Status', a.discontinued ? 'Discontinued' : 'Ratified', b.discontinued ? 'Discontinued' : 'Ratified']].map(([label, va, vb]) => (
                <tr key={label} style={{ borderBottom: '1px solid var(--card-border)' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{label}</td>
                  <td style={{ padding: '12px', background: String(va) !== String(vb) ? 'rgba(251,191,36,0.08)' : 'transparent' }}>{va}</td>
                  <td style={{ padding: '12px', background: String(va) !== String(vb) ? 'rgba(79,70,229,0.08)' : 'transparent' }}>{vb}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>
    </motion.div>
  );
};

// ── ASSEMBLY TO HEX CONVERTER ──
const AssemblerModal = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('ADD x1, x2, x3');
  const [result, setResult] = useState(null);
  const OPCODE_MAP = {
    'ADD': { funct7: '0000000', funct3: '000', opcode: '0110011' },
    'SUB': { funct7: '0100000', funct3: '000', opcode: '0110011' },
    'AND': { funct7: '0000000', funct3: '111', opcode: '0110011' },
    'OR':  { funct7: '0000000', funct3: '110', opcode: '0110011' },
    'XOR': { funct7: '0000000', funct3: '100', opcode: '0110011' },
    'SLL': { funct7: '0000000', funct3: '001', opcode: '0110011' },
    'SRL': { funct7: '0000000', funct3: '101', opcode: '0110011' },
    'SRA': { funct7: '0100000', funct3: '101', opcode: '0110011' },
    'SLT': { funct7: '0000000', funct3: '010', opcode: '0110011' },
    'MUL': { funct7: '0000001', funct3: '000', opcode: '0110011' },
    'DIV': { funct7: '0000001', funct3: '100', opcode: '0110011' },
    'REM': { funct7: '0000001', funct3: '110', opcode: '0110011' },
  };
  const assemble = () => {
    try {
      const parts = input.trim().replace(/,/g, '').split(/\s+/);
      const mnemonic = parts[0].toUpperCase();
      const info = OPCODE_MAP[mnemonic];
      if (!info) { setResult({ error: `Unknown: ${mnemonic}. Supported: ${Object.keys(OPCODE_MAP).join(', ')}` }); return; }
      const parseReg = (r) => parseInt(r.replace(/[xX]/, ''), 10).toString(2).padStart(5, '0');
      const rd = parseReg(parts[1]), rs1 = parseReg(parts[2]), rs2 = parseReg(parts[3]);
      const binary = info.funct7 + rs2 + rs1 + info.funct3 + rd + info.opcode;
      const hex = '0x' + parseInt(binary, 2).toString(16).toUpperCase().padStart(8, '0');
      setResult({ binary, hex, mnemonic, rd: parts[1], rs1: parts[2], rs2: parts[3] });
    } catch (e) { setResult({ error: 'Invalid format. Use: ADD x1, x2, x3' }); }
  };
  if (!isOpen) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
        style={{ background: 'var(--card-bg)', borderRadius: '24px', padding: '40px', maxWidth: '600px', width: '100%', border: '1px solid var(--card-border)' }}
        onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 className="serif" style={{ fontSize: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}><Terminal size={24} /> Assembly → Hex</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}><X size={20} /></button>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="ADD x1, x2, x3"
            style={{ flex: 1, padding: '14px 16px', borderRadius: '12px', border: '1px solid var(--card-border)', background: 'rgba(128,128,128,0.05)', color: 'var(--text-primary)', fontSize: '16px', fontFamily: 'monospace' }}
            onKeyDown={e => e.key === 'Enter' && assemble()} />
          <button onClick={assemble} style={{ padding: '14px 24px', borderRadius: '12px', border: 'none', background: 'var(--text-primary)', color: 'var(--bg-color)', fontWeight: 700, cursor: 'pointer', fontSize: '14px' }}>Convert</button>
        </div>
        {result && !result.error && (
          <div style={{ background: 'rgba(79,70,229,0.05)', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>MACHINE CODE</span>
              <code style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent-color)' }}>{result.hex}</code>
            </div>
            <div style={{ display: 'flex', gap: '2px', marginBottom: '16px' }}>
              {result.binary.split('').map((bit, i) => (
                <div key={i} style={{ flex: 1, height: '24px', background: bit === '1' ? 'var(--text-primary)' : 'rgba(79,70,229,0.3)', borderRadius: '2px' }} title={`Bit ${31-i}: ${bit}`} />
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', fontSize: '12px' }}>
              <div style={{ background: 'var(--card-bg)', padding: '8px', borderRadius: '8px', textAlign: 'center' }}><span style={{ color: 'var(--text-secondary)' }}>rd</span><br/><strong>{result.rd}</strong></div>
              <div style={{ background: 'var(--card-bg)', padding: '8px', borderRadius: '8px', textAlign: 'center' }}><span style={{ color: 'var(--text-secondary)' }}>rs1</span><br/><strong>{result.rs1}</strong></div>
              <div style={{ background: 'var(--card-bg)', padding: '8px', borderRadius: '8px', textAlign: 'center' }}><span style={{ color: 'var(--text-secondary)' }}>rs2</span><br/><strong>{result.rs2}</strong></div>
            </div>
          </div>
        )}
        {result && result.error && <p style={{ color: '#ff6b6b', fontSize: '14px' }}>{result.error}</p>}
      </motion.div>
    </motion.div>
  );
};

// ── ANALYTICS DASHBOARD ──
// ── CONTRIBUTION MODAL ──
const ContributionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
        style={{ background: 'var(--card-bg)', borderRadius: '24px', padding: '40px', maxWidth: '500px', width: '100%', border: '1px solid var(--card-border)', textAlign: 'center' }}
        onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}><X size={20} /></button>
        </div>
        <div style={{ background: 'rgba(52, 199, 89, 0.1)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <Database size={32} style={{ color: 'var(--success-color)' }} />
        </div>
        <h2 className="serif" style={{ fontSize: '24px', marginBottom: '12px' }}>Contribute Tech Specs</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '32px' }}>Help us bridge the mapping gap. Submit instruction details for unmapped extensions.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
          <input placeholder="Extension ID (e.g. Zacas)" style={{ padding: '14px', borderRadius: '12px', border: '1px solid var(--card-border)', background: 'var(--bg-color)', color: 'var(--text-primary)' }} />
          <textarea placeholder="Instruction details or mnemonic..." rows={4} style={{ padding: '14px', borderRadius: '12px', border: '1px solid var(--card-border)', background: 'var(--bg-color)', color: 'var(--text-primary)', resize: 'none' }} />
          <button onClick={() => { alert('Thank you for your contribution! The team will review it.'); onClose(); }} 
            style={{ padding: '16px', borderRadius: '12px', border: 'none', background: 'var(--text-primary)', color: 'var(--bg-color)', fontWeight: 700, marginTop: '12px', cursor: 'pointer' }}>Submit for Review</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AnalyticsDashboard = ({ allExtensions }) => {
  const totalExt = allExtensions.length;
  const mappedExt = allExtensions.filter(e => (e.instructions || []).length > 0).length;
  const totalInstr = allExtensions.reduce((sum, e) => sum + (e.instructions || []).length, 0);
  const coveragePct = parseFloat(((mappedExt / totalExt) * 100).toFixed(1));

  const groupStats = RISCV_DATA.groups.map(g => {
    const total = g.extensions.length;
    const mapped = g.extensions.filter(e => (e.instructions || []).length > 0).length;
    return { name: g.name, total, mapped, pct: total > 0 ? ((mapped / total) * 100).toFixed(0) : 0 };
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '80px' }}>
      <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><BarChart3 size={16} /> Coverage Analytics</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', alignItems: 'center', marginBottom: '48px' }}>
        {/* BIG GAUGE */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'var(--card-bg)', padding: '40px', borderRadius: '24px', border: '1px solid var(--card-border)', position: 'relative' }}>
          <svg width="200" height="200" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="50" cy="50" r="45" fill="none" stroke="var(--card-border)" strokeWidth="8" />
            <motion.circle cx="50" cy="50" r="45" fill="none" stroke="var(--text-primary)" strokeWidth="8"
              strokeDasharray="282.7" initial={{ strokeDashoffset: 282.7 }} animate={{ strokeDashoffset: 282.7 - (282.7 * coveragePct) / 100 }}
              transition={{ duration: 1.5, ease: "easeOut" }} strokeLinecap="round" />
          </svg>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', marginTop: '20px' }}>
            <div style={{ fontSize: '38px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.05em' }}>{coveragePct}%</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Ecosystem</div>
          </div>
        </div>

        {/* STAT CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[
            ['Total Extensions', totalExt], 
            ['Mapped Modules', mappedExt], 
            ['Catalog Depth', totalInstr], 
            ['Sync Status', 'Active']
          ].map(([label, value]) => (
            <div key={label} style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '20px', padding: '24px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>{label}</div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
        {groupStats.map(g => (
          <div key={g.name} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '8px 0' }}>
            <span style={{ fontSize: '13px', fontWeight: 500, width: '220px', flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-secondary)' }}>{g.name}</span>
            <div style={{ flex: 1, height: '4px', background: 'var(--card-border)', borderRadius: '2px', overflow: 'hidden' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: g.pct + '%' }} transition={{ duration: 1, delay: 0.2 }} style={{ height: '100%', background: 'var(--text-primary)', borderRadius: '2px' }} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, width: '80px', textAlign: 'right', color: 'var(--text-primary)' }}>{g.pct}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const LandscapeMain = ({ isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfile, setSelectedProfile] = useState('All');
  const [selectedExtension, setSelectedExtension] = useState(RISCV_DATA.groups[0].extensions[0]);
  const [showComparison, setShowComparison] = useState(false);
  const [showAssembler, setShowAssembler] = useState(false);
  const [showContribute, setShowContribute] = useState(false);

  const allExtensions = useMemo(() => RISCV_DATA.groups.flatMap(g => g.extensions), []);

  // Highlight logic: matching tiles get a border, others get dimmed if search is active
  const isSearchActive = searchTerm.length > 0;

  // Export function
  const exportMarkdown = (ext) => {
    if (!ext) return;
    const instrs = (ext.instructions || []).map(i => `| ${i.mnemonic} | \`${i.encoding}\` |`).join('\n');
    const md = `# ${ext.id} — ${ext.name}\n\n**Description:** ${ext.desc}\n\n**Profiles:** ${(ext.profiles || []).join(', ') || 'None'}\n\n**Coverage:** ${ext.coverage}%\n\n**Status:** ${ext.discontinued ? 'Discontinued' : 'Ratified'}\n\n## Instructions (${(ext.instructions || []).length})\n\n| Mnemonic | Encoding |\n|---|---|\n${instrs || '| No instructions mapped | — |'}\n\n---\n*Generated by RISC-V Extensions Landscape Portal*\n`;
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${ext.id}_spec.md`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <header className="hero">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="serif">
              Mapping the <span className="italic">RISC-V</span> <br />
              Landscape.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              A high-fidelity technical reference for the world's most <br />
              versatile open instruction set architecture.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 0.3 }}
              style={{ 
                marginTop: '32px', 
                padding: '6px 14px', 
                background: 'rgba(52, 199, 89, 0.08)', 
                border: '1px solid rgba(52, 199, 89, 0.2)',
                borderRadius: '100px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                color: 'var(--success-color)',
                fontWeight: '600'
              }}
            >
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success-color)', boxShadow: '0 0 8px var(--success-color)' }} />
              Live Dashboard: {COVERAGE_DATA.stats.coveragePercentage} Unified Coverage
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ marginTop: '48px', width: '100%', maxWidth: '600px' }}>
              <div className="search-container">
                <Search className="search-icon" size={18} />
                <input 
                  type="text" 
                  placeholder="Search extensions by ID, name, or description..." 
                  className="search-input"
                  style={{ width: '100%', padding: '16px 20px 16px 54px', borderRadius: '16px' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '12px' }}>
                Typing here will highlight matching tiles (case insensitive).
              </p>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="container">

        <AnalyticsDashboard allExtensions={allExtensions} />

        <div className="main-layout">
          <div className="content-area">
            {RISCV_DATA.groups.map(group => (
              <section key={group.name} style={{ marginBottom: '40px' }}>
                <h2 className="section-title">{group.name}</h2>
                <div className="grid">
                  {group.extensions.map((ext, idx) => {
                    const matchesSearch = isSearchActive && (
                      ext.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      ext.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      ext.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      (ext.instructions && ext.instructions.some(instr => instr.mnemonic.toLowerCase().includes(searchTerm.toLowerCase())))
                    );
                    
                    const isProfileMatch = selectedProfile === 'All' || ext.profiles.includes(selectedProfile);

                    return (
                      <ExtensionCard 
                        key={ext.id} 
                        extension={ext} 
                        isSelected={selectedExtension?.id === ext.id}
                        isHighlighted={matchesSearch}
                        isDimmed={(isSearchActive && !matchesSearch) || (!isSearchActive && !isProfileMatch)}
                        index={idx} 
                        onClick={setSelectedExtension}
                      />
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
          <aside className="sidebar">
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Shield size={12} /> Architectural Profiles
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['All', ...RISCV_DATA.profiles].map(profile => (
                  <button 
                    key={profile}
                    className={`profile-pill ${selectedProfile === profile ? 'active' : ''}`}
                    onClick={() => setSelectedProfile(profile)}
                    style={{ fontSize: '11px', padding: '6px 12px' }}
                  >
                    {profile}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <button onClick={() => exportMarkdown(selectedExtension)} style={{ flex: 1, padding: '10px', borderRadius: '12px', border: '1px solid var(--card-border)', background: 'var(--card-bg)', color: 'var(--text-primary)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Download size={14} /> Export .md
              </button>
              <button onClick={() => setShowComparison(true)} style={{ flex: 1, padding: '10px', borderRadius: '12px', border: '1px solid var(--card-border)', background: 'var(--card-bg)', color: 'var(--text-primary)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <GitCompare size={14} /> Compare
              </button>
              <button onClick={() => setShowAssembler(true)} style={{ flex: 1, padding: '10px', borderRadius: '12px', border: '1px solid var(--card-border)', background: 'var(--card-bg)', color: 'var(--text-primary)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Terminal size={14} /> ASM→Hex
              </button>
            </div>
            <button onClick={() => setShowContribute(true)} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px dashed var(--card-border)', background: 'rgba(52, 199, 89, 0.05)', color: 'var(--success-color)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
              <Database size={14} /> Contribute Missing Data
            </button>
            <DetailSidebar extension={selectedExtension} isDarkMode={isDarkMode} />
          </aside>
        </div>
      </main>

      <AnimatePresence>
        {showComparison && <ComparisonModal isOpen={showComparison} onClose={() => setShowComparison(false)} allExtensions={allExtensions} />}
        {showAssembler && <AssemblerModal isOpen={showAssembler} onClose={() => setShowAssembler(false)} />}
        {showContribute && <ContributionModal isOpen={showContribute} onClose={() => setShowContribute(false)} />}
      </AnimatePresence>
    </>
  );
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : '';
  }, [isDarkMode]);

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <nav className="navbar">
          <div className="container nav-content">
            <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg-color)' }}>
                <Cpu size={18} />
              </div>
              <span className="serif italic" style={{ fontSize: '20px' }}>RISC-V Landscape</span>
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <Link to="/documentation" style={{ fontSize: '14px', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500' }}>Docs</Link>
              <Link to="/privacy" style={{ fontSize: '14px', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500' }}>Privacy</Link>
              <a href="https://github.com/rpsene/riscv-extensions-landscape" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
                GitHub <ArrowUpRight size={12} />
              </a>
              <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<LandscapeMain isDarkMode={isDarkMode} />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>

        <footer style={{ marginTop: '120px', paddingBottom: '60px', borderTop: '1px solid var(--card-border)', paddingTop: '60px', color: 'var(--text-secondary)', fontSize: '13px', textAlign: 'center' }}>
          <p>© 2026 RISC-V International. Part of the LFX Mentorship Program.</p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
            <Link to="/documentation" style={{ color: 'inherit', textDecoration: 'none' }}>Documentation</Link>
            <a href="https://github.com/rpsene/riscv-extensions-landscape" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>GitHub</a>
            <Link to="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</Link>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

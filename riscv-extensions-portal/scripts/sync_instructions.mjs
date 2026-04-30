import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
const extensionsPath = path.join(__dirname, 'src', 'riscv_extensions.json');
const dictPath = path.join(__dirname, 'src', 'instr_dict.json');

// Re-map riscv-opcodes names to Catalog IDs
const RECONCILIATION_MAP = {
  "rv_i": ["RV32I", "RV64I", "RV32E", "RV64E", "RV128I", "I"],
  "rv_a": ["A", "Zaamo", "Zalrsc", "Zacas", "Zalasr", "Ziccrse"],
  "rv_c": ["C", "Zca", "Zcb", "Zcd", "Zce", "Zcf", "Zcmp", "Zcmt", "Zcmop", "Zclsd", "Zcmlsd"],
  "rv_m": ["M", "Zmmul"],
  "rv_f": ["F", "Zfinx", "Zfa", "Zfbfmin", "Zfh", "Zfhmin"],
  "rv_d": ["D", "Zdinx"],
  "rv_h": ["H"],
  "rv_zba": ["Zba"],
  "rv_zbb": ["Zbb"],
  "rv_zbc": ["Zbc"],
  "rv_zbs": ["Zbs"],
  "rv_v": ["V", "Zv", "Zve", "Zve32x", "Zve32f", "Zve64x", "Zve64f", "Zve64d", "Zvl32b", "Zvl64b", "Zvl128b", "Zvl256b", "Zvl512b", "Zvl1024b", "Zvf", "Zvfh", "Zvfhmin", "Zvfbfmin", "Zvfofp8min", "Zvabd", "Zvw"],
  "rv_system": ["Zicsr", "Zifencei", "Zihintpause", "Zihintntl", "Zihpm", "Zicntr", "Zicfilp", "Zicfiss", "Zimop", "Ztso", "Zic64b", "Zicbom", "Zicbop", "Zicboz"],
  "rv_s": ["S", "Sv32", "Sv39", "Sv48", "Sv57", "Svbare", "Svpbmt", "Svnapot", "Svinval", "Svade", "Svadu", "Smaia", "Ssaia", "Sstc", "Smstateen", "Ssstateen", "Sstvala", "Sstvecd", "Sstvecv", "Ssdtso", "Sstcfg", "Ssstrict", "Ssu32xl", "Ssu64xl", "Ssube", "Ssvxscr", "Ssptead", "Smcfiss", "Smnpm", "Smtdeleg", "Smvatag"],
  "rv_zkne": ["Zkne", "Zkn", "Zk"],
  "rv_zknd": ["Zknd", "Zkn", "Zk"],
  "rv_zknh": ["Zknh", "Zkn", "Zk"],
  "rv_zksed": ["Zksed", "Zks", "Zk"],
  "rv_zksh": ["Zksh", "Zks", "Zk"],
  "rv_zbkb": ["Zbkb", "Zbkc", "Zbkx"],
  "rv_zvkned": ["Zvkned", "Zvkn"],
  "rv_zvknha": ["Zvknha", "Zvkn"],
  "rv_zvksed": ["Zvksed", "Zvks"],
  "rv_zvksh": ["Zvksh", "Zvks"],
  "rv_zvkg": ["Zvkg", "Zvkn", "Zvks"],
  "rv_zvkb": ["Zvkb", "Zvkn", "Zvks"],
  "rv_zvbc": ["Zvbc", "Zvbc32e"],
  "rv_svinval": ["Svinval"],
  "rv_zimop": ["Zimop"]
};

function sync() {
    console.log("🚀 Starting RISC-V Instruction Sync...");
    
    const extensions = JSON.parse(fs.readFileSync(extensionsPath, 'utf8'));
    const dict = JSON.parse(fs.readFileSync(dictPath, 'utf8'));
    
    let totalMapped = 0;
    let totalExtensions = 0;

    extensions.groups.forEach(group => {
        group.extensions.forEach(ext => {
            totalExtensions++;
            // Simple mapping logic: search dict for instructions belonging to this extension
            const mappedInstructions = Object.entries(dict).filter(([key, info]) => {
                const upstreamNames = info.extension || [];
                return upstreamNames.some(name => RECONCILIATION_MAP[name]?.includes(ext.id));
            });

            ext.instructions = mappedInstructions.map(([mnemonic, details]) => ({
                mnemonic: mnemonic.toUpperCase().replace('_', '.'),
                ...details
            }));

            ext.coverage = ext.instructions.length > 0 ? 100 : 0;
            if (ext.coverage > 0) totalMapped++;
        });
    });

    const report = {
        timestamp: new Date().toISOString(),
        stats: {
            totalExtensions,
            mappedExtensions: totalMapped,
            coveragePercentage: ((totalMapped / totalExtensions) * 100).toFixed(2) + "%"
        }
    };

    fs.writeFileSync(extensionsPath, JSON.stringify(extensions, null, 2));
    fs.writeFileSync(path.join(__dirname, 'src', 'coverage_report.json'), JSON.stringify(report, null, 2));
    
    console.log("✅ Sync Complete!");
    console.log(`📊 Global Coverage: ${report.stats.coveragePercentage}`);
}

sync();

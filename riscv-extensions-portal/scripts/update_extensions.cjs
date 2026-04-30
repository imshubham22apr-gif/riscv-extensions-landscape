const fs = require('fs');
const path = require('path');

const riscvExtensionsFile = path.join(__dirname, '../src/riscv_extensions.json');
const currentData = JSON.parse(fs.readFileSync(riscvExtensionsFile, 'utf8'));

const newGroups = [
  {
    name: "Base ISA",
    extensions: [
      { id: "RV32I", name: "Standard Integer Base (32-bit)", desc: "The fundamental base integer instruction set for 32-bit address spaces." },
      { id: "RV64I", name: "Standard Integer Base (64-bit)", desc: "The fundamental base integer instruction set for 64-bit address spaces." },
      { id: "RV32E", name: "Embedded Base (16 regs)", desc: "A reduced version of RV32I for small embedded systems." },
      { id: "RV64E", name: "Embedded Base (64-bit, 16 regs)", desc: "64-bit address space version with reduced register set." },
      { id: "RV128I", name: "128-bit Address Space", desc: "Base ISA for 128-bit address spaces (draft)." }
    ]
  },
  {
    name: "Single-Letter Extensions",
    extensions: [
      { id: "A", name: "Atomics Bundle", desc: "Instructions for atomic memory operations." },
      { id: "B", name: "Bit-Manip Bundle", desc: "Standard extensions for bit manipulation operations." },
      { id: "C", name: "Compressed", desc: "Short 16-bit instructions to reduce code size." },
      { id: "D", name: "Double-Precision Float (64-bit)", desc: "Standard double-precision floating-point instructions." },
      { id: "F", name: "Single-Precision Float (32-bit)", desc: "Standard single-precision floating-point instructions." },
      { id: "H", name: "Hypervisor", desc: "Support for type-2 hypervisors." },
      { id: "K", name: "Crypto Umbrella (Scalar + Vector)", desc: "Scalar and Vector cryptography extensions." },
      { id: "M", name: "Integer Multiply/Divide", desc: "Standard integer multiplication and division instructions." }
    ]
  },
  {
    name: "Discontinued",
    extensions: [
      { id: "N", name: "User-Level Interrupts", desc: "Standard extension for user-level interrupts (discontinued).", discontinued: 1 },
      { id: "P", name: "Packed-SIMD", desc: "Standard extension for packed-SIMD instructions (discontinued).", discontinued: 1 },
      { id: "Q", name: "Quad-Precision Float (128-bit)", desc: "Standard quad-precision floating-point instructions.", discontinued: 1 },
      { id: "S", name: "Supervisor ISA", desc: "Standard supervisor-level instructions.", discontinued: 1 },
      { id: "U", name: "User ISA", desc: "Standard user-level instructions.", discontinued: 1 },
      { id: "V", name: "Vector (RVV)", desc: "Standard vector extensions." }
    ]
  },
  {
    name: "Bit Manipulation (Zb)",
    extensions: [
      { id: "Zba", name: "Address-Generation Bitmanip", desc: "Address generation instructions like sh1add." },
      { id: "Zbb", name: "Basic Bitmanip", desc: "Basic bit manipulation instructions." },
      { id: "Zbc", name: "Carry-less Multiply", desc: "Instructions for carry-less multiplication." },
      { id: "Zbs", name: "Single-Bit Ops", desc: "Single-bit manipulation." }
    ]
  },
  {
    name: "Atomics (Za/Zic*)",
    extensions: [
      { id: "Zaamo", name: "Atomic Memory Operations", desc: "Instructions for atomic memory operations." },
      { id: "Zacas", name: "Atomic Compare-and-Swap", desc: "Atomic compare-and-swap instructions." },
      { id: "Zalasr", name: "LR/SC Alias Rules", desc: "LR/SC alias rules." },
      { id: "Zalrsc", name: "LR/SC Extension", desc: "LR/SC Extension." },
      { id: "Ziccrse", name: "LR/SC Forward Progress", desc: "LR/SC forward progress." }
    ]
  },
  {
    name: "Compressed Instructions (Zc)",
    extensions: [
      { id: "Zca", name: "Base Compressed (no FP)", desc: "Base compressed instructions (excluding floating-point)." },
      { id: "Zcb", name: "Extra Compressed Integer", desc: "Extra compressed integer instructions." },
      { id: "Zcd", name: "Compressed Double Float", desc: "Compressed double-precision floating-point instructions." },
      { id: "Zce", name: "Embedded Compressed", desc: "Compressed instructions for embedded systems." },
      { id: "Zcf", name: "Compressed Float Load/Store", desc: "Compressed single-precision floating-point load and store instructions." },
      { id: "Zcmp", name: "Push/Pop & Reg Save/Restore", desc: "Push/pop and register save/restore instructions." },
      { id: "Zcmt", name: "Compressed Table Jumps", desc: "Compressed table jump instructions." },
      { id: "Zcmop", name: "Compressed May-Be-Ops", desc: "Compressed May-Be-Operations." },
      { id: "Zclsd", name: "Compressed LS-Pair", desc: "Compressed load/store pair instructions." },
      { id: "Zcmlsd", name: "Compressed Mem-Loop", desc: "Compressed memory loop instructions." }
    ]
  },
  {
    name: "Float & Numerics (Zf/Za)",
    extensions: [
      { id: "Zdinx", name: "FP in Integer Regs (D)", desc: "Double-precision floating-point instructions in integer registers." },
      { id: "Zfa", name: "Additional FP Instructions", desc: "Additional floating-point instructions." },
      { id: "Zfbfmin", name: "Minimal BF16 FP", desc: "Minimal Brain Floating-Point (BF16) instructions." },
      { id: "Zfh", name: "Half-Precision FP (16-bit)", desc: "Standard half-precision floating-point instructions." },
      { id: "Zfhmin", name: "Minimal Half-Precision FP", desc: "Minimal half-precision floating-point instructions." },
      { id: "Zfinx", name: "FP in Integer Regs (F)", desc: "Single-precision floating-point instructions in integer registers." },
      { id: "Zhinx", name: "FP in Integer Regs (Half)", desc: "Half-precision floating-point instructions in integer registers." },
      { id: "Zhinxmin", name: "Minimal Half-in-Int", desc: "Minimal half-precision floating-point instructions in integer registers." },
      { id: "Zmmul", name: "Multiply-Only (no DIV)", desc: "Integer multiplication-only instructions (no division)." }
    ]
  },
  {
    name: "Load/Store",
    extensions: [
      { id: "Zicclsm", name: "Misaligned L/S Support", desc: "Support for misaligned load and store operations." },
      { id: "Zilsd", name: "Load/Store Pair for RV32", desc: "Load and store pair instructions for 32-bit RISC-V." }
    ]
  },
  {
    name: "Integer",
    extensions: [
      { id: "Zicond", name: "Integer Conditional Ops", desc: "Integer conditional operations." }
    ]
  },
  {
    name: "Vector Subsets (Zv/Zve)",
    extensions: [
      { id: "Zve", name: "Embedded Vector Base", desc: "Vector extensions for embedded systems." },
      { id: "Zve32x", name: "Vec Int (32-bit, embedded)", desc: "32-bit integer vector operations for embedded." },
      { id: "Zve32f", name: "Vec FP32 (embedded)", desc: "32-bit floating-point vector operations for embedded." },
      { id: "Zve64x", name: "Vec Int (64-bit, embedded)", desc: "64-bit integer vector operations for embedded." },
      { id: "Zve64f", name: "Vec FP32+Int (64-bit, embedded)", desc: "64-bit integer and 32-bit floating-point vector operations for embedded." },
      { id: "Zve64d", name: "Vec FP64+FP32+Int", desc: "64-bit integer, 32-bit, and 64-bit floating-point vector operations." },
      { id: "Zv", name: "Vector Alias for V", desc: "Vector alias for the V extension." },
      { id: "Zvl32b", name: "Min VLEN \u2265 32b", desc: "Minimum vector length of 32 bits." },
      { id: "Zvl64b", name: "Min VLEN \u2265 64b", desc: "Minimum vector length of 64 bits." },
      { id: "Zvl128b", name: "Min VLEN \u2265 128b", desc: "Minimum vector length of 128 bits." },
      { id: "Zvl256b", name: "Min VLEN \u2265 256b", desc: "Minimum vector length of 256 bits." },
      { id: "Zvl512b", name: "Min VLEN \u2265 512b", desc: "Minimum vector length of 512 bits." },
      { id: "Zvl1024b", name: "Min VLEN \u2265 1024b", desc: "Minimum vector length of 1024 bits." },
      { id: "Zvf", name: "Vector FP minimal", desc: "Minimal vector floating-point instructions." },
      { id: "Zvfh", name: "Vector Half-Precision FP", desc: "Vector half-precision floating-point instructions." },
      { id: "Zvfhmin", name: "Vector Half-Precision Minimal", desc: "Minimal vector half-precision floating-point instructions." },
      { id: "Zvfbfmin", name: "Vector BF16 Minimal", desc: "Minimal vector Brain Floating-Point (BF16) instructions." },
      { id: "Zvfbfa", name: "Vector BF16 Arithmetic", desc: "Vector BF16 arithmetic instructions." },
      { id: "Zvfbfwma", name: "Vector BF16 Widening MAC", desc: "Vector BF16 widening multiply-accumulate instructions." },
      { id: "Zvfofp8min", name: "Vector FP8 Minimal", desc: "Minimal vector FP8 instructions." },
      { id: "Zvabd", name: "Vector Abs-Diff", desc: "Vector absolute difference instructions." },
      { id: "Zvbb", name: "Vector Bitmanip Base", desc: "Vector bit manipulation base instructions." },
      { id: "Zvbc", name: "Vector Carryless Multiply", desc: "Vector carry-less multiplication instructions." },
      { id: "Zvbc32e", name: "Vector CLMUL (32E)", desc: "Vector carry-less multiplication for RV32E." },
      { id: "Zvbdota", name: "Vector BF16 Dot-Acc", desc: "Vector BF16 dot-product and accumulate instructions." },
      { id: "Zvdota", name: "Vector Dot-Acc", desc: "Vector dot-product and accumulate instructions." },
      { id: "Zvdot4a", name: "Vector 4-way Dot-Acc", desc: "Vector 4-way dot-product and accumulate instructions." },
      { id: "Zvw", name: "Vector Wide Groups", desc: "Vector wide group instructions." }
    ]
  },
  {
    name: "Security (Zi)",
    extensions: [
      { id: "Zicfilp", name: "CFI Landing Pads", desc: "Control-flow integrity landing pads." },
      { id: "Zicfiss", name: "CFI Shadow Stacks", desc: "Shadow stack support." },
      { id: "Zimop", name: "May-Be-Ops (NOP family)", desc: "May-Be-Operations (May-Be-Ops) for future expansion." }
    ]
  },
  {
    name: "Cryptography (Zk)",
    extensions: [
      { id: "Zbkb", name: "Crypto Bitmanip (byte)", desc: "Cryptographic bit manipulation instructions (byte-oriented)." },
      { id: "Zbkc", name: "Crypto Bitmanip (carryless)", desc: "Cryptographic bit manipulation instructions (carry-less)." },
      { id: "Zbkx", name: "Crypto Bitmanip (crossbar)", desc: "Cryptographic bit manipulation instructions (crossbar permutations)." },
      { id: "Zk", name: "Scalar Crypto Base", desc: "Base scalar cryptography instructions." },
      { id: "Zkn", name: "NIST Suite (Scalar)", desc: "NIST cryptographic suite for scalar processors." },
      { id: "Zknd", name: "NIST AES Decrypt", desc: "NIST AES decryption instructions." },
      { id: "Zkne", name: "NIST AES Encrypt", desc: "NIST AES encryption instructions." },
      { id: "Zknh", name: "NIST Hash", desc: "NIST cryptographic hash instructions." },
      { id: "Zkr", name: "Entropy Source", desc: "Entropy source for random number generation." },
      { id: "Zks", name: "ShangMi Suite (Scalar)", desc: "ShangMi cryptographic suite for scalar processors." },
      { id: "Zksed", name: "SM4 Block Cipher", desc: "SM4 block cipher instructions." },
      { id: "Zksh", name: "SM3 Hash", desc: "SM3 cryptographic hash instructions." },
      { id: "Zkt", name: "Timing-Safe Crypto", desc: "Timing-safe cryptographic instructions." }
    ]
  },
  {
    name: "Vector Cryptography (Zvk)",
    extensions: [
      { id: "Zvk", name: "Vector Crypto (umbrella)", desc: "Umbrella for vector cryptography extensions." },
      { id: "Zvkb", name: "Vector Crypto Bitmanip", desc: "Vector instructions for bit manipulation." },
      { id: "Zvkg", name: "Vector GCM/GMAC", desc: "Vector GCM and GMAC instructions." },
      { id: "Zvkgs", name: "Vector GCM Shim", desc: "Vector GCM shim instructions." },
      { id: "Zvkn", name: "Vector NIST Suite", desc: "NIST cryptographic suite for vector processors." },
      { id: "Zvknc", name: "Vector NIST + CLMUL", desc: "NIST suite plus carry-less multiplication." },
      { id: "Zvkned", name: "Vector AES", desc: "Vector AES instructions." },
      { id: "Zvknf", name: "Vector AES Finite-field", desc: "Vector AES finite-field instructions." },
      { id: "Zvkng", name: "Vector NIST + GCM", desc: "NIST suite plus GCM instructions." },
      { id: "Zvknha", name: "Vector SHA-2 (subset)", desc: "Vector SHA-256 instructions." },
      { id: "Zvknhb", name: "Vector SHA-2 (full)", desc: "Full Vector SHA-2 support (SHA-256 and SHA-512)." },
      { id: "Zvks", name: "Vector ShangMi Suite", desc: "ShangMi suite for vector processors." },
      { id: "Zvksc", name: "Vector ShangMi + CLMUL", desc: "ShangMi suite plus carry-less multiplication." },
      { id: "Zvksed", name: "Vector SM4", desc: "Vector SM4 block cipher instructions." },
      { id: "Zvksg", name: "Vector ShangMi + GCM", desc: "ShangMi suite plus GCM instructions." },
      { id: "Zvksh", name: "Vector SM3 Hash", desc: "Vector SM3 cryptographic hash instructions." },
      { id: "Zvkt", name: "Vector Timing-Safe Crypto", desc: "Vector timing-safe cryptographic instructions." }
    ]
  },
  {
    name: "System",
    extensions: [
      { id: "Za128rs", name: "128B Reservation Set", desc: "128-byte reservation set granularity." },
      { id: "Za64rs", name: "64B Reservation Set", desc: "64-byte reservation set granularity." },
      { id: "Zabha", name: "Byte/Halfword AMO", desc: "Atomic memory operations for bytes and halfwords." },
      { id: "Zama16b", name: "16B Misaligned Atomicity", desc: "16-byte misaligned atomicity." },
      { id: "Zawrs", name: "Wait-on-Reservation-Set", desc: "Wait on reservation set instructions." },
      { id: "Zccid", name: "Cache-Block ID", desc: "Cache-block identifier instructions." },
      { id: "Zibi", name: "Interruptible Mem Ops", desc: "Interruptible memory operations." },
      { id: "Zicntr", name: "Base Counters/Timers", desc: "Base performance counters and timers." },
      { id: "Zicntrpmf", name: "Counter Filtering", desc: "Performance counter filtering." },
      { id: "Zicsr", name: "CSR Access", desc: "Control and Status Register (CSR) access instructions." },
      { id: "Zifencei", name: "Instruction-Fetch Fence", desc: "Instruction-fetch synchronization." },
      { id: "Zihintntl", name: "Non-Temporal Locality Hints", desc: "Non-temporal locality hints." },
      { id: "Zihintpause", name: "Pause Hint", desc: "Execution pause hints." },
      { id: "Zihpm", name: "Perf Counters", desc: "Hardware performance monitors." },
      { id: "Zilsm*", name: "Streaming Mem (pattern)", desc: "Streaming memory access patterns." },
      { id: "Zilsm<x>b", name: "Streaming Mem (x-byte)", desc: "Streaming memory access (x-byte)." },
      { id: "Zilsme", name: "Streaming Stores (exclusive)", desc: "Exclusive streaming stores." },
      { id: "Zilsmea", name: "Streaming Stores (alloc)", desc: "Allocating streaming stores." },
      { id: "Zilsp", name: "Streaming LS (prefetch)", desc: "Streaming load/store prefetch." },
      { id: "Zimt", name: "Time Instructions", desc: "Timekeeping and timestamp instructions." },
      { id: "Zitagelide", name: "Tag & ELIDE", desc: "Tagging and branch elision instructions." },
      { id: "Zjid", name: "ICache Coherence Alt", desc: "Alternative instruction cache coherence." },
      { id: "Zjpm", name: "Pointer-Mask Qualifier", desc: "Pointer-masking qualifier instructions." },
      { id: "Ztso", name: "Total Store Ordering", desc: "Total Store Ordering memory model support." }
    ]
  },
  {
    name: "Caches",
    extensions: [
      { id: "Zic64b", name: "64B Cache Blocks", desc: "64-byte cache block size." },
      { id: "Zicbom", name: "Cache Management Operations", desc: "Cache block management operations." },
      { id: "Zicbop", name: "Cache Prefetch", desc: "Cache block prefetch instructions." },
      { id: "Zicboz", name: "Cache Block Zero", desc: "Cache block zeroing instructions." },
      { id: "Ziccamoa", name: "Atomics PMA", desc: "Atomic operations in Physical Memory Attributes (PMA)." },
      { id: "Ziccamoc", name: "CAS PMA", desc: "Compare-and-Swap (CAS) in Physical Memory Attributes (PMA)." },
      { id: "Ziccif", name: "Inst-Fetch Atomicity", desc: "Instruction-fetch atomicity requirements." }
    ]
  },
  {
    name: "Memory (Sv)",
    extensions: [
      { id: "Sv32", name: "Virtual Memory, 32-bit", desc: "Two-level page-based virtual memory system." },
      { id: "Sv39", name: "Virtual Memory, 39-bit VA", desc: "Three-level page-based virtual memory system." },
      { id: "Sv48", name: "Virtual Memory, 48-bit VA", desc: "Four-level page-based virtual memory system." },
      { id: "Sv57", name: "Virtual Memory, 57-bit VA", desc: "Five-level page-based virtual memory system." },
      { id: "Svbare", name: "Bare Mode", desc: "No virtual memory translation (bare mode)." },
      { id: "Svpbmt", name: "Page-Based Memory Types", desc: "Page-based memory attributes." },
      { id: "Svnapot", name: "NAPOT Mappings", desc: "Naturally Aligned Power-of-Two (NAPOT) address mappings." },
      { id: "Svinval", name: "Fine-Grained TLB Invalidate", desc: "Fine-grained TLB invalidation instructions." },
      { id: "Svade", name: "Access/Dirty Exceptions", desc: "Access and dirty bit exceptions." },
      { id: "Svadu", name: "Access/Dirty Update", desc: "Hardware update of access and dirty bits." },
      { id: "Svvptc", name: "Visible PTE Changes", desc: "Visible Page Table Entry (PTE) changes." },
      { id: "Svrsw60t59b", name: "PTE RSW Bits", desc: "Reserved-for-Software (RSW) bits in PTEs." },
      { id: "Svatag", name: "Tagged Translations", desc: "Tagged address translations." },
      { id: "Svukte", name: "User-Keyed TLB Entries", desc: "User-keyed TLB entries." },
      { id: "Supm", name: "User Pointer Masking", desc: "User-mode pointer masking." },
      { id: "Ssnpm", name: "Supervisor Next-Pointer Mask", desc: "Supervisor next-pointer masking." },
      { id: "Sspm", name: "Supervisor Pointer Masking", desc: "Supervisor-mode pointer masking." }
    ]
  },
  {
    name: "Interrupts (Sm/Ss)",
    extensions: [
      { id: "Smaia", name: "AIA Machine Extension", desc: "Advanced Interrupt Architecture (AIA) machine-level extension." },
      { id: "Ssaia", name: "AIA Supervisor Extension", desc: "AIA supervisor-level extension." },
      { id: "Smclic", name: "Machine CLIC", desc: "Core-Local Interrupt Controller (CLIC) machine-level." },
      { id: "Smclicconfig", name: "Machine CLIC Config", desc: "CLIC configuration at machine-level." },
      { id: "Smclicshv", name: "Machine CLIC SHV", desc: "CLIC Selective Hardware Vectoring (SHV) at machine-level." },
      { id: "Ssclic", name: "Supervisor CLIC", desc: "CLIC supervisor-level." },
      { id: "Suclic", name: "User CLIC", desc: "CLIC user-level." },
      { id: "Sstc", name: "Supervisor Timer Compare", desc: "Supervisor-level timer compare extension." },
      { id: "Smcdeleg", name: "M-Mode Counter Delegation", desc: "M-mode performance counter delegation." },
      { id: "Smcntrpmf", name: "M-Mode Counter Filtering", desc: "M-mode performance counter filtering." },
      { id: "Ssccfg", name: "Counter Configuration (S)", desc: "S-mode counter configuration." },
      { id: "Sscntrcfg", name: "S-Mode Counter Config", desc: "S-mode counter configuration." },
      { id: "Sscounterenw", name: "Writable scounteren", desc: "Writable scounteren register." },
      { id: "Sscofpmf", name: "Counter Overflow & Filtering", desc: "Performance counter overflow and filtering." },
      { id: "Ssccptr", name: "S Counter Pointer CSR", desc: "Supervisor counter pointer CSR." },
      { id: "Ssqosid", name: "QoS Identifiers", desc: "Quality-of-Service (QoS) identifiers." },
      { id: "Sshpmcfg", name: "S-Mode HPM Config", desc: "S-mode Hardware Performance Monitor (HPM) configuration." },
      { id: "Smrnmi", name: "Resumable NMI", desc: "Resumable Non-Maskable Interrupt (RNMI) support." }
    ]
  },
  {
    name: "Trap, Debug & Hypervisor Aux",
    extensions: [
      { id: "Sdext", name: "External Debug", desc: "External debug support." },
      { id: "Sdtrig", name: "Debug Triggers", desc: "Debug triggers support." },
      { id: "Sdtrigepm", name: "Debug Trigger EPM", desc: "Debug triggers for EPM." },
      { id: "Sdtrigpend", name: "Debug Trigger Pending", desc: "Debug triggers pending state." },
      { id: "Smcsrind", name: "Indirect CSR Access (M)", desc: "Machine-mode indirect CSR access." },
      { id: "Sscsrind", name: "Indirect CSR Access (S)", desc: "Supervisor-mode indirect CSR access." },
      { id: "Smctr", name: "Control Transfer Records (M)", desc: "Machine-mode control transfer records." },
      { id: "Ssctr", name: "Control Transfer Records (S)", desc: "Supervisor-mode control transfer records." },
      { id: "Sddbltrp", name: "Debug Double Trap", desc: "Debug double trap support." },
      { id: "Ssdbltrp", name: "Supervisor Double Trap", desc: "Supervisor-level double trap support." },
      { id: "Smdbltrp", name: "Machine Double Trap", desc: "Machine-level double trap support." },
      { id: "Smstateen", name: "M-Mode State Enable", desc: "M-mode state enablement control." },
      { id: "Ssstateen", name: "S-Mode State Enable", desc: "S-mode state enablement control." },
      { id: "Smepmp", name: "Enhanced PMP", desc: "Enhanced Physical Memory Protection (PMP)." },
      { id: "Smmpm", name: "Machine PMP Mgmt", desc: "Machine-level PMP management." },
      { id: "Sstvala", name: "stval Address Rule", desc: "Supervisor register stval address rule." },
      { id: "Sstvecd", name: "stvec Direct Mode", desc: "Supervisor register stvec direct mode." },
      { id: "Sstvecv", name: "stvec Vectored Mode", desc: "Supervisor register stvec vectored mode." },
      { id: "Ssdtso", name: "Supervisor TSO Opt-in", desc: "Supervisor-level Total Store Ordering (TSO) opt-in." },
      { id: "Sstcfg", name: "Trap Config", desc: "Trap configuration support." },
      { id: "Ssstrict", name: "No Non-Conforming Exts", desc: "Strict adherence to confirmed extensions." },
      { id: "Ssu32xl", name: "UXL=32 support", desc: "Support for 32-bit user-mode (UXL=32)." },
      { id: "Ssu64xl", name: "UXL=64 support", desc: "Support for 64-bit user-mode (UXL=64)." },
      { id: "Ssube", name: "Big-Endian S", desc: "Big-Endian support for supervisor-level." },
      { id: "Ssvxscr", name: "VS CSR", desc: "Virtual Supervisor (VS) CSRs." },
      { id: "Ssptead", name: "Sup PTE A/D (legacy)", desc: "Supervisor PTE A/D bit support (legacy)." },
      { id: "Smcfiss", name: "M-Mode Shadow Stack", desc: "Machine-mode shadow stack support." },
      { id: "Smdid", name: "Debug ID", desc: "Machine-mode debug identifier." },
      { id: "Smrnpt", name: "Non-Precise Traps", desc: "Machine-mode non-precise traps." },
      { id: "Smrntt", name: "Non-Taken Traps", desc: "Machine-mode non-taken traps." },
      { id: "Smnpm", name: "Non-Maskable PM", desc: "Non-maskable performance monitors." },
      { id: "Smpmpmt", name: "PMP Machine Trap", desc: "PMP-level machine traps." },
      { id: "Smsdia", name: "Soft Debug/Instr", desc: "Software debug and instrumentation." },
      { id: "Smtdeleg", name: "Trap Delegation", desc: "Machine-mode trap delegation." },
      { id: "Smvatag", name: "VA Tagging (M)", desc: "Machine-mode address tagging." },
      { id: "RERI", name: "RAS Error Reporting", desc: "Reliability, Availability, and Serviceability (RAS) error reporting." },
      { id: "HTI", name: "Trace & Instrumentation", desc: "Hard-wired Trace and Instrumentation (HTI)." }
    ]
  }
];

// Preserving profile mappings where possible or adding defaults
const finalGroups = newGroups.map(ng => {
  return {
    ...ng,
    extensions: ng.extensions.map(ext => {
      // Find original if exists to preserve profile/instructions
      let original;
      currentData.groups.forEach(og => {
        const found = og.extensions.find(oe => oe.id === ext.id);
        if (found) original = found;
      });

      return {
        ...ext,
        profiles: original ? original.profiles : [],
        instructions: original ? original.instructions : [],
        coverage: original ? original.coverage : 0,
        discontinued: ext.discontinued || (original ? original.discontinued : undefined)
      };
    })
  };
});

const finalData = {
  ...currentData,
  groups: finalGroups
};

fs.writeFileSync(riscvExtensionsFile, JSON.stringify(finalData, null, 2));
console.log('Successfully updated riscv_extensions.json');

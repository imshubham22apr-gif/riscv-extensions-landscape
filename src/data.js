export const RISCV_DATA = {
  profiles: ["RVA20", "RVA22", "RVA23", "RVB23"],
  groups: [
    {
      name: "Base ISA",
      extensions: [
        { id: "RV32I", name: "Standard Integer Base (32-bit)", desc: "The fundamental base integer instruction set for 32-bit address spaces.", profiles: ["RVA20", "RVA22", "RVA23", "RVB23"] },
        { id: "RV64I", name: "Standard Integer Base (64-bit)", desc: "The fundamental base integer instruction set for 64-bit address spaces.", profiles: ["RVA20", "RVA22", "RVA23", "RVB23"] },
        { id: "RV32E", name: "Embedded Base (16 regs)", desc: "A reduced version of RV32I for small embedded systems.", profiles: [] },
        { id: "RV64E", name: "Embedded Base (64-bit, 16 regs)", desc: "64-bit address space version with reduced register set.", profiles: [] },
        { id: "RV128I", name: "128-bit Address Space", desc: "Base ISA for 128-bit address spaces (draft).", profiles: [] }
      ]
    },
    {
      name: "Single-Letter Extensions",
      extensions: [
        { id: "A", name: "Atomics Bundle", desc: "Instructions for atomic memory operations.", profiles: ["RVA20", "RVA22", "RVA23", "RVB23"] },
        { id: "B", name: "Bit-Manip Bundle", desc: "Standard extensions for bit manipulation operations.", profiles: ["RVA22", "RVA23", "RVB23"] },
        { id: "C", name: "Compressed", desc: "Short 16-bit instructions to reduce code size.", profiles: ["RVA20", "RVA22", "RVA23", "RVB23"] },
        { id: "D", name: "Double-Precision Float (64-bit)", desc: "Standard double-precision floating-point instructions.", profiles: ["RVA20", "RVA22", "RVA23", "RVB23"] },
        { id: "F", name: "Single-Precision Float (32-bit)", desc: "Standard single-precision floating-point instructions.", profiles: ["RVA20", "RVA22", "RVA23", "RVB23"] },
        { id: "H", name: "Hypervisor", desc: "Support for type-2 hypervisors.", profiles: ["RVA22", "RVA23", "RVB23"] },
        { id: "K", name: "Crypto Umbrella", desc: "Scalar and Vector cryptography extensions.", profiles: ["RVB23"] },
        { id: "M", name: "Integer Multiply/Divide", desc: "Standard integer multiplication and division instructions.", profiles: ["RVA20", "RVA22", "RVA23", "RVB23"] }
      ]
    },
    {
      name: "Bit Manipulation (Zb)",
      extensions: [
        { id: "Zba", name: "Address-Generation Bitmanip", desc: "Address generation instructions like sh1add.", profiles: ["RVA22", "RVA23", "RVB23"] },
        { id: "Zbb", name: "Basic Bitmanip", desc: "Basic bit manipulation instructions.", profiles: ["RVA22", "RVA23", "RVB23"] },
        { id: "Zbc", name: "Carry-less Multiply", desc: "Instructions for carry-less multiplication.", profiles: ["RVA23", "RVB23"] },
        { id: "Zbs", name: "Single-Bit Ops", desc: "Single-bit manipulation.", profiles: ["RVA22", "RVA23", "RVB23"] }
      ]
    },
    {
      name: "Vector Subsets (Zv/Zve)",
      extensions: [
        { id: "Zve", name: "Embedded Vector Base", desc: "Vector extensions for embedded systems.", profiles: ["RVB23"] },
        { id: "Zve32x", name: "Vec Int (32-bit, embedded)", desc: "32-bit integer vector operations for embedded.", profiles: ["RVB23"] },
        { id: "Zvl32b", name: "Min VLEN \u2265 32b", desc: "Minimum vector length of 32 bits.", profiles: ["RVB23"] },
        { id: "Zvl64b", name: "Min VLEN \u2265 64b", desc: "Minimum vector length of 64 bits.", profiles: ["RVB23"] },
        { id: "Zvl128b", name: "Min VLEN \u2265 128b", desc: "Minimum vector length of 128 bits.", profiles: ["RVB23"] }
      ]
    },
    {
      name: "Vector Cryptography (Zvk)",
      extensions: [
        { id: "Zvkb", name: "Vector Crypto Bitmanip", desc: "Vector instructions for bit manipulation.", profiles: ["RVB23"] },
        { id: "Zvkned", name: "Vector AES", desc: "Vector instructions for AES encryption.", profiles: ["RVB23"] },
        { id: "Zvksed", name: "Vector SM4", desc: "Vector instructions for the SM4 block cipher.", profiles: ["RVB23"] },
        { id: "Zvknha", name: "Vector SHA-2 (subset)", desc: "Vector instructions for SHA-256.", profiles: ["RVB23"] }
      ]
    },
    {
      name: "Security (Zi)",
      extensions: [
        { id: "Zicfilp", name: "CFI Landing Pads", desc: "Control-flow integrity landing pads.", profiles: ["RVA23", "RVB23"] },
        { id: "Zicfiss", name: "CFI Shadow Stacks", desc: "Shadow stack support.", profiles: ["RVA23", "RVB23"] }
      ]
    },
    {
      name: "System",
      extensions: [
        { id: "Zicsr", name: "CSR Access", desc: "Control and Status Register (CSR) instructions.", profiles: ["RVA20", "RVA22", "RVA23", "RVB23"] },
        { id: "Zifencei", name: "Instruction-Fetch Fence", desc: "Instruction-fetch fence for synchronization.", profiles: ["RVA20", "RVA22", "RVA23", "RVB23"] },
        { id: "Zihintpause", name: "Pause Hint", desc: "Hint to pause execution.", profiles: ["RVA20", "RVA22", "RVA23", "RVB23"] }
      ]
    },
    {
      name: "Memory (Sv)",
      extensions: [
        { id: "Sv32", name: "Virtual Memory, 32-bit", desc: "Two-level page-based virtual memory system.", profiles: ["RVA20"] },
        { id: "Sv39", name: "Virtual Memory, 39-bit VA", desc: "Three-level page-based virtual memory system.", profiles: ["RVA20", "RVA22", "RVA23", "RVB23"] },
        { id: "Sv48", name: "Virtual Memory, 48-bit VA", desc: "Four-level page-based virtual memory system.", profiles: ["RVA22", "RVA23", "RVB23"] }
      ]
    }
  ]
};

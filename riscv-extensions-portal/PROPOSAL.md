# Open Source Contribution Proposal (Student PRD)

**Student Name:** Aashish Pandit  
**Roll No:** 251810700128  
**Year & Section:** 3rd Year, Section A  
**Project Title:** RISC-V Extensions Landscape Portal  
**Project Type:** Data Visualization & Technical Documentation  
**Stack:** React, Vite, Framer Motion, Lucide React, GitHub Actions  

---

## 1. Introduction
I am Aashish Pandit, a computer science student passionate about hardware-software interfaces and web development. My goal for this contribution was to transform the **RISC-V Extensions Landscape Portal** from a basic catalog into a professional-grade, interactive technical reference tool. By bridging the gap between dry architectural specifications and developer-friendly visualization, this project serves as a vital resource for the RISC-V ecosystem.

## 2. Problem Statement (Solved)
*   **Initial State:** The portal had a low coverage of only **11.76%**, with most major extensions showing "No instruction mappings synced yet."
*   **Complexity:** Large-scale technical data (Instruction sets, opcodes, encodings) were scattered across multiple PDF specs, making it difficult for compiler engineers and students to reference them.
*   **Gap:** There was no way to interact with bit-fields or validate instruction encodings against the existing database.

## 3. Solutions Implemented
We have successfully implemented the following "Next Level" features:
*   **Mapping Maximization (78.97% Coverage):** Increased coverage from 11% to nearly 80% by mapping 169 out of 214 extensions, including Vector, Crypto, and Supervisor subsets.
*   **Interactive Bit Editor:** A live playground where users can toggle bits and see real-time Hexadecimal match/mask value changes.
*   **Assembly-to-Hex Converter:** A built-in utility to transform assembly mnemonics into machine code.
*   **Side-by-Side Comparison:** A tool for comparing architectural differences between two extensions.
*   **Visual Analytics Dashboard:** A premium dashboard featuring a large coverage gauge and detailed sync metrics.
*   **Automated Data Pipeline:** Implemented **GitHub Actions** for daily synchronization with upstream `riscv-opcodes`.
*   **Technical Documentation Page:** A deep-dive guide for the architecture and data models of the project.

## 4. Design & UX
The project follows a **Minimalist Apple-inspired Aesthetic**:
*   **Monochrome Palette:** Professional black-and-white design for a technical documentation feel.
*   **Micro-interactions:** Smooth animations using Framer Motion for a premium user experience.
*   **Accessible Filtering:** Architectural profiles (RVA20, RVA22, etc.) moved to the sidebar for better ergonomics.

## 5. Deliverables & Impact
*   **Updated Catalog:** Comprehensive mapping for all ratified and major draft extensions.
*   **Export Utility:** One-click Markdown export for technical specifications.
*   **Contribution Workflow:** A streamlined process for future contributors to suggest data mappings via a built-in form.
*   **Stability:** Fully responsive, dark-mode ready, and optimized for performance.

---
**© 2026 RISC-V International. Part of the LFX Mentorship Program.**

# SCF Comparison Calculator - Update Summary

## Version 4.1 (January 1, 2026)

### Refined Input Organization - 3-Column Layout

This version refines the input structure for maximum clarity and consistency across all supplier tiers.

---

## Key Changes

### 1. **Company Profile - Now Includes SCF Funding Rate**
Company Profile section expanded to 4 inputs:
- Currency
- Total Procurement Spend
- Total Number of Suppliers  
- **SCF Funding Rate (Annual)** ← Moved from "Financing Assumptions"

**Rationale**: Core financing assumption belongs with other company-level parameters.

---

### 2. **Supplier Tiers - Consistent 3-Column Layout**

Each supplier tier now uses the **exact same structure** with 3 columns:

#### **Column 1: Participation Rate**
- Traditional SCF (% participating)
- PrimaTrade (% participating)

#### **Column 2: Early Payment Discount**
- Traditional SCF (% discount)
- PrimaTrade (% discount)

#### **Column 3: Supplier Savings Rate**
- Traditional SCF (annual % saved)
- PrimaTrade (annual % saved)

---

### 3. **Explicit Traditional SCF Discount Assumptions**

Previously, Traditional SCF early payment discounts were implicit (always 0%). Now they're **explicitly shown**:

**Tier 1 (Existing SCF):**
```
Early Payment Discount
├─ Traditional SCF: 0.0%
│  └─ "No discounts in traditional SCF"
└─ PrimaTrade: [editable input]
```

**Tier 2 & 3:**
```
Early Payment Discount
├─ Traditional SCF: 0.0%
│  └─ "Not eligible"
└─ PrimaTrade: [editable input]
```

This makes it crystal clear that Traditional SCF doesn't offer early payment discounts to ANY tier.

---

### 4. **Card Programme - Now Includes Free Funding Period**

Long Tail (Tier 3) card programme section now has 4 inputs:
- Card Usage %
- Supplier Cost %
- Buyer Rebate %
- **Free Funding Period (buyer)** ← Moved from "Financing Assumptions"

**Rationale**: Free funding period is a card programme benefit, so it belongs with other card parameters.

---

### 5. **Removed Section: Financing Assumptions**

The standalone "Financing Assumptions" section has been **removed entirely**. Its 2 parameters moved to more logical locations:
- SCF Funding Rate → Company Profile
- Card Free Funding Period → Long Tail Card Programme

---

## Visual Structure

### **Input Sections (Now Just 3)**

1. **Company Profile** (4 inputs)
2. **Supplier Tiers Configuration** (3 color-coded tiers)
   - Each tier has identical 3-column structure
3. **AP Process & Payment Timing** (unchanged)

---

## Benefits

### ✅ **Perfect Consistency**
All 3 supplier tiers use identical column structure:
- Column 1: Participation Rate
- Column 2: Early Payment Discount
- Column 3: Supplier Savings Rate

### ✅ **Explicit Assumptions**
Traditional SCF early payment discounts are now explicitly shown (0.0%) with explanatory text, not just omitted.

### ✅ **Logical Grouping**
- SCF funding rate with other company fundamentals
- Card free funding period with other card parameters
- No orphaned "Financing Assumptions" section

### ✅ **Easier Comparison**
Side-by-side Traditional vs PrimaTrade parameters in every column make comparisons effortless.

---

## Detailed Layout

### **Tier 1: Existing SCF Suppliers** (Blue)

```
┌─ Number of Suppliers        ┌─ Share of Total Spend ─┐
│                              │                         │
├────────────────────────────────────────────────────────┤
│  Participation Rate  │  Early Payment Discount  │  Supplier Savings Rate  │
├──────────────────────┼──────────────────────────┼─────────────────────────┤
│  Trad SCF: [input]   │  Trad SCF: 0.0%          │  Trad SCF: [input]      │
│  PrimaTrade: [input] │  "No discounts..."       │  PrimaTrade: [input]    │
│                      │  PrimaTrade: [input]     │                         │
└──────────────────────┴──────────────────────────┴─────────────────────────┘
```

### **Tier 2: Next Level Suppliers** (Green)

```
┌─ Ideal Suppliers for SCF    ┌─ Share of Total Spend ─┐
│                              │                         │
├────────────────────────────────────────────────────────┤
│  Participation Rate  │  Early Payment Discount  │  Supplier Savings Rate  │
├──────────────────────┼──────────────────────────┼─────────────────────────┤
│  Trad SCF: 0.0%      │  Trad SCF: 0.0%          │  Trad SCF: [input]      │
│  "Not eligible"      │  "Not eligible"          │  PrimaTrade: [input]    │
│  PrimaTrade: [input] │  PrimaTrade: [input]     │                         │
└──────────────────────┴──────────────────────────┴─────────────────────────┘
```

### **Tier 3: Long Tail Suppliers** (Orange)

```
┌─ Num Suppliers (auto)       ┌─ Share of Spend (auto) ─┐
│                              │                          │
├────────────────────────────────────────────────────────┤
│  Participation Rate  │  Early Payment Discount  │  Supplier Savings Rate  │
├──────────────────────┼──────────────────────────┼─────────────────────────┤
│  Trad SCF: 0.0%      │  Trad SCF: 0.0%          │  Trad SCF: [input]      │
│  "Not eligible"      │  "Not eligible"          │  PrimaTrade: [input]    │
│  PrimaTrade: [input] │  PrimaTrade: [input]     │                         │
├────────────────────────────────────────────────────────┤
│  Card Programme (Traditional SCF only)                 │
├────────────────────────────────────────────────────────┤
│  Card Usage % │ Supplier Cost % │ Buyer Rebate % │ Free Funding Period │
│  [input]      │ [input]         │ [input]        │ [input]             │
└────────────────────────────────────────────────────────┘
```

---

## What Changed (Technical)

**Component Structure:**
- Removed `<Financing Assumptions>` section entirely
- Added SCF Funding Rate to Company Profile grid (now 4 columns)
- Restructured all 3 tier sections to use identical 3-column layout
- Added explicit Traditional SCF discount displays (read-only, 0.0%)
- Moved Card Free Funding Period to Tier 3 card programme grid

**No Calculation Changes:**
All formulas remain identical to v4.0. Only UI organization changed.

---

## Migration from v4.0

Automatic - no data loss. LocalStorage values preserved with same variable names.

---

## Excel Model Alignment

**Current Version**: 260101_SCF_compared_to_PrimaTrade_1.xlsx

Perfect 1:1 match maintained:
- All calculations identical
- All formulas match Excel exactly
- Results unchanged

---

## Testing Checklist

- [x] 3-column layout in all tiers
- [x] Explicit Traditional discount shown (0.0%)
- [x] SCF funding rate in Company Profile
- [x] Card free funding in Tier 3 card section
- [x] Financing Assumptions section removed
- [x] All calculations match v4.0 exactly
- [x] LocalStorage migration works
- [x] Responsive on all screen sizes
- [x] Print/PDF works correctly

---

## File Changes (v4.1)

**Modified:**
- `src/SCFComparison.jsx`: 
  - Restructured all tier sections to 3-column layout
  - Added explicit Traditional discount displays
  - Moved SCF funding rate to Company Profile
  - Moved card free funding to Tier 3
  - Removed Financing Assumptions section

**Unchanged:**
- All other files
- All calculation logic
- Results display

---

## Deployment

Same as always:
```bash
cd scf-comparison
npm install
npm run dev
npm run build
```

---

**Version**: 4.1 (January 1, 2026)  
**Excel Model**: 260101_SCF_compared_to_PrimaTrade_1.xlsx  
**Author**: Prima Trade / tim.nicolle@prima.trade

---

## Version History

- **v4.1**: Refined 3-column layout, explicit Traditional discounts
- **v4.0**: Grouped inputs by tier, color-coded sections
- **v3.0**: Simplified model + card benefits
- **v2.1**: Auto-calculated long tail + validation
- **v2.0**: Three-tier supplier segmentation
- **v1.0**: Initial two-tier model

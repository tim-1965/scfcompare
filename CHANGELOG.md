# SCF Comparison Calculator - Version 6.0

## Complete Panel 2 Reorganization

Version 6.0 completely reorganizes Panel 2 based on the new structure in `260101_SCF_compared_to_PrimaTrade_3.xlsx`.

---

## 🎯 What's New in v6.0

### **Panel 2: Complete Restructure**

Panel 2 now has a clear 5-section structure:

1. **Highlights** (at top) - Key metrics side-by-side
2. **D) Economics (annualised)** - Complete economic breakdown
3. **A) Supplier Tiers & Spend** - Spend distribution
4. **B) Baseline AP Cost & Timing** - AP process metrics
5. **C) Programme Scope & Volume** - Detailed comparison

All sections include **tooltips** from Excel notes where applicable.

---

## 📊 Panel 2 Sections (Detailed)

### **1. Highlights Box** ✅

**Left Column - Programme Metrics:**
- Programme Size (Outstanding balance)
- Number of Suppliers Eligible
- Active Suppliers Using SCF
- Total Economic Value

**Right Column - Economic Value Breakdown:**
- Benefit of Early Payments to Suppliers
- Cost of Early Payments to Suppliers
- **Net Supplier Benefit** (highlighted)
- Benefit of Funding to Buyer
- Discounts & Rebates to Buyer
- **Net Buyer Benefit** (highlighted)

### **2. D) Economics (annualised)** ✅ NEW!

Complete economic breakdown comparing Traditional SCF vs PrimaTrade:

**Supplier Costs:**
- Supplier SCF financing cost: Tier 1, 2, 3 (ℹ️)
- Actual discount accepted: Tier 1, 2, 3 (ℹ️)
- Card costs (long tail) (ℹ️)
- **Total supplier costs (gross)** (ℹ️)

**Supplier Benefits:**
- Supplier benefit: Tier 1, 2, 3 (ℹ️)
- **Total supplier time value benefit** (ℹ️)
- **Supplier net benefit** (ℹ️) - highlighted in blue

**Buyer Benefits:**
- Buyer rebate from cards (ℹ️)
- Buyer free funding from cards (ℹ️)
- Benefit of SCF funding (ℹ️)
- Early payment discounts less SCF costs
- **Buyer net benefit** (ℹ️) - highlighted in green

**Total:**
- **Total value created (buyer + suppliers)** (ℹ️) - highlighted in orange/red

### **3. A) Supplier Tiers & Spend** ✅ NEW!

Single-value table showing spend distribution:
- Suppliers: Long tail (ℹ️)
- Spend: Tier 1 suppliers (ℹ️)
- Spend: Tier 2 suppliers (ℹ️)
- Spend: Long tail suppliers (ℹ️)

### **4. B) Baseline AP Cost & Timing** ✅ NEW!

Single-value table showing AP process:
- Cross-border share of spend (ℹ️)
- Domestic and services share (ℹ️)
- Average time taken to approve invoices (ℹ️)

### **5. C) Programme Scope & Volume** ✅ NEW!

Detailed comparison table (Traditional vs PrimaTrade):
- Eligible suppliers (N) (ℹ️)
- Spend: Tier 1, 2, 3 suppliers
- % Tier 1, 2, 3 participating
- Participating spend funded (ℹ️)
- Active suppliers: Tier 1, 2, 3 (ℹ️)

---

## 🔧 Technical Implementation

### **New TableRow Component**

Automatically formats values and adds tooltips:

```jsx
const TableRow = ({ label, tradValue, ptValue, note }) => {
  // Auto-formats currency values
  // Adds tooltip if note provided
  // Returns properly styled table row
}
```

**Usage:**
```jsx
<TableRow 
  label="Supplier SCF financing cost: Tier 1"
  tradValue={tradFinancingTier1}
  ptValue={ptFinancingTier1}
  note="Costs charged to suppliers by financiers"
/>
```

### **Tooltip Integration**

Every row with notes from Excel has a tooltip:
- Hover over label to see info icon (ℹ️)
- Hover over icon to see detailed explanation
- Print-friendly (hidden in PDFs)

---

## 📋 Excel Alignment

**Source:** `260101_SCF_compared_to_PrimaTrade_3.xlsx`

**Dashboard Tab:**
- Rows 20-32: Highlights box structure

**Inputs Tab:**
- Rows 68-90: D) Economics section
- Rows 43-47: A) Supplier tiers & spend
- Rows 49-52: B) Baseline AP cost & timing
- Rows 54-66: C) Programme scope & volume

All tooltips extracted from Column F (Notes).

---

## ✅ Benefits of New Structure

### **1. Clarity**
Economics (D) clearly shows all costs and benefits broken down by tier.

### **2. Transparency**
Workings sections (A, B, C) show exactly how numbers are calculated.

### **3. Completeness**
Every economic line item has its own row with Traditional vs PrimaTrade comparison.

### **4. Documentation**
Tooltips provide context without cluttering the interface.

### **5. Excel Consistency**
Perfect alignment with Excel model structure and formulas.

---

## 🔍 Key Metrics Now Visible

**Economics Section (D) includes:**
- All 3 tiers of supplier financing costs
- All 3 tiers of actual discounts (MAX of financing vs agreed)
- Card costs for long tail
- All 3 tiers of supplier time-value benefits
- Buyer card rebates and free funding
- SCF funding benefit (new in v5.0)
- Early payment discounts passed through

**Programme Scope Section (C) includes:**
- Eligible suppliers (tier-specific)
- Spend by all 3 tiers
- Participation rates by all 3 tiers
- Active suppliers by all 3 tiers

---

## 📦 What Changed (Files)

**Modified:**
- `src/SCFComparison.jsx`:
  - Added `TableRow` component
  - Removed old "Programme Scope", "Timing", "Economics", "Key Benefits" sections
  - Added new D, A, B, C sections with tooltips
  - Reorganized to match Excel structure exactly

**Unchanged:**
- Panel 1 (all tooltips remain)
- Calculations (all formulas unchanged)
- Highlights box (from v5.2)
- Print functionality
- All other files

---

## 🎨 Visual Design

### **Section D) Economics**
- Bold highlighting for subtotals (Total supplier costs, Total supplier time value)
- **Blue background** for Supplier net benefit
- **Green background** for Buyer net benefit
- **Orange/red background** for Total value created
- Tooltips on all items with notes

### **Sections A & B**
- Simple two-column tables (Item | Value)
- Tooltips where Excel has notes
- Clean, readable formatting

### **Section C**
- Three-column table (Item | Traditional | PrimaTrade)
- Tooltips on key items
- Mix of currency and percentage values

---

## 📊 Example: Economics Section (D)

```
D) Economics (annualised)
┌─────────────────────────────────────┬──────────────┬──────────────┐
│ Item                                │ Traditional  │ PrimaTrade   │
├─────────────────────────────────────┼──────────────┼──────────────┤
│ Supplier SCF financing cost: Tier 1 │ $146K        │ $202K        │
│ Supplier SCF financing cost: Tier 2 │ $0           │ $226K        │
│ Supplier SCF financing cost: Tier 3 │ $0           │ $28K         │
│ Actual discount accepted: Tier 1    │ $146K        │ $202K        │
│ Actual discount accepted: Tier 2    │ $0           │ $946K        │
│ Actual discount accepted: Tier 3    │ $0           │ $189K        │
│ Card costs (long tail)              │ $32K         │ $0           │
├─────────────────────────────────────┼──────────────┼──────────────┤
│ Total supplier costs (gross)        │ $178K        │ $1.34M       │
├─────────────────────────────────────┼──────────────┼──────────────┤
│ Supplier benefit: Tier 1            │ $167K        │ $262K        │
│ Supplier benefit: Tier 2            │ $0           │ $581K        │
│ Supplier benefit: Tier 3            │ $14K         │ $79K         │
├─────────────────────────────────────┼──────────────┼──────────────┤
│ Total supplier time value benefit   │ $181K        │ $922K        │
├─────────────────────────────────────┼──────────────┼──────────────┤
│ Supplier net benefit                │ $3K          │ -$414K       │ (Blue)
├─────────────────────────────────────┼──────────────┼──────────────┤
│ Buyer rebate from cards             │ $2K          │ $0           │
│ Buyer free funding from cards       │ $2K          │ $0           │
│ Benefit of SCF funding              │ $110K        │ $615K        │
│ Early payment discounts less SCF    │ $0           │ $1.34M       │
├─────────────────────────────────────┼──────────────┼──────────────┤
│ Buyer net benefit                   │ $114K        │ $1.95M       │ (Green)
├─────────────────────────────────────┼──────────────┼──────────────┤
│ Total value created                 │ $117K        │ $1.54M       │ (Orange)
└─────────────────────────────────────┴──────────────┴──────────────┘

(ℹ️) = Tooltip available with Excel note
```

---

## 🚀 Migration from v5.1/v5.2

**Automatic** - no user action required.

**What Users Will See:**
- Same Panel 1 (no changes)
- Reorganized Panel 2 with much more detail
- Clear section headings (D, A, B, C)
- Tooltips on all economic items

---

## Version History

- **v6.0**: Complete Panel 2 reorganization with D, A, B, C sections
- **v5.2**: Highlights box added (work in progress)
- **v5.1**: Tooltips added to Panel 1
- **v5.0**: SCF funding benefit calculation
- **v4.1**: Refined 3-column layout
- **v4.0**: Grouped inputs by tier
- **v3.0**: Simplified model + card benefits
- **v2.1**: Auto-calculated long tail
- **v2.0**: Three-tier supplier segmentation
- **v1.0**: Initial two-tier model

---

**Version**: 6.0 (January 1, 2026)  
**Excel Model**: 260101_SCF_compared_to_PrimaTrade_3.xlsx  
**Author**: Prima Trade / tim.nicolle@prima.trade  
**Status**: ✅ **COMPLETE** - Production ready

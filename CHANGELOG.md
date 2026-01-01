# SCF Comparison Calculator - Update Summary

## Version 5.0 (January 1, 2026)

### Major Calculation Update - SCF Funding Benefit Added

This version implements a **significant new calculation** that more accurately captures the buyer's benefit from SCF programs.

---

## 🎯 Key Change: New Buyer Benefit Component

### **SCF Funding Benefit**

A new calculation has been added that captures the **value of funding provided by the SCF program**:

```
SCF Funding Benefit = Outstanding Balance × Days Advanced × SCF Rate / 365
```

**What this represents:**
- The buyer gets to keep their cash for the "Days Advanced" period
- Suppliers are paid early (funded by SCF), but buyer still pays on standard terms (e.g., 60 days)
- This creates a funding benefit for the buyer
- The suppliers effectively pay for this through their discounts/financing costs

---

## Calculation Details

### **Traditional SCF:**

**Buyer Net Benefit (OLD - v4.1):**
```
= Discounts - Financing Costs 
  + Card Rebate 
  + Card Free Funding
```

**Buyer Net Benefit (NEW - v5.0):**
```
= Discounts - Financing Costs 
  + Card Rebate 
  + Card Free Funding
  + SCF Funding Benefit ← NEW!
```

### **PrimaTrade:**

**Buyer Net Benefit (OLD - v4.1):**
```
= Discounts - Financing Costs
```

**Buyer Net Benefit (NEW - v5.0):**
```
= Discounts - Financing Costs
  + SCF Funding Benefit ← NEW!
```

---

## Example Calculation

Let's say:
- Participating Spend: $468M/year
- Days Advanced: 50 days
- SCF Rate: 7%

**Outstanding Balance:**
```
= $468M × (50 / 365)
= $64.1M
```

**SCF Funding Benefit:**
```
= $64.1M × 50 × 7% / 365
= $614,794/year
```

This $615K represents the **value to the buyer** of having suppliers paid early while the buyer still pays on standard terms.

---

## Why This Matters

### **More Accurate Buyer Value**

Previously, the model only credited buyers for:
1. Early payment discounts (PrimaTrade only)
2. Card rebates (Traditional SCF only)
3. Card free funding (Traditional SCF only)

But it **missed** the fundamental funding benefit that comes from the gap between when suppliers are paid vs when the buyer pays.

### **Both Programs Benefit**

Both Traditional SCF and PrimaTrade now show this funding benefit, because:
- **Traditional SCF**: Suppliers paid ~12 days after handover, buyer pays 60 days → ~48 days gap
- **PrimaTrade**: Suppliers paid ~2 days after handover, buyer pays 60 days → ~58 days gap

PrimaTrade creates a **larger** funding benefit because it pays suppliers even earlier.

---

## Impact on Results

### **Buyer Benefit Increases**

With this new calculation, buyer benefits will be **higher** in both scenarios, but especially in PrimaTrade:

**Typical Impact:**
- Traditional SCF buyer benefit: +$400K - $700K
- PrimaTrade buyer benefit: +$800K - $1.2M

The exact increase depends on:
- Participating spend
- Days advanced
- SCF funding rate

### **Total Value Created Increases**

Since buyer benefit increases, total value created increases proportionally:

```
Total Value = Supplier Net Benefit + Buyer Net Benefit
```

Both components now more accurately reflect the economic reality of SCF programs.

---

## UI Changes

### **New Breakdown Displays**

**Traditional SCF Benefits:**
```
Traditional SCF Buyer Benefits Breakdown (included above):
├─ Early payment discounts received:        $XXX,XXX
├─ Less: SCF financing costs paid:         -$XXX,XXX
├─ Card rebate from suppliers on cards:     $XXX,XXX
├─ Card free funding period benefit:        $XXX,XXX
└─ SCF funding benefit (paid by suppliers): $XXX,XXX ← NEW!
```

**PrimaTrade Benefits:**
```
PrimaTrade Buyer Benefits Breakdown (included above):
├─ Early payment discounts received:        $X,XXX,XXX
├─ Less: SCF financing costs paid:         -$XXX,XXX
└─ SCF funding benefit (paid by suppliers): $X,XXX,XXX ← NEW!
```

These breakdowns appear below the Economics table in the Comparison Results view.

---

## Excel Model Alignment

**Current Excel Version:** 260101_SCF_compared_to_PrimaTrade_2.xlsx

**New Formula Added (Row 87):**
```
Benefit of funding provided by SCF (paid for by suppliers not buyer)
= Dashboard!C7 × Enterprise inputs!C19 × Enterprise inputs!C22 / 365
= Outstanding Balance × Days Advanced × SCF Rate / 365
```

**Updated Formula (Row 88):**
```
Buyer net benefit
= SUM(C73:C75) - SUM(C69:C71) + C86 + C85 + C87
= Discounts - Financing + Card Benefits + SCF Funding Benefit
```

The React app now matches the Excel model **exactly**.

---

## What Changed (Technical)

### **Modified Calculations:**

**Added:**
```javascript
// Traditional SCF
const tradScfFundingBenefit = tradOutstandingBalance * (tradDaysAdvanced / 365) * (scfRatePct / 100);

// PrimaTrade
const ptScfFundingBenefit = ptOutstandingBalance * (ptDaysAdvanced / 365) * (scfRatePct / 100);
```

**Updated:**
```javascript
// Traditional SCF buyer benefit
const tradBuyerNetBenefit = tradActualDiscountTier1 + tradActualDiscountTier2 + tradActualDiscountTier3 - 
                            tradTotalFinancing + tradBuyerCardFreeFunding + tradBuyerCardRebate + 
                            tradScfFundingBenefit; // ← Added

// PrimaTrade buyer benefit  
const ptBuyerNetBenefit = ptActualDiscountTier1 + ptActualDiscountTier2 + ptActualDiscountTier3 - 
                          ptTotalFinancing + ptScfFundingBenefit; // ← Added
```

### **Modified UI:**

- Expanded benefit breakdown sections
- Added SCF funding benefit line items
- Color-coded PrimaTrade breakdown (red/pink theme)
- More detailed explanations

---

## Migration from v4.1

**Automatic** - no user action required.

Results will show **higher buyer benefits** than v4.1, which is correct as the calculation is now more complete.

---

## Testing Checklist

- [x] SCF funding benefit calculates correctly (Traditional)
- [x] SCF funding benefit calculates correctly (PrimaTrade)
- [x] Buyer net benefit includes new component
- [x] Total value created updates correctly
- [x] Breakdown sections display properly
- [x] All calculations match Excel exactly
- [x] LocalStorage migration works
- [x] Print/PDF functionality works

---

## Conceptual Understanding

### **The Funding Gap**

```
Timeline for Traditional SCF:
Day 0:  Supplier ships goods
Day 12: Supplier paid by SCF (after approval)
Day 60: Buyer pays SCF funder
        ↑________________↑
        48-day funding gap
```

```
Timeline for PrimaTrade:
Day 0:  Supplier ships goods  
Day 2:  Supplier paid by SCF (after handover)
Day 60: Buyer pays SCF funder
        ↑____________________↑
        58-day funding gap
```

**The buyer benefits from this gap** because they have use of their cash while suppliers are already paid. This benefit is now properly captured in the model.

---

## File Changes (v5.0)

**Modified:**
- `src/SCFComparison.jsx`:
  - Added `tradScfFundingBenefit` calculation
  - Added `ptScfFundingBenefit` calculation
  - Updated `tradBuyerNetBenefit` formula
  - Updated `ptBuyerNetBenefit` formula
  - Expanded benefit breakdown sections
  - Added detailed buyer benefit displays

**Unchanged:**
- All input sections
- All tier configurations
- All other files
- UI layout and styling

---

## Version History

- **v5.0**: Added SCF funding benefit calculation (aligns with Excel v2)
- **v4.1**: Refined 3-column layout, explicit Traditional discounts
- **v4.0**: Grouped inputs by tier, color-coded sections
- **v3.0**: Simplified model + card benefits
- **v2.1**: Auto-calculated long tail + validation
- **v2.0**: Three-tier supplier segmentation
- **v1.0**: Initial two-tier model

---

**Version**: 5.0 (January 1, 2026)  
**Excel Model**: 260101_SCF_compared_to_PrimaTrade_2.xlsx  
**Author**: Prima Trade / tim.nicolle@prima.trade

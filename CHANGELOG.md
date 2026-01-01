# SCF Comparison Calculator - Update Summary

## Version 3.0 (January 1, 2026)

### Major Simplification & Card Benefits Enhancement

This version represents a significant simplification of the model while introducing accurate card benefit calculations.

#### Key Changes

**1. Removed Spend Breakdown Section**
- ❌ Removed: "Goods / Services / Long Tail" spend percentage breakdown
- ✅ Simplified: Model now focuses purely on supplier tiers and their spend concentration
- Rationale: Unnecessary complexity that didn't materially impact the comparison

**2. Accurate Card Benefit Calculations (NEW!)**

Added 4 new inputs for card programme economics:

**For Suppliers:**
- **Card Cost Rate** (default: 3.5%): All-in cost to suppliers for card payments
- Calculated in Traditional SCF only (suppliers on cards pay this fee)

**For Buyers:**
- **Card Rebate** (default: 1.0%): Rebate the buyer receives from card issuer
- **Free Funding Period** (default: 20 days): Credit period buyer enjoys with cards

These create two new buyer benefits in Traditional SCF:
1. **Card Rebate**: `Card Rebate % × Long Tail Spend on Cards`
2. **Free Funding Benefit**: `(Free Funding Days / 365) × SCF Rate × Long Tail Spend on Cards`

**3. Updated Calculations**

**Traditional SCF Buyer Benefit now includes:**
```
Buyer Net Benefit = 
  Discounts - Financing Costs 
  + Card Rebate 
  + Free Funding Period Benefit
```

**Supplier Long Tail Benefit uses MIN function:**
```javascript
// Caps the benefit at total long tail spend
MIN(Participating + On Cards, Total Long Tail) × Days × Rate / 365
```

**Average Approval Time Calculation:**
```javascript
// Weighted by domestic vs cross-border share
(Domestic Share × (Domestic Delay + Processing)) + 
(Cross-Border Share × (Cross-Border Delay + Processing))
```

**4. UI Updates**
- Removed "Spend Breakdown" card from Company Profile section
- Added 4 new card benefit inputs in "Financing Assumptions" section
- Added card benefits detail display in Economics table (Traditional SCF only)
- Updated label: "Cross-Border Share (excl. services)" to clarify scope

**5. Updated Key Benefits Text**
Changed the 4th benefit description to:
> "Eliminates card costs (up to 3.5%) for suppliers while buyer loses card rebates but gains early payment discounts."

This accurately reflects the trade-off: Traditional SCF gets card benefits, PrimaTrade gets early payment discounts.

#### What This Means

**Traditional SCF:**
- Buyer benefits from card rebates and free funding period
- Suppliers on cards pay card fees (cost)
- Limited to top 50 suppliers only

**PrimaTrade:**
- Buyer loses card benefits but gains early payment discounts
- Suppliers avoid card fees entirely
- All suppliers can participate

**Net Result:**
PrimaTrade typically creates more total value by:
1. Including more suppliers (better participation)
2. Enabling flexible discount rates that exceed financing costs
3. Eliminating card costs for suppliers
4. Faster payment timing (PO Match)

---

## Version 2.1 (January 1, 2026)

### Auto-Calculated Long Tail & Validation

- Long Tail spend share auto-calculated as `100% - Existing % - Ideal %`
- Added validation error when total > 100%
- Changed "Tail / Incidental" → "Long Tail" label
- Improved UX with color-coded validation

---

## Version 2.0 (January 1, 2026)

### Three-Tier Supplier Segmentation

- Introduced three supplier tiers (Existing SCF / 50-1000 / Long Tail)
- Tier-specific early payment discounts
- Tier-specific supplier savings rates
- Dashboard-focused results with 6 headline KPIs
- Simplified calculation logic

---

## Excel Model Alignment

**Current Version**: 260101_SCF_compared_to_PrimaTrade_1.xlsx

The React app perfectly matches:
- **Dashboard** sheet: All 6 headline KPIs
- **Enterprise inputs** sheet: Company profile, supplier tiers, AP timing, card economics
- **Program inputs** sheet: Participation rates, discounts, timing, all calculations

All formulas translated 1:1 from Excel to JavaScript.

## File Changes (v3.0)

**Modified:**
- `src/SCFComparison.jsx`: 
  - Removed spend breakdown inputs (goods/services/tail)
  - Added 4 card benefit inputs
  - Updated all calculation formulas
  - Added card benefits detail display
  - Updated labels and descriptions

**Unchanged:**
- All other files remain the same
- Configuration files (vite, tailwind, netlify)
- Assets and styling

## Deployment

```bash
cd scf-comparison
npm install
npm run dev     # Test locally at http://localhost:5173
npm run build   # Build for production
```

Deploy via:
- **Netlify Drop**: Build locally, drag `dist/` folder
- **Netlify CLI**: `npm run deploy`
- **Git**: Push to repo, connect to Netlify

## Testing Checklist

- [x] Card benefit inputs display correctly
- [x] Card rebate calculates properly
- [x] Free funding period benefit calculates correctly
- [x] Traditional SCF shows card benefits in detail section
- [x] PrimaTrade shows zero card benefits
- [x] Spend breakdown section removed
- [x] Long Tail auto-calculation works
- [x] All three supplier tiers calculate correctly
- [x] Dashboard shows all 6 KPIs accurately
- [x] Print/PDF functionality works
- [x] Mobile responsive layout
- [x] LocalStorage persistence works

---

**Version**: 3.0 (January 1, 2026)  
**Excel Model**: 260101_SCF_compared_to_PrimaTrade_1.xlsx  
**Author**: Prima Trade / tim.nicolle@prima.trade

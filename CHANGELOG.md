# SCF Comparison Calculator - Update Summary

## Updates Made (January 1, 2026)

### Key Changes from Previous Version

#### 1. **Three-Tier Supplier Segmentation** (vs. previous two-tier)
The new model segments suppliers into three tiers to better reflect SCF programme reality:

- **Existing SCF 50** (default: 50 suppliers, 65% of spend)
  - Current suppliers already in SCF programme
  - Typically larger strategic suppliers
  
- **50-1000 Tier** (default: 950 suppliers, 30% of spend)
  - Next layer that would ideally be in SCF
  - Medium-sized regular suppliers
  - Traditional SCF: 0% eligible
  - PrimaTrade: 70% participation
  
- **Long Tail** (default: 7,000 suppliers, 5% of spend)
  - Remaining small suppliers
  - Traditional SCF: 0% eligible
  - PrimaTrade: 60% participation

#### 2. **Tier-Specific Early Payment Discounts**
Different discount rates by supplier tier (PrimaTrade only):
- Existing SCF 50: 0% (default)
- 50-1000 tier: 2.5% (default)
- Long tail: 3.5% (default)

Traditional SCF: All tiers = 0% (doesn't support discounts)

#### 3. **Tier-Specific Supplier Savings Rates**
Different cost of capital by supplier size:

**Traditional SCF:**
- Existing 50: 8% savings rate
- 50-1000: 12% savings rate
- Long tail: 15% savings rate

**PrimaTrade:**
- Existing 50: 10% savings rate
- 50-1000: 15% savings rate
- Long tail: 20% savings rate

Reflects that smaller suppliers have higher cost of capital and benefit more from early payment.

#### 4. **Simplified Calculation Logic**
- **Actual Discount** = MAX(financing cost, agreed discount %)
- This ensures suppliers pay at least the financing cost or their agreed discount, whichever is higher
- Cleaner than previous formula

#### 5. **Dashboard-Focused Results**
The comparison results now match the Excel Dashboard sheet with 6 headline KPIs:
1. Eligible Spend (all spend eligible via automation)
2. Participating Spend (higher participation from smaller suppliers)
3. Outstanding Balance (funding requirement increase)
4. Eligible Suppliers (more suppliers involved)
5. Active Suppliers (more actively using SCF)
6. Days Faster Payment (via PO Match & automation)

#### 6. **Updated Configuration Files**
- **vite.config.js**: Simplified version optimized for Netlify
- **tailwind.config.js**: Streamlined configuration
- **.gitignore**: Updated for better version control

### New Default Values

The calculator now uses these defaults (from the updated Excel model):

**Supplier Tiers:**
- Total suppliers: 8,000
- Existing SCF suppliers: 50 (65% of spend)
- Ideal SCF suppliers: 1,000 (next 30% of spend)
- Long tail: 7,000 (remaining 5% of spend)

**Participation Rates:**
- Traditional SCF: 40% of existing 50 only
- PrimaTrade: 40% existing + 70% of 50-1000 tier + 60% long tail

**Early Payment Discounts (PrimaTrade):**
- Existing 50: 0%
- 50-1000: 2.5%
- Long tail: 3.5%

**Supplier Savings Rates:**
- Existing 50: 8% (trad) / 10% (PT)
- 50-1000: 12% (trad) / 15% (PT)
- Long tail: 15% (trad) / 20% (PT)

## What Stayed the Same

✓ Two-panel interface (Inputs / Comparison Results)
✓ Interactive sliders with number inputs
✓ Auto-save to localStorage
✓ Print-to-PDF functionality
✓ Prima Trade branding and colors
✓ Mobile responsive design
✓ All calculation precision and accuracy

## Benefits of the Update

1. **More Realistic Model**: Three tiers better reflect actual supplier base dynamics
2. **Better Demonstrates Long Tail Value**: Shows clear benefit of including smaller suppliers
3. **Tier-Specific Economics**: Recognizes that smaller suppliers have higher capital costs
4. **Clearer Dashboard**: Focused on 6 key metrics that matter most
5. **Netlify-Optimized**: Simplified configs for smoother deployment

## Excel Model Alignment

The React app now perfectly matches the calculations in:
- **Dashboard** sheet (headline KPIs)
- **Enterprise inputs** sheet (company profile, supplier tiers)
- **Program inputs** sheet (participation rates, discounts, timing, economics)

All formulas have been translated 1:1 from Excel to JavaScript.

## File Changes

**Modified:**
- `src/SCFComparison.jsx` (complete rewrite with three-tier logic)
- `vite.config.js` (simplified)
- `tailwind.config.js` (simplified)
- `.gitignore` (updated)

**Unchanged:**
- `src/App.jsx`
- `src/main.jsx`
- `src/App.css`
- `index.html`
- `package.json`
- `netlify.toml`
- `postcss.config.js`
- `public/240417_PTS_red_logo.png`

## Testing Checklist

Before deploying, verify:
- [ ] All three supplier tiers display correctly
- [ ] Participation rates work for each tier
- [ ] Early payment discounts calculate properly
- [ ] Supplier savings rates apply correctly
- [ ] Dashboard shows all 6 KPIs
- [ ] Outstanding balance calculation is accurate
- [ ] Values persist in localStorage
- [ ] Print/PDF works correctly
- [ ] Mobile responsive layout functions
- [ ] No console errors

## Deployment

Same as before:
```bash
cd scf-comparison
npm install
npm run dev     # Test locally
npm run build   # Build for production
```

Deploy via Netlify Drop, CLI, or Git connection.

---

**Version**: 2.0 (Updated January 1, 2026)
**Excel Model**: 260101_SCF_compared_to_PrimaTrade.xlsx
**Author**: Prima Trade / tim.nicolle@prima.trade

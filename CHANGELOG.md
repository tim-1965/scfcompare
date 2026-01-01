# SCF Comparison Calculator - Update Summary

## Version 5.1 (January 1, 2026)

### Tooltips Added - Enhanced User Guidance

This version adds comprehensive tooltips to all input fields in Panel 1, providing contextual help directly from the Excel model's notes.

---

## 🎯 New Feature: Interactive Tooltips

### **What's New**

Every input field in Panel 1 now has a small **ℹ️ icon** that shows helpful context when you hover over it.

**Example:**
```
Total Procurement Spend (ℹ️)
├─ Hover over icon
└─ Shows: "All procurement expenditure of all kinds"
```

### **Where Tooltips Appear**

Tooltips are added to **all input labels** in Panel 1 only:

1. **Company Profile**
   - Total Procurement Spend
   - Total Number of Suppliers
   - SCF Funding Rate

2. **Supplier Tiers (All 3 Tiers)**
   - Number of Suppliers / Share of Spend
   - Participation Rates (Traditional & PrimaTrade)
   - Early Payment Discounts
   - Supplier Savings Rates

3. **Card Programme (Tier 3)**
   - Card Usage %
   - Supplier Cost %
   - Buyer Rebate %
   - Free Funding Period

4. **AP Process & Payment Timing**
   - All invoice processing delays
   - Payment terms
   - SCF payment timing (Traditional & PrimaTrade)

---

## 💡 Tooltip Content

All tooltip text is extracted **directly from the Excel model** (`260101_SCF_compared_to_PrimaTrade_2.xlsx`, Column F notes).

### **Example Tooltips:**

**Company Profile:**
- "All procurement expenditure of all kinds"
- "All suppliers across goods + services"
- "Approximate annual financing rate charged by SCF funders"

**Tier 1 - Existing SCF:**
- "Current number of suppliers in SCF (typically larger)"
- "Approximate spend concentration for the suppliers in SCF"
- "Participation rate among suppliers currently in SCF"
- "Discount as % of invoice value"
- "Rate used to value supplier benefit of being paid earlier"

**Tier 2 - Next Level:**
- "The number of regular suppliers that would benefit from SCF"
- "Additional share of spend that should be in SCF"
- "Participation rate for the next layer of suppliers if offered SCF"

**Tier 3 - Long Tail:**
- "Participation rate among the long tail / SMEs"

**Card Programme:**
- "Share of long-tail spend currently paid via cards (typical)"
- "All-in cost to supplier (set as needed)"
- "Buyer rebate that the card issuer provides"
- "Credit period that the buyer enjoys with the card program"

**AP Process:**
- "Days between despatch and confirmed delivery (so that approval can start)"
- "More days when goods have to travel further (eg: from Asia)"
- "How long it takes for invoices to be approved once delivery has happened"
- "Contractual supplier payment terms"
- "How much of the spend is cross-border with longer shipping times"
- "Traditional SCF and cards: supplier receives funds after approval"
- "PrimaTrade: supplier receives funds after handover"

---

## 🎨 UI Design

### **Tooltip Component**

```jsx
<Tooltip text="Helpful explanation here">
  <label>Input Label</label>
</Tooltip>
```

**Features:**
- ℹ️ icon appears next to label
- Hover/focus to show tooltip
- Dark gray background with white text
- 256px width for readability
- Auto-positioning (appears below label)
- Arrow pointer for visual connection
- `print:hidden` class (doesn't appear in PDFs)

**Visual Example:**
```
┌─────────────────────────────┐
│ Total Procurement Spend (ℹ️) │
└─────────────────────────────┘
         │
         ▼
    ┌──────────────────────────────────────┐
    │ All procurement expenditure of all   │
    │ kinds                                 │
    └──────────────────────────────────────┘
```

---

## 🔧 Technical Implementation

### **New Component**

Added `Tooltip` component to `SCFComparison.jsx`:

```javascript
const Tooltip = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-flex items-center">
      {children}
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="ml-1.5 text-gray-400 hover:text-gray-600 transition-colors print:hidden"
      >
        <Info className="w-3.5 h-3.5" />
      </button>
      {isVisible && (
        <div className="absolute left-0 top-full mt-1 z-50 w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg">
          {text}
        </div>
      )}
    </div>
  );
};
```

### **Updated renderInput Function**

Added optional `tooltip` parameter:

```javascript
const renderInput = (
  label, 
  value, 
  setValue, 
  min, 
  max, 
  step, 
  unit = '', 
  isPercent = false, 
  disabled = false, 
  tooltip = null  // ← NEW!
) => {
  // If tooltip provided, wrap label in Tooltip component
  // Otherwise, render plain label
}
```

### **Updated All Input Calls**

Every `renderInput` call now includes tooltip text:

```javascript
// Before (v5.0)
{renderInput('Total Procurement Spend', totalProcurementSpend, setTotalProcurementSpend, 10, 10000, 10, 'MM')}

// After (v5.1)
{renderInput('Total Procurement Spend', totalProcurementSpend, setTotalProcurementSpend, 10, 10000, 10, 'MM', false, false, 'All procurement expenditure of all kinds')}
```

---

## 📦 What Changed (Files)

**Modified:**
- `src/SCFComparison.jsx`:
  - Added `Info` icon import from lucide-react
  - Added `Tooltip` component
  - Updated `renderInput` function signature
  - Added tooltip parameter to all `renderInput` calls
  - Added tooltips to static labels (Traditional discount 0.0% labels in Tiers 1, 2, 3)

**Unchanged:**
- All calculations
- All other files
- UI layout (except tooltip icons)
- Print/PDF functionality

---

## ✅ Benefits

### **1. Self-Documenting Interface**
Users can understand each input without referring to external documentation.

### **2. Direct from Source**
All tooltip text comes from the Excel model, ensuring consistency.

### **3. Non-Intrusive**
Tooltips only appear on hover/focus - they don't clutter the interface.

### **4. Print-Friendly**
Tooltips are hidden in PDFs (via `print:hidden` class).

### **5. Accessible**
Works with both mouse (hover) and keyboard (focus).

---

## 🔍 Tooltip Coverage

**Total Tooltips Added:** ~25 input fields

**Coverage by Section:**
- Company Profile: 3 tooltips
- Tier 1 (Existing SCF): 7 tooltips
- Tier 2 (Next Level): 7 tooltips
- Tier 3 (Long Tail): 7 tooltips
- Card Programme: 4 tooltips
- AP Process & Timing: 5 tooltips

---

## 📝 Example Usage

**User Action:**
1. Hovers over ℹ️ icon next to "Card Usage %"
2. Sees tooltip: "Share of long-tail spend currently paid via cards (typical)"
3. Understands what the input represents
4. Enters appropriate value

**Benefits:**
- No need to refer to documentation
- Clear context for each parameter
- Reduces user errors
- Improves confidence in inputs

---

## 🎯 Future Enhancements (Not in v5.1)

Potential improvements for future versions:
- Click-to-pin tooltips (stay open until clicked again)
- Expand/collapse all tooltips button
- Tooltip search/filter
- Mobile-optimized tooltips (tap instead of hover)

---

## 📊 Excel Model Alignment

**Current Excel Version:** 260101_SCF_compared_to_PrimaTrade_2.xlsx

All tooltip text extracted from Column F (Notes) of "Enterprise inputs" sheet:
- Row 3-9: Company profile notes
- Row 12-17: AP timing notes
- Row 22-33: Financing & participation notes
- Row 36-39: Card programme notes

Perfect 1:1 alignment maintained.

---

## 🧪 Testing Checklist

- [x] Tooltips appear on hover
- [x] Tooltips appear on focus (keyboard navigation)
- [x] Tooltips disappear on mouse leave
- [x] Tooltips disappear on blur
- [x] Tooltip text matches Excel notes
- [x] All input fields have tooltips
- [x] Tooltips don't break layout
- [x] Tooltips hidden in print/PDF
- [x] Tooltip z-index works (appears above content)
- [x] Tooltip width appropriate (64 = 256px)
- [x] Mobile compatibility maintained

---

## 🚀 Migration from v5.0

**Automatic** - no user action required.

Users will see new ℹ️ icons next to all input labels. Hovering reveals helpful context.

---

## Version History

- **v5.1**: Added tooltips to all input fields
- **v5.0**: Added SCF funding benefit calculation
- **v4.1**: Refined 3-column layout, explicit Traditional discounts
- **v4.0**: Grouped inputs by tier, color-coded sections
- **v3.0**: Simplified model + card benefits
- **v2.1**: Auto-calculated long tail + validation
- **v2.0**: Three-tier supplier segmentation
- **v1.0**: Initial two-tier model

---

**Version**: 5.1 (January 1, 2026)  
**Excel Model**: 260101_SCF_compared_to_PrimaTrade_2.xlsx  
**Author**: Prima Trade / tim.nicolle@prima.trade

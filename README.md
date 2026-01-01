# SCF Comparison Calculator

A comprehensive comparison tool for analyzing Traditional Supply Chain Finance vs PrimaTrade's advanced SCF solution.

## Overview

This application helps buyers understand the quantitative differences between traditional SCF programs and PrimaTrade's approach, highlighting four key differentiators:

1. **Early Invoice Approval**: PrimaTrade approves invoices at shipment/handover (2 days typical) vs traditional SCF which approves after delivery and processing (can be weeks for international supply chains)

2. **Supplier Discount Flexibility**: PrimaTrade enables suppliers to offer discounts that exceed the cost of financing, creating buyer value. Traditional SCF doesn't support this.

3. **Self-Digitization & Automation**: PrimaTrade enables supplier self-digitization and self-matching, reducing AP workload by ~40% across all invoice types including services.

4. **Long Tail Inclusion**: With automation from self-digitization, all suppliers (including small long-tail suppliers) can participate in funded early payments. Traditional SCF typically only covers larger suppliers, leaving long tail on payment cards (up to 4% cost).

## Key Features

- **Two-Panel Interface**: 
  - Input Parameters: Configure company profile, supplier base, payment timing, financing assumptions
  - Comparison Results: See side-by-side Traditional SCF vs PrimaTrade metrics

- **Interactive Inputs**: Slider controls with number inputs for all parameters

- **Real-time Calculations**: Instant updates as you adjust parameters

- **Comprehensive Metrics**:
  - Programme scope & volume (suppliers, spend, invoices)
  - Payment timing (days from handover, days advanced vs due date)
  - Economics (financing costs, discounts, buyer/supplier benefits, total value created)

- **Print-Ready Output**: Professional PDF export for presentations

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Netlify
npm run deploy
```

## Default Parameters

The calculator comes pre-loaded with typical enterprise values:

### Company Profile
- Total Procurement Spend: $1,800M/year
- Spend Mix: 75% goods, 20% services, 5% tail/incidental
- Total Suppliers: 8,000
- Top 50 suppliers represent 65% of spend

### Payment Timing
- Standard Payment Terms: 60 days
- Domestic/Services Delay: 4 days (handover to delivery)
- Cross-Border Delay: 21 days (handover to delivery)
- Processing Time: 6 days (delivery to approval)
- Spend Mix: 60% domestic, 40% cross-border

### Financing Assumptions
- Buyer Cost of Funds: 8%
- Traditional SCF Rate: 7%
- PrimaTrade SCF Rate: 6.5%
- Supplier Cost of Capital: 18%
- Card Programme Cost: 3.5%

### Programme Parameters
- Traditional SCF: 50 eligible suppliers, 70% participation
- PrimaTrade: All suppliers eligible, 70% top 50 participation, 60% long tail participation
- Traditional Payment: 2 days after approval
- PrimaTrade Payment: 2 days after handover
- PrimaTrade Early Payment Discount: 3.3%
- Card Cost Capture: 70%

## Calculations

### Traditional SCF
- **Participating Spend**: Top 50 suppliers × participation rate
- **Supplier Cash Receipt**: Weighted delay + processing time + payment lag
- **Days Advanced**: Payment terms - supplier cash receipt
- **Financing Cost**: Participating spend × rate × (days advanced / 365)
- **Buyer Benefit**: $0 (no discounts in traditional SCF)
- **Supplier Benefit**: Time value - financing cost

### PrimaTrade
- **Participating Spend**: (Top 50 × participation) + (Long tail × participation)
- **Supplier Cash Receipt**: Days after handover (typically 2)
- **Days Advanced**: Payment terms - supplier cash receipt
- **Financing Cost**: Participating spend × rate × (days advanced / 365)
- **Early Payment Discount**: Participating spend × discount %
- **Buyer Benefit**: Discount - financing cost
- **Supplier Benefits**: Time value - discount + card savings
- **Card Savings**: Long tail participating spend × card rate × % on cards × capture rate

### Total Value Created
Sum of buyer net benefit and supplier net benefit for each programme.

## Key Insights

The comparison typically shows:

1. **Payment Speed**: PrimaTrade delivers payments weeks faster (especially on cross-border), providing significant working capital benefit to suppliers

2. **Scope Expansion**: Including thousands of long-tail suppliers vs only 50 in traditional SCF

3. **Value Creation**: PrimaTrade generates positive value for both buyer and suppliers through:
   - Early payment discounts that exceed financing costs
   - Avoided card processing fees
   - Faster payment reducing supplier capital costs

4. **Invoice Volume**: Dramatically higher invoice counts when long tail is included, demonstrating need for automation

## Technology Stack

- **React 18.2** - UI framework
- **Vite 5** - Build tool and dev server
- **Tailwind CSS 3.4** - Styling
- **Lucide React** - Icons
- **Netlify** - Hosting platform

## File Structure

```
scf-comparison/
├── src/
│   ├── SCFComparison.jsx   # Main component with all logic
│   ├── App.jsx              # App wrapper
│   ├── main.jsx             # Entry point
│   └── App.css              # Tailwind + custom styles
├── public/
│   └── 240417_PTS_red_logo.png
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── netlify.toml
└── README.md
```

## Customization

All parameters can be adjusted via the UI. Values are automatically saved to localStorage for persistence between sessions.

To change default values, edit the `loadSavedValue()` calls in `SCFComparison.jsx`.

## Print/PDF Export

Click the "Print to PDF" button at the bottom of the Comparison Results view. The app includes print-optimized styles that:
- Show both input and comparison panels
- Use professional formatting
- Preserve Prima Trade branding colors
- Optimize table layouts for A4 pages

## Support

For questions or issues, contact: tim.nicolle@prima.trade

## License

UNLICENSED - Private use only
Copyright © 2024 Prima Trade

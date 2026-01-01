import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, BarChart3, Calculator, Users, Clock, Printer, CheckCircle, Info } from 'lucide-react';

// Tooltip Component
const Tooltip = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null);

  const handleMouseEnter = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 800); // Persist for 800ms after mouse leaves
    setHideTimeout(timeout);
  };

  const handleFocus = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    setIsVisible(true);
  };

  const handleBlur = () => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 800);
    setHideTimeout(timeout);
  };

  return (
    <div className="relative inline-flex items-center">
      {children}
      <button
        type="button"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="ml-1.5 text-gray-400 hover:text-gray-600 transition-colors print:hidden"
        aria-label="More information"
      >
        <Info className="w-3.5 h-3.5" />
      </button>
      {isVisible && (
        <div className="absolute left-0 bottom-full mb-2 z-50 w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg pointer-events-none">
          {text}
          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};

// Table Row with Tooltip Component
const TableRow = ({ label, tradValue, ptValue, note, currencySymbol = '$' }) => {
  const formatValue = (val) => {
    if (typeof val === 'number') {
      if (Math.abs(val) >= 1000000) {
        return `${currencySymbol}${(val / 1000000).toFixed(2)}M`;
      } else if (Math.abs(val) >= 1000) {
        return `${currencySymbol}${(val / 1000).toFixed(0)}K`;
      } else {
        return val.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
      }
    }
    return val;
  };

  return (
    <tr>
      <td className="py-1.5 px-3 text-sm">
        {note ? (
          <Tooltip text={note}>
            <span>{label}</span>
          </Tooltip>
        ) : (
          <span>{label}</span>
        )}
      </td>
      <td className="py-1.5 px-3 text-sm text-right font-medium">{formatValue(tradValue)}</td>
      <td className="py-1.5 px-3 text-sm text-right font-medium text-[#D64933]">{formatValue(ptValue)}</td>
    </tr>
  );
};

export default function SCFComparison() {
  const [activeView, setActiveView] = useState('inputs');
  const [showSaved, setShowSaved] = useState(false);

  const loadSavedValue = (key, defaultValue) => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('scfComparison');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed[key] !== undefined ? parsed[key] : defaultValue;
        } catch (e) {
          return defaultValue;
        }
      }
    }
    return defaultValue;
  };

  // Company Profile
  const [currencySymbol, setCurrencySymbol] = useState(() => loadSavedValue('currencySymbol', '$'));
  const [totalProcurementSpend, setTotalProcurementSpend] = useState(() => loadSavedValue('totalProcurementSpend', 1800));
  const [totalSuppliers, setTotalSuppliers] = useState(() => loadSavedValue('totalSuppliers', 8000));
  
  // Tier 1: Existing SCF
  const [tier1Suppliers, setTier1Suppliers] = useState(() => loadSavedValue('tier1Suppliers', 50));
  const [tier1SpendPct, setTier1SpendPct] = useState(() => loadSavedValue('tier1SpendPct', 65));
  const [tier1TradPartPct, setTier1TradPartPct] = useState(() => loadSavedValue('tier1TradPartPct', 40));
  const [tier1PtPartPct, setTier1PtPartPct] = useState(() => loadSavedValue('tier1PtPartPct', 40));
  const [tier1TradDiscountPct, setTier1TradDiscountPct] = useState(() => loadSavedValue('tier1TradDiscountPct', 0));
  const [tier1PtDiscountPct, setTier1PtDiscountPct] = useState(() => loadSavedValue('tier1PtDiscountPct', 0));
  const [tier1TradSavingsPct, setTier1TradSavingsPct] = useState(() => loadSavedValue('tier1TradSavingsPct', 8));
  const [tier1PtSavingsPct, setTier1PtSavingsPct] = useState(() => loadSavedValue('tier1PtSavingsPct', 10));
  
  // Tier 2: Next Level (50-1000)
  const [tier2Suppliers, setTier2Suppliers] = useState(() => loadSavedValue('tier2Suppliers', 1000));
  const [tier2SpendPct, setTier2SpendPct] = useState(() => loadSavedValue('tier2SpendPct', 30));
  const [tier2TradPartPct, setTier2TradPartPct] = useState(() => loadSavedValue('tier2TradPartPct', 0));
  const [tier2PtPartPct, setTier2PtPartPct] = useState(() => loadSavedValue('tier2PtPartPct', 70));
  const [tier2TradDiscountPct, setTier2TradDiscountPct] = useState(() => loadSavedValue('tier2TradDiscountPct', 0));
  const [tier2PtDiscountPct, setTier2PtDiscountPct] = useState(() => loadSavedValue('tier2PtDiscountPct', 2.5));
  const [tier2TradSavingsPct, setTier2TradSavingsPct] = useState(() => loadSavedValue('tier2TradSavingsPct', 12));
  const [tier2PtSavingsPct, setTier2PtSavingsPct] = useState(() => loadSavedValue('tier2PtSavingsPct', 15));
  
  // Tier 3: Long Tail (auto-calculated)
  const [tier3TradPartPct, setTier3TradPartPct] = useState(() => loadSavedValue('tier3TradPartPct', 0));
  const [tier3PtPartPct, setTier3PtPartPct] = useState(() => loadSavedValue('tier3PtPartPct', 60));
  const [tier3TradDiscountPct, setTier3TradDiscountPct] = useState(() => loadSavedValue('tier3TradDiscountPct', 0));
  const [tier3PtDiscountPct, setTier3PtDiscountPct] = useState(() => loadSavedValue('tier3PtDiscountPct', 3.5));
  const [tier3TradSavingsPct, setTier3TradSavingsPct] = useState(() => loadSavedValue('tier3TradSavingsPct', 15));
  const [tier3PtSavingsPct, setTier3PtSavingsPct] = useState(() => loadSavedValue('tier3PtSavingsPct', 20));
  const [tier3CardUsagePct, setTier3CardUsagePct] = useState(() => loadSavedValue('tier3CardUsagePct', 60));
  const [tier3CardCostPct, setTier3CardCostPct] = useState(() => loadSavedValue('tier3CardCostPct', 3.5));
  const [tier3CardRebatePct, setTier3CardRebatePct] = useState(() => loadSavedValue('tier3CardRebatePct', 1.0));
  
  // AP Process & Payment Timing
  const [delayDomestic, setDelayDomestic] = useState(() => loadSavedValue('delayDomestic', 4));
  const [delayCrossBorder, setDelayCrossBorder] = useState(() => loadSavedValue('delayCrossBorder', 21));
  const [processingTime, setProcessingTime] = useState(() => loadSavedValue('processingTime', 6));
  const [paymentTerms, setPaymentTerms] = useState(() => loadSavedValue('paymentTerms', 60));
  const [crossBorderSharePct, setCrossBorderSharePct] = useState(() => loadSavedValue('crossBorderSharePct', 40));
  const [tradDaysAfterApproval, setTradDaysAfterApproval] = useState(() => loadSavedValue('tradDaysAfterApproval', 2));
  const [ptDaysAfterHandover, setPtDaysAfterHandover] = useState(() => loadSavedValue('ptDaysAfterHandover', 2));
  
  // Financing
  const [scfRatePct, setScfRatePct] = useState(() => loadSavedValue('scfRatePct', 7));
  const [cardFreeFundingDays, setCardFreeFundingDays] = useState(() => loadSavedValue('cardFreeFundingDays', 20));

  // Save all values to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const allValues = {
        currencySymbol, totalProcurementSpend, totalSuppliers,
        tier1Suppliers, tier1SpendPct, tier1TradPartPct, tier1PtPartPct, tier1TradDiscountPct, tier1PtDiscountPct, tier1TradSavingsPct, tier1PtSavingsPct,
        tier2Suppliers, tier2SpendPct, tier2TradPartPct, tier2PtPartPct, tier2TradDiscountPct, tier2PtDiscountPct, tier2TradSavingsPct, tier2PtSavingsPct,
        tier3TradPartPct, tier3PtPartPct, tier3TradDiscountPct, tier3PtDiscountPct, tier3TradSavingsPct, tier3PtSavingsPct, tier3CardUsagePct, tier3CardCostPct, tier3CardRebatePct,
        delayDomestic, delayCrossBorder, processingTime, paymentTerms, crossBorderSharePct, tradDaysAfterApproval, ptDaysAfterHandover,
        scfRatePct, cardFreeFundingDays
      };
      localStorage.setItem('scfComparison', JSON.stringify(allValues));
      
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [currencySymbol, totalProcurementSpend, totalSuppliers,
      tier1Suppliers, tier1SpendPct, tier1TradPartPct, tier1PtPartPct, tier1TradDiscountPct, tier1PtDiscountPct, tier1TradSavingsPct, tier1PtSavingsPct,
      tier2Suppliers, tier2SpendPct, tier2TradPartPct, tier2PtPartPct, tier2TradDiscountPct, tier2PtDiscountPct, tier2TradSavingsPct, tier2PtSavingsPct,
      tier3TradPartPct, tier3PtPartPct, tier3TradDiscountPct, tier3PtDiscountPct, tier3TradSavingsPct, tier3PtSavingsPct, tier3CardUsagePct, tier3CardCostPct, tier3CardRebatePct,
      delayDomestic, delayCrossBorder, processingTime, paymentTerms, crossBorderSharePct, tradDaysAfterApproval, ptDaysAfterHandover,
      scfRatePct, cardFreeFundingDays]);

  useEffect(() => {
    if (tier1Suppliers === 0 && tier1SpendPct !== 0) {
      setTier1SpendPct(0);
    }
  }, [tier1Suppliers, tier1SpendPct]);

  const handlePrint = () => {
    window.print();
  };

  // ===== CALCULATIONS =====
  
  const totalSpend = totalProcurementSpend * 1000000;
  const domesticSharePct = 100 - crossBorderSharePct;
  
  // Auto-calculated Tier 3 values
  const tier3Suppliers = totalSuppliers - tier1Suppliers - (tier2Suppliers - tier1Suppliers);
  const tier3SpendPct = 100 - tier1SpendPct - tier2SpendPct;
  
  // Spend by tier
  const spendTier1 = totalSpend * (tier1SpendPct / 100);
  const spendTier2 = totalSpend * (tier2SpendPct / 100);
  const spendTier3 = totalSpend * (tier3SpendPct / 100);
  
  // Average time to approve invoices
  const avgApprovalTime = (domesticSharePct / 100) * (delayDomestic + processingTime) + 
                          (crossBorderSharePct / 100) * (delayCrossBorder + processingTime);
  
  // TRADITIONAL SCF CALCULATIONS
  const tradEligibleSpend = spendTier1 + spendTier2 + spendTier3;
  const tradParticipatingTier1 = spendTier1 * (tier1TradPartPct / 100);
  const tradParticipatingTier2 = spendTier2 * (tier2TradPartPct / 100);
  const tradParticipatingTier3 = spendTier3 * (tier3TradPartPct / 100);
  const tradParticipatingSpend = tradParticipatingTier1 + tradParticipatingTier2 + tradParticipatingTier3;
  const tradSupplierCashReceipt = avgApprovalTime + tradDaysAfterApproval;
  const tradDaysAdvanced = Math.max(0, paymentTerms - tradSupplierCashReceipt);
  
  // Financing costs by tier (Traditional)
  const tradFinancingTier1 = tradParticipatingTier1 * (scfRatePct / 100) * (tradDaysAdvanced / 365);
  const tradFinancingTier2 = tradParticipatingTier2 * (scfRatePct / 100) * (tradDaysAdvanced / 365);
  const tradFinancingTier3 = tradParticipatingTier3 * (scfRatePct / 100) * (tradDaysAdvanced / 365);const tradTotalFinancing = tradFinancingTier1 + tradFinancingTier2 + tradFinancingTier3;
  
  // Discounts by tier (Traditional)
  const tradDiscountTier1 = tradParticipatingTier1 * (tier1TradDiscountPct / 100);
  const tradDiscountTier2 = tradParticipatingTier2 * (tier2TradDiscountPct / 100);
  const tradDiscountTier3 = tradParticipatingTier3 * (tier3TradDiscountPct / 100);
  
  // Actual discount (MAX of financing cost and agreed discount)
  const tradActualDiscountTier1 = Math.max(tradFinancingTier1, tradDiscountTier1);
  const tradActualDiscountTier2 = Math.max(tradFinancingTier2, tradDiscountTier2);
  const tradActualDiscountTier3 = Math.max(tradFinancingTier3, tradDiscountTier3);
  
  // Card costs for tier 3 (Traditional)
  const tradCardCosts = spendTier3 * (tier3CardCostPct / 100) * (tier3CardUsagePct / 100);
  
  // Total supplier costs (Traditional)
  const tradTotalSupplierCosts = tradActualDiscountTier1 + tradActualDiscountTier2 + tradActualDiscountTier3 + tradCardCosts;
  
  // Supplier time value benefits (Traditional)
  const tradSupplierBenefitTier1 = tradParticipatingTier1 * (tier1TradSavingsPct / 100) * (tradDaysAdvanced / 365);
  const tradSupplierBenefitTier2 = tradParticipatingTier2 * (tier2TradSavingsPct / 100) * (tradDaysAdvanced / 365);
  // Tier 3 benefit uses MIN function
  const tradTier3Participating = tradParticipatingTier3;
  const tradTier3OnCards = spendTier3 * (tier3CardUsagePct / 100);
  const tradSupplierBenefitTier3 = Math.min(tradTier3Participating + tradTier3OnCards, spendTier3) * (tradDaysAdvanced / 365) * (tier3TradSavingsPct / 100);
  const tradTotalSupplierTimeValue = tradSupplierBenefitTier1 + tradSupplierBenefitTier2 + tradSupplierBenefitTier3;
  
  // Supplier net benefit (Traditional)
  const tradSupplierNetBenefit = tradTotalSupplierTimeValue - tradTotalSupplierCosts;
  
  // Buyer card benefits (Traditional)
  const tradBuyerCardRebate = (tier3CardRebatePct / 100) * (tier3CardUsagePct / 100) * spendTier3;
  const tradBuyerCardFreeFunding = (cardFreeFundingDays / 365) * (scfRatePct / 100) * (tier3CardUsagePct / 100) * spendTier3;
  
  // Outstanding balance (Traditional)
  const tradOutstandingBalance = (tradDaysAdvanced / 365) * tradParticipatingSpend;

  // Benefit of SCF funding (Traditional) - NEW in v5.0
  const tradScfFundingBenefit = tradOutstandingBalance * (tradDaysAdvanced / 365) * (scfRatePct / 100);
  
  // Buyer net benefit (Traditional)
  const tradBuyerNetBenefit = tradActualDiscountTier1 + tradActualDiscountTier2 + tradActualDiscountTier3 - 
                              tradTotalFinancing + tradBuyerCardFreeFunding + tradBuyerCardRebate + tradScfFundingBenefit;
  
  // Discounts passed through to buyer (Traditional)
  const tradDiscountsPassedThrough = (tradActualDiscountTier1 + tradActualDiscountTier2 + tradActualDiscountTier3) - tradTotalFinancing;
  
  // Total value created (Traditional)
  const tradTotalValue = tradSupplierNetBenefit + tradBuyerNetBenefit;
  
  // Rename for highlights consistency
  const tradSupplierTimeValue = tradTotalSupplierTimeValue;
  const tradTotalCosts = tradTotalSupplierCosts;
  
  // Active suppliers (Traditional)
  const tradActiveTier1 = tier1Suppliers * (tier1TradPartPct / 100);
  const tradActiveTier2 = (tier2Suppliers - tier1Suppliers) * (tier2TradPartPct / 100);
  const tradActiveTier3 = tier3Suppliers * (tier3TradPartPct / 100);
  const tradTotalActive = tradActiveTier1 + tradActiveTier2 + tradActiveTier3;
  
  // PRIMATRADE CALCULATIONS
  const ptEligibleSpend = spendTier1 + spendTier2 + spendTier3;
  const ptParticipatingTier1 = spendTier1 * (tier1PtPartPct / 100);
  const ptParticipatingTier2 = spendTier2 * (tier2PtPartPct / 100);
  const ptParticipatingTier3 = spendTier3 * (tier3PtPartPct / 100);
  const ptParticipatingSpend = ptParticipatingTier1 + ptParticipatingTier2 + ptParticipatingTier3;
  
  const ptSupplierCashReceipt = ptDaysAfterHandover;
  const ptDaysAdvanced = Math.max(0, paymentTerms - ptSupplierCashReceipt);
  const ptDaysFaster = tradSupplierCashReceipt - ptSupplierCashReceipt;
  
  // Financing costs by tier (PrimaTrade)
  const ptFinancingTier1 = ptParticipatingTier1 * (scfRatePct / 100) * (ptDaysAdvanced / 365);
  const ptFinancingTier2 = ptParticipatingTier2 * (scfRatePct / 100) * (ptDaysAdvanced / 365);
  const ptFinancingTier3 = ptParticipatingTier3 * (scfRatePct / 100) * (ptDaysAdvanced / 365);
  const ptTotalFinancing = ptFinancingTier1 + ptFinancingTier2 + ptFinancingTier3;
  
  // Agreed discounts by tier
  const ptDiscountTier1 = ptParticipatingTier1 * (tier1PtDiscountPct / 100);
  const ptDiscountTier2 = ptParticipatingTier2 * (tier2PtDiscountPct / 100);
  const ptDiscountTier3 = ptParticipatingTier3 * (tier3PtDiscountPct / 100);
  
  // Actual discount (MAX of financing cost and agreed discount)
  const ptActualDiscountTier1 = Math.max(ptFinancingTier1, ptDiscountTier1);
  const ptActualDiscountTier2 = Math.max(ptFinancingTier2, ptDiscountTier2);
  const ptActualDiscountTier3 = Math.max(ptFinancingTier3, ptDiscountTier3);
  
  // No card costs for PrimaTrade
  const ptCardCosts = 0;
  
  // Total supplier costs (PrimaTrade)
  const ptTotalSupplierCosts = ptActualDiscountTier1 + ptActualDiscountTier2 + ptActualDiscountTier3 + ptCardCosts;
  
  // Supplier time value benefits (PrimaTrade)
  const ptSupplierBenefitTier1 = ptParticipatingTier1 * (tier1PtSavingsPct / 100) * (ptDaysAdvanced / 365);
  const ptSupplierBenefitTier2 = ptParticipatingTier2 * (tier2PtSavingsPct / 100) * (ptDaysAdvanced / 365);
  const ptSupplierBenefitTier3 = ptParticipatingTier3 * (tier3PtSavingsPct / 100) * (ptDaysAdvanced / 365);
  const ptTotalSupplierTimeValue = ptSupplierBenefitTier1 + ptSupplierBenefitTier2 + ptSupplierBenefitTier3;
  
  // Supplier net benefit (PrimaTrade)
  const ptSupplierNetBenefit = ptTotalSupplierTimeValue - ptTotalSupplierCosts;
  
  // No card benefits for buyer with PrimaTrade
  const ptBuyerCardRebate = 0;
  const ptBuyerCardFreeFunding = 0;
  
  // Outstanding balance (PrimaTrade)
  const ptOutstandingBalance = (ptDaysAdvanced / 365) * ptParticipatingSpend;

  // Benefit of SCF funding (PrimaTrade) - NEW in v5.0
  const ptScfFundingBenefit = ptOutstandingBalance * (ptDaysAdvanced / 365) * (scfRatePct / 100);
  
  // Buyer net benefit (PrimaTrade)
  const ptBuyerNetBenefit = ptActualDiscountTier1 + ptActualDiscountTier2 + ptActualDiscountTier3 - ptTotalFinancing + ptScfFundingBenefit;
  
  // Discounts passed through to buyer (PrimaTrade)
  const ptDiscountsPassedThrough = (ptActualDiscountTier1 + ptActualDiscountTier2 + ptActualDiscountTier3) - ptTotalFinancing;
  
  // Total value created (PrimaTrade)
  const ptTotalValue = ptSupplierNetBenefit + ptBuyerNetBenefit;
  
  // Rename for highlights consistency
  const ptSupplierTimeValue = ptTotalSupplierTimeValue;
  const ptTotalCosts = ptTotalSupplierCosts;
  
  // Active suppliers (PrimaTrade)
  const ptActiveTier1 = tier1Suppliers * (tier1PtPartPct / 100);
  const ptActiveTier2 = (tier2Suppliers - tier1Suppliers) * (tier2PtPartPct / 100);
  const ptActiveTier3 = tier3Suppliers * (tier3PtPartPct / 100);
  const ptTotalActive = ptActiveTier1 + ptActiveTier2 + ptActiveTier3;
  
  // Suppliers switching from cards
  const ptSuppliersFromCards = ptActiveTier3;
  
  const tradEligibleSuppliers = tier1Suppliers + (tier2Suppliers - tier1Suppliers) + tier3Suppliers;

  // DELTAS
  const deltaEligibleSpend = ptEligibleSpend - tradEligibleSpend;
  const deltaParticipatingSpend = ptParticipatingSpend - tradParticipatingSpend;
  const deltaOutstandingBalance = ptOutstandingBalance - tradOutstandingBalance;
  const deltaEligibleSuppliers = totalSuppliers - tradEligibleSuppliers;
  const deltaActiveSuppliers = ptTotalActive - tradTotalActive;
  const deltaSuppliersFromCards = ptSuppliersFromCards;
  const deltaCashReceipt = ptSupplierCashReceipt - tradSupplierCashReceipt;
  const deltaDaysAdvanced = ptDaysAdvanced - tradDaysAdvanced;
  const deltaBuyerBenefit = ptBuyerNetBenefit - tradBuyerNetBenefit;
  const deltaSupplierBenefit = ptSupplierNetBenefit - tradSupplierNetBenefit;
  const deltaTotalValue = ptTotalValue - tradTotalValue;

  // Formatting helpers
  const formatCurrency = (value) => {
    if (Math.abs(value) >= 1000000) {
      return `${currencySymbol}${(value / 1000000).toFixed(2)}M`;
    } else if (Math.abs(value) >= 1000) {
      return `${currencySymbol}${(value / 1000).toFixed(0)}K`;
    } else {
      return `${currencySymbol}${value.toFixed(0)}`;
    }
  };

  const formatNumber = (value, decimals = 0) => {
    return value.toLocaleString('en-US', { 
      minimumFractionDigits: decimals, 
      maximumFractionDigits: decimals 
    });
  };

  const formatPercent = (value) => {
    return `${value.toFixed(1)}%`;
  };

  const highlightStats = [
    {
      label: 'Programme size',
      trad: formatCurrency(tradOutstandingBalance),
      pt: formatCurrency(ptOutstandingBalance),
      tooltip: "The funding program is bigger with more suppliers and with longer funding periods"
    },
    {
      label: 'Number of suppliers eligible',
      trad: formatNumber(tier1Suppliers, 0),
      pt: formatNumber(totalSuppliers, 0),
      tooltip: "The number of suppliers involved is higher"
    },
    {
      label: 'Active number of suppliers using SCF',
      trad: formatNumber(tradTotalActive, 0),
      pt: formatNumber(ptTotalActive, 0),
      tooltip: "Smaller suppliers will more actively use the SCF program"
    },
    {
      label: 'Total economic value of the SCF program',
      trad: formatCurrency(tradTotalValue),
      pt: formatCurrency(ptTotalValue),
      tooltip: "Total value created by the program is bigger as it reaches those who need it"
    }
  ];

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
    sliderWidth = 'w-full',
    { formatDisplay, parseInput, tooltip, labelClassName = '' } = {}
  ) => {
    const formattedValue = formatDisplay ? formatDisplay(value) : value;

    const handleChange = (rawValue) => {
      if (disabled) return;
      const parsed = parseInput ? parseInput(rawValue) : parseFloat(rawValue);
      setValue(Number.isFinite(parsed) ? parsed : 0);
    };

    const handleBlur = (rawValue) => {
      if (disabled) return;
      const parsed = parseInput ? parseInput(rawValue) : parseFloat(rawValue);
      const clamped = Math.min(Math.max(Number.isFinite(parsed) ? parsed : 0, min), max);
      setValue(clamped);
    };

    const suffix = isPercent ? '%' : unit;

    return (
      <div className="space-y-2 w-full">
         <div className="grid grid-cols-[1fr,auto] items-baseline gap-3 w-full">
          {tooltip ? (
            <Tooltip text={tooltip}>
              <label className={`text-sm font-medium flex-1 ${disabled ? 'text-gray-400' : 'text-gray-700'} ${labelClassName}`}>
                {label}
              </label>
            </Tooltip>
          ) : (
            <label className={`text-sm font-medium flex-1 ${disabled ? 'text-gray-400' : 'text-gray-700'} ${labelClassName}`}>
              {label}
            </label>
          )}
          <div className="flex items-baseline gap-1 justify-end text-right w-[110px] shrink-0 ml-auto">
            <input
              type={formatDisplay ? 'text' : 'number'}
              inputMode="decimal"
              value={formattedValue}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={(e) => handleBlur(e.target.value)}
              disabled={disabled}
              className={`w-full text-right px-2 py-1 border border-gray-300 rounded text-sm font-semibold ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-[#D64933]'}`}
              step={step}
              min={min}
              max={max}
            />
            <span className={`text-sm ${disabled ? 'text-gray-400' : 'text-gray-600'} text-right w-8`}>{suffix}</span>
          </div>
        </div>
        {!disabled && (
          <input
           type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value))}
            className={`slider ${sliderWidth}`}
            style={{
              background: `linear-gradient(to right, #F08070 0%, #F08070 ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%)`
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm print:hidden">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="/240417_PTS_red_logo.png" 
                alt="Prima Trade" 
                className="h-8 sm:h-10"
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  SCF comparison calculator
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  Traditional SCF vs PrimaTrade
                </p>
              </div>
            </div>
            {showSaved && (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Saved</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 print:hidden">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setActiveView('inputs')}
              className={`w-full px-4 py-3 font-semibold text-sm rounded-t-lg border-b-4 transition ${
                activeView === 'inputs'
                  ? 'bg-gradient-to-r from-[#FBE4DD] via-white to-white border-[#D64933] text-[#8B1D12] shadow'
                  : 'bg-gray-50 border-transparent text-gray-700 hover:text-gray-900 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Input parameters
              </div>
            </button>
            <button
              onClick={() => setActiveView('comparison')}
               className={`w-full px-4 py-3 font-semibold text-sm rounded-t-lg border-b-4 transition ${
                activeView === 'comparison'
                  ? 'bg-gradient-to-r from-[#0F1B2C] via-[#1F2D3D] to-[#D64933] border-[#0F1B2C] text-white shadow'
                  : 'bg-gray-50 border-transparent text-gray-700 hover:text-gray-900 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Comparison results
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Panel 1: Inputs */}
          {activeView === 'inputs' && (
            <div data-panel="inputs" className="space-y-4 sm:space-y-6">
               
            {/* Company Profile */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <DollarSign className="w-6 h-6 text-[#F08070]" />
                    Company profile
                  </h2>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Currency</label>
                    <select
                      value={currencySymbol}
                      onChange={(e) => setCurrencySymbol(e.target.value)}
                      className="w-32 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="$">$ USD</option>
                      <option value="€">€ EUR</option>
                      <option value="£">£ GBP</option>
                      <option value="¥">¥ JPY</option>
                    </select>
                  </div>
                  </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                  <div>
                    {renderInput('Total procurement spend', totalProcurementSpend, setTotalProcurementSpend, 10, 10000, 10, 'MM', false, false, 'w-full', {
                      formatDisplay: (val) => `${currencySymbol}${formatNumber(val, 0)}`,
                      parseInput: (input) => {
                        const numeric = input.replace(/[^0-9.]/g, '');
                        return parseFloat(numeric);
                      },
                      tooltip: 'All procurement expenditure of all kinds, goods and services, domestic and international.',
                      labelClassName: 'text-[13px]'
                    })}
                  </div>
                  <div>
                    {renderInput('Number of suppliers', totalSuppliers, setTotalSuppliers, 100, 50000, 100, '', false, false, 'w-full', {
                      tooltip: 'All suppliers across goods + services.'
                    })}
                  </div>
                  <div>
                    {renderInput('International share', crossBorderSharePct, setCrossBorderSharePct, 0, 100, 5, '', true, false, 'w-full', {
                      tooltip: 'How much of the spend is cross-border with longer shipping times',
                      labelClassName: 'text-[13px]'
                    })}
                  </div>
                  <div>
                    {renderInput('SCF funding rate', scfRatePct, setScfRatePct, 0, 20, 0.1, '', true, false, 'w-full', {
                      tooltip: 'Approximate annual financing rate charged by SCF funders'
                    })}
                  </div>
                </div>
              </div>

 <div className="max-w-5xl mx-auto">
 <div className="bg-gradient-to-r from-[#0F1B2C] via-[#1F3A56] to-[#D64933] rounded-xl shadow-xl p-[1px]">
                <div className="bg-white/95 rounded-[0.95rem] p-5 sm:p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-[#D64933]" />
                        Highlights from results
                      </h2>
                      <p className="text-sm text-gray-600">Live view of the key outcomes while you adjust inputs.</p>
                    </div>
                    <div className="flex items-center gap-2 bg-[#0F1B2C] text-white px-3 py-2 rounded-lg shadow">
                      <span className="text-xs uppercase tracking-wide text-orange-100">Snapshot</span>
                      <BarChart3 className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mt-5">
                    {highlightStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-lg bg-gradient-to-br from-[#FBE4DD] via-white to-white border border-[#F6BFB0] shadow-sm p-4"
                      >
                        <p className="text-xs font-semibold text-[#8B1D12] uppercase tracking-wide">{stat.label}</p>
                        <div className="flex items-end justify-between gap-2 mt-3">
                          <div>
                            <p className="text-[11px] font-semibold text-gray-600">Traditional</p>
                            <p className="text-lg font-bold text-gray-900">{stat.trad}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[11px] font-semibold text-[#D64933]">PrimaTrade</p>
                            <p className="text-lg font-bold text-[#D64933]">{stat.pt}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              </div>

              {/* Supplier Tiers */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-6 h-6 text-[#F08070]" />
                  Supplier tiers configuration
                </h2>
                
                <div className="space-y-6">
                  {/* Tier 1: Existing SCF */}
                  <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50/30">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Tier 1: Existing SCF suppliers (or eligible for traditional SCF)</h3>
                    <div className="space-y-4">
                      {/* Basic Info */}
                      <div className="grid md:grid-cols-2 gap-4 pb-4 border-b border-blue-200">
                          <div className="w-full">
                          {renderInput('Number of suppliers', tier1Suppliers, setTier1Suppliers, 0, 500, 10, '', false, false, 'w-full', {
                            tooltip: 'Current number of suppliers in SCF (typically larger)'
                          })}
                        </div>
                        <div className="w-full">
                          {renderInput('Share of total spend', tier1SpendPct, setTier1SpendPct, 0, 100, 1, '', true, false, 'w-full', {
                            tooltip: 'Approximate spend concentration for the suppliers in SCF'
                          })}
                        </div>
                      </div>
                      
                      {/* Three Columns */}
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Column 1: Participation Rate */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 border-b border-blue-200 pb-2">Participation rate</h4>
                          {renderInput('Traditional SCF', tier1TradPartPct, setTier1TradPartPct, 0, 100, 5, '', true, false, 'w-full', {
                            tooltip: 'Participation rate among suppliers currently in SCF'
                          })}
                          {renderInput('PrimaTrade', tier1PtPartPct, setTier1PtPartPct, 0, 100, 5, '', true, false, 'w-full', {
                            tooltip: 'Participation rate among suppliers currently in SCF'
                          })}
                        </div>
                        
                        {/* Column 2: Early Payment Discount */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 border-b border-blue-200 pb-2">Early payment discount</h4>
                          {renderInput('Traditional SCF', tier1TradDiscountPct, setTier1TradDiscountPct, 0, 5, 0.1, '', true, false, 'w-full', {
                            tooltip: 'Discount as % of invoice value'
                          })}
                          {renderInput('PrimaTrade', tier1PtDiscountPct, setTier1PtDiscountPct, 0, 5, 0.1, '', true, false, 'w-full', {
                            tooltip: 'Discount as % of invoice value'
                          })}
                        </div>
                        
                        {/* Column 3: Supplier Savings Rate */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 border-b border-blue-200 pb-2">Supplier savings rate</h4>
                          {renderInput('Traditional SCF', tier1TradSavingsPct, setTier1TradSavingsPct, 0, 30, 0.5, '', true, false, 'w-full', {
                            tooltip: 'Rate used to value supplier benefit of being paid earlier'
                          })}
                          {renderInput('PrimaTrade', tier1PtSavingsPct, setTier1PtSavingsPct, 0, 30, 0.5, '', true, false, 'w-full', {
                            tooltip: 'Rate used to value supplier benefit of being paid earlier'
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tier 2: Next Level */}
                  <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50/30">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Tier 2: Next Level ({tier1Suppliers}-{tier2Suppliers}) suppliers</h3>
                    <div className="space-y-4">
                      {/* Basic Info */}
                      <div className="grid md:grid-cols-2 gap-4 pb-4 border-b border-green-200">
                            <div className="w-full">
                          {renderInput('Ideal further suppliers for SCF', tier2Suppliers, setTier2Suppliers, 100, 5000, 50, '', false, false, 'w-full', {
                            tooltip: 'The number of regular suppliers that would benefit from SCF'
                          })}
                        </div>
                           <div className="w-full">
                          {renderInput('Share of total spend', tier2SpendPct, setTier2SpendPct, 0, 100, 1, '', true, false, 'w-full', {
                            tooltip: 'Additional share of spend that should be in SCF'
                          })}
                        </div>
                      </div>
                      
                       {/* Three Columns */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {/* Column 1: Participation rate */}
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-gray-700 border-b border-green-200 pb-2">Participation rate</h4>
                            <div className="space-y-2">
                              {renderInput('Traditional SCF', tier2TradPartPct, setTier2TradPartPct, 0, 100, 5, '', true, false, 'w-full', {
                                tooltip: 'Participation rate for the next layer of suppliers if offered SCF'
                              })}
                              {renderInput('PrimaTrade', tier2PtPartPct, setTier2PtPartPct, 0, 100, 5, '', true, false, 'w-full', {
                                tooltip: 'Participation rate for the next layer of suppliers if offered SCF'
                              })}
                            </div>
                          </div>

                          {/* Column 2: Early payment discount */}
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-gray-700 border-b border-green-200 pb-2">Early payment discount</h4>
                            {renderInput('Traditional SCF', tier2TradDiscountPct, setTier2TradDiscountPct, 0, 5, 0.1, '', true, false, 'w-full', {
                              tooltip: 'Discount as % of invoice value'
                            })}
                            {renderInput('PrimaTrade', tier2PtDiscountPct, setTier2PtDiscountPct, 0, 5, 0.1, '', true, false, 'w-full', {
                              tooltip: 'Discount as % of invoice value'
                            })}
                          </div>

                          {/* Column 3: Supplier Savings Rate */}
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-gray-700 border-b border-green-200 pb-2">Supplier savings rate</h4>
                            {renderInput('Traditional SCF', tier2TradSavingsPct, setTier2TradSavingsPct, 0, 30, 0.5, '', true, false, 'w-full', {
                              tooltip: 'Rate used to value supplier benefit of being paid earlier'
                            })}
                            {renderInput('PrimaTrade', tier2PtSavingsPct, setTier2PtSavingsPct, 0, 30, 0.5, '', true, false, 'w-full', {
                              tooltip: 'Rate used to value supplier benefit of being paid earlier'
                            })}
                          </div>
                        </div>
                      </div>
                  </div>

                  {/* Tier 3: Long Tail */}
                  <div className="border-2 border-orange-200 rounded-lg p-4 bg-orange-50/30">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Tier 3: Long tail suppliers</h3>
                    <div className="space-y-4">
                      {/* Basic Info */}
                      <div className="grid md:grid-cols-2 gap-4 pb-4 border-b border-orange-200">
                            <div className="w-full space-y-2">
                          <div className="flex justify-between items-baseline">
                            <label className="text-sm font-medium text-gray-700">Number of suppliers (auto-calc)</label>
                            <span className="text-sm font-semibold text-gray-900">{formatNumber(tier3Suppliers)}</span>
                          </div>
                        </div>
                          <div className="w-full space-y-2">
                          <div className="flex justify-between items-baseline">
                            <label className="text-sm font-medium text-gray-700">Share of total spend (auto-calc)</label>
                            <span className={`text-sm font-semibold ${tier3SpendPct >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
                              {tier3SpendPct.toFixed(1)}%
                            </span>
                          </div>
                          {tier3SpendPct < 0 && (
                            <p className="text-xs text-red-600">⚠️ Tier 1 + Tier 2 exceed 100%</p>
                          )}
                        </div>
                      </div>
                      
                      {/* Three Columns */}
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-4 border-b border-orange-200">
                        {/* Column 1: Participation rate */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 border-b border-orange-200 pb-2">Participation rate</h4>
                          {renderInput('Traditional SCF', tier3TradPartPct, setTier3TradPartPct, 0, 100, 5, '', true, false, 'w-full', {
                            tooltip: 'Participation rate among the long tail / SMEs'
                          })}
                          {renderInput('PrimaTrade', tier3PtPartPct, setTier3PtPartPct, 0, 100, 5, '', true, false, 'w-full', {
                            tooltip: 'Participation rate among the long tail / SMEs'
                          })}
                        </div>
                        
                        {/* Column 2: Early payment discount */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 border-b border-orange-200 pb-2">Early payment discount</h4>
                          {renderInput('Traditional SCF', tier3TradDiscountPct, setTier3TradDiscountPct, 0, 5, 0.1, '', true, false, 'w-full', {
                            tooltip: 'Discount as % of invoice value'
                          })}
                          {renderInput('PrimaTrade', tier3PtDiscountPct, setTier3PtDiscountPct, 0, 5, 0.1, '', true, false, 'w-full', {
                            tooltip: 'Discount as % of invoice value'
                          })}
                        </div>
                        
                        {/* Column 3: Supplier savings rate */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 border-b border-orange-200 pb-2">Supplier savings rate</h4>
                          {renderInput('Traditional SCF', tier3TradSavingsPct, setTier3TradSavingsPct, 0, 30, 0.5, '', true, false, 'w-full', {
                            tooltip: 'Rate used to value supplier benefit of being paid earlier'
                          })}
                          {renderInput('PrimaTrade', tier3PtSavingsPct, setTier3PtSavingsPct, 0, 30, 0.5, '', true, false, 'w-full', {
                            tooltip: 'Rate used to value supplier benefit of being paid earlier'
                          })}
                        </div>
                      </div>
                      
                      {/* Card programme */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Card programme (potentially replaced with PrimaTrade SCF)</h4>
                        <div className="grid md:grid-cols-4 gap-4">
                          {renderInput('Card usage %', tier3CardUsagePct, setTier3CardUsagePct, 0, 100, 5, '', true, false, 'w-full', {
                            tooltip: 'Share of long-tail spend currently paid via cards (typical)'
                          })}
                          {renderInput('Supplier cost %', tier3CardCostPct, setTier3CardCostPct, 0, 10, 0.1, '', true, false, 'w-full', {
                            tooltip: 'All-in cost to supplier (set as needed)'
                          })}
                          {renderInput('Buyer rebate %', tier3CardRebatePct, setTier3CardRebatePct, 0, 5, 0.1, '', true, false, 'w-full', {
                            tooltip: 'Buyer rebate that the card issuer provides'
                          })}
                          {renderInput('Buyer free period', cardFreeFundingDays, setCardFreeFundingDays, 0, 60, 1, 'days', false, false, 'w-full', {
                            tooltip: 'Credit period that the buyer enjoys with the card program'
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AP process & payment timing */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-[#F08070]" />
                  AP process & payment timing
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700">Days between handover and accepted delivery</h3>
                    {renderInput('Domestic / services', delayDomestic, setDelayDomestic, 0, 30, 1, 'days', false, false, 'w-full', {
                      tooltip: 'Days between despatch and confirmed delivery (so that approval can start)'
                    })}
                    {renderInput('Cross-border', delayCrossBorder, setDelayCrossBorder, 0, 60, 1, 'days', false, false, 'w-full', {
                      tooltip: 'More days when goods have to travel further (eg: from Asia)'
                    })}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700">Term and approval timing</h3>
                    {renderInput('Delivery to invoice approval', processingTime, setProcessingTime, 0, 30, 1, 'days', false, false, 'w-full', {
                      tooltip: 'How long it takes for invoices to be approved once delivery has happened'
                    })}
                    {renderInput('Standard invoice payment terms', paymentTerms, setPaymentTerms, 0, 120, 5, 'days', false, false, 'w-full', {
                      tooltip: 'Contractual supplier payment terms.'
                    })}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700">SCF payment timing</h3>
                    {renderInput('Traditional SCF: days after approval', tradDaysAfterApproval, setTradDaysAfterApproval, 0, 10, 1, 'days', false, false, 'w-full', {
                      tooltip: 'Traditional SCF and cards: supplier receives funds after approval'
                    })}
                    {renderInput('PrimaTrade: days after handover', ptDaysAfterHandover, setPtDaysAfterHandover, 0, 10, 1, 'days', false, false, 'w-full', {
                      tooltip: 'PrimaTrade: supplier receives funds after handover'
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Panel 2: Comparison Results */}
          {activeView === 'comparison' && (
            <div data-panel="comparison" className="space-y-6">
              {/* Highlights Box */}
                 <div className="max-w-5xl mx-auto">
                 <div className="bg-gradient-to-br from-[#0F1B2C] via-[#1F3A56] to-[#D64933] rounded-xl shadow-xl p-[1px]">
                <div className="bg-white/95 rounded-[0.95rem] p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Highlights</h2>
                      <p className="text-sm text-gray-600">Core SCF metrics at a glance.</p>
                    </div>
                    <div className="flex items-center gap-2 bg-[#0F1B2C] text-white px-3 py-2 rounded-lg shadow">
                      <TrendingUp className="w-5 h-5" />
                      <span className="text-xs uppercase tracking-wide text-orange-100">Performance</span>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-lg border border-[#E6ECF2] shadow-inner">
                    <table className="w-full">
                      <thead className="bg-[#0F1B2C] text-white">
                        <tr className="">
                          <th className="text-left py-3 px-4 text-sm font-semibold">Metric</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold">Traditional SCF</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold">PrimaTrade SCF</th>
                        </tr>
                      </thead>
                      <tbody>
                        {highlightStats.map((stat, index) => (
                          <tr
                            key={stat.label}
                            className={`${index === highlightStats.length - 1 ? 'border-b-2 border-gray-200' : 'border-b border-gray-100'} bg-white hover:bg-[#FFF6F2] transition-colors`}
                          >
                            <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                              {stat.tooltip ? (
                                <Tooltip text={stat.tooltip}>
                                  <span>{stat.label}</span>
                                </Tooltip>
                              ) : (
                                <span>{stat.label}</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-sm text-right font-bold text-gray-800">{stat.trad}</td>
                            <td className="py-3 px-4 text-sm text-right font-bold text-[#D64933]">{stat.pt}</td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan="3" className="py-3 px-3 text-sm font-bold text-gray-900 bg-gray-50">Breakdown of economic value</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 px-3 pl-6 text-sm text-gray-700">
                            <Tooltip text="Supplier benefit as a result of early payments">
                              <span>Benefit of early payments to suppliers</span>
                            </Tooltip>
                          </td>
                          <td className="py-2 px-3 text-sm text-right">{formatCurrency(tradSupplierTimeValue)}</td>
                          <td className="py-2 px-3 text-sm text-right text-[#D64933]">{formatCurrency(ptSupplierTimeValue)}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 px-3 pl-6 text-sm text-gray-700">
                            <Tooltip text="Costs charged to suppliers by financiers (included in early payment discount)">
                              <span>Cost of early payments (incl card) to suppliers</span>
                            </Tooltip>
                          </td>
                          <td className="py-2 px-3 text-sm text-right">{formatCurrency(tradTotalCosts)}</td>
                          <td className="py-2 px-3 text-sm text-right text-[#D64933]">{formatCurrency(ptTotalCosts)}</td>
                        </tr>
                        <tr className="border-b-2 border-gray-300 bg-blue-50">
                          <td className="py-2 px-3 text-sm font-semibold text-gray-900">
                            <Tooltip text="Time-value benefit less larger of supplier discount and SCF cost">
                              <span>Net supplier benefit</span>
                            </Tooltip>
                          </td>
                          <td className="py-2 px-3 text-sm text-right font-bold">{formatCurrency(tradSupplierNetBenefit)}</td>
                          <td className="py-2 px-3 text-sm text-right font-bold text-[#D64933]">{formatCurrency(ptSupplierNetBenefit)}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 px-3 pl-6 text-sm text-gray-700">
                            <Tooltip text="Buyer gets funding as it still pays invoices on 60 days even though suppliers are paid earlier">
                              <span>Benefit of funding provided to the buyer</span>
                            </Tooltip>
                          </td>
                          <td className="py-2 px-3 text-sm text-right">{formatCurrency(tradBuyerCardFreeFunding + tradScfFundingBenefit)}</td>
                          <td className="py-2 px-3 text-sm text-right text-[#D64933]">{formatCurrency(ptScfFundingBenefit)}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 px-3 pl-6 text-sm text-gray-700">
                            <Tooltip text="Card rebates and funding benefit plus (PrimaTrade only) discounts less SCF financing cost">
                              <span>Benefit of discounts and rebates earned by the buyer</span>
                            </Tooltip>
                          </td>
                          <td className="py-2 px-3 text-sm text-right">{formatCurrency(tradBuyerCardRebate + tradDiscountsPassedThrough)}</td>
                          <td className="py-2 px-3 text-sm text-right text-[#D64933]">{formatCurrency(ptDiscountsPassedThrough)}</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="py-2 px-3 text-sm font-semibold text-gray-900">
                            <Tooltip text="Card rebates and funding benefit plus (PrimaTrade only) discounts less SCF financing cost">
                              <span>Net buyer benefit</span>
                            </Tooltip>
                          </td>
                          <td className="py-2 px-3 text-sm text-right font-bold">{formatCurrency(tradBuyerNetBenefit)}</td>
                          <td className="py-2 px-3 text-sm text-right font-bold text-[#D64933]">{formatCurrency(ptBuyerNetBenefit)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>
              </div>

              {/* Economics (annualised) */}
              <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Economics (annualised)</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">Item</th>
                        <th className="text-right py-2 px-3 text-sm font-semibold text-gray-700">Traditional SCF</th>
                        <th className="text-right py-2 px-3 text-sm font-semibold text-[#D64933]">PrimaTrade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <TableRow 
                        label="Supplier SCF financing cost: Tier 1"
                        currencySymbol={currencySymbol}
                        tradValue={tradFinancingTier1}
                        ptValue={ptFinancingTier1}
                        note="Costs charged to suppliers by financiers (included in early payment discount)"
                      />
                      <TableRow 
                        label="Supplier SCF financing cost: Tier 2"
                        currencySymbol={currencySymbol}
                        tradValue={tradFinancingTier2}
                        ptValue={ptFinancingTier2}
                        note="Costs charged to suppliers by financiers (included in early payment discount)"
                      />
                      <TableRow 
                        label="Supplier SCF financing cost: Tier 3"
                        currencySymbol={currencySymbol}
                        tradValue={tradFinancingTier3}
                        ptValue={ptFinancingTier3}
                        note="Costs charged to suppliers by financiers (included in early payment discount)"
                      />
                      <TableRow 
                        label="Actual discount accepted: Tier 1"
                        currencySymbol={currencySymbol}
                        tradValue={tradActualDiscountTier1}
                        ptValue={ptActualDiscountTier1}
                        note="Higher of the financing cost and the discount agreed with the buyer"
                      />
                      <TableRow 
                        label="Actual discount accepted: Tier 2"
                        currencySymbol={currencySymbol}
                        tradValue={tradActualDiscountTier2}
                        ptValue={ptActualDiscountTier2}
                        note="Higher of the financing cost and the discount agreed with the buyer"
                      />
                      <TableRow 
                        label="Actual discount accepted: Tier 3"
                        currencySymbol={currencySymbol}
                        tradValue={tradActualDiscountTier3}
                        ptValue={ptActualDiscountTier3}
                        note="Higher of the financing and the discount agreed with the buyer"
                      />
                      <TableRow 
                        label="Card costs (long tail)"
                        currencySymbol={currencySymbol}
                        tradValue={tradCardCosts}
                        ptValue={0}
                        note="Rate charged by card providers to suppliers (deducted from their receipt)"
                      />
                      <tr className="bg-gray-100 font-semibold">
                        <td className="py-2 px-3 text-sm">
                          <Tooltip text="Early payment discounts (PrimaTrade only)">
                            <span>Total supplier costs (gross)</span>
                          </Tooltip>
                        </td>
                        <td className="py-2 px-3 text-sm text-right">{formatCurrency(tradTotalSupplierCosts)}</td>
                        <td className="py-2 px-3 text-sm text-right text-[#D64933]">{formatCurrency(ptTotalSupplierCosts)}</td>
                      </tr>
                      <TableRow 
                        label="Supplier benefit: Tier 1"
                        currencySymbol={currencySymbol}
                        tradValue={tradSupplierBenefitTier1}
                        ptValue={ptSupplierBenefitTier1}
                        note="Supplier benefit as a result of early payments"
                      />
                      <TableRow 
                        label="Supplier benefit: Tier 2"
                        currencySymbol={currencySymbol}
                        tradValue={tradSupplierBenefitTier2}
                        ptValue={ptSupplierBenefitTier2}
                        note="Supplier benefit as a result of early payments"
                      />
                      <TableRow 
                        label="Supplier benefit: Tier 3"
                        currencySymbol={currencySymbol}
                        tradValue={tradSupplierBenefitTier3}
                        ptValue={ptSupplierBenefitTier3}
                        note="Supplier benefit as a result of early payments"
                      />
                      <tr className="bg-gray-100 font-semibold">
                        <td className="py-2 px-3 text-sm">
                          <Tooltip text="Total of the supplier savings">
                            <span>Total supplier time value benefit</span>
                          </Tooltip>
                        </td>
                        <td className="py-2 px-3 text-sm text-right">{formatCurrency(tradTotalSupplierTimeValue)}</td>
                        <td className="py-2 px-3 text-sm text-right text-[#D64933]">{formatCurrency(ptTotalSupplierTimeValue)}</td>
                      </tr>
                      <tr className="bg-blue-100 font-bold">
                        <td className="py-2 px-3 text-sm">
                          <Tooltip text="Time-value benefit less larger of supplier discount and SCF cost">
                            <span>Supplier net benefit</span>
                          </Tooltip>
                        </td>
                        <td className="py-2 px-3 text-sm text-right">{formatCurrency(tradSupplierNetBenefit)}</td>
                        <td className="py-2 px-3 text-sm text-right text-[#D64933]">{formatCurrency(ptSupplierNetBenefit)}</td>
                      </tr>
                      <TableRow 
                        label="Buyer rebate from cards"
                        currencySymbol={currencySymbol}
                        tradValue={tradBuyerCardRebate}
                        ptValue={0}
                        note="Rebate returned to buyer by the card provider (out of the charge they make to suppliers)"
                      />
                      <TableRow 
                        label="Buyer free funding from cards"
                        currencySymbol={currencySymbol}
                        tradValue={tradBuyerCardFreeFunding}
                        ptValue={0}
                        note="The average delay between payment to the supplier and settlement by the buyer"
                      />
                      <TableRow 
                        label="Benefit of SCF funding"
                        currencySymbol={currencySymbol}
                        tradValue={tradScfFundingBenefit}
                        ptValue={ptScfFundingBenefit}
                        note="Buyer gets funding as it still pays invoices on 60 days even though suppliers are paid earlier"
                      />
                      <TableRow 
                        label="Early payment discounts less SCF costs"
                        currencySymbol={currencySymbol}
                        tradValue={tradDiscountsPassedThrough}
                        ptValue={ptDiscountsPassedThrough}
                      />
                      <tr className="bg-green-100 font-bold">
                        <td className="py-2 px-3 text-sm">
                          <Tooltip text="Card rebates and funding benefit plus (PrimaTrade only) discounts less SCF financing cost">
                            <span>Buyer net benefit</span>
                          </Tooltip>
                        </td>
                        <td className="py-2 px-3 text-sm text-right">{formatCurrency(tradBuyerNetBenefit)}</td>
                        <td className="py-2 px-3 text-sm text-right text-[#D64933]">{formatCurrency(ptBuyerNetBenefit)}</td>
                      </tr>
                      <tr className="bg-[#F08070]/30 font-bold text-base">
                        <td className="py-4 px-4">
                          <Tooltip text="Total of buyer and supplier net benefits">
                            <span>Total value created (buyer + suppliers)</span>
                          </Tooltip>
                        </td>
                        <td className="py-4 px-4 text-right">{formatCurrency(tradTotalValue)}</td>
                        <td className="py-4 px-4 text-right text-[#D64933]">{formatCurrency(ptTotalValue)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              </div>

             {/* Baseline AP Cost & Timing */}
              <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Baseline AP Cost & Timing</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">Item</th>
                        <th className="text-right py-2 px-3 text-sm font-semibold text-gray-700">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-2 px-4 text-sm">
                          <Tooltip text="As input">
                            <span>Cross-border share of spend</span>
                          </Tooltip>
                        </td>
                        <td className="py-2 px-4 text-sm text-right font-medium">{crossBorderSharePct.toFixed(1)}%</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 text-sm">
                          <Tooltip text="100% - cross-border">
                            <span>Domestic and services share</span>
                          </Tooltip>
                        </td>
                        <td className="py-2 px-4 text-sm text-right font-medium">{(100 - crossBorderSharePct).toFixed(1)}%</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 text-sm">
                          <Tooltip text="Invoice date lag + payment terms">
                            <span>Average time taken to approve invoices</span>
                          </Tooltip>
                        </td>
                        <td className="py-2 px-4 text-sm text-right font-medium">{avgApprovalTime.toFixed(1)} days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              </div>

              {/* Programme Scope & Volume */}
              <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Programme Scope & Volume</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">Item</th>
                        <th className="text-right py-2 px-3 text-sm font-semibold text-gray-700">Traditional SCF</th>
                        <th className="text-right py-2 px-3 text-sm font-semibold text-[#D64933]">PrimaTrade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <TableRow 
                        label="Eligible suppliers (N)"
                        currencySymbol={currencySymbol}
                        tradValue={`${tier1Suppliers} suppliers`}
                        ptValue={`${totalSuppliers} suppliers`}
                        note="PrimaTrade can include the full supplier base"
                      />
                      <TableRow 
                        label={`Spend: Tier 1 suppliers`}
                        currencySymbol={currencySymbol}
                        tradValue={spendTier1}
                        ptValue={spendTier1}
                        note="Total spend × tier 1 share"
                      />
                      <TableRow 
                        label={`Spend: Tier 2 suppliers`}
                        currencySymbol={currencySymbol}
                        tradValue={spendTier2}
                        ptValue={spendTier2}
                        note="Total spend × tier 2 share"
                      />
                      <TableRow 
                        label="Spend: Long tail suppliers"
                        currencySymbol={currencySymbol}
                        tradValue={spendTier3}
                        ptValue={spendTier3}
                        note="Remaining total spend"
                      />
                      <TableRow 
                        label="% Tier 1 participating"
                        currencySymbol={currencySymbol}
                        tradValue={`${tier1TradPartPct}%`}
                        ptValue={`${tier1PtPartPct}%`}
                      />
                      <TableRow 
                        label="% Tier 2 participating"
                        currencySymbol={currencySymbol}
                        tradValue="0%"
                        ptValue={`${tier2PtPartPct}%`}
                      />
                      <TableRow 
                        label="% Tier 3 participating"
                        currencySymbol={currencySymbol}
                        tradValue="0%"
                        ptValue={`${tier3PtPartPct}%`}
                      />
                      <TableRow 
                        label="Participating spend funded"
                        currencySymbol={currencySymbol}
                        tradValue={tradParticipatingSpend}
                        ptValue={ptParticipatingSpend}
                        note="Participating spend × funding coverage."
                      />
                      <TableRow 
                        label="Active suppliers: Tier 1"
                        currencySymbol={currencySymbol}
                        tradValue={`${formatNumber(tradActiveTier1, 0)} suppliers`}
                        ptValue={`${formatNumber(ptActiveTier1, 0)} suppliers`}
                        note="Likely little change for existing larger suppliers in the SCF program"
                      />
                      <TableRow 
                        label="Active suppliers: Tier 2"
                        currencySymbol={currencySymbol}
                        tradValue={`${formatNumber(tradActiveTier2, 0)} suppliers`}
                        ptValue={`${formatNumber(ptActiveTier2, 0)} suppliers`}
                        note="More suppliers included via automation supported by digitisation and PO Match"
                      />
                      <TableRow 
                        label="Active suppliers: Tier 3"
                        currencySymbol={currencySymbol}
                        tradValue={`${formatNumber(tradActiveTier3, 0)} suppliers`}
                        ptValue={`${formatNumber(ptActiveTier3, 0)} suppliers`}
                        note="More suppliers included via automation supported by digitisation and PO Match"
                      />
                    </tbody>
                  </table>
                </div>
              </div>
              </div>
              {/* Print Button */}
              <div className="mt-8 flex justify-center print:hidden">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D64933] to-[#F08070] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  <Printer className="w-5 h-5" />
                  Print to PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

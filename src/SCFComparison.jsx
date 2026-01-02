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
  const [isPrinting, setIsPrinting] = useState(false);

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
  const [totalProcurementSpend, setTotalProcurementSpend] = useState(() => loadSavedValue('totalProcurementSpend', 500));
  const [totalSuppliers, setTotalSuppliers] = useState(() => loadSavedValue('totalSuppliers', 8000));
  
  // Tier 1: Existing SCF
  const [tier1Suppliers, setTier1Suppliers] = useState(() => loadSavedValue('tier1Suppliers', 50));
  const [tier1SpendPct, setTier1SpendPct] = useState(() => loadSavedValue('tier1SpendPct', 65));
  const [tier1TradPartPct, setTier1TradPartPct] = useState(() => loadSavedValue('tier1TradPartPct', 40));
  const [tier1PtPartPct, setTier1PtPartPct] = useState(() => loadSavedValue('tier1PtPartPct', 55));
  const [tier1TradDiscountPct, setTier1TradDiscountPct] = useState(() => loadSavedValue('tier1TradDiscountPct', 0));
  const [tier1PtDiscountPct, setTier1PtDiscountPct] = useState(() => loadSavedValue('tier1PtDiscountPct', 0));
  const [tier1TradSavingsPct, setTier1TradSavingsPct] = useState(() => loadSavedValue('tier1TradSavingsPct', 8));
  const [tier1PtSavingsPct, setTier1PtSavingsPct] = useState(() => loadSavedValue('tier1PtSavingsPct', 10));
  
  // Tier 2: Next Level (50-1000)
  const [tier2Suppliers, setTier2Suppliers] = useState(() => loadSavedValue('tier2Suppliers', 1000));
  const [tier2SpendPct, setTier2SpendPct] = useState(() => loadSavedValue('tier2SpendPct', 25));
  const [tier2TradPartPct, setTier2TradPartPct] = useState(() => loadSavedValue('tier2TradPartPct', 0));
  const [tier2PtPartPct, setTier2PtPartPct] = useState(() => loadSavedValue('tier2PtPartPct', 70));
  const [tier2TradDiscountPct, setTier2TradDiscountPct] = useState(() => loadSavedValue('tier2TradDiscountPct', 0));
  const [tier2PtDiscountPct, setTier2PtDiscountPct] = useState(() => loadSavedValue('tier2PtDiscountPct', 2.0));
  const [tier2TradSavingsPct, setTier2TradSavingsPct] = useState(() => loadSavedValue('tier2TradSavingsPct', 10));
  const [tier2PtSavingsPct, setTier2PtSavingsPct] = useState(() => loadSavedValue('tier2PtSavingsPct', 12));
  
  // Tier 3: Long Tail (auto-calculated)
  const [tier3TradPartPct, setTier3TradPartPct] = useState(() => loadSavedValue('tier3TradPartPct', 0));
  const [tier3PtPartPct, setTier3PtPartPct] = useState(() => loadSavedValue('tier3PtPartPct', 80));
  const [tier3TradDiscountPct, setTier3TradDiscountPct] = useState(() => loadSavedValue('tier3TradDiscountPct', 0));
  const [tier3PtDiscountPct, setTier3PtDiscountPct] = useState(() => loadSavedValue('tier3PtDiscountPct', 3.0));
  const [tier3TradSavingsPct, setTier3TradSavingsPct] = useState(() => loadSavedValue('tier3TradSavingsPct', 14));
  const [tier3PtSavingsPct, setTier3PtSavingsPct] = useState(() => loadSavedValue('tier3PtSavingsPct', 18));
  const [tier3CardUsagePct, setTier3CardUsagePct] = useState(() => loadSavedValue('tier3CardUsagePct', 60));
  const [tier3CardCostPct, setTier3CardCostPct] = useState(() => loadSavedValue('tier3CardCostPct', 3.5));
  const [tier3CardRebatePct, setTier3CardRebatePct] = useState(() => loadSavedValue('tier3CardRebatePct', 1.0));
  const [tier3CardRemainPct, setTier3CardRemainPct] = useState(() => loadSavedValue('tier3CardRemainPct', 25));
  
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
        tier3TradPartPct, tier3PtPartPct, tier3TradDiscountPct, tier3PtDiscountPct, tier3TradSavingsPct, tier3PtSavingsPct, tier3CardUsagePct, tier3CardCostPct, tier3CardRebatePct, tier3CardRemainPct,
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
      tier3TradPartPct, tier3PtPartPct, tier3TradDiscountPct, tier3PtDiscountPct, tier3TradSavingsPct, tier3PtSavingsPct, tier3CardUsagePct, tier3CardCostPct, tier3CardRebatePct, tier3CardRemainPct,
      delayDomestic, delayCrossBorder, processingTime, paymentTerms, crossBorderSharePct, tradDaysAfterApproval, ptDaysAfterHandover,
      scfRatePct, cardFreeFundingDays]);

  useEffect(() => {
    if (tier1Suppliers === 0 && tier1SpendPct !== 0) {
      setTier1SpendPct(0);
    }
  }, [tier1Suppliers, tier1SpendPct]);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  const handleReset = () => {
    if (window.confirm('Reset all values to defaults? This will clear any changes you have made.')) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('scfComparison');
      }
      setCurrencySymbol('$');
      setTotalProcurementSpend(500);
      setTotalSuppliers(8000);
      setTier1Suppliers(50);
      setTier1SpendPct(65);
      setTier1TradPartPct(40);
      setTier1PtPartPct(55);
      setTier1TradDiscountPct(0);
      setTier1PtDiscountPct(0);
      setTier1TradSavingsPct(8);
      setTier1PtSavingsPct(10);
      setTier2Suppliers(1000);
      setTier2SpendPct(25);
      setTier2TradPartPct(0);
      setTier2PtPartPct(70);
      setTier2TradDiscountPct(0);
      setTier2PtDiscountPct(2.0);
      setTier2TradSavingsPct(10);
      setTier2PtSavingsPct(12);
      setTier3TradPartPct(0);
      setTier3PtPartPct(80);
      setTier3TradDiscountPct(0);
      setTier3PtDiscountPct(3.0);
      setTier3TradSavingsPct(14);
      setTier3PtSavingsPct(18);
      setTier3CardUsagePct(60);
      setTier3CardCostPct(3.5);
      setTier3CardRebatePct(1.0);
      setTier3CardRemainPct(15);
      setDelayDomestic(4);
      setDelayCrossBorder(21);
      setProcessingTime(6);
      setPaymentTerms(60);
      setCrossBorderSharePct(40);
      setTradDaysAfterApproval(3);
      setPtDaysAfterHandover(3);
      setScfRatePct(7);
      setCardFreeFundingDays(20);
    }
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

  // Benefit of SCF funding (Traditional) - NEW in v5.0 note to Claude.ai/Codex - this should not be multiplied by (ptDaysAdvanced / 365) as this already included in ptOutstandingBalance
  const tradScfFundingBenefit = tradOutstandingBalance * (scfRatePct / 100);
  
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
  const ptParticipatingSpend = ptParticipatingTier1 + ptParticipatingTier2 + ptParticipatingTier3 - (spendTier3 * (tier3PtPartPct / 100) * (tier3CardUsagePct / 100) * (tier3CardRemainPct / 100));
  
  const ptSupplierCashReceipt = ptDaysAfterHandover;
  const ptDaysAdvanced = Math.max(0, paymentTerms - ptSupplierCashReceipt);
  const ptDaysFaster = tradSupplierCashReceipt - ptSupplierCashReceipt;
  
  // Financing costs by tier (PrimaTrade)
  const ptFinancingTier1 = ptParticipatingTier1 * (scfRatePct / 100) * (ptDaysAdvanced / 365);
  const ptFinancingTier2 = ptParticipatingTier2 * (scfRatePct / 100) * (ptDaysAdvanced / 365);
  const ptFinancingTier3 = ptParticipatingTier3 * (scfRatePct / 100) * (ptDaysAdvanced / 365) * (1 - (tier3CardUsagePct / 100) * (tier3CardRemainPct / 100));
  const ptTotalFinancing = ptFinancingTier1 + ptFinancingTier2 + ptFinancingTier3;
  
  // Agreed discounts by tier
  const ptDiscountTier1 = ptParticipatingTier1 * (tier1PtDiscountPct / 100);
  const ptDiscountTier2 = ptParticipatingTier2 * (tier2PtDiscountPct / 100);
  const ptDiscountTier3 = ptParticipatingTier3 * (tier3PtDiscountPct / 100);
  
  // Actual discount (MAX of financing cost and agreed discount)
  const ptActualDiscountTier1 = Math.max(ptFinancingTier1, ptDiscountTier1);
  const ptActualDiscountTier2 = Math.max(ptFinancingTier2, ptDiscountTier2);
  const ptActualDiscountTier3 = Math.max(ptFinancingTier3, ptDiscountTier3) * (1 - (tier3CardUsagePct / 100) * (tier3CardRemainPct / 100));
  
  // Card costs for PrimaTrade (cards that remain)
  const ptCardCosts = spendTier3 * (tier3CardCostPct / 100) * (tier3CardUsagePct / 100) * (tier3CardRemainPct / 100);
  
  // Total supplier costs (PrimaTrade)
  const ptTotalSupplierCosts = ptActualDiscountTier1 + ptActualDiscountTier2 + ptActualDiscountTier3 + ptCardCosts;
  
  // Supplier time value benefits (PrimaTrade)
  const ptSupplierBenefitTier1 = ptParticipatingTier1 * (tier1PtSavingsPct / 100) * (ptDaysAdvanced / 365);
  const ptSupplierBenefitTier2 = ptParticipatingTier2 * (tier2PtSavingsPct / 100) * (ptDaysAdvanced / 365);
  const ptSupplierBenefitTier3 = (ptParticipatingTier3 * (tier3PtSavingsPct / 100) * (ptDaysAdvanced / 365) * (1 - (tier3CardUsagePct / 100) * (tier3CardRemainPct / 100))) + tradSupplierBenefitTier3;
  const ptTotalSupplierTimeValue = ptSupplierBenefitTier1 + ptSupplierBenefitTier2 + ptSupplierBenefitTier3;
  
  // Supplier net benefit (PrimaTrade)
  const ptSupplierNetBenefit = ptTotalSupplierTimeValue - ptTotalSupplierCosts;
  
  // Card benefits for buyer with PrimaTrade (cards that remain)
  const ptBuyerCardRebate = (tier3CardRebatePct / 100) * (tier3CardUsagePct / 100) * spendTier3 * (tier3CardRemainPct / 100);
  const ptBuyerCardFreeFunding = (cardFreeFundingDays / 365) * (scfRatePct / 100) * (tier3CardUsagePct / 100) * spendTier3 * (tier3CardRemainPct / 100);
  
  // Outstanding balance (PrimaTrade)
  const ptOutstandingBalance = (ptDaysAdvanced / 365) * ptParticipatingSpend;

  // Benefit of SCF funding (PrimaTrade) - NEW in v5.0 note to Claude.ai/Codex - this should not be multiplied by (ptDaysAdvanced / 365) as this already included in ptOutstandingBalance
  const ptScfFundingBenefit = ptOutstandingBalance * (scfRatePct / 100);
  
  // Buyer net benefit (PrimaTrade)
  const ptBuyerNetBenefit = ptActualDiscountTier1 + ptActualDiscountTier2 + ptActualDiscountTier3 - ptTotalFinancing + ptBuyerCardFreeFunding + ptBuyerCardRebate + ptScfFundingBenefit;
  
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
  const ptActiveTier3 = tier3Suppliers * (tier3PtPartPct / 100) * (1 - (tier3CardUsagePct / 100) * (tier3CardRemainPct / 100));
  const ptTotalActive = ptActiveTier1 + ptActiveTier2 + ptActiveTier3;
  
  // Suppliers switching from cards
  const ptSuppliersFromCards = ptActiveTier3;
  
  // Suppliers on cards (Traditional and PrimaTrade)
  const tradSuppliersOnCards = tier3Suppliers * (tier3CardUsagePct / 100);
  const ptSuppliersOnCards = tier3Suppliers * (tier3CardUsagePct / 100) * (tier3CardRemainPct / 100);
  
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
      label: 'Working capital provided to suppliers',
      trad: formatCurrency(tradOutstandingBalance),
      pt: formatCurrency(ptOutstandingBalance),
      tooltip: "The funding programme is bigger with more suppliers and with longer funding periods"
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
      tooltip: "Total value created by the programme is bigger as it reaches those who need it"
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
          <label className={`text-sm font-medium flex-1 ${disabled ? 'text-gray-400' : 'text-gray-700'} ${labelClassName}`}>
            {label}
            {tooltip && (
              <Tooltip text={tooltip}>
                <></>
              </Tooltip>
            )}
          </label>
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
    <>
      <style>{`
        @media print {
          /* Show both panels on print */
          .print-inputs-panel,
          .print-comparison-panel {
            display: block !important;
          }
          
          /* Start comparison panel on new page */
          .print-comparison-panel {
            page-break-before: always !important;
          }
          
          /* Reduce padding/margins for supplier boxes to fit all three on one page */
          .print-inputs-panel .bg-white {
            padding: 0.5rem !important;
            margin-bottom: 0.4rem !important;
          }
          
          .print-inputs-panel h2 {
            font-size: 0.875rem !important;
            margin-bottom: 0.4rem !important;
          }
          
          .print-inputs-panel .space-y-2 {
            margin-top: 0.25rem !important;
            margin-bottom: 0.25rem !important;
          }
          
          .print-inputs-panel label {
            font-size: 0.7rem !important;
          }
          
          .print-inputs-panel input {
            padding: 0.125rem 0.25rem !important;
            font-size: 0.7rem !important;
          }
          
          .print-inputs-panel .text-sm {
            font-size: 0.65rem !important;
          }
          
          /* Make supplier sections more compact */
          .print-inputs-panel > div:nth-child(2),
          .print-inputs-panel > div:nth-child(3),
          .print-inputs-panel > div:nth-child(4) {
            padding: 0.4rem !important;
            margin-bottom: 0.3rem !important;
          }
          
          .print-inputs-panel > div:nth-child(2) h2,
          .print-inputs-panel > div:nth-child(3) h2,
          .print-inputs-panel > div:nth-child(4) h2 {
            font-size: 0.8rem !important;
            margin-bottom: 0.3rem !important;
          }
          
          /* Add page break before AP Process section (5th child) */
          .print-inputs-panel > div:nth-child(5) {
            page-break-before: always !important;
          }
        }
      `}</style>
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
          <div className="grid grid-cols-3 gap-4">
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
            <button
              onClick={() => setActiveView('simulation')}
              className={`w-full px-4 py-3 font-semibold text-sm rounded-t-lg border-b-4 transition ${
                activeView === 'simulation'
                  ? 'bg-gradient-to-r from-[#D64933] via-[#F08070] to-white border-[#D64933] text-white shadow'
                  : 'bg-gray-50 border-transparent text-gray-700 hover:text-gray-900 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Financial simulation
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Explanatory Text Box */}
        <div className="bg-gradient-to-r from-[#F08070]/10 to-[#D64933]/5 border-l-4 border-[#D64933] rounded-r-lg p-4 mb-6">
          <p className="text-sm text-gray-700 leading-relaxed">
            This app enables you to compare a PrimaTrade SCF programme with a traditional SCF programme. Adjust the input parameters to reflect your company's procurement profile and current (or potential) SCF arrangements and card payment program. The results will update automatically.
            PrimaTrade offers the ability to reach all your suppliers supported by a high level of automation - even suppliers in the long tail and in difficult jurisdictions. 
            You can also replace expensive card payment programs with more efficient SCF, collecting an early payment discount to bring in-house the fees that are currently paid externally. 
            On top, PrimaTrade enables early payments to be approved before delivery (at shipment), delivering much earlier cash to suppliers and much more value to buyer and suppliers - monetising that value with automation into a P&L win for buyers.
          </p>
        </div>

        <div className="space-y-6">
          {/* Panel 1: Inputs */}
          {(activeView === 'inputs' || isPrinting) && (
            <>
            <div data-panel="inputs" className={`space-y-4 sm:space-y-6 ${isPrinting ? 'print-inputs-panel' : ''} ${activeView !== 'inputs' && !isPrinting ? 'hidden' : ''}`}>
               
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
                    {renderInput('Total spend', totalProcurementSpend, setTotalProcurementSpend, 10, 10000, 10, 'MM', false, false, 'w-full', {
                      formatDisplay: (val) => `${currencySymbol}${formatNumber(val, 0)}`,
                      parseInput: (input) => {
                        const numeric = input.replace(/[^0-9.]/g, '');
                        return parseFloat(numeric);
                      },
                      tooltip: 'All procurement expenditure of all kinds, goods and services from all suppliers, domestic and international.',
                      labelClassName: 'text-[13px]'
                    })}
                  </div>
                  <div>
                    {renderInput('No. of suppliers', totalSuppliers, setTotalSuppliers, 100, 50000, 100, '', false, false, 'w-full', {
                      tooltip: 'The total number of suppliers across goods + services.'
                    })}
                  </div>
                  <div>
                    {renderInput('International share', crossBorderSharePct, setCrossBorderSharePct, 0, 100, 5, '', true, false, 'w-full', {
                      tooltip: 'How much of the spend is international (so cross-border) experiencing longer shipping times and so longer periods between shipment and invoice approval.',
                      labelClassName: 'text-[13px]'
                    })}
                  </div>
                  <div>
                    {renderInput('SCF funding rate', scfRatePct, setScfRatePct, 0, 20, 0.1, '', true, false, 'w-full', {
                      tooltip: 'Average financing rate charged by SCF funders'
                    })}
                  </div>
                </div>
              </div>

 <div className="max-w-[52rem] mx-auto">
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

        {/* PrimaTrade benefits and differences explanation */}
        <div className="bg-gradient-to-r from-[#F08070]/10 to-[#D64933]/5 border-l-4 border-[#D64933] rounded-r-lg p-4 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-6 h-6 text-[#F08070]" />
                  PrimaTrade: innovations and differences
                </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            PrimaTrade's SCF platform is the first of the next generation of SCF solutions, already proven at scale. Key innovations include:
            <li><strong>Universal supplier access:</strong> PrimaTrade's platform automates buyer processes (including early payment approvals before delivery), document handling and payments to enable all suppliers to participate; suppliers in difficult jurisdictions and the long tail of smaller suppliers can be included using PrimaTrade's onboarding and KYC/AML capabilities.</li>
            <li><strong>Early payment at shipment:</strong> PrimaTrade enables buyers to approve early payments at shipment rather than delivery via supplier-driven PO matching and automation, bringing forward cash to suppliers by several weeks and increasing the value of the programme to both suppliers and buyers.</li>
            <li><strong>Separation of discount and funding cost:</strong> PrimaTrade separates the early payment discount agreed with suppliers from the funding cost, routing the discount to the buyer P&L (net of funding costs) to maximise value for both parties.</li>  
            <li><strong>Card programme replacement:</strong> PrimaTrade enables buyers to replace expensive card payment programmes with more efficient SCF funding, bringing the rebate in-house and reducing overall costs.
            </li>
          </p>
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
                            tooltip: 'Current number of suppliers in traditional SCF (or who might be included in a traditional SCF programme): - typically larger suppliers only, ignoring card programmes (handled separately lower down).'
                          })}
                        </div>
                        <div className="w-full">
                          {renderInput('Share of total spend', tier1SpendPct, setTier1SpendPct, 0, 100, 1, '', true, false, 'w-full', {
                            tooltip: 'Share of the total spend for the suppliers eligible for traditional SCF.'
                          })}
                        </div>
                      </div>
                      
                      {/* Three Columns */}
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Column 1: Participation Rate */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 border-b border-blue-200 pb-2">Participation rate</h4>
                          {renderInput('Traditional SCF', tier1TradPartPct, setTier1TradPartPct, 0, 100, 5, '', true, false, 'w-full', {
                            tooltip: 'The proportion of eligible spend from these larger suppliers funded by traditional SCF, noting that larger suppliers typically benefit less from early payments and only value early payments that are truly early.'
                          })}
                          {renderInput('PrimaTrade', tier1PtPartPct, setTier1PtPartPct, 0, 100, 5, '', true, false, 'w-full', {
                            tooltip: 'The proportion of eligible spend funded from these larger suppliers by PrimaTrade SCF noting that participation is typically higher when early payments are available at shipment rather than later after delivery.'
                          })}
                        </div>
                        
                        {/* Column 2: Early Payment Discount */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 border-b border-blue-200 pb-2">Early payment discount</h4>
                          {renderInput('Traditional SCF', tier1TradDiscountPct, setTier1TradDiscountPct, 0, 5, 0.1, '', true, false, 'w-full', {
                            tooltip: 'The discount on the invoice agreed for early payments (ignoring any funding charge). Traditional SCF does not usually support a separate charge here (set this to zero).'
                          })}
                          {renderInput('PrimaTrade', tier1PtDiscountPct, setTier1PtDiscountPct, 0, 5, 0.1, '', true, false, 'w-full', {
                            tooltip: 'The discount on the invoice agreed for early payments at shipment; PrimaTrade enables suppliers to agree higher discounts on their invoices than the SCF funding costs, routing this benefit to the buyer P&L.'
                          })}
                        </div>
                        
                        {/* Column 3: Supplier Savings Rate */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 border-b border-blue-200 pb-2">Supplier savings rate</h4>
                          {renderInput('Traditional SCF', tier1TradSavingsPct, setTier1TradSavingsPct, 0, 30, 0.5, '', true, false, 'w-full', {
                            tooltip: 'The comparison rate that suppliers use to decide whether or not to take early payment. When early payments are made after delivery, the benefit is usually only the interest cost saving at the suppliers marginal funding cost.'
                          })}
                          {renderInput('PrimaTrade', tier1PtSavingsPct, setTier1PtSavingsPct, 0, 30, 0.5, '', true, false, 'w-full', {
                            tooltip: 'The comparison rate that suppliers use to decide whether or not to take early payment. When early payments are made before delivery, supplier benefits include interest cost savings, avoidance of credit insurance and more efficient local financing.'
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
                            tooltip: 'The number of regular suppliers that would benefit from SCF but which are typically not eligible to be included in traditional SCF programmes.'
                          })}
                        </div>
                           <div className="w-full">
                          {renderInput('Share of total spend', tier2SpendPct, setTier2SpendPct, 0, 100, 1, '', true, false, 'w-full', {
                            tooltip: 'The additional share of spend from these regular suppliers that would benefit from SCF'
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
                                tooltip: 'The proportion of eligible spend from these mid-sized suppliers that would be funded by traditional SCF if they were to be included, likely higher participation than that of larger suppliers.'
                              })}
                              {renderInput('PrimaTrade', tier2PtPartPct, setTier2PtPartPct, 0, 100, 5, '', true, false, 'w-full', {
                                tooltip: 'The proportion of eligible spend funded from these mid-sized suppliers by PrimaTrade SCF noting that participation is likely to be higher than that of larger suppliers, especially if early payments are available at shipment rather than later after delivery.'
                              })}
                            </div>
                          </div>

                          {/* Column 2: Early payment discount */}
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-gray-700 border-b border-green-200 pb-2">Early payment discount</h4>
                            {renderInput('Traditional SCF', tier2TradDiscountPct, setTier2TradDiscountPct, 0, 5, 0.1, '', true, false, 'w-full', {
                              tooltip: 'The discount on the invoice agreed for early payments (ignoring any funding charge). Traditional SCF does not usually support a separate charge here (set this to zero).'
                            })}
                            {renderInput('PrimaTrade', tier2PtDiscountPct, setTier2PtDiscountPct, 0, 5, 0.1, '', true, false, 'w-full', {
                              tooltip: 'The discount on the invoice agreed for early payments at shipment; PrimaTrade enables suppliers to agree higher discounts on their invoices than the SCF funding costs, routing this benefit to the buyer P&L.'
                            })}
                          </div>

                          {/* Column 3: Supplier Savings Rate */}
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-gray-700 border-b border-green-200 pb-2">Supplier savings rate</h4>
                            {renderInput('Traditional SCF', tier2TradSavingsPct, setTier2TradSavingsPct, 0, 30, 0.5, '', true, false, 'w-full', {
                              tooltip: 'The comparison rate that suppliers use to decide whether or not to take early payment. When early payments are made after delivery, the benefit is usually only the interest cost saving at the suppliers marginal funding cost.'
                            })}
                            {renderInput('PrimaTrade', tier2PtSavingsPct, setTier2PtSavingsPct, 0, 30, 0.5, '', true, false, 'w-full', {
                              tooltip: 'The comparison rate that suppliers use to decide whether or not to take early payment. When early payments are made before delivery, supplier benefits include interest cost savings, avoidance of credit insurance and more efficient local financing.'
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
                            <p className="text-xs text-red-600">⚠️ Tier 1 + Tier 2 share of spend exceeds 100%, change the assumptions further up to reduce their combined share of spend</p>
                          )}
                        </div>
                      </div>
                      
                      {/* Three Columns */}
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-4 border-b border-orange-200">
                        {/* Column 1: Participation rate */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 border-b border-orange-200 pb-2">Participation rate</h4>
                          {renderInput('Traditional SCF', tier3TradPartPct, setTier3TradPartPct, 0, 100, 5, '', true, false, 'w-full', {
                            tooltip: 'The proportion of eligible spend from the long-tail of suppliers that would be funded by traditional SCF if they were to be included, likely higher participation than other types of supplier.'
                          })}
                          {renderInput('PrimaTrade', tier3PtPartPct, setTier3PtPartPct, 0, 100, 5, '', true, false, 'w-full', {
                            tooltip: 'The proportion of eligible spend funded from the long-tail of suppliers by PrimaTrade SCF noting that participation is likely to be high especially if early payments are available at shipment rather than later after delivery.'
                          })}
                        </div>
                        
                        {/* Column 2: Early payment discount */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 border-b border-orange-200 pb-2">Early payment discount</h4>
                          {renderInput('Traditional SCF', tier3TradDiscountPct, setTier3TradDiscountPct, 0, 5, 0.1, '', true, false, 'w-full', {
                            tooltip: 'The discount on the invoice agreed for early payments (ignoring any funding charge). Traditional SCF does not usually support a separate charge here (set this to zero).'
                          })}
                          {renderInput('PrimaTrade', tier3PtDiscountPct, setTier3PtDiscountPct, 0, 5, 0.1, '', true, false, 'w-full', {
                            tooltip: 'The discount on the invoice agreed for early payments at shipment noting that such suppliers may well already be accepting significant discounts charged by card providers; PrimaTrade enables suppliers to agree higher discounts on their invoices than the SCF funding costs, routing this benefit to the buyer P&L, thereby also capturing the charges that otherwise card providers might take.'
                          })}
                        </div>
                        
                        {/* Column 3: Supplier savings rate */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 border-b border-orange-200 pb-2">Supplier savings rate</h4>
                          {renderInput('Traditional SCF', tier3TradSavingsPct, setTier3TradSavingsPct, 0, 30, 0.5, '', true, false, 'w-full', {
                            tooltip: 'The comparison rate that suppliers use to decide whether or not to take early payment. When early payments are made after delivery, the benefit is usually only the interest cost saving at the suppliers marginal funding cost.'
                          })}
                          {renderInput('PrimaTrade', tier3PtSavingsPct, setTier3PtSavingsPct, 0, 30, 0.5, '', true, false, 'w-full', {
                            tooltip: 'The comparison rate that suppliers use to decide whether or not to take early payment. When early payments are made before delivery, supplier benefits include interest cost savings, avoidance of credit insurance, avoidance of card charges, and more efficient local financing.'
                          })}
                        </div>
                      </div>
                      
                      {/* Card programme */}
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                          <h4 className="text-sm font-semibold text-gray-700">Card programme (potentially replaced with PrimaTrade SCF)</h4>
                          <div className="w-full lg:w-1/3">
                            {renderInput('% remaining on cards', tier3CardRemainPct, setTier3CardRemainPct, 0, 100, 5, '', true, false, 'w-full', {
                              tooltip: '% of suppliers currently paid by card that remain being paid by card and not switched to PrimaTrade SCF.'
                            })}
                          </div>
                        </div>
                        <div className="grid md:grid-cols-4 gap-4">
                          {renderInput('Card usage %', tier3CardUsagePct, setTier3CardUsagePct, 0, 100, 5, '', true, false, 'w-full', {
                            tooltip: 'Share of long-tail spend currently paid via payment cards (which PrimaTrade SCF can potentially replace)'
                          })}
                          {renderInput('Supplier cost %', tier3CardCostPct, setTier3CardCostPct, 0, 10, 0.1, '', true, false, 'w-full', {
                            tooltip: 'All-in cost to supplier - the charge deducted from the payment made to the supplier by the card issuer.'
                          })}
                          {renderInput('Buyer rebate %', tier3CardRebatePct, setTier3CardRebatePct, 0, 5, 0.1, '', true, false, 'w-full', {
                            tooltip: 'Buyer rebate that the card issuer provides out of the fees it has charged to suppliers.'
                          })}
                          {renderInput('Buyer free period', cardFreeFundingDays, setCardFreeFundingDays, 0, 60, 1, 'days', false, false, 'w-full', {
                            tooltip: 'Additional credit period that the buyer enjoys with the card program between when the supplier is paid and when the buyer has to settle.'
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
                      tooltip: 'Days between despatch and confirmed delivery (so that the approval process can start)'
                    })}
                    {renderInput('Cross-border', delayCrossBorder, setDelayCrossBorder, 0, 60, 1, 'days', false, false, 'w-full', {
                      tooltip: 'International (cross-border) supply chains involve more transit days as goods have to travel further (eg: from Asia) and also clear customs.'
                    })}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700">Term and approval timing</h3>
                    {renderInput('Delivery to invoice approval', processingTime, setProcessingTime, 0, 30, 1, 'days', false, false, 'w-full', {
                      tooltip: 'The typical number of days it takes for invoices to be approved once delivery has been confirmed.'
                    })}
                    {renderInput('Standard invoice payment terms', paymentTerms, setPaymentTerms, 0, 120, 5, 'days', false, false, 'w-full', {
                      tooltip: 'The standard term for invoices (days between issue date and payment due date) - typically measured from the date when services are delivered or goods handed over.'
                    })}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700">SCF payment timing</h3>
                    {renderInput('Traditional SCF: after approval', tradDaysAfterApproval, setTradDaysAfterApproval, 0, 10, 1, 'days', false, false, 'w-full', {
                      tooltip: 'Traditional SCF: the number of days it takes after invoice approval until the supplier requests and is paid its early payment, typically generation / transmission and processing of the payment file, supplier request being received and then actioned.'
                    })}
                    {renderInput('PrimaTrade: days after handover', ptDaysAfterHandover, setPtDaysAfterHandover, 0, 10, 1, 'days', false, false, 'w-full', {
                      tooltip: 'PrimaTrade SCF: the number of days after goods hand over / service delivery for suppliers to PO match, request early payment, for early payment approval to be given (which can be automated) and for the supplier to be paid. '
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-8 flex justify-between items-center gap-4 print:hidden">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Reset to Defaults
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D64933] to-[#F08070] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                <Printer className="w-5 h-5" />
                Print to PDF
              </button>
            </div>
            </>
          )}

          {/* Panel 2: Comparison Results */}
          {(activeView === 'comparison' || isPrinting) && (
            <>
            <div data-panel="comparison" className={`space-y-6 ${isPrinting ? 'print-comparison-panel' : ''} ${activeView !== 'comparison' && !isPrinting ? 'hidden' : ''}`}>
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
                            <Tooltip text="Supplier benefit as a result of early payments, calculated using supplier savings rates">
                              <span>Benefit of early payments to suppliers</span>
                            </Tooltip>
                          </td>
                          <td className="py-2 px-3 text-sm text-right">{formatCurrency(tradSupplierTimeValue)}</td>
                          <td className="py-2 px-3 text-sm text-right text-[#D64933]">{formatCurrency(ptSupplierTimeValue)}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 px-3 pl-6 text-sm text-gray-700">
                            <Tooltip text="Costs charged to suppliers by financiers (included in early payment discount if this is present) and separately any card costs">
                              <span>Cost of early payments (incl card) to suppliers</span>
                            </Tooltip>
                          </td>
                          <td className="py-2 px-3 text-sm text-right">{formatCurrency(tradTotalCosts)}</td>
                          <td className="py-2 px-3 text-sm text-right text-[#D64933]">{formatCurrency(ptTotalCosts)}</td>
                        </tr>
                        <tr className="border-b-2 border-gray-300 bg-blue-50">
                          <td className="py-2 px-3 text-sm font-semibold text-gray-900">
                            <Tooltip text="Time-value benefit at the SCF rate less larger of supplier discount and SCF cost (and card costs)">
                              <span>Net supplier benefit</span>
                            </Tooltip>
                          </td>
                          <td className="py-2 px-3 text-sm text-right font-bold">{formatCurrency(tradSupplierNetBenefit)}</td>
                          <td className="py-2 px-3 text-sm text-right font-bold text-[#D64933]">{formatCurrency(ptSupplierNetBenefit)}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 px-3 pl-6 text-sm text-gray-700">
                            <Tooltip text="Buyer gets a funding benefit via the cash flow support provided to suppliers by the SCF programme, calculated at the SCF rate.">
                              <span>Benefit of funding provided to the buyer</span>
                            </Tooltip>
                          </td>
                          <td className="py-2 px-3 text-sm text-right">{formatCurrency(tradBuyerCardFreeFunding + tradScfFundingBenefit)}</td>
                          <td className="py-2 px-3 text-sm text-right text-[#D64933]">{formatCurrency(ptScfFundingBenefit)}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 px-3 pl-6 text-sm text-gray-700">
                            <Tooltip text="Card rebates and funding benefit plus (PrimaTrade only) the P&L benefit arising from early payment discounts.">
                              <span>Benefit of discounts and rebates earned by the buyer</span>
                            </Tooltip>
                          </td>
                          <td className="py-2 px-3 text-sm text-right">{formatCurrency(tradBuyerCardRebate + tradDiscountsPassedThrough)}</td>
                          <td className="py-2 px-3 text-sm text-right text-[#D64933]">{formatCurrency(ptDiscountsPassedThrough)}</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="py-2 px-3 text-sm font-semibold text-gray-900">
                            <Tooltip text="Card rebates and funding benefit plus (PrimaTrade only) the P&L benefit arising from early payment discounts.">
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
                        note="Costs charged to suppliers by financiers (included in the early payment discount to avoid double-counting if this capability is supported eg: in a PrimaTrade programme)"
                      />
                      <TableRow 
                        label="Supplier SCF financing cost: Tier 2"
                        currencySymbol={currencySymbol}
                        tradValue={tradFinancingTier2}
                        ptValue={ptFinancingTier2}
                        note="Costs charged to suppliers by financiers (included in the early payment discount to avoid double-counting if this capability is supported eg: in a PrimaTrade programme)"
                      />
                      <TableRow 
                        label="Supplier SCF financing cost: Tier 3"
                        currencySymbol={currencySymbol}
                        tradValue={tradFinancingTier3}
                        ptValue={ptFinancingTier3}
                        note="Costs charged to suppliers by financiers (included in the early payment discount to avoid double-counting if this capability is supported eg: in a PrimaTrade programme)"
                      />
                      <TableRow 
                        label="Actual discount accepted: Tier 1"
                        currencySymbol={currencySymbol}
                        tradValue={tradActualDiscountTier1}
                        ptValue={ptActualDiscountTier1}
                        note="Higher of the SCF financing cost and the early payment discount (if any) agreed with the buyer"
                      />
                      <TableRow 
                        label="Actual discount accepted: Tier 2"
                        currencySymbol={currencySymbol}
                        tradValue={tradActualDiscountTier2}
                        ptValue={ptActualDiscountTier2}
                        note="Higher of the SCF financing cost and the  early payment discount (if any) agreed with the buyer"
                      />
                      <TableRow 
                        label="Actual discount accepted: Tier 3"
                        currencySymbol={currencySymbol}
                        tradValue={tradActualDiscountTier3}
                        ptValue={ptActualDiscountTier3}
                        note="Higher of the SCF financing and the  early payment discount (if any) agreed with the buyer (ignoring any card charges)"
                      />
                      <TableRow 
                        label="Card costs (long tail)"
                        currencySymbol={currencySymbol}
                        tradValue={tradCardCosts}
                        ptValue={ptCardCosts}
                        note="Rate charged by card providers to suppliers where supplier invoices are being settled by card (deducted from the supplier's receipt)"
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
                        note="Supplier benefit as a result of early payments, calculated using the relevant supplier savings rate"
                      />
                      <TableRow 
                        label="Supplier benefit: Tier 2"
                        currencySymbol={currencySymbol}
                        tradValue={tradSupplierBenefitTier2}
                        ptValue={ptSupplierBenefitTier2}
                        note="Supplier benefit as a result of early payments, calculatedusing the relevant supplier savings rate"
                      />
                      <TableRow 
                        label="Supplier benefit: Tier 3"
                        currencySymbol={currencySymbol}
                        tradValue={tradSupplierBenefitTier3}
                        ptValue={ptSupplierBenefitTier3}
                        note="Supplier benefit as a result of early payments, calculated using the relevant supplier savings rate"
                      />
                      <tr className="bg-gray-100 font-semibold">
                        <td className="py-2 px-3 text-sm">
                          <Tooltip text="Total of the supplier savings">
                            <span>Total supplier benefit at savings rates</span>
                          </Tooltip>
                        </td>
                        <td className="py-2 px-3 text-sm text-right">{formatCurrency(tradTotalSupplierTimeValue)}</td>
                        <td className="py-2 px-3 text-sm text-right text-[#D64933]">{formatCurrency(ptTotalSupplierTimeValue)}</td>
                      </tr>
                      <tr className="bg-blue-100 font-bold">
                        <td className="py-2 px-3 text-sm">
                          <Tooltip text="The total supplier benefit of early payments less the costs incurred (larger of supplier discount and SCF cost and then additionally any card costs)">
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
                        ptValue={ptBuyerCardRebate}
                        note="Rebate returned to buyer by the card provider (out of the charge the card provider makes to suppliers)."
                      />
                      <TableRow 
                        label="Buyer free funding from cards"
                        currencySymbol={currencySymbol}
                        tradValue={tradBuyerCardFreeFunding}
                        ptValue={ptBuyerCardFreeFunding}
                        note="Average delay between supplier payment by the card provider and settlement by the buyer to the card provider times the SCF rate."
                      />
                      <TableRow 
                        label="Benefit of SCF funding"
                        currencySymbol={currencySymbol}
                        tradValue={tradScfFundingBenefit}
                        ptValue={ptScfFundingBenefit}
                        note="Value of the SCF working capital support to the supply chain that the buyer receives calculated at the SCF rate."
                      />
                      <TableRow 
                        label="Early payment discounts less SCF costs"
                        currencySymbol={currencySymbol}
                        tradValue={tradDiscountsPassedThrough}
                        ptValue={ptDiscountsPassedThrough}
                      />
                      <tr className="bg-green-100 font-bold">
                        <td className="py-2 px-3 text-sm">
                          <Tooltip text="Card rebates and funding benefit plus (PrimaTrade SCF only) early payment discounts less SCF financing costs">
                            <span>Buyer net benefit</span>
                          </Tooltip>
                        </td>
                        <td className="py-2 px-3 text-sm text-right">{formatCurrency(tradBuyerNetBenefit)}</td>
                        <td className="py-2 px-3 text-sm text-right text-[#D64933]">{formatCurrency(ptBuyerNetBenefit)}</td>
                      </tr>
                      <tr className="bg-[#F08070]/30 font-bold text-base">
                        <td className="py-4 px-4">
                          <Tooltip text="Total of buyer and supplier net benefits - so the total economic value created by the SCF programme">
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
                        note="PrimaTrade can include the full supplier base as a result of automation, digitisation, PO Match and PrimaTrade on-boarding capabilities."
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
                        note="Remaining total spend being the share of the long-tail supply chain."
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
                        note="The total spend of participating suppliers that is funded early via the SCF programme."
                      />
                      <TableRow 
                        label="Active suppliers: Tier 1"
                        currencySymbol={currencySymbol}
                        tradValue={`${formatNumber(tradActiveTier1, 0)} suppliers`}
                        ptValue={`${formatNumber(ptActiveTier1, 0)} suppliers`}
                        note="Larger suppliers should find PrimaTrade SCF more attractive because the payments come significantly earlier (early payments are truly early)."
                      />
                      <TableRow 
                        label="Active suppliers: Tier 2"
                        currencySymbol={currencySymbol}
                        tradValue={`${formatNumber(tradActiveTier2, 0)} suppliers`}
                        ptValue={`${formatNumber(ptActiveTier2, 0)} suppliers`}
                        note="More suppliers included via automation supported by digitisation and PO Match. and PrimaTrade on-boarding capabilities."
                      />
                      <TableRow 
                        label="Active suppliers: Tier 3"
                        currencySymbol={currencySymbol}
                        tradValue={`${formatNumber(tradActiveTier3, 0)} suppliers`}
                        ptValue={`${formatNumber(ptActiveTier3, 0)} suppliers`}
                        note="Significantly more suppliers included via automation supported by digitisation and PO Match, and PrimaTrade on-boarding capabilities."
                      />
                    </tbody>
                  </table>
                </div>
              </div>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-8 flex justify-between items-center gap-4 print:hidden">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  Reset to Defaults
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D64933] to-[#F08070] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  <Printer className="w-5 h-5" />
                  Print to PDF
                </button>
              </div>
            </div>
            </>
          )}
          {/* Panel 3: Financial Simulation */}
          {(activeView === 'simulation' || isPrinting) && (
            <>
            <div data-panel="simulation" className={`space-y-4 sm:space-y-6 ${isPrinting ? 'print-simulation-panel' : ''} ${activeView !== 'simulation' && !isPrinting ? 'hidden' : ''}`}>
              
              {/* Simulation Inputs */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Historic Financial Position (for comparison)</h2>
                <p className="text-sm text-gray-600 mb-6">Enter your current financial figures in millions to see the impact of digitalization</p>
                
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Input Fields - Two Columns */}
                  <div className="flex-1 lg:max-w-3xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                      {/* Left Column - P&L Items */}
                      <div className="space-y-4">
                        <h3 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-300">Key figures: P&L</h3>
                        
                        <div className="flex items-center justify-between gap-3">
                          <label className="text-sm text-gray-700 flex-1">Turnover / Revenue</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={turnover / 1000000}
                              onChange={(e) => setTurnover(parseFloat(e.target.value || 0) * 1000000)}
                              className="w-28 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F08070] text-right"
                            />
                            <span className="text-xs text-gray-600 w-10">{currencySymbol} MM</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between gap-3">
                          <label className="text-sm text-gray-700 flex-1">Cost of Sales</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={costOfSales / 1000000}
                              onChange={(e) => setCostOfSales(parseFloat(e.target.value || 0) * 1000000)}
                              className="w-28 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F08070] text-right"
                            />
                            <span className="text-xs text-gray-600 w-10">{currencySymbol} MM</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between gap-3">
                          <label className="text-sm text-gray-700 flex-1">Operating Profit</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={operatingProfit / 1000000}
                              onChange={(e) => setOperatingProfit(parseFloat(e.target.value || 0) * 1000000)}
                              className="w-28 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F08070] text-right"
                            />
                            <span className="text-xs text-gray-600 w-10">{currencySymbol} MM</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between gap-3">
                          <label className="text-sm text-gray-700 flex-1">Net Interest Payable</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={netInterest / 1000000}
                              onChange={(e) => setNetInterest(parseFloat(e.target.value || 0) * 1000000)}
                              className="w-28 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F08070] text-right"
                            />
                            <span className="text-xs text-gray-600 w-10">{currencySymbol} MM</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between gap-3">
                          <label className="text-sm text-gray-700 flex-1">EBITDA</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={ebitda / 1000000}
                              onChange={(e) => setEbitda(parseFloat(e.target.value || 0) * 1000000)}
                              className="w-28 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F08070] text-right"
                            />
                            <span className="text-xs text-gray-600 w-10">{currencySymbol} MM</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Balance Sheet Items */}
                      <div className="space-y-4">
                        <h3 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-300">Balance sheet and cash flow</h3>
                        
                        <div className="flex items-center justify-between gap-3">
                          <label className="text-sm text-gray-700 flex-1">Trade Payables</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={tradePayables / 1000000}
                              onChange={(e) => setTradePayables(parseFloat(e.target.value || 0) * 1000000)}
                              className="w-28 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F08070] text-right"
                            />
                            <span className="text-xs text-gray-600 w-10">{currencySymbol} MM</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between gap-3">
                          <label className="text-sm text-gray-700 flex-1">Net Debt</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={netDebt / 1000000}
                              onChange={(e) => setNetDebt(parseFloat(e.target.value || 0) * 1000000)}
                              className="w-28 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F08070] text-right"
                            />
                            <span className="text-xs text-gray-600 w-10">{currencySymbol} MM</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between gap-3">
                          <label className="text-sm text-gray-700 flex-1">Equity</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={equity / 1000000}
                              onChange={(e) => setEquity(parseFloat(e.target.value || 0) * 1000000)}
                              className="w-28 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F08070] text-right"
                            />
                            <span className="text-xs text-gray-600 w-10">{currencySymbol} MM</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between gap-3">
                          <label className="text-sm text-gray-700 flex-1">Free Cash Flow</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={freeCashFlow / 1000000}
                              onChange={(e) => setFreeCashFlow(parseFloat(e.target.value || 0) * 1000000)}
                              className="w-28 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F08070] text-right"
                            />
                            <span className="text-xs text-gray-600 w-10">{currencySymbol} MM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Side - Explanatory Text Box */}
                  <div className="flex-1 lg:min-w-[300px]">
                    <div className="bg-gradient-to-br from-white to-[#F08070]/5 rounded-lg border-2 border-[#F08070]/30 p-6 h-full">
                      <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-[#D64933]" />
                        Enterprise-Wide Impact
                      </h3>
                      
                      <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                        <p>
                          Trade digitalisation can make a difference to the whole of your enterprise. In this tab, you can enter some key financial numbers from your P&L, balance sheet and cash flow - and we simulate the impact of trade digitalisation on those numbers and your ratios.
                        </p>
                        
                        <p>
                          Most clients can deliver a material improvement in their key ratios (eg: interest cover, leverage, margins) as a result of the efficiencies which digitalisation brings.
                        </p>
                        
                        <p>
                          This is not an accounting trick - these efficiencies are real. It is simply more efficient to have suppliers digitise their trade documents so that payments can be made more quickly, work in head office can be reduced, and the re-processing of paperwork by third parties (customs brokers, forwarders) can be stopped. PrimaTrade's platform surfaces these benefits and enables the importer to receive them without significant changes to processes or systems.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* P&L Impact */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-[#F08070]" />
                  P&L Impact
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 w-64">Item</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 w-40">Before (with Traditional SCF)</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-[#D64933] w-40">After PrimaTrade</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-3 px-4 text-sm">Revenues</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(turnover)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-[#D64933]">{formatCurrency(turnover)}</td>
                        <td className="py-3 px-4 text-xs text-gray-600">No change</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Cost of sales</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(costOfSales)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatCurrency(adjustedCostOfSales)}</td>
                        <td className="py-3 px-4 text-xs text-gray-600">Reduced by early payment discounts captured</td>
                      </tr>
                      <tr className="bg-[#F08070]/10">
                        <td className="py-3 px-4 text-sm font-semibold">Operating profit</td>
                        <td className="py-3 px-4 text-sm text-right font-bold">{formatCurrency(operatingProfit)}</td>
                        <td className="py-3 px-4 text-sm text-right font-bold text-red-700">{formatCurrency(adjustedOperatingProfit)}</td>
                        <td className="py-3 px-4 text-xs text-gray-600">Increased by cost savings from SCF benefits</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Net interest</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(netInterest)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatCurrency(adjustedNetInterest)}</td>
                        <td className="py-3 px-4 text-xs text-gray-600">Lower as net debt reduced by working capital improvements</td>
                      </tr>
                      <tr className="bg-[#F08070]/10">
                        <td className="py-3 px-4 text-sm font-semibold">EBITDA</td>
                        <td className="py-3 px-4 text-sm text-right font-bold">{formatCurrency(ebitda)}</td>
                        <td className="py-3 px-4 text-sm text-right font-bold text-red-700">{formatCurrency(adjustedEbitda)}</td>
                        <td className="py-3 px-4 text-xs text-gray-600">Up as cost of sales is lower</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Balance Sheet Impact */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-[#F08070]" />
                  Balance Sheet & Cash Flow Impact
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 w-64">Item</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 w-40">Before (with Traditional SCF)</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-[#D64933] w-40">After PrimaTrade</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-3 px-4 text-sm">Trade payables</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(tradePayables)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-[#D64933]">{formatCurrency(adjustedTradePayables)}</td>
                        <td className="py-3 px-4 text-xs text-gray-600">Goes up as suppliers are providing more credit</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Net debt</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(netDebt)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatCurrency(adjustedNetDebt)}</td>
                        <td className="py-3 px-4 text-xs text-gray-600">Reduced as lower borrowing because of working capital benefits</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Equity</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(equity)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatCurrency(adjustedEquity)}</td>
                        <td className="py-3 px-4 text-xs text-gray-600">Increased as earnings are higher over the period</td>
                      </tr>
                      <tr className="bg-[#F08070]/10">
                        <td className="py-3 px-4 text-sm font-semibold">Free cash flow</td>
                        <td className="py-3 px-4 text-sm text-right font-bold">{formatCurrency(freeCashFlow)}</td>
                        <td className="py-3 px-4 text-sm text-right font-bold text-red-700">{formatCurrency(adjustedFCF)}</td>
                        <td className="py-3 px-4 text-xs text-gray-600">Increased as working capital generated</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Key Ratios */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-[#F08070]" />
                  Key Ratios
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 w-64">Ratio</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 w-40">Before (with Traditional SCF)</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-[#D64933] w-40">After PrimaTrade</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-3 px-4 text-sm">EBITDA margin</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatPercent(ebitdaMargin)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatPercent(adjustedEbitdaMargin)}</td>
                        <td className="py-3 px-4 text-xs text-gray-600">Up because cost of sales is lower</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Operating margin</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatPercent(operatingMargin)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatPercent(adjustedOperatingMargin)}</td>
                        <td className="py-3 px-4 text-xs text-gray-600">Up because cost of sales is lower</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Leverage (Net Debt / EBITDA)</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatNumber(leverage, 2)}x</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatNumber(adjustedLeverage, 2)}x</td>
                        <td className="py-3 px-4 text-xs text-gray-600">Down because EBITDA is higher and net debt is lower</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Solvency (Debt / Equity)</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatNumber(solvency, 2)}x</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatNumber(adjustedSolvency, 2)}x</td>
                        <td className="py-3 px-4 text-xs text-gray-600">Down because net debt is lower and equity is higher</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">FCF / Sales</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatPercent(fcfSales)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatPercent(adjustedFcfSales)}</td>
                        <td className="py-3 px-4 text-xs text-gray-600">Up because working capital is generated</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Interest cover</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatNumber(interestCover, 2)}x</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatNumber(adjustedInterestCover, 2)}x</td>
                        <td className="py-3 px-4 text-xs text-gray-600">Up because interest costs reduce and earnings increase</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-lg shadow-xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Impact Summary</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-red-100 text-sm mb-2">P&L Improvement</div>
                    <div className="text-4xl font-bold mb-1">{formatCurrency(adjustedOperatingProfit - operatingProfit)}</div>
                    <div className="text-red-100 text-sm">Operating profit increase</div>
                  </div>
                  <div>
                    <div className="text-red-100 text-sm mb-2">Working Capital Released</div>
                    <div className="text-4xl font-bold mb-1">{formatCurrency(totalWCBenefit)}</div>
                    <div className="text-red-100 text-sm">Additional cash available</div>
                  </div>
                  <div>
                    <div className="text-red-100 text-sm mb-2">Leverage Improvement</div>
                    <div className="text-4xl font-bold mb-1">{formatNumber(leverage - adjustedLeverage, 2)}x</div>
                    <div className="text-red-100 text-sm">Net Debt / EBITDA reduction</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-between items-center gap-4 print:hidden">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  Reset to Defaults
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D64933] to-[#F08070] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  <Printer className="w-5 h-5" />
                  Print to PDF
                </button>
              </div>
            </div>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

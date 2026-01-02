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
  const [tier1TradPaymentTerms, setTier1TradPaymentTerms] = useState(() => loadSavedValue('tier1TradPaymentTerms', 90));
  const [tier1PtPaymentTerms, setTier1PtPaymentTerms] = useState(() => loadSavedValue('tier1PtPaymentTerms', 90));
  
  // Tier 2: Next Level (50-1000)
  const [tier2Suppliers, setTier2Suppliers] = useState(() => loadSavedValue('tier2Suppliers', 1000));
  const [tier2SpendPct, setTier2SpendPct] = useState(() => loadSavedValue('tier2SpendPct', 25));
  const [tier2TradPartPct, setTier2TradPartPct] = useState(() => loadSavedValue('tier2TradPartPct', 0));
  const [tier2PtPartPct, setTier2PtPartPct] = useState(() => loadSavedValue('tier2PtPartPct', 70));
  const [tier2TradDiscountPct, setTier2TradDiscountPct] = useState(() => loadSavedValue('tier2TradDiscountPct', 0));
  const [tier2PtDiscountPct, setTier2PtDiscountPct] = useState(() => loadSavedValue('tier2PtDiscountPct', 2.0));
  const [tier2TradSavingsPct, setTier2TradSavingsPct] = useState(() => loadSavedValue('tier2TradSavingsPct', 10));
  const [tier2PtSavingsPct, setTier2PtSavingsPct] = useState(() => loadSavedValue('tier2PtSavingsPct', 12));
  const [tier2TradPaymentTerms, setTier2TradPaymentTerms] = useState(() => loadSavedValue('tier2TradPaymentTerms', 45));
  const [tier2PtPaymentTerms, setTier2PtPaymentTerms] = useState(() => loadSavedValue('tier2PtPaymentTerms', 90));
  
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
  const [tier3TradPaymentTerms, setTier3TradPaymentTerms] = useState(() => loadSavedValue('tier3TradPaymentTerms', 45));
  const [tier3PtPaymentTerms, setTier3PtPaymentTerms] = useState(() => loadSavedValue('tier3PtPaymentTerms', 90));
  
  // AP Process & Payment Timing
  const [delayDomestic, setDelayDomestic] = useState(() => loadSavedValue('delayDomestic', 4));
  const [delayCrossBorder, setDelayCrossBorder] = useState(() => loadSavedValue('delayCrossBorder', 21));
  const [processingTime, setProcessingTime] = useState(() => loadSavedValue('processingTime', 6));
  const [crossBorderSharePct, setCrossBorderSharePct] = useState(() => loadSavedValue('crossBorderSharePct', 40));
  const [tradDaysAfterApproval, setTradDaysAfterApproval] = useState(() => loadSavedValue('tradDaysAfterApproval', 3));
  const [ptDaysAfterHandover, setPtDaysAfterHandover] = useState(() => loadSavedValue('ptDaysAfterHandover', 3));
  
  // Financing
  const [scfRatePct, setScfRatePct] = useState(() => loadSavedValue('scfRatePct', 7));
  const [cardFreeFundingDays, setCardFreeFundingDays] = useState(() => loadSavedValue('cardFreeFundingDays', 20));
  
  // NEW: Baseline payment term
  const [baselinePaymentTerm, setBaselinePaymentTerm] = useState(() => loadSavedValue('baselinePaymentTerm', 45));

  // Simulation inputs
  const [turnover, setTurnover] = useState(() => loadSavedValue('turnover', 750000000));
  const [costOfSales, setCostOfSales] = useState(() => loadSavedValue('costOfSales', 500000000));
  const [operatingProfit, setOperatingProfit] = useState(() => loadSavedValue('operatingProfit', 50000000));
  const [profitBeforeTax, setProfitBeforeTax] = useState(() => loadSavedValue('profitBeforeTax', 10000000));
  const [netInterest, setNetInterest] = useState(() => loadSavedValue('netInterest', 40000000));
  const [ebitda, setEbitda] = useState(() => loadSavedValue('ebitda', 90000000));
  const [tradePayables, setTradePayables] = useState(() => loadSavedValue('tradePayables', 82000000));
  const [netDebt, setNetDebt] = useState(() => loadSavedValue('netDebt', 400000000));
  const [equity, setEquity] = useState(() => loadSavedValue('equity', 160000000));
  const [freeCashFlow, setFreeCashFlow] = useState(() => loadSavedValue('freeCashFlow', 22000000));

  // Save all values to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const allValues = {
        currencySymbol, totalProcurementSpend, totalSuppliers,
        tier1Suppliers, tier1SpendPct, tier1TradPartPct, tier1PtPartPct, tier1TradDiscountPct, tier1PtDiscountPct, tier1TradSavingsPct, tier1PtSavingsPct, tier1TradPaymentTerms, tier1PtPaymentTerms,
        tier2Suppliers, tier2SpendPct, tier2TradPartPct, tier2PtPartPct, tier2TradDiscountPct, tier2PtDiscountPct, tier2TradSavingsPct, tier2PtSavingsPct, tier2TradPaymentTerms, tier2PtPaymentTerms,
        tier3TradPartPct, tier3PtPartPct, tier3TradDiscountPct, tier3PtDiscountPct, tier3TradSavingsPct, tier3PtSavingsPct, tier3CardUsagePct, tier3CardCostPct, tier3CardRebatePct, tier3CardRemainPct, tier3TradPaymentTerms, tier3PtPaymentTerms,
        delayDomestic, delayCrossBorder, processingTime, crossBorderSharePct, tradDaysAfterApproval, ptDaysAfterHandover,
        scfRatePct, cardFreeFundingDays, baselinePaymentTerm,
        turnover, costOfSales, operatingProfit, profitBeforeTax, netInterest, ebitda, tradePayables, netDebt, equity, freeCashFlow
      };
      localStorage.setItem('scfComparison', JSON.stringify(allValues));
      
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [currencySymbol, totalProcurementSpend, totalSuppliers,
      tier1Suppliers, tier1SpendPct, tier1TradPartPct, tier1PtPartPct, tier1TradDiscountPct, tier1PtDiscountPct, tier1TradSavingsPct, tier1PtSavingsPct, tier1TradPaymentTerms, tier1PtPaymentTerms,
      tier2Suppliers, tier2SpendPct, tier2TradPartPct, tier2PtPartPct, tier2TradDiscountPct, tier2PtDiscountPct, tier2TradSavingsPct, tier2PtSavingsPct, tier2TradPaymentTerms, tier2PtPaymentTerms,
      tier3TradPartPct, tier3PtPartPct, tier3TradDiscountPct, tier3PtDiscountPct, tier3TradSavingsPct, tier3PtSavingsPct, tier3CardUsagePct, tier3CardCostPct, tier3CardRebatePct, tier3CardRemainPct, tier3TradPaymentTerms, tier3PtPaymentTerms,
      delayDomestic, delayCrossBorder, processingTime, crossBorderSharePct, tradDaysAfterApproval, ptDaysAfterHandover,
      scfRatePct, cardFreeFundingDays, baselinePaymentTerm,
      turnover, costOfSales, operatingProfit, profitBeforeTax, netInterest, ebitda, tradePayables, netDebt, equity, freeCashFlow]);

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
      setTier1TradPaymentTerms(90);
      setTier1PtPaymentTerms(90);
      setTier2Suppliers(1000);
      setTier2SpendPct(25);
      setTier2TradPartPct(0);
      setTier2PtPartPct(70);
      setTier2TradDiscountPct(0);
      setTier2PtDiscountPct(2.0);
      setTier2TradSavingsPct(10);
      setTier2PtSavingsPct(12);
      setTier2TradPaymentTerms(45);
      setTier2PtPaymentTerms(90);
      setTier3TradPartPct(0);
      setTier3PtPartPct(80);
      setTier3TradDiscountPct(0);
      setTier3PtDiscountPct(3.0);
      setTier3TradSavingsPct(14);
      setTier3PtSavingsPct(18);
      setTier3CardUsagePct(60);
      setTier3CardCostPct(3.5);
      setTier3CardRebatePct(1.0);
      setTier3CardRemainPct(25);
      setTier3TradPaymentTerms(45);
      setTier3PtPaymentTerms(90);
      setDelayDomestic(4);
      setDelayCrossBorder(21);
      setProcessingTime(6);
      setCrossBorderSharePct(40);
      setTradDaysAfterApproval(3);
      setPtDaysAfterHandover(3);
      setScfRatePct(7);
      setCardFreeFundingDays(20);
      setBaselinePaymentTerm(45);
      setTurnover(750000000);
      setCostOfSales(500000000);
      setOperatingProfit(50000000);
      setProfitBeforeTax(10000000);
      setNetInterest(40000000);
      setEbitda(90000000);
      setTradePayables(82000000);
      setNetDebt(400000000);
      setEquity(160000000);
      setFreeCashFlow(22000000);
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
  
  // Tier-specific days advanced based on tier-specific payment terms
  const tradDaysAdvancedTier1 = Math.max(0, tier1TradPaymentTerms - tradSupplierCashReceipt);
  const tradDaysAdvancedTier2 = Math.max(0, tier2TradPaymentTerms - tradSupplierCashReceipt);
  const tradDaysAdvancedTier3 = Math.max(0, tier3TradPaymentTerms - tradSupplierCashReceipt);
  
  // Financing costs by tier (Traditional)
  const tradFinancingTier1 = tradParticipatingTier1 * (scfRatePct / 100) * (tradDaysAdvancedTier1 / 365);
  const tradFinancingTier2 = tradParticipatingTier2 * (scfRatePct / 100) * (tradDaysAdvancedTier2 / 365);
  const tradFinancingTier3 = tradParticipatingTier3 * (scfRatePct / 100) * (tradDaysAdvancedTier3 / 365);
  const tradTotalFinancing = tradFinancingTier1 + tradFinancingTier2 + tradFinancingTier3;
  
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
  const tradSupplierBenefitTier1 = tradParticipatingTier1 * (tier1TradSavingsPct / 100) * (tradDaysAdvancedTier1 / 365);
  const tradSupplierBenefitTier2 = tradParticipatingTier2 * (tier2TradSavingsPct / 100) * (tradDaysAdvancedTier2 / 365);
  // Tier 3 benefit uses MIN function
  const tradTier3Participating = tradParticipatingTier3;
  const tradTier3OnCards = spendTier3 * (tier3CardUsagePct / 100);
  const tradSupplierBenefitTier3 = Math.min(tradTier3Participating + tradTier3OnCards, spendTier3) * (tradDaysAdvancedTier3 / 365) * (tier3TradSavingsPct / 100);
  const tradTotalSupplierTimeValue = tradSupplierBenefitTier1 + tradSupplierBenefitTier2 + tradSupplierBenefitTier3;
  
  // Supplier net benefit (Traditional)
  const tradSupplierNetBenefit = tradTotalSupplierTimeValue - tradTotalSupplierCosts;
  
  // Buyer card benefits (Traditional)
  const tradBuyerCardRebate = (tier3CardRebatePct / 100) * (tier3CardUsagePct / 100) * spendTier3;
  const tradBuyerCardFreeFunding = (cardFreeFundingDays / 365) * (scfRatePct / 100) * (tier3CardUsagePct / 100) * spendTier3;
  
  // Trade credit and working capital calculations (Traditional)
  const tradCardSpend = spendTier3 * (tier3CardUsagePct / 100);
  const tradCardFreeFundingBalance = tradCardSpend * ((cardFreeFundingDays + avgApprovalTime) / 365);
  
  // NEW: Updated total trade credit calculation including card balance
  const tradTotalTradeCredit = (spendTier1 * tier1TradPaymentTerms + spendTier2 * tier2TradPaymentTerms + spendTier3 * tier3TradPaymentTerms) / 365 + tradCardFreeFundingBalance;
  
  // Outstanding balance (Traditional) - tier-specific calculation
  const tradOutstandingBalance = (tradParticipatingTier1 * (tier1TradPartPct / 100) * tradDaysAdvancedTier1 +
                                   tradParticipatingTier2 * (tier2TradPartPct / 100) * tradDaysAdvancedTier2 +
                                   tradParticipatingTier3 * (tier3TradPartPct / 100) * tradDaysAdvancedTier3) / 365;

  // NEW: Funding benefit enabled by SCF & cards (paid for by suppliers) - based on baseline payment term
  const tradScfFundingBenefit = ((tier1TradPaymentTerms - baselinePaymentTerm) * spendTier1 +
                                   (tier2TradPaymentTerms - baselinePaymentTerm) * spendTier2 +
                                   (tier3TradPaymentTerms - baselinePaymentTerm) * spendTier3) * (scfRatePct / 100) / 365 + 
                                   tradBuyerCardFreeFunding;
  
  // Buyer net benefit (Traditional)
  const tradBuyerNetBenefit = tradActualDiscountTier1 + tradActualDiscountTier2 + tradActualDiscountTier3 - 
                              tradTotalFinancing + tradBuyerCardRebate + tradScfFundingBenefit;
  
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
  
  // Tier-specific days advanced based on tier-specific payment terms
  const ptDaysAdvancedTier1 = Math.max(0, tier1PtPaymentTerms - ptSupplierCashReceipt);
  const ptDaysAdvancedTier2 = Math.max(0, tier2PtPaymentTerms - ptSupplierCashReceipt);
  const ptDaysAdvancedTier3 = Math.max(0, tier3PtPaymentTerms - ptSupplierCashReceipt);
  const ptDaysFaster = tradSupplierCashReceipt - ptSupplierCashReceipt;
  
  // Financing costs by tier (PrimaTrade)
  const ptFinancingTier1 = ptParticipatingTier1 * (scfRatePct / 100) * (ptDaysAdvancedTier1 / 365);
  const ptFinancingTier2 = ptParticipatingTier2 * (scfRatePct / 100) * (ptDaysAdvancedTier2 / 365);
  const ptFinancingTier3 = ptParticipatingTier3 * (scfRatePct / 100) * (ptDaysAdvancedTier3 / 365) * (1 - (tier3CardUsagePct / 100) * (tier3CardRemainPct / 100));
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
  const ptSupplierBenefitTier1 = ptParticipatingTier1 * (tier1PtSavingsPct / 100) * (ptDaysAdvancedTier1 / 365);
  const ptSupplierBenefitTier2 = ptParticipatingTier2 * (tier2PtSavingsPct / 100) * (ptDaysAdvancedTier2 / 365);
  const ptSupplierBenefitTier3 = (ptParticipatingTier3 * (tier3PtSavingsPct / 100) * (ptDaysAdvancedTier3 / 365) * (1 - (tier3CardUsagePct / 100) * (tier3CardRemainPct / 100))) + tradSupplierBenefitTier3;
  const ptTotalSupplierTimeValue = ptSupplierBenefitTier1 + ptSupplierBenefitTier2 + ptSupplierBenefitTier3;
  
  // Supplier net benefit (PrimaTrade)
  const ptSupplierNetBenefit = ptTotalSupplierTimeValue - ptTotalSupplierCosts;
  
  // Card benefits for buyer with PrimaTrade (cards that remain)
  const ptBuyerCardRebate = (tier3CardRebatePct / 100) * (tier3CardUsagePct / 100) * spendTier3 * (tier3CardRemainPct / 100);
  const ptBuyerCardFreeFunding = (cardFreeFundingDays / 365) * (scfRatePct / 100) * (tier3CardUsagePct / 100) * spendTier3 * (tier3CardRemainPct / 100);
  
  // Trade credit and working capital calculations (PrimaTrade)
  const ptCardSpend = spendTier3 * (tier3CardUsagePct / 100) * (tier3CardRemainPct / 100);
  const ptCardFreeFundingBalance = ptCardSpend * ((cardFreeFundingDays + avgApprovalTime) / 365);
  
  // NEW: Updated total trade credit calculation including card balance
  const ptTotalTradeCredit = (spendTier1 * tier1PtPaymentTerms + spendTier2 * tier2PtPaymentTerms + spendTier3 * tier3PtPaymentTerms) / 365 + ptCardFreeFundingBalance;
  
  // Additional working capital generated by PrimaTrade
  const additionalWorkingCapital = ptTotalTradeCredit - tradTotalTradeCredit;
  
  // Outstanding balance (PrimaTrade) - tier-specific calculation
  const ptOutstandingBalance = (ptParticipatingTier1 * (tier1PtPartPct / 100) * ptDaysAdvancedTier1 +
                                 ptParticipatingTier2 * (tier2PtPartPct / 100) * ptDaysAdvancedTier2 +
                                 ptParticipatingTier3 * (tier3PtPartPct / 100) * ptDaysAdvancedTier3 * (1 - (tier3CardUsagePct / 100) * (tier3CardRemainPct / 100))) / 365;

  // NEW: Funding benefit enabled by SCF & cards (paid for by suppliers) - based on baseline payment term
  const ptScfFundingBenefit = ((tier1PtPaymentTerms - baselinePaymentTerm) * spendTier1 +
                                 (tier2PtPaymentTerms - baselinePaymentTerm) * spendTier2 +
                                 (tier3PtPaymentTerms - baselinePaymentTerm) * spendTier3) * (scfRatePct / 100) / 365 + 
                                 ptBuyerCardFreeFunding;
  
  // Buyer net benefit (PrimaTrade)
  const ptBuyerNetBenefit = ptActualDiscountTier1 + ptActualDiscountTier2 + ptActualDiscountTier3 - ptTotalFinancing + ptBuyerCardRebate + ptScfFundingBenefit;
  
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
  const deltaBuyerBenefit = ptBuyerNetBenefit - tradBuyerNetBenefit;
  const deltaSupplierBenefit = ptSupplierNetBenefit - tradSupplierNetBenefit;
  const deltaTotalValue = ptTotalValue - tradTotalValue;

  // SIMULATION CALCULATIONS
  // Calculate delta of early payment discounts only (discounts passed through to buyer)
  const deltaEarlyPaymentDiscounts = ptDiscountsPassedThrough - tradDiscountsPassedThrough;
  
  // Calculate delta of funding benefits (card rebates, free funding, SCF funding benefit)
  const deltaFundingBenefits = deltaBuyerBenefit - deltaEarlyPaymentDiscounts;
  
  // Working capital released - use the more accurate calculation
  const totalWCBenefit = additionalWorkingCapital;
  
  // Adjusted financials with PrimaTrade
  const adjustedCostOfSales = costOfSales - deltaEarlyPaymentDiscounts;
  const adjustedOperatingProfit = operatingProfit + deltaEarlyPaymentDiscounts;
  const adjustedProfitBeforeTax = profitBeforeTax + deltaBuyerBenefit; // Both discounts and funding benefits
  const adjustedEbitda = ebitda + deltaEarlyPaymentDiscounts;
  const adjustedNetInterest = netInterest - (totalWCBenefit * (scfRatePct / 100));
  const adjustedTradePayables = tradePayables + totalWCBenefit;
  const adjustedNetDebt = netDebt - totalWCBenefit;
  const adjustedEquity = equity + deltaBuyerBenefit; // Both discounts and funding benefits
  const adjustedFCF = freeCashFlow + totalWCBenefit;
  
  // Calculate ratios
  const ebitdaMargin = (ebitda / turnover) * 100;
  const adjustedEbitdaMargin = (adjustedEbitda / turnover) * 100;
  const operatingMargin = (operatingProfit / turnover) * 100;
  const adjustedOperatingMargin = (adjustedOperatingProfit / turnover) * 100;
  const leverage = netDebt / ebitda;
  const adjustedLeverage = adjustedNetDebt / adjustedEbitda;
  const solvency = netDebt / equity;
  const adjustedSolvency = adjustedNetDebt / adjustedEquity;
  const fcfSales = (freeCashFlow / turnover) * 100;
  const adjustedFcfSales = (adjustedFCF / turnover) * 100;
  const interestCover = profitBeforeTax / netInterest;
  const adjustedInterestCover = adjustedProfitBeforeTax / adjustedNetInterest;

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
      label: 'Additional working capital',
      trad: formatCurrency(0),
      pt: formatCurrency(additionalWorkingCapital),
      tooltip: "Impact of PrimaTrade SCF (movement in trade credit and movement in card balances)"
    },
    {
      label: 'Suppliers eligible',
      trad: formatNumber(tier1Suppliers, 0),
      pt: formatNumber(totalSuppliers, 0),
      tooltip: "The number of suppliers involved is higher"
    },
    {
      label: 'Active suppliers',
      trad: formatNumber(tradTotalActive, 0),
      pt: formatNumber(ptTotalActive, 0),
      tooltip: "Smaller suppliers will more actively use the SCF program"
    },
    {
      label: 'Total economic value',
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
          .print-comparison-panel,
          .print-simulation-panel {
            display: block !important;
          }
          
          /* Start comparison panel on new page */
          .print-comparison-panel {
            page-break-before: always !important;
          }
          
          /* Start simulation panel on new page */
          .print-simulation-panel {
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
          
          /* Hide navigation tabs on print */
          .print\\:hidden {
            display: none !important;
          }

          /* Ensure proper sizing for printing */
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }

        /* Slider styling */
        .slider {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 3px;
          outline: none;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #D64933;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #D64933;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 print:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#D64933] rounded-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">PrimaTrade vs Traditional SCF</h1>
                  <p className="text-sm text-gray-500">Supply Chain Finance Comparison Calculator</p>
                </div>
              </div>
              <div className="flex gap-2">
                {showSaved && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Saved</span>
                  </div>
                )}
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Reset to Defaults
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-[#D64933] text-white rounded-lg hover:bg-[#C03823] transition-colors text-sm font-medium"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200 print:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveView('inputs')}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeView === 'inputs'
                    ? 'border-[#D64933] text-[#D64933]'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  Inputs
                </div>
              </button>
              <button
                onClick={() => setActiveView('comparison')}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeView === 'comparison'
                    ? 'border-[#D64933] text-[#D64933]'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Comparison
                </div>
              </button>
              <button
                onClick={() => setActiveView('simulation')}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeView === 'simulation'
                    ? 'border-[#D64933] text-[#D64933]'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Impact Simulation
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* INPUTS PANEL */}
          <div className={`print-inputs-panel ${activeView === 'inputs' || isPrinting ? 'block' : 'hidden'}`}>
            <div className="space-y-6">
              {/* Company Profile */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#D64933]" />
                  Company Profile
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Currency</label>
                    <select
                      value={currencySymbol}
                      onChange={(e) => setCurrencySymbol(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#D64933] font-semibold"
                    >
                      <option value="$">$ USD</option>
                      <option value="£">£ GBP</option>
                      <option value="€">€ EUR</option>
                    </select>
                  </div>
                  {renderInput(
                    'Total Procurement Spend',
                    totalProcurementSpend,
                    setTotalProcurementSpend,
                    1,
                    10000,
                    1,
                    'M',
                    false,
                    false,
                    'w-full',
                    { tooltip: "All procurement expenditure of all kinds" }
                  )}
                  {renderInput(
                    'Total Number of Suppliers',
                    totalSuppliers,
                    setTotalSuppliers,
                    100,
                    50000,
                    100,
                    '',
                    false,
                    false,
                    'w-full',
                    { tooltip: "All suppliers across goods + services" }
                  )}
                </div>
              </div>

              {/* Tier 1: Existing SCF Suppliers */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Tier 1: Existing SCF Suppliers (Larger)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderInput(
                    'Number of Suppliers',
                    tier1Suppliers,
                    setTier1Suppliers,
                    0,
                    1000,
                    5,
                    '',
                    false,
                    false,
                    'w-full',
                    { tooltip: "Current number of suppliers in SCF (typically larger)" }
                  )}
                  {renderInput(
                    'Share of Total Spend',
                    tier1SpendPct,
                    setTier1SpendPct,
                    0,
                    100,
                    1,
                    '',
                    true,
                    tier1Suppliers === 0,
                    'w-full',
                    { tooltip: "Approximate spend concentration for the suppliers in SCF" }
                  )}
                  {renderInput(
                    'Participation % (Traditional)',
                    tier1TradPartPct,
                    setTier1TradPartPct,
                    0,
                    100,
                    1,
                    '',
                    true,
                    false,
                    'w-full',
                    { tooltip: "Participation rate among suppliers currently in SCF" }
                  )}
                  {renderInput(
                    'Participation % (PrimaTrade)',
                    tier1PtPartPct,
                    setTier1PtPartPct,
                    0,
                    100,
                    1,
                    '',
                    true,
                    false,
                    'w-full',
                    { tooltip: "Participation rate among suppliers currently in SCF" }
                  )}
                  {renderInput(
                    'Early Payment Discount % (Traditional)',
                    tier1TradDiscountPct,
                    setTier1TradDiscountPct,
                    0,
                    10,
                    0.1,
                    '',
                    true,
                    false,
                    'w-full',
                    { tooltip: "Discount as % of invoice value" }
                  )}
                  {renderInput(
                    'Early Payment Discount % (PrimaTrade)',
                    tier1PtDiscountPct,
                    setTier1PtDiscountPct,
                    0,
                    10,
                    0.1,
                    '',
                    true,
                    false,
                    'w-full',
                    { tooltip: "Discount as % of invoice value" }
                  )}
                  {renderInput(
                    'Supplier Savings Rate % (Traditional)',
                    tier1TradSavingsPct,
                    setTier1TradSavingsPct,
                    0,
                    30,
                    0.5,
                    '',
                    true,
                    false,
                    'w-full',
                    { tooltip: "Rate used to value supplier benefit of being paid earlier (after delivery)" }
                  )}
                  {renderInput(
                    'Supplier Savings Rate % (PrimaTrade)',
                    tier1PtSavingsPct,
                    setTier1PtSavingsPct,
                    0,
                    30,
                    0.5,
                    '',
                    true,
                    false,
                    'w-full',
                    { tooltip: "Rate used to value supplier benefit of being paid earlier (after handover)" }
                  )}
                  {renderInput(
                    'Payment Terms (Traditional)',
                    tier1TradPaymentTerms,
                    setTier1TradPaymentTerms,
                    0,
                    180,
                    1,
                    'days',
                    false,
                    false,
                    'w-full',
                    { tooltip: "Contractual supplier payment terms" }
                  )}
                  {renderInput(
                    'Payment Terms (PrimaTrade)',
                    tier1PtPaymentTerms,
                    setTier1PtPaymentTerms,
                    0,
                    180,
                    1,
                    'days',
                    false,
                    false,
                    'w-full',
                    { tooltip: "Contractual supplier payment terms (potentially lengthened once early payment available)" }
                  )}
                </div>
              </div>

              {/* Tier 2: Next Level Suppliers */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Tier 2: Next Level Suppliers (50-1000)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderInput(
                    'Number of Suppliers',
                    tier2Suppliers,
                    setTier2Suppliers,
                    tier1Suppliers,
                    5000,
                    10,
                    '',
                    false,
                    false,
                    'w-full',
                    { tooltip: "The number of regular suppliers that would benefit from SCF" }
                  )}
                  {renderInput(
                    'Share of Total Spend',
                    tier2SpendPct,
                    setTier2SpendPct,
                    0,
                    100 - tier1SpendPct,
                    1,
                    '',
                    true,
                    false,
                    'w-full',
                    { tooltip: "Additional share of spend that should be in SCF" }
                  )}
                  {renderInput(
                    'Participation % (Traditional)',
                    tier2TradPartPct,
                    setTier2TradPartPct,
                    0,
                    100,
                    1,
                    '',
                    true,
                    false,
                    'w-full',
                    { tooltip: "Participation rate for the next layer of suppliers if offered SCF" }
                  )}
                  {renderInput(
                    'Participation % (PrimaTrade)',
                    tier2PtPartPct,
                    setTier2PtPartPct,
                    0,
                    100,
                    1,
                    '',
                    true,
                    false,
                    'w-full',
                    { tooltip: "Participation rate for the next layer of suppliers if offered SCF" }
                  )}
                  {renderInput(
                    'Early Payment Discount % (Traditional)',
                    tier2TradDiscountPct,
                    setTier2TradDiscountPct,
                    0,
                    10,
                    0.1,
                    '',
                    true,
                    false,
                    'w-full',
                    { tooltip: "Discount as % of invoice value" }
                  )}
                  {renderInput(
                    'Early Payment Discount % (PrimaTrade)',
                    tier2PtDiscountPct,
                    setTier2PtDiscountPct,
                    0,
                    10,
                    0.1,
                    '',
                    true,
                    false,
                    'w-full',
                    { tooltip: "Discount as % of invoice value" }
                  )}
                  {renderInput(
                    'Supplier Savings Rate % (Traditional)',
                    tier2TradSavingsPct,
                    setTier2TradSavingsPct,
                    0,
                    30,
                    0.5,
                    '',
                    true,
                    false,
                    'w-full',
                    { tooltip: "Rate used to value supplier benefit of being paid earlier (after delivery)" }
                  )}
                  {renderInput(
                    'Supplier Savings Rate % (PrimaTrade)',
                    tier2PtSavingsPct,
                    setTier2PtSavingsPct,
                    0,
                    30,
                    0.5,
                    '',
                    true,
                    false,
                    'w-full',
                    { tooltip: "Rate used to value supplier benefit of being paid earlier (after handover)" }
                  )}
                  {renderInput(
                    'Payment Terms (Traditional)',
                    tier2TradPaymentTerms,
                    setTier2TradPaymentTerms,
                    0,
                    180,
                    1,
                    'days',
                    false,
                    false,
                    'w-full',
                    { tooltip: "Contractual supplier payment terms" }
                  )}
                  {renderInput(
                    'Payment Terms (PrimaTrade)',
                    tier2PtPaymentTerms,
                    setTier2PtPaymentTerms,
                    0,
                    180,
                    1,
                    'days',
                    false,
                    false,
                    'w-full',
                    { tooltip: "Contractual supplier payment terms (potentially lengthened once early payment available)" }
                  )}
                </div>
              </div>

              {/* Tier 3: Long Tail Suppliers */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Tier 3: Long Tail Suppliers (SMEs)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Number of Suppliers</label>
                    <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 font-semibold text-right">
                      {formatNumber(tier3Suppliers, 0)}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Share of Total Spend</label>
                    <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 font-semibold text-right">
                      {tier3SpendPct.toFixed(0)}%
                    </div>
                  </div>
                  {renderInput(
                    'Participation % (Traditional)',
                    tier3TradPartPct,
                    setTier3TradPartPct,
                    0,
                    100,
                    1,
                    '',
                    true,
                    false,
                    'w-full',
                    { tooltip: "Participation rate among the long tail / SMEs" }
                  )}
                  {renderInput(
                    'Participation % (PrimaTrade)',
                    tier3PtPartPct,
                    setTier3PtPartPct,
                    0,
                    100,
                    1,
                    '',
                    true,
                    false,
                    'w-full',
                    { tooltip: "Participation rate among the long tail / SMEs" }
                  )}
                  {renderInput(
                    'Early Payment Discount % (Traditional)',
                    tier3TradDiscountPct,
                    setTier3TradDiscountPct,
                    0,
                    10,
                    0.1,
                    '',
                    true,
                    false,
                    'w-full',
                    { tooltip: "Discount as % of invoice value" }
                  )}
                  {renderInput(
                    'Early Payment Discount % (PrimaTrade)',
                    tier3PtDiscountPct,
                    setTier3PtDiscountPct,
                    0,
                    10,
                    0.1,
                    '',
                    true,
                    false,
                    'w-full',
                    { tooltip: "Discount as % of invoice value" }
                  )}
                  {renderInput(
                    'Supplier Savings Rate % (Traditional)',
                    tier3TradSavingsPct,
                    setTier3TradSavingsPct,
                    0,
                    30,
                    0.5,
                    '',
                    true,
                    false,
                    'w-full',
                    { tooltip: "Rate used to value supplier benefit of being paid earlier (after delivery)" }
                  )}
                  {renderInput(
                    'Supplier Savings Rate % (PrimaTrade)',
                    tier3PtSavingsPct,
                    setTier3PtSavingsPct,
                    0,
                    30,
                    0.5,
                    '',
                    true,
                    false,
                    'w-full',
                    { tooltip: "Rate used to value supplier benefit of being paid earlier (after handover)" }
                  )}
                  {renderInput(
                    'Payment Card Usage %',
                    tier3CardUsagePct,
                    setTier3CardUsagePct,
                    0,
                    100,
                    1,
                    '',
                    true,
                    false,
                    'w-full',
                    { tooltip: "Share of long-tail spend currently paid via cards (typical)" }
                  )}
                  {renderInput(
                    '% Remaining on Cards (PrimaTrade)',
                    tier3CardRemainPct,
                    setTier3CardRemainPct,
                    0,
                    100,
                    1,
                    '',
                    true,
                    false,
                    'w-full',
                    { tooltip: "% of suppliers currently paid by card that remain being paid by card and not switched to SCF" }
                  )}
                  {renderInput(
                    'Card Program Cost Rate %',
                    tier3CardCostPct,
                    setTier3CardCostPct,
                    0,
                    10,
                    0.1,
                    '',
                    true,
                    false,
                    'w-full',
                    { tooltip: "All-in cost to supplier (set as needed)" }
                  )}
                  {renderInput(
                    'Card Program Rebate %',
                    tier3CardRebatePct,
                    setTier3CardRebatePct,
                    0,
                    5,
                    0.1,
                    '',
                    true,
                    false,
                    'w-full',
                    { tooltip: "Buyer rebate that the card issuer provides" }
                  )}
                  {renderInput(
                    'Payment Terms (Traditional)',
                    tier3TradPaymentTerms,
                    setTier3TradPaymentTerms,
                    0,
                    180,
                    1,
                    'days',
                    false,
                    false,
                    'w-full',
                    { tooltip: "Contractual supplier payment terms" }
                  )}
                  {renderInput(
                    'Payment Terms (PrimaTrade)',
                    tier3PtPaymentTerms,
                    setTier3PtPaymentTerms,
                    0,
                    180,
                    1,
                    'days',
                    false,
                    false,
                    'w-full',
                    { tooltip: "Contractual supplier payment terms (potentially lengthened once early payment available)" }
                  )}
                </div>
              </div>

              {/* AP Process & Payment Timing */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#D64933]" />
                  AP Process & Payment Timing
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderInput(
                    'Delay: Domestic & Services',
                    delayDomestic,
                    setDelayDomestic,
                    0,
                    30,
                    1,
                    'days',
                    false,
                    false,
                    'w-full',
                    { tooltip: "Days between despatch and confirmed delivery (so that approval can start)" }
                  )}
                  {renderInput(
                    'Delay: Cross-border',
                    delayCrossBorder,
                    setDelayCrossBorder,
                    0,
                    90,
                    1,
                    'days',
                    false,
                    false,
                    'w-full',
                    { tooltip: "More days when goods have to travel further (eg: from Asia)" }
                  )}
                  {renderInput(
                    'Processing Time (Delivery to Approval)',
                    processingTime,
                    setProcessingTime,
                    0,
                    30,
                    1,
                    'days',
                    false,
                    false,
                    'w-full',
                    { tooltip: "How long it takes for invoices to be approved once delivery has happened" }
                  )}
                  {renderInput(
                    'Cross-border Share of Spend',
                    crossBorderSharePct,
                    setCrossBorderSharePct,
                    0,
                    100,
                    1,
                    '',
                    true,
                    false,
                    'w-full',
                    { tooltip: "How much of the spend is cross-border with longer shipping times" }
                  )}
                  {renderInput(
                    'Days After Approval (Traditional)',
                    tradDaysAfterApproval,
                    setTradDaysAfterApproval,
                    0,
                    10,
                    1,
                    'days',
                    false,
                    false,
                    'w-full',
                    { tooltip: "Traditional SCF and cards: supplier receives funds after approval" }
                  )}
                  {renderInput(
                    'Days After Handover (PrimaTrade)',
                    ptDaysAfterHandover,
                    setPtDaysAfterHandover,
                    0,
                    10,
                    1,
                    'days',
                    false,
                    false,
                    'w-full',
                    { tooltip: "PrimaTrade: supplier receives funds after handover" }
                  )}
                </div>
              </div>

              {/* Financing */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[#D64933]" />
                  Financing Parameters
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderInput(
                    'SCF Funding Rate',
                    scfRatePct,
                    setScfRatePct,
                    0,
                    20,
                    0.1,
                    '',
                    true,
                    false,
                    'w-full',
                    { tooltip: "Approximate annual financing rate charged by SCF funders" }
                  )}
                  {renderInput(
                    'Card Free Funding Period',
                    cardFreeFundingDays,
                    setCardFreeFundingDays,
                    0,
                    60,
                    1,
                    'days',
                    false,
                    false,
                    'w-full',
                    { tooltip: "Credit period that the buyer enjoys with the card program" }
                  )}
                  {renderInput(
                    'Baseline Payment Term',
                    baselinePaymentTerm,
                    setBaselinePaymentTerm,
                    0,
                    90,
                    1,
                    'days',
                    false,
                    false,
                    'w-full',
                    { tooltip: "Anchor payment term used to calculate the impact of SCF on trade credit (benefit to buyer)" }
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* COMPARISON PANEL */}
          <div className={`print-comparison-panel ${activeView === 'comparison' || isPrinting ? 'block' : 'hidden'}`}>
            <div className="space-y-6">
              {/* Highlights */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#D64933]" />
                  Key Highlights
                </h2>
                <div className="grid grid-cols-5 gap-2">
                  {highlightStats.map((stat, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="text-xs font-medium text-gray-600 mb-2 flex items-center gap-1">
                        {stat.label}
                        <Tooltip text={stat.tooltip}>
                          <></>
                        </Tooltip>
                      </div>
                      <div className="space-y-1.5">
                        <div className="text-sm font-semibold text-gray-700">
                          {stat.trad}
                        </div>
                        <div className="text-sm font-semibold text-[#D64933]">
                          {stat.pt}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Program Details */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Program Details</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">Metric</th>
                        <th className="text-right py-2 px-3 text-sm font-semibold text-gray-700">Traditional SCF</th>
                        <th className="text-right py-2 px-3 text-sm font-semibold text-[#D64933]">PrimaTrade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <TableRow 
                        label="Eligible spend" 
                        tradValue={tradEligibleSpend} 
                        ptValue={ptEligibleSpend}
                        note="Total spend that could be included in the SCF program"
                        currencySymbol={currencySymbol}
                      />
                      <TableRow 
                        label="Participating spend" 
                        tradValue={tradParticipatingSpend} 
                        ptValue={ptParticipatingSpend}
                        note="Spend from suppliers actively using the SCF program"
                        currencySymbol={currencySymbol}
                      />
                      <TableRow 
                        label="Outstanding balance of SCF program" 
                        tradValue={tradOutstandingBalance} 
                        ptValue={ptOutstandingBalance}
                        note="The funding programme is bigger with more suppliers and with longer funding periods"
                        currencySymbol={currencySymbol}
                      />
                      <TableRow 
                        label="Eligible suppliers" 
                        tradValue={tier1Suppliers} 
                        ptValue={totalSuppliers}
                        note="PrimaTrade can include the full supplier base as a result of automation and PO matching"
                        currencySymbol={currencySymbol}
                      />
                      <TableRow 
                        label="Active suppliers using SCF" 
                        tradValue={tradTotalActive} 
                        ptValue={ptTotalActive}
                        note="Smaller suppliers will more actively use the SCF program"
                        currencySymbol={currencySymbol}
                      />
                      <TableRow 
                        label="Suppliers switching from cards" 
                        tradValue={0} 
                        ptValue={ptSuppliersFromCards}
                        note="Suppliers moving from cards to SCF for better economics"
                        currencySymbol={currencySymbol}
                      />
                      <TableRow 
                        label="Suppliers on cards" 
                        tradValue={tradSuppliersOnCards} 
                        ptValue={ptSuppliersOnCards}
                        note="Suppliers who are paid by payment card rather than by SCF or regular bank payment"
                        currencySymbol={currencySymbol}
                      />
                      <TableRow 
                        label="Supplier cash receipt from handover" 
                        tradValue={`${tradSupplierCashReceipt.toFixed(1)} days`} 
                        ptValue={`${ptSupplierCashReceipt.toFixed(1)} days`}
                        note="Average time taken from handover to payment"
                        currencySymbol={currencySymbol}
                      />
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Economic Value */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Economic Value Created</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">Metric</th>
                        <th className="text-right py-2 px-3 text-sm font-semibold text-gray-700">Traditional SCF</th>
                        <th className="text-right py-2 px-3 text-sm font-semibold text-[#D64933]">PrimaTrade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <TableRow 
                        label="Supplier time value of early payment" 
                        tradValue={tradSupplierTimeValue} 
                        ptValue={ptSupplierTimeValue}
                        note="Time value to suppliers of receiving cash earlier"
                        currencySymbol={currencySymbol}
                      />
                      <TableRow 
                        label="Supplier costs (discounts + card fees)" 
                        tradValue={tradTotalCosts} 
                        ptValue={ptTotalCosts}
                        note="Early payment discounts and card charges paid by suppliers"
                        currencySymbol={currencySymbol}
                      />
                      <TableRow 
                        label="Supplier net benefit" 
                        tradValue={tradSupplierNetBenefit} 
                        ptValue={ptSupplierNetBenefit}
                        note="Net benefit to suppliers (time value less costs)"
                        currencySymbol={currencySymbol}
                      />
                      <TableRow 
                        label="Buyer net benefit" 
                        tradValue={tradBuyerNetBenefit} 
                        ptValue={ptBuyerNetBenefit}
                        note="Buyer benefit from discounts, rebates, and additional working capital"
                        currencySymbol={currencySymbol}
                      />
                      <TableRow 
                        label="Total value created" 
                        tradValue={tradTotalValue} 
                        ptValue={ptTotalValue}
                        note="Combined benefit to buyer and suppliers"
                        currencySymbol={currencySymbol}
                      />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* SIMULATION PANEL */}
          <div className={`print-simulation-panel ${activeView === 'simulation' || isPrinting ? 'block' : 'hidden'}`}>
            <div className="space-y-6">
              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-blue-900 mb-1">How to use this simulation</h3>
                    <p className="text-sm text-blue-800">
                      Enter your current financial metrics below. The calculator will show how PrimaTrade SCF would impact your P&L, balance sheet, and key financial ratios.
                    </p>
                  </div>
                </div>
              </div>

              {/* Input Financials */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Financials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* P&L Section */}
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Profit & Loss</h3>
                    <div className="space-y-3">
                      {renderInput(
                        'Turnover / Revenue',
                        turnover,
                        setTurnover,
                        0,
                        10000000000,
                        1000000,
                        '',
                        false,
                        false,
                        'w-full',
                        { 
                          formatDisplay: (val) => (val / 1000000).toFixed(0),
                          parseInput: (val) => parseFloat(val) * 1000000,
                          labelClassName: 'text-xs'
                        }
                      )}
                      {renderInput(
                        'Cost of Sales',
                        costOfSales,
                        setCostOfSales,
                        0,
                        10000000000,
                        1000000,
                        '',
                        false,
                        false,
                        'w-full',
                        { 
                          formatDisplay: (val) => (val / 1000000).toFixed(0),
                          parseInput: (val) => parseFloat(val) * 1000000,
                          tooltip: "Will be reduced by supplier discounts which lower cost of goods",
                          labelClassName: 'text-xs'
                        }
                      )}
                      {renderInput(
                        'Operating Profit',
                        operatingProfit,
                        setOperatingProfit,
                        -10000000000,
                        10000000000,
                        1000000,
                        '',
                        false,
                        false,
                        'w-full',
                        { 
                          formatDisplay: (val) => (val / 1000000).toFixed(0),
                          parseInput: (val) => parseFloat(val) * 1000000,
                          tooltip: "Lower cost of goods flows through to higher operating profits",
                          labelClassName: 'text-xs'
                        }
                      )}
                      {renderInput(
                        'Net Interest Payable',
                        netInterest,
                        setNetInterest,
                        0,
                        10000000000,
                        1000000,
                        '',
                        false,
                        false,
                        'w-full',
                        { 
                          formatDisplay: (val) => (val / 1000000).toFixed(0),
                          parseInput: (val) => parseFloat(val) * 1000000,
                          tooltip: "Lower because of working capital generated",
                          labelClassName: 'text-xs'
                        }
                      )}
                      {renderInput(
                        'Profit before Tax',
                        profitBeforeTax,
                        setProfitBeforeTax,
                        -10000000000,
                        10000000000,
                        1000000,
                        '',
                        false,
                        false,
                        'w-full',
                        { 
                          formatDisplay: (val) => (val / 1000000).toFixed(0),
                          parseInput: (val) => parseFloat(val) * 1000000,
                          tooltip: "Higher because both financial and operating benefits flow through",
                          labelClassName: 'text-xs'
                        }
                      )}
                      {renderInput(
                        'EBITDA',
                        ebitda,
                        setEbitda,
                        0,
                        10000000000,
                        1000000,
                        '',
                        false,
                        false,
                        'w-full',
                        { 
                          formatDisplay: (val) => (val / 1000000).toFixed(0),
                          parseInput: (val) => parseFloat(val) * 1000000,
                          tooltip: "Supplier discounts flow through to EBITDA but not financial benefits",
                          labelClassName: 'text-xs'
                        }
                      )}
                    </div>
                  </div>

                  {/* Balance Sheet Section */}
                  <div className="bg-sky-50 p-4 rounded-lg border border-sky-100">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Balance Sheet & Cash Flow</h3>
                    <div className="space-y-3">
                      {renderInput(
                        'Trade Payables',
                        tradePayables,
                        setTradePayables,
                        0,
                        10000000000,
                        1000000,
                        '',
                        false,
                        false,
                        'w-full',
                        { 
                          formatDisplay: (val) => (val / 1000000).toFixed(0),
                          parseInput: (val) => parseFloat(val) * 1000000,
                          tooltip: "Increased as suppliers provide more credit, adjusted for changes in the card programme",
                          labelClassName: 'text-xs'
                        }
                      )}
                      {renderInput(
                        'Net Debt',
                        netDebt,
                        setNetDebt,
                        -10000000000,
                        10000000000,
                        1000000,
                        '',
                        false,
                        false,
                        'w-full',
                        { 
                          formatDisplay: (val) => (val / 1000000).toFixed(0),
                          parseInput: (val) => parseFloat(val) * 1000000,
                          tooltip: "Reduced by the trade credit provided by suppliers",
                          labelClassName: 'text-xs'
                        }
                      )}
                      {renderInput(
                        'Equity',
                        equity,
                        setEquity,
                        0,
                        10000000000,
                        1000000,
                        '',
                        false,
                        false,
                        'w-full',
                        { 
                          formatDisplay: (val) => (val / 1000000).toFixed(0),
                          parseInput: (val) => parseFloat(val) * 1000000,
                          tooltip: "Higher because both financial and operating benefits flow through",
                          labelClassName: 'text-xs'
                        }
                      )}
                      {renderInput(
                        'Free Cash Flow',
                        freeCashFlow,
                        setFreeCashFlow,
                        -10000000000,
                        10000000000,
                        1000000,
                        '',
                        false,
                        false,
                        'w-full',
                        { 
                          formatDisplay: (val) => (val / 1000000).toFixed(0),
                          parseInput: (val) => parseFloat(val) * 1000000,
                          tooltip: "Increased as a result of the increase in trade credit",
                          labelClassName: 'text-xs'
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Impact Summary */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Impact on Financials</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">Metric</th>
                        <th className="text-right py-2 px-3 text-sm font-semibold text-gray-700">Existing</th>
                        <th className="text-right py-2 px-3 text-sm font-semibold text-[#D64933]">With PrimaTrade</th>
                        <th className="text-right py-2 px-3 text-sm font-semibold text-blue-600">Change</th>
                        <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-1.5 px-3 text-sm">
                          <Tooltip text="Working capital provided via the supply chain (total trade credit provided by suppliers & cards)">
                            <span>Total amount of trade credit</span>
                          </Tooltip>
                        </td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium">{formatCurrency(tradTotalTradeCredit)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-[#D64933]">{formatCurrency(ptTotalTradeCredit)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-blue-600">{formatCurrency(ptTotalTradeCredit - tradTotalTradeCredit)}</td>
                        <td className="py-1.5 px-3 text-xs text-gray-600">Working capital provided via the supply chain (total trade credit provided by suppliers & cards)</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 text-sm">Turnover / Revenue</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium">{formatCurrency(turnover)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-[#D64933]">{formatCurrency(turnover)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-blue-600">{formatCurrency(0)}</td>
                        <td className="py-1.5 px-3 text-xs text-gray-600">Unchanged</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 text-sm">
                          <Tooltip text="Reduced by supplier discounts which lower cost of goods">
                            <span>Cost of Sales</span>
                          </Tooltip>
                        </td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium">{formatCurrency(costOfSales)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-[#D64933]">{formatCurrency(adjustedCostOfSales)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-blue-600">{formatCurrency(adjustedCostOfSales - costOfSales)}</td>
                        <td className="py-1.5 px-3 text-xs text-gray-600">Reduced by supplier discounts which lower cost of goods</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 text-sm">
                          <Tooltip text="Lower cost of goods flows through to higher operating profits">
                            <span>Operating Profit</span>
                          </Tooltip>
                        </td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium">{formatCurrency(operatingProfit)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-[#D64933]">{formatCurrency(adjustedOperatingProfit)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-blue-600">{formatCurrency(adjustedOperatingProfit - operatingProfit)}</td>
                        <td className="py-1.5 px-3 text-xs text-gray-600">Lower cost of goods flows through to higher operating profits</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 text-sm">
                          <Tooltip text="Lower because of working capital generated">
                            <span>Net Interest Payable</span>
                          </Tooltip>
                        </td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium">{formatCurrency(netInterest)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-[#D64933]">{formatCurrency(adjustedNetInterest)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-blue-600">{formatCurrency(adjustedNetInterest - netInterest)}</td>
                        <td className="py-1.5 px-3 text-xs text-gray-600">Lower because of working capital generated</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 text-sm">
                          <Tooltip text="Higher because both financial and operating benefits flow through">
                            <span>Profit before tax</span>
                          </Tooltip>
                        </td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium">{formatCurrency(profitBeforeTax)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-[#D64933]">{formatCurrency(adjustedProfitBeforeTax)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-blue-600">{formatCurrency(adjustedProfitBeforeTax - profitBeforeTax)}</td>
                        <td className="py-1.5 px-3 text-xs text-gray-600">Higher because both financial and operating benefits flow through</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 text-sm">
                          <Tooltip text="Supplier discounts flow through to EBITDA but not financial benefits">
                            <span>EBITDA</span>
                          </Tooltip>
                        </td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium">{formatCurrency(ebitda)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-[#D64933]">{formatCurrency(adjustedEbitda)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-blue-600">{formatCurrency(adjustedEbitda - ebitda)}</td>
                        <td className="py-1.5 px-3 text-xs text-gray-600">Supplier discounts flow through to EBITDA but not financial benefits</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 text-sm">
                          <Tooltip text="Increased as suppliers provide more credit, adjusted for changes in the card programme">
                            <span>Trade Payables</span>
                          </Tooltip>
                        </td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium">{formatCurrency(tradePayables)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-[#D64933]">{formatCurrency(adjustedTradePayables)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-blue-600">{formatCurrency(adjustedTradePayables - tradePayables)}</td>
                        <td className="py-1.5 px-3 text-xs text-gray-600">Increased as suppliers provide more credit, adjusted for changes in the card programme</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 text-sm">
                          <Tooltip text="Reduced by the trade credit provided by suppliers">
                            <span>Net Debt</span>
                          </Tooltip>
                        </td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium">{formatCurrency(netDebt)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-[#D64933]">{formatCurrency(adjustedNetDebt)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-blue-600">{formatCurrency(adjustedNetDebt - netDebt)}</td>
                        <td className="py-1.5 px-3 text-xs text-gray-600">Reduced by the trade credit provided by suppliers</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 text-sm">
                          <Tooltip text="Higher because both financial and operating benefits flow through">
                            <span>Equity</span>
                          </Tooltip>
                        </td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium">{formatCurrency(equity)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-[#D64933]">{formatCurrency(adjustedEquity)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-blue-600">{formatCurrency(adjustedEquity - equity)}</td>
                        <td className="py-1.5 px-3 text-xs text-gray-600">Higher because both financial and operating benefits flow through</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 text-sm">
                          <Tooltip text="Increased as a result of the increase in trade credit">
                            <span>Free Cash Flow</span>
                          </Tooltip>
                        </td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium">{formatCurrency(freeCashFlow)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-[#D64933]">{formatCurrency(adjustedFCF)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-blue-600">{formatCurrency(adjustedFCF - freeCashFlow)}</td>
                        <td className="py-1.5 px-3 text-xs text-gray-600">Increased as a result of the increase in trade credit</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Key Ratios */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Financial Ratios</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">Ratio</th>
                        <th className="text-right py-2 px-3 text-sm font-semibold text-gray-700">Existing</th>
                        <th className="text-right py-2 px-3 text-sm font-semibold text-[#D64933]">With PrimaTrade</th>
                        <th className="text-right py-2 px-3 text-sm font-semibold text-blue-600">Change</th>
                        <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-1.5 px-3 text-sm">
                          <Tooltip text="Up because cost of sales is lower">
                            <span>EBITDA margin</span>
                          </Tooltip>
                        </td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium">{formatPercent(ebitdaMargin)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-[#D64933]">{formatPercent(adjustedEbitdaMargin)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-blue-600">{formatPercent(adjustedEbitdaMargin - ebitdaMargin)}</td>
                        <td className="py-1.5 px-3 text-xs text-gray-600">Up because cost of sales is lower</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 text-sm">
                          <Tooltip text="Up because cost of sales is lower">
                            <span>Operating margin</span>
                          </Tooltip>
                        </td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium">{formatPercent(operatingMargin)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-[#D64933]">{formatPercent(adjustedOperatingMargin)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-blue-600">{formatPercent(adjustedOperatingMargin - operatingMargin)}</td>
                        <td className="py-1.5 px-3 text-xs text-gray-600">Up because cost of sales is lower</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 text-sm">
                          <Tooltip text="Down because EBITDA is higher and net debt is lower">
                            <span>Leverage (Net Debt / EBITDA)</span>
                          </Tooltip>
                        </td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium">{leverage.toFixed(2)}x</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-[#D64933]">{adjustedLeverage.toFixed(2)}x</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-blue-600">{(adjustedLeverage - leverage).toFixed(2)}x</td>
                        <td className="py-1.5 px-3 text-xs text-gray-600">Down because EBITDA is higher and net debt is lower</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 text-sm">
                          <Tooltip text="Down because net debt is lower and equity is higher">
                            <span>Solvency (Debt / Equity)</span>
                          </Tooltip>
                        </td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium">{solvency.toFixed(2)}x</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-[#D64933]">{adjustedSolvency.toFixed(2)}x</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-blue-600">{(adjustedSolvency - solvency).toFixed(2)}x</td>
                        <td className="py-1.5 px-3 text-xs text-gray-600">Down because net debt is lower and equity is higher</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 text-sm">
                          <Tooltip text="Up because working capital is generated">
                            <span>FCF / Sales</span>
                          </Tooltip>
                        </td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium">{formatPercent(fcfSales)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-[#D64933]">{formatPercent(adjustedFcfSales)}</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-blue-600">{formatPercent(adjustedFcfSales - fcfSales)}</td>
                        <td className="py-1.5 px-3 text-xs text-gray-600">Up because working capital is generated</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 text-sm">
                          <Tooltip text="Based on profit before tax; improved because interest costs reduce and earnings increase">
                            <span>Interest cover</span>
                          </Tooltip>
                        </td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium">{interestCover.toFixed(2)}x</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-[#D64933]">{adjustedInterestCover.toFixed(2)}x</td>
                        <td className="py-1.5 px-3 text-sm text-right font-medium text-blue-600">{(adjustedInterestCover - interestCover).toFixed(2)}x</td>
                        <td className="py-1.5 px-3 text-xs text-gray-600">Based on profit before tax; improved because interest costs reduce and earnings increase</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

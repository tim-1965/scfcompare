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
  const [showCalculations, setShowCalculations] = useState(false);

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
  const [tier2PtDiscountPct, setTier2PtDiscountPct] = useState(() => loadSavedValue('tier2PtDiscountPct', 2.5));
  const [tier2TradSavingsPct, setTier2TradSavingsPct] = useState(() => loadSavedValue('tier2TradSavingsPct', 10));
  const [tier2PtSavingsPct, setTier2PtSavingsPct] = useState(() => loadSavedValue('tier2PtSavingsPct', 12));
  const [tier2TradPaymentTerms, setTier2TradPaymentTerms] = useState(() => loadSavedValue('tier2TradPaymentTerms', 45));
  const [tier2PtPaymentTerms, setTier2PtPaymentTerms] = useState(() => loadSavedValue('tier2PtPaymentTerms', 90));
  
  // Tier 3: Long Tail (auto-calculated)
  const [tier3TradPartPct, setTier3TradPartPct] = useState(() => loadSavedValue('tier3TradPartPct', 0));
  const [tier3PtPartPct, setTier3PtPartPct] = useState(() => loadSavedValue('tier3PtPartPct', 80));
  const [tier3TradDiscountPct, setTier3TradDiscountPct] = useState(() => loadSavedValue('tier3TradDiscountPct', 0));
  const [tier3PtDiscountPct, setTier3PtDiscountPct] = useState(() => loadSavedValue('tier3PtDiscountPct', 3.5));
  const [tier3TradSavingsPct, setTier3TradSavingsPct] = useState(() => loadSavedValue('tier3TradSavingsPct', 14));
  const [tier3PtSavingsPct, setTier3PtSavingsPct] = useState(() => loadSavedValue('tier3PtSavingsPct', 18));
  const [tier3CardUsagePct, setTier3CardUsagePct] = useState(() => loadSavedValue('tier3CardUsagePct', 60));
  const [tier3CardCostPct, setTier3CardCostPct] = useState(() => loadSavedValue('tier3CardCostPct', 3.5));
  const [tier3CardRebatePct, setTier3CardRebatePct] = useState(() => loadSavedValue('tier3CardRebatePct', 1.0));
  const [tier3CardRemainPct, setTier3CardRemainPct] = useState(() => loadSavedValue('tier3CardRemainPct', 15));
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
  const [baselinePaymentTerm, setBaselinePaymentTerm] = useState(() => loadSavedValue('baselinePaymentTerm', 45));

  // Simulation inputs
  const [turnover, setTurnover] = useState(() => loadSavedValue('turnover', 750000000));
  const [costOfSales, setCostOfSales] = useState(() => loadSavedValue('costOfSales', 500000000));
  const [operatingProfit, setOperatingProfit] = useState(() => loadSavedValue('operatingProfit', 30000000));
  const [profitBeforeTax, setProfitBeforeTax] = useState(() => loadSavedValue('profitBeforeTax', 10000000));
  const [netInterest, setNetInterest] = useState(() => loadSavedValue('netInterest', 40000000));
  const [ebitda, setEbitda] = useState(() => loadSavedValue('ebitda', 90000000));
  const [tradePayables, setTradePayables] = useState(() => loadSavedValue('tradePayables',103000000));
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
      setTier3CardRemainPct(15);
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
  // ===== START OF SECTION TO SHOW FOR DEBUG =====
  
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
  const tradCardFreeFundingBalance = tradCardSpend * ((cardFreeFundingDays) / 365);
  const tradTotalTradeCredit = (spendTier1 * tier1TradPaymentTerms + spendTier2 * tier2TradPaymentTerms + spendTier3 * tier3TradPaymentTerms) / 365 + tradCardFreeFundingBalance;
  
  // Outstanding balance (Traditional) - tier-specific calculation
  const tradOutstandingBalance = (tradParticipatingTier1 * tradDaysAdvancedTier1 +
                                   tradParticipatingTier2 * tradDaysAdvancedTier2 +
                                   tradParticipatingTier3 * tradDaysAdvancedTier3) / 365;

  // Funding benefit enabled by SCF & cards (paid for by suppliers) - based on baseline payment term
  const tradScfFundingBenefit = ((tier1TradPaymentTerms - baselinePaymentTerm) * spendTier1 +
                                   (tier2TradPaymentTerms - baselinePaymentTerm) * spendTier2 +
                                   (tier3TradPaymentTerms - baselinePaymentTerm) * spendTier3 + tradBuyerCardFreeFunding) * (scfRatePct / 100) / 365;
  
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
  const ptParticipatingTier3 = spendTier3 * (tier3PtPartPct / 100)* (1 - (tier3CardUsagePct / 100) * (tier3CardRemainPct / 100));
  const ptParticipatingSpend = ptParticipatingTier1 + ptParticipatingTier2 + ptParticipatingTier3;
  
  const ptSupplierCashReceipt = ptDaysAfterHandover;
  
  // Tier-specific days advanced based on tier-specific payment terms
  const ptDaysAdvancedTier1 = Math.max(0, tier1PtPaymentTerms - ptSupplierCashReceipt);
  const ptDaysAdvancedTier2 = Math.max(0, tier2PtPaymentTerms - ptSupplierCashReceipt);
  const ptDaysAdvancedTier3 = Math.max(0, tier3PtPaymentTerms - ptSupplierCashReceipt);
  const ptDaysFaster = tradSupplierCashReceipt - ptSupplierCashReceipt;
  
  // Financing costs by tier (PrimaTrade)
  const ptFinancingTier1 = ptParticipatingTier1 * (scfRatePct / 100) * (ptDaysAdvancedTier1 / 365);
  const ptFinancingTier2 = ptParticipatingTier2 * (scfRatePct / 100) * (ptDaysAdvancedTier2 / 365);
  const ptFinancingTier3 = ptParticipatingTier3 * (scfRatePct / 100) * (ptDaysAdvancedTier3 / 365);
  const ptTotalFinancing = ptFinancingTier1 + ptFinancingTier2 + ptFinancingTier3;
  
  // Agreed discounts by tier
  const ptDiscountTier1 = ptParticipatingTier1 * (tier1PtDiscountPct / 100);
  const ptDiscountTier2 = ptParticipatingTier2 * (tier2PtDiscountPct / 100);
  const ptDiscountTier3 = ptParticipatingTier3 * (tier3PtDiscountPct / 100);
  
  // Actual discount (MAX of financing cost and agreed discount)
  const ptActualDiscountTier1 = Math.max(ptFinancingTier1, ptDiscountTier1);
  const ptActualDiscountTier2 = Math.max(ptFinancingTier2, ptDiscountTier2);
  const ptActualDiscountTier3 = Math.max(ptFinancingTier3, ptDiscountTier3);
  
  // Card costs for PrimaTrade (cards that remain)
  const ptCardCosts = spendTier3 * (tier3CardCostPct / 100) * (tier3CardUsagePct / 100) * (tier3CardRemainPct / 100);
  
  // Total supplier costs (PrimaTrade)
  const ptTotalSupplierCosts = ptActualDiscountTier1 + ptActualDiscountTier2 + ptActualDiscountTier3 + ptCardCosts;
  
  // Supplier time value benefits (PrimaTrade)
  const ptSupplierBenefitTier1 = ptParticipatingTier1 * (tier1PtSavingsPct / 100) * (ptDaysAdvancedTier1 / 365);
  const ptSupplierBenefitTier2 = ptParticipatingTier2 * (tier2PtSavingsPct / 100) * (ptDaysAdvancedTier2 / 365);
  const ptSupplierBenefitTier3 = ptParticipatingTier3 * (tier3PtSavingsPct / 100) * (ptDaysAdvancedTier3 / 365);
  const ptTotalSupplierTimeValue = ptSupplierBenefitTier1 + ptSupplierBenefitTier2 + ptSupplierBenefitTier3;
  
  // Supplier net benefit (PrimaTrade)
  const ptSupplierNetBenefit = ptTotalSupplierTimeValue - ptTotalSupplierCosts;
  
  // Card benefits for buyer with PrimaTrade (cards that remain)
  const ptBuyerCardRebate = (tier3CardRebatePct / 100) * (tier3CardUsagePct / 100) * spendTier3 * (tier3CardRemainPct / 100);
  const ptBuyerCardFreeFunding = (cardFreeFundingDays / 365) * (scfRatePct / 100) * (tier3CardUsagePct / 100) * spendTier3 * (tier3CardRemainPct / 100);
  
  // Trade credit and working capital calculations (PrimaTrade)
  const ptCardSpend = spendTier3 * (tier3CardUsagePct / 100) * (tier3CardRemainPct / 100);
  const ptCardFreeFundingBalance = ptCardSpend * ((cardFreeFundingDays) / 365);
  const ptTotalTradeCredit = (spendTier1 * tier1PtPaymentTerms + spendTier2 * tier2PtPaymentTerms + spendTier3 * tier3PtPaymentTerms) / 365 + ptCardFreeFundingBalance;
  
  // Additional working capital generated by PrimaTrade
  const additionalWorkingCapital = ptTotalTradeCredit - tradTotalTradeCredit;
  
  // Trade credit generated (Row 22 Dashboard) - total trade credit minus baseline
  const baselineTradeCredit = (totalProcurementSpend * 1000000) * (baselinePaymentTerm / 365);
  const tradTradeCreditGenerated = tradTotalTradeCredit - baselineTradeCredit;
  const ptTradeCreditGenerated = ptTotalTradeCredit - baselineTradeCredit;
  
  // Outstanding balance (PrimaTrade) - tier-specific calculation
  const ptOutstandingBalance = (ptParticipatingTier1 * ptDaysAdvancedTier1 +
                                 ptParticipatingTier2 * ptDaysAdvancedTier2 +
                                 ptParticipatingTier3 * ptDaysAdvancedTier3) / 365;

  // Funding benefit enabled by SCF & cards (paid for by suppliers) - based on baseline payment term
  const ptScfFundingBenefit = ((tier1PtPaymentTerms - baselinePaymentTerm) * spendTier1 +
                                 (tier2PtPaymentTerms - baselinePaymentTerm) * spendTier2 +
                                 (tier3PtPaymentTerms - baselinePaymentTerm) * spendTier3 + 
                                 ptBuyerCardFreeFunding) * (scfRatePct / 100) / 365;
  
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
  // Removed as no longer used
  //const deltaDaysAdvanced = ptDaysAdvanced - tradDaysAdvanced;
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
  const interestCover = ebitda / netInterest;
  const adjustedInterestCover = adjustedEbitda / adjustedNetInterest;

// ===== END OF SECTION TO SHOW FOR DEBUG =====

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

  const formatCurrencyWholeNumber = (value) => {
    if (Math.abs(value) >= 1000000) {
      return `${currencySymbol}${(value / 1000000).toFixed(0)}M`;
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
      label: 'Recurring annual economic value',
      trad: formatCurrency(tradTotalValue),
      pt: formatCurrency(ptTotalValue),
      tooltip: "Total annual recurring economic value created by the SCF programme, adding up benefits for both buyers and suppliers."
    },
    {
      label: 'Buyer recurring benefit from SCF',
      trad: formatCurrency(tradBuyerNetBenefit),
      pt: formatCurrency(ptBuyerNetBenefit),
      tooltip: "The annual economic benefit to the buyer of the SCF programme. The level of early payment discounts influences the benefit split between buyer and suppliers - higher discounts moves more of the benefit to the buyer and vice versa."
    },
    {
      label: 'Free cash flow generated by SCF',
      trad: formatCurrencyWholeNumber(tradTradeCreditGenerated),
      pt: formatCurrencyWholeNumber(ptTradeCreditGenerated),
      tooltip: "Additional amount of cash flow created by the SCF programme and cards (ie: trade credit provided above the assumed baseline level of trade credit)"
    },
    {
      label: 'SCF outstanding balance',
      trad: formatCurrencyWholeNumber(tradOutstandingBalance),
      pt: formatCurrencyWholeNumber(ptOutstandingBalance),
      tooltip: "The PrimaTrade SCF programme is bigger with more suppliers, longer funding periods and higher utilisation."
    },
    {
      label: 'Number of suppliers using SCF',
      trad: formatNumber(tradTotalActive, 0),
      pt: formatNumber(ptTotalActive, 0),
      tooltip: "Mid-tier and smaller suppliers will more actively use the SCF program, especially if they are paid at shipment - so utilisation levels are higher with PrimaTrade SCF."
    },
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
      <div className="bg-gradient-to-b from-gray-50 to-white border-b-2 border-gray-300 print:hidden shadow-sm">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <button
              onClick={() => setActiveView('inputs')}
              className={`group relative w-full px-3 sm:px-6 py-4 sm:py-5 font-bold text-sm sm:text-base rounded-xl border-2 transition-all duration-300 transform ${
                activeView === 'inputs'
                  ? 'bg-gradient-to-br from-[#D64933] to-[#F08070] border-[#D64933] text-white shadow-lg scale-105 ring-2 ring-[#D64933] ring-offset-2'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-[#F08070] hover:shadow-md hover:scale-102'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full ${
                  activeView === 'inputs' 
                    ? 'bg-white/20 backdrop-blur' 
                    : 'bg-gray-100 group-hover:bg-[#FBE4DD]'
                }`}>
                  <Calculator className={`w-5 h-5 sm:w-6 sm:h-6 ${activeView === 'inputs' ? 'text-white' : 'text-[#D64933]'}`} />
                </div>
                <div className="text-center">
                  <div className={`text-[10px] sm:text-xs font-semibold mb-1 ${
                    activeView === 'inputs' ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    STEP 1
                  </div>
                  <div className="leading-tight">
                    Input parameters
                  </div>
                </div>
              </div>
              {activeView === 'inputs' && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-[#D64933]"></div>
              )}
            </button>
            
            <button
              onClick={() => setActiveView('comparison')}
              className={`group relative w-full px-3 sm:px-6 py-4 sm:py-5 font-bold text-sm sm:text-base rounded-xl border-2 transition-all duration-300 transform ${
                activeView === 'comparison'
                  ? 'bg-gradient-to-br from-[#0F1B2C] via-[#1F3A56] to-[#D64933] border-[#0F1B2C] text-white shadow-lg scale-105 ring-2 ring-[#0F1B2C] ring-offset-2'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-[#1F3A56] hover:shadow-md hover:scale-102'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full ${
                  activeView === 'comparison' 
                    ? 'bg-white/20 backdrop-blur' 
                    : 'bg-gray-100 group-hover:bg-blue-50'
                }`}>
                  <BarChart3 className={`w-5 h-5 sm:w-6 sm:h-6 ${activeView === 'comparison' ? 'text-white' : 'text-[#0F1B2C]'}`} />
                </div>
                <div className="text-center">
                  <div className={`text-[10px] sm:text-xs font-semibold mb-1 ${
                    activeView === 'comparison' ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    STEP 2
                  </div>
                  <div className="leading-tight">
                    Comparison results
                  </div>
                </div>
              </div>
              {activeView === 'comparison' && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-[#0F1B2C]"></div>
              )}
            </button>
            
            <button
              onClick={() => setActiveView('simulation')}
              className={`group relative w-full px-3 sm:px-6 py-4 sm:py-5 font-bold text-sm sm:text-base rounded-xl border-2 transition-all duration-300 transform ${
                activeView === 'simulation'
                  ? 'bg-gradient-to-br from-[#D64933] via-[#F08070] to-[#FBE4DD] border-[#D64933] text-white shadow-lg scale-105 ring-2 ring-[#D64933] ring-offset-2'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-[#F08070] hover:shadow-md hover:scale-102'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full ${
                  activeView === 'simulation' 
                    ? 'bg-white/20 backdrop-blur' 
                    : 'bg-gray-100 group-hover:bg-orange-50'
                }`}>
                  <TrendingUp className={`w-5 h-5 sm:w-6 sm:h-6 ${activeView === 'simulation' ? 'text-white' : 'text-[#D64933]'}`} />
                </div>
                <div className="text-center">
                  <div className={`text-[10px] sm:text-xs font-semibold mb-1 ${
                    activeView === 'simulation' ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    STEP 3
                  </div>
                  <div className="leading-tight">
                    Financial simulation
                  </div>
                </div>
              </div>
              {activeView === 'simulation' && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-[#D64933]"></div>
              )}
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
            You can also replace expensive card payment programs with more efficient SCF, collecting an early payment discount to bring in-house the fees that are currently benefiting third parties. 
            On top, PrimaTrade enables early payments to be approved before delivery (at shipment), delivering much earlier cash to international suppliers and much more value to buyer and suppliers - monetising that value with automation into a P&L win for buyers.
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
                    {renderInput('Total spend', totalProcurementSpend, setTotalProcurementSpend, 10, 50000, 10, 'MM', false, false, 'w-full', {
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
                    {renderInput('No. of suppliers', totalSuppliers, setTotalSuppliers, 50, 50000, 50, '', false, false, 'w-full', {
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

 <div className="w-full max-w-[95%] min-[1100px]:max-w-[1100px] mx-auto">
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
                  <div className="grid gap-4 sm:grid-cols-2 min-[1100px]:grid-cols-5 mt-5">
                    {highlightStats.map((stat, index) => (
                      <div
                        key={stat.label}
                        className="rounded-lg bg-gradient-to-br from-[#FBE4DD] via-white to-white border border-[#F6BFB0] shadow-sm p-4 flex flex-col"
                      >
                        <div className="flex items-center gap-1 mb-4">
                          <p className="text-xs font-semibold text-[#8B1D12] uppercase tracking-wide">{stat.label}</p>
                          <Tooltip text={stat.tooltip}>
                            <></>
                          </Tooltip>
                        </div>
                        <div className="mt-auto space-y-3">
                          <div>
                            <p className="text-[11px] font-semibold text-gray-600 mb-1">Traditional SCF</p>
                            <p className="text-lg font-bold text-gray-900">
                              {stat.trad}
                            </p>
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold text-[#D64933] mb-1">PrimaTrade SCF</p>
                            <p className="text-lg font-bold text-[#D64933]">
                              {stat.pt}
                            </p>
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
            <li><strong>Early payment at shipment:</strong> PrimaTrade enables buyers to approve early payments at shipment rather than delivery via supplier-driven PO matching and automation, bringing forward cash to international suppliers by several weeks and increasing the value of the programme to both suppliers and buyers.</li>
            <li><strong>Separation of discount and funding cost:</strong> PrimaTrade separates the early payment discount agreed with suppliers from the funding cost, routing the discount to the buyer P&L (net of funding costs) to maximise value for both parties.</li>  
            <li><strong>Card programme replacement:</strong> PrimaTrade enables buyers to replace expensive card payment programmes with more efficient SCF funding, replacing the card rebate with a direct buyer P&L win whilst reducing overall costs.
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
                          {renderInput('Number of suppliers', tier1Suppliers, setTier1Suppliers, 0, 2000, 10, '', false, false, 'w-full', {
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
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Column 1: Participation Rate */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 border-b border-blue-200 pb-2">Participation rate</h4>
                          {renderInput('Traditional SCF', tier1TradPartPct, setTier1TradPartPct, 0, 100, 5, '', true, false, 'w-full', {
                            tooltip: 'The proportion of eligible spend from these larger suppliers funded by traditional SCF.'
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
                            tooltip: 'The discount on the invoice agreed for early payments at shipment; PrimaTrade enables suppliers to agree higher discounts on their invoices than the SCF funding costs because they can avoid credit insurance and their local funding costs can go down when they are paid earlier, routing this benefit to the buyer P&L.'
                          })}
                        </div>
                        
                        {/* Column 3: Supplier Savings Rate */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 border-b border-blue-200 pb-2">Supplier savings rate</h4>
                          {renderInput('Traditional SCF', tier1TradSavingsPct, setTier1TradSavingsPct, 0, 30, 0.5, '', true, false, 'w-full', {
                            tooltip: 'The comparison rate that suppliers use to evaluate the benefit of early payment (typically the marginal interest rate they pay for funding include base rate). Note, when early payments are made after delivery, the benefit is usually only the interest cost saving at the suppliers marginal funding cost.'
                          })}
                          {renderInput('PrimaTrade', tier1PtSavingsPct, setTier1PtSavingsPct, 0, 30, 0.5, '', true, false, 'w-full', {
                            tooltip: 'The comparison rate that suppliers use to evaluate the benefit of early payment (typically the marginal interest rate they pay for funding include base rate). Note, when early payments are made at shipment, the benefit includes savings on credit insurance and overall better credit standing with their local funders.'
                          })}
                        </div>
                        
                        {/* Column 4: Payment Terms */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 border-b border-blue-200 pb-2">Payment terms (days)</h4>
                          {renderInput('Average payment term', tier1TradPaymentTerms, setTier1TradPaymentTerms, 0, 180, 5, ' days', false, false, 'w-full', {
                            tooltip: 'Standard contractual payment terms from invoice date for this tier of suppliers in the traditional scenario.'
                          })}
                          {renderInput('New payment term', tier1PtPaymentTerms, setTier1PtPaymentTerms, 0, 180, 5, ' days', false, false, 'w-full', {
                            tooltip: 'Potentially extended payment terms from invoice date when early payment is available via PrimaTrade, which can include additional periods (beyond local legal limits) using digital bills of exchange.'
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
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                          {/* Column 1: Participation rate */}
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-gray-700 border-b border-green-200 pb-2">Participation rate</h4>
                            <div className="space-y-2">
                              {renderInput('Traditional SCF', tier2TradPartPct, setTier2TradPartPct, 0, 100, 5, '', true, false, 'w-full', {
                                tooltip: 'The proportion of eligible spend from these mid-sized suppliers that would be funded by traditional SCF if they were to be included, likely higher participation than that of larger suppliers as they are smaller and likely to value the funding benefit.'
                              })}
                              {renderInput('PrimaTrade', tier2PtPartPct, setTier2PtPartPct, 0, 100, 5, '', true, false, 'w-full', {
                                tooltip: 'The proportion of eligible spend funded from these mid-sized suppliers by PrimaTrade SCF noting that participation is likely to be higher than traditional SCF if early payments are available at shipment rather than later after delivery.'
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
                              tooltip: 'The discount on the invoice agreed by the supplier for early payments at shipment; the buyer can set higher discounts for early payments than the pure SCF funding costs, routing this benefit to the buyer P&L; With PrimaTrade, buyers control the allocation of benefits between themselves and suppliers.'
                            })}
                          </div>

                          {/* Column 3: Supplier Savings Rate */}
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-gray-700 border-b border-green-200 pb-2">Supplier savings rate</h4>
                            {renderInput('Traditional SCF', tier2TradSavingsPct, setTier2TradSavingsPct, 0, 30, 0.5, '', true, false, 'w-full', {
                              tooltip: 'The comparison rate that suppliers use to evaluate early payment. When early payments are made after delivery, the benefit is usually only the interest cost saving at the suppliers marginal funding cost.'
                            })}
                            {renderInput('PrimaTrade', tier2PtSavingsPct, setTier2PtSavingsPct, 0, 30, 0.5, '', true, false, 'w-full', {
                              tooltip: 'The comparison rate that suppliers use to evaluate early payment. When early payments are made before delivery, supplier benefits include interest cost savings, avoidance of credit insurance and more efficient local financing.'
                            })}
                          </div>
                          
                          {/* Column 4: Payment Terms */}
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-gray-700 border-b border-green-200 pb-2">Payment terms (days)</h4>
                            {renderInput('Average payment term', tier2TradPaymentTerms, setTier2TradPaymentTerms, 0, 180, 5, ' days', false, false, 'w-full', {
                              tooltip: 'Standard contractual payment terms from invoice date for this tier of suppliers in the traditional scenario.'
                            })}
                            {renderInput('New payment term', tier2PtPaymentTerms, setTier2PtPaymentTerms, 0, 180, 5, ' days', false, false, 'w-full', {
                              tooltip: 'Potentially extended payment terms from invoice date when early payment is available via PrimaTrade, which can include additional periods (beyond local legal limits) using digital bills of exchange.'
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
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-4 border-b border-orange-200">
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
                            tooltip: 'The discount on the invoice agreed for early payments at shipment; smaller suppliers get bigger benefits from early payments and so can agree higher discounts, noting the costs many suppliers already accept with payment card programmes.'
                          })}
                        </div>
                        
                        {/* Column 3: Supplier savings rate */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 border-b border-orange-200 pb-2">Supplier savings rate</h4>
                          {renderInput('Traditional SCF', tier3TradSavingsPct, setTier3TradSavingsPct, 0, 30, 0.5, '', true, false, 'w-full', {
                            tooltip: 'The comparison rate that suppliers use to evaluate early payment. When early payments are made after delivery, the benefit is usually only the interest cost saving at the suppliers marginal funding cost.'
                          })}
                          {renderInput('PrimaTrade', tier3PtSavingsPct, setTier3PtSavingsPct, 0, 30, 0.5, '', true, false, 'w-full', {
                            tooltip: 'The comparison rate that suppliers use to decide evaluate early payment. When early payments are made before delivery, supplier benefits include interest cost savings, avoidance of credit insurance, avoidance of card charges, and more efficient local financing.'
                          })}
                        </div>
                        
                        {/* Column 4: Payment Terms */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 border-b border-orange-200 pb-2">Payment terms (days)</h4>
                          {renderInput('Average payment term', tier3TradPaymentTerms, setTier3TradPaymentTerms, 0, 180, 5, ' days', false, false, 'w-full', {
                            tooltip: 'Standard contractual payment terms from invoice date for this tier of suppliers in the traditional scenario.'
                          })}
                          {renderInput('New payment term', tier3PtPaymentTerms, setTier3PtPaymentTerms, 0, 180, 5, ' days', false, false, 'w-full', {
                            tooltip: 'Potentially extended payment terms from invoice date when early payment is available via PrimaTrade, which can include additional periods (beyond local legal limits) using digital bills of exchange.'
                          })}
                        </div>
                      </div>
                      
                      {/* Card programme */}
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                          <h4 className="text-sm font-semibold text-gray-700">Card programme (potentially replaced with PrimaTrade SCF to capture more P&L whilst giving suppliers earlier payments)</h4>
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
                    {renderInput('Baseline payment term', baselinePaymentTerm, setBaselinePaymentTerm, 0, 90, 1, 'days', false, false, 'w-full', {
                      tooltip: 'This payment term is used to determine the amount of benefit received by the buyer as a result of the SCF programme when payment terms by suppliers are generally extended'
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
                 <div className="w-full flex justify-center">
                 <div className="w-full max-w-[95%] min-[920px]:w-[920px]">
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
                  <div className="grid grid-cols-2 min-[920px]:grid-cols-5 gap-3 mb-6">
                    {highlightStats.map((stat, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <div className="text-xs font-medium text-gray-600 mb-2 flex items-center gap-1 whitespace-normal" style={{ minHeight: '32px' }}>
                          {stat.label}
                          <Tooltip text={stat.tooltip}>
                            <></>
                          </Tooltip>
                        </div>
                        <div className="space-y-1.5">
                          <div>
                            <div className="text-[10px] font-medium text-gray-500 mb-0.5">Traditional SCF</div>
                            <div className="text-sm font-semibold text-gray-700">
                              {stat.trad}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] font-medium text-[#D64933]/70 mb-0.5">PrimaTrade SCF</div>
                            <div className="text-sm font-semibold text-[#D64933]">
                              {stat.pt}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="overflow-hidden rounded-lg border border-[#E6ECF2] shadow-inner">
                    <table className="w-full">
                      <thead className="bg-[#0F1B2C] text-white">
                        <tr className="">
                          <th className="text-left py-3 px-4 text-sm font-semibold">Economic Value Breakdown</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold">Traditional SCF</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold">PrimaTrade SCF</th>
                        </tr>
                      </thead>
                      <tbody>
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
                          <td className="py-2 px-3 text-sm text-right">{formatCurrency(tradScfFundingBenefit)}</td>
                          <td className="py-2 px-3 text-sm text-right text-[#D64933]">{formatCurrency(ptScfFundingBenefit)}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 px-3 pl-6 text-sm text-gray-700">
                            <Tooltip text="Card rebates and funding benefit plus (PrimaTrade only) the P&L benefit arising from early payment discounts.">
                              <span>Benefit of discounts and rebates earned by the buyer</span>
                            </Tooltip>
                          </td>
                          <td className="py-2 px-3 text-sm text-right">{formatCurrency(tradBuyerCardRebate + tradDiscountsPassedThrough)}</td>
                          <td className="py-2 px-3 text-sm text-right text-[#D64933]">{formatCurrency(ptBuyerCardRebate + ptDiscountsPassedThrough)}</td>
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
                        <th className="text-right py-2 px-3 text-sm font-semibold text-[#D64933]">PrimaTrade SCF</th>
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
                      <tr className="bg-gray-100 font-semibold">
                        <td className="py-3 px-3 text-sm">
                          <Tooltip text="Working capital provided via the supply chain (total trade credit provided by suppliers & cards)">
                            <span>Total amount of trade credit</span>
                          </Tooltip>
                        </td>
                        <td className="py-3 px-3 text-sm text-right">{formatCurrency(tradTotalTradeCredit)}</td>
                        <td className="py-3 px-3 text-sm text-right text-[#D64933]">{formatCurrency(ptTotalTradeCredit)}</td>
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
                        <th className="text-right py-2 px-3 text-sm font-semibold text-[#D64933]">PrimaTrade SCF</th>
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
              <div className="max-w-5xl mx-auto">
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
            </div>
            </>
          )}
          {/* Panel 3: Financial Simulation */}
          {(activeView === 'simulation' || isPrinting) && (
            <>
            <div data-panel="simulation" className={`space-y-4 sm:space-y-6 ${isPrinting ? 'print-simulation-panel' : ''} ${activeView !== 'simulation' && !isPrinting ? 'hidden' : ''}`}>
              
              {/* Impact Summary */}
              <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-lg shadow-xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-2">Impact Summary</h2>
                <p className="text-sm text-red-100 mb-6">Highlights of the impact when a traditional SCF programme is upgraded to a PrimaTrade SCF programme based on the inputs (including any adjustments to the card payment programme).</p>
                <div className="grid md:grid-cols-5 gap-4">
                  <div>
                    <div className="text-red-100 text-xs mb-2">Profit Before Tax</div>
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-bold">{formatCurrency(profitBeforeTax)}</div>
                      <div className="text-red-100">→</div>
                      <div className="text-lg font-bold">{formatCurrency(adjustedProfitBeforeTax)}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-red-100 text-xs mb-2">EBITDA</div>
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-bold">{formatCurrency(ebitda)}</div>
                      <div className="text-red-100">→</div>
                      <div className="text-lg font-bold">{formatCurrency(adjustedEbitda)}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-red-100 text-xs mb-2">Total Trade Credit</div>
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-bold">{formatCurrency(tradTotalTradeCredit)}</div>
                      <div className="text-red-100">→</div>
                      <div className="text-lg font-bold">{formatCurrency(ptTotalTradeCredit)}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-red-100 text-xs mb-2">Leverage Ratio</div>
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-bold">{formatNumber(leverage, 2)}x</div>
                      <div className="text-red-100">→</div>
                      <div className="text-lg font-bold">{formatNumber(adjustedLeverage, 2)}x</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-red-100 text-xs mb-2">Interest Cover</div>
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-bold">{formatNumber(interestCover, 2)}x</div>
                      <div className="text-red-100">→</div>
                      <div className="text-lg font-bold">{formatNumber(adjustedInterestCover, 2)}x</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simulation Inputs */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Historic Financial Position (for comparison)</h2>
                <p className="text-sm text-gray-600 mb-6">Enter your current financial figures in millions to see the impact of upgrading SCF to a PrimaTrade  SCF programme</p>
                
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Input Fields - Two Columns */}
                  <div className="flex-1 lg:max-w-3xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                      {/* Left Column - P&L Items */}
                      <div className="space-y-4 bg-amber-50 p-4 rounded-lg border border-amber-100">
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
                          <label className="text-sm text-gray-700 flex-1">Profit before tax</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={profitBeforeTax / 1000000}
                              onChange={(e) => setProfitbeforetax(parseFloat(e.target.value || 0) * 1000000)}
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
                      <div className="space-y-4 bg-sky-50 p-4 rounded-lg border border-sky-100">
                        <h3 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-300">Balance sheet and cash flow</h3>
                        
                        <div className="flex items-center justify-between gap-3">
                          <label className="text-sm text-gray-700 flex-1">
                            <Tooltip text={`The expected value for trade payables based on the inputs on panel 1 is ${formatCurrency(tradTotalTradeCredit)}`}>
                              <span>Trade Payables</span>
                            </Tooltip>
                          </label>
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
                            Upgrading your SCF offerings to a next generation solution can materially improve your financial ratios and your financial statements at enterprise level. PrimaTrade's platform is proven at scale and enables the support offereing SCF to be delivered to those suppliers that truly need it (mid-tier and long-tail suppliers) whilst monetising the benefits for your own P&L.
                          </p>
                          
                          <p>
                            This simulation compares a traditional SCF solution (assumed to be already in the historic numbers) with the impact that PrimaTrade's platform can deliver. The key differences are: more suppliers are included (using PO match, automation and digitisation) and the efficiencies are monetised to benefit the buyer via early payment discounts.
                          </p>
                          
                          <p>
                            Instead of suppliers using external funding (eg: factoring) or paying high fees to card providers, they are funded efficiently via the PrimaTrade platform with the buyer taking the P&L win of these costs for itself.
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
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 w-40">With Traditional SCF</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-[#D64933] w-40">Add PrimaTrade SCF</th>
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
                        <td className="py-3 px-4 text-xs text-gray-600">Reduced by supplier discounts which lower cost of goods</td>
                      </tr>
                      <tr className="bg-[#F08070]/10">
                        <td className="py-3 px-4 text-sm font-semibold">Operating profit</td>
                        <td className="py-3 px-4 text-sm text-right font-bold">{formatCurrency(operatingProfit)}</td>
                        <td className="py-3 px-4 text-sm text-right font-bold text-red-700">{formatCurrency(adjustedOperatingProfit)}</td>
                        <td className="py-3 px-4 text-xs text-gray-600">Higher as supplier discounts reduce cost of goods</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Net interest</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(netInterest)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatCurrency(adjustedNetInterest)}</td>
                        <td className="py-3 px-4 text-xs text-gray-600">Lower as net debt reduced by working capital improvements</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Profit before tax</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(profitBeforeTax)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatCurrency(adjustedProfitBeforeTax)}</td>
                        <td className="py-3 px-4 text-xs text-gray-600">Higher as all benefits show (both discounts and financial benefits flow through)</td>
                      </tr>
                      <tr className="bg-[#F08070]/10">
                        <td className="py-3 px-4 text-sm font-semibold">EBITDA</td>
                        <td className="py-3 px-4 text-sm text-right font-bold">{formatCurrency(ebitda)}</td>
                        <td className="py-3 px-4 text-sm text-right font-bold text-red-700">{formatCurrency(adjustedEbitda)}</td>
                        <td className="py-3 px-4 text-xs text-gray-600">Higher as cost of sales is lower</td>
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
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 w-40">With Traditional SCF</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-[#D64933] w-40">Add PrimaTrade SCF</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-3 px-4 text-sm">
                          <Tooltip text={`The expected value for trade payables based on the inputs on panel 1 is ${formatCurrency(tradTotalTradeCredit)}`}>
                            <span>Trade payables</span>
                          </Tooltip>
                        </td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(tradePayables)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-[#D64933]">{formatCurrency(adjustedTradePayables)}</td>
                        <td className="py-3 px-4 text-xs text-gray-600">Goes up as suppliers are providing more credit</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Net debt</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(netDebt)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatCurrency(adjustedNetDebt)}</td>
                        <td className="py-3 px-4 text-xs text-gray-600">Reduced as lower borrowing (suppliers provide more credit, if card use reduces then buyer card credit reduces)</td>
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
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 w-40">With Traditional SCF</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-[#D64933] w-40">Add PrimaTrade SCF</th>
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
                        <td className="py-3 px-4 text-xs text-gray-600">Based on profit before tax - up because interest costs reduce and earnings increase</td>
                      </tr>
                    </tbody>
                  </table>
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
                  onClick={() => setShowCalculations(!showCalculations)}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  <Calculator className="w-5 h-5" />
                  {showCalculations ? 'Hide Calculations' : 'Show Calculations'}
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D64933] to-[#F08070] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  <Printer className="w-5 h-5" />
                  Print to PDF
                </button>
              </div>

              {/* Calculations Debug Section */}
              {showCalculations && (
                <div className="mt-6 bg-white rounded-lg shadow-md p-4 sm:p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Calculator className="w-6 h-6 text-[#F08070]" />
                    Calculations
                  </h2>
                  
                  <div className="overflow-auto max-h-[600px]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-fit">
                      {/* Left Column: Code */}
                      <div className="bg-gray-50 rounded p-4">
                        <h3 className="text-sm font-bold text-gray-700 mb-3 sticky top-0 bg-gray-50 pb-2">Code</h3>
                        <pre className="text-xs font-mono whitespace-pre">
{`const totalSpend = totalProcurementSpend * 1000000;
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
const tradCardFreeFundingBalance = tradCardSpend * ((cardFreeFundingDays) / 365);
const tradTotalTradeCredit = (spendTier1 * tier1TradPaymentTerms + spendTier2 * tier2TradPaymentTerms + spendTier3 * tier3TradPaymentTerms) / 365 + tradCardFreeFundingBalance;

// Outstanding balance (Traditional) - tier-specific calculation
const tradOutstandingBalance = (tradParticipatingTier1 * tradDaysAdvancedTier1 +
                                 tradParticipatingTier2 * tradDaysAdvancedTier2 +
                                 tradParticipatingTier3 * tradDaysAdvancedTier3) / 365;

// Funding benefit enabled by SCF & cards (paid for by suppliers) - based on baseline payment term
const tradScfFundingBenefit = ((tier1TradPaymentTerms - baselinePaymentTerm) * spendTier1 +
                                 (tier2TradPaymentTerms - baselinePaymentTerm) * spendTier2 +
                                 (tier3TradPaymentTerms - baselinePaymentTerm) * spendTier3 + tradBuyerCardFreeFunding) * (scfRatePct / 100) / 365;

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
const ptParticipatingTier3 = spendTier3 * (tier3PtPartPct / 100)* (1 - (tier3CardUsagePct / 100) * (tier3CardRemainPct / 100));
const ptParticipatingSpend = ptParticipatingTier1 + ptParticipatingTier2 + ptParticipatingTier3;

const ptSupplierCashReceipt = ptDaysAfterHandover;

// Tier-specific days advanced based on tier-specific payment terms
const ptDaysAdvancedTier1 = Math.max(0, tier1PtPaymentTerms - ptSupplierCashReceipt);
const ptDaysAdvancedTier2 = Math.max(0, tier2PtPaymentTerms - ptSupplierCashReceipt);
const ptDaysAdvancedTier3 = Math.max(0, tier3PtPaymentTerms - ptSupplierCashReceipt);
const ptDaysFaster = tradSupplierCashReceipt - ptSupplierCashReceipt;

// Financing costs by tier (PrimaTrade)
const ptFinancingTier1 = ptParticipatingTier1 * (scfRatePct / 100) * (ptDaysAdvancedTier1 / 365);
const ptFinancingTier2 = ptParticipatingTier2 * (scfRatePct / 100) * (ptDaysAdvancedTier2 / 365);
const ptFinancingTier3 = ptParticipatingTier3 * (scfRatePct / 100) * (ptDaysAdvancedTier3 / 365);
const ptTotalFinancing = ptFinancingTier1 + ptFinancingTier2 + ptFinancingTier3;

// Agreed discounts by tier
const ptDiscountTier1 = ptParticipatingTier1 * (tier1PtDiscountPct / 100);
const ptDiscountTier2 = ptParticipatingTier2 * (tier2PtDiscountPct / 100);
const ptDiscountTier3 = ptParticipatingTier3 * (tier3PtDiscountPct / 100);

// Actual discount (MAX of financing cost and agreed discount)
const ptActualDiscountTier1 = Math.max(ptFinancingTier1, ptDiscountTier1);
const ptActualDiscountTier2 = Math.max(ptFinancingTier2, ptDiscountTier2);
const ptActualDiscountTier3 = Math.max(ptFinancingTier3, ptDiscountTier3);

// Card costs for PrimaTrade (cards that remain)
const ptCardCosts = spendTier3 * (tier3CardCostPct / 100) * (tier3CardUsagePct / 100) * (tier3CardRemainPct / 100);

// Total supplier costs (PrimaTrade)
const ptTotalSupplierCosts = ptActualDiscountTier1 + ptActualDiscountTier2 + ptActualDiscountTier3 + ptCardCosts;

// Supplier time value benefits (PrimaTrade)
const ptSupplierBenefitTier1 = ptParticipatingTier1 * (tier1PtSavingsPct / 100) * (ptDaysAdvancedTier1 / 365);
const ptSupplierBenefitTier2 = ptParticipatingTier2 * (tier2PtSavingsPct / 100) * (ptDaysAdvancedTier2 / 365);
const ptSupplierBenefitTier3 = ptParticipatingTier3 * (tier3PtSavingsPct / 100) * (ptDaysAdvancedTier3 / 365);
const ptTotalSupplierTimeValue = ptSupplierBenefitTier1 + ptSupplierBenefitTier2 + ptSupplierBenefitTier3;

// Supplier net benefit (PrimaTrade)
const ptSupplierNetBenefit = ptTotalSupplierTimeValue - ptTotalSupplierCosts;

// Card benefits for buyer with PrimaTrade (cards that remain)
const ptBuyerCardRebate = (tier3CardRebatePct / 100) * (tier3CardUsagePct / 100) * spendTier3 * (tier3CardRemainPct / 100);
const ptBuyerCardFreeFunding = (cardFreeFundingDays / 365) * (scfRatePct / 100) * (tier3CardUsagePct / 100) * spendTier3 * (tier3CardRemainPct / 100);

// Trade credit and working capital calculations (PrimaTrade)
const ptCardSpend = spendTier3 * (tier3CardUsagePct / 100) * (tier3CardRemainPct / 100);
const ptCardFreeFundingBalance = ptCardSpend * ((cardFreeFundingDays) / 365);
const ptTotalTradeCredit = (spendTier1 * tier1PtPaymentTerms + spendTier2 * tier2PtPaymentTerms + spendTier3 * tier3PtPaymentTerms) / 365 + ptCardFreeFundingBalance;

// Additional working capital generated by PrimaTrade
const additionalWorkingCapital = ptTotalTradeCredit - tradTotalTradeCredit;

// Trade credit generated (Row 22 Dashboard) - total trade credit minus baseline
const baselineTradeCredit = (totalProcurementSpend * 1000000) * (baselinePaymentTerm / 365);
const tradTradeCreditGenerated = tradTotalTradeCredit - baselineTradeCredit;
const ptTradeCreditGenerated = ptTotalTradeCredit - baselineTradeCredit;

// Outstanding balance (PrimaTrade) - tier-specific calculation
const ptOutstandingBalance = (ptParticipatingTier1 * ptDaysAdvancedTier1 +
                               ptParticipatingTier2 * ptDaysAdvancedTier2 +
                               ptParticipatingTier3 * ptDaysAdvancedTier3) / 365;

// Funding benefit enabled by SCF & cards (paid for by suppliers) - based on baseline payment term
const ptScfFundingBenefit = ((tier1PtPaymentTerms - baselinePaymentTerm) * spendTier1 +
                               (tier2PtPaymentTerms - baselinePaymentTerm) * spendTier2 +
                               (tier3PtPaymentTerms - baselinePaymentTerm) * spendTier3 + 
                               ptBuyerCardFreeFunding) * (scfRatePct / 100) / 365;

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
const deltaEarlyPaymentDiscounts = ptDiscountsPassedThrough - tradDiscountsPassedThrough;
const deltaFundingBenefits = deltaBuyerBenefit - deltaEarlyPaymentDiscounts;
const totalWCBenefit = additionalWorkingCapital;

// Adjusted financials with PrimaTrade
const adjustedCostOfSales = costOfSales - deltaEarlyPaymentDiscounts;
const adjustedOperatingProfit = operatingProfit + deltaEarlyPaymentDiscounts;
const adjustedProfitBeforeTax = profitBeforeTax + deltaBuyerBenefit;
const adjustedEbitda = ebitda + deltaEarlyPaymentDiscounts;
const adjustedNetInterest = netInterest - (totalWCBenefit * (scfRatePct / 100));
const adjustedTradePayables = tradePayables + totalWCBenefit;
const adjustedNetDebt = netDebt - totalWCBenefit;
const adjustedEquity = equity + deltaBuyerBenefit;
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
const interestCover = ebitda / netInterest;
const adjustedInterestCover = adjustedEbitda / adjustedNetInterest;`}
                        </pre>
                      </div>

                      {/* Right Column: Values */}
                      <div className="bg-blue-50 rounded p-4">
                        <h3 className="text-sm font-bold text-gray-700 mb-3 sticky top-0 bg-blue-50 pb-2">Values</h3>
                        <div className="text-xs font-mono space-y-1">
                          <div><strong>totalSpend:</strong> {formatCurrency(totalSpend)}</div>
                          <div><strong>domesticSharePct:</strong> {domesticSharePct.toFixed(2)}%</div>
                          <div className="pt-2 text-gray-500">// Auto-calculated Tier 3 values</div>
                          <div><strong>tier3Suppliers:</strong> {tier3Suppliers.toLocaleString()}</div>
                          <div><strong>tier3SpendPct:</strong> {tier3SpendPct.toFixed(2)}%</div>
                          <div className="pt-2 text-gray-500">// Spend by tier</div>
                          <div><strong>spendTier1:</strong> {formatCurrency(spendTier1)}</div>
                          <div><strong>spendTier2:</strong> {formatCurrency(spendTier2)}</div>
                          <div><strong>spendTier3:</strong> {formatCurrency(spendTier3)}</div>
                          <div className="pt-2 text-gray-500">// Average time to approve invoices</div>
                          <div><strong>avgApprovalTime:</strong> {avgApprovalTime.toFixed(2)} days</div>
                          <div className="pt-3 font-bold text-gray-700">TRADITIONAL SCF CALCULATIONS</div>
                          <div><strong>tradEligibleSpend:</strong> {formatCurrency(tradEligibleSpend)}</div>
                          <div><strong>tradParticipatingTier1:</strong> {formatCurrency(tradParticipatingTier1)}</div>
                          <div><strong>tradParticipatingTier2:</strong> {formatCurrency(tradParticipatingTier2)}</div>
                          <div><strong>tradParticipatingTier3:</strong> {formatCurrency(tradParticipatingTier3)}</div>
                          <div><strong>tradParticipatingSpend:</strong> {formatCurrency(tradParticipatingSpend)}</div>
                          <div><strong>tradSupplierCashReceipt:</strong> {tradSupplierCashReceipt.toFixed(2)} days</div>
                          <div className="pt-2 text-gray-500">// Days advanced by tier</div>
                          <div><strong>tradDaysAdvancedTier1:</strong> {tradDaysAdvancedTier1.toFixed(2)} days</div>
                          <div><strong>tradDaysAdvancedTier2:</strong> {tradDaysAdvancedTier2.toFixed(2)} days</div>
                          <div><strong>tradDaysAdvancedTier3:</strong> {tradDaysAdvancedTier3.toFixed(2)} days</div>
                          <div className="pt-2 text-gray-500">// Financing costs by tier (Traditional)</div>
                          <div><strong>tradFinancingTier1:</strong> {formatCurrency(tradFinancingTier1)}</div>
                          <div><strong>tradFinancingTier2:</strong> {formatCurrency(tradFinancingTier2)}</div>
                          <div><strong>tradFinancingTier3:</strong> {formatCurrency(tradFinancingTier3)}</div>
                          <div><strong>tradTotalFinancing:</strong> {formatCurrency(tradTotalFinancing)}</div>
                          <div className="pt-2 text-gray-500">// Discounts by tier (Traditional)</div>
                          <div><strong>tradDiscountTier1:</strong> {formatCurrency(tradDiscountTier1)}</div>
                          <div><strong>tradDiscountTier2:</strong> {formatCurrency(tradDiscountTier2)}</div>
                          <div><strong>tradDiscountTier3:</strong> {formatCurrency(tradDiscountTier3)}</div>
                          <div className="pt-2 text-gray-500">// Actual discount (MAX)</div>
                          <div><strong>tradActualDiscountTier1:</strong> {formatCurrency(tradActualDiscountTier1)}</div>
                          <div><strong>tradActualDiscountTier2:</strong> {formatCurrency(tradActualDiscountTier2)}</div>
                          <div><strong>tradActualDiscountTier3:</strong> {formatCurrency(tradActualDiscountTier3)}</div>
                          <div className="pt-2 text-gray-500">// Card costs</div>
                          <div><strong>tradCardCosts:</strong> {formatCurrency(tradCardCosts)}</div>
                          <div className="pt-2 text-gray-500">// Total supplier costs</div>
                          <div><strong>tradTotalSupplierCosts:</strong> {formatCurrency(tradTotalSupplierCosts)}</div>
                          <div className="pt-2 text-gray-500">// Supplier time value benefits</div>
                          <div><strong>tradSupplierBenefitTier1:</strong> {formatCurrency(tradSupplierBenefitTier1)}</div>
                          <div><strong>tradSupplierBenefitTier2:</strong> {formatCurrency(tradSupplierBenefitTier2)}</div>
                          <div><strong>tradTier3Participating:</strong> {formatCurrency(tradTier3Participating)}</div>
                          <div><strong>tradTier3OnCards:</strong> {formatCurrency(tradTier3OnCards)}</div>
                          <div><strong>tradSupplierBenefitTier3:</strong> {formatCurrency(tradSupplierBenefitTier3)}</div>
                          <div><strong>tradTotalSupplierTimeValue:</strong> {formatCurrency(tradTotalSupplierTimeValue)}</div>
                          <div className="pt-2 text-gray-500">// Supplier net benefit</div>
                          <div><strong>tradSupplierNetBenefit:</strong> {formatCurrency(tradSupplierNetBenefit)}</div>
                          <div className="pt-2 text-gray-500">// Buyer card benefits</div>
                          <div><strong>tradBuyerCardRebate:</strong> {formatCurrency(tradBuyerCardRebate)}</div>
                          <div><strong>tradBuyerCardFreeFunding:</strong> {formatCurrency(tradBuyerCardFreeFunding)}</div>
                          <div className="pt-2 text-gray-500">// Trade credit and working capital</div>
                          <div><strong>tradCardSpend:</strong> {formatCurrency(tradCardSpend)}</div>
                          <div><strong>tradCardFreeFundingBalance:</strong> {formatCurrency(tradCardFreeFundingBalance)}</div>
                          <div><strong>tradTotalTradeCredit:</strong> {formatCurrency(tradTotalTradeCredit)}</div>
                          <div className="pt-2 text-gray-500">// Outstanding balance</div>
                          <div><strong>tradOutstandingBalance:</strong> {formatCurrency(tradOutstandingBalance)}</div>
                          <div className="pt-2 text-gray-500">// Funding benefit</div>
                          <div><strong>tradScfFundingBenefit:</strong> {formatCurrency(tradScfFundingBenefit)}</div>
                          <div className="pt-2 text-gray-500">// Buyer net benefit</div>
                          <div><strong>tradBuyerNetBenefit:</strong> {formatCurrency(tradBuyerNetBenefit)}</div>
                          <div className="pt-2 text-gray-500">// Discounts passed through</div>
                          <div><strong>tradDiscountsPassedThrough:</strong> {formatCurrency(tradDiscountsPassedThrough)}</div>
                          <div className="pt-2 text-gray-500">// Total value created</div>
                          <div><strong>tradTotalValue:</strong> {formatCurrency(tradTotalValue)}</div>
                          <div className="pt-2 text-gray-500">// Active suppliers</div>
                          <div><strong>tradActiveTier1:</strong> {tradActiveTier1.toFixed(2)}</div>
                          <div><strong>tradActiveTier2:</strong> {tradActiveTier2.toFixed(2)}</div>
                          <div><strong>tradActiveTier3:</strong> {tradActiveTier3.toFixed(2)}</div>
                          <div><strong>tradTotalActive:</strong> {tradTotalActive.toFixed(2)}</div>
                          <div className="pt-3 font-bold text-gray-700">PRIMATRADE CALCULATIONS</div>
                          <div><strong>ptEligibleSpend:</strong> {formatCurrency(ptEligibleSpend)}</div>
                          <div><strong>ptParticipatingTier1:</strong> {formatCurrency(ptParticipatingTier1)}</div>
                          <div><strong>ptParticipatingTier2:</strong> {formatCurrency(ptParticipatingTier2)}</div>
                          <div><strong>ptParticipatingTier3:</strong> {formatCurrency(ptParticipatingTier3)}</div>
                          <div><strong>ptParticipatingSpend:</strong> {formatCurrency(ptParticipatingSpend)}</div>
                          <div><strong>ptSupplierCashReceipt:</strong> {ptSupplierCashReceipt.toFixed(2)} days</div>
                          <div className="pt-2 text-gray-500">// Days advanced by tier</div>
                          <div><strong>ptDaysAdvancedTier1:</strong> {ptDaysAdvancedTier1.toFixed(2)} days</div>
                          <div><strong>ptDaysAdvancedTier2:</strong> {ptDaysAdvancedTier2.toFixed(2)} days</div>
                          <div><strong>ptDaysAdvancedTier3:</strong> {ptDaysAdvancedTier3.toFixed(2)} days</div>
                          <div><strong>ptDaysFaster:</strong> {ptDaysFaster.toFixed(2)} days</div>
                          <div className="pt-2 text-gray-500">// Financing costs by tier (PrimaTrade)</div>
                          <div><strong>ptFinancingTier1:</strong> {formatCurrency(ptFinancingTier1)}</div>
                          <div><strong>ptFinancingTier2:</strong> {formatCurrency(ptFinancingTier2)}</div>
                          <div><strong>ptFinancingTier3:</strong> {formatCurrency(ptFinancingTier3)}</div>
                          <div><strong>ptTotalFinancing:</strong> {formatCurrency(ptTotalFinancing)}</div>
                          <div className="pt-2 text-gray-500">// Agreed discounts by tier</div>
                          <div><strong>ptDiscountTier1:</strong> {formatCurrency(ptDiscountTier1)}</div>
                          <div><strong>ptDiscountTier2:</strong> {formatCurrency(ptDiscountTier2)}</div>
                          <div><strong>ptDiscountTier3:</strong> {formatCurrency(ptDiscountTier3)}</div>
                          <div className="pt-2 text-gray-500">// Actual discount (MAX)</div>
                          <div><strong>ptActualDiscountTier1:</strong> {formatCurrency(ptActualDiscountTier1)}</div>
                          <div><strong>ptActualDiscountTier2:</strong> {formatCurrency(ptActualDiscountTier2)}</div>
                          <div><strong>ptActualDiscountTier3:</strong> {formatCurrency(ptActualDiscountTier3)}</div>
                          <div className="pt-2 text-gray-500">// Card costs</div>
                          <div><strong>ptCardCosts:</strong> {formatCurrency(ptCardCosts)}</div>
                          <div className="pt-2 text-gray-500">// Total supplier costs</div>
                          <div><strong>ptTotalSupplierCosts:</strong> {formatCurrency(ptTotalSupplierCosts)}</div>
                          <div className="pt-2 text-gray-500">// Supplier time value benefits</div>
                          <div><strong>ptSupplierBenefitTier1:</strong> {formatCurrency(ptSupplierBenefitTier1)}</div>
                          <div><strong>ptSupplierBenefitTier2:</strong> {formatCurrency(ptSupplierBenefitTier2)}</div>
                          <div><strong>ptSupplierBenefitTier3:</strong> {formatCurrency(ptSupplierBenefitTier3)}</div>
                          <div><strong>ptTotalSupplierTimeValue:</strong> {formatCurrency(ptTotalSupplierTimeValue)}</div>
                          <div className="pt-2 text-gray-500">// Supplier net benefit</div>
                          <div><strong>ptSupplierNetBenefit:</strong> {formatCurrency(ptSupplierNetBenefit)}</div>
                          <div className="pt-2 text-gray-500">// Card benefits for buyer</div>
                          <div><strong>ptBuyerCardRebate:</strong> {formatCurrency(ptBuyerCardRebate)}</div>
                          <div><strong>ptBuyerCardFreeFunding:</strong> {formatCurrency(ptBuyerCardFreeFunding)}</div>
                          <div className="pt-2 text-gray-500">// Trade credit and working capital</div>
                          <div><strong>ptCardSpend:</strong> {formatCurrency(ptCardSpend)}</div>
                          <div><strong>ptCardFreeFundingBalance:</strong> {formatCurrency(ptCardFreeFundingBalance)}</div>
                          <div><strong>ptTotalTradeCredit:</strong> {formatCurrency(ptTotalTradeCredit)}</div>
                          <div className="pt-2 text-gray-500">// Additional working capital</div>
                          <div><strong>additionalWorkingCapital:</strong> {formatCurrency(additionalWorkingCapital)}</div>
                          <div className="pt-2 text-gray-500">// Trade credit generated</div>
                          <div><strong>baselineTradeCredit:</strong> {formatCurrency(baselineTradeCredit)}</div>
                          <div><strong>tradTradeCreditGenerated:</strong> {formatCurrency(tradTradeCreditGenerated)}</div>
                          <div><strong>ptTradeCreditGenerated:</strong> {formatCurrency(ptTradeCreditGenerated)}</div>
                          <div className="pt-2 text-gray-500">// Outstanding balance</div>
                          <div><strong>ptOutstandingBalance:</strong> {formatCurrency(ptOutstandingBalance)}</div>
                          <div className="pt-2 text-gray-500">// Funding benefit</div>
                          <div><strong>ptScfFundingBenefit:</strong> {formatCurrency(ptScfFundingBenefit)}</div>
                          <div className="pt-2 text-gray-500">// Buyer net benefit</div>
                          <div><strong>ptBuyerNetBenefit:</strong> {formatCurrency(ptBuyerNetBenefit)}</div>
                          <div className="pt-2 text-gray-500">// Discounts passed through</div>
                          <div><strong>ptDiscountsPassedThrough:</strong> {formatCurrency(ptDiscountsPassedThrough)}</div>
                          <div className="pt-2 text-gray-500">// Total value created</div>
                          <div><strong>ptTotalValue:</strong> {formatCurrency(ptTotalValue)}</div>
                          <div className="pt-2 text-gray-500">// Active suppliers</div>
                          <div><strong>ptActiveTier1:</strong> {ptActiveTier1.toFixed(2)}</div>
                          <div><strong>ptActiveTier2:</strong> {ptActiveTier2.toFixed(2)}</div>
                          <div><strong>ptActiveTier3:</strong> {ptActiveTier3.toFixed(2)}</div>
                          <div><strong>ptTotalActive:</strong> {ptTotalActive.toFixed(2)}</div>
                          <div><strong>ptSuppliersFromCards:</strong> {ptSuppliersFromCards.toFixed(2)}</div>
                          <div className="pt-2 text-gray-500">// Suppliers on cards</div>
                          <div><strong>tradSuppliersOnCards:</strong> {tradSuppliersOnCards.toFixed(2)}</div>
                          <div><strong>ptSuppliersOnCards:</strong> {ptSuppliersOnCards.toFixed(2)}</div>
                          <div><strong>tradEligibleSuppliers:</strong> {tradEligibleSuppliers.toFixed(2)}</div>
                          <div className="pt-3 font-bold text-gray-700">DELTAS</div>
                          <div><strong>deltaEligibleSpend:</strong> {formatCurrency(deltaEligibleSpend)}</div>
                          <div><strong>deltaParticipatingSpend:</strong> {formatCurrency(deltaParticipatingSpend)}</div>
                          <div><strong>deltaOutstandingBalance:</strong> {formatCurrency(deltaOutstandingBalance)}</div>
                          <div><strong>deltaEligibleSuppliers:</strong> {deltaEligibleSuppliers.toFixed(2)}</div>
                          <div><strong>deltaActiveSuppliers:</strong> {deltaActiveSuppliers.toFixed(2)}</div>
                          <div><strong>deltaSuppliersFromCards:</strong> {deltaSuppliersFromCards.toFixed(2)}</div>
                          <div><strong>deltaCashReceipt:</strong> {deltaCashReceipt.toFixed(2)} days</div>
                          <div><strong>deltaBuyerBenefit:</strong> {formatCurrency(deltaBuyerBenefit)}</div>
                          <div><strong>deltaSupplierBenefit:</strong> {formatCurrency(deltaSupplierBenefit)}</div>
                          <div><strong>deltaTotalValue:</strong> {formatCurrency(deltaTotalValue)}</div>
                          <div className="pt-3 font-bold text-gray-700">SIMULATION CALCULATIONS</div>
                          <div><strong>deltaEarlyPaymentDiscounts:</strong> {formatCurrency(deltaEarlyPaymentDiscounts)}</div>
                          <div><strong>deltaFundingBenefits:</strong> {formatCurrency(deltaFundingBenefits)}</div>
                          <div><strong>totalWCBenefit:</strong> {formatCurrency(totalWCBenefit)}</div>
                          <div className="pt-2 text-gray-500">// Adjusted financials</div>
                          <div><strong>adjustedCostOfSales:</strong> {formatCurrency(adjustedCostOfSales)}</div>
                          <div><strong>adjustedOperatingProfit:</strong> {formatCurrency(adjustedOperatingProfit)}</div>
                          <div><strong>adjustedProfitBeforeTax:</strong> {formatCurrency(adjustedProfitBeforeTax)}</div>
                          <div><strong>adjustedEbitda:</strong> {formatCurrency(adjustedEbitda)}</div>
                          <div><strong>adjustedNetInterest:</strong> {formatCurrency(adjustedNetInterest)}</div>
                          <div><strong>adjustedTradePayables:</strong> {formatCurrency(adjustedTradePayables)}</div>
                          <div><strong>adjustedNetDebt:</strong> {formatCurrency(adjustedNetDebt)}</div>
                          <div><strong>adjustedEquity:</strong> {formatCurrency(adjustedEquity)}</div>
                          <div><strong>adjustedFCF:</strong> {formatCurrency(adjustedFCF)}</div>
                          <div className="pt-2 text-gray-500">// Calculate ratios</div>
                          <div><strong>ebitdaMargin:</strong> {ebitdaMargin.toFixed(2)}%</div>
                          <div><strong>adjustedEbitdaMargin:</strong> {adjustedEbitdaMargin.toFixed(2)}%</div>
                          <div><strong>operatingMargin:</strong> {operatingMargin.toFixed(2)}%</div>
                          <div><strong>adjustedOperatingMargin:</strong> {adjustedOperatingMargin.toFixed(2)}%</div>
                          <div><strong>leverage:</strong> {leverage.toFixed(2)}</div>
                          <div><strong>adjustedLeverage:</strong> {adjustedLeverage.toFixed(2)}</div>
                          <div><strong>solvency:</strong> {solvency.toFixed(2)}</div>
                          <div><strong>adjustedSolvency:</strong> {adjustedSolvency.toFixed(2)}</div>
                          <div><strong>fcfSales:</strong> {fcfSales.toFixed(2)}%</div>
                          <div><strong>adjustedFcfSales:</strong> {adjustedFcfSales.toFixed(2)}%</div>
                          <div><strong>interestCover:</strong> {interestCover.toFixed(2)}</div>
                          <div><strong>adjustedInterestCover:</strong> {adjustedInterestCover.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

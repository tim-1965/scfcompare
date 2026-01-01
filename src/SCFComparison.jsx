import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, BarChart3, Calculator, Users, Clock, Printer, CheckCircle } from 'lucide-react';

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
  
  // Total value created (Traditional)
  const tradTotalValue = tradSupplierNetBenefit + tradBuyerNetBenefit;
  
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
  
  // Total value created (PrimaTrade)
  const ptTotalValue = ptSupplierNetBenefit + ptBuyerNetBenefit;
  
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
    { formatDisplay, parseInput } = {}
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
      <div className="space-y-2">
        <div className="flex items-baseline gap-3">
          <label className={`text-sm font-medium flex-1 ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>{label}</label>
          <div className="flex items-baseline gap-1 min-w-[120px] justify-end">
            <input
              type={formatDisplay ? 'text' : 'number'}
              inputMode="decimal"
              value={formattedValue}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={(e) => handleBlur(e.target.value)}
              disabled={disabled}
              className={`w-24 text-right px-2 py-1 border border-gray-300 rounded text-sm font-semibold ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-[#D64933]'}`}
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
          <div className="flex gap-4">
            <button
              onClick={() => setActiveView('inputs')}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeView === 'inputs'
                  ? 'border-[#D64933] text-[#D64933]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Input parameters
              </div>
            </button>
            <button
              onClick={() => setActiveView('comparison')}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeView === 'comparison'
                  ? 'border-[#D64933] text-[#D64933]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
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
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                   {renderInput('Total procurement spend', totalProcurementSpend, setTotalProcurementSpend, 10, 10000, 10, 'MM', false, false, 'w-full', {
                      formatDisplay: (val) => `${currencySymbol}${formatNumber(val, 0)}`,
                      parseInput: (input) => {
                        const numeric = input.replace(/[^0-9.]/g, '');
                        return parseFloat(numeric);
                      }
                    })}
                  </div>
                  <div>
                    {renderInput('Number of suppliers', totalSuppliers, setTotalSuppliers, 100, 50000, 100, '')}
                  </div>
                  <div>
                    {renderInput('International share', crossBorderSharePct, setCrossBorderSharePct, 0, 100, 5, '', true)}
                  </div>
                  <div>
                    {renderInput('SCF funding rate', scfRatePct, setScfRatePct, 0, 20, 0.1, '', true)}
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
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Tier 1: Existing SCF suppliers</h3>
                    <div className="space-y-4">
                      {/* Basic Info */}
                      <div className="grid md:grid-cols-2 gap-4 pb-4 border-b border-blue-200">
                          <div className="w-full">
                          {renderInput('Number of suppliers', tier1Suppliers, setTier1Suppliers, 0, 500, 10, '', false, false, 'w-full')}
                        </div>
                        <div className="w-full">
                          {renderInput('Share of total spend', tier1SpendPct, setTier1SpendPct, 0, 100, 1, '', true, false, 'w-full')}
                        </div>
                      </div>
                      
                      {/* Three Columns */}
                      <div className="grid md:grid-cols-3 gap-6">
                        {/* Column 1: Participation Rate */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 border-b border-blue-200 pb-2">Participation rate</h4>
                          {renderInput('Traditional SCF', tier1TradPartPct, setTier1TradPartPct, 0, 100, 5, '', true)}
                          {renderInput('PrimaTrade', tier1PtPartPct, setTier1PtPartPct, 0, 100, 5, '', true)}
                        </div>
                        
                        {/* Column 2: Early Payment Discount */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 border-b border-blue-200 pb-2">Early payment discount</h4>
                          {renderInput('Traditional SCF', tier1TradDiscountPct, setTier1TradDiscountPct, 0, 5, 0.1, '', true)}
                          {renderInput('PrimaTrade', tier1PtDiscountPct, setTier1PtDiscountPct, 0, 5, 0.1, '', true)}
                        </div>
                        
                        {/* Column 3: Supplier Savings Rate */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 border-b border-blue-200 pb-2">Supplier savings rate</h4>
                          {renderInput('Traditional SCF', tier1TradSavingsPct, setTier1TradSavingsPct, 0, 30, 0.5, '', true)}
                          {renderInput('PrimaTrade', tier1PtSavingsPct, setTier1PtSavingsPct, 0, 30, 0.5, '', true)}
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
                          {renderInput('Ideal further suppliers for SCF', tier2Suppliers, setTier2Suppliers, 100, 5000, 50, '', false, false, 'w-full')}
                        </div>
                           <div className="w-full">
                          {renderInput('Share of total spend', tier2SpendPct, setTier2SpendPct, 0, 100, 1, '', true, false, 'w-full')}
                        </div>
                      </div>
                      
                       {/* Three Columns */}
                        <div className="grid md:grid-cols-3 gap-6">
                          {/* Column 1: Participation rate */}
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-gray-700 border-b border-green-200 pb-2">Participation rate</h4>
                            <div className="space-y-2">
                              {renderInput('Traditional SCF', tier2TradPartPct, setTier2TradPartPct, 0, 100, 5, '', true)}
                              {renderInput('PrimaTrade', tier2PtPartPct, setTier2PtPartPct, 0, 100, 5, '', true)}
                            </div>
                          </div>

                          {/* Column 2: Early payment discount */}
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-gray-700 border-b border-green-200 pb-2">Early payment discount</h4>
                            {renderInput('Traditional SCF', tier2TradDiscountPct, setTier2TradDiscountPct, 0, 5, 0.1, '', true)}
                            {renderInput('PrimaTrade', tier2PtDiscountPct, setTier2PtDiscountPct, 0, 5, 0.1, '', true)}
                          </div>

                          {/* Column 3: Supplier Savings Rate */}
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-gray-700 border-b border-green-200 pb-2">Supplier savings rate</h4>
                            {renderInput('Traditional SCF', tier2TradSavingsPct, setTier2TradSavingsPct, 0, 30, 0.5, '', true)}
                            {renderInput('PrimaTrade', tier2PtSavingsPct, setTier2PtSavingsPct, 0, 30, 0.5, '', true)}
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
                      <div className="grid md:grid-cols-3 gap-6 pb-4 border-b border-orange-200">
                        {/* Column 1: Participation rate */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 border-b border-orange-200 pb-2">Participation rate</h4>
                          {renderInput('Traditional SCF', tier3TradPartPct, setTier3TradPartPct, 0, 100, 5, '', true)}
                          {renderInput('PrimaTrade', tier3PtPartPct, setTier3PtPartPct, 0, 100, 5, '', true)}
                        </div>
                        
                        {/* Column 2: Early payment discount */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 border-b border-orange-200 pb-2">Early payment discount</h4>
                          {renderInput('Traditional SCF', tier3TradDiscountPct, setTier3TradDiscountPct, 0, 5, 0.1, '', true)}
                          {renderInput('PrimaTrade', tier3PtDiscountPct, setTier3PtDiscountPct, 0, 5, 0.1, '', true)}
                        </div>
                        
                        {/* Column 3: Supplier savings rate */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 border-b border-orange-200 pb-2">Supplier savings rate</h4>
                          {renderInput('Traditional SCF', tier3TradSavingsPct, setTier3TradSavingsPct, 0, 30, 0.5, '', true)}
                          {renderInput('PrimaTrade', tier3PtSavingsPct, setTier3PtSavingsPct, 0, 30, 0.5, '', true)}
                        </div>
                      </div>
                      
                      {/* Card programme */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Card programme (potentially replaced with PrimaTrade SCF)</h4>
                        <div className="grid md:grid-cols-4 gap-4">
                          {renderInput('Card usage %', tier3CardUsagePct, setTier3CardUsagePct, 0, 100, 5, '', true)}
                          {renderInput('Supplier cost %', tier3CardCostPct, setTier3CardCostPct, 0, 10, 0.1, '', true)}
                          {renderInput('Buyer rebate %', tier3CardRebatePct, setTier3CardRebatePct, 0, 5, 0.1, '', true)}
                          {renderInput('Buyer free period', cardFreeFundingDays, setCardFreeFundingDays, 0, 60, 1, 'days')}
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
                    {renderInput('Domestic / services', delayDomestic, setDelayDomestic, 0, 30, 1, 'days')}
                    {renderInput('Cross-border', delayCrossBorder, setDelayCrossBorder, 0, 60, 1, 'days')}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700">Term and approval timing</h3>
                    {renderInput('Delivery to invoice approval', processingTime, setProcessingTime, 0, 30, 1, 'days')}
                    {renderInput('Standard invoice payment terms', paymentTerms, setPaymentTerms, 0, 120, 5, 'days')}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700">SCF payment timing</h3>
                    {renderInput('Traditional SCF: days after approval', tradDaysAfterApproval, setTradDaysAfterApproval, 0, 10, 1, 'days')}
                    {renderInput('PrimaTrade: days after handover', ptDaysAfterHandover, setPtDaysAfterHandover, 0, 10, 1, 'days')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Panel 2: Comparison Results */}
          {activeView === 'comparison' && (
            <div data-panel="comparison" className="space-y-6">
              {/* Dashboard Summary */}
              <div className="bg-gradient-to-r from-[#D64933] to-[#F08070] rounded-lg shadow-xl p-6 sm:p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Dashboard — Headline KPIs</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-red-100 text-xs sm:text-sm mb-1">Eligible Spend</div>
                    <div className="text-xl sm:text-2xl font-bold mb-1">{formatCurrency(deltaEligibleSpend)}</div>
                    <div className="text-red-100 text-xs">All spend eligible via automation</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-red-100 text-xs sm:text-sm mb-1">Participating Spend</div>
                    <div className="text-xl sm:text-2xl font-bold mb-1">{formatCurrency(deltaParticipatingSpend)}</div>
                    <div className="text-red-100 text-xs">Higher participation from smaller suppliers</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-red-100 text-xs sm:text-sm mb-1">Outstanding Balance</div>
                    <div className="text-xl sm:text-2xl font-bold mb-1">{formatCurrency(deltaOutstandingBalance)}</div>
                    <div className="text-red-100 text-xs">Funding requirement increase</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-red-100 text-xs sm:text-sm mb-1">Eligible Suppliers</div>
                    <div className="text-xl sm:text-2xl font-bold mb-1">+{formatNumber(deltaEligibleSuppliers, 0)}</div>
                    <div className="text-red-100 text-xs">More suppliers involved</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-red-100 text-xs sm:text-sm mb-1">Active Suppliers</div>
                    <div className="text-xl sm:text-2xl font-bold mb-1">+{formatNumber(deltaActiveSuppliers, 0)}</div>
                    <div className="text-red-100 text-xs">More actively using SCF</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-red-100 text-xs sm:text-sm mb-1">Days Faster Payment</div>
                    <div className="text-xl sm:text-2xl font-bold mb-1">{formatNumber(ptDaysFaster, 1)}</div>
                    <div className="text-red-100 text-xs">Via PO Match & automation</div>
                  </div>
                </div>
              </div>

              {/* Programme Scope */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Programme Scope & Volume</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Metric</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Traditional SCF</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-[#D64933]">PrimaTrade</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-purple-700">Delta</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-3 px-4 text-sm">Eligible spend (annual)</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(tradEligibleSpend)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-[#D64933]">{formatCurrency(ptEligibleSpend)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-purple-700">{formatCurrency(deltaEligibleSpend)}</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Participating spend (annual)</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(tradParticipatingSpend)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-[#D64933]">{formatCurrency(ptParticipatingSpend)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-purple-700">{formatCurrency(deltaParticipatingSpend)}</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Outstanding balance of SCF programme</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(tradOutstandingBalance)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-[#D64933]">{formatCurrency(ptOutstandingBalance)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-purple-700">{formatCurrency(deltaOutstandingBalance)}</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Eligible suppliers</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatNumber(tier1Suppliers)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-[#D64933]">{formatNumber(totalSuppliers)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-purple-700">+{formatNumber(deltaEligibleSuppliers)}</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Active suppliers using SCF</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatNumber(tradTotalActive, 0)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-[#D64933]">{formatNumber(ptTotalActive, 0)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-purple-700">+{formatNumber(deltaActiveSuppliers, 0)}</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Suppliers using SCF instead of cards</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">0</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-[#D64933]">{formatNumber(ptSuppliersFromCards, 0)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-purple-700">+{formatNumber(deltaSuppliersFromCards, 0)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Timing */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Timing (from completion/handover)</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Metric</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Traditional SCF</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-[#D64933]">PrimaTrade</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-purple-700">Delta</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-3 px-4 text-sm">Supplier cash receipt from handover</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatNumber(tradSupplierCashReceipt, 1)} days</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-[#D64933]">{formatNumber(ptSupplierCashReceipt, 1)} days</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-purple-700">{formatNumber(deltaCashReceipt, 1)} days</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Days advanced vs due date</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatNumber(tradDaysAdvanced, 1)} days</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-[#D64933]">{formatNumber(ptDaysAdvanced, 1)} days</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-purple-700">{formatNumber(deltaDaysAdvanced, 1)} days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Economics */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Economics (annualised)</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Metric</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Traditional SCF</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-[#D64933]">PrimaTrade</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-purple-700">Delta</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-green-50">
                        <td className="py-3 px-4 text-sm font-semibold">Buyer direct benefit</td>
                        <td className="py-3 px-4 text-sm text-right font-bold">{formatCurrency(tradBuyerNetBenefit)}</td>
                        <td className="py-3 px-4 text-sm text-right font-bold text-[#D64933]">{formatCurrency(ptBuyerNetBenefit)}</td>
                        <td className="py-3 px-4 text-sm text-right font-bold text-purple-700">{formatCurrency(deltaBuyerBenefit)}</td>
                      </tr>
                      <tr className="bg-blue-50">
                        <td className="py-3 px-4 text-sm font-semibold">Supplier net benefit</td>
                        <td className="py-3 px-4 text-sm text-right font-bold">{formatCurrency(tradSupplierNetBenefit)}</td>
                        <td className="py-3 px-4 text-sm text-right font-bold text-[#D64933]">{formatCurrency(ptSupplierNetBenefit)}</td>
                        <td className="py-3 px-4 text-sm text-right font-bold text-purple-700">{formatCurrency(deltaSupplierBenefit)}</td>
                      </tr>
                      <tr className="bg-[#F08070]/20">
                        <td className="py-3 px-4 text-sm font-bold">Total value created (buyer + suppliers)</td>
                        <td className="py-3 px-4 text-sm text-right font-bold">{formatCurrency(tradTotalValue)}</td>
                        <td className="py-3 px-4 text-sm text-right font-bold text-[#D64933]">{formatCurrency(ptTotalValue)}</td>
                        <td className="py-3 px-4 text-sm text-right font-bold text-purple-700">{formatCurrency(deltaTotalValue)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                {/* Card Benefits Detail for Traditional SCF */}
                {(tradBuyerCardRebate > 0 || tradBuyerCardFreeFunding > 0 || tradScfFundingBenefit > 0) ? (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Traditional SCF Buyer Benefits Breakdown (included above):</h3>
                    <div className="space-y-1 text-sm text-gray-700">
                      <div className="flex justify-between">
                        <span>Early payment discounts received:</span>
                        <span className="font-medium">{formatCurrency(tradActualDiscountTier1 + tradActualDiscountTier2 + tradActualDiscountTier3)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Less: SCF financing costs paid:</span>
                        <span className="font-medium">-{formatCurrency(tradTotalFinancing)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Card rebate from suppliers on cards:</span>
                        <span className="font-medium">{formatCurrency(tradBuyerCardRebate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Card free funding period benefit:</span>
                        <span className="font-medium">{formatCurrency(tradBuyerCardFreeFunding)}</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-300 pt-1 mt-1">
                        <span className="font-semibold">SCF funding benefit (paid by suppliers):</span>
                        <span className="font-semibold">{formatCurrency(tradScfFundingBenefit)}</span>
                      </div>
                    </div>
                  </div>
                ) : null}
                
                {/* PrimaTrade Benefits Detail */}
                {ptScfFundingBenefit > 0 ? (
                  <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">PrimaTrade Buyer Benefits Breakdown (included above):</h3>
                    <div className="space-y-1 text-sm text-gray-700">
                      <div className="flex justify-between">
                        <span>Early payment discounts received:</span>
                        <span className="font-medium">{formatCurrency(ptActualDiscountTier1 + ptActualDiscountTier2 + ptActualDiscountTier3)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Less: SCF financing costs paid:</span>
                        <span className="font-medium">-{formatCurrency(ptTotalFinancing)}</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-300 pt-1 mt-1">
                        <span className="font-semibold">SCF funding benefit (paid by suppliers):</span>
                        <span className="font-semibold">{formatCurrency(ptScfFundingBenefit)}</span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Key Benefits */}
              <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-lg shadow-xl p-6 sm:p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">PrimaTrade Key Benefits</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-lg">Early Invoice Approval (PO Match)</div>
                      <div className="text-red-100">Invoices approved at handover ({ptDaysAfterHandover} days) vs after delivery & processing ({formatNumber(tradSupplierCashReceipt, 1)} days) — saving {formatNumber(ptDaysFaster, 1)} days and enabling automation</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-lg">Supplier Discount Flexibility</div>
                      <div className="text-red-100">PrimaTrade enables early payment discounts that exceed financing costs, diverting card charges to buyer benefit: {formatCurrency(ptBuyerNetBenefit)} annual buyer value vs {formatCurrency(tradBuyerNetBenefit)} in Traditional SCF</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-lg">Self-Digitization & AP Automation (~40% reduction)</div>
                      <div className="text-red-100">Suppliers self-digitize and self-match invoices to POs, delivering major AP workload reduction. Works for all invoice types including services.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-lg">Long Tail Inclusion</div>
                      <div className="text-red-100">All suppliers ({formatNumber(totalSuppliers)} total) can participate vs only {tier1Suppliers} in Traditional SCF — adding {formatNumber(deltaActiveSuppliers, 0)} active suppliers. Eliminates card costs (up to {formatPercent(tier3CardCostPct)}) for suppliers while buyer loses card rebates but gains early payment discounts.</div>
                    </div>
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

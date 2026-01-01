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

  // 1) Company & spend profile
  const [currencySymbol, setCurrencySymbol] = useState(() => loadSavedValue('currencySymbol', '$'));
  const [totalProcurementSpend, setTotalProcurementSpend] = useState(() => loadSavedValue('totalProcurementSpend', 1800));
  
  // 2) Supplier base & concentration
  const [totalSuppliers, setTotalSuppliers] = useState(() => loadSavedValue('totalSuppliers', 8000));
  const [existingScfSuppliers, setExistingScfSuppliers] = useState(() => loadSavedValue('existingScfSuppliers', 50));
  const [idealScfSuppliers, setIdealScfSuppliers] = useState(() => loadSavedValue('idealScfSuppliers', 1000));
  const [existingScfSharePct, setExistingScfSharePct] = useState(() => loadSavedValue('existingScfSharePct', 65));
  const [idealScfSharePct, setIdealScfSharePct] = useState(() => loadSavedValue('idealScfSharePct', 30));
  
  // 3) Baseline AP process & payment timing
  const [delayDomestic, setDelayDomestic] = useState(() => loadSavedValue('delayDomestic', 4));
  const [delayCrossBorder, setDelayCrossBorder] = useState(() => loadSavedValue('delayCrossBorder', 21));
  const [processingTime, setProcessingTime] = useState(() => loadSavedValue('processingTime', 6));
  const [paymentTerms, setPaymentTerms] = useState(() => loadSavedValue('paymentTerms', 60));
  const [crossBorderSharePct, setCrossBorderSharePct] = useState(() => loadSavedValue('crossBorderSharePct', 40));
  
  // 4) Financing assumptions
  const [scfRatePct, setScfRatePct] = useState(() => loadSavedValue('scfRatePct', 7));
  const [longTailCardPayPct, setLongTailCardPayPct] = useState(() => loadSavedValue('longTailCardPayPct', 60));
  const [cardCostPct, setCardCostPct] = useState(() => loadSavedValue('cardCostPct', 3.5));
  const [cardRebatePct, setCardRebatePct] = useState(() => loadSavedValue('cardRebatePct', 1.0));
  const [cardFreeFundingDays, setCardFreeFundingDays] = useState(() => loadSavedValue('cardFreeFundingDays', 20));
  
  // 5) Program-specific inputs - Participation rates
  const [tradExistingScfPartPct, setTradExistingScfPartPct] = useState(() => loadSavedValue('tradExistingScfPartPct', 40));
  const [ptExistingScfPartPct, setPtExistingScfPartPct] = useState(() => loadSavedValue('ptExistingScfPartPct', 40));
  const [ptIdealScfPartPct, setPtIdealScfPartPct] = useState(() => loadSavedValue('ptIdealScfPartPct', 70));
  const [ptLongTailPartPct, setPtLongTailPartPct] = useState(() => loadSavedValue('ptLongTailPartPct', 60));
  
  // Payment timing
  const [tradDaysAfterApproval, setTradDaysAfterApproval] = useState(() => loadSavedValue('tradDaysAfterApproval', 2));
  const [ptDaysAfterHandover, setPtDaysAfterHandover] = useState(() => loadSavedValue('ptDaysAfterHandover', 2));
  
  // Early payment discounts by tier
  const [ptDiscountExistingPct, setPtDiscountExistingPct] = useState(() => loadSavedValue('ptDiscountExistingPct', 0));
  const [ptDiscountIdealPct, setPtDiscountIdealPct] = useState(() => loadSavedValue('ptDiscountIdealPct', 2.5));
  const [ptDiscountLongTailPct, setPtDiscountLongTailPct] = useState(() => loadSavedValue('ptDiscountLongTailPct', 3.5));
  
  // Supplier savings rates by tier
  const [tradSavingsExistingPct, setTradSavingsExistingPct] = useState(() => loadSavedValue('tradSavingsExistingPct', 8));
  const [ptSavingsExistingPct, setPtSavingsExistingPct] = useState(() => loadSavedValue('ptSavingsExistingPct', 10));
  const [tradSavingsIdealPct, setTradSavingsIdealPct] = useState(() => loadSavedValue('tradSavingsIdealPct', 12));
  const [ptSavingsIdealPct, setPtSavingsIdealPct] = useState(() => loadSavedValue('ptSavingsIdealPct', 15));
  const [tradSavingsLongTailPct, setTradSavingsLongTailPct] = useState(() => loadSavedValue('tradSavingsLongTailPct', 15));
  const [ptSavingsLongTailPct, setPtSavingsLongTailPct] = useState(() => loadSavedValue('ptSavingsLongTailPct', 20));

  // Save all values to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const allValues = {
        currencySymbol, totalProcurementSpend,
        totalSuppliers, existingScfSuppliers, idealScfSuppliers, existingScfSharePct, idealScfSharePct,
        delayDomestic, delayCrossBorder, processingTime, paymentTerms, crossBorderSharePct,
        scfRatePct, longTailCardPayPct, cardCostPct, cardRebatePct, cardFreeFundingDays,
        tradExistingScfPartPct, ptExistingScfPartPct, ptIdealScfPartPct, ptLongTailPartPct,
        tradDaysAfterApproval, ptDaysAfterHandover,
        ptDiscountExistingPct, ptDiscountIdealPct, ptDiscountLongTailPct,
        tradSavingsExistingPct, ptSavingsExistingPct, tradSavingsIdealPct, 
        ptSavingsIdealPct, tradSavingsLongTailPct, ptSavingsLongTailPct
      };
      localStorage.setItem('scfComparison', JSON.stringify(allValues));
      
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [currencySymbol, totalProcurementSpend,
      totalSuppliers, existingScfSuppliers, idealScfSuppliers, existingScfSharePct, idealScfSharePct,
      delayDomestic, delayCrossBorder, processingTime, paymentTerms, crossBorderSharePct,
      scfRatePct, longTailCardPayPct, cardCostPct, cardRebatePct, cardFreeFundingDays,
      tradExistingScfPartPct, ptExistingScfPartPct, ptIdealScfPartPct, ptLongTailPartPct,
      tradDaysAfterApproval, ptDaysAfterHandover,
      ptDiscountExistingPct, ptDiscountIdealPct, ptDiscountLongTailPct,
      tradSavingsExistingPct, ptSavingsExistingPct, tradSavingsIdealPct,
      ptSavingsIdealPct, tradSavingsLongTailPct, ptSavingsLongTailPct]);

  const handlePrint = () => {
    window.print();
  };

  // ===== CALCULATIONS =====
  
  const totalSpend = totalProcurementSpend * 1000000;
  const domesticSharePct = 100 - crossBorderSharePct;
  
  // Spend by tier
  const spendExistingScf = totalSpend * (existingScfSharePct / 100);
  const spendIdealScf = totalSpend * (idealScfSharePct / 100);
  const spendLongTail = totalSpend - spendExistingScf - spendIdealScf;
  
  // Average time to approve invoices (weighted)
  const avgApprovalTime = (domesticSharePct / 100) * (delayDomestic + processingTime) + 
                          (crossBorderSharePct / 100) * (delayCrossBorder + processingTime);
  
  // TRADITIONAL SCF CALCULATIONS
  const tradEligibleSpend = spendExistingScf;
  const tradParticipatingSpend = spendExistingScf * (tradExistingScfPartPct / 100);
  const tradSupplierCashReceipt = avgApprovalTime + tradDaysAfterApproval;
  const tradDaysAdvanced = Math.max(0, paymentTerms - tradSupplierCashReceipt);
  
  // Financing costs by tier (Traditional)
  const tradFinancingExisting = tradParticipatingSpend * (scfRatePct / 100) * (tradDaysAdvanced / 365);
  const tradFinancingIdeal = 0;
  const tradFinancingLongTail = 0;
  const tradTotalFinancing = tradFinancingExisting + tradFinancingIdeal + tradFinancingLongTail;
  
  // Discounts by tier (Traditional - all zero)
  const tradDiscountExisting = 0;
  const tradDiscountIdeal = 0;
  const tradDiscountLongTail = 0;
  
  // Actual discount (MAX of financing cost and agreed discount)
  const tradActualDiscountExisting = Math.max(tradFinancingExisting, tradDiscountExisting);
  const tradActualDiscountIdeal = Math.max(tradFinancingIdeal, tradDiscountIdeal);
  const tradActualDiscountLongTail = Math.max(tradFinancingLongTail, tradDiscountLongTail);
  
  // Card costs for long tail (Traditional)
  const tradCardCosts = spendLongTail * (cardCostPct / 100) * (longTailCardPayPct / 100);
  
  // Total supplier costs (Traditional)
  const tradTotalSupplierCosts = tradActualDiscountExisting + tradActualDiscountIdeal + tradActualDiscountLongTail + tradCardCosts;
  
  // Supplier time value benefits (Traditional)
  const tradSupplierBenefitExisting = tradParticipatingSpend * (tradSavingsExistingPct / 100) * (tradDaysAdvanced / 365);
  const tradSupplierBenefitIdeal = 0;
  // Long tail benefit uses MIN function: MIN(participating + on cards, total long tail) * days * rate
  const tradLongTailParticipating = spendLongTail * (0 / 100); // 0% participation
  const tradLongTailOnCards = spendLongTail * (longTailCardPayPct / 100);
  const tradSupplierBenefitLongTail = Math.min(tradLongTailParticipating + tradLongTailOnCards, spendLongTail) * (tradDaysAdvanced / 365) * (tradSavingsLongTailPct / 100);
  const tradTotalSupplierTimeValue = tradSupplierBenefitExisting + tradSupplierBenefitIdeal + tradSupplierBenefitLongTail;
  
  // Supplier net benefit (Traditional)
  const tradSupplierNetBenefit = tradTotalSupplierTimeValue - tradTotalSupplierCosts;
  
  // Buyer card benefits (Traditional)
  const tradBuyerCardRebate = (cardRebatePct / 100) * (longTailCardPayPct / 100) * spendLongTail;
  const tradBuyerCardFreeFunding = (cardFreeFundingDays / 365) * (scfRatePct / 100) * (longTailCardPayPct / 100) * spendLongTail;
  
  // Buyer net benefit (Traditional)
  const tradBuyerNetBenefit = tradActualDiscountExisting + tradActualDiscountIdeal + tradActualDiscountLongTail - 
                              tradTotalFinancing + tradBuyerCardFreeFunding + tradBuyerCardRebate;
  
  // Total value created (Traditional)
  const tradTotalValue = tradSupplierNetBenefit + tradBuyerNetBenefit;
  
  // Active suppliers (Traditional)
  const tradActiveExisting = existingScfSuppliers * (tradExistingScfPartPct / 100);
  const tradActiveIdeal = 0;
  const tradActiveLongTail = 0;
  const tradTotalActive = tradActiveExisting + tradActiveIdeal + tradActiveLongTail;
  
  // Outstanding balance (Traditional)
  const tradOutstandingBalance = (tradDaysAdvanced / 365) * tradParticipatingSpend;
  
  // PRIMATRADE CALCULATIONS
  const ptEligibleSpend = spendExistingScf + spendIdealScf + spendLongTail;
  const ptParticipatingExisting = spendExistingScf * (ptExistingScfPartPct / 100);
  const ptParticipatingIdeal = spendIdealScf * (ptIdealScfPartPct / 100);
  const ptParticipatingLongTail = spendLongTail * (ptLongTailPartPct / 100);
  const ptParticipatingSpend = ptParticipatingExisting + ptParticipatingIdeal + ptParticipatingLongTail;
  
  const ptSupplierCashReceipt = ptDaysAfterHandover;
  const ptDaysAdvanced = Math.max(0, paymentTerms - ptSupplierCashReceipt);
  const ptDaysFaster = tradSupplierCashReceipt - ptSupplierCashReceipt;
  
  // Financing costs by tier (PrimaTrade)
  const ptFinancingExisting = ptParticipatingExisting * (scfRatePct / 100) * (ptDaysAdvanced / 365);
  const ptFinancingIdeal = ptParticipatingIdeal * (scfRatePct / 100) * (ptDaysAdvanced / 365);
  const ptFinancingLongTail = ptParticipatingLongTail * (scfRatePct / 100) * (ptDaysAdvanced / 365);
  const ptTotalFinancing = ptFinancingExisting + ptFinancingIdeal + ptFinancingLongTail;
  
  // Agreed discounts by tier
  const ptDiscountExisting = ptParticipatingExisting * (ptDiscountExistingPct / 100);
  const ptDiscountIdeal = ptParticipatingIdeal * (ptDiscountIdealPct / 100);
  const ptDiscountLongTail = ptParticipatingLongTail * (ptDiscountLongTailPct / 100);
  
  // Actual discount (MAX of financing cost and agreed discount)
  const ptActualDiscountExisting = Math.max(ptFinancingExisting, ptDiscountExisting);
  const ptActualDiscountIdeal = Math.max(ptFinancingIdeal, ptDiscountIdeal);
  const ptActualDiscountLongTail = Math.max(ptFinancingLongTail, ptDiscountLongTail);
  
  // No card costs for PrimaTrade
  const ptCardCosts = 0;
  
  // Total supplier costs (PrimaTrade)
  const ptTotalSupplierCosts = ptActualDiscountExisting + ptActualDiscountIdeal + ptActualDiscountLongTail + ptCardCosts;
  
  // Supplier time value benefits (PrimaTrade)
  const ptSupplierBenefitExisting = ptParticipatingExisting * (ptSavingsExistingPct / 100) * (ptDaysAdvanced / 365);
  const ptSupplierBenefitIdeal = ptParticipatingIdeal * (ptSavingsIdealPct / 100) * (ptDaysAdvanced / 365);
  const ptSupplierBenefitLongTail = ptParticipatingLongTail * (ptSavingsLongTailPct / 100) * (ptDaysAdvanced / 365);
  const ptTotalSupplierTimeValue = ptSupplierBenefitExisting + ptSupplierBenefitIdeal + ptSupplierBenefitLongTail;
  
  // Supplier net benefit (PrimaTrade)
  const ptSupplierNetBenefit = ptTotalSupplierTimeValue - ptTotalSupplierCosts;
  
  // No card benefits for buyer with PrimaTrade
  const ptBuyerCardRebate = 0;
  const ptBuyerCardFreeFunding = 0;
  
  // Buyer net benefit (PrimaTrade)
  const ptBuyerNetBenefit = ptActualDiscountExisting + ptActualDiscountIdeal + ptActualDiscountLongTail - ptTotalFinancing;
  
  // Total value created (PrimaTrade)
  const ptTotalValue = ptSupplierNetBenefit + ptBuyerNetBenefit;
  
  // Active suppliers (PrimaTrade)
  const ptActiveExisting = existingScfSuppliers * (ptExistingScfPartPct / 100);
  const ptActiveIdeal = (idealScfSuppliers - existingScfSuppliers) * (ptIdealScfPartPct / 100);
  const ptActiveLongTail = (totalSuppliers - idealScfSuppliers) * (ptLongTailPartPct / 100);
  const ptTotalActive = ptActiveExisting + ptActiveIdeal + ptActiveLongTail;
  
  // Suppliers switching from cards
  const ptSuppliersFromCards = ptActiveLongTail;
  
  // Outstanding balance (PrimaTrade)
  const ptOutstandingBalance = (ptDaysAdvanced / 365) * ptParticipatingSpend;
  
  // DELTAS
  const deltaEligibleSpend = ptEligibleSpend - tradEligibleSpend;
  const deltaParticipatingSpend = ptParticipatingSpend - tradParticipatingSpend;
  const deltaOutstandingBalance = ptOutstandingBalance - tradOutstandingBalance;
  const deltaEligibleSuppliers = totalSuppliers - existingScfSuppliers;
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

  const renderInput = (label, value, setValue, min, max, step, unit = '', isPercent = false) => (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex items-baseline gap-1">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
            onBlur={(e) => {
              const val = parseFloat(e.target.value) || 0;
              setValue(Math.min(Math.max(val, min), max));
            }}
            className="w-20 text-right px-2 py-1 border border-gray-300 rounded text-sm font-semibold text-[#D64933]"
            step={step}
            min={min}
            max={max}
          />
          <span className="text-sm text-gray-600 w-8">{isPercent ? '%' : unit}</span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(parseFloat(e.target.value))}
        className="slider w-full"
        style={{
          background: `linear-gradient(to right, #F08070 0%, #F08070 ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%)`
        }}
      />
    </div>
  );

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
                  SCF Comparison Calculator
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
                Input Parameters
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
                Comparison Results
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
              {/* Company & Spend Profile */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-[#F08070]" />
                  Company & Spend Profile
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Currency</label>
                      <select
                        value={currencySymbol}
                        onChange={(e) => setCurrencySymbol(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="$">$ USD</option>
                        <option value="€">€ EUR</option>
                        <option value="£">£ GBP</option>
                        <option value="¥">¥ JPY</option>
                      </select>
                    </div>
                    {renderInput('Total Procurement Spend', totalProcurementSpend, setTotalProcurementSpend, 10, 10000, 10, 'MM')}
                  </div>
                </div>
              </div>

              {/* Supplier Base */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-6 h-6 text-[#F08070]" />
                  Supplier Base & Concentration
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {renderInput('Total Number of Suppliers', totalSuppliers, setTotalSuppliers, 100, 50000, 100, 'suppliers')}
                    {renderInput('Current Suppliers in SCF', existingScfSuppliers, setExistingScfSuppliers, 10, 500, 10, 'suppliers')}
                    {renderInput('Ideal Suppliers for SCF (before long tail)', idealScfSuppliers, setIdealScfSuppliers, 100, 5000, 50, 'suppliers')}
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-white to-red-50 rounded-lg p-4 border-2 border-[#F08070]">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Spend Concentration (must sum to 100%)</h3>
                      <div className="space-y-3">
                        {renderInput(`Existing SCF ${existingScfSuppliers} Suppliers' Share`, existingScfSharePct, setExistingScfSharePct, 0, 100, 1, '', true)}
                        {renderInput(`${existingScfSuppliers}-${idealScfSuppliers} Suppliers' Share`, idealScfSharePct, setIdealScfSharePct, 0, 100, 1, '', true)}
                        <div className="pt-2 border-t border-gray-200">
                          <div className="flex justify-between items-baseline mb-2">
                            <label className="text-sm font-medium text-gray-700">Long Tail Share (auto-calculated)</label>
                            <span className={`text-sm font-semibold ${(100 - existingScfSharePct - idealScfSharePct) >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
                              {(100 - existingScfSharePct - idealScfSharePct).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        {(existingScfSharePct + idealScfSharePct) > 100 && (
                          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-700 font-medium">
                              ⚠️ Error: Total exceeds 100%. Please adjust the sliders above so the Long Tail share is 0% or positive.
                            </p>
                          </div>
                        )}
                        {(existingScfSharePct + idealScfSharePct) <= 100 && (
                          <div className={`text-right text-sm font-semibold ${Math.abs(existingScfSharePct + idealScfSharePct + (100 - existingScfSharePct - idealScfSharePct) - 100) < 0.1 ? 'text-green-600' : 'text-red-600'}`}>
                            Total: {(existingScfSharePct + idealScfSharePct + (100 - existingScfSharePct - idealScfSharePct)).toFixed(1)}%
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AP Process & Timing */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-[#F08070]" />
                  AP Process & Payment Timing
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700">Delay from Handover to Delivery</h3>
                    {renderInput('Domestic & Services', delayDomestic, setDelayDomestic, 0, 30, 1, 'days')}
                    {renderInput('Cross-Border', delayCrossBorder, setDelayCrossBorder, 0, 60, 1, 'days')}
                    {renderInput('Delivery to Approval Processing Time', processingTime, setProcessingTime, 0, 30, 1, 'days')}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700">Payment Terms</h3>
                    {renderInput('Standard Payment Terms (from invoice)', paymentTerms, setPaymentTerms, 0, 120, 5, 'days')}
                    {renderInput('Cross-Border Share (excl. services)', crossBorderSharePct, setCrossBorderSharePct, 0, 100, 5, '', true)}
                    <div className="text-sm text-gray-600 mt-2">
                      Domestic & services share: {(100 - crossBorderSharePct).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Financing Assumptions */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-[#F08070]" />
                  Financing Assumptions
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700">SCF Funding</h3>
                    {renderInput('SCF Funding Rate', scfRatePct, setScfRatePct, 0, 20, 0.1, '', true)}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700">Card Programme (Long Tail)</h3>
                    {renderInput('Long Tail on Cards Today', longTailCardPayPct, setLongTailCardPayPct, 0, 100, 5, '', true)}
                    {renderInput('Card Cost Rate (for suppliers)', cardCostPct, setCardCostPct, 0, 10, 0.1, '', true)}
                    {renderInput('Card Rebate (for buyer)', cardRebatePct, setCardRebatePct, 0, 5, 0.1, '', true)}
                    {renderInput('Free Funding Period (for buyer)', cardFreeFundingDays, setCardFreeFundingDays, 0, 60, 1, 'days')}
                  </div>
                </div>
              </div>

              {/* Program Parameters - Participation */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-[#F08070]" />
                  Programme Participation Rates
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Existing SCF {existingScfSuppliers}</h3>
                    {renderInput('Traditional SCF', tradExistingScfPartPct, setTradExistingScfPartPct, 0, 100, 5, '', true)}
                    {renderInput('PrimaTrade', ptExistingScfPartPct, setPtExistingScfPartPct, 0, 100, 5, '', true)}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">{existingScfSuppliers}-{idealScfSuppliers} Tier</h3>
                    <div className="text-sm text-gray-500 mb-2">Traditional: 0% (not eligible)</div>
                    {renderInput('PrimaTrade', ptIdealScfPartPct, setPtIdealScfPartPct, 0, 100, 5, '', true)}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Long Tail</h3>
                    <div className="text-sm text-gray-500 mb-2">Traditional: 0% (not eligible)</div>
                    {renderInput('PrimaTrade', ptLongTailPartPct, setPtLongTailPartPct, 0, 100, 5, '', true)}
                  </div>
                </div>
              </div>

              {/* Program Parameters - Timing & Discounts */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Timing & Early Payment Discounts</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Payment Timing</h3>
                    {renderInput('Traditional: Days After Approval', tradDaysAfterApproval, setTradDaysAfterApproval, 0, 10, 1, 'days')}
                    {renderInput('PrimaTrade: Days After Handover', ptDaysAfterHandover, setPtDaysAfterHandover, 0, 10, 1, 'days')}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">PrimaTrade Early Payment Discounts</h3>
                    {renderInput(`Existing SCF ${existingScfSuppliers}`, ptDiscountExistingPct, setPtDiscountExistingPct, 0, 10, 0.1, '', true)}
                    {renderInput(`${existingScfSuppliers}-${idealScfSuppliers} Tier`, ptDiscountIdealPct, setPtDiscountIdealPct, 0, 10, 0.1, '', true)}
                    {renderInput('Long Tail', ptDiscountLongTailPct, setPtDiscountLongTailPct, 0, 10, 0.1, '', true)}
                  </div>
                </div>
              </div>

              {/* Supplier Savings Rates */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Supplier Savings from Early Payment (Annual Rate)</h2>
                <p className="text-sm text-gray-600 mb-4">What suppliers save by being paid early (their cost of capital)</p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Existing SCF {existingScfSuppliers}</h3>
                    {renderInput('Traditional SCF', tradSavingsExistingPct, setTradSavingsExistingPct, 0, 30, 0.5, '', true)}
                    {renderInput('PrimaTrade', ptSavingsExistingPct, setPtSavingsExistingPct, 0, 30, 0.5, '', true)}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">{existingScfSuppliers}-{idealScfSuppliers} Tier</h3>
                    {renderInput('Traditional SCF', tradSavingsIdealPct, setTradSavingsIdealPct, 0, 30, 0.5, '', true)}
                    {renderInput('PrimaTrade', ptSavingsIdealPct, setPtSavingsIdealPct, 0, 30, 0.5, '', true)}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Long Tail</h3>
                    {renderInput('Traditional SCF', tradSavingsLongTailPct, setTradSavingsLongTailPct, 0, 30, 0.5, '', true)}
                    {renderInput('PrimaTrade', ptSavingsLongTailPct, setPtSavingsLongTailPct, 0, 30, 0.5, '', true)}
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
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatNumber(existingScfSuppliers)}</td>
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
                {tradBuyerCardRebate > 0 || tradBuyerCardFreeFunding > 0 ? (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Traditional SCF Card Benefits (included in buyer benefit above):</h3>
                    <div className="space-y-1 text-sm text-gray-700">
                      <div className="flex justify-between">
                        <span>Card rebate from suppliers on cards:</span>
                        <span className="font-medium">{formatCurrency(tradBuyerCardRebate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Free funding period benefit:</span>
                        <span className="font-medium">{formatCurrency(tradBuyerCardFreeFunding)}</span>
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
                      <div className="text-red-100">All suppliers ({formatNumber(totalSuppliers)} total) can participate vs only {existingScfSuppliers} in Traditional SCF — adding {formatNumber(deltaActiveSuppliers, 0)} active suppliers. Eliminates card costs (up to {formatPercent(cardCostPct)}) for suppliers while buyer loses card rebates but gains early payment discounts.</div>
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

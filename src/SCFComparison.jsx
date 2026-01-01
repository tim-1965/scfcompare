import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, BarChart3, Calculator, Users, Clock, Printer, ArrowRight } from 'lucide-react';

export default function SCFComparison() {
  const [activeView, setActiveView] = useState('inputs'); // 'inputs' or 'comparison'
  const [showSaved, setShowSaved] = useState(false);

  // Load saved values from localStorage
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
  const [goodsPct, setGoodsPct] = useState(() => loadSavedValue('goodsPct', 75));
  const [servicesPct, setServicesPct] = useState(() => loadSavedValue('servicesPct', 20));
  const [tailSpendPct, setTailSpendPct] = useState(() => loadSavedValue('tailSpendPct', 5));
  
  // 2) Supplier base & concentration
  const [totalSuppliers, setTotalSuppliers] = useState(() => loadSavedValue('totalSuppliers', 8000));
  const [top50SharePct, setTop50SharePct] = useState(() => loadSavedValue('top50SharePct', 65));
  const [avgInvoiceTop10, setAvgInvoiceTop10] = useState(() => loadSavedValue('avgInvoiceTop10', 400000));
  const [avgInvoice11to50, setAvgInvoice11to50] = useState(() => loadSavedValue('avgInvoice11to50', 80000));
  const [avgInvoiceLongTail, setAvgInvoiceLongTail] = useState(() => loadSavedValue('avgInvoiceLongTail', 3000));
  
  // 3) Baseline AP process & payment timing
  const [delayDomestic, setDelayDomestic] = useState(() => loadSavedValue('delayDomestic', 4));
  const [delayCrossBorder, setDelayCrossBorder] = useState(() => loadSavedValue('delayCrossBorder', 21));
  const [processingTime, setProcessingTime] = useState(() => loadSavedValue('processingTime', 6));
  const [paymentTerms, setPaymentTerms] = useState(() => loadSavedValue('paymentTerms', 60));
  const [domesticSharePct, setDomesticSharePct] = useState(() => loadSavedValue('domesticSharePct', 60));
  const [crossBorderSharePct, setCrossBorderSharePct] = useState(() => loadSavedValue('crossBorderSharePct', 40));
  
  // 4) Financing assumptions
  const [buyerCostOfFundsPct, setBuyerCostOfFundsPct] = useState(() => loadSavedValue('buyerCostOfFundsPct', 8));
  const [tradScfRatePct, setTradScfRatePct] = useState(() => loadSavedValue('tradScfRatePct', 7));
  const [ptScfRatePct, setPtScfRatePct] = useState(() => loadSavedValue('ptScfRatePct', 6.5));
  const [supplierCostOfCapitalPct, setSupplierCostOfCapitalPct] = useState(() => loadSavedValue('supplierCostOfCapitalPct', 18));
  
  // 5) Card programme assumptions
  const [longTailCardPayPct, setLongTailCardPayPct] = useState(() => loadSavedValue('longTailCardPayPct', 60));
  const [cardCostPct, setCardCostPct] = useState(() => loadSavedValue('cardCostPct', 3.5));
  
  // 6) Program-specific inputs
  const [tradEligibleSuppliers, setTradEligibleSuppliers] = useState(() => loadSavedValue('tradEligibleSuppliers', 50));
  const [top50ParticipationPct, setTop50ParticipationPct] = useState(() => loadSavedValue('top50ParticipationPct', 70));
  const [ptLongTailParticipationPct, setPtLongTailParticipationPct] = useState(() => loadSavedValue('ptLongTailParticipationPct', 60));
  const [tradDaysAfterApproval, setTradDaysAfterApproval] = useState(() => loadSavedValue('tradDaysAfterApproval', 2));
  const [ptDaysAfterHandover, setPtDaysAfterHandover] = useState(() => loadSavedValue('ptDaysAfterHandover', 2));
  const [ptEarlyPaymentDiscountPct, setPtEarlyPaymentDiscountPct] = useState(() => loadSavedValue('ptEarlyPaymentDiscountPct', 3.3));
  const [ptCardCostCapturePct, setPtCardCostCapturePct] = useState(() => loadSavedValue('ptCardCostCapturePct', 70));

  // Save all values to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const allValues = {
        currencySymbol, totalProcurementSpend, goodsPct, servicesPct, tailSpendPct,
        totalSuppliers, top50SharePct, avgInvoiceTop10, avgInvoice11to50, avgInvoiceLongTail,
        delayDomestic, delayCrossBorder, processingTime, paymentTerms, domesticSharePct, crossBorderSharePct,
        buyerCostOfFundsPct, tradScfRatePct, ptScfRatePct, supplierCostOfCapitalPct,
        longTailCardPayPct, cardCostPct,
        tradEligibleSuppliers, top50ParticipationPct, ptLongTailParticipationPct,
        tradDaysAfterApproval, ptDaysAfterHandover, ptEarlyPaymentDiscountPct, ptCardCostCapturePct
      };
      localStorage.setItem('scfComparison', JSON.stringify(allValues));
      
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [currencySymbol, totalProcurementSpend, goodsPct, servicesPct, tailSpendPct,
      totalSuppliers, top50SharePct, avgInvoiceTop10, avgInvoice11to50, avgInvoiceLongTail,
      delayDomestic, delayCrossBorder, processingTime, paymentTerms, domesticSharePct, crossBorderSharePct,
      buyerCostOfFundsPct, tradScfRatePct, ptScfRatePct, supplierCostOfCapitalPct,
      longTailCardPayPct, cardCostPct,
      tradEligibleSuppliers, top50ParticipationPct, ptLongTailParticipationPct,
      tradDaysAfterApproval, ptDaysAfterHandover, ptEarlyPaymentDiscountPct, ptCardCostCapturePct]);

  // Print handler
  const handlePrint = () => {
    window.print();
  };

  // ===== CALCULATIONS =====
  
  // Convert to actual currency values
  const totalSpend = totalProcurementSpend * 1000000;
  const goodsSpend = totalSpend * (goodsPct / 100);
  const servicesSpend = totalSpend * (servicesPct / 100);
  const tailSpend = totalSpend * (tailSpendPct / 100);
  
  // Supplier tiers
  const longTailSuppliers = Math.max(0, totalSuppliers - 50);
  const top50Spend = totalSpend * (top50SharePct / 100);
  const longTailSpend = totalSpend * (1 - top50SharePct / 100);
  
  // Invoice volumes
  const invoicesTop50 = avgInvoice11to50 > 0 ? top50Spend / avgInvoice11to50 : 0;
  const invoicesLongTail = avgInvoiceLongTail > 0 ? longTailSpend / avgInvoiceLongTail : 0;
  const totalInvoices = invoicesTop50 + invoicesLongTail;
  
  // Weighted average delay from handover to delivery
  const weightedDelay = (delayDomestic * domesticSharePct + delayCrossBorder * crossBorderSharePct) / 100;
  
  // TRADITIONAL SCF
  const tradParticipatingSpend = top50Spend * (top50ParticipationPct / 100);
  const tradParticipatingInvoices = invoicesTop50 * (top50ParticipationPct / 100);
  const tradParticipatingSuppliers = tradEligibleSuppliers * (top50ParticipationPct / 100);
  const tradSupplierCashReceipt = weightedDelay + processingTime + tradDaysAfterApproval;
  const tradDaysAdvanced = Math.max(0, paymentTerms - tradSupplierCashReceipt);
  const tradScfFinancingCost = tradParticipatingSpend * (tradScfRatePct / 100) * (tradDaysAdvanced / 365);
  const tradEarlyPaymentDiscount = 0; // Traditional SCF doesn't support discounts
  const tradBuyerNetBenefit = tradEarlyPaymentDiscount - tradScfFinancingCost;
  const tradSupplierTimeValue = tradParticipatingSpend * (supplierCostOfCapitalPct / 100) * (tradDaysAdvanced / 365);
  const tradSupplierCardSavings = 0;
  const tradSupplierNetBenefit = tradSupplierTimeValue - tradScfFinancingCost - tradEarlyPaymentDiscount;
  const tradTotalValue = tradBuyerNetBenefit + tradSupplierNetBenefit;
  
  // PRIMATRADE
  const ptTop50PartSpend = top50Spend * (top50ParticipationPct / 100);
  const ptLongTailPartSpend = longTailSpend * (ptLongTailParticipationPct / 100);
  const ptParticipatingSpend = ptTop50PartSpend + ptLongTailPartSpend;
  const ptTop50PartInvoices = invoicesTop50 * (top50ParticipationPct / 100);
  const ptLongTailPartInvoices = invoicesLongTail * (ptLongTailParticipationPct / 100);
  const ptParticipatingInvoices = ptTop50PartInvoices + ptLongTailPartInvoices;
  const ptParticipatingSuppliers = 50 * (top50ParticipationPct / 100) + longTailSuppliers * (ptLongTailParticipationPct / 100);
  const ptSupplierCashReceipt = ptDaysAfterHandover;
  const ptDaysAdvanced = Math.max(0, paymentTerms - ptSupplierCashReceipt);
  const ptDaysFasterVsTrad = tradSupplierCashReceipt - ptSupplierCashReceipt;
  const ptScfFinancingCost = ptParticipatingSpend * (ptScfRatePct / 100) * (ptDaysAdvanced / 365);
  const ptEarlyPaymentDiscount = ptParticipatingSpend * (ptEarlyPaymentDiscountPct / 100);
  const ptBuyerNetBenefit = ptEarlyPaymentDiscount - ptScfFinancingCost;
  const ptSupplierTimeValue = ptParticipatingSpend * (supplierCostOfCapitalPct / 100) * (ptDaysAdvanced / 365);
  const ptSupplierCardSavings = (ptLongTailPartSpend) * (longTailCardPayPct / 100) * (cardCostPct / 100) * (ptCardCostCapturePct / 100);
  const ptSupplierNetBenefit = ptSupplierTimeValue - ptEarlyPaymentDiscount + ptSupplierCardSavings;
  const ptTotalValue = ptBuyerNetBenefit + ptSupplierNetBenefit;
  
  // Deltas
  const deltaParticipatingSpend = ptParticipatingSpend - tradParticipatingSpend;
  const deltaSuppliers = ptParticipatingSuppliers - tradParticipatingSuppliers;
  const deltaInvoices = ptParticipatingInvoices - tradParticipatingInvoices;
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
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-white to-red-50 rounded-lg p-4 border-2 border-[#F08070]">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Spend Breakdown (must sum to 100%)</h3>
                      <div className="space-y-3">
                        {renderInput('Goods (for resale)', goodsPct, setGoodsPct, 0, 100, 1, '', true)}
                        {renderInput('Services', servicesPct, setServicesPct, 0, 100, 1, '', true)}
                        {renderInput('Tail / Incidental', tailSpendPct, setTailSpendPct, 0, 100, 1, '', true)}
                        <div className={`text-right text-sm font-semibold ${Math.abs(goodsPct + servicesPct + tailSpendPct - 100) < 0.1 ? 'text-green-600' : 'text-red-600'}`}>
                          Total: {(goodsPct + servicesPct + tailSpendPct).toFixed(1)}%
                        </div>
                      </div>
                    </div>
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
                    {renderInput('Top 50 Suppliers Share of Spend', top50SharePct, setTop50SharePct, 0, 100, 1, '', true)}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700">Average Invoice Values (for volume estimation)</h3>
                    {renderInput('Top 10 Suppliers', avgInvoiceTop10, setAvgInvoiceTop10, 1000, 2000000, 1000, currencySymbol)}
                    {renderInput('Suppliers 11-50', avgInvoice11to50, setAvgInvoice11to50, 1000, 500000, 1000, currencySymbol)}
                    {renderInput('Long Tail Suppliers', avgInvoiceLongTail, setAvgInvoiceLongTail, 100, 50000, 100, currencySymbol)}
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
                    {renderInput('Processing Time (Delivery to Approval)', processingTime, setProcessingTime, 0, 30, 1, 'days')}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700">Payment Terms & Mix</h3>
                    {renderInput('Standard Payment Terms', paymentTerms, setPaymentTerms, 0, 120, 5, 'days')}
                    <div className="bg-gradient-to-br from-white to-red-50 rounded-lg p-4 border-2 border-[#F08070]">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Spend Mix (must sum to 100%)</h3>
                      <div className="space-y-3">
                        {renderInput('Domestic Share', domesticSharePct, setDomesticSharePct, 0, 100, 1, '', true)}
                        {renderInput('Cross-Border Share', crossBorderSharePct, setCrossBorderSharePct, 0, 100, 1, '', true)}
                        <div className={`text-right text-sm font-semibold ${Math.abs(domesticSharePct + crossBorderSharePct - 100) < 0.1 ? 'text-green-600' : 'text-red-600'}`}>
                          Total: {(domesticSharePct + crossBorderSharePct).toFixed(1)}%
                        </div>
                      </div>
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
                    {renderInput('Buyer Cost of Funds / WACC', buyerCostOfFundsPct, setBuyerCostOfFundsPct, 0, 20, 0.1, '', true)}
                    {renderInput('Traditional SCF Funder Rate', tradScfRatePct, setTradScfRatePct, 0, 20, 0.1, '', true)}
                    {renderInput('PrimaTrade Blended Funder Rate', ptScfRatePct, setPtScfRatePct, 0, 20, 0.1, '', true)}
                  </div>
                  <div className="space-y-4">
                    {renderInput('Supplier Cost of Capital', supplierCostOfCapitalPct, setSupplierCostOfCapitalPct, 0, 30, 0.5, '', true)}
                    {renderInput('Long Tail on Cards Today', longTailCardPayPct, setLongTailCardPayPct, 0, 100, 5, '', true)}
                    {renderInput('Card Programme Cost Rate', cardCostPct, setCardCostPct, 0, 10, 0.1, '', true)}
                  </div>
                </div>
              </div>

              {/* Program-Specific Inputs */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-[#F08070]" />
                  Program-Specific Parameters
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Traditional SCF</h3>
                    {renderInput('Eligible Suppliers (typically 20/30/50)', tradEligibleSuppliers, setTradEligibleSuppliers, 10, 100, 5, 'suppliers')}
                    {renderInput('Days After Approval to Payment', tradDaysAfterApproval, setTradDaysAfterApproval, 0, 10, 1, 'days')}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">PrimaTrade</h3>
                    {renderInput('Days After Handover to Payment', ptDaysAfterHandover, setPtDaysAfterHandover, 0, 10, 1, 'days')}
                    {renderInput('Early Payment Discount %', ptEarlyPaymentDiscountPct, setPtEarlyPaymentDiscountPct, 0, 10, 0.1, '', true)}
                    {renderInput('Share of Card Cost Captured', ptCardCostCapturePct, setPtCardCostCapturePct, 0, 100, 5, '', true)}
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4">Participation Rates</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      {renderInput('Top 50 Suppliers Participation', top50ParticipationPct, setTop50ParticipationPct, 0, 100, 5, '', true)}
                    </div>
                    <div>
                      {renderInput('Long Tail Suppliers Participation (PT only)', ptLongTailParticipationPct, setPtLongTailParticipationPct, 0, 100, 5, '', true)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Panel 2: Comparison Results */}
          {activeView === 'comparison' && (
            <div data-panel="comparison" className="space-y-6">
              {/* Headline Comparison */}
              <div className="bg-gradient-to-r from-[#D64933] to-[#F08070] rounded-lg shadow-xl p-6 text-white">
                <h2 className="text-2xl font-bold mb-6">Headline Comparison</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-red-100 text-sm mb-2">Participating Spend</div>
                    <div className="text-3xl font-bold mb-1">{formatCurrency(deltaParticipatingSpend)}</div>
                    <div className="text-red-100 text-sm">Additional spend (PT vs Trad)</div>
                  </div>
                  <div>
                    <div className="text-red-100 text-sm mb-2">Supplier Inclusion</div>
                    <div className="text-3xl font-bold mb-1">+{formatNumber(deltaSuppliers, 0)}</div>
                    <div className="text-red-100 text-sm">More suppliers included</div>
                  </div>
                  <div>
                    <div className="text-red-100 text-sm mb-2">Days Faster Payment</div>
                    <div className="text-3xl font-bold mb-1">{formatNumber(ptDaysFasterVsTrad, 0)}</div>
                    <div className="text-red-100 text-sm">Days earlier vs Traditional</div>
                  </div>
                </div>
              </div>

              {/* Detailed Metrics Table */}
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
                        <td className="py-3 px-4 text-sm">Eligible suppliers</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatNumber(tradEligibleSuppliers)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-[#D64933]">{formatNumber(totalSuppliers)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-purple-700">+{formatNumber(totalSuppliers - tradEligibleSuppliers)}</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Participating suppliers</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatNumber(tradParticipatingSuppliers, 0)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-[#D64933]">{formatNumber(ptParticipatingSuppliers, 0)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-purple-700">+{formatNumber(deltaSuppliers, 0)}</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Participating spend (annual)</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(tradParticipatingSpend)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-[#D64933]">{formatCurrency(ptParticipatingSpend)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-purple-700">{formatCurrency(deltaParticipatingSpend)}</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Participating invoices (annual)</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatNumber(tradParticipatingInvoices, 0)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-[#D64933]">{formatNumber(ptParticipatingInvoices, 0)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-purple-700">+{formatNumber(deltaInvoices, 0)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Timing Comparison */}
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
                        <td className="py-3 px-4 text-sm">Due date from invoice</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{paymentTerms} days</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-[#D64933]">{paymentTerms} days</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-purple-700">0 days</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Days advanced vs due date</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatNumber(tradDaysAdvanced, 1)} days</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-[#D64933]">{formatNumber(ptDaysAdvanced, 1)} days</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-purple-700">{formatNumber(deltaDaysAdvanced, 1)} days</td>
                      </tr>
                      <tr className="bg-green-50">
                        <td className="py-3 px-4 text-sm font-semibold">Days faster vs Traditional SCF</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">—</td>
                        <td className="py-3 px-4 text-sm text-right font-bold text-[#D64933]">{formatNumber(ptDaysFasterVsTrad, 1)} days</td>
                        <td className="py-3 px-4 text-sm text-right font-medium"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Economics Comparison */}
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
                      <tr>
                        <td className="py-3 px-4 text-sm">Supplier SCF financing cost</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(tradScfFinancingCost)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-[#D64933]">{formatCurrency(ptScfFinancingCost)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-purple-700">{formatCurrency(ptScfFinancingCost - tradScfFinancingCost)}</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Early payment discount (gross)</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(tradEarlyPaymentDiscount)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-[#D64933]">{formatCurrency(ptEarlyPaymentDiscount)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-purple-700">{formatCurrency(ptEarlyPaymentDiscount - tradEarlyPaymentDiscount)}</td>
                      </tr>
                      <tr className="bg-green-50">
                        <td className="py-3 px-4 text-sm font-semibold">Buyer net benefit</td>
                        <td className="py-3 px-4 text-sm text-right font-bold">{formatCurrency(tradBuyerNetBenefit)}</td>
                        <td className="py-3 px-4 text-sm text-right font-bold text-[#D64933]">{formatCurrency(ptBuyerNetBenefit)}</td>
                        <td className="py-3 px-4 text-sm text-right font-bold text-purple-700">{formatCurrency(deltaBuyerBenefit)}</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Supplier time-value benefit</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(tradSupplierTimeValue)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-[#D64933]">{formatCurrency(ptSupplierTimeValue)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-purple-700">{formatCurrency(ptSupplierTimeValue - tradSupplierTimeValue)}</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Supplier card processing costs saved</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(tradSupplierCardSavings)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-[#D64933]">{formatCurrency(ptSupplierCardSavings)}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-purple-700">{formatCurrency(ptSupplierCardSavings - tradSupplierCardSavings)}</td>
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
              </div>

              {/* Key Benefits Summary */}
              <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-lg shadow-xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">PrimaTrade Advantage Summary</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <ArrowRight className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-lg">Early Invoice Approval</div>
                      <div className="text-red-100">Invoices approved at handover ({ptDaysAfterHandover} days) vs. after delivery & processing ({formatNumber(tradSupplierCashReceipt, 1)} days) — saving {formatNumber(ptDaysFasterVsTrad, 1)} days</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ArrowRight className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-lg">Supplier Discount Flexibility</div>
                      <div className="text-red-100">PrimaTrade enables {formatPercent(ptEarlyPaymentDiscountPct)} discounts that exceed financing costs, creating {formatCurrency(ptBuyerNetBenefit)} buyer value</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ArrowRight className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-lg">Long Tail Inclusion</div>
                      <div className="text-red-100">All suppliers ({formatNumber(totalSuppliers)} total) can participate vs. only {tradEligibleSuppliers} in Traditional SCF — adding {formatNumber(deltaSuppliers, 0)} suppliers</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ArrowRight className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-lg">Card Cost Savings</div>
                      <div className="text-red-100">Long tail suppliers save {formatCurrency(ptSupplierCardSavings)} in card processing fees through automated self-digitization</div>
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

import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, BarChart3, Calculator, FileText, Save, Check, Printer, Info } from 'lucide-react';

export default function TradeSimulator() {
  const [activeView, setActiveView] = useState('inputs'); // 'inputs' or 'simulation'
  
  // Auto-save indicator
  const [showSaved, setShowSaved] = useState(false);

  // Load saved values from localStorage
  const loadSavedValue = (key, defaultValue) => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tradeSimulator');
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

  // 1) Company & trade volume
  const [currencySymbol, setCurrencySymbol] = useState(() => loadSavedValue('currencySymbol', '$'));
  const [annualVolumeMM, setAnnualVolumeMM] = useState(() => loadSavedValue('annualVolumeMM', 200));
  const [digitisationPct, setDigitisationPct] = useState(() => loadSavedValue('digitisationPct', 100));
  
  // Convert millions to actual value for calculations
  const annualVolume = annualVolumeMM * 1000000;

  // 2) Early payment discounts & working capital
  const [currentPaymentTerms, setCurrentPaymentTerms] = useState(() => loadSavedValue('currentPaymentTerms', 60));
  const [termExtension, setTermExtension] = useState(() => loadSavedValue('termExtension', 30));
  const [supplierUptakePct, setSupplierUptakePct] = useState(() => loadSavedValue('supplierUptakePct', 65));
  const [earlyPaymentDiscount, setEarlyPaymentDiscount] = useState(() => loadSavedValue('earlyPaymentDiscount', 3.5));
  const [daysToPayment, setDaysToPayment] = useState(() => loadSavedValue('daysToPayment', 7));
  const [bankFundedPct, setBankFundedPct] = useState(() => loadSavedValue('bankFundedPct', 60));
  const [scfRate, setScfRate] = useState(() => loadSavedValue('scfRate', 6.5));
  const [internalCostOfFunds, setInternalCostOfFunds] = useState(() => loadSavedValue('internalCostOfFunds', 4.0));
  const [wcInterestRate, setWcInterestRate] = useState(() => loadSavedValue('wcInterestRate', 6.0));

  // 3) AP headcount efficiency
  const [apHeadcount, setApHeadcount] = useState(() => loadSavedValue('apHeadcount', 15));
  const [apCostPerFte, setApCostPerFte] = useState(() => loadSavedValue('apCostPerFte', 50000));
  const [apEfficiencyPct, setApEfficiencyPct] = useState(() => loadSavedValue('apEfficiencyPct', 40));

  // 4) Customs & trade compliance benefits
  const [customsFilings, setCustomsFilings] = useState(() => loadSavedValue('customsFilings', 100));
  const [brokerFeePerFiling, setBrokerFeePerFiling] = useState(() => loadSavedValue('brokerFeePerFiling', 55));
  const [selfFilingPct, setSelfFilingPct] = useState(() => loadSavedValue('selfFilingPct', 90));
  const [shipmentsWithFees, setShipmentsWithFees] = useState(() => loadSavedValue('shipmentsWithFees', 300));
  const [forwarderFeePerShipment, setForwarderFeePerShipment] = useState(() => loadSavedValue('forwarderFeePerShipment', 20));
  const [docFeesEliminatedPct, setDocFeesEliminatedPct] = useState(() => loadSavedValue('docFeesEliminatedPct', 35));
  const [tradeComplianceHeadcount, setTradeComplianceHeadcount] = useState(() => loadSavedValue('tradeComplianceHeadcount', 8));
  const [tradeCostPerFte, setTradeCostPerFte] = useState(() => loadSavedValue('tradeCostPerFte', 50000));
  const [tradeEfficiencyPct, setTradeEfficiencyPct] = useState(() => loadSavedValue('tradeEfficiencyPct', 40));

  // Simulation inputs (for historic values)
  const [turnover, setTurnover] = useState(() => loadSavedValue('turnover', 1000000000));
  const [costOfSales, setCostOfSales] = useState(() => loadSavedValue('costOfSales', 700000000));
  const [operatingProfit, setOperatingProfit] = useState(() => loadSavedValue('operatingProfit', 40000000));
  const [netInterest, setNetInterest] = useState(() => loadSavedValue('netInterest', 50000000));
  const [ebitda, setEbitda] = useState(() => loadSavedValue('ebitda', 120000000));
  const [tradePayables, setTradePayables] = useState(() => loadSavedValue('tradePayables', 100000000));
  const [netDebt, setNetDebt] = useState(() => loadSavedValue('netDebt', 500000000));
  const [equity, setEquity] = useState(() => loadSavedValue('equity', 200000000));
  const [freeCashFlow, setFreeCashFlow] = useState(() => loadSavedValue('freeCashFlow', 30000000));

  // Save all values to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const allValues = {
        currencySymbol, annualVolumeMM, digitisationPct,
        currentPaymentTerms, termExtension, supplierUptakePct, earlyPaymentDiscount, 
        daysToPayment, bankFundedPct, scfRate, internalCostOfFunds, wcInterestRate,
        apHeadcount, apCostPerFte, apEfficiencyPct,
        customsFilings, brokerFeePerFiling, selfFilingPct, shipmentsWithFees, 
        forwarderFeePerShipment, docFeesEliminatedPct, tradeComplianceHeadcount, 
        tradeCostPerFte, tradeEfficiencyPct,
        turnover, costOfSales, operatingProfit, netInterest, ebitda,
        tradePayables, netDebt, equity, freeCashFlow
      };
      localStorage.setItem('tradeSimulator', JSON.stringify(allValues));
      
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [currencySymbol, annualVolumeMM, digitisationPct, currentPaymentTerms, termExtension, supplierUptakePct, 
      earlyPaymentDiscount, daysToPayment, bankFundedPct, scfRate, internalCostOfFunds, wcInterestRate,
      apHeadcount, apCostPerFte, apEfficiencyPct, customsFilings, brokerFeePerFiling, 
      selfFilingPct, shipmentsWithFees, forwarderFeePerShipment, docFeesEliminatedPct, 
      tradeComplianceHeadcount, tradeCostPerFte, tradeEfficiencyPct,
      turnover, costOfSales, operatingProfit, netInterest, ebitda, tradePayables, 
      netDebt, equity, freeCashFlow]);

  // Print handler
  const handlePrint = () => {
    window.print();
  };

  // ===== CALCULATIONS =====
  
  // Volume being digitised
  const digitisedVolume = annualVolume * (digitisationPct / 100);

  // Early payment calculations
  const daysAccelerated = currentPaymentTerms + termExtension - daysToPayment;
  const participatingSpend = digitisedVolume * (supplierUptakePct / 100);
  const discountValue = participatingSpend * (earlyPaymentDiscount / 100);
  
  // Funding costs
  const bankFundedAmount = participatingSpend * (bankFundedPct / 100);
  const internalFundedAmount = participatingSpend * (1 - bankFundedPct / 100);
  const bankFundingCost = bankFundedAmount * (scfRate / 100) * (daysAccelerated / 365);
  const internalFundingCost = internalFundedAmount * (internalCostOfFunds / 100) * (daysAccelerated / 365);
  
  // Net discount benefit
  const netDiscountBenefit = discountValue - bankFundingCost - internalFundingCost;

  // Working capital calculations
  const termExtensionDays = termExtension;
  const wcFromExtension = digitisedVolume * (termExtensionDays / 365);
  const wcUsedForEarlyPay = internalFundedAmount * (daysAccelerated / 365);
  const netWorkingCapital = wcFromExtension - wcUsedForEarlyPay;
  const wcAnnualValue = netWorkingCapital * (wcInterestRate / 100);

  // AP efficiency
  const apFteSaved = apHeadcount * (apEfficiencyPct / 100);
  const apSavings = apFteSaved * apCostPerFte;

  // Customs efficiency
  const brokerSavings = customsFilings * 12 * brokerFeePerFiling * (selfFilingPct / 100);
  const forwarderSavings = shipmentsWithFees * 12 * forwarderFeePerShipment * (docFeesEliminatedPct / 100);
  const tradeFteSaved = tradeComplianceHeadcount * (tradeEfficiencyPct / 100);
  const tradeHeadcountSavings = tradeFteSaved * tradeCostPerFte;
  const totalCustomsSavings = brokerSavings + forwarderSavings + tradeHeadcountSavings;

  // Total benefits
  const totalOperationalSavings = apSavings + totalCustomsSavings;
  const totalPLBenefit = netDiscountBenefit + totalOperationalSavings;
  const plBenefitAfterCosts = totalPLBenefit; // Platform costs could be added here

  // Simulation calculations
  const adjustedCostOfSales = costOfSales - (bankFundedAmount * (earlyPaymentDiscount / 100));
  const adjustedOperatingProfit = operatingProfit + totalPLBenefit;
  const adjustedNetInterest = netInterest - (netWorkingCapital * (wcInterestRate / 100));
  const adjustedEbitda = ebitda + (bankFundedAmount * (earlyPaymentDiscount / 100)) + apSavings + totalCustomsSavings;
  const adjustedTradePayables = tradePayables + wcFromExtension;
  const adjustedNetDebt = netDebt - netWorkingCapital;
  const adjustedEquity = equity + totalPLBenefit;
  const adjustedFCF = freeCashFlow + netWorkingCapital;

  // Key ratios
  const ebitdaMargin = turnover > 0 ? ebitda / turnover : 0;
  const adjustedEbitdaMargin = turnover > 0 ? adjustedEbitda / turnover : 0;
  const operatingMargin = turnover > 0 ? operatingProfit / turnover : 0;
  const adjustedOperatingMargin = turnover > 0 ? adjustedOperatingProfit / turnover : 0;
  const leverage = ebitda > 0 ? netDebt / ebitda : 0;
  const adjustedLeverage = adjustedEbitda > 0 ? adjustedNetDebt / adjustedEbitda : 0;
  const solvency = equity > 0 ? netDebt / equity : 0;
  const adjustedSolvency = adjustedEquity > 0 ? adjustedNetDebt / adjustedEquity : 0;
  const fcfSales = turnover > 0 ? freeCashFlow / turnover : 0;
  const adjustedFcfSales = turnover > 0 ? adjustedFCF / turnover : 0;
  const interestCover = netInterest > 0 ? ebitda / netInterest : 0;
  const adjustedInterestCover = adjustedNetInterest > 0 ? adjustedEbitda / adjustedNetInterest : 0;

  // Formatting functions
  const formatCurrency = (value) => {
    if (Math.abs(value) >= 1000000) {
      return `${currencySymbol}${(value / 1000000).toFixed(2)}M`;
    } else if (Math.abs(value) >= 1000) {
      return `${currencySymbol}${(value / 1000).toFixed(0)}K`;
    }
    return `${currencySymbol}${value.toFixed(0)}`;
  };

  const formatNumber = (value, decimals = 1) => {
    return value.toFixed(decimals);
  };

  const formatPercent = (value) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  const InputField = ({ label, value, onChange, unit = '', note = '', compact = false, tooltip = '' }) => {
    const [localValue, setLocalValue] = React.useState(value);
    const [isEditing, setIsEditing] = React.useState(false);
    const [showTooltip, setShowTooltip] = React.useState(false);

    React.useEffect(() => {
      if (!isEditing) {
        setLocalValue(value);
      }
    }, [value, isEditing]);

    const handleFocus = () => {
      setIsEditing(true);
    };

    const handleBlur = () => {
      setIsEditing(false);
      const parsed = parseFloat(localValue);
      if (!isNaN(parsed)) {
        onChange(parsed);
      } else {
        setLocalValue(value);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.target.blur();
      }
    };

    const toggleTooltip = () => {
      setShowTooltip(!showTooltip);
    };

    return (
      <div className="border-b border-gray-200 py-2.5">
        {/* Mobile: Vertical Stack, Desktop: Horizontal */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
          {/* Label - Full width on mobile, flex-1 on desktop */}
          <div className="md:flex-1 md:min-w-0">
            <div className="flex items-center gap-1.5">
              <label className="text-xs font-medium text-gray-700 block">{label}</label>
              {tooltip && (
                <div className="relative inline-block">
                  <button
                    type="button"
                    onClick={toggleTooltip}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className="text-[#F08070] hover:text-[#D64933] transition-colors focus:outline-none print:hidden"
                    aria-label="More information"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                  {showTooltip && (
                    <div className="fixed md:absolute left-1/2 md:left-0 top-1/2 md:top-full transform -translate-x-1/2 md:translate-x-0 -translate-y-1/2 md:translate-y-0 md:mt-1 z-50 w-80 md:w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl print:hidden">
                      <div className="hidden md:block absolute -top-1 left-3 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                      {tooltip}
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Note shows ONLY on desktop - next to label */}
            {note && <p className="hidden md:block text-[10px] text-gray-500 mt-0.5 leading-tight">{note}</p>}
          </div>
          
          {/* Input + Unit - Full width on mobile, fixed width on desktop */}
          <div className={`flex items-center gap-2 w-full ${compact ? 'md:w-40' : 'md:w-64'}`}>
            <input
              type="text"
              value={localValue}
              onChange={(e) => setLocalValue(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F08070] text-right"
            />
            {unit && <span className="text-xs text-gray-600 whitespace-nowrap min-w-[60px]">{unit}</span>}
          </div>
        </div>
        
        {/* Note shows ONLY on mobile - below input, smaller font to prevent wrapping */}
        {note && <p className="md:hidden text-[10px] text-gray-500 mt-1 leading-tight">{note}</p>}
      </div>
    );
  };

  const SliderField = ({ label, value, onChange, min, max, step, unit = '', note = '', formatValue, tooltip = '' }) => {
    const [localValue, setLocalValue] = React.useState(value);
    const [isChanging, setIsChanging] = React.useState(false);
    const [showTooltip, setShowTooltip] = React.useState(false);

    React.useEffect(() => {
      if (!isChanging) {
        setLocalValue(value);
      }
    }, [value, isChanging]);

    const handleChange = (newValue) => {
      setLocalValue(newValue);
      setIsChanging(true);
    };

    const handleMouseUp = () => {
      setIsChanging(false);
      onChange(localValue);
    };

    const toggleTooltip = () => {
      setShowTooltip(!showTooltip);
    };

    return (
      <div className="border-b border-gray-200 py-2.5">
        {/* Mobile: Vertical Stack, Desktop: Horizontal */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
          {/* Label - Full width on mobile, flex-1 on desktop */}
          <div className="md:flex-1 md:min-w-0">
            <div className="flex items-center gap-1.5">
              <label className="text-xs font-medium text-gray-700 block">{label}</label>
              {tooltip && (
                <div className="relative inline-block">
                  <button
                    type="button"
                    onClick={toggleTooltip}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className="text-[#F08070] hover:text-[#D64933] transition-colors focus:outline-none print:hidden"
                    aria-label="More information"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                  {showTooltip && (
                    <div className="fixed md:absolute left-1/2 md:left-0 top-1/2 md:top-full transform -translate-x-1/2 md:translate-x-0 -translate-y-1/2 md:translate-y-0 md:mt-1 z-50 w-80 md:w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl print:hidden">
                      <div className="hidden md:block absolute -top-1 left-3 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                      {tooltip}
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Note shows ONLY on desktop - next to label */}
            {note && <p className="hidden md:block text-[10px] text-gray-500 mt-0.5 leading-tight">{note}</p>}
          </div>
          
          {/* Slider + Value - Full width on mobile, fixed width on desktop */}
          <div className="flex items-center gap-2 w-full md:w-64">
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={localValue}
              onChange={(e) => handleChange(parseFloat(e.target.value))}
              onMouseUp={handleMouseUp}
              onTouchEnd={handleMouseUp}
              className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #F08070 0%, #F08070 ${((localValue - min) / (max - min)) * 100}%, #e5e7eb ${((localValue - min) / (max - min)) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className="text-right min-w-[60px]">
              <span className="text-sm font-semibold text-[#D64933]">
                {formatValue ? formatValue(localValue) : localValue}
              </span>
              {unit && <span className="text-xs text-gray-600 ml-1">{unit}</span>}
            </div>
          </div>
        </div>
        
        {/* Note shows ONLY on mobile - below slider, smaller font to prevent wrapping */}
        {note && <p className="md:hidden text-[10px] text-gray-500 mt-1 leading-tight">{note}</p>}
      </div>
    );
  };

  const CalculatedField = ({ label, value, note = '', tooltip = '' }) => {
    const [showTooltip, setShowTooltip] = React.useState(false);

    const toggleTooltip = () => {
      setShowTooltip(!showTooltip);
    };

    return (
      <div className="bg-[#F08070]/10 border-l-4 border-[#F08070] py-2.5 px-3 mb-2">
        {/* Mobile: Vertical Stack, Desktop: Horizontal */}
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
          <div className="md:flex-1 md:min-w-0">
            <div className="flex items-center gap-1.5">
              <label className="text-xs font-semibold text-gray-900 block">{label}</label>
              {tooltip && (
                <div className="relative inline-block">
                  <button
                    type="button"
                    onClick={toggleTooltip}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className="text-[#F08070] hover:text-[#D64933] transition-colors focus:outline-none print:hidden"
                    aria-label="More information"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                  {showTooltip && (
                    <div className="fixed md:absolute left-1/2 md:left-0 top-1/2 md:top-full transform -translate-x-1/2 md:translate-x-0 -translate-y-1/2 md:translate-y-0 md:mt-1 z-50 w-80 md:w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl print:hidden">
                      <div className="hidden md:block absolute -top-1 left-3 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                      {tooltip}
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Note shows ONLY on desktop - next to label */}
            {note && <p className="hidden md:block text-[10px] text-gray-600 mt-0.5 leading-tight">{note}</p>}
          </div>
          <div className="text-base font-bold text-[#D64933] md:min-w-[120px] md:text-right">
            {value}
          </div>
        </div>
        {/* Note shows ONLY on mobile - below value, smaller font to prevent wrapping */}
        {note && <p className="md:hidden text-[10px] text-gray-600 mt-1 leading-tight">{note}</p>}
      </div>
    );
  };

  const ResultRow = ({ label, value, tooltip = '', className = '', labelClassName = '', valueClassName = '' }) => {
    const [showTooltip, setShowTooltip] = React.useState(false);

    const toggleTooltip = () => {
      setShowTooltip(!showTooltip);
    };

    return (
      <div className={className}>
        <div className="flex items-center gap-1.5">
          <span className={labelClassName}>{label}</span>
          {tooltip && (
            <div className="relative inline-block">
              <button
                type="button"
                onClick={toggleTooltip}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="text-[#F08070] hover:text-[#D64933] transition-colors focus:outline-none print:hidden"
                aria-label="More information"
              >
                <Info className="w-3 h-3" />
              </button>
              {showTooltip && (
                <div className="fixed md:absolute left-1/2 md:left-0 top-1/2 md:top-full transform -translate-x-1/2 md:translate-x-0 -translate-y-1/2 md:translate-y-0 md:mt-1 z-50 w-80 md:w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl print:hidden">
                  <div className="hidden md:block absolute -top-1 left-3 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                  {tooltip}
                </div>
              )}
            </div>
          )}
        </div>
        <span className={valueClassName}>{value}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#BAC1B8]/10 to-[#F08070]/5">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-[1800px] mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <img 
                src="/240417_PTS_red_logo.png" 
                alt="Prima Trade" 
                className="h-6 sm:h-8 w-auto flex-shrink-0"
              />
              <div className="min-w-0">
                <h1 className="text-base sm:text-2xl font-bold text-gray-900 truncate">Trade Digitalisation Benefits</h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 hidden sm:block">Cash Against Data</p>
              </div>
            </div>
            {showSaved && (
              <div className="flex items-center gap-2 text-[#D64933] text-sm flex-shrink-0">
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">Saved</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Tab Navigation - Full Width */}
        <div className="border-t border-gray-200">
          <div className="flex gap-0.5 sm:gap-1 px-2 sm:px-6">
            <button
              onClick={() => setActiveView('inputs')}
              className={`relative flex-1 px-3 sm:px-8 py-3 sm:py-4 text-left transition-all ${
                activeView === 'inputs'
                  ? 'bg-gradient-to-br from-[#D64933] to-[#F08070] text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-0.5 sm:mb-1">
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-sm sm:text-lg font-bold">Panel 1: Inputs & Results</span>
              </div>
              <p className={`text-xs hidden sm:block ${activeView === 'inputs' ? 'text-white/80' : 'text-gray-500'}`}>
                Enter your company data and see immediate benefit calculations
              </p>
              {activeView === 'inputs' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>
              )}
            </button>
            
            <button
              onClick={() => setActiveView('simulation')}
              className={`relative flex-1 px-3 sm:px-8 py-3 sm:py-4 text-left transition-all ${
                activeView === 'simulation'
                  ? 'bg-gradient-to-br from-[#D64933] to-[#F08070] text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-0.5 sm:mb-1">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-sm sm:text-lg font-bold">Panel 2: Before & After Simulation</span>
              </div>
              <p className={`text-xs hidden sm:block ${activeView === 'simulation' ? 'text-white/80' : 'text-gray-500'}`}>
                Compare your historic financials with projected improvements
              </p>
              {activeView === 'simulation' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {/* Explanatory Text Box */}
        <div className="bg-gradient-to-r from-[#F08070]/10 to-[#D64933]/5 border-l-4 border-[#D64933] rounded-r-lg p-4 mb-4 sm:mb-6">
          <p className="text-sm text-gray-700 leading-relaxed">
            This app enables you to compare a PrimaTrade SCF program with a traditional SCF program. PrimaTrade offers the ability to reach all your suppliers supported by a high level of automation - even suppliers in the long tail and in difficult jurisdictions. You can also replace expensive card payment programs with more efficient SCF, collecting an early payment discount to bring in-house the fees that are currently paid externally. On top, PrimaTrade enables early payments to be approved before delivery (at shipment), delivering much earlier cash to suppliers and much more value.
          </p>
        </div>

        {/* Panel 1: Inputs & Results */}
        <div className={activeView === 'inputs' ? '' : 'hidden print:block'} data-panel="inputs">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 lg:items-start">
            {/* Box 1 - Left column on desktop, order-1 on mobile */}
            <div className="space-y-4 sm:space-y-6 order-1 lg:col-start-1 lg:row-start-1">
              {/* 1) Company & Trade Volume */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 pb-3 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">
                    <span className="text-[#F08070]">1)</span> Company & Trade Volume
                  </h2>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Currency:</label>
                    <select
                      value={currencySymbol}
                      onChange={(e) => setCurrencySymbol(e.target.value)}
                      className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F08070] bg-white"
                    >
                      <option value="£">£ (GBP)</option>
                      <option value="$">$ (USD)</option>
                      <option value="€">€ (EUR)</option>
                      <option value="¥">¥ (JPY/CNY)</option>
                      <option value="₹">₹ (INR)</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <InputField
                    label="Import supply chain: annual volume"
                    value={annualVolumeMM}
                    onChange={setAnnualVolumeMM}
                    unit={`${currencySymbol} MM / year`}
                    note="Total invoice face value of imports."
                    tooltip="This is the total amount of goods that you import from all suppliers, whether consumed in your business or simply imported and then re-sold to customers."
                  />
                  <SliderField
                    label="Proportion of import supply chain digitising paperwork"
                    value={digitisationPct}
                    onChange={setDigitisationPct}
                    min={0}
                    max={100}
                    step={1}
                    unit="%"
                    note=""
                    tooltip="This is the proportion of what you buy where suppliers digitise their shipping and commercial paperwork. It might be less than 100%, for example, if some larger suppliers decline to participate in the digitisation process."
                  />
                </div>
              </div>
            </div>

            {/* Boxes 2-4 - order-3 on mobile, left column on desktop */}
            <div className="space-y-4 sm:space-y-6 order-3 lg:col-start-1 lg:row-start-2">
              {/* 2) Early Payment Discounts & Working Capital */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200 flex items-center gap-2">
                  <span><span className="text-[#F08070]">2)</span> Early Payment Discounts & Working Capital</span>
                  {(() => {
                    const [showTooltip, setShowTooltip] = React.useState(false);
                    return (
                      <div className="relative inline-block">
                        <button
                          type="button"
                          onClick={() => setShowTooltip(!showTooltip)}
                          onMouseEnter={() => setShowTooltip(true)}
                          onMouseLeave={() => setShowTooltip(false)}
                          className="text-[#F08070] hover:text-[#D64933] transition-colors focus:outline-none print:hidden"
                          aria-label="More information"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                        {showTooltip && (
                          <div className="fixed md:absolute left-1/2 md:left-0 top-1/2 md:top-full transform -translate-x-1/2 md:translate-x-0 -translate-y-1/2 md:translate-y-0 md:mt-1 z-50 w-80 md:w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl print:hidden">
                            <div className="hidden md:block absolute -top-1 left-3 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                            Trade digitisation enables invoices to be safely approved for payment at shipment; this capability means that suppliers can also be paid at shipment. This is very valuable for suppliers and can generate discounts on invoices and the ability to lengthen invoice terms.
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </h2>
                <div className="space-y-1">
                  <SliderField
                    label="Average payment term after shipment"
                    value={currentPaymentTerms}
                    onChange={setCurrentPaymentTerms}
                    min={0}
                    max={120}
                    step={1}
                    unit="days"
                    note="60 days = suppliers paid 60 days after shipment."
                    tooltip="This is the current average term for supplier invoices in days across your international supply chain. For example, if your standard terms of payment are 60 days after shipment (and all suppliers are on the standard terms), then set the slider to 60 days."
                  />
                  <SliderField
                    label="Additional payment term for suppliers"
                    value={termExtension}
                    onChange={setTermExtension}
                    min={0}
                    max={90}
                    step={1}
                    unit="days"
                    note="Additional days beyond the current term."
                    tooltip="If you offer suppliers the option to be paid at shipment, it is then possible to ask them to extend payment terms - since suppliers can always opt for early payment at a discount if they prefer not to wait a longer period for their money."
                  />
                  <SliderField
                    label="% of suppliers taking early payment option"
                    value={supplierUptakePct}
                    onChange={setSupplierUptakePct}
                    min={0}
                    max={100}
                    step={1}
                    unit="%"
                    note="% of invoices paid at shipment."
                    tooltip="If suppliers decide to take payment at shipment, then they are charged a discount (see the next slider). Not all suppliers will elect to do this - and so some suppliers will simply agree to wait for payment on the new extended terms payment date."
                  />
                  <SliderField
                    label="Early payment discount for payment at shipment"
                    value={earlyPaymentDiscount}
                    onChange={setEarlyPaymentDiscount}
                    min={0}
                    max={10}
                    step={0.1}
                    unit="%"
                    note="Percent. reduction in the invoice amount."
                    tooltip="Suppliers have the option to wait for payment or take early payment at shipment. If they take payment at shipment, you will ask them to give you a discount off the invoice which is set by this slider. Payment at shipment is valuable to suppliers because they get cash against their documents and before delivery."
                  />
                  <SliderField
                    label="Days after shipment until early payment"
                    value={daysToPayment}
                    onChange={setDaysToPayment}
                    min={0}
                    max={30}
                    step={1}
                    unit="days"
                    note="Time period for processing and payments"
                    tooltip="It normally takes a few days for suppliers to upload their paperwork to the PrimaTrade portal where it gets converted into useful structured data - and then for approval and payment to happen. Move the slider to set the time period in days here."
                  />
                  <SliderField
                    label="Share of early payments funded by banks / SCF"
                    value={bankFundedPct}
                    onChange={setBankFundedPct}
                    min={0}
                    max={100}
                    step={1}
                    unit="%"
                    note="Portion of early payments funded externally"
                    tooltip="The payment to the supplier can be made using your own cash (ie: paying the invoice early) or the supplier can get its early payment by funding the invoice with a bank under a program managed by PrimaTrade (so not using your money)."
                  />
                  <SliderField
                    label="Supply chain finance rate / cost of funds (annual)"
                    value={scfRate}
                    onChange={setScfRate}
                    min={0}
                    max={15}
                    step={0.1}
                    unit="%"
                    note="Rate charged by the bank to fund early payments."
                    tooltip="If the early payment is funded by a bank, this is the interest rate that the bank charges. The supplier economically pays this rate as part of the early payment discount (the excess of the early payment discount over this cost is your P&L)."
                  />
                  <SliderField
                    label="Internal cost of funds"
                    value={internalCostOfFunds}
                    onChange={setInternalCostOfFunds}
                    min={0}
                    max={15}
                    step={0.1}
                    unit="%"
                    note="Notional borrowing rate for internal funding."
                    tooltip="If you pay the invoice early with your own cash (eg: from treasury funds), then this is the rate notionally charged, reflecting the fact that the funds are not on deposit elsewhere."
                  />
                  <SliderField
                    label="Rate for savings from working capital generated"
                    value={wcInterestRate}
                    onChange={setWcInterestRate}
                    min={0}
                    max={15}
                    step={0.1}
                    unit="%"
                    note="Used to estimate annual value of lower borrowings"
                    tooltip="This is your normal borrowing cost which is saved because of the additional cash generated by lengthening payment terms. So this rate would be the one applicable to overdrafts or revolving credit facilities that you might have."
                  />
                </div>
              </div>

              {/* 3) Accounts Payable (AP) Headcount Efficiency */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200 flex items-center gap-2">
                  <span><span className="text-[#F08070]">3)</span> Accounts Payable (AP) Headcount Efficiency</span>
                  {(() => {
                    const [showTooltip, setShowTooltip] = React.useState(false);
                    return (
                      <div className="relative inline-block">
                        <button
                          type="button"
                          onClick={() => setShowTooltip(!showTooltip)}
                          onMouseEnter={() => setShowTooltip(true)}
                          onMouseLeave={() => setShowTooltip(false)}
                          className="text-[#F08070] hover:text-[#D64933] transition-colors focus:outline-none print:hidden"
                          aria-label="More information"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                        {showTooltip && (
                          <div className="fixed md:absolute left-1/2 md:left-0 top-1/2 md:top-full transform -translate-x-1/2 md:translate-x-0 -translate-y-1/2 md:translate-y-0 md:mt-1 z-50 w-80 md:w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl print:hidden">
                            <div className="hidden md:block absolute -top-1 left-3 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                            Getting suppliers to digitise their paperwork at source means it no longer needs to be done at head office. Suppliers can also digitally match invoices to purchase orders further reducing head office work - as this enables direct and real-time posting of invoices to the ERP.
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </h2>
                <div className="space-y-1">
                  <SliderField
                    label="Current AP team headcount"
                    value={apHeadcount}
                    onChange={setApHeadcount}
                    min={0}
                    max={50}
                    step={1}
                    unit="FTE"
                    note="Number of FTE currently in AP."
                    tooltip="The number of people in your accounts payable team handling your international suppliers. They would be dealing with invoices and paperwork, digitizing them, checking them, matching them, approving them, making entries in the accounting system and managing payments."
                  />
                  <SliderField
                    label="Fully loaded cost per AP FTE"
                    value={apCostPerFte}
                    onChange={setApCostPerFte}
                    min={30000}
                    max={150000}
                    step={1000}
                    unit={`${currencySymbol} / yr`}
                    note="Salary + benefits + overhead."
                    formatValue={(v) => `${currencySymbol}${(v/1000).toFixed(0)}K`}
                    tooltip="This is the average cost of each person in the AP team, used to calculate the financial saving when the workload of the AP team is reduced - since suppliers are now doing some of their work in digitising their paperwork and thereby also enabling current processes to be automated."
                  />
                  <SliderField
                    label="% headcount reduction achievable"
                    value={apEfficiencyPct}
                    onChange={setApEfficiencyPct}
                    min={0}
                    max={100}
                    step={1}
                    unit="%"
                    note="Headcount savings from more efficient processing"
                    tooltip="This is the workload reduction in the AP (accounts payable) team managing international suppliers resulting from the digitisation of paperwork and automation of processes. Our clients are typically seeing a 40% reduction in workload."
                  />
                </div>
              </div>

              {/* 4) Customs & Trade Compliance Benefits */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200 flex items-center gap-2">
                  <span><span className="text-[#F08070]">4)</span> Customs & Trade Compliance Benefits</span>
                  {(() => {
                    const [showTooltip, setShowTooltip] = React.useState(false);
                    return (
                      <div className="relative inline-block">
                        <button
                          type="button"
                          onClick={() => setShowTooltip(!showTooltip)}
                          onMouseEnter={() => setShowTooltip(true)}
                          onMouseLeave={() => setShowTooltip(false)}
                          className="text-[#F08070] hover:text-[#D64933] transition-colors focus:outline-none print:hidden"
                          aria-label="More information"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                        {showTooltip && (
                          <div className="fixed md:absolute left-1/2 md:left-0 top-1/2 md:top-full transform -translate-x-1/2 md:translate-x-0 -translate-y-1/2 md:translate-y-0 md:mt-1 z-50 w-80 md:w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl print:hidden">
                            <div className="hidden md:block absolute -top-1 left-3 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                            Trade digitisation by exporting suppliers provides the data you need for customs filings and your own internal systems - without you having to do the work. This saves costs and effort in your trade / trade data / compliance teams.
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </h2>
                <div className="space-y-1">
                  <SliderField
                    label="Monthly number of import customs filings"
                    value={customsFilings}
                    onChange={setCustomsFilings}
                    min={0}
                    max={5000}
                    step={50}
                    unit="filings / month"
                    note="Declarations currently handled via broker/forwarder."
                    tooltip="The number of filings into the customs system each month - since shipments can be consolidated, this is typically lower than the number of shipments."
                  />
                  <SliderField
                    label="Customs broker fee per filing"
                    value={brokerFeePerFiling}
                    onChange={setBrokerFeePerFiling}
                    min={0}
                    max={200}
                    step={1}
                    unit={`${currencySymbol} / filing`}
                    note="Total fee per filing charged by broker."
                    tooltip="Customs brokers charge a fee to assemble the customs filing from the shipping paperwork, usually per shipment, often quite high because of the manual work involved. This fee is no longer paid when customs filings are done digitally using exporter digital trade data."
                  />
                  <SliderField
                    label="% of filings moved to direct digital self-filing"
                    value={selfFilingPct}
                    onChange={setSelfFilingPct}
                    min={0}
                    max={100}
                    step={1}
                    unit="%"
                    note="Share posted directly into customs systems."
                    tooltip="Not all filings can be done automatically from exporter data - but current experience is that nearly all can - so this is usually a high percentage."
                  />
                  <SliderField
                    label="Monthly # of shipments with forwarder doc fees"
                    value={shipmentsWithFees}
                    onChange={setShipmentsWithFees}
                    min={0}
                    max={5000}
                    step={50}
                    unit="shipments / month"
                    note="Only include shipments where fees are avoided via digitisation."
                    tooltip="Forwarders can also charge additional fees for digitising and managing shipping paperwork and providing the data that results - these fees are saved when exporters do this work."
                  />
                  <SliderField
                    label="Forwarder/doc fee per shipment"
                    value={forwarderFeePerShipment}
                    onChange={setForwarderFeePerShipment}
                    min={0}
                    max={100}
                    step={1}
                    unit={`${currencySymbol} / shipment`}
                    note="Document handling, forwarding admin, etc."
                    tooltip="This fee is the amount charged for the service per shipment - usually it is per shipment rather than per customs filing."
                  />
                  <SliderField
                    label="% of forwarder/doc fees eliminated"
                    value={docFeesEliminatedPct}
                    onChange={setDocFeesEliminatedPct}
                    min={0}
                    max={100}
                    step={1}
                    unit="%"
                    note="Often similar to % self-filing, but can differ."
                    tooltip="This should be a high percentage unless forwarders are also adding essential data from their own processes which still needs to be received and cannot be collected from exporters."
                  />
                  <SliderField
                    label="Current trade compliance team headcount"
                    value={tradeComplianceHeadcount}
                    onChange={setTradeComplianceHeadcount}
                    min={0}
                    max={30}
                    step={1}
                    unit="FTE"
                    note="Number of FTE currently in trade compliance."
                    tooltip="Most businesses have a team that is responsible for capturing data from shipping documents for internal purposes (compliance, duty calculations, verifying shipments, coordinating goods receipts etc). This effort can be reduced with trade digitisation."
                  />
                  <SliderField
                    label="Fully loaded cost per FTE"
                    value={tradeCostPerFte}
                    onChange={setTradeCostPerFte}
                    min={30000}
                    max={150000}
                    step={1000}
                    unit={`${currencySymbol} / yr`}
                    note="Salary + benefits + overhead."
                    formatValue={(v) => `${currencySymbol}${(v/1000).toFixed(0)}K`}
                    tooltip="This is the average cost of each person in the trade compliance / trade data team, used to calculate the financial saving when the workload of the team is reduced - since suppliers are now doing some of their work in digitising their paperwork and thereby also enabling current processes to be automated."
                  />
                  <SliderField
                    label="% headcount reduction achievable"
                    value={tradeEfficiencyPct}
                    onChange={setTradeEfficiencyPct}
                    min={0}
                    max={100}
                    step={1}
                    unit="%"
                    note="Headcount savings from more efficient processing"
                    tooltip="This is the workload reduction in the trade team resulting from the digitisation of paperwork and automation of processes. Our clients are typically seeing a 40% reduction in workload."
                  />
                </div>
              </div>
            </div>
                            
            {/* Benefits Summary Card - order-2 on mobile, right column on desktop */}
            <div className="order-2 lg:col-start-2 lg:row-start-1">
              <div className="bg-gradient-to-br from-[#D64933] via-[#F08070] to-[#F08070] rounded-lg shadow-xl p-4 sm:p-6 text-white">
                <div className="flex flex-col md:grid md:grid-cols-2 gap-4 sm:gap-6">
                  {/* P&L Section - Centered on mobile */}
                  <div className="text-center md:text-left">
                    <h3 className="text-lg font-bold mb-1">Total Annual P&L Benefit</h3>
                    <p className="text-white/80 text-xs mb-3">Early payment discounts, operational savings</p>
                    <div className="text-4xl font-bold mb-4">{formatCurrency(totalPLBenefit)}</div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <div className="text-white/70 mb-1">Discounts</div>
                        <div className="text-sm font-bold">{formatCurrency(netDiscountBenefit)}</div>
                      </div>
                      <div>
                        <div className="text-white/70 mb-1">AP Efficiency</div>
                        <div className="text-sm font-bold">{formatCurrency(apSavings)}</div>
                      </div>
                      <div>
                        <div className="text-white/70 mb-1">Customs</div>
                        <div className="text-sm font-bold">{formatCurrency(totalCustomsSavings)}</div>
                      </div>
                    </div>
                   </div>

                  {/* Working Capital Section - Already centered */}
                  <div className="md:border-l border-white/30 md:pl-6 text-center md:text-left">
                    <h3 className="text-lg font-bold mb-1">Working Capital Win</h3>
                    <p className="text-white/80 text-xs mb-3">Cash released (longer payment terms)</p>
                    <div className="text-4xl font-bold mb-4">{formatCurrency(netWorkingCapital)}</div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="text-white/70 mb-1">From extension:</div>
                        <div className="text-sm font-bold">{formatCurrency(wcFromExtension)}</div>
                      </div>
                      <div>
                        <div className="text-white/70 mb-1">Self-funded:</div>
                        <div className="text-sm font-bold">-{formatCurrency(wcUsedForEarlyPay)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column results - order-4 on mobile, right column on desktop */}
            <div className="space-y-4 sm:space-y-6 order-4 lg:col-start-2 lg:row-start-2">              {/* How Trade Digitalisation Works - Informational Box */}
              <div className="bg-gradient-to-br from-white to-[#F08070]/5 rounded-lg shadow-md p-6 border-l-4 border-[#D64933]">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#D64933]" />
                  How Trade Digitalisation Works
                </h3>
                
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  Trade digitalisation means digitising trade documents and then using the resulting data to deliver working capital, P&L and operational wins.
                </p>
                
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  The most efficient system is one where exporting suppliers are able to upload their paperwork as they ship to a secure portal like PrimaTrade. Each document is converted to useful data by the platform as it is uploaded and then checked and warranted by the exporter.
                </p>
                
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  With the shipping documents (invoices, certificates, packing lists, transport documents) converted into structured data, exporters can be asked to select and match which purchase orders are being fulfilled, confirming price and quantity.
                </p>
                
                <div className="bg-white/60 rounded-md p-4 mt-4">
                  <p className="text-sm font-semibold text-gray-900 mb-3">This process enables:</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-[#D64933] font-bold mt-0.5">•</span>
                      <span className="leading-relaxed">Invoices to be immediately approved for payment via a 3-way match between invoices, POs and shipping documents.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#D64933] font-bold mt-0.5">•</span>
                      <span className="leading-relaxed">Cash to be accelerated to suppliers at shipment in return for discount on the invoice (often 2%, 3% or more), and this can be organised using finance to preserve the importer's working capital.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#D64933] font-bold mt-0.5">•</span>
                      <span className="leading-relaxed">With suppliers able to ask for payment at shipment, payment terms from suppliers can be lengthened without causing supply chain stress.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#D64933] font-bold mt-0.5">•</span>
                      <span className="leading-relaxed">Matched invoices to be posted directly to the importer's ERP, reducing work for AP teams.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#D64933] font-bold mt-0.5">•</span>
                      <span className="leading-relaxed">The data provided by exporters can be used to drive internal systems dealing with receiving the goods being shipped, to create and post customs filings and to reduce headcount in trade processing and compliance teams.</span>
                    </li>
                  </ul>
                </div>
              </div>

                   {/* Early payment + working capital benefits aligned with box 2 */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Working capital and early payment benefits</h3>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-3">
                    <div className="font-semibold text-gray-800">Early payment details</div>
                    <ResultRow 
                      label="Imports paid early:"
                      value={formatCurrency(participatingSpend)}
                      tooltip="This is the amount of imports paid early at shipment based on the percentage of suppliers that opt for early payment rather than waiting for the full payment term of their invoice."
                      className="flex justify-between"
                      labelClassName="text-gray-600"
                      valueClassName="font-semibold"
                    />
                    <ResultRow 
                      label={`• Bank funded (${formatNumber(bankFundedPct, 0)}%):`}
                      value={formatCurrency(bankFundedAmount)}
                      tooltip="Of the amount that is paid early to suppliers, this is the part that is funded by banks (or specialist trade funds) rather than paid early using your own cash. The cost of the early payment is netted against the early payment discount and not paid by you."
                      className="flex justify-between pl-4"
                      labelClassName="text-gray-600"
                      valueClassName="font-semibold text-[#D64933]"
                    />
                    <ResultRow 
                      label={`• Internally funded (${formatNumber(100 - bankFundedPct, 0)}%):`}
                      value={formatCurrency(internalFundedAmount)}
                      tooltip="This is the balancing part of the early payment where you have decided to use your own funds to pay invoices early rather than have suppliers fund their early payment themselves. This uses your working capital but means all the early payment discount is earned by you."
                      className="flex justify-between pl-4"
                      labelClassName="text-gray-600"
                      valueClassName="font-semibold text-[#D64933]"
                    />
                    <ResultRow 
                      label="Total discount value:"
                      value={formatCurrency(discountValue)}
                      tooltip="Equals the face value amount of imports paid early times the early payment discount. This is a saving for the importer."
                      className="flex justify-between pt-2 border-t"
                      labelClassName="text-gray-600"
                      valueClassName="font-semibold text-red-700"
                    />
                    <ResultRow 
                      label="Bank funding cost:"
                      value={`-${formatCurrency(bankFundingCost)}`}
                      tooltip="Equals the amount charged by banks to fund early payments. This charge is made to suppliers not to the importer and is netted out of the early payment discount."
                      className="flex justify-between"
                      labelClassName="text-gray-600"
                      valueClassName="font-semibold text-red-700"
                    />
                    <ResultRow 
                      label="Internal funding cost:"
                      value={`-${formatCurrency(internalFundingCost)}`}
                      tooltip="Equals the notional cost (internally) for the use of own funds where suppliers take early payments but invoices are not funded by banks as own funds are used to pay the invoices early."
                      className="flex justify-between"
                      labelClassName="text-gray-600"
                      valueClassName="font-semibold text-red-700"
                    />
                    <ResultRow 
                      label="Net discount benefit:"
                      value={formatCurrency(netDiscountBenefit)}
                      tooltip="The net economic benefit generated when suppliers take early payment (= early payment discounts less the funding costs)."
                      className="flex justify-between pt-2 border-t font-bold"
                      labelClassName="text-gray-900"
                      valueClassName="text-2xl font-bold text-red-700"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="font-semibold text-gray-800">Working capital benefits</div>
                    <ResultRow 
                      label="From longer payment terms:"
                      value={formatCurrency(wcFromExtension)}
                      tooltip="If suppliers agree longer payment terms then this generates working capital for the importer - since the importer pays suppliers more slowly and DPO (days payable outstanding) goes up."
                      className="flex justify-between"
                      labelClassName="text-gray-600"
                      valueClassName="font-semibold text-red-700"
                    />
                    <ResultRow 
                      label="Own cash used to pay early:"
                      value={`-${formatCurrency(wcUsedForEarlyPay)}`}
                      tooltip="If suppliers agree longer payment terms but then take early payment and the importer uses its own funds to make that payment, then this consumes working capital and DPO (days payable outstanding) goes down."
                      className="flex justify-between"
                      labelClassName="text-gray-600"
                      valueClassName="font-semibold text-red-700"
                    />
                    <div className="flex justify-between items-center pt-2 border-t font-bold">
                      <span className="text-gray-900">Net working capital:</span>
                      <span className="text-2xl font-bold text-red-700">{formatCurrency(netWorkingCapital)}</span>
                    </div>
                    <ResultRow 
                      label={`Annual value at ${formatNumber(wcInterestRate, 1)}%:`}
                      value={formatCurrency(wcAnnualValue)}
                      tooltip="Additional working capital has a P&L value because it means borrowings are lower - this value is calculated as the interest cost that is saved when less is borrowed in the business."
                      className="flex justify-between pt-2 border-t"
                      labelClassName="text-gray-600"
                      valueClassName="font-semibold text-[#D64933]"
                    />
                   </div>
                </div>
              </div>
            
             {/* Headcount savings and other benefits aligned with box 3 */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Headcount savings and other benefits</h3>
                  <div className="space-y-3">
                  <ResultRow 
                    label="AP FTEs saved:"
                    value={`${formatNumber(apFteSaved, 1)} FTEs`}
                    tooltip="The number of accounts payable (AP) people who are not required because the workload has reduced."
                    className="flex justify-between items-center pb-2 border-b"
                    labelClassName="text-sm text-gray-600"
                    valueClassName="font-semibold text-purple-700"
                  />
                  <ResultRow 
                    label="AP headcount savings:"
                    value={formatCurrency(apSavings)}
                    tooltip="The financial saving resulting from lower headcount being required in the accounts payable team."
                    className="flex justify-between items-center pb-2 border-b"
                    labelClassName="text-sm text-gray-600"
                    valueClassName="font-semibold text-red-700"
                  />
                  <ResultRow 
                    label="Customs broker savings:"
                    value={formatCurrency(brokerSavings)}
                    tooltip="The financial saving resulting from lower fees being paid to customs brokers for compiling customs filings."
                    className="flex justify-between items-center pb-2 border-b"
                    labelClassName="text-sm text-gray-600"
                    valueClassName="font-semibold text-red-700"
                  />
                  <ResultRow 
                    label="Forwarder fee savings:"
                    value={formatCurrency(forwarderSavings)}
                    tooltip="The financial saving resulting from lower fees being paid to forwarders for handling documents and providing data to the importer."
                    className="flex justify-between items-center pb-2 border-b"
                    labelClassName="text-sm text-gray-600"
                    valueClassName="font-semibold text-red-700"
                  />
                  <ResultRow 
                    label="Trade FTEs saved:"
                    value={`${formatNumber(tradeFteSaved, 1)} FTEs`}
                    tooltip="The number of people in the trade / trade data / compliance team who are no longer required because the workload has reduced."
                    className="flex justify-between items-center pb-2 border-b"
                    labelClassName="text-sm text-gray-600"
                    valueClassName="font-semibold text-purple-700"
                  />
                  <ResultRow 
                    label="Trade headcount savings:"
                    value={formatCurrency(tradeHeadcountSavings)}
                    tooltip="The financial saving resulting from lower headcount being required in the trade / trade data / compliance team."
                    className="flex justify-between items-center pb-2 border-b"
                    labelClassName="text-sm text-gray-600"
                    valueClassName="font-semibold text-red-700"
                  />
                <div className="flex justify-between items-center pt-3">
                    <span className="font-bold text-gray-900">Total benefit from operational savings:</span>
                    <span className="text-2xl font-bold text-red-700">{formatCurrency(totalOperationalSavings)}</span>
                  </div>
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

        {/* Panel 2: Simulation View */}
        <div className={activeView === 'simulation' ? '' : 'hidden print:block'} data-panel="simulation">
          <>
          {/* Simulation View */}
          <div className="space-y-6">
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

            {/* P&L Comparison */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-[#F08070]" />
                P&L (Extract)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 w-64">Item</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 w-40">Historic Value</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-[#D64933] w-40">After PrimaTrade</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 text-sm">Turnover / revenue</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(turnover)}</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-[#D64933]">{formatCurrency(turnover)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Unchanged</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm">Cost of sales</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(costOfSales)}</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatCurrency(adjustedCostOfSales)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Reduced by early payment discounts where funding is external</td>
                    </tr>
                    <tr className="bg-[#F08070]/10">
                      <td className="py-3 px-4 text-sm font-semibold">Operating profit</td>
                      <td className="py-3 px-4 text-sm text-right font-bold">{formatCurrency(operatingProfit)}</td>
                      <td className="py-3 px-4 text-sm text-right font-bold text-red-700">{formatCurrency(adjustedOperatingProfit)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Increased by the full P&L benefit</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm">Net interest payable</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(netInterest)}</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatCurrency(adjustedNetInterest)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Reduced as lower borrowing because of working capital benefits</td>
                    </tr>
                    <tr className="bg-[#F08070]/10">
                      <td className="py-3 px-4 text-sm font-semibold">EBITDA</td>
                      <td className="py-3 px-4 text-sm text-right font-bold">{formatCurrency(ebitda)}</td>
                      <td className="py-3 px-4 text-sm text-right font-bold text-red-700">{formatCurrency(adjustedEbitda)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Increased by funded early payment discounts and operational wins</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Balance Sheet Comparison */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-[#F08070]" />
                Balance Sheet and Cash Flow (Extract)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 w-64">Item</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 w-40">Historic Value</th>
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
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 w-40">Historic Value</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-[#D64933] w-40">After PrimaTrade</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 text-sm">EBITDA margin</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatPercent(ebitdaMargin)}</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatPercent(adjustedEbitdaMargin)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Up because cost of sales is lower and operations more efficient</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm">Operating margin</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatPercent(operatingMargin)}</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatPercent(adjustedOperatingMargin)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Up because cost of sales is lower and operations more efficient</td>
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
                  <div className="text-4xl font-bold mb-1">{formatCurrency(netWorkingCapital)}</div>
                  <div className="text-red-100 text-sm">Additional cash available</div>
                </div>
                <div>
                  <div className="text-red-100 text-sm mb-2">Leverage Improvement</div>
                  <div className="text-4xl font-bold mb-1">{formatNumber(leverage - adjustedLeverage, 2)}x</div>
                  <div className="text-red-100 text-sm">Net Debt / EBITDA reduction</div>
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
          </>
        </div>
      </div>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { AlertCircle, ThermometerSun, Gauge, Activity, Loader2 } from 'lucide-react';

// Hardcoded data
const INCIDENT = {
  id: "2847",
  line: "Line 3",
  station: "Aseptic Fill Station Alpha",
  diagnosis: "Steam Pressure Drop in Sterilization Tunnel (Zone 4)",
  confidence: 94,
  equipment: "Steam Trap ST-447",
  timestamp: "14:23:47 PST"
};

const SENSORS = [
  { id: "PT-4472", name: "Steam Pressure", value: "242 PSI", normal: "285-295 PSI", status: "critical" },
  { id: "TT-4473", name: "Zone 4 Temp", value: "134°C", normal: "137-139°C", status: "warning" },
  { id: "FT-4401", name: "Flow Rate", value: "95 GPM", normal: "90-100 GPM", status: "normal" }
];

const COMPARISON = {
  traditional: { time: "6 hours", cost: "$250,000", gallons: "50K gal" },
  etherEye: { time: "45 minutes", cost: "$40,000", gallons: "8K gal" },
  savings: "$210,000"
};

const RECOVERY_STEPS = [
  "Inspect steam trap ST-447 for blockage",
  "Verify boiler output pressure at header",
  "Run Zone 4 re-sterilization cycle (localized)",
  "Validate sensor readings return to baseline"
];

const CHAT_RESPONSES = {
  seal: "No - seal failures show temperature AND flow anomalies. We're only seeing pressure drop in Zone 4. Historical data shows this pattern matches steam trap blockages (7 previous incidents).",

  spec: "According to Technical Manual TM-4472 (Section 3.2.4, Page 87):\n\n• Operating pressure: 285-295 PSI\n• Critical threshold: 280 PSI\n• Sterility compromise: <275 PSI for >30 seconds\n\nCurrent reading: 242 PSI ⚠️ BELOW CRITICAL",

  procedure: "Zone 4 Re-Sterilization Protocol (TM-4472:134):\n\n1. Isolate Zone 4 from production line\n2. Increase steam flow to 110% for 10 minutes\n3. Hold at 290 PSI for 15 minutes\n4. Run 3 validation cycles\n\nEstimated time: 45 minutes"
};

export default function Dashboard() {
  const [activeResponse, setActiveResponse] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [checkedSteps, setCheckedSteps] = useState<boolean[]>([false, false, false, false]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Initial 3-second analyzing animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Elapsed time counter (starts after analyzing)
  useEffect(() => {
    if (!isAnalyzing) {
      const interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  const formatElapsedTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const calculateLiveCost = (seconds: number) => {
    // $250K over 6 hours = ~$11.57 per second
    const costPerSecond = 11.57;
    const totalCost = Math.floor(seconds * costPerSecond);
    return totalCost.toLocaleString();
  };

  const toggleCheckbox = (index: number) => {
    const newChecked = [...checkedSteps];
    newChecked[index] = !newChecked[index];
    setCheckedSteps(newChecked);
  };

  const allStepsChecked = checkedSteps.every(step => step);

  const handleApprove = () => {
    setShowSuccessModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "bg-red-500";
      case "warning": return "bg-amber-500";
      case "normal": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "critical": return <AlertCircle className="w-5 h-5 text-red-400" />;
      case "warning": return <ThermometerSun className="w-5 h-5 text-amber-400" />;
      case "normal": return <Activity className="w-5 h-5 text-green-400" />;
      default: return null;
    }
  };

  // Show analyzing state
  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-cyan-400 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-cyan-400 mb-2">ANALYZING INCIDENT DATA</h2>
          <p className="text-slate-400">Processing 55,000 sensor readings...</p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-red-400">ETHER-EYE | INCIDENT #{INCIDENT.id}</h1>
            <p className="text-slate-300 mt-1">
              {INCIDENT.line} - {INCIDENT.station} | Stopped: {INCIDENT.timestamp}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Elapsed Time</p>
            <p className="text-3xl font-bold text-red-400 font-mono">{formatElapsedTime(elapsedSeconds)}</p>
            <p className="text-sm text-amber-400 mt-1">Cost: ${calculateLiveCost(elapsedSeconds)}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Root Cause Card */}
          <div className="bg-gradient-to-br from-red-950/50 to-slate-900 rounded-xl p-6 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <h2 className="text-xl font-bold text-red-400">ROOT CAUSE IDENTIFIED</h2>
              </div>
              <div className="bg-red-500/20 text-red-400 px-4 py-1.5 rounded-full text-sm font-semibold">
                {INCIDENT.confidence}% Confidence
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-2 text-white">{INCIDENT.diagnosis}</h3>
            <p className="text-slate-300">Equipment: <span className="font-mono text-cyan-400">{INCIDENT.equipment}</span></p>

            {/* Historical Context */}
            <div className="mt-4 bg-cyan-500/10 rounded-lg p-3">
              <p className="text-sm text-cyan-400">
                📊 Historical Pattern: Matches 7 previous incidents - all resolved without full SOP cleaning
              </p>
            </div>

            {/* Confidence Bar */}
            <div className="mt-4">
              <div className="w-full bg-slate-700/50 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${INCIDENT.confidence}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Sensor Cards */}
          <div>
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Gauge className="w-5 h-5" />
              SENSOR STATUS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SENSORS.map((sensor) => (
                <div key={sensor.id} className="bg-slate-800/50 backdrop-blur rounded-xl p-5 shadow-lg hover:bg-slate-800/70 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    {getStatusIcon(sensor.status)}
                    <span className={`w-2.5 h-2.5 rounded-full ${getStatusColor(sensor.status)}`}></span>
                  </div>
                  <h3 className="font-semibold text-sm text-slate-400 mb-1">{sensor.name}</h3>
                  <p className="text-2xl font-bold mb-1 text-white">{sensor.value}</p>
                  <p className="text-xs text-slate-500">Normal: {sensor.normal}</p>
                  <p className="text-xs text-slate-400 mt-1 font-mono">{sensor.id}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Comparison */}
          <div>
            <h2 className="text-lg font-bold mb-3">COST COMPARISON</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Traditional */}
              <div className="bg-gradient-to-br from-red-950/30 to-slate-900 rounded-xl p-6 shadow-lg">
                <div className="text-center">
                  <p className="text-sm text-slate-400 mb-3">Traditional Approach</p>
                  <p className="text-3xl font-bold text-red-400 mb-2">{COMPARISON.traditional.time}</p>
                  <p className="text-2xl font-semibold text-red-300 mb-2">{COMPARISON.traditional.cost}</p>
                  <p className="text-sm text-slate-500">{COMPARISON.traditional.gallons} discarded</p>
                </div>
              </div>

              {/* Ether-Eye */}
              <div className="bg-gradient-to-br from-green-950/30 to-slate-900 rounded-xl p-6 shadow-lg">
                <div className="text-center">
                  <p className="text-sm text-slate-400 mb-3">Ether-Eye Solution</p>
                  <p className="text-3xl font-bold text-green-400 mb-2">{COMPARISON.etherEye.time}</p>
                  <p className="text-2xl font-semibold text-green-300 mb-2">{COMPARISON.etherEye.cost}</p>
                  <p className="text-sm text-slate-500">{COMPARISON.etherEye.gallons} discarded</p>
                </div>
              </div>
            </div>

            {/* Savings */}
            <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-xl p-5 text-center shadow-lg">
              <p className="text-sm text-slate-300 mb-1">Total Savings Per Incident</p>
              <p className="text-4xl font-bold text-green-400">{COMPARISON.savings}</p>
            </div>
          </div>

          {/* Recovery Checklist */}
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
              ✅ RECOVERY CHECKLIST
            </h2>
            <div className="space-y-3">
              {RECOVERY_STEPS.map((step, index) => (
                <label key={index} className="flex items-start gap-3 cursor-pointer hover:bg-slate-700/50 p-2 rounded transition-colors">
                  <input
                    type="checkbox"
                    checked={checkedSteps[index]}
                    onChange={() => toggleCheckbox(index)}
                    className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-700 accent-green-500"
                  />
                  <span className={`${checkedSteps[index] ? 'line-through text-slate-500' : 'text-slate-300'}`}>
                    {step}
                  </span>
                </label>
              ))}
            </div>

            {/* Approve Button */}
            <button
              onClick={handleApprove}
              disabled={!allStepsChecked}
              className={`w-full mt-6 py-4 rounded-lg font-bold text-lg transition-all ${
                allStepsChecked
                  ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              }`}
            >
              {allStepsChecked ? '✓ APPROVE RECOVERY PLAN' : '⚠️ COMPLETE ALL CHECKS TO APPROVE'}
            </button>
          </div>
        </div>

        {/* Right Column - Chat Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 sticky top-6 shadow-lg">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
              💬 ASK ETHER-EYE
            </h2>

            {/* Chat Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => setActiveResponse(CHAT_RESPONSES.seal)}
                className="w-full text-left bg-slate-700/50 hover:bg-slate-700 rounded-lg p-3 text-sm transition-all hover:shadow-lg"
              >
                Could this be seal failure?
              </button>

              <button
                onClick={() => setActiveResponse(CHAT_RESPONSES.spec)}
                className="w-full text-left bg-slate-700/50 hover:bg-slate-700 rounded-lg p-3 text-sm transition-all hover:shadow-lg"
              >
                What&apos;s the pressure spec?
              </button>

              <button
                onClick={() => setActiveResponse(CHAT_RESPONSES.procedure)}
                className="w-full text-left bg-slate-700/50 hover:bg-slate-700 rounded-lg p-3 text-sm transition-all hover:shadow-lg"
              >
                Show recovery procedure
              </button>
            </div>

            {/* Response Area */}
            {activeResponse && (
              <div className="bg-cyan-500/10 rounded-lg p-4 min-h-[200px]">
                <div className="flex items-start gap-2 mb-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <p className="text-xs text-cyan-400 font-semibold">ETHER-EYE RESPONSE</p>
                </div>
                <p className="text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                  {activeResponse}
                </p>
              </div>
            )}

            {!activeResponse && (
              <div className="bg-slate-900/30 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
                <p className="text-slate-500 text-sm text-center">
                  Click a question above to get instant answers from technical documentation
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border-2 border-green-500 rounded-lg p-8 max-w-2xl w-full">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-green-400 mb-2">RECOVERY PLAN APPROVED</h2>
              <p className="text-slate-300 mb-6">Incident #{INCIDENT.id} - Resolution Authorized</p>

              <div className="bg-slate-900 border border-green-500/30 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-sm text-slate-400">Estimated Recovery Time</p>
                    <p className="text-2xl font-bold text-green-400">{COMPARISON.etherEye.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Total Savings</p>
                    <p className="text-2xl font-bold text-green-400">{COMPARISON.savings}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Product Saved</p>
                    <p className="text-2xl font-bold text-cyan-400">42K gallons</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Downtime Avoided</p>
                    <p className="text-2xl font-bold text-cyan-400">5.25 hours</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4 mb-6">
                <p className="text-sm text-green-400 font-semibold">
                  ✓ All safety checks completed
                </p>
                <p className="text-sm text-slate-300 mt-1">
                  Recovery procedure initiated. Technicians dispatched to {INCIDENT.equipment}.
                </p>
              </div>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

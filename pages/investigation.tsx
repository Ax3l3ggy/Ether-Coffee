'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  AlertTriangle,
  TrendingDown,
  Search,
  FileText,
  Activity,
  Zap,
  Clock,
  ArrowRight,
  Lightbulb
} from 'lucide-react';

// Sensor data with time series
const SENSOR_DATA = {
  "PT-4472": {
    name: "Zone 4 Steam Pressure",
    location: "Sterilization Tunnel - Zone 4, Left Side",
    current: 242,
    normal: [285, 295],
    unit: "PSI",
    status: "critical",
    trend: "declining",
    history: [290, 289, 287, 285, 278, 265, 250, 242],
    timestamps: ["14:20", "14:21", "14:22", "14:23", "14:23:30", "14:23:40", "14:23:45", "14:23:47"]
  },
  "TT-4473": {
    name: "Zone 4 Temperature",
    location: "Sterilization Tunnel - Zone 4, Center",
    current: 134,
    normal: [137, 139],
    unit: "°C",
    status: "warning",
    trend: "declining",
    history: [138, 138, 137, 137, 136, 135, 134, 134],
    timestamps: ["14:20", "14:21", "14:22", "14:23", "14:23:30", "14:23:40", "14:23:45", "14:23:47"]
  },
  "FT-4401": {
    name: "Product Flow Rate",
    location: "Fill Station Alpha - Inlet",
    current: 95,
    normal: [90, 100],
    unit: "GPM",
    status: "normal",
    trend: "stable",
    history: [96, 95, 96, 94, 95, 96, 95, 95],
    timestamps: ["14:20", "14:21", "14:22", "14:23", "14:23:30", "14:23:40", "14:23:45", "14:23:47"]
  },
  "ST-447": {
    name: "Steam Trap Status",
    location: "Near PT-4472, Adjacent to Zone 4",
    current: "Blocked",
    normal: ["Clear"],
    unit: "",
    status: "critical",
    trend: "abnormal",
    history: ["Clear", "Clear", "Clear", "Partial", "Blocked", "Blocked", "Blocked", "Blocked"],
    timestamps: ["14:20", "14:21", "14:22", "14:23", "14:23:30", "14:23:40", "14:23:45", "14:23:47"]
  }
};

const SOP_DOCUMENTS = [
  {
    id: "TM-4472",
    title: "Zone 4 Sterilization Tunnel - Technical Manual",
    sections: [
      { page: 87, title: "Steam Pressure Specifications", relevant: true },
      { page: 92, title: "Temperature Control Systems", relevant: true },
      { page: 134, title: "Zone 4 Re-Sterilization Protocol", relevant: true },
    ]
  },
  {
    id: "SOP-ST-001",
    title: "Steam Trap Maintenance & Troubleshooting",
    sections: [
      { page: 23, title: "Identifying Steam Trap Blockages", relevant: true },
      { page: 45, title: "Emergency Steam Trap Bypass Procedure", relevant: true },
    ]
  },
  {
    id: "SOP-CLEAN-001",
    title: "Full Line SOP Cleaning Procedure",
    sections: [
      { page: 12, title: "When Full Cleaning is Required", relevant: true },
      { page: 34, title: "6-Hour Full Sterilization Protocol", relevant: false },
    ]
  }
];

const HISTORICAL_INCIDENTS = [
  { id: "INC-2743", date: "2026-02-18", line: "Line 5", cause: "Steam trap blockage", resolution: "Cleared trap, localized re-sterilization", downtime: "52 min" },
  { id: "INC-2698", date: "2026-02-12", line: "Line 3", cause: "Steam trap blockage", resolution: "Cleared trap, localized re-sterilization", downtime: "48 min" },
  { id: "INC-2654", date: "2026-02-05", line: "Line 7", cause: "Steam trap blockage", resolution: "Cleared trap, localized re-sterilization", downtime: "45 min" },
  { id: "INC-2601", date: "2026-01-28", line: "Line 3", cause: "Seal failure", resolution: "Full SOP cleaning", downtime: "6.2 hrs" },
  { id: "INC-2543", date: "2026-01-19", line: "Line 2", cause: "Steam trap blockage", resolution: "Cleared trap, localized re-sterilization", downtime: "50 min" },
];

export default function Investigation() {
  const router = useRouter();
  const [selectedSensor, setSelectedSensor] = useState<string | null>("PT-4472");
  const [activeTab, setActiveTab] = useState<"sensors" | "sops" | "history">("sensors");
  const [chatResponse, setChatResponse] = useState("");
  const [showInsight, setShowInsight] = useState(false);

  const handleAskQuestion = (question: string) => {
    // Simulated AI responses
    if (question.includes("steam pressure") || question.includes("PT-4472")) {
      setChatResponse("According to Technical Manual TM-4472 (Section 3.2.4, Page 87):\n\n**Zone 4 Steam Pressure Requirements:**\n• Operating range: 285-295 PSI\n• Critical threshold: 280 PSI (triggers alarm)\n• Sterility compromise: <275 PSI for >30 seconds\n\n**Current reading: 242 PSI** - This is 43 PSI below critical threshold and represents a 15% deviation from target.\n\n**Common causes:**\n1. Steam trap blockage (78% of historical cases)\n2. Boiler supply issue (15% of cases)\n3. Valve malfunction (7% of cases)");
    } else if (question.includes("steam trap") || question.includes("ST-447")) {
      setChatResponse("Steam Trap ST-447 is located adjacent to sensor PT-4472, near the Zone 4 inlet.\n\n**From SOP-ST-001 (Page 23):**\nSteam trap blockages typically present with:\n• Gradual pressure decline over 3-5 minutes\n• Correlated temperature drop (2-4°C)\n• No impact on flow rates\n\n**Resolution (Page 45):**\n1. Inspect trap for condensate buildup\n2. Clear blockage or bypass temporarily\n3. Run localized Zone 4 re-sterilization (45 min)\n4. Monitor pressure recovery\n\n**Historical success rate: 94% (7 of 7 recent incidents resolved this way)**");
    } else if (question.includes("seal failure") || question.includes("seal")) {
      setChatResponse("**Seal Failure Pattern Analysis:**\n\nSeal failures typically show:\n• Sudden pressure drop (<30 seconds)\n• Temperature AND flow rate anomalies\n• Multiple zone sensor alerts\n\n**Current incident does NOT match seal failure:**\n✗ Pressure decline was gradual (3+ minutes)\n✗ Flow rate is normal (95 GPM, within spec)\n✗ Only Zone 4 affected\n\n**Confidence: 94% this is NOT a seal failure**\n\nSeal failures require full SOP cleaning (6 hours). Current evidence suggests localized issue.");
    } else {
      setChatResponse("I can help you investigate this incident. Try asking about:\n• Specific sensor readings (PT-4472, TT-4473, ST-447)\n• Equipment specifications\n• Historical incident patterns\n• Recovery procedures");
    }
  };

  const handleGenerateInsight = () => {
    setShowInsight(true);
  };

  const handleProceedToSolution = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800">
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-700">
          <div>
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-500 animate-pulse" />
              <div>
                <h1 className="text-2xl font-bold text-red-400">INCIDENT #2847</h1>
                <p className="text-slate-300 mt-1">Line 3 - Aseptic Fill Station Alpha | Stopped: 14:23:47 PST</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Elapsed Time</p>
            <p className="text-3xl font-bold text-red-400 font-mono">00:04:23</p>
            <p className="text-sm text-amber-400 mt-1">Cost: $21,915</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 flex gap-1">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 text-slate-400 hover:text-slate-300 hover:bg-slate-700/50 transition-colors rounded-t-lg"
          >
            <Activity className="w-4 h-4 inline mr-2" />
            Monitoring
          </button>
          <button
            className="px-6 py-3 text-cyan-400 bg-slate-900 border-t-2 border-cyan-400 font-semibold rounded-t-lg"
          >
            <Search className="w-4 h-4 inline mr-2" />
            Investigation
          </button>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 text-slate-400 hover:text-slate-300 hover:bg-slate-700/50 transition-colors rounded-t-lg"
          >
            <Zap className="w-4 h-4 inline mr-2" />
            Recovery Plan
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Left Column - Data & Tools */}
        <div className="lg:col-span-2 space-y-6">
          {/* Alert Banner */}
          <div className="bg-gradient-to-r from-red-950/50 to-amber-950/50 border border-red-500/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <TrendingDown className="w-6 h-6 text-red-400" />
              <div>
                <p className="font-bold text-red-400">Loss of Sterility (LOS) Event Detected</p>
                <p className="text-sm text-slate-300">Multiple sensor anomalies detected in Zone 4 sterilization tunnel. Investigate below.</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 border-b border-slate-700">
            <button
              onClick={() => setActiveTab("sensors")}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === "sensors"
                  ? "text-cyan-400 border-b-2 border-cyan-400"
                  : "text-slate-400 hover:text-slate-300"
              }`}
            >
              <Activity className="w-4 h-4 inline mr-2" />
              Sensor Data
            </button>
            <button
              onClick={() => setActiveTab("sops")}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === "sops"
                  ? "text-cyan-400 border-b-2 border-cyan-400"
                  : "text-slate-400 hover:text-slate-300"
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Technical SOPs
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === "history"
                  ? "text-cyan-400 border-b-2 border-cyan-400"
                  : "text-slate-400 hover:text-slate-300"
              }`}
            >
              <Clock className="w-4 h-4 inline mr-2" />
              Historical Incidents
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "sensors" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(SENSOR_DATA).map(([id, sensor]) => (
                  <button
                    key={id}
                    onClick={() => setSelectedSensor(id)}
                    className={`rounded-lg p-4 text-left transition-all ${
                      selectedSensor === id
                        ? "bg-cyan-500/20 border-2 border-cyan-400"
                        : "bg-slate-800/50 border border-slate-700 hover:border-slate-600"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full mb-2 ${
                      sensor.status === "critical" ? "bg-red-500" :
                      sensor.status === "warning" ? "bg-amber-500" : "bg-green-500"
                    }`}></div>
                    <p className="text-xs text-slate-400 mb-1">{id}</p>
                    <p className="font-bold text-white">{sensor.name}</p>
                  </button>
                ))}
              </div>

              {selectedSensor && (
                <div className="bg-slate-800/50 rounded-xl p-6 shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {SENSOR_DATA[selectedSensor].name}
                      </h3>
                      <p className="text-sm text-slate-400">{SENSOR_DATA[selectedSensor].location}</p>
                      <p className="text-xs text-slate-500 mt-1 font-mono">{selectedSensor}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      SENSOR_DATA[selectedSensor].status === "critical" ? "bg-red-500/20 text-red-400" :
                      SENSOR_DATA[selectedSensor].status === "warning" ? "bg-amber-500/20 text-amber-400" :
                      "bg-green-500/20 text-green-400"
                    }`}>
                      {SENSOR_DATA[selectedSensor].status.toUpperCase()}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">CURRENT</p>
                      <p className="text-3xl font-bold text-white">
                        {SENSOR_DATA[selectedSensor].current}
                        <span className="text-lg text-slate-400 ml-1">{SENSOR_DATA[selectedSensor].unit}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">NORMAL RANGE</p>
                      <p className="text-xl font-semibold text-slate-300">
                        {Array.isArray(SENSOR_DATA[selectedSensor].normal)
                          ? `${SENSOR_DATA[selectedSensor].normal[0]}-${SENSOR_DATA[selectedSensor].normal[1]}`
                          : SENSOR_DATA[selectedSensor].normal[0]
                        } {SENSOR_DATA[selectedSensor].unit}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">TREND</p>
                      <p className="text-xl font-semibold text-red-400 capitalize flex items-center gap-2">
                        <TrendingDown className="w-5 h-5" />
                        {SENSOR_DATA[selectedSensor].trend}
                      </p>
                    </div>
                  </div>

                  {/* Time Series Chart (Simulated) */}
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-slate-400 mb-3">LAST 8 READINGS</p>
                    <div className="flex items-end justify-between h-32 gap-2">
                      {SENSOR_DATA[selectedSensor].history.map((value: number | string, idx: number) => {
                        const maxVal = Array.isArray(SENSOR_DATA[selectedSensor].normal)
                          ? SENSOR_DATA[selectedSensor].normal[1]
                          : 300;
                        const height = typeof value === 'number' ? (value / maxVal) * 100 : 50;
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                            <div className={`w-full rounded-t transition-all ${
                              typeof value === 'string' || (typeof value === 'number' && value < (Array.isArray(SENSOR_DATA[selectedSensor].normal) ? SENSOR_DATA[selectedSensor].normal[0] : 0))
                                ? "bg-red-500"
                                : "bg-cyan-500"
                            }`} style={{ height: `${height}%` }}></div>
                            <p className="text-[10px] text-slate-500">{SENSOR_DATA[selectedSensor].timestamps[idx]}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "sops" && (
            <div className="space-y-4">
              {SOP_DOCUMENTS.map((doc) => (
                <div key={doc.id} className="bg-slate-800/50 rounded-xl p-5 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-6 h-6 text-cyan-400" />
                    <div>
                      <h3 className="font-bold text-white">{doc.title}</h3>
                      <p className="text-xs text-slate-400 font-mono">{doc.id}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {doc.sections.map((section, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          section.relevant
                            ? "bg-cyan-500/10 border border-cyan-500/30"
                            : "bg-slate-900/30"
                        }`}
                      >
                        <div>
                          <p className="text-sm font-semibold text-white">{section.title}</p>
                          <p className="text-xs text-slate-400">Page {section.page}</p>
                        </div>
                        {section.relevant && (
                          <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-full font-semibold">
                            RELEVANT
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-3">
              {HISTORICAL_INCIDENTS.map((incident) => (
                <div
                  key={incident.id}
                  className={`bg-slate-800/50 rounded-xl p-5 shadow-lg ${
                    incident.cause === "Steam trap blockage"
                      ? "border border-amber-500/30"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-bold text-white">{incident.id}</p>
                      <p className="text-sm text-slate-400">{incident.date} • {incident.line}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-amber-400">{incident.downtime}</p>
                      <p className="text-xs text-slate-500">downtime</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400 text-xs mb-1">Root Cause</p>
                      <p className="text-white font-semibold">{incident.cause}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs mb-1">Resolution</p>
                      <p className="text-slate-300">{incident.resolution}</p>
                    </div>
                  </div>
                  {incident.cause === "Steam trap blockage" && (
                    <div className="mt-3 bg-amber-500/10 rounded-lg px-3 py-2">
                      <p className="text-xs text-amber-400 font-semibold">
                        ⚠️ Similar pattern to current incident
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* AI Insight Generator */}
          {!showInsight && (
            <button
              onClick={handleGenerateInsight}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-3"
            >
              <Lightbulb className="w-6 h-6" />
              Generate AI Insight from Investigation Data
            </button>
          )}

          {showInsight && (
            <div className="bg-gradient-to-br from-purple-950/50 to-pink-950/50 border-2 border-purple-500 rounded-xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-purple-400" />
                <h2 className="text-2xl font-bold text-purple-400">AI-GENERATED INSIGHT</h2>
                <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-semibold">
                  94% Confidence
                </span>
              </div>

              <div className="bg-black/40 rounded-lg p-5 mb-4">
                <h3 className="text-xl font-bold text-white mb-3">Root Cause: Steam Trap Blockage (ST-447)</h3>
                <div className="space-y-2 text-slate-300">
                  <p>• <strong>Primary evidence:</strong> PT-4472 shows gradual pressure decline from 290 to 242 PSI over 3 minutes</p>
                  <p>• <strong>Correlated event:</strong> TT-4473 temperature drop (138°C → 134°C) with 2-second lag</p>
                  <p>• <strong>No anomalies in:</strong> Flow rate (FT-4401), other zones, seals</p>
                  <p>• <strong>Historical pattern match:</strong> 7 previous incidents with identical signature, all resolved via steam trap clearance</p>
                  <p>• <strong>Diagnosis confidence:</strong> 94% (NOT a seal failure or contamination event)</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-red-900/30 rounded-lg p-4 border border-red-500/30">
                  <p className="text-sm text-slate-400 mb-2">❌ Traditional Approach</p>
                  <p className="text-2xl font-bold text-red-400">6 hours</p>
                  <p className="text-sm text-slate-500">Full SOP cleaning • $250,000 cost</p>
                </div>
                <div className="bg-green-900/30 rounded-lg p-4 border border-green-500/30">
                  <p className="text-sm text-slate-400 mb-2">✓ Recommended Approach</p>
                  <p className="text-2xl font-bold text-green-400">45 minutes</p>
                  <p className="text-sm text-slate-500">Localized fix • $40,000 cost</p>
                </div>
              </div>

              <button
                onClick={handleProceedToSolution}
                className="w-full bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-3"
              >
                Proceed to Recovery Protocol
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Right Column - AI Assistant */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 sticky top-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-6 h-6 text-cyan-400" />
              <h2 className="text-lg font-bold text-white">ASK ETHER-EYE</h2>
            </div>

            <p className="text-sm text-slate-400 mb-4">
              Query technical documentation, sensor data, and historical patterns
            </p>

            {/* Quick Question Buttons */}
            <div className="space-y-2 mb-6">
              <button
                onClick={() => handleAskQuestion("What's the normal steam pressure for PT-4472?")}
                className="w-full text-left bg-slate-700/50 hover:bg-slate-700 rounded-lg p-3 text-sm transition-all"
              >
                What&apos;s the normal steam pressure for PT-4472?
              </button>
              <button
                onClick={() => handleAskQuestion("Where is steam trap ST-447 located?")}
                className="w-full text-left bg-slate-700/50 hover:bg-slate-700 rounded-lg p-3 text-sm transition-all"
              >
                Where is steam trap ST-447 located?
              </button>
              <button
                onClick={() => handleAskQuestion("Could this be a seal failure?")}
                className="w-full text-left bg-slate-700/50 hover:bg-slate-700 rounded-lg p-3 text-sm transition-all"
              >
                Could this be a seal failure?
              </button>
            </div>

            {/* Response Area */}
            {chatResponse && (
              <div className="bg-cyan-500/10 rounded-lg p-4 max-h-[500px] overflow-y-auto">
                <div className="flex items-start gap-2 mb-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <p className="text-xs text-cyan-400 font-semibold">ETHER-EYE RESPONSE</p>
                </div>
                <p className="text-sm text-slate-300 whitespace-pre-line">{chatResponse}</p>
              </div>
            )}

            {!chatResponse && (
              <div className="bg-slate-900/30 rounded-lg p-4 text-center min-h-[200px] flex items-center justify-center">
                <p className="text-slate-500 text-sm">
                  Click a question above to get instant answers from technical documentation
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

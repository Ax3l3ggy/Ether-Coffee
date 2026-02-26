'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Activity, Droplets, Thermometer, Gauge, AlertTriangle } from 'lucide-react';

// Mock data for 8 production lines
const PRODUCTION_LINES = [
  { id: 1, name: "Line 1", station: "Aseptic Fill Station Alpha", status: "running", throughput: 450, temp: 138, pressure: 290 },
  { id: 2, name: "Line 2", station: "Aseptic Fill Station Beta", status: "running", throughput: 445, temp: 137, pressure: 288 },
  { id: 3, name: "Line 3", station: "Aseptic Fill Station Alpha", status: "running", throughput: 448, temp: 138, pressure: 287 },
  { id: 4, name: "Line 4", station: "Aseptic Fill Station Gamma", status: "running", throughput: 442, temp: 139, pressure: 291 },
  { id: 5, name: "Line 5", station: "Aseptic Fill Station Beta", status: "running", throughput: 451, temp: 137, pressure: 289 },
  { id: 6, name: "Line 6", station: "Aseptic Fill Station Delta", status: "running", throughput: 447, temp: 138, pressure: 290 },
  { id: 7, name: "Line 7", station: "Aseptic Fill Station Gamma", status: "running", throughput: 449, temp: 138, pressure: 288 },
  { id: 8, name: "Line 8", station: "Aseptic Fill Station Delta", status: "running", throughput: 443, temp: 139, pressure: 291 }
];

export default function Home() {
  const router = useRouter();
  const [lines, setLines] = useState(PRODUCTION_LINES);
  const [showAlert, setShowAlert] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const totalThroughput = lines.reduce((sum, line) => sum + line.throughput, 0);

  const simulateLineStop = () => {
    setShowAlert(true);

    // Countdown before transitioning
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          // Navigate to dashboard after countdown
          setTimeout(() => {
            router.push('/dashboard');
          }, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Update Line 3 status
    setTimeout(() => {
      setLines(prevLines =>
        prevLines.map(line =>
          line.id === 3
            ? { ...line, status: "stopped", throughput: 0, pressure: 242, temp: 134 }
            : line
        )
      );
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-cyan-400">ETHER-EYE MONITORING SYSTEM</h1>
            <p className="text-slate-300 mt-1">Real-time production line monitoring</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">System Status</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-xl font-bold text-green-400">ALL SYSTEMS OPERATIONAL</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-6 h-6 text-green-400" />
              <h3 className="text-sm text-slate-400 font-semibold">ACTIVE LINES</h3>
            </div>
            <p className="text-4xl font-bold text-white">{lines.filter(l => l.status === 'running').length}/8</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Droplets className="w-6 h-6 text-cyan-400" />
              <h3 className="text-sm text-slate-400 font-semibold">TOTAL THROUGHPUT</h3>
            </div>
            <p className="text-4xl font-bold text-white">{totalThroughput}</p>
            <p className="text-xs text-slate-500 mt-1">units/min</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Thermometer className="w-6 h-6 text-orange-400" />
              <h3 className="text-sm text-slate-400 font-semibold">AVG TEMPERATURE</h3>
            </div>
            <p className="text-4xl font-bold text-white">138°C</p>
            <p className="text-xs text-slate-500 mt-1">optimal range</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Gauge className="w-6 h-6 text-purple-400" />
              <h3 className="text-sm text-slate-400 font-semibold">AVG PRESSURE</h3>
            </div>
            <p className="text-4xl font-bold text-white">289 PSI</p>
            <p className="text-xs text-slate-500 mt-1">within spec</p>
          </div>
        </div>

        {/* Production Lines Grid */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-cyan-400" />
            PRODUCTION LINES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {lines.map((line) => (
              <div
                key={line.id}
                className={`rounded-xl p-5 shadow-lg transition-all ${
                  line.status === 'running'
                    ? 'bg-gradient-to-br from-green-950/30 to-slate-900 border border-green-500/20'
                    : 'bg-gradient-to-br from-red-950/50 to-slate-900 border-2 border-red-500 animate-pulse'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-white">{line.name}</h3>
                  <div className={`w-3 h-3 rounded-full ${
                    line.status === 'running' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                  }`}></div>
                </div>

                <p className="text-xs text-slate-400 mb-4">{line.station}</p>

                {line.status === 'running' ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Throughput:</span>
                        <span className="text-green-400 font-semibold">{line.throughput} u/m</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Temperature:</span>
                        <span className="text-white">{line.temp}°C</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Pressure:</span>
                        <span className="text-white">{line.pressure} PSI</span>
                      </div>
                    </div>
                    <div className="mt-3 bg-green-500/20 rounded-lg px-3 py-1 text-center">
                      <span className="text-xs text-green-400 font-semibold">OPERATIONAL</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Throughput:</span>
                        <span className="text-red-400 font-semibold">{line.throughput} u/m</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Temperature:</span>
                        <span className="text-amber-400">{line.temp}°C</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Pressure:</span>
                        <span className="text-red-400">{line.pressure} PSI</span>
                      </div>
                    </div>
                    <div className="mt-3 bg-red-500/20 rounded-lg px-3 py-1 text-center">
                      <span className="text-xs text-red-400 font-semibold">⚠️ LINE STOPPED</span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Demo Control */}
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-900 rounded-xl p-8 shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">DEMO CONTROL PANEL</h2>
          <p className="text-slate-400 mb-6">Click below to simulate a Loss of Sterility (LOS) event on Line 3</p>
          <button
            onClick={simulateLineStop}
            disabled={showAlert}
            className={`px-12 py-5 rounded-xl font-bold text-xl transition-all transform hover:scale-105 ${
              showAlert
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-xl shadow-red-500/50'
            }`}
          >
            {showAlert ? `INCIDENT TRIGGERED - REDIRECTING IN ${countdown}...` : '🚨 SIMULATE LINE-STOP EVENT'}
          </button>
        </div>
      </div>

      {/* Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in">
          <div className="bg-gradient-to-br from-red-950 to-slate-900 border-2 border-red-500 rounded-2xl p-12 max-w-2xl mx-4 shadow-2xl animate-in zoom-in">
            <div className="flex items-center gap-4 mb-6">
              <AlertTriangle className="w-16 h-16 text-red-500 animate-pulse" />
              <div>
                <h2 className="text-4xl font-bold text-red-400">LOSS OF STERILITY DETECTED</h2>
                <p className="text-xl text-slate-300 mt-2">Line 3 - Aseptic Fill Station Alpha</p>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-6 mb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <p className="text-lg text-slate-300">Automatic line shutdown initiated</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <p className="text-lg text-slate-300">Engaging Ether-Eye diagnostic system</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  <p className="text-lg text-slate-300">Analyzing 55,000 sensor data points</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-3xl font-bold text-red-400 mb-2">Estimated Cost: $5,000/minute</p>
              <p className="text-slate-400">Redirecting to incident dashboard in {countdown} seconds...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

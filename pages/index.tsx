'use client';
import { useRouter } from 'next/router';
import { Activity, Droplets, Thermometer, Gauge, AlertTriangle, Search, Zap } from 'lucide-react';

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

  // Set Line 3 as stopped
  const lines = PRODUCTION_LINES.map(line =>
    line.id === 3
      ? { ...line, status: "stopped", throughput: 0, pressure: 242, temp: 134 }
      : line
  );

  const totalThroughput = lines.reduce((sum, line) => sum + line.throughput, 0);

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
            className="px-6 py-3 text-cyan-400 bg-slate-900 border-t-2 border-cyan-400 font-semibold rounded-t-lg"
          >
            <Activity className="w-4 h-4 inline mr-2" />
            Monitoring
          </button>
          <button
            onClick={() => router.push('/investigation')}
            className="px-6 py-3 text-slate-400 hover:text-slate-300 hover:bg-slate-700/50 transition-colors rounded-t-lg"
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

      </div>
    </div>
  );
}

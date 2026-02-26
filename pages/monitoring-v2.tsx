'use client';
import { useRouter } from 'next/router';
import { Activity, Droplets, Thermometer, Gauge, Search, Zap } from 'lucide-react';

// Mock data for 8 production lines
const PRODUCTION_LINES = [
  { id: 1, name: "Line 1", station: "Aseptic Fill Station Alpha", status: "running", throughput: 450, temp: 138, pressure: 290 },
  { id: 2, name: "Line 2", station: "Aseptic Fill Station Beta", status: "running", throughput: 445, temp: 137, pressure: 288 },
  { id: 3, name: "Line 3", station: "Aseptic Fill Station Alpha", status: "stopped", throughput: 0, temp: 134, pressure: 242 },
  { id: 4, name: "Line 4", station: "Aseptic Fill Station Gamma", status: "running", throughput: 442, temp: 139, pressure: 291 },
  { id: 5, name: "Line 5", station: "Aseptic Fill Station Beta", status: "running", throughput: 451, temp: 137, pressure: 289 },
  { id: 6, name: "Line 6", station: "Aseptic Fill Station Delta", status: "running", throughput: 447, temp: 138, pressure: 290 },
  { id: 7, name: "Line 7", station: "Aseptic Fill Station Gamma", status: "running", throughput: 449, temp: 138, pressure: 288 },
  { id: 8, name: "Line 8", station: "Aseptic Fill Station Delta", status: "running", throughput: 443, temp: 139, pressure: 291 }
];

export default function MonitoringV2() {
  const router = useRouter();
  const lines = PRODUCTION_LINES;
  const totalThroughput = lines.reduce((sum, line) => sum + line.throughput, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="px-8 py-5 flex items-center justify-between border-b border-slate-200">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <div>
                <h1 className="text-xl font-semibold text-slate-900">Incident #2847</h1>
                <p className="text-sm text-slate-600 mt-0.5">Line 3 - Aseptic Fill Station Alpha | Stopped: 14:23:47 PST</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Elapsed Time</p>
            <p className="text-2xl font-semibold text-slate-900 font-mono">00:04:23</p>
            <p className="text-xs text-amber-600 mt-1">Cost: $21,915</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-8 flex gap-0 border-b border-slate-200">
          <button
            className="px-5 py-3 text-sm font-medium text-slate-900 border-b-2 border-blue-600 hover:bg-slate-50 transition-colors"
          >
            <Activity className="w-4 h-4 inline mr-2" />
            Monitoring
          </button>
          <button
            onClick={() => router.push('/investigation')}
            className="px-5 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors border-b-2 border-transparent"
          >
            <Search className="w-4 h-4 inline mr-2" />
            Investigation
          </button>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-5 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors border-b-2 border-transparent"
          >
            <Zap className="w-4 h-4 inline mr-2" />
            Recovery Plan
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8 bg-slate-50/30">
        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-white border border-slate-200 rounded-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-green-600" />
              <h3 className="text-xs text-slate-500 font-medium uppercase tracking-wide">Active Lines</h3>
            </div>
            <p className="text-3xl font-semibold text-slate-900">{lines.filter(l => l.status === 'running').length}/8</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <Droplets className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs text-slate-500 font-medium uppercase tracking-wide">Total Throughput</h3>
            </div>
            <p className="text-3xl font-semibold text-slate-900">{totalThroughput}</p>
            <p className="text-xs text-slate-500 mt-1">units/min</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <Thermometer className="w-4 h-4 text-orange-600" />
              <h3 className="text-xs text-slate-500 font-medium uppercase tracking-wide">Avg Temperature</h3>
            </div>
            <p className="text-3xl font-semibold text-slate-900">138°C</p>
            <p className="text-xs text-slate-500 mt-1">optimal range</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <Gauge className="w-4 h-4 text-purple-600" />
              <h3 className="text-xs text-slate-500 font-medium uppercase tracking-wide">Avg Pressure</h3>
            </div>
            <p className="text-3xl font-semibold text-slate-900">289 PSI</p>
            <p className="text-xs text-slate-500 mt-1">within spec</p>
          </div>
        </div>

        {/* Production Lines Grid */}
        <div>
          <h2 className="text-base font-semibold mb-4 text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-slate-600" />
            Production Lines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {lines.map((line) => (
              <div
                key={line.id}
                className={`bg-white border rounded-sm p-4 transition-all ${
                  line.status === 'running'
                    ? 'border-slate-200 hover:border-slate-300'
                    : 'border-red-300 bg-red-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-900">{line.name}</h3>
                  <div className={`w-2 h-2 rounded-full ${
                    line.status === 'running' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                </div>

                <p className="text-xs text-slate-500 mb-3 truncate">{line.station}</p>

                {line.status === 'running' ? (
                  <>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Throughput:</span>
                        <span className="text-slate-900 font-medium">{line.throughput} u/m</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Temperature:</span>
                        <span className="text-slate-900 font-medium">{line.temp}°C</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Pressure:</span>
                        <span className="text-slate-900 font-medium">{line.pressure} PSI</span>
                      </div>
                    </div>
                    <div className="mt-3 bg-green-50 border border-green-200 rounded-sm px-2 py-1 text-center">
                      <span className="text-xs text-green-700 font-medium">Operational</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Throughput:</span>
                        <span className="text-red-600 font-medium">{line.throughput} u/m</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Temperature:</span>
                        <span className="text-amber-600 font-medium">{line.temp}°C</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Pressure:</span>
                        <span className="text-red-600 font-medium">{line.pressure} PSI</span>
                      </div>
                    </div>
                    <div className="mt-3 bg-red-100 border border-red-300 rounded-sm px-2 py-1 text-center">
                      <span className="text-xs text-red-700 font-medium">⚠ Line Stopped</span>
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

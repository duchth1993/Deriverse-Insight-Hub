'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Navbar } from '@/components/navbar';
import { KPICards } from '@/components/kpi-cards';
import { PnLChart } from '@/components/pnl-chart';
import { PerformanceWidgets } from '@/components/performance-widgets';
import { TradeHistoryTable } from '@/components/trade-history-table';
import { AnalyticsPanels } from '@/components/analytics-panels';
import { AIInsights } from '@/components/ai-insights';
import { CommunityBenchmark } from '@/components/community-benchmark';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dateRange, setDateRange] = useState('30d');
  const [selectedSymbol, setSelectedSymbol] = useState('SOL');

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          selectedSymbol={selectedSymbol}
          onSymbolChange={setSelectedSymbol}
        />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 space-y-6">
            {/* KPI Cards */}
            <KPICards dateRange={dateRange} selectedSymbol={selectedSymbol} />

            {/* PnL Chart */}
            <PnLChart dateRange={dateRange} selectedSymbol={selectedSymbol} />

            {/* Performance Widgets Grid */}
            <PerformanceWidgets dateRange={dateRange} selectedSymbol={selectedSymbol} />

            {/* Innovation Features Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AIInsights />
              <CommunityBenchmark />
            </div>

            {/* Analytics Panels */}
            <AnalyticsPanels dateRange={dateRange} selectedSymbol={selectedSymbol} />

            {/* Trade History Table */}
            <TradeHistoryTable selectedSymbol={selectedSymbol} />

            {/* Footer */}
            <footer className="border-t border-border pt-6 pb-2 text-center text-sm text-muted-foreground">
              <p>Powered by Deriverse on Solana</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

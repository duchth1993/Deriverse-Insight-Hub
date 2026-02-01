'use client';

import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface PerformanceWidgetsProps {
  dateRange: string;
  selectedSymbol: string;
}

const winLossData = [
  { name: 'Average Win', value: 245.5 },
  { name: 'Average Loss', value: -189.3 },
];

const longShortData = [
  { name: 'Long', value: 65 },
  { name: 'Short', value: 35 },
];

const longShortTrendData = [
  { date: 'Week 1', long: 65, short: 35 },
  { date: 'Week 2', long: 62, short: 38 },
  { date: 'Week 3', long: 67, short: 33 },
  { date: 'Week 4', long: 65, short: 35 },
];

const topGainsLosses = [
  { symbol: 'SOL/USDC', type: 'Long', pnl: 2450, icon: '📈' },
  { symbol: 'BTC-PERP', type: 'Short', pnl: -1230, icon: '📉' },
  { symbol: 'ETH-OPT', type: 'Long', pnl: 1890, icon: '📈' },
  { symbol: 'MATIC', type: 'Long', pnl: 1234, icon: '📈' },
  { symbol: 'AVAX', type: 'Short', pnl: -456, icon: '📉' },
];

const COLORS_GAIN_LOSS = ['#14b8a6', '#ef4444'];
const COLORS_LONG_SHORT = ['#8b5cf6', '#14b8a6'];

export function PerformanceWidgets({ dateRange, selectedSymbol }: PerformanceWidgetsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Win/Loss Analysis */}
      <Card className="bg-card border-border p-6 md:col-span-1">
        <h3 className="text-sm font-semibold text-foreground mb-4">Win/Loss Analysis</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={winLossData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <XAxis dataKey="name" stroke="#a0a0a0" style={{ fontSize: '12px' }} />
              <YAxis stroke="#a0a0a0" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333333',
                  borderRadius: '6px',
                }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {winLossData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.value > 0 ? '#14b8a6' : '#ef4444'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Long/Short Bias Donut */}
      <Card className="bg-card border-border p-6 md:col-span-1">
        <h3 className="text-sm font-semibold text-foreground mb-4">Long/Short Bias</h3>
        <div className="h-48 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={longShortData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
              >
                {longShortData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS_LONG_SHORT[index]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333333',
                  borderRadius: '6px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-center gap-4 text-xs">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            65% Long
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary" />
            35% Short
          </span>
        </div>
      </Card>

      {/* Long/Short Trend */}
      <Card className="bg-card border-border p-6 md:col-span-1">
        <h3 className="text-sm font-semibold text-foreground mb-4">Long/Short Trend</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={longShortTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <XAxis dataKey="date" stroke="#a0a0a0" style={{ fontSize: '12px' }} />
              <YAxis stroke="#a0a0a0" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333333',
                  borderRadius: '6px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="long"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={false}
                name="Long %"
              />
              <Line
                type="monotone"
                dataKey="short"
                stroke="#14b8a6"
                strokeWidth={2}
                dot={false}
                name="Short %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Top Gains/Losses */}
      <Card className="bg-card border-border p-6 md:col-span-1">
        <h3 className="text-sm font-semibold text-foreground mb-4">Top Gains/Losses</h3>
        <div className="space-y-3">
          {topGainsLosses.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-lg">{item.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground truncate">{item.symbol}</p>
                  <p className="text-xs text-muted-foreground">{item.type}</p>
                </div>
              </div>
              <p className={`font-semibold whitespace-nowrap ${item.pnl > 0 ? 'text-secondary' : 'text-red-500'}`}>
                {item.pnl > 0 ? '+' : ''}{item.pnl.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

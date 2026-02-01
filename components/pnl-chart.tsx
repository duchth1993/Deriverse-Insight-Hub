'use client';

import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface PnLChartProps {
  dateRange: string;
  selectedSymbol: string;
}

// Mock historical data
const data = Array.from({ length: 50 }, (_, i) => ({
  date: `Day ${i + 1}`,
  pnl: 10000 + Math.random() * 5000 + i * 100 + (Math.sin(i * 0.1) * 2000),
  drawdown: Math.random() * -1000,
}));

export function PnLChart({ dateRange, selectedSymbol }: PnLChartProps) {
  return (
    <Card className="bg-card border-border p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">Equity Curve</h2>
        <p className="text-sm text-muted-foreground mt-1">Historical PnL with drawdown analysis</p>
      </div>

      <div className="h-96 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorDrawdown" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
            <XAxis dataKey="date" stroke="#a0a0a0" style={{ fontSize: '12px' }} />
            <YAxis stroke="#a0a0a0" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #333333',
                borderRadius: '6px',
              }}
              labelStyle={{ color: '#ffffff' }}
              formatter={(value) => `$${value.toFixed(2)}`}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="pnl"
              stroke="#8b5cf6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPnl)"
              name="PnL"
            />
            <Area
              type="monotone"
              dataKey="drawdown"
              stroke="#ef4444"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorDrawdown)"
              name="Drawdown"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-4">
        <div>
          <p className="text-xs text-muted-foreground">Peak Drawdown</p>
          <p className="text-lg font-semibold text-red-500">-$1,234.50</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Current Equity</p>
          <p className="text-lg font-semibold text-secondary">$12,450.50</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Recovery %</p>
          <p className="text-lg font-semibold text-primary">91.2%</p>
        </div>
      </div>
    </Card>
  );
}

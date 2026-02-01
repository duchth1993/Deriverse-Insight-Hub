'use client';

import { Card } from '@/components/ui/card';
import { Users, TrendingUp } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const benchmarkData = [
  { name: 'You', value: 12450 },
  { name: 'Community Avg', value: 8230 },
];

export function CommunityBenchmark() {
  return (
    <Card className="bg-card border-border p-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-secondary to-teal-500">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-2">Community Benchmark</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Your performance vs. anonymous community average (30-day PnL)
          </p>

          <div className="h-48 -mx-6 px-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={benchmarkData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                <XAxis dataKey="name" stroke="#a0a0a0" style={{ fontSize: '12px' }} />
                <YAxis stroke="#a0a0a0" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #333333',
                    borderRadius: '6px',
                  }}
                  formatter={(value) => `$${value.toFixed(0)}`}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {benchmarkData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? '#8b5cf6' : '#333333'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-secondary" />
            <p className="text-foreground">
              <span className="font-semibold">51% ahead</span>
              <span className="text-muted-foreground"> of community average</span>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

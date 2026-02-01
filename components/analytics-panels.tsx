'use client';

import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
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

interface AnalyticsPanelsProps {
  dateRange: string;
  selectedSymbol: string;
}

const feeBreakdownData = [
  { name: 'Maker Fees', value: 89.5 },
  { name: 'Taker Fees', value: 112.3 },
  { name: 'Funding Fees', value: 32.7 },
];

const orderTypePerformanceData = [
  { name: 'Market', pnl: 4520, winRate: 65 },
  { name: 'Limit', pnl: 5230, winRate: 72 },
  { name: 'Stop', pnl: 2700, winRate: 58 },
];

const timeOfDayData = [
  { hour: '00:00', pnl: 450 },
  { hour: '04:00', pnl: 220 },
  { hour: '08:00', pnl: 890 },
  { hour: '12:00', pnl: 1240 },
  { hour: '16:00', pnl: 680 },
  { hour: '20:00', pnl: 1120 },
];

const COLORS_FEES = ['#8b5cf6', '#14b8a6', '#f97316'];

export function AnalyticsPanels({ dateRange, selectedSymbol }: AnalyticsPanelsProps) {
  return (
    <Card className="bg-card border-border p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Advanced Analytics</h2>

      <Tabs defaultValue="fees" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-muted">
          <TabsTrigger value="fees">Fee Breakdown</TabsTrigger>
          <TabsTrigger value="orderType">Order Types</TabsTrigger>
          <TabsTrigger value="timeOfDay">Time of Day</TabsTrigger>
        </TabsList>

        {/* Fee Breakdown */}
        <TabsContent value="fees" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={feeBreakdownData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `$${entry.value.toFixed(0)}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {feeBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS_FEES[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #333333',
                      borderRadius: '6px',
                    }}
                    formatter={(value) => `$${value.toFixed(2)}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Total Fees: $234.50</p>
              {feeBreakdownData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS_FEES[index] }}
                    />
                    <span className="text-sm text-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">${item.value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Order Type Performance */}
        <TabsContent value="orderType" className="space-y-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderTypePerformanceData}>
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
                <Legend />
                <Bar dataKey="pnl" fill="#8b5cf6" name="PnL ($)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="winRate" fill="#14b8a6" name="Win Rate (%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        {/* Time of Day */}
        <TabsContent value="timeOfDay" className="space-y-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeOfDayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                <XAxis dataKey="hour" stroke="#a0a0a0" style={{ fontSize: '12px' }} />
                <YAxis stroke="#a0a0a0" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #333333',
                    borderRadius: '6px',
                  }}
                  formatter={(value) => `$${value.toFixed(0)}`}
                />
                <Bar dataKey="pnl" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}

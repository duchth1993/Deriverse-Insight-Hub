'use client';

import { TrendingUp, TrendingDown, BarChart3, DollarSign, Target, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

interface KPICardsProps {
  dateRange: string;
  selectedSymbol: string;
}

// Mock sparkline data
const sparklineData = Array.from({ length: 20 }, (_, i) => ({
  value: Math.random() * 1000 + 5000,
}));

const kpiCards = [
  {
    title: 'Total PnL',
    value: '$12,450.50',
    change: '+24.5%',
    isPositive: true,
    icon: DollarSign,
    color: 'from-primary to-purple-600',
  },
  {
    title: 'Win Rate',
    value: '68%',
    change: '+5.2%',
    isPositive: true,
    icon: Target,
    color: 'from-secondary to-teal-500',
  },
  {
    title: 'Total Volume',
    value: '$2.34M',
    change: '-3.1%',
    isPositive: false,
    icon: BarChart3,
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Fees Paid',
    value: '$234.50',
    change: '+12.3%',
    isPositive: false,
    icon: Activity,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Trade Count',
    value: '156',
    change: '+18.7%',
    isPositive: true,
    icon: BarChart3,
    color: 'from-pink-500 to-purple-600',
  },
  {
    title: 'Long/Short Ratio',
    value: '1.34',
    change: '+2.1%',
    isPositive: true,
    icon: TrendingUp,
    color: 'from-emerald-500 to-teal-500',
  },
];

export function KPICards({ dateRange, selectedSymbol }: KPICardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {kpiCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
                <div className="flex items-end gap-2 mb-3">
                  <p className="text-2xl font-bold text-foreground">{card.value}</p>
                  <div className={`flex items-center gap-1 text-sm ${card.isPositive ? 'text-secondary' : 'text-red-500'}`}>
                    {card.isPositive ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span>{card.change}</span>
                  </div>
                </div>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color} text-white`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>

            {/* Sparkline */}
            <div className="h-8 -mx-4 -mb-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparklineData}>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'transparent',
                      border: 'none',
                    }}
                    cursor={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={card.isPositive ? '#14b8a6' : '#ef4444'}
                    dot={false}
                    strokeWidth={1.5}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

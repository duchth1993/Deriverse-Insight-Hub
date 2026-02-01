'use client';

import { Card } from '@/components/ui/card';
import { AlertCircle, Lightbulb, TrendingDown, Zap } from 'lucide-react';
import { Alert } from '@/components/ui/alert';

export function AIInsights() {
  return (
    <Card className="bg-card border-border p-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-purple-600">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-2">AI Insights</h3>
          <Alert className="bg-yellow-500/10 border-yellow-500/30 text-foreground mb-3">
            <AlertCircle className="h-4 w-4" />
            <div>
              <p className="font-medium">Overtrading Detected</p>
              <p className="text-sm mt-1">
                You've executed 25 trades/day with a 45% win rate. Consider reducing frequency to improve consistency.
              </p>
            </div>
          </Alert>

          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <TrendingDown className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Avoid High Volatility Hours</p>
                <p className="text-muted-foreground">Your worst losses occur between 2-4 PM UTC</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Optimal Entry Window</p>
                <p className="text-muted-foreground">68% of your wins occur 10-30 min after support rebounds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

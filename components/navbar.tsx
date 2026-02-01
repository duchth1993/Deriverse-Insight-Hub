'use client';

import { Menu, Wallet, Moon, Sun, Calendar, Filter, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface NavbarProps {
  onMenuToggle: () => void;
  dateRange: string;
  onDateRangeChange: (range: string) => void;
  selectedSymbol: string;
  onSymbolChange: (symbol: string) => void;
}

const symbols = ['SOL', 'BTC-PERP', 'ETH-OPT', 'MATIC', 'AVAX'];
const dateRanges = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: 'custom', label: 'Custom' },
];

export function Navbar({
  onMenuToggle,
  dateRange,
  onDateRangeChange,
  selectedSymbol,
  onSymbolChange,
}: NavbarProps) {
  return (
    <nav className="border-b border-border bg-card p-4 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="md:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>

        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <Select value={dateRange} onValueChange={onDateRangeChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dateRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={selectedSymbol} onValueChange={onSymbolChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {symbols.map((symbol) => (
                <SelectItem key={symbol} value={symbol}>
                  {symbol}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
        >
          <Sun className="w-4 h-4 hidden dark:block" />
          <Moon className="w-4 h-4 dark:hidden" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="gap-2 hidden sm:flex bg-transparent"
        >
          <Wallet className="w-4 h-4" />
          Connect Wallet
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          <User className="w-4 h-4" />
        </Button>
      </div>
    </nav>
  );
}

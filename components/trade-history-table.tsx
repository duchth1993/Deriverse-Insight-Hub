'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Download, Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface Trade {
  id: string;
  date: string;
  symbol: string;
  type: 'Spot' | 'Perps' | 'Options';
  side: 'Long' | 'Short';
  entryPrice: number;
  exitPrice: number;
  size: number;
  pnl: number;
  fees: number;
  duration: string;
  notes: string;
}

const mockTrades: Trade[] = [
  {
    id: '1',
    date: '2024-01-15 14:23',
    symbol: 'SOL/USDC',
    type: 'Spot',
    side: 'Long',
    entryPrice: 142.5,
    exitPrice: 158.3,
    size: 10,
    pnl: 158,
    fees: 2.5,
    duration: '2h 15m',
    notes: 'Support bounce trade',
  },
  {
    id: '2',
    date: '2024-01-15 11:45',
    symbol: 'BTC-PERP',
    type: 'Perps',
    side: 'Short',
    entryPrice: 42250,
    exitPrice: 41890,
    size: 0.5,
    pnl: 180,
    fees: 5.2,
    duration: '4h 30m',
    notes: 'Resistance rejection',
  },
  {
    id: '3',
    date: '2024-01-14 16:12',
    symbol: 'ETH-OPT',
    type: 'Options',
    side: 'Long',
    entryPrice: 2.5,
    exitPrice: 4.2,
    size: 100,
    pnl: 170,
    fees: 3.8,
    duration: '6h',
    notes: 'Call spread entry',
  },
  {
    id: '4',
    date: '2024-01-14 10:33',
    symbol: 'MATIC',
    type: 'Spot',
    side: 'Long',
    entryPrice: 0.98,
    exitPrice: 0.92,
    size: 500,
    pnl: -300,
    fees: 1.2,
    duration: '8h 45m',
    notes: 'Failed breakout',
  },
  {
    id: '5',
    date: '2024-01-13 15:20',
    symbol: 'AVAX',
    type: 'Perps',
    side: 'Long',
    entryPrice: 38.5,
    exitPrice: 41.2,
    size: 2,
    pnl: 54,
    fees: 1.8,
    duration: '3h 30m',
    notes: 'Trend following',
  },
];

export function TradeHistoryTable({ selectedSymbol }: { selectedSymbol: string }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  const filteredTrades = mockTrades.filter(
    (trade) =>
      trade.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trade.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTrades.length / pageSize);
  const paginatedTrades = filteredTrades.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const handleExportCSV = () => {
    const csv = [
      ['Date', 'Symbol', 'Type', 'Side', 'Entry Price', 'Exit Price', 'Size', 'PnL', 'Fees', 'Duration', 'Notes'],
      ...filteredTrades.map((t) => [
        t.date,
        t.symbol,
        t.type,
        t.side,
        t.entryPrice,
        t.exitPrice,
        t.size,
        t.pnl,
        t.fees,
        t.duration,
        t.notes,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'trade-history.csv';
    a.click();
  };

  return (
    <Card className="bg-card border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Trade History</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Detailed view of all executed trades
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportCSV}
          className="gap-2 bg-transparent"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search trades..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(0);
          }}
          className="flex-1 bg-input border-border"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Date/Time</TableHead>
              <TableHead className="text-muted-foreground">Symbol</TableHead>
              <TableHead className="text-muted-foreground">Type</TableHead>
              <TableHead className="text-muted-foreground">Side</TableHead>
              <TableHead className="text-muted-foreground text-right">Entry Price</TableHead>
              <TableHead className="text-muted-foreground text-right">Exit Price</TableHead>
              <TableHead className="text-muted-foreground text-right">Size</TableHead>
              <TableHead className="text-muted-foreground text-right">PnL</TableHead>
              <TableHead className="text-muted-foreground text-right">Fees</TableHead>
              <TableHead className="text-muted-foreground">Duration</TableHead>
              <TableHead className="text-muted-foreground">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTrades.map((trade) => (
              <TableRow key={trade.id} className="border-border hover:bg-muted/50">
                <TableCell className="text-foreground text-sm">{trade.date}</TableCell>
                <TableCell className="text-foreground font-medium">{trade.symbol}</TableCell>
                <TableCell className="text-foreground text-sm">{trade.type}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      trade.side === 'Long'
                        ? 'bg-secondary/20 text-secondary'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {trade.side}
                  </span>
                </TableCell>
                <TableCell className="text-foreground text-sm text-right">
                  ${trade.entryPrice.toFixed(2)}
                </TableCell>
                <TableCell className="text-foreground text-sm text-right">
                  ${trade.exitPrice.toFixed(2)}
                </TableCell>
                <TableCell className="text-foreground text-sm text-right">{trade.size}</TableCell>
                <TableCell
                  className={`text-sm text-right font-semibold ${
                    trade.pnl > 0 ? 'text-secondary' : 'text-red-500'
                  }`}
                >
                  {trade.pnl > 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm text-right">
                  ${trade.fees.toFixed(2)}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{trade.duration}</TableCell>
                <TableCell className="text-muted-foreground text-sm max-w-32 truncate">
                  {trade.notes}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Showing {currentPage * pageSize + 1} to{' '}
          {Math.min((currentPage + 1) * pageSize, filteredTrades.length)} of {filteredTrades.length}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage === totalPages - 1}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

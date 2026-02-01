'use client';

import Image from 'next/image';
import {
  BarChart3,
  BookOpen,
  TrendingUp,
  AlertTriangle,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { icon: BarChart3, label: 'Dashboard', href: '#' },
  { icon: BookOpen, label: 'Trade Journal', href: '#' },
  { icon: TrendingUp, label: 'Portfolio Analysis', href: '#' },
  { icon: AlertTriangle, label: 'Risk Insights', href: '#' },
  { icon: Users, label: 'Community Benchmark', href: '#' },
  { icon: Settings, label: 'Settings', href: '#' },
];

export function Sidebar({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex flex-col bg-card border-r border-border transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className={`flex items-center gap-2 ${!isOpen && 'justify-center w-full'}`}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform">
              <Image
                src="/logo.png"
                alt="Deriverse Logo"
                width={40}
                height={40}
                priority
                className="rounded-lg"
              />
            </div>
            {isOpen && <span className="text-sm font-bold">Deriverse</span>}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-muted ${
                  item.label === 'Dashboard' ? 'bg-primary/20 text-primary' : 'text-foreground/70 hover:text-foreground'
                } ${!isOpen && 'justify-center'}`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span className="text-sm">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Toggle Button */}
        <div className="p-4 border-t border-border flex justify-center">
          <button
            onClick={onToggle}
            className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground/70 hover:text-foreground"
          >
            {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Indicator */}
      <div className="md:hidden p-4 border-r border-border bg-card">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center hover:scale-105 transition-transform">
          <Image
            src="/logo.png"
            alt="Deriverse Logo"
            width={40}
            height={40}
            priority
            className="rounded-lg"
          />
        </div>
      </div>
    </>
  );
}

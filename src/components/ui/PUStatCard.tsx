'use client';
import { motion } from 'framer-motion';

interface PUStatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaPositive?: boolean;
  icon?: React.ReactNode;
  accentColor?: string;
}

export function PUStatCard({ label, value, delta, deltaPositive = true, icon, accentColor = '#7458FD' }: PUStatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="bg-white rounded-[16px] p-5 border border-gray-100 shadow-sm min-w-[180px]"
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
        {icon && (
          <div style={{ backgroundColor: `${accentColor}15` }} className="w-8 h-8 rounded-lg flex items-center justify-center">
            <span style={{ color: accentColor }}>{icon}</span>
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {delta && (
        <p className={`text-xs font-medium mt-1 ${deltaPositive ? 'text-green-600' : 'text-red-500'}`}>
          {deltaPositive ? '↑' : '↓'} {delta}
        </p>
      )}
    </motion.div>
  );
}

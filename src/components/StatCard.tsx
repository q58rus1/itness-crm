import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color }) => (
  <div style={{ borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 16, background: color || '#fff', margin: 8 }}>
    <div style={{ fontWeight: 'bold', fontSize: 18 }}>{title}</div>
    <div style={{ fontSize: 24 }}>{value}</div>
  </div>
);

export default StatCard;

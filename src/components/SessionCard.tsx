import React from 'react';

interface SessionCardProps {
  clientName?: string;
  time: string;
  duration: number;
  type: string;
  isPeriod?: boolean;
}

const SessionCard: React.FC<SessionCardProps> = ({ clientName, time, duration, type, isPeriod }) => (
  <div style={{ borderLeft: isPeriod ? '4px solid #DC2626' : undefined, borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 16, margin: 8 }}>
    <div>{clientName || type}</div>
    <div>{time} — {duration} мин</div>
    {type !== 'training' && <span style={{ color: '#888' }}>{type}</span>}
    {isPeriod && <span style={{ color: '#DC2626', marginLeft: 8 }}>●</span>}
  </div>
);

export default SessionCard;

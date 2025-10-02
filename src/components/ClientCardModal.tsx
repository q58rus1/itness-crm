import React from 'react';
import { Client, TrainingPackage, TrainingSession } from '../types';

interface Props {
  open: boolean;
  client: Client | null;
  packages: TrainingPackage[];
  sessions: TrainingSession[];
  onClose: () => void;
}

const ClientCardModal: React.FC<Props> = ({ open, client, packages, sessions, onClose }) => {
  if (!open || !client) return null;
  const clientPackages = packages.filter(p => p.clientId === client.id);
  const clientSessions = sessions.filter(s => s.clientId === client.id);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 24, minWidth: 350 }}>
        <h2>{client.name}</h2>
        <div>Телефон: {client.phone}</div>
        {client.email && <div>Email: {client.email}</div>}
        {client.notes && <div>Заметки: {client.notes}</div>}
        <h3>Пакеты</h3>
        <ul>
          {clientPackages.map(pkg => (
            <li key={pkg.id}>{pkg.totalSessions - pkg.usedSessions} из {pkg.totalSessions} занятий, до {pkg.expiryDate}, {pkg.isActive ? 'активен' : 'неактивен'}</li>
          ))}
        </ul>
        <h3>Тренировки</h3>
        <ul>
          {clientSessions.map(sess => (
            <li key={sess.id}>{sess.date} {sess.time} — {sess.type} {sess.completed ? '✓' : ''}</li>
          ))}
        </ul>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default ClientCardModal;

import React, { useState } from 'react';
import { TrainingPackage } from '../types';

interface Props {
  onSubmit: (pkg: TrainingPackage) => void;
  clientId: string;
}

const PackageForm: React.FC<Props> = ({ onSubmit, clientId }) => {
  const [totalSessions, setTotalSessions] = useState(10);
  const [pricePerSession, setPricePerSession] = useState(1000);
  const [totalPrice, setTotalPrice] = useState(10000);
  const [purchaseDate, setPurchaseDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: Date.now().toString(),
      clientId,
      totalSessions,
      usedSessions: 0,
      pricePerSession,
      totalPrice,
      purchaseDate,
      expiryDate,
      isActive: true,
    });
    setTotalSessions(10);
    setPricePerSession(1000);
    setTotalPrice(10000);
    setPurchaseDate('');
    setExpiryDate('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input type="number" value={totalSessions} onChange={e => setTotalSessions(Number(e.target.value))} min={1} placeholder="Кол-во занятий" />
      <input type="number" value={pricePerSession} onChange={e => setPricePerSession(Number(e.target.value))} min={0} placeholder="Цена за занятие" />
      <input type="number" value={totalPrice} onChange={e => setTotalPrice(Number(e.target.value))} min={0} placeholder="Общая цена" />
      <input type="date" value={purchaseDate} onChange={e => setPurchaseDate(e.target.value)} required />
      <input type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} required />
      <button type="submit">Сохранить пакет</button>
    </form>
  );
};

export default PackageForm;

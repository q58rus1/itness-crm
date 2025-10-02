import React, { useState } from 'react';
import { TrainingPackage } from '../types';

interface Props {
  pkg: TrainingPackage;
  onSave: (pkg: TrainingPackage) => void;
  onCancel: () => void;
}

const PackageEditForm: React.FC<Props> = ({ pkg, onSave, onCancel }) => {
  const [totalSessions, setTotalSessions] = useState(pkg.totalSessions);
  const [pricePerSession, setPricePerSession] = useState(pkg.pricePerSession);
  const [totalPrice, setTotalPrice] = useState(pkg.totalPrice);
  const [purchaseDate, setPurchaseDate] = useState(pkg.purchaseDate);
  const [expiryDate, setExpiryDate] = useState(pkg.expiryDate);
  const [isActive, setIsActive] = useState(pkg.isActive);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...pkg,
      totalSessions,
      pricePerSession,
      totalPrice,
      purchaseDate,
      expiryDate,
      isActive,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input type="number" value={totalSessions} onChange={e => setTotalSessions(Number(e.target.value))} min={1} placeholder="Кол-во занятий" />
      <input type="number" value={pricePerSession} onChange={e => setPricePerSession(Number(e.target.value))} min={0} placeholder="Цена за занятие" />
      <input type="number" value={totalPrice} onChange={e => setTotalPrice(Number(e.target.value))} min={0} placeholder="Общая цена" />
      <input type="date" value={purchaseDate} onChange={e => setPurchaseDate(e.target.value)} required />
      <input type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} required />
      <label>
        Активен:
        <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} />
      </label>
      <button type="submit">Сохранить</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Отмена</button>
    </form>
  );
};

export default PackageEditForm;

import React, { useState } from 'react';
import { PackageTemplate } from '../types';

interface Props {
  onSubmit: (tpl: PackageTemplate) => void;
}

const TemplateForm: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [sessionsCount, setSessionsCount] = useState(10);
  const [pricePerSession, setPricePerSession] = useState(1000);
  const [totalPrice, setTotalPrice] = useState(10000);
  const [validityDays, setValidityDays] = useState(30);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: Date.now().toString(),
      name,
      sessionsCount,
      pricePerSession,
      totalPrice,
      validityDays,
      description,
      isActive: true,
      createdAt: new Date().toISOString(),
    });
    setName('');
    setSessionsCount(10);
    setPricePerSession(1000);
    setTotalPrice(10000);
    setValidityDays(30);
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Название шаблона" required />
      <input type="number" value={sessionsCount} onChange={e => setSessionsCount(Number(e.target.value))} min={1} placeholder="Кол-во занятий" />
      <input type="number" value={pricePerSession} onChange={e => setPricePerSession(Number(e.target.value))} min={0} placeholder="Цена за занятие" />
      <input type="number" value={totalPrice} onChange={e => setTotalPrice(Number(e.target.value))} min={0} placeholder="Общая цена" />
      <input type="number" value={validityDays} onChange={e => setValidityDays(Number(e.target.value))} min={1} placeholder="Срок действия (дней)" />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Описание" />
      <button type="submit">Сохранить шаблон</button>
    </form>
  );
};

export default TemplateForm;

import React, { useState } from 'react';
import { PackageTemplate } from '../types';

interface Props {
  tpl: PackageTemplate;
  onSave: (tpl: PackageTemplate) => void;
  onCancel: () => void;
}

const TemplateEditForm: React.FC<Props> = ({ tpl, onSave, onCancel }) => {
  const [name, setName] = useState(tpl.name);
  const [sessionsCount, setSessionsCount] = useState(tpl.sessionsCount);
  const [pricePerSession, setPricePerSession] = useState(tpl.pricePerSession);
  const [totalPrice, setTotalPrice] = useState(tpl.totalPrice);
  const [validityDays, setValidityDays] = useState(tpl.validityDays);
  const [description, setDescription] = useState(tpl.description || '');
  const [isActive, setIsActive] = useState(tpl.isActive);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...tpl,
      name,
      sessionsCount,
      pricePerSession,
      totalPrice,
      validityDays,
      description,
      isActive,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Название шаблона" required />
      <input type="number" value={sessionsCount} onChange={e => setSessionsCount(Number(e.target.value))} min={1} placeholder="Кол-во занятий" />
      <input type="number" value={pricePerSession} onChange={e => setPricePerSession(Number(e.target.value))} min={0} placeholder="Цена за занятие" />
      <input type="number" value={totalPrice} onChange={e => setTotalPrice(Number(e.target.value))} min={0} placeholder="Общая цена" />
      <input type="number" value={validityDays} onChange={e => setValidityDays(Number(e.target.value))} min={1} placeholder="Срок действия (дней)" />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Описание" />
      <label>
        Активен:
        <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} />
      </label>
      <button type="submit">Сохранить</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Отмена</button>
    </form>
  );
};

export default TemplateEditForm;

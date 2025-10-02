import React, { useState } from 'react';
import { TrainingSession } from '../types';

interface Props {
  onSubmit: (session: TrainingSession) => void;
}

const SessionForm: React.FC<Props> = ({ onSubmit }) => {
  const [clientId, setClientId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState(60);
  const [type, setType] = useState('training');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;
    onSubmit({
      id: Date.now().toString(),
      clientId,
      packageId: '',
      date,
      time,
      duration,
      notes,
      completed: false,
      type: type as 'training' | 'break' | 'personal' | 'duty',
    });
    setClientId('');
    setDate('');
    setTime('');
    setDuration(60);
    setType('training');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input value={clientId} onChange={e => setClientId(e.target.value)} placeholder="ID клиента" />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <input type="time" value={time} onChange={e => setTime(e.target.value)} required />
      <input type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} min={10} max={180} placeholder="Длительность (мин)" />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="training">Тренировка</option>
        <option value="break">Перерыв</option>
        <option value="personal">Личное</option>
        <option value="duty">Дежурство</option>
      </select>
      <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Заметки" />
      <button type="submit">Сохранить</button>
    </form>
  );
};

export default SessionForm;

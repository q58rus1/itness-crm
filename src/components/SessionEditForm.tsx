import React, { useState } from 'react';
import { TrainingSession } from '../types';

interface Props {
  session: TrainingSession;
  onSave: (session: TrainingSession) => void;
  onCancel: () => void;
}

const SessionEditForm: React.FC<Props> = ({ session, onSave, onCancel }) => {
  const [date, setDate] = useState(session.date);
  const [time, setTime] = useState(session.time);
  const [duration, setDuration] = useState(session.duration);
  const [clientId, setClientId] = useState(session.clientId);
  const [packageId, setPackageId] = useState(session.packageId);
  const [type, setType] = useState<TrainingSession['type']>(session.type);
  const [completed, setCompleted] = useState(session.completed);
  const [notes, setNotes] = useState(session.notes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...session,
      date,
      time,
      duration,
      clientId,
      packageId,
      type,
      completed,
      notes,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <input type="time" value={time} onChange={e => setTime(e.target.value)} required />
      <input type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} min={1} placeholder="Длительность (мин)" required />
      <input value={clientId} onChange={e => setClientId(e.target.value)} placeholder="ID клиента" required />
      <input value={packageId} onChange={e => setPackageId(e.target.value)} placeholder="ID пакета" required />
      <select value={type} onChange={e => setType(e.target.value as TrainingSession['type'])} required>
        <option value="training">Тренировка</option>
        <option value="break">Перерыв</option>
        <option value="personal">Персональное</option>
        <option value="duty">Дежурство</option>
      </select>
      <label>
        Проведено:
        <input type="checkbox" checked={completed} onChange={e => setCompleted(e.target.checked)} />
      </label>
      <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Заметки" />
      <button type="submit">Сохранить</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Отмена</button>
    </form>
  );
};

export default SessionEditForm;

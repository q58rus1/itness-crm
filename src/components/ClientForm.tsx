import React, { useState } from 'react';
import { Client } from '../types';

interface Props {
  onSubmit: (client: Client) => void;
}

const ClientForm: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    onSubmit({
      id: Date.now().toString(),
      name,
      phone,
      email,
      notes,
      createdAt: new Date().toISOString(),
      packages: [],
    });
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Имя" required />
      <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Телефон" required />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Заметки" />
      <button type="submit">Сохранить</button>
    </form>
  );
};

export default ClientForm;



import React, { useState } from 'react';
import { useLocalStorageQuery } from '../hooks/useLocalStorageQuery';
import { LOCAL_STORAGE_KEYS } from '../localStorageKeys';
import SessionForm from '../components/SessionForm';
import SessionEditForm from '../components/SessionEditForm';
import ConfirmModal from '../components/ConfirmModal';
import ExportButtons from '../components/ExportButtons';
import SessionCard from '../components/SessionCard';

const Sessions: React.FC = () => {
  const { data: sessions = [], setValue } = useLocalStorageQuery(LOCAL_STORAGE_KEYS.sessions, []);
  const [filter, setFilter] = useState('');
  const [clientFilter, setClientFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [modalOpen, setModalOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<any>(null);
  const [editSession, setEditSession] = useState<any>(null);

  // Получаем пакеты для проверки доступности
  const { data: packages = [], setValue: setPackages } = useLocalStorageQuery(LOCAL_STORAGE_KEYS.packages, []);

  // Проверка пересечения с break
  const isIntersectWithBreak = (newSession: any) => {
    if (newSession.type !== 'training') return false;
    return sessions.some((s: any) =>
      s.type === 'break' &&
      s.date === newSession.date &&
      ((s.time <= newSession.time && newSession.time < s.time + s.duration) ||
       (newSession.time <= s.time && s.time < newSession.time + newSession.duration))
    );
  };

  // Завершение тренировки: только если есть доступный пакет
  const handleAddSession = (session: any) => {
    if (isIntersectWithBreak(session)) {
      alert('Ошибка: тренировка пересекается с перерывом!');
      return;
    }
    // Если тренировка, ищем активный пакет
    if (session.type === 'training') {
      const activePackage = packages.find((p: any) =>
        p.clientId === session.clientId &&
        p.isActive &&
        new Date(p.expiryDate) > new Date(session.date) &&
        p.usedSessions < p.totalSessions
      );
      if (!activePackage) {
        alert('Ошибка: нет доступного пакета для клиента!');
        return;
      }
      // Списываем занятие
      (activePackage as any).usedSessions += 1;
      setPackages([...packages]);
      session.packageId = (activePackage as any).id;
    }
    setValue([...sessions, session]);
  };

  const handleDeleteSession = (session: any) => {
    setSessionToDelete(session);
    setModalOpen(true);
  };

  const handleEditSession = (session: any) => {
    setEditSession(session);
  };

  const handleSaveSession = (session: any) => {
    setValue(sessions.map((s: any) => s.id === session.id ? session : s));
    setEditSession(null);
  };

  const handleCancelEdit = () => setEditSession(null);

  const confirmDelete = () => {
    if (sessionToDelete) {
      setValue(sessions.filter((s: any) => s.id !== sessionToDelete.id));
      setModalOpen(false);
      setSessionToDelete(null);
    }
  };

  const filteredSessions = sessions.filter((s: any) =>
    (!filter || s.type.toLowerCase().includes(filter.toLowerCase()) || s.date.includes(filter)) &&
    (!clientFilter || s.clientId === clientFilter) &&
    (!typeFilter || s.type === typeFilter) &&
    (!dateFrom || s.date >= dateFrom) &&
    (!dateTo || s.date <= dateTo)
  ).sort((a: any, b: any) => {
    if (sortBy === 'date') {
      return sortOrder === 'asc' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
    }
    if (sortBy === 'duration') {
      return sortOrder === 'asc' ? a.duration - b.duration : b.duration - a.duration;
    }
    return 0;
  });

  // Получаем клиентов для проверки периода
  const { data: clients = [] } = useLocalStorageQuery(LOCAL_STORAGE_KEYS.clients, []);
  return (
    <main className="container" style={{ maxWidth: 600, margin: '0 auto', padding: 16 }}>
      <h1 style={{ fontSize: '2rem', marginBottom: 24, textAlign: 'center' }}>Тренировки</h1>
      <section style={{ marginBottom: 24 }}>
        <SessionForm onSubmit={handleAddSession} />
      </section>
      <section style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
          <input
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="Быстрый фильтр по типу или дате"
            style={{ flex: '1 1 120px', minWidth: 120, padding: 10, fontSize: '1rem', borderRadius: 8, border: '1px solid #ccc' }}
          />
          <select value={clientFilter} onChange={e => setClientFilter(e.target.value)} style={{ flex: '1 1 120px', minWidth: 120, padding: 10, borderRadius: 8, border: '1px solid #ccc' }}>
            <option value="">Все клиенты</option>
            {clients.map((c: any) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ flex: '1 1 120px', minWidth: 120, padding: 10, borderRadius: 8, border: '1px solid #ccc' }}>
            <option value="">Все типы</option>
            <option value="training">Тренировка</option>
            <option value="break">Перерыв</option>
            <option value="personal">Персональное</option>
            <option value="duty">Дежурство</option>
          </select>
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} style={{ flex: '1 1 120px', minWidth: 120, padding: 10, borderRadius: 8, border: '1px solid #ccc' }} />
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} style={{ flex: '1 1 120px', minWidth: 120, padding: 10, borderRadius: 8, border: '1px solid #ccc' }} />
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ flex: '1 1 120px', minWidth: 120, padding: 10, borderRadius: 8, border: '1px solid #ccc' }}>
            <option value="date">Сортировать по дате</option>
            <option value="duration">Сортировать по длительности</option>
          </select>
          <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} style={{ flex: '0 0 auto', minWidth: 40, padding: 10, borderRadius: 8, border: '1px solid #ccc' }}>
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
        <ExportButtons data={sessions} />
      </section>
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: 12 }}>Список тренировок</h2>
        {filteredSessions.length === 0 ? (
          <div style={{ color: '#888', textAlign: 'center' }}>Нет тренировок</div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredSessions.map((session: any) => {
              // Подсветка периода
              const client = clients.find((c: any) => c.id === session.clientId);
              let isPeriod = false;
              if ((client as any)?.menstrualCycle) {
                const { cycleLength, lastPeriodDate, periodLength } = (client as any).menstrualCycle;
                const sessionDate = new Date(session.date);
                const lastPeriod = new Date(lastPeriodDate);
                const diffDays = Math.floor((sessionDate.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
                const cycleDay = diffDays % cycleLength;
                isPeriod = cycleDay >= 0 && cycleDay < periodLength;
              }
              return (
                <li key={session.id} style={{ background: isPeriod ? '#fee2e2' : '#f3f4f6', borderRadius: 8, marginBottom: 8, padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1 }}>
                    <SessionCard
                      clientName={session.clientName}
                      time={session.time}
                      duration={session.duration}
                      type={session.type}
                      isPeriod={isPeriod}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => handleEditSession(session)}>Редактировать</button>
                    <button onClick={() => handleDeleteSession(session)}>Удалить</button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
      {editSession && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, minWidth: 350 }}>
            <h3>Редактировать тренировку</h3>
            <SessionEditForm session={editSession} onSave={handleSaveSession} onCancel={handleCancelEdit} />
          </div>
        </div>
      )}
      <ConfirmModal
        open={modalOpen}
        text={`Удалить тренировку?`}
        onConfirm={confirmDelete}
        onCancel={() => setModalOpen(false)}
      />
    </main>
  );
};

export default Sessions;

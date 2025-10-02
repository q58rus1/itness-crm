
import { useState, useEffect } from 'react';
import { LOCAL_STORAGE_KEYS } from '../localStorageKeys';
import { useLocalStorageQuery } from '../hooks/useLocalStorageQuery';
import TemplateForm from '../components/TemplateForm';
import TemplateExportButtons from '../components/TemplateExportButtons';
import ConfirmModal from '../components/ConfirmModal';

const Settings: React.FC = () => {
  const { data: taxRate = 0, setValue: setTaxRate } = useLocalStorageQuery<number>(LOCAL_STORAGE_KEYS.taxRate, 0);
  const { data: clients = [], setValue: setClients } = useLocalStorageQuery(LOCAL_STORAGE_KEYS.clients, []);
  const { data: packages = [], setValue: setPackages } = useLocalStorageQuery(LOCAL_STORAGE_KEYS.packages, []);
  const { data: sessions = [], setValue: setSessions } = useLocalStorageQuery(LOCAL_STORAGE_KEYS.sessions, []);
  const [importData, setImportData] = useState('');
  const [exportModal, setExportModal] = useState(false);
  const [clearModal, setClearModal] = useState(false);

  useEffect(() => {
    // Автоматическая выгрузка в облако (демо)
    localStorage.setItem('gdrive_demo_sync', JSON.stringify({ clients, packages, sessions, taxRate }));
  }, [clients, packages, sessions, taxRate]);

  const handleClearAll = () => {
    setClearModal(true);
  };

  const confirmClearAll = () => {
    setClients([]);
    setPackages([]);
    setSessions([]);
    setTaxRate(0);
    // TODO: выгрузка пустого снапшота в облако, если включено
    setClearModal(false);
    alert('Все данные удалены!');
  };

  const handleTaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaxRate(Number(e.target.value));
  };

  const exportJSON = () => {
    setExportModal(true);
  };

  const confirmExportJSON = () => {
    const data = {
      clients,
      packages,
      sessions,
      taxRate,
      lastUpdated: new Date().toISOString(),
      taxAmount: sessions.filter((s: any) => s.completed).reduce((sum: number, s: any) => sum + (s.singlePrice || s.pricePerSession || 0), 0) * (taxRate / 100),
      totalRevenueGross: sessions.filter((s: any) => s.completed).reduce((sum: number, s: any) => sum + (s.singlePrice || s.pricePerSession || 0), 0),
      totalRevenueNet: sessions.filter((s: any) => s.completed).reduce((sum: number, s: any) => sum + (s.singlePrice || s.pricePerSession || 0), 0) * (1 - taxRate / 100),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fitness-crm-export.json';
    a.click();
    URL.revokeObjectURL(url);
    setExportModal(false);
  };

  const importJSON = () => {
    try {
      const data = JSON.parse(importData);
      setClients(data.clients || []);
      setPackages(data.packages || []);
      setSessions(data.sessions || []);
      setTaxRate(data.taxRate || 0);
      alert('Импорт успешно завершен!');
    } catch {
      alert('Ошибка импорта!');
    }
  };

  return (
  <div>
      <div>
        <button style={{ color: 'red' }} onClick={handleClearAll}>Удалить все данные</button>
      </div>
      <ConfirmModal
        open={clearModal}
        text="Удалить все данные? Это действие необратимо."
        onConfirm={confirmClearAll}
        onCancel={() => setClearModal(false)}
      />
      <h1>Настройки</h1>
      <div>
        <label>
          Налоговая ставка (%):
          <input type="number" value={taxRate} onChange={handleTaxChange} min={0} max={100} />
        </label>
      </div>
      <div>
        <button onClick={exportJSON}>Экспорт JSON</button>
      </div>
      <ConfirmModal
        open={exportModal}
        text="Экспортировать все данные в JSON?"
        onConfirm={confirmExportJSON}
        onCancel={() => setExportModal(false)}
      />
      <div>
        <textarea value={importData} onChange={e => setImportData(e.target.value)} placeholder="Вставьте JSON для импорта" rows={4} cols={40} />
        <button onClick={importJSON}>Импорт JSON</button>
      </div>
    </div>
  );
};

export default Settings;

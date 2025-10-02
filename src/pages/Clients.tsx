
import { useState } from 'react';
import { Client } from '../types';
import { LOCAL_STORAGE_KEYS } from '../localStorageKeys';
import { useLocalStorageQuery } from '../hooks/useLocalStorageQuery';
import ClientForm from '../components/ClientForm';
import ConfirmModal from '../components/ConfirmModal';
import ClientCardModal from '../components/ClientCardModal';
import ExportButtons from '../components/ExportButtons';
import CloudConnectPanel from '../components/CloudConnectPanel';
import PackageForm from '../components/PackageForm';
import PackageExportButtons from '../components/PackageExportButtons';
import PackageEditForm from '../components/PackageEditForm';

const Clients: React.FC = () => {
  const [editPackage, setEditPackage] = useState<any>(null);
  const { data: sessions = [] } = useLocalStorageQuery(LOCAL_STORAGE_KEYS.sessions, []);
  const [modalClient, setModalClient] = useState<Client | null>(null);
  const { data: clients = [], setValue } = useLocalStorageQuery<Client[]>(LOCAL_STORAGE_KEYS.clients, []);
  const [filter, setFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  const handleAddClient = (client: Client) => {
    setValue([...clients, client]);
  };

  const handleDeleteClient = (client: Client) => {
    setClientToDelete(client);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (clientToDelete) {
      setValue(clients.filter(c => c.id !== clientToDelete.id));
      setModalOpen(false);
      setClientToDelete(null);
    }
  };

  const filteredClients = clients.filter((c: Client) =>
    c.name.toLowerCase().includes(filter.toLowerCase()) ||
    c.phone.includes(filter)
  );

  // Пакеты
  const { data: packages = [], setValue: setPackages } = useLocalStorageQuery<any[]>(LOCAL_STORAGE_KEYS.packages, []);
  const handleAddPackage = (pkg: any) => {
    setPackages([...(packages || []), pkg]);
  };

  return (
    <main className="container" style={{ maxWidth: 600, margin: '0 auto', padding: 16 }}>
      <h1 style={{ fontSize: '2rem', marginBottom: 24, textAlign: 'center' }}>Клиенты</h1>
      <section style={{ marginBottom: 24 }}>
        <ClientForm onSubmit={handleAddClient} />
      </section>
      <section style={{ marginBottom: 24 }}>
        <input
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="Поиск по имени или телефону"
          style={{ marginBottom: 12, padding: 10, fontSize: '1rem', borderRadius: 8, border: '1px solid #ccc', width: '100%' }}
        />
        <ExportButtons data={clients} />
      </section>
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: 12 }}>Список клиентов</h2>
        {filteredClients.length === 0 ? (
          <div style={{ color: '#888', textAlign: 'center' }}>Нет клиентов</div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredClients.map(client => (
              <li key={client.id} style={{ background: '#f3f4f6', borderRadius: 8, marginBottom: 8, padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ cursor: 'pointer', textDecoration: 'underline', fontWeight: 500 }} onClick={() => setModalClient(client)}>{client.name}</span>
                <span style={{ color: '#555', marginLeft: 8 }}>{client.phone}</span>
                <button style={{ marginLeft: 16 }} onClick={() => handleDeleteClient(client)}>Удалить</button>
              </li>
            ))}
          </ul>
        )}
      </section>
      <ClientCardModal
        open={!!modalClient}
        client={modalClient}
        packages={packages}
        sessions={sessions}
        onClose={() => setModalClient(null)}
      />
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: 12 }}>Пакеты клиента</h2>
        {filteredClients.length > 0 && (
          <PackageForm clientId={filteredClients[0].id} onSubmit={handleAddPackage} />
        )}
        <PackageExportButtons data={packages} />
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {packages.filter((p: any) => filteredClients[0] && p.clientId === filteredClients[0].id).map((pkg: any) => (
            <li key={pkg.id} style={{ background: '#e0e7ff', borderRadius: 8, marginBottom: 8, padding: 12 }}>
              <div><strong>{pkg.totalSessions - pkg.usedSessions} из {pkg.totalSessions}</strong> занятий, до <strong>{pkg.expiryDate}</strong>, <span style={{ color: pkg.isActive ? '#10B981' : '#F59E0B' }}>{pkg.isActive ? 'активен' : 'неактивен'}</span></div>
              <button style={{ marginTop: 8 }} onClick={() => setEditPackage(pkg)}>Редактировать</button>
            </li>
          ))}
        </ul>
        {editPackage && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, minWidth: 350 }}>
              <h3>Редактировать пакет</h3>
              <PackageEditForm
                pkg={editPackage}
                onSave={updated => {
                  setPackages(packages.map((p: any) => p.id === updated.id ? updated : p));
                  setEditPackage(null);
                }}
                onCancel={() => setEditPackage(null)}
              />
            </div>
          </div>
        )}
      </section>
      <ConfirmModal
        open={modalOpen}
        text={`Удалить клиента ${clientToDelete?.name}?`}
        onConfirm={confirmDelete}
        onCancel={() => setModalOpen(false)}
      />
    </main>
  );
};

export default Clients;

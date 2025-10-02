
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
    <div>
      <h1>Клиенты</h1>
      {/* <CloudConnectPanel /> */}
      <ClientForm onSubmit={handleAddClient} />
      <input
        value={filter}
        onChange={e => setFilter(e.target.value)}
        placeholder="Поиск по имени или телефону"
        style={{ marginBottom: 16 }}
      />
      <ExportButtons data={clients} />
      <ul>
        {filteredClients.map(client => (
          <li key={client.id}>
            <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setModalClient(client)}>{client.name}</span> — {client.phone}
            <button style={{ marginLeft: 8 }} onClick={() => handleDeleteClient(client)}>Удалить</button>
          </li>
        ))}
      </ul>
      <ClientCardModal
        open={!!modalClient}
        client={modalClient}
        packages={packages}
        sessions={sessions}
        onClose={() => setModalClient(null)}
      />
      <div>
        <h2>Пакеты</h2>
        {filteredClients.length > 0 && (
          <PackageForm clientId={filteredClients[0].id} onSubmit={handleAddPackage} />
        )}
        <PackageExportButtons data={packages} />
        <ul>
          {packages.filter((p: any) => filteredClients[0] && p.clientId === filteredClients[0].id).map((pkg: any) => (
            <li key={pkg.id}>
              {pkg.totalSessions - pkg.usedSessions} из {pkg.totalSessions} занятий, до {pkg.expiryDate}, {pkg.isActive ? 'активен' : 'неактивен'}
              <button style={{ marginLeft: 8 }} onClick={() => setEditPackage(pkg)}>Редактировать</button>
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
      </div>
      <ConfirmModal
        open={modalOpen}
        text={`Удалить клиента ${clientToDelete?.name}?`}
        onConfirm={confirmDelete}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Clients;

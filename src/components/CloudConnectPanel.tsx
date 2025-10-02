import React, { useState } from 'react';

const CloudConnectPanel: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  return (
    <div style={{ margin: '16px 0' }}>
      <div>
        <label>
          <input type="checkbox" checked={demoMode} onChange={e => setDemoMode(e.target.checked)} /> Демо Google Drive
        </label>
      </div>
      <div>
        {connected ? (
          <button onClick={() => setConnected(false)}>Отключить облако</button>
        ) : (
          <button onClick={() => setConnected(true)}>Подключить облако</button>
        )}
        <button style={{ marginLeft: 8 }}>Синхронизировать сейчас</button>
      </div>
      {demoMode && <div style={{ color: '#888', marginTop: 8 }}>Данные будут храниться в localStorage под gdrive_demo_*</div>}
    </div>
  );
};

export default CloudConnectPanel;

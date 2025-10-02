import React from 'react';

interface Props {
  open: boolean;
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<Props> = ({ open, text, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 24, minWidth: 300 }}>
        <div style={{ marginBottom: 16 }}>{text}</div>
        <button onClick={onConfirm} style={{ marginRight: 8 }}>Да</button>
        <button onClick={onCancel}>Нет</button>
      </div>
    </div>
  );
};

export default ConfirmModal;

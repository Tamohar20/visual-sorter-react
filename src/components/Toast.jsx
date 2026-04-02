import { useEffect, useState } from 'react';

export function useToast() {
  const [toast, setToast] = useState(null);
  const timerRef = { current: null };

  function showToast(msg, type = '') {
    setToast({ msg, type, key: Date.now() });
  }

  return { toast, showToast };
}

export default function Toast({ toast }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!toast) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  if (!visible || !toast) return null;

  return (
    <div className={`vs-toast${toast.type ? ' ' + toast.type : ''}`}>
      {toast.msg}
    </div>
  );
}

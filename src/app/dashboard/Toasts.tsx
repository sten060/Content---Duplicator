'use client';

import * as React from 'react';

export default function Toasts({ ok, err, warn }: { ok?: boolean; err?: string; warn?: string }) {
  const [show, setShow] = React.useState<boolean>(!!ok || !!err || !!warn);

  React.useEffect(() => {
    if (ok || err || warn) {
      setShow(true);
      const t = setTimeout(() => setShow(false), 6000);
      return () => clearTimeout(t);
    }
  }, [ok, err, warn]);

  if (!show) return null;

  const msg = err
    ? decodeURIComponent(err)
    : warn
    ? decodeURIComponent(warn)
    : 'Duplication terminée ✔️';

  const cls = err
    ? 'bg-rose-600/90 text-white'
    : warn
    ? 'bg-amber-600/90 text-white'
    : 'bg-emerald-600/90 text-white';

  return (
    <div className="fixed right-4 top-4 z-[9999] max-w-sm">
      <div className={`rounded-lg px-4 py-3 text-sm shadow-xl ${cls}`}>
        {msg}
      </div>
    </div>
  );
}
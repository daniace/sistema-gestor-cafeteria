import { router } from '@inertiajs/react';
import { useEffect } from 'react';

const CHANNEL = 'tab-sync';

export function useCrossTabSync() {
    useEffect(() => {
        if (typeof BroadcastChannel === 'undefined') {
            return;
        }

        const channel = new BroadcastChannel(CHANNEL);

        channel.onmessage = (event) => {
            if (event.data === 'mesa_updated') {
                router.reload({ only: ['mesas'], preserveScroll: true });
            }
        };

        return () => {
            channel.close();
        };
    }, []);
}

export function broadcastMesaUpdate() {
    try {
        const channel = new BroadcastChannel(CHANNEL);
        channel.postMessage('mesa_updated');
        channel.close();
    } catch {
        //
    }
}

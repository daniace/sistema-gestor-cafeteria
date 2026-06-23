import { PrinterIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { ticket } from '@/routes/venta';
import type { Venta } from '@/types/models';
import TicketContent from './ticket-content';

export default function DialogTicketVenta({ venta }: { venta: Venta }) {
    const [dialogOpen, setDialogOpen] = useState(false);

    function handlePrint() {
        window.open(ticket({ venta: venta.id }), '_blank');
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Ver Detalle
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Ticket de Venta #{venta.id}</DialogTitle>
                </DialogHeader>

                <div className="rounded-xl border border-border bg-card p-6">
                    <TicketContent venta={venta} />
                </div>

                <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setDialogOpen(false)}
                    >
                        Cerrar
                    </Button>
                    <Button onClick={handlePrint}>
                        <PrinterIcon className="mr-1 h-4 w-4" />
                        Imprimir / PDF
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

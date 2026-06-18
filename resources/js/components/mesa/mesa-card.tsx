import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Mesa } from '@/types/models';

export default function MesaCard({
    id, capacidad, estado, hace, icono, onClick,
}: Mesa & { onClick?: () => void }) {
    const ocupada = estado === 'ocupada';

    return (
        <Card
            className={
                ocupada
                    ? 'cursor-pointer border-red-200 shadow-sm transition-all hover:ring-2 hover:ring-red-300 dark:border-red-800/40 dark:hover:ring-red-600'
                    : 'cursor-pointer border-border shadow-sm transition-all hover:ring-2 hover:ring-amber-300 dark:border-zinc-700/50 dark:hover:ring-amber-600'
            }
            onClick={onClick}
        >
            <CardHeader
                className={
                    ocupada
                        ? 'flex flex-row items-center justify-between border-b border-red-100 px-4 py-3 dark:border-red-900/30'
                        : 'flex flex-row items-center justify-between border-b border-border px-4 py-3'
                }
            >
                <CardTitle className="text-sm font-semibold">
                    Mesa {String(id).padStart(2, '0')}
                </CardTitle>
                {ocupada ? (
                    <Badge
                        variant="destructive"
                        className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                    >
                        OCUPADA
                    </Badge>
                ) : (
                    <Badge
                        variant="outline"
                        className="rounded-full px-2 py-0.5 text-[10px] font-bold text-muted-foreground"
                    >
                        LIBRE
                    </Badge>
                )}
            </CardHeader>
            <CardContent className="flex min-h-[100px] flex-col items-center justify-center gap-2 px-4 py-5">
                {ocupada ? (
                    <>
                        <span className="text-3xl">☕</span>
                        <span className="text-xs text-muted-foreground">
                            Hace {hace}
                        </span>
                    </>
                ) : (
                    <>
                        <span className="text-3xl">🪑</span>
                        <span className="text-xs font-medium text-muted-foreground">
                            Capacidad: {capacidad}
                        </span>
                    </>
                )}
            </CardContent>
        </Card>
    );
}

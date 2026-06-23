import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import {
    ChartLineIcon,
    CoffeeBeanIcon,
    SealPercentIcon,
    UserIcon,
} from '@phosphor-icons/react';
import { BookOpen, FolderGit2, LayoutGrid } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { inicio, producto, usuario, reporte } from '@/routes';
import venta from '@/routes/venta';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Inicio',
        href: inicio(),
        icon: LayoutGrid,
    },
    {
        title: 'Venta',
        href: venta.index(),
        icon: SealPercentIcon,
        roles: ['admin', 'vendedor'],
    },
    {
        title: 'Producto',
        href: producto(),
        icon: CoffeeBeanIcon,
        roles: ['admin', 'vendedor'],
    },
    {
        title: 'Reporte',
        href: reporte(),
        icon: ChartLineIcon,
        roles: ['admin'],
    },
    {
        title: 'Usuario',
        href: usuario(),
        icon: UserIcon,
        roles: ['admin'],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/daniace/sistema-gestor-cafeteria',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://github.com/daniace/sistema-gestor-cafeteria/tree/main/docs',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props;
    const visibleItems = mainNavItems.filter(
        (item) => !item.roles || item.roles.includes(auth.rol),
    );

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={inicio()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={visibleItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

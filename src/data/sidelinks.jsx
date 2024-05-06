import {
  IconLayoutDashboard,
  IconRouteAltLeft,
  IconUsers,
} from '@tabler/icons-react';

// import { IconLayoutDashboard } from "@tabler/icons-react";

export const SideLinks = [
  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: <IconLayoutDashboard />,
    role: 'admin'
  },
  {
    title: 'Users',
    label: '',
    href: '/user',
    icon: <IconUsers />,
    role: 'admin'

  },
  {
    title: 'Requests',
    label: '',
    href: '/leave-request',
    icon: <IconRouteAltLeft />,
    role: 'admin'
  },
  {
    title: 'Requests',
    label: '',
    href: '/user-leave-request',
    icon: <IconRouteAltLeft />,
    role: 'employee'
  },
];

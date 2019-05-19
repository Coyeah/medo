import React from 'react';
import {dynamicWrapper} from '@/utils/';

const router = [
  {
    name: '待办事项',
    icon: 'book',
    path: '/',
    component: dynamicWrapper(() => import('../pages/Medo'))
  }, {
    name: '计划日历',
    icon: 'calendar',
    path: '/cale',
    component: dynamicWrapper(() => import('../pages/Cale'))
  }
]

export default router;

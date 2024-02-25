import React from 'react'
import authRoute from './authRoute'
import { ADMIN, DELIVERY } from 'constants/roles.constant'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'products',
        path: '/products',
        component: React.lazy(() => import('views/products/ProductsList')),
        authority: [ADMIN, DELIVERY],
    },
    {
        key: 'products',
        path: '/products/add',
        component: React.lazy(() => import('views/products/ProductNew')),
        authority: [ADMIN, DELIVERY],
    },
    {
        key: 'products',
        path: '/products/edit/:id',
        component: React.lazy(() => import('views/products/ProductEdit')),
        authority: [ADMIN],
    },
    {
        key: 'companies',
        path: '/companies',
        component: React.lazy(() => import('views/companies/CompanyList')),
        authority: [DELIVERY],
    },
    {
        key: 'companies',
        path: '/companies/add',
        component: React.lazy(() => import('views/companies/CompanyNew')),
        authority: [DELIVERY],
    },
    {
        key: 'companies',
        path: '/companies/edit/:id',
        component: React.lazy(() => import('views/companies/CompanyEdit')),
        authority: [DELIVERY],
    },
    {
        key: 'categories',
        path: '/categories',
        component: React.lazy(() => import('views/categories/CategoryList')),
        authority: [],
    },
    {
        key: 'categories',
        path: '/categories/add',
        component: React.lazy(() => import('views/categories/CategoryNew')),
        authority: [],
    },
    {
        key: 'categories',
        path: '/categories/edit/:id',
        component: React.lazy(() => import('views/categories/CategoryEdit')),
        authority: [],
    },
    {
        key: 'employes',
        path: '/employes',
        component: React.lazy(() => import('views/employes/EmployesList')),
        authority: [],
    },
    {
        key: 'employesAdd',
        path: '/employes/add',
        component: React.lazy(() => import('views/employes/EmployesNew')),
        authority: [],
    },
    {
        key: 'employesEdit',
        path: '/employes/edit/:id',
        component: React.lazy(() => import('views/employes/EmployesEdit')),
        authority: [],
    },
    {
        key: 'users',
        path: '/users',
        component: React.lazy(() => import('views/customers')),
        authority: [],
    },
    {
        key: 'userDetail',
        path: '/users/:id',
        component: React.lazy(() => import('views/customers/CustomerDetail')),
        authority: [],
    },
    {
        key: 'orders',
        path: '/orders',
        component: React.lazy(() => import('views/orders/OrdersList')),
        authority: [],
    },
    {
        key: 'orderEdit',
        path: '/orders/edit/:id',
        component: React.lazy(() => import('views/orders/OrdersEdit')),
        authority: [],
    },
    {
        key: 'notifications',
        path: '/notifications',
        component: React.lazy(() => import('views/notifications/NotificationList')),
        authority: [],
    },
    {
        key: 'notifications',
        path: '/notifications/add',
        component: React.lazy(() => import('views/notifications/NotificationNew')),
        authority: [],
    },
    {
        key: 'notificationsEdit',
        path: '/notifications/edit/:id',
        component: React.lazy(() => import('views/notifications/NotificationEdit')),
        authority: [],
    },
    {
        key: 'customerDetail',
        path: '/customer-details/:id',
        component: React.lazy(() => import('views/customers/CustomerDetail')),
        authority: [],
    },

    // {
    //     key: 'collapseMenu.item1',
    //     path: '/collapse-menu-item-view-1',
    //     component: React.lazy(() => import('views/demo/CollapseMenuItemView1')),
    //     authority: [],
    // },
    // {
    //     key: 'collapseMenu.item2',
    //     path: '/collapse-menu-item-view-2',
    //     component: React.lazy(() => import('views/demo/CollapseMenuItemView2')),
    //     authority: [],
    // },
    // {
    //     key: 'groupMenu.single',
    //     path: '/group-single-menu-item-view',
    //     component: React.lazy(() =>
    //         import('views/demo/GroupSingleMenuItemView')
    //     ),
    //     authority: [],
    // },
    // {
    //     key: 'groupMenu.collapse.item1',
    //     path: '/group-collapse-menu-item-view-1',
    //     component: React.lazy(() =>
    //         import('views/demo/GroupCollapseMenuItemView1')
    //     ),
    //     authority: [],
    // },
    // {
    //     key: 'groupMenu.collapse.item2',
    //     path: '/group-collapse-menu-item-view-2',
    //     component: React.lazy(() =>
    //         import('views/demo/GroupCollapseMenuItemView2')
    //     ),
    //     authority: [],
    // },
]

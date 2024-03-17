import React from 'react'
import authRoute from './authRoute'
import { ADMIN, DELIVERY } from 'constants/roles.constant'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'products',
        path: '/products',
        component: React.lazy(() => import('views/products/ProductsList')),
        authority: [ADMIN],
    },
    {
        key: 'products',
        path: '/products/add',
        component: React.lazy(() => import('views/products/ProductNew')),
        authority: [ADMIN],
    },
    {
        key: 'products',
        path: '/products/edit/:id',
        component: React.lazy(() => import('views/products/ProductEdit')),
        authority: [ADMIN],
    },
    {
        key: 'brand',
        path: '/brand',
        component: React.lazy(() => import('views/brand/CompanyList')),
        authority: [ADMIN],
    },
    {
        key: 'brand',
        path: '/brand/add',
        component: React.lazy(() => import('views/brand/CompanyNew')),
        authority: [ADMIN],
    },
    {
        key: 'brand',
        path: '/brand/edit/:id',
        component: React.lazy(() => import('views/brand/BrandEdit')),
        authority: [ADMIN],
    },
    {
        key: 'categories',
        path: '/categories',
        component: React.lazy(() => import('views/categories/CategoryList')),
        authority: [ADMIN],
    },
    {
        key: 'categories',
        path: '/categories/add',
        component: React.lazy(() => import('views/categories/CategoryNew')),
        authority: [ADMIN],
    },
    {
        key: 'categories',
        path: '/categories/edit/:id',
        component: React.lazy(() => import('views/categories/CategoryEdit')),
        authority: [ADMIN],
    },
    {
        key: 'employes',
        path: '/employes',
        component: React.lazy(() => import('views/employes/EmployesList')),
        authority: [ADMIN],
    },
    {
        key: 'employes',
        path: '/employes/add',
        component: React.lazy(() => import('views/employes/EmployesNew')),
        authority: [ADMIN],
    },
    {
        key: 'employes',
        path: '/employes/edit/:id',
        component: React.lazy(() => import('views/employes/EmployesEdit')),
        authority: [ADMIN],
    },
    {
        key: 'users',
        path: '/users',
        component: React.lazy(() => import('views/customers')),
        authority: [ADMIN],
    },
    {
        key: 'users',
        path: '/users/:id',
        component: React.lazy(() => import('views/customers/CustomerDetail')),
        authority: [ADMIN],
    },
    {
        key: 'orders',
        path: '/orders',
        component: React.lazy(() => import('views/orders/OrdersList')),
        authority: [ADMIN],
    },
    {
        key: 'orders',
        path: '/orders/edit/:id',
        component: React.lazy(() => import('views/orders/OrdersEdit')),
        authority: [ADMIN],
    },
    {
        key: 'notifications',
        path: '/notifications',
        component: React.lazy(() => import('views/notifications/NotificationList')),
        authority: [ADMIN],
    },
    {
        key: 'notifications',
        path: '/notifications/add',
        component: React.lazy(() => import('views/notifications/NotificationNew')),
        authority: [ADMIN],
    },
    {
        key: 'notificationsEdit',
        path: '/notifications/edit/:id',
        component: React.lazy(() => import('views/notifications/NotificationEdit')),
        authority: [ADMIN],
    },
    {
        key: 'customerDetail',
        path: '/customer-details/:id',
        component: React.lazy(() => import('views/customers/CustomerDetail')),
        authority: [ADMIN],
    },
    {
        key: 'deliveryOrders',
        path: '/delivery-orders',
        component: React.lazy(() => import('views/deliveryOrders/OrdersList')),
        authority: [DELIVERY],
    },
    {
        key: 'faktura',
        path: '/faktura',
        component: React.lazy(() => import('views/faktura')),
        authority: [ADMIN],
    },
    {
        key: 'contragentFaktura',
        path: '/contragent-faktura',
        component: React.lazy(() => import('views/fakturaByContragent')),
        authority: [ADMIN],
    },
    {
        key: 'providers',
        path: '/providers',
        component: React.lazy(() => import('views/providers/ProvidersList')),
        authority: [ADMIN],
    },
    {
        key: 'providers',
        path: '/providers/add',
        component: React.lazy(() => import('views/providers/ProvidersNew')),
        authority: [ADMIN],
    },
    {
        key: 'aktSverka',
        path: '/akt-sverka',
        component: React.lazy(() => import('views/aktSverka')),
        authority: [ADMIN],
    },
    {
        key: 'debt',
        path: '/debt',
        component: React.lazy(() => import('views/debtUser/DebtUsersList')),
        authority: [ADMIN],
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

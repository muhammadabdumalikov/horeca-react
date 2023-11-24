import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'products',
        path: '/products',
        component: React.lazy(() => import('views/products/ProductsList')),
        authority: [],
    },
    {
        key: 'products',
        path: '/products/add',
        component: React.lazy(() => import('views/products/ProductNew')),
        authority: [],
    },
    {
        key: 'products',
        path: '/products/edit/:id',
        component: React.lazy(() => import('views/products/ProductEdit')),
        authority: [],
    },
    {
        key: 'companies',
        path: '/companies',
        component: React.lazy(() => import('views/companies/CompanyList')),
        authority: [],
    },
    {
        key: 'companies',
        path: '/companies/add',
        component: React.lazy(() => import('views/companies/CompanyNew')),
        authority: [],
    },
    {
        key: 'companies',
        path: '/companies/edit/:id',
        component: React.lazy(() => import('views/companies/CompanyEdit')),
        authority: [],
    },
    {
        key: 'types',
        path: '/types',
        component: React.lazy(() => import('views/types/TypesList')),
        authority: [],
    },
    {
        key: 'types',
        path: '/types/add',
        component: React.lazy(() => import('views/types/TypesNew')),
        authority: [],
    },
    {
        key: 'types',
        path: '/types/edit/:id',
        component: React.lazy(() => import('views/types/TypesEdit')),
        authority: [],
    },
    {
        key: 'agents',
        path: '/agents',
        component: React.lazy(() => import('views/agents/AgentsList')),
        authority: [],
    },
    {
        key: 'agents',
        path: '/agents/add',
        component: React.lazy(() => import('views/agents/AgentsNew')),
        authority: [],
    },
    {
        key: 'agents',
        path: '/agents/edit/:id',
        component: React.lazy(() => import('views/agents/AgentsEdit')),
        authority: [],
    },
    {
        key: 'users',
        path: '/users',
        component: React.lazy(() => import('views/users')),
        authority: [],
    },
    {
        key: 'orders',
        path: '/orders',
        component: React.lazy(() => import('views/orders')),
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

import {
    // NAV_ITEM_TYPE_TITLE,
    // NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant'
import { ADMIN, DELIVERY } from 'constants/roles.constant'

const navigationConfig = [
    {
        key: 'products',
        path: '/products',
        title: 'Продукты',
        translateKey: 'nav.products',
        icon: 'products',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN],
        subMenu: [],
    },
    {
        key: 'brand',
        path: '/brand',
        title: 'Бренд',
        translateKey: 'nav.brand',
        icon: 'buildings',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN],
        subMenu: [],
    },
    {
        key: 'categories',
        path: '/categories',
        title: 'Категории',
        translateKey: 'nav.categories',
        icon: 'catalog',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN],
        subMenu: [],
    },
    {
        key: 'employes',
        path: '/employes',
        title: 'Сотрудники',
        translateKey: 'nav.employes',
        icon: 'users',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN],
        subMenu: [],
    },
    {
        key: 'providers',
        path: '/providers',
        title: 'Поставщик',
        translateKey: 'nav.providers',
        icon: 'agents',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN],
        subMenu: [],
    },
    {
        key: 'orders',
        path: '/orders',
        title: 'Заказы',
        translateKey: 'nav.orders',
        icon: 'incomeBox',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN],
        subMenu: [],
    },
    {
        key: 'deliveryOrders',
        path: '/delivery-orders',
        title: 'Заказы',
        translateKey: 'nav.orders',
        icon: 'incomeBox',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [DELIVERY],
        subMenu: [],
    },
    {
        key: 'users',
        path: '/users',
        title: 'Клиенты',
        translateKey: 'nav.users',
        icon: 'users',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN],
        subMenu: [],
    },
    {
        key: 'debt',
        path: '/debt',
        title: 'Должники',
        translateKey: 'nav.debt',
        icon: 'users',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN],
        subMenu: [],
    },
    {
        key: 'notifications',
        path: '/notifications',
        title: 'Уведомления',
        translateKey: 'nav.notifications',
        icon: 'notification',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN],
        subMenu: [],
    },
    // {
    //     key: 'faktura',
    //     path: '/faktura',
    //     title: 'Фактура',
    //     translateKey: 'nav.faktura',
    //     icon: 'catalog',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [ADMIN],
    //     subMenu: [],
    // },
    {
        key: 'contragentFaktura',
        path: '/contragent-faktura',
        title: 'Фактура по контрагентам',
        translateKey: 'nav.faktura',
        icon: 'clipboardList',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN],
        subMenu: [],
    },
    {
        key: 'aktSverka',
        path: '/akt-sverka',
        title: 'Акт сверка',
        translateKey: 'nav.aktSverka',
        icon: 'calculator',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN],
        subMenu: [],
    },
    {
        key: 'paid',
        path: '/payment-history-list',
        title: 'Оплаченная сумма',
        translateKey: 'nav.aktSverka',
        icon: 'money',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN],
        subMenu: [],
    },

    // {
    //     key: 'collapseMenu',
    //     path: '',
    //     title: 'Collapse Menu',
    //     translateKey: 'nav.collapseMenu.collapseMenu',
    //     icon: 'collapseMenu',
    //     type: NAV_ITEM_TYPE_COLLAPSE,
    //     authority: [],
    //     subMenu: [
    //         {
    //             key: 'collapseMenu.item1',
    //             path: '/collapse-menu-item-view-1',
    //             title: 'Collapse menu item 1',
    //             translateKey: 'nav.collapseMenu.item1',
    //             icon: '',
    //             type: NAV_ITEM_TYPE_ITEM,
    //             authority: [],
    //             subMenu: [],
    //         },
    //     ],
    // },
    // {
    //     key: 'groupMenu',
    //     path: '',
    //     title: 'Group Menu',
    //     translateKey: 'nav.groupMenu.groupMenu',
    //     icon: '',
    //     type: NAV_ITEM_TYPE_TITLE,
    //     authority: [],
    //     subMenu: [
    //         {
    //             key: 'groupMenu.single',
    //             path: '/group-single-menu-item-view',
    //             title: 'Group single menu item',
    //             translateKey: 'nav.groupMenu.single',
    //             icon: 'groupSingleMenu',
    //             type: NAV_ITEM_TYPE_ITEM,
    //             authority: [],
    //             subMenu: [],
    //         },
    //         {
    //             key: 'groupMenu.collapse',
    //             path: '',
    //             title: 'Group collapse menu',
    //             translateKey: 'nav.groupMenu.collapse.collapse',
    //             icon: 'groupCollapseMenu',
    //             type: NAV_ITEM_TYPE_COLLAPSE,
    //             authority: [],
    //             subMenu: [
    //                 {
    //                     key: 'groupMenu.collapse.item1',
    //                     path: '/group-collapse-menu-item-view-1',
    //                     title: 'Menu item 1',
    //                     translateKey: 'nav.groupMenu.collapse.item1',
    //                     icon: '',
    //                     type: NAV_ITEM_TYPE_ITEM,
    //                     authority: [],
    //                     subMenu: [],
    //                 },
    //                 {
    //                     key: 'groupMenu.collapse.item2',
    //                     path: '/group-collapse-menu-item-view-2',
    //                     title: 'Menu item 2',
    //                     translateKey: 'nav.groupMenu.collapse.item2',
    //                     icon: '',
    //                     type: NAV_ITEM_TYPE_ITEM,
    //                     authority: [],
    //                     subMenu: [],
    //                 },
    //             ],
    //         },
    //     ],
    // },
]

export default navigationConfig

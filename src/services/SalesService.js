import ApiService from './ApiService'

export async function apiGetSalesProducts(params) {
    return ApiService.fetchData({
        url: 'admin/product/list',
        method: 'get',
        params,
    })
}
export async function apiGetProductById({ id }) {
    return ApiService.fetchData({
        url: `admin/product/${id}`,
        method: 'get',
    })
}
export async function apiInActiveProdct(data) {
    return ApiService.fetchData({
        url: `admin/product/set-status`,
        method: 'post',
        data,
    })
}
export async function apiOrderUpdatePayment(data) {
    return ApiService.fetchData({
        url: `admin/order/set-payment`,
        method: 'post',
        data,
    })
}

export async function apiGetSalesProduct(params) {
    return ApiService.fetchData({
        url: '/sales/product',
        method: 'get',
        params,
    })
}

export async function apiPutSalesProduct(data) {
    return ApiService.fetchData({
        url: `/admin/product/${data.id}`,
        method: 'patch',
        data,
    })
}

export async function apiCreateSalesProduct(data) {
    return ApiService.fetchData({
        url: 'admin/product',
        method: 'post',
        data,
    })
}

export async function apiGetSalesOrders(params) {
    return ApiService.fetchData({
        url: '/sales/orders',
        method: 'get',
        params,
    })
}

export async function apiDeleteSalesOrders(data) {
    return ApiService.fetchData({
        url: '/sales/orders/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesOrderDetails(params) {
    return ApiService.fetchData({
        url: '/sales/orders-details',
        method: 'get',
        params,
    })
}

export async function apiGetCustomers(params) {
    return ApiService.fetchData({
        url: 'admin/users/list',
        method: 'get',
        params,
    })
}
export async function apiGetCustomerById({id}) {
    return ApiService.fetchData({
        url: `admin/users/${id}`,
        method: 'get',
    })
}
export async function apiSeActivityCustomers(data) {
    return ApiService.fetchData({
        url: 'admin/users/set-status',
        method: 'post',
        data,
    })
}
export async function apiSetSuperUser(data) {
    return ApiService.fetchData({
        url: 'admin/users/set-super-user',
        method: 'post',
        data,
    })
}
export async function apiGetFaktura(data) {
    return ApiService.fetchData({
        url: 'admin/report/get-faktura-report',
        method: 'post',
        data,
    })
}
export async function apiGetAktSverka(data) {
    return ApiService.fetchData({
        url: 'admin/report/get-akt-sverka',
        method: 'post',
        data,
    })
}
export async function apiGetFakturaOrder(data) {
    return ApiService.fetchData({
        url: 'admin/report/get-faktura-order',
        method: 'post',
        data,
    })
}
export async function apiGetAllItogOrders(data) {
    return ApiService.fetchData({
        url: 'admin/report/get-all-itog-orders',
        method: 'post',
        data,
    })
}

export async function apiGetFakturaByContragent(params) {
    return ApiService.fetchData({
        url: 'admin/report/faktura-list',
        method: 'get',
        params,
    })
}
export async function apiSetFakturaArchive(data) {
    return ApiService.fetchData({
        url: 'admin/report/set-faktura-archive',
        method: 'post',
        data,
    })
}

export async function apiGetCompany(params) {
    return ApiService.fetchData({
        url: '/admin/company/list',
        method: 'get',
        params,
    })
}
export async function apiGetCompanyById({id}) {
    return ApiService.fetchData({
        url: `/company/${id}`,
        method: 'get'
    })
}
export async function apiUpdateCompany(data) {
    return ApiService.fetchData({
        url: `/admin/company/${data.id}`,
        method: 'patch',
        data,
    })
}
export async function apiInactiveCompany(data) {
    return ApiService.fetchData({
        url: '/admin/company/set-status',
        method: 'post',
        data,
    })
}

export async function apiCreateCompany(data) {
    return ApiService.fetchData({
        url: '/admin/company',
        method: 'post',
        data,
    })
}
export async function apiPutSalesCompany(data) {
    return ApiService.fetchData({
        url: '/',
        method: 'put',
        data,
    })
}
export async function apiGetCategory(params) {
    return ApiService.fetchData({
        url: '/admin/category/list/',
        method: 'get',
        params,
    })
}
export async function apiGetCategoryById({id}) {
    return ApiService.fetchData({
        url: `/category/${id}`,
        method: 'get',
    })
}
export async function apiGetNotifications(params) {
    return ApiService.fetchData({
        url: '/notification/list',
        method: 'get',
        params,
    })
}
export async function apiGetNotificationById({id}) {
    return ApiService.fetchData({
        url: `/notification/${id}`,
        method: 'get',
    })
}
export async function apiUpdateNotification(data) {
    return ApiService.fetchData({
        url: `/notification/${data?.id}`,
        method: 'patch',
        data,
    })
}
export async function apiCreateNotification(data) {
    return ApiService.fetchData({
        url: `/notification`,
        method: 'post',
        data,
    })
}
export async function apiInactiveNotiofication(data) {
    return ApiService.fetchData({
        url: '/ntf/in-active',
        method: 'put',
        data,
    })
}
export async function apiGetAgents(params) {
    return ApiService.fetchData({
        url: '/agent',
        method: 'get',
        params,
    })
}
export async function apiUpdateAgent(data) {
    return ApiService.fetchData({
        url: '/agent/update',
        method: 'put',
        data,
    })
}

export async function apiGetRegions(params) {
    return ApiService.fetchData({
        url: '/region',
        method: 'get',
        params,
    })
}
export async function apiCreateCategory(data) {
    return ApiService.fetchData({
        url: '/admin/category',
        method: 'post',
        data,
    })
}
export async function apiInActiveCategory(data) {
    return ApiService.fetchData({
        url: '/admin/category/set-status',
        method: 'post',
        data,
    })
}
export async function apiUpdateCategory(data) {
    console.log(data, 'data')
    return ApiService.fetchData({
        url: `/admin/category/${data?.id}`,
        method: 'patch',
        data,
    })
}

//employes

export async function apiGetEmployes(params) {
    return ApiService.fetchData({
        url: '/root/worker-list',
        method: 'get',
        params,
    })
}
export async function apiGetEmployesById({id}) {
    return ApiService.fetchData({
        url: `/admin/users/${id}`,
        method: 'get',
    })
}
export async function apiUpdateEmploye(data) {
    return ApiService.fetchData({
        url: `/root/update-worker/${data.id}`,
        method: 'patch',
        data
    })
}
export async function apiPatchActivityEmployes(data) {
    return ApiService.fetchData({
        url: '/admin/users/set-status',
        method: 'post',
        data,
    })
}

// workers
export async function apiCreateEmployes(data) {
    return ApiService.fetchData({
        url: '/root/create-worker',
        method: 'post',
        data,
    })
}
export async function apiCreateProvider(data) {
    return ApiService.fetchData({
        url: '/root/create-provider',
        method: 'post',
        data,
    })
}



//orders
export async function apiGetOrders(params) {
    return ApiService.fetchData({
        url: '/admin/order/list',
        method: 'get',
        params,
    })
}

export async function apiGetDelivers(params) {
    return ApiService.fetchData({
        url: '/root/worker-list',
        method: 'get',
        params,
    })
}
export async function getProductsFaktura(params) {
    return ApiService.fetchData({
        url: '/admin/report/get-all-products-excel-data',
        method: 'get',
        params,
    })
}

export async function apiUpdateOrderStatus(data) {
    return ApiService.fetchData({
        url: '/admin/order/set-status',
        method: 'post',
        data,
    })
}
export async function apiSetDeliverStatusMultiple(data) {
    return ApiService.fetchData({
        url: '/admin/order/set-deliver-multiple',
        method: 'post',
        data,
    })
}

export async function apiGetProductsByOrderId(params) {
    return ApiService.fetchData({
        url: `admin/order/${params.id}`,
        method: 'get',
        // params
    })
}
export async function apiGetDebtUsers(params) {
    return ApiService.fetchData({
        url: `admin/users/in-debt-list`,
        method: 'get',
        params
    })
}
export async function apiOrderUpdate(data) {
    return ApiService.fetchData({
        url: `/admin/order/order-update/${data.items?.[0].id}`,
        method: 'patch',
        data
    })
}

//delivery orders

export async function apiGetDeliveryOrders (params) {
    return ApiService.fetchData({
        url: '/admin/order/list-by-deliver',
        method: 'get',
        params,
    })
}

export async function apiUpdateOrderDeliver(data) {
    return ApiService.fetchData({
        url: '/admin/order/set-deliver',
        method: 'post',
        data,
    })
}
export async function apiUpdateProductsListExel(data) {
    return ApiService.fetchData({
        url: '/admin/report/set-products-ostatok',
        method: 'post',
        data,
    })
}
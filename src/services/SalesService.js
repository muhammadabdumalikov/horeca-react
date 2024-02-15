import ApiService from './ApiService'

export async function apiGetSalesProducts(params) {
    return ApiService.fetchData({
        url: '/product/all',
        method: 'get',
        params,
    })
}
export async function apiGetProductById({ id }) {
    return ApiService.fetchData({
        url: `/product/${id}`,
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
        url: '/a-user',
        method: 'get',
        params,
    })
}

export async function apiGetCompany(params) {
    return ApiService.fetchData({
        url: 'admin/company/list',
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
        url: `admin/company/${data.id}`,
        method: 'patch',
        data,
    })
}
export async function apiInactiveCompany(data) {
    return ApiService.fetchData({
        url: '/company/in-active',
        method: 'put',
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
        url: '/ntf',
        method: 'get',
        params,
    })
}
export async function apiUpdateNotification(data) {
    return ApiService.fetchData({
        url: '/ntf/update',
        method: 'put',
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
export async function apiCreateAgent(data) {
    return ApiService.fetchData({
        url: '/agent/create',
        method: 'post',
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
export async function apiInactiveAgent(data) {
    return ApiService.fetchData({
        url: '/agent/in-active',
        method: 'put',
        data,
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

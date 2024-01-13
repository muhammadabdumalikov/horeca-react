import ApiService from './ApiService'

export async function apiGetSalesDashboardData(data) {
    return ApiService.fetchData({
        url: '/sales/dashboard',
        method: 'post',
        data,
    })
}

export async function apiGetSalesProducts(params) {
    return ApiService.fetchData({
        url: '/product',
        method: 'get',
        params,
    })
}
export async function apiGetProductById({id}) {
    return ApiService.fetchData({
        url: `/product/find/${id}`,
        method: 'get',
    })
}

export async function apiDeleteSalesProducts(data) {
    return ApiService.fetchData({
        url: '/sales/products/delete',
        method: 'delete',
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
        url: '/sales/products/update',
        method: 'put',
        data,
    })
}

export async function apiCreateSalesProduct(data) {
    return ApiService.fetchData({
        url: '/product/create',
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
export async function apiGetSalesCompany(params) {
    return ApiService.fetchData({
        url: '/company',
        method: 'get',
        params,
    })
}
export async function apiDeleteSalesCompany(data) {
    return ApiService.fetchData({
        url: '/',
        method: 'delete',
        data,
    })
}
export async function apiCreateSalesCompany(data) {
    return ApiService.fetchData({
        url: '/',
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
        url: '/category',
        method: 'get',
        params,
    })
}
export async function apiCreateCategory(data) {
    return ApiService.fetchData({
        url: '/category/create',
        method: 'post',
        data,
    })
}

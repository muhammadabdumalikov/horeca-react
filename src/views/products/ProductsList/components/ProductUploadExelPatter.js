import ExcelJS from 'exceljs'
import { apiUpdateProductsListExel } from 'services/SalesService'

export const setExel = async (buffer) => {
    
    const workbook = new ExcelJS.Workbook()

    await workbook.xlsx.load(buffer)
    const productObj = {}
    // Assuming the data is on the first worksheet
    const worksheet = workbook.getWorksheet(1)

    for (let i = 1; i <= worksheet.rowCount; i++) {
        const prodIndex = worksheet.getCell(`A${i}`).value || 'ERROR'
        productObj[prodIndex] = worksheet.getCell(`E${i}`).value
    }

    const req = await apiUpdateProductsListExel(productObj)
    console.log(req, 'req')
    return req
}

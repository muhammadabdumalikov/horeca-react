// import dayjs from "dayjs"
import dayjs from 'dayjs'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

export const DocumentMimeTypes = {
    DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    PPTX: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    PDF: 'application/pdf',
}

export const XLSTableStyles = {
    tableCellTextCenterAndBold: {
        border: {
            top: {
                style: 'thin',
                color: '#000000',
            },
            left: {
                style: 'thin',
                color: '#000000',
            },
            right: {
                style: 'thin',
                color: '#000000',
            },
            bottom: {
                style: 'thin',
                color: '#000000',
            },
        },
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
        font: { bold: true, size: 12 },
    },

    tableCellTextCenter: {
        border: {
            top: {
                style: 'thin',
                color: '#000000',
            },
            left: {
                style: 'thin',
                color: '#000000',
            },
            right: {
                style: 'thin',
                color: '#000000',
            },
            bottom: {
                style: 'thin',
                color: '#000000',
            },
        },
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
        font: {
            size: 12,
        },
    },
    tableCellTextLeft: {
        border: {
            top: {
                style: 'thin',
                color: '#000000',
            },
            left: {
                style: 'thin',
                color: '#000000',
            },
            right: {
                style: 'thin',
                color: '#000000',
            },
            bottom: {
                style: 'thin',
                color: '#000000',
            },
        },
        alignment: { vertical: 'middle', horizontal: 'left', wrapText: true },
        font: {
            size: 12,
        },
    },
    tableCellTextLeftWithBold: {
        border: {
            top: {
                style: 'thin',
                color: '#000000',
            },
            left: {
                style: 'thin',
                color: '#000000',
            },
            right: {
                style: 'thin',
                color: '#000000',
            },
            bottom: {
                style: 'thin',
                color: '#000000',
            },
        },
        alignment: { vertical: 'middle', horizontal: 'left', wrapText: true },
        font: { bold: true },
    },

    tableCellTextRightWithBold: {
        border: {
            top: {
                style: 'thin',
                color: '#000000',
            },
            left: {
                style: 'thin',
                color: '#000000',
            },
            right: {
                style: 'thin',
                color: '#000000',
            },
            bottom: {
                style: 'thin',
                color: '#000000',
            },
        },
        alignment: { vertical: 'middle', horizontal: 'right', wrapText: true },
        font: { bold: true },
    },
    headerTitle: {
        border: {
            top: {
                style: 'thin',
                color: '#000000',
            },
            left: {
                style: 'thin',
                color: '#000000',
            },
            right: {
                style: 'thin',
                color: '#000000',
            },
            bottom: {
                style: 'thin',
                color: '#000000',
            },
        },
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
        font: { size: 14, bold: true },
        fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {
                argb: 'FFD9D9D9',
            },
            bgColor: {
                argb: 'FFD9D9D9',
            },
        },
    },
}

export const generateExcel = async (success) => {
    const workbook = new ExcelJS.Workbook()
    workbook.addWorksheet('table_1', {
        pageSetup: {
            fitToWidth: 1,
            orientation: 'landscape',
        },
    })
    let startRowIndex = 1
    let worksheet = workbook.getWorksheet(1)

    let data = success.data

    worksheet.getColumn(1).width = 4
    worksheet.getColumn(2).width = 40
    worksheet.getColumn(3).width = 20
    worksheet.getColumn(4).width = 10
    worksheet.getColumn(5).width = 20

    worksheet.getColumn(6).width = 5

    worksheet.getColumn(7).width = 4
    worksheet.getColumn(8).width = 40
    worksheet.getColumn(9).width = 20
    worksheet.getColumn(10).width = 10
    worksheet.getColumn(11).width = 20
    // data = [data[0]];
    const cell_style = XLSTableStyles.tableCellTextLeft
    const cell_bold_center_style = XLSTableStyles.tableCellTextCenterAndBold
    const cell_center_style = XLSTableStyles.tableCellTextCenter
    const cell_bold_right_style = XLSTableStyles.tableCellTextRightWithBold

    for (let i = 0; i < data.length; i++) {
        const order_raw = data[i]
        worksheet.getCell(`A${startRowIndex + i}`).style = cell_style
        worksheet.mergeCells(`A${startRowIndex + i}:B${startRowIndex + i}`)
        worksheet.getCell(`A${startRowIndex + i}`).value = `Тип документа: -`

        worksheet.getCell(`C${startRowIndex + i}`).style = cell_style
        worksheet.mergeCells(`C${startRowIndex + i}:E${startRowIndex + i}`)
        worksheet.getCell(
            `C${startRowIndex + i}`
        ).value = `Дата заказа: ${order_raw.created_at.toLocaleString('en-US', {
            timeZone: 'Asia/Tashkent',
            hour12: false,
        })}`

        worksheet.getCell(`A${startRowIndex + i + 1}`).style = cell_style
        worksheet.mergeCells(
            `A${startRowIndex + i + 1}:B${startRowIndex + i + 1}`
        )
        worksheet.getCell(
            `A${startRowIndex + i + 1}`
        ).value = `Контрагент: ${order_raw.client_name}`

        worksheet.getCell(`C${startRowIndex + i + 1}`).style = cell_style
        worksheet.mergeCells(
            `C${startRowIndex + i + 1}:E${startRowIndex + i + 1}`
        )
        worksheet.getCell(
            `C${startRowIndex + i + 1}`
        ).value = `Тел. контр.: ${order_raw.client_phone}`

        worksheet.getCell(`A${startRowIndex + i + 2}`).style = cell_style
        worksheet.mergeCells(
            `A${startRowIndex + i + 2}:B${startRowIndex + i + 2}`
        )
        worksheet.getCell(
            `A${startRowIndex + i + 2}`
        ).value = `Агент: ${order_raw.registrator_first_name} ${order_raw.registrator_last_name}`

        worksheet.getCell(`C${startRowIndex + i + 2}`).style = cell_style
        worksheet.mergeCells(
            `C${startRowIndex + i + 2}:E${startRowIndex + i + 2}`
        )
        worksheet.getCell(
            `C${startRowIndex + i + 2}`
        ).value = `Тел. агента.: ${order_raw.registrator_phone}`

        worksheet.getCell(`A${startRowIndex + i + 3}`).style = cell_style
        worksheet.mergeCells(
            `A${startRowIndex + i + 3}:B${startRowIndex + i + 3}`
        )
        worksheet.getCell(
            `A${startRowIndex + i + 3}`
        ).value = `Доставщик: ${order_raw.deliver_user_json?.first_name} ${order_raw.deliver_user_json?.last_name}`

        worksheet.getCell(`C${startRowIndex + i + 3}`).style = cell_style
        worksheet.mergeCells(
            `C${startRowIndex + i + 3}:E${startRowIndex + i + 3}`
        )
        worksheet.getCell(
            `C${startRowIndex + i + 3}`
        ).value = `Тел. достав.: ${order_raw.deliver_user_json?.phone}`

        worksheet.getCell(`A${startRowIndex + i + 4}`).style = cell_style
        worksheet.mergeCells(
            `A${startRowIndex + i + 4}:B${startRowIndex + i + 4}`
        )
        worksheet.getCell(`A${startRowIndex + i + 4}`).value = `Склада: -`

        worksheet.getCell(`C${startRowIndex + i + 4}`).style = cell_style
        worksheet.mergeCells(
            `C${startRowIndex + i + 4}:E${startRowIndex + i + 4}`
        )
        worksheet.getCell(`C${startRowIndex + i + 4}`).value = 'Примечание: -'
        worksheet.getCell(`A${startRowIndex + i + 6}`).value = '№'
        worksheet.getCell(`A${startRowIndex + i + 6}`).style =
            cell_bold_center_style

        worksheet.getCell(`B${startRowIndex + i + 6}`).value = 'Наименование'
        worksheet.getCell(`B${startRowIndex + i + 6}`).style =
            cell_bold_center_style

        worksheet.getCell(`C${startRowIndex + i + 6}`).value = 'Цена'
        worksheet.getCell(`C${startRowIndex + i + 6}`).style =
            cell_bold_center_style

        worksheet.getCell(`D${startRowIndex + i + 6}`).value = 'К-во'
        worksheet.getCell(`D${startRowIndex + i + 6}`).style =
            cell_bold_center_style

        worksheet.getCell(`E${startRowIndex + i + 6}`).value = 'Сумма'
        worksheet.getCell(`E${startRowIndex + i + 6}`).style =
            cell_bold_center_style

        for (let k = 0; k < order_raw.items?.length; k++) {
            let innerStartRowIndex = startRowIndex + 7 + i
            const item_raw = order_raw.items[k]

            worksheet.getCell(`A${innerStartRowIndex + k}`).value = k + 1
            worksheet.getCell(`A${innerStartRowIndex + k}`).style = cell_style

            worksheet.getCell(`B${innerStartRowIndex + k}`).value =
                item_raw?.name_uz
            worksheet.getCell(`B${innerStartRowIndex + k}`).style = cell_style

            worksheet.getCell(`C${innerStartRowIndex + k}`).value =
                item_raw?.price
            worksheet.getCell(`C${innerStartRowIndex + k}`).style = cell_style

            worksheet.getCell(`D${innerStartRowIndex + k}`).value =
                item_raw?.quantity
            worksheet.getCell(`D${innerStartRowIndex + k}`).style = cell_style

            worksheet.getCell(`E${innerStartRowIndex + k}`).value =
                item_raw?.total_sum
            worksheet.getCell(`E${innerStartRowIndex + k}`).style = cell_style

            // innerStartRowIndex += k + 1;
        }

        const totalQuantity = order_raw?.items.reduce(
            (accumulator, currentItem) => {
                return accumulator + currentItem.quantity
            },
            0
        )

        worksheet.getCell(
            `A${startRowIndex + i + 7 + order_raw.items.length}`
        ).style = cell_bold_right_style
        worksheet.mergeCells(
            `A${startRowIndex + i + 7 + order_raw.items.length}:E${
                startRowIndex + i + 7 + order_raw.items.length
            }`
        )
        worksheet.getCell(
            `A${startRowIndex + i + 7 + order_raw.items.length}`
        ).value = `Итого по инвойсу: ${totalQuantity} шт ${order_raw.total_sum}`

        worksheet.getCell(
            `A${startRowIndex + i + 8 + order_raw.items.length}`
        ).style = cell_center_style
        worksheet.mergeCells(
            `A${startRowIndex + i + 8 + order_raw.items.length}:E${
                startRowIndex + i + 8 + order_raw.items.length
            }`
        )
        worksheet.getCell(
            `A${startRowIndex + i + 8 + order_raw.items.length}`
        ).value = `Сдал____________     Принял____________`

        startRowIndex += 10 + order_raw.items.length
    }

    const buffer = await workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        saveAs(blob, `Фактура-для-склада(${dayjs(new Date()).format("MM-DD-YYYY")}).xlsx`)
    })

    return buffer
}

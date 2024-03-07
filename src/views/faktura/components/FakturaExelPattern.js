import dayjs from "dayjs"
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

export  const generateExcel = async (success) => {

    const workbook = new ExcelJS.Workbook()
    workbook.addWorksheet('table_1', {
        pageSetup: {
            fitToWidth: 1,
            orientation: 'landscape',
        },
    })
    let startRowIndex = 1
    let worksheet = workbook.getWorksheet(1)

    const data = success

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
        worksheet.getCell(
            `A${startRowIndex + i}`
        ).value = `Контрагент: ${order_raw.client_name}`

        worksheet.getCell(`C${startRowIndex + i}`).style = cell_style
        worksheet.mergeCells(`C${startRowIndex + i}:E${startRowIndex + i}`)
        worksheet.getCell(
            `C${startRowIndex + i}`
        ).value = `Дата заказа: ${dayjs(order_raw.created_at).format('YYYY-MM-DD')}`

        worksheet.getCell(`G${startRowIndex + i}`).style = cell_style
        worksheet.mergeCells(`G${startRowIndex + i}:H${startRowIndex + i}`)
        worksheet.getCell(
            `G${startRowIndex + i}`
        ).value = `Контрагент: ${order_raw.client_name}`

        worksheet.getCell(`I${startRowIndex + i}`).style = cell_style
        worksheet.mergeCells(`I${startRowIndex + i}:K${startRowIndex + i}`)
        worksheet.getCell(
            `I${startRowIndex + i}`
        ).value = `Дата заказа: ${dayjs(order_raw.created_at).format('YYYY-MM-DD')}`

        worksheet.getCell(`A${startRowIndex + i + 1}`).style = cell_style
        worksheet.mergeCells(
            `A${startRowIndex + i + 1}:B${startRowIndex + i + 1}`
        )
        worksheet.getCell(`A${startRowIndex + i + 1}`).value =
            ':: HORECA TRADE GROUP'

        worksheet.getCell(`C${startRowIndex + i + 1}`).style = cell_style
        worksheet.mergeCells(
            `C${startRowIndex + i + 1}:E${startRowIndex + i + 1}`
        )
        worksheet.getCell(`C${startRowIndex + i + 1}`).value = `Адрес: test`

        worksheet.getCell(`G${startRowIndex + i + 1}`).style = cell_style
        worksheet.mergeCells(
            `G${startRowIndex + i + 1}:H${startRowIndex + i + 1}`
        )
        worksheet.getCell(`G${startRowIndex + i + 1}`).value =
            ':: HORECA TRADE GROUP'

        worksheet.getCell(`I${startRowIndex + i + 1}`).style = cell_style
        worksheet.mergeCells(
            `I${startRowIndex + i + 1}:K${startRowIndex + i + 1}`
        )
        worksheet.getCell(
            `I${startRowIndex + i + 1}`
        ).value = `Ориентир: test`

        worksheet.getCell(`A${startRowIndex + i + 2}`).style = cell_style
        worksheet.mergeCells(
            `A${startRowIndex + i + 2}:B${startRowIndex + i + 2}`
        )
        worksheet.getCell(
            `A${startRowIndex + i + 2}`
        ).value = `Агент: ${order_raw.registrator_first_name || '-'} ${order_raw.registrator_last_name || '-'}`

        worksheet.getCell(`C${startRowIndex + i + 2}`).style = cell_style
        worksheet.mergeCells(
            `C${startRowIndex + i + 2}:E${startRowIndex + i + 2}`
        )
        worksheet.getCell(
            `C${startRowIndex + i + 2}`
        ).value = `Тел. контр.: ${order_raw.client_phone || '-'}`

        worksheet.getCell(`G${startRowIndex + i + 2}`).style = cell_style
        worksheet.mergeCells(
            `G${startRowIndex + i + 2}:H${startRowIndex + i + 2}`
        )
        worksheet.getCell(
            `G${startRowIndex + i + 2}`
        ).value = `Агент: ${order_raw.registrator_first_name || '-'} ${order_raw.registrator_last_name || '-'}`

        worksheet.getCell(`I${startRowIndex + i + 2}`).style = cell_style
        worksheet.mergeCells(
            `I${startRowIndex + i + 2}:K${startRowIndex + i + 2}`
        )
        worksheet.getCell(
            `I${startRowIndex + i + 2}`
        ).value = `Тел. агента.: ${order_raw.registrator_phone || '-'}`

        worksheet.getCell(`A${startRowIndex + i + 3}`).style = cell_style
        worksheet.mergeCells(
            `A${startRowIndex + i + 3}:B${startRowIndex + i + 3}`
        )
        worksheet.getCell(
            `A${startRowIndex + i + 3}`
        ).value = `Тип оплаты: ${order_raw.payment_type_name?.name_uz}`

        worksheet.getCell(`C${startRowIndex + i + 3}`).style = cell_style
        worksheet.mergeCells(
            `C${startRowIndex + i + 3}:E${startRowIndex + i + 3}`
        )
        worksheet.getCell(
            `C${startRowIndex + i + 3}`
        ).value = `Тел. агента: ${order_raw.registrator_phone || '-'}`

        worksheet.getCell(`G${startRowIndex + i + 3}`).style = cell_style
        worksheet.mergeCells(
            `G${startRowIndex + i + 3}:H${startRowIndex + i + 3}`
        )
        worksheet.getCell(
            `G${startRowIndex + i + 3}`
        ).value = `Доставщик: ${order_raw.deliver_user_json?.first_name || '-'} ${order_raw.deliver_user_json?.last_name || '-'}`

        worksheet.getCell(`I${startRowIndex + i + 3}`).style = cell_style
        worksheet.mergeCells(
            `I${startRowIndex + i + 3}:K${startRowIndex + i + 3}`
        )
        worksheet.getCell(
            `I${startRowIndex + i + 3}`
        ).value = `Тел. достав.: ${order_raw.deliver_user_json?.phone || '-'}`

        worksheet.getCell(`A${startRowIndex + i + 4}`).style = cell_style
        worksheet.mergeCells(
            `A${startRowIndex + i + 4}:B${startRowIndex + i + 4}`
        )
        worksheet.getCell(`A${startRowIndex + i + 4}`).value =
            'Примечание: -'

        worksheet.getCell(`C${startRowIndex + i + 4}`).style = cell_style
        worksheet.mergeCells(
            `C${startRowIndex + i + 4}:E${startRowIndex + i + 4}`
        )
        worksheet.getCell(
            `C${startRowIndex + i + 4}`
        ).value = `Долг ост.: ostatka`

        worksheet.getCell(`G${startRowIndex + i + 4}`).style = cell_style
        worksheet.mergeCells(
            `G${startRowIndex + i + 4}:H${startRowIndex + i + 4}`
        )
        worksheet.getCell(
            `G${startRowIndex + i + 4}`
        ).value = `Тип оплаты:  ${order_raw.payment_type_name?.name_uz}`

        worksheet.getCell(`I${startRowIndex + i + 4}`).style = cell_style
        worksheet.mergeCells(
            `I${startRowIndex + i + 4}:K${startRowIndex + i + 4}`
        )
        worksheet.getCell(
            `I${startRowIndex + i + 4}`
        ).value = `Долг ост.: ostatka`

        worksheet.getCell(`G${startRowIndex + i + 5}`).style = cell_style
        worksheet.mergeCells(
            `G${startRowIndex + i + 5}:H${startRowIndex + i + 5}`
        )
        worksheet.getCell(`G${startRowIndex + i + 5}`).value =
            'Примечание: -'

        worksheet.getCell(`A${startRowIndex + i + 6}`).value = '№'
        worksheet.getCell(`A${startRowIndex + i + 6}`).style =
            cell_bold_center_style

        worksheet.getCell(`B${startRowIndex + i + 6}`).value =
            'Наименование'
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

        worksheet.getCell(`G${startRowIndex + i + 6}`).value = '№'
        worksheet.getCell(`G${startRowIndex + i + 6}`).style =
            cell_bold_center_style

        worksheet.getCell(`H${startRowIndex + i + 6}`).value =
            'Наименование'
        worksheet.getCell(`H${startRowIndex + i + 6}`).style =
            cell_bold_center_style

        worksheet.getCell(`I${startRowIndex + i + 6}`).value = 'Цена'
        worksheet.getCell(`I${startRowIndex + i + 6}`).style =
            cell_bold_center_style

        worksheet.getCell(`J${startRowIndex + i + 6}`).value = 'К-во'
        worksheet.getCell(`J${startRowIndex + i + 6}`).style =
            cell_bold_center_style

        worksheet.getCell(`K${startRowIndex + i + 6}`).value = 'Сумма'
        worksheet.getCell(`K${startRowIndex + i + 6}`).style =
            cell_bold_center_style

        for (let k = 0; k < order_raw.items?.length; k++) {
            const innerStartRowIndex = startRowIndex + 7
            const item_raw = order_raw.items[k]

            worksheet.getCell(`A${innerStartRowIndex + k}`).value = k + 1
            worksheet.getCell(`A${innerStartRowIndex + k}`).style =
                cell_style

            worksheet.getCell(`B${innerStartRowIndex + k}`).value =
                item_raw?.name_uz
            worksheet.getCell(`B${innerStartRowIndex + k}`).style =
                cell_style

            worksheet.getCell(`C${innerStartRowIndex + k}`).value =
                item_raw?.price
            worksheet.getCell(`C${innerStartRowIndex + k}`).style =
                cell_style

            worksheet.getCell(`D${innerStartRowIndex + k}`).value =
                item_raw?.quantity
            worksheet.getCell(`D${innerStartRowIndex + k}`).style =
                cell_style

            worksheet.getCell(`E${innerStartRowIndex + k}`).value =
                item_raw?.total_sum
            worksheet.getCell(`E${innerStartRowIndex + k}`).style =
                cell_style

            worksheet.getCell(`G${innerStartRowIndex + k}`).value = k + 1
            worksheet.getCell(`G${innerStartRowIndex + k}`).style =
                cell_style

            worksheet.getCell(`H${innerStartRowIndex + k}`).value =
                item_raw?.name_uz
            worksheet.getCell(`H${innerStartRowIndex + k}`).style =
                cell_style

            worksheet.getCell(`I${innerStartRowIndex + k}`).value =
                item_raw?.price
            worksheet.getCell(`I${innerStartRowIndex + k}`).style =
                cell_style

            worksheet.getCell(`J${innerStartRowIndex + k}`).value =
                item_raw?.quantity
            worksheet.getCell(`J${innerStartRowIndex + k}`).style =
                cell_style

            worksheet.getCell(`K${innerStartRowIndex + k}`).value =
                item_raw?.total_sum
            worksheet.getCell(`K${innerStartRowIndex + k}`).style =
                cell_style
        }
        worksheet.getCell(
            `A${startRowIndex + 7 + order_raw.items.length}`
        ).style = cell_bold_right_style
        worksheet.mergeCells(
            `A${startRowIndex + 7 + order_raw.items.length}:E${
                startRowIndex + 7 + order_raw.items.length
            }`
        )
        worksheet.getCell(
            `A${startRowIndex + 7 + order_raw.items.length}`
        ).value = `Итого по инвойсу: ${order_raw.items.length} шт ${order_raw.total_sum}`

        worksheet.getCell(
            `A${startRowIndex + 8 + order_raw.items.length}`
        ).style = cell_center_style
        worksheet.mergeCells(
            `A${startRowIndex + 8 + order_raw.items.length}:E${
                startRowIndex + 8 + order_raw.items.length
            }`
        )
        worksheet.getCell(
            `A${startRowIndex + 8 + order_raw.items.length}`
        ).value = `Сдал____________     Принял____________`

        worksheet.getCell(
            `G${startRowIndex + 7 + order_raw.items.length}`
        ).style = cell_bold_right_style
        worksheet.mergeCells(
            `G${startRowIndex + 7 + order_raw.items.length}:K${
                startRowIndex + 7 + order_raw.items.length
            }`
        )
        worksheet.getCell(
            `G${startRowIndex + 7 + order_raw.items.length}`
        ).value = `Итого по инвойсу: 00 шт ${order_raw.total_sum}`

        worksheet.getCell(
            `G${startRowIndex + 8 + order_raw.items.length}`
        ).style = cell_center_style
        worksheet.mergeCells(
            `G${startRowIndex + 8 + order_raw.items.length}:K${
                startRowIndex + 8 + order_raw.items.length
            }`
        )
        worksheet.getCell(
            `G${startRowIndex + 8 + order_raw.items.length}`
        ).value = `Сдал____________     Принял____________`

        startRowIndex += 10 + order_raw.items.length
    }

     await workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        saveAs(blob, 'example.xlsx')
    })

    // const file = {
    //     originalname: String('Faktura hisobot'),
    //     size: String(buffer?.length),
    //     buffer,
    //     mimetype: String(DocumentMimeTypes?.XLSX),
    //     fieldname: String('Faktura hisobot'),
    //     encoding: '',
    // }

    // const uploadFile = await this.fileRouterService.uploadReport(file)

    // return uploadFile

    // Save workbook
    // workbook.xlsx.writeBuffer().then(buffer => {
    //     const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    //     saveAs(blob, 'example.xlsx');
    //   });
}
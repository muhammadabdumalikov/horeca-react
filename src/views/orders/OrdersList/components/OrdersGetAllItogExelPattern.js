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

export const generateAllItogExcel = async (success) => {
    const workbook = new ExcelJS.Workbook()
    workbook.addWorksheet('table_1', {
        pageSetup: {
            fitToWidth: 1,
            orientation: 'landscape',
        },
    })
    let startRowIndex = 7
    let worksheet = workbook.getWorksheet(1)

    let data = success?.data

    worksheet.getColumn(1).width = 10
    worksheet.getColumn(2).width = 50
    worksheet.getColumn(3).width = 15
    worksheet.getColumn(4).width = 20
    worksheet.getColumn(5).width = 20

    const cell_style = XLSTableStyles.tableCellTextLeft
    const cell_bold_left_style = XLSTableStyles.tableCellTextLeftWithBold
    const cell_center_style = XLSTableStyles.tableCellTextCenter
    const cell_bold_right_style = XLSTableStyles.tableCellTextRightWithBold
    const cell_right_style = XLSTableStyles.tableCellTextRight

    worksheet.mergeCells(`A1:E1`)
    worksheet.getCell('A1').value = `Даты отгрузки: ${dayjs(
        new Date()
    ).format('DD-MM-YYYY')}`
    worksheet.mergeCells(`A2:E2`)
    worksheet.getCell(
        'A2'
    ).value = `Агенты: ${data.currentUser?.phone} (${data.currentUser?.first_name} ${data.currentUser?.last_name})`
    worksheet.mergeCells(`A3:E3`)
    worksheet.getCell('A3').value = `Рабочие пространства: -`
    worksheet.mergeCells(`A4:E4`)
    worksheet.getCell('A4').value = `№ :${data?.data.map(
        (item) => ' ' + item?.order_number
    )}`
    worksheet.mergeCells(`A5:E5`)
    worksheet.getCell('A5').value = `Кол. фактури: ${data.data.length}`

    worksheet.getCell('A6').style = cell_style
    worksheet.getCell('A6').value = `Код`
    worksheet.getCell('B6').style = cell_style
    worksheet.getCell('B6').value = `Наименование`
    worksheet.getCell('C6').style = cell_style
    worksheet.getCell('C6').value = `Кол-во`
    worksheet.getCell('D6').style = cell_style
    worksheet.getCell('D6').value = `Кор + шт`
    worksheet.getCell('E6').style = cell_style
    worksheet.getCell('E6').value = `Сумма`

    let i = 0
    let dataRowIndex = 0

    while (i < data.data.length) {
        const order_raw = data.data[i]
        for (let k = 0; k < order_raw?.order_items?.length; k++) {
            worksheet.getCell(`A${startRowIndex + dataRowIndex}`).style =
                cell_style
            worksheet.getCell(`A${startRowIndex + dataRowIndex}`).value =
                order_raw?.order_number
            worksheet.getCell(`B${startRowIndex + dataRowIndex}`).style =
                cell_style
            worksheet.getCell(`B${startRowIndex + dataRowIndex}`).value =
                order_raw?.order_items[k]?.name_uz
            worksheet.getCell(`C${startRowIndex + dataRowIndex}`).style =
                cell_right_style
            worksheet.getCell(`C${startRowIndex + dataRowIndex}`).value =
                +order_raw?.order_items[k]?.quantity
            const block = Math.floor(
                +order_raw?.order_items[k]?.quantity /
                    +order_raw?.order_items[k]?.count_in_block
            )
            const remainingPieces =
                +order_raw?.order_items[k]?.quantity %
                +order_raw?.order_items[k]?.count_in_block
            worksheet.getCell(`D${startRowIndex + dataRowIndex}`).style =
                cell_center_style
            worksheet.getCell(`D${startRowIndex + dataRowIndex}`).value =
                (block > 0 ? `${block} Кор` : '') +
                (remainingPieces > 0 ? `${remainingPieces}+ шт` : '')
            worksheet.getCell(`E${startRowIndex + dataRowIndex}`).style =
                cell_style
            worksheet.getCell(`E${startRowIndex + dataRowIndex}`).value =
                +order_raw?.order_items[k]?.total_price

            dataRowIndex++
        }
        i++
    }
    worksheet.getCell(`A${startRowIndex + dataRowIndex}`).style =
        cell_bold_left_style
    worksheet.getCell(`A${startRowIndex + dataRowIndex}`).value = 'Сумма'
    worksheet.getCell(`B${startRowIndex + dataRowIndex}`).style =
        cell_bold_left_style
    worksheet.getCell(`B${startRowIndex + dataRowIndex}`).value = 'ИТОГО'
    worksheet.getCell(`C${startRowIndex + dataRowIndex}`).style =
        cell_bold_right_style
    worksheet.getCell(`C${startRowIndex + dataRowIndex}`).value = {
        formula: `SUM(C${startRowIndex}:C${startRowIndex + data.data.length})`,
        date1904: false,
    }
    worksheet.getCell(`D${startRowIndex + dataRowIndex}`).style =
        cell_bold_left_style
    worksheet.getCell(`E${startRowIndex + dataRowIndex}`).style =
        cell_bold_left_style
    worksheet.getCell(`E${startRowIndex + dataRowIndex}`).value = {
        formula: `SUM(E${startRowIndex}:E${startRowIndex + data.data.length})`,
        date1904: false,
    }

    const buffer = await workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        saveAs(blob, `Итоговый-отчет(${dayjs(new Date()).format("MM-DD-YYYY")}).xlsx`)
    })

    return buffer

    // const file: IFile = {
    //   originalname: String('ИТОГ'),
    //   size: String(buffer?.length),
    //   buffer,
    //   mimetype: String(DocumentMimeTypes?.XLSX),
    //   fieldname: String('ИТОГ'),
    //   encoding: '',
    // };

    // // return buffer;

    // const uploadFile: any = await this.fileRouterService.uploadReport(file);

    // return uploadFile;
}

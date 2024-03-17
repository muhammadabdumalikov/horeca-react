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
    tableCellTextRight: {
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

    tableCellTextRightColorRed: {
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
        font: {
            size: 12,
            color: {
                argb: 'FF0000',
            },
        },
    },
}

export const generateExcel = async (success, fileName) => {
    const workbook = new ExcelJS.Workbook()

    workbook.addWorksheet('table_1', {
        pageSetup: {
            fitToWidth: 1,
            orientation: 'landscape',
        },
    })
    let startRowIndex = 1
    let worksheet = workbook.getWorksheet(1)

    let data = success

  
    const cell_center_bold = XLSTableStyles.tableCellTextCenterAndBold

    worksheet.getColumn(1).width = 35
    worksheet.getColumn(2).width = 25
    worksheet.getColumn(3).width = 60
    worksheet.getColumn(4).width = 60
    worksheet.getColumn(5).width = 15

    for (let i = 0; i < data.length; i++) {
        const data_raw = data[i]

        worksheet.getCell(`A${startRowIndex + i}`).style = cell_center_bold
        worksheet.getCell(`A${startRowIndex + i}`).value = data_raw.id
        worksheet.getCell(`B${startRowIndex + i}`).style = cell_center_bold
        worksheet.getCell(`B${startRowIndex + i}`).value = data_raw.barcode
        worksheet.getCell(`C${startRowIndex + i}`).style = cell_center_bold
        worksheet.getCell(`C${startRowIndex + i}`).value = data_raw.name_uz
        worksheet.getCell(`D${startRowIndex + i}`).style = cell_center_bold
        worksheet.getCell(`D${startRowIndex + i}`).value = data_raw.name_ru
        worksheet.getCell(`E${startRowIndex + i}`).style = cell_center_bold
        worksheet.getCell(`E${startRowIndex + i}`).value =
            data_raw.product_count
    }

    const buffer = await workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        
        saveAs(blob, fileName)
    })

    return buffer
}

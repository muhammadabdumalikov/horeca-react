import dayjs from 'dayjs'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

export const DocumentMimeTypes = {
    DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    PPTX: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    PDF: 'application/pdf',
}

export const  OrderPaymentHistoryTypes = {
    DEBT: 1,
    PAYMENT: 2,
    ROLLBACK: 3
  }
  
  export const OrderPaymentHistoryTypesStr = {
    1: 'Заказ',
    2: 'Оплаты от контрагентов',
    3: 'Возврат по заказу' 
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
          argb: 'FF0000'
        }
      },
    },
  };

export  const generateExcel = async (success) => {

    const workbook = new ExcelJS.Workbook();
    workbook.addWorksheet('table_1', {
      pageSetup: {
        fitToWidth: 1,
        orientation: 'landscape',
      },
    });
    let startRowIndex = 7;
    let worksheet = workbook.getWorksheet(1);

    let data = success

    const cell_right_color_red_style = XLSTableStyles.tableCellTextRightColorRed;
    const cell_right_style = XLSTableStyles.tableCellTextRight;
    const cell_center_bold = XLSTableStyles.tableCellTextCenterAndBold;
    const cell_style = XLSTableStyles.tableCellTextCenter;

    worksheet.getColumn(1).width = 25;
    worksheet.getColumn(2).width = 5;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(4).width = 20;
    worksheet.getColumn(5).width = 20;
    worksheet.getColumn(6).width = 5;
    worksheet.getColumn(7).width = 25;

    worksheet.getRow(1).height = 15;

    worksheet.getCell('A1').style = cell_center_bold;
    worksheet.mergeCells('A1:F1');
    worksheet.getCell('A1').value = `Акт сверки между "HORECA TRADE GROUP" и "${data[0]?.user_name}"`

    worksheet.getCell('A2').style = cell_center_bold;
    worksheet.mergeCells('A2:C2');
    worksheet.getCell('A2').value = 'Время отчета:';

    worksheet.getCell('D2').style = cell_center_bold;
    worksheet.mergeCells('D2:F2');
    worksheet.getCell('D2').value = dayjs(new Date()).format("YYYY-MM-DD");

    worksheet.getCell('A3').style = cell_center_bold;
    worksheet.mergeCells('A3:C3');
    worksheet.getCell('A3').value = 'Начало периода:';

    worksheet.getCell('D3').style = cell_center_bold;
    worksheet.mergeCells('D3:F3');
    worksheet.getCell('D3').value = '2024-03-01';

    worksheet.getCell('A4').style = cell_center_bold;
    worksheet.mergeCells('A4:C4');
    worksheet.getCell('A4').value = 'Конец периода:';

    worksheet.getCell('D4').style = cell_center_bold;
    worksheet.mergeCells('D4:F4');
    worksheet.getCell('D4').value = '2024-03-10';

    worksheet.getCell('A5').style = cell_center_bold;
    worksheet.mergeCells('A5:B5');
    worksheet.getCell('A5').value = 'Дата';

    worksheet.getCell('C5').style = cell_center_bold;
    worksheet.mergeCells('C5:D5');
    worksheet.getCell('C5').value = 'Наименование';

    worksheet.getCell('E5').style = cell_center_bold;
    worksheet.mergeCells('E5:F5');
    worksheet.getCell('E5').value = 'Сумма';

    worksheet.getCell('G5').style = cell_center_bold;
    worksheet.getCell('G5').value = 'Баланс';

    worksheet.getCell('A6').style = cell_center_bold;
    worksheet.mergeCells('A6:F6');
    worksheet.getCell('A6').value = 'Баланс';

    worksheet.getCell('G6').style = data[0]?.balance < 0 ? cell_right_color_red_style : cell_right_style;
    worksheet.getCell('G6').value = data[0]?.balance;

    let monthly_balance = 0;
    for (let i = 0; i < data.length; i++) {
      const history_raw = data[i];
      const isDebt = history_raw.type === OrderPaymentHistoryTypes.DEBT;

      worksheet.getCell(`A${startRowIndex + i}`).style = cell_style;
      worksheet.mergeCells(`A${startRowIndex + i}:B${startRowIndex + i}`);
      worksheet.getCell(`A${startRowIndex + i}`).value = dayjs(history_raw.created_at).format("YYYY-MM-DD");

      worksheet.getCell(`C${startRowIndex + i}`).style = cell_style;
      worksheet.mergeCells(`C${startRowIndex + i}:D${startRowIndex + i}`);
      worksheet.getCell(`C${startRowIndex + i}`).value = OrderPaymentHistoryTypesStr[history_raw.type];

      worksheet.getCell(`E${startRowIndex + i}`).style = isDebt
        ? cell_right_color_red_style
        : cell_right_style;
      worksheet.mergeCells(`E${startRowIndex + i}:F${startRowIndex + i}`);
      worksheet.getCell(`E${startRowIndex + i}`).value = Number(`${isDebt ? '-' : ''}${history_raw.value}`);

      if (isDebt) {
        monthly_balance -= history_raw.value
      } else {
        monthly_balance += history_raw.value
      }
      worksheet.getCell(`G${startRowIndex + i}`).style = monthly_balance < 0 ? cell_right_color_red_style : cell_right_style;
      worksheet.getCell(`G${startRowIndex + i}`).value = Number(monthly_balance);
    }

    const buffer = await workbook.xlsx.writeBuffer().then(buffer => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'example.xlsx');
          });


    const file = {
        originalname: String('Akt sverka hisobot'),
        size: String(buffer?.length),
        buffer,
        mimetype: String(DocumentMimeTypes?.XLSX),
        fieldname: String('Akt sverka hisobot'),
        encoding: '',
    }

    const uploadFile = await this.fileRouterService.uploadReport(file)

    return uploadFile

}
import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
import {
    setDeleteMode,
    setSelectedRow,
    setSelectedRows,
} from '../store/stateSlice'
import { deleteOrders, getCustomers, getFaktura } from '../store/dataSlice'
import dayjs from 'dayjs'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

const OrderDeleteConfirmation = () => {
    const generateExcel = async () => {
        const workbook = new ExcelJS.Workbook()
        workbook.addWorksheet('table_1', {
            pageSetup: {
                fitToWidth: 1,
                orientation: 'landscape',
            },
        })
        let startRowIndex = 1
        let worksheet = workbook.getWorksheet(1)

        let data = await this.reportService.getFakturaReport({
            from_date: '2024-01-01',
            to_date: '2024-03-05',
        })

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
            ).value = `Дата заказа: ${order_raw.created_at}`

            worksheet.getCell(`G${startRowIndex + i}`).style = cell_style
            worksheet.mergeCells(`G${startRowIndex + i}:H${startRowIndex + i}`)
            worksheet.getCell(
                `G${startRowIndex + i}`
            ).value = `Контрагент: ${order_raw.client_name}`

            worksheet.getCell(`I${startRowIndex + i}`).style = cell_style
            worksheet.mergeCells(`I${startRowIndex + i}:K${startRowIndex + i}`)
            worksheet.getCell(
                `I${startRowIndex + i}`
            ).value = `Дата заказа: ${order_raw.created_at}`

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
            ).value = `Агент: ${order_raw.registrator_first_name} ${order_raw.registrator_last_name}`

            worksheet.getCell(`C${startRowIndex + i + 2}`).style = cell_style
            worksheet.mergeCells(
                `C${startRowIndex + i + 2}:E${startRowIndex + i + 2}`
            )
            worksheet.getCell(
                `C${startRowIndex + i + 2}`
            ).value = `Тел. контр.: ${order_raw.client_phone}`

            worksheet.getCell(`G${startRowIndex + i + 2}`).style = cell_style
            worksheet.mergeCells(
                `G${startRowIndex + i + 2}:H${startRowIndex + i + 2}`
            )
            worksheet.getCell(
                `G${startRowIndex + i + 2}`
            ).value = `Агент: ${order_raw.registrator_first_name} ${order_raw.registrator_last_name}`

            worksheet.getCell(`I${startRowIndex + i + 2}`).style = cell_style
            worksheet.mergeCells(
                `I${startRowIndex + i + 2}:K${startRowIndex + i + 2}`
            )
            worksheet.getCell(
                `I${startRowIndex + i + 2}`
            ).value = `Тел. агента.: ${order_raw.registrator_phone}`

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
            ).value = `Тел. агента: ${order_raw.registrator_phone}`

            worksheet.getCell(`G${startRowIndex + i + 3}`).style = cell_style
            worksheet.mergeCells(
                `G${startRowIndex + i + 3}:H${startRowIndex + i + 3}`
            )
            worksheet.getCell(
                `G${startRowIndex + i + 3}`
            ).value = `Доставщик: ${order_raw.deliver_user_json?.first_name} ${order_raw.deliver_user_json?.last_name}`

            worksheet.getCell(`I${startRowIndex + i + 3}`).style = cell_style
            worksheet.mergeCells(
                `I${startRowIndex + i + 3}:K${startRowIndex + i + 3}`
            )
            worksheet.getCell(
                `I${startRowIndex + i + 3}`
            ).value = `Тел. достав.: ${order_raw.deliver_user_json?.phone}`

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
            ).value = `Итого по инвойсу: 00 шт ${order_raw.total_sum}`

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

        const buffer = await workbook.xlsx.writeBuffer()

        const file = {
            originalname: String('Faktura hisobot'),
            size: String(buffer?.length),
            buffer,
            mimetype: String(DocumentMimeTypes?.XLSX),
            fieldname: String('Faktura hisobot'),
            encoding: '',
        }

        const uploadFile = await this.fileRouterService.uploadReport(file)

        return uploadFile

        // Save workbook
        // workbook.xlsx.writeBuffer().then(buffer => {
        //     const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        //     saveAs(blob, 'example.xlsx');
        //   });
    }

    const dispatch = useDispatch()
    const selectedRows = useSelector(
        (state) => state.fakturaStore.state.selectedRows
    )
    const selectedRow = useSelector(
        (state) => state.fakturaStore.state.selectedRow
    )
    const deleteMode = useSelector(
        (state) => state.fakturaStore.state.deleteMode
    )
    const tableData = useSelector((state) => state.fakturaStore.data.tableData)

    const startDate = useSelector((state) => state.fakturaStore.state.startDate)
    const endDate = useSelector((state) => state.fakturaStore.state.endDate)

    const onDialogClose = () => {
        dispatch(setDeleteMode(''))

        if (deleteMode === 'single') {
            dispatch(setSelectedRow([]))
        }
    }

    // console.log(dayjs(startDate), endDate)

    const onDelete = async () => {
        dispatch(setDeleteMode(''))

        if (deleteMode === 'single') {
            const success = await getFaktura({
                user_ids: selectedRow,
                from_date: dayjs(startDate).format('YYYY-MM-DD'),
                to_date: dayjs(endDate).format('YYYY-MM-DD'),
            })
            deleteSucceed(success)
            dispatch(setSelectedRow([]))
        }

        if (deleteMode === 'batch') {
            const success = await getFaktura({
                user_ids: selectedRows,
                from_date: dayjs(startDate).format('YYYY-MM-DD'),
                to_date: dayjs(endDate).format('YYYY-MM-DD'),
            })
            deleteSucceed(success, selectedRows.length)
            dispatch(setSelectedRows([]))
        }
    }

    const deleteSucceed = (success, orders) => {
        if (success) {
            dispatch(getCustomers(tableData))
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    {deleteMode === 'single' && 'Order '}
                    {deleteMode === 'batch' && `${orders} orders `}
                    successfuly deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    // onClick={generateExcel}
    return (
        <ConfirmDialog
            isOpen={deleteMode === 'single' || deleteMode === 'batch'}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            type="info"
            title="Фактура"
            onCancel={onDialogClose}
            onConfirm={generateExcel}
            confirmButtonColor="blue-600"
            confirmText="Получить фактуру"
        >
            <p>
                Are you sure you want to delete this order? All record related
                to this order will be deleted as well. This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default OrderDeleteConfirmation

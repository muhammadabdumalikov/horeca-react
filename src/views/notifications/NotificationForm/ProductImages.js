import React, { useState } from 'react'
import {
    AdaptableCard,
    ConfirmDialog,
    DoubleSidedImage,
} from 'components/shared'
import { FormItem, Dialog, Upload, toast, Notification } from 'components/ui'
import { HiEye, HiTrash } from 'react-icons/hi'
import { Field } from 'formik'
import cloneDeep from 'lodash/cloneDeep'
import { PERSIST_STORE_NAME } from 'constants/app.constant'
import deepParseJson from 'utils/deepParseJson'
import axios from 'axios'

const ImageList = (props) => {
    const { image, onImageDelete } = props

    const [selectedImg, setSelectedImg] = useState({})
    const [viewOpen, setViewOpen] = useState(false)
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const onViewOpen = (img) => {
        setSelectedImg(img)
        setViewOpen(true)
    }

    const onDialogClose = () => {
        setViewOpen(false)
        setTimeout(() => {
            setSelectedImg({})
        }, 300)
    }

    const onDeleteConfirmation = (img) => {
        setSelectedImg(img)
        setDeleteConfirmationOpen(true)
    }

    const onDeleteConfirmationClose = () => {
        setSelectedImg({})
        setDeleteConfirmationOpen(false)
    }

    const onDelete = () => {
        onImageDelete?.(selectedImg)
        setDeleteConfirmationOpen(false)
    }

    return (
        <>
            <div className="group relative rounded border p-2 flex" key={image}>
                <img
                    className="rounded max-h-[140px] max-w-full"
                    src={image}
                    alt={image}
                />
                <div className="absolute inset-2 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center">
                    <span
                        onClick={() => onViewOpen(image)}
                        className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                    >
                        <HiEye />
                    </span>
                    <span
                        onClick={() => onDeleteConfirmation(image)}
                        className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                    >
                        <HiTrash />
                    </span>
                </div>
            </div>
            <Dialog
                isOpen={viewOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">{selectedImg.name}</h5>
                <img
                    className="w-full"
                    src={selectedImg}
                    alt={selectedImg.name}
                />
            </Dialog>
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                onClose={onDeleteConfirmationClose}
                onRequestClose={onDeleteConfirmationClose}
                type="danger"
                title="Удалить изображение"
                onCancel={onDeleteConfirmationClose}
                onConfirm={onDelete}
                confirmButtonColor="red-600"
            >
                <p> Вы уверены, что хотите удалить это изображение? </p>
            </ConfirmDialog>
        </>
    )
}

const ProductImages = (props) => {
    const { values } = props

    const beforeUpload = (file) => {
        let valid = true

        const allowedFileType = ['image/jpeg', 'image/png']
        const maxFileSize = 1000000

        for (let f of file) {
            if (!allowedFileType.includes(f.type)) {
                valid = 'Please upload a .jpeg or .png file!'
            }

            if (f.size >= maxFileSize) {
                valid = 'Upload image cannot more then 1MB!'
            }
        }

        return valid
    }

    const onUpload = async (form, field, files) => {

        const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
        const persistData = deepParseJson(rawPersistData)

        let accessToken = persistData.auth.session.token
        // setSubmitting(true)

        try {
            const formData = new FormData()
            formData.append('file', files[0])

            const response = await axios.post(
                'http://194.163.142.231:3000/file-router/upload',
                formData,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        token: accessToken,
                    },
                }
            )

            form.setFieldValue(field.name, response?.data.file_url)

            if (response.status === 201) {
                toast.push(
                    <Notification
                        title={'Успешно добавлено'}
                        type="success"
                        duration={2500}
                    >
                        Файл успешно добавлен
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
            }

            // setSubmitting(false)
        } catch (error) {
            if (error.response.status === 449) {
                toast.push(
                    <Notification
                        title={'Ошибка'}
                        type="danger"
                        duration={2500}
                    >
                        Пожалуйста, заполните все поля
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
            }
            // setSubmitting(false)
        }

        

    }

    const handleImageDelete = (form, field) => {
        let imgList = cloneDeep(values.image)
        imgList = ''
        form.setFieldValue(field.name, imgList)
    }

    return (
        <AdaptableCard className="mb-4">
            <h5>Изображение продукта *</h5>
            <p className="mb-6">Добавьте или измените изображение товара</p>
            <FormItem
            >
                <Field name="image">
                    {({ field, form }) => {
                        if (values.image?.length > 0) {
                            return (
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                    <ImageList
                                        image={values.image}
                                        onImageDelete={(img) =>
                                            handleImageDelete(form, field, img)
                                        }
                                    />
                                </div>
                            )
                        }

                        return (

                            <Upload
                                beforeUpload={beforeUpload}
                                onChange={(files) =>
                                    onUpload(form, field, files)
                                }
                                showList={false}
                                draggable
                            >
                                <div className="my-16 text-center">
                                    <DoubleSidedImage
                                        className="mx-auto"
                                        src="/img/others/upload.png"
                                        darkModeSrc="/img/others/upload-dark.png"
                                    />
                                    <p className="font-semibold">
                                        <span className="text-gray-800 dark:text-white">
                                            Перетащите сюда свое изображение или{' '}
                                        </span>
                                        <span className="text-blue-500">
                                            просматривать
                                        </span>
                                    </p>
                                    <p className="mt-1 opacity-60 dark:text-white">
                                        Поддержка: JPEG, PNG
                                    </p>
                                </div>
                            </Upload>
                        )
                    }}
                </Field>
            </FormItem>
        </AdaptableCard>
    )
}

export default ProductImages

import { Button, Steps } from 'components/ui'
import { useEffect, useState } from 'react'
import {
    HiOutlineLogin,
    HiOutlineDocumentSearch,
    HiOutlineClipboardCheck,
} from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { setStep } from '../store/dataSlice'

const OrdersStep = () => {

    const dispatch = useDispatch()

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const step = useSelector((state) => state.xordersStore.data.step)

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const onChange = (nextStep) => {
        if (nextStep < 0) {
            dispatch(setStep(0))
        } else if (nextStep > 3) {
            dispatch(setStep(3))
        } else {
            dispatch(setStep(nextStep))
        }
    }

    const onNext = () => onChange(step + 1)

    const onPrevious = () => onChange(step - 1)

    return (
        <>
            <Steps vertical={windowWidth < 600} current={step}>
                <Steps.Item title="Принял" customIcon={<HiOutlineLogin />} />
                <Steps.Item title="Доставка" customIcon={<HiOutlineLogin />} />
                {/* <Spinner /> */}
                {/* <Steps.Item
                    title="Отменено"
                    customIcon={<HiOutlineDocumentSearch />}
                /> */}
                <Steps.Item
                    title={step === 4 ? 'Отменено' : 'Доставленный'}
                    customIcon={
                        step === 4 ? (
                            <HiOutlineDocumentSearch />
                        ) : (
                            <HiOutlineClipboardCheck />
                        )
                    }
                />
            </Steps>

            <div className="mt-4 text-right">
                <Button
                    className="mx-2"
                    disabled={step === 1}
                    onClick={onPrevious}
                >
                    Назад
                </Button>
                <Button disabled={step === 3} variant="solid" onClick={onNext}>
                    {step === 3 ? 'Завершено' : 'Далее'}
                </Button>
            </div>
        </>
    )
}

export default OrdersStep

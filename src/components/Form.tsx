import { useFieldArray, useForm } from "react-hook-form"
import { useContext, useEffect, useState } from "react"
import Functions from "../utils/Functions"
import type { TInvoice } from "../types"
import { MainContext } from "../layouts/Layout"
import Billfrom from "./Form/Billfrom"
import BilltoPartTop from "./Form/BilltoPartTop"
import BilltoPartBottom from "./Form/BilltoPartBottom"
import Items from "./Form/Items"
import FormButtonsBar from "./Form/FormButtonsBar"

export default function Form() {
    const [selected, setSelected] = useState(30)
    const { showForm, editForm, invoice } = useContext(MainContext)

    const {
        register,
        watch,
        control,
        reset,
        setValue,
        clearErrors,
        getValues,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<TInvoice>({
        defaultValues: {
            id: `${Math.floor(Math.random() * 1000000)}`,
            createdAt: "",
            paymentDue: "",
            description: "",
            paymentTerms: 30,
            clientName: "",
            clientEmail: "",
            status: "",
            senderAddress: {
                street: "",
                city: "",
                postCode: "",
                country: ""
            },
            clientAddress: {
                street: "",
                city: "",
                postCode: "",
                country: ""
            },
            items: [],
            total: 0
        }
    }
    )

    useEffect(() => {
        if (editForm && invoice) {
            reset({
                id: invoice.id,
                createdAt: invoice.createdAt,
                paymentDue: invoice.paymentDue,
                description: invoice.description,
                paymentTerms: Number(invoice.paymentTerms),
                clientName: invoice.clientName,
                clientEmail: invoice.clientEmail,
                status: invoice.status,
                senderAddress: {
                    street: invoice.senderAddress.street,
                    city: invoice.senderAddress.city,
                    postCode: invoice.senderAddress.postCode,
                    country: invoice.senderAddress.country
                },
                clientAddress: {
                    street: invoice.clientAddress.street,
                    city: invoice.clientAddress.city,
                    postCode: invoice.clientAddress.postCode,
                    country: invoice.clientAddress.country
                },
                items: invoice.items,
                total: invoice.total
            })
            setSelected(Number(invoice.paymentTerms))
        }
    }, [editForm, invoice, reset])


    const {
        addDays,
    } = Functions()

    const { fields, append } = useFieldArray({
        name: "items",
        control
    })

    const body = document.querySelector("body")

    if (showForm) {
        body?.style.setProperty("overflow", "hidden")
    } else {
        body?.style.setProperty("overflow", "auto")
    }

    useEffect(() => {
        setValue("id", `${Math.floor(Math.random() * 1000000)}`)
    }, [])

    useEffect(() => {
        const createdAt = watch("createdAt")
        if (createdAt && selected) {
            const dueDate = addDays(createdAt, selected)
            setValue("paymentDue", dueDate)
        }
    }, [watch("createdAt"), selected])

    return (
        <form onSubmit={(e) => e.preventDefault()} action="">

            <Billfrom register={register} errors={errors} />

            <div className="mt-[50px] gap-[24px] flex flex-col">

                <BilltoPartTop register={register} errors={errors} />

                <BilltoPartBottom register={register} errors={errors} setSelected={setSelected} setValue={setValue} watch={watch} selected={selected} />

                <Items fields={fields} append={append} errors={errors} watch={watch} getValues={getValues} setValue={setValue}/>

                <FormButtonsBar reset={reset} watch={watch} setError={setError} setValue={setValue} handleSubmit={handleSubmit} clearErrors={clearErrors} getValues={getValues} />
            </div>


        </form>)
}
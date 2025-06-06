import { useFieldArray, useForm } from "react-hook-form"
import tailwind from "../shared/tailwind"
import { useContext, useEffect, useState } from "react"
import Functions from "../utils/Functions"
import type { TInvoice } from "../types"
import { MainContext } from "../layouts/Layout"

export default function Form() {
    const [selected, setSelected] = useState(30)
    const [showPaymentTerms, setShowPaymentTerms] = useState(false)
    const { showForm, setShowForm, editForm, setEditForm, invoice } = useContext(MainContext)

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
        handleNameChange,
        deleteItem,
        handleQuantityChange,
        handlePriceChange,
        save,
        addDays,
        handleSaveChanges,
    } = Functions({ watch, reset, setValue, getValues, setError })

    const { labelInput, P2, H4, inputStyle, errorMessageStyle } = tailwind()

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
            <div className="flex flex-col gap-[24px] mt-[50px]">
                <h4 className={`${H4} text-[#7C5DFA]`}>Bill From</h4>
                <div className={labelInput}>
                    <label className={`${P2} text-[#7E88C3] flex justify-between ${errors.senderAddress?.street ? "text-[#EC5757]" : undefined}`} htmlFor="FAddress">Street Address{errors.senderAddress?.street && (<p className={`${errorMessageStyle}`}>can’t be empty</p>)}</label>
                    <input type="text" id="FAddress" {...register("senderAddress.street", { required: "can’t be empty" })} className={`${inputStyle} ${errors.senderAddress?.street ? "border-[#EC5757]!" : undefined}`} />
                </div>

                <div className="flex justify-between">
                    <div className={`${labelInput} w-[30%]`}>
                        <label className={`${P2} text-[#7E88C3] flex justify-between ${errors.senderAddress?.city ? "text-[#EC5757]" : undefined}`} htmlFor="FCity">City{errors.senderAddress?.city && (<p className={`${errorMessageStyle}`}>can’t be empty</p>)}</label>
                        <input type="text" id="FCity" {...register("senderAddress.city", { required: "can’t be empty" })} className={`${inputStyle} ${errors.senderAddress?.city ? "border-[#EC5757]!" : undefined}`} />
                    </div>
                    <div className={`${labelInput} w-[30%]`}>
                        <label className={`${P2} text-[#7E88C3] flex justify-between ${errors.senderAddress?.postCode ? "text-[#EC5757]" : undefined}`} htmlFor="FPostCode">Post Code{errors.senderAddress?.postCode && (<p className={`${errorMessageStyle}`}>can’t be empty</p>)}</label>
                        <input type="text" id="FPostCode" {...register("senderAddress.postCode", { required: "can’t be empty" })} className={`${inputStyle} ${errors.senderAddress?.postCode ? "border-[#EC5757]!" : undefined}`} />
                    </div>
                    <div className={`${labelInput} w-[30%]`}>
                        <label className={`${P2} text-[#7E88C3] flex justify-between ${errors.senderAddress?.country ? "text-[#EC5757]" : undefined}`} htmlFor="FCountry">Country{errors.senderAddress?.country && (<p className={`${errorMessageStyle}`}>can’t be empty</p>)}</label>
                        <input type="text" id="FCountry" {...register("senderAddress.country", { required: "can’t be empty" })} className={`${inputStyle} ${errors.senderAddress?.country ? "border-[#EC5757]!" : undefined}`} />
                    </div>
                </div>
            </div>

            <div className="mt-[50px] gap-[24px] flex flex-col">
                <h4 className={`${H4} text-[#7C5DFA]`}>Bill To</h4>

                <div className={labelInput}>
                    <label className={`${P2} text-[#7E88C3] flex justify-between ${errors.clientName ? "text-[#EC5757]" : undefined}`} htmlFor="name">Client’s Name{errors.clientName && (<p className={`${errorMessageStyle}`}>can’t be empty</p>)}</label>
                    <input type="text" id="name" {...register("clientName", { required: "can’t be empty" })} className={`${inputStyle} ${errors.clientName ? "border-[#EC5757]!" : undefined}`} />
                </div>

                <div className={labelInput}>
                    <label className={`${P2} text-[#7E88C3] flex justify-between ${errors.clientEmail ? "text-[#EC5757]" : undefined}`} htmlFor="email">Client’s Email {errors.clientEmail && (<p className={`${errorMessageStyle}`}>can’t be empty</p>)}</label>
                    <input type="text" id="email" {...register("clientEmail", { required: "can’t be empty" })} className={`${inputStyle} ${errors.clientEmail ? "border-[#EC5757]!" : undefined}`} />
                </div>

                <div className={labelInput}>
                    <label className={`${P2} text-[#7E88C3] flex justify-between ${errors.clientAddress?.street ? "text-[#EC5757]" : undefined}`} htmlFor="TAddress">Street Address{errors.clientAddress?.street && (<p className={`${errorMessageStyle}`}>can’t be empty</p>)}</label>
                    <input type="text" id="TAddress" {...register("clientAddress.street", { required: "can’t be empty" })} className={`${inputStyle} ${errors.clientAddress?.street ? "border-[#EC5757]!" : undefined}`} />
                </div>

                <div className="flex justify-between">
                    <div className={`${labelInput} w-[30%]`}>
                        <label className={`${P2} text-[#7E88C3] flex justify-between ${errors.clientAddress?.city ? "text-[#EC5757]" : undefined}`} htmlFor="TCity">City{errors.clientAddress?.city && (<p className={`${errorMessageStyle}`}>can’t be empty</p>)}</label>
                        <input type="text" id="TCity" {...register("clientAddress.city", { required: "can’t be empty" })} className={`${inputStyle} ${errors.clientAddress?.city ? "border-[#EC5757]!" : undefined}`} />
                    </div>
                    <div className={`${labelInput} w-[30%]`}>
                        <label className={`${P2} text-[#7E88C3] flex justify-between ${errors.clientAddress?.postCode ? "text-[#EC5757]" : undefined}`} htmlFor="TPostCode">Post Code{errors.clientAddress?.postCode && (<p className={`${errorMessageStyle}`}>can’t be empty</p>)}</label>
                        <input type="text" id="TPostCode" {...register("clientAddress.postCode", { required: "can’t be empty" })} className={`${inputStyle} ${errors.clientAddress?.postCode ? "border-[#EC5757]!" : undefined}`} />
                    </div>
                    <div className={`${labelInput} w-[30%]`}>
                        <label className={`${P2} text-[#7E88C3] flex justify-between ${errors.clientAddress?.country ? "text-[#EC5757]" : undefined}`} htmlFor="TCountry">Country{errors.clientAddress?.country && (<p className={`${errorMessageStyle}`}>can’t be empty</p>)}</label>
                        <input type="text" id="TCountry" {...register("clientAddress.country", { required: "can’t be empty" })} className={`${inputStyle} ${errors.clientAddress?.country ? "border-[#EC5757]!" : undefined}`} />
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="w-[48%]">
                        <label className={`${P2} text-[#7E88C3] flex justify-between ${errors.createdAt ? "text-[#EC5757]" : undefined}`} htmlFor="TInvoiceDate">Invoice Date{errors.createdAt && (<p className={`${errorMessageStyle}`}>can’t be empty</p>)}</label>
                        <input type="date" id="TInvoiceDate" {...register("createdAt", { required: "can’t be empty" })} className={`${inputStyle} ${errors.createdAt ? "border-[#EC5757]!" : undefined}`} />
                    </div>
                    <div className="w-[48%]">
                        <label className={`${P2} text-[#7E88C3]`} htmlFor="TPaymentTerms">Payment Terms</label>
                        <div className="relative">
                            <button onClick={() => setShowPaymentTerms(!showPaymentTerms)} className={`${inputStyle} flex outline-none justify-between items-center`}>
                                <h4 className={`${H4}`}>Net {selected} Days</h4>
                                <svg className={`${showPaymentTerms ? "rotate-[180deg]" : undefined} transition-[1s]`} width="11" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd" /></svg>
                            </button>
                            <div className={`${showPaymentTerms ? "flex" : "hidden"} absolute w-[242px] left-[0] top-[60px] rounded-[8px] shadow-[0_10px_20px_0_rgba(72,84,159,0.25)]  flex-col bg-[#FFFFFF]`}>
                                <button onClick={() => {
                                    setSelected(1)
                                    setValue("paymentTerms", 1)
                                    setShowPaymentTerms(false)
                                    setValue("paymentDue", addDays(watch("createdAt"), 1))
                                }} className={`p-[16px_24px_16px_24px] hover:text-[#7C5DFA] flex items-start outline-none w-[100%] border-b-[1px] border-solid border-[#DFE3FA] ${H4}`}>
                                    Net 1 Day
                                </button>
                                <button onClick={() => {
                                    setSelected(7)
                                    setValue("paymentTerms", 7)
                                    setShowPaymentTerms(false)
                                    setValue("paymentDue", addDays(watch("createdAt"), 7))
                                }} className={`p-[16px_24px_16px_24px] hover:text-[#7C5DFA] w-[100%] flex items-start outline-none border-b-[1px] border-solid border-[#DFE3FA] ${H4}`}>
                                    Net 7 Days
                                </button>
                                <button onClick={() => {
                                    setSelected(14)
                                    setValue("paymentTerms", 14)
                                    setShowPaymentTerms(false)
                                    setValue("paymentDue", addDays(watch("createdAt"), 14))
                                }} className={`p-[16px_24px_16px_24px] hover:text-[#7C5DFA] flex items-start outline-none w-[100%] border-b-[1px] border-solid border-[#DFE3FA] ${H4}`}>
                                    Net 14 Days
                                </button>
                                <button onClick={() => {
                                    setSelected(30)
                                    setValue("paymentTerms", 30)
                                    setShowPaymentTerms(false)
                                    setValue("paymentDue", addDays(watch("createdAt"), 30))
                                }} className={`p-[16px_24px_16px_24px] hover:text-[#7C5DFA] flex items-start outline-none w-[100%] ${H4}`}>
                                    Net 30 Days
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${labelInput} `}>
                    <label className={`${P2} text-[#7E88C3] flex justify-between ${errors.description ? "text-[#EC5757]" : undefined}`} htmlFor="TProjectDescription">Project Description{errors.description && (<p className={`${errorMessageStyle}`}>can’t be empty</p>)}</label>
                    <input type="text" id="TProjectDescription" {...register("description", { required: "can’t be empty" })} className={`${inputStyle} ${errors.description ? "border-[#EC5757]!" : undefined}`} />
                </div>

                <h3 className="text-[1.8rem] leading-[32px] tracking-[-0.38px] font-[700] text-[#777F98]">Item List</h3>

                <div className="w-[100%] flex flex-col">
                    <div className="w-[100%] flex justify-between">
                        <h5 className={`${P2} text-[#7E88C3]`}>Item Name</h5>
                        <div className="flex ml-[28px] gap-[40px]">
                            <h5 className={`${P2} text-[#7E88C3]`}>Qty.</h5>
                            <h5 className={`${P2} text-[#7E88C3]`}>Price</h5>
                        </div>
                        <h5 className={`${P2} text-[#7E88C3] mr-[35px]!`}>Total</h5>
                    </div>
                    <div className="mt-[20px] flex flex-col gap-[16px] mb-[20px]">
                        {fields.map((e, index) => {
                            return <div key={e.id} className="flex items-center justify-between">
                                <div className="flex gap-[12px] w-[90%]">
                                    <input
                                        onChange={handleNameChange(index)}
                                        defaultValue={editForm ? e.name : ""}
                                        className={`${inputStyle} w-[45%]!`} type="text" name="" id="" />
                                    <input type="text" onChange={handleQuantityChange(index)}
                                        defaultValue={editForm ? e.quantity : ""}
                                        className={`${inputStyle} w-[15%]!`} name="" id="" />
                                    <input type="text"
                                        onChange={handlePriceChange(index)}
                                        defaultValue={editForm ? e.total : ""}
                                        className={`${inputStyle} w-[28%]!`} name="" id="" />
                                </div>
                                <div className=" w-[15%]! flex items-center gap-[20px]">
                                    <h5 className={`${P2} text-[#888EB0] font-[700]`}>
                                        {watch(`items.${index}.total`).toFixed(2)}
                                    </h5>
                                    <div className=" w-[25%]! flex items-center gap-[20px]">
                                        <svg onClick={() => deleteItem(index)} width="13" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z" className="hover:fill-[#E65957]" fill="#888EB0" fillRule="nonzero" /></svg>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                    <button className={`w-[100%] h-[48px] outline-none rounded-[24px] bg-[#F9FAFE] ${P2} text-[#7E88C3] font-[700] cursor-pointer`} onClick={() => append({
                        name: "",
                        quantity: 0,
                        price: 0,
                        total: 0
                    })}>+ Add New Item</button>
                </div>
                <div>
                    {errors.items && <p className={`${errorMessageStyle}`}>{errors.items.message}</p>}
                </div>
            </div>

            <div className={`fixed bottom-0 ${showForm ? "left-0" : "left-[-620px]"} w-[620px] h-[100px] transition-all duration-1000 ease-in-out bg-[#FFFFFF] shadow-[-15px_0_50px_rgba(0,0,0,0.1)] flex items-center p-[0_50px_0_150px]`}>
                {editForm ? <div className="flex justify-end gap-[10px] w-[100%]">
                    <button className={`w-[96px] h-[48px] outline-none rounded-[24px] bg-[#F9FAFE] ${P2} text-[#7E88C3] font-[700] cursor-pointer`} onClick={() => {
                        setShowForm(false)
                        setTimeout(() => {
                            setEditForm(false)
                            reset()
                        }, 400)
                    }}>Cancel</button>
                    <button className={`w-[138px] h-[48px] rounded-[24px] bg-[#7C5DFA] ${H4} text-[#FFFFFF]! outline-none cursor-pointer`} onClick={() => {
                        if (watch()?.items.length === 0) {
                            setError("items", {
                                type: "manual",
                                message: "- An item must be added",
                            })
                            return
                        }

                        if (!watch().items.every((e) => e.name && e.quantity && e.price)) {
                            setError("items", {
                                type: "manual",
                                message: "- All items must be filled",
                            })
                            return
                        }
                        setValue("status", "pending")
                        clearErrors("items")
                        handleSubmit(handleSaveChanges)()
                    }}>Save Changes</button>
                </div> : <div className="flex justify-between w-[100%]">
                    <button className={`w-[96px] h-[48px] outline-none rounded-[24px] bg-[#F9FAFE] ${P2} text-[#7E88C3] font-[700] cursor-pointer`} onClick={() => {
                        reset()
                        setShowForm(false)
                    }}>Discard</button>
                    <div className="w-[100%] gap-[8px] flex justify-end">
                        <button onClick={() => {
                            setValue("status", "draft")
                            save(getValues())
                        }} className={`w-[133px] outline-none h-[48px] rounded-[24px] bg-[#373B53] ${H4} text-[#888EB0]! cursor-pointer`}>Save as Draft</button>
                        <button className={`w-[128px] h-[48px] rounded-[24px] bg-[#7C5DFA] ${H4} text-[#FFFFFF]! outline-none cursor-pointer`} onClick={() => {
                            if (watch()?.items.length === 0) {
                                setError("items", {
                                    type: "manual",
                                    message: "- An item must be added",
                                })
                                return
                            }

                            if (!watch().items.every((e) => e.name && e.quantity && e.price)) {
                                setError("items", {
                                    type: "manual",
                                    message: "- All items must be filled",
                                })
                                return
                            }
                            clearErrors("items")
                            setValue("status", "pending")
                            handleSubmit(save)()
                        }}>Save & Send</button>
                    </div>
                </div>}

            </div>
        </form>)
}

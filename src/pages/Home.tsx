import AsideBar from "../components/AsideBar";
import data from "../../data.json"
import tailwind from "../shared/tailwind";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";


export default function Home() {

    const { H1, P2, H4, H3, H2, inputStyle, labelInput } = tailwind()

    const [show, setShow] = useState(false)

    const formatDate = (dateString: string) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const date = new Date(dateString)
        const day = date.getDate()
        const month = months[date.getMonth()]
        const year = date.getFullYear()
        return `Due ${day} ${month} ${year}`
    }

    // const date = new Date().toISOString().slice(0, 10)

    function addDays(dateString: string, daysToAdd: number) {
        const date = new Date(dateString)
        date.setDate(date.getDate() + daysToAdd)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")
        return `${year}-${month}-${day}`
    }

    const {
        register,
        watch,
        getValues,
        control,
        reset,
        setValue
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

    const { fields, append } = useFieldArray({
        control,
        name: "items"
    })



    const [invoices, setInvoices] = useState<TInvoice[]>([])

    useEffect(() => {
        const storedData = localStorage.getItem("1")

        if (storedData) {
            setInvoices(JSON.parse(storedData))
        } else {
            localStorage.setItem("1", JSON.stringify(data))
            setInvoices(data)
        }
    }, [])

    const [selected, setSelected] = useState(30)
    const [showForm, setShowForm] = useState(false)
    const [showPaymentTerms, setShowPaymentTerms] = useState(false)

    const body = document.querySelector("body")

    if (showForm) {
        body?.style.setProperty("overflow", "hidden")
    } else {
        body?.style.setProperty("overflow", "auto")
    }

    const handlePriceChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const price = e.target.value === '' ? 0 : parseInt(e.target.value, 10)
        const quantity = getValues(`items.${index}.quantity`) || 0
        setValue(`items.${index}.price`, price)
        setValue(`items.${index}.total`, price * quantity)
    }

    const handleQuantityChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const quantity = e.target.value === '' ? 0 : parseInt(e.target.value, 10)
        const price = getValues(`items.${index}.price`) || 0
        setValue(`items.${index}.quantity`, quantity)
        setValue(`items.${index}.total`, quantity * price)
    }


    const handleNameChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setValue(`items.${index}.name`, value)
    }

    const save = (e: TInvoice) => {
        let totalCount = 0
        for (let i = 0; i < e.items.length; i++) {
            totalCount += e.items[i].total || 0
        }

        const invoiceData = {
            ...e,
            total: totalCount
        }

        const prevData = localStorage.getItem("1")
        if (prevData) {
            const parsedPrevData = JSON.parse(prevData)
            parsedPrevData.push(invoiceData)
            const updatedDataStringed = JSON.stringify(parsedPrevData)
            localStorage.setItem("1", updatedDataStringed)
        }

        reset()
        setShowForm(false)
        setInvoices(prev => [...prev, invoiceData])
    }


    return (
        <div className="flex">
            <div className={`${!showForm ? "bg-[rgba(0,0,0,0)] z-[-1]" : undefined} fixed top transition-bg duration-1000 left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.2)]`}></div>
            <AsideBar />
            <div className="relative">
                <form onSubmit={(e) => e.preventDefault()} className={`p-[48px_48px_360px_150px] ${showForm ? "left-0!" : undefined} transition-left duration-1000 overflow-y-auto ease-in-out z-5 bg-[#FFFFFF] left-[-620px] absolute h-[100%] min-h-[100vh]`} action="">
                    <div className="w-[504px]">
                        <h2 className={`${H2}`}>New Invoice</h2>
                    </div>

                    <div className="flex flex-col gap-[24px] mt-[50px]">

                        <h4 className={`${H4} text-[#7C5DFA]`}>Bill From</h4>
                        <div className={labelInput}>
                            <label className={`${P2} text-[#7E88C3]`} htmlFor="FAddress">Street Address</label>
                            <input type="text" id="FAddress" {...register("senderAddress.street")} className={`${inputStyle}`} />
                        </div>

                        <div className="flex justify-between">
                            <div className={`${labelInput} w-[30%]`}>
                                <label className={`${P2} text-[#7E88C3]`} htmlFor="FCity">City</label>
                                <input type="text" id="FCity" {...register("senderAddress.city")} className={`${inputStyle}`} />
                            </div>
                            <div className={`${labelInput} w-[30%]`}>
                                <label className={`${P2} text-[#7E88C3]`} htmlFor="FPostCode">Post Code</label>
                                <input type="text" id="FPostCode" {...register("senderAddress.postCode")} className={`${inputStyle}`} />
                            </div>
                            <div className={`${labelInput} w-[30%]`}>
                                <label className={`${P2} text-[#7E88C3]`} htmlFor="FCountry">Country</label>
                                <input type="text" id="FCountry" {...register("senderAddress.country")} className={`${inputStyle}`} />
                            </div>
                        </div>
                    </div>


                    <div className="mt-[50px] gap-[24px] flex flex-col">
                        <h4 className={`${H4} text-[#7C5DFA]`}>Bill To</h4>

                        <div className={labelInput}>
                            <label className={`${P2} text-[#7E88C3]`} htmlFor="name">Client’s Name</label>
                            <input type="text" id="name" {...register("clientName")} className={`${inputStyle}`} />
                        </div>

                        <div className={labelInput}>
                            <label className={`${P2} text-[#7E88C3]`} htmlFor="email">Client’s Email</label>
                            <input type="text" id="email" {...register("clientEmail")} className={`${inputStyle}`} />
                        </div>

                        <div className={labelInput}>
                            <label className={`${P2} text-[#7E88C3]`} htmlFor="TAddress">Street Address</label>
                            <input type="text" id="TAddress" {...register("clientAddress.street")} className={`${inputStyle}`} />
                        </div>

                        <div className="flex justify-between">
                            <div className={`${labelInput} w-[30%]`}>
                                <label className={`${P2} text-[#7E88C3]`} htmlFor="TCity">City</label>
                                <input type="text" id="TCity" {...register("clientAddress.city")} className={`${inputStyle}`} />
                            </div>
                            <div className={`${labelInput} w-[30%]`}>
                                <label className={`${P2} text-[#7E88C3]`} htmlFor="TPostCode">Post Code</label>
                                <input type="text" id="TPostCode" {...register("clientAddress.postCode")} className={`${inputStyle}`} />
                            </div>
                            <div className={`${labelInput} w-[30%]`}>
                                <label className={`${P2} text-[#7E88C3]`} htmlFor="TCountry">Country</label>
                                <input type="text" id="TCountry" {...register("clientAddress.country")} className={`${inputStyle}`} />
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div className="w-[48%]">
                                <label className={`${P2} text-[#7E88C3]`} htmlFor="TInvoiceDate">Invoice Date</label>
                                <input type="date" id="TInvoiceDate" {...register("createdAt")} className={`${inputStyle}`} />
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

                        <div className={`${labelInput}`}>
                            <label className={`${P2} text-[#7E88C3]`} htmlFor="TProjectDescription">Project Description</label>
                            <input type="text" id="TProjectDescription" {...register("description")} className={`${inputStyle}`} />
                        </div>

                        <h3 className="text-[1.8rem] leading-[32px] tracking-[-0.38px] font-[700] text-[#777F98]">Item List</h3>

                        <div className="w-[100%] flex flex-col">
                            <div className="w-[100%] flex justify-between">
                                <h5 className={`${P2} text-[#7E88C3]`}>Item Name</h5>
                                <div className="flex gap-[50px]">
                                    <h5 className={`${P2} text-[#7E88C3]`}>Qty.</h5>
                                    <h5 className={`${P2} text-[#7E88C3]`}>Price</h5>
                                </div>
                                <h5 className={`${P2} text-[#7E88C3]`}>Total</h5>
                            </div>
                            <div className="mt-[20px] flex flex-col gap-[16px] mb-[20px]">
                                {fields.map((e, index) => {
                                    return <div key={e.id} className="flex items-center justify-between">
                                        <div className="flex gap-[24px] w-[90%]">
                                            <input
                                                onChange={handleNameChange(index)}
                                                className={`${inputStyle} w-[42%]!`} type="text" name="" id="" />
                                            <input type="text" onChange={handleQuantityChange(index)}
                                                className={`${inputStyle} w-[10%]!`} name="" id="" />
                                            <input type="text"
                                                onChange={handlePriceChange(index)}
                                                className={`${inputStyle} w-[20%]!`} name="" id="" />
                                        </div>
                                        <div className="w-[10%]! ">
                                            <h5 className={`${P2} text-[#888EB0]`}>
                                                {watch(`items.${index}.total`).toFixed(2)}
                                            </h5>
                                        </div>
                                    </div>
                                })}
                            </div>
                            <button className={`w-[100%] h-[48px] outline-none rounded-[24px] bg-[#F9FAFE] ${P2} text-[#7E88C3] font-[700] cursor-pointer`} onClick={() => append({
                                name: "",
                                quantity: 1,
                                price: 0,
                                total: 0
                            })}>+ Add New Item</button>
                        </div>

                    </div>
                    <div className={`${showForm ? "left-[0]" : undefined} w-[717px] shadow-[-15px_0_50px_0_rgba(0,0,0,0.1)] left-[-717px] transition-left duration-1000 overflow-y-auto ease-in-out fixed bottom-0 bg-[#FFFFFF] flex items-center p-[0_50px_0_150px] h-[100px]`}>
                        <div className="flex justify-between w-[100%]">
                            <button className={`w-[96px] h-[48px] outline-none rounded-[24px] bg-[#F9FAFE] ${P2} text-[#7E88C3] font-[700] cursor-pointer`} onClick={() => {
                                reset()
                                setShowForm(false)
                            }}>Discard</button>
                            <div className="w-[100%] gap-[8px] flex justify-end">
                                <button onClick={() => {
                                    setValue("status", "draft")
                                    save(watch())
                                }} className={`w-[133px] outline-none h-[48px] rounded-[24px] bg-[#373B53] ${H4} text-[#888EB0]! cursor-pointer`}>Save as Draft</button>
                                <button className={`w-[128px] h-[48px] rounded-[24px] bg-[#7C5DFA] ${H4} text-[#FFFFFF]! outline-none cursor-pointer`} onClick={() => {
                                    setValue("status", "pending")
                                    save(watch())
                                }}>Save & Send</button>
                            </div>
                        </div>
                    </div>

                </form>
            </div >
            <div className="w-[100%]! flex justify-center ml-[103px]">
                <div className="w-[730px]!">
                    <header className="flex justify-between items-center mt-[24px]">
                        <div>
                            <h1 className={`${H1}`}>Invoices</h1>
                            <h5 className={`${P2} text-[#888EB0]`}>There are {data.length} total invoices</h5>
                        </div>
                        <div className="flex items-center gap-[32px]">
                            <div className="relative">
                                <button onClick={() => setShow(!show)} className="cursor-pointer flex items-center gap-[10px]">
                                    <h4 className={`${H4}`}>Filter by status</h4>
                                    <svg className={`${show ? "rotate-[180deg]" : undefined} transition-[1s]`} width="11" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd" /></svg>
                                </button>
                                <div className={`${show ? "flex" : "hidden"} absolute w-[192px] left-[-40%] top-[36px] p-[24px] rounded-[8px] flex-col gap-[16px] bg-[#FFFFFF]`}>
                                    <label htmlFor="draft" className={`flex items-center gap-[13px] ${H4}`}>
                                        <input type="checkbox" id="draft" className="peer hidden" />
                                        <div className="w-[16px] h-[16px] rounded-[2px] bg-[#DFE3FA] peer-checked:bg-[#7C5DFA] hover:border-[1px] border-solid border-[#7C5DFA] peer-checked:bg-[url('/images/icon-check.svg')] bg-no-repeat bg-center"></div>
                                        Draft
                                    </label>
                                    <label htmlFor="pending" className={`flex items-center gap-[13px] ${H4}`}>
                                        <input type="checkbox" id="pending" className="peer hidden" />
                                        <div className="w-[16px] h-[16px] rounded-[2px] bg-[#DFE3FA] peer-checked:bg-[#7C5DFA] hover:border-[1px] border-solid border-[#7C5DFA] peer-checked:bg-[url('/images/icon-check.svg')] bg-no-repeat bg-center"></div>
                                        Pending
                                    </label>
                                    <label htmlFor="paid" className={`flex items-center gap-[13px] ${H4}`}>
                                        <input type="checkbox" id="paid" className="peer hidden" />
                                        <div className="w-[16px] h-[16px] rounded-[2px] bg-[#DFE3FA] peer-checked:bg-[#7C5DFA] hover:border-[1px] border-solid border-[#7C5DFA] peer-checked:bg-[url('/images/icon-check.svg')] bg-no-repeat bg-center"></div>
                                        Paid
                                    </label>
                                </div>
                            </div>
                            <button onClick={() => setShowForm(true)} className={`w-[150px] flex items-center gap-[12px] text-[#FFFFFF]! p-[8px] h-[48px] rounded-[24px] bg-[#7C5DFA] ${H4}`}>
                                <div className="w-[32px] h-[32px] rounded-full bg-[#FFFFFF] flex items-center justify-center">
                                    <img src="/images/icon-plus.svg" alt="" />
                                </div>
                                New Invoice
                            </button>
                        </div>
                    </header>
                    <div className="flex flex-col gap-[16px] m-[50px_0_50px_0]">
                        {invoices.map((e, index) => {
                            return <div key={index} className="w-[100%] p-[0_24px_0_32px] items-center h-[72px] bg-[#FFFFFF] flex justify-between rounded-[8px]">
                                <div className="flex gap-[32px]">
                                    <h4 className={`${H4}`}><span className={`${H4} text-[#7E88C3]!`}>#</span>{e.id}</h4>
                                    <h5 className={`${P2} text-[#7E88C3]!`}>{formatDate(e.paymentDue)}</h5>
                                    <h5 className={`${P2} text-[#7E88C3]!`}>{e.clientName}</h5>
                                </div>
                                <div className="flex gap-[32px] items-center">
                                    <h3 className={`${H3}`}>£{e.total.toFixed(2)}</h3>
                                    <div className="flex items-center gap-[16px]">
                                        <div className={`${H4} ${e.status.toLowerCase() === "paid" ? "text-[#33D69F]! bg-[rgba(51,214,159,0.2)]" : e.status.toLowerCase() === "pending" ? "text-[#FF8F00]! bg-[rgba(255,143,0,0.2)]" : "text-[#373B53]! bg-[rgba(55,59,83,0.2)]"}  rounded-[6px] w-[104px] h-[40px] flex items-center justify-center gap-[8px]`}> <span className={`w-[8px] h-[8px] mb-[3px]! ${e.status.toLowerCase() === "paid" ? "bg-[#33D69F]" : e.status.toLowerCase() === "pending" ? "bg-[#FF8F00]" : "bg-[#373B53]"} rounded-full`}></span>{e.status[0].toUpperCase()}{e.status.slice(1)}</div>
                                        <img src="/images/icon-arrow-right.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div >
    )
}

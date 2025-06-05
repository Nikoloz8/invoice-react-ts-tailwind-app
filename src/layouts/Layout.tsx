import { createContext, useState } from "react"
import { Outlet } from "react-router-dom"
import type { TInvoice, TMainContext } from "../types"


export const MainContext = createContext<TMainContext>({
    toggle: false,
    setToggle: () => { },
    showForm: false,
    setShowForm: () => { },
    setInvoice: () => { },
    invoice: {
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
    },
    setInvoices: () => { },
    invoices: [],
    editForm: false,
    setEditForm: () => { }
})



export default function Layout() {
    const [showForm, setShowForm] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [invoice, setInvoice] = useState<TInvoice>()
    const [invoices, setInvoices] = useState<TInvoice[]>([])
    const [editForm, setEditForm] = useState(false)

    return (
        <MainContext.Provider value={{ toggle, editForm, setEditForm, setToggle, invoices, setInvoices, showForm, setShowForm, invoice, setInvoice }}>
            <div className="bg-[#F8F8FB] w-[100%] min-h-[100vh] h-[100%]">
                <Outlet />
            </div>
        </MainContext.Provider>

    )

}

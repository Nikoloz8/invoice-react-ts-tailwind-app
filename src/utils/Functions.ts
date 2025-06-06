import { useNavigate } from "react-router-dom"
import type { TFunctionsArgs, TInvoice } from "../types"
import { useContext } from "react"
import { MainContext } from "../layouts/Layout"

export default function Functions(args: TFunctionsArgs = {}) {

    const { watch, getValues, setValue, reset, allInvoices, setAllInvoices } = args

    const { setInvoices, setInvoice, setShowForm, invoice } = useContext(MainContext)

    const markAsPaid = () => {
        if (!invoice) return
        const updatedInvoice = { ...invoice, status: "paid" }
        const updatedInvoices = (allInvoices ?? []).map(item =>
            item.id === invoice.id ? updatedInvoice : item
        )
        localStorage.setItem("1", JSON.stringify(updatedInvoices))

        if (setInvoice && setAllInvoices) {
            setInvoice(updatedInvoice)
            setAllInvoices(updatedInvoices)
        }
    }

    function filterInvoices(invoices: TInvoice[], filters: {
        draft: boolean
        pending: boolean
        paid: boolean
    }) {
        if (!filters.draft && !filters.pending && !filters.paid) {
            return invoices
        }

        return invoices.filter(invoice => {
            const status = invoice.status.toLowerCase()
            return (
                (filters.draft && status === "draft") ||
                (filters.pending && status === "pending") ||
                (filters.paid && status === "paid")
            )
        })
    }

    const formatDate = (dateString: string) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const date = new Date(dateString)
        const day = date.getDate()
        const month = months[date.getMonth()]
        const year = date.getFullYear()
        return `Due ${day} ${month} ${year}`
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
        setValue(`items.${index}.name`, e.target.value)
    }

    const deleteItem = (index: number) => {
        const filtered = watch("items").filter((_e: TInvoice, i: number) => i !== index)
        setValue("items", filtered)
    }

    const save = (invoice: TInvoice) => {

        let totalCount = 0
        for (let i = 0; i < invoice.items.length; i++) {
            totalCount += invoice.items[i].total || 0
        }

        const invoiceData = { ...invoice, total: totalCount }

        const prevData = localStorage.getItem("1")
        if (prevData) {
            const parsed = JSON.parse(prevData)
            parsed.push(invoiceData)
            localStorage.setItem("1", JSON.stringify(parsed))
        } else {
            localStorage.setItem("1", JSON.stringify([invoiceData]))
        }

        reset()
        setShowForm(false)
        setInvoices(prev => [...prev, invoiceData])
    }

    const handleSaveChanges = (editedInvoice: TInvoice) => {

        setInvoice(editedInvoice)

        let totalCount = 0
        if (editedInvoice) {
            for (let i = 0; i < editedInvoice.items.length; i++) {
                totalCount += editedInvoice.items[i].total || 0
            }
        }

        const editedInvoiceData = { ...editedInvoice, total: totalCount }
        const prevData = localStorage.getItem("1")

        if (prevData) {
            const parsed = JSON.parse(prevData)
            const filtered = parsed.filter((e: TInvoice) => e.id !== watch().id)
            filtered.push(editedInvoiceData)
            localStorage.setItem("1", JSON.stringify(filtered))
            setInvoices(filtered)
        } else return

        reset()
        setShowForm(false)
    }



    const navigate = useNavigate()

    const deleteInvoice = () => {
        if (!invoice) return
        const invoices = localStorage.getItem("1")
        if (invoices) {
            const parsedInvoices = JSON.parse(invoices)
            const filteredInvoices = parsedInvoices?.filter((e: TInvoice) => e.id !== invoice.id)
            const stringifiedFilteredInvoices = JSON.stringify(filteredInvoices)
            localStorage.setItem("1", stringifiedFilteredInvoices)
            navigate("/")
        }
    }

    function addDays(dateString: string, daysToAdd: number) {
        const date = new Date(dateString)
        date.setDate(date.getDate() + daysToAdd)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")
        return `${year}-${month}-${day}`
    }


    return {
        filterInvoices,
        formatDate,
        handleNameChange,
        deleteItem,
        handleQuantityChange,
        handlePriceChange,
        save, markAsPaid,
        deleteInvoice,
        addDays,
        handleSaveChanges
    }
}

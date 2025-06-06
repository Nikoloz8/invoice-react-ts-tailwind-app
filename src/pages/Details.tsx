import { useParams } from "react-router-dom"
import AsideBar from "../components/AsideBar";
import { useContext, useEffect, useState } from "react";
import type { TInvoice } from "../types";
import ConfirmDeletion from "../components/Details/ConfirmDeletion";
import ButtonsBar from "../components/Details/ButtonsBar";
import CalculationResults from "../components/Details/CalculationResults";
import InvoiceDeliverInfo from "../components/Details/InvoiceDeliverInfo";
import BackButton from "../components/Details/BackButton";
import { MainContext } from "../layouts/Layout";
import FormContainer from "../components/Home/FormContainer";

export default function Details() {


    const { detailsid } = useParams()
    const [allInvoices, setAllInvoices] = useState<TInvoice[]>([])

    const { setInvoice } = useContext(MainContext)

    
    useEffect(() => {
        const stringedData = localStorage.getItem("1")
        if (stringedData) {
            const parsedData = JSON.parse(stringedData)
            setAllInvoices(parsedData)
            const foundInvoice = parsedData.find((e: TInvoice) => e.id === detailsid)
            setInvoice(foundInvoice)
        }
    }, [detailsid])


    const body = document.querySelector("body")
    const [confirmDeletion, setConfirmDeletion] = useState(false)

    if (confirmDeletion) {
        body?.style.setProperty("overflow", "hidden")
    } else {
        body?.style.setProperty("overflow", "auto")
    }

    return (
        <div>
            <ConfirmDeletion confirmDeletion={confirmDeletion} setConfirmDeletion={setConfirmDeletion} />
            <AsideBar />
            <div className="w-[100%]! ml-[60px] pb-[50px] pt-[50px] flex justify-center">
                <div className="w-[730px]!">

                    <BackButton />

                    <ButtonsBar setConfirmDeletion={setConfirmDeletion} allInvoices={allInvoices} setAllInvoices={setAllInvoices} />

                    <FormContainer />

                    <div className="w-[100%] bg-[#FFFFFF] rounded-[8px] p-[48px] mt-[20px] flex shadow-[0_10px_10px_-10px_rgba(72,84,159,0.1)] flex-col">

                        <InvoiceDeliverInfo allInvoices={allInvoices} setAllInvoices={setAllInvoices} />

                        <CalculationResults />

                    </div>
                </div>
            </div>
        </div>

    )
}

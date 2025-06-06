import AsideBar from "../components/AsideBar";
import data from "../../data.json"
import { useContext, useEffect, useState } from "react";
import Header from "../components/Home/Header";
import { MainContext } from "../layouts/Layout";
import RenderInvoices from "../components/Home/RenderInvoices";
import FormContainer from "../components/Home/FormContainer";

export default function Home() {

    const { setInvoices } = useContext(MainContext)
    const [filters, setFilters] = useState({
        draft: false,
        pending: false,
        paid: false
    })

    useEffect(() => {
        const storedData = localStorage.getItem("1")
        if (storedData) {
            setInvoices(JSON.parse(storedData))
        } else {
            localStorage.setItem("1", JSON.stringify(data))
            setInvoices(data)
        }
    }, [])

    return (
        <div className="flex">
            <AsideBar />
            <div className="w-[100%]! ml-[103px] max-lg:m-0 flex justify-center">

                <div className="w-[730px]! max-md:w-[672px]! max-sm:w-[327px]!">

                    <Header filters={filters} setFilters={setFilters} />
                    <FormContainer />
                    <RenderInvoices filters={filters} />

                </div>
            </div>
        </div >
    )
}

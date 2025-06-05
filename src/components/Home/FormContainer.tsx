import { useContext } from "react"
import { MainContext } from "../../layouts/Layout"
import Form from "../Form"
import tailwind from "../../shared/tailwind"

export default function FormContainer() {

    const { invoice, editForm } = useContext(MainContext)
    const { showForm } = useContext(MainContext)
    const { H2 } = tailwind()

    return (
        <div className="relative">
            <div className={`${!showForm ? "bg-[rgba(0,0,0,0)] z-[-1]" : undefined} fixed top transition-bg duration-1000 left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.2)]`}></div>
            <div className={`fixed top-0 bottom-0 ${showForm ? "left-0" : "left-[-620px]"} w-[620px] transition-all duration-1000 ease-in-out z-[5] bg-white overflow-y-auto p-[48px_48px_120px_150px]`}>
                <h2 className={`${H2}`}>Edit <span className="text-[#888EB0]">#</span>{editForm ? `${invoice?.id}` : "New Invoice"}</h2>
                <Form />
            </div>
        </div >)
}

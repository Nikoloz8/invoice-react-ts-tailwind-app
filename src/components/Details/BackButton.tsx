import { useNavigate } from "react-router-dom"
import tailwind from "../../shared/tailwind"
import { useContext } from "react"
import { MainContext } from "../../layouts/Layout"
// import Functions from "../../utils/Functions"

export default function BackButton() {

    const { H4 } = tailwind()
    const navigate = useNavigate()
    const { setEditForm } = useContext(MainContext)
    // const { handleReset } = Functions()

    return (
        <div onClick={() => {
            navigate("/")
            setEditForm(false)
            // handleReset()
        }} className="flex items-center gap-[16px] cursor-pointer">
            <img src="/images/icon-arrow-left.svg" alt="" />
            <h4 className={`${H4} text-[#7E88C3]`}>Go Back</h4>
        </div>)
}

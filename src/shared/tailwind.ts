import { useContext } from "react"
import { MainContext } from "../layouts/Layout"

export default function tailwind() {

    const { toggle } = useContext(MainContext)

    const H1 = "text-[3.6rem] font-[700] tracking-[-1.13px] text-[#0C0E16]"
    const H2 = "text-[2.4rem] font-[700] tracking-[-0.75px] text-[#0C0E16]"
    const H3 = `text-[1.5rem] font-[700] leading-[24px] tracking-[-0.25px] text-[#0C0E16] ${toggle ? "text-[#FFFFFF]" : undefined}`
    const H4 = `text-[1.5rem] font-[700] leading-[15px] tracking-[-0.25px] text-[#0C0E16] ${toggle ? "text-[#FFFFFF]" : undefined}`
    const P1 = "text-[1.3rem] font-[500] leading-[18px] tracking-[-0.1px] text-[#0C0E16]"
    const P2 = `text-[1.3rem] font-[500] leading-[15px] tracking-[-0.1px] text-[#7E88C3] ${toggle ? "text-[#DFE3FA]" : undefined}`
    const inputStyle = `w-[100%] focus:border-[#7C5DFA] h-[48px] p-[16px] outline-none border-[1px] border-solid border-[#DFE3FA] rounded-[4px] ${H4} ${toggle ? "bg-[#1E2139] border-[#252945]!" : undefined}`
    const labelInput = `flex flex-col gap-[9px]`
    const filterButtonStyle = `bg-no-repeat bg-center w-[16px] h-[16px] rounded-[2px] bg-[#DFE3FA] peer-checked:bg-[#7C5DFA] hover:border-[1px] border-solid border-[#7C5DFA] ${toggle ? "bg-[#1E2139]! peer-checked:bg-[#7C5DFA]!" : undefined}`
    const errorMessageStyle = "text-[#EC5757] font-[600] text-[1rem] leading-[15px] tracking-[-0.21px]"

    return { H1, H2, H3, H4, P1, P2, inputStyle, labelInput, filterButtonStyle, errorMessageStyle }

}


export default function tailwind() {
    const H1 = "text-[3.6rem] font-[700] tracking-[-1.13px] text-[#0C0E16]"
    const H2 = "text-[2.4rem] font-[700] tracking-[-0.75px] text-[#0C0E16]"
    const H3 = "text-[1.5rem] font-[700] leading-[24px] tracking-[-0.25px] text-[#0C0E16]"
    const H4 = "text-[1.5rem] font-[700] leading-[15px] tracking-[-0.25px] text-[#0C0E16]"
    const P1 = "text-[1.3rem] font-[500] leading-[18px] tracking-[-0.1px] text-[#0C0E16]"
    const P2 = "text-[1.3rem] font-[500] leading-[15px] tracking-[-0.1px] text-[#0C0E16]"
    const inputStyle = `w-[100%] h-[48px] p-[16px] outline-none border-[1px] border-solid border-[#DFE3FA] rounded-[4px] ${H4}`
    const labelInput = "flex flex-col gap-[9px]"

    return { H1, H2, H3, H4, P1, P2, inputStyle, labelInput }

}

import { useContext } from "react"
import { MainContext } from "../layouts/Layout"


export default function AsideBar() {


    const { toggle, setToggle } = useContext(MainContext)

    return (
        <div className={`w-[103px] z-10 flex min-h-[100vh] max-lg:min-h-0 max-lg:h-[80px]! max-lg:w-[100%] fixed  justify-between min-lg:flex-col rounded-[0_20px_20px_0] max-lg:rounded-[0]! bg-[#373B53] ${toggle? "bg-[#1E2139]! max-lg:flex-row" : undefined}`}>
            <div className={`bg-[#7C5DFA] max-lg:h-[80px]! max-lg:rounded-[0_20px_20px_0]! relative w-[100%] max-lg:w-[80px] h-[103px] rounded-[0_20px_0_0]! flex items-end`}>
                <img src="/images/logo.svg" className="absolute w-[40px] max-lg:right-[20px] max-lg:top-[20px] right-[31.5px] top-[31.5px]" alt="" />
                <div className={`h-[50%] w-[100%] bg-[#9277FF] rounded-tl-[20px] max-lg:rounded-br-[20px]`}>
                </div>
            </div>
            <div className="flex items-center max-lg:flex-row flex-col gap-[32px]">
                <img src={`${toggle ? "/images/icon-sun.svg" : "/images/icon-moon.svg"}`} className="cursor-pointer" onClick={() => setToggle(!toggle)} alt="" />
                <div className="w-[100%] h-[90px] max-lg:border-l-[1px]! max-lg:border-t-0 max-lg:h-[100%] max-lg:w-[100px] border-t-[1px] bprder-solid border-[#494E6E] items-center justify-center flex">
                    <img className="rounded-[100%] w-[40px]" src="/images/image-avatar.jpg" alt="" />
                </div>
            </div>
        </div>
    )
}

import { useContext } from "react"
import { MainContext } from "../layouts/Layout"


export default function AsideBar() {


    const { toggle, setToggle } = useContext(MainContext)

    return (
        <div className={`w-[103px] z-10 flex min-h-[100vh] fixed  justify-between flex-col rounded-[0_20px_20px_0] bg-[#373B53]`}>
            <div className={`bg-[#7C5DFA] relative w-[100%] h-[103px] rounded-[0_20px_20px_0] flex items-end`}>
                <img src="/images/logo.svg" className="absolute w-[40px] right-[31.5px] top-[31.5px]" alt="" />
                <div className={`h-[50%] w-[100%] bg-[#9277FF] rounded-tl-[20px]`}>
                </div>
            </div>
            <div className="flex items-center flex-col gap-[32px]">
                <img src={`${toggle ? "/images/icon-sun.svg" : "/images/icon-moon.svg"}`} className="cursor-pointer" onClick={() => setToggle(!toggle)} alt="" />
                <div className="w-[100%] h-[90px] border-t-[1px] bprder-solid border-[#494E6E] items-center justify-center flex">
                    <img className="rounded-[100%] w-[40px]" src="/images/image-avatar.jpg" alt="" />
                </div>
            </div>
        </div>
    )
}

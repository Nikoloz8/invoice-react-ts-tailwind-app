import { createContext, useState } from "react"
import { Outlet } from "react-router-dom"


export const MainContext = createContext<TMainContext>({
    toggle: false,
    setToggle: () => { }
})

export default function Layout() {
    const [toggle, setToggle] = useState(false)

    return (
        <MainContext.Provider value={{ toggle, setToggle }}>
            <div className="bg-[#F8F8FB] w-[100%] min-h-[100vh] h-[100%]">
                <Outlet />
            </div>
        </MainContext.Provider>

    )
}

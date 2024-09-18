import { useState } from "react"


const useOpenSearch = () => {
    const [openSearch, setOpenSearch] = useState(false)
    const toggleSearch = () => {
        setOpenSearch(prev => !prev)
        console.log(`${openSearch? "Open": "close"}`);
    }

   

  return {openSearch, toggleSearch}
}

export default useOpenSearch
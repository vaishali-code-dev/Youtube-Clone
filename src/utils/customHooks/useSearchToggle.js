import React, { useEffect, useState } from 'react'

export const useSearchToggle = (ref) => {
    const [open, setOpen] = useState(true)

    useEffect(() => {

        const func = (e) => {
            if (!ref.current.contains(e.target)) {
                setOpen(false)
            }
            else setOpen(true)
        }

        let evLt = document.addEventListener("mousedown", func);

        return (() => document.removeEventListener("mousedown", evLt))
    }, [])

    return { open, setOpen: (e) => setOpen(e) }
}

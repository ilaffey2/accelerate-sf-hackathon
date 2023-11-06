'use client'
import { useStreamingQuery } from "@/lib"
import { useEffect, useMemo } from "react"

export default function Home() {
    const {querySteps, trigger, isLoading, error} = useStreamingQuery()

    console.log({querySteps})

    useEffect(() => {
        console.log("triggering")

        trigger("Who are the top contractors?")
    }, [])

    const getSteps = useMemo(() => {
        return querySteps.map((step, index) => (
            <div key={index}>
               {step.summary}
           </div>
       ))
    }, [querySteps])
    return <div>
        <button onClick={() => trigger("Who are the top contractors?")}> click me</button>
        {getSteps}
    </div>   
}
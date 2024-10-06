"use client"
import React, { useEffect, useRef, useState } from 'react'
import { PauseIcon, PlayIcon, ReloadIcon } from "@radix-ui/react-icons"

import { Box } from "@/elements/box"
import { Text } from "@/elements/text"
import { Button } from '@/components/ui/button'

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  let kochiSecond = Math.floor(time % 100)
  let seconds = Math.floor((time / 100) % 60)
  let minutes = Math.floor((time / 6000) % 60)
  let hours = Math.floor((time / 360000) % 100)
  const [state, setState] = useState<"paused" | "running" | "idle">("idle")
  const timerRef = useRef<NodeJS.Timeout | null>(null) // Use a ref to keep track of the timer ID

  useEffect(() => {
    // If the stopwatch is running, start the interval
    if (state == "running") {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1); // Increment by 10 milliseconds
      }, 10);
    }

    // Cleanup the interval when the component is unmounted or isRunning changes
    return () => clearInterval(timerRef.current!);
  }, [state]);
  

  return (
    <Box direction="vertical" className="h-screen w-full gap-8" centered>
      <Box className="w-full gap-6 px-4 py-8" direction="horizontal" centered>
        <Box centered className="h-48 w-48 rounded border">
          <Number value={hours} />
        </Box>
        <Box centered className="h-48 w-48 rounded border">
          <Number value={minutes}/>
        </Box>
        <Box centered className="h-48 w-48 rounded border">
          <Number value={seconds}/>
        </Box>
        <Box centered className="h-48 w-48 rounded border">
          <Number value={kochiSecond}/>
        </Box>
      </Box>
      <Box direction="horizontal" className="gap-6">
        <Button
          variant="outline"
          className="px-6 py-6"
          onClick={() => setState("running")}
          disabled={state == "running" || state == "paused"}
        >
          <PlayIcon className="mr-4 h-6 w-6" />
          <Text className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Start
          </Text>
        </Button>
        <Button
          variant="outline"
          className="px-6 py-6"
          onClick={() => setState("running")}
          disabled={state == "idle" || state == "running"}
        >
          <PlayIcon className="mr-4 h-6 w-6" />
          <Text className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Resume
          </Text>
        </Button>
        <Button
          variant="outline"
          className="px-6 py-6"
          onClick={() => setState("paused")}
          disabled={state == "idle" || state == "paused"}
        >
          <PauseIcon className="mr-4 h-6 w-6" />
          <Text className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Pause
          </Text>
        </Button>
        <Button
          variant="outline"
          className="px-6 py-6"
          disabled={state == "idle"}
          onClick={() => {
            setTime(0)
            setState("idle")
          }}
        >
          <ReloadIcon className="mr-4 h-6 w-6" />
          <Text className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Restart
          </Text>
        </Button>
      </Box>
    </Box>
  )
}

function Number({ value}:{value: number}) {
  return <span className="text-8xl">{value}</span>
}

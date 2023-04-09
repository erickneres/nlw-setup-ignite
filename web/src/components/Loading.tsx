import { CircleNotch } from "phosphor-react";

interface LoadingProps {
  size?: number,
}

export function Loading({ size = 20 }: LoadingProps) {
  return (
    <CircleNotch size={size} weight="bold" className="animate-spin"/>
  )
}
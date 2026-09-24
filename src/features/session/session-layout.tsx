import { Outlet } from "react-router"

export function SessionLayout() {
  return <>
    <p>Session layout</p>
    <Outlet />
  </>
}

export const Component = SessionLayout

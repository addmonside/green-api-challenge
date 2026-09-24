import { Outlet } from "react-router"

export function AuthLayout() {
  return <>
    <p>Auth layout</p>
    <Outlet />
  </>
}

export const Component = AuthLayout

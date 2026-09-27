export function ShowIf({
  condition,
  children,
  then: skeleton,
}: {
  condition: boolean
  children: React.ReactNode
  then?: React.ReactNode
}) {
  return condition ? children : (skeleton ?? null)
}

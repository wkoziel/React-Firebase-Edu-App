export type AuthMessage = {
  type: 'error' | 'warning' | 'info' | 'success'
  message: string
  title: string
}

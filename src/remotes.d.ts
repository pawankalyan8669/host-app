// TypeScript can't see code from another app, so declare the remote modules' shapes.
declare module 'remoteApp/Button' {
  import type { ComponentType } from 'react'
  const Button: ComponentType<{ label?: string }>
  export default Button
}

declare module 'remoteApp/Login' {
  import type { ComponentType } from 'react'
  const Login: ComponentType<{ onLogin?: (username: string) => void }>
  export default Login
}

declare module 'remoteApp/About' {
  import type { ComponentType } from 'react'
  const About: ComponentType<{ username?: string }>
  export default About
}

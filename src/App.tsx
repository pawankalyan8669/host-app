import { lazy, Suspense } from 'react'
import { Navigate, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router'
import './App.css'

// Both pages live in remote-app. "remoteApp" = key in vite.config remotes,
// "Login"/"About" = keys in the remote's exposes. Each is fetched only when its route is visited.
const RemoteLogin = lazy(() => import('remoteApp/Login'))
const RemoteAbout = lazy(() => import('remoteApp/About'))

// The remote pages don't know about routing, so the host connects them to its router.
function LoginRoute() {
  const navigate = useNavigate()
  return <RemoteLogin onLogin={(username) => navigate('/about', { state: { username } })} />
}

function AboutRoute() {
  const username = (useLocation().state as { username?: string } | null)?.username
  return <RemoteAbout username={username} />
}

function App() {

  return (
    <>
      <h1>Host App</h1>
      <nav style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 24 }}>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      <Suspense fallback={<p>Loading page from remote…</p>}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/about" element={<AboutRoute />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App

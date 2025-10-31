import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './screens/App.jsx'
import Authentication, {AuthenticationMode} from './screens/Authentication.jsx'
import NotFound from './screens/NotFound.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import UserProvider from './context/UserProvider.jsx'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    errorElement: <NotFound />
  },
    
    {
      path: '/signin',
      element: <Authentication authenticationMode={AuthenticationMode.Signin} />
    },{
      path: '/signup',
      element: <Authentication AuthenticationMode={AuthenticationMode.Signup} />
    },
    {
      element : <ProtectedRoute/>,
      children: [
        {
          path: '/',
          element: <App />
        }
      ]
    }
])
    



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>,
)

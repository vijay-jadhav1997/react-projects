import {createRoot} from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import CountryDetails from './components/CountryDetails'
import Home from './components/Home'
import ErrorPage from './components/ErrorPage'

const root = createRoot(document.getElementById('root'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <Home/>,
      },
      {
        path: '/:country',
        element: <CountryDetails/>
      },
    ]
  }
])

root.render(<RouterProvider router={router} />)
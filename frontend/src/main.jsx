import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router'
import {Home, Login, Sop, Hira, Details, PdfViewer, EditDocs, Delete} from './pages/index.js'
import {Provider} from 'react-redux'
import { store } from './store/store.js'
import {Protected} from './components'
import AddDoc from './pages/AddDoc.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Protected authentication={true}>
          <Home/>
        </Protected>
      }, 
      {
        path: "/login",
        element:<Protected authentication={false}><Login/></Protected> 
      }, 
      {
        path: "/sop", 
        element: <Protected authentication={true}><Sop/></Protected>
      }, 
      {
        path: "/hira",
        element: <Protected authentication={true}><Hira/></Protected>
      }, 
      {
        path: "/doc/:documentId",
        element: <Protected authentication={true}><Details/></Protected>
      }, 
      {
        path: "/add-docs",
        element: <Protected authentication={true}><AddDoc/></Protected>
      }, 
      {
        path: "/edit-docs/:documentId",
        element: <Protected authentication={true}><EditDocs/></Protected>
      }, 
      {
        path: "/delete-docs/:documentId",
        element: <Protected authentication={true}><Delete/></Protected>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
      <App />
      </RouterProvider>
    </Provider>
  </StrictMode>,
)

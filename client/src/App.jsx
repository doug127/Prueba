import { Route, Routes, BrowserRouter } from "react-router-dom"
import { IsAdmin } from "./pages/admin/login"
import { Home } from "./pages/home"
import { AdminProvider } from "./context/admin"
import { Protected } from "./protected"


function App() {

  return (

    <BrowserRouter>
        <AdminProvider>    

          <Routes>
            
            <Route path="/login" element={<IsAdmin/>}/>

            {/* rutas protegidas */}
            <Route element={<Protected/>}>
            <Route path="/" element={<Home/>}/>
            </Route>

            </Routes>
 
        </AdminProvider>
    </BrowserRouter>

  )
}

export default App

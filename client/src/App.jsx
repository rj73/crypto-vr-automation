import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './component/Dashboard'
import Layout from './component/Layout'

function App() {

  
  return (
    <>
     <Routes>
      <Route path='/' element={true? <Layout/>: <Layout/>}>
        <Route index element={<Dashboard></Dashboard>}></Route>
        <Route path='/admin/blog' element={<Dashboard></Dashboard>}></Route>
      </Route>
     </Routes>
    </>
  )
}

export default App

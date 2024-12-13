import './App.css'
import { BrowserRouter,  Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './theme-provider'


import Home from './Home'
import { Signup } from './Auth/Signup'
import { LoginPage } from './Auth/Login'
import { Toaster } from 'sonner'

import Youtube from './ContentData/Youtube'

import { NotFoundPage } from './NotFoundPage'
import React from 'react'

import { Article } from './ContentData/Article'
import Tweets from './ContentData/Tweets'
import { Notes } from './ContentData/Notes'
import { Links } from './ContentData/Links'
import { BrainViewer } from './ContentData/BrainViewer'
import Lockdata from './Auth/Lockdata'

const App:React.FC=()=> {
const PrivateRoute=({element}:{element:JSX.Element})=>{
  const isLoggedin=localStorage.getItem("token")!==null
  return isLoggedin ? element : <Navigate to="/"/>

}
const PublicRoute=({element}:{element:JSX.Element})=>{
const isLoggedin=localStorage.getItem("token")
return isLoggedin ? <Navigate to="/home"/>:element
}
  return (
  <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
   <BrowserRouter>
   <Toaster richColors/>
   <Routes>
    <Route path='/' element={<PublicRoute element={<Lockdata/>}/>}/>
    <Route path='/signup' element={<PublicRoute element={<Signup/>}/>}/>
    <Route path='/login' element={<PublicRoute element={<LoginPage/>}/>}/>
    <Route path='/home' element={<PrivateRoute element={<Home/>}/>} />
    <Route path='/tweets' element={<PrivateRoute element={<Tweets/>}/>} />
    <Route path='/youtube' element={<PrivateRoute element={<Youtube/>}/>} />
    <Route path='/article' element={<PrivateRoute element={<Article/>}/>} />
    <Route path='/notes' element={<PrivateRoute element={<Notes/>}/>} />
    <Route path='/links' element={<PrivateRoute element={<Links/>}/>} />
<Route path='/brain/:shareLink' element={<BrainViewer/>}/>
<Route path='*' element={<NotFoundPage/>}/>
     
   </Routes>
   </BrowserRouter>
  </ThemeProvider>

  )
}

export default App

import React from 'react'
import Navabr from '../../Components/Navbar/Navabr'
import BlogForm from '../../Components/BlogForm/BlogForm'

const WriteBlog = () => {
  return (
    <>
    <div className="container" style={{
        maxHeight:'100vh'
    }}>
    <div><Navabr/></div>
    <div style={{
        paddingTop:'3.5rem'
    }}><BlogForm/></div>
    </div>
    </>
    
  )
}

export default WriteBlog
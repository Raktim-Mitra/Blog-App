import React, { useContext,useEffect } from 'react'
import { BlogContext } from '../../BlogContext/BlogContextProvider'
import parse from 'html-react-parser'
import { useNavigate } from 'react-router-dom'
import Loading from '../Loader/Loader'
import "./BlogPost.css"
const BlogPost = () => {
  const navigate=useNavigate()
  const {post} =useContext(BlogContext);
  useEffect(() => {
   if(!post || !post.content) navigate("/")
  }, [post,navigate])

  if(!post || !post.content) return (
    <Loading/>
  )

  return (
    <div className="blog-post">
    <h1 className="blog-title">{post.title}</h1>
    <p className="blog-author">By {post.author}</p>
    <div className="blog-content">{parse(post.content)}</div>
  </div>
  )
}

export default BlogPost
import React, { createContext ,useState} from 'react'



export const BlogContext=createContext()
const BlogContextProvider = (props) => {
    const [post, setPost] = useState()
    const contextValue={
        post,setPost,
    }
  return (
    <BlogContext.Provider value={contextValue}>
        {props.children}
    </BlogContext.Provider>
  )
}

export default BlogContextProvider
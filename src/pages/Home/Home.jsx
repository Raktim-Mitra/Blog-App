import React, { useState ,useEffect} from "react";
import Navabr from "../../Components/Navbar/Navabr";
import { Client, Databases, Query } from "appwrite";
import BlogCard from "../../Components/BlogCard/BlogCard";
import Loading from "../../Components/Loader/Loader";

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const fetchBlogs=()=>{
        const client = new Client()
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject(import.meta.env.VITE_PROJECT_ID);
    
     
      const databases = new Databases(client);
    
      let promise = databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID,
        []
      );
    
      promise.then(
        function (response) {
          console.log(response);
          setBlogs(response.documents);
        },
        function (error) {
          console.log(error);
        }
      );
    
    }
  useEffect(() => {
      fetchBlogs();
  }, [])
  
  function extractSnippet(htmlString, maxLength = 100) {
    // Create a temporary element to use the browser's HTML parser
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;

    // Extract text content from the HTML
    const textContent = tempDiv.textContent || tempDiv.innerText || "";

    // Trim to maxLength and add ellipsis if necessary
    if (textContent.length > maxLength) {
      return textContent.substring(0, maxLength) + "...";
    }

    return textContent;
  }
  return (
    <>
      <Navabr />
      <div>
         {
        blogs.length>0?
        blogs.map((blog, index) => (
          <BlogCard
            key={index}
            blog={blog}
            metaDesc={extractSnippet(blog.content)}
          />
        )):
        <Loading/>
        }
      </div>
    </>
  );
};

export default Home;

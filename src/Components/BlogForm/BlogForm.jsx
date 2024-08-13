import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Client,ID,Databases } from 'appwrite';
import './BlogForm.css'
import { useNavigate } from 'react-router-dom';
function BlogForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const[errors,setErrors]=useState({});
  const navigate=useNavigate()
  const handleEditorChange = (content, editor) => {
    setContent(content); // Update state with TinyMCE content
  };
  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!author.trim()) newErrors.author = 'Author is required';
    if (!content.trim()) newErrors.content = 'Content is required';

    setErrors(newErrors);

    // If there are no errors, return true
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the JSON object with the form data
    if(validateForm()){
      const formData = {
      title: title
      .toLowerCase()  // Convert the entire string to lowercase
      .split(' ')     // Split the string into an array of words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalize the first letter of each word
      .join(' '),  // Join the array of words back into a single string,
      slug: title
      .toLowerCase()        // Convert to lowercase
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^a-z0-9\-]/g, '') // Remove any non-alphanumeric characters except hyphens
      .replace(/-+/g, '-')   // Replace multiple hyphens with a single hyphen
      .trim(),
      author: author,
      isPublished: true,
      content: content
    };

    console.log('Submitted JSON Data:', formData);
    const client = new Client();

    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject(import.meta.env.VITE_PROJECT_ID);
  const databases = new Databases(client);
  
  const promise = databases.createDocument(
    import.meta.env.VITE_DATABASE_ID,
    import.meta.env.VITE_COLLECTION_ID,
      ID.unique(),
      formData
      
  );
  
  promise.then(function (response) {
      console.log(response);
  }, function (error) {
      console.log(error);
  });
  navigate("/");
}
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>
      <div>
        <label>Author:</label>
        <input 
          type="text" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
        />
           {errors.author && <span className="error">{errors.author}</span>}
      </div>
      <div>
        <label>Content:</label>
        <Editor
          apiKey= {import.meta.env.VITE_API_KEY}// Optional if you're using a free API key
          initialValue="<p>Write your blog</p>"
          init={{
            height: 300,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table code help wordcount'
            ],
            toolbar: 'undo redo | formatselect | bold italic backcolor | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | removeformat | help'
          }}
          onEditorChange={handleEditorChange}
        />
          {errors.content && <span className="error">{errors.content}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default BlogForm;

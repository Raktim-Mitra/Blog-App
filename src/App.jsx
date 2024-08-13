import './App.css';
import Home from './pages/Home/Home';
import WriteBlog from './pages/WriteBlog/WriteBlog';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BlogPost from './Components/BlogCard/BlogPost';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/writeblog',
    element: <WriteBlog />,
  },
  {
    path: '/blogpost/:slug',
    element: <BlogPost />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

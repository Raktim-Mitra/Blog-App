import React,{useContext} from 'react';
import './Blogcard.css';
import { Link } from 'react-router-dom';
import { BlogContext } from '../../BlogContext/BlogContextProvider';

const BlogCard = (props) => {
  const {setPost} =useContext(BlogContext);
  const { blog, metaDesc } = props;
  const { title, author, slug } = blog;
  return (
    <div className="blog-card">
      <h2 className="blog-title">{title}</h2>
      <p className="blog-author">By {author}</p>
      <p className="blog-meta-desc">{metaDesc}</p>
      <Link onClick={
        ()=>{
          setPost(props.blog)
        }
      }to={`/blogpost/${slug}`} className="read-more-button">
        Read More
      </Link>
    </div>
  );
};

export default BlogCard;

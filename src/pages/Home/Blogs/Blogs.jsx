import Blog from "./Blog/Blog"
import "./Blogs.css"

const Blogs = ({blogs}) => {
  return (
    <>
        {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}      
    </>
  )
}

export default Blogs
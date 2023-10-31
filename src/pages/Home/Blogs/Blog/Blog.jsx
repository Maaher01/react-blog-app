import { Link } from "react-router-dom";
import "./Blog.css";

const Blog = ({ blog }) => {
	return (
		<article className="blog">
			<Link to={`blog/${blog.id}`}>
				<h2>{blog.title}</h2>
				<p className="blogDate">{blog.datetime}</p>
				<p className="blogBody">
					{blog.body.length <= 75 ? blog.body : `${blog.body.slice(0, 75)}...`}
				</p>
			</Link>
		</article>
	);
};

export default Blog;

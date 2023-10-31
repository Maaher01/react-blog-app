import { Link, useParams } from "react-router-dom";
import "./BlogDetails.css";
import api from "../../api/blogs";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../../context/DataContext";

const BlogDetails = () => {
	const { blogs, setBlogs } = useContext(DataContext);
	const navigate = useNavigate();


	const { id } = useParams();
	const blog = blogs.find((blog) => blog.id.toString() === id);

	//Delete a blog
	const handleDelete = async (id) => {
		try {
			await api.delete(`/blogs/${id}`);
			const blogList = blogs.filter((blog) => blog.id !== id);
			setBlogs(blogList);
			navigate("/");
		} catch {
			console.log(`Error: ${err.message}`);
		}
	};

	return (
		<main className="blogDetails">
			<article className="blog">
				<h2>{blog.title}</h2>
				<p className="blogDate">{blog.datetime}</p>
				<p className="blogBody">{blog.body}</p>
				<div className="buttons">
					<button className="deleteBtn" onClick={() => handleDelete(blog.id)}>
						Delete
					</button>
					<Link to={`/blog/edit/${blog.id}`}>
						<button className="editBtn">Edit</button>
					</Link>
				</div>
			</article>
		</main>
	);
};

export default BlogDetails;

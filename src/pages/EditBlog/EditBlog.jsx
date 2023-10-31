import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { format } from "date-fns";
import api from "../../api/blogs";
import DataContext from "../../context/DataContext";

const EditBlog = () => {
	const { blogs, setBlogs } = useContext(DataContext);

	const [editTitle, setEditTitle] = useState("");
	const [editBody, setEditBody] = useState("");
	const navigate = useNavigate();

	const { id } = useParams();
	const blog = blogs.find((blog) => blog.id.toString() === id);
	useEffect(() => {
		if (blog) {
			setEditTitle(blog.title);
			setEditBody(blog.body);
		}
	}, [blog, setEditTitle, setEditBody]);

	//Edit a blog
	const handleEdit = async (id) => {
		const datetime = format(new Date(), "MMMM dd, yyyy pp");
		const updatedBlog = { id, title: editTitle, datetime, body: editBody };

		try {
			const req = api.put(`/blogs/${id}`, updatedBlog);
			setBlogs(blogs.map((blog) => (blog.id === id ? { ...req.data } : blog)));
			setEditBody("");
			setEditTitle("");
			navigate("/");
		} catch (err) {
			console.log(`Error: ${err.message}`);
		}
	};

	return (
		<main className="newBlog">
			{blog && (
				<>
					<h1>Edit Blog</h1>
					<form className="newBlogForm" onSubmit={(e) => e.preventDefault()}>
						<label htmlFor="blogTitle">Title:</label>
						<input
							id="blogTitle"
							type="text"
							required
							value={editTitle}
							onChange={(e) => setEditTitle(e.target.value)}
						/>
						<label htmlFor="blogBody">Content:</label>
						<textarea
							id="blogBody"
							type="text"
							required
							value={editBody}
							onChange={(e) => setEditBody(e.target.value)}
						/>
						<button type="submit" onClick={() => handleEdit(blog.id)}>
							Submit
						</button>
					</form>
				</>
			)}
			{!blog && (
				<>
					<h2>Blog Not Found</h2>
					<p>
						Looks like the blog has either been moved or does not exist anymore
					</p>
					<p>
						<Link to="/">Visit Our Homepage</Link>
					</p>
				</>
			)}
		</main>
	);
};

export default EditBlog;

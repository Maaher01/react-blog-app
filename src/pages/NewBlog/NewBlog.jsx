import "./NewBlog.css";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from "../../api/blogs";
import { useState, useContext } from "react";
import DataContext from "../../context/DataContext";

const NewBlog = () => {
	const { blogs, setBlogs } = useContext(DataContext);

	const [blogTitle, setBlogTitle] = useState("");
	const [blogBody, setBlogBody] = useState("");
	const navigate = useNavigate();

	//Add new blog
	const handleSubmit = async (e) => {
		e.preventDefault();
		const id = blogs.length ? blogs[blogs.length - 1].id + 1 : 1;
		const datetime = format(new Date(), "MMMM dd, yyyy pp");
		const newBlog = { id, title: blogTitle, datetime, body: blogBody };

		try {
			const req = await api.post("/blogs", newBlog);
			const allBlogs = [...blogs, req.data];
			setBlogs(allBlogs);
			setBlogTitle("");
			setBlogBody("");
			navigate("/");
		} catch (err) {
			console.log(`Error: ${err.message}`);
		}
	};

	return (
		<main className="newBlog">
			<h1>New Blog</h1>
			<form className="newBlogForm" onSubmit={handleSubmit}>
				<label htmlFor="blogTitle">Title:</label>
				<input
					id="blogTitle"
					type="text"
					required
					value={blogTitle}
					onChange={(e) => setBlogTitle(e.target.value)}
				/>
				<label htmlFor="blogBody">Content:</label>
				<textarea
					id="blogBody"
					type="text"
					required
					value={blogBody}
					onChange={(e) => setBlogBody(e.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>
		</main>
	);
};

export default NewBlog;

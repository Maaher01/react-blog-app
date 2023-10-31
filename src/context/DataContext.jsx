import { createContext, useState, useEffect } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
	const [blogs, setBlogs] = useState([]);
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const { data, isLoading, fetchError } = useAxiosFetch(
		"http://localhost:3000/blogs"
	);

	//Fetch all blogs
	useEffect(() => {
		setBlogs(data);
	}, [data]);

	//Blog search
	useEffect(() => {
		const filteredResults = blogs.filter(
			(blog) =>
				blog.body.toLowerCase().includes(search.toLowerCase()) ||
				blog.title.toLowerCase().includes(search.toLowerCase())
		);
		setSearchResults(filteredResults.reverse());
	}, [blogs, search]);

	return (
		<DataContext.Provider
			value={{
				search,
				setSearch,
				searchResults,
				blogs,
				setBlogs,
				fetchError,
				isLoading,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export default DataContext;

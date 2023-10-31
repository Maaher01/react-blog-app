import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../../context/DataContext";

const Navbar = ({ title }) => {
	const { search, setSearch } = useContext(DataContext);

	return (
		<nav className="Nav">
			<h1>{title}</h1>
			<form className="searchForm" onSubmit={(e) => e.preventDefault()}>
				<label htmlFor="search">Search Blogs</label>
				<input
					id="search"
					type="text"
					placeholder="Search Blogs"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</form>
			<ul>
				<li>
					<Link to="/">All Blogs</Link>
				</li>
				<li>
					<Link to="blog">New Blog</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;

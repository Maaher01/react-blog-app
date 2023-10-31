import Blogs from "./Blogs/Blogs";
import "./Home.css";
import { useContext } from "react";
import DataContext from "../../context/DataContext";

const Home = () => {
	const { searchResults, isLoading, fetchError } = useContext(DataContext);

	return (
		<main className="Home">
			{isLoading && <p className="statusMsg">Loading Blogs...</p>}
			{!isLoading && fetchError && (
				<p className="statusMsg" style={{ color: "red" }}>
					{fetchError}
				</p>
			)}
			{!isLoading &&
				!fetchError &&
				(searchResults.length ? (
					<Blogs blogs={searchResults} />
				) : (
					<p style={{ margin: "2rem" }}>No blogs to display</p>
				))}
		</main>
	);
};

export default Home;

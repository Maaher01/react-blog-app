import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = ({ search, setSearch }) => {
	return (
		<div className="App">
			<Navbar title="My Blogs" search={search} setSearch={setSearch} />
			<Outlet />
			<Footer />
		</div>
	);
};

export default Layout;

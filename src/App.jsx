import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import NewBlog from "./pages/NewBlog/NewBlog";
import EditBlog from "./pages/EditBlog/EditBlog";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import { Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/DataContext";

function App() {
	return (
		<DataProvider>
			<Routes>
				<Route path="/" element={<Layout title="My Blogs" />}>
					<Route index element={<Home />} />
					<Route path="blog">
						<Route index element={<NewBlog />} />
						<Route path=":id" element={<BlogDetails />} />
						<Route path="edit/:id" element={<EditBlog />} />
					</Route>
					<Route path="*" element={<PageNotFound />} />
				</Route>
			</Routes>
		</DataProvider>
	);
}

export default App;

import axios from "axios";
import { useState, useEffect } from "react";

const useAxiosFetch = (dataUrl) => {
	const [data, setData] = useState([]);
	const [fetchError, setFetchError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const reqCancelToken = axios.CancelToken.source();

		const fetchData = async (url) => {
			setIsLoading(true);
			try {
				const res = await axios.get(url, { cancelToken: reqCancelToken.token });
				setData(res.data);
				setFetchError(null);
			} catch (err) {
				setFetchError(err.message);
				setData([]);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData(dataUrl);

		const cleanup = () => {
			reqCancelToken.cancel();
		};

		return cleanup;
	}, [dataUrl]);

	return { data, fetchError, isLoading };
};

export default useAxiosFetch;

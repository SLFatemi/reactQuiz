import { useEffect, useState } from "react";

function useFetch(url) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		async function fetchData() {
			try {
				const res = await fetch(url);
				if (!res.ok) throw new Error(`There was an error ${res.status}`);

				setData(await res.json());
			} catch (e) {
				setError(e);
				setData(null);
			} finally {
				setLoading(false);
			}
			return null;
		}
		fetchData();
		return () => controller.abort();
	}, [url]);
	return { data, loading, error };
}

export { useFetch };

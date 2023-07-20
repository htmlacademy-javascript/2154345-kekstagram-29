import { getConfig, postConfig, FetchConfig } from './api-config';

const load = ({ url, route, errorText, options: { method } }: FetchConfig, body?: BodyInit) =>
	fetch(
		`${url}${route}`,
		{
			method: method,
			body: body
		})
		.then((response) => {
			if (!response.ok) {
				throw new Error();
			}

			return response.json();
		})
		.catch(() => {
			throw new Error(errorText);
		});

const getData = () => load(getConfig);
const sendData = (body: BodyInit) => load(postConfig, body);

export { getData, sendData };

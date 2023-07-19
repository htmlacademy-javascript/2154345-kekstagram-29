import { renderComments } from '../posts/render-comments';
import { renderThumbnails } from '../posts/render-thumbnails';
import { showStatus } from './status';

const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';

const Method = {
	GET: 'GET',
	POST: 'POST'
};

const Route = {
	GET_DATA: '/data',
	SEND_DATA: '/'
};

const ErrorText = {
	GET_DATA: 'Не получилось загрузить изображение. Попробуйте обновить страницу',
	SEND_DATA: 'Не получилось отправить форму. Попробуйте ещё раз'
};


// Example with separate function "load"

interface FetchConfig {
	url: string,
	route: string,
	errorText: string,
	options: {
		method: string
	}
}

const getConfig = {
	url: BASE_URL,
	route: Route.GET_DATA,
	errorText: ErrorText.GET_DATA,
	options: {
		method: Method.GET
	}
};

const postConfig = {
	url: BASE_URL,
	route: Route.SEND_DATA,
	errorText: ErrorText.SEND_DATA,
	options: {
		method: Method.POST
	}
};

const load = ({ url, route, errorText, options: { method } }: FetchConfig, body?: BodyInit | null) => {
	fetch(`${url}${route}`, { method: method, body: body })
		.then((response) => {
			if (!response.ok) {
				throw new Error();
			}

			return response.json();
		})
		.catch(() => {
			throw new Error(errorText);
		});
};

const testGetData = () => {
	load(getConfig);
};

const testPostData = (body: BodyInit | null) => {
	load(postConfig, body);
};

///###///


// Example without separate function "load"

const getData = () => {
	fetch(`${BASE_URL}${Route.GET_DATA}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error();
			}

			return response.json();
		})
		.then((photos) => {
			renderThumbnails(photos);
		})
		.catch((err) => {
			throw new Error(ErrorText.GET_DATA);
		});
};

const sendData = (body: FormData) => {
	fetch(
		`${BASE_URL}${Route.SEND_DATA}`,
		{
			method: Method.POST,
			body: body
		})
		.then((response) => {
			if (!response.ok) {
				throw new Error();
			}

			showStatus('success');
			return response.json();
		})
		.catch((err) => {
			showStatus('error');
			throw new Error(ErrorText.SEND_DATA);
		});
};

export { getData, sendData };

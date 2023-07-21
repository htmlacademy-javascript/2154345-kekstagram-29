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

interface FetchConfig {
	url: string,
	route: string,
	errorText: string,
	options: {
		method: string
	}
}

const getConfig: FetchConfig = {
	url: BASE_URL,
	route: Route.GET_DATA,
	errorText: ErrorText.GET_DATA,
	options: {
		method: Method.GET
	}
};

const postConfig: FetchConfig = {
	url: BASE_URL,
	route: Route.SEND_DATA,
	errorText: ErrorText.SEND_DATA,
	options: {
		method: Method.POST
	}
};

export type { FetchConfig };
export { getConfig, postConfig };

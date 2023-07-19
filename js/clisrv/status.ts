import { findTemplate } from '../utils';

const dataErrorTmp = findTemplate<HTMLDivElement>('data-error');
const uploadErrorTmp = findTemplate<HTMLDivElement>('error');
const uploadSuccessTmp = findTemplate<HTMLDivElement>('success');

const statuses = {
	error: uploadErrorTmp,
	success: uploadSuccessTmp,
	dataError: dataErrorTmp
};

type StatusType = 'error' | 'success' | 'dataError';

const showStatus = (statusName: StatusType) => {
	document.body.append(statuses[statusName]);
};

export { showStatus };

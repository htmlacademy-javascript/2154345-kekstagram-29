import { findTemplate, isEscapeKey } from '../utils';

const dataErrorTmp = findTemplate<HTMLDivElement>('data-error');
const uploadErrorTmp = findTemplate<HTMLDivElement>('error');
const uploadSuccessTmp = findTemplate<HTMLDivElement>('success');

const buttonActions = {
	buttonRemoveTemplate: (currentStatus: HTMLDivElement) => {
		currentStatus.remove();
	},
	buttonReloadPage: () => {
		location.reload();
	}
};

type ErrorType = 'error'| 'success' | 'data-error';
type ButtonAction = (currentStatus: HTMLDivElement) => void;

const createStatusConfig = (name: ErrorType, tmp: HTMLDivElement, buttonAction: ButtonAction) => ({
	name: name,
	template: tmp,
	buttonAction: buttonAction
});

const statuses = {
	error: createStatusConfig('error', uploadErrorTmp, buttonActions.buttonRemoveTemplate),
	success: createStatusConfig('success', uploadSuccessTmp, buttonActions.buttonRemoveTemplate),
	dataError: createStatusConfig('data-error', dataErrorTmp, buttonActions.buttonReloadPage)
};

type StatusType = 'error' | 'success' | 'dataError';

const showStatus = (statusName: StatusType) => {
	const currentStatusOptions = statuses[statusName];
	const currentStatus = currentStatusOptions.template;
	const currentStatusAction = currentStatusOptions.buttonAction;
	document.body.append(currentStatus);
	document.body.classList.add('modal-open');

	document.addEventListener('click', (evt) => {
		const currentTarget = evt.target as HTMLDivElement;
		const clickState = [`${currentStatusOptions.name}`, `${currentStatusOptions.name}__button`].includes(currentTarget.getAttribute('class')!);
		if (clickState) {
			currentStatusAction(currentStatus);
		}
	});

	document.addEventListener('keydown', (evt) => {
		if (isEscapeKey(evt)) {
			currentStatusAction(currentStatus);
		}
	});
};

export { showStatus };

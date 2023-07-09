const getRandomInteger = (a: number, b: number) : number => {
	const lower: number = Math.ceil(Math.min(a, b));
	const upper: number = Math.floor(Math.max(a, b));
	const result: number = Math.random() * (upper - lower + 1) + lower;
	return Math.floor(result);
};

const getRandomArrayElement = <El>(elements: El[] | readonly El[]): El => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt: KeyboardEvent) => evt.key === 'Escape';

const findTemplate = <E extends HTMLElement = HTMLElement>(id: string) => {
	const templateElement = document.querySelector<HTMLTemplateElement>(`#${id}`);
	if (templateElement === null) {
		throw new Error(`Template with id ${id} not found`);
	}

	const template = templateElement.content.firstElementChild;
	if (template === null) {
		throw new Error(`Template with id ${id} not found`);
	}

	return template as E;
};

const findBEMElement = <E extends HTMLElement = HTMLElement>(blockNode: Element, element: string, block?: string) => {
	if (!block) {
		block = blockNode.classList[0];
	}

	const elementNode = blockNode.querySelector<E>(`.${block}__${element}`);
	if (elementNode === null) {
		throw new Error(`Element ${element} not found in block ${block}`);
	}

	return elementNode;
};

const renderPack = <El>(items: El[], container: Element, render: (item: El) => HTMLElement) => {
	const fragment = document.createDocumentFragment();
	items.forEach((item) => fragment.append(render(item)));
	container.append(fragment);
};

export {getRandomInteger, getRandomArrayElement, isEscapeKey, findTemplate, findBEMElement, renderPack};

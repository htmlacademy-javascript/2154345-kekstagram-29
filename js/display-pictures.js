const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesFragment = document.createDocumentFragment();

const displayPictures = (dataArray) => {
	dataArray.forEach(({url, description, likes, comments}) => {
		const pictureElement = pictureTemplate?.cloneNode(true);
		const pictureTag = pictureElement.querySelector('.picture__img');

		pictureTag.src = url;
		pictureTag.alt = description;
		pictureElement.querySelector('.picture__likes').textContent = likes;
		pictureElement.querySelector('.picture__comments').textContent = comments.length;

		picturesFragment.append(pictureElement);
	});

	pictureList.append(picturesFragment);
};

export { displayPictures };

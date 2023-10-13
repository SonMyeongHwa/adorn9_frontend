let slideWrapper = document.querySelector('.recommend-silde-items-wrapper'),
	slides = slideWrapper.querySelectorAll('.recommend-silde-items-wrapper > li'),
	btnPrev = document.querySelector('.recommend.btnPrev'),
	btnNext = document.querySelector('.recommend.btnNext'),
	currentSlideIndex = 0,
	slideWidth = slides[0].clientWidth,
	slideMargin = 10;

// 이미지 불러오는 함수
function loadImages() {
	return fetch('http://localhost:3000/api/v1/categories')
		.then((response) => response.json())
		.then((data) => {
			const randomIndex = Math.floor(Math.random() * data.categories.length);
			const randomCategory = data.categories[randomIndex];

			return fetch(
				`http://localhost:3000/api/v1/products/categories/${randomCategory.name}`,
			);
		})
		.then((response) => response.json())
		.then((productsData) => {
			slideWrapper.innerHTML = ''; // 기존 이미지 제거

			productsData.categoryProducts.forEach((categoryProducts) => {
				if (categoryProducts.images) {
					const liElement = document.createElement('li');
					const imgElement = document.createElement('img');
					imgElement.src = categoryProducts.images;
					imgElement.alt = categoryProducts.name || '품목 이미지';
					liElement.appendChild(imgElement);
					slideWrapper.appendChild(liElement);
				}
			});

			return Promise.resolve();
		});
}

// 슬라이드 이동 함수
function makeClone() {
	slides = slideWrapper.querySelectorAll('li');
	for (let i = 0; i < slides.length; i++) {
		let cloneSlide = slides[i].cloneNode(true);
		cloneSlide.classList.add('nextClone');
		slideWrapper.appendChild(cloneSlide);
	}

	for (let i = slides.length - 1; i >= 0; i--) {
		let cloneSlide = slides[i].cloneNode(true);
		cloneSlide.classList.add('prevClone');
		slideWrapper.prepend(cloneSlide);
	}

	setInitialPosition();
}

function setInitialPosition() {
	const offset = -(slideWidth + slideMargin) * slides.length;
	slideWrapper.style.transform = `translateX(${offset}px)`;
	slideWrapper.style.opacity = '1';
}

function moveSlide(direction) {
	if (direction === 'next') {
		currentSlideIndex++;
	} else {
		currentSlideIndex--;
	}

	const offset = -currentSlideIndex * (slideWidth + slideMargin);
	slideWrapper.style.transform = `translateX(${offset}px)`;

	if (currentSlideIndex === slides.length * 2 || currentSlideIndex === 0) {
		setTimeout(() => {
			slideWrapper.style.transition = 'none';
			slideWrapper.style.transform = `translateX(${
				-slides.length * (slideWidth + slideMargin)
			}px)`;
			currentSlideIndex = slides.length;
		}, 500);
		setTimeout(() => {
			slideWrapper.style.transition = '';
		}, 510);
	}
}

function initializeSlider() {
	loadImages().then(() => {
		makeClone();

		// 버튼 클릭 이벤트
		btnPrev.addEventListener('click', () => moveSlide('prev'));
		btnNext.addEventListener('click', () => moveSlide('next'));
	});
}

document.addEventListener('DOMContentLoaded', function () {
	initializeSlider();
});

export default { initializeSlider };

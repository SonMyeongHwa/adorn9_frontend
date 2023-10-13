let slides = document.querySelector('.silde-items-wrapper'),
	slide = document.querySelectorAll('.silde-items-wrapper > li'),
	btnPrev = document.querySelector('.btnPrev'),
	btnNext = document.querySelector('.btnNext'),
	currentIndex = 0,
	slideCount = slide.length,
	slideWidth = 356,
	slideMargin = 10;

// console.log(slideCount);
makeClone();

function makeClone() {
	for (let i = 0; i < slideCount; i++) {
		// a.cloneNode(), a.cloneNode(true)
		let cloneSlide = slide[i].cloneNode(true);
		cloneSlide.classList.add('nextClone');

		// 해당 dom태그 맨 뒤에 넣고자 하면 a.appendChild(b)
		slides.appendChild(cloneSlide);
	}

	for (let i = slideCount - 1; i >= 0; i--) {
		// a.cloneNode(), a.cloneNode(true)
		let cloneSlide = slide[i].cloneNode(true);
		cloneSlide.classList.add('prevClone');

		// 해당 dom태그 요소 맨 앞에 넣고자 하면 a.prepend(b)
		slides.prepend(cloneSlide);
	}

	updateWidth();
	setInitialPosition();

	setTimeout(function () {
		slides.classList.add('active');
	}, 100);
}

function updateWidth() {
	let currentSlides = document.querySelectorAll('.silde-items-wrapper li');
	let newSlideCount = currentSlides.length;

	let newWidth =
		(slideWidth + slideMargin) * newSlideCount - slideMargin + 'px';

	// console.log(newWidth);
	slides.style.width = newWidth;
}
function setInitialPosition() {
	let initialTranslateValue = -(slideWidth + slideMargin) * slideCount;

	//slides {transform : translateX(-1000px)}
	slides.style.transform = `translateX(${initialTranslateValue}px)`;
}
btnPrev.addEventListener('click', function () {
	moveSlide(currentIndex - 1);
});

btnNext.addEventListener('click', function () {
	moveSlide(currentIndex + 1);
});

function moveSlide(number) {
	slides.style.left = -number * (slideWidth + slideMargin) + 'px';
	currentIndex = number;
	// console.log(currentIndex, slideCount);

	if (currentIndex === slideCount || currentIndex === -slideCount) {
		setTimeout(function () {
			slides.classList.remove('active');
			slides.style.left = '0px';
			currentIndex = 0;
		}, 500);

		setTimeout(function () {
			slides.classList.add('active');
		}, 600);
	}
}

export default {
	makeClone,
};

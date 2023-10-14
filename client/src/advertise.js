function advertise() {
	let currentSlide = 0;
	const slides = document.querySelector('.slides');
	const slideElements = document.querySelectorAll('.slide');
	const slideCount = slideElements.length;

	const firstClone = slideElements[0].cloneNode(true);
	const lastClone = slideElements[slideCount - 1].cloneNode(true);

	slides.appendChild(firstClone);
	slides.insertBefore(lastClone, slideElements[0]);

	slides.style.transform = `translateX(-100%)`;

	setInterval(function () {
		slides.style.transition = 'transform 1s';
		currentSlide++;

		if (currentSlide > slideCount) {
			setTimeout(function () {
				slides.style.transition = 'none';
				slides.style.transform = `translateX(-100%)`;
				currentSlide = 0;
			}, 1000);
		} else {
			let moveX = -(currentSlide + 1) * 100;
			slides.style.transform = `translateX(${moveX}%)`;
		}
	}, 3000);
}
window.onload = function () {
	advertise();
};
export default {
	advertise,
};

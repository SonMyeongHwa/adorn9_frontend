function advertise() {
	let currentSlide = 0;
	const slides = document.querySelector('.slides'); // slides 전체를 선택
	const slideElements = document.querySelectorAll('.slide');
	const slideCount = slideElements.length;

	// 첫 슬라이드와 마지막 슬라이드를 복사
	const firstClone = slideElements[0].cloneNode(true);
	const lastClone = slideElements[slideCount - 1].cloneNode(true);

	// 복사한 슬라이드를 앞뒤로 추가
	slides.appendChild(firstClone);
	slides.insertBefore(lastClone, slideElements[0]);

	// 초기 위치 설정
	slides.style.transform = `translateX(-100%)`;

	// 일정 시간마다 슬라이드 변경
	setInterval(function () {
		slides.style.transition = 'transform 1s'; // 부드럽게 넘어가게 transition 추가
		currentSlide = (currentSlide + 1) % (slideCount + 1);
		let moveX = -(currentSlide + 1) * 100;
		slides.style.transform = `translateX(${moveX}%)`;

		// 마지막 복사 슬라이드에서 첫 번째 슬라이드로 바로 이동
		if (currentSlide === slideCount) {
			setTimeout(function () {
				slides.style.transition = 'none';
				slides.style.transform = `translateX(-100%)`;
				currentSlide = 0;
			}, 1000); // transition 시간과 동일하게 설정
		}
	}, 3000);
}

document.addEventListener('DOMContentLoaded', function () {
	advertise();
});

export default {
	advertise,
};

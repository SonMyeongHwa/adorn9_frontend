import apiModule from './api.js';
import advertising from './advertise.js';
import mainSlideModule from './main-slide.js';
import createTheModal from '/modal/modal.js';
import mentionSlide from './mention-slide.js';

apiModule.fetch;
advertising.advertise();
mainSlideModule.makeClone();
mentionSlide.initializeSlider();
createTheModal.createModal();

const token = localStorage.getItem('TOKEN');
const loginCheck = () => {
	if (token) {
		console.log('사용자는 로그인 상태입니다.');

		document.querySelector(
			'.signup',
		).innerHTML = `<li class='logout'>로그아웃</li>`;
		document.querySelector('.logout').onclick = function () {
			localStorage.clear();
			alert('로그아웃 되었습니다.');
			window.location.href = '/main.html';
		};

		document.querySelector(
			'.login',
		).innerHTML = `<li class='mypage'>마이페이지</li>`;
		document.querySelector('.login').onclick = function () {
			window.location.href = '/myPage/myPage.html';
			console.log('마이페이지로 이동');
		};

		document.querySelector('.cart').onclick = function () {
			window.location.href = '/cart/cart.html';
		};
	}
};
loginCheck();

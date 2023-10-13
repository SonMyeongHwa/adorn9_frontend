import apiModule from './api.js';
import advertising from './advertise.js';
import mainSlideModule from './main-slide.js';
import createTheModal from '../modal/modal.js';

apiModule.fetch;
advertising.advertise();
mainSlideModule.makeClone();
createTheModal.createModal();

const loginCheck = () => {
	const token = localStorage.getItem('TOKEN');
	if (!token) {
		console.log('사용자는 로그아웃 상태입니다.');
		window.location.href = '../login/login.html';

		// console.log(token);
		document.querySelector('.my-page').onclick = function () {
			alert('회원 전용 페이지입니다');
			window.location.href = '../login/login.html';
		};
	}
	if (token) {
		console.log('사용자는 로그인 상태입니다.');

		document.querySelector(
			'.login',
		).innerHTML = `<li class='logout'>로그아웃</li>`;
		document.querySelector('.logout').onclick = function () {
			localStorage.clear();
			alert('로그아웃 되었습니다.');
		};

		document.querySelector('#logoutBtn').onclick = function () {
			localStorage.clear();
			window.location.href = '../main/main.html';
			alert('로그아웃 되었습니다.');
		};
	}
};
loginCheck();

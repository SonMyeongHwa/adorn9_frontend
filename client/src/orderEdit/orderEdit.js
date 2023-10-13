const token = localStorage.getItem('TOKEN');
const loginCheck = () => {
	if (!token) {
		console.log('사용자는 로그아웃 상태입니다.');
		window.location.href = '/login/login.html';
	}
	if (token) {
		console.log('사용자는 로그인 상태입니다.');

		document.querySelector(
			'.signup',
		).innerHTML = `<li class='logout'>로그아웃</li>`;
		document.querySelector('.logout').onclick = function () {
			localStorage.clear();
			alert('로그아웃 되었습니다.');
			window.location.href = '/main/main.html';
		};

		document.querySelector(
			'.login',
		).innerHTML = `<li class='mypage'>마이페이지</li>`;
		document.querySelector('.login').onclick = function () {
			window.location.href = '/mypage/mypage.html';
			console.log('마이페이지로 이동');
		};

		document.querySelector('.cart').onclick = function () {
			window.location.href = '/cart/cart.html';
		};
	}
};
loginCheck();

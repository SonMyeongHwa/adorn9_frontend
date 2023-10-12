// const loginBtn = document
// 	.querySelector('.login')
// 	.addEventListener('click', () => {
// 		window.location.href = '../src/login/login.html';
// 	});

// export { loginBtn };

export const loginCheck = () => {
	const token = localStorage.getItem('TOKEN');
	if (!token) {
		console.log('사용자는 로그아웃 상태입니다.');
		createLogoutNav();
	} else {
		console.log('사용자는 로그인 상태입니다.');
		createLoginNav();
	}
};

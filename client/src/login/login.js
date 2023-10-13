document.addEventListener('DOMContentLoaded', function () {
	let emailReg =
		/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
	const passwordReg =
		/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

	let userEmail = document.getElementById('exampleInputEmail1');
	let userPw = document.getElementById('exampleInputPassword1');

	function handleLogin() {
		if (userEmail.value === '') {
			alert('이메일을 입력해주세요');
			userEmail.focus();
			return;
		} else if (!emailReg.test(userEmail.value)) {
			alert('이메일 형식이 올바르지 않습니다');
			userEmail.focus();
			return false;
		}

		if (userPw.value === '') {
			alert('비밀번호를 입력해주세요');
			userPw.focus();
			return;
		} else if (!passwordReg.test(userPw.value)) {
			alert('비밀번호를 확인해주세요');
			userPw.focus();
			return false;
		}

		fetch('http://localhost:3000/api/v1/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				Authorization: localStorage.getItem('TOKEN'),
			},
			body: JSON.stringify({
				email: userEmail.value,
				password: userPw.value,
			}),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('통신 실패!');
				}
			})
			.then((data) => {
				console.log(data);
				if (data.message === '로그인 성공') {
					localStorage.setItem('TOKEN', data.token);
					alert('로그인 성공');
					// window.location.href = '../main/main.html';
				} else if (data.message === '비밀번호 작성 양식을 준수해주세요.') {
					alert('비밀번호 작성 양식을 준수해주세요.');
				} else if (data.message === '회원을 찾을 수 없습니다.') {
					alert('회원을 찾을 수 없습니다.');
				}
			})
			.catch((error) => {
				console.error('로그인 요청 실패:', error);
				alert('로그인 요청 실패');
			});
	}

	const loginButton = document.querySelector('button');
	if (loginButton) {
		loginButton.addEventListener('click', handleLogin);
	}

	document.addEventListener('keydown', function (e) {
		if (e.key === 'Enter') {
			handleLogin();
		}
	});
});

// 로그아웃

function logoutHandler() {
	fetch('http://localhost:3000/api/v1/users/logout', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((res) => {
		return res;
	});
}

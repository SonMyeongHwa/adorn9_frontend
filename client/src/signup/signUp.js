import {
	loginCheck,
	createLoginNav,
	createLogoutNav,
	handleLogout,
} from '../navbar.js';

loginCheck();
createLoginNav();
createLogoutNav();
handleLogout();

let userName = document.getElementById('exampleInputName');
let userPhoneNum = document.getElementById('exampleInputPhoneNumber');
let userEmail = document.getElementById('exampleInputEmail1');
let userPw = document.getElementById('exampleInputPassword1');
let userPw2 = document.getElementById('exampleInputPassword2');
let btn = document.getElementById('submitBtn');
const form = document.getElementById('signUpForm');

// 정규식
var nameReg = /^[가-힣a]{2,15}$/;
let emailReg =
	/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
let phoneNumberReg = /^\d{2,3}-?\d{3,4}-?\d{4}$/;
const passwordReg =
	/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

// 회원가입 버튼 비활성화
userName.addEventListener('keyup', activeEvent);
userPhoneNum.addEventListener('keyup', activeEvent);
userEmail.addEventListener('keyup', activeEvent);
userPw.addEventListener('keyup', activeEvent);
userPw2.addEventListener('keyup', activeEvent);

function activeEvent() {
	switch (
		!(
			userName.value &&
			userEmail.value &&
			userPhoneNum.value &&
			userPw.value &&
			userPw2.value
		)
	) {
		case true:
			btn.disabled = true;
			break;
		case false:
			btn.disabled = false;
			break;
	}
}

function signUpHandler() {
	if (userName.value == '') {
		alert('이름을 입력해주세요');
		userName.focus();
		return false;
	} else if (!nameReg.test(userName.value)) {
		alert('이름은 최소 2글자 이상, 한글만 입력 가능합니다');
		userName.focus();
		return false;
	}

	// 전화번호
	if (userPhoneNum.value == '') {
		alert('전화번호를 입력해주세요');
		userPhoneNum.focus();
		return false;
	} else if (!phoneNumberReg.test(userPhoneNum.value)) {
		alert('010으로 시작하는 전화번호를 입력해주세요');
		userPhoneNum.focus();
		return false;
	}

	// 이메일
	if (userEmail.value == '') {
		alert('이메일을 입력해주세요');
		userEmail.focus();
		return;
	} else if (!emailReg.test(userEmail.value)) {
		alert('이메일 형식이 올바르지 않습니다');
		userEmail.focus();
		return false;
	}

	// 비밀번호
	if (userPw.value == '') {
		alert('비밀번호를 입력해주세요');
		userPw.focus();
		return;
	} else if (!passwordReg.test(userPw.value)) {
		alert('영문, 숫자, 특수문자 조합 비밀번호를 입력해주세요');
		userPw.focus();
		return false;
	}

	if (userPw2.value == '') {
		alert('비밀번호를 확인해주세요');
		userPw2.focus();
		return;
	} else if (!passwordReg.test(userPw2.value)) {
		alert('영문, 숫자, 특수문자 조합 비밀번호를 입력해주세요');
		userPw2.focus();
		return false;
	}

	if (userPw.value !== userPw2.value) {
		alert('비밀번호가 일치하지 않습니다');
		userPw.focus();
		return;
	}

	fetch('http://localhost:3000/api/v1/users/joining', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			user_name: userName.value,
			email: userEmail.value,
			password: userPw.value,
			phone_number: userPhoneNum.value,
		}),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((res) => {
			console.log(res);
			if (res.message === '이미 등록된 이메일입니다.') {
				alert('이미 등록된 이메일입니다.');
			} else if (
				res.message ===
				'비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.'
			) {
				alert('비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.');
			} else {
				alert('adorn9의 회원이 되신걸 환영합니다');
			}
		})
		.catch((error) => {
			console.error('Error:', error);
			alert('네트워크 오류 또는 서버 오류로 인해 회원가입에 실패했습니다.');
		});
}

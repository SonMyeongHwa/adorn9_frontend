let userName = document.getElementById("exampleInputName");
let userPhoneNum = document.getElementById("exampleInputPhoneNumber");
let userEmail = document.getElementById("exampleInputEmail1");
let userPw = document.getElementById("exampleInputPassword1");
let userPw2 = document.getElementById("exampleInputPassword2");
let btn = document.getElementById("submitBtn");
const form = document.getElementById("signUpForm");

// 정규식
var nameReg = /^[가-힣a]{2,15}$/;
let emailReg =
	/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
let phoneNumberReg = /^\d{2,3}-?\d{3,4}-?\d{4}$/;
const passwordReg =
	/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

// 회원가입 로직
// function signUp() {
// 	// 이름
// 	if (userName.value == "") {
// 		console.log("이름을 입력해주세요");
// 		userName.focus();
// 		return false;
// 	} else if (!nameReg.test(userName.value)) {
// 		console.log("이름은 최소 2글자 이상, 한글만 입력 가능합니다");
// 		userName.focus();
// 		return false;
// 	}

// 	// 전화번호
// 	if (userPhoneNum.value == "") {
// 		alert("전화번호를 입력해주세요");
// 		userPhoneNum.focus();
// 		return false;
// 	} else if (!phoneNumberReg.test(userPhoneNum.value)) {
// 		alert("010으로 시작하는 전화번호를 입력해주세요");
// 		userPhoneNum.focus();
// 		return false;
// 	}

// 	// 이메일
// 	if (userEmail.value == "") {
// 		alert("이메일을 입력해주세요");
// 		userEmail.focus();
// 		return;
// 	} else if (!emailReg.test(userEmail.value)) {
// 		alert("이메일 형식이 올바르지 않습니다");
// 		userEmail.focus();
// 		return false;
// 	}

// 	// 비밀번호
// 	if (userPw.value == "") {
// 		alert("비밀번호를 입력해주세요");
// 		userPw.focus();
// 		return;
// 	} else if (!passwordReg.test(userPw.value)) {
// 		alert("영문, 숫자, 특수문자 조합 비밀번호를 입력해주세요");
// 		userPw.focus();
// 		return false;
// 	}

// 	if (userPw2.value == "") {
// 		alert("비밀번호를 확인해주세요");
// 		userPw2.focus();
// 		return;
// 	} else if (!passwordReg.test(userPw2.value)) {
// 		alert("영문, 숫자, 특수문자 조합 비밀번호를 입력해주세요");
// 		userPw2.focus();
// 		return false;
// 	}

// 	if (userPw.value !== userPw2.value) {
// 		alert("비밀번호가 일치하지 않습니다");
// 		userPw.focus();
// 		return;
// 	}
// 	document.form1.submit();
// 	// console.log(userPhoneNum.value);
// }

// 회원가입 버튼 비활성화
userName.addEventListener("keyup", activeEvent);
userPhoneNum.addEventListener("keyup", activeEvent);
userEmail.addEventListener("keyup", activeEvent);
userPw.addEventListener("keyup", activeEvent);
userPw2.addEventListener("keyup", activeEvent);

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
	if (userName.value == "") {
		alert("이름을 입력해주세요");
		userName.focus();
		return false;
	} else if (!nameReg.test(userName.value)) {
		alert("이름은 최소 2글자 이상, 한글만 입력 가능합니다");
		userName.focus();
		return false;
	}

	// 전화번호
	if (userPhoneNum.value == "") {
		alert("전화번호를 입력해주세요");
		userPhoneNum.focus();
		return false;
	} else if (!phoneNumberReg.test(userPhoneNum.value)) {
		alert("010으로 시작하는 전화번호를 입력해주세요");
		userPhoneNum.focus();
		return false;
	}

	// 이메일
	if (userEmail.value == "") {
		alert("이메일을 입력해주세요");
		userEmail.focus();
		return;
	} else if (!emailReg.test(userEmail.value)) {
		alert("이메일 형식이 올바르지 않습니다");
		userEmail.focus();
		return false;
	}

	// 비밀번호
	if (userPw.value == "") {
		alert("비밀번호를 입력해주세요");
		userPw.focus();
		return;
	} else if (!passwordReg.test(userPw.value)) {
		alert("영문, 숫자, 특수문자 조합 비밀번호를 입력해주세요");
		userPw.focus();
		return false;
	}

	if (userPw2.value == "") {
		alert("비밀번호를 확인해주세요");
		userPw2.focus();
		return;
	} else if (!passwordReg.test(userPw2.value)) {
		alert("영문, 숫자, 특수문자 조합 비밀번호를 입력해주세요");
		userPw2.focus();
		return false;
	}

	if (userPw.value !== userPw2.value) {
		alert("비밀번호가 일치하지 않습니다");
		userPw.focus();
		return;
	}

	fetch("http://localhost:3000/api/v1/users/joining", {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			user_name: userName.value,
			email: userEmail.value,
			password: userPw.value,
			phone_number: userPhoneNum.value,
		}),
	})
		.then((response) => {
			response.json();
			console.log(response);
			// console.log(response.json());
		})
		.then((res) => {
			console.log(res);
			alert("회원가입에 성공했습니다");
			// navigate("/");
		})
		.catch((result) => {
			if (result.message === "${user_name}님의 가입을 환영합니다") {
				alert("회원가입성공");
			} else {
				alert("회원가입실패");
			}
		});
}

// function handleSignUp() {
// 	// e.preventDefault();

// }

// const isNameValid = nameReg.test(userName.value);
// const isEmailValid = emailReg.test(userEmail.value);
// const isPasswordValid = passwordReg.test(userPw.value);
// const isMobileValid = phoneNumberReg.test(userPhoneNum.value);

// const signUpValid =
// 	isNameValid && isEmailValid && isPasswordValid && isMobileValid;

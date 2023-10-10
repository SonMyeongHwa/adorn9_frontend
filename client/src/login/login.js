// 정규식
let emailReg =
	/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
const passwordReg =
	/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

let userEmail = document.getElementById("exampleInputEmail1");
let userPw = document.getElementById("exampleInputPassword1");

function handleLogin() {
	if (userEmail.value == "") {
		alert("이메일을 입력해주세요");
		userEmail.focus();
		return;
	} else if (!emailReg.test(userEmail.value)) {
		alert("이메일 형식이 올바르지 않습니다");
		userEmail.focus();
		return false;
	}

	if (userPw.value == "") {
		alert("비밀번호를 입력해주세요");
		userPw.focus();
		return;
	} else if (!passwordReg.test(userPw.value)) {
		alert("비밀번호를 확인해주세요");
		userPw.focus();
		return false;
	}

	fetch("http://localhost:3000/api/v1/users/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			email: userEmail.value,
			password: userPw.value,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			localStorage.getItem("TOKEN", data.accessToken);
			alert("로그인 성공");
			location.href = "../main/main.html";
		});
}

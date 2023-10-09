// 정규식
let emailReg =
	/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

let userName = document.getElementById("exampleInputName");
let userPhoneNum = document.getElementById("exampleInputPhoneNumber");
let userEmail = document.getElementById("exampleInputEmail1");
let userPw = document.getElementById("exampleInputPassword1");

function handleLogin() {
	// e.preventDefault();
	fetch("http://localhost:3000/api/v1/users/login", {
		method: "POST",
		header: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: userEmail,
			password: userPw,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			alert("로그인에 성공했습니다");
			// navigate("/");
		});
}

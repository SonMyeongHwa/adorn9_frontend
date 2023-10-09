let userName = document.getElementById("exampleInputName");
let userPhoneNum = document.getElementById("exampleInputPhoneNumber");
let userEmail = document.getElementById("exampleInputEmail1");
let userPw = document.getElementById("exampleInputPassword1");
let userPw2 = document.getElementById("exampleInputPassword2");
let btn = document.getElementById("submitBtn");
const form = document.getElementById("signUpForm");

// 정규식
var nameReg = /^[가-힣a-zA-Z]{2,15}$/;
let emailReg =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

function signUp() {
  // 이름
  if (userName.value == "") {
    alert("이름을 입력해주세요");
    userName.focus();
    return false;
  } else if (!nameReg.test(userName.value)) {
    alert("최소 2글자 이상, 한글과 영어만 입력 가능합니다");
    userName.focus();
    return false;
  }

  // 전화번호
  if (userPhoneNum.value == "") {
    alert("전화번호를 입력해주세요");
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
  }

  if (userPw2.value == "") {
    alert("비밀번호를 확인해주세요");
    userPw2.focus();
    return;
  }

  if (userPw.value !== userPw2.value) {
    alert("비밀번호가 일치하지 않습니다");
    userPw.focus();
    return;
  }
  document.form1.submit();
}

userName.addEventListener("keyup", activeEvent);
userPhoneNum.addEventListener("keyup", activeEvent);
userEmail.addEventListener("keyup", activeEvent);
userPw.addEventListener("keyup", activeEvent);
userPw2.addEventListener("keyup", activeEvent);
// btn.addEventListener("click", ErrorEvent);

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
      // alert('다시 입력해주세요')
      break;
  }
}

fetch("http://localhost:3000/api/v1/users/join", {
  method: "POST",
  header: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    user_name: userName,
    email: userEmail,
    password: userPw,
    phone_number: userPhoneNum,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    alert("회원가입에 성공했습니다");
    navigate("/");
  });

const title = document.querySelector(".message>.title")
const info = document.querySelector(".info");
const detailButton = document.getElementById("detail");
const shopButton = document.getElementById("shop");
const orderId = location.href.split('?orderId=')[1];

if(orderId) {
  fetch(`http://kdt-sw-6-team09.elicecoding.com/api/v1/orders/${orderId}`)
  .then((response) => response.json())
  .then((data) => {
    let { _id, name, phone_number, email, receiver_name, address, receiver_phone_number, payment, total_price, createdAt } = data.order;

    phone_number = phoneNumberHyphen(phone_number);
    receiver_phone_number = phoneNumberHyphen(receiver_phone_number);
    address = address.split("||");
    payment = payment === "card" ? "카드결제" : "무통장입금";
    total_price = total_price.toLocaleString('ko-KR');
    createdAt = dateFormat(createdAt);

    title.insertAdjacentHTML("beforeend", `
      <p class="order-number">
        주문번호 : <span class="number">${_id}</span>
      </p>
    `);

    info.insertAdjacentHTML("beforeend", `
      <!-- 배송정보 -->
      <div class="delivery-info">
        <div class="title"><h3>배송 정보</h3></div><hr>
        <table class="table">
          <tbody>
            <tr>
              <td class="col-md-2">받는사람</td>
              <td>${receiver_name} / ${receiver_phone_number}</td>
            </tr>
            <tr>
              <td class="col-md-2">배송지</td>
              <td>(${address[0]}) ${address[1]} ${address[2]}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 결제정보 -->
      <div class="payment-info">
        <div class="title"><h3>결제 정보</h3></div><hr>
        <table class="table">
          <tbody>
            <tr>
              <td class="col-md-2">주문자</td>
              <td>${name} / ${phone_number}</td>
            </tr>
            <tr>
              <td class="col-md-2">이메일</td>
              <td>${email}</td>
            </tr>
            <tr>
                <td class="col-md-2">결제일</td>
                <td>${createdAt}</td>
              </tr>
            <tr>
              <td class="col-md-2">결제수단</td>
              <td>${payment}</td>
            </tr>
            <tr>
              <td class="col-md-2">결제금액</td>
              <td>${total_price}원</td>
            </tr>
          </tbody>
        </table>
      </div>
    `);
    localStorage.removeItem("orderId");
  })
  .then((error) => console.log(error));
} else {
  alert("비정상 접근입니다.\n메인페이지로 이동합니다.");
  window.location.href = "../main.html"
}

function phoneNumberHyphen(phoneNumber) {
  return phoneNumber.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}

//시간 계산
function dateFormat(date) {
	date = new Date(date);
	let year = date.getFullYear();
	let month = ('0' + (date.getMonth() + 1)).slice(-2);
	let day = ('0' + date.getDate()).slice(-2);
	let hours = ('0' + date.getHours()).slice(-2); 
	let minutes = ('0' + date.getMinutes()).slice(-2);

	return `${year}-${month}-${day} ${hours}:${minutes}`;
}

detailButton.addEventListener("click", function() {
  window.location.href = "../myPage/myPage.html";
});

shopButton.addEventListener("click", function() {
  window.location.href = "../main.html";
});

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
			window.location.href = '../main.html';
		};

		document.querySelector(
			'.login',
		).innerHTML = `<li class='mypage'>마이페이지</li>`;
		document.querySelector('.login').onclick = function () 
		{
			window.location.href = '/mypage/mypage.html';
			console.log('마이페이지로 이동');
		};

		document.querySelector('.cart').onclick = function () {
			window.location.href = '/cart/cart.html';
		};
	}
};
loginCheck();
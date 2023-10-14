const info = document.querySelector(".info");
const itemInfo = document.querySelector(".item-info .table>tbody");
const backButton = document.getElementById("backButton");
const token = localStorage.getItem('TOKEN');
const receivedData = location.href.split('?orderId=')[1];

fetch(`http://kdt-sw-6-team09.elicecoding.com/api/v1/orders/${receivedData}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		  .then((response) => response.json())
		  .then((data) => {
				if(data.status === 200) {
					console.log(data)
					const { name, email, receiver_name, items } = data.order;
					let { phone_number, receiver_phone_number, address, payment, createdAt, total_price } = data.order;

					phone_number = phoneNumberHyphen(phone_number);
          receiver_phone_number = phoneNumberHyphen(receiver_phone_number);
					address = address.split("||");
					payment = payment === "card" ? "카드결제" : "무통장입금";
					total_price = total_price.toLocaleString('ko-KR');
					createdAt = dateFormat(createdAt);

					info.insertAdjacentHTML("afterbegin", `
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
						</div>`);
					
					items.forEach(item => {
						let itemPrice = item.price.toLocaleString('ko-KR');
						const itemName = item.item;
						const quantity = item.quantity;

						itemInfo.insertAdjacentHTML("beforeend", `
							<tr>
								<td class="col-md-1">
									<img src="${item.item_img}" alt="">
								</td>
								<td class="col-md-6">${itemName}</td>
								<td class="col-md-1 count">${quantity}개</td>
								<td class="col-md-2 price"><span class="num">${itemPrice}</span>원</td>
							</tr>`);
					});
				}
		  })
		  .catch((error) => console.error(error));

//전화번호 하이픈
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

backButton.addEventListener("click", function(e) {
	e.preventDefault();
	window.location.href = "../myPage/myPage.html";
});


const loginCheck = () => {
	if (!token) {
		console.log('사용자는 로그아웃 상태입니다.');
		window.location.href = '../login/login.html';
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
			window.location.href = '../mypage/mypage.html';
			console.log('마이페이지로 이동');
		};

		document.querySelector('.cart').onclick = function () {
			window.location.href = '../cart/cart.html';
		};
	}
};
loginCheck();
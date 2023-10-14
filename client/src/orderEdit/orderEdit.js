const info = document.querySelector(".info");
const itemInfo = document.querySelector(".item-info .table>tbody");
const editButton = document.getElementById("editButton");
const token = localStorage.getItem('TOKEN');
const receivedData = location.href.split('?orderId=')[1];
let itemList = []; //API보낼 배열
let { orderName, orderPhoneNumber } = "";

fetch(`http://kdt-sw-6-team09.elicecoding.com/api/v1/orders/${receivedData}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		  .then((response) => response.json())
		  .then((data) => {
				if(data.status === 200) {
					console.log(data)
					const { name, email, receiver_name, receiver_phone_number, items } = data.order;
					let { phone_number, address, payment, createdAt, total_price } = data.order;

					orderName = name;
					orderPhoneNumber = phone_number;

					phone_number = phoneNumberHyphen(phone_number);
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
										<td>
											<input type="text" class="form-control" id="receiver_name" value=${receiver_name} placeholder="이름" />
										</td>
									</tr>
									<tr>
										<td class="col-md-2">전화번호</td>
										<td>
											<input type="text" class="form-control" id="receiver_phone_number" value=${receiver_phone_number} placeholder="전화번호" maxlength="11" />
										</td>
									</tr>
									<tr>
										<td class="col-md-2">배송지</td>
										<td class="address">
											<div class="row-item col-md-6 ">
												<input type="text" class="form-control " id="zipcode" value=${address[0]} placeholder="우편번호" disabled/>
											</div>
											<button class="row-item btn btn-secondary" id="zipcode-button">우편번호 찾기</button>
											<input type="text" class="form-control" id="address1" value='${address[1]}' placeholder="주소" disabled/>
											<input type="text" class="form-control" id="address2" value='${address[2]}' placeholder="상세주소" />
										</td>
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

							itemList.push({item: itemName, quantity: quantity});
					})
					
					const zipcodeButton = document.getElementById("zipcode-button");
					const zipcode = document.getElementById("zipcode");
					const address1 = document.getElementById("address1");
					const address2 = document.getElementById("address2");
					zipcodeButton.addEventListener("click", function postCode(e) {
						e.preventDefault();
						// 카카오 우편번호 API
						new daum.Postcode({
							oncomplete: function(data) {
								let zonecode = data.zonecode; //우편번호
								let address = ""; //주소
					
								//userSelectedType -> R/J (R: 도로명 주소 / J: 지번주소)
								if(data.userSelectedType === 'R') { //도로명주소
									address = data.roadAddress;
								} else { //지번주소
									address = data.jibunAddress;
								}
					
								zipcode.value = zonecode;
								address1.value = address;
								address2.value = ""; //상세주소에 값이 있는경우 초기화
								address2.focus(); //상세주소 input에 커서
							}
						}).open();
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

editButton.addEventListener("click", function(e) {
	e.preventDefault();
	const receiver_name = document.getElementById("receiver_name");
  const receiver_phone_number = document.getElementById("receiver_phone_number");
  let address = `${zipcode.value}||${address1.value}||${address2.value}`;

  fetch(`http://kdt-sw-6-team09.elicecoding.com/api/v1/orders/${receivedData}`, {
	method: 'PUT',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: orderName,
			phoneNumber: orderPhoneNumber,
      receiverName: receiver_name.value,
      receiverPhoneNumber: receiver_phone_number.value,
      address: address,
      items: itemList,
    })
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
			if(data.status === 200) {
				alert("주문정보 수정이 완료되었습니다!");
				window.location.href = "../myPage/myPage.html";
			}
    })
    .catch((error) => console.error(error));
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
			window.location.href = '/mypage/mypage.html';
			console.log('마이페이지로 이동');
		};

		document.querySelector('.cart').onclick = function () {
			window.location.href = '../cart/cart.html';
		};
	}
};
loginCheck();
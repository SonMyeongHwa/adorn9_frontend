//const form = document.getElementById("orderForm");
const orderButton = document.getElementById("orderButton");

const totalPrice = document.querySelectorAll(".total_price");
const ordererInfo = document.querySelector(".orderer-info");
const itemInfo = document.querySelector(".item-info tbody");

const zipcodeButton = document.getElementById("zipcode-button");
const zipcode = document.getElementById("zipcode");
const address1 = document.getElementById("address1");
const address2 = document.getElementById("address2");

//장바구니 상품 Map에 담아서 불러오기
const cartItems = loadCartItems();
let total = 0;
const token = localStorage.getItem('TOKEN');
//주문자 정보 API 연동
//fetch(http://localhost:3000/api/v1/users/profile/?email=이메일) 임시
fetch("http://localhost:3000/api/v1/users/profile?email=test@test.com", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    const { email, name } = data;
    let { phone_number } = data;
    
    ordererInfo.insertAdjacentHTML("beforeend", `
      <div>
        <div class="title"><h3>1. 주문자 정보</h3></div>
        <div class="form-group">
          <label for="name" class="form-label">이름 <span class="required">*</span></label>
          <input type="text" class="form-control" id="name" placeholder="이름" value=${name} />
        </div>
        <div class="form-group">
          <label for="phoneNumber" class="form-label">전화번호 <span class="required">*</span></label>
          <input type="text" class="form-control" id="phoneNumber" placeholder="전화번호" value=${phone_number} maxlength="11" />
        </div>
        <div class="form-group">
          <label for="email" class="form-label">이메일 <span class="required">*</span></label>
          <input type="email" class="form-control" id="email" placeholder="이메일" value=${email} />
        </div>
      </div>`);
  })
  .catch((error) => console.error(error));

//장바구니에서 체크 된 상품만 가져옴
let idList = []; //API요청 할 id 배열
let items = []; //POST 값 보낼 배열
for(const [key, value] of cartItems) {
  if(value.item_checked) {
    idList.push(key);
  }
}

//상품 데이터 API 연동
fetch("http://localhost:3000/api/v1/products/array", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    idlist: idList,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    data.products.forEach((product) => {
      const { _id, name, images, price } = product;
      let quantity = 0;
      
      //localStorage에 해당 ID값이 있으면
      if(cartItems.has(_id)) {
        quantity = cartItems.get(_id).item_quantity; //수량 저장
      }

      let itemPrice = Number(price) * Number(quantity); //상품별 가격
      total += itemPrice;
      itemPrice = itemPrice.toLocaleString('ko-KR');
      items.push({"item": name, "quantity": quantity});
      
      itemInfo.insertAdjacentHTML("beforeend", `
        <tr>
          <td class="col-md-1">
            <img src=${images} alt="">
          </td>
          <td class="col-md-5">${name}</td>
          <td class="col-md-2 count">${quantity}개</td>
          <td class="col-md-2 price"><span class="num">${itemPrice}</span>원</td>
        </tr>
      `);
      pushTotalPrice(); //총 상품금액 값 넣기
    });
  })
  .catch((error) => console.error(error));

//localStorage 가져오기
function loadCartItems() {
  return loadStorage("item"); //localStorage의 key값
}

//localStorage 로드하기
function loadStorage(itemKey) {
  const storage = localStorage.getItem(itemKey);

  //localStorage에 값 여부 확인
  if(storage) {
    return new Map(Object.entries(JSON.parse(storage))); //localStorage값으로 Map 생성
  } else {
    alert("장바구니가 비어있습니다.\n상품을 담은 후 다시 시도해주세요");
    return window.location.href = "../main/main.html"
  }
}

//총 상품금액 값 넣기
function pushTotalPrice() {
  totalPrice.forEach(value => {
    value.innerText = total.toLocaleString('ko-KR');
  })
}

//우편번호 찾기
function postCode(e) {
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
}

zipcodeButton.addEventListener("click", postCode);

orderButton.addEventListener("click", function(e) {
  //조건은 나중에 적용 예정!
  e.preventDefault();
  const name = document.getElementById("name");
  const phoneNumber = document.getElementById("phoneNumber");
  const email = document.getElementById("email");
  const receiverName = document.getElementById("receiverName");
  const receiverPhoneNumber = document.getElementById("receiverPhoneNumber");
  const payment = document.querySelector("input[name='payment']:checked").value;
  let address = `${zipcode.value}||${address1.value}||${address2.value}`;

  fetch("http://localhost:3000/api/v1/orders", {
  method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      name: name.value,
      phoneNumber: phoneNumber.value,
      email: email.value,
      receiverName: receiverName.value,
      address: address,
      receiverPhoneNumber: receiverPhoneNumber.value,
      items: items,
      payment: payment,
      totalPrice: total
    })
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      if(data.status === 201) {
        //결제 완료 한 상품 localStorage에서 삭제
        idList.forEach(id => {
          if(cartItems.has(id)) {
            cartItems.delete(id);
          }
        });
        localStorage.removeItem("item");
        localStorage.setItem("item", JSON.stringify(Object.fromEntries(cartItems)));

        //주문번호 localStorage에 담기
        localStorage.setItem("orderId", data.orderId);

        window.location.href = "../orderComplete/orderComplete.html";
      }
    })
    .catch((error) => console.error(error));
});


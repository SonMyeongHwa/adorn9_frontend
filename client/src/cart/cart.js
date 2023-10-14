const checkAllItem = document.getElementById("checkAllItem");
const deleteChecked = document.getElementById("deleteChecked");
const orderButton = document.getElementById("orderButton");
const cartList = document.querySelector(".table>tbody");
const amounts = document.querySelectorAll(".amount");
let totalAmount = 0; //총 상품 금액

//장바구니 상품 Map에 담아서 불러오기
const cartItems = loadCartItems();

if (cartItems.size === 0) {
  //장바구니가 비어있는 경우
  showEmptyCart();
} else {
  //API요청 할 id 배열
  let idList = Array.from(cartItems.keys());
  
  //상품 데이터 API 연동
  fetch("http://kdt-sw-6-team09.elicecoding.com/api/v1/products/array", {
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
        const { _id, name, price, images } = product;
        let quantity = 0;
        let checked = "";

        //localStorage에 해당 ID값이 있으면
        if(cartItems.has(_id)) {
          quantity = cartItems.get(_id).item_quantity; //수량 저장
          checked = cartItems.get(_id).item_checked ? "checked" : ""; //체크 여부
        }

        let itemPrice = (Number(price) * Number(quantity)).toLocaleString('ko-KR'); //상품별 가격
        
        cartList.insertAdjacentHTML("beforeend", `
          <tr>
            <td class="td-top">
              <input class="form-check-input check" type="checkbox" ${checked}>
            </td>
            <td class="col-md-1">
              <img src="${images}" alt="">
            </td>
            <td class="col-md-6">
              ${name}
              <input type="hidden" class="id" value="${_id}"/>
            </td>
            <td class="col-md-2 count">
              <div class="cell item-count">
                <div class="count-area">
                  <button id="minusButton_${_id}">-</button>
                  <div id="quantity_${_id}">${quantity}</div>
                  <button id="plusButton_${_id}">+</button>
                </div>
              </div>
            </td>
            <td class="col-md-2 price">
              <span class="num">${itemPrice}</span>원
              <input type="hidden" value="${price}" />
            </td>
            <td class="td-top">
              <i id="remove_${_id}" class="fa-solid fa-xmark delete-btn"></i>
            </td>
          </tr>
        `);
        calculateAmount(); //총 상품금액 계산
        checkBoxEvent(); //체크박스 이벤트
        setChecekdAllItemBox(); //전체선택 체크박스 체크여부 변경
        quantityEvent(_id, price); //수량 변경 이벤트

        //행 삭제
        document.getElementById(`remove_${_id}`).addEventListener("click", function() {
          removeColumn(this, _id);
        });
      });
    })
    .catch((error) => console.log(error));
}

//체크박스 이벤트
function checkBoxEvent() {
  const checkboxes = document.querySelectorAll(".check");
  //상품 전체선택
  checkAllItem.addEventListener("click", function () {
    const isChecked = checkAllItem.checked; //전체선택 체크여부
    checkboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
    
    setCheckedAllCartItems(cartItems, isChecked); //localStorage 체크여부 변경(All)
    getCountItems();//장바구니 상품 개수 확인
  });

  //하나라도 선택해제 될 경우 전체선택 체크 해제
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", function () {
      const itemId = checkbox.closest("tr").querySelector(".id").value;

      setChecekdAllItemBox(); //전체선택 체크박스 체크여부 변경
      setCheckedCartItem(cartItems, itemId, checkbox.checked); //localStorage 체크여부 변경
      getCountItems();//장바구니 상품 개수 확인
    });
  });
}

//수량 변경 이벤트
function quantityEvent(id, price) {
  const itemQuantity = document.getElementById(`quantity_${id}`);
  //수량 마이너스
  document.getElementById(`minusButton_${id}`).addEventListener("click", function(e) {
    e.preventDefault();
    getQuantitiy(this, "minus", itemQuantity, price);
    pushLocalStorage(cartItems, `${id}`, itemQuantity.innerText);
  });

  //수량 플러스
  document.getElementById(`plusButton_${id}`).addEventListener("click", function(e) {
    e.preventDefault();
    getQuantitiy(this, "plus", itemQuantity, price);
    pushLocalStorage(cartItems, `${id}`, itemQuantity.innerText);
  });
}

//수량 변경
function getQuantitiy(ele, type, itemQuantity, price) {
  //return값이 없으면 수량은 1 (최소 수량은 1이기 때문)
  itemQuantity.innerText = calculateQuantity(type, itemQuantity.innerText) || 1;
  calculateColumn(ele, price, itemQuantity.innerText);
}

//수량 계산
function calculateQuantity(type, itemQuantity) {
  if (type === "plus") {
    //더하기
    return Number(itemQuantity) + 1;
  } else {
    //빼기
    if (itemQuantity > 1) {
      return Number(itemQuantity) - 1;
    }
  }
}

//수량 변경 시 localStorage
function pushLocalStorage(cartItemMap, id, quantity) {
  //해당 상품의 수량을 변경하여 Map에 저장
  cartItemMap.get(id).item_quantity = Number(quantity);

  saveCartItems(cartItemMap);
}

//행 상품 계산
function calculateColumn(ele, price, itemQuantity) {
  let itemPrice = ele.closest("tr").querySelector(".num");
  let total = Number(price) * Number(itemQuantity);
  itemPrice.innerText = total.toLocaleString("ko-KR");

  calculateAmount();
}

//장바구니 상품 개수 확인
function getCountItems() {
  const itemLength = document.querySelectorAll(".table>tbody>tr").length;

  if(itemLength === 0) { //장바구니가 비어있는 경우
    showEmptyCart();
  }
  calculateAmount();//총 상품금액 계산
}

//장바구니 비어있을 때 문구
function showEmptyCart() {
  cartList.insertAdjacentHTML("beforeend",`
    <tr class="empty-cart"><td colspan="6">장바구니에 담긴 상품이 없습니다.</td></tr>
  `);
}

//행 삭제(localStorage, 화면)
function removeColumn(ele, id) {
  const itemColumn = ele.closest("tr");
  clearItemData(id, itemColumn); //상품 삭제(localStorage, 화면)
  getCountItems(); //장바구니 상품 개수 확인
}

//상품 삭제(localStorage, 화면)
function clearItemData(id, itemColumn) {
  deleteCartItem(cartItems, id); //localStorage 삭제
  cartList.removeChild(itemColumn); //화면 삭제
}

//총 상품 금액 계산
function calculateAmount() {
  const checkedItem = document.querySelectorAll(".check:checked");

  //금액 콤마 제거 후 계산
  checkedItem.forEach((item) => {
    let amount = item.closest("tr").querySelector(".num");
    totalAmount += Number(amount.innerText.split(",").join(""));
  });

  //금액 콤마 삽입
  amounts.forEach((amount) => {
    amount.innerText = totalAmount.toLocaleString("ko-KR");
  });

  totalAmount = 0; //값 초기화
}

//선택삭제
deleteChecked.addEventListener("click", function() {
  const checkedCount = document.querySelectorAll(".check:checked").length;

  if(checkedCount > 0) {
    if(confirm("선택하신 상품을 삭제하시겠습니까?")) {
      const checkedItems = document.querySelectorAll(".check:checked");

      //선택한 상품 삭제(화면, localStorage)
      checkedItems.forEach((checkedItem) => {
        //closest : 기준 element에서 가장 가깝게 조건에 만족하는 부모 요소가 반환
        const itemColumn = checkedItem.closest("tr");
        const _id = itemColumn.querySelector(".id").value;

        clearItemData(_id, itemColumn); //상품 삭제(localStorage, 화면)
      });
      getCountItems(); //장바구니 상품 개수 확인
    }
  }
});

//장바구니 상품 localStorage에 삭제 후 넣기
function saveStorage(itemKey, itemMap) {
  localStorage.removeItem(itemKey);
  localStorage.setItem(itemKey, JSON.stringify(Object.fromEntries(itemMap)));
}

//장바구니 상품 넣기 (localStorage)
function saveCartItems(cartItemMap) {
  saveStorage("item", cartItemMap);
}

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
    return new Map(); //빈 Map 생성
  }
}

//Map에서 삭제 상품 delete
function deleteCartItem(cartItemMap, id) {
  //Map에 상품 삭제
  if(cartItemMap.has(id)) {
    cartItemMap.delete(id);
  }
  saveCartItems(cartItemMap);  //장바구니 상품 넣기
}

//상품 전체선택 체크박스(localStorage)
function setCheckedAllCartItems(cartItemMap, checked) {
  for(let value of cartItemMap.values()) {
    value.item_checked = checked;
  }

  saveCartItems(cartItemMap); //장바구니 상품 넣기
}

//전체선택 체크박스 체크여부 변경
function setChecekdAllItemBox() {
  const checkboxes = document.querySelectorAll(".check");
  const totalCount = checkboxes.length; //전체 체크박스 개수
  const checkedCount = document.querySelectorAll(".check:checked").length; //체크 된 체크박스 개수
  
  if (totalCount === checkedCount) {
    checkAllItem.checked = true;
  } else {
    checkAllItem.checked = false;
  }
}

 //localStorage 체크여부 변경
function setCheckedCartItem(cartItemMap, id, checked) {
  //Map에 체크여부 변경
  if(cartItemMap.has(id)) {
    cartItemMap.get(id).item_checked = checked;
  }

  saveCartItems(cartItemMap); //장바구니 상품 넣기
}

//주문하기
orderButton.addEventListener("click", function() {
  const checkedCount = document.querySelectorAll(".check:checked").length;

  if(checkedCount < 1) {
    alert("상품을 선택해주세요");
  } else {
    if (!token) {
      alert("로그인 후 결제가능합니다.\n로그인 페이지로 이동합니다.");
      console.log('사용자는 로그아웃 상태입니다.');
      window.location.href = '../login/login.html';
    } else {
      //결제하기 페이지로 이동
      window.location.href = "../order/order.html";
    }
  }
});

const token = localStorage.getItem('TOKEN');
const loginCheck = () => {
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
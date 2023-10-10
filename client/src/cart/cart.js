const cartList = document.querySelector(".table>tbody");
const checkAllItem = document.querySelector("#checkAllItem");
const amount = document.querySelector(".amount");

//임시데이터
/* const basket = [];
basket.push({"name":"ring", "price":"980000", "images":"https://kr.danielwellington.com/cdn/shop/products/8a9c5171ee25ab487b44fffeb940c629b636e9aa.png?v=1688635680", "quantity":1});
basket.push({"name":"earring", "price":"2500000", "images":"https://i.ibb.co/x3Zfgh0/57de0b9c-8ae7-4352-81c9-62d4070c5afe.jpg", "quantity":1});
*/

//장바구니 상품 불러오기
let cartItems = JSON.parse(localStorage.getItem("item")) || [];

if (cartItems.length === 0) {
  //장바구니가 비어있는 경우
  cartList.insertAdjacentHTML(
    "beforeend",
    `<tr class="empty-cart"><td colspan="6">장바구니에 담긴 상품이 없습니다.</td></tr>`
  );
} else {
  //상품 수 만큼 반복
  cartItems.forEach((cartItem) => {
    const { name, price, images, quantity } = cartItem;

    cartList.insertAdjacentHTML(
      "beforeend",
      `
      <tr>
        <td class="td-top">
          <input class="form-check-input check" type="checkbox" checked>
        </td>
        <td class="col-md-1">
          <a href="">
            <img src="${images}" alt="">
          </a>
        </td>
        <td class="col-md-6">
          <a href="">${name}</a>
        </td>
        <td class="col-md-2 count">
          <div class="cell item-count">
            <div class="count-area">
              <button class="minus-btn">-</button>
              <div class="quantity">${quantity}</div>
              <button class="plus-btn">+</button>
            </div>
          </div>
        </td>
        <td class="col-md-2 price"><span class="num">${price}</span>원</td>
        <td class="td-top">
          <button class="delete-btn">X</button>
        </td>
      </tr> `
    );
  });
}

const checkboxes = document.querySelectorAll(".check");
//상품 전체선택
checkAllItem.addEventListener("click", function () {
  const isChecked = checkAllItem.checked; //전체선택 체크여부

  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = isChecked;
  }
});

//하나라도 선택해제 될 경우 전체선택 체크 해제
for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("click", function () {
    const totalCount = checkboxes.length; //전체 체크박스 개수
    const checkedCount = document.querySelectorAll(".check:checked").length; //체크 된 체크박스 개수

    if (totalCount === checkedCount) {
      checkAllItem.checked = true;
    } else {
      checkAllItem.checked = false;
    }
  });
}


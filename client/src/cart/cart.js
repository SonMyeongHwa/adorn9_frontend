const checkAllItem = document.getElementById("checkAllItem");
const deleteChecked = document.getElementById("deleteChecked");
const cartList = document.querySelector(".table>tbody");
const amount = document.querySelector(".amount");
let basket = []; //localStorage 데이터 담는 배열

//임시데이터
/* const basket = [];
basket.push({"id":"651d969894add99a91a41063", "name":"엘리베이션 링", "price":"980000", "images":"https://kr.danielwellington.com/cdn/shop/products/8a9c5171ee25ab487b44fffeb940c629b636e9aa.png?v=1688635680", "quantity":1});
basket.push({"id":"6523d10be0d3489018d06b0c", "name":"Opulent Pearl Horizon", "price":"2700000", "images":"https://i.ibb.co/YpHSvXs/956becfe-dec7-486e-9e51-182d52e94dfd.jpg", "quantity":1});
localStorage.setItem("item", JSON.stringify(basket));
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
    const { id, name, price, images, quantity } = cartItem;

    cartList.insertAdjacentHTML(
      "beforeend",
      `
      <tr>
        <td class="td-top">
          <input class="form-check-input check" type="checkbox" checked>
        </td>
        <td class="col-md-1">
          <img src="${images}" alt="">
        </td>
        <td class="col-md-6">
          ${name}
          <input type="hidden" class="id" value="${id}"/>
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

//선택 상품 삭제
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

        //localStorage (값 삭제 후 저장)
        basket = JSON.parse(localStorage.getItem("item")).filter(param => param.id !== _id);
        localStorage.clear();
        localStorage.setItem("item", JSON.stringify(basket));

        //화면
        cartList.removeChild(itemColumn);
      });
    }
  }
});
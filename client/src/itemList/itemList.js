const categoryTitle = document.querySelector(".categoryTitle");
const itemList = document.querySelector(".item-list");

//fetch("http://localhost:3000/api/v1/products/categories/카테고리") 임시
fetch("http://localhost:3000/api/v1/products/categories/necklace")
  .then((response) => response.json())
  .then((data) => {
    //카테고리 별 상품 리스트
    data.categoryProducts.forEach(ele => {
      const price = ele.price.toLocaleString('ko-KR'); //상품 금액 콤마 삽입
      
      itemList.insertAdjacentHTML("beforeend", `
        <div class="item-content">
          <div class="image">
            <a href=""><img src="${ele.images}" alt=""></a>
            <button id="cart_${ele._id}" class="cart-button btn btn-primary btn-lg">장바구니</button>
          </div>
          <a href="">
            <div class="description">
              <div class="name">${ele.name}</div>
              <div class="price">${price}원</div>
            </div>
          </a>
        </div>`);

      //장바구니 담기
      document.getElementById(`cart_${ele._id}`).addEventListener("click", function() {
        pushCart(`${ele._id}`, `${ele.name}`, `${ele.price}`, `${ele.images}`);
      });
  })})
  .catch((error) => console.log(error));

//장바구니 담기(localStorage)
function pushCart(id, name, price, images) {
  try {
    const storage = JSON.parse(localStorage.getItem("item")) || [];
    const filterStorage = storage.filter(param => param.id === id); //장바구니에 지금 담은 상품이 있는지
    let quantity = 1; //상품 수량
    let basket = [];

    //장바구니가 비어있지 않은 경우(=localStorage에 값이 있음)
    if(storage.length !== 0 && filterStorage.length > 0) {
      //해당 상품의 수량을 변경하여 basket에 저장
      basket = storage.map((item) => item.id === id ? { ...item, quantity: filterStorage[0].quantity + 1} : item);

      localStorage.removeItem("item"); //기존 장바구니 localStorage 삭제
    } else {
      //basket에 기존 localStorage 넣기
      basket = storage;
      //해당 상품 객체 생성
      let itemObject = {
        id: id,
        name: name,
        price: price,
        images: images,
        quantity: quantity,
        checked: "checked",
      };
      
      basket.push(itemObject); //생성한 객체를 basket 배열에 push
    }

    localStorage.setItem("item", JSON.stringify(basket)); //localStorage에 basket 넣기

    alert("장바구니에 상품을 담았습니다!");
  } catch (error) {
    alert("장바구니 담기에 실패했습니다.");
  }
}
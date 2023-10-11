const categoryTitle = document.querySelector(".categoryTitle");
const itemList = document.querySelector(".item-list");
let basket = []; //localStorage 담을 배열

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
        const storage = JSON.parse(localStorage.getItem("item"));
        let quantity = 1; //상품 수량

        //장바구니가 비어있지 않은 경우(=localStorage에 값이 있음)
        if(storage !== null) {
          //장바구니에 지금 담은 상품이 있는지
          const filterStorage = storage.filter(param => param.id === `${ele._id}`);
          //지금 담은 상품 이외의 상품들을 basket 배열에 넣음
          basket = storage.filter(param => param.id !== `${ele._id}`);

          //장바구니에 해당 상품이 있는 경우
          if(filterStorage.length > 0) {
            quantity = filterStorage[0].quantity + 1; //해당 상품의 수량 + 1

            localStorage.removeItem("item"); //기존 장바구니 localStorage 삭제
          }
        }

        //해당 상품 객체 생성
        let itemObject = {
          id: `${ele._id}`,
          name: `${ele.name}`,
          price: `${ele.price}`,
          images: `${ele.images}`,
          quantity: quantity,
        };
        
        basket.push(itemObject); //생성한 객체를 basket 배열에 push
        localStorage.setItem("item", JSON.stringify(basket)); //localStorage에 basket 넣기
        basket = []; //basket 배열 초기화
      });
  })})
  .catch((error) => console.log(error));
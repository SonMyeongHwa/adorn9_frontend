const categoryTitle = document.querySelector(".categoryTitle");
const itemList = document.querySelector(".item-list");

//fetch("http://localhost:3000/api/v1/products/categories/카테고리") 임시
fetch("http://localhost:3000/api/v1/products/categories/necklace")
  .then((response) => response.json())
  .then((data) => {
    //카테고리 별 상품 리스트
    data.categoryProducts.forEach(ele => {
      itemList.insertAdjacentHTML("beforeend", `
        <div class="item-content">
          <div class="image">
            <a href=""><img src="${ele.images}" alt=""></a>
            <button class="cart-button btn btn-primary btn-lg">장바구니</button>
          </div>
          <a href="">
            <div class="description">
              <div class="name">${ele.name}</div>
              <div class="price">${ele.price}</div>
            </div>
          </a>
        </div>`);
  })})
  .catch((error) => console.log(error));
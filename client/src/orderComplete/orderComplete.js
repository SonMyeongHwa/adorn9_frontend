const title = document.querySelector(".message>.title")
const info = document.querySelector(".info");

//fetch("http://localhost:3000/api/v1/orders/주문번호") 일단 임시로 넣음
fetch("http://localhost:3000/api/v1/orders/651d99775661a2cbc3442614")
  .then((response) => response.json())
  .then((data) => {
    let { _id, total_price, user_name, address, phone_number, createdAt } = data.order;

    total_price = total_price.toLocaleString('ko-KR');
    phone_number = phone_number.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    createdAt = createdAt.substring(0, createdAt.indexOf(".")).replace("T", " ");

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
              <td>${user_name} / ${phone_number}</td>
            </tr>
            <tr>
              <td class="col-md-2">배송지</td>
              <td>${address}</td>
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
              <td>${user_name} / ${phone_number}</td>
            </tr>
            <tr>
              <td class="col-md-2">이메일</td>
              <td>hong123@gmail.com</td>
            </tr>
            <tr>
                <td class="col-md-2">결제일</td>
                <td>${createdAt}</td>
              </tr>
            <tr>
              <td class="col-md-2">결제수단</td>
              <td>무통장입금</td>
            </tr>
            <tr>
              <td class="col-md-2">결제금액</td>
              <td>${total_price}원</td>
            </tr>
          </tbody>
        </table>
      </div>
    `);
    
  })
  .then((error) => console.log(error));
const categoryTitle = document.querySelector('.categoryTitle');
const itemList = document.querySelector('.item-list');
const receivedData = location.href.split('?category=')[1]; //카테고리명 받아오기

fetch(`http://kdt-sw-6-team09.elicecoding.com/api/v1/products/categories/${receivedData}`)
	.then((response) => response.json())
	.then((data) => {
		//장바구니 상품 Map에 담아서 불러오기
		const cartItems = loadCartItems();

		//카테고리 별 상품 리스트
		data.categoryProducts.forEach((ele) => {
			const price = ele.price.toLocaleString('ko-KR'); //상품 금액 콤마 삽입

			categoryTitle.innerText = receivedData;

			itemList.insertAdjacentHTML(
				'beforeend',
				`
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
        </div>`,
			);

			//장바구니 담기
			document
				.getElementById(`cart_${ele._id}`)
				.addEventListener('click', function () {
					pushCart(`${ele._id}`, cartItems);
				});
		});
	})
	.catch((error) => console.log(error));

//장바구니 담기(localStorage)
function pushCart(id, cartItemMap) {
	try {
		let quantity = 1; //상품 수량
		let pushText = '';

		//장바구니에 지금 담은 상품이 있는지
		if (cartItemMap.has(id)) {
			quantity += cartItemMap.get(id).item_quantity; //수량 저장
			pushText = '\n이미 담은 상품의 수량을 추가했습니다.';
		}

		//해당 상품의 수량을 변경하여 저장
		addCartItemById(cartItemMap, id, quantity);

		alert('장바구니에 상품을 담았습니다!' + pushText);
	} catch (error) {
		alert('장바구니 담기에 실패했습니다.');
		console.log(error);
	}
}

//localStorage 가져오기
function loadCartItems() {
	return loadStorage('item'); //localStorage의 key값
}

//localStorage 로드하기
function loadStorage(itemKey) {
	const storage = localStorage.getItem(itemKey);

	//localStorage에 값 여부 확인
	if (storage) {
		return new Map(Object.entries(JSON.parse(storage))); //localStorage값으로 Map 생성
	} else {
		return new Map(); //빈 Map 생성
	}
}

//장바구니에 상품 담기(정보)
function addCartItemById(cartItemMap, id, quantity) {
	addCartItem(cartItemMap, id, quantity, true);
}

//장바구니에 상품 담기(localStorag 값)
function addCartItem(cartItemMap, id, quantity, checked) {
	addCartItemByObject(cartItemMap, {
		item_id: id,
		item_quantity: quantity,
		item_checked: checked,
	});
}

//장바구니에 상품 담기(Map, localStorage)
function addCartItemByObject(cartItemMap, cartItem) {
	cartItemMap.set(cartItem.item_id, cartItem);

	saveCartItems(cartItemMap);
}

//장바구니 상품 넣기 (localStorage)
function saveCartItems(cartItemMap) {
	saveStorage('item', cartItemMap);
}

//장바구니 상품 localStorage에 삭제 후 넣기
function saveStorage(itemKey, itemMap) {
	localStorage.removeItem(itemKey);
	localStorage.setItem(itemKey, JSON.stringify(Object.fromEntries(itemMap)));
}

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
			window.location.href = '/main/main.html';
		};

		document.querySelector(
			'.login',
		).innerHTML = `<li class='mypage'>마이페이지</li>`;
		document.querySelector('.login').onclick = function () {
			window.location.href = '/mypage/mypage.html';
			console.log('마이페이지로 이동');
		};

		document.querySelector('.cart').onclick = function () {
			window.location.href = '/cart/cart.html';
		};
	}
};
loginCheck();

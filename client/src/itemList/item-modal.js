function setModalContent({ image, title, price }) {
	const imgEl = document.querySelector('.detail-image img');
	const titleEl = document.querySelector('.detail-top-title a');
	const topPrice = document.querySelector('.detail-top-price p b');
	const priceEl = document.querySelector('.detail-top-sum-price .priceSum');

	imgEl.src = image;
	titleEl.textContent = title;
	topPrice.textContent = price;
	priceEl.textContent = price;
}
let currentProductId;
function showModalOnClick(event) {
	const clickedButton = event.target;
	// const parentDiv = clickedButton.parentElement;
	// console.log(clickedButton);
	// console.log(parentDiv);
	// 이미지가 속한 .item-content 요소 찾기
	const itemContentDiv = clickedButton.closest('.item-content');

	// .description 안의 .name과 .price 정보 찾기
	const title = itemContentDiv.querySelector('.description .name').textContent;
	const price = itemContentDiv.querySelector('.description .price').textContent;
	const fullId = itemContentDiv.querySelector('.cart-button').id;
	const productId = fullId.replace('cart_', '');
	// console.log(productId);
	currentProductId = productId;
	const data = {
		image: clickedButton.getAttribute('src'),
		title: title,
		price: price,
	};

	// const data = {
	// 	image: clickedButton.getAttribute('src'),
	// 	title: parentDiv.getAttribute('data-title'),
	// 	price: parentDiv.getAttribute('data-price'),
	// };

	//수량 초기화 함수
	function resetQuantity() {
		const inputEl = document.querySelector('.form-amount--input.orderQty');
		inputEl.value = 1;
	}

	setModalContent(data);

	// 여기에 수량 초기화 코드 추가
	resetQuantity();

	const modalEl = document.querySelector('.pop-layer');
	const overlayEl = document.querySelector('.overlay');
	modalEl.style.display = 'block';
	overlayEl.style.display = 'block';
}

const createModal = () => {
	const modal = `
	<div class="main-content overlay"></div>
	<div class="pop-layer popup-product-detail-container">
	<div class="popup-content-header">
		<p class="header-popup-title"></p>
		<button class="header-popup-close-btn">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="24"
				height="24"
			>
				<path
					d="M5.72 5.72a.75.75 0 0 1 1.06 0L12 10.94l5.22-5.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L13.06 12l5.22 5.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L12 13.06l-5.22 5.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L10.94 12 5.72 6.78a.75.75 0 0 1 0-1.06Z"
				></path>
			</svg>
		</button>
	</div>
	<div class="popup-content-body-layer">
		<!-- <link rel="stylesheet" href="" />
				<script src=""></script> -->
		<!-- 모달에 적용해아할 스크립트 및 스타일 시트 -->
		<div class="detail-info">
			<div class="popup-product-detail-wrap">
				<!-- 상단 -->
				<div class="detail-container">
					<div class="detail-top grid">
						<!-- left box -->
						<div class="detail-top-leftbox grid-5">
							<div class="detail-image">
								<!-- width : 558px -->
								<img
									src=""
									alt=""
								/>
							</div>
						</div>

						<!-- right box -->
						<div class="detail-top-right-box grid-7">
							<!-- 시즌 뱃지 -->
							<ul class="siv-badge">
								<li class="siv-badge-item siv-badge-item--gold-line">23 F/W</li>
							</ul>

							<!-- 상세페이지 타이틀 -->
							<div class="detail-top-title">
								<p class="title">
									<a href="">silver ring</a>
								</p>
							</div>

							<div class="detail-top-price">
								<p class="original"><b>3,290,000</b><span>원</span></p>
							</div>

							<table class="detail-top-info">
								<tbody>
									<tr>
										<th class="padding-bottom">배송비</th>
										<td class="padding-bottom">
											<p class="detail-top-info-delivery-free">무료</p>
										</td>
									</tr>
									<tr>
										<th>수량</th>
										<td class="detail-top-info-amount">
											<div class="form-amount">
												<button
													class="form-amount--btn form-amount--btn--minus minus"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
														width="24"
														height="24"
													>
														<path
															d="M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Z"
														></path>
													</svg>
												</button>
												<input
													type="text"
													class="form-amount--input orderQty"
													name="orderQty"
													value="1"
													data-divi=""
													data-sale_poss_qty="1"
													data-ord_poss_min_qty="1"
													data-ord_poss_max_qty="0"
													maxlength="2"
													title="수량입력"
												/>
												<button
													class="form-amount--btn form-amount--btn--plus plus"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
														width="24"
														height="24"
													>
														<path
															d="M11.75 4.5a.75.75 0 0 1 .75.75V11h5.75a.75.75 0 0 1 0 1.5H12.5v5.75a.75.75 0 0 1-1.5 0V12.5H5.25a.75.75 0 0 1 0-1.5H11V5.25a.75.75 0 0 1 .75-.75Z"
														></path>
													</svg>
												</button>
											</div>
										</td>
									</tr>
								</tbody>
							</table>

							<!-- 판매가 -->
							<div class="detail-top-sum">
								<p class="detail-top-sum-title">판매가</p>
								<p class="detail-top-sum-price">
									<span class="priceSum" data-cust-price="3290000"
										>3,290,000</span
									>
									원
								</p>
							</div>

							<!-- 주문관리 관련 처리 -->
							<div class="detail-buy-btn">
								<button
									class="btn-wide btnCart btn-mazenta"
									onclick=""
									style="display: block"
									data-cart_divi_cd="10"
								>
									장바구니
								</button>
								<button
									class="btn-wide btnImmediateOrd btn-mazenta2"
									onclick=""
									style="display: block"
									data-cart_divi_cd="20"
								>
									바로 구매
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>`;

	const bodyEl = document.getElementsByTagName('body')[0];
	const div = document.createElement('div');
	div.innerHTML = modal;
	bodyEl.appendChild(div);

	const closeButton = document.querySelector('.header-popup-close-btn');
	closeButton.addEventListener('click', () => {
		const modalEl = document.querySelector('.pop-layer');
		const overlayEl = document.querySelector('.overlay');
		modalEl.style.display = 'none';
		overlayEl.style.display = 'none';
	});

	function updateQuantity(increase = true) {
		const inputEl = document.querySelector('.form-amount--input.orderQty');
		const originalPriceEl = document.querySelector('.detail-top-price p b');
		const sumPriceEl = document.querySelector(
			'.detail-top-sum-price .priceSum',
		);

		let quantity = parseInt(inputEl.value, 10);
		const originalPrice = parseInt(
			originalPriceEl.textContent.replace(/,/g, ''),
			10,
		);

		if (increase) {
			if (quantity < 10) {
				// 10 이하일 때만 증가
				quantity += 1;
			}
		} else if (quantity > 1) {
			quantity -= 1;
		}

		inputEl.value = quantity;

		// 가격 계산 후 sumPriceEl에 반영
		const newSumPrice = originalPrice * quantity;
		sumPriceEl.textContent = newSumPrice.toLocaleString('ko-KR');
	}

	// 수량 증가 버튼 이벤트 리스너 추가
	const increaseButton = document.querySelector('.form-amount--btn--plus');
	increaseButton.addEventListener('click', () => updateQuantity(true));

	// 수량 감소 버튼 이벤트 리스너 추가
	const decreaseButton = document.querySelector('.form-amount--btn--minus');
	decreaseButton.addEventListener('click', () => updateQuantity(false));

	// const addToCart = (product) => {

	// 	if (item['item ' + product.id]) {
	// 		// 이미 있는 상품의 수량을 증가
	// 		item['item ' + product.id].item_quantity += product.quantity;
	// 	} else {
	// 		// 새 상품을 장바구니에 추가
	// 		item['item ' + product.id] = {
	// 			item_id: product.id,
	// 			item_quantity: product.quantity,
	// 			item_checked: true,
	// 		};
	// 	}

	// 	// 장바구니 데이터를 다시 로컬스토리지에 저장
	// 	localStorage.setItem('item', JSON.stringify(item));
	// };

	let cartItems = loadCartItems();

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

	const cartBtn = document.querySelector('.btnCart');
	cartBtn.addEventListener('click', function () {
		cartItems = loadCartItems();
		pushCart(currentProductId, cartItems);
	});

	//장바구니 담기(localStorage)
	function pushCart(id, cartItemMap) {
		try {
			let quantity = parseInt(
				document.querySelector('.form-amount--input.orderQty').value,
				10,
			);

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
	// 	cartBtn.addEventListener('click', () => {
	//     //장바구니 상품 Map에 담아서 불러오기
	// 		console.log('장바구니 버튼 클릭');
	// 		const product = {
	// 			id: currentProductId, // 여기를 실제 상품ID로 변경해야 합니다.
	// 			title: document.querySelector('.detail-top-title a').textContent,
	// 			price: parseInt(
	// 				document
	// 					.querySelector('.detail-top-price p b')
	// 					.textContent.replace(/,/g, ''),
	// 				10,
	// 			),
	// 			quantity: parseInt(
	// 				document.querySelector('.form-amount--input.orderQty').value,
	// 				10,
	// 			),
	// 		};

	// 		addToCart(product);
	// 		console.log('장바구니에 상품이 추가되었습니다.');
	// 	});
};

document.addEventListener('DOMContentLoaded', function () {
	createModal();

	const itemList = document.querySelector('.item-list');

	// item-list에 이벤트 위임을 통한 이벤트 리스너 바인딩
	itemList.addEventListener('click', function (event) {
		const target = event.target;

		showModalOnClick(event);
	});
});

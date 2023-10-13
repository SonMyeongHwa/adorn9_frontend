export default {
	fetch,
};

fetch('http://localhost:3000/api/v1/products/main/feeds')
	.then((response) => response.json())
	.then((data) => {
		const imgElements = document.querySelectorAll(
			'.silde-items-wrapper li a img',
		);
		const prevClones = document.querySelectorAll(
			'.silde-items-wrapper .prevClone img',
		);
		const nextClones = document.querySelectorAll(
			'.silde-items-wrapper .nextClone img',
		);

		for (let i = 0; i < imgElements.length; i++) {
			const feedIndex = i % data.feeds.length;
			// console.log(feedIndex);

			// imgElements에 이미지 URL 설정
			if (imgElements[i]) {
				imgElements[i].src = data.feeds[feedIndex].image_url;
			}

			if (prevClones[i]) {
				prevClones[i].src = data.feeds[feedIndex].image_url;
				nextClones[i].src = data.feeds[feedIndex].image_url;
			}
		}
	})
	.catch((error) => console.log(error));

// main-new-edtion api
// API에서 상품 데이터를 가져오는 함수
function fetchProductData() {
	return fetch('http://localhost:3000/api/v1/products/main/new-products')
		.then((response) => response.json())
		.then((data) => data.newProducts)
		.catch((error) => console.error('Error:', error));
}
// 상품 데이터를 사용하여 HTML을 수정하는 함수
function updateProductData() {
	fetchProductData().then((products) => {
		const itemContents = document.querySelectorAll('.item-content');

		products.forEach((product, index) => {
			if (itemContents[index]) {
				const img = itemContents[index].querySelector('img');
				const productName = itemContents[index].querySelector('.name');
				const productPrice = itemContents[index].querySelector('.price');
				// const cartButton = itemContents[index].querySelector('.show-modal-btn'); // 각 item-content 내부의 장바구니 버튼을 선택합니다.

				img.src = product.images;
				productName.textContent = product.name;
				productPrice.textContent = product.price.toLocaleString() + '원';

				// 여기서 data-* 속성을 설정합니다.
				img.setAttribute('data-image', product.images);
				img.setAttribute('data-title', product.name);
				img.setAttribute('data-price', product.price.toLocaleString());

				// 이미지에 호버 이벤트 추가
				img.addEventListener('mouseover', function () {
					const descriptionTag = document.querySelector('.thumb-bnner p');
					const formattedDescription = product.detail.replace(/\./g, '.<br>'); // '.'을 '.<br>'로 바꿉니다.
					descriptionTag.innerHTML = formattedDescription; // innerHTML을 사용하여 개행을 적용합니다.
				});
			}
		});
	});
}
// 페이지 로드 시 상품 데이터를 업데이트
window.onload = updateProductData;

// 카테고리 상품 api
// fetch('http://localhost:3000/api/v1/categories').then((response) =>
// 	response.json(),
// );
// .then((date) => console.log(date.categories));

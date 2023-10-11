export const loginCheck = () => {
	const token = sessionStorage.getItem('token');
	if (!token) {
		createLogoutNav();
		alert('로그인 시 이용 가능합니다');
		// 현재 페이지의 url 주소 추출하기
		const pathname = window.location.pathname;
		const search = window.location.search;

		// 로그인 후 다시 지금 페이지로 자동으로 돌아가도록 하기 위한 준비작업임.
		window.location.replace(`/login?previouspage=${pathname + search}`);
	} else {
		createLoginNav();
	}
};

// nav 생성
let navbar = document.getElementById('nav');

// 로그인 상태
export const createLoginNav = navbar.insertAdjacentHTML(
	'beforeend',
	`<div class="nav-wrap">
				<ul class="categories-wrap">
					<a href=""> <li>Necklace</li> </a
					><a href=""> <li>Earrings</li> </a
					><a href=""> <li>Bracelet</li> </a
					><a href=""> <li>Ring</li> </a
					><a href="">
						<li>Sunglasses</li>
					</a>
				</ul>
				<a class="logo-wrap" href="">
					<img src="../assets/imgs/logo/ADORN9_LOGO.png" alt="" />
				</a>
				<ul class="utils">
					<li class="login">로그아웃</li>
					<li class="my-page">마이페이지</li>
					<li class="cart">장바구니</li>
				</ul>
			</div>`,
);

// 로그아웃 상태
export const createLogoutNav = navbar.insertAdjacentHTML(
	'beforeend',
	`<div class="nav-wrap">
				<ul class="categories-wrap">
					<a href=""> <li>Necklace</li> </a
					><a href=""> <li>Earrings</li> </a
					><a href=""> <li>Bracelet</li> </a
					><a href=""> <li>Ring</li> </a
					><a href="">
						<li>Sunglasses</li>
					</a>
				</ul>
				<a class="logo-wrap" href="">
					<img src="../assets/imgs/logo/ADORN9_LOGO.png" alt="" />
				</a>
				<ul class="utils">
					<li class="login">로그인</li>
					// <li class="my-page">마이페이지</li>
					<li class="cart">장바구니</li>
				</ul>
			</div>`,
);

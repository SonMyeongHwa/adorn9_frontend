export const loginCheck = () => {
	const token = localStorage.getItem('TOKEN');
	if (!token || token === undefined || token === null) {
		console.log('사용자는 로그아웃 상태입니다.');
		createLogoutNav();
	} else {
		console.log('사용자는 로그인 상태입니다.');
		createLoginNav();
	}
};

// nav 생성
let navbar = document.getElementById('nav');

// 로그인 상태
export const createLoginNav = () => {
	navbar.insertAdjacentHTML(
		'beforeend',
		`<div class="nav-wrap">
		<ul class="categories-wrap">
			<a href=""> <button>Necklace</button> </a
			><a href=""> <button>Earrings</button> </a
			><a href=""> <button>Bracelet</button> </a
			><a href=""> <button>Ring</button> </a
			><a href="">
				<button>Sunglasses</button>
			</a>
		</ul>
		<a class="logo-wrap" href="">
			<img src="../assets/imgs/logo/ADORN9_LOGO.png" alt="" />
		</a>
		<ul class="utils">
			<button class="logout">로그아웃</button>
			<button class="my-page">마이페이지</button>
			<button class="cart">장바구니</button>
		</ul>
	</div>`,
	);

	// // 추가한 요소를 선택 후 클릭 이벤트 부착
	// const logoutBtn = document.querySelector('.logout');
	// logoutBtn.addEventListener('click', handleLogout);
	// // loginBtn.addEventListener('click', (e) => {
	// // 	window.location = '../src/login/login.html';
	// // });
};

// 로그아웃 로직
export const handleLogout = () => {
	localStorage.removeItem('TOKEN');
	createLogoutNav();
};

// 로그아웃 상태
export const createLogoutNav = () => {
	navbar.insertAdjacentHTML(
		'beforeend',
		`<div class="nav-wrap">
		<ul class="categories-wrap">
			<a href=""> <button>Necklace</button> </a
			><a href=""> <button>Earrings</button> </a
			><a href=""> <button>Bracelet</button> </a
			><a href=""> <button>Ring</button> </a
			><a href="">
				<button>Sunglasses</button>
			</a>
		</ul>
		<a class="logo-wrap" href="">
			<img src="../assets/imgs/logo/ADORN9_LOGO.png" alt="" />
		</a>
		<ul class="utils">
			<button class="login">로그인</button>
			<button class="cart">장바구니</button>
		</ul>
	</div>`,
	);
};

loginCheck();

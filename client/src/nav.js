let navbar = document.getElementById('nav');

navbar.insertAdjacentHTML(
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
					<li class="my-page">마이페이지</li>
					<li class="cart">장바구니</li>
				</ul>
			</div>`,
);

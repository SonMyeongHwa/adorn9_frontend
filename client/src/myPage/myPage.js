import { loginCheck, createLoginNav, createLogoutNav } from '../navbar.js';

loginCheck();
createLoginNav();
createLogoutNav();

const editBtn = document.querySelector('.edit-order');
editBtn.addEventListener('click', () => {
	window.location.href = '../orderEdit/orderEdit.html';
});

fetch('http://localhost:3000/api/v1/orders/', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
		Authorization: localStorage.getItem('TOKEN'),
	},
})
	.then((res) => {
		return res.json();
	})
	.then((data) => {
		console.log(data);
	});

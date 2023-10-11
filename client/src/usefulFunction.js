// 로그인 여부 확인 후 로그인시 원래 페이지로 이동
export const checkLogin = () => {
	const token = sessionStorage.getItem('token');
	if (!token) {
		const pathname = window.location.pathname;
		const search = window.location.search;
		window.location.replace(`/login?previouspage=${pathname + search}`);
	}
};

$(document).ready(function () {
	// 모달 DOM 참조
	const modal = document.querySelector('.pop-layer');

	// 모달 보여주는 함수
	function showModal() {
		modal.style.display = 'block';
	}

	// 모달 숨기는 함수
	function hideModal() {
		modal.style.display = 'none';
	}

	// "모달 불러오기" 버튼 클릭 이벤트 리스너
	$('#loadModalButton').click(function () {
		$.ajax({
			url: 'modal.html',
			type: 'GET',
			success: function (data) {
				$('body').append(data); // modal.html의 내용을 body의 마지막에 추가

				// 이벤트 리스너 재등록 (새로운 모달 내용이 추가되었으므로)
				document
					.querySelector('.header-popup-close-btn')
					.addEventListener('click', hideModal);

				showModal(); // 모달을 보여줍니다.
			},
			error: function (error) {
				console.log('모달을 불러오는데 실패했습니다.', error);
			},
		});
	});

	// 기존의 모달 이벤트 리스너 (필요한 경우만 남겨둡니다.)
	// document.querySelector('.btn btn-primary btn-lg').addEventListener('click', showModal);
	// document.querySelector('.header-popup-close-btn').addEventListener('click', hideModal);
});

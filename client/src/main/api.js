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

export default {
	fetch,
};

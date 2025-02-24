/**
 * @name: .pretteierrc.js
 * @description: Prettier는 코드를 읽어들여서 사용자 옵션에 따라 코드를 다시 포맷팅하는 "코드 포맷터" 입니다.
 * @version: 2.0
 */
module.exports = {
	// 쌍따옴표 사용
	singleQuote: true,
	// 모든 구문 끝에 세미콜론 출력
	semi: true,
	// 탭 대신 공백으로 들여쓰기
	useTabs: true,
	// 들여쓰기 공백 수
	tabWidth: 2,
	// 가능하면 후행 쉼표 사용
	trailingComma: "all",
	// 줄 바꿈할 길이
	printWidth: 80,
	// 객체 괄호에 공백 삽입
	bracketSpacing: true,
	// 항상 화살표 함수의 매개 변수를 괄호로 감쌈
	arrowParens: "always",
	// OS에 따른 코드라인 끝 처리 방식 사용
	endOfLine: "auto",
};

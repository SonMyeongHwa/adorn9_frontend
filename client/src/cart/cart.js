const checkAllItem = document.querySelector("#checkAllItem");
const checkboxes = document.querySelectorAll(".check");

//상품 전체선택
checkAllItem.addEventListener("click", function() {
  const isChecked = checkAllItem.checked; //전체선택 체크여부

  for(let i=0; i<checkboxes.length; i++) {
    checkboxes[i].checked = isChecked;
  }
});

//하나라도 선택해제 될 경우 전체선택 체크 해제
for(let i=0; i<checkboxes.length; i++) {
  checkboxes[i].addEventListener("click", function() {
    const totalCount = checkboxes.length; //전체 체크박스 개수
    const checkedCount = document.querySelectorAll(".check:checked").length; //체크 된 체크박스 개수
    
    if(totalCount === checkedCount) {
      checkAllItem.checked = true;
    } else {
      checkAllItem.checked = false;
    }
  });
}
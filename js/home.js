const frontend_base_url = "http://127.0.0.1:1359"
const backend_base_url = "http://127.0.0.1:8000"
const API_USERS = "api/users"

// 연결 테스트, 사용자 정보 읽어오기
// //  http://127.0.0.1:8000/api/users/1
// fetch(`${backend_base_url}/${API_USERS}/1`)
//     .then((response) => response.json())
//     .then((data) => console.log(data));

window.onload = () => {
    //브라우저가 실행되면 실행
    console.log("로딩되었음")

    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
    console.log(payload_parse)
    if (payload_parse != null) {
        dropdown_item_1 = document.getElementById("dropdown_item_1")
        dropdown_item_2 = document.getElementById("dropdown_item_2")
        dropdown_menu = document.getElementById("dropdown_toggle")
        dropdown_menu.innerText = payload_parse.nickname
        dropdown_item_1.style.display = "none"
        dropdown_item_2.style.display = "none"
    } else {
        dropdown_item_3 = document.getElementById("dropdown_item_3")
        dropdown_item_3.style.display = "none"
    }
}


//  로그아웃
function handleLogout() {
    console.log("테스트 완료")
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    location.reload();
}

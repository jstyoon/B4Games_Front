const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"
const API_USERS = "api/users"

window.onload = () => {
    //브라우저가 실행되면 실행
    console.log("로딩되었음")
}
//  http://127.0.0.1:8000/api/users/1
fetch(`${backend_base_url}/${API_USERS}/1`)
    .then((response) => response.json())
    .then((data) => console.log(data));

// async function handleSignup() {
//     const email = document.getElementById("email").value
//     const password = document.getElementById("password").value
//     // 각 ID의 데이터 정보 입수

//     const response = await fetch(`${backend_base_url}/users/signup/`, {
//         // fetch 데이터를 전송할때까지 대기('POST')
//         // 아래의 형태는 JSON WEB TOKEN 형태로 데이터를 전송한다.
//         headers: {
//             'content-type': 'application/json',
//         },
//         method: 'POST',
//         body: JSON.stringify({
//             "email": email,
//             "password": password,
//         })
//     })

//     return response
// }

// async function handleLogin() {
//     const email = document.getElementById("email").value
//     const password = document.getElementById("password").value
//     // HTML 의 각 ID값의 데이터 저장

//     const response = await fetch("http://127.0.0.1:8000/users/api/token/", {
//         // fetch post 통신이 완료될때까지 기다리고, api에서는 세션의 토큰을 반환한다.
//         headers: {
//             'content-type': 'application/json',
//         },
//         method: 'POST',
//         body: JSON.stringify({
//             "email": email,
//             "password": password,
//         })
//     })

//     if (response.status == 200) {
//         const response_json = await response.json()
//         console.log(response)
//         console.log(response_json)
//         localStorage.setItem("access", response_json.access);
//         localStorage.setItem("refresh", response_json.refresh);
//         // 각 토큰을 로컬 스토리지에 저장

//         const base64Url = response_json.access.split('.')[1];
//         const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//         const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
//             return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//         }).join(''));

//         localStorage.setItem("payload", jsonPayload);
//         alert("환영합니다.")
//         window.location.replace(`${frontend_base_url}/index.html`)
//     } else {
//         alert("회원 정보가 일치하지 않습니다.")
//     }

// }
// async function handleMock() {

//     const response = await fetch("http://127.0.0.1:8000/users/mock/", {
//         headers: {
//             'Authorization': "Bearer " + localStorage.getItem("access")
//         },
//         method: 'GET',
//     })
//     console.log(response)
// }

// function handleLogout() {
//     localStorage.removeItem("access")
//     localStorage.removeItem("refresh")
//     localStorage.removeItem("payload")
// }
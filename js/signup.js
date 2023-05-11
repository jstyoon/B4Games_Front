const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"
const API_USERS = "api/users"


async function handleSignup() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    // 각 ID의 데이터 정보 입수

    const response = await fetch(`${backend_base_url}/users/signup/`, {
        // fetch 데이터를 전송할때까지 대기('POST')
        // 아래의 형태는 JSON WEB TOKEN 형태로 데이터를 전송한다.
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "nickname": email,
            "password": password,
        })
    })

    return response
}

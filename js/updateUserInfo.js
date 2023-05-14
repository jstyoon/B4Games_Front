const frontend_base_url = "http://127.0.0.1:8741"
const backend_base_url = "http://127.0.0.1:8000"
const API_USERS = "api/users"


window.onload = () => {
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
    console.log(payload_parse)
    const email = document.getElementById("email")
    email.innerText = payload_parse.email

    const username = document.getElementById("username")
    username.value = payload_parse.username

    const user_id = document.getElementById("user_id")
    user_id.value = payload_parse.user_id
}

async function handleSendMail() {
    const user_id = document.getElementById("user_id").value
    const response = await fetch(`${backend_base_url}/${API_USERS}/get-auth-code/${user_id}`)
}

// 회원 정보 수정
async function handleUpdateUserInfo() {

    const password = document.getElementById("password").value
    const username = document.getElementById("username").value
    const user_id = document.getElementById("user_id").value
    const auth_code = document.getElementById("auth_code").value
    let is_seller = document.getElementById("is_seller").value
    is_seller = is_seller == "판매 회원" ? "True" : "False"

    console.log(user_id)
    try {
        let access_token = localStorage.getItem("access")
        const response = await fetch(`${backend_base_url}/${API_USERS}/${user_id}/`, {
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${access_token}`
            },
            method: 'PUT',
            body: JSON.stringify({
                "auth_code": auth_code,
                "password": password,
                "username": username,
                "is_seller": is_seller,
            })
        })
        if (response.status == 200) {
            alert(`회원 정보를 수정 했습니다.`)
            window.location.replace(`${frontend_base_url}/html/home.html`)
        } else if (response.status == 401) {
            alert(`비밀번호가 올바르지 않거나 로그인 인증 기간이 만료되었습니다.`)
        } else if (response.status == 421) {
            alert(`인증코드가 올바르지 않습니다.`)
        } else if (response.status == 400) {
            alert(`권한이 없습니다.`)
        }
    } catch (err) {
        // server error
        console.error(err)
    }

}


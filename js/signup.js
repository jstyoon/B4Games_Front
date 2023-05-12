const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"
const API_USERS = "api/users"


// 회원 가입
async function handleSignup() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const username = document.getElementById("username").value
    const nickname = document.getElementById("nickname").value
    let is_seller = document.getElementById("is_seller").value
    is_seller = is_seller == "판매 회원" ? "True" : "False"

    try {
        const response = await fetch(`${backend_base_url}/${API_USERS}/signup/`, {
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                "email": email,
                "password": password,
                "username": username,
                "nickname": nickname,
                "is_seller": is_seller,

            })
        })
        const response_json = await response.json()
        if (response.status == 201) {
            alert(`${nickname}님 가입을 축하드립니다!`)
            window.location.replace(`${frontend_base_url}/html/home.html`)
        } else {

            //  에러메시지 종합하여 출력
            const keys = Object.keys(response_json.message);
            const length = keys.length;
            let string = ""
            for (let i = 0; i < length; i++) {
                const key = keys[i];
                const value = response_json.message[key];
                string += `${key}: ${value}\n`;
            }
            alert(string);
        }

    } catch (err) {
        console.error(err)
    }

}


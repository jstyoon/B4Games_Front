const frontend_base_url = "http://127.0.0.1:8741"
const backend_base_url = "http://127.0.0.1:8000"
const API_USERS = "api/users"

window.onload = async () => {
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)

    if (payload_parse != null) {
        dropdown_item_1 = document.getElementById("dropdown_item_1")
        dropdown_item_2 = document.getElementById("dropdown_item_2")
        dropdown_item_7 = document.getElementById("dropdown_item_7")
        dropdown_item_1.style.display = "none"
        dropdown_item_2.style.display = "none"
        dropdown_item_7.style.display = "none"

        const nav_response = await fetch(`${backend_base_url}/${API_USERS}/profile_view/${payload_parse.user_id}`)
        const nav_response_json = await nav_response.json()

        dropdown_menu = document.getElementById("dropdown_toggle")
        dropdown_menu.innerText = nav_response_json.username
        console.log(nav_response_json.is_seller)

        nav_profile_image = document.getElementById("nav_profile_image")
        if (nav_response_json.image != null) {
            nav_profile_image.setAttribute("src", `${backend_base_url}${nav_response_json.image}`)
        }

    } else {
        dropdown_item_3 = document.getElementById("dropdown_item_3")
        dropdown_item_4 = document.getElementById("dropdown_item_4")
        dropdown_item_5 = document.getElementById("dropdown_item_5")
        dropdown_item_8 = document.getElementById("dropdown_item_8")
        dropdown_item_3.style.display = "none"
        dropdown_item_4.style.display = "none"
        dropdown_item_5.style.display = "none"
        dropdown_item_8.style.display = "none"
    }

    // 판매회원 아니면 글작성 아예 안보이게

    const isSeller = JSON.parse(payload ?? '{}').is_seller;
    console.log(isSeller)
    if (isSeller === false) {
        dropdown_item_5 = document.getElementById("dropdown_item_5")
        dropdown_item_5.style.display = "none"
    }


    const username = document.getElementById("username")
    const status_message = document.getElementById("status_message")
    const profile_image = document.getElementById("profile_image")
    const user_id = document.getElementById("user_id")

    const response = await fetch(`${backend_base_url}/${API_USERS}/profile_view/${payload_parse.user_id}`)
    const response_json = await response.json()



    //  프로필 이미지 불러오기
    if (response_json.image != null) {
        profile_image.setAttribute("src", `${backend_base_url}${response_json.image}`)
    }

    //  사용자 정보 불러오기
    username.value = response_json.username
    status_message.value = response_json.status_message
    user_id.value = payload_parse.user_id

}


async function updateProfile() {
    const image = document.getElementById("image").files[0]
    const username = document.getElementById("username").value
    const status_message = document.getElementById("status_message").value
    const user_id = document.getElementById("user_id").value
    console.log(image, username, status_message, user_id)





    const formdata = new FormData();
    formdata.append('username', username)
    formdata.append('status_message', status_message)

    if (image) {
        formdata.append('image', image)
    } else {
        formdata.append('image', '')
    }


    try {
        const access_token = localStorage.getItem("access")

        const response = await fetch(`${backend_base_url}/${API_USERS}/profile_view/${user_id}/`, {
            headers: {
                "Authorization": `Bearer ${access_token}`
            },
            method: 'PUT',
            body: formdata
        })
        const response_json = await response.json()
        if (response.status == 200) {
            alert(`회원 정보를 수정 했습니다.`)
            window.location.replace(`${frontend_base_url}/html/profile.html`)
        } else if (response.status == 400) {
            alert(response_json.message)
            console.log(response_json)
        }
    } catch (err) {
        // server error
        console.error(err)
    }


}
const frontend_base_url = "http://127.0.0.1:8741"
const backend_base_url = "http://127.0.0.1:8000"
const API_USERS = "api/users"

window.onload = async () => {
    console.log("연결완료")
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)


    const follower = document.getElementById("follower")
    const following = document.getElementById("following")
    const username = document.getElementById("username")
    const status_message = document.getElementById("status_message")
    const profile_image = document.getElementById("profile_image")
    // const response = await fetch(`${backend_base_url}/${API_USERS}/profile_view/${payload_parse.user_id}`)
    const response = await fetch(`${backend_base_url}/${API_USERS}/profile_view/${payload_parse.user_id}`)
    const response_json = await response.json()



    //  프로필 이미지 불러오기
    if (response_json.image != null) {
        profile_image.setAttribute("src", `${backend_base_url}${response_json.image}`)
    }

    //  사용자 정보 불러오기
    follower.innerText = response_json.followers.length
    following.innerText = response_json.followings.length
    post.innerText = response_json.post_count
    username.innerText = response_json.username
    status_message.innerText = response_json.status_message

    console.log(payload_parse.email)
    console.log(response_json.followers)



    const owner_follow = document.getElementById("owner_follow")
    //  팔로우 정보 불러오기
    if (payload_parse == null || response_json.email == payload_parse.email) {
        const owner_follow = document.getElementById("owner_follow")
        owner_follow.style.display = "none"
    } else {
        // 로그인한 유저가 조회한 프로필의 owner를 팔로우 중이라면
        owner_follow.innerText = (response_json.followers.includes(payload_parse.email)) ? 'Unfollow' : "Follow"
    }


}

async function followAPI() {
    const owner_follow = document.getElementById("owner_follow")
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)

    try {
        let access_token = localStorage.getItem("access")
        const response = await fetch(`${backend_base_url}/${API_USERS}/profile_view/${payload_parse.user_id}/`, {
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${access_token}`
            },
            method: 'POST'
        })
        const response_json = await response.json()
        if (response.status == 200) {
            owner_follow.innerText = response_json == "unfollow" ? 'Unfollow' : "Follow"
        } else if (response.status == 400) {
            alert(`나 자신을 팔로우 할 수 없습니다.`)
        } else if (response.status == 401) {
            alert(`로그인이 필요합니다.`)
            // window.location.replace(`${frontend_base_url}/html/login.html`)
        }
    } catch (err) {
        // server error
        console.error(err)
    }
}

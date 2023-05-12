const frontend_base_url = "http://127.0.0.1:5500"
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

// 메인페이지에 게시글 가져오기
window.onload = async function loadArticles() {
    
    const articles = await getArticles()
    console.log(articles)

    const article_list = document.getElementById("article-list")

    articles.forEach(article => {
        const newCol = document.createElement("div");
        newCol.setAttribute("class", "col")
        const newCard = document.createElement("div")
        newCard.setAttribute("class", "card")
        newCard.setAttribute("id", article.pk)

        newCol.appendChild(newCard)

        const articleImage = document.createElement("img")
        articleImage.setAttribute("class", "card-img-top")
        articleImage.setAttribute("width", "350")
        articleImage.setAttribute("height", "400")
        
        if (article.image) {
            articleImage.setAttribute("src", `${backend_base_url}${article.image}`) 
        } else {
            articleImage.setAttribute("src", "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbB5kLi%2Fbtse96eg3uA%2FvJleU9SMKYxEXTqEDzioBK%2Fimg.jpg") 
        }
        
        newCard.appendChild(articleImage)

        const newCardBody = document.createElement("div")
        newCardBody.setAttribute("class", "card-body")
        newCard.appendChild(newCardBody)

        const newCardTitle = document.createElement("h5")
        newCardTitle.setAttribute("class", "card-title")
        if (article.title.length > 10) {
            newCardTitle.innerText = article.title.substring(0, 10) + "..." 
        } else {
            newCardTitle.innerText = article.title
        }

        newCardBody.appendChild(newCardTitle)

        const newCardText = document.createElement("p")
        newCardText.setAttribute("class", "card-text")
        if (article.content.length > 10) {
            newCardText.innerText = article.content.substring(0, 10) + "..."
        } else {
            newCardText.innerText = article.content
        }
        

        newCardBody.appendChild(newCardText)

        article_list.appendChild(newCol)

    })
}

async function getArticles() {
    const response = await fetch(`${backend_base_url}/api/posts/`, {
        // headers: {
        //     "Authorization" : "Bearer " + localStorage.getItem("access")
        // },
        // 로그인 없어도 되면 headers 없어도 됨
        method: 'GET' // 디폴트 get이라서 없어도 ok
    })

    console.log(response)
    if (response.status==200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("게시글 가져오기 실패")
    }
}
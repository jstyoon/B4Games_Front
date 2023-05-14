const frontend_base_url = "http://127.0.0.1:8741"
const backend_base_url = "http://127.0.0.1:8000"



// 상단바 로그아웃
function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    window.location.replace(`${frontend_base_url}/html/home.html`);
}

// 댓글 작성할 때 DB로 댓글 내용과 게시글 id를 같이 보내주기 위한 정의
let articleId


// 댓글 가져오기
async function loadComments(articleId) {
    const response = await getComments(articleId);

    const commentsList = document.getElementById("comment-list")
    commentsList.innerHTML = ""

    response.forEach(comment => {

        commentsList.innerHTML += `
        <li class="media d-flex mb-3">
            <img class="mr-3" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FrDdA1%2FbtsffuyYjwr%2FwmKwmMYWGRU7Ng5EcT7Zkk%2Fimg.png" alt="프로필 이미지" width="50" height="50">
            <div class="media-body">
            <h5 class="mt-0 mb-1">${comment.owner}</h5>
            ${comment.content}
            </div>
        </li>
        `
    })
}

// 댓글 작성하기
async function submitComment() {
    const commentElement = document.getElementById("new-comment")
    const newComment = commentElement.value
    const response = await postComment(articleId, newComment)
    commentElement.value = ""

    // location.reload()
    // 새로고침 없이 하려면
    loadComments(articleId)
}

// 게시글 상세보기 
async function loadArticles(articleId) {
    const response = await getArticle(articleId);

    const articleTitle = document.getElementById("article-title")
    const articleImage = document.getElementById("article-image")
    const articleContent = document.getElementById("article-content")
    const articleOwner = document.getElementById("article-owner")


    articleTitle.innerText = response.title
    articleContent.innerText = response.content
    articleOwner.innerText = "작성한 사람: " + response.owner

    const newImage = document.createElement("img")
    if (response.image) {
        newImage.setAttribute("src", `${backend_base_url}${response.image}`)
    } else {
        newImage.setAttribute("src", "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbB5kLi%2Fbtse96eg3uA%2FvJleU9SMKYxEXTqEDzioBK%2Fimg.jpg")
    }

    newImage.setAttribute("class", "img-fluid")

    articleImage.appendChild(newImage)

    // 게시글 작성자와 현재 로그인한 사람이 일치하면
    const authorId = response.owner
    const payload = localStorage.getItem("payload");
    const currentUser = JSON.parse(payload).username;

    if (authorId === currentUser) {
        document.getElementById("update_button").style.display = "block";
        document.getElementById("delete_button").style.display = "block";
    } else {
        document.getElementById("update_button").style.display = "none";
        document.getElementById("delete_button").style.display = "none";
    }
}

// 게시글 수정페이지로 이동
function updateMode() {
    window.location.href = `post_update.html?article_id=${articleId}`
}

// 게시글 삭제하기
async function removeArticle() {
    await deleteArticle(articleId)
    alert("삭제되었습니다.")
    window.location.replace(`${frontend_base_url}/html/home.html`);
}

// 게시글 삭제 api
async function deleteArticle() {

    let token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/api/posts/${articleId}`,
        {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
    if (response.status == 204) {
    } else {
        alert(response.status)
    }
}


// 페이지 로딩되면 게시글이랑 댓글 가져오기
window.onload = async function () {
    // 상단바 (from homa.js)
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
    if (payload_parse != null) {
        dropdown_item_1 = document.getElementById("dropdown_item_1")
        dropdown_item_2 = document.getElementById("dropdown_item_2")
        dropdown_menu = document.getElementById("dropdown_toggle")
        dropdown_menu.innerText = payload_parse.username
        dropdown_item_1.style.display = "none"
        dropdown_item_2.style.display = "none"
    } else {
        dropdown_item_3 = document.getElementById("dropdown_item_3")
        dropdown_item_4 = document.getElementById("dropdown_item_4")
        dropdown_item_5 = document.getElementById("dropdown_item_5")
        dropdown_item_3.style.display = "none"
        dropdown_item_4.style.display = "none"
        dropdown_item_5.style.display = "none"
    }

    // 판매회원 아니면 글작성 아예 안보이게
    const isSeller = JSON.parse(payload).is_seller;
    if (isSeller === false) {
        dropdown_item_5 = document.getElementById("dropdown_item_5")
        dropdown_item_5.style.display = "none"
    }

    const urlParams = new URLSearchParams(window.location.search);
    articleId = urlParams.get('article_id');
    loadArticles(articleId);
    loadComments(articleId);
}

// 게시글 상세보기 api
async function getArticle(articleId) {
    const response = await fetch(`${backend_base_url}/api/posts/${articleId}`,
    )

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}

// 댓글 보기 api
async function getComments(articleId) {
    const response = await fetch(`${backend_base_url}/api/comments/${articleId}/comment`,
    )

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}

// 댓글 작성 api (json)
async function postComment(articleId, newComment) {

    let token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/api/comments/${articleId}/comment`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "content": newComment,
        })
    }
    )
    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}


// 더보기란 수정,삭제 
function toggleOptions() {
    var optionsDiv = document.getElementById("options");
    if (optionsDiv.style.display === "none") {
      optionsDiv.style.display = "block";
    } else {
      optionsDiv.style.display = "none";
    }
  }
  
  



  
  
  
// 댓글 작성할 때 DB로 댓글 내용과 게시글 id를 같이 보내주기 위한 정의
let articleId


// 댓글 가져오기
async function loadComments(articleId) {
    const response = await getComments(articleId);
    console.log(response)

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
    console.log(response)
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

    articleTitle.innerText = response.title
    articleContent.innerText = response.content

    const newImage = document.createElement("img")
    if (response.image) {
        newImage.setAttribute("src", `${backend_base_url}${response.image}`)
    } else {
        newImage.setAttribute("src", "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbB5kLi%2Fbtse96eg3uA%2FvJleU9SMKYxEXTqEDzioBK%2Fimg.jpg")
    }

    newImage.setAttribute("class", "img-fluid")

    articleImage.appendChild(newImage)

}

// 페이지 로딩되면 게시글이랑 댓글 가져오기
window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    articleId = urlParams.get('article_id');
    console.log(articleId)
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
            "content-type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify({
            "content" : newComment,
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

window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('article_id');
    console.log(articleId)

    const response = await getArticle(articleId);
    console.log(response)

    const articleTitle = document.getElementById("article-title")
    const articleImage = document.getElementById("article-image")
    const articleContent = document.getElementById("article-content")


    articleTitle.innerText = response.title
    articleContent.innerText = response.content

    const newImage = document.createElement("img")
    newImage.setAttribute("src", `${backend_base_url}${response.image}`)
    newImage.setAttribute("class", "img-fluid")

    articleImage.appendChild(newImage)

}

async function getArticle(article_id) {
    const response = await fetch(`${backend_base_url}/api/posts/${article_id}`,
    )

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}
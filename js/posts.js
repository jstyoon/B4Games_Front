
// 게시글작성 api (formdata)

async function postArticle() {
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value
    const image = document.getElementById("image").files[0]

    const formdata = new FormData();

    formdata.append('title', title)
    formdata.append('content', content)

    if (image) {
        formdata.append('image', image)
    } else {
        formdata.append('image', '')
    }

    let token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/api/posts/`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formdata
    }
    )
    if (response.status == 200) {
        alert("작성완료")
        window.location.replace(`${frontend_base_url}/html/home.html`);
    } else {
        alert(response.status)
    }
}
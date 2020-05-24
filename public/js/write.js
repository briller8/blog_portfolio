



// iife 패턴을 사용한다. closer로 전역이 오염되지 않는다.
(function () {
    'use strict'
    const API_HOST = "https://blog.geoniljang.com";


    //file
    const fileBtn = document.querySelector("#fileBtn");
    //form
    const blogForm = document.querySelector("#blogForm");
    const blogContentDom = document.querySelector("#blogContent");
    //span
    const defaultText = document.querySelectorAll(".defaultText");


    const onCreate = async (event) => {
        event.preventDefault();

        console.dir(document.querySelector("#blogTag"));
        const blogTag = document.querySelector("#blogTag").value;
        const blogName = document.querySelector("#blogName").value;
        const blogPw = document.querySelector("#blogPw").value;
        const blogTitle = document.querySelector("#blogTitle").innerHTML;
        const blogContent = blogContentDom.innerHTML;
        //file

        if (!blogName.trim()) {
            return alert("이름을 입력해주세요.")
        }
        if (!blogPw.trim()) {
            return alert("비밀번호를 입력해주세요.")
        }
        if (!blogTitle.trim()) {
            return alert("제목을 입력해주세요.")
        }
        if (!blogContent.trim()) {
            return alert("내용을 입력해주세요.")
        }

        const blogData = {
            title: blogTitle,
            password: blogPw,
            author: blogName,
            content: blogContent,
            tag: blogTag
        }


        const result = await createPost({ blogData });

        if (result.status === "success") {
            window.location = "/blog.html"
        } else {
            console.log(result);
            return alert("게시글 등록에 실패했습니다. 다시 확인해주세요.")
        }
    };

    const _removeSpan = (e) => {
        e.stopPropagation();
        e.target.remove();
    }

    //form
    if (blogForm) {
        blogForm.addEventListener("submit", onCreate);
    }

    //file
    if (fileBtn) {
        const file = document.querySelector("#file");
        file.addEventListener("change", async (e) => {
            const formData = new FormData();
            formData.append("file", e.target.files[0])

            const imagePath = await imgUpload({ formData });

            if (imagePath.status === "success") {
                console.log(imagePath)
                blogContentDom.innerHTML += `<img src="${API_HOST}/${imagePath.data}" alt="${imagePath.data}" style="width: 78%">`
            }

        })


        fileBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            file.click();
        })
    }



    //editable span 태그를 제거하기 위해서 클릭 이벤트를 설정하기 위해서 
    if (defaultText) {
        Array.from(defaultText).forEach(sp => {
            sp.addEventListener("click", _removeSpan)
        })
    }





    ////////////////////
    //    api call    //
    ////////////////////
    /* img */
    const imgUpload = ({ formData }) => {
        return new Promise((res, rej) => {
            fetch(`${API_HOST}/post/image`, {
                method: "POST",
                body: formData
            })
                .then(res => res.json())
                .then(json => res(json))
                .catch(error => rej(error))
        })
    }

    //create
    const createPost = ({ blogData }) => {
        return new Promise((res, rej) => {
            fetch(`${API_HOST}/post`, {
                method: "POST",
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(blogData)
            })
                .then(res => res.json())
                .then(json => res(json))
                .catch(e => rej(e))
        })
    }



})();

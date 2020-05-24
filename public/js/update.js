
//iife 패턴
(function () {
    'use strict'
    const API_HOST = "https://blog.geoniljang.com";
    const delBtn = document.querySelector("#delete");

    //update
    const fileBtn = document.querySelector("#fileBtn");
    const blogForm = document.querySelector("#blogForm");
    const blogContentDom = document.querySelector("#blogContent");

    const postId = window.location.search.match(/(postId=\d+)/g)[0].split("=")[1];


    window.addEventListener("load", async () => {
        const result = await getBlog({ id: postId });

        if (result.status === "success") {
            const { author, title, content, id, tag } = result.data


            document.querySelector("#blogTitle").innerHTML = title;
            document.querySelector("#blogContent").innerHTML = content;
            document.querySelector("#blogName").value = author;
            document.querySelector("#blogTag").value = tag;

        }
    })




    const onUpdate = async (event) => {
        event.preventDefault();

        const blogTag = document.querySelector("#blogTag").value;
        const blogName = document.querySelector("#blogName").value;
        const blogPw = document.querySelector("#blogPw").value;
        const blogTitle = document.querySelector("#blogTitle").innerHTML;
        const blogContent = blogContentDom.innerHTML;

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


        const result = await updatePost({ id: postId, updateData: blogData });

        if (result.status === "success") {
            alert("게시글이 수정되었습니다.")
            window.location = "/blog.html"
        } else {
            console.log(result);
            return alert("게시글 수정에 실패했습니다. 다시 확인해주세요.")
        }





        fileBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            file.click();
        })


        console.dir(document.querySelector("#"))
    }

    ////////////////////
    //    add event   //
    ////////////////////

    if (fileBtn) {
        const file = document.querySelector("#file");
        file.addEventListener("change", async (e) => {
            const formData = new FormData();
            formData.append("file", e.target.files[0])

            const imgPath = await imgUpload({ formData });

            if (imgPath.status === "success") {
                console.log(imgPath)
                blogContentDom.innerHTML += `<img src="${API_HOST}/${imgPath.data}" alt="${imgPath.data} style="wdith: 78%">`
            }
        })


        fileBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            file.click();
        })
    }


    if (blogForm) {
        blogForm.addEventListener("submit", onUpdate);
    }


    //Delete event
    if (delBtn) {
        delBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            const password = document.querySelector("#blogPw").value;
            if (!password.trim()) {
                return alert("패스워드를 입력해주세요");
            }
            const result = await blogDel({ postId, password });
            console.log(result);
            if (result.status === "success") {
                alert("삭제되었습니다");
                window.location = "blog.html"
            } else {
                alert("패드워드를 확인해주세요");
            }
        });
    }





    ////////////////////
    //    api call    //
    ////////////////////

    //image 
    const imgUpload = ({ formData }) => {
        return new Promise((res, rej) => {
            fetch(`${API_HOST}/post/image`, {
                method: "POST",
                body: formData
            })
                .then(res => res.json())
                .then(json => res(json))
                .catch(error => rej(error))
        });
    }

    //updatePost
    const updatePost = ({ id, updateData }) => {
        return new Promise((res, rej) => {
            fetch(`${API_HOST}/post/${id}`, {
                method: "PUT",
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(updateData)
            }).then(res => res.json())
                .then(json => res(json))
        })
    }



    //get blogDel
    const blogDel = ({ postId, password }) => {
        return new Promise((res, rej) => {

            const obj = {
                password
            }
            fetch(`${API_HOST}/post/${postId}`, {
                method: "DELETE",
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(obj)
            }).then(res => res.json())
                .then(json => res(json))
                .catch(e => rej(e))
        })
    }

    //get Blog
    const getBlog = ({ id }) => {
        console.log(id);
        return new Promise((res, rej) => {
            fetch(`${API_HOST}/post?postId=${id}`)
                .then(res => res.json())
                .then(json => res(json))
                .catch(e => rej(e))
        })
    };


})();





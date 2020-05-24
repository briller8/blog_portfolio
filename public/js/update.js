
//iife 패턴
(function () {
    'use strict'
    const API_HOST = "https://blog.geoniljang.com";
    const delBtn = document.querySelector("#delete");
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



    ////////////////////
    //    add event   //
    ////////////////////

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
                window.location = "/blog.html"
            } else {
                alert("패드워드를 확인해주세요");
            }
        });
    }





    ////////////////////
    //    api call    //
    ////////////////////

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





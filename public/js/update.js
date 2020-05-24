
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


            document.querySelector("#blogTitle").inne
            rHTML = title;
            document.querySelector("#blogContent").innerHTML = content;
            document.querySelector("#blogName").value = author;
            document.querySelector("#blogTag").value = tag;

        }

    })



    ////////////////////
    //    add event   //
    ////////////////////

    if (delBtn) {
        delBtn.addEventListener("click", 
    }

    const blogDel = ({ postId, password }) => {
        return new Promise((res, rej) => {

            const obj = {
                password
            }
        })
    }




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





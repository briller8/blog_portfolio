



// iife 패턴을 사용한다. closer로 전역이 오염되지 않는다.
(function () {
    'use strict'
    const API_HOST = "https://blog.geoniljang.com";

    const detail = document.querySelector("#detail");
    const cardList = document.querySelector("#cardList");
    const categoryList = document.querySelector("#categoryList");


    window.addEventListener("load", async () => {
        const result = await getBlogs();
        if (result.status === "success") {
            const cards = result.data.map(data => makeCard(data));
            cardList.innerHTML = cards.join("")
        } else {
            return alert("Fail Load Cards")
        }
    })



    ////////////////////
    //    add event   //
    ////////////////////



    if (cardList) {
        cardList.addEventListener("click", async (e) => {
            e.stopPropagation()
            const cardId = e.target.dataset.cardid;
            if (cardId) {
                onSetCardInfo({ cardId })
            }
        })
    }
    if (detail) {
        detail.addEventListener("click", (e) => {
            const id = e.target.id;
            if (id === "detailClose") {
                detail.style.display = "none";
            }
        })
    }

    if (categoryList) {
        categoryList.addEventListener("click", (e) => {
            e.stopPropagation();
            const category = e.target.dataset.filter;
            // console.dir(categoryList);
            Array.from(categoryList.children).forEach(li => {
                li.classList.remove("active");
                // console.log(li);
            })

            Array.from(cardList.children).forEach(card => {
                // console.dir(card.dataset.tag);
                if (category) {
                    if (category === "All") {
                        card.classList.remove("remove");
                        e.target.classList.add("active");
                    } else {
                        if (category.toLowerCase() !== card.dataset.tag) {
                            card.classList.add("remove");
                            e.target.classList.add("active");
                        } else {
                            card.classList.remove("remove");
                            e.target.classList.add("active");
                        }
                    }
                }
            });
        })
    }



    ////////////////////
    // event handler  //
    ////////////////////


    const onSetCardInfo = async ({ cardId }) => {
        const result = await getBlog({ id: cardId });
        if (result.status === "success") {
            console.log(result.data)
            const { author, title, content, id, tag } = result.data

            const cardInfo = {
                id,
                author,
                title,
                content,
                tag
            }
            detail.style.display = 'flex'
            detail.innerHTML = makeModal({ cardInfo })
        }
    }




    ////////////////////
    //     custom     //
    ////////////////////


    const makeCard = ({ img, title, content, id, tag }) => {

        let imagePath = ""
        if (tag === "front") {
            imagePath = "public/imgs/js.png"
        } else if (tag == "back") {
            imagePath = "public/imgs/java.png"
        } else if (tag == "marketing") {
            imagePath = "public/imgs/mkt.png"
        } else if (tag == "thought") {
            imagePath = "public/imgs/th.png"
        }



        return `
        <li data-tag="${tag}">
            <div class="card" >
                <img src="${imagePath}" alt="${imagePath}" class="card__img">
                <div class="card__content">
                    <div class="card__text__title">${title}</div>
                    <div class="card__text__content">${content}</div>
                </div>
                <div class="card--wrap"  data-cardid=${id}></div>
            </div>
           
        </li>
        `
    };

    const makeModal = ({ cardInfo }) => {
        console.log(cardInfo)
        return `
            <div class="detail__container">
                <span><i class="fas fa-times" id="detailClose"></i></span>
                <div class="detail__title"> ${cardInfo.title}</div>
                <div class="detail__content">${cardInfo.content}</div>
                <div class="detail__footer">
                    <a href="update.html?postId=${cardInfo.id}"><button class="detail__footer__edit">수정</button></a>
                </div>
            </div>
        `
    }






    ////////////////////
    //    api call    //
    ////////////////////

    //get blogs
    const getBlogs = () => {
        return new Promise((res, rej) => {
            fetch(`${API_HOST}/post`)
                .then(res => res.json())
                .then(json => res(json))
                .catch(e => rej(e))
        })
    }

    const getBlog = ({ id }) => {
        return new Promise((res, rej) => {
            fetch(`${API_HOST}/post?postId=${id}`)
                .then(res => res.json())
                .then(json => res(json))
                .catch(e => rej(e))
        })
    }


})();

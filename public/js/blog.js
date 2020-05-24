



// iife 패턴을 사용한다. closer로 전역이 오염되지 않는다.
(function () {
    'use strict'
    const API_HOST = "https://blog.geoniljang.com";

    const detail = document.querySelector("#detail");
    const cardList = document.querySelector("#cardList");



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


    ////////////////////
    // event handler  //
    ////////////////////
    const onSetCardInfo = async ({ cardId }) => {
        const result = await getBlog({ id: cardId });
        if (result.status === "success") {

            const { author, title, content, id } = result.data

            const cardInfo = {
                id,
                author,
                title,
                content
            }
            detail.style.display = 'flex'
            detail.innerHTML = makeModal({ cardInfo })
        }
    }



    ////////////////////
    //     custom     //
    ////////////////////
    const makeCard = ({ img, title, content, id }) => {
        return `
        <li >
            <div class="card" >
                <img src="/public/imgs/green.png" alt="그린" class="card__img">
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
                <div class="detail__title">Title : ${cardInfo.title}</div>
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

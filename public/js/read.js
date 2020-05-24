
fetch('css').then(function (response) {
    response.text().then(fuction(text){
        alert(text);
    })
})


fetchPage('html')

function fetchPage(name) {
    fetch(name).then(function (response) {
        response.text().then(function (text) {
            document.querySelector('aticle').innerHTML = text;
        })
    });
}

초기

Hash 문단, 북마크 가능 id를 기준으로


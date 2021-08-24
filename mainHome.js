const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const pushDataHome = $('.product__home')
const quantityCartIcon = $('.header__cart-notice')
const load = $('.modal__overlay')
var htmlHome
const API = 'https://json-server-8822.herokuapp.com/product'
const API_CART = 'https://json-server-8822.herokuapp.com/cart'
//------GET-----
function handlePostCart(id) {
    const imgItem = document.querySelector(`#item${id} .home-product-item__img`).getAttribute('data-product-img')
    const nameItem = document.querySelector(`#item${id} .home-product-item__name`).textContent
    const priceItem = document.querySelector(`#item${id} .home-product-item__price-current`).dataset.price
    let data = {
        id: Number(id),
        image: imgItem,
        name: nameItem,
        gia: Number(priceItem),
        soluong: 1
    }
    createData(data)
}
function checkCart() {
    fetch(API_CART)
        .then((respond) => respond.json())
        .then(
            (myDataCart) => {
                quantityCartIcon.innerText = myDataCart.length
                const btnAddToCarts = $$('.add-to-cart')
                btnAddToCarts.forEach(function (btn) {
                    btn.addEventListener('click', function () {
                        if (myDataCart.length == 0) {
                            load.style.display = 'block';
                            handlePostCart(btn.id)
                        } else {
                            myDataCart.forEach(element => {
                                if (btn.id == element.id) {
                                    alert('Sản Phẩm đã có trong giỏ hàng!')
                                } else {
                                    handlePostCart(btn.id)
                                }
                            });
                        }
                    });
                });

            }
        )
}
function getData(callback) {
    fetch(API)
        .then((respond) => respond.json())
        .then(callback)
        .then(checkCart)
}
function renderData(result) {
    htmlHome = result.map((value) => {
        return `
        <div class="col l-2-4 m-3 c-6">
            <div class="home-product-item" id="item${value.id}">
                <a href="">
                    <div class="home-product-item__img"
                        data-product-img = "${value.image}"
                        style="background-image: url(${value.image});">
                    </div>
                    <h4 class="home-product-item__name">${value.name}</h4>
                    <div class="home-product-item__price">
                        <span class="home-product-item__price-current" data-price="${value.gia}">${Intl.NumberFormat('vn-JP', { style: 'currency', currency: 'VND' }).format(value.gia)}</span>
                    </div>
                    <div class="home-product-item__action">
                        <span class="home-product-item__like"><i
                                class="far fa-heart"></i></span>

                        <div class="home-product-item__rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                    <div class="home-product-item__ogrigin">
                        <span class="home-product-item__brand">ASUS</span>
                        <span class="home-product-item__brand-from">Đài Loan</span>
                    </div>
                    <div class="home-product-item__favorite">
                        <i class="fas fa-check"></i>
                        yêu thích
                    </div>
                    <div class="home-product-item__sale-off">
                        <span class="home-product-item__sale-off-percent">0%</span>
                        <span class="home-product-item__sale-off-label">Giảm</span>
                    </div>
                </a>
                <div class="add-to-cart" id = "${value.id}">Thêm vào giỏ hàng</div>
            </div>
        </div>
        `
    })
    pushDataHome.innerHTML = htmlHome.join('')
    return result
    load.style.display = 'none';
}
getData(renderData)

//------POST-----

function createData(data) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(API_CART, options)
}

// function checklogin(){
//     var a = document.getElementById('inputuser').value
//     var b = document.getElementById('inputpass').value
//     if(a==='admin' && b==='admin'){
//         document.getElementById("dangnhap").style.display = 'none'

//     }
//     else{
//         alert("nhap sai tai khoan hoac mat khau")
//         document.getElementById('inputuser').value = ''
//         document.getElementById('inputpass').value = ''
//         document.getElementById('inputuser').focus()

//     }
// }
// //enter to login
// var meo = 'hai'
// var cho = 'hai'

// // if(getComputedStyle(document.getElementById("dangnhap")).display == "none"){
// //     alert('cai gi day')
// // }


//  // allow keyboard Enter just can use on ID dangnhap
//  document.onkeydown = function(e){
//     if(getComputedStyle(document.querySelector('#dangnhap')).display != 'none'){
//         if(e.key === 'Enter'){
//                 checklogin()
//                 console.log(e)
//         }
//     }
// }
// //click to login
// // document.querySelector('.click_login').addEventListener("click",checklogin)

// //click change form-up
// document.querySelectorAll('.click_login--change')[0].addEventListener("click",function(){
//     document.getElementById('form-logup').style.display = 'none';
//     document.getElementById('form-login').style.display = 'block';
// });

// //click change form-in
// document.querySelectorAll('.click_login--change')[1].addEventListener("click",function(){
//     document.getElementById('form-login').style.display = 'none';
//     document.getElementById('form-logup').style.display = 'block';
// });

// //click btn back on form-up
// document.querySelector('.c').addEventListener("click",function(){
//     document.getElementById('dangnhap').style.display = 'none'
// })

// document.querySelectorAll('.click_login--change').onclick = function(){

//     document.getElementById("dangnhap").style.display = 'none'

// }

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
    console.log('handlePostCart...');
    createData(data)
}
function checkCart() {
    fetch(API_CART)
        .then((respond) => respond.json())
        .then(
            (myDataCart) => {
                // myDataCart = myDataCart.cart
                console.log(myDataCart);
                quantityCartIcon.innerText = myDataCart.length
                const btnAddToCarts = $$('.add-to-cart')
                btnAddToCarts.forEach(function (btn) {
                    btn.addEventListener('click', function () {
                        console.log('click');
                        if (myDataCart.length == 0) {
                            console.log('click gio hang 0');
                            load.style.display = 'block';
                            handlePostCart(btn.id)
                        } else {
                            let incart = myDataCart.some(element => {
                                return btn.id == element.id
                            });
                            console.log(incart);
                            if (incart) {
                                alert('Sản Phẩm đã có trong giỏ hàng!')
                            }
                            else {
                                console.log('in cart already?');
                                load.style.display = 'block';
                                handlePostCart(btn.id)
                            }
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
    load.style.display = 'none';
    console.log('xong...');
    return result
}
getData(renderData)
//------POST-----

function createData(data) {
    let optionsss = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    }
    fetch(API_CART, optionsss)
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            getData(renderData)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

$(document).ready(function(){

    function changeSlectSlider() {
        if($('#slider-top-banner-2').hasClass('slick-active')) {
            $('#select-slider-title').html("Red Dead Redemption");
            $('#select-slider-view').html("2 / 2");
        }else {
            $('#select-slider-title').html("Mortal Kombat");
            $('#select-slider-view').html("1 / 2");
        };
    }

    function getProducts(callback) {  
        $.ajax({
            url : "/products",
            type : 'GET',
            dataType: "json"
            }).done(function(data){
                callback(data)
            }).fail(function(jqXHR, textStatus, msg){
                console.log(msg);
        });
    } 

    function showProductsMobile(){
        if (document.querySelector('.product-mobile')) {
        var product = $('.product');
            document.querySelector('.product-mobile').innerHTML = product[0].innerHTML;
            var currentProduct = 0;
            var nextProduct;
            document.querySelector('#left-solid-buy').onclick = function(){
                if(currentProduct == 0){
                    currentProduct = product.length;
                }
                currentProduct = currentProduct - 1;
                previousProduct = currentProduct;
                $('.product-mobile').children('.banner-info-product').html(product[previousProduct].children[0].innerHTML)
            }
            document.querySelector('#right-solid-buy').onclick = function(){
                if(currentProduct == product.length - 1){
                    currentProduct = - 1;
                }
                currentProduct = currentProduct + 1;
                nextProduct = currentProduct;
                $('.product-mobile').children('.banner-info-product').html(product[nextProduct].children[0].innerHTML)
            }
        }
    }

    function buyProduct(data) {
        data.click(function(){
            $('.buy-completed-display').fadeToggle();
            var bagQuantity = $('#bag-quant').html();
            var plusQuantity = parseInt(bagQuantity) + 1;
            $('#bag-quant').html(plusQuantity);
        });
    }

    function showProducts(data) {
        for ( let prod = 0; prod < data.length; prod++) {
            var productBuy =    `<div class="product">
                                    <a class="banner-info-product" href="#">;
                                        <div class="banner-product"><img src="${data[prod].image}" alt="${data[prod].name}"></div>
                                        <div class="info-product">
                                            <h2 class="font-roboto">${data[prod].name}</h2>
                                            <h6 class="font-roboto-bold">R$ ${data[prod].price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) }</sup></h6>
                                        </div>
                                    </a>
                                    <a>
                                        <div class="buy-product align-center">
                                            <span class="font-roboto-bold">COMPRAR</span>
                                        </div>
                                    </a>
                                </div>`
            if (document.querySelector('.products-shelf')) {
                document.querySelector('.products-shelf').innerHTML += productBuy;
            }
        }
        showProductsMobile()
        buyProduct($('.buy-product'))
    }

    getProducts(showProducts);

    $('.slider-top-content').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000,
        arrows: true,
        fade: true,
        speed: 1000,
        prevArrow: $('.prev'),
        nextArrow: $('.next'),
    });

    window.setInterval(function() {
        changeSlectSlider();
    },100);

    $('#slider-button-left').click(function(){
        changeSlectSlider()
    });

    $('#slider-button-right').click(function(){
        changeSlectSlider()
    });
    
    $('#button-icon-category').click(function(){
        $('.nav-category-display').fadeToggle();
        $('.nav-category-display').mouseover(function(){
            $(this).mouseleave(function(){
                $(this).fadeOut();
            })
        });
    });

    $('.close-buy-completed').click(function(){
        $('.buy-completed-display').fadeToggle();
    });

    $('.close-form-completed').click(function(){
        $('.form-completed-display').fadeToggle();
        window.location.href = "/";
    });

});
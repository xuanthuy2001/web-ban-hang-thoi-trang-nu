const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


const modal = $(".modal");
const close = $("#close__modal");




const sliderMain = $(".slider-content-left")
const sliderMainTop = $(".slider-content-left-top");
const sliderMainBottom = $(".slider-content-left-bottom");
const sliderMainTopImg = $(".slider-content-left-top-img");
const tabPanes = $$(".tab-pane");
const tabPanesWidth = tabPanes[0].offsetWidth;//lấy độ dài của các ảnh 
const tabPanesLenght = tabPanes.length; //lấy độ dài của tabpanes là số lượng của ảnh 


let index = 0;
const btnRight = $(".slider-content-left-top-btn__right");
const btnLeft = $(".slider-content-left-top-btn__left");

const tabs = $$(".tab-item");
const tabActive = $(".tab-item.active");
const line = $(".slider-content-left-bottom__line");
const Panes = $$(".tab-pane")




btnLeft.onclick = function () {
    index = index - 1;
    if (index < 0) {
        index = Panes.length - 1;
    }
    console.log(index);
    $(".tab-item.active").classList.remove("active");
    $(".tab-pane.active").classList.remove("active");

    Panes[index].classList.add("active");
    tabs[index].classList.add("active");


    line.style.left = tabs[index].offsetLeft + "px";
    line.style.width = tabs[index].offsetWidth + "px";
}

// khi click vao btnRight
btnRight.onclick = function () {
    index = index + 1;
    if (index > Panes.length - 1) {
        index = 0;
    }
    $(".tab-item.active").classList.remove("active");
    $(".tab-pane.active").classList.remove("active");

    Panes[index].classList.add("active");
    tabs[index].classList.add("active");


    line.style.left = tabs[index].offsetLeft + "px";
    line.style.width = tabs[index].offsetWidth + "px";
}

tabs.forEach((tab, index) => {
    const pane = Panes[index]

    tab.onclick = function () {
        $(".tab-item.active").classList.remove("active");
        $(".tab-pane.active").classList.remove("active");

        this.classList.add("active")
        pane.classList.add("active");

        line.style.left = this.offsetLeft + "px";
        line.style.width = this.offsetWidth + "px";

    }
})

// slider set timeout =================================================================

function imgAuto() {
    index = index + 1;

    if (index > Panes.length - 1) {
        index = 0;
    }

    $(".tab-item.active").classList.remove("active");
    $(".tab-pane.active").classList.remove("active");
    Panes[index].classList.add("active");
    tabs[index].classList.add("active");

    line.style.left = tabs[index].offsetLeft + "px";
    line.style.width = tabs[index].offsetWidth + "px";

}

// sau 5s ham imgAuto se chay 1 lan 
setInterval(imgAuto, 5000)



//========= chức năng giỏ hàng
const btn_cart = $$(".home-product-item__brand")



btn_cart.forEach(function (span, index) {
    span.addEventListener("click", function (e) {
        var btnItem = e.target;
        // console.log(btnItem);
        var product = btnItem.parentElement
        // console.log(product);
        var product_parent = product.parentElement;
        // console.log(product_parent)
        var productImg = product_parent.querySelector(".home-product-item__img").style.backgroundImage.slice(5, -2);
        // var productImg =  product_parent.querySelector(".home-product-item__img").style;
        // console.log(productImg)
        var productName = product_parent.querySelector(".home-product-item__name").innerText;
        var productPrice = product_parent.querySelector(".home-product-item__price-current span").innerText;
        console.log(productPrice, productImg.url, productName)
        addCart(productPrice, productImg, productName);
        cartoltal();

       btn_remove();
       update();
       GIOHANG(productPrice, productImg, productName);

    //    local
    cartNumbers();
    })
    

})




function addCart(productPrice, productImg, productName) {
    // createElement là tạo element 
    // var addCart_cho = document.createElement(" <tr><td style="display :flex; flex-direction: column; align-items: center;"><img style="width:70px ; " src="./assets/img/anh2.jpg" alt="">sản phẩm 1</td>        <td style="text-align: center;" ><p><span>320.000</span> <sup>đ</sup></p></td>  <td style="text-align: center;"><input style="width:35px ; outline: none; text-align:center" type="number" value="1" min="0"></td>        <td style="text-align: center;">xóa</td>    </tr>");
    var addCart_cho = document.createElement("tr")
    var addCart_cho_quantity = document.querySelectorAll(" tbody tr")
    for (var i = 0; i < addCart_cho_quantity.length; i++)
    {
        var cart_ImgName = document.querySelectorAll(".cart_productName");
        if (cart_ImgName[i].innerHTML == productName) {
            alert("san pham da co trong gio hang")
            return
        }

    }   
 var chocontent = `<td class="cart_Img" ><img style="width:70px ; " src = "${productImg}" alt=""> <span class="cart_productName">${productName}</span>    </td>        <td style="text-align: center;" ><p><span class = "cart_productPrice">${productPrice}</span> </p></td>  <td style="text-align: center;"><input style="width:35px ; outline: none; text-align:center" type="number" value="1" min="0"></td>        <td style="text-align: center;  "  class=" btn-danger">hủy đơn hàng</td>    `;

    addCart_cho.innerHTML = chocontent;


    var remove_cart = addCart_cho.querySelectorAll(".btn-danger")
    console.log(remove_cart);
    for (i = 0; i < remove_cart.length; i++) {
        var button = remove_cart[i];
        button.addEventListener("click", function (e) {
            var button_remove = e.target
            button_remove.parentElement.remove();
        })
    }
    //  là tìm đến thằng có class cart_list
    var cartTable = document.querySelector(".cart_list");
    //append gán cho addCart_cho cho cartTable
    cartTable.append(addCart_cho)
}

    // var todolist = JSON.parse(localStorage.getItem(storageKey))
    // var storageKey = "todolist"

    function GIOHANG(productPrice, productImg, productName)
    {  
        
        // localStorage.setItem(storageKey ,JSON.stringify(todolist) );

        var header__card_item = document.createElement("li");
        var header__card_list_item = $(".header__card-list-item")
        var ABC = `  <li class="header__card-item">
        <img src="${productImg}" alt="" class="header__card-img">
        <div class="header__card-item-info">
            <div class="header__card-item-head">
                <h5 class="header__card-item-name">
                ${productName}
                </h5>
                <div class="header__card-item-price-wrap">
                    <span class="header__card-item-price">${productPrice}</span>
                    <span class="header__card-item-multifly">
                        x
                    </span>
                    <span class="header__card-item-qnt">
                        2
                    </span>
                </div>
            </div>
            <div class="header__card-item-body">
                <span class="header__card-item-description">
                    phân loại :Bạc
                </span>
                <span class="header__card-item-remove">
                    Xóa
                </span>
            </div>

        </div>
    </li>`
    header__card_item.innerHTML = ABC;
    header__card_list_item.append(header__card_item)

    for(var i = 0; i < $$(".header__card-item-remove").length;i++ )
    {
        var XOA = $$(".header__card-item-remove")[i];
        XOA.addEventListener("click", function(e)
        {
           var remove = e.target;
           remove.parentElement.parentElement.parentElement.parentElement.remove()
        })
    }

    }

// ================================================================================================= TONG TIEN =================================================================================================

function cartoltal() {
    var cartItem = $$("tbody tr");

    console.log(cartItem.length)
    var oldToltal = 0;

    for (var i = 0; i < cartItem.length; i++) {
        var inputValue = cartItem[i].querySelector("input").value;
        var priceProduct = parseInt(cartItem[i].querySelector(".cart_productPrice").innerHTML)
        // console.log((parseInt(priceProduct)))
        var quantity_item =

            toltalAll = inputValue * priceProduct * 1000
        // console.log(toltalAll.toLocaleString('de-DE'))

        // console.log(inputValue*priceProduct)
        oldToltal = oldToltal + toltalAll

    }
    var cartQuantity = $(".cart-price-total")
    // console.log(cartQuantity)
    cartQuantity.innerHTML = ` <p>tổng tiền  <span>${oldToltal.toLocaleString('de-DE')}</span> <sup>đ</sup> </p>`
}

// =================================================================XOA====
    function btn_remove()
    {
      var remove=document.querySelectorAll(".btn-danger")
      for(var i=0 ; i<remove.length ; i++){
          var buttonRemove = remove[i]
          buttonRemove.addEventListener("click", function(e)
          {
           e.target.parentElement.remove(); 
             cartoltal();
          })
       

      }
    } 


    function update()
    {
      var UPDATE=document.querySelectorAll("tbody tr")
      for(var i=0 ; i<UPDATE.length ; i++){
          var inputValue = UPDATE[i].querySelector("input")
         inputValue.addEventListener("change", function()
         {
            cartoltal();
         })

      }
    } 

    // su kien click don dat hang
    const DONMUA = $(".DONMUA__header__navbar-user-item")
    const GIO__HANG =$(".ID__cart")
    const ESCAPE = $("#escape__cart")
    const APP = $("#APP");
    const OVERLAY = $(".cart__overlay")
    DONMUA.addEventListener("click", function (e)
    {
       GIO__HANG.style.display = "block"
       APP.style.opacity =0.8;
       
    })
    ESCAPE.addEventListener("click", function (e)
    {
       GIO__HANG.style.display = "none"
       APP.style.opacity =1;
    })
    OVERLAY.addEventListener("click", function (e)
    {
       GIO__HANG.style.display = "none"
       APP.style.opacity =1;
    })


    
//  ================================================================= LOCAL STORATES================================================================


    function cartNumbers ()
    {
        
        let productNumbers = localStorage.getItem("cartNumbers");
        productNumbers = parseInt(productNumbers);

        if(productNumbers)
        {
             localStorage.setItem("cartNumbers" ,productNumbers +1);
             $(".header__card-notive").textContent =  productNumbers +1;
        }
       
        else
        {
            localStorage.setItem("cartNumbers" ,1);
            $(".header__card-notive").textContent = 1;
        }

    }

    function onloadCartNumbers()
    {
        let productNumbers = localStorage.getItem("cartNumbers");
        if(productNumbers)
        {
            $(".header__card-notive").textContent = productNumbers
        }
    }

    onloadCartNumbers();
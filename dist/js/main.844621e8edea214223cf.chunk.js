(this.webpackJsonp=this.webpackJsonp||[]).push([[1],{kpGR:function(n,e,i){function o(n){n.preventDefault()}window.loader.$on("loaded",function(){var n;(n=new iENV.SliderPage({item:document.querySelectorAll("#container>section"),cur:0,activeClass:"pageOpen",loop:!1,effect:"vSlide",init:function(){}})).$on("sliderStart",function(n,e){}),n.$on("animateEnd",function(n,e){}),$(".container").on("swipeUp",function(){n.SwipeNext()}),$(".container").on("swipeDown",function(){n.SwipePrev()}),$(".load_btn").click(function(){$("#loader").css("display","none"),n.item[0].classList.add("pageOpen")}),new iENV.share({desc:"\u6211\u7684\u6d4b\u8bd5",imgUrl:"images/load_img.png"}),document.body.addEventListener("touchmove",o,!1)})}},[["kpGR",0]]]);
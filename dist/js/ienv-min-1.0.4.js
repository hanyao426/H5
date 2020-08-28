!(function (e) {
  if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    var t;
    (t =
      "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : this),
      (t.iENV = e());
  }
})(function () {
  return (function () {
    function e(t, i, o) {
      function s(r, a) {
        if (!i[r]) {
          if (!t[r]) {
            var l = "function" == typeof require && require;
            if (!a && l) return l(r, !0);
            if (n) return n(r, !0);
            var c = new Error("Cannot find module '" + r + "'");
            throw ((c.code = "MODULE_NOT_FOUND"), c);
          }
          var h = (i[r] = { exports: {} });
          t[r][0].call(
            h.exports,
            function (e) {
              return s(t[r][1][e] || e);
            },
            h,
            h.exports,
            e,
            t,
            i,
            o
          );
        }
        return i[r].exports;
      }
      for (
        var n = "function" == typeof require && require, r = 0;
        r < o.length;
        r++
      )
        s(o[r]);
      return s;
    }
    return e;
  })()(
    {
      1: [
        function (e, t, i) {
          "use strict";
          var o = [],
            s = function (e, t) {
              var i = document.head || document.getElementsByTagName("head")[0],
                s = o[o.length - 1];
              if (
                ((t = t || {}),
                (t.insertAt = t.insertAt || "bottom"),
                "top" === t.insertAt)
              )
                s
                  ? s.nextSibling
                    ? i.insertBefore(e, s.nextSibling)
                    : i.appendChild(e)
                  : i.insertBefore(e, i.firstChild),
                  o.push(e);
              else {
                if ("bottom" !== t.insertAt)
                  throw new Error(
                    "Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'."
                  );
                i.appendChild(e);
              }
            };
          t.exports = {
            createLink: function (e, t) {
              var i = document.head || document.getElementsByTagName("head")[0],
                o = document.createElement("link");
              (o.href = e), (o.rel = "stylesheet");
              for (var s in t)
                if (t.hasOwnProperty(s)) {
                  var n = t[s];
                  o.setAttribute("data-" + s, n);
                }
              i.appendChild(o);
            },
            createStyle: function (e, t, i) {
              i = i || {};
              var o = document.createElement("style");
              o.type = "text/css";
              for (var n in t)
                if (t.hasOwnProperty(n)) {
                  var r = t[n];
                  o.setAttribute("data-" + n, r);
                }
              o.sheet
                ? ((o.innerHTML = e),
                  (o.sheet.cssText = e),
                  s(o, { insertAt: i.insertAt }))
                : o.styleSheet
                ? (s(o, { insertAt: i.insertAt }), (o.styleSheet.cssText = e))
                : (o.appendChild(document.createTextNode(e)),
                  s(o, { insertAt: i.insertAt }));
            },
          };
        },
        {},
      ],
      2: [
        function (e, t, i) {
          var o = e("./event"),
            s = function (e) {
              var e = e || {};
              (this.item = e.item || document.querySelectorAll(".page")),
                (this.cur = e.cur || 0),
                (this.activeClass = e.activeClass || "pageOpen"),
                (this.loop = e.loop || !1),
                (this.effect = e.effect || "hSlide"),
                (this.toPageIndex = this.cur),
                (this.length = this.item.length),
                (this.isAnimate = !1),
                (this.effectClass = this.getEffectClass()),
                (this.isSlide =
                  "hSlide" === this.effect || "vSlide" === this.effect),
                this.item.forEach(function (e) {
                  e.style.display = "none";
                }),
                this.init();
            };
          (s.prototype = {
            constructor: s,
            init: function () {
              this.item[this.cur] &&
                ((this.item[this.cur].style.display = "block")
                // ,this.item[this.cur].classList.add(this.activeClass)
                ),
                this.isSlide &&
                  ((this._isVertical = "hSlide" !== this.effect),
                  this._swipeDispose()),
                this.$emit("init");
            },
            getEffectClass: function () {
              var e = {};
              switch (this.effect) {
                case "hSlide":
                  e = {
                    class1: "rightMoveToCur",
                    class2: "curMoveToLeft",
                    class3: "leftMoveToCur",
                    class4: "CurMoveToright",
                  };
                  break;
                case "vSlide":
                  e = {
                    class1: "bottomMoveToCur",
                    class2: "curMoveToTop",
                    class3: "topMoveToCur",
                    class4: "CurMoveTobottom",
                  };
                  break;
                case "fade":
                  e = {
                    class1: "noopClass",
                    class2: "fadeOut",
                    class3: "fadeIn",
                    class4: "noopClass",
                  };
                  break;
                case "hSingleSlide":
                  e = {
                    class1: "noopClass",
                    class2: "curMoveToLeft",
                    class3: "leftMoveToCur",
                    class4: "noopClass",
                  };
                  break;
                case "vSingleSlide":
                  e = {
                    class1: "noopClass",
                    class2: "curMoveToTop",
                    class3: "topMoveToCur",
                    class4: "noopClass",
                  };
                  break;
                default:
                  e = {
                    class1: "rightMoveToCur",
                    class2: "curMoveToLeft",
                    class3: "leftMoveToCur",
                    class4: "CurMoveToright",
                  };
              }
              return e;
            },
            toPage: function (e) {
              e === this.cur ||
                this.isAnimate ||
                ((this.toPageIndex =
                  e % this.length < 0
                    ? this.length + (e % this.length)
                    : e % this.length),
                console.log(
                  "this.toPageIndex:",
                  this.toPageIndex,
                  "this.cur:",
                  this.cur
                ),
                (this.isAnimate = !0),
                (this.item[this.toPageIndex].style.display = "block"),
                this.$emit("sliderStart", this.cur, this.toPageIndex),
                ("vSlide" === this.effect || "hSlide" === this.effect
                  ? e - this.cur
                  : this.toPageIndex - this.cur) > 0
                  ? (this.item[this.toPageIndex].classList.add(
                      this.effectClass.class1
                    ),
                    this.item[this.cur].classList.add(this.effectClass.class2),
                    this._aniEnd(
                      this._aniEndCb.bind(
                        this,
                        this.effectClass.class1,
                        this.effectClass.class2
                      )
                    ))
                  : (this.item[this.toPageIndex].classList.add(
                      this.effectClass.class3
                    ),
                    this.item[this.cur].classList.add(this.effectClass.class4),
                    this._aniEnd(
                      this._aniEndCb.bind(
                        this,
                        this.effectClass.class3,
                        this.effectClass.class4
                      )
                    )));
            },
            toHome: function () {
              this.toPage(0);
            },
            SwipePrev: function (e) {
              e && e.stopPropagation(),
                this.isAnimate ||
                  (!this.loop && this.toPageIndex < 1) ||
                  this.toPage(--this.toPageIndex);
            },
            SwipeNext: function (e) {
              e && e.stopPropagation(),
                this.isAnimate ||
                  (!this.loop && this.toPageIndex > this.length - 2) ||
                  this.toPage(++this.toPageIndex);
            },
            _aniEndCb: function (e, t) {
              this.item[this.toPageIndex].classList.remove(e),
                this.item[this.cur].classList.remove(t);
            },
            _aniEnd: function (e) {
              function t(o) {
                o.target === o.currentTarget &&
                  (i.isSlide
                    ? (i.item[i.toPageIndex].removeEventListener(
                        "webkitAnimationEnd",
                        t,
                        !1
                      ),
                      i._isVertical
                        ? (i.item[i.toPageIndex].style.webkitTransform =
                            "translateY(0)")
                        : (i.item[i.toPageIndex].style.webkitTransform =
                            "translateX(0)"))
                    : (i.item[i.cur].removeEventListener(
                        "webkitAnimationEnd",
                        t,
                        !1
                      ),
                      i.item[i.toPageIndex].removeEventListener(
                        "webkitAnimationEnd",
                        t,
                        !1
                      )),
                  console.log("_aniEndHandler"),
                  i.item[i.cur].classList.remove(i.activeClass),
                  i.item[i.toPageIndex].classList.add(i.activeClass),
                  (i.item[i.cur].style.display = "none"),
                  "function" == typeof e && e.apply(i),
                  i.$emit("animateEnd", i.cur, i.toPageIndex),
                  (i.cur = i.toPageIndex),
                  (i.isAnimate = !1));
              }
              var i = this;
              i.isSlide
                ? this.item[this.toPageIndex].addEventListener(
                    "webkitAnimationEnd",
                    t,
                    !1
                  )
                : (this.item[this.cur].addEventListener(
                    "webkitAnimationEnd",
                    t,
                    !1
                  ),
                  this.item[this.toPageIndex].addEventListener(
                    "webkitAnimationEnd",
                    t,
                    !1
                  ));
            },
            _swipeDispose: function () {
              function e(e) {
                n.addEventListener("touchmove", t, !1),
                  n.addEventListener("touchend", i, !1),
                  (o = e.targetTouches[0].pageX),
                  (s = e.targetTouches[0].pageY);
              }
              function t(e) {
                (e.targetTouches[0].pageX - o > 20 ||
                  e.targetTouches[0].pageY - s > 20) &&
                !r
                  ? a.item[a.cur - 1] &&
                    (a._isVertical
                      ? (a.item[a.cur - 1].style.webkitTransform =
                          "translateY(-100%)")
                      : (a.item[a.cur - 1].style.webkitTransform =
                          "translateX(-100%)"),
                    (a.item[a.cur - 1].style.display = "block"),
                    (r = !0))
                  : (e.targetTouches[0].pageX - o < -20 ||
                      e.targetTouches[0].pageY - s < -20) &&
                    !r &&
                    a.item[a.cur + 1] &&
                    (a._isVertical
                      ? (a.item[a.cur + 1].style.webkitTransform =
                          "translateY(100%)")
                      : (a.item[a.cur + 1].style.webkitTransform =
                          "translateX(100%)"),
                    (a.item[a.cur + 1].style.display = "block"),
                    (r = !0));
              }
              function i() {
                (r = !1),
                  n.removeEventListener("touchmove", t, !1),
                  n.removeEventListener("touchend", i, !1);
              }
              var o,
                s,
                n = document.querySelector(".container"),
                r = !1,
                a = this;
              n.addEventListener("touchstart", e, !1);
            },
          }),
            o.mixTo(s),
            (t.exports = s);
        },
        { "./event": 5 },
      ],
      3: [
        function (e, t, i) {
          var o =
            "body,html{width:100%;height:100%;background-color:#005286;position:relative;overflow:hidden;-webkit-tap-highlight-color:transparent;margin:0 auto}.x{position:absolute;left:50%;-webkit-transform:translateX(-50%)}.y{position:absolute;top:50%;-webkit-transform:translateY(-50%)}.xy{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%)}.posa{position:absolute;top:0;left:0;width:100%}.loading{height:100%;color:#fff;background-color:#005286;z-index:999}.loading .load-content{width:3.3rem;height:.3rem}.loading .cell{width:100%;height:100%;border:.02rem solid #fff;background-color:#005286;box-sizing:border-box;border-radius:.1rem;overflow:hidden;-webkit-transform:translateZ(0)}.loading .progress{width:100%;height:100%;background-color:#fff;-webkit-transform:scaleX(0) perspective(1000);-webkit-transform-origin:0 0}.loading .ideal{position:absolute;left:50%;width:3rem;height:1.5rem;top:-1.2rem;overflow:hidden;-webkit-transform:translate(-50%,0) scale(.7);z-index:-1}.loading .hat,.loading .head,.loading .head:after,.loading .head:before,.loading .ideal:after,.loading .ideal:before{background-color:#fff}.loading .head{border:1px solid #a6a6a6}.loading .ideal:after,.loading .ideal:before{content:'';position:absolute;bottom:-.3rem;width:.4rem;height:.5rem;border-radius:40%;-webkit-animation:hand-ani 4s ease-in 0s infinite}.loading .ideal:before{left:.2rem}.loading .ideal:after{right:.2rem}.loading .head-wrap{width:1.6rem;height:1.5rem;position:relative;top:.15rem;left:50%;margin-left:-.8rem;-webkit-animation:head-ani 4s ease-out 0s infinite}.loading .head{width:100%;height:100%;padding:.1rem;box-sizing:border-box;border-radius:50%;background-color:#fff}.loading .head:after,.loading .head:before{content:'';position:absolute;bottom:.42rem;width:.3rem;height:.6rem;z-index:-1;border-radius:35%;-webkit-transform:translateY(0)}.loading .head:before{left:-.1rem;-webkit-animation:left-ear-ani 4s 0s infinite}.loading .head:after{right:-.1rem;-webkit-animation:right-ear-ani 4s 0s infinite}.loading .face{width:100%;height:100%;position:relative;background-color:#005286;border-radius:50%;-webkit-animation:face-ani 4s 0s infinite}.loading .face:after,.loading .face:before{content:'';position:absolute;bottom:.45rem;width:.14rem;height:.25rem;background-color:#fff;border-radius:35%;-webkit-animation:eye-ani 4s 0s infinite}.loading .face:before{left:25%}.loading .face:after{right:25%}.loading .hat{position:absolute;top:-.05rem;left:50%;width:.6rem;height:.4rem;border-radius:35%;margin-left:-.3rem;z-index:-1}@-webkit-keyframes head-ani{0%,20%{-webkit-transform:translateY(100%)}25%,35%{-webkit-transform:translateY(60%)}40%,90%{-webkit-transform:translateY(0)}100%,92%{-webkit-transform:translateY(100%)}}@-webkit-keyframes hand-ani{0%,1%{-webkit-transform:translate(0,100%)}10%,12%{-webkit-transform:translate(0,-4%)}15%,93%{-webkit-transform:translate(0,0)}100%,96%{-webkit-transform:translate(0,100%)}}@-webkit-keyframes eye-ani{0%,45%{-webkit-transform:scaleY(1)}47%,48%{-webkit-transform:scaleY(.1)}50%,65%{-webkit-transform:scaleY(1)}67%,68%{-webkit-transform:scaleY(.1)}70%,82%{-webkit-transform:scaleY(1)}84%,85%{-webkit-transform:scaleY(.1)}100%,86%{-webkit-transform:scaleY(1)}}@-webkit-keyframes face-ani{0%,50%{-webkit-transform:translate(0,0)}57%,64%{-webkit-transform:translate(-5%,0)}71%,78%{-webkit-transform:translate(5%,0)}100%,85%{-webkit-transform:translate(0,0)}}@-webkit-keyframes left-ear-ani{0%,50%{-webkit-transform:translate(0,0)}57%,64%{-webkit-transform:translate(20%,0)}71%,78%{-webkit-transform:translate(-10%,0)}100%,85%{-webkit-transform:translate(0,0)}}@-webkit-keyframes right-ear-ani{0%,50%{-webkit-transform:translate(0,0)}57%,64%{-webkit-transform:translate(10%,0)}71%,78%{-webkit-transform:translate(-20%,0)}100%,85%{-webkit-transform:translate(0,0)}}@-webkit-keyframes lightLoop{0%{-webkit-transform:scale(1,1)}100%{-webkit-transform:scale(1.2,3)}}.loading .progress-num{position:absolute;top:0;left:104%;height:100%;line-height:.3rem;font-size:.2rem}.loading p{text-align:center;position:absolute;top:.5rem;left:0;width:100%;font-size:.24rem}.cover{height:100%;background-color:#005286;z-index:998;display:none}";
          e("browserify-css").createStyle(
            o,
            { href: "src\\css\\ienvcss.css" },
            { insertAt: "bottom" }
          ),
            (t.exports = o);
        },
        { "browserify-css": 1 },
      ],
      4: [
        function (e, t, i) {
          var o =
            ".curMoveToTop{-webkit-animation:curMoveToTop .4s .1s ease-in-out both}.topMoveToCur{-webkit-animation:topMoveToCur .4s .1s ease-in-out both}.bottomMoveToCur{-webkit-animation:bottomMoveToCur .4s .1s ease-in-out both}.CurMoveTobottom{-webkit-animation:CurMoveTobottom .4s .1s ease-in-out both}.curMoveToLeft{-webkit-animation:curMoveToLeft .4s .1s ease-in-out both}.leftMoveToCur{-webkit-animation:leftMoveToCur .4s .1s ease-in-out both}.rightMoveToCur{-webkit-animation:rightMoveToCur .4s .1s ease-in-out both}.CurMoveToright{-webkit-animation:CurMoveToright .4s .1s ease-in-out both}.fadeIn{-webkit-animation:fadeIn .4s .1s ease-in-out both}.fadeOut{-webkit-animation:fadeOut .4s .1s ease-in-out both}.hide{display:none}@-webkit-keyframes curMoveToTop{0%{-webkit-transform:translateY(0)}100%{-webkit-transform:translateY(-100%)}}@-webkit-keyframes topMoveToCur{0%{-webkit-transform:translateY(-100%)}100%{-webkit-transform:translateY(0)}}@-webkit-keyframes bottomMoveToCur{0%{-webkit-transform:translateY(100%)}100%{-webkit-transform:translateY(0)}}@-webkit-keyframes CurMoveTobottom{0%{-webkit-transform:translateY(0)}100%{-webkit-transform:translateY(100%)}}@-webkit-keyframes curMoveToLeft{0%{-webkit-transform:translateX(0)}100%{-webkit-transform:translateX(-100%)}}@-webkit-keyframes leftMoveToCur{0%{-webkit-transform:translateX(-100%)}100%{-webkit-transform:translateX(0)}}@-webkit-keyframes rightMoveToCur{0%{-webkit-transform:translateX(100%)}100%{-webkit-transform:translateX(0)}}@-webkit-keyframes CurMoveToright{0%{-webkit-transform:translateX(0)}100%{-webkit-transform:translateX(100%)}}@-webkit-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes fadeOut{0%{opacity:1}100%{opacity:0}}";
          e("browserify-css").createStyle(
            o,
            { href: "src\\css\\sliderPage.css" },
            { insertAt: "bottom" }
          ),
            (t.exports = o);
        },
        { "browserify-css": 1 },
      ],
      5: [
        function (e, t, i) {
          function o(e) {
            return r[e] || e;
          }
          function s() {}
          var n = e("./util"),
            r = {
              ready: "$ready",
              loaded: "$loaded",
              init: "$init",
              config: "$config",
            },
            a = {
              $on: function (e, t, i) {
                if ("object" == typeof e && e)
                  for (var s in e) this.$on(s, e[s], t);
                else {
                  i = i || {};
                  var n = this;
                  e = o(e);
                  var r,
                    a = n._handles || (n._handles = {}),
                    l = a[e] || (a[e] = []);
                  i.once &&
                    ((r = function () {
                      t.apply(this.arguments), this.$off(e.fn);
                    }),
                    (t.real = r)),
                    l.push(r || t);
                }
                return this;
              },
              $off: function (e, t) {
                var i = this;
                if (i._handles) {
                  e || (this._handles = {});
                  var s,
                    n = i._handles;
                  if (((e = o(e)), (s = n[e]))) {
                    if (!t) return (n[e] = []), i;
                    t = t.real || t;
                    for (var r = 0, a = s.length; r < a; r++)
                      if (t === s[r]) return s.splice(r, 1), i;
                  }
                  return i;
                }
              },
              $emit: function (e) {
                var t,
                  i = this,
                  s = i._handles;
                if (e) {
                  var r = n.slice(arguments, 1),
                    a = o(e);
                  if (!s) return i;
                  if (!(t = s[a])) return i;
                  t.length > 1 && (t = t.slice());
                  for (var l = 0, c = t.length; l < c; l++)
                    "function" == typeof t[l] && t[l].apply(i, r);
                  return i;
                }
              },
              $once: function (e, t) {
                var i = n.slice(arguments);
                return i.push({ once: !0 }), this.$on.apply(this, i);
              },
            };
          n.extend(s.prototype, a),
            (s.mixTo = function (e) {
              (e = "function" == typeof e ? e.prototype : e), n.extend(e, a);
            }),
            (t.exports = s);
        },
        { "./util": 16 },
      ],
      6: [
        function (e, t, i) {
          e("./polyfills");
          var o = this.ENV || {};
          (o.InitRem = e("./initRem")),
            (o.util = e("./util")),
            (o.TimeLine = e("./timeLine")),
            (o.Loader = e("./loader")),
            (o.Platform = e("./platform")),
            (o.Emitter = e("./event")),
            (o.SliderPage = e("./SliderPage")),
            (o.Share = e("./share")),
            (o.version = "1.0.4"),
            (o.config = function (e) {
              var t = e.debug || !1,
                i = e.rem || null,
                s = e.loader || null,
                n = e.guiding || null,
                r = e.share || null;
              (o.util._debug = t),
                i && new o.InitRem(i).init(),
                s && s.auto && ((s = Object.assign({}, s)), new o.Loader(s)),
                n && new o.Platform().guiding(n),
                r && new o.Share(r);
            }),
            (o.debug = function (e) {
              if (1 == e) {
                var t = document.getElementsByTagName("head");
                if (0 == t.length) return;
                var i = document.createElement("script");
                (i.src = "//cdn.bootcss.com/eruda/1.5.5/eruda.min.js"),
                  (i.async = !0),
                  t[0].appendChild(i),
                  (i.onload = function () {
                    eruda.init();
                  });
              }
            }),
            (t.exports = o);
        },
        {
          "./SliderPage": 2,
          "./event": 5,
          "./initRem": 8,
          "./loader": 9,
          "./platform": 10,
          "./polyfills": 11,
          "./share": 12,
          "./timeLine": 13,
          "./util": 16,
        },
      ],
      7: [
        function (e, t, i) {
          e("./css/ienvcss.css"),
            e("./css/sliderPage.css"),
            (t.exports = e("./ienv"));
        },
        { "./css/ienvcss.css": 3, "./css/sliderPage.css": 4, "./ienv": 6 },
      ],
      8: [
        function (e, t, i) {
          var o = (function (e) {
            function t(t) {
              (this._docEle = e.document.documentElement),
                (this._viewportDom = e.document.querySelector(
                  'meta[name="viewport"]'
                )),
                (this._bLine = t.bline || "bx"),
                (this._rVal = t.rval || 750),
                (this._opx = t.opx || !1),
                (this._pxScale = this._opx ? 1 / e.devicePixelRatio : 1);
            }
            return (
              (t.prototype.init = function () {
                var t =
                  "orientationchange" in e
                    ? "orientationchange"
                    : "orientationchange";
                this._viewportDom &&
                  (this._viewportDom.setAttribute("name", "viewport"),
                  this._viewportDom.setAttribute(
                    "content",
                    "width=device-width,initial-scale=" +
                      this._pxScale +
                      ", maximum-scale=" +
                      this._pxScale +
                      ", minimum-scale=" +
                      this._pxScale +
                      ", user-scalable=no"
                  )),
                  this.remHandle(),
                  e.document.addEventListener &&
                    (e.addEventListener(t, this.remHandle.bind(this), !1),
                    e.document.addEventListener(
                      "DOMContentLoaded",
                      this.remHandle.bind(this),
                      !1
                    ));
              }),
              (t.prototype.remHandle = function () {
                var e =
                  "bx" == this._bLine
                    ? this._docEle.clientWidth
                    : this._docEle.clientHeight;
                e &&
                  (this._docEle.style.fontSize = (e / this._rVal) * 100 + "px");
              }),
              t
            );
          })(window);
          t.exports = o;
        },
        {},
      ],
      9: [
        function (e, t, i) {
          (function (i) {
            var o = e("./util"),
              s = e("./timeline"),
              n = e("./event"),
              r = e("./tpl/iLoaderDom.html"),
              a = "undefined" != typeof window ? window : i,
              l = function (e) {
                (this._dom = e.template || r),
                  (this._container = null),
                  (this._version = "iloader 0.1.0"),
                  (this._isAuto = e.auto || !1),
                  (this._isReady = !1),
                  (this._isLoaded = !1),
                  (this._num = 0),
                  (this._sv = 0.82),
                  (this._timeLine = null),
                  (this._ldrNode = null),
                  (this._loading = null),
                  (this._progressNode = null),
                  (this._loadImgNode = null),
                  (this._progressTxt = null),
                  (this._readyNext = e.onReady || null),
                  (this._compNext = e.onComplete || null),
                  (this._onDomReady = this.domReady.bind(this)),
                  (this._onWindowLoad = this.windowLoaded.bind(this)),
                  this.loadInit();
              };
            (l.prototype.createDom = function () {
              this._container = a.document.body;
              var e = a.document.createDocumentFragment();
              (this.loading = a.document.createElement("div")),
                this.loading.setAttribute("class", "loading posa"),
                (this.loading.id = "loader"),
                (this.loading.innerHTML = this._dom),
                e.appendChild(this.loading),
                o.prepend(e, this._container);
            }),
              (l.prototype.addEvents = function () {
                a.document.addEventListener(
                  "DOMContentLoaded",
                  this._onDomReady,
                  !1
                ),
                  a.addEventListener("load", this._onWindowLoad, !1);
              }),
              (l.prototype.removeEvents = function () {
                a.document.removeEventListener(
                  "DOMContentLoaded",
                  this._onDomReady,
                  !1
                ),
                  a.removeEventListener("load", this._onWindowLoad, !1);
              }),
              (l.prototype.loadInit = function () {
                this._isAuto && this.addEvents(),
                  (this._timeLine =
                    this._timeLine ||
                    new s({
                      auto: !1,
                      interval: 100,
                      process: this.checkState.bind(this),
                    })),
                  this.tlStart();
              }),
              (l.prototype.checkState = function () {
                this._isLoaded
                  ? this.updateForLoaded()
                  : this._isReady
                  ? this.updateForReady()
                  : o.logs("...waiting...");
              }),
              (l.prototype.updateForReady = function () {
                o.logs("当前更新加载完成前演示动画"),
                  (this._progressNode =
                    this._progressNode ||
                    a.document.querySelector(".progress")),
                  (this._loadImgNode =
                    this._loadImgNode || a.document.querySelector(".load_img")),
                  (this._progressTxt =
                    this._progressTxt ||
                    a.document.querySelector(".progress-num")),
                  this._num <= this._sv &&
                    ((this._num += 0.01),
                    this._progressNode &&
                      (this._progressNode.style.webkitTransform =
                        "scaleX(" + this._num + ")"),
                    this._loadImgNode &&
                      (this._loadImgNode.style.left =
                        Math.round(100 * this._num) + "%"),
                    this._progressTxt &&
                      (this._progressTxt.innerHTML =
                        Math.round(100 * this._num) + "%"));
              }),
              (l.prototype.updateForLoaded = function () {
                o.logs("当前更新加载完成后动画"),
                  (this._num += 0.05),
                  this._num >= 1 &&
                    (this.removeEvents(),
                    this.tlremove(),
                    (this._loading =
                      this._loading || a.document.querySelector("#loader")),
                    // this._loading && (this._loading.style.display = "none"),
                    o.logs("this._loading=", this._loading),
                    "function" == typeof this._compNext && this._compNext(),
                    this.windowLoaded(),
                    this.$emit("loaded")),
                  (this._progressNode =
                    this._progressNode ||
                    a.document.querySelector(".progress")),
                    (this._loadImgNode =
                      this._loadImgNode || a.document.querySelector(".load_img")),
                  (this._progressTxt =
                    this._progressTxt ||
                    a.document.querySelector(".progress-num")),
                  this._progressNode &&
                    (this._progressNode.style.webkitTransform =
                      "scaleX(" + (this._num > 1 ? 1 : this._num) + ")"),
                  this._loadImgNode &&
                      (this._loadImgNode.style.left =
                        (Math.round(100 * this._num)> 100
                        ? 100
                        : Math.round(100 * this._num)) + "%"),
                  this._progressTxt &&
                    (this._progressTxt.innerHTML =
                      (Math.round(100 * this._num) > 100
                        ? 100
                        : Math.round(100 * this._num)) + "%");
              }),
              (l.prototype.domReady = function () {
                this.createDom(),
                  (this._isReady = !0),
                  "function" == typeof this._readyNext && this._readyNext(),
                  this.$emit("ready");
              }),
              (l.prototype.onReady = function (e) {
                (this._readyNext = e || this.callback),
                  this._isAuto || this.domReady(),
                  this._isReady &&
                    o.warn(
                      "DOMContentLoaded has already done it,if you need to manually call, please set the isAutoLoad to false"
                    );
              }),
              (l.prototype.onComplete = function (e) {
                (this._compNext = e || this._compNext),
                  this._isAuto || (this.windowLoaded(), this.$emit("loaded")),
                  this._isLoaded &&
                    o.warn(
                      "The load event has been executed,if you need to manually call, please set the isAutoLoad to false"
                    );
              }),
              (l.prototype.windowLoaded = function () {
                this._isLoaded = !0;
              }),
              (l.prototype.tlStart = function () {
                this._timeLine.start();
              }),
              (l.prototype.tlPause = function () {
                this._timeLine.pause();
              }),
              (l.prototype.tlremove = function () {
                this._timeLine.stop(), (this._timeLine = null);
              }),
              n.mixTo(l),
              (t.exports = l);
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        {
          "./event": 5,
          "./timeline": 14,
          "./tpl/iLoaderDom.html": 15,
          "./util": 16,
        },
      ],
      10: [
        function (e, t, i) {
          var o = (function (e) {
            function t() {
              (this._ua = e.navigator.userAgent),
                (this._ard = !1),
                (this._ios = !1),
                (this._wx = !1),
                (this._pc = !1),
                (this._ie = !1),
                (this._wkt = !1),
                (this._agents = [
                  "Android",
                  "iPhone",
                  "SymbianOS",
                  "Windows Phone",
                  "iPad",
                  "iPod",
                ]),
                this.init();
            }
            return (
              (t.prototype.init = function () {
                this.isWX(), this.isIOS(), this.isAndriod(), this.isPC();
              }),
              (t.prototype.isWX = function () {
                return (
                  "micromessenger" ==
                  this._ua.toLowerCase().match(/MicroMessenger/i)
                    ? (this._wx = !0)
                    : (this._wx = !1),
                  this._wx
                );
              }),
              (t.prototype.isIOS = function () {
                return (
                  this._ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
                    ? (this._ios = !0)
                    : (this._ios = !1),
                  this._ios
                );
              }),
              (t.prototype.isAndriod = function () {
                return (
                  this._ua.indexOf("Android") > -1 ||
                  this._ua.indexOf("Linux") > -1
                    ? (this._ard = !0)
                    : (this._ard = !1),
                  this._ard
                );
              }),
              (t.prototype.isPC = function () {
                this._pc = !0;
                for (var e = 0; e < this._agents.length; e++)
                  if (this._ua.indexOf(this._agents[e]) > -1) {
                    this._pc = !1;
                    break;
                  }
                return this._pc;
              }),
              (t.prototype.isIE = function () {}),
              (t.prototype.isWebkit = function () {}),
              (t.prototype.getCurrent = function () {
                return this._pc
                  ? "pc"
                  : this._ard
                  ? "andriod"
                  : this._ios
                  ? "ios"
                  : void 0;
              }),
              (t.prototype.guiding = function (t) {
                return t.pc && "#" != t.pc && this._pc
                  ? void (e.location.href = t.pc)
                  : t.mobile && "#" != t.mobile && (this._ard || this._ios)
                  ? void (e.location.href = t.mobile)
                  : t.andriod && "#" != t.andriod && this._ard
                  ? void (e.location.href = t.andriod)
                  : t.ios && "#" != t.ios && this._ios
                  ? void (e.location.href = t.ios)
                  : void 0;
              }),
              t
            );
          })(window);
          t.exports = o;
        },
        {},
      ],
      11: [
        function (e, t, i) {
          "use strict";
          t.exports = (function () {
            void 0 === Function.prototype.name &&
              Object.defineProperty(Function.prototype, "name", {
                get: function () {
                  return this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1];
                },
              }),
              void 0 === Object.assign &&
                (function () {
                  Object.assign = function (e) {
                    if (void 0 === e || null == e) return {};
                    for (var t = Object(e), i = 1; i < arguments.length; i++) {
                      var o = arguments[i];
                      if (void 0 !== o && null !== o)
                        for (var s in o)
                          Object.prototype.hasOwnProperty.call(o, s) &&
                            (t[s] = o[s]);
                    }
                    return t;
                  };
                })();
          })();
        },
        {},
      ],
      12: [
        function (e, t, i) {
          var o = e("./event"),
            s = e("./util"),
            n = function (e) {
              (this._location = location.href),
                (this._basePath = this.getBasePath());
              var t = [
                "checkJsApi",
                "onMenuShareTimeline",
                "onMenuShareAppMessage",
                "onMenuShareQQ",
                "onMenuShareWeibo",
                "onMenuShareQZone",
              ];
              if (e.jsApiList && !s.isArray(e.jsApiList))
                throw new Error("分享图片是必须的");
              if (
                ((this._shareConfig = {
                  title: e.title || document.title,
                  desc: e.desc || this._location,
                  link: e.link || this._location,
                  imgUrl: /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([\/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i.test(
                    e.imgUrl
                  )
                    ? e.imgUrl
                    : this._basePath + e.imgUrl,
                  jsApiList: (e.jsApiList && t.concat(e.jsApiList)) || t,
                  trigger: function (e) {
                    console.log("iloader已经分享朋友成功。");
                  },
                  success: function (e) {
                    console.log("iloader已经分享朋友圈成功。");
                  },
                  cancel: function (e) {
                    console.log("iloader已经取消。");
                  },
                  fail: function (e) {},
                }),
                !this._shareConfig.imgUrl)
              )
                throw new Error("分享图片是必须的");
              (this._debug = e.debug || !1), this.init();
            };
          (n.prototype = {
            constructor: n,
            init: function () {
              this.CreateAjax(), this.wxReady(), this.wxError(), this.addImg();
            },
            ajax: function (e) {
              (e = e || {}),
                (e.method = e.method.toUpperCase() || "POST"),
                (e.url = e.url || ""),
                (e.async = e.async || !0),
                (e.data = e.data || null),
                (e.success = e.success || function () {});
              var t = null;
              t = XMLHttpRequest
                ? new XMLHttpRequest()
                : new ActiveXObject("Microsoft.XMLHTTP");
              var i = [];
              for (var o in e.data)
                i.push(
                  encodeURIComponent(o) + "=" + encodeURIComponent(e.data[o])
                );
              var s = i.join("&");
              "POST" === e.method.toUpperCase()
                ? (t.open(e.method, e.url, e.async),
                  t.setRequestHeader(
                    "Content-Type",
                    "application/x-www-form-urlencoded;charset=utf-8"
                  ),
                  t.send(s))
                : "GET" === e.method.toUpperCase() &&
                  (t.open(e.method, e.url + "?" + s, e.async), t.send(null)),
                (t.onreadystatechange = function () {
                  if (4 == t.readyState && 200 == t.status) {
                    var i = JSON.parse(t.responseText);
                    e.success(i);
                  }
                });
            },
            formatParams: function (e) {
              var t = [];
              for (var i in e) t.push(i + "=" + e[i]);
              return t.join("&");
            },
            CreateAjax: function () {
              var e = { url: this._location.split("#")[0] },
                t = (this._location.split("#")[0], +new Date()),
                i = this,
                o =
                  window.location.href.indexOf("hanyao426.github.io") > -1
                    ? "//sdk.51job.com/mobile/post.php"
                    : "//testsdk.51ideal.com/post.php";
              this.ajax({
                method: "post",
                url: o + "?time=" + t,
                data: e,
                success: function (e) {
                  console.log("success", e), i._xhrSuccess(e);
                },
                error: function (e, t, o) {
                  i._xhrError(), console.log("error");
                },
              });
            },
            _xhrSuccess: function (e) {
              this._wxConfig(e), this._debug && this.showShareDebug();
            },
            _xhrError: function (e) {},
            _wxConfig: function (e) {
              var t = this;
              wx.config({
                debug: t._debug,
                appId: e.appId,
                timestamp: e.timestamp,
                nonceStr: e.nonceStr,
                signature: e.signature,
                jsApiList: t._shareConfig.jsApiList,
              }),
                console.log("_wxConfig");
            },
            wxReady: function () {
              var e = this;
              wx.ready(function () {
                console.log(
                  s.deepExtend({}, e._shareConfig, {
                    success: function () {
                      e.$emit("shareSuccess", "onMenuShareAppMessage");
                    },
                  })
                ),
                  wx.onMenuShareAppMessage(
                    s.deepExtend({}, e._shareConfig, {
                      success: function () {
                        e.$emit("shareSuccess", "onMenuShareAppMessage");
                      },
                    })
                  ),
                  wx.onMenuShareTimeline(
                    s.deepExtend({}, e._shareConfig, {
                      success: function () {
                        e.$emit("shareSuccess", "onMenuShareTimeline");
                      },
                    })
                  ),
                  wx.onMenuShareQQ(
                    s.deepExtend({}, e._shareConfig, {
                      success: function () {
                        e.$emit("shareSuccess", "onMenuShareQQ");
                      },
                    })
                  ),
                  wx.onMenuShareWeibo(
                    s.deepExtend({}, e._shareConfig, {
                      success: function () {
                        e.$emit("shareSuccess", "onMenuShareWeibo");
                      },
                    })
                  ),
                  wx.onMenuShareQZone(
                    s.deepExtend({}, e._shareConfig, {
                      success: function () {
                        e.$emit("shareSuccess", "onMenuShareQZone");
                      },
                    })
                  ),
                  console.log("wxReady");
              });
            },
            wxError: function () {
              wx.error(function (e) {
                console.log("wxError", e);
              });
            },
            changeConfig: function (e) {
              var t = this;
              e.imgUrl && (e.imgUrl = this._basePath + e.imgUrl);
              var i = s.deepExtend({}, this._shareConfig, e);
              console.log(i),
                wx.onMenuShareAppMessage(
                  s.deepExtend({}, i, {
                    success: function () {
                      t.$emit("shareSuccess", "onMenuShareAppMessage");
                    },
                  })
                ),
                wx.onMenuShareTimeline(
                  s.deepExtend({}, i, {
                    success: function () {
                      t.$emit("shareSuccess", "onMenuShareTimeline");
                    },
                  })
                ),
                wx.onMenuShareQQ(
                  s.deepExtend({}, i, {
                    success: function () {
                      t.$emit("shareSuccess", "onMenuShareQQ");
                    },
                  })
                ),
                wx.onMenuShareWeibo(
                  s.deepExtend({}, i, {
                    success: function () {
                      t.$emit("shareSuccess", "onMenuShareWeibo");
                    },
                  })
                ),
                wx.onMenuShareQZone(
                  s.deepExtend({}, i, {
                    success: function () {
                      t.$emit("shareSuccess", "onMenuShareQZone");
                    },
                  })
                ),
                console.log("wxChangeConfig");
            },
            getBasePath: function () {
              var e = "",
                t = "";
              return (
                (e =
                  e in location
                    ? location.origin
                    : location.protocol +
                      "//" +
                      location.hostname +
                      (location.port ? ":" + location.port : "")),
                (t = location.pathname.split("/")),
                t.pop(),
                t.push(""),
                (t = t.join("/")),
                e + t
              );
            },
            addImg: function () {
              var e = document.body;
              if (e) {
                var t = document.createElement("img");
                (t.src = this._shareConfig.imgUrl),
                  (t.style.cssText =
                    "position:absolute;top:-200%;left:0;width:320px;height:auto"),
                  e.insertBefore(t, e.childNodes[0]);
              }
            },
            showShareDebug: function () {
              console.log(
                "%c--------------------SHARE START--------------------\n%cShare提示\n%c分享标题：%c" +
                  this._shareConfig.title +
                  "\n%c分享详情：%c" +
                  this._shareConfig.desc +
                  "\n%c分享图片：%c" +
                  this._shareConfig.imgUrl +
                  "\n%c分享链接：%c" +
                  this._shareConfig.link +
                  "\n%c--------------------SHARE END--------------------",
                "color:#989a9d;",
                "font-size:20px;",
                "color:#000;",
                "color:green;",
                "color:#000;",
                "color:green;",
                "color:#000;",
                "color:green;",
                "color:#000;",
                "color:green;",
                "color:#989a9d;"
              );
            },
          }),
            o.mixTo(n),
            (t.exports = n);
        },
        { "./event": 5, "./util": 16 },
      ],
      13: [
        function (e, t, i) {
          var o = e("./event"),
            s = (function (e) {
              function t(e) {
                this.polyfills(),
                  (this._auto = 0 != e.auto),
                  (this._invl = e.interval || 0),
                  (this._totalFrames = e.totalFrames || Number.MAX_VALUE - 1),
                  (this._frameProcess = e.process || null),
                  (this._params = e.params || null),
                  (this._frameId = 0),
                  (this._lineId = null),
                  (this._preTime = 0),
                  (this._isPause = !1),
                  (this.MinInvl = 16.7),
                  console.log("this._auto=", this._auto),
                  this._auto && this.start();
              }
              return (
                (t.prototype.start = function () {
                  if (null == this._frameProcess);
                  else if (this._totalFrames < 0 || this._invl < 0)
                    return void this.errors("持续长度或帧时间间隔配置错误！");
                  (this._preTime = new Date().getTime()),
                    (this._isPause = !1),
                    this.$emit("TimeStart", { target: this }),
                    this.processing();
                }),
                (t.prototype.processing = function () {
                  var t = this;
                  if (
                    this._totalFrames > 0 &&
                    this._frameId == this._totalFrames
                  )
                    return void this.stop();
                  if (1 != this._isPause) {
                    if (this._invl > this.MinInvl) {
                      var i = new Date().getTime();
                      i - this._preTime > this._invl &&
                        (this._frameId++,
                        this._frameProcess &&
                          this._frameProcess(this._frameId, this._params),
                        this.$emit("FrameProcess", {
                          target: this,
                          frameId: this._frameId,
                          params: this._params,
                        }),
                        (this._preTime = i));
                    } else
                      this._frameId++,
                        this._frameProcess &&
                          this._frameProcess(this._frameId, this._params),
                        this.$emit("FrameProcess", {
                          frameId: this._frameId,
                          params: this._params,
                        });
                    this._lineId = e.requestAnimationFrame(function () {
                      t.processing();
                    });
                  }
                }),
                (t.prototype.stop = function () {
                  null != this._lineId &&
                    ((this._isPause = !0),
                    e.cancelAnimationFrame(this._lineId),
                    (this._frameId = 0),
                    (this._lineId = null)),
                    this.$emit("TimeStop", { target: this });
                }),
                (t.prototype.pause = function () {
                  null != this._lineId &&
                    ((this._isPause = !0),
                    e.cancelAnimationFrame(this._lineId),
                    (this._lineId = null)),
                    this.$emit("TimePause", { target: this });
                }),
                (t.prototype.polyfills = function () {
                  for (
                    var t = 0, i = ["webkit", "moz"], o = 0, s = i.length;
                    o < s && !e.requestAnimationFrame;
                    ++o
                  )
                    (e.requestAnimationFrame =
                      e[i[o] + "RequestAnimationFrame"]),
                      (e.cancelAnimationFrame =
                        e[i[o] + "CancelAnimationFrame"] ||
                        e[i[o] + "CancelRequestAnimationFrame"]);
                  e.requestAnimationFrame ||
                    (e.requestAnimationFrame = function (i, o) {
                      var s = new Date().getTime(),
                        n = Math.max(0, 16.7 - (s - t)),
                        r = e.setTimeout(function () {
                          i(s + n);
                        }, n);
                      return (t = s + n), r;
                    }),
                    e.cancelAnimationFrame ||
                      (e.cancelAnimationFrame = function (e) {
                        clearTimeout(e);
                      });
                }),
                (t.prototype.errors = function (e) {
                  throw new Error(e);
                }),
                t
              );
            })(window);
          o.mixTo(s), (t.exports = s);
        },
        { "./event": 5 },
      ],
      14: [
        function (e, t, i) {
          arguments[4][13][0].apply(i, arguments);
        },
        { "./event": 5, dup: 13 },
      ],
      15: [
        function (e, t, i) {
          t.exports =
            '<div class="load-content xy">\r\n    <div class="cell">\r\n        <div class="progress"></div>\r\n    </div>\r\n    <div class="ideal">\r\n        <div class="head-wrap">\r\n            <div class="head">\r\n                <div class="face"></div>\r\n                <div class="hat"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <span class="progress-num">0%</span>\r\n    <p>ideal定制</p>\r\n</div>';
        },
        {},
      ],
      16: [
        function (e, t, i) {
          var o = t.exports;
          (o.debug = !1),
            (o.prepend = function (e, t) {
              var i = t.firstChild;
              return i ? t.insertBefore(e, i) : t.appendChild(e), e;
            }),
            (o.logs = function () {
              1 == this.debug && console.log.apply(console, arguments);
            }),
            (o.warn = function () {
              console.warn.apply(console, arguments);
            }),
            (o.extend = function (e, t, i) {
              for (var o in t)
                t.hasOwnProperty(o) &&
                  ((void 0 !== e[o] && 1 != i) || (e[o] = t[o]));
              return e;
            }),
            (o.slice = function (e, t, i) {
              for (var o = [], s = t || 0, n = i || e.length; s < n; s++)
                o.push(e[s]);
              return o;
            }),
            (o.isArray = function (e) {
              return "[object Array]" == Object.prototype.toString.call(e);
            }),
            (o.deepCopy = function (e, t) {
              var i;
              t || (i = Array.isArray(e) ? [] : {});
              for (var o in e)
                e[o] && "object" == typeof e[o]
                  ? t
                    ? (t[o] = deepCopy(e[o]))
                    : (i[o] = deepCopy(e[o]))
                  : t
                  ? (t[o] = e[o])
                  : (i[o] = e[o]);
              return t || i;
            }),
            (o.deepExtend = function () {
              if (!1 !== arguments[0]) {
                if (1 !== arguments.length) {
                  for (
                    var e = "boolean" == typeof arguments[0],
                      t = e ? 2 : 1,
                      i = e ? arguments[1] : arguments[0],
                      s = Array.prototype.slice.call(arguments, t),
                      n = 0,
                      r = s.length;
                    n < r;
                    n++
                  )
                    if (!0 === arguments[0]) i = o.deepCopy(s[n], i);
                    else for (var a in s[n]) i[a] = s[n][a];
                  return i;
                }
                for (var a in arguments[0]) $[a] = arguments[0][a];
              }
            });
        },
        {},
      ],
    },
    {},
    [7]
  )(7);
});

//index-init
iENV.config({ rem: { bline: "bx", rval: 750 } });
window.loader = new iENV.Loader({
  auto: true,
  template: `
  <div class="load_name">
    <h1><span>韩尧</span><img src="images/load_name.png" /><span>满曌曌</span></h1>
    <h1></h1>
  </div>
  <div class="load-content xy">
      <span class="left">2014</span>
      <div class="cell">
            <div class="progress"></div>
            <div class="load_img"><img src="images/load_img.png" /></div>
      </div>
      <span class="right">2020</span>
  </div>
  <div class="load_btn">
    <p>见证一路走来的我们</p>
  </div>
  `,
});
console.log("iENV.version=", iENV.version);

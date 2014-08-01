
/*
 * Hammer.JS
 * version 0.4
 * author: Eight Media
 * https://github.com/EightMedia/hammer.js
 */
function Hammer(a, b, c) {
    function w(a) {
        return a.touches ? a.touches.length : 1
    }

    function x(a) {
        a = a || window.event;
        if (!a.touches) {
            var b = document,
                c = b.body;
            return [{
                x: a.pageX || a.clientX + (b && b.scrollLeft || c && c.scrollLeft || 0) - (b && b.clientLeft || c && b.clientLeft || 0),
                y: a.pageY || a.clientY + (b && b.scrollTop || c && c.scrollTop || 0) - (b && b.clientTop || c && b.clientTop || 0)
            }]
        }
        var d = [],
            e;
        for (var f = 0, g = a.touches.length; f < g; f++) e = a.touches[f], d.push({
            x: e.pageX,
            y: e.pageY
        });
        return d
    }

    function y(a, b) {
        return Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI
    }

    function z(a, b) {
        b.touches = x(b.originalEvent), b.type = a, G(d["on" + a]) && d["on" + a].call(d, b)
    }

    function A(a) {
        a = a || window.event, a.preventDefault ? a.preventDefault() : (a.returnValue = !1, a.cancelBubble = !0)
    }

    function B() {
        i = {}, k = !1, j = 0, f = 0, g = 0, l = null
    }

    function D(c) {
        switch (c.type) {
            case "mousedown":
            case "touchstart":
                i.start = x(c), n = (new Date).getTime(), j = w(c), k = !0, t = c;
                var d = a.getBoundingClientRect(),
                    e = a.clientTop || document.body.clientTop || 0,
                    o = a.clientLeft || document.body.clientLeft || 0,
                    p = window.pageYOffset || a.scrollTop || document.body.scrollTop,
                    q = window.pageXOffset || a.scrollLeft || document.body.scrollLeft;
                r = {
                    top: d.top + p - e,
                    left: d.left + q - o
                }, s = !0, C.hold(c), b.prevent_default && A(c);
                break;
            case "mousemove":
            case "touchmove":
                if (!s) return !1;
                u = c, i.move = x(c), C.transform(c) || C.drag(c);
                break;
            case "mouseup":
            case "mouseout":
            case "touchcancel":
            case "touchend":
                if (!s || l != "transform" && c.touches && c.touches.length > 0) return !1;
                s = !1, v = c, l == "drag" ? z("dragend", {
                    originalEvent: c,
                    direction: h,
                    distance: f,
                    angle: g
                }) : l == "transform" ? z("transformend", {
                    originalEvent: c,
                    position: i.center,
                    scale: c.scale,
                    rotation: c.rotation
                }) : C.tap(t), m = l, B()
        }
    }

    function E(a, b) {
        !b && window.event && window.event.toElement && (b = window.event.toElement);
        if (a === b) return !0;
        if (b) {
            var c = b.parentNode;
            while (c !== null) {
                if (c === a) return !0;
                c = c.parentNode
            }
        }
        return !1
    }

    function F(a, b) {
        var c = {};
        if (!b) return a;
        for (var d in a) d in b ? c[d] = b[d] : c[d] = a[d];
        return c
    }

    function G(a) {
        return Object.prototype.toString.call(a) == "[object Function]"
    }
    var d = this,
        e = {
            prevent_default: !1,
            css_hacks: !0,
            drag: !0,
            drag_vertical: !0,
            drag_horizontal: !0,
            drag_min_distance: 20,
            transform: !0,
            scale_treshold: .1,
            rotation_treshold: 15,
            tap: !0,
            tap_double: !0,
            tap_max_interval: 300,
            tap_double_distance: 20,
            hold: !0,
            hold_timeout: 500
        };
    b = F(e, b),
        function() {
            if (!b.css_hacks) return !1;
            var c = ["webkit", "moz", "ms", "o", ""],
                d = {
                    userSelect: "none",
                    touchCallout: "none",
                    userDrag: "none",
                    tapHighlightColor: "rgba(0,0,0,0)"
                },
                e = "";
            for (var f = 0; f < c.length; f++)
                for (var g in d) e = g, c[f] && (e = c[f] + e.substring(0, 1).toUpperCase() + e.substring(1)), a.style[e] = d[g]
        }();
    var f = 0,
        g = 0,
        h = 0,
        i = {},
        j = 0,
        k = !1,
        l = null,
        m = null,
        n = null,
        o = {
            x: 0,
            y: 0
        },
        p = null,
        q = null,
        r = {},
        s = !1,
        t, u, v;
    this.getDirectionFromAngle = function(a) {
        var b = {
                down: a >= 45 && a < 135,
                left: a >= 135 || a <= -135,
                up: a < -45 && a > -135,
                right: a >= -45 && a <= 45
            },
            c, d;
        for (d in b)
            if (b[d]) {
                c = d;
                break
            }
        return c
    };
    var C = {
        hold: function(a) {
            b.hold && (l = "hold", clearTimeout(q), q = setTimeout(function() {
                l == "hold" && z("hold", {
                    originalEvent: a,
                    position: i.start
                })
            }, b.hold_timeout))
        },
        drag: function(a) {
            var c = i.move[0].x - i.start[0].x,
                e = i.move[0].y - i.start[0].y;
            f = Math.sqrt(c * c + e * e);
            if (b.drag && f > b.drag_min_distance || l == "drag") {
                g = y(i.start[0], i.move[0]), h = d.getDirectionFromAngle(g);
                var j = h == "up" || h == "down";
                if ((j && !b.drag_vertical || !j && !b.drag_horizontal) && f > b.drag_min_distance) return;
                l = "drag";
                var m = {
                        x: i.move[0].x - r.left,
                        y: i.move[0].y - r.top
                    },
                    n = {
                        originalEvent: a,
                        position: m,
                        direction: h,
                        distance: f,
                        distanceX: c,
                        distanceY: e,
                        angle: g
                    };
                k && (z("dragstart", n), k = !1), z("drag", n), A(a)
            }
        },
        transform: function(a) {
            if (b.transform) {
                var c = a.scale || 1,
                    d = a.rotation || 0;
                if (w(a) != 2) return !1;
                if (l != "drag" && (l == "transform" || Math.abs(1 - c) > b.scale_treshold || Math.abs(d) > b.rotation_treshold)) {
                    l = "transform", i.center = {
                        x: (i.move[0].x + i.move[1].x) / 2 - r.left,
                        y: (i.move[0].y + i.move[1].y) / 2 - r.top
                    };
                    var e = {
                        originalEvent: a,
                        position: i.center,
                        scale: c,
                        rotation: d
                    };
                    return k && (z("transformstart", e), k = !1), z("transform", e), A(a), !0
                }
            }
            return !1
        },
        tap: function(a) {
            var c = (new Date).getTime(),
                d = c - n;
            if (b.hold && !(b.hold && b.hold_timeout > d)) return;
            var e = function() {
                if (o && b.tap_double && m == "tap" && n - p < b.tap_max_interval) {
                    var a = Math.abs(o[0].x - i.start[0].x),
                        c = Math.abs(o[0].y - i.start[0].y);
                    return o && i.start && Math.max(a, c) < b.tap_double_distance
                }
                return !1
            }();
            e ? (l = "double_tap", p = null, z("doubletap", {
                originalEvent: a,
                position: i.start
            }), A(a)) : (l = "tap", p = c, o = i.start, b.tap && (z("tap", {
                originalEvent: a,
                position: i.start
            }), A(a)))
        }
    };
    "ontouchstart" in window ? (a.addEventListener("touchstart", D, !1), a.addEventListener("touchmove", D, !1), a.addEventListener("touchend", D, !1), a.addEventListener("touchcancel", D, !1)) : a.addEventListener ? (a.addEventListener("mouseout", function(b) {
        E(a, b.relatedTarget) || D(b)
    }, !1), a.addEventListener("mouseup", D, !1), a.addEventListener("mousedown", D, !1), a.addEventListener("mousemove", D, !1)) : document.attachEvent && (a.attachEvent("onmouseout", function(b) {
        E(a, b.relatedTarget) || D(b)
    }, !1), a.attachEvent("onmouseup", D), a.attachEvent("onmousedown", D), a.attachEvent("onmousemove", D))
}
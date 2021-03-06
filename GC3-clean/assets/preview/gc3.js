
/*!
 * jQuery JavaScript Library v1.9.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-2-4
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
    }(function(a, b) {
        function I(a) {
            var b = a.length,
                c = t.type(a);
            return t.isWindow(a) ? !1 : a.nodeType === 1 && b ? !0 : c === "array" || c !== "function" && (b === 0 || typeof b == "number" && b > 0 && b - 1 in a)
        }

        function K(a) {
            var b = J[a] = {};
            return t.each(a.match(v) || [], function(a, c) {
                b[c] = !0
            }), b
        }

        function N(a, c, d, e) {
            if (!t.acceptData(a)) return;
            var f, g, h = t.expando,
                i = typeof c == "string",
                j = a.nodeType,
                l = j ? t.cache : a,
                m = j ? a[h] : a[h] && h;
            if ((!m || !l[m] || !e && !l[m].data) && i && d === b) return;
            m || (j ? a[h] = m = k.pop() || t.guid++ : m = h), l[m] || (l[m] = {}, j || (l[m].toJSON = t.noop));
            if (typeof c == "object" || typeof c == "function") e ? l[m] = t.extend(l[m], c) : l[m].data = t.extend(l[m].data, c);
            return f = l[m], e || (f.data || (f.data = {}), f = f.data), d !== b && (f[t.camelCase(c)] = d), i ? (g = f[c], g == null && (g = f[t.camelCase(c)])) : g = f, g
        }

        function O(a, b, c) {
            if (!t.acceptData(a)) return;
            var d, e, f, g = a.nodeType,
                h = g ? t.cache : a,
                i = g ? a[t.expando] : t.expando;
            if (!h[i]) return;
            if (b) {
                f = c ? h[i] : h[i].data;
                if (f) {
                    t.isArray(b) ? b = b.concat(t.map(b, t.camelCase)) : b in f ? b = [b] : (b = t.camelCase(b), b in f ? b = [b] : b = b.split(" "));
                    for (d = 0, e = b.length; d < e; d++) delete f[b[d]];
                    if (!(c ? Q : t.isEmptyObject)(f)) return
                }
            }
            if (!c) {
                delete h[i].data;
                if (!Q(h[i])) return
            }
            g ? t.cleanData([a], !0) : t.support.deleteExpando || h != h.window ? delete h[i] : h[i] = null
        }

        function P(a, c, d) {
            if (d === b && a.nodeType === 1) {
                var e = "data-" + c.replace(M, "-$1").toLowerCase();
                d = a.getAttribute(e);
                if (typeof d == "string") {
                    try {
                        d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : +d + "" === d ? +d : L.test(d) ? t.parseJSON(d) : d
                    } catch (f) {}
                    t.data(a, c, d)
                } else d = b
            }
            return d
        }

        function Q(a) {
            var b;
            for (b in a) {
                if (b === "data" && t.isEmptyObject(a[b])) continue;
                if (b !== "toJSON") return !1
            }
            return !0
        }

        function be() {
            return !0
        }

        function bf() {
            return !1
        }

        function bl(a, b) {
            do a = a[b]; while (a && a.nodeType !== 1);
            return a
        }

        function bm(a, b, c) {
            b = b || 0;
            if (t.isFunction(b)) return t.grep(a, function(a, d) {
                var e = !!b.call(a, d, a);
                return e === c
            });
            if (b.nodeType) return t.grep(a, function(a) {
                return a === b === c
            });
            if (typeof b == "string") {
                var d = t.grep(a, function(a) {
                    return a.nodeType === 1
                });
                if (bi.test(b)) return t.filter(b, d, !c);
                b = t.filter(b, d)
            }
            return t.grep(a, function(a) {
                return t.inArray(a, b) >= 0 === c
            })
        }

        function bn(a) {
            var b = bo.split("|"),
                c = a.createDocumentFragment();
            if (c.createElement)
                while (b.length) c.createElement(b.pop());
            return c
        }

        function bF(a, b) {
            return a.getElementsByTagName(b)[0] || a.appendChild(a.ownerDocument.createElement(b))
        }

        function bG(a) {
            var b = a.getAttributeNode("type");
            return a.type = (b && b.specified) + "/" + a.type, a
        }

        function bH(a) {
            var b = bA.exec(a.type);
            return b ? a.type = b[1] : a.removeAttribute("type"), a
        }

        function bI(a, b) {
            var c, d = 0;
            for (;
                (c = a[d]) != null; d++) t._data(c, "globalEval", !b || t._data(b[d], "globalEval"))
        }

        function bJ(a, b) {
            if (b.nodeType !== 1 || !t.hasData(a)) return;
            var c, d, e, f = t._data(a),
                g = t._data(b, f),
                h = f.events;
            if (h) {
                delete g.handle, g.events = {};
                for (c in h)
                    for (d = 0, e = h[c].length; d < e; d++) t.event.add(b, c, h[c][d])
            }
            g.data && (g.data = t.extend({}, g.data))
        }

        function bK(a, b) {
            var c, d, e;
            if (b.nodeType !== 1) return;
            c = b.nodeName.toLowerCase();
            if (!t.support.noCloneEvent && b[t.expando]) {
                e = t._data(b);
                for (d in e.events) t.removeEvent(b, d, e.handle);
                b.removeAttribute(t.expando)
            }
            if (c === "script" && b.text !== a.text) bG(b).text = a.text, bH(b);
            else if (c === "object") b.parentNode && (b.outerHTML = a.outerHTML), t.support.html5Clone && a.innerHTML && !t.trim(b.innerHTML) && (b.innerHTML = a.innerHTML);
            else if (c === "input" && bx.test(a.type)) b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value);
            else if (c === "option") b.defaultSelected = b.selected = a.defaultSelected;
            else if (c === "input" || c === "textarea") b.defaultValue = a.defaultValue
        }

        function bL(a, c) {
            var d, f, g = 0,
                h = typeof a.getElementsByTagName !== e ? a.getElementsByTagName(c || "*") : typeof a.querySelectorAll !== e ? a.querySelectorAll(c || "*") : b;
            if (!h)
                for (h = [], d = a.childNodes || a;
                    (f = d[g]) != null; g++)!c || t.nodeName(f, c) ? h.push(f) : t.merge(h, bL(f, c));
            return c === b || c && t.nodeName(a, c) ? t.merge([a], h) : h
        }

        function bM(a) {
            bx.test(a.type) && (a.defaultChecked = a.checked)
        }

        function cb(a, b) {
            if (b in a) return b;
            var c = b.charAt(0).toUpperCase() + b.slice(1),
                d = b,
                e = ca.length;
            while (e--) {
                b = ca[e] + c;
                if (b in a) return b
            }
            return d
        }

        function cc(a, b) {
            return a = b || a, t.css(a, "display") === "none" || !t.contains(a.ownerDocument, a)
        }

        function cd(a, b) {
            var c, d, e, f = [],
                g = 0,
                h = a.length;
            for (; g < h; g++) {
                d = a[g];
                if (!d.style) continue;
                f[g] = t._data(d, "olddisplay"), c = d.style.display, b ? (!f[g] && c === "none" && (d.style.display = ""), d.style.display === "" && cc(d) && (f[g] = t._data(d, "olddisplay", ch(d.nodeName)))) : f[g] || (e = cc(d), (c && c !== "none" || !e) && t._data(d, "olddisplay", e ? c : t.css(d, "display")))
            }
            for (g = 0; g < h; g++) {
                d = a[g];
                if (!d.style) continue;
                if (!b || d.style.display === "none" || d.style.display === "") d.style.display = b ? f[g] || "" : "none"
            }
            return a
        }

        function ce(a, b, c) {
            var d = bV.exec(b);
            return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
        }

        function cf(a, b, c, d, e) {
            var f = c === (d ? "border" : "content") ? 4 : b === "width" ? 1 : 0,
                g = 0;
            for (; f < 4; f += 2) c === "margin" && (g += t.css(a, c + b_[f], !0, e)), d ? (c === "content" && (g -= t.css(a, "padding" + b_[f], !0, e)), c !== "margin" && (g -= t.css(a, "border" + b_[f] + "Width", !0, e))) : (g += t.css(a, "padding" + b_[f], !0, e), c !== "padding" && (g += t.css(a, "border" + b_[f] + "Width", !0, e)));
            return g
        }

        function cg(a, b, c) {
            var d = !0,
                e = b === "width" ? a.offsetWidth : a.offsetHeight,
                f = bO(a),
                g = t.support.boxSizing && t.css(a, "boxSizing", !1, f) === "border-box";
            if (e <= 0 || e == null) {
                e = bP(a, b, f);
                if (e < 0 || e == null) e = a.style[b];
                if (bW.test(e)) return e;
                d = g && (t.support.boxSizingReliable || e === a.style[b]), e = parseFloat(e) || 0
            }
            return e + cf(a, b, c || (g ? "border" : "content"), d, f) + "px"
        }

        function ch(a) {
            var b = f,
                c = bY[a];
            if (!c) {
                c = ci(a, b);
                if (c === "none" || !c) bN = (bN || t("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(b.documentElement), b = (bN[0].contentWindow || bN[0].contentDocument).document, b.write("<!doctype html><html><body>"), b.close(), c = ci(a, b), bN.detach();
                bY[a] = c
            }
            return c
        }

        function ci(a, b) {
            var c = t(b.createElement(a)).appendTo(b.body),
                d = t.css(c[0], "display");
            return c.remove(), d
        }

        function co(a, b, c, d) {
            var e;
            if (t.isArray(b)) t.each(b, function(b, e) {
                c || ck.test(a) ? d(a, e) : co(a + "[" + (typeof e == "object" ? b : "") + "]", e, c, d)
            });
            else if (!c && t.type(b) === "object")
                for (e in b) co(a + "[" + e + "]", b[e], c, d);
            else d(a, b)
        }

        function cF(a) {
            return function(b, c) {
                typeof b != "string" && (c = b, b = "*");
                var d, e = 0,
                    f = b.toLowerCase().match(v) || [];
                if (t.isFunction(c))
                    while (d = f[e++]) d[0] === "+" ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
            }
        }

        function cG(a, b, c, d) {
            function g(h) {
                var i;
                return e[h] = !0, t.each(a[h] || [], function(a, h) {
                    var j = h(b, c, d);
                    if (typeof j == "string" && !f && !e[j]) return b.dataTypes.unshift(j), g(j), !1;
                    if (f) return !(i = j)
                }), i
            }
            var e = {},
                f = a === cC;
            return g(b.dataTypes[0]) || !e["*"] && g("*")
        }

        function cH(a, c) {
            var d, e, f = t.ajaxSettings.flatOptions || {};
            for (e in c) c[e] !== b && ((f[e] ? a : d || (d = {}))[e] = c[e]);
            return d && t.extend(!0, a, d), a
        }

        function cI(a, c, d) {
            var e, f, g, h, i = a.contents,
                j = a.dataTypes,
                k = a.responseFields;
            for (h in k) h in d && (c[k[h]] = d[h]);
            while (j[0] === "*") j.shift(), f === b && (f = a.mimeType || c.getResponseHeader("Content-Type"));
            if (f)
                for (h in i)
                    if (i[h] && i[h].test(f)) {
                        j.unshift(h);
                        break
                    }
            if (j[0] in d) g = j[0];
            else {
                for (h in d) {
                    if (!j[0] || a.converters[h + " " + j[0]]) {
                        g = h;
                        break
                    }
                    e || (e = h)
                }
                g = g || e
            } if (g) return g !== j[0] && j.unshift(g), d[g]
        }

        function cJ(a, b) {
            var c, d, e, f, g = {},
                h = 0,
                i = a.dataTypes.slice(),
                j = i[0];
            a.dataFilter && (b = a.dataFilter(b, a.dataType));
            if (i[1])
                for (e in a.converters) g[e.toLowerCase()] = a.converters[e];
            for (; d = i[++h];)
                if (d !== "*") {
                    if (j !== "*" && j !== d) {
                        e = g[j + " " + d] || g["* " + d];
                        if (!e)
                            for (c in g) {
                                f = c.split(" ");
                                if (f[1] === d) {
                                    e = g[j + " " + f[0]] || g["* " + f[0]];
                                    if (e) {
                                        e === !0 ? e = g[c] : g[c] !== !0 && (d = f[0], i.splice(h--, 0, d));
                                        break
                                    }
                                }
                            }
                        if (e !== !0)
                            if (e && a["throws"]) b = e(b);
                            else try {
                                b = e(b)
                            } catch (k) {
                                return {
                                    state: "parsererror",
                                    error: e ? k : "No conversion from " + j + " to " + d
                                }
                            }
                    }
                    j = d
                }
            return {
                state: "success",
                data: b
            }
        }

        function cQ() {
            try {
                return new a.XMLHttpRequest
            } catch (b) {}
        }

        function cR() {
            try {
                return new a.ActiveXObject("Microsoft.XMLHTTP")
            } catch (b) {}
        }

        function cZ() {
            return setTimeout(function() {
                cS = b
            }), cS = t.now()
        }

        function c$(a, b) {
            t.each(b, function(b, c) {
                var d = (cY[b] || []).concat(cY["*"]),
                    e = 0,
                    f = d.length;
                for (; e < f; e++)
                    if (d[e].call(a, b, c)) return
            })
        }

        function c_(a, b, c) {
            var d, e, f = 0,
                g = cX.length,
                h = t.Deferred().always(function() {
                    delete i.elem
                }),
                i = function() {
                    if (e) return !1;
                    var b = cS || cZ(),
                        c = Math.max(0, j.startTime + j.duration - b),
                        d = c / j.duration || 0,
                        f = 1 - d,
                        g = 0,
                        i = j.tweens.length;
                    for (; g < i; g++) j.tweens[g].run(f);
                    return h.notifyWith(a, [j, f, c]), f < 1 && i ? c : (h.resolveWith(a, [j]), !1)
                },
                j = h.promise({
                    elem: a,
                    props: t.extend({}, b),
                    opts: t.extend(!0, {
                        specialEasing: {}
                    }, c),
                    originalProperties: b,
                    originalOptions: c,
                    startTime: cS || cZ(),
                    duration: c.duration,
                    tweens: [],
                    createTween: function(b, c) {
                        var d = t.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                        return j.tweens.push(d), d
                    },
                    stop: function(b) {
                        var c = 0,
                            d = b ? j.tweens.length : 0;
                        if (e) return this;
                        e = !0;
                        for (; c < d; c++) j.tweens[c].run(1);
                        return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
                    }
                }),
                k = j.props;
            da(k, j.opts.specialEasing);
            for (; f < g; f++) {
                d = cX[f].call(j, a, k, j.opts);
                if (d) return d
            }
            return c$(j, k), t.isFunction(j.opts.start) && j.opts.start.call(a, j), t.fx.timer(t.extend(i, {
                elem: a,
                anim: j,
                queue: j.opts.queue
            })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
        }

        function da(a, b) {
            var c, d, e, f, g;
            for (e in a) {
                d = t.camelCase(e), f = b[d], c = a[e], t.isArray(c) && (f = c[1], c = a[e] = c[0]), e !== d && (a[d] = c, delete a[e]), g = t.cssHooks[d];
                if (g && "expand" in g) {
                    c = g.expand(c), delete a[d];
                    for (e in c) e in a || (a[e] = c[e], b[e] = f)
                } else b[d] = f
            }
        }

        function db(a, b, c) {
            var d, e, f, g, h, i, j, k, l, m = this,
                n = a.style,
                o = {},
                p = [],
                q = a.nodeType && cc(a);
            c.queue || (k = t._queueHooks(a, "fx"), k.unqueued == null && (k.unqueued = 0, l = k.empty.fire, k.empty.fire = function() {
                k.unqueued || l()
            }), k.unqueued++, m.always(function() {
                m.always(function() {
                    k.unqueued--, t.queue(a, "fx").length || k.empty.fire()
                })
            })), a.nodeType === 1 && ("height" in b || "width" in b) && (c.overflow = [n.overflow, n.overflowX, n.overflowY], t.css(a, "display") === "inline" && t.css(a, "float") === "none" && (!t.support.inlineBlockNeedsLayout || ch(a.nodeName) === "inline" ? n.display = "inline-block" : n.zoom = 1)), c.overflow && (n.overflow = "hidden", t.support.shrinkWrapBlocks || m.always(function() {
                n.overflow = c.overflow[0], n.overflowX = c.overflow[1], n.overflowY = c.overflow[2]
            }));
            for (e in b) {
                g = b[e];
                if (cU.exec(g)) {
                    delete b[e], i = i || g === "toggle";
                    if (g === (q ? "hide" : "show")) continue;
                    p.push(e)
                }
            }
            f = p.length;
            if (f) {
                h = t._data(a, "fxshow") || t._data(a, "fxshow", {}), "hidden" in h && (q = h.hidden), i && (h.hidden = !q), q ? t(a).show() : m.done(function() {
                    t(a).hide()
                }), m.done(function() {
                    var b;
                    t._removeData(a, "fxshow");
                    for (b in o) t.style(a, b, o[b])
                });
                for (e = 0; e < f; e++) d = p[e], j = m.createTween(d, q ? h[d] : 0), o[d] = h[d] || t.style(a, d), d in h || (h[d] = j.start, q && (j.end = j.start, j.start = d === "width" || d === "height" ? 1 : 0))
            }
        }

        function dc(a, b, c, d, e) {
            return new dc.prototype.init(a, b, c, d, e)
        }

        function dd(a, b) {
            var c, d = {
                    height: a
                },
                e = 0;
            b = b ? 1 : 0;
            for (; e < 4; e += 2 - b) c = b_[e], d["margin" + c] = d["padding" + c] = a;
            return b && (d.opacity = d.width = a), d
        }

        function de(a) {
            return t.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
        }
        var c, d, e = typeof b,
            f = a.document,
            g = a.location,
            h = a.jQuery,
            i = a.$,
            j = {},
            k = [],
            l = "1.9.1",
            m = k.concat,
            n = k.push,
            o = k.slice,
            p = k.indexOf,
            q = j.toString,
            r = j.hasOwnProperty,
            s = l.trim,
            t = function(a, b) {
                return new t.fn.init(a, b, d)
            },
            u = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            v = /\S+/g,
            w = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            x = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            y = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            z = /^[\],:{}\s]*$/,
            A = /(?:^|:|,)(?:\s*\[)+/g,
            B = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
            C = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
            D = /^-ms-/,
            E = /-([\da-z])/gi,
            F = function(a, b) {
                return b.toUpperCase()
            },
            G = function(a) {
                if (f.addEventListener || a.type === "load" || f.readyState === "complete") H(), t.ready()
            },
            H = function() {
                f.addEventListener ? (f.removeEventListener("DOMContentLoaded", G, !1), a.removeEventListener("load", G, !1)) : (f.detachEvent("onreadystatechange", G), a.detachEvent("onload", G))
            };
        t.fn = t.prototype = {
            jquery: l,
            constructor: t,
            init: function(a, c, d) {
                var e, g;
                if (!a) return this;
                if (typeof a == "string") {
                    a.charAt(0) === "<" && a.charAt(a.length - 1) === ">" && a.length >= 3 ? e = [null, a, null] : e = x.exec(a);
                    if (e && (e[1] || !c)) {
                        if (e[1]) {
                            c = c instanceof t ? c[0] : c, t.merge(this, t.parseHTML(e[1], c && c.nodeType ? c.ownerDocument || c : f, !0));
                            if (y.test(e[1]) && t.isPlainObject(c))
                                for (e in c) t.isFunction(this[e]) ? this[e](c[e]) : this.attr(e, c[e]);
                            return this
                        }
                        g = f.getElementById(e[2]);
                        if (g && g.parentNode) {
                            if (g.id !== e[2]) return d.find(a);
                            this.length = 1, this[0] = g
                        }
                        return this.context = f, this.selector = a, this
                    }
                    return !c || c.jquery ? (c || d).find(a) : this.constructor(c).find(a)
                }
                return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : t.isFunction(a) ? d.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), t.makeArray(a, this))
            },
            selector: "",
            length: 0,
            size: function() {
                return this.length
            },
            toArray: function() {
                return o.call(this)
            },
            get: function(a) {
                return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
            },
            pushStack: function(a) {
                var b = t.merge(this.constructor(), a);
                return b.prevObject = this, b.context = this.context, b
            },
            each: function(a, b) {
                return t.each(this, a, b)
            },
            ready: function(a) {
                return t.ready.promise().done(a), this
            },
            slice: function() {
                return this.pushStack(o.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(a) {
                var b = this.length,
                    c = +a + (a < 0 ? b : 0);
                return this.pushStack(c >= 0 && c < b ? [this[c]] : [])
            },
            map: function(a) {
                return this.pushStack(t.map(this, function(b, c) {
                    return a.call(b, c, b)
                }))
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: n,
            sort: [].sort,
            splice: [].splice
        }, t.fn.init.prototype = t.fn, t.extend = t.fn.extend = function() {
            var a, c, d, e, f, g, h = arguments[0] || {},
                i = 1,
                j = arguments.length,
                k = !1;
            typeof h == "boolean" && (k = h, h = arguments[1] || {}, i = 2), typeof h != "object" && !t.isFunction(h) && (h = {}), j === i && (h = this, --i);
            for (; i < j; i++)
                if ((f = arguments[i]) != null)
                    for (e in f) {
                        a = h[e], d = f[e];
                        if (h === d) continue;
                        k && d && (t.isPlainObject(d) || (c = t.isArray(d))) ? (c ? (c = !1, g = a && t.isArray(a) ? a : []) : g = a && t.isPlainObject(a) ? a : {}, h[e] = t.extend(k, g, d)) : d !== b && (h[e] = d)
                    }
                return h
        }, t.extend({
            noConflict: function(b) {
                return a.$ === t && (a.$ = i), b && a.jQuery === t && (a.jQuery = h), t
            },
            isReady: !1,
            readyWait: 1,
            holdReady: function(a) {
                a ? t.readyWait++ : t.ready(!0)
            },
            ready: function(a) {
                if (a === !0 ? --t.readyWait : t.isReady) return;
                if (!f.body) return setTimeout(t.ready);
                t.isReady = !0;
                if (a !== !0 && --t.readyWait > 0) return;
                c.resolveWith(f, [t]), t.fn.trigger && t(f).trigger("ready").off("ready")
            },
            isFunction: function(a) {
                return t.type(a) === "function"
            },
            isArray: Array.isArray || function(a) {
                return t.type(a) === "array"
            },
            isWindow: function(a) {
                return a != null && a == a.window
            },
            isNumeric: function(a) {
                return !isNaN(parseFloat(a)) && isFinite(a)
            },
            type: function(a) {
                return a == null ? String(a) : typeof a == "object" || typeof a == "function" ? j[q.call(a)] || "object" : typeof a
            },
            isPlainObject: function(a) {
                if (!a || t.type(a) !== "object" || a.nodeType || t.isWindow(a)) return !1;
                try {
                    if (a.constructor && !r.call(a, "constructor") && !r.call(a.constructor.prototype, "isPrototypeOf")) return !1
                } catch (c) {
                    return !1
                }
                var d;
                for (d in a);
                return d === b || r.call(a, d)
            },
            isEmptyObject: function(a) {
                var b;
                for (b in a) return !1;
                return !0
            },
            error: function(a) {
                throw new Error(a)
            },
            parseHTML: function(a, b, c) {
                if (!a || typeof a != "string") return null;
                typeof b == "boolean" && (c = b, b = !1), b = b || f;
                var d = y.exec(a),
                    e = !c && [];
                return d ? [b.createElement(d[1])] : (d = t.buildFragment([a], b, e), e && t(e).remove(), t.merge([], d.childNodes))
            },
            parseJSON: function(b) {
                if (a.JSON && a.JSON.parse) return a.JSON.parse(b);
                if (b === null) return b;
                if (typeof b == "string") {
                    b = t.trim(b);
                    if (b && z.test(b.replace(B, "@").replace(C, "]").replace(A, ""))) return (new Function("return " + b))()
                }
                t.error("Invalid JSON: " + b)
            },
            parseXML: function(c) {
                var d, e;
                if (!c || typeof c != "string") return null;
                try {
                    a.DOMParser ? (e = new DOMParser, d = e.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
                } catch (f) {
                    d = b
                }
                return (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && t.error("Invalid XML: " + c), d
            },
            noop: function() {},
            globalEval: function(b) {
                b && t.trim(b) && (a.execScript || function(b) {
                    a.eval.call(a, b)
                })(b)
            },
            camelCase: function(a) {
                return a.replace(D, "ms-").replace(E, F)
            },
            nodeName: function(a, b) {
                return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
            },
            each: function(a, b, c) {
                var d, e = 0,
                    f = a.length,
                    g = I(a);
                if (c)
                    if (g)
                        for (; e < f; e++) {
                            d = b.apply(a[e], c);
                            if (d === !1) break
                        } else
                            for (e in a) {
                                d = b.apply(a[e], c);
                                if (d === !1) break
                            } else if (g)
                                for (; e < f; e++) {
                                    d = b.call(a[e], e, a[e]);
                                    if (d === !1) break
                                } else
                                    for (e in a) {
                                        d = b.call(a[e], e, a[e]);
                                        if (d === !1) break
                                    }
                            return a
            },
            trim: s && !s.call("﻿ ") ? function(a) {
                return a == null ? "" : s.call(a)
            } : function(a) {
                return a == null ? "" : (a + "").replace(w, "")
            },
            makeArray: function(a, b) {
                var c = b || [];
                return a != null && (I(Object(a)) ? t.merge(c, typeof a == "string" ? [a] : a) : n.call(c, a)), c
            },
            inArray: function(a, b, c) {
                var d;
                if (b) {
                    if (p) return p.call(b, a, c);
                    d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                    for (; c < d; c++)
                        if (c in b && b[c] === a) return c
                }
                return -1
            },
            merge: function(a, c) {
                var d = c.length,
                    e = a.length,
                    f = 0;
                if (typeof d == "number")
                    for (; f < d; f++) a[e++] = c[f];
                else
                    while (c[f] !== b) a[e++] = c[f++];
                return a.length = e, a
            },
            grep: function(a, b, c) {
                var d, e = [],
                    f = 0,
                    g = a.length;
                c = !!c;
                for (; f < g; f++) d = !!b(a[f], f), c !== d && e.push(a[f]);
                return e
            },
            map: function(a, b, c) {
                var d, e = 0,
                    f = a.length,
                    g = I(a),
                    h = [];
                if (g)
                    for (; e < f; e++) d = b(a[e], e, c), d != null && (h[h.length] = d);
                else
                    for (e in a) d = b(a[e], e, c), d != null && (h[h.length] = d);
                return m.apply([], h)
            },
            guid: 1,
            proxy: function(a, c) {
                var d, e, f;
                return typeof c == "string" && (f = a[c], c = a, a = f), t.isFunction(a) ? (d = o.call(arguments, 2), e = function() {
                    return a.apply(c || this, d.concat(o.call(arguments)))
                }, e.guid = a.guid = a.guid || t.guid++, e) : b
            },
            access: function(a, c, d, e, f, g, h) {
                var i = 0,
                    j = a.length,
                    k = d == null;
                if (t.type(d) === "object") {
                    f = !0;
                    for (i in d) t.access(a, c, i, d[i], !0, g, h)
                } else if (e !== b) {
                    f = !0, t.isFunction(e) || (h = !0), k && (h ? (c.call(a, e), c = null) : (k = c, c = function(a, b, c) {
                        return k.call(t(a), c)
                    }));
                    if (c)
                        for (; i < j; i++) c(a[i], d, h ? e : e.call(a[i], i, c(a[i], d)))
                }
                return f ? a : k ? c.call(a) : j ? c(a[0], d) : g
            },
            now: function() {
                return (new Date).getTime()
            }
        }), t.ready.promise = function(b) {
            if (!c) {
                c = t.Deferred();
                if (f.readyState === "complete") setTimeout(t.ready);
                else if (f.addEventListener) f.addEventListener("DOMContentLoaded", G, !1), a.addEventListener("load", G, !1);
                else {
                    f.attachEvent("onreadystatechange", G), a.attachEvent("onload", G);
                    var d = !1;
                    try {
                        d = a.frameElement == null && f.documentElement
                    } catch (e) {}
                    d && d.doScroll && function g() {
                        if (!t.isReady) {
                            try {
                                d.doScroll("left")
                            } catch (a) {
                                return setTimeout(g, 50)
                            }
                            H(), t.ready()
                        }
                    }()
                }
            }
            return c.promise(b)
        }, t.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
            j["[object " + b + "]"] = b.toLowerCase()
        }), d = t(f);
        var J = {};
        t.Callbacks = function(a) {
            a = typeof a == "string" ? J[a] || K(a) : t.extend({}, a);
            var c, d, e, f, g, h, i = [],
                j = !a.once && [],
                k = function(b) {
                    d = a.memory && b, e = !0, g = h || 0, h = 0, f = i.length, c = !0;
                    for (; i && g < f; g++)
                        if (i[g].apply(b[0], b[1]) === !1 && a.stopOnFalse) {
                            d = !1;
                            break
                        }
                    c = !1, i && (j ? j.length && k(j.shift()) : d ? i = [] : l.disable())
                },
                l = {
                    add: function() {
                        if (i) {
                            var b = i.length;
                            (function e(b) {
                                t.each(b, function(b, c) {
                                    var d = t.type(c);
                                    d === "function" ? (!a.unique || !l.has(c)) && i.push(c) : c && c.length && d !== "string" && e(c)
                                })
                            })(arguments), c ? f = i.length : d && (h = b, k(d))
                        }
                        return this
                    },
                    remove: function() {
                        return i && t.each(arguments, function(a, b) {
                            var d;
                            while ((d = t.inArray(b, i, d)) > -1) i.splice(d, 1), c && (d <= f && f--, d <= g && g--)
                        }), this
                    },
                    has: function(a) {
                        return a ? t.inArray(a, i) > -1 : !!i && !!i.length
                    },
                    empty: function() {
                        return i = [], this
                    },
                    disable: function() {
                        return i = j = d = b, this
                    },
                    disabled: function() {
                        return !i
                    },
                    lock: function() {
                        return j = b, d || l.disable(), this
                    },
                    locked: function() {
                        return !j
                    },
                    fireWith: function(a, b) {
                        return b = b || [], b = [a, b.slice ? b.slice() : b], i && (!e || j) && (c ? j.push(b) : k(b)), this
                    },
                    fire: function() {
                        return l.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!e
                    }
                };
            return l
        }, t.extend({
            Deferred: function(a) {
                var b = [
                        ["resolve", "done", t.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", t.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", t.Callbacks("memory")]
                    ],
                    c = "pending",
                    d = {
                        state: function() {
                            return c
                        },
                        always: function() {
                            return e.done(arguments).fail(arguments), this
                        },
                        then: function() {
                            var a = arguments;
                            return t.Deferred(function(c) {
                                t.each(b, function(b, f) {
                                    var g = f[0],
                                        h = t.isFunction(a[b]) && a[b];
                                    e[f[1]](function() {
                                        var a = h && h.apply(this, arguments);
                                        a && t.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[g + "With"](this === d ? c.promise() : this, h ? [a] : arguments)
                                    })
                                }), a = null
                            }).promise()
                        },
                        promise: function(a) {
                            return a != null ? t.extend(a, d) : d
                        }
                    },
                    e = {};
                return d.pipe = d.then, t.each(b, function(a, f) {
                    var g = f[2],
                        h = f[3];
                    d[f[1]] = g.add, h && g.add(function() {
                        c = h
                    }, b[a ^ 1][2].disable, b[2][2].lock), e[f[0]] = function() {
                        return e[f[0] + "With"](this === e ? d : this, arguments), this
                    }, e[f[0] + "With"] = g.fireWith
                }), d.promise(e), a && a.call(e, e), e
            },
            when: function(a) {
                var b = 0,
                    c = o.call(arguments),
                    d = c.length,
                    e = d !== 1 || a && t.isFunction(a.promise) ? d : 0,
                    f = e === 1 ? a : t.Deferred(),
                    g = function(a, b, c) {
                        return function(d) {
                            b[a] = this, c[a] = arguments.length > 1 ? o.call(arguments) : d, c === h ? f.notifyWith(b, c) : --e || f.resolveWith(b, c)
                        }
                    },
                    h, i, j;
                if (d > 1) {
                    h = new Array(d), i = new Array(d), j = new Array(d);
                    for (; b < d; b++) c[b] && t.isFunction(c[b].promise) ? c[b].promise().done(g(b, j, c)).fail(f.reject).progress(g(b, i, h)) : --e
                }
                return e || f.resolveWith(j, c), f.promise()
            }
        }), t.support = function() {
            var b, c, d, g, h, i, j, k, l, m, n = f.createElement("div");
            n.setAttribute("className", "t"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", c = n.getElementsByTagName("*"), d = n.getElementsByTagName("a")[0];
            if (!c || !d || !c.length) return {};
            h = f.createElement("select"), j = h.appendChild(f.createElement("option")), g = n.getElementsByTagName("input")[0], d.style.cssText = "top:1px;float:left;opacity:.5", b = {
                getSetAttribute: n.className !== "t",
                leadingWhitespace: n.firstChild.nodeType === 3,
                tbody: !n.getElementsByTagName("tbody").length,
                htmlSerialize: !!n.getElementsByTagName("link").length,
                style: /top/.test(d.getAttribute("style")),
                hrefNormalized: d.getAttribute("href") === "/a",
                opacity: /^0.5/.test(d.style.opacity),
                cssFloat: !!d.style.cssFloat,
                checkOn: !!g.value,
                optSelected: j.selected,
                enctype: !!f.createElement("form").enctype,
                html5Clone: f.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
                boxModel: f.compatMode === "CSS1Compat",
                deleteExpando: !0,
                noCloneEvent: !0,
                inlineBlockNeedsLayout: !1,
                shrinkWrapBlocks: !1,
                reliableMarginRight: !0,
                boxSizingReliable: !0,
                pixelPosition: !1
            }, g.checked = !0, b.noCloneChecked = g.cloneNode(!0).checked, h.disabled = !0, b.optDisabled = !j.disabled;
            try {
                delete n.test
            } catch (o) {
                b.deleteExpando = !1
            }
            g = f.createElement("input"), g.setAttribute("value", ""), b.input = g.getAttribute("value") === "", g.value = "t", g.setAttribute("type", "radio"), b.radioValue = g.value === "t", g.setAttribute("checked", "t"), g.setAttribute("name", "t"), i = f.createDocumentFragment(), i.appendChild(g), b.appendChecked = g.checked, b.checkClone = i.cloneNode(!0).cloneNode(!0).lastChild.checked, n.attachEvent && (n.attachEvent("onclick", function() {
                b.noCloneEvent = !1
            }), n.cloneNode(!0).click());
            for (m in {
                submit: !0,
                change: !0,
                focusin: !0
            }) n.setAttribute(k = "on" + m, "t"), b[m + "Bubbles"] = k in a || n.attributes[k].expando === !1;
            return n.style.backgroundClip = "content-box", n.cloneNode(!0).style.backgroundClip = "", b.clearCloneStyle = n.style.backgroundClip === "content-box", t(function() {
                var c, d, g, h = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                    i = f.getElementsByTagName("body")[0];
                if (!i) return;
                c = f.createElement("div"), c.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", i.appendChild(c).appendChild(n), n.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", g = n.getElementsByTagName("td"), g[0].style.cssText = "padding:0;margin:0;border:0;display:none", l = g[0].offsetHeight === 0, g[0].style.display = "", g[1].style.display = "none", b.reliableHiddenOffsets = l && g[0].offsetHeight === 0, n.innerHTML = "", n.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", b.boxSizing = n.offsetWidth === 4, b.doesNotIncludeMarginInBodyOffset = i.offsetTop !== 1, a.getComputedStyle && (b.pixelPosition = (a.getComputedStyle(n, null) || {}).top !== "1%", b.boxSizingReliable = (a.getComputedStyle(n, null) || {
                    width: "4px"
                }).width === "4px", d = n.appendChild(f.createElement("div")), d.style.cssText = n.style.cssText = h, d.style.marginRight = d.style.width = "0", n.style.width = "1px", b.reliableMarginRight = !parseFloat((a.getComputedStyle(d, null) || {}).marginRight)), typeof n.style.zoom !== e && (n.innerHTML = "", n.style.cssText = h + "width:1px;padding:1px;display:inline;zoom:1", b.inlineBlockNeedsLayout = n.offsetWidth === 3, n.style.display = "block", n.innerHTML = "<div></div>", n.firstChild.style.width = "5px", b.shrinkWrapBlocks = n.offsetWidth !== 3, b.inlineBlockNeedsLayout && (i.style.zoom = 1)), i.removeChild(c), c = n = g = d = null
            }), c = h = i = j = d = g = null, b
        }();
        var L = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
            M = /([A-Z])/g;
        t.extend({
            cache: {},
            expando: "jQuery" + (l + Math.random()).replace(/\D/g, ""),
            noData: {
                embed: !0,
                object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
                applet: !0
            },
            hasData: function(a) {
                return a = a.nodeType ? t.cache[a[t.expando]] : a[t.expando], !!a && !Q(a)
            },
            data: function(a, b, c) {
                return N(a, b, c)
            },
            removeData: function(a, b) {
                return O(a, b)
            },
            _data: function(a, b, c) {
                return N(a, b, c, !0)
            },
            _removeData: function(a, b) {
                return O(a, b, !0)
            },
            acceptData: function(a) {
                if (a.nodeType && a.nodeType !== 1 && a.nodeType !== 9) return !1;
                var b = a.nodeName && t.noData[a.nodeName.toLowerCase()];
                return !b || b !== !0 && a.getAttribute("classid") === b
            }
        }), t.fn.extend({
            data: function(a, c) {
                var d, e, f = this[0],
                    g = 0,
                    h = null;
                if (a === b) {
                    if (this.length) {
                        h = t.data(f);
                        if (f.nodeType === 1 && !t._data(f, "parsedAttrs")) {
                            d = f.attributes;
                            for (; g < d.length; g++) e = d[g].name, e.indexOf("data-") || (e = t.camelCase(e.slice(5)), P(f, e, h[e]));
                            t._data(f, "parsedAttrs", !0)
                        }
                    }
                    return h
                }
                return typeof a == "object" ? this.each(function() {
                    t.data(this, a)
                }) : t.access(this, function(c) {
                    if (c === b) return f ? P(f, a, t.data(f, a)) : null;
                    this.each(function() {
                        t.data(this, a, c)
                    })
                }, null, c, arguments.length > 1, null, !0)
            },
            removeData: function(a) {
                return this.each(function() {
                    t.removeData(this, a)
                })
            }
        }), t.extend({
            queue: function(a, b, c) {
                var d;
                if (a) return b = (b || "fx") + "queue", d = t._data(a, b), c && (!d || t.isArray(c) ? d = t._data(a, b, t.makeArray(c)) : d.push(c)), d || []
            },
            dequeue: function(a, b) {
                b = b || "fx";
                var c = t.queue(a, b),
                    d = c.length,
                    e = c.shift(),
                    f = t._queueHooks(a, b),
                    g = function() {
                        t.dequeue(a, b)
                    };
                e === "inprogress" && (e = c.shift(), d--), f.cur = e, e && (b === "fx" && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
            },
            _queueHooks: function(a, b) {
                var c = b + "queueHooks";
                return t._data(a, c) || t._data(a, c, {
                    empty: t.Callbacks("once memory").add(function() {
                        t._removeData(a, b + "queue"), t._removeData(a, c)
                    })
                })
            }
        }), t.fn.extend({
            queue: function(a, c) {
                var d = 2;
                return typeof a != "string" && (c = a, a = "fx", d--), arguments.length < d ? t.queue(this[0], a) : c === b ? this : this.each(function() {
                    var b = t.queue(this, a, c);
                    t._queueHooks(this, a), a === "fx" && b[0] !== "inprogress" && t.dequeue(this, a)
                })
            },
            dequeue: function(a) {
                return this.each(function() {
                    t.dequeue(this, a)
                })
            },
            delay: function(a, b) {
                return a = t.fx ? t.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
                    var d = setTimeout(b, a);
                    c.stop = function() {
                        clearTimeout(d)
                    }
                })
            },
            clearQueue: function(a) {
                return this.queue(a || "fx", [])
            },
            promise: function(a, c) {
                var d, e = 1,
                    f = t.Deferred(),
                    g = this,
                    h = this.length,
                    i = function() {
                        --e || f.resolveWith(g, [g])
                    };
                typeof a != "string" && (c = a, a = b), a = a || "fx";
                while (h--) d = t._data(g[h], a + "queueHooks"), d && d.empty && (e++, d.empty.add(i));
                return i(), f.promise(c)
            }
        });
        var R, S, T = /[\t\r\n]/g,
            U = /\r/g,
            V = /^(?:input|select|textarea|button|object)$/i,
            W = /^(?:a|area)$/i,
            X = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
            Y = /^(?:checked|selected)$/i,
            Z = t.support.getSetAttribute,
            $ = t.support.input;
        t.fn.extend({
            attr: function(a, b) {
                return t.access(this, t.attr, a, b, arguments.length > 1)
            },
            removeAttr: function(a) {
                return this.each(function() {
                    t.removeAttr(this, a)
                })
            },
            prop: function(a, b) {
                return t.access(this, t.prop, a, b, arguments.length > 1)
            },
            removeProp: function(a) {
                return a = t.propFix[a] || a, this.each(function() {
                    try {
                        this[a] = b, delete this[a]
                    } catch (c) {}
                })
            },
            addClass: function(a) {
                var b, c, d, e, f, g = 0,
                    h = this.length,
                    i = typeof
                a == "string" && a;
                if (t.isFunction(a)) return this.each(function(b) {
                    t(this).addClass(a.call(this, b, this.className))
                });
                if (i) {
                    b = (a || "").match(v) || [];
                    for (; g < h; g++) {
                        c = this[g], d = c.nodeType === 1 && (c.className ? (" " + c.className + " ").replace(T, " ") : " ");
                        if (d) {
                            f = 0;
                            while (e = b[f++]) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                            c.className = t.trim(d)
                        }
                    }
                }
                return this
            },
            removeClass: function(a) {
                var b, c, d, e, f, g = 0,
                    h = this.length,
                    i = arguments.length === 0 || typeof a == "string" && a;
                if (t.isFunction(a)) return this.each(function(b) {
                    t(this).removeClass(a.call(this, b, this.className))
                });
                if (i) {
                    b = (a || "").match(v) || [];
                    for (; g < h; g++) {
                        c = this[g], d = c.nodeType === 1 && (c.className ? (" " + c.className + " ").replace(T, " ") : "");
                        if (d) {
                            f = 0;
                            while (e = b[f++])
                                while (d.indexOf(" " + e + " ") >= 0) d = d.replace(" " + e + " ", " ");
                            c.className = a ? t.trim(d) : ""
                        }
                    }
                }
                return this
            },
            toggleClass: function(a, b) {
                var c = typeof a,
                    d = typeof b == "boolean";
                return t.isFunction(a) ? this.each(function(c) {
                    t(this).toggleClass(a.call(this, c, this.className, b), b)
                }) : this.each(function() {
                    if (c === "string") {
                        var f, g = 0,
                            h = t(this),
                            i = b,
                            j = a.match(v) || [];
                        while (f = j[g++]) i = d ? i : !h.hasClass(f), h[i ? "addClass" : "removeClass"](f)
                    } else if (c === e || c === "boolean") this.className && t._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : t._data(this, "__className__") || ""
                })
            },
            hasClass: function(a) {
                var b = " " + a + " ",
                    c = 0,
                    d = this.length;
                for (; c < d; c++)
                    if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(T, " ").indexOf(b) >= 0) return !0;
                return !1
            },
            val: function(a) {
                var c, d, e, f = this[0];
                if (!arguments.length) {
                    if (f) return d = t.valHooks[f.type] || t.valHooks[f.nodeName.toLowerCase()], d && "get" in d && (c = d.get(f, "value")) !== b ? c : (c = f.value, typeof c == "string" ? c.replace(U, "") : c == null ? "" : c);
                    return
                }
                return e = t.isFunction(a), this.each(function(c) {
                    var f, g = t(this);
                    if (this.nodeType !== 1) return;
                    e ? f = a.call(this, c, g.val()) : f = a, f == null ? f = "" : typeof f == "number" ? f += "" : t.isArray(f) && (f = t.map(f, function(a) {
                        return a == null ? "" : a + ""
                    })), d = t.valHooks[this.type] || t.valHooks[this.nodeName.toLowerCase()];
                    if (!d || !("set" in d) || d.set(this, f, "value") === b) this.value = f
                })
            }
        }), t.extend({
            valHooks: {
                option: {
                    get: function(a) {
                        var b = a.attributes.value;
                        return !b || b.specified ? a.value : a.text
                    }
                },
                select: {
                    get: function(a) {
                        var b, c, d = a.options,
                            e = a.selectedIndex,
                            f = a.type === "select-one" || e < 0,
                            g = f ? null : [],
                            h = f ? e + 1 : d.length,
                            i = e < 0 ? h : f ? e : 0;
                        for (; i < h; i++) {
                            c = d[i];
                            if ((c.selected || i === e) && (t.support.optDisabled ? !c.disabled : c.getAttribute("disabled") === null) && (!c.parentNode.disabled || !t.nodeName(c.parentNode, "optgroup"))) {
                                b = t(c).val();
                                if (f) return b;
                                g.push(b)
                            }
                        }
                        return g
                    },
                    set: function(a, b) {
                        var c = t.makeArray(b);
                        return t(a).find("option").each(function() {
                            this.selected = t.inArray(t(this).val(), c) >= 0
                        }), c.length || (a.selectedIndex = -1), c
                    }
                }
            },
            attr: function(a, c, d) {
                var f, g, h, i = a.nodeType;
                if (!a || i === 3 || i === 8 || i === 2) return;
                if (typeof a.getAttribute === e) return t.prop(a, c, d);
                g = i !== 1 || !t.isXMLDoc(a), g && (c = c.toLowerCase(), f = t.attrHooks[c] || (X.test(c) ? S : R));
                if (d === b) return f && g && "get" in f && (h = f.get(a, c)) !== null ? h : (typeof a.getAttribute !== e && (h = a.getAttribute(c)), h == null ? b : h);
                if (d === null) t.removeAttr(a, c);
                else return f && g && "set" in f && (h = f.set(a, d, c)) !== b ? h : (a.setAttribute(c, d + ""), d)
            },
            removeAttr: function(a, b) {
                var c, d, e = 0,
                    f = b && b.match(v);
                if (f && a.nodeType === 1)
                    while (c = f[e++]) d = t.propFix[c] || c, X.test(c) ? !Z && Y.test(c) ? a[t.camelCase("default-" + c)] = a[d] = !1 : a[d] = !1 : t.attr(a, c, ""), a.removeAttribute(Z ? c : d)
            },
            attrHooks: {
                type: {
                    set: function(a, b) {
                        if (!t.support.radioValue && b === "radio" && t.nodeName(a, "input")) {
                            var c = a.value;
                            return a.setAttribute("type", b), c && (a.value = c), b
                        }
                    }
                }
            },
            propFix: {
                tabindex: "tabIndex",
                readonly: "readOnly",
                "for": "htmlFor",
                "class": "className",
                maxlength: "maxLength",
                cellspacing: "cellSpacing",
                cellpadding: "cellPadding",
                rowspan: "rowSpan",
                colspan: "colSpan",
                usemap: "useMap",
                frameborder: "frameBorder",
                contenteditable: "contentEditable"
            },
            prop: function(a, c, d) {
                var e, f, g, h = a.nodeType;
                if (!a || h === 3 || h === 8 || h === 2) return;
                return g = h !== 1 || !t.isXMLDoc(a), g && (c = t.propFix[c] || c, f = t.propHooks[c]), d !== b ? f && "set" in f && (e = f.set(a, d, c)) !== b ? e : a[c] = d : f && "get" in f && (e = f.get(a, c)) !== null ? e : a[c]
            },
            propHooks: {
                tabIndex: {
                    get: function(a) {
                        var c = a.getAttributeNode("tabindex");
                        return c && c.specified ? parseInt(c.value, 10) : V.test(a.nodeName) || W.test(a.nodeName) && a.href ? 0 : b
                    }
                }
            }
        }), S = {
            get: function(a, c) {
                var d = t.prop(a, c),
                    e = typeof d == "boolean" && a.getAttribute(c),
                    f = typeof d == "boolean" ? $ && Z ? e != null : Y.test(c) ? a[t.camelCase("default-" + c)] : !!e : a.getAttributeNode(c);
                return f && f.value !== !1 ? c.toLowerCase() : b
            },
            set: function(a, b, c) {
                return b === !1 ? t.removeAttr(a, c) : $ && Z || !Y.test(c) ? a.setAttribute(!Z && t.propFix[c] || c, c) : a[t.camelCase("default-" + c)] = a[c] = !0, c
            }
        };
        if (!$ || !Z) t.attrHooks.value = {
            get: function(a, c) {
                var d = a.getAttributeNode(c);
                return t.nodeName(a, "input") ? a.defaultValue : d && d.specified ? d.value : b
            },
            set: function(a, b, c) {
                if (t.nodeName(a, "input")) a.defaultValue = b;
                else return R && R.set(a, b, c)
            }
        };
        Z || (R = t.valHooks.button = {
            get: function(a, c) {
                var d = a.getAttributeNode(c);
                return d && (c === "id" || c === "name" || c === "coords" ? d.value !== "" : d.specified) ? d.value : b
            },
            set: function(a, c, d) {
                var e = a.getAttributeNode(d);
                return e || a.setAttributeNode(e = a.ownerDocument.createAttribute(d)), e.value = c += "", d === "value" || c === a.getAttribute(d) ? c : b
            }
        }, t.attrHooks.contenteditable = {
            get: R.get,
            set: function(a, b, c) {
                R.set(a, b === "" ? !1 : b, c)
            }
        }, t.each(["width", "height"], function(a, b) {
            t.attrHooks[b] = t.extend(t.attrHooks[b], {
                set: function(a, c) {
                    if (c === "") return a.setAttribute(b, "auto"), c
                }
            })
        })), t.support.hrefNormalized || (t.each(["href", "src", "width", "height"], function(a, c) {
            t.attrHooks[c] = t.extend(t.attrHooks[c], {
                get: function(a) {
                    var d = a.getAttribute(c, 2);
                    return d == null ? b : d
                }
            })
        }), t.each(["href", "src"], function(a, b) {
            t.propHooks[b] = {
                get: function(a) {
                    return a.getAttribute(b, 4)
                }
            }
        })), t.support.style || (t.attrHooks.style = {
            get: function(a) {
                return a.style.cssText || b
            },
            set: function(a, b) {
                return a.style.cssText = b + ""
            }
        }), t.support.optSelected || (t.propHooks.selected = t.extend(t.propHooks.selected, {
            get: function(a) {
                var b = a.parentNode;
                return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
            }
        })), t.support.enctype || (t.propFix.enctype = "encoding"), t.support.checkOn || t.each(["radio", "checkbox"], function() {
            t.valHooks[this] = {
                get: function(a) {
                    return a.getAttribute("value") === null ? "on" : a.value
                }
            }
        }), t.each(["radio", "checkbox"], function() {
            t.valHooks[this] = t.extend(t.valHooks[this], {
                set: function(a, b) {
                    if (t.isArray(b)) return a.checked = t.inArray(t(a).val(), b) >= 0
                }
            })
        });
        var _ = /^(?:input|select|textarea)$/i,
            ba = /^key/,
            bb = /^(?:mouse|contextmenu)|click/,
            bc = /^(?:focusinfocus|focusoutblur)$/,
            bd = /^([^.]*)(?:\.(.+)|)$/;
        t.event = {
                global: {},
                add: function(a, c, d, f, g) {
                    var h, i, j, k, l, m, n, o, p, q, r, s = t._data(a);
                    if (!s) return;
                    d.handler && (k = d, d = k.handler, g = k.selector), d.guid || (d.guid = t.guid++), (i = s.events) || (i = s.events = {}), (m = s.handle) || (m = s.handle = function(a) {
                        return typeof t === e || !!a && t.event.triggered === a.type ? b : t.event.dispatch.apply(m.elem, arguments)
                    }, m.elem = a), c = (c || "").match(v) || [""], j = c.length;
                    while (j--) {
                        h = bd.exec(c[j]) || [], p = r = h[1], q = (h[2] || "").split(".").sort(), l = t.event.special[p] || {}, p = (g ? l.delegateType : l.bindType) || p, l = t.event.special[p] || {}, n = t.extend({
                            type: p,
                            origType: r,
                            data: f,
                            handler: d,
                            guid: d.guid,
                            selector: g,
                            needsContext: g && t.expr.match.needsContext.test(g),
                            namespace: q.join(".")
                        }, k);
                        if (!(o = i[p])) {
                            o = i[p] = [], o.delegateCount = 0;
                            if (!l.setup || l.setup.call(a, f, q, m) === !1) a.addEventListener ? a.addEventListener(p, m, !1) : a.attachEvent && a.attachEvent("on" + p, m)
                        }
                        l.add && (l.add.call(a, n), n.handler.guid || (n.handler.guid = d.guid)), g ? o.splice(o.delegateCount++, 0, n) : o.push(n), t.event.global[p] = !0
                    }
                    a = null
                },
                remove: function(a, b, c, d, e) {
                    var f, g, h, i, j, k, l, m, n, o, p, q = t.hasData(a) && t._data(a);
                    if (!q || !(k = q.events)) return;
                    b = (b || "").match(v) || [""], j = b.length;
                    while (j--) {
                        h = bd.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort();
                        if (!n) {
                            for (n in k) t.event.remove(a, n + b[j], c, d, !0);
                            continue
                        }
                        l = t.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = k[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = m.length;
                        while (f--) g = m[f], (e || p === g.origType) && (!c || c.guid === g.guid) && (!h || h.test(g.namespace)) && (!d || d === g.selector || d === "**" && g.selector) && (m.splice(f, 1), g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
                        i && !m.length && ((!l.teardown || l.teardown.call(a, o, q.handle) === !1) && t.removeEvent(a, n, q.handle), delete k[n])
                    }
                    t.isEmptyObject(k) && (delete q.handle, t._removeData(a, "events"))
                },
                trigger: function(c, d, e, g) {
                    var h, i, j, k, l, m, n, o = [e || f],
                        p = r.call(c, "type") ? c.type : c,
                        q = r.call(c, "namespace") ? c.namespace.split(".") : [];
                    j = m = e = e || f;
                    if (e.nodeType === 3 || e.nodeType === 8) return;
                    if (bc.test(p + t.event.triggered)) return;
                    p.indexOf(".") >= 0 && (q = p.split("."), p = q.shift(), q.sort()), i = p.indexOf(":") < 0 && "on" + p, c = c[t.expando] ? c : new t.Event(p, typeof c == "object" && c), c.isTrigger = !0, c.namespace = q.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, c.result = b, c.target || (c.target = e), d = d == null ? [c] : t.makeArray(d, [c]), l = t.event.special[p] || {};
                    if (!g && l.trigger && l.trigger.apply(e, d) === !1) return;
                    if (!g && !l.noBubble && !t.isWindow(e)) {
                        k = l.delegateType || p, bc.test(k + p) || (j = j.parentNode);
                        for (; j; j = j.parentNode) o.push(j), m = j;
                        m === (e.ownerDocument || f) && o.push(m.defaultView || m.parentWindow || a)
                    }
                    n = 0;
                    while ((j = o[n++]) && !c.isPropagationStopped()) c.type = n > 1 ? k : l.bindType || p, h = (t._data(j, "events") || {})[c.type] && t._data(j, "handle"), h && h.apply(j, d), h = i && j[i], h && t.acceptData(j) && h.apply && h.apply(j, d) === !1 && c.preventDefault();
                    c.type = p;
                    if (!g && !c.isDefaultPrevented() && (!l._default || l._default.apply(e.ownerDocument, d) === !1) && (p !== "click" || !t.nodeName(e, "a")) && t.acceptData(e) && i && e[p] && !t.isWindow(e)) {
                        m = e[i], m && (e[i] = null), t.event.triggered = p;
                        try {
                            e[p]()
                        } catch (s) {}
                        t.event.triggered = b, m && (e[i] = m)
                    }
                    return c.result
                },
                dispatch: function(a) {
                    a = t.event.fix(a);
                    var c, d, e, f, g, h = [],
                        i = o.call(arguments),
                        j = (t._data(this, "events") || {})[a.type] || [],
                        k = t.event.special[a.type] || {};
                    i[0] = a, a.delegateTarget = this;
                    if (k.preDispatch && k.preDispatch.call(this, a) === !1) return;
                    h = t.event.handlers.call(this, a, j), c = 0;
                    while ((f = h[c++]) && !a.isPropagationStopped()) {
                        a.currentTarget = f.elem, g = 0;
                        while ((e = f.handlers[g++]) && !a.isImmediatePropagationStopped())
                            if (!a.namespace_re || a.namespace_re.test(e.namespace)) a.handleObj = e, a.data = e.data, d = ((t.event.special[e.origType] || {}).handle || e.handler).apply(f.elem, i), d !== b && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation())
                    }
                    return k.postDispatch && k.postDispatch.call(this, a), a.result
                },
                handlers: function(a, c) {
                    var d, e, f, g, h = [],
                        i = c.delegateCount,
                        j = a.target;
                    if (i && j.nodeType && (!a.button || a.type !== "click"))
                        for (; j != this; j = j.parentNode || this)
                            if (j.nodeType === 1 && (j.disabled !== !0 || a.type !== "click")) {
                                f = [];
                                for (g = 0; g < i; g++) e = c[g], d = e.selector + " ", f[d] === b && (f[d] = e.needsContext ? t(d, this).index(j) >= 0 : t.find(d, this, null, [j]).length), f[d] && f.push(e);
                                f.length && h.push({
                                    elem: j,
                                    handlers: f
                                })
                            }
                    return i < c.length && h.push({
                        elem: this,
                        handlers: c.slice(i)
                    }), h
                },
                fix: function(a) {
                    if (a[t.expando]) return a;
                    var b, c, d, e = a.type,
                        g = a,
                        h = this.fixHooks[e];
                    h || (this.fixHooks[e] = h = bb.test(e) ? this.mouseHooks : ba.test(e) ? this.keyHooks : {}), d = h.props ? this.props.concat(h.props) : this.props, a = new t.Event(g), b = d.length;
                    while (b--) c = d[b], a[c] = g[c];
                    return a.target || (a.target = g.srcElement || f), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, h.filter ? h.filter(a, g) : a
                },
                props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "),
                    filter: function(a, b) {
                        return a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode), a
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function(a, c) {
                        var d, e, g, h = c.button,
                            i = c.fromElement;
                        return a.pageX == null && c.clientX != null && (e = a.target.ownerDocument || f, g = e.documentElement, d = e.body, a.pageX = c.clientX + (g && g.scrollLeft || d && d.scrollLeft || 0) - (g && g.clientLeft || d && d.clientLeft || 0), a.pageY = c.clientY + (g && g.scrollTop || d && d.scrollTop || 0) - (g && g.clientTop || d && d.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? c.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0), a
                    }
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    click: {
                        trigger: function() {
                            if (t.nodeName(this, "input") && this.type === "checkbox" && this.click) return this.click(), !1
                        }
                    },
                    focus: {
                        trigger: function() {
                            if (this !== f.activeElement && this.focus) try {
                                return this.focus(), !1
                            } catch (a) {}
                        },
                        delegateType: "focusin"
                    },
                    blur: {
                        trigger: function() {
                            if (this === f.activeElement && this.blur) return this.blur(), !1
                        },
                        delegateType: "focusout"
                    },
                    beforeunload: {
                        postDispatch: function(a) {
                            a.result !== b && (a.originalEvent.returnValue = a.result)
                        }
                    }
                },
                simulate: function(a, b, c, d) {
                    var e = t.extend(new t.Event, c, {
                        type: a,
                        isSimulated: !0,
                        originalEvent: {}
                    });
                    d ? t.event.trigger(e, null, b) : t.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
                }
            }, t.removeEvent = f.removeEventListener ? function(a, b, c) {
                a.removeEventListener && a.removeEventListener(b, c, !1)
            } : function(a, b, c) {
                var d = "on" + b;
                a.detachEvent && (typeof a[d] === e && (a[d] = null), a.detachEvent(d, c))
            }, t.Event = function(a, b) {
                if (this instanceof t.Event) a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? be : bf) : this.type = a, b && t.extend(this, b), this.timeStamp = a && a.timeStamp || t.now(), this[t.expando] = !0;
                else return new t.Event(a, b)
            }, t.Event.prototype = {
                isDefaultPrevented: bf,
                isPropagationStopped: bf,
                isImmediatePropagationStopped: bf,
                preventDefault: function() {
                    var a = this.originalEvent;
                    this.isDefaultPrevented = be;
                    if (!a) return;
                    a.preventDefault ? a.preventDefault() : a.returnValue = !1
                },
                stopPropagation: function() {
                    var a = this.originalEvent;
                    this.isPropagationStopped = be;
                    if (!a) return;
                    a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0
                },
                stopImmediatePropagation: function() {
                    this.isImmediatePropagationStopped = be, this.stopPropagation()
                }
            }, t.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout"
            }, function(a, b) {
                t.event.special[a] = {
                    delegateType: b,
                    bindType: b,
                    handle: function(a) {
                        var c, d = this,
                            e = a.relatedTarget,
                            f = a.handleObj;
                        if (!e || e !== d && !t.contains(d, e)) a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b;
                        return c
                    }
                }
            }), t.support.submitBubbles || (t.event.special.submit = {
                setup: function() {
                    if (t.nodeName(this, "form")) return !1;
                    t.event.add(this, "click._submit keypress._submit", function(a) {
                        var c = a.target,
                            d = t.nodeName(c, "input") || t.nodeName(c, "button") ? c.form : b;
                        d && !t._data(d, "submitBubbles") && (t.event.add(d, "submit._submit", function(a) {
                            a._submit_bubble = !0
                        }), t._data(d, "submitBubbles", !0))
                    })
                },
                postDispatch: function(a) {
                    a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && t.event.simulate("submit", this.parentNode, a, !0))
                },
                teardown: function() {
                    if (t.nodeName(this, "form")) return !1;
                    t.event.remove(this, "._submit")
                }
            }), t.support.changeBubbles || (t.event.special.change = {
                setup: function() {
                    if (_.test(this.nodeName)) {
                        if (this.type === "checkbox" || this.type === "radio") t.event.add(this, "propertychange._change", function(a) {
                            a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                        }), t.event.add(this, "click._change", function(a) {
                            this._just_changed && !a.isTrigger && (this._just_changed = !1), t.event.simulate("change", this, a, !0)
                        });
                        return !1
                    }
                    t.event.add(this, "beforeactivate._change", function(a) {
                        var b = a.target;
                        _.test(b.nodeName) && !t._data(b, "changeBubbles") && (t.event.add(b, "change._change", function(a) {
                            this.parentNode && !a.isSimulated && !a.isTrigger && t.event.simulate("change", this.parentNode, a, !0)
                        }), t._data(b, "changeBubbles", !0))
                    })
                },
                handle: function(a) {
                    var b = a.target;
                    if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments)
                },
                teardown: function() {
                    return t.event.remove(this, "._change"), !_.test(this.nodeName)
                }
            }), t.support.focusinBubbles || t.each({
                focus: "focusin",
                blur: "focusout"
            }, function(a, b) {
                var c = 0,
                    d = function(a) {
                        t.event.simulate(b, a.target, t.event.fix(a), !0)
                    };
                t.event.special[b] = {
                    setup: function() {
                        c++ === 0 && f.addEventListener(a, d, !0)
                    },
                    teardown: function() {
                        --c === 0 && f.removeEventListener(a, d, !0)
                    }
                }
            }), t.fn.extend({
                on: function(a, c, d, e, f) {
                    var g, h;
                    if (typeof a == "object") {
                        typeof c != "string" && (d = d || c, c = b);
                        for (g in a) this.on(g, c, d, a[g], f);
                        return this
                    }
                    d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
                    if (e === !1) e = bf;
                    else if (!e) return this;
                    return f === 1 && (h = e, e = function(a) {
                        return t().off(a), h.apply(this, arguments)
                    }, e.guid = h.guid || (h.guid = t.guid++)), this.each(function() {
                        t.event.add(this, a, e, d, c)
                    })
                },
                one: function(a, b, c, d) {
                    return this.on(a, b, c, d, 1)
                },
                off: function(a, c, d) {
                    var e, f;
                    if (a && a.preventDefault && a.handleObj) return e = a.handleObj, t(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this;
                    if (typeof a == "object") {
                        for (f in a) this.off(f, c, a[f]);
                        return this
                    }
                    if (c === !1 || typeof c == "function") d = c, c = b;
                    return d === !1 && (d = bf), this.each(function() {
                        t.event.remove(this, a, d, c)
                    })
                },
                bind: function(a, b, c) {
                    return this.on(a, null, b, c)
                },
                unbind: function(a, b) {
                    return this.off(a, null, b)
                },
                delegate: function(a, b, c, d) {
                    return this.on(b, a, c, d)
                },
                undelegate: function(a, b, c) {
                    return arguments.length === 1 ? this.off(a, "**") : this.off(b, a || "**", c)
                },
                trigger: function(a, b) {
                    return this.each(function() {
                        t.event.trigger(a, b, this)
                    })
                },
                triggerHandler: function(a, b) {
                    var c = this[0];
                    if (c) return t.event.trigger(a, b, c, !0)
                }
            }),
            function(a, b) {
                function bd(a) {
                    return W.test(a + "")
                }

                function be() {
                    var a, b = [];
                    return a = function(c, d) {
                        return b.push(c += " ") > e.cacheLength && delete a[b.shift()], a[c] = d
                    }
                }

                function bf(a) {
                    return a[u] = !0, a
                }

                function bg(a) {
                    var b = l.createElement("div");
                    try {
                        return a(b)
                    } catch (c) {
                        return !1
                    } finally {
                        b = null
                    }
                }

                function bh(a, b, c, d) {
                    var e, f, g, h, i, j, m, p, q, s;
                    (b ? b.ownerDocument || b : v) !== l && k(b), b = b || l, c = c || [];
                    if (!a || typeof a != "string") return c;
                    if ((h = b.nodeType) !== 1 && h !== 9) return [];
                    if (!n && !d) {
                        if (e = X.exec(a))
                            if (g = e[1]) {
                                if (h === 9) {
                                    f = b.getElementById(g);
                                    if (!f || !f.parentNode) return c;
                                    if (f.id === g) return c.push(f), c
                                } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && r(b, f) && f.id === g) return c.push(f), c
                            } else {
                                if (e[2]) return G.apply(c, H.call(b.getElementsByTagName(a), 0)), c;
                                if ((g = e[3]) && w.getByClassName && b.getElementsByClassName) return G.apply(c, H.call(b.getElementsByClassName(g), 0)), c
                            }
                        if (w.qsa && !o.test(a)) {
                            m = !0, p = u, q = b, s = h === 9 && a;
                            if (h === 1 && b.nodeName.toLowerCase() !== "object") {
                                j = bm(a), (m = b.getAttribute("id")) ? p = m.replace($, "\\$&") : b.setAttribute("id", p), p = "[id='" + p + "'] ", i = j.length;
                                while (i--) j[i] = p + bn(j[i]);
                                q = V.test(a) && b.parentNode || b, s = j.join(",")
                            }
                            if (s) try {
                                return G.apply(c, H.call(q.querySelectorAll(s), 0)), c
                            } catch (t) {} finally {
                                m || b.removeAttribute("id")
                            }
                        }
                    }
                    return bv(a.replace(P, "$1"), b, c, d)
                }

                function bi(a, b) {
                    var c = b && a,
                        d = c && (~b.sourceIndex || D) - (~a.sourceIndex || D);
                    if (d) return d;
                    if (c)
                        while (c = c.nextSibling)
                            if (c === b) return -1;
                    return a ? 1 : -1
                }

                function bj(a) {
                    return function(b) {
                        var c = b.nodeName.toLowerCase();
                        return c === "input" && b.type === a
                    }
                }

                function bk(a) {
                    return function(b) {
                        var c = b.nodeName.toLowerCase();
                        return (c === "input" || c === "button") && b.type === a
                    }
                }

                function bl(a) {
                    return bf(function(b) {
                        return b = +b, bf(function(c, d) {
                            var e, f = a([], c.length, b),
                                g = f.length;
                            while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                        })
                    })
                }

                function bm(a, b) {
                    var c, d, f, g, h, i, j, k = A[a + " "];
                    if (k) return b ? 0 : k.slice(0);
                    h = a, i = [], j = e.preFilter;
                    while (h) {
                        if (!c || (d = Q.exec(h))) d && (h = h.slice(d[0].length) || h), i.push(f = []);
                        c = !1;
                        if (d = R.exec(h)) c = d.shift(), f.push({
                            value: c,
                            type: d[0].replace(P, " ")
                        }), h = h.slice(c.length);
                        for (g in e.filter)(d = U[g].exec(h)) && (!j[g] || (d = j[g](d))) && (c = d.shift(), f.push({
                            value: c,
                            type: g,
                            matches: d
                        }), h = h.slice(c.length));
                        if (!c) break
                    }
                    return b ? h.length : h ? bh.error(a) : A(a, i).slice(0)
                }

                function bn(a) {
                    var b = 0,
                        c = a.length,
                        d = "";
                    for (; b < c; b++) d += a[b].value;
                    return d
                }

                function bo(a, b, c) {
                    var e = b.dir,
                        f = c && e === "parentNode",
                        g = y++;
                    return b.first ? function(b, c, d) {
                        while (b = b[e])
                            if (b.nodeType === 1 || f) return a(b, c, d)
                    } : function(b, c, h) {
                        var i, j, k, l = x + " " + g;
                        if (h) {
                            while (b = b[e])
                                if (b.nodeType === 1 || f)
                                    if (a(b, c, h)) return !0
                        } else
                            while (b = b[e])
                                if (b.nodeType === 1 || f) {
                                    k = b[u] || (b[u] = {});
                                    if ((j = k[e]) && j[0] === l) {
                                        if ((i = j[1]) === !0 || i === d) return i === !0
                                    } else {
                                        j = k[e] = [l], j[1] = a(b, c, h) || d;
                                        if (j[1] === !0) return !0
                                    }
                                }
                    }
                }

                function bp(a) {
                    return a.length > 1 ? function(b, c, d) {
                        var e = a.length;
                        while (e--)
                            if (!a[e](b, c, d)) return !1;
                        return !0
                    } : a[0]
                }

                function bq(a, b, c, d, e) {
                    var f, g = [],
                        h = 0,
                        i = a.length,
                        j = b != null;
                    for (; h < i; h++)
                        if (f = a[h])
                            if (!c || c(f, d, e)) g.push(f), j && b.push(h);
                    return g
                }

                function br(a, b, c, d, e, f) {
                    return d && !d[u] && (d = br(d)), e && !e[u] && (e = br(e, f)), bf(function(f, g, h, i) {
                        var j, k, l, m = [],
                            n = [],
                            o = g.length,
                            p = f || bu(b || "*", h.nodeType ? [h] : h, []),
                            q = a && (f || !b) ? bq(p, m, a, h, i) : p,
                            r = c ? e || (f ? a : o || d) ? [] : g : q;
                        c && c(q, r, h, i);
                        if (d) {
                            j = bq(r, n), d(j, [], h, i), k = j.length;
                            while (k--)
                                if (l = j[k]) r[n[k]] = !(q[n[k]] = l)
                        }
                        if (f) {
                            if (e || a) {
                                if (e) {
                                    j = [], k = r.length;
                                    while (k--)(l = r[k]) && j.push(q[k] = l);
                                    e(null, r = [], j, i)
                                }
                                k = r.length;
                                while (k--)(l = r[k]) && (j = e ? I.call(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l))
                            }
                        } else r = bq(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : G.apply(g, r)
                    })
                }

                function bs(a) {
                    var b, c, d, f = a.length,
                        g = e.relative[a[0].type],
                        h = g || e.relative[" "],
                        i = g ? 1 : 0,
                        k = bo(function(a) {
                            return a === b
                        }, h, !0),
                        l = bo(function(a) {
                            return I.call(b, a) > -1
                        }, h, !0),
                        m = [
                            function(a, c, d) {
                                return !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d))
                            }
                        ];
                    for (; i < f; i++)
                        if (c = e.relative[a[i].type]) m = [bo(bp(m), c)];
                        else {
                            c = e.filter[a[i].type].apply(null, a[i].matches);
                            if (c[u]) {
                                d = ++i;
                                for (; d < f; d++)
                                    if (e.relative[a[d].type]) break;
                                return br(i > 1 && bp(m), i > 1 && bn(a.slice(0, i - 1)).replace(P, "$1"), c, i < d && bs(a.slice(i, d)), d < f && bs(a = a.slice(d)), d < f && bn(a))
                            }
                            m.push(c)
                        }
                    return bp(m)
                }

                function bt(a, b) {
                    var c = 0,
                        f = b.length > 0,
                        g = a.length > 0,
                        h = function(h, i, k, m, n) {
                            var o, p, q, r = [],
                                s = 0,
                                t = "0",
                                u = h && [],
                                v = n != null,
                                w = j,
                                y = h || g && e.find.TAG("*", n && i.parentNode || i),
                                z = x += w == null ? 1 : Math.random() || .1;
                            v && (j = i !== l && i, d = c);
                            for (;
                                (o = y[t]) != null; t++) {
                                if (g && o) {
                                    p = 0;
                                    while (q = a[p++])
                                        if (q(o, i, k)) {
                                            m.push(o);
                                            break
                                        }
                                    v && (x = z, d = ++c)
                                }
                                f && ((o = !q && o) && s--, h && u.push(o))
                            }
                            s += t;
                            if (f && t !== s) {
                                p = 0;
                                while (q = b[p++]) q(u, r, i, k);
                                if (h) {
                                    if (s > 0)
                                        while (t--)!u[t] && !r[t] && (r[t] = F.call(m));
                                    r = bq(r)
                                }
                                G.apply(m, r), v && !h && r.length > 0 && s + b.length > 1 && bh.uniqueSort(m)
                            }
                            return v && (x = z, j = w), u
                        };
                    return f ? bf(h) : h
                }

                function bu(a, b, c) {
                    var d = 0,
                        e = b.length;
                    for (; d < e; d++) bh(a, b[d], c);
                    return c
                }

                function bv(a, b, c, d) {
                    var f, g, i, j, k, l = bm(a);
                    if (!d && l.length === 1) {
                        g = l[0] = l[0].slice(0);
                        if (g.length > 2 && (i = g[0]).type === "ID" && b.nodeType === 9 && !n && e.relative[g[1].type]) {
                            b = e.find.ID(i.matches[0].replace(ba, bb), b)[0];
                            if (!b) return c;
                            a = a.slice(g.shift().value.length)
                        }
                        f = U.needsContext.test(a) ? 0 : g.length;
                        while (f--) {
                            i = g[f];
                            if (e.relative[j = i.type]) break;
                            if (k = e.find[j])
                                if (d = k(i.matches[0].replace(ba, bb), V.test(g[0].type) && b.parentNode || b)) {
                                    g.splice(f, 1), a = d.length && bn(g);
                                    if (!a) return G.apply(c, H.call(d, 0)), c;
                                    break
                                }
                        }
                    }
                    return h(a, l)(d, b, n, c, V.test(a)), c
                }

                function bw() {}
                var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, u = "sizzle" + -(new Date),
                    v = a.document,
                    w = {},
                    x = 0,
                    y = 0,
                    z = be(),
                    A = be(),
                    B = be(),
                    C = typeof b,
                    D = 1 << 31,
                    E = [],
                    F = E.pop,
                    G = E.push,
                    H = E.slice,
                    I = E.indexOf || function(a) {
                        var b = 0,
                            c = this.length;
                        for (; b < c; b++)
                            if (this[b] === a) return b;
                        return -1
                    },
                    J = "[\\x20\\t\\r\\n\\f]",
                    K = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                    L = K.replace("w", "w#"),
                    M = "([*^$|!~]?=)",
                    N = "\\[" + J + "*(" + K + ")" + J + "*(?:" + M + J + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + L + ")|)|)" + J + "*\\]",
                    O = ":(" + K + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + N.replace(3, 8) + ")*)|.*)\\)|)",
                    P = new RegExp("^" + J + "+|((?:^|[^\\\\])(?:\\\\.)*)" + J + "+$", "g"),
                    Q = new RegExp("^" + J + "*," + J + "*"),
                    R = new RegExp("^" + J + "*([\\x20\\t\\r\\n\\f>+~])" + J + "*"),
                    S = new RegExp(O),
                    T = new RegExp("^" + L + "$"),
                    U = {
                        ID: new RegExp("^#(" + K + ")"),
                        CLASS: new RegExp("^\\.(" + K + ")"),
                        NAME: new RegExp("^\\[name=['\"]?(" + K + ")['\"]?\\]"),
                        TAG: new RegExp("^(" + K.replace("w", "w*") + ")"),
                        ATTR: new RegExp("^" + N),
                        PSEUDO: new RegExp("^" + O),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + J + "*(even|odd|(([+-]|)(\\d*)n|)" + J + "*(?:([+-]|)" + J + "*(\\d+)|))" + J + "*\\)|)", "i"),
                        needsContext: new RegExp("^" + J + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + J + "*((?:-\\d)?\\d*)" + J + "*\\)|)(?=[^-]|$)", "i")
                    },
                    V = /[\x20\t\r\n\f]*[+~]/,
                    W = /^[^{]+\{\s*\[native code/,
                    X = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    Y = /^(?:input|select|textarea|button)$/i,
                    Z = /^h\d$/i,
                    $ = /'|\\/g,
                    _ = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                    ba = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
                    bb = function(a, b) {
                        var c = "0x" + b - 65536;
                        return c !== c ? b : c < 0 ? String.fromCharCode(c + 65536) : String.fromCharCode(c >> 10 | 55296, c & 1023 | 56320)
                    };
                try {
                    H.call(v.documentElement.childNodes, 0)[0].nodeType
                } catch (bc) {
                    H = function(a) {
                        var b, c = [];
                        while (b = this[a++]) c.push(b);
                        return c
                    }
                }
                g = bh.isXML = function(a) {
                    var b = a && (a.ownerDocument || a).documentElement;
                    return b ? b.nodeName !== "HTML" : !1
                }, k = bh.setDocument = function(a) {
                    var c = a ? a.ownerDocument || a : v;
                    if (c === l || c.nodeType !== 9 || !c.documentElement) return l;
                    l = c, m = c.documentElement, n = g(c), w.tagNameNoComments = bg(function(a) {
                        return a.appendChild(c.createComment("")), !a.getElementsByTagName("*").length
                    }), w.attributes = bg(function(a) {
                        a.innerHTML = "<select></select>";
                        var b = typeof a.lastChild.getAttribute("multiple");
                        return b !== "boolean" && b !== "string"
                    }), w.getByClassName = bg(function(a) {
                        return a.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !a.getElementsByClassName || !a.getElementsByClassName("e").length ? !1 : (a.lastChild.className = "e", a.getElementsByClassName("e").length === 2)
                    }), w.getByName = bg(function(a) {
                        a.id = u + 0, a.innerHTML = "<a name='" + u + "'></a><div name='" + u + "'></div>", m.insertBefore(a, m.firstChild);
                        var b = c.getElementsByName && c.getElementsByName(u).length === 2 + c.getElementsByName(u + 0).length;
                        return w.getIdNotName = !c.getElementById(u), m.removeChild(a), b
                    }), e.attrHandle = bg(function(a) {
                        return a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute !== C && a.firstChild.getAttribute("href") === "#"
                    }) ? {} : {
                        href: function(a) {
                            return a.getAttribute("href", 2)
                        },
                        type: function(a) {
                            return a.getAttribute("type")
                        }
                    }, w.getIdNotName ? (e.find.ID = function(a, b) {
                        if (typeof b.getElementById !== C && !n) {
                            var c = b.getElementById(a);
                            return c && c.parentNode ? [c] : []
                        }
                    }, e.filter.ID = function(a) {
                        var b = a.replace(ba, bb);
                        return function(a) {
                            return a.getAttribute("id") === b
                        }
                    }) : (e.find.ID = function(a, c) {
                        if (typeof c.getElementById !== C && !n) {
                            var d = c.getElementById(a);
                            return d ? d.id === a || typeof d.getAttributeNode !== C && d.getAttributeNode("id").value === a ? [d] : b : []
                        }
                    }, e.filter.ID = function(a) {
                        var b = a.replace(ba, bb);
                        return function(a) {
                            var c = typeof a.getAttributeNode !== C && a.getAttributeNode("id");
                            return c && c.value === b
                        }
                    }), e.find.TAG = w.tagNameNoComments ? function(a, b) {
                        if (typeof b.getElementsByTagName !== C) return b.getElementsByTagName(a)
                    } : function(a, b) {
                        var c, d = [],
                            e = 0,
                            f = b.getElementsByTagName(a);
                        if (a === "*") {
                            while (c = f[e++]) c.nodeType === 1 && d.push(c);
                            return d
                        }
                        return f
                    }, e.find.NAME = w.getByName && function(a, b) {
                        if (typeof b.getElementsByName !== C) return b.getElementsByName(name)
                    }, e.find.CLASS = w.getByClassName && function(a, b) {
                        if (typeof b.getElementsByClassName !== C && !n) return b.getElementsByClassName(a)
                    }, p = [], o = [":focus"];
                    if (w.qsa = bd(c.querySelectorAll)) bg(function(a) {
                        a.innerHTML = "<select><option selected=''></option></select>", a.querySelectorAll("[selected]").length || o.push("\\[" + J + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), a.querySelectorAll(":checked").length || o.push(":checked")
                    }), bg(function(a) {
                        a.innerHTML = "<input type='hidden' i=''/>", a.querySelectorAll("[i^='']").length && o.push("[*^$]=" + J + "*(?:\"\"|'')"), a.querySelectorAll(":enabled").length || o.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), o.push(",.*:")
                    });
                    return (w.matchesSelector = bd(q = m.matchesSelector || m.mozMatchesSelector || m.webkitMatchesSelector || m.oMatchesSelector || m.msMatchesSelector)) && bg(function(a) {
                        w.disconnectedMatch = q.call(a, "div"), q.call(a, "[s!='']:x"), p.push("!=", O)
                    }), o = new RegExp(o.join("|")), p = new RegExp(p.join("|")), r = bd(m.contains) || m.compareDocumentPosition ? function(a, b) {
                        var c = a.nodeType === 9 ? a.documentElement : a,
                            d = b && b.parentNode;
                        return a === d || !!d && d.nodeType === 1 && !!(c.contains ? c.contains(d) : a.compareDocumentPosition && a.compareDocumentPosition(d) & 16)
                    } : function(a, b) {
                        if (b)
                            while (b = b.parentNode)
                                if (b === a) return !0;
                        return !1
                    }, s = m.compareDocumentPosition ? function(a, b) {
                        var d;
                        if (a === b) return i = !0, 0;
                        if (d = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b)) return d & 1 || a.parentNode && a.parentNode.nodeType === 11 ? a === c || r(v, a) ? -1 : b === c || r(v, b) ? 1 : 0 : d & 4 ? -1 : 1;
                        return a.compareDocumentPosition ? -1 : 1
                    } : function(a, b) {
                        var d, e = 0,
                            f = a.parentNode,
                            g = b.parentNode,
                            h = [a],
                            j = [b];
                        if (a === b) return i = !0, 0;
                        if (!f || !g) return a === c ? -1 : b === c ? 1 : f ? -1 : g ? 1 : 0;
                        if (f === g) return bi(a, b);
                        d = a;
                        while (d = d.parentNode) h.unshift(d);
                        d = b;
                        while (d = d.parentNode) j.unshift(d);
                        while (h[e] === j[e]) e++;
                        return e ? bi(h[e], j[e]) : h[e] === v ? -1 : j[e] === v ? 1 : 0
                    }, i = !1, [0, 0].sort(s), w.detectDuplicates = i, l
                }, bh.matches = function(a, b) {
                    return bh(a, null, null, b)
                }, bh.matchesSelector = function(a, b) {
                    (a.ownerDocument || a) !== l && k(a), b = b.replace(_, "='$1']");
                    if (w.matchesSelector && !n && (!p || !p.test(b)) && !o.test(b)) try {
                        var c = q.call(a, b);
                        if (c || w.disconnectedMatch || a.document && a.document.nodeType !== 11) return c
                    } catch (d) {}
                    return bh(b, l, null, [a]).length > 0
                }, bh.contains = function(a, b) {
                    return (a.ownerDocument || a) !== l && k(a), r(a, b)
                }, bh.attr = function(a, b) {
                    var c;
                    return (a.ownerDocument || a) !== l && k(a), n || (b = b.toLowerCase()), (c = e.attrHandle[b]) ? c(a) : n || w.attributes ? a.getAttribute(b) : ((c = a.getAttributeNode(b)) || a.getAttribute(b)) && a[b] === !0 ? b : c && c.specified ? c.value : null
                }, bh.error = function(a) {
                    throw new Error("Syntax error, unrecognized expression: " + a)
                }, bh.uniqueSort = function(a) {
                    var b, c = [],
                        d = 1,
                        e = 0;
                    i = !w.detectDuplicates, a.sort(s);
                    if (i) {
                        for (; b = a[d]; d++) b === a[d - 1] && (e = c.push(d));
                        while (e--) a.splice(c[e], 1)
                    }
                    return a
                }, f = bh.getText = function(a) {
                    var b, c = "",
                        d = 0,
                        e = a.nodeType;
                    if (!e)
                        for (; b = a[d]; d++) c += f(b);
                    else if (e === 1 || e === 9 || e === 11) {
                        if (typeof a.textContent == "string") return a.textContent;
                        for (a = a.firstChild; a; a = a.nextSibling) c += f(a)
                    } else if (e === 3 || e === 4) return a.nodeValue;
                    return c
                }, e = bh.selectors = {
                    cacheLength: 50,
                    createPseudo: bf,
                    match: U,
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(a) {
                            return a[1] = a[1].replace(ba, bb), a[3] = (a[4] || a[5] || "").replace(ba, bb), a[2] === "~=" && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                        },
                        CHILD: function(a) {
                            return a[1] = a[1].toLowerCase(), a[1].slice(0, 3) === "nth" ? (a[3] || bh.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * (a[3] === "even" || a[3] === "odd")), a[5] = +(a[7] + a[8] || a[3] === "odd")) : a[3] && bh.error(a[0]), a
                        },
                        PSEUDO: function(a) {
                            var b, c = !a[5] && a[2];
                            return U.CHILD.test(a[0]) ? null : (a[4] ? a[2] = a[4] : c && S.test(c) && (b = bm(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(a) {
                            return a === "*" ? function() {
                                return !0
                            } : (a = a.replace(ba, bb).toLowerCase(), function(b) {
                                return b.nodeName && b.nodeName.toLowerCase() === a
                            })
                        },
                        CLASS: function(a) {
                            var b = z[a + " "];
                            return b || (b = new RegExp("(^|" + J + ")" + a + "(" + J + "|$)")) && z(a, function(a) {
                                return b.test(a.className || typeof a.getAttribute !== C && a.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(a, b, c) {
                            return function(d) {
                                var e = bh.attr(d, a);
                                return e == null ? b === "!=" : b ? (e += "", b === "=" ? e === c : b === "!=" ? e !== c : b === "^=" ? c && e.indexOf(c) === 0 : b === "*=" ? c && e.indexOf(c) > -1 : b === "$=" ? c && e.slice(-c.length) === c : b === "~=" ? (" " + e + " ").indexOf(c) > -1 : b === "|=" ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0
                            }
                        },
                        CHILD: function(a, b, c, d, e) {
                            var f = a.slice(0, 3) !== "nth",
                                g = a.slice(-4) !== "last",
                                h = b === "of-type";
                            return d === 1 && e === 0 ? function(a) {
                                return !!a.parentNode
                            } : function(b, c, i) {
                                var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                                    q = b.parentNode,
                                    r = h && b.nodeName.toLowerCase(),
                                    s = !i && !h;
                                if (q) {
                                    if (f) {
                                        while (p) {
                                            l = b;
                                            while (l = l[p])
                                                if (h ? l.nodeName.toLowerCase() === r : l.nodeType === 1) return !1;
                                            o = p = a === "only" && !o && "nextSibling"
                                        }
                                        return !0
                                    }
                                    o = [g ? q.firstChild : q.lastChild];
                                    if (g && s) {
                                        k = q[u] || (q[u] = {}), j = k[a] || [], n = j[0] === x && j[1], m = j[0] === x && j[2], l = n && q.childNodes[n];
                                        while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                                            if (l.nodeType === 1 && ++m && l === b) {
                                                k[a] = [x, n, m];
                                                break
                                            }
                                    } else if (s && (j = (b[u] || (b[u] = {}))[a]) && j[0] === x) m = j[1];
                                    else
                                        while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                                            if ((h ? l.nodeName.toLowerCase() === r : l.nodeType === 1) && ++m) {
                                                s && ((l[u] || (l[u] = {}))[a] = [x, m]);
                                                if (l === b) break
                                            } return m -= e, m === d || m % d === 0 && m / d >= 0
                                }
                            }
                        },
                        PSEUDO: function(a, b) {
                            var c, d = e.pseudos[a] || e.setFilters[a.toLowerCase()] || bh.error("unsupported pseudo: " + a);
                            return d[u] ? d(b) : d.length > 1 ? (c = [a, a, "", b], e.setFilters.hasOwnProperty(a.toLowerCase()) ? bf(function(a, c) {
                                var e, f = d(a, b),
                                    g = f.length;
                                while (g--) e = I.call(a, f[g]), a[e] = !(c[e] = f[g])
                            }) : function(a) {
                                return d(a, 0, c)
                            }) : d
                        }
                    },
                    pseudos: {
                        not: bf(function(a) {
                            var b = [],
                                c = [],
                                d = h(a.replace(P, "$1"));
                            return d[u] ? bf(function(a, b, c, e) {
                                var f, g = d(a, null, e, []),
                                    h = a.length;
                                while (h--)
                                    if (f = g[h]) a[h] = !(b[h] = f)
                            }) : function(a, e, f) {
                                return b[0] = a, d(b, null, f, c), !c.pop()
                            }
                        }),
                        has: bf(function(a) {
                            return function(b) {
                                return bh(a, b).length > 0
                            }
                        }),
                        contains: bf(function(a) {
                            return function(b) {
                                return (b.textContent || b.innerText || f(b)).indexOf(a) > -1
                            }
                        }),
                        lang: bf(function(a) {
                            return T.test(a || "") || bh.error("unsupported lang: " + a), a = a.replace(ba, bb).toLowerCase(),
                                function(b) {
                                    var c;
                                    do
                                        if (c = n ? b.getAttribute("xml:lang") || b.getAttribute("lang") : b.lang) return c = c.toLowerCase(), c === a || c.indexOf(a + "-") === 0;
                                    while ((b = b.parentNode) && b.nodeType === 1);
                                    return !1
                                }
                        }),
                        target: function(b) {
                            var c = a.location && a.location.hash;
                            return c && c.slice(1) === b.id
                        },
                        root: function(a) {
                            return a === m
                        },
                        focus: function(a) {
                            return a ===
                                l.activeElement && (!l.hasFocus || l.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                        },
                        enabled: function(a) {
                            return a.disabled === !1
                        },
                        disabled: function(a) {
                            return a.disabled === !0
                        },
                        checked: function(a) {
                            var b = a.nodeName.toLowerCase();
                            return b === "input" && !!a.checked || b === "option" && !!a.selected
                        },
                        selected: function(a) {
                            return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                        },
                        empty: function(a) {
                            for (a = a.firstChild; a; a = a.nextSibling)
                                if (a.nodeName > "@" || a.nodeType === 3 || a.nodeType === 4) return !1;
                            return !0
                        },
                        parent: function(a) {
                            return !e.pseudos.empty(a)
                        },
                        header: function(a) {
                            return Z.test(a.nodeName)
                        },
                        input: function(a) {
                            return Y.test(a.nodeName)
                        },
                        button: function(a) {
                            var b = a.nodeName.toLowerCase();
                            return b === "input" && a.type === "button" || b === "button"
                        },
                        text: function(a) {
                            var b;
                            return a.nodeName.toLowerCase() === "input" && a.type === "text" && ((b = a.getAttribute("type")) == null || b.toLowerCase() === a.type)
                        },
                        first: bl(function() {
                            return [0]
                        }),
                        last: bl(function(a, b) {
                            return [b - 1]
                        }),
                        eq: bl(function(a, b, c) {
                            return [c < 0 ? c + b : c]
                        }),
                        even: bl(function(a, b) {
                            var c = 0;
                            for (; c < b; c += 2) a.push(c);
                            return a
                        }),
                        odd: bl(function(a, b) {
                            var c = 1;
                            for (; c < b; c += 2) a.push(c);
                            return a
                        }),
                        lt: bl(function(a, b, c) {
                            var d = c < 0 ? c + b : c;
                            for (; --d >= 0;) a.push(d);
                            return a
                        }),
                        gt: bl(function(a, b, c) {
                            var d = c < 0 ? c + b : c;
                            for (; ++d < b;) a.push(d);
                            return a
                        })
                    }
                };
                for (c in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) e.pseudos[c] = bj(c);
                for (c in {
                    submit: !0,
                    reset: !0
                }) e.pseudos[c] = bk(c);
                h = bh.compile = function(a, b) {
                    var c, d = [],
                        e = [],
                        f = B[a + " "];
                    if (!f) {
                        b || (b = bm(a)), c = b.length;
                        while (c--) f = bs(b[c]), f[u] ? d.push(f) : e.push(f);
                        f = B(a, bt(e, d))
                    }
                    return f
                }, e.pseudos.nth = e.pseudos.eq, e.filters = bw.prototype = e.pseudos, e.setFilters = new bw, k(), bh.attr = t.attr, t.find = bh, t.expr = bh.selectors, t.expr[":"] = t.expr.pseudos, t.unique = bh.uniqueSort, t.text = bh.getText, t.isXMLDoc = bh.isXML, t.contains = bh.contains
            }(a);
        var bg = /Until$/,
            bh = /^(?:parents|prev(?:Until|All))/,
            bi = /^.[^:#\[\.,]*$/,
            bj = t.expr.match.needsContext,
            bk = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        t.fn.extend({
            find: function(a) {
                var b, c, d, e = this.length;
                if (typeof a != "string") return d = this, this.pushStack(t(a).filter(function() {
                    for (b = 0; b < e; b++)
                        if (t.contains(d[b], this)) return !0
                }));
                c = [];
                for (b = 0; b < e; b++) t.find(a, this[b], c);
                return c = this.pushStack(e > 1 ? t.unique(c) : c), c.selector = (this.selector ? this.selector + " " : "") + a, c
            },
            has: function(a) {
                var b, c = t(a, this),
                    d = c.length;
                return this.filter(function() {
                    for (b = 0; b < d; b++)
                        if (t.contains(this, c[b])) return !0
                })
            },
            not: function(a) {
                return this.pushStack(bm(this, a, !1))
            },
            filter: function(a) {
                return this.pushStack(bm(this, a, !0))
            },
            is: function(a) {
                return !!a && (typeof a == "string" ? bj.test(a) ? t(a, this.context).index(this[0]) >= 0 : t.filter(a, this).length > 0 : this.filter(a).length > 0)
            },
            closest: function(a, b) {
                var c, d = 0,
                    e = this.length,
                    f = [],
                    g = bj.test(a) || typeof a != "string" ? t(a, b || this.context) : 0;
                for (; d < e; d++) {
                    c = this[d];
                    while (c && c.ownerDocument && c !== b && c.nodeType !== 11) {
                        if (g ? g.index(c) > -1 : t.find.matchesSelector(c, a)) {
                            f.push(c);
                            break
                        }
                        c = c.parentNode
                    }
                }
                return this.pushStack(f.length > 1 ? t.unique(f) : f)
            },
            index: function(a) {
                return a ? typeof a == "string" ? t.inArray(this[0], t(a)) : t.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(a, b) {
                var c = typeof a == "string" ? t(a, b) : t.makeArray(a && a.nodeType ? [a] : a),
                    d = t.merge(this.get(), c);
                return this.pushStack(t.unique(d))
            },
            addBack: function(a) {
                return this.add(a == null ? this.prevObject : this.prevObject.filter(a))
            }
        }), t.fn.andSelf = t.fn.addBack, t.each({
            parent: function(a) {
                var b = a.parentNode;
                return b && b.nodeType !== 11 ? b : null
            },
            parents: function(a) {
                return t.dir(a, "parentNode")
            },
            parentsUntil: function(a, b, c) {
                return t.dir(a, "parentNode", c)
            },
            next: function(a) {
                return bl(a, "nextSibling")
            },
            prev: function(a) {
                return bl(a, "previousSibling")
            },
            nextAll: function(a) {
                return t.dir(a, "nextSibling")
            },
            prevAll: function(a) {
                return t.dir(a, "previousSibling")
            },
            nextUntil: function(a, b, c) {
                return t.dir(a, "nextSibling", c)
            },
            prevUntil: function(a, b, c) {
                return t.dir(a, "previousSibling", c)
            },
            siblings: function(a) {
                return t.sibling((a.parentNode || {}).firstChild, a)
            },
            children: function(a) {
                return t.sibling(a.firstChild)
            },
            contents: function(a) {
                return t.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : t.merge([], a.childNodes)
            }
        }, function(a, b) {
            t.fn[a] = function(c, d) {
                var e = t.map(this, b, c);
                return bg.test(a) || (d = c), d && typeof d == "string" && (e = t.filter(d, e)), e = this.length > 1 && !bk[a] ? t.unique(e) : e, this.length > 1 && bh.test(a) && (e = e.reverse()), this.pushStack(e)
            }
        }), t.extend({
            filter: function(a, b, c) {
                return c && (a = ":not(" + a + ")"), b.length === 1 ? t.find.matchesSelector(b[0], a) ? [b[0]] : [] : t.find.matches(a, b)
            },
            dir: function(a, c, d) {
                var e = [],
                    f = a[c];
                while (f && f.nodeType !== 9 && (d === b || f.nodeType !== 1 || !t(f).is(d))) f.nodeType === 1 && e.push(f), f = f[c];
                return e
            },
            sibling: function(a, b) {
                var c = [];
                for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
                return c
            }
        });
        var bo = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            bp = / jQuery\d+="(?:null|\d+)"/g,
            bq = new RegExp("<(?:" + bo + ")[\\s/>]", "i"),
            br = /^\s+/,
            bs = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            bt = /<([\w:]+)/,
            bu = /<tbody/i,
            bv = /<|&#?\w+;/,
            bw = /<(?:script|style|link)/i,
            bx = /^(?:checkbox|radio)$/i,
            by = /checked\s*(?:[^=]|=\s*.checked.)/i,
            bz = /^$|\/(?:java|ecma)script/i,
            bA = /^true\/(.*)/,
            bB = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            bC = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                area: [1, "<map>", "</map>"],
                param: [1, "<object>", "</object>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: t.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
            },
            bD = bn(f),
            bE = bD.appendChild(f.createElement("div"));
        bC.optgroup = bC.option, bC.tbody = bC.tfoot = bC.colgroup = bC.caption = bC.thead, bC.th = bC.td, t.fn.extend({
            text: function(a) {
                return t.access(this, function(a) {
                    return a === b ? t.text(this) : this.empty().append((this[0] && this[0].ownerDocument || f).createTextNode(a))
                }, null, a, arguments.length)
            },
            wrapAll: function(a) {
                if (t.isFunction(a)) return this.each(function(b) {
                    t(this).wrapAll(a.call(this, b))
                });
                if (this[0]) {
                    var b = t(a, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                        var a = this;
                        while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
                        return a
                    }).append(this)
                }
                return this
            },
            wrapInner: function(a) {
                return t.isFunction(a) ? this.each(function(b) {
                    t(this).wrapInner(a.call(this, b))
                }) : this.each(function() {
                    var b = t(this),
                        c = b.contents();
                    c.length ? c.wrapAll(a) : b.append(a)
                })
            },
            wrap: function(a) {
                var b = t.isFunction(a);
                return this.each(function(c) {
                    t(this).wrapAll(b ? a.call(this, c) : a)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    t.nodeName(this, "body") || t(this).replaceWith(this.childNodes)
                }).end()
            },
            append: function() {
                return this.domManip(arguments, !0, function(a) {
                    (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) && this.appendChild(a)
                })
            },
            prepend: function() {
                return this.domManip(arguments, !0, function(a) {
                    (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) && this.insertBefore(a, this.firstChild)
                })
            },
            before: function() {
                return this.domManip(arguments, !1, function(a) {
                    this.parentNode && this.parentNode.insertBefore(a, this)
                })
            },
            after: function() {
                return this.domManip(arguments, !1, function(a) {
                    this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
                })
            },
            remove: function(a, b) {
                var c, d = 0;
                for (;
                    (c = this[d]) != null; d++)
                    if (!a || t.filter(a, [c]).length > 0)!b && c.nodeType === 1 && t.cleanData(bL(c)), c.parentNode && (b && t.contains(c.ownerDocument, c) && bI(bL(c, "script")), c.parentNode.removeChild(c));
                return this
            },
            empty: function() {
                var a, b = 0;
                for (;
                    (a = this[b]) != null; b++) {
                    a.nodeType === 1 && t.cleanData(bL(a, !1));
                    while (a.firstChild) a.removeChild(a.firstChild);
                    a.options && t.nodeName(a, "select") && (a.options.length = 0)
                }
                return this
            },
            clone: function(a, b) {
                return a = a == null ? !1 : a, b = b == null ? a : b, this.map(function() {
                    return t.clone(this, a, b)
                })
            },
            html: function(a) {
                return t.access(this, function(a) {
                    var c = this[0] || {},
                        d = 0,
                        e = this.length;
                    if (a === b) return c.nodeType === 1 ? c.innerHTML.replace(bp, "") : b;
                    if (typeof a == "string" && !bw.test(a) && (t.support.htmlSerialize || !bq.test(a)) && (t.support.leadingWhitespace || !br.test(a)) && !bC[(bt.exec(a) || ["", ""])[1].toLowerCase()]) {
                        a = a.replace(bs, "<$1></$2>");
                        try {
                            for (; d < e; d++) c = this[d] || {}, c.nodeType === 1 && (t.cleanData(bL(c, !1)), c.innerHTML = a);
                            c = 0
                        } catch (f) {}
                    }
                    c && this.empty().append(a)
                }, null, a, arguments.length)
            },
            replaceWith: function(a) {
                var b = t.isFunction(a);
                return !b && typeof a != "string" && (a = t(a).not(this).detach()), this.domManip([a], !0, function(a) {
                    var b = this.nextSibling,
                        c = this.parentNode;
                    c && (t(this).remove(), c.insertBefore(a, b))
                })
            },
            detach: function(a) {
                return this.remove(a, !0)
            },
            domManip: function(a, c, d) {
                a = m.apply([], a);
                var e, f, g, h, i, j, k = 0,
                    l = this.length,
                    n = this,
                    o = l - 1,
                    p = a[0],
                    q = t.isFunction(p);
                if (q || !(l <= 1 || typeof p != "string" || t.support.checkClone || !by.test(p))) return this.each(function(e) {
                    var f = n.eq(e);
                    q && (a[0] = p.call(this, e, c ? f.html() : b)), f.domManip(a, c, d)
                });
                if (l) {
                    j = t.buildFragment(a, this[0].ownerDocument, !1, this), e = j.firstChild, j.childNodes.length === 1 && (j = e);
                    if (e) {
                        c = c && t.nodeName(e, "tr"), h = t.map(bL(j, "script"), bG), g = h.length;
                        for (; k < l; k++) f = j, k !== o && (f = t.clone(f, !0, !0), g && t.merge(h, bL(f, "script"))), d.call(c && t.nodeName(this[k], "table") ? bF(this[k], "tbody") : this[k], f, k);
                        if (g) {
                            i = h[h.length - 1].ownerDocument, t.map(h, bH);
                            for (k = 0; k < g; k++) f = h[k], bz.test(f.type || "") && !t._data(f, "globalEval") && t.contains(i, f) && (f.src ? t.ajax({
                                url: f.src,
                                type: "GET",
                                dataType: "script",
                                async: !1,
                                global: !1,
                                "throws": !0
                            }) : t.globalEval((f.text || f.textContent || f.innerHTML || "").replace(bB, "")))
                        }
                        j = e = null
                    }
                }
                return this
            }
        }), t.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(a, b) {
            t.fn[a] = function(a) {
                var c, d = 0,
                    e = [],
                    f = t(a),
                    g = f.length - 1;
                for (; d <= g; d++) c = d === g ? this : this.clone(!0), t(f[d])[b](c), n.apply(e, c.get());
                return this.pushStack(e)
            }
        }), t.extend({
            clone: function(a, b, c) {
                var d, e, f, g, h, i = t.contains(a.ownerDocument, a);
                t.support.html5Clone || t.isXMLDoc(a) || !bq.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (bE.innerHTML = a.outerHTML, bE.removeChild(f = bE.firstChild));
                if ((!t.support.noCloneEvent || !t.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !t.isXMLDoc(a)) {
                    d = bL(f), h = bL(a);
                    for (g = 0;
                        (e = h[g]) != null; ++g) d[g] && bK(e, d[g])
                }
                if (b)
                    if (c) {
                        h = h || bL(a), d = d || bL(f);
                        for (g = 0;
                            (e = h[g]) != null; g++) bJ(e, d[g])
                    } else bJ(a, f);
                return d = bL(f, "script"), d.length > 0 && bI(d, !i && bL(a, "script")), d = h = e = null, f
            },
            buildFragment: function(a, b, c, d) {
                var e, f, g, h, i, j, k, l = a.length,
                    m = bn(b),
                    n = [],
                    o = 0;
                for (; o < l; o++) {
                    f = a[o];
                    if (f || f === 0)
                        if (t.type(f) === "object") t.merge(n, f.nodeType ? [f] : f);
                        else if (!bv.test(f)) n.push(b.createTextNode(f));
                    else {
                        h = h || m.appendChild(b.createElement("div")), i = (bt.exec(f) || ["", ""])[1].toLowerCase(), k = bC[i] || bC._default, h.innerHTML = k[1] + f.replace(bs, "<$1></$2>") + k[2], e = k[0];
                        while (e--) h = h.lastChild;
                        !t.support.leadingWhitespace && br.test(f) && n.push(b.createTextNode(br.exec(f)[0]));
                        if (!t.support.tbody) {
                            f = i === "table" && !bu.test(f) ? h.firstChild : k[1] === "<table>" && !bu.test(f) ? h : 0, e = f && f.childNodes.length;
                            while (e--) t.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j)
                        }
                        t.merge(n, h.childNodes), h.textContent = "";
                        while (h.firstChild) h.removeChild(h.firstChild);
                        h = m.lastChild
                    }
                }
                h && m.removeChild(h), t.support.appendChecked || t.grep(bL(n, "input"), bM), o = 0;
                while (f = n[o++]) {
                    if (d && t.inArray(f, d) !== -1) continue;
                    g = t.contains(f.ownerDocument, f), h = bL(m.appendChild(f), "script"), g && bI(h);
                    if (c) {
                        e = 0;
                        while (f = h[e++]) bz.test(f.type || "") && c.push(f)
                    }
                }
                return h = null, m
            },
            cleanData: function(a, b) {
                var c, d, f, g, h = 0,
                    i = t.expando,
                    j = t.cache,
                    l = t.support.deleteExpando,
                    m = t.event.special;
                for (;
                    (c = a[h]) != null; h++)
                    if (b || t.acceptData(c)) {
                        f = c[i], g = f && j[f];
                        if (g) {
                            if (g.events)
                                for (d in g.events) m[d] ? t.event.remove(c, d) : t.removeEvent(c, d, g.handle);
                            j[f] && (delete j[f], l ? delete c[i] : typeof c.removeAttribute !== e ? c.removeAttribute(i) : c[i] = null, k.push(f))
                        }
                    }
            }
        });
        var bN, bO, bP, bQ = /alpha\([^)]*\)/i,
            bR = /opacity\s*=\s*([^)]*)/,
            bS = /^(top|right|bottom|left)$/,
            bT = /^(none|table(?!-c[ea]).+)/,
            bU = /^margin/,
            bV = new RegExp("^(" + u + ")(.*)$", "i"),
            bW = new RegExp("^(" + u + ")(?!px)[a-z%]+$", "i"),
            bX = new RegExp("^([+-])=(" + u + ")", "i"),
            bY = {
                BODY: "block"
            },
            bZ = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            b$ = {
                letterSpacing: 0,
                fontWeight: 400
            },
            b_ = ["Top", "Right", "Bottom", "Left"],
            ca = ["Webkit", "O", "Moz", "ms"];
        t.fn.extend({
            css: function(a, c) {
                return t.access(this, function(a, c, d) {
                    var e, f, g = {},
                        h = 0;
                    if (t.isArray(c)) {
                        f = bO(a), e = c.length;
                        for (; h < e; h++) g[c[h]] = t.css(a, c[h], !1, f);
                        return g
                    }
                    return d !== b ? t.style(a, c, d) : t.css(a, c)
                }, a, c, arguments.length > 1)
            },
            show: function() {
                return cd(this, !0)
            },
            hide: function() {
                return cd(this)
            },
            toggle: function(a) {
                var b = typeof a == "boolean";
                return this.each(function() {
                    (b ? a : cc(this)) ? t(this).show(): t(this).hide()
                })
            }
        }), t.extend({
            cssHooks: {
                opacity: {
                    get: function(a, b) {
                        if (b) {
                            var c = bP(a, "opacity");
                            return c === "" ? "1" : c
                        }
                    }
                }
            },
            cssNumber: {
                columnCount: !0,
                fillOpacity: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": t.support.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function(a, c, d, e) {
                if (!a || a.nodeType === 3 || a.nodeType === 8 || !a.style) return;
                var f, g, h, i = t.camelCase(c),
                    j = a.style;
                c = t.cssProps[i] || (t.cssProps[i] = cb(j, i)), h = t.cssHooks[c] || t.cssHooks[i];
                if (d === b) return h && "get" in h && (f = h.get(a, !1, e)) !== b ? f : j[c];
                g = typeof d, g === "string" && (f = bX.exec(d)) && (d = (f[1] + 1) * f[2] + parseFloat(t.css(a, c)), g = "number");
                if (d == null || g === "number" && isNaN(d)) return;
                g === "number" && !t.cssNumber[i] && (d += "px"), !t.support.clearCloneStyle && d === "" && c.indexOf("background") === 0 && (j[c] = "inherit");
                if (!h || !("set" in h) || (d = h.set(a, d, e)) !== b) try {
                    j[c] = d
                } catch (k) {}
            },
            css: function(a, c, d, e) {
                var f, g, h, i = t.camelCase(c);
                return c = t.cssProps[i] || (t.cssProps[i] = cb(a.style, i)), h = t.cssHooks[c] || t.cssHooks[i], h && "get" in h && (g = h.get(a, !0, d)), g === b && (g = bP(a, c, e)), g === "normal" && c in b$ && (g = b$[c]), d === "" || d ? (f = parseFloat(g), d === !0 || t.isNumeric(f) ? f || 0 : g) : g
            },
            swap: function(a, b, c, d) {
                var e, f, g = {};
                for (f in b) g[f] = a.style[f], a.style[f] = b[f];
                e = c.apply(a, d || []);
                for (f in b) a.style[f] = g[f];
                return e
            }
        }), a.getComputedStyle ? (bO = function(b) {
            return a.getComputedStyle(b, null)
        }, bP = function(a, c, d) {
            var e, f, g, h = d || bO(a),
                i = h ? h.getPropertyValue(c) || h[c] : b,
                j = a.style;
            return h && (i === "" && !t.contains(a.ownerDocument, a) && (i = t.style(a, c)), bW.test(i) && bU.test(c) && (e = j.width, f = j.minWidth, g = j.maxWidth, j.minWidth = j.maxWidth = j.width = i, i = h.width, j.width = e, j.minWidth = f, j.maxWidth = g)), i
        }) : f.documentElement.currentStyle && (bO = function(a) {
            return a.currentStyle
        }, bP = function(a, c, d) {
            var e, f, g, h = d || bO(a),
                i = h ? h[c] : b,
                j = a.style;
            return i == null && j && j[c] && (i = j[c]), bW.test(i) && !bS.test(c) && (e = j.left, f = a.runtimeStyle, g = f && f.left, g && (f.left = a.currentStyle.left), j.left = c === "fontSize" ? "1em" : i, i = j.pixelLeft + "px", j.left = e, g && (f.left = g)), i === "" ? "auto" : i
        }), t.each(["height", "width"], function(a, b) {
            t.cssHooks[b] = {
                get: function(a, c, d) {
                    if (c) return a.offsetWidth === 0 && bT.test(t.css(a, "display")) ? t.swap(a, bZ, function() {
                        return cg(a, b, d)
                    }) : cg(a, b, d)
                },
                set: function(a, c, d) {
                    var e = d && bO(a);
                    return ce(a, c, d ? cf(a, b, d, t.support.boxSizing && t.css(a, "boxSizing", !1, e) === "border-box", e) : 0)
                }
            }
        }), t.support.opacity || (t.cssHooks.opacity = {
            get: function(a, b) {
                return bR.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
            },
            set: function(a, b) {
                var c = a.style,
                    d = a.currentStyle,
                    e = t.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "",
                    f = d && d.filter || c.filter || "";
                c.zoom = 1;
                if ((b >= 1 || b === "") && t.trim(f.replace(bQ, "")) === "" && c.removeAttribute) {
                    c.removeAttribute("filter");
                    if (b === "" || d && !d.filter) return
                }
                c.filter = bQ.test(f) ? f.replace(bQ, e) : f + " " + e
            }
        }), t(function() {
            t.support.reliableMarginRight || (t.cssHooks.marginRight = {
                get: function(a, b) {
                    if (b) return t.swap(a, {
                        display: "inline-block"
                    }, bP, [a, "marginRight"])
                }
            }), !t.support.pixelPosition && t.fn.position && t.each(["top", "left"], function(a, b) {
                t.cssHooks[b] = {
                    get: function(a, c) {
                        if (c) return c = bP(a, b), bW.test(c) ? t(a).position()[b] + "px" : c
                    }
                }
            })
        }), t.expr && t.expr.filters && (t.expr.filters.hidden = function(a) {
            return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !t.support.reliableHiddenOffsets && (a.style && a.style.display || t.css(a, "display")) === "none"
        }, t.expr.filters.visible = function(a) {
            return !t.expr.filters.hidden(a)
        }), t.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(a, b) {
            t.cssHooks[a + b] = {
                expand: function(c) {
                    var d = 0,
                        e = {},
                        f = typeof c == "string" ? c.split(" ") : [c];
                    for (; d < 4; d++) e[a + b_[d] + b] = f[d] || f[d - 2] || f[0];
                    return e
                }
            }, bU.test(a) || (t.cssHooks[a + b].set = ce)
        });
        var cj = /%20/g,
            ck = /\[\]$/,
            cl = /\r?\n/g,
            cm = /^(?:submit|button|image|reset|file)$/i,
            cn = /^(?:input|select|textarea|keygen)/i;
        t.fn.extend({
            serialize: function() {
                return t.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var a = t.prop(this, "elements");
                    return a ? t.makeArray(a) : this
                }).filter(function() {
                    var a = this.type;
                    return this.name && !t(this).is(":disabled") && cn.test(this.nodeName) && !cm.test(a) && (this.checked || !bx.test(a))
                }).map(function(a, b) {
                    var c = t(this).val();
                    return c == null ? null : t.isArray(c) ? t.map(c, function(a) {
                        return {
                            name: b.name,
                            value: a.replace(cl, "\r\n")
                        }
                    }) : {
                        name: b.name,
                        value: c.replace(cl, "\r\n")
                    }
                }).get()
            }
        }), t.param = function(a, c) {
            var d, e = [],
                f = function(a, b) {
                    b = t.isFunction(b) ? b() : b == null ? "" : b, e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                };
            c === b && (c = t.ajaxSettings && t.ajaxSettings.traditional);
            if (t.isArray(a) || a.jquery && !t.isPlainObject(a)) t.each(a, function() {
                f(this.name, this.value)
            });
            else
                for (d in a) co(d, a[d], c, f);
            return e.join("&").replace(cj, "+")
        }, t.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
            t.fn[b] = function(a, c) {
                return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
            }
        }), t.fn.hover = function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        };
        var cp, cq, cr = t.now(),
            cs = /\?/,
            ct = /#.*$/,
            cu = /([?&])_=[^&]*/,
            cv = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
            cw = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            cx = /^(?:GET|HEAD)$/,
            cy = /^\/\//,
            cz = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
            cA = t.fn.load,
            cB = {},
            cC = {},
            cD = "*/".concat("*");
        try {
            cq = g.href
        } catch (cE) {
            cq = f.createElement("a"), cq.href = "", cq = cq.href
        }
        cp = cz.exec(cq.toLowerCase()) || [], t.fn.load = function(a, c, d) {
            if (typeof a != "string" && cA) return cA.apply(this, arguments);
            var e, f, g, h = this,
                i = a.indexOf(" ");
            return i >= 0 && (e = a.slice(i, a.length), a = a.slice(0, i)), t.isFunction(c) ? (d = c, c = b) : c && typeof c == "object" && (g = "POST"), h.length > 0 && t.ajax({
                url: a,
                type: g,
                dataType: "html",
                data: c
            }).done(function(a) {
                f = arguments, h.html(e ? t("<div>").append(t.parseHTML(a)).find(e) : a)
            }).complete(d && function(a, b) {
                h.each(d, f || [a.responseText, b, a])
            }), this
        }, t.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
            t.fn[b] = function(a) {
                return this.on(b, a)
            }
        }), t.each(["get", "post"], function(a, c) {
            t[c] = function(a, d, e, f) {
                return t.isFunction(d) && (f = f || e, e = d, d = b), t.ajax({
                    url: a,
                    type: c,
                    dataType: f,
                    data: d,
                    success: e
                })
            }
        }), t.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: cq,
                type: "GET",
                isLocal: cw.test(cp[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": cD,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText"
                },
                converters: {
                    "* text": a.String,
                    "text html": !0,
                    "text json": t.parseJSON,
                    "text xml": t.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(a, b) {
                return b ? cH(cH(a, t.ajaxSettings), b) : cH(t.ajaxSettings, a)
            },
            ajaxPrefilter: cF(cB),
            ajaxTransport: cF(cC),
            ajax: function(a, c) {
                function z(a, c, d, e) {
                    var k, r, s, v, w, y = c;
                    if (u === 2) return;
                    u = 2, h && clearTimeout(h), j = b, g = e || "", x.readyState = a > 0 ? 4 : 0, d && (v = cI(l, x, d));
                    if (a >= 200 && a < 300 || a === 304) l.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (t.lastModified[f] = w), w = x.getResponseHeader("etag"), w && (t.etag[f] = w)), a === 204 ? (k = !0, y = "nocontent") : a === 304 ? (k = !0, y = "notmodified") : (k = cJ(l, v), y = k.state, r = k.data, s = k.error, k = !s);
                    else {
                        s = y;
                        if (a || !y) y = "error", a < 0 && (a = 0)
                    }
                    x.status = a, x.statusText = (c || y) + "", k ? o.resolveWith(m, [r, y, x]) : o.rejectWith(m, [x, y, s]), x.statusCode(q), q = b, i && n.trigger(k ? "ajaxSuccess" : "ajaxError", [x, l, k ? r : s]), p.fireWith(m, [x, y]), i && (n.trigger("ajaxComplete", [x, l]), --t.active || t.event.trigger("ajaxStop"))
                }
                typeof a == "object" && (c = a, a = b), c = c || {};
                var d, e, f, g, h, i, j, k, l = t.ajaxSetup({}, c),
                    m = l.context || l,
                    n = l.context && (m.nodeType || m.jquery) ? t(m) : t.event,
                    o = t.Deferred(),
                    p = t.Callbacks("once memory"),
                    q = l.statusCode || {},
                    r = {},
                    s = {},
                    u = 0,
                    w = "canceled",
                    x = {
                        readyState: 0,
                        getResponseHeader: function(a) {
                            var b;
                            if (u === 2) {
                                if (!k) {
                                    k = {};
                                    while (b = cv.exec(g)) k[b[1].toLowerCase()] = b[2]
                                }
                                b = k[a.toLowerCase()]
                            }
                            return b == null ? null : b
                        },
                        getAllResponseHeaders: function() {
                            return u === 2 ? g : null
                        },
                        setRequestHeader: function(a, b) {
                            var c = a.toLowerCase();
                            return u || (a = s[c] = s[c] || a, r[a] = b), this
                        },
                        overrideMimeType: function(a) {
                            return u || (l.mimeType = a), this
                        },
                        statusCode: function(a) {
                            var b;
                            if (a)
                                if (u < 2)
                                    for (b in a) q[b] = [q[b], a[b]];
                                else x.always(a[x.status]);
                            return this
                        },
                        abort: function(a) {
                            var b = a || w;
                            return j && j.abort(b), z(0, b), this
                        }
                    };
                o.promise(x).complete = p.add, x.success = x.done, x.error = x.fail, l.url = ((a || l.url || cq) + "").replace(ct, "").replace(cy, cp[1] + "//"), l.type = c.method || c.type || l.method || l.type, l.dataTypes = t.trim(l.dataType || "*").toLowerCase().match(v) || [""], l.crossDomain == null && (d = cz.exec(l.url.toLowerCase()), l.crossDomain = !(!d || d[1] === cp[1] && d[2] === cp[2] && (d[3] || (d[1] === "http:" ? 80 : 443)) == (cp[3] || (cp[1] === "http:" ? 80 : 443)))), l.data && l.processData && typeof l.data != "string" && (l.data = t.param(l.data, l.traditional)), cG(cB, l, c, x);
                if (u === 2) return x;
                i = l.global, i && t.active++ === 0 && t.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !cx.test(l.type), f = l.url, l.hasContent || (l.data && (f = l.url += (cs.test(f) ? "&" : "?") + l.data, delete l.data), l.cache === !1 && (l.url = cu.test(f) ? f.replace(cu, "$1_=" + cr++) : f + (cs.test(f) ? "&" : "?") + "_=" + cr++)), l.ifModified && (t.lastModified[f] && x.setRequestHeader("If-Modified-Since", t.lastModified[f]), t.etag[f] && x.setRequestHeader("If-None-Match", t.etag[f])), (l.data && l.hasContent && l.contentType !== !1 || c.contentType) && x.setRequestHeader("Content-Type", l.contentType), x.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + (l.dataTypes[0] !== "*" ? ", " + cD + "; q=0.01" : "") : l.accepts["*"]);
                for (e in l.headers) x.setRequestHeader(e, l.headers[e]);
                if (!l.beforeSend || l.beforeSend.call(m, x, l) !== !1 && u !== 2) {
                    w = "abort";
                    for (e in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) x[e](l[e]);
                    j = cG(cC, l, c, x);
                    if (!j) z(-1, "No Transport");
                    else {
                        x.readyState = 1, i && n.trigger("ajaxSend", [x, l]), l.async && l.timeout > 0 && (h = setTimeout(function() {
                            x.abort("timeout")
                        }, l.timeout));
                        try {
                            u = 1, j.send(r, z)
                        } catch (y) {
                            if (u < 2) z(-1, y);
                            else throw y
                        }
                    }
                    return x
                }
                return x.abort()
            },
            getScript: function(a, c) {
                return t.get(a, b, c, "script")
            },
            getJSON: function(a, b, c) {
                return t.get(a, b, c, "json")
            }
        }), t.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /(?:java|ecma)script/
            },
            converters: {
                "text script": function(a) {
                    return t.globalEval(a), a
                }
            }
        }), t.ajaxPrefilter("script", function(a) {
            a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
        }), t.ajaxTransport("script", function(a) {
            if (a.crossDomain) {
                var c, d = f.head || t("head")[0] || f.documentElement;
                return {
                    send: function(b, e) {
                        c = f.createElement("script"), c.async = !0, a.scriptCharset && (c.charset = a.scriptCharset), c.src = a.url, c.onload = c.onreadystatechange = function(a, b) {
                            if (b || !c.readyState || /loaded|complete/.test(c.readyState)) c.onload = c.onreadystatechange = null, c.parentNode && c.parentNode.removeChild(c), c = null, b || e(200, "success")
                        }, d.insertBefore(c, d.firstChild)
                    },
                    abort: function() {
                        c && c.onload(b, !0)
                    }
                }
            }
        });
        var cK = [],
            cL = /(=)\?(?=&|$)|\?\?/;
        t.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var a = cK.pop() || t.expando + "_" + cr++;
                return this[a] = !0, a
            }
        }), t.ajaxPrefilter("json jsonp", function(c, d, e) {
            var f, g, h, i = c.jsonp !== !1 && (cL.test(c.url) ? "url" : typeof c.data == "string" && !(c.contentType || "").indexOf("application/x-www-form-urlencoded") && cL.test(c.data) && "data");
            if (i || c.dataTypes[0] === "jsonp") return f = c.jsonpCallback = t.isFunction(c.jsonpCallback) ? c.jsonpCallback() : c.jsonpCallback, i ? c[i] = c[i].replace(cL, "$1" + f) : c.jsonp !== !1 && (c.url += (cs.test(c.url) ? "&" : "?") + c.jsonp + "=" + f), c.converters["script json"] = function() {
                return h || t.error(f + " was not called"), h[0]
            }, c.dataTypes[0] = "json", g = a[f], a[f] = function() {
                h = arguments
            }, e.always(function() {
                a[f] = g, c[f] && (c.jsonpCallback = d.jsonpCallback, cK.push(f)), h && t.isFunction(g) && g(h[0]), h = g = b
            }), "script"
        });
        var cM, cN, cO = 0,
            cP = a.ActiveXObject && function() {
                var a;
                for (a in cM) cM[a](b, !0)
            };
        t.ajaxSettings.xhr = a.ActiveXObject ? function() {
            return !this.isLocal && cQ() || cR()
        } : cQ, cN = t.ajaxSettings.xhr(), t.support.cors = !!cN && "withCredentials" in cN, cN = t.support.ajax = !!cN, cN && t.ajaxTransport(function(c) {
            if (!c.crossDomain || t.support.cors) {
                var d;
                return {
                    send: function(e, f) {
                        var g, h, i = c.xhr();
                        c.username ? i.open(c.type, c.url, c.async, c.username, c.password) : i.open(c.type, c.url, c.async);
                        if (c.xhrFields)
                            for (h in c.xhrFields) i[h] = c.xhrFields[h];
                        c.mimeType && i.overrideMimeType && i.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                        try {
                            for (h in e) i.setRequestHeader(h, e[h])
                        } catch (j) {}
                        i.send(c.hasContent && c.data || null), d = function(a, e) {
                            var h, j, k, l;
                            try {
                                if (d && (e || i.readyState === 4)) {
                                    d = b, g && (i.onreadystatechange = t.noop, cP && delete cM[g]);
                                    if (e) i.readyState !== 4 && i.abort();
                                    else {
                                        l = {}, h = i.status, j = i.getAllResponseHeaders(), typeof i.responseText == "string" && (l.text = i.responseText);
                                        try {
                                            k = i.statusText
                                        } catch (m) {
                                            k = ""
                                        }!h && c.isLocal && !c.crossDomain ? h = l.text ? 200 : 404 : h === 1223 && (h = 204)
                                    }
                                }
                            } catch (n) {
                                e || f(-1, n)
                            }
                            l && f(h, k, l, j)
                        }, c.async ? i.readyState === 4 ? setTimeout(d) : (g = ++cO, cP && (cM || (cM = {}, t(a).unload(cP)), cM[g] = d), i.onreadystatechange = d) : d()
                    },
                    abort: function() {
                        d && d(b, !0)
                    }
                }
            }
        });
        var cS, cT, cU = /^(?:toggle|show|hide)$/,
            cV = new RegExp("^(?:([+-])=|)(" + u + ")([a-z%]*)$", "i"),
            cW = /queueHooks$/,
            cX = [db],
            cY = {
                "*": [
                    function(a, b) {
                        var c, d, e = this.createTween(a, b),
                            f = cV.exec(b),
                            g = e.cur(),
                            h = +g || 0,
                            i = 1,
                            j = 20;
                        if (f) {
                            c = +f[2], d = f[3] || (t.cssNumber[a] ? "" : "px");
                            if (d !== "px" && h) {
                                h = t.css(e.elem, a, !0) || c || 1;
                                do i = i || ".5", h /= i, t.style(e.elem, a, h + d); while (i !== (i = e.cur() / g) && i !== 1 && --j)
                            }
                            e.unit = d, e.start = h, e.end = f[1] ? h + (f[1] + 1) * c : c
                        }
                        return e
                    }
                ]
            };
        t.Animation = t.extend(c_, {
            tweener: function(a, b) {
                t.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
                var c, d = 0,
                    e = a.length;
                for (; d < e; d++) c = a[d], cY[c] = cY[c] || [], cY[c].unshift(b)
            },
            prefilter: function(a, b) {
                b ? cX.unshift(a) : cX.push(a)
            }
        }), t.Tween = dc, dc.prototype = {
            constructor: dc,
            init: function(a, b, c, d, e, f) {
                this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (t.cssNumber[c] ? "" : "px")
            },
            cur: function() {
                var a = dc.propHooks[this.prop];
                return a && a.get ? a.get(this) : dc.propHooks._default.get(this)
            },
            run: function(a) {
                var b, c = dc.propHooks[this.prop];
                return this.options.duration ? this.pos = b = t.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : dc.propHooks._default.set(this), this
            }
        }, dc.prototype.init.prototype = dc.prototype, dc.propHooks = {
            _default: {
                get: function(a) {
                    var b;
                    return a.elem[a.prop] == null || !!a.elem.style && a.elem.style[a.prop] != null ? (b = t.css(a.elem, a.prop, ""), !b || b === "auto" ? 0 : b) : a.elem[a.prop]
                },
                set: function(a) {
                    t.fx.step[a.prop] ? t.fx.step[a.prop](a) : a.elem.style && (a.elem.style[t.cssProps[a.prop]] != null || t.cssHooks[a.prop]) ? t.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
                }
            }
        }, dc.propHooks.scrollTop = dc.propHooks.scrollLeft = {
            set: function(a) {
                a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
            }
        }, t.each(["toggle", "show", "hide"], function(a, b) {
            var c = t.fn[b];
            t.fn[b] = function(a, d, e) {
                return a == null || typeof a == "boolean" ? c.apply(this, arguments) : this.animate(dd(b, !0), a, d, e)
            }
        }), t.fn.extend({
            fadeTo: function(a, b, c, d) {
                return this.filter(cc).css("opacity", 0).show().end().animate({
                    opacity: b
                }, a, c, d)
            },
            animate: function(a, b, c, d) {
                var e = t.isEmptyObject(a),
                    f = t.speed(b, c, d),
                    g = function() {
                        var b = c_(this, t.extend({}, a), f);
                        g.finish = function() {
                            b.stop(!0)
                        }, (e || t._data(this, "finish")) && b.stop(!0)
                    };
                return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
            },
            stop: function(a, c, d) {
                var e = function(a) {
                    var b = a.stop;
                    delete a.stop, b(d)
                };
                return typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []), this.each(function() {
                    var b = !0,
                        c = a != null && a + "queueHooks",
                        f = t.timers,
                        g = t._data(this);
                    if (c) g[c] && g[c].stop && e(g[c]);
                    else
                        for (c in g) g[c] && g[c].stop && cW.test(c) && e(g[c]);
                    for (c = f.length; c--;) f[c].elem === this && (a == null || f[c].queue === a) && (f[c].anim.stop(d), b = !1, f.splice(c, 1));
                    (b || !d) && t.dequeue(this, a)
                })
            },
            finish: function(a) {
                return a !== !1 && (a = a || "fx"), this.each(function() {
                    var b, c = t._data(this),
                        d = c[a + "queue"],
                        e = c[a + "queueHooks"],
                        f = t.timers,
                        g = d ? d.length : 0;
                    c.finish = !0, t.queue(this, a, []), e && e.cur && e.cur.finish && e.cur.finish.call(this);
                    for (b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                    for (b = 0; b < g; b++) d[b] && d[b].finish && d[b].finish.call(this);
                    delete c.finish
                })
            }
        }), t.each({
            slideDown: dd("show"),
            slideUp: dd("hide"),
            slideToggle: dd("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(a, b) {
            t.fn[a] = function(a, c, d) {
                return this.animate(b, a, c, d)
            }
        }), t.speed = function(a, b, c) {
            var d = a && typeof a == "object" ? t.extend({}, a) : {
                complete: c || !c && b || t.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !t.isFunction(b) && b
            };
            d.duration = t.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in t.fx.speeds ? t.fx.speeds[d.duration] : t.fx.speeds._default;
            if (d.queue == null || d.queue === !0) d.queue = "fx";
            return d.old = d.complete, d.complete = function() {
                t.isFunction(d.old) && d.old.call(this), d.queue && t.dequeue(this, d.queue)
            }, d
        }, t.easing = {
            linear: function(a) {
                return a
            },
            swing: function(a) {
                return .5 - Math.cos(a * Math.PI) / 2
            }
        }, t.timers = [], t.fx = dc.prototype.init, t.fx.tick = function() {
            var a, c = t.timers,
                d = 0;
            cS = t.now();
            for (; d < c.length; d++) a = c[d], !a() && c[d] === a && c.splice(d--, 1);
            c.length || t.fx.stop(), cS = b
        }, t.fx.timer = function(a) {
            a() && t.timers.push(a) && t.fx.start()
        }, t.fx.interval = 13, t.fx.start = function() {
            cT || (cT = setInterval(t.fx.tick, t.fx.interval))
        }, t.fx.stop = function() {
            clearInterval(cT), cT = null
        }, t.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, t.fx.step = {}, t.expr && t.expr.filters && (t.expr.filters.animated = function(a) {
            return t.grep(t.timers, function(b) {
                return a === b.elem
            }).length
        }), t.fn.offset = function(a) {
            if (arguments.length) return a === b ? this : this.each(function(b) {
                t.offset.setOffset(this, a, b)
            });
            var c, d, f = {
                    top: 0,
                    left: 0
                },
                g = this[0],
                h = g && g.ownerDocument;
            if (!h) return;
            return c = h.documentElement, t.contains(c, g) ? (typeof g.getBoundingClientRect !== e && (f = g.getBoundingClientRect()), d = de(h), {
                top: f.top + (d.pageYOffset || c.scrollTop) - (c.clientTop || 0),
                left: f.left + (d.pageXOffset || c.scrollLeft) - (c.clientLeft || 0)
            }) : f
        }, t.offset = {
            setOffset: function(a, b, c) {
                var d = t.css(a, "position");
                d === "static" && (a.style.position = "relative");
                var e = t(a),
                    f = e.offset(),
                    g = t.css(a, "top"),
                    h = t.css(a, "left"),
                    i = (d === "absolute" || d === "fixed") && t.inArray("auto", [g, h]) > -1,
                    j = {},
                    k = {},
                    l, m;
                i ? (k = e.position(), l = k.top, m = k.left) : (l = parseFloat(g) || 0, m = parseFloat(h) || 0), t.isFunction(b) && (b = b.call(a, c, f)), b.top != null && (j.top = b.top - f.top + l), b.left != null && (j.left = b.left - f.left + m), "using" in b ? b.using.call(a, j) : e.css(j)
            }
        }, t.fn.extend({
            position: function() {
                if (!this[0]) return;
                var a, b, c = {
                        top: 0,
                        left: 0
                    },
                    d = this[0];
                return t.css(d, "position") === "fixed" ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), t.nodeName(a[0], "html") || (c = a.offset()), c.top += t.css(a[0], "borderTopWidth", !0), c.left += t.css(a[0], "borderLeftWidth", !0)), {
                    top: b.top - c.top - t.css(d, "marginTop", !0),
                    left: b.left - c.left - t.css(d, "marginLeft", !0)
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    var a = this.offsetParent || f.documentElement;
                    while (a && !t.nodeName(a, "html") && t.css(a, "position") === "static") a = a.offsetParent;
                    return a || f.documentElement
                })
            }
        }), t.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(a, c) {
            var d = /Y/.test(c);
            t.fn[a] = function(e) {
                return t.access(this, function(a, e, f) {
                    var g = de(a);
                    if (f === b) return g ? c in g ? g[c] : g.document.documentElement[e] : a[e];
                    g ? g.scrollTo(d ? t(g).scrollLeft() : f, d ? f : t(g).scrollTop()) : a[e] = f
                }, a, e, arguments.length, null)
            }
        }), t.each({
            Height: "height",
            Width: "width"
        }, function(a, c) {
            t.each({
                padding: "inner" + a,
                content: c,
                "": "outer" + a
            }, function(d, e) {
                t.fn[e] = function(e, f) {
                    var g = arguments.length && (d || typeof e != "boolean"),
                        h = d || (e === !0 || f === !0 ? "margin" : "border");
                    return t.access(this, function(c, d, e) {
                        var f;
                        return t.isWindow(c) ? c.document.documentElement["client" + a] : c.nodeType === 9 ? (f = c.documentElement, Math.max(c.body["scroll" + a], f["scroll" + a], c.body["offset" + a], f["offset" + a], f["client" + a])) : e === b ? t.css(c, d, h) : t.style(c, d, e, h)
                    }, c, g ? e : b, g, null)
                }
            })
        }), a.jQuery = a.$ = t, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function() {
            return t
        })
    })(window),
    function() {
        var a = this,
            b = a._,
            c = {},
            d = Array.prototype,
            e = Object.prototype,
            f = Function.prototype,
            g = d.slice,
            h = d.unshift,
            i = e.toString,
            j = e.hasOwnProperty,
            k = d.forEach,
            l = d.map,
            m = d.reduce,
            n = d.reduceRight,
            o = d.filter,
            p = d.every,
            q = d.some,
            r = d.indexOf,
            s = d.lastIndexOf,
            t = Array.isArray,
            u = Object.keys,
            v = f.bind,
            w = function(a) {
                return new B(a)
            };
        typeof module != "undefined" && module.exports ? (module.exports = w, w._ = w) : a._ = w, w.VERSION = "1.1.6";
        var x = w.each = w.forEach = function(a, b, d) {
            if (a == null) return;
            if (k && a.forEach === k) a.forEach(b, d);
            else if (w.isNumber(a.length)) {
                for (var e = 0, f = a.length; e < f; e++)
                    if (b.call(d, a[e], e, a) === c) return
            } else
                for (var g in a)
                    if (j.call(a, g) && b.call(d, a[g], g, a) === c) return
        };
        w.map = function(a, b, c) {
            var d = [];
            return a == null ? d : l && a.map === l ? a.map(b, c) : (x(a, function(a, e, f) {
                d[d.length] = b.call(c, a, e, f)
            }), d)
        }, w.reduce = w.foldl = w.inject = function(a, b, c, d) {
            var e = c !== void 0;
            a == null && (a = []);
            if (m && a.reduce === m) return d && (b = w.bind(b, d)), e ? a.reduce(b, c) : a.reduce(b);
            x(a, function(a, f, g) {
                !e && f === 0 ? (c = a, e = !0) : c = b.call(d, c, a, f, g)
            });
            if (!e) throw new TypeError("Reduce of empty array with no initial value");
            return c
        }, w.reduceRight = w.foldr = function(a, b, c, d) {
            a == null && (a = []);
            if (n && a.reduceRight === n) return d && (b = w.bind(b, d)), c !== void 0 ? a.reduceRight(b, c) : a.reduceRight(b);
            var e = (w.isArray(a) ? a.slice() : w.toArray(a)).reverse();
            return w.reduce(e, b, c, d)
        }, w.find = w.detect = function(a, b, c) {
            var d;
            return y(a, function(a, e, f) {
                if (b.call(c, a, e, f)) return d = a, !0
            }), d
        }, w.filter = w.select = function(a, b, c) {
            var d = [];
            return a == null ? d : o && a.filter === o ? a.filter(b, c) : (x(a, function(a, e, f) {
                b.call(c, a, e, f) && (d[d.length] = a)
            }), d)
        }, w.reject = function(a, b, c) {
            var d = [];
            return a == null ? d : (x(a, function(a, e, f) {
                b.call(c, a, e, f) || (d[d.length] = a)
            }), d)
        }, w.every = w.all = function(a, b, d) {
            var e = !0;
            return a == null ? e : p && a.every === p ? a.every(b, d) : (x(a, function(a, f, g) {
                if (!(e = e && b.call(d, a, f, g))) return c
            }), e)
        };
        var y = w.some = w.any = function(a, b, d) {
            b || (b = w.identity);
            var e = !1;
            return a == null ? e : q && a.some === q ? a.some(b, d) : (x(a, function(a, f, g) {
                if (e = b.call(d, a, f, g)) return c
            }), e)
        };
        w.include = w.contains = function(a, b) {
            var c = !1;
            return a == null ? c : r && a.indexOf === r ? a.indexOf(b) != -1 : (y(a, function(a) {
                if (c = a === b) return !0
            }), c)
        }, w.invoke = function(a, b) {
            var c = g.call(arguments, 2);
            return w.map(a, function(a) {
                return (b.call ? b || a : a[b]).apply(a, c)
            })
        }, w.pluck = function(a, b) {
            return w.map(a, function(a) {
                return a[b]
            })
        }, w.max = function(a, b, c) {
            if (!b && w.isArray(a)) return Math.max.apply(Math, a);
            var d = {
                computed: -Infinity
            };
            return x(a, function(a, e, f) {
                var g = b ? b.call(c, a, e, f) : a;
                g >= d.computed && (d = {
                    value: a,
                    computed: g
                })
            }), d.value
        }, w.min = function(a, b, c) {
            if (!b && w.isArray(a)) return Math.min.apply(Math, a);
            var d = {
                computed: Infinity
            };
            return x(a, function(a, e, f) {
                var g = b ? b.call(c, a, e, f) : a;
                g < d.computed && (d = {
                    value: a,
                    computed: g
                })
            }), d.value
        }, w.sortBy = function(a, b, c) {
            return w.pluck(w.map(a, function(a, d, e) {
                return {
                    value: a,
                    criteria: b.call(c, a, d, e)
                }
            }).sort(function(a, b) {
                var c = a.criteria,
                    d = b.criteria;
                return c < d ? -1 : c > d ? 1 : 0
            }), "value")
        }, w.sortedIndex = function(a, b, c) {
            c || (c = w.identity);
            var d = 0,
                e = a.length;
            while (d < e) {
                var f = d + e >> 1;
                c(a[f]) < c(b) ? d = f + 1 : e = f
            }
            return d
        }, w.toArray = function(a) {
            return a ? a.toArray ? a.toArray() : w.isArray(a) ? a : w.isArguments(a) ? g.call(a) : w.values(a) : []
        }, w.size = function(a) {
            return w.toArray(a).length
        }, w.first = w.head = function(a, b, c) {
            return b != null && !c ? g.call(a, 0, b) : a[0]
        }, w.rest = w.tail = function(a, b, c) {
            return g.call(a, b == null || c ? 1 : b)
        }, w.last = function(a) {
            return a[a.length - 1]
        }, w.compact = function(a) {
            return w.filter(a, function(a) {
                return !!a
            })
        }, w.flatten = function(a) {
            return w.reduce(a, function(a, b) {
                return w.isArray(b) ? a.concat(w.flatten(b)) : (a[a.length] = b, a)
            }, [])
        }, w.without = function(a) {
            var b = g.call(arguments, 1);
            return w.filter(a, function(a) {
                return !w.include(b, a)
            })
        }, w.uniq = w.unique = function(a, b) {
            return w.reduce(a, function(a, c, d) {
                if (0 == d || (b === !0 ? w.last(a) != c : !w.include(a, c))) a[a.length] = c;
                return a
            }, [])
        }, w.intersect = function(a) {
            var b = g.call(arguments, 1);
            return w.filter(w.uniq(a), function(a) {
                return w.every(b, function(b) {
                    return w.indexOf(b, a) >= 0
                })
            })
        }, w.zip = function() {
            var a = g.call(arguments),
                b = w.max(w.pluck(a, "length")),
                c = new Array(b);
            for (var d = 0; d < b; d++) c[d] = w.pluck(a, "" + d);
            return c
        }, w.indexOf = function(a, b, c) {
            if (a == null) return -1;
            var d, e;
            if (c) return d = w.sortedIndex(a, b), a[d] === b ? d : -1;
            if (r && a.indexOf === r) return a.indexOf(b);
            for (d = 0, e = a.length; d < e; d++)
                if (a[d] === b) return d;
            return -1
        }, w.lastIndexOf = function(a, b) {
            if (a == null) return -1;
            if (s && a.lastIndexOf === s) return a.lastIndexOf(b);
            var c = a.length;
            while (c--)
                if (a[c] === b) return c;
            return -1
        }, w.range = function(a, b, c) {
            arguments.length <= 1 && (b = a || 0, a = 0), c = arguments[2] || 1;
            var d = Math.max(Math.ceil((b - a) / c), 0),
                e = 0,
                f = new Array(d);
            while (e < d) f[e++] = a, a += c;
            return f
        }, w.bind = function(a, b) {
            if (a.bind === v && v) return v.apply(a, g.call(arguments, 1));
            var c = g.call(arguments, 2);
            return function() {
                return a.apply(b, c.concat(g.call(arguments)))
            }
        }, w.bindAll = function(a) {
            var b = g.call(arguments, 1);
            return b.length == 0 && (b = w.functions(a)), x(b, function(b) {
                a[b] = w.bind(a[b], a)
            }), a
        }, w.memoize = function(a, b) {
            var c = {};
            return b || (b = w.identity),
                function() {
                    var d = b.apply(this, arguments);
                    return j.call(c, d) ? c[d] : c[d] = a.apply(this, arguments)
                }
        }, w.delay = function(a, b) {
            var c = g.call(arguments, 2);
            return setTimeout(function() {
                return a.apply(a, c)
            }, b)
        }, w.defer = function(a) {
            return w.delay.apply(w, [a, 1].concat(g.call(arguments, 1)))
        };
        var z = function(a, b, c) {
            var d;
            return function() {
                var e = this,
                    f = arguments,
                    g = function() {
                        d = null, a.apply(e, f)
                    };
                c && clearTimeout(d);
                if (c || !d) d = setTimeout(g, b)
            }
        };
        w.throttle = function(a, b) {
            return z(a, b, !1)
        }, w.debounce = function(a, b) {
            return z(a, b, !0)
        }, w.once = function(a) {
            var b = !1,
                c;
            return function() {
                return b ? c : (b = !0, c = a.apply(this, arguments))
            }
        }, w.wrap = function(a, b) {
            return function() {
                var c = [a].concat(g.call(arguments));
                return b.apply(this, c)
            }
        }, w.compose = function() {
            var a = g.call(arguments);
            return function() {
                var b = g.call(arguments);
                for (var c = a.length - 1; c >= 0; c--) b = [a[c].apply(this, b)];
                return b[0]
            }
        }, w.after = function(a, b) {
            return function() {
                if (--a < 1) return b.apply(this, arguments)
            }
        }, w.keys = u || function(a) {
            if (a !== Object(a)) throw new TypeError("Invalid object");
            var b = [];
            for (var c in a) j.call(a, c) && (b[b.length] = c);
            return b
        }, w.values = function(a) {
            return w.map(a, w.identity)
        }, w.functions = w.methods = function(a) {
            return w.filter(w.keys(a), function(b) {
                return w.isFunction(a[b])
            }).sort()
        }, w.extend = function(a) {
            return x(g.call(arguments, 1), function(b) {
                for (var c in b) b[c] !== void 0 && (a[c] = b[c])
            }), a
        }, w.defaults = function(a) {
            return x(g.call(arguments, 1), function(b) {
                for (var c in b) a[c] == null && (a[c] = b[c])
            }), a
        }, w.clone = function(a) {
            return w.isArray(a) ? a.slice() : w.extend({}, a)
        }, w.tap = function(a, b) {
            return b(a), a
        }, w.isEqual = function(a, b) {
            if (a === b) return !0;
            var c = typeof a,
                d = typeof b;
            if (c != d) return !1;
            if (a == b) return !0;
            if (!a && b || a && !b) return !1;
            a._chain && (a = a._wrapped), b._chain && (b = b._wrapped);
            if (a.isEqual) return a.isEqual(b);
            if (w.isDate(a) && w.isDate(b)) return a.getTime() === b.getTime();
            if (w.isNaN(a) && w.isNaN(b)) return !1;
            if (w.isRegExp(a) && w.isRegExp(b)) return a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline;
            if (c !== "object") return !1;
            if (a.length && a.length !== b.length) return !1;
            var e = w.keys(a),
                f = w.keys(b);
            if (e.length != f.length) return !1;
            for (var g in a)
                if (!(g in b) || !w.isEqual(a[g], b[g])) return !1;
            return !0
        }, w.isEmpty = function(a) {
            if (w.isArray(a) || w.isString(a)) return a.length === 0;
            for (var b in a)
                if (j.call(a, b)) return !1;
            return !0
        }, w.isElement = function(a) {
            return !!a && a.nodeType == 1
        }, w.isArray = t || function(a) {
            return i.call(a) === "[object Array]"
        }, w.isArguments = function(a) {
            return !!a && !!j.call(a, "callee")
        }, w.isFunction = function(a) {
            return !!(a && a.constructor && a.call && a.apply)
        }, w.isString = function(a) {
            return !!(a === "" || a && a.charCodeAt && a.substr)
        }, w.isNumber = function(a) {
            return !!(a === 0 || a && a.toExponential && a.toFixed)
        }, w.isNaN = function(a) {
            return a !== a
        }, w.isBoolean = function(a) {
            return a === !0 || a === !1
        }, w.isDate = function(a) {
            return !!(a && a.getTimezoneOffset && a.setUTCFullYear)
        }, w.isRegExp = function(a) {
            return !(!(a && a.test && a.exec) || !a.ignoreCase && a.ignoreCase !== !1)
        }, w.isNull = function(a) {
            return a === null
        }, w.isUndefined = function(a) {
            return a === void 0
        }, w.noConflict = function() {
            return a._ = b, this
        }, w.identity = function(a) {
            return a
        }, w.times = function(a, b, c) {
            for (var d = 0; d < a; d++) b.call(c, d)
        }, w.mixin = function(a) {
            x(w.functions(a), function(b) {
                D(b, w[b] = a[b])
            })
        };
        var A = 0;
        w.uniqueId = function(a) {
            var b = A++;
            return a ? a + b : b
        }, w.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g
        }, w.template = function(a, b) {
            var c = w.templateSettings,
                d = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + a.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(c.interpolate, function(a, b) {
                    return "'," + b.replace(/\\'/g, "'") + ",'"
                }).replace(c.evaluate || null, function(a, b) {
                    return "');" + b.replace(/\\'/g, "'").replace(/[\r\n\t]/g, " ") + "__p.push('"
                }).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');",
                e = new Function("obj", d);
            return b ? e(b) : e
        };
        var B = function(a) {
            this._wrapped = a
        };
        w.prototype = B.prototype;
        var C = function(a, b) {
                return b ? w(a).chain() : a
            },
            D = function(a, b) {
                B.prototype[a] = function() {
                    var a = g.call(arguments);
                    return h.call(a, this._wrapped), C(b.apply(w, a), this._chain)
                }
            };
        w.mixin(w), x(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(a) {
            var b = d[a];
            B.prototype[a] = function() {
                return b.apply(this._wrapped, arguments), C(this._wrapped, this._chain)
            }
        }), x(["concat", "join", "slice"], function(a) {
            var b = d[a];
            B.prototype[a] = function() {
                return C(b.apply(this._wrapped, arguments), this._chain)
            }
        }), B.prototype.chain = function() {
            return this._chain = !0, this
        }, B.prototype.value = function() {
            return this._wrapped
        }
    }(),
    function() {
        var a = this,
            b = a.Backbone,
            c;
        typeof exports != "undefined" ? c = exports : c = a.Backbone = {}, c.VERSION = "0.5.3";
        var d = a._;
        !d && typeof require != "undefined" && (d = require("underscore")._);
        var e = a.jQuery || a.Zepto || a.ender;
        c.noConflict = function() {
            return a.Backbone = b, this
        }, c.emulateHTTP = !1, c.emulateJSON = !1, c.Events = {
            bind: function(a, b, c) {
                var d = this._callbacks || (this._callbacks = {}),
                    e = d[a] || (d[a] = []);
                return e.push([b, c]), this
            },
            unbind: function(a, b) {
                var c;
                if (!a) this._callbacks = {};
                else if (c = this._callbacks)
                    if (!b) c[a] = [];
                    else {
                        var d = c[a];
                        if (!d) return this;
                        for (var e = 0, f = d.length; e < f; e++)
                            if (d[e] && b === d[e][0]) {
                                d[e] = null;
                                break
                            }
                    }
                return this
            },
            trigger: function(a) {
                var b, c, d, e, f, g = 2;
                if (!(c = this._callbacks)) return this;
                while (g--) {
                    d = g ? a : "all";
                    if (b = c[d])
                        for (var h = 0, i = b.length; h < i; h++)(e = b[h]) ? (f = g ? Array.prototype.slice.call(arguments, 1) : arguments, e[0].apply(e[1] || this, f)) : (b.splice(h, 1), h--, i--)
                }
                return this
            }
        }, c.Model = function(a, b) {
            var c;
            a || (a = {});
            if (c = this.defaults) d.isFunction(c) && (c = c.call(this)), a = d.extend({}, c, a);
            this.attributes = {}, this._escapedAttributes = {}, this.cid = d.uniqueId("c"), this.set(a, {
                silent: !0
            }), this._changed = !1, this._previousAttributes = d.clone(this.attributes), b && b.collection && (this.collection = b.collection), this.initialize(a, b)
        }, d.extend(c.Model.prototype, c.Events, {
            _previousAttributes: null,
            _changed: !1,
            idAttribute: "id",
            initialize: function() {},
            toJSON: function() {
                return d.clone(this.attributes)
            },
            get: function(a) {
                return this.attributes[a]
            },
            escape: function(a) {
                var b;
                if (b = this._escapedAttributes[a]) return b;
                var c = this.attributes[a];
                return this._escapedAttributes[a] = w(c == null ? "" : "" + c)
            },
            has: function(a) {
                return this.attributes[a] != null
            },
            set: function(a, b) {
                b || (b = {});
                if (!a) return this;
                a.attributes && (a = a.attributes);
                var c = this.attributes,
                    e = this._escapedAttributes;
                if (!b.silent && this.validate && !this._performValidation(a, b)) return !1;
                this.idAttribute in a && (this.id = a[this.idAttribute]);
                var f = this._changing;
                this._changing = !0;
                for (var g in a) {
                    var h = a[g];
                    d.isEqual(c[g], h) || (c[g] = h, delete e[g], this._changed = !0, b.silent || this.trigger("change:" + g, this, h, b))
                }
                return !f && !b.silent && this._changed && this.change(b), this._changing = !1, this
            },
            unset: function(a, b) {
                if (a in this.attributes) {
                    b || (b = {});
                    var c = this.attributes[a],
                        d = {};
                    return d[a] = void 0, !b.silent && this.validate && !this._performValidation(d, b) ? !1 : (delete this.attributes[a], delete this._escapedAttributes[a], a == this.idAttribute && delete this.id, this._changed = !0, b.silent || (this.trigger("change:" + a, this, void 0, b), this.change(b)), this)
                }
                return this
            },
            clear: function(a) {
                a || (a = {});
                var b, c = this.attributes,
                    d = {};
                for (b in c) d[b] = void 0;
                if (!a.silent && this.validate && !this._performValidation(d, a)) return !1;
                this.attributes = {}, this._escapedAttributes = {}, this._changed = !0;
                if (!a.silent) {
                    for (b in c) this.trigger("change:" + b, this, void 0, a);
                    this.change(a)
                }
                return this
            },
            fetch: function(a) {
                a || (a = {});
                var b = this,
                    d = a.success;
                return a.success = function(c, e, f) {
                    if (!b.set(b.parse(c, f), a)) return !1;
                    d && d(b, c)
                }, a.error = v(a.error, b, a), (this.sync || c.sync).call(this, "read", this, a)
            },
            save: function(a, b) {
                b || (b = {});
                if (a && !this.set(a, b)) return !1;
                var d = this,
                    e = b.success;
                b.success = function(a, c, f) {
                    if (!d.set(d.parse(a, f), b)) return !1;
                    e && e(d, a, f)
                }, b.error = v(b.error, d, b);
                var f = this.isNew() ? "create" : "update";
                return (this.sync || c.sync).call(this, f, this, b)
            },
            destroy: function(a) {
                a || (a = {});
                if (this.isNew()) return this.trigger("destroy", this, this.collection, a);
                var b = this,
                    d = a.success;
                return a.success = function(c) {
                    b.trigger("destroy", b, b.collection, a), d && d(b, c)
                }, a.error = v(a.error, b, a), (this.sync || c.sync).call(this, "delete", this, a)
            },
            url: function() {
                var a = t(this.collection) || this.urlRoot || u();
                return this.isNew() ? a : a + (a.charAt(a.length - 1) == "/" ? "" : "/") + encodeURIComponent(this.id)
            },
            parse: function(a, b) {
                return a
            },
            clone: function() {
                return new this.constructor(this)
            },
            isNew: function() {
                return this.id == null
            },
            change: function(a) {
                this.trigger("change", this, a), this._previousAttributes = d.clone(this.attributes), this._changed = !1
            },
            hasChanged: function(a) {
                return a ? this._previousAttributes[a] != this.attributes[a] : this._changed
            },
            changedAttributes: function(a) {
                a || (a = this.attributes);
                var b = this._previousAttributes,
                    c = !1;
                for (var e in a) d.isEqual(b[e], a[e]) || (c = c || {}, c[e] = a[e]);
                return c
            },
            previous: function(a) {
                return !a || !this._previousAttributes ? null : this._previousAttributes[a]
            },
            previousAttributes: function() {
                return d.clone(this._previousAttributes)
            },
            _performValidation: function(a, b) {
                var c = this.validate(a);
                return c ? (b.error ? b.error(this, c, b) : this.trigger("error", this, c, b), !1) : !0
            }
        }), c.Collection = function(a, b) {
            b || (b = {}), b.comparator && (this.comparator = b.comparator), d.bindAll(this, "_onModelEvent", "_removeReference"), this._reset(), a && this.reset(a, {
                silent: !0
            }), this.initialize.apply(this, arguments)
        }, d.extend(c.Collection.prototype, c.Events, {
            model: c.Model,
            initialize: function() {},
            toJSON: function() {
                return this.map(function(a) {
                    return a.toJSON()
                })
            },
            add: function(a, b) {
                if (d.isArray(a))
                    for (var c = 0, e = a.length; c < e; c++) this._add(a[c], b);
                else this._add(a, b);
                return this
            },
            remove: function(a, b) {
                if (d.isArray(a))
                    for (var c = 0, e = a.length; c < e; c++) this._remove(a[c], b);
                else this._remove(a, b);
                return this
            },
            get: function(a) {
                return a == null ? null : this._byId[a.id != null ? a.id : a]
            },
            getByCid: function(a) {
                return a && this._byCid[a.cid || a]
            },
            at: function(a) {
                return this.models[a]
            },
            sort: function(a) {
                a || (a = {});
                if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
                return this.models = this.sortBy(this.comparator), a.silent || this.trigger("reset", this, a), this
            },
            pluck: function(a) {
                return d.map(this.models, function(b) {
                    return b.get(a)
                })
            },
            reset: function(a, b) {
                return a || (a = []), b || (b = {}), this.each(this._removeReference), this._reset(), this.add(a, {
                    silent: !0
                }), b.silent || this.trigger("reset", this, b), this
            },
            fetch: function(a) {
                a || (a = {});
                var b = this,
                    d = a.success;
                return a.success = function(c, e, f) {
                    b[a.add ? "add" : "reset"](b.parse(c, f), a), d && d(b, c)
                }, a.error = v(a.error, b, a), (this.sync || c.sync).call(this, "read", this, a)
            },
            create: function(a, b) {
                var c = this;
                b || (b = {}), a = this._prepareModel(a, b);
                if (!a) return !1;
                var d = b.success;
                return b.success = function(a, e, f) {
                    c.add(a, b), d && d(a, e, f)
                }, a.save(null, b), a
            },
            parse: function(a, b) {
                return a
            },
            chain: function() {
                return d(this.models).chain()
            },
            _reset: function(a) {
                this.length = 0, this.models = [], this._byId = {}, this._byCid = {}
            },
            _prepareModel: function(a, b) {
                if (a instanceof c.Model) a.collection || (a.collection = this);
                else {
                    var d = a;
                    a = new this.model(d, {
                        collection: this
                    }), a.validate && !a._performValidation(d, b) && (a = !1)
                }
                return a
            },
            _add: function(a, b) {
                b || (b = {}), a = this._prepareModel(a, b);
                if (!a) return !1;
                var c = this.getByCid(a);
                if (c) throw new Error(["Can't add the same model to a set twice", c.id]);
                this._byId[a.id] = a, this._byCid[a.cid] = a;
                var d = b.at != null ? b.at : this.comparator ? this.sortedIndex(a, this.comparator) : this.length;
                return this.models.splice(d, 0, a), a.bind("all", this._onModelEvent), this.length++, b.silent || a.trigger("add", a, this, b), a
            },
            _remove: function(a, b) {
                return b || (b = {}), a = this.getByCid(a) || this.get(a), a ? (delete this._byId[a.id], delete this._byCid[a.cid], this.models.splice(this.indexOf(a), 1), this.length--, b.silent || a.trigger("remove", a, this, b), this._removeReference(a), a) : null
            },
            _removeReference: function(a) {
                this == a.collection && delete a.collection, a.unbind("all", this._onModelEvent)
            },
            _onModelEvent: function(a, b, c, d) {
                if (a != "add" && a != "remove" || c == this) a == "destroy" && this._remove(b, d), b && a === "change:" + b.idAttribute && (delete this._byId[b.previous(b.idAttribute)], this._byId[b.id] = b), this.trigger.apply(this, arguments);
                else return
            }
        });
        var f = ["forEach", "each", "map", "reduce", "reduceRight", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "sortBy", "sortedIndex", "toArray", "size", "first", "rest", "last", "without", "indexOf", "lastIndexOf", "isEmpty", "groupBy"];
        d.each(f, function(a) {
            c.Collection.prototype[a] = function() {
                return d[a].apply(d, [this.models].concat(d.toArray(arguments)))
            }
        }), c.Router = function(a) {
            a || (a = {}), a.routes && (this.routes = a.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
        };
        var g = /:([\w\d]+)/g,
            h = /\*([\w\d]+)/g,
            i = /[-[\]{}()+?.,\\^$|#\s]/g;
        d.extend(c.Router.prototype, c.Events, {
            initialize: function() {},
            route: function(a, b, e) {
                c.history || (c.history = new c.History), d.isRegExp(a) || (a = this._routeToRegExp(a)), c.history.route(a, d.bind(function(c) {
                    var d = this._extractParameters(a, c);
                    e.apply(this, d), this.trigger.apply(this, ["route:" + b].concat(d))
                }, this))
            },
            navigate: function(a, b) {
                c.history.navigate(a, b)
            },
            _bindRoutes: function() {
                if (!this.routes) return;
                var a = [];
                for (var b in this.routes) a.unshift([b, this.routes[b]]);
                for (var c = 0, d = a.length; c < d; c++) this.route(a[c][0], a[c][1], this[a[c][1]])
            },
            _routeToRegExp: function(a) {
                return a = a.replace(i, "\\$&").replace(g, "([^/]*)").replace(h, "(.*?)"), new RegExp("^" + a + "$")
            },
            _extractParameters: function(a, b) {
                return a.exec(b).slice(1)
            }
        }), c.History = function() {
            this.handlers = [], d.bindAll(this, "checkUrl")
        };
        var j = /^#*/,
            k = /msie [\w.]+/,
            l = !1;
        d.extend(c.History.prototype, {
            interval: 50,
            getFragment: function(a, b) {
                if (a == null)
                    if (this._hasPushState || b) {
                        a = window.location.pathname;
                        var c = window.location.search;
                        c && (a += c), a.indexOf(this.options.root) == 0 && (a = a.substr(this.options.root.length))
                    } else a = window.location.hash;
                return decodeURIComponent(a.replace(j, ""))
            },
            start: function(a) {
                if (l) throw new Error("Backbone.history has already been started");
                this.options = d.extend({}, {
                    root: "/"
                }, this.options, a), this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && window.history && window.history.pushState);
                var b = this.getFragment(),
                    c = document.documentMode,
                    f = k.exec(navigator.userAgent.toLowerCase()) && (!c || c <= 7);
                f && (this.iframe = e('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(b)), this._hasPushState ? e(window).bind("popstate", this.checkUrl) : "onhashchange" in window && !f ? e(window).bind("hashchange", this.checkUrl) : setInterval(this.checkUrl, this.interval), this.fragment = b, l = !0;
                var g = window.location,
                    h = g.pathname == this.options.root;
                if (this._wantsPushState && !this._hasPushState && !h) return this.fragment = this.getFragment(null, !0), window.location.replace(this.options.root + "#" + this.fragment), !0;
                this._wantsPushState && this._hasPushState && h && g.hash && (this.fragment = g.hash.replace(j, ""), window.history.replaceState({}, document.title, g.protocol + "//" + g.host + this.options.root + this.fragment));
                if (!this.options.silent) return this.loadUrl()
            },
            route: function(a, b) {
                this.handlers.unshift({
                    route: a,
                    callback: b
                })
            },
            checkUrl: function(a) {
                var b = this.getFragment();
                b == this.fragment && this.iframe && (b = this.getFragment(this.iframe.location.hash));
                if (b == this.fragment || b == decodeURIComponent(this.fragment)) return !1;
                this.iframe && this.navigate(b), this.loadUrl() || this.loadUrl(window.location.hash)
            },
            loadUrl: function(a) {
                var b = this.fragment = this.getFragment(a),
                    c = d.any(this.handlers, function(a) {
                        if (a.route.test(b)) return a.callback(b), !0
                    });
                return c
            },
            navigate: function(a, b) {
                var c = (a || "").replace(j, "");
                if (this.fragment == c || this.fragment == decodeURIComponent(c)) return;
                if (this._hasPushState) {
                    var d = window.location;
                    c.indexOf(this.options.root) != 0 && (c = this.options.root + c), this.fragment = c, window.history.pushState({}, document.title, d.protocol + "//" + d.host + c)
                } else window.location.hash = this.fragment = c, this.iframe && c != this.getFragment(this.iframe.location.hash) && (this.iframe.document.open().close(), this.iframe.location.hash = c);
                b && this.loadUrl(a)
            }
        }), c.View = function(a) {
            this.cid = d.uniqueId("view"), this._configure(a || {}), this._ensureElement(), this.delegateEvents(), this.initialize.apply(this, arguments)
        };
        var m = function(a) {
                return e(a, this.el)
            },
            n = /^(\S+)\s*(.*)$/,
            o = ["model", "collection", "el", "id", "attributes", "className", "tagName"];
        d.extend(c.View.prototype, c.Events, {
            tagName: "div",
            $: m,
            initialize: function() {},
            render: function() {
                return this
            },
            remove: function() {
                return e(this.el).remove(), this
            },
            make: function(a, b, c) {
                var d = document.createElement(a);
                return b && e(d).attr(b), c && e(d).html(c), d
            },
            delegateEvents: function(a) {
                if (!a && !(a = this.events)) return;
                d.isFunction(a) && (a = a.call(this)), e(this.el).unbind(".delegateEvents" + this.cid);
                for (var b in a) {
                    var c = this[a[b]];
                    if (!c) throw new Error('Event "' + a[b] + '" does not exist');
                    var f = b.match(n),
                        g = f[1],
                        h = f[2];
                    c = d.bind(c, this), g += ".delegateEvents" + this.cid, h === "" ? e(this.el).bind(g, c) : e(this.el).delegate(h, g, c)
                }
            },
            _configure: function(a) {
                this.options && (a = d.extend({}, this.options, a));
                for (var b = 0, c = o.length; b < c; b++) {
                    var e = o[b];
                    a[e] && (this[e] = a[e])
                }
                this.options = a
            },
            _ensureElement: function() {
                if (!this.el) {
                    var a = this.attributes || {};
                    this.id && (a.id = this.id), this.className && (a["class"] = this.className), this.el = this.make(this.tagName, a)
                } else d.isString(this.el) && (this.el = e(this.el).get(0))
            }
        });
        var p = function(a, b) {
            var c = s(this, a, b);
            return c.extend = this.extend, c
        };
        c.Model.extend = c.Collection.extend = c.Router.extend = c.View.extend = p;
        var q = {
            create: "POST",
            update: "PUT",
            "delete": "DELETE",
            read: "GET"
        };
        c.sync = function(a, b, f) {
            var g = q[a],
                h = d.extend({
                    type: g,
                    dataType: "json"
                }, f);
            return h.url || (h.url = t(b) || u()), !h.data && b && (a == "create" || a == "update") && (h.contentType = "application/json", h.data = JSON.stringify(b.toJSON())), c.emulateJSON && (h.contentType = "application/x-www-form-urlencoded", h.data = h.data ? {
                model: h.data
            } : {}), c.emulateHTTP && (g === "PUT" || g === "DELETE") && (c.emulateJSON && (h.data._method = g), h.type = "POST", h.beforeSend = function(a) {
                a.setRequestHeader("X-HTTP-Method-Override", g)
            }), h.type !== "GET" && !c.emulateJSON && (h.processData = !1), e.ajax(h)
        };
        var r = function() {},
            s = function(a, b, c) {
                var e;
                return b && b.hasOwnProperty("constructor") ? e = b.constructor : e = function() {
                    return a.apply(this, arguments)
                }, d.extend(e, a), r.prototype = a.prototype, e.prototype = new r, b && d.extend(e.prototype, b), c && d.extend(e, c), e.prototype.constructor = e, e.__super__ = a.prototype, e
            },
            t = function(a) {
                return !a || !a.url ? null : d.isFunction(a.url) ? a.url() : a.url
            },
            u = function() {
                throw new Error('A "url" property or function must be specified')
            },
            v = function(a, b, c) {
                return function(d) {
                    a ? a(b, d, c) : b.trigger("error", b, d, c)
                }
            },
            w = function(a) {
                return a.replace(/&(?!\w+;|#\d+;|#x[\da-f]+;)/gi, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
            }
    }.call(this), Backbone.sync = function(a, b, c) {
        var d;
        switch (a) {
            case "read":
                d = view_engine_data;
                break;
            case "create":
                d = store.create(b);
                break;
            case "update":
                d = store.update(b);
                break;
            case "delete":
                d = store.destroy(b)
        }
        d ? c.success(d) : c.error("Record not found")
    },
    function(a) {
        window.requestAnimFrame = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a, b) {
                window.setTimeout(a, 1e3 / 60)
            }
        }(), window.Floor = Backbone.Model.extend({
            number: null,
            view_file_name: null,
            view_name: null,
            num_units: 7,
            north_offset: null,
            has_markers: null,
            plate_north: 1,
            next: function() {
                return this.collection.at(this.collection.indexOf(this) + 1)
            },
            prev: function() {
                return this.collection.at(this.collection.indexOf(this) - 1)
            },
            hasInfo: function() {
                return this.has("number") ? !0 : !1
            },
            show: function() {
                this.trigger("show"), App.navigate("floor/" + this.get("id"), !0)
            }
        }), window.Plan = Backbone.Model.extend({
            name: null,
            description: null,
            area: null,
            plan_large: null,
            plan_small: null
        }), window.PlanFloor = Backbone.Model.extend({
            unit_type_id: null,
            floor_id: null
        }), window.Unit = Backbone.Model.extend({
            number: null,
            floor_id: null,
            plan_id: null,
            plan: function() {
                return PlansList.collection.get(this.get("plan_id"))
            }
        }), window.Marker = Backbone.Model.extend({
            initialize: function() {
                var a = this;
                this.coordinates = new MarkerCoordinates, this.coordinates.parse = function(b) {
                    var c = a.get("id");
                    return _.select(b.marker_coordinates, function(a) {
                        return c == a.marker_id
                    })
                }, this.coordinates.fetch()
            },
            title: null,
            description: null,
            photo: null,
            walk_time: null,
            drive_time: null,
            showInfo: function() {
                MarkerInfo.setModel(this)
            }
        }), window.MarkerCoordinate = Backbone.Model.extend({
            marker_id: null,
            floor_id: null,
            x: null,
            y: null
        }), window.Floors = Backbone.Collection.extend({
            model: Floor,
            parse: function(a) {
                return _.select(a.floors, function(a) {
                    return a.screen_saver != 1
                })
            }
        }), window.ScreenSaver = Backbone.Collection.extend({
            model: Floor,
            parse: function(a) {
                return _.select(a.floors, function(a) {
                    return a.screen_saver == 1
                })
            },
            initialize: function() {
                this.fetch()
            }
        }), window.FloorsForPlan = Backbone.Collection.extend({
            model: Floor,
            initialize: function() {
                this.plan = PlanDetail.model, this.unit = ViewEngine.unit
            },
            parse: function(a) {
                var b = this.plan.get("id"),
                    c = _.select(a.plan_floor, function(a) {
                        return a.plan_id == b
                    }),
                    d = _.map(c, function(a) {
                        return a.floor_id
                    });
                return _.select(a.floors, function(a) {
                    return _.include(d, a.id)
                })
            }
        }), window.Plans = Backbone.Collection.extend({
            model: Plan,
            parse: function(a) {
                return a.plans
            },
            show: function() {
                App.navigate("plans", !0)
            }
        }), window.UnitsCollection = Backbone.Collection.extend({
            model: Unit,
            parse: function(a) {
                return a.units
            },
            initialize: function() {
                this.fetch()
            }
        }), window.UnitsForFloor = Backbone.Collection.extend({
            model: Unit,
            initialize: function(a, b) {
                this.floor = b.model
            },
            parse: function(a) {
                var b = this.floor.get("id");
                return _.select(a.units, function(a) {
                    return a.floor_id == b
                })
            }
        }), window.Markers = Backbone.Collection.extend({
            model: Marker,
            parse: function(a) {
                return a.markers
            },
            initialize: function() {
                this.fetch()
            }
        }), window.MarkerCoordinates = Backbone.Collection.extend({
            model: MarkerCoordinate,
            forFloor: function(a) {
                return _.select(this.models, function(b) {
                    return b.get("floor_id") == a
                })[0]
            }
        }), window.FloorListItem = Backbone.View.extend({
            tagName: "li",
            events: {
                click: "show"
            },
            initialize: function() {
                _.bindAll(this, "render", "show"), this.model.bind("show", this.setActive, this)
            },
            render: function() {
                var b = a("<span/>", {
                        "class": "number",
                        text: this.model.get("number")
                    }),
                    c = a("<span/>", {
                        "class": "label",
                        text: this.model.get("suffix") + " Floor"
                    });
                return a(this.el).append(b), a(this.el).append(c), this
            },
            show: function() {
                if (this.options.target_plan) {
                    var b = this.options.target_plan;
                    ViewEngine.afterLoad = function() {
                        ViewEngine.goToUnit(b)
                    }
                }
                this.model.show(), a("#header").removeClass("small")
            },
            setActive: function() {
                a(this.el).addClass("active").siblings().removeClass("active")
            }
        }), window.FloorsPane = Backbone.View.extend({
            el: a("#select_floor"),
            events: {
                "click span.select_btn": "toggleOpen",
                "click span.close": "toggleOpen"
            },
            initialize: function() {
                var a = this;
                _.bindAll(this, "render", "appendItem", "toggleOpen"), this.collection = new Floors, this.collection.fetch({
                    success: function(b, c) {
                        a.render()
                    }
                }), this.collection.bind("add", this.appendItem)
            },
            render: function() {
                a(this.el).append('<span class="select_btn inactive">Select a Floor</span>'), a(this.el).append('<ul class="floor_nav"></ul>'), a(this.el).append('<span class="close">Close</span>'), _(this.collection.models).each(function(a) {
                    this.appendItem(a)
                }, this)
            },
            toggleOpen: function() {
                a(this.el).hasClass("open_panel") ? (a("#header").removeClass("small medium large"), a(this.el).removeClass("open_panel")) : (a("#header").removeClass("medium large").addClass("small"), a(this.el).addClass("open_panel")), a("#select_plan").removeClass("open_panel"), a("#select_plan .holder").hide()
            },
            appendItem: function(b) {
                var c = new FloorListItem({
                    model: b
                });
                a("ul.floor_nav", this.el).append(c.render().el)
            }
        }), window.PlansListItem = Backbone.View.extend({
            tagName: "li",
            template: _.template(a("#plan_list_item").html()),
            events: {
                show_plan: "show"
            },
            initialize: function() {
                _.bindAll(this, "render", "show")
            },
            render: function() {
                var b = this.model.get("group");
                if (!b || b == "") b = "typical";
                return a(this.el).addClass(b), b != "typical" && a(this.el).hide(), a(this.el).html(this.template(this.model.toJSON())), this
            },
            show: function() {
                App.navigate("plan/" + this.model.id, !0), a("#planlist").hide(), a("#plandetail").show()
            }
        }), window.PlansList = Backbone.View.extend({
            el: a("#select_plan"),
            events: {
                "click span.select_btn": "toggleOpen",
                "click span.close": "toggleOpen"
            },
            initialize: function() {
                var b = this;
                _.bindAll(this, "render", "appendItem", "toggleOpen", "scrollArrows"), this.collection = new Plans, this.collection.fetch({
                    success: function(a, b) {}
                }), a(this.el).removeClass("medium large").addClass("small"), a(".browse_toggle", this.el).empty(), a(".browse_toggle", this.el).append('<span rel="typical" class="browse_plan active"><span class="tower"></span>Tower</span>'), a(".browse_toggle", this.el).append('<span rel="penthouses" class="browse_plan"><span class="penthouse"></span>Penthouses</span>'), a("#planlist", this.el).html('<ul id="browse_plans" class="plan_list_95">'), _(this.collection.models).each(function(a) {
                    this.appendItem(a)
                }, this)
            },
            render: function() {},
            toggleOpen: function() {
                a(this.el).hasClass("open_panel") ? (a("#header").removeClass("small medium large"), a(this.el).removeClass("open_panel")) : (a("#header").removeClass("small large").addClass("medium"), a(this.el).removeClass("medium large").addClass("open_panel small")), a("#plandetail").hide(), a("#planlist").show(), a("#select_plan .holder").show(), a("#select_floor").removeClass("open_panel"), this.scrollArrows()
            },
            appendItem: function(b) {
                var c = new PlansListItem({
                    model: b
                });
                a("#browse_plans", this.el).append(c.render().el)
            },
            scrollArrows: function() {
                a(".holder > span").remove();
                var b = a("#planlist").width(),
                    c = a("#browse_plans").width();
                if (b < c) a(".holder").append('<span class="arrow-left">Left</span><span class="arrow-right">Right</span>');
                else return !1
            }
        }), window.PlanDetail = Backbone.View.extend({
            el: a("#select_plan"),
            events: {
                "click span.return_plans": "plans",
                "click span.return_floorplate": "floorplates"
            },
            template: _.template(a("#plan_detail_template").html()),
            initialize: function() {
                _.bindAll(this, "render", "plans", "floorplates", "scrollArrows")
            },
            render: function() {
                a("#header").removeClass("small medium").addClass("large"), a(this.el).addClass("open_panel"), a("#select_plan .holder").show(), a(this.el).removeClass("small medium").addClass("large"), a("#plandetail", this.el).html(this.template(this.model.toJSON())), _(this.floors.models).each(function(a) {
                    this.appendFloorItem(a)
                }, this)
            },
            setModel: function(a) {
                var b = this;
                this.model = a, this.floors = new FloorsForPlan, this.floors.fetch({
                    success: function() {
                        b.render()
                    }
                })
            },
            plans: function() {
                a("#header").removeClass("small large").addClass("medium"), a("#select_plan").removeClass("medium large").addClass("small"), a("#planlist").show(), a("#plandetail").hide(), this.scrollArrows(), window.location = "#focus"
            },
            floorplates: function() {
                this.model.collection.show()
            },
            appendFloorItem: function(b) {
                var c = new FloorListItem({
                    model: b,
                    target_plan: this.model
                });
                a("ul.see_view", this.el).append(c.render().el)
            },
            scrollArrows: function() {
                a(".holder > span").remove();
                var b = a("#planlist").width(),
                    c = a("#browse_plans").width();
                if (b < c) a(".holder").append('<span class="arrow-left">Left</span><span class="arrow-right">Right</span>');
                else return !1
            }
        }), window.MarkerInfo = Backbone.View.extend({
            el: a("#locations"),
            template: _.template(a("#marker_info_template").html()),
            events: {
                "click .close": "close"
            },
            initialize: function() {
                _.bindAll(this, "render", "setModel", "close")
            },
            render: function() {
                a(".open_panel").removeClass("open_panel"), a(this.el).addClass("open_panel"), a(this.el).html(this.template(this.model.toJSON()))
            },
            setModel: function(a) {
                this.model = a, this.render()
            },
            close: function() {
                a(this.el).removeClass("open_panel")
            }
        }), window.UnitInfo = Backbone.View.extend({
            el: a("#unit_info"),
            template: _.template(a("#unit_info_template").html()),
            events: {
                "click .show_plan": "show_plan"
            },
            initialize: function() {
                _.bindAll(this, "render", "show_plan")
            },
            render: function() {
                var b = this.model;
                b.attributes.plan = this.model.plan().toJSON(), a(this.el).html(this.template(b.toJSON()))
            },
            setModel: function(a) {
                this.model = a, this.render()
            },
            show_plan: function() {
                a("#select_plan").hasClass("open_panel") ? (a("#header").removeClass("small medium large"), a("#select_plan").removeClass("open_panel"), App.navigate("/")) : (App.navigate("plan/" + this.model.plan().id, !0), a("#planlist").hide(), a("#plandetail").show())
            }
        }), window.FloorInfo = Backbone.View.extend({
            el: a("#floor_info"),
            template: _.template(a("#floor_info_template").html()),
            events: {
                "click .show_floorplate": "show_floorplate",
                "click #toggle_markers": "toggleNearby"
            },
            initialize: function() {
                _.bindAll(this, "render", "show_floorplate", "setModel", "toggleNearby")
            },
            render: function() {
                a(this.el).html(this.template(this.model.toJSON())), this.setNearbyState(ViewEngine.show_markers)
            },
            setModel: function(a) {
                this.model = a, this.render()
            },
            show_floorplate: function() {
                App.navigate("floorplate/" + this.model.id, !0)
            },
            toggleNearby: function() {
                var a = ViewEngine.toggleMarkers();
                this.setNearbyState(a)
            },
            setNearbyState: function(b) {
                b == 1 ? a("#toggle_markers", this.el).addClass("on").text("On") : a("#toggle_markers", this.el).removeClass("on").text("Off")
            }
        }), window.ViewEngine = Backbone.View.extend({
            el: a("canvas#view_engine"),
            events: {
                mousedown: "onMouseDown",
                mouseup: "onMouseUp"
            },
            initialize: function() {
                _.bindAll(this, "animate", "animating", "render", "draw_hud", "render_unit_info", "setIdleTimer", "beginIdle", "loadFloor", "setFloor", "loadImage", "nextFloor", "prevFloor", "scaleToWindow", "scaledImageWidth", "clearCanvas", "onMouseDown", "onMouseUp", "onMouseMove", "onMoveEnd", "autoPan", "pan", "panTo", "panToDeg", "markerRelativeX", "drawMarkers", "drawMarker", "toggleMarkers"), this.timeout = 300, this.pan_speed = 2, this.auto_pan = !1, this.auto_pan_count = 0, this.mouse_down = !1, this.has_momentum = !1, this.fading = !1, this.panning = !1, this.show_markers = !1, this.newimagex = 0, this.imagex = 0, this.distancex = 0, this.minDistance = 25, this.inertia = 5, this.context = this.el[0].getContext("2d"), this.scaleToWindow(), this.hud_canvas = a("#hud canvas"), this.hud_canvas.width = 115, this.hud_canvas.height = 115, this.hud = this.hud_canvas[0].getContext("2d"), this.hud_radar = new Image, this.hud_radar.src = "assets/preview/images/gc3/current_view.png", this.marker = new Image, this.marker.src = "assets/preview/images/location_point2.png", this.UnitInfo = new UnitInfo, this.FloorInfo = new FloorInfo, this.screen_saver = new ScreenSaver, this.afterLoad = null
            },
            focusView: function() {
                a("#header").removeClass("small medium large"), a(".open_panel").removeClass("open_panel"), window.location = "#focus"
            },
            beginIdle: function() {
                $overlays.addClass("disabled"), a("#screen_saver").addClass("enabled"), this.auto_pan = !0, this.imagex = 0, this.setFloor(this.screen_saver.at(0))
            },
            endIdle: function() {
                $overlays.removeClass("disabled"), a("#screen_saver").removeClass("enabled"), this.auto_pan = !1, this.auto_pan_count = 0, this.setFloor()
            },
            setFloor: function(a) {
                var b = this;
                a || (console.log("loading default floor"), a = _.first(FloorsPane.collection.models));
                if (!a) {
                    var c = new Floors;
                    c.fetch({
                        success: function(d, e) {
                            a = c.get(id), b.loadFloor(a)
                        }
                    })
                } else b.loadFloor(a)
            },
            loadFloor: function(a) {
                var b = this;
                b.focusView(), b.model = a, b.model.hasInfo() && (b.units = new UnitsForFloor(null, {
                    model: b.model
                }), b.hud_plate = new Image, b.hud_plate.src = b.model.get("plate_small"), b.hud_plate_north = b.model.get("plate_north"), b.FloorInfo.setModel(b.model)), b.el.fadeOut(500, function() {
                    b.loadImage()
                })
            },
            loadImage: function() {
                var a = this;
                this.img = new Image, this.img.onload = function() {
                    a.el.fadeIn(1e3), a.scaled_image_width = a.scaledImageWidth(), a.img_scale = a.scaled_image_width / a.img.width, a.model.hasInfo() && (a.units.fetch({
                        success: function() {
                            a.render_unit_info()
                        }
                    }), a.num_units = a.model.get("num_units"), a.unit_width = a.scaled_image_width / a.num_units), a.auto_pan ? a.autoPan() : a.render(), typeof a.afterLoad == "function" && (a.afterLoad(), a.afterLoad = null)
                }, this.img.src = this.model.get("view_file_name")
            },
            beginAnimating: function() {
                this.animate()
            },
            animate: function() {
                this.animating() && (requestAnimFrame(this.animate), this.panning && this.pan(), this.fading && this.fadeIn(), this.render())
            },
            fadeIn: function() {
                this.context.globalAlpha = this.alpha, this.alpha = this.alpha + .06, this.alpha > 1 && (this.fading = !1)
            },
            animating: function() {
                return this.mouse_down || this.has_momentum || this.fading || this.auto_pan || this.panning ? !0 : !1
            },
            render: function() {
                this.clearCanvas(), this.context.drawImage(this.img, this.imagex, 0, this.scaled_image_width, this.canvas_height), (this.imagex + this.scaled_image_width < this.canvas_width && this.imagex + this.scaled_image_width > 0 || Math.abs(this.imagex) >= this.scaled_image_width) && this.context.drawImage(this.img, this.imagex + this.scaled_image_width, 0, this.scaled_image_width, this.canvas_height), this.model.hasInfo() && !this.auto_pan && (this.render_unit_info(), this.draw_hud(), this.show_markers && this.drawMarkers())
            },
            render_unit_info: function() {
                var b = this,
                    c = this.absolute_degrees(this.pan_degrees() - this.model.get("unit_1_degrees"));
                this.unit = _.find(b.units.models, function(a) {
                    return a.get("degrees_end") > c
                }), this.unit ? this.UnitInfo.setModel(this.unit) : a("#unit_info").empty()
            },
            draw_hud: function() {
                this.hud.clearRect(0, 0, 115, 115), this.hud.drawImage(this.hud_plate, 0, 0), this.hud.save(), this.hud.translate(58, 58), this.hud.rotate(this.pan_degrees() * Math.PI / 180), this.hud.drawImage(this.hud_radar, -58, -58), this.hud.restore()
            },
            drawMarkers: function() {
                _(Markers.models).each(function(a) {
                    var b = a.coordinates.forFloor(this.model.get("id"));
                    if (b) {
                        var c = this.markerRelativeX(b),
                            d = this.markerRelativeY(b);
                        c > Math.abs(this.imagex) && c < Math.abs(this.imagex) + this.canvas_width ? this.drawMarker(a, c, d) : c < this.canvas_width && this.drawMarker(a, c + this.scaled_image_width, d)
                    }
                }, this)
            },
            drawMarker: function(a, b, c) {
                var b = b - Math.abs(this.imagex) - this.marker.width / 2;
                this.context.drawImage(this.marker, b, c - this.marker.height)
            },
            toggleMarkers: function() {
                return this.show_markers == 1 ? this.show_markers = !1 : this.show_markers = !0, this.render(), this.show_markers
            },
            markerRelativeX: function(a) {
                return a.get("x") * this.img_scale
            },
            markerRelativeY: function(a) {
                return a.get("y") * this.img_scale
            },
            pan_percentage: function() {
                return Math.abs(this.imagex) / this.scaled_image_width * 100
            },
            pan_north_offset: function() {
                var a = this.canvas_width / 2 / this.scaled_image_width * 360;
                return this.model.get("north_offset") / this.img.width * 360 - a
            },
            pan_degrees: function() {
                var a = this.pan_percentage() * 3.6 - this.pan_north_offset();
                return this.absolute_degrees(this.hud_plate_north + a)
            },
            absolute_degrees: function(a) {
                return a > 360 ? a -= 360 : a < 0 && (a = 360 + a), a
            },
            nextFloor: function() {
                var a = this.model.next();
                a != null && a.show()
            },
            prevFloor: function() {
                var a = this.model.prev();
                a != null && a.show()
            },
            scaleToWindow: function() {
                this.context.canvas.width = window.innerWidth, this.context.canvas.height = window.innerHeight, this.canvas_width = this.el.width(), this.canvas_height = this.el.height(), this.img && (this.scaled_image_width = this.scaledImageWidth(), this.render())
            },
            scaledImageWidth: function() {
                return Math.round(this.canvas_height * this.img.width / this.img.height)
            },
            resetVars: function() {
                this.alpha = 1, this.panning = !1, this.pan_change = 0, this.distancex = 0, this.imagex_start = this.imagex
            },
            setIdleTimer: function() {
                clearTimeout(this.idle_timer), this.idle_timer = setTimeout("ViewEngine.beginIdle()", this.timeout * 1e3)
            },
            onMouseDown: function(b) {
                var c = this,
                    d = null;
                b.preventDefault(), this.resetVars(), this.focusView(), a("canvas#view_engine").data("mouseEvents", [b]), this.mouse_start_x = b.pageX, this.mouse_start_y = b.pageY, this.auto_pan && this.endIdle();
                if (this.show_markers) {
                    var e = b.clientX + Math.abs(this.imagex);
                    e > this.scaled_image_width && (e -= this.scaled_image_width), _(Markers.models).each(function(a) {
                        var c = a.coordinates.forFloor(this.model.get("id"));
                        c && e > this.markerRelativeX(c) - this.marker.width / 2 && e < this.markerRelativeX(c) + this.marker.width / 2 && b.clientY > this.markerRelativeY(c) - this.marker.height && b.clientY < this.markerRelativeY(c) && (d = "marker", a.showInfo())
                    }, this)
                }
                d || (this.el.mousemove(function(a) {
                    c.onMouseMove(c, a)
                }), this.mouse_down = !0, this.beginAnimating())
            },
            onMouseUp: function(a) {
                this.mouse_down = !1, this.el.unbind("mousemove"), this.fading || this.onMoveEnd(a), this.setIdleTimer()
            },
            onMouseMove: function(b, c) {
                var d = a("canvas#view_engine").data("mouseEvents");
                c.timeStamp - d[d.length - 1].timeStamp > 40 && (d.push(c), d.length > 2 && d.shift());
                var e = Math.abs(c.pageY - b.mouse_start_y);
                e > 200 && this.distancex < 100 && (this.el.unbind("mousemove"), c.pageY > b.mouse_start_y ? this.prevFloor() : this.nextFloor()), b.imagex + b.scaled_image_width < 0 && (b.mouse_start_x = c.pageX, b.imagex_start = 0), b.imagex > 0 && (b.mouse_start_x = c.pageX, b.imagex_start = -b.scaled_image_width), b.distancex = b.mouse_start_x - c.pageX, b.imagex = Math.round(b.imagex_start + -b.distancex)
            },
            onMoveEnd: function(b) {
                var c = a("canvas#view_engine").data("mouseEvents").shift(),
                    d = c.pageX,
                    e = c.timeStamp,
                    f = b.pageX,
                    g = b.timeStamp,
                    h = f - d,
                    i = Math.max(g - e, 1);
                this.speedX = Math.max(Math.min(h / i, 1), -1);
                var j = Math.sqrt(Math.pow(d - f, 2));
                j > this.minDistance ? (this.has_momentum = !0, this.pan_change = this.speedX * j * 3, this.panTo(null, Math.abs(j) / 100, "Out")) : this.has_momentum = !1
            },
            clearCanvas: function() {
                this.context.clearRect(0, 0, this.canvas_width, this.canvas_height)
            },
            current_unit_index: function() {
                var a = 360 / this.num_units,
                    b = this.absolute_degrees(this.pan_degrees() - this.model.get("unit_1_degrees"));
                return b = this.absolute_degrees(b - a / 2), Math.floor(b / a) + 1
            },
            goToUnit: function(a) {
                var b = _.find(this.units.models, function(b) {
                        return b.get("plan_id") == a.get("id")
                    }),
                    c = b.get("degrees_start") + (b.get("degrees_end") - b.get("degrees_start")) / 2;
                console.log("go to unit at deg:", c), this.panToDeg(c)
            },
            autoPan: function() {
                var a = Math.abs(this.imagex) < this.scaled_image_width / 2 ? this.scaled_image_width - this.canvas_width : 1,
                    b = Math.abs(a - this.imagex) * (11 - this.pan_speed) * .003;
                this.panTo(a, b)
            },
            panTo: function(a, b, c) {
                console.log("pan to x", a), console.log("current x", Math.abs(this.imagex));
                var d = this.scaled_image_width / 2;
                a && (Math.abs(this.imagex) > a ? this.pan_change = Math.abs(this.imagex) - a : this.pan_change = -(a - Math.abs(this.imagex))), c || (c = "inOut"), this.easing = c, b || (b = 2), this.imagex_start = this.imagex, this.pan_startTime = new Date - 0, this.pan_endTime = b * 1e3 + this.pan_startTime, this.panning = !0, this.beginAnimating()
            },
            panToDeg: function(a) {
                var b = this.absolute_degrees(this.model.get("unit_1_degrees") + a),
                    c = b / 360,
                    d = this.scaled_image_width * c;
                d += this.model.get("north_offset"), d > this.scaled_image_width && (d -= this.scaled_image_width), d -= this.canvas_width / 2, this.panTo(d)
            },
            pan: function() {
                var a, b = new Date - 0,
                    c = b - this.pan_startTime,
                    d = this.pan_endTime - this.pan_startTime;
                c < d ? (this.easing == "inOut" ? a = this.easeInOutQuad(c, this.imagex_start, this.pan_change, d) : this.easing == "Out" && (a = this.easeOutQuad(c, this.imagex_start, this.pan_change, d)), a > 0 && (a -= this.scaled_image_width), this.imagex = Math.round(a)) : this.auto_pan ? (this.auto_pan_count >= 5 && (window.location = window.location.href.split("#")[0]), this.autoPan(), this.auto_pan_count++) : (this.panning = !1, this.has_momentum = !1)
            },
            easeInOutQuad: function(a, b, c, d) {
                return (a /= d / 2) < 1 ? c / 2 * a * a + b : -c / 2 * (--a * (a - 2) - 1) + b
            },
            easeOutQuad: function(a, b, c, d) {
                return -c * (a /= d) * (a - 2) + b
            }
        }), window.AppController = Backbone.Router.extend({
            routes: {
                "": "screensaver",
                "floor/:id": "floor",
                "plan/:id": "plan",
                plans: "plans"
            },
            initialize: function() {
                _.bindAll(this, "floor", "plan", "plans"), window.Units = new UnitsCollection, window.Markers = new Markers, window.FloorsPane = new FloorsPane, window.PlansList = new PlansList, window.MarkerInfo = new MarkerInfo, window.PlanDetail = new PlanDetail, window.ViewEngine = new ViewEngine, ViewEngine.setFloor()
            },
            floor: function(a) {
                ViewEngine.setFloor(FloorsPane.collection.get(a))
            },
            plan: function(a) {
                var b = PlansList.collection.get(a);
                b && PlanDetail.setModel(b)
            },
            plans: function() {
                PlansList.render()
            },
            screensaver: function() {
                ViewEngine.beginIdle()
            }
        }), $overlays = a("#hud, #header, #unit_info, #floor_info, #select_floor, #select_plan, #footer"), window.App = new AppController, Backbone.history.start()
    }(jQuery), $(document).ready(function() {
        function a() {
            $(".holder > span").remove();
            var a = $("#planlist").width(),
                b = $("#browse_plans").width();
            if (a < b) $(".holder").append('<span class="arrow-left">Left</span><span class="arrow-right">Right</span>');
            else return !1
        }

        function c() {
            return {
                left: parseInt($("#browse_plans").css("left"))
            }
        }

        function d(a) {
            return {
                width: a.outerWidth(),
                height: a.outerHeight()
            }
        }
        $("a").not(".follow").live("click", function() {
            return !1
        }), $("img").live("mousedown", function() {
            return !1
        }), $(window).resize(function() {
            ViewEngine.scaleToWindow()
        }), document.location.search.match(/desktop/) || (document.body.style.cursor = "none"), $("#select_plan span.browse_plan").live("click", function() {
            $(this).addClass("active").siblings().removeClass("active");
            var b = $(this).attr("rel");
            $("#browse_plans").css("left", "0px"), $("#browse_plans li").hide(), $("#browse_plans ." + b).show(), a()
        });
        var b = new Hammer(document.getElementById("planlist"), {
                drag: !0,
                drag_vertical: !1,
                tap: !0,
                drag_min_distance: 0,
                transform: !1,
                tap_double: !1,
                hold: !1
            }),
            e = {};
        b.ontap = function(a) {
            var b = $(a.originalEvent.target);
            b.is("li") && b.trigger("show_plan"), b.parents("li").length > 0 && b.closest("li").trigger("show_plan")
        }, b.ondragstart = function() {
            e = c(), scroll_dim = d($("#planlist")), content_dim = d($("#browse_plans"))
        }, b.ondrag = function(a) {
            a.distanceX = 0 - a.distanceX;
            var b = 1,
                c = e.left - a.distanceX * b;
            $("#browse_plans").css("left", c)
        }, b.ondragend = function(a) {
            var b = c(),
                d = {};
            b.left > 0 ? d.left = 0 : content_dim.width < scroll_dim.width && b.left < 0 ? d.left = 0 : b.left < -(content_dim.width - scroll_dim.width) && (d.left = -(content_dim.width - scroll_dim.width)), $("#browse_plans").animate(d, 400)
        }
    })

Backbone.sync = function(a, b, c) {
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
        }), 

// ********************************
// 
// Plan List
// 
// Want to click a plan Item and then show the plandetail element with the given plan ID
// 
// ********************************

window.PlansListItem = Backbone.View.extend({
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
                console.log('Showing!');
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

// Show Click Event ===============================
// 
// 
// 
// 
// 
// 
// 
// 
//  ===============================
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

// Show Plan Function ===============================
// 
// 
// 
// 
            show_plan: function() {
                console.log('Who da plan?');
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
/*
to create a preloader:
add the tag to the place of the picture
	<f-preload-img> </ f-preload-img>

tag attributes:
	class-inh - if you add it, the picture will get preloader classes
	id-inh - the picture will get the id of the preloader
	defer - the preloader will not load the image until the startLoading() method is executed
	queue - integer. First, images are loaded without queue, then in ascending order of numbers.Some pictures may have the same queue.
	no-queue - the preloader will start uploading the image as soon as the tag is added
	src - link to picture
	no-error - when a loading error occurs, a picture will be created with attribute load-complete="false"
	error-img - link. when a loading error occurs, this link will be used as src

After loading preloader tag will be replaced to the picture with the attributes:
	preloaded-img
	if the picture is loaded:
		load-complete="true"
	else:
		load-complete="false"
 */
(function () {
	"use strict";
	var loads = [],
  CE=function (attrs, statics) {//class polyfill
  	function felement() {
  		return Reflect.construct(HTMLElement, [], felement);
  	}
  	Object.setPrototypeOf(felement.prototype, HTMLElement.prototype);
  	Object.setPrototypeOf(felement, HTMLElement);
  	
  	felement.prototype.Ainit(attrs);
  	felement.Ainit(statics);
  	return felement;
  }
	qes = [],//queues
	docOnload = false,
	min,
	el = CE({
			connectedCallback: function () {
				var thp = this.parentNode,
				th = this,
				q,
				interval;
				setTimeout(function () {
					var img = new Image();
					img.onload = function () {
						if (th.hasAttribute("queue")) {
							qes.shift();
						}
						thp.insertBefore(img, th),
						setTimeout(function () {
							img.setAttribute("load-complete", "true");
						}, 1),
						thp.removeChild(th);
					},
					img.onerror=function(){
                      	if(th.hasAttribute("no-error"))
							thp.insertBefore(img, th),
							setTimeout(function () {
								img.setAttribute("load-complete", "false");
							}, 1),
							thp.removeChild(th);
						else
							setTimeout(function(){
								img.src="",
								img.src=th.getAttribute("error-img")||th.getAttribute("src");
							},1000);
                    },
					th.hasAttribute("class-inh") && (img.className = th.className),
					th.hasAttribute("id-inh") && (img.id = th.id),
					img.setAttribute("preloaded-img", ""),
					th.startLoading = function () {
						setTimeout(function () {
							if (th.hasAttribute("queue")) {
								interval = setInterval(function () {
										if (qes[0] < q)
											return;
										img.src = th.getAttribute("src"),
										clearInterval(interval);
									}, 1);
								return;
							}
							img.src = th.getAttribute("src");
						}, 0);
					};
					if (th.hasAttribute("queue")) {
						q = parseFloat(th.getAttribute("queue")),
						qes.push(q);
					}
					if (th.hasAttribute("defer"))
						return;
					if (docOnload || th.hasAttribute("no-queue"))
						th.startLoading();
					else
						loads.push(th);
				}, 1);
			}

		});
	document.addEventListener("DOMContentLoaded", function () {
		docOnload = true;
		qes.sort(function (a, b) {
			if (a > b)
				return 1;
			if (a < b)
				return -1;
		});
		loads.forEach(function (el) {
			el.startLoading();
		});
		loads = [];

	});
	customElements.define("f-preload-img", el);
})();

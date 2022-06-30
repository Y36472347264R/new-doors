// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";


function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();
function email_test(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
/*----------------------------------------*/
const selectionItems = document.querySelectorAll('.checkbox-selection__item');
const selectionItemBigs = document.querySelectorAll('.checkbox-selection-big__item');
const selectionItemColors = document.querySelectorAll('.checkbox-selection-colors__item');

//form checked items
function checkedSelection() {
	selectionItems.forEach(el => {
		el.addEventListener('click', () => {
			let InpElem = el.firstElementChild;
			if (el.firstElementChild.hasAttribute('checked')) {
				InpElem.removeAttribute("checked", "1");
				el.classList.remove("_active");
			} else {
				InpElem.setAttribute("checked", "1");
				el.classList.add("_active");
			}
		});
	});
};
checkedSelection();

function checkedSelectionBig() {
	selectionItemBigs.forEach(el => {
		el.addEventListener('click', () => {
			let InpElem = el.firstElementChild;
			if (el.firstElementChild.hasAttribute('checked')) {
				InpElem.removeAttribute("checked", "1");
				el.classList.remove("_active");
			} else {
				InpElem.setAttribute("checked", "1");
				el.classList.add("_active");
			}
		});
	});
};
checkedSelectionBig();

function checkedSelectionColors() {
	selectionItemColors.forEach(el => {
		el.addEventListener('click', () => {
			let InpElem = el.firstElementChild;
			if (el.firstElementChild.hasAttribute('checked')) {
				InpElem.removeAttribute("checked", "1");
				el.classList.remove("_active");
			} else {
				InpElem.setAttribute("checked", "1");
				el.classList.add("_active");
			}
		});
	});
};
checkedSelectionColors();
/*----------------------------------------*/
// reset form items
function resetFormItems() {
	let btnReset = document.querySelector('.buttons-form-selection__btn-reset');
	btnReset.addEventListener('click', function (e) {
		if (selectionItems) {
			for (let index = 0; index < selectionItems.length; index++) {
				const selectionItem = selectionItems[index];
				if (selectionItem.firstElementChild.hasAttribute('checked')) {
					selectionItem.firstElementChild.removeAttribute('checked', '1');
					selectionItem.classList.remove('_active');
				}
			};
		};
		if (selectionItemBigs) {
			for (let index = 0; index < selectionItemBigs.length; index++) {
				const selectionItemBig = selectionItemBigs[index];
				if (selectionItemBig.firstElementChild.hasAttribute('checked')) {
					selectionItemBig.firstElementChild.removeAttribute('checked', '1');
					selectionItemBig.classList.remove('_active');
				}
			};
		};
		if (selectionItemColors) {
			for (let index = 0; index < selectionItemColors.length; index++) {
				const selectionItemColor = selectionItemColors[index];
				if (selectionItemColor.firstElementChild.hasAttribute('checked')) {
					selectionItemColor.firstElementChild.removeAttribute('checked', '1');
					selectionItemColor.classList.remove('_active');
				}
			};
		};
		priceSlider.noUiSlider.reset();
	});
};
resetFormItems();

new Swiper('.recommend__swiper-container', {
	slidesPerView: 1,
	slidesPerGroup: 1,
	initialSlide: 0,

	simulateTouch: true,
	touthRadio: 1,
	touthAngle: 45,
	grabCursor: true,

	observer: true,
	observeParents: true,
	autoHeight: false,
	speed: 1200,
	loop: true,


	pagination: {
		el: '.recommend__pagination',
		clickable: true,
	},

	keyboard: {
		//включить выкльучит
		//возможность управления
		enabled: true,
		//включить выкльучит
		//стрелками
		//только когда слайдер
		//в пределах вьюпорта
		onlyInViewport: true,
		//включить выкльучит
		//управление клавишами
		//pageUP, pageDown
		pageUpDown: true,
	},

	navigation: {
		nextEl: '.recommend__button-next',
		prevEl: '.recommend__button-prev',
	},

	autoplay: {
		delay: 3000,
		stopOnLastSlide: true,
		disableOnInteraction: false,
	}
});

new Swiper('.slider-popular__swiper-container_1', {
	slidesPerView: 2,
	slidesPerGroup: 2,
	initialSlide: 0,
	spaceBetween: 30,

	simulateTouch: true,
	touthRadio: 1,
	touthAngle: 45,
	grabCursor: true,

	observer: true,
	observeParents: true,
	autoHeight: false,
	// speed: 800,
	// loop: true,

	keyboard: {
		//включить выкльучит
		//возможность управления
		enabled: true,
		//включить выкльучит
		//стрелками
		//только когда слайдер
		//в пределах вьюпорта
		onlyInViewport: true,
		//включить выкльучит
		//управление клавишами
		//pageUP, pageDown
		pageUpDown: true,
	},

	navigation: {
		nextEl: '.popular__button-next_1',
		prevEl: '.popular__button-prev_1',
	},

	breakpoints: {
		320: {
			slidesPerView: 1,
			slidesPerGroup: 1,
		},
		570: {
			slidesPerView: 2,
			slidesPerGroup: 2,
		},
		800: {
			slidesPerView: 1,
			slidesPerGroup: 1,
		},
		1200: {
			slidesPerView: 1,
			slidesPerGroup: 1,
		},
		1260: {
			spaceBetween: 30,
			slidesPerView: 2,
			slidesPerGroup: 2,
		},
	},

});

new Swiper('.slider-popular__swiper-container_2', {
	slidesPerView: 2,
	slidesPerGroup: 2,
	initialSlide: 0,
	spaceBetween: 30,

	simulateTouch: true,
	touthRadio: 1,
	touthAngle: 45,
	grabCursor: true,

	observer: true,
	observeParents: true,
	autoHeight: false,
	// speed: 800,
	// loop: true,

	keyboard: {
		//включить выкльучит
		//возможность управления
		enabled: true,
		//включить выкльучит
		//стрелками
		//только когда слайдер
		//в пределах вьюпорта
		onlyInViewport: true,
		//включить выкльучит
		//управление клавишами
		//pageUP, pageDown
		pageUpDown: true,
	},

	navigation: {
		nextEl: '.popular__button-next_2',
		prevEl: '.popular__button-prev_2',
	},

	breakpoints: {
		320: {
			slidesPerView: 1,
			slidesPerGroup: 1,
		},
		570: {
			slidesPerView: 2,
			slidesPerGroup: 2,
		},
		800: {
			slidesPerView: 1,
			slidesPerGroup: 1,
		},
		1200: {
			slidesPerView: 1,
			slidesPerGroup: 1,
		},
		1260: {
			spaceBetween: 30,
			slidesPerView: 2,
			slidesPerGroup: 2,
		},
	},

});

new Swiper('.useful-info__swiper-container', {
	slidesPerView: 2,
	slidesPerGroup: 2,
	initialSlide: 0,
	spaceBetween: 23,

	simulateTouch: true,
	touthRadio: 1,
	touthAngle: 45,
	grabCursor: true,

	observer: true,
	observeParents: true,
	autoHeight: true,
	// speed: 800,
	// loop: true,

	keyboard: {
		//включить выкльучит
		//возможность управления
		enabled: true,
		//включить выкльучит
		//стрелками
		//только когда слайдер
		//в пределах вьюпорта
		onlyInViewport: true,
		//включить выкльучит
		//управление клавишами
		//pageUP, pageDown
		pageUpDown: true,
	},

	navigation: {
		nextEl: '.useful-info__button-next',
		prevEl: '.useful-info__button-prev',
	},

	breakpoints: {
		320: {
			slidesPerView: 1,
			slidesPerGroup: 1,
		},
		1135: {
			slidesPerView: 2,
			slidesPerGroup: 2,
		}
	},

});


var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");

var isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	}, iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	}, Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	}, Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	}, any: function () {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('html').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('html').classList.add('_touch');
	document.body.classList.add('_touch')
	let menuArrows = document.querySelectorAll('.lunges-header__arrow');
	if (menuArrows.length > 0) {
		for (let index = 0; index < menuArrows.length; index++) {
			const menuArrow = menuArrows[index];
			menuArrow.addEventListener('click', function (e) {
				menuArrow.parentElement.classList.toggle('_active');
			});
		};
	};
	/*----------------------------------------*/
} else {
	document.body.classList.add('_pc')
}

//======================

//testWebp
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support === true) {
		document.querySelector('html').classList.add('_webp');
	} else {
		document.querySelector('html').classList.add('_no-webp');
	}
});

//======================

//_ibg
function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();

//======================

//wrapper_loaded
window.addEventListener("load", function () {
	if (document.querySelector('.wrapper')) {
		setTimeout(function () {
			document.querySelector('.wrapper').classList.add('_loaded');
		}, 0);
	}
});
let unlock = true;

//=====================

//Menu
let iconMenu = document.querySelector(".header__icon");
if (iconMenu != null) {
	let delay = 200;
	let menuBody = document.querySelector(".header__menu");
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
		}
	});
};

//=====================

//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}

//=====================

//Tabs
let tabs = document.querySelectorAll("._tabs");
for (let index = 0; index < tabs.length; index++) {
	let tab = tabs[index];
	let tabs_items = tab.querySelectorAll("._tabs-item");
	let tabs_blocks = tab.querySelectorAll("._tabs-block");
	for (let index = 0; index < tabs_items.length; index++) {
		let tabs_item = tabs_items[index];
		tabs_item.addEventListener("click", function (e) {
			for (let index = 0; index < tabs_items.length; index++) {
				let tabs_item = tabs_items[index];
				tabs_item.classList.remove('_active');
				tabs_blocks[index].classList.remove('_active');
			}
			tabs_item.classList.add('_active');
			tabs_blocks[index].classList.add('_active');
			e.preventDefault();
		});
	}
}

//=====================
//IsHidden
function _is_hidden(el) {
	return (el.offsetParent === null)
}

//=====================

//Полифилы
(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
//let btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');
let forms = document.querySelectorAll('form');
if (forms.length > 0) {
	for (let index = 0; index < forms.length; index++) {
		const el = forms[index];
		el.addEventListener('submit', form_submit);
	}
}
async function form_submit(e) {
	let btn = e.target;
	let form = btn.closest('form');
	let error = form_validate(form);
	if (error == 0) {
		let formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
		let formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
		const message = form.getAttribute('data-message');
		const ajax = form.getAttribute('data-ajax');
		const test = form.getAttribute('data-test');

		//SendForm
		if (ajax) {
			e.preventDefault();
			let formData = new FormData(form);
			form.classList.add('_sending');
			let response = await fetch(formAction, {
				method: formMethod,
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				form.classList.remove('_sending');
				if (message) {
					popup_open(message + '-message');
				}
				form_clean(form);
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
		}
		// If test
		if (test) {
			e.preventDefault();
			popup_open(message + '-message');
			form_clean(form);
		}
	} else {
		let form_error = form.querySelectorAll('._error');
		if (form_error && form.classList.contains('_goto-error')) {
			_goto(form_error[0], 1000, 50);
		}
		e.preventDefault();
	}
}
function form_validate(form) {
	let error = 0;
	let form_req = form.querySelectorAll('._req');
	if (form_req.length > 0) {
		for (let index = 0; index < form_req.length; index++) {
			const el = form_req[index];
			if (!_is_hidden(el)) {
				error += form_validate_input(el);
			}
		}
	}
	return error;
}
function form_validate_input(input) {
	let error = 0;
	let input_g_value = input.getAttribute('data-value');

	if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
		if (input.value != input_g_value) {
			let em = input.value.replace(" ", "");
			input.value = em;
		}
		if (email_test(input) || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	} else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
		form_add_error(input);
		error++;
	} else {
		if (input.value == '' || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	}
	return error;
}
function form_add_error(input) {
	input.classList.add('_error');
	input.parentElement.classList.add('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
	let input_error_text = input.getAttribute('data-error');
	if (input_error_text && input_error_text != '') {
		input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
	}
}
function form_remove_error(input) {
	input.classList.remove('_error');
	input.parentElement.classList.remove('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
}
function form_clean(form) {
	let inputs = form.querySelectorAll('input,textarea');
	for (let index = 0; index < inputs.length; index++) {
		const el = inputs[index];
		el.parentElement.classList.remove('_focus');
		el.classList.remove('_focus');
		el.value = el.getAttribute('data-value');
	}
	let checkboxes = form.querySelectorAll('.checkbox__input');
	if (checkboxes.length > 0) {
		for (let index = 0; index < checkboxes.length; index++) {
			const checkbox = checkboxes[index];
			checkbox.checked = false;
		}
	}
	let selects = form.querySelectorAll('select');
	if (selects.length > 0) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_default_value = select.getAttribute('data-default');
			select.value = select_default_value;
			select_item(select);
		}
	}
}



//Placeholers
let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
inputs_init(inputs);
function inputs_init(inputs) {
	if (inputs.length > 0) {
		for (let index = 0; index < inputs.length; index++) {
			const input = inputs[index];
			const input_g_value = input.getAttribute('data-value');
			input_placeholder_add(input);
			if (input.value != '' && input.value != input_g_value) {
				input_focus_add(input);
			}
			input.addEventListener('focus', function (e) {
				if (input.value == input_g_value) {
					input_focus_add(input);
					input.value = '';
				}
				if (input.getAttribute('data-type') === "pass") {
					input.setAttribute('type', 'password');
				}
				if (input.classList.contains('_date')) {
					/*
					input.classList.add('_mask');
					Inputmask("99.99.9999", {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
					*/
				}
				if (input.classList.contains('_phone')) {
					//'+7(999) 999 9999'
					//'+38(999) 999 9999'
					//'+375(99)999-99-99'
					input.classList.add('_mask');
					Inputmask("+375 (99) 9999999", {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				if (input.classList.contains('_digital')) {
					input.classList.add('_mask');
					Inputmask("9{1,}", {
						"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				form_remove_error(input);
			});
			input.addEventListener('blur', function (e) {
				if (input.value == '') {
					input.value = input_g_value;
					input_focus_remove(input);
					if (input.classList.contains('_mask')) {
						input_clear_mask(input, input_g_value);
					}
					if (input.getAttribute('data-type') === "pass") {
						input.setAttribute('type', 'text');
					}
				}
			});
			if (input.classList.contains('_date')) {
				const calendarItem = datepicker(input, {
					customDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
					customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
					overlayButton: 'Применить',
					overlayPlaceholder: 'Год (4 цифры)',
					startDay: 1,
					formatter: (input, date, instance) => {
						const value = date.toLocaleDateString()
						input.value = value
					},
					onSelect: function (input, instance, date) {
						input_focus_add(input.el);
					}
				});
				const dataFrom = input.getAttribute('data-from');
				const dataTo = input.getAttribute('data-to');
				if (dataFrom) {
					calendarItem.setMin(new Date(dataFrom));
				}
				if (dataTo) {
					calendarItem.setMax(new Date(dataTo));
				}
			}
		}
	}
}
function input_placeholder_add(input) {
	const input_g_value = input.getAttribute('data-value');
	if (input.value == '' && input_g_value != '') {
		input.value = input_g_value;
	}
}
function input_focus_add(input) {
	input.classList.add('_focus');
	input.parentElement.classList.add('_focus');
}
function input_focus_remove(input) {
	input.classList.remove('_focus');
	input.parentElement.classList.remove('_focus');
}
function input_clear_mask(input, input_g_value) {
	input.inputmask.remove();
	input.value = input_g_value;
	input_focus_remove(input);
}


//RANGE
const priceSlider = document.querySelector('.price__range');
if (priceSlider) {
	noUiSlider.create(priceSlider, {
		start: [7000, 150000],
		connect: true,
		behaviour: 'drag',
		range: {
			'min': [0],
			'max': [200000]
		},
	});

	var limitFieldMin = document.getElementById('price-value-min');
	var limitFieldMax = document.getElementById('price-value-max');

	priceSlider.noUiSlider.on('update', function (values, handle) {
		(handle ? limitFieldMax : limitFieldMin).innerHTML = values[handle];
	});
}
function mapAdd() {
	let tag = document.createElement('script');
	tag.src = "https://maps.google.com/maps/api/js?sensor=false&amp;key=&callback=mapInit";
	let firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function mapInit(n = 1) {
	google.maps.Map.prototype.setCenterWithOffset = function (latlng, offsetX, offsetY) {
		var map = this;
		var ov = new google.maps.OverlayView();
		ov.onAdd = function () {
			var proj = this.getProjection();
			var aPoint = proj.fromLatLngToContainerPixel(latlng);
			aPoint.x = aPoint.x + offsetX;
			aPoint.y = aPoint.y + offsetY;
			map.panTo(proj.fromContainerPixelToLatLng(aPoint));
			//map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
		}
		ov.draw = function () { };
		ov.setMap(this);
	};
	var markers = new Array();
	var infowindow = new google.maps.InfoWindow({
		//pixelOffset: new google.maps.Size(-230,250)
	});
	var locations = [
		[new google.maps.LatLng(55.75561001400679, 37.56430509962465)],
		[new google.maps.LatLng(53.700055, 27.5513694)],
		[new google.maps.LatLng(53.809055, 27.5813694)],
		[new google.maps.LatLng(53.859055, 27.5013694)],
	]
	var options = {
		zoom: 16,
		panControl: false,
		mapTypeControl: false,
		center: locations[0][0],
		styles: [{ "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#e0efef" }] }, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "hue": "#1900ff" }, { "color": "#c0e8e8" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "lightness": 100 }, { "visibility": "simplified" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "visibility": "on" }, { "lightness": 700 }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#7dcdcd" }] }],
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('map'), options);
	var icon = {
		url: 'img/icons/map.png',
		scaledSize: new google.maps.Size(35, 35),
		anchor: new google.maps.Point(9, 10)
	}
	for (var i = 0; i < locations.length; i++) {
		var marker = new google.maps.Marker({
			icon: icon,
			position: locations[i][0],
			map: map,
		});
		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				for (var m = 0; m < markers.length; m++) {
					markers[m].setIcon(icon);
				}
				var cnt = i + 1;
				//infowindow.setContent(document.querySelector('.events-map__item_' + cnt).innerHTML);
				//infowindow.open(map, marker);
				marker.setIcon(icon);
				map.setCenterWithOffset(marker.getPosition(), 0, 0);
				setTimeout(function () {

				}, 10);
			}
		})(marker, i));
		markers.push(marker);
	}
	if (n) {
		var nc = n - 1;
		setTimeout(function () {
			google.maps.event.trigger(markers[nc], 'click');
		}, 500);
	}
}

function optimizationMap() {
	var element = document.querySelector('.popular');
	var elementHeight = element.clientHeight;
	//on hear scroll
	document.addEventListener('scroll', animate);

	function inView() {
		var windowHeight = window.innerHeight;
		var scrollY = window.scrollY || window.pageYOffset;
		var scrollPosition = scrollY + windowHeight;
		var elementPosition = element.getBoundingClientRect().top + scrollY + elementHeight;
		if (scrollPosition > elementPosition) {
			return true;
		};
		return false;
	};
	function animate() {
		if (inView()) {
			if (document.querySelector('#map')) {
				mapAdd();
			}
			document.removeEventListener('scroll', animate);
		};
	};
};
optimizationMap();
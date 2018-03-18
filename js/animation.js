var animakit = {};
animakit.growBoxIndex = 0;

const findIndex = function(items, target) {
	let index;
	$(items).forEach((item, i) => {
		if(item.classList.contains(target)) {
			index = i;
		}
	});
	return index;
};

document.addEventListener("DOMContentLoaded", function() {
	$(".pagination .circle").forEach((elem) => {
		elem.addEventListener('click', function() {
			// Remove the circle-active class from the currently selected indicator
			$('.circle-active').classList.remove('circle-active');
			// Make the clicked indicator the selected one
			elem.classList.add('circle-active')

			animakit.updateSlideshow();
		});
	});

	$('#prev').addEventListener('click', function() {
		animakit.goToPrev();
	});

	$('#next').addEventListener('click', function() {
		animakit.goToNext();
	});

	// Keyboard shortcuts
	$("body").onkeyup = function(e) {
		if(e.keyCode === 39) {
			// Key right
			animakit.goToNext();
		} else if(e.keyCode === 37) {
			// Key left
			animakit.goToPrev();
		} else if(e.keyCode === 83) {
			// S key
			animakit.showSource();
		} else if(e.keyCode === 27) {
			animakit.dismissSource();
		}
	}
	$("body").onkeydown = function(e) {
		if(e.keyCode === 13) {
			// Enter key
			// The enter key needs to be set to keydown, to not trigger when you hit enter in the URL field to enter the site
			animakit.showSource();
		}
	}

	$(".source").addEventListener('click', function() {
		animakit.showSource();
	});

	// Prevent the source frame dismissing when interacting with the textarea
	$('#source-frame textarea').forEach((elem) => {
		elem.addEventListener('click', function(e) {
			e.stopPropagation();
		});
	});

	$('#source-frame ul').addEventListener('click', function() {
		animakit.dismissSource();
	});

	// animation 1 addEventListener START
	$('.box-btn').forEach((elem) => {
		elem.addEventListener('click', function() {
			animakit.growBox(elem);
		});
	});
	// animation 1 addEventListener END
});

animakit.goToNext = function() {
	// Exit if there are no more animation
	if(findIndex('.circle', 'circle-active') >= ($('.circle').length-1))
		return;

	// Exit if there source-frame is visible
	if($('#source-frame').classList.contains('visible'))
		return;

	let elem = $('.circle-active');
	elem.classList.remove('circle-active');
	elem.nextElementSibling.classList.add('circle-active');

	animakit.updateSlideshow();
}

animakit.goToPrev = function() {
	// Exit if the currently selected animation is the first one
	if(findIndex('.circle', 'circle-active') <= 0)
		return;

	// Exit if there source-frame is visible
	if($('#source-frame').classList.contains('visible'))
		return;

	let elem = $('.circle-active');
	elem.classList.remove('circle-active');
	elem.previousElementSibling.classList.add('circle-active');

	animakit.updateSlideshow();
}

animakit.updateSlideshow = function() {
	let index = findIndex('.circle', 'circle-active');
	let classIndex = index + 1;
	let oldIndex = parseInt($('body').classList[1].substr(6));

	$('body').classList.replace('active'+oldIndex, 'active'+classIndex);

	$('#anima-core > .anima-active').classList.remove('anima-active');
	$(`#anima-core > div:nth-child(${classIndex})`).classList.add('anima-active');
}

animakit.showSource = function() {
	// Exit if the source-frame is already visible
	if($('#source-frame').classList.contains('visible')) return;

	// Show the corresponding li in the source list
	let index = findIndex('.pagination .circle', 'circle-active');
	$(`#source-frame li:nth-child(${index+1})`).classList.add('visible');

	$('#source-frame').classList.add('visible')
}

animakit.dismissSource = function() {
	if(!$('#source-frame .visible')) return;
	$('#source-frame .visible').classList.remove('visible');
	$('#source-frame').classList.remove('visible');
}

// animation 1 function START
animakit.growBox = function(elem) {
	let left = parseInt(elem.parentElement.dataset.left);
	let top = parseInt(elem.parentElement.dataset.top);
	let fromName;

	if(elem.classList.contains("box-btn-top")) {
		top -= 40;
		fromName = 'from-top';
	}
	else if(elem.classList.contains("box-btn-right")) {
		left += 40;
		fromName = 'from-right';
	}
	else if(elem.classList.contains("box-btn-bottom")) {
		top += 40;
		fromName = 'from-bottom';
	}
	else if(elem.classList.contains("box-btn-left")) {
		left -= 40;
		fromName = 'from-left';
	}

	let newElement = `<div class="boxBlock" id="new-box-${animakit.growBoxIndex}" style="top: ${top}px; left: ${left}px;">
						<div class="boxRelative" data-top="${top}" data-left="${left}">
							<span class="box-body ${fromName}"></span>
							<button class="box-btn box-btn-top">+</button>
							<button class="box-btn box-btn-right">+</button>
							<button class="box-btn box-btn-bottom">+</button>
							<button class="box-btn box-btn-left">+</button>
						</div>
					</div>`;
	let tempElem = document.createElement('div');
	tempElem.innerHTML = newElement;
	$('#grow-box').prepend(tempElem.firstChild);
	$(`#new-box-${animakit.growBoxIndex} .box-body`).addEventListener('animationend', function() {
		$(`#new-box-${animakit.growBoxIndex++} .box-btn`).forEach((elem) => {
			elem.addEventListener('click', function() {
				animakit.growBox(elem);
			});
		});
	});
}
// animation 1 function END
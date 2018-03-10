
var lc = {};
lc.sidebarVisible = false;
lc.article = {};
lc.sidebarItems = [];
lc.itemActive = "1";

document.addEventListener("DOMContentLoaded", function() {
	$(".arrow-box").addEventListener("click", function(e) {
		lc.sidebarVisible ? lc.hideSidebar() : lc.revealSidebar();
	});
	leetcodesbarRef.orderBy("id").get().then(function(docs) {
		docs.forEach(function(doc) {
			lc.sidebarItems.push(doc.data());
		});
	}).then(function() {
		lc.sidebarItems.forEach(function(item) {
			$('.leet-items').innerHTML += lc.createSidebar(item);
		});
	}).then(function() {
		$(".leet-item").forEach(el => {
			el.addEventListener("click", function(e) {
				lc.hideSidebar();
				if(lc.itemActive === el.dataset.id) {
					return;
				} else {
					lc.itemActive = el.dataset.id;
				}
				if(lc.article[el.dataset.id]) {
					lc.changeContent(lc.article[el.dataset.id]);
				} else{
					leetcodesRef.doc(el.dataset.id).get().then(function(doc) {
						lc.article[el.dataset.id] = doc.data();
					}).then(function() {
						lc.changeContent(lc.article[el.dataset.id]);
					}).catch(error => {
						console.log(error);
					});
				}
			});
		});
	}).catch(error => {
		console.log(error);
	});
});

lc.toggleSidebarStates = function () {
	$(".arrow-box").classList.toggle("arrow-box-active");
}

lc.revealSidebar = function() {
	lc.sidebarVisible = true;
	lc.toggleSidebarStates();

	$(".sidebar").classList.toggle("sidebar-active");
}

lc.hideSidebar = function() {
	lc.sidebarVisible = false;
	lc.toggleSidebarStates();

	$(".sidebar").classList.toggle("sidebar-active");
}

lc.createSidebar = function(item) {
	return `<div class="leet-item" data-id="${item.id}">
				<span class="leet-num">${item.id}</span>
				<div class="leet-title">${item.title}</div>
			</div>`;
}

lc.changeContent = function(content) {
	$('.snippet-header').innerHTML = content.title;
	$('#content-description').innerHTML = content.description;
	$('#content-algorithm').innerHTML = content.algorithm;
	$('#content-code').innerHTML = content.code;
	$('#content-complexitySpace').innerHTML = content.complexitySpace;
	$('#content-complexityTime').innerHTML = content.complexityTime;
	$('#content-example').innerHTML = content.example;
	$('#content-runtime').innerHTML = content.runtime + "ms";
	window.scrollTo(0, 0);
}
var lc = {};
lc.sidebarVisible = false;
lc.article = {
	"1": {
		"no": 1,
		"title": "Two Sum",
		"code": `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let obj = {};
    let complement;
    let len = nums.length;
    for(let i = 0; i &lt; len ; i++) {
        complement = target - nums[i];
        if(obj.hasOwnProperty(complement)) {
            return [obj[complement], i];
        }
        obj[nums[i]] = i;
    }
};`,
		"description": "給定一組整數陣列與一個目標值, 找出陣列其中兩元素相加之值等於目標值的陣列位址, 注意同個元素不能使用兩次.",
		"algorithm": "當我們要確認某一數值是否存在於指定陣列中時, 我們需要一個更有效率的方法來減少搜尋的時間, 最好的方法是甚麼呢? hash table. <br> 我們使用空間換取執行速度, 將查詢時間從O(n)降到O(1), hash table提供我們更快的查詢時間, '近乎'是常數時間, 當有collision發生時, 查詢時間是有可能退化到O(n)的, 但小心選用hash function來建立的hash table其提供的查詢時間基本上是在O(1).",
		"example": `給定 nums = [2, 7, 11, 15], taget = 9,

因為 num[0] + num[1] = 2 + 7 = 9,
return [0, 1].`,
		"complexity": {
			"time": "時間複雜度: <span class='mathit'>O(n)</span>. 在一有n個元素的清單中, 我們只遍歷每個元素一次. 每次在table上的查詢只花費 <span class='mathit'>O(1)</span> 時間.",
			"space": "空間複雜度: <span class='mathit'>O(n)</span>. 需要的額外空間為儲存袃hash table清單的項目數量, 最多儲存n個元素." 
		},
		"runtime": 96,
		"timestamp": 0
	},
};

document.addEventListener("DOMContentLoaded", function() {
	$(".arrow-box").addEventListener("click", function(e) {
		lc.sidebarVisible ? lc.hideSidebar() : lc.revealSidebar();
	});
	// $(".leet-item").forEach(el => {
	// 	el.addEventListener("click", function(e) {
	// 		lc.hideSidebar();
	// 	});
	// });
	$(".leet-item").addEventListener("click", function(e) {
			lc.hideSidebar();
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

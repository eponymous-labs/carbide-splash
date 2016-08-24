var toc = document.getElementById('table-of-contents'),
	splash_wrap = document.getElementById('splash-wrap')


function topic(h, el_name, class_name){
	var el = document.createElement(el_name)
	el.className = class_name
	el.innerHTML = h.innerHTML
	el.addEventListener('click', h.scrollIntoView.bind(h, {behavior: 'smooth'}))
	return el
}


var headings = [].slice.call(document.querySelectorAll('#content h1, #content h2'))
var i = 0, h = headings[0]
while(h){

	h.topic = toc.appendChild(topic(h, 'div', 'topic'))
	h = headings[++i]

	var ul = document.createElement('ul')
	while(h && h.tagName === 'H2'){
		h.subtopic = ul.appendChild(topic(h, 'li', 'subtopic'))
		h = headings[++i]
	}
	toc.appendChild(ul)
}

function clamp(v, min, max){
	return Math.max(Math.min(v, max), min)
}

function nearest(arr, f, v){
    var min = 0, max = arr.length - 1;
    var index, current;
 
    while (min <= max) {
        index = Math.floor((min + max) / 2)
        current = f(arr[index]);
        if      (current <  v) { min = index + 1 }
        else if (current >= v) { max = index - 1 }
    }

    min = clamp(max, 0, arr.length-1)
	max = clamp(max + 1, 0, arr.length-1)
	return Math.abs(f(arr[min]) - v) < Math.abs(f(arr[max]) - v) ? min : max
}


var h2s = headings.filter(function(header){ return header.tagName === 'H2' })

function get_ul(active){
	return active.topic ? active.topic.nextSibling : active.subtopic.parentElement
}

function set_current(active, current){
	current = current ? 'current' : ''
	if(active.subtopic){ active.subtopic.className = 'subtopic ' + current }
	else if(active.topic){ active.topic.className = 'topic ' + current }
	get_ul(active).className = current
}


var active;
document.addEventListener('scroll', function (e) {

	if(active) set_current(active, false);

	active = headings[nearest(headings, function(heading){
		return heading.getBoundingClientRect().top
	}, 40)]

	set_current(active, true)

	var activeRect = (active.topic || active.subtopic).getBoundingClientRect()

	if(activeRect.top < 0){ toc.scrollTop += activeRect.top }
	else if(activeRect.bottom > innerHeight){ toc.scrollTop += activeRect.bottom - innerHeight }
})


document.addEventListener('scroll', function (e) {
	var box = document.getElementById('container').getBoundingClientRect()
	if(box.top <= 0 && box.bottom > innerHeight){
		toc.className = 'floating'
		toc.parentElement.className = 'floating'
	} else {
		toc.className = ''
		toc.parentElement.className = ''
	}

})


var tv_wrap = document.getElementById('tv-wrap')
var tv = document.getElementById('tv')
var tv_img = document.getElementById('tv-img')
var tv_markers = [].slice.call(document.querySelectorAll('[image]'))
// var tv_pointer = document.getElementById('quick-pointer')
// var tv_scroller = document.getElementById('tv-scroller')
// var quick_content = document.getElementById('quick-content')

// var active_marker, active_image

// tv_markers.forEach(function(tv_marker) {
// 	var img = document.createElement('video')
// 	img.src = tv_marker.getAttribute('image')
// 	img.autoplay = true
// 	img.loop = true
// 	// img.style.display = 'none'
// 	// img.style.opacity = .5
// 	img.className = 'unfocused'
// 	tv_marker.img = img
// 	tv_scroller.appendChild(img)

// 	var inline_img = document.createElement('video')
// 	inline_img.src = tv_marker.getAttribute('image')
// 	inline_img.className = 'inline'
// 	inline_img.autoplay = true
// 	inline_img.loop = true
// 	tv_marker.parentNode.insertBefore(inline_img, tv_marker.nextSibling)

// })

// function kevin_scroll(e) {

// 	if(active_marker){
// 		active_marker.img.className= 'unfocused';
// 		// active_marker.img.style.display = 'none'
// 		// active_marker.img.style.opacity = .5
// 	}

// 	var get_top = function(tv_marker){return tv_marker.getBoundingClientRect().top}

// 	var active_marker_index = nearest(tv_markers, get_top, innerHeight/2)
// 	active_marker = tv_markers[active_marker_index]

// 	// active_marker.img.style.opacity = 1
// 	active_marker.img.className = 'focused'

// 	var next_marker = tv_markers[active_marker_index+1] || active_marker
// 	var prev_marker = tv_markers[active_marker_index-1] || active_marker

// 	// active_marker.className = 'active'
// 	// active_marker.img.style.display = 'block'

// 	var wrap_rect = tv_wrap.getBoundingClientRect()
// 	var active_rect = active_marker.img.getBoundingClientRect()
// 	var active_marker_rect = active_marker.getBoundingClientRect()
	
// 	var ideal_top_offset = innerHeight/2 - active_rect.height/2
	
// 	var tv_bottom = active_rect.height + ideal_top_offset

// 	// tv_pointer.style.top = active_marker.getBoundingClientRect().top - quick_content.getBoundingClientRect().top + 10 + 'px'

// 	if(wrap_rect.top <= ideal_top_offset && wrap_rect.bottom > tv_bottom){
// 		tv.className = 'floating'
// 		tv.parentElement.className = 'floating'
// 		console.log(active_rect.top< innerHeight/2)

// 		function tween_top(cur, next) {
// 			var cur_marker_rect = cur.getBoundingClientRect()
// 			var next_marker_rect = next.getBoundingClientRect()
// 			var cur_rect = cur.img.getBoundingClientRect()
// 			var next_rect = next.img.getBoundingClientRect()

// 			var tv_scroller_top = tv_scroller.getBoundingClientRect().top

// 			var r = (innerHeight/2 - cur_marker_rect.top)/
// 			(next_marker_rect.top - cur_marker_rect.top)

// 			var cur_top_scroll = tv_scroller_top -
// 			cur_rect.top + innerHeight/2 - cur_rect.height/2 + 60

// 			var next_top_scroll = tv_scroller_top -
// 			next_rect.top + innerHeight/2 - next_rect.height/2 + 60
// 			console.log(r)

// 			if(cur === next) return cur_top_scroll;

// 			return cur_top_scroll + r*(next_top_scroll - cur_top_scroll)
// 		}


// 		if(active_marker_rect.top < innerHeight/2){

// 			tv_scroller.style.top = tween_top(active_marker, next_marker) + 'px'

// 		} else {

// 			tv_scroller.style.top = tween_top(prev_marker, active_marker) + 'px'

// 		}

// 	} else if (wrap_rect.bottom <= tv_bottom){
// 		tv.className = 'bottom'
// 		tv.parentElement.className = 'bottom'

// 		diff = tv_wrap.getBoundingClientRect().height 
// 			- tv_scroller.getBoundingClientRect().height + 60 + 60
// 		tv_scroller.style.top = diff + 'px'
// 	} else {
// 		tv.className = ''
// 		tv.parentElement.className = ''
// 		tv_scroller.style.top = 'initial'
// 	}
// }

// document.addEventListener('scroll', kevin_scroll)
// setTimeout(kevin_scroll, 200)

var mag = document.querySelector('.mag')
var magWrap = document.querySelector('.mag-wrap')
var base = document.querySelector('.mag-base')

function magnify(x,y,scale, magsize) {
	var baseWidth = base.getBoundingClientRect().width

	mag.style['background-size'] = scale*baseWidth+ 'px'
	mag.style.width = magsize+'px'
	mag.style.height = magsize+'px'

	var top = y - magsize / 2 
	var left = x - magsize / 2

	mag.style.top = top+ 'px'
	mag.style.left = left + 'px'
	mag.style['background-position'] = (-(scale*x - x)-left)+'px ' + (-(scale*y - y)-top) + 'px'
}

// onmousemove = e => {
// 	var rect = magWrap.getBoundingClientRect()
// 	var y = e.clientY - rect.top
// 	var x = e.clientX - rect.left
// 	magnify(x,y,10-x/100,y)
// }
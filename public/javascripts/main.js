import './libraries/vanilla-tilt.js'
import './libraries/waypoints.js'
import './libraries/lazyload.js';
import $ from "jquery";
import { init } from 'aos';
	
/**================================================== *
 * =================  CHANGING TEXT ================= *
 * ================================================== */
 
function getRandomIntInclusive(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min;}
if (typeof String.prototype.replaceAt !== 'function') {
	String.prototype.replaceAt = function(index, replacement) { return this.substr(0, index) + replacement + this.substr(index + replacement.length); }
}

var animationRandomTextSettings = {
	max_frequency   : 20,
	pause_on_end    : 3000,
	nb_frame        : 35,
	possible_texts  : ["webapps", "software", "motion", "games"],
	random_chars    : `@#$%{#-.,.#!"!$"$&$"/%£("}[]()/\\'"\`~,;:.<>`
};

const rnLn        = animationRandomTextSettings.random_chars.length - 1;
let   index       = 0;
let   oldText     = changingText.innerText;
let   tempText    = oldText;
let   loop        = 0;

document.getElementById("changingText").innerHTML= "websites"

setTimeout(function(){ 

function changeNextChar() {
	
// setTimeout(3000);
	var newText = animationRandomTextSettings.possible_texts[index]
	loop++;
	const rand = getRandomIntInclusive(0, rnLn);
	const randTT = getRandomIntInclusive(0, tempText.length - 1);
	const randChar = animationRandomTextSettings.random_chars[rand];
	tempText = tempText.replaceAt(randTT, randChar);
	changingText.innerText = tempText;
	if (loop >= animationRandomTextSettings.nb_frame) {
		loop = 0;
		changingText.innerText = newText;
		index++;
		
		// PAUSE BEFORE RESTART ANIMATION
		setTimeout(function() {
			if (index >= animationRandomTextSettings.possible_texts.length) { index = 0; }
			oldText = changingText.innerText;
			window.requestAnimationFrame(changeNextChar);
		}, animationRandomTextSettings.pause_on_end);
	} 
	else { setTimeout(function() {
			window.requestAnimationFrame(changeNextChar);
		}, animationRandomTextSettings.max_frequency);
	}
}

window.requestAnimationFrame(changeNextChar);
}, 3000);

/**============================================= *
 * =================  NAVIGATION =============== *
 * ============================================= */

$('.nav-toggle').on('click touch', function() {
	$('#navItems').toggleClass('active');
	$(this).toggleClass('active');
	if ($(this).hasClass('active')) {
		document.getElementById("mainNav").style.boxShadow = "inset 0 135px 10px rgba(1, 1, 12, 0.90)";
		$("#logo>img").animate({marginTop: "1em"}, 100, function() {});
	} else {
		document.getElementById("mainNav").style.boxShadow = "rgba(1, 1, 12, 0.8) 0px 68px 10px inset"
		$("#logo>img").css({marginTop: "-1.1em"});
	}
	setTimeout(() => {
		$('#navItems').removeClass('active');
		$(this).removeClass('active');
		document.getElementById("mainNav").style.boxShadow = "rgba(1, 1, 12, 0.8) 0px 68px 10px inset"
		$("#mainNav").animate({boxShadow: "inset 0 70px 10px rgba(1, 1, 12, 0.8)"}, 100, function() {});
		$("#logo>img").animate({marginTop: "-1.1em"}, 100, function() {});
	}, 2550);
});

/** ADD NAVIGATION PROGRAMMATICALLY, TO FIX ISSUE WITH SCROLLLINE OVERFLOWING */
function addNavigation() {	
	const isSafary = navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0;
	if (isSafary) {
		const navItems = $("#navItems > li > a");
		$("#mouseScroller").click(function() { $([document.documentElement, document.body]).animate({scrollTop: $("#workbg").offset().top}, "fast"); });
		navItems.click(function(e) {
				e.preventDefault();
				$('html, body').animate({scrollTop: $('#' + $(this).data('scroll')).offset().top}, "fast");
			});
	}
	
	const scrollClasses = {".navStart": "#start", ".navWork": "#workbg", ".navLab": "#lab", ".navAbout": "#about", ".navContact": "#contacts"};
	
	$("#mouseScroller").click(function() { $([document.documentElement, document.body]).animate({scrollTop: $("#workbg").offset().top}, "fast"); });
		
	const assignScrollEvent = (clicked, destination) => {
		$(clicked).click(function() { $([document.documentElement, document.body]).animate({scrollTop: $(destination).offset().top}, "fast"); });
	};
	
 Object.keys(scrollClasses).forEach(element => {
		const elements = document.querySelectorAll(element);
		const targetEl = document.querySelector(scrollClasses[element]);
		elements.forEach((el) => {if (!isSafary) {  assignScrollEvent(el, targetEl);} });
});

	let sectionPositions = [];
	const initSectionPositions = () => {
		sectionPositions = $(".section").map(function () { return { id: this.id, top: $(this).offset().top - 1, height: $(this).outerHeight() } }).toArray()
	};
	
	const navItems = [].slice.call(document.querySelectorAll("#navItems > li > a"));
	navItems[0].classList.add("active"); // adds the first one 
	
	const setActiveMenuItem = sectionId => {
		const itemIds = [ "start", "workbg", "lab", "about", "contact"];
		const activeItemId = itemIds.indexOf(sectionId);
		navItems.forEach(function (item, index) {
			if (index === activeItemId) { item.classList.add("active"); item.classList.remove("inactive");} 
			else { item.classList.add("inactive"); item.classList.remove("active");}
		})
	};
	
	initSectionPositions();

	let updateTimeout = null;
	$(window).on("resize", initSectionPositions).on("scroll", function() {
		clearTimeout(updateTimeout);
		updateTimeout = setTimeout(function() { setActiveMenuItem((sectionPositions.filter(c => { return c.top + c.height > window.scrollY; })[0] || {}).id) }, 100)
		$(window).off("resize", initSectionPositions);
	})
}

/* 
	- user scrolls down - hide the navbar
	- user scrolls up   - show the navbar
*/

let prevScrollpos = window.pageYOffset;
document.getElementById("mainNav").style.display = "none";
const navbarToggleOnScroll = () => {
	document.getElementById("mainNav").style.display = "flex";
	const currentScrollPos = window.pageYOffset;
	if (prevScrollpos > currentScrollPos) {
		document.getElementById("mainNav").style.top = "0px";
	} else {
		document.getElementById("mainNav").style.top = "-180px";
	}
	prevScrollpos = currentScrollPos;
};

/**============================================= *
 * ============== typewriteScript ============== *
 * ============================================= */
 
$.fn.typewrite = function(options) {
		var settings = {'selector': this, 'extra_char': '', 'delay': 100, 'trim': false, 'wholeDelay': 0, 'text': $(this).text(), 'callback': null};
		if (options) $.extend(settings, options);
		function type_next_element(index) {
			var current_element = $(settings.selector[index]);
			var final_text = settings.text;
			if (settings.trim) final_text = $.trim(final_text);
			function type_next_character(element, i) {
				element.html(final_text.substr(0, i) + settings.extra_char);
				if (final_text.length >= i) { setTimeout(function() { type_next_character(element, i + 1); }, settings.delay);} else { if (++index < settings.selector.length) { type_next_element(index);} else if (settings.callback) settings.callback();}
			} type_next_character(current_element, 0);
		}
		settings.selector.html("").show();
		if (settings.wholeDelay == 0) { type_next_element(0);} else { setTimeout(function() { type_next_element(0); }, settings.wholeDelay);}
		return this;
};

var scrollLine = $(".scrollLine");
var scrollCalc = document.body.clientHeight - document.getElementById("whereitends").offsetHeight;
scrollLine.css({minHeight: scrollCalc});
window.addEventListener('resize', function() {
	var scrollLine = $(".scrollLine");
	var scrollCalc = document.body.clientHeight - document.getElementById("whereitends").offsetHeight
	scrollLine.css({minHeight: scrollCalc});
	scrollLine.css({zIndex: "0"});
	$(window).off("resize");
});

// START
$(".intro, .links > a, .btn, .links").css({opacity: 0});
$(".intro.cursor").hide();

var startText     = $(".intro.start").text();
var nameText      = $(".intro.name").text();
var nameText2     = $(".intro.name2").text();
var wasTriggered  = false;

const startTypewriter = () => {
	$(".intro.start").typewrite(); 
	$(".intro.name").typewrite({  'wholeDelay': startText.length * 100});
	$(".intro.end1").typewrite({  'wholeDelay': (startText.length + nameText.length) * 50, 'callback': function() {   $(".links").animate({opacity: 1},   250, function() { var count = 0; $(".links > a").each(function(index) { count++;$(this).delay(index * 300).animate({opacity: 1}, 500);}); var done = 300 * count;$(".btn").delay(done).animate({opacity: 1},  500);}); 
	$("#show").promise().done(function() {});} });
	$(".intro.end2").typewrite({  'wholeDelay': (startText.length + nameText.length)  * 70, 'callback': function() {   $(".links").animate({opacity: 1},250, function() { var count = 0;   $(".links > a").each(function(index) { count++;$(this).delay(index * 300).animate({opacity: 1}, 500);}); var done = 300 * count;$(".btn").delay(done).animate({opacity: 1},  500);});} });
	$(".intro.end3e").typewrite({ 'wholeDelay': (startText.length + nameText2.length) * 80, 'callback': function() {  $(".links").animate({opacity: 1}, 250, function() { var count = 0;   $(".links > a").each(function(index) { count++;$(this).delay(index * 300).animate({opacity: 1}, 500);}); var done = 300 * count;$(".btn").delay(done).animate({opacity: 1},  500);});} });
	$(".intro.end3").typewrite({  'wholeDelay': (startText.length + nameText2.length) * 90, 'callback': function() {  $(".links").animate({opacity: 1}, 250, function() { var count = 0;   $(".links > a").each(function(index) { count++;$(this).delay(index * 300).animate({opacity: 1}, 500);}); var done = 300 * count;$(".btn").delay(done).animate({opacity: 1},  500);});} });
	$(".intro.end4e").typewrite({ 'wholeDelay': (startText.length + nameText2.length) * 100, 'callback': function() { $(".links").animate({opacity: 1}, 250, function() { var count = 0;   $(".links > a").each(function(index) { count++;$(this).delay(index * 300).animate({opacity: 1}, 500);}); var done = 300 * count;$(".btn").delay(done).animate({opacity: 1},  500);});} });
	$(".intro.end4").typewrite({  'wholeDelay': (startText.length + nameText2.length) * 110, 'callback': function() { $(".links").animate({opacity: 1}, 250, function() { var count = 0;   $(".links > a").each(function(index) { count++;$(this).delay(index * 300).animate({opacity: 1}, 500);}); var done = 300 * count;$(".btn").delay(done).animate({opacity: 1},  500);});} });
	$(".intro.end5e").typewrite({ 'wholeDelay': (startText.length + nameText2.length) * 120, 'callback': function() { $(".links").animate({opacity: 1}, 250, function() { var count = 0;   $(".links > a").each(function(index) { count++;$(this).delay(index * 300).animate({opacity: 1}, 500);}); var done = 300 * count;$(".btn").delay(done).animate({opacity: 1},  500);});} });
	$(".intro.end5").typewrite({  'wholeDelay': (startText.length + nameText2.length) * 130, 'callback': function() { $(".links").animate({opacity: 1}, 250, function() { var count = 0;   $(".links > a").each(function(index) { count++;$(this).delay(index * 300).animate({opacity: 1}, 500);}); var done = 300 * count;$(".btn").delay(done).animate({opacity: 1},  500);});} });
	$(".intro.end6").typewrite({  'wholeDelay': (startText.length + nameText2.length) * 140, 'callback': function() { $(".links").animate({opacity: 1}, 250, function() { var count = 0;   $(".links > a").each(function(index) { count++;$(this).delay(index * 300).animate({opacity: 1}, 500);}); var done = 300 * count;$(".btn").delay(done).animate({opacity: 1},  500);});} });
	$(".intro.end7").typewrite({  'wholeDelay': (startText.length + nameText2.length) * 150, 'callback': function() { $(".links").animate({opacity: 1}, 250, function() { var count = 0;   $(".links > a").each(function(index) { count++;$(this).delay(index * 300).animate({opacity: 1}, 500);}); var done = 300 * count;$(".btn").delay(done).animate({opacity: 1},  500);});} });
	$(".intro.end8").typewrite({  'wholeDelay': (startText.length + nameText2.length) * 160, 'callback': function() { $(".links").animate({opacity: 1}, 250, function() { var count = 0;   $(".links > a").each(function(index) { count++;$(this).delay(index * 300).animate({opacity: 1}, 500);}); var done = 300 * count;$(".btn").delay(done).animate({opacity: 1},  500);});} });
	$(".intro.end9").typewrite({  'wholeDelay': (startText.length + nameText2.length) * 170, 'callback': function() { $(".links").animate({opacity: 1}, 250, function() { var count = 0;   $(".links > a").each(function(index) { count++;$(this).delay(index * 300).animate({opacity: 1}, 500);}); var done = 300 * count;$(".btn").delay(done).animate({opacity: 1},  500);});} });
	$(".intro.end10").typewrite({ 'wholeDelay': (startText.length + nameText2.length) * 180, 'callback': function() { $(".links").animate({opacity: 1}, 250, function() { var count = 0;   $(".links > a").each(function(index) { count++;$(this).delay(index * 300).animate({opacity: 1}, 500);}); var done = 300 * count;$(".btn").delay(done).animate({opacity: 1},  500);});} });
	$(".intro.end11").typewrite({ 'wholeDelay': (startText.length + nameText2.length) * 190, 'callback': function() { $(".links").animate({opacity: 1}, 250, function() { var count = 0;   $(".links > a").each(function(index) { count++;$(this).delay(index * 300).animate({opacity: 1}, 500);}); var done = 300 * count;$(".btn").delay(done).animate({opacity: 1},  500);});} });
	$(".intro.end12").typewrite({ 'wholeDelay': (startText.length + nameText2.length) * 200, 'callback': function() { $(".links").animate({opacity: 1}, 250, function() { var count = 0;   $(".links > a").each(function(index) { count++;$(this).delay(index * 300).animate({opacity: 1}, 500);}); var done = 300 * count;$(".btn").delay(done).animate({opacity: 1},  500);});} });
	$(".intro.end13").typewrite({ 'wholeDelay': (startText.length + nameText2.length) * 210, 'callback': function() { $(".links").animate({opacity: 1}, 250, function() { var count = 0;   $(".links > a").each(function(index) { count++;$(this).delay(index * 300).animate({opacity: 1}, 500);}); var done = 300 * count;$(".btn").delay(done).animate({opacity: 1},  500);});} });
	// $(".intro.end14").typewrite({ 'wholeDelay': (startText.length + nameText2.length) * 1, 'callback': function()   { $(".links").animate({opacity: 1}, 250, function() { var count = 0;   $(".links > a").each(function(index) { count++;$(this).delay(index * 300).animate({opacity: 1}, 500);}); var done = 300 * count;$(".btn").delay(done).animate({opacity: 1},  500);});} });
	$(".intro").show().css({opacity: 1}); 
};

var checkEl = () => {
	const selector = "#about";
	var top_of_element = $(selector).offset().top;
	var bottom_of_element = $(selector).offset().top + $(selector).outerHeight();
	var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
	var top_of_screen = $(window).scrollTop();

	if (!wasTriggered && (bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)) {
		startTypewriter();
		wasTriggered = true;
		var squbaDude = $(".squbaDude");
		squbaDude.css({display: "inline-block"});
		squbaDude.addClass("squbaDudeR");
	}
};

var checkElCall = () => { 
	checkEl(); 
	navbarToggleOnScroll();
};

window.onscroll = throttle(checkElCall, 500);

function throttle(func, delay) {
  let timeout = null;
  return function(...args) { if (!timeout) { timeout = setTimeout(() => { func.call(this, ...args); timeout = null }, delay) }}
}

/**================================================== *
 * ================  initializations ================ *
 * ================================================== */

 var context;
 
 window.onload = function() {
    history.scrollRestoration = "manual";
};

 function onLoad() {
	//  const root = document.querySelector(':root');
	//  document.addEventListener('mousemove', (e) => { root.style.setProperty('--x', e.clientX + 'px');root.style.setProperty('--y', e.clientY + 'px');});
	 let images = document.querySelectorAll(".lazyload");
	 removeLoadingPacman();
	 init({ duration: 500, once: true, startEvent: 'load', });
	 addNavigation();
	 checkProjBar();
	 lazyload(images);
 }

onLoad();

function removeLoadingPacman() { document.getElementById("loadingOverlay").remove();}
function checkProjBar() { 
    const projectsIDs = ["proj1", "proj2", "proj3", "proj4", "proj5", "proj6", "proj7", "proj8", "proj9", "proj10", "proj11"]; 
    projectsIDs.forEach(proj => { addWaypoint(proj, {".revealEl": "revealProjAni",}); });
}

/* * waypoints will make  * the animations run after  * you scroll the elements  * in view  */
function addWaypoint(elName, classPairs = {
	".revealEl": "revealElAnimation",
	".coverSpan": "coverSpanAnimation"
}) {
	const element = document.getElementById(elName);
	new Waypoint({
		element: element,
		handler: (direction) => {
			var eventClass;
			for (eventClass of Object.keys(classPairs)) {
				const elements = element.querySelectorAll(eventClass);
				elements.forEach(el => { el.classList.add(classPairs[eventClass]); });
			}
		},
		offset: "90%"
	});
}

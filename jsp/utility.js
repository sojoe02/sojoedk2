// Event functions from http://www.quirksmode.org/js/eventSimple.html
var addEventSimple = function(el, evt, fn) {
    if (el.addEventListener) {
        el.addEventListener(evt, fn, false);
    } else if (el.attachEvent) {
        el.attachEvent('on' + evt, fn);
    }
};
// alias
var addEvent = addEventSimple;

// Add/remove/has class functions from http://snipplr.com/view/3561/addclass-removeclass-hasclass/
var hasClass = function(ele,cls) {
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

var addClass = function(ele,cls) {
    if (!hasClass(ele,cls)) {
        ele.className += " " + cls;
    }
}

var removeClass = function(ele,cls) {
    if (hasClass(ele,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className = ele.className.replace(reg,' ');
    }
}

// getElementsByClass function from ddiaz
var getElementsByClass = function(searchClass,node,tag) {
    var classElements = [];
    if (!node) {
        node = document;
    }
    if (!tag) {
        tag = '*';
    }
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
    for (i = 0, j = 0; i < elsLen; i++) {
        if (pattern.test(els[i].className)) {
            classElements[j] = els[i];
            j++;
        }
    }
    return classElements;
};

function ajaxFunction(){
    var ajaxRequest;  // The variable that makes Ajax possible!
	
    try{
        // Opera 8.0+, Firefox, Safari
        ajaxRequest = new XMLHttpRequest();
    } catch (e){
        // Internet Explorer Browsers
        try{
            ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try{
                ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e){
                // Something went wrong
                alert("Your browser broke!");
                return false;
            }
        }
    }
    // Create a function that will receive data sent from the server
    ajaxRequest.onreadystatechange = function(){
        if(ajaxRequest.readyState == 4){
            document.myForm.time.value = ajaxRequest.responseText;
        }
    }
    ajaxRequest.open("GET", "serverTime.php", true);
    ajaxRequest.send(null); 
}



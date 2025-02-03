window.addEventListener('scroll', function() {
    var div = document.getElementById('content');
    var divRect = div.getBoundingClientRect();
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var divTop = divRect.top + scrollTop;
    var myP = document.getElementById('miDiv');
 
   console.info('response 1:',window.scrollY.toFixed() + "px", 'response 2:',document.documentElement.scrollTop.toFixed() + "px" )
 
   console.log('scrollTop:', scrollTop.toFixed() + "px");
 
    console.log("divRect:", divRect);
    console.log("divRect-width:", divRect.width.toFixed() + "px");
    
    console.log("Posición superior del div:", divTop.toFixed() + "px");
 
 
   var jsonStr = JSON.stringify(divRect, null, 2);
   myP.innerText = jsonStr;
   if(div) {
    console.log(true);
   } else {
    console.log(false);
   }
 
});
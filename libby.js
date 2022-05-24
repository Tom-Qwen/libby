/* Working Title - Libby - expansion on lib, short for libary. - spelling is now *Libi*

Libby is a WIP Webflow Library built by Tom Qwen. 

/* To do list -  CMS Next & Previous Buttons, Table of Contents, word counter,
Mirror Click Events, Copy input value to span, Basic local memory, Social Share Buttons (pull from Recent Crypto), 
import content from other pages - possibly widgets?, remember tab when switching page? (memory), redirect

// Send & receive data needs to have a multiple case use catch, unsure whats the best way to handle it, thinking a seperate data attribute. 

/* Core Features */
// Store url parameters
window.onload = function() {

try {
	      
  var url_string = (window.location.href).toLowerCase();
  var url = new URL(url_string);

} catch (err) {
	      
  console.log("Issues with Parsing URL Parameter's - " + err);
	      
}
	
// Debugging mode.
	
let debug = false;
	
if (url.searchParams.get("debug")) {
	
   debug = true; 
		
   console.log('Debugger Mode Enabled. . . ')
		
} 

/* CMS Tools */
	
// CMS Combine
	
// CMS Slider
	
let does_cmsSlider = document.querySelectorAll('[does="cms-slider"]');
	
if (does_cmsSlider.length) {
	
   if (debug) { console.log('CMS Sliders detected. . . ') }
	 
   for (var i = 0; i < does_cmsSlider.length; i++) {
	
	   var sliderMask = does_cmsSlider[i].parentNode.querySelector('.w-slider-mask');
	   
	   var cloneSlide = sliderMask.querySelector('.w-slide').cloneNode();
	   
	   sliderMask.innerHTML = '';
	   	   
	   var cmsItems = does_cmsSlider[i].querySelectorAll('.w-dyn-item');
	   
	   for (var s = 0; s < cmsItems.length; s++) {
                        
                var slide = cloneSlide.cloneNode(true);
		   
                slide.innerHTML = '';
                slide.classList.add('w-slide');
                slide.innerHTML = cmsItems[s].innerHTML;

                sliderMask.appendChild(slide);

             }

   }

}
	
// CMS Next/Previous Buttons

/* E-Commerce */

// Direct add to cart link for prodcuts. 
// Add the URL parameter '?add-to-cart=true'

if (url.searchParams.get("add-to-cart")) {
		
   if (debug) { console.log('Automatically adding product to cart... ') }
		
   if (document.querySelector('[does="add-to-cart"]')) {
		    
       document.querySelector('[does="add-to-cart"]').click();
		   
   } else if (debug) { console.log('Add to cart button not found') }
		
} else {
		
   if (debug) { console.log('URL parameter missing.') }
		 
}

// Empty Cart
// Add attrbiute 'does=empty-cart' to button.
	
let does_emptyBtn = document.querySelectorAll('[does="empty-cart"]')
	
if (does_emptyBtn.length) {
		
   if (debug) { console.log('Empty cart button(s) found') }
	 
   for (var i = 0; i < does_emptyBtn.length; i++) {
	   	   
       does_emptyBtn[i].addEventListener('click', function() {
	       
	    if (debug) { console.log('Clearing cart... ') }
	       
	    var wf_removeItems = document.querySelectorAll('[data-wf-cart-action="remove-item"]');
	       
	    for (var x = 0; x < wf_removeItems.length; x++) {
		    
	       wf_removeItems[x].click();

	       if (debug) { var r = x + 1; console.log('Product row ' + r + ' removed from cart... ') }

	    }
	       
	    if (debug) { console.log('Cart emptied.') }
	       
       }) 
	       	       
   }
	   
   }
	
// Add All Items to Cart.
// This work by placing the does="add-all-to-cart on a button that directly share a parent with the collection list wrapper of the targeted products. 
	
let does_addAllCart   =  document.querySelectorAll('[does="add-all-to-cart"]')

if (does_addAllCart.length) {
	
	if (debug) { console.log('Add all to cart button detected') }

	for (var i = 0; i < does_addAllCart.length; i++) {
				
		does_addAllCart[i].addEventListener('click', function() {
			
			if (debug) { console.log('Adding all items to cart') }
			
			var addToCartButtons = this.parentNode.querySelectorAll('.w-commerce-commerceaddtocartbutton');
			
			console.log(addToCartButtons)
			
			for (var z = 0; z < addToCartButtons.length; z++) {
				
				addToCartButtons[z].click();
				
			}
			
			if (debug) { console.log('All items have been added to the cart.') }
			
		});

	}
	
}
	
/* Housekeeping */
	
// Article read time
	// Refactor for understanding 
	// Use count for letter counter too, letter counter will be targetable and mutliple per page.
	
let does_readTime        = document.querySelector('[does="measure-read-time"]');
let does_displayReadTime = document.querySelector('[does="display-read-time"]');

function cleanText(e) {
	
    ret = "";
	
    var length = e.childNodes.length;
	
    for(var i = 0; i < length; i++) {
	    
        var node = e.childNodes[i];
	    
        if(node.nodeType != 8) {
		
            ret += node.nodeType != 1 ? node.nodeValue : cleanText(node);
		
        }
	    
    }
	
    return ret;
	
}
    
var words = cleanText(does_readTime);
var count = words.split(' ').length;
	
if (does_displayReadTime) { does_displayReadTime.textContent = Math.round(count / 200).toFixed(); }

	
// Copy input to span
		
// Mirror Click Events
	// does-mirror=1 & does-reflection=1 etc... 
	
// Mirror Input Events
	
// Table of Contents
	
// Display current year. 
		
let does_displayYear = document.querySelectorAll('[does="display-year"]')

if (does_displayYear.length) {
	
   if (debug) { console.log('Current year request(s) [' + does_displayYear.length + '] detected on page. . .') }
	
   for (var i = 0; i < does_displayYear.length; i++) {
	   
      does_displayYear[i].textContent = new Date().getFullYear();
	   
      if (debug) { console.log('Year applied.'); }
	   
   }
	
   if (debug) { console.log('Current year requests completed.'); }
	
} 

// Count items
// Apply 'does=count-items' to the parent of the items to count. 
// Apply 'does="count-items-result' to a text element or span for the result, this is required. 
	
let does_countItems        =  document.querySelectorAll('[does="count-items"]')
let does_countItemsResult  =  document.querySelectorAll('[does="count-items-result"]')

if (does_countItemsResult.length) {
	
   if (debug) { console.log('Count items [' + does_countItems.length + '] detected on page. . .') }
	
   for (var i = 0; i < does_countItemsResult.length; i++) {
	   	   
      var does_countItemsParent = does_countItemsResult[i].parentElement;
	           
      var total = does_countItemsParent.querySelector('[does="count-items"]').childNodes.length;
	   
      does_countItemsResult[i].innerHTML = total;
	   	   
      if (debug) { console.log('Items counted.'); }
	   
   }
	
   if (debug) { console.log('Items counts completed.'); }
	
} 

// Send & receive data
// Requests two data attributes assinged to the button.
// does-send-data = "Your data here" & does-send-to="unquie ID here"
// The unuqie ID should match the ID given to the receving element. 
	
let does_sendsData           =  document.querySelectorAll('[does-send-data]')

if (does_sendsData.length) {

	for (var i = 0; i < does_sendsData.length; i++) {
		
		does_sendsData[i].addEventListener('click', function() {
			
			var dataTarget = this.getAttribute('does-send-to');
			
			console.log(dataTarget)
			
			var dataTargetElement = document.getElementById(dataTarget);
			
			if (dataTargetElement.nodeName == 'INPUT') {
			
			   dataTargetElement.value = this.getAttribute('does-send-data');
			
			} else {
				
			   dataTargetElement.textContent = this.getAttribute('does-send-data');

			}
			
		})
		
	}

}
	
// Social share buttons
	
// Word counter

/* Memory */


	
}

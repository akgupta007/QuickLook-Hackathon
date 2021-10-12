async function getWordDictionary (text) {
    //console.log('payload', text);
    try{
        const response = await fetch ('https://quicklookservice.azurewebsites.net/api/Glossary', {
            method: 'POST',
            body: JSON.stringify(text),
        });
        try{
            //console.log(response);
            if(response.ok){
                var dummy = '';
                //response.json()
                dummy = await response.json();
                /*.then((data)=>{
                    console.log('DATA', data);
                    dummy = data;//return data;
                })*/
                //console.log('DUMMY', dummy);
                return dummy;
            }
            else {
                console.log('CASE 1');
                return null;
            }
        }catch(e) {
            console.log('CASE 2');
            return null;
        }
    }catch(err){
        console.log('CASE 3');
        return null;
    }
};
jQuery.extend({
    // highlight: function (node, className) {
    //     if (node.nodeType === 3) {
    //         var reg = new RegExp("/(use)/", "i");
    //         var match = node.data.match();
    //         if (match) {
    //             var highlight = document.createElement(nodeName || 'span');
    //             var tooltipWrap = document.createElement('div'); //creates div
    //             tooltipWrap.className = 'tooltiptext';
    //             var textContent = document.createTextNode("I am here")
    //             tooltipWrap.appendChild(textContent)
                
    //             highlight.className = className || 'highlight';
    //             var wordNode = node.splitText(match.index);
    //             wordNode.splitText(match[0].length);
    //             var wordClone = wordNode.cloneNode(true);
    //             highlight.appendChild(wordClone);

    //             console.log("HERE!")
    //             highlight.appendChild(tooltipWrap);
            
    //             // highlight.addEventListener('mouseover', function () {
    //             //     tooltipWrap.classList.add('active');
    //             // });
    //             wordNode.parentNode.replaceChild(highlight, wordNode);
    //             return 1; //skip added node in parent
    //         }
    //     }
        highlight: async function (node, className) {
        if (node.nodeType === 3) {
            var response  = await getWordDictionary(node.data);
           // console.log('RESPONSE', response);
            response?.forEach(element => {
                if(element.term!== ""){
                    var text = element.term;
                    var definition = element.definitions[0];
                    var data1 = node.data;
                    data1.toLowerCase();
                    var text1 = text;
                    text1.toLowerCase();
                    var match = data1.toLowerCase().search(text1.toLowerCase());
                
                    var highlight = document.createElement(/*nodeName ||*/ 'span');
                    var tooltipWrap = document.createElement('div'); //creates div
                    tooltipWrap.className = 'tooltiptext';
                    tooltipWrap.id = 'tooltiptext'+text;
                    var textHeadingDiv = document.createElement('div'); 
                    var textHeading = document.createTextNode(text + " :")
                    textHeadingDiv.appendChild(textHeading)
                    textHeadingDiv.className = 'itemheading';
                    tooltipWrap.appendChild(textHeadingDiv)

                    var sectionSeparator = document.createElement('hr');
                    sectionSeparator.className = 'sectionseparator';
                    tooltipWrap.appendChild(sectionSeparator)

                    var textDescriptionDiv = document.createElement('div'); 
                    var textDescription = document.createTextNode(definition)
                    textDescriptionDiv.appendChild(textDescription)
                    textDescriptionDiv.className = 'itemdescription';
                    tooltipWrap.appendChild(textDescriptionDiv)

                    var footerDiv = document.createElement('div')
                    var footer = document.createTextNode("source : MS Glossary")
                    footerDiv.appendChild(footer)
                    footerDiv.className = 'itemheading';
                    tooltipWrap.appendChild(footerDiv)

                    highlight.className = className || 'highlight';
                    highlight.id = 'highlight'+text;
                    if(match!== -1){
                    var wordNode = node.splitText(match);
                    wordNode.splitText(text.length);
                    var wordClone = wordNode.cloneNode(true);
                    highlight.appendChild(wordClone);
                    highlight.appendChild(tooltipWrap);
                    highlight.addEventListener('mouseover', function () {
                        var tooltip = document.getElementById('tooltiptext'+text);
                        
                        var highlightText = document.getElementById('highlight'+text)
                        var rect = highlightText.getBoundingClientRect();
                        var left = rect.left.toString()
                        left = left.split(".")[0];
                        console.log(left)
                        //tooltip.setAttribute('style', 'left: '+left +' !important');  
                        tooltip.setAttribute('style', 'visibility: visible !important;');    
                        
                    });
                    highlight.addEventListener('mouseout', function () {
                    var tooltip = document.getElementById('tooltiptext'+text);
                    tooltip.setAttribute('style', 'visibility: hidden !important');  
                    });
                    wordNode.parentNode.replaceChild(highlight, wordNode);
                    node = highlight.nextSibling;
                    }//return 1;

                }
            });

        } else if ((node.nodeType === 1 && node.childNodes) && // only element nodes that have children
                !/(script|style)/i.test(node.tagName)) { // skip if already highlighted
            for (var i = 0; i < node.childNodes.length; i++) {
                jQuery.highlight(node.childNodes[i], className);
            }
        }
        return 0;
    }
});

jQuery.fn.unhighlight = function () {
    console.log("UNHighlight called");
    return 1;
};

jQuery.fn.highlight = function (className) {
    console.log("Highlight Called");
    console.log(this);
    return this.each(function () {
        jQuery.highlight(this, className);
    });
};

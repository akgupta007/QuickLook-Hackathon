jQuery.extend({
    highlight: function (node, className) {
        if (node.nodeType === 3) {
            console.log(node.textContent);
            return 1; //skip added node in parent
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

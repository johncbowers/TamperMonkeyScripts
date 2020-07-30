// ==UserScript==
// @name         Canvas Hide Right-Hand Navigation Button
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Sometimes the right hand navigation in Canvas is problematic. This adds a button to the top right of Canvas to toggle the navigation.
// @author       You
// @match        https://canvas.jmu.edu/courses/*
// @grant        none
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    // If div#right-side-wrapper is not visible, then there's no point in having the button.
    if ($("div#right-side-wrapper").is(":visible")) {
        const controlDiv = $("<div></div>");
        const hideNavigationButton = $("<button class=\"btn btn-primary\">Hide Navigation</button>");

        controlDiv.css("right", "1em");
        controlDiv.css("top", "1em");
        controlDiv.css("zIndex", "1000");
        controlDiv.css("position", "fixed");

        hideNavigationButton.click(function () {
            $("div#right-side-wrapper").toggle();
            if (!$("div#right-side-wrapper").is(":visible")) {
                hideNavigationButton.text("Show Navigation");
            } else {
                hideNavigationButton.text("Hide Navigation");
            }
        });

        controlDiv.append(hideNavigationButton);
        $("body").append(controlDiv);
    }

})();

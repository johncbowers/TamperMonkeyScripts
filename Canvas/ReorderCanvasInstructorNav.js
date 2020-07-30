// ==UserScript==
// @name         Reorder Canvas Instructor Navigation
// @namespace    http://cs.jmu.edu/
// @version      1.0
// @description  Reorders the Canvas course navigation for an instructor to show visible navigation (what students see) first followed by all the hidden navigation conveniently tucked behind an exapandable button.
// @author       John C. Bowers
// @match        https://canvas.jmu.edu/courses/*
// @grant        none
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Grab the visible and hidden list items.
    const visible_li = $("ul#section-tabs li:not(.section-hidden)");
    const hidden_li = $("ul#section-tabs li.section-hidden");

    // Text for the hidden navigation toggle button.
    const hidden_collapse_txt = "Hidden Nav [-]";
    const hidden_expand_txt = "Hidden Nav [+]";

    // Create the hidden navigation toggle button
    var hidden_nav_btn = $("<li><br><h4 id=\"TM-HiddenNavText\">" + hidden_expand_txt + "</h4></li>");
    hidden_nav_btn.css("cursor", "pointer");

    // Register the toggle button's click handler
    hidden_nav_btn.click(function (e) {
        if ($("h4#TM-HiddenNavText").text() == hidden_collapse_txt) {
            $("h4#TM-HiddenNavText").text(hidden_expand_txt);
        } else {
            $("h4#TM-HiddenNavText").text(hidden_collapse_txt);
        }
        hidden_li.toggle();
    });

    // Clear the list of all navigation
    $("ul#section-tabs").html("");

    // Add back first the visible navigation items, then the hidden toggle button, then the hidden navigation items.
    $("ul#section-tabs").append(visible_li);
    $("ul#section-tabs").append(hidden_nav_btn);
    $("ul#section-tabs").append(hidden_li);

    // Hide the hidden navigation items.
    hidden_li.toggle();
})();

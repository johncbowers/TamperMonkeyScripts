// ==UserScript==
// @name         Canvas Roster Sorting Options
// @namespace    http://w3.cs.jmu.edu/bowersjc/
// @version      0.1
// @description  Adds a button to the Canvas roster to make the table sortable. Note that this will only sort the part of the roster that Canvas has loaded. Scroll to the bottom before clicking to sort entire roster. Why doesn't Canvas include this by default? No idea.
// @author       John C. Bowers
// @match        https://canvas.jmu.edu/courses/*/users
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $("<a class=\"btn btn-primary pull-right\" style=\"margin-left:1em;\">Make Table Sortable</a>").insertBefore("a#addUsers").click(
      function (e) {
          //$("table.roster thead tr th").each(function(i) { if (i != 0) { $(this).html("<a>" + $(this).html() + "</a>").click(function (e) {alert("hi");}); } });

          const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

          const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
                                                    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
                                                   )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

          // do the work...document.querySelector("table.roster tbody").querySelectorAll("tr")
          document.querySelectorAll('table.roster thead tr th').forEach(th => th.addEventListener('click', (() => {
              const table = th.closest('table').querySelector("tbody");
              Array.from(table.querySelectorAll('tr'))
                  .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
                  .forEach(tr => table.appendChild(tr) );
          })));
      }
    );

})();
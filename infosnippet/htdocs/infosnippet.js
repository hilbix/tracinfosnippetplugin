// Copyright starts below.
//
// Following part is NOT Copyrighted (free as free beer, free speech and free baby).
// This is NOT written to work in very ancient browsers.
'use strict';

jQuery(function($){

function e2clip(id, toast)
{
  console.log({id,toast});
  var el = document.getElementById(id);
  if (el) innertext2clip(el, toast);
}

function innertext2clip(el, toast)
{
  const show = _ => { toast.addClass(_); setTimeout(() => toast.removeClass(_), 5000) }
  const ok = () => show('copyok');

  var text = el.innerText;
  console.log(`:copy:\n${text}`);

  if (navigator.clipboard)
    navigator.clipboard.writeText(text).then(ok, () => show('copyko'));
  else
    {
      fail();
      return;
      CopyToClipboard(text);
      ok();
    }
}

var url = window.location.href.split('#').shift();

CreateBox(url);
CreateNav();

$('pre').each(function()
  {
    const self = this;
    $('<button class="copybutton"/>').on('click', function(ev)
       {
         innertext2clip(self, $(this));
         ev.preventDefault();
         ev.stopPropagation();
         return false;
       }).appendTo(this);
  });

navigator.permissions.query({ name:'clipboard-write' }).catch(_ => console.log(`clipboard-write not supported: ${_}`));
console.log('here');

// Following code has only been modified, so it is still copyrighted:
//
// TRAC TicketInfo-Plugin
//
// Copyright (C) 2021 Clemens
// All rights reserved.
//
// Note: Changes of Valentin Hilbig are free to use.
//
// This software is licensed as described in the file COPYING, which
// you should have received as part of this distribution.

var tooltip = 'Copy info snippet text to clipboard';

// create a "Info" context navigation menu item at top of page. It will copy to clipboard.
function CreateNav()
{
  if ($('#infosnippet-nav').length) return;
  if (info.navoption!=='all' && info.navoption!=='ticket' && info.navoption!=='wiki') return;

  var $navbutton = $('<li/>');
  $("#ctxtnav ul li:first").after($navbutton);

  var a = $("<a>")
    .attr('href', "#infosnippet")
    .attr('id', 'infosnippet-nav')
    .attr("title", tooltip)
    .text("Info")
    .appendTo($navbutton);

 $navbutton.click(() => { e2clip('infosnippet-text', a); return false });
}

// Create a "Info Snippet" box at bottom of page
function CreateBox (url,ack,tooltip) {

  var $box, $info;

  if ($('div.ticket').length){

    if ($('#infosnippet').length ) return; // skip if already exists

    // The "Ticket Info" box.
    $box = $('<fieldset>')
      .attr('id','infosnippet')
      .addClass('ticket');

    // Hide the box unless enabled in the config.
    // Note that we need the box (invisible or not), because want to copy its content to the clipboard.
    $box.hide();
    if (info.boxoption=='all') { $box.show(); }
    if (info.boxoption=='ticket') { $box.show(); }

    $('<legend>').text('Ticket Info').appendTo($box);

    // the actual info snippet text
    $info= $('<pre>')
      .attr('id','infosnippet-text')
      .append(info.projectname + ' Ticket #' + info.ticketid + '\n'+ info.ticketsummary + '\n')
      ;

    // The fieldset is inserted right after the ticket properties
    $("div.ticket #properties").after($box);
  }
  else if ($('#content.wiki').length){

    if ($('#infosnippet').length ) return; // skip if already exists

    $box = $('<div>')
      .attr('id','infosnippet')
      .addClass('wiki');

    // Hide the box unless enabled in the config.
    // Note that we need the box (invisible or not), because want to copy its content to the clipboard.
    $box.hide();
    if (info.boxoption=='all') { $box.show(); }
    if (info.boxoption=='wiki') { $box.show(); }

    // the actual info snippet text
    $info= $('<pre>')
      .attr('id','infosnippet-text')
      .append(info.projectname + ' ' + info.page + '\n')
      ;

    // search for the first head line in this page
    const headline=$('#content.wiki .wikipage :header');
    if(headline.length){$info.append(headline[0].innerText+'\n');}

    // The infobox is inserted right after the ticket properties
    $("#content.wiki #attachments").append($box);
  }
  else {
    return;
  }

  $info.appendTo($box);
  // URL of current page is part of the info snippet text.
  $("<a>")
    .attr('href',url)
    .append(url)
    .appendTo($info);
}

function CopyToClipboard(text)
{
  var dummy= document.createElement('textarea')
  dummy.id = 'temp_element';
  dummy.style.height = 0;
  dummy.style.border = 0;
  dummy.value = text;
  document.body.appendChild(dummy);
  document.getElementById("temp_element").select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
}

});

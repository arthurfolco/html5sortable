describe('Testing ghost creation methods', function(){
// testing ghost creation functions
  var assert = require('chai').assert;
  GLOBAL.document = require('jsdom').jsdom('<html lang="en-US"></html>');
  GLOBAL.window = GLOBAL.document.defaultView;
  GLOBAL.$ = GLOBAL.jQuery = require('../node_modules/jquery/dist/jquery.js');
  var sortable = require("../src/html.sortable.src.js");
  $('body').html('').append('<ul class="sortable"><li>item</li></ul>');
  // moch dragged item
  var dItem = $('<li>dItem Test</li>');
  dItem.offset = function(){
    return {
      left: 5,
      top: 5
    }
  };
  // mock event
  var e = {
    pageX: 100,
    pageY: 200,
    dataTransfer: {
      text: undefined,
      item: undefined,
      x: undefined,
      y: undefined,
      setData: function(type, val){
        e.dataTransfer[type] = val;
      },
      setDragImage: function(item, x, y){
        e.dataTransfer.item =item;
        e.dataTransfer.x = x;
        e.dataTransfer.y = y;
      }
    }
  };

  it('sets the dataTransfer options correctly', function(){
    sortable.__testing._attachGhost(e, {
      item: 'test-item',
      x: 10,
      y: 20
    });

    assert.equal(e.dataTransfer.effectAllowed, 'move');
    assert.equal(e.dataTransfer.text, '');
    assert.equal(e.dataTransfer.item, 'test-item');
    assert.equal(e.dataTransfer.x, 10);
    assert.equal(e.dataTransfer.y, 20);
  });

  it('sets item correctly from dragged item', function(){
    var ghost = sortable.__testing._makeGhost(dItem);
    assert.equal(dItem[0].innerHTML, 'dItem Test');
  });

  it('sets x & y correctly', function(){
    var ghost = sortable.__testing._addGhostPos(e, {
      item: 'test-item',
      draggedItem: dItem
    });

    assert.equal(ghost.x, 95);
    assert.equal(ghost.y, 195);
  });

  it('uses provided x & y correctly', function(){
    var ghost = sortable.__testing._addGhostPos(e, {
      item: 'test-item',
      draggedItem: dItem,
      x: 10,
      y: 20
    });

    assert.equal(ghost.x, 10);
    assert.equal(ghost.y, 20);
  });

  it('attaches ghost completly', function(){
    sortable.__testing._getGhost(e, dItem);

    assert.equal(e.dataTransfer.effectAllowed, 'move');
    assert.equal(e.dataTransfer.text, '');
    assert.equal(e.dataTransfer.item, dItem[0]);
    assert.equal(e.dataTransfer.x, 95);
    assert.equal(e.dataTransfer.y, 195);
  });
});
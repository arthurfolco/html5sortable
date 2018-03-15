/* global describe,test,expect */
import setDragImage from '../src/setDragImage'
import {mockInnerHTML} from './helpers'

describe('Testing setDragImage', () => {

  document.body.innerHTML = mockInnerHTML

  class DragEvent extends Event {
    constructor(name, data) {
      this.dataTransfer = {
        effectAllowed: 'fake',
        setDragImage: () => {}
      }
    }
    get() {
      return this
    }
  }

  test('No event provided', () => {
    expect(() => { setDragImage(null, null, null) }).toThrowError('setDragImage requires a DragEvent as the first argument.')
  })

  test('No element provided', () => {
    // setup
    let event = new DragEvent('dragstart')
    // assert
    expect(() => { setDragImage(event, null, null) }).toThrowError('setDragImage requires the dragged element as the second argument.')
  })

  test('Event does not support Drag', () => {
    // setup
    let event = new DragEvent('dragstart')
    // remove setDragImage to simulate no support
    delete event.dataTransfer.setDragImage
    // execute
    setDragImage(event, document.querySelector('.li-first'), null)
    // assert
    expect(event.dataTransfer.effectAllowed).not.toEqual('copyMove')
  })

  test('Event supports Drag', () => {
    let event = new DragEvent('dragstart')
    setDragImage(event, null, null)
    expect(event.dataTransfer.effectAllowed).toEqual('copyMove')
  })

  // let body = document.querySelector('body')
  //
  // body.innerHTML = `<ul class="sortable"><li class="first">dragged item</li><li>item 2</li></ul>`
  //
  // // mock dragged item
  // let draggedItem = body.querySelector('.first')
  // draggedItem.getClientRects = () => {
  //   return [{
  //     left: 5,
  //     top: 5
  //   }]
  // }
  // // mock event
  // let e = {
  //   pageX: 100,
  //   pageY: 200,
  //   dataTransfer: {
  //     text: undefined,
  //     draggedItem: undefined,
  //     x: undefined,
  //     y: undefined,
  //     setData: function (type, val) {
  //       e.dataTransfer[type] = val
  //     },
  //     setDragImage: function (draggedItem, x, y) {
  //       e.dataTransfer.draggedItem = draggedItem
  //       e.dataTransfer.x = x
  //       e.dataTransfer.y = y
  //     },
  //     effectAllowed: ''
  //   }
  // }
  //
  // test('sets the dataTransfer options correctly (_attachGhost)', () => {
  //   sortable.__testing._attachGhost(e, {
  //     draggedItem: 'test-item',
  //     x: 10,
  //     y: 20
  //   })
  //
  //   expect(e.dataTransfer.effectAllowed).toEqual('copyMove')
  //   expect(e.dataTransfer.text).toEqual('arbitrary-content')
  //   expect(e.dataTransfer.draggedItem).toEqual('test-item')
  //   expect(e.dataTransfer.x).toEqual(10)
  //   expect(e.dataTransfer.y).toEqual(20)
  // })
  //
  // test('sets item correctly from dragged item (_makeGhost)', () => {
  //   let ghost = sortable.__testing._makeGhost(draggedItem)
  //   expect(ghost.draggedItem.innerHTML).toEqual(draggedItem.innerHTML)
  // })
  //
  // test('sets x & y correctly (_addGhostPos)', () => {
  //   let ghost = sortable.__testing._addGhostPos(e, {
  //     draggedItem: draggedItem
  //   })
  //
  //   expect(ghost.x).toEqual(95)
  //   expect(ghost.y).toEqual(195)
  // })
  //
  // test('uses provided x & y correctly (_addGhostPos)', () => {
  //   let ghost = sortable.__testing._addGhostPos(e, {
  //     draggedItem: draggedItem,
  //     x: 10,
  //     y: 20
  //   })
  //
  //   expect(ghost.x).toEqual(10)
  //   expect(ghost.y).toEqual(20)
  // })
  //
  // test('attaches ghost completely (_getGhost)', () => {
  //   sortable.__testing._getGhost(e, draggedItem)
  //
  //   expect(e.dataTransfer.effectAllowed).toEqual('copyMove')
  //   expect(e.dataTransfer.text).toEqual('arbitrary-content')
  //   expect(e.dataTransfer.draggedItem).toEqual(draggedItem)
  //   expect(e.dataTransfer.x).toEqual(95)
  //   expect(e.dataTransfer.y).toEqual(195)
  // })
})

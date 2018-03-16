/**
 * Created by Aashish on 5/15/2017.
 */
!function () {
  'use strict';

  function scramble() {
    var i, pieceImages = [];

    for (i = 1; i < 42; i++) {
      pieceImages.push(i);
    }

    // for (i = 0; i < pieceImages.length; i++) { // shuffle array
    //   var random = Math.floor(Math.random() * (pieceImages.length - 1)) + 1;
    //   pieceImages[i] = pieceImages.splice(random, 1, pieceImages[i])[0]; // shuffles every time
    // }

    var docFragment = document.createDocumentFragment();

    for (i = 0; i < pieceImages.length; i++) {
      var id = pieceImages[i].toString();
      var img = document.createElement('img');
      img.id = id;
      img.src = 'images/piece-' + id + '.png';
      img.classList.add('piece');
      img.setAttribute('draggable', '');
      docFragment.appendChild(img);
    }

    document.getElementById('pieces').appendChild(docFragment);
  }

  function addDragListeners() {
    var dragged;

    document.addEventListener('dragstart', function( event ) {
      dragged = event.target;
    });

    document.addEventListener('dragover', function( event ) {
      event.preventDefault();
    });

    document.addEventListener('drop', function( event ) {
      event.preventDefault();
      var target = event.target;
      var classList = target.classList;

      if (classList.contains('piece')) {
        target = event.target.parentNode;
        classList = target.classList;
      }

      if (classList.contains('puzzle__piece-dropzone')) {
        if (target.children.length) {
          domUtility.swapElements(dragged, target.children[0])
        } else {
          dragged.parentNode.removeChild( dragged );
          target.appendChild( dragged );
        }
      } else if (classList.contains('pieces')) {
        dragged.parentNode.removeChild( dragged );
        target.appendChild( dragged );
      }
    });
  }

  window.addEventListener('load', function () {
    scramble();
    addDragListeners();
  });
}();
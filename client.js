const ICON = {
  light: './icon.svg',
  dark: './icon.svg'
};

function openCardPopup(t) {
  return t.popup({
    title: 'Print Card Barcode',
    url: './print-card.html',
    height: 360,
  });
}

function openListPopup(t) {
  return t.popup({
    title: 'Print List Barcode',
    url: './print-list.html',
    height: 360,
  });
}

window.TrelloPowerUp.initialize({
  'card-buttons': function (t) {
    return [{
      icon: ICON,
      text: 'Print Barcode',
      condition: 'edit',
      callback: openCardPopup,
    }];
  },

  'list-actions': function (t) {
    return [{
      text: 'Print List Barcode…',
      callback: openListPopup,
    }];
  },
});

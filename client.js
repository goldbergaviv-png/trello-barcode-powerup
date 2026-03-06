window.TrelloPowerUp.initialize({
  'card-buttons': function (t) {
    return [{
      icon: './icon.png',
      text: 'Print Barcode',
      callback: function (t) {
        return t.popup({
          title: 'Print Card Barcode',
          url: './popup.html?mode=card',
          height: 260
        });
      }
    }];
  },

  'list-actions': function (t) {
    return [{
      text: 'Print List Barcode',
      callback: function (t) {
        return t.popup({
          title: 'Print List Barcode',
          url: './popup.html?mode=list',
          height: 260
        });
      }
    }];
  }
});

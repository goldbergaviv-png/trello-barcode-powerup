window.TrelloPowerUp.initialize({
  'card-buttons': function (t) {
    return [{
      icon: {
        dark: './icon.png',
        light: './icon.png'
      },
      text: 'Print Barcode',
      callback: function (t) {
        return t.popup({
          title: 'Print Card Barcode',
          url: './index.html?mode=card',
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
          url: './index.html?mode=list',
          height: 260
        });
      }
    }];
  }
});

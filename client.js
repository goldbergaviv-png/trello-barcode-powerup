window.TrelloPowerUp.initialize({
  'card-buttons': function (t) {
    return [{
      icon: './icon.png',
      text: 'Print QR',
      callback: function (t) {
        return t.popup({
          title: 'Print Card QR',
          url: './popup.html?v=12&mode=card',
          height: 700
        });
      }
    }];
  },
  'list-actions': function (t) {
    return [{
      text: 'Print List QR',
      callback: function (t) {
        return t.list('id', 'name').then(function(list) {
          const url =
            './popup.html?v=12&mode=list' +
            '&listId=' + encodeURIComponent(list.id) +
            '&listName=' + encodeURIComponent(list.name || '') +
            '&ts=' + Date.now();
          return t.popup({
            title: 'Print List QR',
            url: url,
            height: 700
          });
        });
      }
    },
    {
      text: 'Print ALL Card QRs',
      callback: function (t) {
        return t.popup({
          title: 'Print All Card QRs',
          url: './popup.html?v=12&mode=allcards&ts=' + Date.now(),
          height: 700
        });
      }
    }];
  }
});

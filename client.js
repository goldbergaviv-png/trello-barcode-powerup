window.TrelloPowerUp.initialize({
  'card-buttons': function (t) {
    return [{ icon: './icon.png', text: 'Print Barcode', callback: function (t) {
      return t.popup({ title: 'Print Card Barcode', url: './popup.html?v=9&mode=card', height: 700 });
    }}];
  },
  'list-actions': function (t) {
    return [
      { text: 'Print List Barcode', callback: function (t) {
        return t.list('id', 'name').then(function(list) {
          const url = './popup.html?v=9&mode=list' +
            '&listId=' + encodeURIComponent(list.id) +
            '&listName=' + encodeURIComponent(list.name || '') +
            '&ts=' + Date.now();
          return t.popup({ title: 'Print List Barcode', url: url, height: 700 });
        });
      }},
      { text: 'Print ALL Card Barcodes', callback: function (t) {
        return t.popup({ title: 'Print All Card Barcodes', url: './popup.html?v=9&mode=allcards&ts=' + Date.now(), height: 700 });
      }}
    ];
  },
  'board-buttons': function (t) {
    return [{ icon: './icon.png', text: 'Scanner Tools', callback: function (t) {
      return t.popup({ title: 'Scanner Tools', url: './export.html?v=9&ts=' + Date.now(), height: 560 });
    }}];
  }
});
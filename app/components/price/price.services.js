(function () {
  'use strict';

  var serviceId = 'priceService';

  angular.module('myApp').factory(serviceId, function priceService($http, $filter) {
    var self = this;

    self.cardItems = [
      {
        id: 1
        , title: 'Заголовок карточки'
        , price: '$200'
        , options: ['Опция один', 'Опция два', 'Третья опция', 'Четыре четыре', 'Опачки а тут и пять', 'Контрольная опция']
      }, {
        id: 2
        , title: 'Заголовок номер два'
        , price: '2.000.000'
        , options: ['Опция один', 'Опция два', 'Третья опция', 'Четыре четыре', 'Опачки а тут и пять', 'Контрольная опция']
      }, {
        id: 3
        , title: 'Карточка последняя'
        , price: '$2500'
        , options: ['Опция один', 'Опция два', 'Третья опция', 'Четыре четыре', 'Опачки а тут и пять', 'Контрольная опция']
      }
    ];

    function getItem(itemId) {
      if (itemId) {
        var result = $filter('filter')(self.cardItems, {
          id: itemId
        }, true);
      }

      return result;
    }

    function saveItem(item) {
      if (item) {
        var existingItem = getItem(item.id);

        if (existingItem) {
          existingItem.title = item.title;
          existingItem.price = item.price;
          existingItem.options = item.options;
        } else {
          self.cardItems.push(item);
        }
      }
    };

    function deleteItem(itemId) {
      if (self.cardItems.length) {
        var index = self.cardItems.map(function (item) {
          return item.id;
        }).indexOf(itemId);

        if (index > -1) {
          self.cardItems.splice(index, 1);
        }
      }
    };

    return {
      cardItems: self.cardItems
      , getItem: getItem
      , saveItem: saveItem
      , deleteItem: deleteItem
    }
  });
})();
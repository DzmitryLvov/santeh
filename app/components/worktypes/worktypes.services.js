(function () {
  'use strict';

  var serviceId = 'workTypesService';

  angular.module('myApp').factory(serviceId, function workTypesService(_, priceService, galleryService, $http, $filter) {
    var self = this;

    function getData() {
      var data = [
        {
          id: 1
          , urlText: 'a'
          , thumbSrc: 'assets/img/house-1.svg'
          , thumbText: 'Раздел'
          , titleText: 'Название раздела'
          , description: '<p>Душевые кабины составляют достойную конкуренцию стандартной ванне. Прежде всего, потому, что принять душ намного быстрее, чем ванну, и при этом расходуется до пяти раз меньший объем воды. При этом, душевые кабины намного гигиеничнее – в них не скапливается грязь, остатки мыла, геля для душа, поскольку все это уходит в канализацию совместно с водой. Огромным достоинством душевой кабины считается и то, что она незаменима в малогабаритных помещениях, где установить полноценную ванну невозможно.</p><p>Душевые кабины представлены моделями с закрытой и открытой конструкцией, из которых потребители предпочитают выбирать закрытые, многофункциональные боксы. Они отличаются по размерам, материалу изготовления, форме, комплектации, функционалу, цене, поэтому покупатели всегда могут подобрать то, что им нужно. Самыми востребованными считаются кабины квадратных, прямоугольных, полукруглых форм. Они подходят для монтажа и в углу помещения, и вдоль свободной стены.</p><p>Душевые кабины представлены моделями с закрытой и открытой конструкцией, из которых потребители предпочитают выбирать закрытые, многофункциональные боксы. Они отличаются по размерам, материалу изготовления, форме, комплектации, функционалу, цене, поэтому покупатели всегда могут подобрать то, что им нужно. Самыми востребованными считаются кабины квадратных, прямоугольных, полукруглых форм. Они подходят для монтажа и в углу помещения, и вдоль свободной стены.</p>'
          , notesText: 'примечание'
          , imageSrc: 'http://c2.staticflickr.com/8/7075/27000238684_176bdcbaf3_z.jpg'
      }, {
          id: 2
          , urlText: 'b'
          , thumbSrc: 'assets/img/7-poloten.svg'
          , thumbText: 'Раздел 2'
          , titleText: 'Название раздела 2'
          , description: 'описание раздела'
          , imageSrc: 'http://c2.staticflickr.com/8/7075/27000238684_176bdcbaf3_z.jpg'
      }, {
          id: 3
          , urlText: 'c'
          , thumbSrc: 'assets/img/8-smesitel.svg'
          , thumbText: 'Раздел 3'
          , titleText: 'Название раздела 3'
          , description: 'описание раздела'
          , imageSrc: 'http://c2.staticflickr.com/8/7075/27000238684_176bdcbaf3_z.jpg'
      }, {
          id: 3
          , urlText: 'd'
          , thumbSrc: 'assets/img/10-dush.svg'
          , thumbText: 'Раздел 3'
          , titleText: 'Название раздела 3'
          , description: 'описание раздела'
          , imageSrc: 'http://c2.staticflickr.com/8/7075/27000238684_176bdcbaf3_z.jpg'
      }];

      _.map(data, function (item) {
        if (item) {
          if (item.id) {
            item.priceItems = priceService.getPriceItemsByWorkTypeId(item.id);
            item.photos = galleryService.getPhotoListByWorkTypeId(item.id);
          }
        }
      });

      return data;
    };

    function getTypeById(id) {
      if (id) {
        var data = getData();
        var result = $filter('filter')(data, {
          id: id
        }, true);
      }

      return result;
    }

    return {
      getData: getData
      , getTypeById: getTypeById
    };
  });
})();
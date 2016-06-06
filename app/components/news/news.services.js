(function () {
  'use strict';

  var serviceId = 'newsService';

  angular.module('myApp').factory(serviceId, function newsService($http, $filter) {
    var preparedData = [];

    var factory = {
      getPostList: getPostList
      , getPost: getPost
    };

    function getPostList() {
      if (preparedData.length) {
        return preparedData;
      } else {
        var options = {
          year: 'numeric'
          , month: 'long'
          , day: 'numeric'
          , weekday: 'long'
        };

        preparedData = [
          {
            id: 1
            , title: 'Post title 1'
            , date: new Date('12/12/15')
            , previewText: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты."
            , text: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана. Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми необходимыми правилами. Эта парадигматическая страна, в которой жаренные члены предложения залетают прямо в рот. Даже всемогущая пунктуация не имеет власти над рыбными текстами, ведущими безорфографичный образ жизни."
        }, {
            id: 2
            , title: 'Post title 2'
            , date: new Date('11/11/15')
            , previewText: "Однажды одна маленькая строчка рыбного текста по имени Lorem ipsum решила выйти в большой мир грамматики."
            , text: "Однажды одна маленькая строчка рыбного текста по имени Lorem ipsum решила выйти в большой мир грамматики. Великий Оксмокс предупреждал ее о "
        }, {
            id: 3
            , title: 'Post title 3'
            , date: new Date('10/6/15')
            , previewText: "Он собрал семь своих заглавных букв, подпоясал инициал за пояс и пустился в дорогу."
            , text: "Он собрал семь своих заглавных букв, подпоясал инициал за пояс и пустился в дорогу. Взобравшись на первую вершину курсивных гор, бросил он последний взгляд назад, на силуэт своего родного города Буквоград, на заголовок деревни Алфавит и на подзаголовок своего переулка Строчка."
        }, {
            id: 4
            , title: 'Post title 4'
            , date: new Date('9/8/15')
            , previewText: "Взобравшись на первую вершину курсивных гор, бросил он последний взгляд назад"
            , text: "Он собрал семь своих заглавных букв, подпоясал инициал за пояс и пустился в дорогу. Взобравшись на первую вершину курсивных гор, бросил он последний взгляд назад, на силуэт своего родного города Буквоград, на заголовок деревни Алфавит и на подзаголовок своего переулка Строчка."
        }];
      }

      function formatDate(element, index, array) {
        element.formattedDate = element.date.toLocaleDateString("ru", options);
        return true;
      }

      preparedData.every(formatDate);

      return preparedData;
    };

    function getPost(postId) {
      if (!preparedData.length) {
        getPostList();
      }

      var id = parseInt(postId);

      if (id) {
        var result = $filter('filter')(preparedData, {
          id: id
        }, true);
      }

      return result;
    };

    return factory;
  });
})();
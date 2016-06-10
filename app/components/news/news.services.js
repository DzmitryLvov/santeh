(function () {
  'use strict';

  var serviceId = 'newsService';

  angular.module('myApp').factory(serviceId, function newsService($http, $filter) {
    var self = this;

    var options = {
      year: 'numeric'
      , month: 'long'
      , day: 'numeric'
      , weekday: 'long'
    };

    self.preparedData = [
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

    function formatDate(element, index, array) {
      element.formattedDate = element.date.toLocaleDateString("ru", options);
      return true;
    }

    self.preparedData.every(formatDate);

    function getPost(postId) {
      if (!self.preparedData.length) {
        //getPostList();
      }

      var id = parseInt(postId);

      if (id) {
        var result = $filter('filter')(self.preparedData, {
          id: id
        }, true);
      }

      return result;
    };

    function savePost(post) {
      if (post) {
        var existingPost = getPost(post.id);
        if (!existingPost) {
          post.date = Date.today();
          console.log(post.date);
          post.formattedDate = post.date.toLocaleDateString("ru", options);

          self.preparedData.push(post)
        } else {
          existingPost.title = post.title;
          existingPost.previewText = post.previewText;
          existingPost.text = post.text;
          existingPost.date = post.date;
        }
      }
    };

    function deletePost(postId) {
      var post = getPost(postId);

      if (post) {
        var index = self.preparedData.map(function (element) {
          return element.id;
        }).indexOf(postId);

        if (index > -1) {
          self.preparedData.splice(index, 1);
        }
      }
    };

    return {
      preparedData: self.preparedData
      , getPost: getPost
      , savePost: savePost
      , deletePost: deletePost
    }
  });
})();
(function () {
  'use strict';

  var serviceId = 'articleService';

  angular.module('myApp').factory(serviceId, ['$filter', '$firebaseArray', function articleService($filter, $firebaseArray) {
    var self = this;

    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    };

    self.preparedData = [];

    function getArticles() {
      var ref = firebase.database().ref().child('Articles');
      self.preparedData = $firebaseArray(ref);
      self.preparedData.every(formatDate);

      return self.preparedData;
    };

    function formatDate(element, index, array) {
      element.formattedDate = element.date.toLocaleDateString("ru", options);
      return true;
    };

    function getPost(postId) {
      if (!self.preparedData || !self.preparedData.length) {
        getArticles();
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
        }
        else {
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
      getArticles: getArticles,
      getPost: getPost,
      savePost: savePost,
      deletePost: deletePost
    }
  }]);
})();
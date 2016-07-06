angular.module('myApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/components/administration/views/about.administration.view.html',
    "<div text-angular ng-model=ctrl.aboutText></div><div class=about-panel-save-button><md-button class=\"md-raised button-wide\">Отменить</md-button><md-button class=\"md-raised md-primary button-wide\" ng-click=ctrl.saveAboutText()>Сохранить</md-button></div>"
  );


  $templateCache.put('app/components/administration/views/administration.view.html',
    "<md-content flex><div class=\"col-md-2 administration-menu-container\"><md-toolbar class=md-theme-light><h2 class=md-toolbar-tools><span>Панель управления</span></h2></md-toolbar><md-content><md-list><md-list-item class=\"md-3-line administration-menu-item\" ng-repeat=\"tab in ctrl.tabs\"><div class=item-text ng-click=ctrl.selectTab(tab) ng-class=\"{'active': tab.active}\">{{tab.title}}</div><md-divider></md-divider></md-list-item><md-list-item class=\"md-3-line administration-menu-item\"><div class=item-text ng-click=ctrl.logOut()>Выход</div><md-divider ng-if=!$last></md-divider></md-list-item></md-list></md-content></div><div class=col-md-10><div ng-include=ctrl.selectedTab.templateUrl></div></div></md-content>"
  );


  $templateCache.put('app/components/administration/views/articles.administration.view.html',
    "<div class=col-md-12><div class=table-responsive><table class=\"table table-hover\"><thead><tr><th>Id</th><th>Заголовок</th><th>Описание</th><th>Дата</th><th></th><th></th></tr></thead><tbody><tr ng-repeat=\"post in ctrl.postList\"><th class=col-md-1>{{post.id}}</th><td class=col-md-3>{{post.title}}</td><td class=col-md-4>{{post.previewText}}</td><td class=col-md-2>{{post.formattedDate}}</td><td class=col-md-2><section layout=row layout-align=\"center center\"><md-button class=\"md-primary groupX left\" ng-click=\"ctrl.editPostDialog($event, post)\">Редактировать</md-button><md-button class=\"md-warn groupX right\" ng-click=\"ctrl.deletePost($event, post.id)\">Удалить</md-button></section></td></tr></tbody></table></div><md-button class=\"button-wide md-raised md-primary\" ng-click=ctrl.editPostDialog($event)>Добавить статью</md-button></div>"
  );


  $templateCache.put('app/components/administration/views/main.administration.view.html',
    "<div class=col-md-4><md-input-container md-no-float class=md-block><input ng-model=ctrl.mainInfo.phone placeholder=Телефон></md-input-container><md-input-container md-no-float class=md-block><input ng-model=ctrl.mainInfo.address placeholder=Адрес></md-input-container><md-input-container md-no-float class=md-block><input ng-model=ctrl.mainInfo.schedule placeholder=\"График работы\"></md-input-container><md-button class=\"md-raised md-primary button-wide\" ng-click=ctrl.saveMainInfo($event)>Сохранить</md-button></div>"
  );


  $templateCache.put('app/components/administration/views/newpost.administration.modal.html',
    "<md-dialog class=newpost-modal aria-label=\"Добавление новости\" ng-cloak><form><md-toolbar><div class=md-toolbar-tools><h2>Добавление новости</h2><span flex></span><md-button class=md-icon-button ng-click=ctrl.cancel()><i class=\"fa fa-times\"></i></md-button></div></md-toolbar><md-dialog-content><div class=md-dialog-content><md-input-container class=md-block flex-gt-xs><label>Заголовок</label><input ng-model=ctrl.post.title></md-input-container><md-input-container class=md-block flex-gt-xs><label>Описание</label><input ng-model=ctrl.post.previewText></md-input-container><div text-angular ng-model=ctrl.post.text></div></div></md-dialog-content><md-dialog-actions layout=row><span flex></span><md-button ng-click=ctrl.savePost()>Сохранить</md-button><md-button ng-click=ctrl.cancel()>Закрыть</md-button></md-dialog-actions></form></md-dialog>"
  );


  $templateCache.put('app/components/administration/views/price.administration.view.html',
    "<div class=price-list-container><div class=container><div class=price-list-title><h2>Редактирование прайс листа</h2></div><section class=price-plans><div class=col-md-4 ng-repeat=\"item in ctrl.priceList | limitTo: 3 \"><md-card><md-card-title><md-card-title-text><span class=md-headline>{{item.title}}</span></md-card-title-text></md-card-title><md-card-content><md-input-container><label>Заголовок</label><input ng-model=item.title></md-input-container><md-input-container><label>Цена</label><input ng-model=item.price></md-input-container><md-input-container ng-repeat=\"option in item.options\"><label>Элемент</label><input ng-model=option></md-input-container></md-card-content><md-card-actions layout=row layout-align=\"end center\"><md-button ng-click=ctrl.savePriceItem(item)>Сохранить</md-button></md-card-actions></md-card></div></section></div></div>"
  );


  $templateCache.put('app/components/administration/views/requests.administration.view.html',
    "<div class=request-panel-container><div class=\"col-md-4 request\" ng-repeat=\"request in ctrl.requestList | orderBy: request.id : true \"><md-card><md-card-title><md-card-title-text><span class=md-headline>{{request.title}}</span> <span class=md-subhead>{{request.date}}</span></md-card-title-text><md-card-icon-actions><md-button class=md-icon-button aria-label=toggle><md-menu><md-button aria-label=Опции class=md-icon-button ng-click=$mdOpenMenu($event)></md-button><md-menu-content width=4><md-menu-item><md-button ng-click=ctrl.deleteRequest(request.id)><span md-menu-align-target>Удалить</span></md-button></md-menu-item></md-menu-content></md-menu></md-button></md-card-icon-actions></md-card-title><md-card-content><p><span class=col-md-4>Телефон:</span>{{request.phone}}</p><p><span class=col-md-4>Email:</span>{{request.email}}</p><p><span class=col-md-4>Комментарии:</span></p><div class=col-md-12><p>{{request.text}}</p></div></md-card-content></md-card></div></div>"
  );


  $templateCache.put('app/components/feedback/views/feedback.view.html',
    "<div class=container><div class=feedback-list-container><div class=\"add-feedback-container centered\"><md-button class=\"md-raised md-primary button-wide\" ng-click=ctrl.addFeedback($event)>Оставить отзыв</md-button></div></div><md-list flex><md-subheader class=md-no-sticky>Отзывы наших клиентов</md-subheader><md-list-item class=md-3-line ng-repeat=\"item in ctrl.feedbackList\"><div class=md-list-item-text layout=column><h3>{{ item.name }}</h3><h4>{{ item.rate }}</h4><p>{{ item.text }}</p></div></md-list-item><md-divider></md-divider></md-list></div>"
  );


  $templateCache.put('app/components/feedback/views/newfeedback.modal.html',
    "<md-dialog class=\"newfeedback-modal col-md-5\" aria-label=\"Обратная связь\" ng-cloak><form><md-toolbar><div class=md-toolbar-tools><h2>Добавление отзыва</h2><span flex></span><md-button class=md-icon-button ng-click=ctrl.cancel()><i class=\"fa fa-times\"></i></md-button></div></md-toolbar><md-dialog-content><div class=md-dialog-content><md-input-container class=md-block flex-gt-xs><label>Ваше имя</label><input ng-model=ctrl.newFeedback.name></md-input-container><md-input-container class=md-block flex-gt-xs><label>Оценка</label><input ng-model=ctrl.newFeedback.rating></md-input-container><md-input-container class=md-block><label>Напишите нам</label><textarea ng-model=trl.newFeedback.text rows=5></textarea></md-input-container></div></md-dialog-content><md-dialog-actions layout=row><span flex></span><md-button ng-click=ctrl.cancel()>Закрыть</md-button><md-button ng-click=ctrl.savePost()>Отправить</md-button></md-dialog-actions></form></md-dialog>"
  );


  $templateCache.put('app/components/gallery/views/gallery.view.html',
    "<div class=\"gallery-container container centered\"><div layout=row layout-xs=column layout-wrap><div class=image-container ng-repeat=\"item in ctrl.items\" flex-gt-xs=33><a href={{item.src}}><img ng-src={{item.src}} alt=\"\"></a></div></div></div>"
  );


  $templateCache.put('app/components/home/views/home.view.html',
    ""
  );


  $templateCache.put('app/components/login/views/login.view.html',
    "<div class=login-container><div layout=column class=\"login-box centered md-whiteframe-5dp\"><md-toolbar><h2 class=md-toolbar-tools><span>Вход</span></h2></md-toolbar><md-content layout=column class=md-padding><md-input-container><label>Логин</label><input ng-model=ctrl.userName /></md-input-container><md-input-container><label>Пароль</label><input type=password ng-model=ctrl.password /></md-input-container><div layout=row layout-align=\"center center\" class=button-panel><md-button href=\"\" md-no-ink=md-no-ink>Забыл пароль</md-button><div flex=flex><span class=message-text>{{ctrl.messageText}}</span></div><md-button class=\"md-raised md-primary\" ng-click=ctrl.login()>Войти</md-button></div></md-content></div></div>"
  );


  $templateCache.put('app/components/post/views/articles-preview.view.html',
    "<div class=\"news-block-container col-md-8 centered\" ng-controller=\"newsController as ctrl\"><div class=\"news-block-header col-md-12 row\"><span><h3><b>Новости</b></h3><a href=#/news ui-sref=news>Все</a></span></div><div class=\"news-block-content col-md-12 row\"><div class=col-md-4 ng-repeat=\"post in ctrl.postList | limitTo: 3\"><div class=post-date><span class=day>{{post.date.getDay()}}</span> {{post.date.getMonth()}}.{{post.date.getFullYear()}}</div><p class=post-title><a href=#/post/{{post.id}} ui-sref=\"post({postId: post.id})\">{{post.title}}</a></p><p class=post-text>{{post.previewText}}</p></div></div></div><div class=container></div>"
  );


  $templateCache.put('app/components/post/views/articles.view.html',
    "<div class=\"container centered news-list-container\"><div layout=row layout-sm=column layout-wrap><div flex-gt-xs=33 ng-repeat=\"post in ctrl.postList\"><md-card ui-sref=\"post({postId: post.id})\"><img ng-src=\" {{post.titlePhotoUrl}} \" class=md-card-image alt=\"Washed Out \"><md-card-title><md-card-title-text><span class=md-headline>{{post.title}}</span> <span class=md-subhead>{{post.formattedDate}}</span></md-card-title-text></md-card-title><md-card-content><p>{{post.previewText}}</p></md-card-content><md-card-actions layout=\"row \" layout-align=\"end center \"><md-button>Читать далее</md-button></md-card-actions></md-card></div></div></div>"
  );


  $templateCache.put('app/components/post/views/post.view.html',
    "<div class=container-fluid><div class=\"col-md-8 centered\"><div class=post-container><div class=post-header-text><h2>{{ctrl.post.title}}</h2><span class=post-formatted-date>{{ctrl.post.formattedDate}}</span></div><div ng-bind-html=ctrl.post.text class=post-text></div></div></div></div>"
  );


  $templateCache.put('app/components/price/views/price.view.html',
    "<div class=price-list-container><div class=\"container center-block\"><div class=price-list-title><h2>Стоимость услуг и работ</h2></div><div class=price-list-content><div class=price-group ng-repeat=\"group in ctrl.priceGroups\"><div class=heading-text>{{group.title}}</div><table class=\"table table-hover table-responsive price-table\"><thead><tr><td>Название</td><td>Единицы</td><td>Цена</td></tr></thead><tbody><tr ng-repeat=\"priceItem in group\"><td class=col-md-8>{{priceItem.name}}</td><td class=col-md-2>{{priceItem.units}}</td><td class=col-md-2>{{priceItem.cost}}</td></tr></tbody></table>{{group.notesText}}</div></div></div></div>"
  );


  $templateCache.put('app/components/request/views/request.view.html',
    ""
  );


  $templateCache.put('app/components/worktypes/views/worktypes.view.html',
    "<div class=worktypes-container><div class=worktypes-tabs><div class=container><a href=#/works/{{tab.urlText}} class=worktype-tab ng-class=\"{'active': tab.active}\" ng-repeat=\"tab in ctrl.workTypes\"><div class=tab-icon><image src={{tab.thumbSrc}} alt=\"\"></image></div><div class=tab-title>{{tab.thumbText}}</div></a></div></div><div class=\"container worktypes-content\"><div class=heading-text>{{ctrl.selectedItem.titleText}}</div><div class=\"description-text clearfix\"><div class=\"worktype-image pull-left\"><a href=\"\"></a> <img src={{ctrl.selectedItem.imageSrc}} alt=\"\"></div><div ng-bind-html=ctrl.selectedItem.description></div></div><div class=heading-text>Стоимость</div><table class=\"table table-hover table-responsive price-table\"><thead><tr><td>Название</td><td>Единицы</td><td>Цена</td></tr></thead><tbody><tr ng-repeat=\"priceItem in ctrl.selectedItem.priceItems\"><td class=col-md-8>{{priceItem.name}}</td><td class=col-md-2>{{priceItem.units}}</td><td class=col-md-2>{{priceItem.cost}}</td></tr></tbody></table><div class=heading-text>Примеры работ</div><div class=gallery-photos layout=row layout-xs=column layout-wrap><div class=image-container ng-repeat=\"item in ctrl.selectedItem.photos | limitTo: 3\" flex-gt-xs=33><a href={{item.src}}><img ng-src={{item.src}} alt=\"\"></a></div></div></div></div>"
  );


  $templateCache.put('app/shared/404.html',
    "<div class=not-found-container><div class=\"not-found-text centered\"><h1>404</h1><p>Страница не найдена</p></div></div>"
  );


  $templateCache.put('app/shared/navbar.view.html',
    "<ul class=\"nav navbar-nav head\"><li><a href=/ ui-sref=home>Главная</a></li><li><a href=#/works ui-sref=works>Виды работ</a></li><li><a href=#/price ui-sref=price>Цены</a></li><li><a href=#/gallery ui-sref=gallery>Фото работ</a></li><li><a href=#/news ui-sref=articles>Статьи</a></li><li><a href=#/feedback ui-sref=feedback>Отзывы</a></li></ul>"
  );

}]);

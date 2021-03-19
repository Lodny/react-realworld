# Todo list

## 1. Get Global Feed

- GET : https://conduit.productionready.io/api/articles?limit=10&offset=0

## 2. Get Tags

- GET : https://conduit.productionready.io/api/tags

## 3. Get Profile

- GET : https://conduit.productionready.io/api/profiles/drinkjuice

## 4. Login

- POST : https://conduit.productionready.io/api/users/login

  - fail : 422 : {"errors":{"email or password":["is invalid"]}}
  - success : 200 :
  - {"user":{"id":150305,"email":"drinkjuice@naver.com","createdAt":"2021-03-17T06:01:41.772Z","updatedAt":"2021-03-17T06:03:07.454Z","username":"drinkjuice","bio":"hi...","image":null,"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTUwMzA1LCJ1c2VybmFtZSI6ImRyaW5ranVpY2UiLCJleHAiOjE2MjEyMzk2OTR9.KQ7Le1RwlA2dv1JA8AiY7HD9eaNBfwRa5zKsRZY8PYo"}}

  - Get Tags : https://conduit.productionready.io/api/tags
  - Get Feeds https://conduit.productionready.io/api/articles/feed?limit=10&offset=0
    - global : https://conduit.productionready.io/api/articles?limit=10&offset=0

## 5. Click Tag

- GET : https://conduit.productionready.io/api/articles?limit=10&offset=0&tag=SIDA

## 6. Tag list

<ul class="tag-list">
      <li class="tag-default tag-pill tag-outline ng-binding ng-scope" ng-repeat="tag in $ctrl.article.tagList">
        test
      </li>
      <li class="tag-default tag-pill tag-outline ng-binding ng-scope" ng-repeat="tag in $ctrl.article.tagList">
        fun
      </li><!-- end ngRepeat: tag in $ctrl.article.tagList --><li class="tag-default tag-pill tag-outline ng-binding ng-scope" ng-repeat="tag in $ctrl.article.tagList">
        jatha
      </li><!-- end ngRepeat: tag in $ctrl.article.tagList -->
    </ul>

## 7. Click username

- GET : profile : https://conduit.productionready.io/api/profiles/drinkjuice
- GET : articles : https://conduit.productionready.io/api/articles?author=drinkjuice&limit=5&offset=0
  - Favorite articles : https://conduit.productionready.io/api/articles?favorited=drinkjuice&limit=5&offset=0

```
  JSON :
  {
    "user":{
    "email": "drinkjuice@naver.com",
    "password": "djdc9397"
    }
  }
```

article

```
author: {username: "swo", bio: null, image: "https://static.productionready.io/images/smiley-cyrus.jpg", following: false}
body: "ghkgkgkgk"
createdAt: "2021-03-18T00:40:38.435Z"
description: "hgghkgk"
favorited: false
favoritesCount: 0
slug: "gkghkghkghkghkgh-4wionx"
tagList: []
title: "gkghkghkghkghkgh"
updatedAt: "2021-03-18T00:40:38.435Z"
```

<list-pagination total-pages="$ctrl.listConfig.totalPages" current-page="$ctrl.listConfig.currentPage" ng-hide="$ctrl.listConfig.totalPages <= 1" class="ng-isolate-scope"><nav>

  <ul class="pagination">

    <!-- ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) --><li class="page-item ng-scope active" ng-class="{active: pageNumber === $ctrl.currentPage }" ng-repeat="pageNumber in $ctrl.pageRange($ctrl.totalPages)" ng-click="$ctrl.changePage(pageNumber)">

      <a class="page-link ng-binding" href="">1</a>

    </li><!-- end ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) --><li class="page-item ng-scope" ng-class="{active: pageNumber === $ctrl.currentPage }" ng-repeat="pageNumber in $ctrl.pageRange($ctrl.totalPages)" ng-click="$ctrl.changePage(pageNumber)">

      <a class="page-link ng-binding" href="">49</a>

    </li><!-- end ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) --><li class="page-item ng-scope" ng-class="{active: pageNumber === $ctrl.currentPage }" ng-repeat="pageNumber in $ctrl.pageRange($ctrl.totalPages)" ng-click="$ctrl.changePage(pageNumber)">

      <a class="page-link ng-binding" href="">50</a>

    </li><!-- end ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) -->

  </ul>
</nav>
</list-pagination>

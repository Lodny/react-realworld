# 개 사진 랜덤

: http://dog.ceo/api/breeds/image/random

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
  - Your Feed : https://conduit.productionready.io/api/articles/feed?limit=10&offset=0-
  - global Feed : https://conduit.productionready.io/api/articles?limit=10&offset=0

## 5. Click Tag

- GET : https://conduit.productionready.io/api/articles?limit=10&offset=0&tag=SIDA

## 6. Tag list

## 7. Click username

- GET : profile : https://conduit.productionready.io/api/profiles/drinkjuice
- GET : articles : https://conduit.productionready.io/api/articles?author=drinkjuice&limit=5&offset=0
  - Favorite articles : https://conduit.productionready.io/api/articles?favorited=drinkjuice&limit=5&offset=0

## 8. Article

- GET : https://conduit.productionready.io/api/articles/${slug}

## 9. Click Pages

- GET : https://conduit.productionready.io/api/articles?limit=10&offset=${page \* 10}

## 10. Favorite

- POST : https://conduit.productionready.io/api/articles/this-is-a-title-x0qci9/favorite
- token,
  {"article":{"title":"This is a title","slug":"this-is-a-title-x0qci9","body":"This is a body of the article","createdAt":"2021-03-20T12:36:15.547Z","updatedAt":"2021-03-20T12:36:15.547Z","tagList":[],"description":"This is a description","author":{"username":"Harwick","bio":null,"image":"https://static.productionready.io/images/smiley-cyrus.jpg","following":false},"favorited":true,"favoritesCount":1}}

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

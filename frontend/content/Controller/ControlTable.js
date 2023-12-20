import * as api from "../Model/BookApiModel.js";

export const app = angular.module("App", []);
let page = 1;
const perPage = 20;

app.service("ErrorService", function ($rootScope) {
  var error = "";

  return {
    getErrors: function () {
      return error;
    },
    addError: function (message) {
      error = message;
    },
    clearErrors: function () {
      error = "";
    },
  };
});

app.service("sharedService", function ($rootScope) {
  this.reloadController = function (controllerName) {
    $rootScope.$broadcast("reloadController", {
      controllerName: controllerName,
    });
  };
});

app.service("dataService", function () {
  var sharedData = {
    books: [],
    otherData: "Some other value",
  };

  return {
    getBooks: function () {
      return sharedData.books;
    },
    setBooks: function (books) {
      sharedData.books = books;
    },
    getOtherData: function () {
      return sharedData.otherData;
    },
    setOtherData: function (value) {
      sharedData.otherData = value;
    },
  };
});

app.controller(
  "tableController",
  ($scope, $rootScope, dataService, sharedService) => {
    setData(dataService, sharedService);

    $rootScope.$on("reloadController", function (event, args) {
      $scope.$apply(() => {
        $scope.books = dataService.getBooks();
      });
    });
  }
);

app.controller(
  "pageSwappingController",
  ($scope, sharedService, dataService) => {
    $scope.next = async () => {
      let id = await api.getMaxId();
      if (id.max < page + perPage) {
        return;
      }
      page += perPage;
      setData(dataService, sharedService);
    };
    $scope.back = () => {
      if (page > 1) {
        page -= perPage;
      }
      setData(dataService, sharedService);
    };
  }
);

app.controller("visibilityController", ($scope) => {
  $scope.setVisibility = (name) => {
    let element = document.getElementById(name);
    let computedStyle = window.getComputedStyle(element);
    if (computedStyle.display == "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  };
});

export function setData(dataService, sharedService) {
  api
    .getAllBooks(page, perPage)
    .then((books) => {
      dataService.setBooks(books);
      sharedService.reloadController("tableController");
    })
    .catch((error) => {
      console.error("Error fetching books:", error);
    });
}

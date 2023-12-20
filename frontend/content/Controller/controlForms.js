import { app } from "./ControlTable.js";
import * as api from "../Model/BookApiModel.js";

app.controller("getController", ($scope, dataService, sharedService) => {
  $scope.error = "";

  $scope.genreData = {};
  $scope.getByGenre = () => {
    $scope.error = "";
    api.getAllGenre($scope.genreData.genre).then((books) => {
      if (books.length == 0) {
        $scope.$apply(() => {
          $scope.error = "There's no book with such genre";
        });
        return;
      }
      dataService.setBooks(books);
      sharedService.reloadController("tableController");
    });
  };

  $scope.authorData = {};
  $scope.getByAuthor = () => {
    $scope.error = "";
    api.getAllAuthor($scope.authorData.author).then((books) => {
      if (books.length == 0) {
        $scope.$apply(() => {
          $scope.error = "There's no book with such author";
        });
        return;
      }
      dataService.setBooks(books);
      sharedService.reloadController("tableController");
    });
  };

  $scope.idData = {};
  $scope.getById = () => {
    $scope.error = "";
    api.getById($scope.idData.id).then((books) => {
      if (books.length == 0) {
        $scope.$apply(() => {
          $scope.error = "There's no book with such id";
        });
        return;
      }
      dataService.setBooks(books);
      sharedService.reloadController("tableController");
    });
  };
});

app.controller("addController", ($scope, dataService, sharedService) => {
  $scope.bookToAdd = {};
  $scope.error = "";
  $scope.message = "";

  $scope.addBook = () => {
    $scope.error = "";
    $scope.message = "";
    api.getMaxId().then((id) => {
      $scope.bookToAdd.id = Number(id + 1);
      api.add($scope.bookToAdd).then((res) => {
        if (res.message == "Udało się dodać do bazy") {
          // $scope.$apply(() => {
          //   $scope.message = "Dodano pomyślnie";
          // });
          //sharedService.reloadController("tableController");
        } else {
          $scope.$apply(() => {
            $scope.error = "Nie udało się dodać";
          });
        }
      });
    });
  };

  $scope.bookToUpdate = {};
  $scope.updateBook = () => {
    $scope.error = "";
    $scope.message = "";
    if (!$scope.bookToUpdate.author) {
      $scope.bookToUpdate.author = "";
    }
    if (!$scope.bookToUpdate.genre) {
      $scope.bookToUpdate.genre = "";
    }
    console.log($scope.bookToUpdate);
    api.update($scope.bookToUpdate).then((res) => {
      console.log(res);
      if (res.message == "Zaktualizowano pomyślnie") {
        $scope.$apply(() => {
          $scope.message = res.message;
        });
      } else {
        $scope.$apply(() => {
          $scope.error = res.message;
        });
      }
    });
  };
});

app.controller("deleteController", ($scope, dataService, sharedService) => {
  $scope.message = "";
  $scope.error = "";

  $scope.deleteAllBooks = () => {
    $scope.message = "";
    $scope.error = "";
    api.deleteAll().then((res) => {
      if (res.message == "Usunięto pomyślnie") {
        $scope.$apply(() => {
          $scope.message = "Usunięto";
        });
      } else {
        $scope.$apply(() => {
          $scope.error = res.message;
        });
      }
    });
  };

  $scope.deleteById = () => {
    $scope.message = "";
    $scope.error = "";
    api.deleteId($scope.bookId).then(() => {
      if (res.message == "Usunięto pomyślnie") {
        $scope.$apply(() => {
          $scope.message = "Usunięto";
        });
      } else {
        $scope.$apply(() => {
          $scope.error = res.message;
        });
      }
    });
  };

  $scope.deleteByGenre = () => {
    $scope.message = "";
    $scope.error = "";
    api.deleteGenre($scope.bookGenre).then((res) => {
      if (
        res.message ==
        `Pomyślnie usunięto wszytskie książki z gatunku ${$scope.bookGenre}`
      ) {
        $scope.$apply(() => {
          $scope.message = `Usunięto pomyślnie książki z gatunku ${$scope.bookGenre}`;
        });
      } else {
        $scope.$apply(() => {
          $scope.error = res.message;
        });
      }
    });
  };
});

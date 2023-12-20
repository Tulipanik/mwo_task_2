import { app } from "./ControlTable.js";
import { TokenService } from "../Model/LoginApiModel.js";
import { URL } from "../Model/BookApiModel.js";

app.controller("loginController", ($scope) => {
  $scope.user = {};
  $scope.login = async () => {
    const success = await TokenService.saveToken($scope.user);

    if (success) {
      console.log("Login successful");
      window.location.href = "./viewer.html";
    } else {
      console.error("Login failed");
    }
  };
  $scope.register = () => {
    window.location.href = "./register.html";
  };
});

app.controller("registerController", ($scope) => {
  $scope.register = async () => {
    const endpoint = `${URL}register`;
    const metadata = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify($scope.user),
    };
    try {
      const response = await fetch(endpoint, metadata);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error saving token:", error);
      return false;
    }
  };
  $scope.login = () => {
    window.location.href = "./login.html";
  };
});

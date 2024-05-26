window.onload = function () {
  TranslateElement();
};

let login = document.getElementById("login");
let password = document.getElementById("password");

document.getElementById("logIn").onclick = function (e) {
  console.log(JSON.parse(localStorage.getItem("users")));
  let userArray = [];
  let isSearchUser = false;
  userArray = JSON.parse(localStorage.getItem("users"));
  // if (userArray != null && userArray.length == 0) {
  //   userArray = arrayUsers;
  // } else {
  //   if (userArray != null && userArray.length != 0) {
  //     console.log(userArray);
  //     if (login.value != "" && password.value != "") {
  //       isSearchUser = userArray.some(
  //         (user) =>
  //           (user.phone == login.value ||
  //             user.email == login.value ||
  //             user.nickname == login.value) &&
  //           user.password == password.value
  //       );
  //       if (isSearchUser) {
  //         if (document.referrer != null) {
  //           if (
  //             document.referrer.substring(23, document.referrer.length) ==
  //             "Autorization.html"
  //           ) {
  //             localStorage.setItem(
  //               "current-user",
  //               JSON.stringify(
  //                 userArray[
  //                   userArray.findIndex(
  //                     (user) =>
  //                       (user.phone == login.value ||
  //                         user.email == login.value ||
  //                         user.nickname == login.value) &&
  //                       user.password == password.value
  //                   )
  //                 ]
  //               )
  //             );
  //             window.location.href = "index.html";
  //           } else {
  //             localStorage.setItem(
  //               "current-user",
  //               JSON.stringify(
  //                 userArray[
  //                   userArray.findIndex(
  //                     (user) =>
  //                       (user.phone == login.value ||
  //                         user.email == login.value ||
  //                         user.nickname == login.value) &&
  //                       user.password == password.value
  //                   )
  //                 ]
  //               )
  //             );
  //              console.log(window.history.back());

  //           }
  //         } else {
  //           window.location.href = "index.html";
  //         }
  //       } else {
  //         document.getElementById("myModal").style.display = "block";
  //       }
  //     }
  //   }
  // }

  // Проверяем, есть ли массив userArray и не пустой ли он
  if (userArray === null || userArray.length === 0) {
    // Если массив пустой, то назначаем ему значение массива arrayUsers
    userArray = arrayUsers;
  } else {
    // Если массив не пустой, то выводим его в консоль
    console.log(userArray);

    // Получаем значения полей логина и пароля
    const { value: login } = document.getElementById("login");
    const { value: password } = document.getElementById("password");

    // Проверяем, заполнены ли поля логина и пароля
    if (login !== "" && password !== "") {
      // Ищем пользователя в массиве userArray
      const isSearchUser = userArray.some(
        (user) =>
          (user.phone === login ||
            user.email === login ||
            user.nickname === login) &&
          user.password === password
      );

      if (isSearchUser) {
        // Если пользователь найден, то сохраняем его данные в localStorage
        const currentUser = userArray.find(
          (user) =>
            (user.phone === login ||
              user.email === login ||
              user.nickname === login) &&
            user.password === password
        );
        localStorage.setItem("current-user", JSON.stringify(currentUser));

        // Если предыдущей страницей была Autorization.html, то переходим на index.html
        if (document.referrer.endsWith("Autorization.html")) {
          window.location.href = "index.html";
        } else {
          // Иначе возвращаемся на предыдущую страницу
          back();
        }
      } else {
        // Если пользователь не найден, то отображаем модальное окно
        document.getElementById("myModal").style.display = "block";
      }
    }
  }
};

document.getElementById("button-ok").onclick = function (e) {
  document.getElementById("myModal").style.display = "none";
};

login.onkeyup = function (e) {
  login.value = login.value.trim();
  changeSpan(login);
};

password.onkeyup = function (e) {
  password.value = password.value.trim();
  changeSpan(password);
};

function changeSpan(element) {
  if (element.value.length == 0) {
    element.nextElementSibling.style.display = "block";
  } else {
    element.nextElementSibling.style.display = "none";
  }
}

document.getElementById("Registration").onclick = function (e) {
  window.location.href = "Registration.html";
};

if (localStorage.getItem("dark")) {
  changeTheme();
}

function changeTheme() {
  document.querySelector("body").classList.toggle("dark-theme");
  if (document.body.classList.value == "dark-theme") {
    document.getElementById("manula-color").style.fill = "white";
    localStorage.setItem("dark", "dark");
  } else {
    document.getElementById("manula-color").style.fill = "black";
    localStorage.removeItem("dark");
  }
}

document.getElementById("button-theme").onclick = function (e) {
  changeTheme();
};

function goHome() {
  window.location.href = "index.html";
}

function back() {
  localStorage.setItem("history", window.history.state);
  window.location.href = window.referrer;
}

function TranslateElement() {
  if (window.location.hash.substring(1) == "ru") {
    document.getElementById("login").placeholder = "Телефон, почта или ник";
    document.getElementById("password").placeholder = "Пароль";
  }
}

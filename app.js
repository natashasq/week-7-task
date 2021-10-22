const statusBar = document.querySelector(".page__status-bar");
const progressBar = document.querySelector(".page__stats-bar-progress");
const money = document.querySelector("#money");
const backersCount = document.querySelector("#backersCount");
const iconHamburger = document.querySelector("#icon-hamburger");
const mobileNavigation = document.querySelector("#mobile-navigation");
const iconClose = document.querySelector("#icon-close");
const headerLogo = document.querySelector(".header__logo");

const modalWrapper = document.querySelector(".modal__wrapper");
const confirmationWrapper = document.querySelector(".confirmation__wrapper");
const confirmBtn = document.querySelector(".confirmation__btn");

const rewardCardBtns = document.querySelectorAll(".page__about-reward-btn");
const rewardCardBtnsArr = Array.from(rewardCardBtns);
const closeModalBtn = document.querySelector(".modal__icon-close");

const cardTitle = document.querySelectorAll(".modal__form-card-title-text");
const cardTitleArr = Array.from(cardTitle);
const checkmark1 = document.querySelector(".checkmark");

const radioBtns = document.querySelectorAll(".modal__form-card-checkmark");
const radioBtnsArr = Array.from(radioBtns);

const submitBtn = document.querySelectorAll(".modal__pledge-btn");
const submitBtnArr = Array.from(submitBtn);

const heroBtn = document.querySelector("#hero-btn");
const bookmarkBtn = document.querySelector("#bookmark-btn");

localStorage = window.localStorage;

//getData

(function () {
  if (!localStorage.getItem("money")) {
    return (money.innerHTML = "50,000");
  }
  if (!localStorage.getItem("backers")) {
    return (backersCount.innerHTML = "5,007");
  }

  money.innerHTML = localStorage.getItem("money");
  backersCount.innerHTML = localStorage.getItem("backers");
})();

(function () {
  if (
    !localStorage.getItem("bookmark") ||
    localStorage.getItem("bookmark") === "unclicked"
  ) {
    return bookmarkBtn.classList.remove("-clicked");
  }

  if (localStorage.getItem("bookmark") === "clicked") {
    return bookmarkBtn.classList.add("-clicked");
  }
})();

//display mobile navigation
iconHamburger.addEventListener("click", () => {
  console.log("bilo sta");
  iconHamburger.style.visibility = "hidden";
  headerLogo.style.visibility = "hidden";
  mobileNavigation.style.display = "flex";
  document.querySelector("html").style.overflow = "hidden";
});

iconClose.addEventListener("click", () => {
  iconHamburger.style.visibility = "visible";
  headerLogo.style.visibility = "visible";
  mobileNavigation.style.display = "none";
  document.querySelector("html").style.overflow = "auto";
});

//stats bar

const changeStatus = () => {
  if (parseFloat(money.innerHTML) <= 100000) {
    const progress = parseFloat(money.innerHTML).toFixed();
    progressBar.style.width = `${progress}%`;
    console.log(progressBar);
    return;
  }
  return (progressBar.style.width = "100%");
};

//open modal

const openModal = () => {
  rewardCardBtnsArr.forEach(btn => {
    btn.addEventListener("click", () => {
      modalWrapper.style.display = "flex";
    });
  });
};
const closeModal = () => {
  closeModalBtn.addEventListener("click", () => {
    modalWrapper.style.display = "none";
  });
};

//select modal

const selectModal = () => {
  cardTitleArr.forEach((titleOuter, i) => {
    titleOuter.addEventListener("click", function () {
      cardTitleArr.forEach((titleInner, j) => {
        const title = titleInner.parentElement;
        const card = title.parentElement;
        const subtitle = titleInner.nextElementSibling;
        if (card.classList.contains("-checkmark1")) {
          console.log(titleInner);
          titleInner.nextElementSibling.checked = false;
        }

        subtitle.nextElementSibling.checked = false;

        if (j != i) {
          const subtitle = cardTitleArr[j].nextElementSibling;
          const input = subtitle.nextElementSibling;
          input.checked = false;
          card.classList.add("-unchecked");
          card.classList.remove("-checked");
          if (card.nextElementSibling?.classList.contains("modal__pledge")) {
            card.nextElementSibling.style.display = "none";
          }
        }
      });

      const subtitle = this.nextElementSibling;
      const input = subtitle.nextElementSibling;
      const title = this.parentElement;
      const card = title.parentElement;
      input.checked = true;
      if (card.classList.contains("-checkmark1")) {
        const input = this.nextElementSibling;
        input.checked = true;
        card.classList.remove("-unchecked");
        card.classList.add("-checked-1");
      } else if (card.classList.contains("-inactive")) {
        console.log(card);
        input.checked = false;
        return;
      } else {
        card.classList.remove("-unchecked");
        card.classList.add("-checked");
        card.nextElementSibling.style.display = "flex";
      }
    });
  });
};

//select modal radio button
const selectModalRadioBtn = () => {
  radioBtnsArr.forEach((btnOuter, i) => {
    btnOuter.addEventListener("click", function () {
      radioBtnsArr.forEach((btnInner, j) => {
        const title = btnInner.parentElement;
        const card = title.parentElement;
        const input = btnInner.previousElementSibling;

        input.checked = false;

        if (j != i) {
          const input = radioBtnsArr[j].previousElementSibling;
          input.checked = false;
          card.classList.add("-unchecked");
          card.classList.remove("-checked");
          if (card.nextElementSibling?.classList.contains("modal__pledge")) {
            card.nextElementSibling.style.display = "none";
          }
        }
      });

      const input = this.previousElementSibling;
      const title = this.parentElement;
      const card = title.parentElement;
      input.checked = true;
      if (card.classList.contains("-checkmark1")) {
        input.checked = true;
        card.classList.remove("-unchecked");
        card.classList.add("-checked-1");
      } else if (card.classList.contains("-inactive")) {
        input.checked = false;
        return;
      } else {
        card.classList.remove("-unchecked");
        card.classList.add("-checked");
        card.nextElementSibling.style.display = "flex";
      }
    });
  });
};

//sumbit form

const sumbitForm = () => {
  submitBtnArr.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      modalWrapper.style.display = "none";
      confirmationWrapper.style.display = "flex";

      const inputWrapper = btn.previousElementSibling;
      const input = inputWrapper.lastChild.previousSibling;
      const addMoney = () => {
        const currentAmount = money.innerHTML;
        const currentAmountNo = currentAmount.replace(/\,/g, "");
        const newAmount = input.value;
        const newAmountNo = newAmount.replace(/\,/g, "");
        console.log(currentAmount);
        console.log(newAmountNo);

        let result = parseInt(currentAmountNo) + parseInt(newAmountNo);

        console.log(result);

        let resultString = result
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return resultString;
      };

      const countBackers = () => {
        const currentCount = backersCount.innerHTML;
        const currentCountNo = currentCount.replace(/\,/g, "");
        const newCount = parseInt(currentCountNo) + 1;

        let newCountString = newCount
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return newCountString;
      };
      const newMoney = addMoney();
      money.innerHTML = newMoney;
      localStorage.setItem("money", newMoney);
      const newCount = countBackers();
      localStorage.setItem("backers", newCount);
      backersCount.innerHTML = newCount;
      changeStatus();
    });
  });
};

//back to home
const backToHome = () => {
  confirmBtn.addEventListener("click", () => {
    confirmationWrapper.style.display = "none";
  });
};

//open modal on hero btn
const openModalHero = () => {
  heroBtn.addEventListener("click", () => {
    modalWrapper.style.display = "flex";
  });
};

//check bookmark

bookmarkBtn.addEventListener("click", () => {
  if (
    !localStorage.getItem("bookmark") ||
    localStorage.getItem("bookmark") === "clicked"
  ) {
    bookmarkBtn.classList.remove("-clicked");
    return localStorage.setItem("bookmark", "unclicked");
  }

  if (localStorage.getItem("bookmark") === "unclicked") {
    bookmarkBtn.classList.add("-clicked");
    return localStorage.setItem("bookmark", "clicked");
  }
});

selectModal();
selectModalRadioBtn();
openModal();
closeModal();
sumbitForm();
backToHome();
openModalHero();

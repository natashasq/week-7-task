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
const confirmBtn = document.querySelector('.confirmation__btn');

const rewardCardBtns = document.querySelectorAll(".page__about-reward-btn");
const rewardCardBtnsArr = Array.from(rewardCardBtns);
const closeModalBtn = document.querySelector(".modal__icon-close");

const checkmarks = document.querySelectorAll(".modal__form-card-checkmark");
const checkmarksArr = Array.from(checkmarks);
const checkmark1 = document.querySelector(".checkmark");

const submitBtn = document.querySelectorAll(".modal__pledge-btn");
const submitBtnArr = Array.from(submitBtn);

const changeStatus = () => {
  if (parseFloat(money.innerHTML) <= 100000) {
    const progress = parseFloat(money.innerHTML).toFixed();
    progressBar.style.width = `${progress}%`;
    console.log(progressBar);
    return;
  }
  return (progressBar.style.width = "100%");
};

//display modal

//display mobile navigation
iconHamburger.addEventListener("click", () => {
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
  checkmarksArr.forEach((checkmarkOuter, i) => {
    checkmarkOuter.addEventListener("click", function () {
      checkmarksArr.forEach((checkmarkInner, j) => {
        const title = checkmarkInner.parentElement;
        const card = title.parentElement;

        checkmarkInner.previousElementSibling.checked = false;

        if (j != i) {
          const input = checkmarksArr[j].previousElementSibling;
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
        card.classList.remove("-unchecked");
        card.classList.add("-card-modifier-1");
      } else if (card.classList.contains("-inactive")) {
        return;
      } else {
        card.classList.remove("-unchecked");
        card.classList.add("-checked");
        card.nextElementSibling.style.display = "flex";
      }
    });
  });
};

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

        let result = parseInt(currentAmountNo) + parseInt(newAmountNo);

        let resultString = result
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return resultString;
      };

      const countBackers = () => {
        const currentCount = backersCount.innerHTML;
        const currentCountNo = currentCount.replace(/\,/g, "");
        const newCount = parseInt(currentCount, 10);

        console.log(newCount)

        let newCountString = newCount
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return newCountString;
      };
      money.innerHTML = addMoney();
      backersCount.innerHTML = countBackers();
      changeStatus();
    });
  });
};

const backToHome = () => {
  confirmBtn.addEventListener('click', () => {
    confirmationWrapper.style.display = 'none';
  })
}

selectModal();
openModal();
closeModal();
sumbitForm();
backToHome();

// checkmark.addEventListener("click", () => {
//   const modalCard = checkmark.parentElement;

//   if (modalCard.classList.contains("-checkmark1")) {
//     modalCard.classList.add("-card-modifier-1");
//     return;
//   }
//   if (modalCard.classList.contains("-inactive")) {
//     return;
//   } else {
//     modalCard.classList.add("-card-modifier");
//     modalCard.nextElementSibling.style.display = "flex";
//     return;
//   }
// });
// });

// Global variables
const guessBtn = document.querySelector('input[type="submit"]');
const gearIcon = document.querySelector(".control > span");
const colors = document.querySelectorAll(".colors > div ");
const output = document.querySelector("#output");
let wordLength = document.querySelector("form #wordLength");
let tryBtn = document.querySelector(".tryAgain");
let tries = document.querySelector(".control > .try > span");
tries.innerHTML = 5;
let color = "";

window.onload = async () => {
  await fetch(`https://random-word-api.herokuapp.com/all`)
    .then((res) => res.json())
    .then((words) => {
      let arrOfWords = words;
      arrOfWords.forEach((w) => {
        return w.toLowerCase();
      });
      return arrOfWords;
    })
    .then((arrOfWords) => {
      let words = arrOfWords.filter((w) => {
        return w.length <= 5;
      });
      return words;
    })
    .then((arrOfWords) => {
      let randomWord = selectRandomWordFrom(arrOfWords).toLowerCase();
      // creat p elements according to randoword letters
      for (let i = 0; i < randomWord.length; i++) {
        let p = document.createElement("p");
        document.querySelector("#output").append(p);
      }
      // show numbers of letters in random Word
      let lettersNum = document.createElement("div");
      lettersNum.className = "lettersNum";
      lettersNum.innerText = randomWord.length;
      document.querySelector("#output").append(lettersNum);
      submitData(randomWord, arrOfWords);
      console.log(`The Word is : ${randomWord}`);
      return randomWord;
    })
    .then((randomWord) => genHint(randomWord))
    .catch((reason) => {
      console.log(Error(reason));
    })
    .finally(() => {
      document.querySelector(".k_loader").classList.add("none");
    });
};

// https://random-word-api.herokuapp.com/all
// https://random-words-api.vercel.app/word random word
// https://api.dictionaryapi.dev/api/v2/entries/en/hello

// get Color from local Storage
getColorInlocalStorage(localStorage.getItem("color"));

// set word legnth at input in wordLength
wordLength.innerText = guessBtn.parentElement.parentElement[0].value.length;
guessBtn.parentElement.parentElement[0].oninput = () => {
  wordLength.innerText = guessBtn.parentElement.parentElement[0].value.length;
};

// submit input Data
function submitData(randomWord, arrOfWords) {
  guessBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement[0].blur();
    if (
      e.target.parentElement.parentElement[0].value !== "" &&
      arrOfWords.includes(
        e.target.parentElement.parentElement[0].value.toLowerCase()
      )
    ) {
      document.querySelector("#output").classList.remove("animation");
      // check Word
      let word = e.target.parentElement.parentElement[0].value.trim();
      checkWord(word.toLowerCase(), randomWord);
    } else if (e.target.parentElement.parentElement[0].value === "") {
      e.target.parentElement.parentElement[0].setAttribute(
        "placeholder",
        "please write the word"
      );
    } else {
      document.querySelector("form > .alert").classList.add("active");
      setTimeout(() => {
        document.querySelector("form > .alert").classList.remove("active");
      }, 1000);
    }
  });
}

// select Random word form words array
function selectRandomWordFrom(words) {
  let wordIndex = Math.floor(Math.random() * words.length);
  for (let i = 0; i < words.length; i++) {
    if (i === wordIndex) {
      return words[i];
    }
  }
}

// check Word
function checkWord(word, randomWord) {
  let result = randomWord.split("");
  if (randomWord === word) {
    document.querySelector("#output").classList.add("animation");
    for (let i = 0; i < output.children.length - 1; i++) {
      output.children[i].innerText = randomWord[i];
      if (output.children[i].innerText !== "") {
        output.children[i].style.backgroundColor = "#0f0";
      } else {
        output.children[i].style.backgroundColor = "#e91e63";
      }
    }
  } else {
    for (let i = 0; i < result.length; i++) {
      if (word.includes(result[i]) && result.indexOf(result[i]) === i) {
        result[i] = result[i];
      } else {
        result[i] = "";
      }
    }

    // add New word To Page
    for (let i = 0; i < output.children.length - 1; i++) {
      output.children[i].innerText = result[i];
      if (output.children[i].innerText !== "") {
        output.children[i].style.backgroundColor = "#0f0";
      } else {
        output.children[i].style.backgroundColor = "#e91e63";
      }
    }

    // tries
    if (tries.innerHTML == 0) {
      tryBtn.classList.add("active");
      for (let i = 0; i < output.children.length - 1; i++) {
        output.children[i].innerText = randomWord[i];
        output.children[i].style.backgroundColor = "#e91e63";
        // reload when guess button
        guessBtn.addEventListener("click", () => {
          return false;
        });
        // reload when try Again button
        tryAgain();
      }
    } else {
      tries.innerHTML -= 1;
    }
  }
}

// add hint
async function genHint(randomWord) {
  await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector("form .hint").innerHTML = "";
      for (let i = 0; i < data[0].meanings.length; i++) {
        let hint = `(${data[0].meanings[i].partOfSpeech}) ${data[0].meanings[i].definitions[0].definition} `;
        let p = document.createElement("p");
        p.innerText = hint;
        document.querySelector("form .hint").appendChild(p);
      }
    })
    .catch((reason) => {
      console.log(Error(reason));
      document.querySelector("form .hint").innerHTML =
        "No hint for This Word please reload page";
    })
    .finally(() => {
      document.body.addEventListener("click", (e) => {
        if (
          e.target !== document.querySelector("form .hintBtn") &&
          e.target !== document.querySelector("form .hint") &&
          e.target !== document.querySelector("form .hint p")
        ) {
          document.querySelector("form .hint").classList.remove("show");
        }
      });

      // show hint text
      document.querySelector("form .hintBtn").addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector("form .hint").classList.add("show");
        document.querySelector("form .hint").focus();
        document
          .querySelector("form .hint")
          .addEventListener("click", () => {});
      });
    });
}

// try Again function
function tryAgain() {
  tryBtn.addEventListener("click", () => {
    location.reload();
  });
}

// change colors
gearIcon.addEventListener("click", () => {
  gearIcon.parentElement.classList.toggle("active");
  colors.forEach((c) => {
    c.addEventListener("click", (e) => {
      document.documentElement.style.setProperty(
        "--main-color",
        e.target.dataset.color
      );
      gearIcon.parentElement.classList.remove("active");
      // set Color in local Storage
      setColorInlocalStorage(e.target.dataset.color);
    });
  });
});

// set Color in local Storage
function setColorInlocalStorage(color = "") {
  localStorage.setItem("color", color);
}

// get Color from local Storage
function getColorInlocalStorage(color = "") {
  document.documentElement.style.setProperty("--main-color", color);
}

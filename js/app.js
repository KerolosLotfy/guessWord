const guessBtn = document.querySelector('input[type="submit"]');
const gearIcon = document.querySelector('.control span');
const colors = document.querySelectorAll('.colors > div ');
let words = [
    'Kerolos',
    'Word',
    'Guess',
    'javaScript',
    'HTMl',
    'CSS',
    'Chris',
    'academic',
    'ability',
    'account',
    'action',
    'address',
    'actor',
    'advantage',
    'adventure',
    'advice',
    'age',
    'agency'
]
let color = '';
let icon;

// get Color from local Storage
getColorInlocalStorage(localStorage.getItem('color'))

// select Random word form words array
let randomWord = selectRandomWordFrom(words).toUpperCase();
console.log(randomWord);
function selectRandomWordFrom(words) {
    let wordIndex = Math.floor(Math.random() * words.length);
    for (let i = 0; i < words.length; i++) {
        if (i === wordIndex) {
            return words[i];
        }
    }
}

// submit input Data
guessBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let word = e.target.parentElement[0].value.trim();

    // check Word
    let output = checkWord(word.toUpperCase());
});

// check Word
function checkWord(word) {
    let output = '';
    if (randomWord === word) {
        output = randomWord;
        icon = `👏`;
    } else {
        for (let i = 0; i < randomWord.length; i++) {
            if (randomWord[i] === word[i]) {
                output += `${word[i]} `;
            } else {
                output += `✤ `;
            }
        }

        icon = `👎`;
    }
    // add New word To Page
    document.querySelector('#output > p').innerHTML = `${output}<i class='wordLength'>${randomWord.length} letter</i> <i class='wordLength'>${icon}</i>`;
    return output;
}



// change colors
gearIcon.addEventListener('click', () => {
    gearIcon.parentElement.classList.toggle('active');
    colors.forEach((c) => {
        c.addEventListener('click', (e) => {
            document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

            // set Color in local Storage 
            setColorInlocalStorage(e.target.dataset.color);
        })
    })
})



// set Color in local Storage
function setColorInlocalStorage(color = '') {
    localStorage.setItem('color', color)
}

// get Color from local Storage
function getColorInlocalStorage(color = '') {
    document.documentElement.style.setProperty('--main-color', color);
}
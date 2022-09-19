// Global variables
const guessBtn = document.querySelector('input[type="submit"]');
const gearIcon = document.querySelector('.control span');
const colors = document.querySelectorAll('.colors > div ');
const output = document.querySelector('#output > p');
let wordLength = document.querySelector('form #wordLength');
let color = '';
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
let icon; // icon in output

// get Color from local Storage
getColorInlocalStorage(localStorage.getItem('color'));

// set word legnth at input in wordLength
wordLength.innerText = guessBtn.parentElement[0].value.length;
guessBtn.parentElement[0].oninput = () => {
    wordLength.innerText = guessBtn.parentElement[0].value.length;
}

// submit input Data
guessBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.target.parentElement[0].blur();
    if (e.target.parentElement[0].value !== '') {
        document.querySelector('#output .checking').classList.add('active');
        // reset output to page
        output.innerHTML = '';

        setTimeout(() => {
            document.querySelector('#output .checking').classList.remove('active');

            // check Word
            let word = e.target.parentElement[0].value.trim();
            checkWord(word.toLowerCase());
        }, 1000);
    } else {
        e.target.parentElement[0].setAttribute('placeholder', 'please write the word')
    }
});

// select Random word form words array
let randomWord = selectRandomWordFrom(words).toLowerCase();
console.log(randomWord); // kkkk
function selectRandomWordFrom(words) {
    let wordIndex = Math.floor(Math.random() * words.length);
    for (let i = 0; i < words.length; i++) {
        if (i === wordIndex) {
            return words[i];
        }
    }
}

// check Word
function checkWord(word) {
    let result = '';
    if (randomWord === word) {
        result = randomWord;
        icon = `👏`;
        document.querySelector('#output').classList.add('animation');
        output.innerHTML =
            `${result}</span><i class='wordLength'>(${randomWord.length})
        </i> <i class='wordLength'>${icon}</i>`;

    } else {
        // for (let i = 0; i < randomWord.length; i++) {
        //     if (randomWord[i] === word[i]) {
        //         result += `${word[i]} `;
        //     } else {
        //         result += `✤ `;
        //     }
        // }
        icon = `👎`;
        for (let i = 0; i < word.length; i++) {
            for (let j = 0; j < randomWord.length; j++) {
                if (word[i] === randomWord[j]) {
                    randomWord[j] = randomWord[j];
                    console.log(randomWord[j]);
                } else {
                    randomWord[j] = `✤`;
                    console.log(randomWord[j]);
                }
            }
        }
        result = randomWord;
    }

    // add New word To Page
    output.innerHTML = `
            ${result} <span class="icon-eye-blocked show" >
            </span><i class='wordLength'>(${randomWord.length})
            </i> <i class='wordLength'>${icon}</i>`;
    // show random word
    document.querySelector('#output > p .show').addEventListener('click', () => {
        output.innerHTML = `
        ${randomWord} 
        </span><i class='wordLength'>(${randomWord.length})
        `;
    })
    return result;
}

// change colors
gearIcon.addEventListener('click', () => {
    gearIcon.parentElement.classList.toggle('active');
    colors.forEach((c) => {
        c.addEventListener('click', (e) => {
            document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
            gearIcon.parentElement.classList.remove('active');
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
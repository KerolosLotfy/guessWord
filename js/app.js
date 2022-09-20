// Global variables
const guessBtn = document.querySelector('input[type="submit"]');
const gearIcon = document.querySelector('.control > span');
const colors = document.querySelectorAll('.colors > div ');
const output = document.querySelector('#output > p');
let wordLength = document.querySelector('form #wordLength');
let tryBtn = document.querySelector('#output > .tryAgain');
let tries = document.querySelector('.control > .try > span');
tries.innerHTML = 3;
let color = '';
let words = [
    'Word',
    'Guess',
    'javaScript',
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
    'agency',
    'wood',
    'work',
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
        document.querySelector('#output').classList.remove('animation');
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
    let result = randomWord.split('');
    if (randomWord === word) {
        document.querySelector('#output').classList.add('animation');
        output.innerHTML =
            `${randomWord}</span><i class='wordLength'>(${randomWord.length})</i> 
            <i class='wordLength'>${icon}</i>`;
        icon = `👏`;
    } else {
        for (let i = 0; i < result.length; i++) {
            if (!word.includes(result[i])) {
                result[i] = `✤ `;
            }
        }
        icon = `👎`;
        // add New word To Page
        output.innerHTML = `
            ${result.join('')} <span class="icon-eye-blocked show" >
            </span><i class='wordLength'>(${randomWord.length})
            </i> <i class='wordLength'>${icon}</i>`;
        // show random word
        document.querySelector('#output > p .show').addEventListener('click', () => {
            output.innerHTML = `
        ${randomWord} 
        </span><i class='wordLength'>(${randomWord.length})
        `;
        });

        // tries
        tries.innerHTML--;
        if (tries.innerHTML == 0) {
            tries.innerHTML = 3;
            tryBtn.classList.add('active');
            output.innerHTML =
                `${randomWord}</span><i class='wordLength'>(${randomWord.length})</i>`;
            // reload when guess button
            guessBtn.addEventListener('click', () => {
                location.reload();
            })
            
            // reload when try Again button
            tryAgain();
        }
    }
}

// try Again function
function tryAgain() {
    tryBtn.addEventListener('click', () => {
        location.reload();
    })
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



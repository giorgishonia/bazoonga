document.addEventListener('DOMContentLoaded', function() {
    const valuesDiv = document.getElementById('values');
    valuesDiv.innerHTML = generateValuesHTML();
});

const letterValues = {
    'ა': { letter: 1, numerized: 1 }, 'ბ': { letter: 2, numerized: 2 }, 'გ': { letter: 3, numerized: 3 }, 'დ': { letter: 4, numerized: 4 }, 'ე': { letter: 5, numerized: 5 },
    'ვ': { letter: 6, numerized: 6 }, 'ზ': { letter: 7, numerized: 7 }, 'ჱ': { letter: 8, numerized: 8 }, 'თ': { letter: 9, numerized: 9 }, 'ი': { letter: 10, numerized: 10 },
    'კ': { letter: 20, numerized: 11 }, 'ლ': { letter: 30, numerized: 12 }, 'მ': { letter: 40, numerized: 13 }, 'ნ': { letter: 50, numerized: 14 }, 'ჲ': { letter: 60, numerized: 15 },
    'ო': { letter: 70, numerized: 16 }, 'პ': { letter: 80, numerized: 17 }, 'ჟ': { letter: 90, numerized: 18 }, 'რ': { letter: 100, numerized: 19 }, 'ს': { letter: 200, numerized: 20 },
    'ტ': { letter: 300, numerized: 21 }, 'უ': { letter: 400, numerized: 22 }, 'ფ': { letter: 500, numerized: 23 }, 'ქ': { letter: 600, numerized: 24 },
    'ღ': { letter: 700, numerized: 25 }, 'ყ': { letter: 800, numerized: 26 }, 'შ': { letter: 900, numerized: 27 }, 'ჩ': { letter: 1000, numerized: 28 }, 'ც': { letter: 2000, numerized: 29 },
    'ძ': { letter: 3000, numerized: 30 }, 'წ': { letter: 4000, numerized: 31 }, 'ჭ': { letter: 5000, numerized: 32 }, 'ხ': { letter: 6000, numerized: 33 }, 'ჴ': { letter: 7000, numerized: 34 },
    'ჯ': { letter: 8000, numerized: 35 }, 'ჰ': { letter: 9000, numerized: 36 }, 'ჵ': { letter: 10000, numerized: 37 }
};

function toggleValues() {
    const valuesDiv = document.getElementById('values');
    const toggleBtn = document.getElementById('toggleBtn');

    if (valuesDiv.style.display === 'none') {
        valuesDiv.innerHTML = generateValuesHTML();
        valuesDiv.style.display = 'block';
        toggleBtn.textContent = 'მნიშვნელობების დამალვა';
    } else {
        valuesDiv.style.display = 'none';
        toggleBtn.textContent = 'მნიშვნელობების ჩვენება';
    }
}

function generateValuesHTML() {
    let html = '<h3>All Letters and Their Values</h3><ul>';
    for (const letter in letterValues) {
        html += `<li>${letter}: Letter Value - ${letterValues[letter].letter}, Numerized Value - ${letterValues[letter].numerized}</li>`;
    }
    html += '</ul>';
    return html;
}

document.getElementById('word').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculateWord();
    }
});

function calculateWord() {
    const word = document.getElementById('word').value;
    let totalLetterValue = 0;
    let totalNumerizedValue = 0;

    for (let i = 0; i < word.length; i++) {
        const letter = word[i].toLowerCase();
        if (letterValues.hasOwnProperty(letter)) {
            totalLetterValue += letterValues[letter].letter;
            totalNumerizedValue += letterValues[letter].numerized;
        }
    }

    document.getElementById('result').innerHTML = `რიცხვითი მნიშვნელობები → <span style="color: rgb(0, 255, 42)">${totalLetterValue}</span> და <span style="color:  rgb(0, 255, 42)">${totalNumerizedValue}</span>.`;
    document.getElementById('numerized-result').innerText = `The numerized value of the word '${word}' is: ${totalNumerizedValue}`;
}



function generateValuesHTML() {
    let html = '<h3>ანბანი და მათი რიცხვითი მნიშვნელობები</h3><div class="values-columns">';
    let count = 0;

    html += '<ul>';
    for (const letter in letterValues) {
        if (count === 10 || count === 20 || count === 30) {
            html += '</ul><ul>'; // Start a new column after every 10 lines
        }
        html += `<li>${letterValues[letter].numerized}.${letter} - ${letterValues[letter].letter}</li>`;
        count++;
    }
    html += '</ul></div>';
    return html;
}
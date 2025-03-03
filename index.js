document.addEventListener('DOMContentLoaded', function() {
  // Initialize
  const valuesDiv = document.getElementById('values');
  valuesDiv.innerHTML = generateValuesHTML();
  
  // Set up event listeners
  document.getElementById('word').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      calculateWord();
    }
  });
  
  document.getElementById('toggleBtn').addEventListener('click', toggleValues);
});

// Georgian alphabet letter values
const letterValues = {
  'ა': { letter: 1, numerized: 1 },
  'ბ': { letter: 2, numerized: 2 },
  'გ': { letter: 3, numerized: 3 },
  'დ': { letter: 4, numerized: 4 },
  'ე': { letter: 5, numerized: 5 },
  'ვ': { letter: 6, numerized: 6 },
  'ზ': { letter: 7, numerized: 7 },
  'ჱ': { letter: 8, numerized: 8 },
  'თ': { letter: 9, numerized: 9 },
  'ი': { letter: 10, numerized: 10 },
  'კ': { letter: 20, numerized: 11 },
  'ლ': { letter: 30, numerized: 12 },
  'მ': { letter: 40, numerized: 13 },
  'ნ': { letter: 50, numerized: 14 },
  'ჲ': { letter: 60, numerized: 15 },
  'ო': { letter: 70, numerized: 16 },
  'პ': { letter: 80, numerized: 17 },
  'ჟ': { letter: 90, numerized: 18 },
  'რ': { letter: 100, numerized: 19 },
  'ს': { letter: 200, numerized: 20 },
  'ტ': { letter: 300, numerized: 21 },
  'უ': { letter: 400, numerized: 22 },
  'ფ': { letter: 500, numerized: 23 },
  'ქ': { letter: 600, numerized: 24 },
  'ღ': { letter: 700, numerized: 25 },
  'ყ': { letter: 800, numerized: 26 },
  'შ': { letter: 900, numerized: 27 },
  'ჩ': { letter: 1000, numerized: 28 },
  'ც': { letter: 2000, numerized: 29 },
  'ძ': { letter: 3000, numerized: 30 },
  'წ': { letter: 4000, numerized: 31 },
  'ჭ': { letter: 5000, numerized: 32 },
  'ხ': { letter: 6000, numerized: 33 },
  'ჴ': { letter: 7000, numerized: 34 },
  'ჯ': { letter: 8000, numerized: 35 },
  'ჰ': { letter: 9000, numerized: 36 },
  'ჵ': { letter: 10000, numerized: 37 }
};

// Toggle values panel visibility
function toggleValues() {
  const valuesDiv = document.getElementById('values');
  const toggleBtn = document.getElementById('toggleBtn');

  if (valuesDiv.style.display === 'block') {
    valuesDiv.style.display = 'none';
    toggleBtn.textContent = 'ანბანის ჩვენება';
  } else {
    valuesDiv.style.display = 'block';
    toggleBtn.textContent = 'ანბანის დამალვა';
  }
}

// Generate HTML for letter values
function generateValuesHTML() {
  let html = '<h3>ანბანი და მათი რიცხვითი მნიშვნელობები</h3>';
  
  // Organize letters into columns
  html += '<div class="values-columns">';
  
  // Column 1: Letters 1-13
  html += '<ul>';
  const letterEntries = Object.entries(letterValues);
  
  for (let i = 0; i < 13; i++) {
    const [letter, values] = letterEntries[i];
    html += `<li><span>${values.numerized}. ${letter}</span> <span>${values.letter}</span></li>`;
  }
  html += '</ul>';
  
  // Column 2: Letters 14-25
  html += '<ul>';
  for (let i = 13; i < 25; i++) {
    const [letter, values] = letterEntries[i];
    html += `<li><span>${values.numerized}. ${letter}</span> <span>${values.letter}</span></li>`;
  }
  html += '</ul>';
  
  // Column 3: Letters 26-37
  html += '<ul>';
  for (let i = 25; i < letterEntries.length; i++) {
    const [letter, values] = letterEntries[i];
    html += `<li><span>${values.numerized}. ${letter}</span> <span>${values.letter}</span></li>`;
  }
  html += '</ul>';
  
  html += '</div>';
  return html;
}

// Calculate word values
function calculateWord() {
  const wordInput = document.getElementById('word');
  const word = wordInput.value.trim();
  
  if (!word) {
    document.getElementById('result').innerHTML = 'რიცხვითი მნიშვნელობები →';
    return;
  }
  
  let totalLetterValue = 0;
  let totalNumerizedValue = 0;
  const breakdownLetters = [];
  const breakdownNumerized = [];

  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    if (letterValues[letter]) {
      totalLetterValue += letterValues[letter].letter;
      totalNumerizedValue += letterValues[letter].numerized;
      
      breakdownLetters.push(`${letter}(${letterValues[letter].letter})`);
      breakdownNumerized.push(`${letter}(${letterValues[letter].numerized})`);
    }
  }

  // Highlight found letters in the values panel
  highlightFoundLetters(word);
  
  // Display results with breakdown (on hover or tap)
  const letterBreakdown = breakdownLetters.join(' + ');
  const numerizedBreakdown = breakdownNumerized.join(' + ');
  
  document.getElementById('result').innerHTML = `
    რიცხვითი მნიშვნელობები → 
    <span class="highlight" title="${numerizedBreakdown}">${totalNumerizedValue}</span> და 
    <span class="highlight" title="${letterBreakdown}">${totalLetterValue}</span>
  `;
  
  // Clear input and focus for next word
  wordInput.focus();
}

// Highlight letters found in the current word
function highlightFoundLetters(word) {
  // Reset all highlights
  const allLetterElements = document.querySelectorAll('.values-columns li');
  allLetterElements.forEach(el => {
    el.classList.remove('highlight');
  });
  
  // Set highlights for letters in the word
  if (word) {
    const uniqueLetters = [...new Set(word.split(''))];
    
    uniqueLetters.forEach(letter => {
      if (letterValues[letter]) {
        const numerizedValue = letterValues[letter].numerized;
        const selector = `.values-columns li:contains("${numerizedValue}. ${letter}")`;
        
        // Custom contains selector implementation
        document.querySelectorAll('.values-columns li').forEach(el => {
          if (el.textContent.includes(`${numerizedValue}. ${letter}`)) {
            el.classList.add('highlight');
          }
        });
      }
    });
  }
}

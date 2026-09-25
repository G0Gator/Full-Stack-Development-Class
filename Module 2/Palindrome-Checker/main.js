// PalindromeChecker Object - stores all data and methods
const PalindromeChecker = {
    palindromes: [],
    notPalindromes: [],

    // Algorithm 1: Two Pointer Approach
    twoPointerAlgorithm: function(word, caseSensitive) {
        let text = caseSensitive ? word : word.toLowerCase();
        let left = 0;
        let right = text.length - 1;

        while (left < right) {
            if (text[left] !== text[right]) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    },

    // Algorithm 2: String Reversal
    stringReversalAlgorithm: function(word, caseSensitive) {
        let text = caseSensitive ? word : word.toLowerCase();
        let reversed = text.split('').reverse().join('');
        return text === reversed;
    },

    // Algorithm 3: Recursive Method (Exceptional requirement)
    recursiveAlgorithm: function(word, caseSensitive) {
        let text = caseSensitive ? word : word.toLowerCase();
        
        function isRecursivePalindrome(str, left = 0, right = str.length - 1) {
            // Base case: if pointers have crossed or met
            if (left >= right) {
                return true;
            }
            // If characters don't match, not a palindrome
            if (str[left] !== str[right]) {
                return false;
            }
            // Recurse with updated pointers
            return isRecursivePalindrome(str, left + 1, right - 1);
        }

        return isRecursivePalindrome(text);
    },

    // Method to check palindrome and update lists
    check: function(word, algorithm, caseSensitive) {
        let result;
        let algorithmName;

        // Select the appropriate algorithm
        if (algorithm === "1") {
            result = this.twoPointerAlgorithm(word, caseSensitive);
            algorithmName = "Algorithm 1: Two Pointer";
        } else if (algorithm === "2") {
            result = this.stringReversalAlgorithm(word, caseSensitive);
            algorithmName = "Algorithm 2: String Reversal";
        } else if (algorithm === "3") {
            result = this.recursiveAlgorithm(word, caseSensitive);
            algorithmName = "Algorithm 3: Recursive";
        }

        // Add to appropriate list
        if (result) {
            this.palindromes.push({
                word: word,
                algorithm: algorithmName,
                caseSensitive: caseSensitive
            });
        } else {
            this.notPalindromes.push({
                word: word,
                algorithm: algorithmName,
                caseSensitive: caseSensitive
            });
        }

        return {
            isPalindrome: result,
            algorithmName: algorithmName,
            caseSensitive: caseSensitive
        };
    }
};

// Input Validation Function
function validateInput() {
    const word = document.getElementById('wordInput').value.trim();
    const algorithm = document.getElementById('algorithmSelect').value;
    const errorDiv = document.getElementById('errorMessages');
    
    errorDiv.innerHTML = '';

    // Validate word
    if (!word || word.length === 0) {
        errorDiv.innerHTML = '<div class="alert alert-danger" role="alert">Error: Please enter a word.</div>';
        return null;
    }

    if (!/^[a-zA-Z]+$/.test(word)) {
        errorDiv.innerHTML = '<div class="alert alert-danger" role="alert">Error: Only alphabetic characters are allowed (no numbers or special characters).</div>';
        return null;
    }

    // Validate algorithm selection
    if (!algorithm || (algorithm !== "1" && algorithm !== "2" && algorithm !== "3")) {
        errorDiv.innerHTML = '<div class="alert alert-danger" role="alert">Error: Please select a valid algorithm (1, 2, or 3).</div>';
        return null;
    }

    return { word, algorithm };
}

// Main Check Palindrome Function
function checkPalindrome() {
    const validation = validateInput();
    
    if (!validation) {
        return;
    }

    const { word, algorithm } = validation;
    const caseSensitiveRadio = document.querySelector('input[name="caseSensitive"]:checked');
    const caseSensitive = caseSensitiveRadio.value === 'true';

    // Check palindrome using the selected algorithm
    const result = PalindromeChecker.check(word, algorithm, caseSensitive);

    // Display analysis
    const analysisDiv = document.getElementById('analysisData');
    const caseLabel = caseSensitive ? "Case Sensitive" : "Case Insensitive";
    analysisDiv.innerHTML = `
        <p><strong>Word:</strong> ${word}</p>
        <p><strong>Algorithm Used:</strong> ${result.algorithmName}</p>
        <p><strong>Mode:</strong> ${caseLabel}</p>
        <p><strong>Result:</strong> <span style="font-weight: bold; color: ${result.isPalindrome ? 'green' : 'red'};">${result.isPalindrome ? 'PALINDROME ✓' : 'NOT A PALINDROME ✗'}</span></p>
    `;

    // Update palindrome list
    updatePalindromeList();

    // Update not palindrome list
    updateNotPalindromeList();
}

// Update Palindrome List Display
function updatePalindromeList() {
    const listDiv = document.getElementById('palindromeList');
    
    if (PalindromeChecker.palindromes.length === 0) {
        listDiv.innerHTML = '<li class="list-group-item text-muted">No palindromes found yet</li>';
        return;
    }

    let listHTML = '';
    PalindromeChecker.palindromes.forEach((item, index) => {
        listHTML += `<li class="list-group-item">
            <strong>${item.word}</strong> (${item.algorithm})
        </li>`;
    });
    listDiv.innerHTML = listHTML;
}

// Update Not Palindrome List Display
function updateNotPalindromeList() {
    const listDiv = document.getElementById('notPalindromeList');
    
    if (PalindromeChecker.notPalindromes.length === 0) {
        listDiv.innerHTML = '<li class="list-group-item text-muted">No non-palindromes found yet</li>';
        return;
    }

    let listHTML = '';
    PalindromeChecker.notPalindromes.forEach((item, index) => {
        listHTML += `<li class="list-group-item">
            <strong>${item.word}</strong> (${item.algorithm})
        </li>`;
    });
    listDiv.innerHTML = listHTML;
}



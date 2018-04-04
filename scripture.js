let book = document.getElementById('book');
let chapterNumber = document.getElementById('chapter-number');
let verseNumber = document.getElementById('verse-number');
let scriptureText = document.getElementById('scripture-text');
let submitButton = document.getElementById('submit-verse');
let tableBody = document.getElementById('show-scriptures-body')
let container = document.getElementById('container')

function ScripturePassage(scriptureBook, chapter, verse, scripture) {
    this.passageBook = scriptureBook;
    this.passageChapter = chapter;
    this.passageVerse = verse;
    this.passageText = scripture;
}

submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    if (book.value === '' || chapterNumber.value === '' || verseNumber.value === '' || scriptureText.value === '') {
        showMessage('Please Fill Out All Fields Correctly', 'red');
    }
    else {
        let passage = new ScripturePassage(book.value, chapterNumber.value, verseNumber.value, scriptureText.value);

        let tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${passage.passageBook}</td> 
        <td>${passage.passageChapter}</td> 
        <td>${passage.passageVerse}</td> 
        <td>${passage.passageText}</td>
        <td><a href='#' class='delete'>X</a></td>
        `;

        document.getElementById('show-scriptures-body').appendChild(tr);
        showMessage('Scripture successfully added!', 'green')


        book.value = ''
        chapterNumber.value = ''
        verseNumber.value = ''
        scriptureText.value = '';


    }
})

/*Using event delegation to apply the event only to the 'x' button that is within the scripture output table */
tableBody.addEventListener('click', function(event) {
    if (event.target.className === 'delete') {
        removeScripture(event.target)
    }
})

function showMessage(text, color) {
    let div = document.createElement('div');
    let removeX = document.createElement('a');
    removeX.appendChild(document.createTextNode('X'));
    removeX.className = 'remove-message';
    removeX.style.color = 'lightblue';

    div.style.color = 'white'
    div.style.backgroundColor = color;
    div.appendChild(document.createTextNode(`${text} `));
    div.style.height = '30px';
    div.style.width = ' 40%';
    div.style.margin = '20px'
    div.style.padding = '10px'
    div.style.textAlign = 'center';
    div.style.fontSize = '18px'
    div.appendChild(removeX);

    let showScriptures = document.getElementById('show-scriptures')
    document.querySelector('#container').appendChild(div);
    document.querySelector('#container').insertBefore(div, showScriptures);

    container.addEventListener('click', function(event) {
        if (event.target.className === 'remove-message') {
            event.target.parentElement.remove();
            /*BIG TIP - before, I had div.remove(), and I came across a situation where I had multiple error message on the screen. Clicking the X button would result in all of the message being deleted at once. So instead, I replaced div.remove(), with event.target.parentElement.remove(), because I want to remove the div that was clicked, the target div, instead of all them at once. */
        }
    })
}

function removeScripture(target) {
    confirm('Are you sure you want to remove this passage?')
    if (confirm) {
        target.parentElement.parentElement.remove();
        showMessage('Scripture successfully removed!', 'orange')
    }
}

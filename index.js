document.addEventListener('DOMContentLoaded', function() {
    const bookList = document.getElementById('book-list');
    const bookForm = document.getElementById('book-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    const books = [];

    bookForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;

        if (isDuplicate(title, author, isbn)) {
            alert('This book already exists in the library.');
        } else {
            addBook(title, author, isbn);
            displayBooks(bookList);
            document.getElementById('title').value = '';
            document.getElementById('author').value = '';
            document.getElementById('isbn').value = '';
        }
    });

    searchInput.addEventListener('input', function() {
        displaySearchResults(searchInput.value);
    });

    function isDuplicate(title, author,isbn) {
        return books.some(book => book.title === title && book.author === author &&  book.isbn === isbn);;
    }

    function addBook(title, author,isbn) {
        books.push({ title, author,isbn});
    }

    function displayBooks(targetElement) {
        targetElement.innerHTML = '';
        books.forEach(book => {
            const li = document.createElement('li');
            li.textContent = `${book.title} by ${book.author} ISBN: ${book.isbn}`;
            targetElement.appendChild(li);
        });
    }

    function displaySearchResults(searchTerm) {
        const filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
        );

        searchResults.innerHTML = ''; // Clear previous search results

        if (filteredBooks.length > 0) {
            const li = document.createElement('li');
            li.textContent = `${filteredBooks[0].title} by ${filteredBooks[0].author} ISBN: ${filteredBooks[0].isbn}`;
            searchResults.appendChild(li);
        } 
        else
         {
            const li = document.createElement('li');
            li.textContent = 'No matching books found.';
            searchResults.appendChild(li);
        }
    }

   
});



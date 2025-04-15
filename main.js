const theme = document.querySelector(".theme");
const header = document.querySelector("header");
const themeImg = document.querySelector(".theme img");
const h1 = document.querySelector('h1');
const btns = document.querySelectorAll(".btns button");


let dark = true;
themeImg.src = './assets/images/icon-sun.svg';
header.classList.add('darkHeader');
theme.classList.add('darkIcon');
h1.classList.add('headingsColorLight');
btns[0].classList.add('Red400');

btns.forEach((btn) => {
    btn.classList.add('darkIcon', 'headingsColorLight');
    btn.addEventListener('click', function () {
        btns.forEach((btn) => {
            btn.classList.remove('Red400');
        })
        this.classList.add('Red400');
    });
});

theme.addEventListener('click', function () {
    if (dark) {
        themeImg.src = './assets/images/icon-moon.svg';
        document.body.classList.remove("darkTheme");
        document.body.classList.add("lightTheme");
        header.classList.remove('darkHeader');
        header.classList.add('lightHeader');
        theme.classList.remove('darkIcon');
        theme.classList.add('lightIcon');
        h1.classList.remove('headingsColorLight');
        h1.classList.add('headingsColorDark');
        btns.forEach((btn) => {
            btn.classList.remove('darkIcon', 'headingsColorLight');
            btn.classList.add('lightIcon', 'headingsColorDark');
        });
        document.querySelectorAll('.extension > div button').forEach((btn) => {
            btn.classList.remove('lightBtn');
            btn.classList.add('darkBtn');
        });
        document.querySelectorAll('.extension').forEach((extension) => {
            extension.classList.remove('extensionDark');
            extension.classList.add('extensionLight');
        });
        document.querySelectorAll('h2').forEach((h2) => {
            h2.classList.remove('headingsColorLight');
            h2.classList.add('headingsColorDark');
        });
        dark = false;
    } else {
        themeImg.src = './assets/images/icon-sun.svg';
        document.body.classList.remove("lightTheme");
        document.body.classList.add("darkTheme");
        header.classList.remove('lightHeader');
        header.classList.add('darkHeader');
        theme.classList.remove('lightIcon');
        theme.classList.add('darkIcon');
        h1.classList.remove('headingsColorDark');
        h1.classList.add('headingsColorLight');
        btns.forEach((btn) => {
            btn.classList.remove('lightIcon', 'headingsColorDark');
            btn.classList.add('darkIcon', 'headingsColorLight');
        });
        document.querySelectorAll('.extension > div button').forEach((btn) => {
            btn.classList.remove('darkBtn');
            btn.classList.add('lightBtn');
        });
        document.querySelectorAll('.extension').forEach((extension) => {
            extension.classList.remove('extensionLight');
            extension.classList.add('extensionDark');
        });
        document.querySelectorAll('h2').forEach((h2) => {
            h2.classList.remove('headingsColorDark');
            h2.classList.add('headingsColorLight');
        });
        dark = true;
    }
});


// Retrieve Data From JSON File
const extensionsContainer = document.querySelector('.extensions');
fetch('./data.json').then((res) => {
    return res.json();
}).then(extensions => {
    getExtensions(extensions);
    let data = null;
    btns.forEach((btn) => {
        btn.addEventListener('click', function () {
            if (btn.textContent === 'All') {
                data = extensions;
            } else if (btn.textContent === 'Active') {
                data = extensions.filter((extension) => extension.isActive);
            } else if (btn.textContent === 'Inactive') {
                data = extensions.filter((extension) => !extension.isActive);
            }
            getExtensions(data);
            document.querySelectorAll('.extension').forEach((extension) => {
                if (dark) {
                    extension.classList.remove('extensionLight');
                    extension.classList.add('extensionDark');
                } else {
                    extension.classList.remove('extensionDark');
                    extension.classList.add('extensionLight');
                }
            });
            document.querySelectorAll('h2').forEach((h2) => {
                if (dark) {
                    h2.classList.remove('headingsColorDark')
                    h2.classList.add('headingsColorLight');
                } else {
                    h2.classList.remove('headingsColorLight')
                    h2.classList.add('headingsColorDark');
                }
            });
            document.querySelectorAll('.extension > div button').forEach((btn) => {
                if (dark) {
                    btn.classList.remove('darkBtn');
                    btn.classList.add('lightBtn');
                } else {
                    btn.classList.remove('lightBtn');
                    btn.classList.add('darkBtn');
                }
            });
        });
    });
}).catch(error => {
    console.log(error + 'failed to fetch')
});


function getExtensions(data) {
    extensionsContainer.innerHTML = '';

    data.forEach((extension, index) => {
        let extensionBlock = `
            <div class='extension'>
                <div>
                    <img src='${extension.logo}' alt='${extension.name}' />
                    <div>
                        <h2>${extension.name}</h2>
                        <p>${extension.description}</p>
                    </div>
                </div>

                <div>
                    <button id='btn-${index}'>Remove</button>
                    <label class="switch">
                        <input type="checkbox" id="${index}" ${extension.isActive ? 'checked' : ''}>
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
        `;

        extensionsContainer.innerHTML += extensionBlock;
    });

    // After all HTML is rendered, toggle isActive propertyr
    data.forEach((extension, index) => {
        const input = document.getElementById(index);
        if (input) {
            input.addEventListener('change', function () {
                extension.isActive = !extension.isActive;
            });
        }
        // remove extension when clicked on remove btn
        const removeBtn = document.getElementById(`btn-${index}`);
        if (removeBtn) {
            removeBtn.addEventListener('click', function () {
                const elementToRemove = removeBtn.parentElement.parentElement;
                elementToRemove.classList.add('fade-out');

                // wait transition to finish before removing the element
                elementToRemove.addEventListener('transitionend', () => {
                    elementToRemove.remove();
                });
            });
        }
    });
    document.querySelectorAll('.extension').forEach((extension) => {
        extension.classList.add('extensionDark');
    });
    document.querySelectorAll('h2').forEach((h2) => {
        h2.classList.add('headingsColorLight');
    });
    document.querySelectorAll('.extension > div button').forEach((btn) => {
        btn.classList.add('lightBtn');
    });
}

const password =
    document.getElementById("password");


const generateButton =
    document.getElementById("generateButton");


const copyButton =
    document.getElementById("copyButton");


const length =
    document.getElementById("length");


const lengthValue =
    document.getElementById("lengthValue");


const uppercase =
    document.getElementById("uppercase");


const lowercase =
    document.getElementById("lowercase");


const numbers =
    document.getElementById("numbers");


const symbols =
    document.getElementById("symbols");


const strengthText =
    document.getElementById("strengthText");


const strengthBar =
    document.getElementById("strengthBar");


const copyMessage =
    document.getElementById("copyMessage");





const characters = {

    uppercase:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

    lowercase:
        "abcdefghijklmnopqrstuvwxyz",

    numbers:
        "0123456789",

    symbols:
        "!@#$%&*?+-_=."

};


function randomCharacter(text) {

    const position =
        Math.floor(
            Math.random() * text.length
        );

    return text[position];

}



/* =========================
   GERAR SENHA
========================= */

function generatePassword() {


    let availableCharacters = "";

    let passwordCharacters = [];


    if (uppercase.checked) {

        availableCharacters +=
            characters.uppercase;

        passwordCharacters.push(
            randomCharacter(
                characters.uppercase
            )
        );

    }



    /* MINÚSCULAS */

    if (lowercase.checked) {

        availableCharacters +=
            characters.lowercase;

        passwordCharacters.push(
            randomCharacter(
                characters.lowercase
            )
        );

    }


    if (numbers.checked) {

        availableCharacters +=
            characters.numbers;

        passwordCharacters.push(
            randomCharacter(
                characters.numbers
            )
        );

    }


    if (symbols.checked) {

        availableCharacters +=
            characters.symbols;

        passwordCharacters.push(
            randomCharacter(
                characters.symbols
            )
        );

    }


    if (availableCharacters === "") {

        password.value = "";

        strengthText.textContent =
            "Selecione uma opção";

        strengthBar.style.width =
            "0%";

        return;

    }

    while (
        passwordCharacters.length <
        Number(length.value)
    ) {

        passwordCharacters.push(
            randomCharacter(
                availableCharacters
            )
        );

    }


    passwordCharacters.sort(
        () => Math.random() - 0.5
    );

    password.value =
        passwordCharacters.join("");



   

    updateStrength();


    copyMessage.textContent = "";

}

function updateStrength() {


    const passwordLength =
        Number(length.value);


    let types = 0;



    if (uppercase.checked) {

        types++;

    }


    if (lowercase.checked) {

        types++;

    }


    if (numbers.checked) {

        types++;

    }


    if (symbols.checked) {

        types++;

    }


    let score = 0;


    if (passwordLength >= 8) {

        score++;

    }


    if (passwordLength >= 12) {

        score++;

    }


    if (passwordLength >= 16) {

        score++;

    }


    if (types >= 3) {

        score++;

    }


    if (types === 4) {

        score++;

    }


    if (score <= 1) {

        strengthText.textContent =
            "Fraca";

        strengthBar.style.width =
            "25%";

        strengthBar.style.background =
            "#e86a6a";

    }


    else if (score === 2) {

        strengthText.textContent =
            "Razoável";

        strengthBar.style.width =
            "45%";

        strengthBar.style.background =
            "#f2b84b";

    }


    else if (score === 3) {

        strengthText.textContent =
            "Boa";

        strengthBar.style.width =
            "65%";

        strengthBar.style.background =
            "#f2b84b";

    }


    else if (score === 4) {

        strengthText.textContent =
            "Forte";

        strengthBar.style.width =
            "82%";

        strengthBar.style.background =
            "#42b883";

    }


    else {

        strengthText.textContent =
            "Muito forte";

        strengthBar.style.width =
            "100%";

        strengthBar.style.background =
            "#42b883";

    }

}

generateButton.addEventListener(
    "click",
    generatePassword
);

length.addEventListener(
    "input",
    () => {

        lengthValue.textContent =
            length.value;

        generatePassword();

    }
);

uppercase.addEventListener(
    "change",
    generatePassword
);


lowercase.addEventListener(
    "change",
    generatePassword
);


numbers.addEventListener(
    "change",
    generatePassword
);


symbols.addEventListener(
    "change",
    generatePassword
);

copyButton.addEventListener(
    "click",
    async () => {


        if (password.value === "") {

            return;

        }


        try {

            await navigator.clipboard.writeText(
                password.value
            );


            copyMessage.textContent =
                "✓ Senha copiada com sucesso!";


        } catch (error) {

            password.select();

            document.execCommand(
                "copy"
            );


            copyMessage.textContent =
                "✓ Senha copiada!";

        }

    }
);

const quizButtons =
    document.querySelectorAll(
        ".quiz-button"
    );

const quizResult =
    document.getElementById(
        "quizResult"
    );

quizButtons.forEach(
    button => {


        button.addEventListener(
            "click",
            () => {


                const answer =
                    button.dataset.answer;



                if (answer === "correct") {

                    quizResult.textContent =
                        "✓ Correto! Desconfie de cobranças e verifique a empresa antes de continuar.";

                    quizResult.style.color =
                        "#7ff0ae";

                }


                else {

                    quizResult.textContent =
                        "✗ Atenção! Cobranças para garantir uma vaga são um forte sinal de alerta.";

                    quizResult.style.color =
                        "#ffaaa0";

                }

            }
        );

    }
);

generatePassword();
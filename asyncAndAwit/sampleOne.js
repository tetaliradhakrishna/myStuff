

function getRandomNumber() {

    return new Promise(function (resolve, reject) {

        setTimeout(function () {
            const randomValue = Math.random();
            const error = randomValue > .8 ? true : false;
            if (error) {
                reject(new Error('Ooops, something broke!'));
            } else {
                resolve(randomValue);
            }
        }, 3000);

    });

}

async function logNumbers() {

    for (let x = 0; x < 3; x += 1) {

        console.log(await getRandomNumber());

    }

}

logNumbers();

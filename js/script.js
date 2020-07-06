var t;

const timeInput = document.getElementById('time');
const dateInput = document.getElementById('date');
const resetInput = document.getElementById('reset');
const timeFormInput = document.getElementById('addTimeForm');

function currentTime() {
    let now = new Date();

    let hour = now.getHours();
    let minute = now.getMinutes();
    // let seconds = now.getSeconds();
    let day = now.getDate();
    let month = now.getMonth();
    let year = now.getFullYear();

    hour = cleanTime(hour);
    minute = cleanTime(minute);
    // seconds = cleanTime(seconds);

    // document.getElementById('time').innerHTML = hour + ":" + minute + ":" + seconds;

    timeInput.innerHTML = hour + ":" + minute;
    dateInput.innerHTML = getMonth(month) + " " + day + " " + year;

    t = setTimeout(currentTime, 500);
}

function cleanTime(i) {
    if (i < 10) {
        i = "0" + i
    }
    return i;
}

function stop() {
    if (t) {
        clearTimeout(t);
        window.clearTimeout(t);
        t = 0;
    }
}

function reset() {
    t = setTimeout(currentTime, 500);
    document.getElementById('days').value = "";
    document.getElementById('hours').value = "";
    document.getElementById('minutes').value = "";
    resetInput.style.display = "none";
    timeFormInput.style.display = "block";
}

timeFormInput.addEventListener('submit', function (evt) {
    evt.preventDefault();
    stop();
    let now = addToCurrentTime();

    let hour = now.getHours();
    let minute = now.getMinutes();
    // let seconds = now.getSeconds();
    let day = now.getDate();
    let month = now.getMonth();
    let year = now.getFullYear();

    hour = cleanTime(hour);
    minute = cleanTime(minute);

    // document.getElementById('time').innerHTML = hour + ":" + minute + ":" + seconds;
    timeInput.innerHTML = hour + ":" + minute;
    dateInput.innerHTML = getMonth(month) + " " + day + " " + year;
    resetInput.style.display = "block";
    timeFormInput.style.display = "none";
})

resetInput.addEventListener('click', function () {
    reset();
})

function addToCurrentTime() {
    let totalMinutes;
    let days;
    let hours;
    let minutes;

    function check(item) {
        if (Number.isNaN(parseInt(document.getElementById(item).value))) {
            if (item == 'days') {
                days = 0;
            } else if (item == 'hours') {
                hours = 0;
            } else if (item == 'minutes') {
                minutes = 0;
            }
        } else {
            if (item == 'days') {
                days = parseInt(document.getElementById(item).value);
            } else if (item == 'hours') {
                hours = parseInt(document.getElementById(item).value);
            } else if (item == 'minutes') {
                minutes = parseInt(document.getElementById(item).value);
            }
        }
    }

    check('days');
    check('hours');
    check('minutes');

    totalMinutes = ((days * 24) * 60) + (hours * 60) + minutes;

    if (!totalMinutes || totalMinutes == 0) {
        alert('Something went wrong! Refresh the page and try again. Or the fields were empty');
    } else {
        var d1 = new Date();
        var d2 = new Date(d1);
        d2.setMinutes(d1.getMinutes() + totalMinutes);

        return d2;
    }
}


function getMonth(m) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    return months[m];
}
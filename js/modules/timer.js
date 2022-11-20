function timer() {

    // timer

    const deadLine = new Date('2023-12-31T12:00:00');

    function getRemainingTame(endTime) {
        let remaningTime = Date.parse(endTime) - Date.parse(new Date());
        if (remaningTime <= 0) {
            return {
                total: remaningTime,
                days: 0,
                hours: 0,
                minuts: 0,
                seconds: 0
            }
        } else {
            let remaningDays = Math.floor((remaningTime / (1000 * 60 * 60 * 24)));
            let remaningHours = Math.floor((remaningTime / (1000 * 60 * 60)) % 24);
            let remaningMinuts = Math.floor((remaningTime / (1000 * 60)) % 60);
            let remaningSeconds = Math.floor((remaningTime / (1000)) % 60);

            return {
                total: remaningTime,
                days: remaningDays,
                hours: remaningHours,
                minuts: remaningMinuts,
                seconds: remaningSeconds
            }
        }
    }

    function addZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setTime(selector, endTime) {
        const timeWrapper = document.querySelector(selector);
        const days = timeWrapper.querySelector('#days');
        const hours = timeWrapper.querySelector('#hours');
        const minuts = timeWrapper.querySelector('#minutes');
        const seconds = timeWrapper.querySelector('#seconds');
        const timeInterval = setInterval(updateTime, 1000);
        //вызываем чтоб небылр мегания верстки т к setInerval запуститься только через 1 с
        updateTime();

        function updateTime() {
            const timeDifferens = getRemainingTame(endTime);

            days.innerHTML = addZero(timeDifferens.days);
            hours.innerHTML = addZero(timeDifferens.hours);
            minuts.innerHTML = addZero(timeDifferens.minuts);
            seconds.innerHTML = addZero(timeDifferens.seconds);

            if (timeDifferens.total <= 0) {
                clearInterval(timeInterval);
            }
        }

    }
    setTime('.timer', deadLine);









}


// module.exports = timer;

export default timer;
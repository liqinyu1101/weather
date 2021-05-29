import {
    jquery
} from './jquery.js'
window.$ = jquery

import {
    debounce
} from './debounce.js'

import {
    position
} from './position.js'

let obtain = (params) => {
    if (typeof params == "string") {
        fetch('https://v0.yiketianqi.com/api?version=v61&appid=47693216&appsecret=c0nf7RDz' + params)
            .then(res => res.json())
            .then(res => localStorage.setItem('city', JSON.stringify(res)))
            .catch(e => console.log(e))


        fetch('https://www.tianqiapi.com/free/week?appid=47693216&appsecret=c0nf7RDz' + params)
            .then(res => res.json())
            .then(res => localStorage.setItem('week', JSON.stringify(res)))
            .catch(e => console.log(e))


        fetch('https://v0.yiketianqi.com/api/worldchina?appid=47693216&appsecret=c0nf7RDz' + params)
            .then(res => res.json())
            .then(res => localStorage.setItem('hours', JSON.stringify(res)))
            .catch(e => console.log(e))

        fetch('https://v0.yiketianqi.com/api?version=v62&appid=47693216&appsecret=c0nf7RDz' + params)
            .then(res => res.json())
            .then(res => localStorage.setItem('reminder', JSON.stringify(res)))
            .catch(e => console.log(e))
    } else {
        fetch('https://v0.yiketianqi.com/api?version=v61&appid=47693216&appsecret=c0nf7RDz')
            .then(res => res.json())
            .then(res => localStorage.setItem('city', JSON.stringify(res)))
            .catch(e => console.log(e))


        fetch('https://www.tianqiapi.com/free/week?appid=47693216&appsecret=c0nf7RDz')
            .then(res => res.json())
            .then(res => localStorage.setItem('week', JSON.stringify(res)))
            .catch(e => console.log(e))


        fetch('https://v0.yiketianqi.com/api/worldchina?appid=47693216&appsecret=c0nf7RDz')
            .then(res => res.json())
            .then(res => localStorage.setItem('hours', JSON.stringify(res)))
            .catch(e => console.log(e))

        fetch('https://v0.yiketianqi.com/api?version=v62&appid=47693216&appsecret=c0nf7RDz')
            .then(res => res.json())
            .then(res => localStorage.setItem('reminder', JSON.stringify(res)))
            .catch(e => console.log(e))
    }
}
obtain()

let colours = () => {
    let months = JSON.parse(localStorage.getItem('hours'))
    let {
        hours: hour
    } = months
    let {
        month: days
    } = months
    let week = JSON.parse(localStorage.getItem('week'))
    let cityWea = JSON.parse(localStorage.getItem('city'))
    let {
        data
    } = week;
    let {
        zhishu: reminder
    } = JSON.parse(localStorage.getItem('reminder'))
    // header部分
    $('.location')[0].textContent = cityWea.city;
    $('.cur')[0].textContent = cityWea.city;
    $('#til')[0].textContent = cityWea.air;
    cityWea.air <= 50 ? $('#value')[0].textContent = '优' : cityWea.air <= 100 ? $('#value')[0].textContent = '良' : $('#value')[0].textContent = '差'
    $('.tem-box')[0].textContent = cityWea.tem + '°';
    $('.tem-des')[0].textContent = cityWea.wea;
    $('.text')[0].textContent = cityWea.win + ' ' + cityWea.win_speed;
    $('.text')[1].textContent = '湿度 ' + cityWea.humidity;

    let timer = setInterval(() => {
        $('.text')[0].classList.toggle('show');
        $('.text')[1].classList.toggle('show')
    }, 2500);
    $('.tem-tips')[0].textContent = cityWea.air_tips;
    let hours = cityWea.update_time.split(':')[0].toString();
    hours >= 6 && hours <= 18 ? $('.main')[0].classList.add('day') : $('.main')[0].classList.add('night');
    hours >= 6 && hours <= 18 ? $('.layer')[0].classList.add('bg-day') : $('.layer')[0].classList.add('bg-night');
    hours >= 6 && hours <= 18 ? $('.layer')[1].classList.add('river-day') : $('.layer')[1].classList.add('river-night');
    hours >= 6 && hours <= 18 ? $('.layer')[2].classList.add('forest-day') : $('.layer')[2].classList.add('forest-night');

    // 第一个section
    let dat1 = data[0].wea.substring(0, 2)
    let dat2 = data[1].wea.substring(0, 2)
    console.log(dat1)
    $('.today-p1')[0].children[1].textContent = data[0].tem_day + '/' + data[0].tem_night + '°'
    $('.today-p2')[0].children[0].textContent = dat1;
    $('.today-p2')[0].children[1].classList.add(data[0].wea_img)

    $('.tomor-p1')[0].children[1].textContent = data[1].tem_day + '/' + data[1].tem_night + '°'
    $('.tomor-p2')[0].children[0].textContent = dat2;
    $('.tomor-p2')[0].children[1].classList.add(data[1].wea_img)

    // 第二个section
    let html = ''
    console.log(hour[0])
    for (let i = 0; i < 24; i++) {
        html += `<li class="h-item">
        <p class="h-time">${hour[i].time}</p>
        <p class="weatherFont ${hour[i].wea_img}"></p>
        <p class="h-wea">${hour[i].tem}°</p></li>`
    }
    $(".hours-weather")[0].innerHTML = html
    let html1 = ''
    console.log(days)
    days.forEach(item => {
        let arr = item.date.split("-")
        let dateStr = `${arr[1]}/${arr[2]}`
        let despStr = item.day.phrase
        let despStr1 = item.night.phrase
        let dateDesp = despStr.substring(despStr.length - 2);
        let dateDesp1 = despStr1.substring(despStr1.length - 2)
        let daydetail = `周${item.dateOfWeek.substring(item.dateOfWeek.length - 1)}`
        html1 += `<li class="d-item">
                  <div class="up-part">
                  <p class="day-time">${daydetail}</p>
                  <p class="day-time-detail">${dateStr}</p>
                  <p class="day-wea-des">${dateDesp}</p>
                  <p class="weatherFont ${item.day.phrase_img}"></p>
                  </div>
                  <div class="down-part">
                  <p class="weatherFont ${item.night.phrase_img}"></p>
                  <p class="night-wea-des">${dateDesp1}</p>
                  <p class="night-wea-wind">${item.night.windDirCompass}</p>
                  <p class="night-wea-hum">${item.night.humidity}%</p>
                  </div>
                  </li>`

    });
    $('.days-weather')[0].innerHTML = html1
    $('.days-weather')[0].querySelectorAll(".day-time")[0].textContent = "昨天"
    $('.days-weather')[0].querySelectorAll(".day-time")[1].textContent = "今天"
    $('.days-weather')[0].querySelectorAll(".day-time")[2].textContent = "明天"
    $('.days-weather')[0].querySelectorAll(".day-time")[3].textContent = "后天"
    $(".chuanyi")[0].textContent = reminder.chuanyi.level
    $(".yusan")[0].textContent = reminder.daisan.level
    $(".diaoyu")[0].textContent = reminder.diaoyu.level
    $(".ganmao")[0].textContent = reminder.ganmao.level
    $(".liangshai")[0].textContent = reminder.liangshai.level
    $(".lvyou")[0].textContent = reminder.lvyou.level
    $(".xiche")[0].textContent = reminder.xiche.level
    $(".fangshai")[0].textContent = reminder.ziwaixian.level
    $(".chenlian")[0].textContent = reminder.chenlian.level
}
window.addEventListener('load', colours)

//第三个section

let move = (target, ban) => {
    let startX = 0;
    let moveX = 0;
    let flag = 0
    const baseW = window.screen.width;
    const baseH = window.screen.height;
    target.addEventListener('touchstart', e => {
        startX = e.targetTouches[0].pageX;
    })
    target.addEventListener('touchmove', e => {
        moveX = e.targetTouches[0].pageX - startX;
        flag == 0 ? moveX < 0 ? target.style.transform = `translateX(${moveX}px)` : '' : moveX > 0 ? target.style.transform = `translateX(${-baseW+moveX}px)` : ''
    })
    target.addEventListener('touchend', e => {
        target.style.transition = 'all .5s'
        if (flag == 0 && -moveX <= 0.4 * baseW) {
            target.style.transform = `translateX(0vw)`
        } else if (flag == 0 && -moveX >= 0.4 * baseW) {
            target.style.transform = `translateX(-100vw)`
            flag = 1;
        } else if (flag == 1 && moveX >= 0.4 * baseW) {
            target.style.transform = `translateX(0vw)`
            flag = 0
        } else if (flag == 1 && moveX <= 0.4 * baseW) {
            target.style.transform = `translateX(-100vw)`
        }

    })
    target.addEventListener('transitionend', () => {
        target.style.transition = ''
        ban.querySelector(".now").classList.remove('now')
        ban.children[flag].classList.add('now')
    })
}
move($('#sec-reminder')[0], $('.move-bar')[0])
$('.location-container')[0].addEventListener('touchstart', () => $('#search')[0].style.transform = 'translateY(0)')
$('.btn-cancel')[0].addEventListener('touchstart', () => $('#search')[0].style.transform = 'translateY(-100vh)')
$('#i-location')[0].addEventListener('input', debounce(() => {
    let keywords = $('#i-location')[0].value;
    console.log(position)
    let cityArr = position.filter(item => item.includes(keywords))
    $(".ct-wrapper")[0].style.display = 'none'
    let html = ''
    cityArr.forEach(item => {
        html += `<p class="result-city">${item}</p>`
    })
    $('.search-result-wrap')[0].innerHTML = html

}, 1000))

$('.result-city').forEach(item => item.addEventListener('touchstart', () => {
    let keywords = item.innerText;
    $('#search')[0].style.transform = 'translateY(-100vh)'
    let params = `&city=${keywords}`
    obtain(params);
    colours()
}))

$('.city').forEach(item => item.addEventListener('touchstart', () => {
    let keywords = item.innerText;
    $('#search')[0].style.transform = 'translateY(-100vh)'
    let params = `&city=${keywords}`
    obtain(params);
    colours()
}))
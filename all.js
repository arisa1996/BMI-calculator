//BMI = 體重(公斤) / (身高(公尺) x 身高(公尺)) 

//共用變數
let judge = '';
let bmi = 0;

//DOM節點
let resultBtn = document.querySelector('.resultBtn');
let list = document.querySelector('.list');
let clear = document.querySelector('#clearHistory');
let data = JSON.parse(localStorage.getItem('BMIdata')) || [];

//監聽(事件)
resultBtn.addEventListener('click',action,false);
clear.addEventListener('click',deleteOn,false);

//預先載入歷史資料(介面)
if (data.length != 0) {
    listData();
}
//輸入值後(資料)
function action(){
    //取得輸入值
    let h = document.querySelector('#height').value;
    let w = document.querySelector('#body-weight').value;
    
    //檢查如果是非數字
    let h_check = Number(h);
    let w_check = Number(w);
    if(isNaN(h_check) || isNaN(w_check)){
        alert('請填入數字');
        return;
    }else if(h == ''|| w == ''|| h<=0 || w<=0){
        alert('請填入身高/體重,數值不可為0')
        return;
    }
  
    //執行
    let lev = calculator(h,w);
    addData(h,w,lev);
    listData(); 
    changeBtn();  
}

//計算bmi(資料)
function calculator(h,w){  
    let bmiBefore = w / Math.pow(h / 100, 2);
    bmi = bmiBefore.toFixed(2); //toFixed讓小數點4捨5入只有2位
    let lev; 
    //判定BMI指標
    if( bmi < 18.5){
        judge = "過輕";
        lev = 1;
    }else if( bmi >=18.5 &&  bmi < 24){
        judge = "理想 "
        lev = 2;
    }else if( bmi >=24 &&  bmi < 27){
        judge = "過重 "
        lev = 3;
    }else if( bmi >=27 &&  bmi < 30){
        judge = "輕度肥胖 "
        lev = 4;
    }else if( bmi >=30 &&  bmi < 35){
        judge = "中度肥胖 "
        lev = 5;
    }else if( bmi  >=35){
        judge = "重度肥胖 "
        lev = 6;
    } 
    return lev;
}

//變更btn樣式(介面+事件)
function changeBtn(){
    let str = `
        <div class="changeBtn btn${data[data.length-1].lev}">
            <p class="newBtn">${bmi}</p>
            <p class="BMI">BMI</p>
            <p class="judge">${judge}</p>
            <a href="javaScript:;" id="refreshBtn">
                <img src="https://buggyho.github.io/BMIcalculate/img/icons_loop.png" alt="">
            </a>
        </div>
        `
    resultBtn.innerHTML = str;
    
    //設定重新整理
    let reorganize = document.getElementById('refreshBtn');
    reorganize.addEventListener('click',function(e){
        e.preventDefault();
        window.location.reload();
    },false)
}

//取得今天日期(介面)
function today() {
    let today = new Date();
    let time =  today.getFullYear()+ '-' + (today.getMonth() + 1) + '-' +today.getDate() ;
    return time;
}

//建立JSON&存入localStorage(資料)
function addData(h,w,lev){
    let totalResult = {
        height:h,
        weight:w,
        BMI:bmi,
        judge: judge,
        time:today(),
        lev: lev
    }
    data.push(totalResult);
    localStorage.setItem('BMIdata', JSON.stringify(data));
}

//更新list內容(介面)
function listData(){ 
    let item = document.createElement(`li`);
    let len = data[data.length-1];
    item.className = `listLi lev${len.lev}`;
    item.innerHTML = `
    <p class="style">${len.judge}</p>
    <p>BMI<span>${len.BMI}</span></p>
    <p>weight<span>${len.weight}kg</span></p>
    <p>height <span>${len.height}cm</span></p>
    <p>${len.time}</p>
    `
    if (list.children) {
        list.insertBefore(item, list.children[0]);
    } else {
        list.appendChild(item)
    }
}

//清除localStorage資料
function deleteOn(){
    localStorage.removeItem('BMIdata');
    data = [];
    list.innerHTML = '';
}




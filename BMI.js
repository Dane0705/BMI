// DOM
var clear_all = document.getElementById('clear_all');   //清除
var menu = document.querySelector('.menu');             //BMI bars
var loop = document.querySelector('.loop');             //reset input\result
var resultId = document.getElementById('resultId');     //運算
var data = JSON.parse(localStorage.getItem('result')) || [];    //跑資料

//監聽
resultId.addEventListener('click',mathBMI,false);
loop.addEventListener('click',function(){
    document.getElementById('tallId').value='';
    document.getElementById('weightId').value='';
    resultId.classList.remove('resultgreen','resultblue','resultorange','resultfat_1','resultfat_3');
    resultId.classList.add('result')
    spanId.style.display='none';
    loop.style.display='none';
    effectId.style.display='none';
    BMI.textContent='看結果';
    BMI.style.marginTop='42px';
})
clear_all.addEventListener('click',clear,false);
updatedata(data);


//result 樣式
function mathBMI(e){
    //輸入資料
    var tallId = document.getElementById('tallId').value/100;
    var weightId = document.getElementById('weightId').value;
    if(tallId == '' || weightId =='' ){
        return 
    }
    
    //BMI字體
    var spanId = document.getElementById('spanId');
    var loop =document.querySelector('.loop');
    var BMI = document.getElementById('BMI');
    
    //判斷肥胖程度
    var effectId =document.getElementById('effectId');
    var resultId = document.getElementById('resultId')
    
    //運算
    var b = weightId/(tallId*tallId);
    document.getElementById('BMI').textContent = Math.floor(b*100)/100;

    if(BMI.textContent >= 18.5 && BMI.textContent <=25){
        resultId.classList.remove('result');
        resultId.classList.add('resultgreen');
        BMI.style.marginTop='32px'
        BMI.style.fontSize='28px'
        spanId.style.display='block';
        loop.style.display='block';
        loop.style.background='#86D73E'
        effectId.style.color='#86D73E';
        effectId.textContent='理想';   
    }
    else if(BMI.textContent <= 16 && BMI.textContent <18.5){
        resultId.classList.remove('result');
        resultId.classList.add('resultblue');
        BMI.style.marginTop='32px'
        BMI.style.fontSize='28px'
        spanId.style.display='block';
        loop.style.display='block';
        loop.style.background='#31BAF9'
        effectId.style.color='#31BAF9';
        effectId.textContent='過輕';
    }
    else if(BMI.textContent >= 25 && BMI.textContent <30){
        resultId.classList.remove('result');
        resultId.classList.add('resultorange');
        BMI.style.marginTop='32px'
        BMI.style.fontSize='28px'
        spanId.style.display='block';
        loop.style.display='block';
        loop.style.background='#FF982D'
        effectId.style.color='#FF982D';
        effectId.textContent='過重';
    }
    else if(BMI.textContent >= 30 && BMI.textContent <35){
        resultId.classList.remove('result');
        resultId.classList.add('resultfat_1');
        BMI.style.marginTop='32px'
        BMI.style.fontSize='28px'
        spanId.style.display='block';
        loop.style.display='block';
        loop.style.background='#FF6C02'
        effectId.style.color='#FF6C02';
        effectId.textContent='輕度肥胖';     
    }
    else if(BMI.textContent >= 35 && BMI.textContent <40){
        resultId.classList.remove('result');
        resultId.classList.add('resultfat_1');
        BMI.style.marginTop='32px'
        BMI.style.fontSize='28px'
        spanId.style.display='block';
        loop.style.display='block';
        loop.style.background='#FF6C02'
        effectId.style.color='#FF6C02';
        effectId.textContent='中度肥胖';     
    }
    else if(BMI.textContent >40){
        resultId.classList.remove('result');
        resultId.classList.add('resultfat_3');
        BMI.style.marginTop='32px'
        BMI.style.fontSize='28px'
        spanId.style.display='block';
        loop.style.display='block';
        loop.style.background='#FF1200'
        effectId.style.color='#FF1200';
        effectId.textContent='重度肥胖';
    }
    var todo ={
        tall : tallId,
        weight : weightId,
        BMI : document.getElementById('BMI').textContent,
        situation : effectId.textContent,
        effectcolor : loop.style.background
    };
    data.push(todo);
    updatedata(data);
    localStorage.setItem('result',JSON.stringify(data));

};

//LIST內容新增
function updatedata(){
    var dttoday = new Date();
    var output = (dttoday.getMonth()+1)+'-';
    output += dttoday.getDate() +'-' ;
    output += dttoday.getFullYear();
    
    let num = data.length;
    var str = '';

    for(var i = 0 ; i<num ; i++){
        str+= `
        <li class="bar" >
            <ul class="menu_wrap">
                <li class="line" style="background:${data[i].effectcolor};" ></li>
                <li style="width:130px;float: left;margin-left:10px;">${data[i].situation}</li>
                <li style="width:130px;float: left;">BMI<a style="margin-left:10px;display:inline-block">${data[i].BMI}</a></li>
                <li style="width:130px;float: left;">weight<a style="margin-left:10px;display:inline-block">${(data[i].tall)*100}</a></li>
                <li style="width:130px;float: left;">height<a style="margin-left:10px;display:inline-block">${data[i].weight}</a></li>
                <li class="datebar" style="float: right;margin-right: 10px;">${output}</li>
            </ul>
        </li> 
        `
    }
    menu.innerHTML = str;
}

// 清除
function clear(){
    data =[];
    localStorage.setItem('result',JSON.stringify(data));
    updatedata(data);
}




const date = document.getElementById("date");
const addExpBtn = document.getElementById("add-btn");
const xBtn = document.getElementById("x-btn");
const addBox = document.querySelector("#add-exp");
const totalExpense = document.getElementById("total-expense");
const food = document.getElementById("food");
const userDate = document.getElementById("date");
const bus = document.getElementById("bus");
const groc = document.getElementById("groc");
const addDesc = document.getElementById("add-desc");
const addAmount = document.getElementById("add-amount");
const submitBtn = document.getElementById("submit");
const reportContainer = document.getElementById("report-container");
const reports = document.getElementById("reports");
const addExpCont = document.getElementById("left-bottom");
const reportData = document.getElementById("bottomLast");
const ddate = document.getElementById("recval1");
const dfood = document.getElementById("recval2");
const dbus = document.getElementById("recval3");
const dgroc = document.getElementById("recval4");
const ddesc = document.getElementById("recval5");
const damount = document.getElementById("recval6");
const dispList = document.getElementById("dispReportOther");
const closeDisp = document.getElementById("closeDisp");
const otherDispHead = document.getElementById("otherDispHead");

document.getElementById("date").valueAsDate = new Date();

// const Data = [
//     {date:"14-05-2023",food:10,bus:11,groc:12}, {date:"15-05-2023",food:20,bus:21,groc:22},
//     {date:"16-05-2023",food:30,bus:31,groc:32,shirt:450}]
// let expenses = Data;
// console.log(Object.keys(Data[0]).length)

const localStorageData = JSON.parse(localStorage.getItem("expenseData"));

let Data = localStorage.getItem("expenseData") !== null ? localStorageData : [];
let expenses = Data;

function loadReport(expenses){
    reportContainer.innerHTML = " ";
    total = 0;
    expenses.forEach(element => {
        loadrep(element)
    });
    totalExpense.innerHTML = Number(total).toFixed(2);
};

function stringDate(dat){
    spl = dat.split("-")
    var datee = ""
    spl.forEach(element =>{
        datee += element
    })
    return datee;
};

function loadrep(data){
    console.log(data)
    upDate = data.date;
    clickdate = stringDate(upDate)
    // console.log(clickdate)
    lastRate = data.amount == null ? "0" : (data.amount).toString();
    console.log(lastRate,typeof(lastRate))
    otherRate = lastRate.indexOf(",") == -1 ? Number(lastRate) : splitamount(lastRate); 
    console.log(otherRate,typeof(otherRate))
    function splitamount(st){
        arr = st.split(",") 
        tot = 0
        arr.forEach(element =>{
            tot += Number(element)
        })
        return tot
    }
    // console.log(otherRate, typeof(otherRate))
    upRate = Object.keys(data).length == 4 ? data.food + data.bus + data.groc : data.food + data.bus + data.groc + otherRate;
    total += upRate;
    reportContainer.innerHTML += `<li class="reports" onclick = "displayReport(${clickdate})"><span class="rep-date">${upDate}</span> <span class="epx-rate">${upRate.toFixed(2)}</span> <button class="xbtn" onclick ="deleteRecord(${clickdate})" id="del-btn">x</button></li>`;
}

loadReport(expenses);
//alert("The Records that you added are stored in your browser's memory !")

submitBtn.addEventListener("click",(event)=>{
    event.preventDefault();
    let extra = {"date":date.value, "food":Number(food.value), "bus":Number(bus.value), "groc":Number(groc.value), "desc":addDesc.value, "amount":Number(addAmount.value)};
    let normal = {"date":date.value, "food":Number(food.value), "bus":Number(bus.value), "groc":Number(groc.value) };
    
    if (food.value && bus.value && groc.value ){
        valuee = "new"
        position = 0
        checknew(date.value);
        // console.log(valuee)
        newData = addDesc.value && addAmount.value ? extra : normal ;
    }else{
        alert("All Records Must be Filled !")
    }
    if (valuee == "new"){
        Data.push(newData);
    }else{
        oldRec = Data[position-1]
        updatedata(oldRec)
        // console.log(oldRec)
    }
    
    updatelocalstorage()
    loadReport(expenses);
    //console.log(Data)
})
function updatedata(oldRec){
    if(addDesc.value){
        oldRec.food += Number(food.value)
        oldRec.bus += Number(bus.value)
        oldRec.groc += Number(groc.value)
        oldRec.desc = null ? addDesc.value : oldRec.desc += "," + addDesc.value
        oldRec.amount = null ? addAmount.value : oldRec.amount += "," + addAmount.value
        console.log(oldRec.amount)
    }else{
        oldRec.food += Number(food.value)
        oldRec.bus += Number(bus.value)
        oldRec.groc += Number(groc.value)
        
    }
}
function checknew(newDate){
    expenses.forEach(item =>{
//        //console.log(item.date)
        position += 1
        if (item.date == newDate){
            valuee = "exist"
            console.log(position)
        }
    })
}
addExpBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    addBox.style.display = "block";
})
xBtn.addEventListener("click",(event)=>{
    event.preventDefault()
    addBox.style.display = "none";
    addDesc.value = " "
    addAmount.value = null
})
closeDisp.addEventListener("click",(event)=>{
    event.preventDefault()
    reportData.style.display = "none";
    addExpCont.style.display = "block";
})

function displayReport(dt){
    addExpCont.style.display = addExpCont.style.display == "block" ? "none" : "block";
    if (addExpCont.style.display == "block"){
        dispList.innerHTML = " "
        otherDispHead.style.display = "none";
    }
    reportData.style.display = addExpCont.style.display == "block" ? "none": "block";
    // console.log(dt,typeof(dt))
    expenses.forEach(item =>{
        cdat = stringDate(item.date)
        if (Number(cdat) == dt){
            itemLen = Object.keys(item).length
            if (itemLen == 4){
                dispdata(item)
            }else{
                dispdata(item)
                otherDispHead.style.display = "block";
                dispOther(item)
                //dispList.innerHTML += `<ul class="rec"><span class="rec1">Bus</span> <span id="recval3">00</span></ul>`
            }
            
        }
    })
}

function dispdata(item){
    ddate.innerHTML = item.date
    dfood.innerHTML = item.food
    dbus.innerHTML = item.bus
    dgroc.innerHTML = item.groc
}
function dispOther(obj){
    dispList.innerHTML = " "
    console.log(obj.desc , obj.amount)
    let descArr = (obj.desc).split(",");
    let amountArr = (obj.amount.toString()).split(",");
    descArr.forEach(element =>{
        ind = descArr.indexOf(element)
        dispList.innerHTML += `<ul class="rec"><span>${element}</span> <span>${amountArr[ind]}</span></ul>`
    })
}
function deleteRecord(dt){
    indd = 0
    expenses.forEach(item =>{
        indd += 1
        cdat = stringDate(item.date)
        if (Number(cdat) == dt){
            let usercon = confirm("Are You Sure ? Do you want to delete the particular Record Permanently ?")
            usercon ? expenses.splice(indd-1,1) : window.location.reload();
            updatelocalstorage();
            loadReport(expenses);
        }
    })
}
function updatelocalstorage(){
    localStorage.setItem("expenseData",JSON.stringify(Data))
    window.location.reload();
}
function dispRight(){
    (document.getElementById("left")).style.display = "none";
    (document.getElementById("right")).style.display = "block";
    (document.getElementById("homePage")).classList.remove("active-link");
    (document.getElementById("reportPage")).classList.add("active-link");
}
function dispLeft(){
    (document.getElementById("left")).style.display = "block";
    (document.getElementById("right")).style.display = "none";
    (document.getElementById("homePage")).classList.add("active-link");
    (document.getElementById("reportPage")).classList.remove("active-link");
}
function abt(){
    alert("... This Page may be updated in Future ... Thankyou !")
}

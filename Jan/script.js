const headerForm = document.querySelector("[data-header-form]");
const headerInput = document.querySelector("[data-header-input]");
const headerLabel = document.querySelector("[data-header-label]");

const LOCAL_STORAGE_Month_KEY = "Jan";
let month = JSON.parse(localStorage.getItem(LOCAL_STORAGE_Month_KEY))||[];
const LOCAL_STORAGE_SELECT_ID_KEY = "Jan.id";
let selectID = localStorage.getItem(LOCAL_STORAGE_SELECT_ID_KEY);

headerLabel.textContent = month.monthName;
headerForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const newMonthName = headerInput.value;
    if(newMonthName){
        const newMonth = createNewMonth(newMonthName);
        month = newMonth;
        saveLS();
    }
    
    headerLabel.textContent = month.monthName;
})

function createNewMonth(name){
    return {
        id: Date.now().toString(),
        monthName: name,
        dates: []
    }
}
function saveLS(){
    localStorage.setItem(LOCAL_STORAGE_Month_KEY, JSON.stringify(month));
    localStorage.setItem(LOCAL_STORAGE_SELECT_ID_KEY, selectID);
}

const dateSection = document.querySelector("[data-date-section]");
const dateList = document.querySelector("[data-date-list]");
const dateForm = document.querySelector("[data-date-form]");
const dateInput = document.querySelector("[data-date-input]");
const addDateBtn = document.querySelector("[data-add-date-btn]");
const delDateBtn = document.querySelector("[data-del-date-btn]");

dateForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const newDateName = dateInput.value;
    if(newDateName){
        const newDate = createNewDate(newDateName);
        month.dates.push(newDate);
        saveLS();
        displayDates()
    }
   dateInput.value = null;
})

function createNewDate(name){
    return{
        id: Date.now().toString(),
        dateName: name,
        details: [],
        totalValue: ""
    }
}
dateList.addEventListener("click", (e)=>{
    if(e.target.tagName.toLowerCase() === "li"){
        selectID = e.target.id;
        saveLS();
        displayDates();
        disPlayDetails();
    }
})
delDateBtn.addEventListener("click", ()=>{
    month.dates = month.dates.filter(date=> date.id !== selectID);
    displayDates();
    selectID = null;
    saveLS()
    disPlayDetails()
})
function displayDates(){
    clearContainer(dateList);
    month.dates.forEach(date=>{
        const dateItem = document.createElement("li");
        dateItem.id= date.id;
        if(date.id === selectID){
            dateItem.classList.add("active")
        }
        dateItem.classList.add("date-item");
        dateItem.textContent = date.dateName;
        dateList.append(dateItem)
    })
}
displayDates()




const detailSection = document.querySelector("[data-detail-section]");
const detailList = document.querySelector("[data-detail-list]");
const detailForm = document.querySelector("[data-detail-form]");
const detailInput = document.querySelector("[data-detail-input]");
const checkBtn = document.querySelector("[data-check-btn]");
const totalOutput = document.querySelector("[data-total-output]");


detailForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const newDetail = detailInput.value;
    const curDate= month.dates.find(date=> date.id === selectID);
    if(newDetail){
        curDate.details.push(newDetail);
        saveLS();
        disPlayDetails();
    }
    detailInput.value = null;
})
function disPlayDetails(){
    clearContainer(detailList);
    const curDate= month.dates.find(date=> date.id === selectID);
    if(curDate.deatils !== []){
        totalOutput.textContent = curDate.totalValue
    }else{
        totalOutput.textContent = 0
    }
    curDate.details.forEach(detail=>{
        const detailItem = document.createElement("li");
        detailItem.classList.add("detail-item");
        detailItem.textContent = detail;
        detailList.append(detailItem);
    })
}
disPlayDetails()

checkBtn.addEventListener("click", ()=>{
    const curDate= month.dates.find(date=> date.id === selectID);
    const totalNmbList = curDate.details.map(item=> parseInt(item.match(/\d/g).join("")));
    const total = totalNmbList.reduce((a, b)=> a+b, 0);
    curDate.totalValue = total;
    saveLS();
    totalOutput.textContent = curDate.totalValue
})
function clearContainer(container){
    while(container.firstChild){
        container.removeChild(container.firstChild)
    }
}



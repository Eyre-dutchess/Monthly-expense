const LOCAL_STORAGE_MONTH_KEY = "nov-expense";
const LOCAL_STORAGE_SELECTED_DATE_KEY = "nov-selected-id";
let month = JSON.parse(localStorage.getItem(LOCAL_STORAGE_MONTH_KEY))||[];
let selected_date = localStorage.getItem(LOCAL_STORAGE_SELECTED_DATE_KEY);


const monthNameForm = document.querySelector("[data-month-form]");
const monthNameOutput = document.querySelector("[data-month-name-output]");
const monthNameInput = document.querySelector("[data-month-name-input]");


monthNameOutput.textContent = month.monthName;
monthNameForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const monthName = monthNameInput.value;
    const newMonth = createNewMonth(monthName);
    month = newMonth;
    monthNameOutput.textContent = month.monthName;
    saveLS();
})

function createNewMonth(name){
    return {
        monthName: name,
        dates: [],
    }
}

const dateList = document.querySelector("[data-date-list]");
const dateForm = document.querySelector("[data-date-form]");
const dateInput = document.querySelector("[data-date-input]");
const addDateBtn = document.querySelector("[data-add-date-btn]");
const delDateBtn = document.querySelector("[data-del-date-btn]");
const totalOutput = document.querySelector("[data-total-output]");

dateForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const newDateName = dateInput.value;
    if(newDateName){
         const newDate = createNewDate(newDateName);
         month.dates.push(newDate);
         saveLS();
         displayDates()
    }
    dateInput.value = "";
})

dateList.addEventListener("click", (e)=>{
    if(e.target.tagName.toLowerCase()==="li"){
        selected_date = e.target.id;
        saveLS();
        displayDates();
        displayDetail()
    }
})

function createNewDate(name){
    return{
        id: Date.now().toString(),
        dateName: name,
        dailyDetail: [],
        total: ""
    }
}

function saveLS(){
    localStorage.setItem(LOCAL_STORAGE_MONTH_KEY, JSON.stringify(month));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_DATE_KEY, selected_date);
}
function displayDates(){
    clearContainer(dateList);
    month.dates.forEach(date=>{
        const dateItem = document.createElement("li");
        dateItem.classList.add("date-item");
        dateItem.id = date.id;
        if(date.id === selected_date){
            dateItem.classList.add("active");
            totalOutput.textContent = date.total;
        }
        dateItem.textContent = date.dateName;
        
        dateList.append(dateItem)
    })
    
}
displayDates();
delDateBtn.addEventListener("click", ()=>{
    month.dates= month.dates.filter((item)=> item.id !== selected_date);
    saveLS();
    displayDates();
    selected_date = null;
})


const detailContainer = document.querySelector("[data-detail-container]");
const detailList = document.querySelector("[data-detail-list]");
const detailForm = document.querySelector("[data-detail-form]");
const detailInput = document.querySelector("[data-detail-input]");
const checkBtn = document.querySelector("[data-check-btn]");


detailForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const newDetailCont = detailInput.value;
    if(newDetailCont){
         const newDetail = createNewDetail(newDetailCont);
         const curDate = month.dates.filter((item)=> item.id === selected_date);
         curDate[0].dailyDetail.push(newDetail);
         saveLS();
         displayDetail()
    }
    detailInput.value = "";
})

function createNewDetail(content){
    return{
        id: Date.now().toString(),
        detail: content,
        value: content.match(/\d/g).join(""),
    }
}
function displayDetail(){
    clearContainer(detailList);
    if(selected_date === null){
        detailContainer.innerHTML = ``
    }else{
        const curDate = month.dates.filter((item)=> item.id === selected_date)[0];
        curDate.dailyDetail.forEach(detail=>{
            const detailItem = document.createElement("li");
            detailItem.classList.add("detail-item");
            detailItem.textContent = detail.detail;
            detailList.append(detailItem)
        })
    }
   
}
displayDetail()
checkBtn.addEventListener("click", ()=>{
    const curDate = month.dates.filter((item)=> item.id === selected_date)[0];
    const valueList = curDate.dailyDetail.map(item=> parseInt(item.value));
    totalValue = valueList.reduce((a, b )=> a+b, 0);
    curDate.total = totalValue;
    totalOutput.textContent = totalValue;
    saveLS();
    displayDates()
})

function clearContainer(item){
    while(item.firstChild){
        item.removeChild(item.firstChild)
    }
}
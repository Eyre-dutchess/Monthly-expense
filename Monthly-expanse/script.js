// const exps = [
//     {
//         day: "01",
//         expense: "hotel: 1150, car-ride: 285"
//     },
//     {
//         day: "03",
//         expense: "food: 62, casa: 47, taxi: 74, c-store:20"
//     },
//     {
//         day: "04",
//         expense: "lunch: 18, lawson(mask): 15, deposit: 6800, commission: 2380, UK(unknown): 108, couch-cleaning: 180, lock: 30, cleaning-lady: 180 ,IKEA: 477 ,taxi: 48 ,foot-massage: 100, UK: 178"
//     },
//     {
//         day: "05",
//         expense: "lunch: 16, bra...: 40, UK(9-5-8-39): 18, rent: 20400,  lock: 280, UK(8-20): 39, sticker: 30, water: 23, taxi: 81"
//     },
//     {
//         day: "06",
//         expense: "SF: 50, UK(7-56): 490, lunch: 18, taxi: 16, UK(11):120, vape: 352, storage-moving: 200, UK(13): 84, bike(monthly): 12, UK(21): 67"
//     },
//     {
//         day: "07",
//         expense: "lunch: 17, UK(7/13/14): 74, taxi: 89, SF: 64, UK(18/21): 122"
//     }
// ]







        
        
        
    
            

        //to get value: 
       


        const addNewBtn = document.querySelector("[data-add-new-btn]");
        const allMonthContainer = document.querySelector("[data-all-monthes]");
        
        const LOCAL_STORAGE_MONTH_KEY = "test-monthes_detail";
        const LOCAL_STORAGE_SELECTED_DATE_KEY = "select_date-ID";
        let monthes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_MONTH_KEY))||[];
        let currentID = localStorage.getItem(LOCAL_STORAGE_SELECTED_DATE_KEY);
        
        addNewBtn.addEventListener("click", ()=>{
            const newMonth = createNewMonth();
            monthes.push(newMonth);
            saveAndRender();
        })
        
        function createNewMonth(){
            return{
                id:Date.now().toString(),
                monthName: "",
                dates: [],
            }
        }
        function saveAndRender(){
            saveLS();
            renderMonthes();
        }
        function saveLS(){
            localStorage.setItem(LOCAL_STORAGE_MONTH_KEY, JSON.stringify(monthes));
            localStorage.setItem(LOCAL_STORAGE_SELECTED_DATE_KEY, currentID);
        }
        
        function renderMonthes(){
            clearContainer(allMonthContainer);
            monthes.forEach(month => {
                const monthEl = document.createElement("div");
                monthEl.classList.add("month-container");
                monthEl.innerHTML = `
                    <form action="" class="name-form" data-month-name>
                        <input type="text" id="name-input" class="name-input" data-month-input>
                        <label for="name-input" class="name-label">${month.monthName}</label>
                    </form>
                    <button class="del-month-btn">X</button>
        
                    <div class="date-nav" data-date-nav>
                        <ul class="date-list" data-date-list>
                            <li class="date-item active" ></li>
                        </ul>
                        <form class="date-form" data-date-form>
                            <input type="text" class="date-input" data-date-input placeholder="day">
                            <button class="add-new-date-btn" data-add-new-date-btn></button>
                        </form>
                        <button class="del-date-btn"></button>
                    </div>
        
                    <div class="expense-container" data-expense-container>
                        <form action="" class="expense-form" data-expense-form>
                            <button class="add-new-expense"></button>
                            <input type="text" class="expense-input" placeholder="add new expense" data-expense-input>
                        </form>
                        <ul class="daily-expense-list" data-daily-expense-container>
                            <li></li>
                            <button>
                        </ul>
                        <div class="output-container" data-output-container>
                            
                        </div>
                       
                    </div>
         
                `
                //top-name
                const nameForm = monthEl.querySelector("[data-month-name]");
                const nameInput = monthEl.querySelector("[data-month-input]");
                const delMonthBtn = monthEl.querySelector(".del-month-btn");
        
                nameForm.addEventListener("submit", (e)=>{
                    e.preventDefault();
                    const newMonthName = nameInput.value;
                    month.monthName = newMonthName;
                    saveAndRender()
        
                })
                
                delMonthBtn.addEventListener("click", ()=>{
                    monthes = monthes.filter(item=> item!== month);
                    saveAndRender()
                })
                
                const delDateBtn = monthEl.querySelector(".del-date-btn");
                delDateBtn.addEventListener("click", ()=>{
                    month.dates = month.dates.filter(item => item.id !== currentID);
                    currentID = null;
                    saveAndRender();
                })
                //date-nav
                const dateContainer = monthEl.querySelector("[data-date-list]");
                const dateForm = monthEl.querySelector("[data-date-form]");
                const dateInput = monthEl.querySelector("[data-date-input]");
               
                
                const expenseContainer = monthEl.querySelector("[data-expense-container]");
        
                dateContainer.addEventListener("click", (e)=>{
                    if(e.target.tagName.toLowerCase()==="li"){
                        currentID = e.target.id;
                        saveAndRender();
                    }
                })
                dateForm.addEventListener("submit", (e)=>{
                    e.preventDefault();
                    const newDateName = dateInput.value;
                    if(newDateName == null || newDateName === "") return;
                    const newDate = createNewDate(newDateName);
                    month.dates.push(newDate);
                    saveAndRender()
                })
        
                function createNewDate(name){
                    return {
                        id: Date.now().toString(),
                        dateName: name,
                        expenses: [],
                        total: "",
                    }
                }
        
                //daily expense
                const expenseListContainer = monthEl.querySelector("[data-daily-expense-container]");
                const expenseForm = monthEl.querySelector("[data-expense-form]");
                const expenseInput = monthEl.querySelector("[data-expense-input]");
                const outputContainer = monthEl.querySelector("[data-output-container]")
        
                expenseListContainer.addEventListener("click", (e)=>{
                    if(e.target.tagName.toLowerCase()==="p"){
                        const currentExpense = e.target.parentElement;
                        currentExpense.classList.toggle("selected");  
                    } 
                    // if(e.target.tagName.toLowerCase() === "button"){
                    //     const currentExpense = e.target.parentElement;
                    //     const currentDate = month.dates.find(date=> date.id === currentID);
                    //     currentDate.expenses = currentDate.expenses.filter(item=> item !== currentExpense);
                    //     saveAndRender()
                    // }  
                    
                })
                expenseForm.addEventListener("submit", (e)=>{
                    e.preventDefault();
                    const newExpense = expenseInput.value;
                    if(newExpense == null || newExpense === "") return;
                    const currentDate = month.dates.find(date=> date.id === currentID);
                    const newExpenseItem = createNewExpense(newExpense);
                    currentDate.expenses.push(newExpenseItem);
                    expenseInput.value = "";
                    saveAndRender();
                })
                function createNewExpense(expense){
                    return{
                        id: Date.now().toString(),
                        dailyExpItem: expense,
                        value: expense.match(/\d/g).join(""),
                    }
                }
        
                function renderDates(){
                    clearContainer(dateContainer);
                    displayDates(); 
                    if(currentID == null){
                        expenseContainer.style.display = "none";
                    }else{
                        expenseContainer.style.display = "";
                        const currentDate = month.dates.find(date=> date.id === currentID);
                        const currentExpenses = currentDate.expenses;
                        clearContainer(expenseListContainer)
                        displayDailyExpenses(currentExpenses);
                        displayDailyTotal(currentDate);
                    }
                }
                function displayDates(){
                    month.dates.forEach(date=>{
                        const dateEl = document.createElement("li");
                        dateEl.classList.add("date-item");
                        dateEl.innerText = date.dateName;
                        dateEl.id = date.id;
                        if(date.id === currentID){
                            dateEl.classList.add("active");
                        }
                        dateContainer.append(dateEl);
                    })
                }
        
                
                renderDates();
        
                
                function displayDailyExpenses(exps){
                    exps.forEach(expense=>{
                        const dailyExpEl = document.createElement("li");
                        dailyExpEl.classList.add("daily-expense-item") ;
                        dailyExpEl.style.display = "list-item";
                        dailyExpEl.innerHTML = `
                                <p>${expense.dailyExpItem}</p>
                                <button class="del-exp-btn">X</button>
                        `
                        expenseListContainer.append(dailyExpEl);
                    })
                }
        
                
                function displayDailyTotal(date){
                    const outputEl = document.createElement("div");
                    outputEl.classList.add("output-inner-container");
                    outputEl.innerHTML = `
                            <button class="check-btn"></button>
                            <div class="total-container" data-total-container>
                                <p>Total: </p>
                                <p class="total-output" data-total-output>${date.total}</p>
                            </div>
        
                    `
        
                    const checkBtn = outputEl.querySelector(".check-btn");
                    checkBtn.addEventListener("click", ()=>{
                        const totalList = date.expenses.map(item=> item.value);
                        const numList = totalList.map(item => parseInt(item));
                        const totalAmount = numList.reduce((a, b)=> a+b, 0);
                        date.total = totalAmount;
                        saveAndRender()
                    })
                    outputContainer.append(outputEl);
                }
                
                
        
                allMonthContainer.append(monthEl)
            });
        }
        
        function clearContainer(container){
            while(container.firstChild){
                container.removeChild(container.firstChild);
            }
        }
        renderMonthes()
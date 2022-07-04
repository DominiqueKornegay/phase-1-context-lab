/* Your Code Here */
function createEmployeeRecord(record) {
    return {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords (recordArr){
    return recordArr.map(rec => createEmployeeRecord(rec))
}

function createTimeInEvent(empRec, dateStamp) {
    const [date, hour] = dateStamp.split(" ")

    const inTime = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }

    empRec.timeInEvents.push(inTime)
    
    return empRec
  
    
}

function createTimeOutEvent(empRec, dateStamp) {
    const [date, hour] = dateStamp.split(" ")

    const outTime = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }

    empRec.timeOutEvents.push(outTime)
    
    return empRec
  
    
}

function hoursWorkedOnDate (emprec, empDate) {
   
    const recInTime = emprec.timeInEvents.find(iTime => iTime.date === empDate)
    const recOutTime = emprec.timeOutEvents.find(oTime => oTime.date === empDate)

    return (recOutTime.hour - recInTime.hour) / 100
    
}

function wagesEarnedOnDate (emprec, empDate) {
    return hoursWorkedOnDate(emprec, empDate) * emprec.payPerHour
}

function allWagesFor(emprec) {
  const allDates = emprec.timeInEvents.map(workDay => workDay.date)


    const allWages = allDates.reduce((money, date) => {
     return money + wagesEarnedOnDate (emprec, date)
    }, 0)
  return allWages
}

function calculatePayroll(emprec) {
    const payRoll = emprec.map(person => allWagesFor(person))
    const totalPayRoll = payRoll.reduce((amount, pay) => {
        return amount + pay
    }, 0)
    return totalPayRoll
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}*/

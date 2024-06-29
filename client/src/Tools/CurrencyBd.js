const displayBDTCurrency = (number)=> {
    const curFormat = new Intl.NumberFormat('en-BD', {
       style : "currency",
       currency : 'BDT',
       minimumFractionDigits: 0,
    })

    return curFormat.format(number)
}

export default displayBDTCurrency
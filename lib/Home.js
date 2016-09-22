import React from 'react'
import validator from 'validator'

export default React.createClass({
  getInitialState(){
    return {
      ccNumber: false,
      ccName: false,
      ccMonth: false,
      ccYear: false,
      ccCVV: false,
      formValid: false
    }
  },


  ccNumberHandler(e) {
    if(validator.isCreditCard(e.target.value)){
      this.setState({
        ccNumber: true
      })
    }else{
      this.setState({
        ccNumber: false
      })
    }
    this.ccChecker()
  },

  ccNameHandler(e) {
    if(validator.isLength(e.target.value, {min: 7, max: 20})){
      this.setState({
        ccName: true
      })
    }else{
      this.setState({
        ccName: false
      })
    }
    this.ccChecker()
  },

  ccMonthHandler(e) {
    if(validator.isInt(e.target.value, {min: 1, max: 12, allow_leading_zeroes: true})){
      this.setState({
        ccMonth: true
      })
    }else{
      this.setState({
        ccMonth: false
      })
    }
    this.ccChecker()
  },

  ccYearHandler(e) {
    if(validator.isInt(e.target.value, {min: 16, max: 36,})){
      this.setState({
        ccYear: true
      })
    }else{
      this.setState({
        ccYear: false
      })
    }
    this.ccChecker()
  },

  ccCVVHandler(e) {
    // VISA CVVs are 3 digits: 100-999 are all 3 digit #s
    if(validator.isInt(e.target.value, {min: 100, max:999})){
      this.setState({
        ccCVV: true
      })
    }else{
      this.setState({
        ccCVV: false
      })
    }
    this.ccChecker()
  },

  ccChecker() {
    if ((this.state.ccNumber == true) && (this.state.ccName == true) && (this.state.ccMonth == true) && (this.state.ccYear == true) && (this.state.ccCVV == true)){
      this.setState({
        formValid: true
      })
    }else{
      this.setState({
        formValid: false
      })
    }
  },

  render() {
    return (
      <div className="cc__container">
        <form name="credit card"
              method="GET"
              className={` cc__form ${this.state.formValid == false ? "" : "cc__form--valid"}` }>
          <h1 className="your">
            Your
            <span className="bank">Bank</span>
          </h1>
          <input type="text"
                 name="credit card number"
                 placeholder="XXXXXXXXXXXXXXXX"
                 className={ `cc__inputs cc__number ${this.state.ccNumber == true ? "" : "cc__number--invalid"}` }
                 onChange={this.ccNumberHandler}/>
          <div className="cvv-expContainer">
            <h2 className="goodThru">
              GOOD<br/> THRU
            </h2>
            <input name="expire__month"
                   type="text"
                   className={`cc__inputs cc__expireMonth ${this.state.ccMonth == true ? "" : "cc__expireMonth--invalid"}`}
                   placeholder="MM"
                   onChange={this.ccMonthHandler}/>
            <input name="expire__year"
                   type="text"
                   className={`cc__inputs cc__expireYear ${this.state.ccYear == true ? "" : "cc__expireYear--invalid"}`}
                   placeholder="YY"
                   onChange={this.ccYearHandler}/>
            <input type="text"
                   name="credit card cvv"
                   placeholder="CVV"
                   className={`cc__inputs cc__cvv ${this.state.ccCVV == true ? "" : "cc__cvv--invalid"}`}
                   onChange={this.ccCVVHandler}/>
          </div>
          <input type="text"
                 name="credit card name"
                 placeholder="YOUR NAME"
                 className={`cc__inputs cc__name ${this.state.ccName == true ? "" : "cc__name--invalid"}`}
                 onChange={this.ccNameHandler}/>
          <img src="../assets/visa.png"
               alt="VISA Logo"
               className="cc__logo" />
        </form>
      </div>
    )
  }
})

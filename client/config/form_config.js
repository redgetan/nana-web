export default class FormConfig {
  static getDays() {
    const result = []

    for (var i = 0; i <= 31; i++) {
      result.push(i)
    }

    return result
  }

  static getYears() {
    const result = []
    const legalAge = 18
    const maxYear = (new Date()).getFullYear() - legalAge
    
    for (var i = 1900; i <= maxYear; i++) {
      result.push(i)
    }

    return result.reverse()
  }

  static getMonths() {
    return {
       1 : "Jan",
       2 : "Feb",
       3 : "Mar",
       4 : "Apr",
       5 : "May",
       6 : "Jun",
       7 : "Jul",
       8 : "Aug",
       9 : "Sep",
       10 : "Oct",
       11 : "Nov",
       12 : "Dec"
    }
  }

  static getLegalEntityTypes() {
    return {
      individual: "Individual",
      company: "Company"
    }
  }

  static getStates() {
    return {
      "AB": "Alberta",
      "BC": "British Columbia",
      "MB": "Manitoba",
      "NB": "New Brunswick",
      "NL": "Newfoundland and Labrador",
      "NS": "Nova Scotia",
      "NT": "Northwest Territories",
      "NU": "Nunavut",
      "ON": "Ontario",
      "PE": "Prince Edward Island",
      "QC": "Quebec",
      "SK": "Saskatchewan",
      "YT": "Yukon"
    }
  }
}

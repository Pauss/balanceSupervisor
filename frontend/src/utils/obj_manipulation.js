import labels_codes from './label_codes.js'

export function mapSymbols_obj(array) {
  array.map((result) => {
    const element = labels_codes.find((obj) => obj.title.toLowerCase() === result[0].label)

    result.code = element.code
    return
  })
}

export function mapSymbols_array(array) {
  array.map((result) => {
    const element = labels_codes.find((obj) => obj.title.toLowerCase() === result.label)

    result.code = element.code
  })
}

export function setTotal(results) {
  results.map((result) => {
    let totalCost = 0
    result.forEach((log) => {
      totalCost += log.cost
    })
    result.totalCost = totalCost
    return result
  })
}

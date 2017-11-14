const scenarios = [
  'full', 
  'full-karma-airbnb', 
  'minimal'
]

const index = scenarios.indexOf(process.env.VUE_TEMPL_TEST)

const isTest = exports.isTest = index !== -1

const scenario = isTest && require(`./${scenarios[index]}.json`)

exports.addTestAnswers = (metalsmith, options, helpers) => {
  if (isTest) {
    
    Object.assign(metalsmith.metadata(), {
      isNotCI: false,
    },
    scenario)
  } else {
    Object.assign(metalsmith.metadata(), {
      isNotCI: true,
    })
  }
  console.log(metalsmith.metadata())
}
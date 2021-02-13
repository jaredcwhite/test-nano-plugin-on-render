
import "index.scss"


// Import all javascript files from src/_components
const componentsContext = require.context("bridgetownComponents", true, /.js$/)
componentsContext.keys().forEach(componentsContext)

console.info("Bridgetown is loaded!")
const backendAPI = `${NANO_API_PROTOCOL}${NANO_API_HOST}/backend`
async function testNanoAPI() {
  const resp = await fetch(`${backendAPI}/nano`)
  const data = await resp.json()
  document.querySelector("main").innerHTML += `<p><code>${JSON.stringify(data)}</code></p>`
}

testNanoAPI()            

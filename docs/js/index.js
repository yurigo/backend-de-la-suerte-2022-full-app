
(async () => {
    const app = document.getElementById('app')
    
    await sleep(5000)

    var response = await fetch("https://vqceliwmwhwtfdupbywx.nhost.run/v1/functions/")
    var json = await response.json()
    
    app.innerHTML = '<h1>5</h1>'
    await sleep(1000)
    app.innerHTML = '<h1>4</h1>'
    await sleep(1000)
    app.innerHTML = '<h1>3</h1>'
    await sleep(1000)
    app.innerHTML = '<h1>2</h1>'
    await sleep(1000)
    app.innerHTML = '<h1>1</h1>'
    await sleep(1000)

    app.innerHTML = `<h1>${json.malandricono}</h1>`
})()

//sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}





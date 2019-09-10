var payload = function(){
  const sort_stays_by_final_price = function() {
    let stays = [...document.querySelectorAll('div._fhph4u > div._8ssblpx')]

    // sanity check
    if (!stays.length) return

    const get_stay_price = function(el) {
      let txt, num

      txt = el.querySelector('div._75kbg2 > div._hgs47m > div._10ejfg4u > div._1h25vrn > span._qlq27g > div._61b3pa > span > div > span > span._j2qalb2 > span._j2qalb2')

      // sanity check
      if (!txt) return 0

      txt = txt.innerText.replace(/[^0-9\.]/g, '')
      num = Number(txt)

      return num
    }

    const stays_compare = function(a, b) {
      const a_price = get_stay_price(a)
      const b_price = get_stay_price(b)

      return (a_price < b_price)? -1 : (a_price === b_price)? 0 : 1
    }

    const update_dom = function() {
      const parent = stays[0].parentNode

      // empty
      while (parent.hasChildNodes()) {
        parent.removeChild(
          parent.firstChild
        )
      }

      // add stays sorted by final price
      stays.forEach(parent.appendChild.bind(parent))
    }

    stays.sort(stays_compare)
    console.log(stays.map(get_stay_price))

    update_dom()
  }

  let is_button_injected = false

  const inject_button = function() {
    // debounce
    if (is_button_injected) return true

    // only inject button on search results pages for "stays"
    if (location.pathname.indexOf('/s/') !== 0)  return false
    if (location.href.indexOf('/homes?') === -1) return false

    const menu = document.querySelector('div._ouyf9j > div._m7x2lq > div > div._i8vcof')

    // sanity check
    if (!menu) return false

    const button = document.createElement('button')
    button.classList.add('_1jl6sxj4')
    button.innerText = 'Sort by Final Price'
    button.addEventListener('click', sort_stays_by_final_price, false)

    menu.appendChild(button)

    is_button_injected = true
    return true
  }

  const run_timer = function() {
    let timer = null
    let counter = 0
    const max_tries = 20   // stop polling after (500ms)(20) = 10,000 ms = 10 seconds
    const timer_delay = 500

    const timer_cb  = function() {
      const ok = inject_button()
      if (ok) return

      counter++
      if (counter < max_tries)
        set_timer()
    }

    const set_timer = function() {
      timer = setTimeout(timer_cb, timer_delay)
    }

    set_timer()
  }

  const init_page = function() {
    run_timer()

    // hook into History API, which is called when search form is submit
    const rs = history.replaceState
    history.replaceState = function() {
      is_button_injected = false
      run_timer()

      rs.apply(this, arguments)
    }
  }

  init_page()
}

var get_hash_code = function(str){
  var hash, i, char
  hash = 0
  if (str.length == 0) {
    return hash
  }
  for (i = 0; i < str.length; i++) {
    char = str.charCodeAt(i)
    hash = ((hash<<5)-hash)+char
    hash = hash & hash  // Convert to 32bit integer
  }
  return Math.abs(hash)
}

var inject_function = function(_function){
  var inline, script, head

  inline = _function.toString()
  inline = '(' + inline + ')()' + '; //# sourceURL=crx_extension.' + get_hash_code(inline)
  inline = document.createTextNode(inline)

  script = document.createElement('script')
  script.appendChild(inline)

  head = document.head
  head.appendChild(script)
}

inject_function(payload)

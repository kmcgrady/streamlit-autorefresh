import { Streamlit, RenderData } from "streamlit-component-lib"

function counter() {
  let count = 0

  return function () {
    count += 1
    return count
  }
}

const refreshCounter = counter()
let interval: number

/**
 * The component's render function. This will be called immediately after
 * the component is initially loaded, and then again every time the
 * component gets new data from Python.
 */
function onRender(event: Event): void {
  document.body.innerHTML = ""
  // Get the RenderData from the event
  const data = (event as CustomEvent<RenderData>).detail
  if (interval) {
    clearInterval(interval)
  }

  interval = window.setInterval(
    () => Streamlit.setComponentValue(refreshCounter()),
    parseInt(data.args.interval, 10)
  )
}

// Attach our `onRender` handler to Streamlit's render event.
Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)

// Tell Streamlit we're ready to start receiving data. We won't get our
// first RENDER_EVENT until we call this function.
Streamlit.setComponentReady()

// Finally, tell Streamlit to update our initial height. We omit the
// `height` parameter here to have it default to our scrollHeight.
Streamlit.setFrameHeight(0)

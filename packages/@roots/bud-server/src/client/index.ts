import client from 'webpack-hot-middleware/client'
import {overlay} from './BudOverlay'

/**
 * Instantiate overlay
 */

client.useCustomOverlay(overlay)

/**
 * Loading indicator
 */
;(() => {
  window.__bud = {toast: document.createElement('div')}
  window.__bud.toast.style.bottom = `10px`
  window.__bud.toast.style.left = `10px`
  window.__bud.toast.style.zIndex = 9998
  window.__bud.toast.style.padding = '1px'
  window.__bud.toast.style.transition = 'opacity ease 600ms'
  window.__bud.toast.style.pointerEvents = 'none'
  window.__bud.toast.style.position = 'fixed'
  window.__bud.toast.style.opacity = 0
  window.__bud.toast.style.maxWidth = '40px'
  window.__bud.toast.style.maxHeight = '40px'
  window.__bud.toast.style.width = '25px'
  window.__bud.toast.style.height = '25px'

  document.body.appendChild(window.__bud.toast)

  client.subscribeAll(payload => {
    if (!payload?.action) return

    const shouldReload = payload.action == 'reload'
    shouldReload && window.location.reload()

    console.log(payload)

    window.__bud.toast.style.opacity = 1
    window.__bud.toast.innerHTML = `
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 81 77" version="1.1">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(1.000000, 1.000000)" stroke="${
              payload?.errors?.length > 0 ? 'red' : 'white'
            }">
              <polygon id="Path" points="78.9 37.1 71.7 15.1 58.9 10.9 51 0 27.8 0 19.9 10.9 7.2 15 -1.42108547e-14 37.1 7.9 48 7.9 61.4 26.6 75 39.4 70.8 52.2 75 71 61.4 71 47.9"></polygon>
              <polygon id="Path" points="39.4 51.4 38.9 51 26.4 41.9 31.2 27.2 31.4 26.6 47.4 26.6 52.4 41.9 41.3 50"></polygon>
              <polygon id="Path" points="72.5 36.1 67 43.6 58.1 40.7 52.7 24.2 58.2 16.6 67.1 19.5 72.5 36.1"></polygon>
              <polygon id="Path" points="30.8 5.7 48.1 5.7 53.6 13.3 52.8 14.4 48.1 20.9 30.7 20.9 26 14.3 25.3 13.3"></polygon>
              <polygon id="Path" points="11.7 19.6 20.6 16.7 26.1 24.3 26 24.5 20.7 40.7 11.8 43.6 6.3 36"></polygon>
              <polygon id="Path" points="13.6 58.5 13.6 49.1 14.7 48.7 22.5 46.2 35.2 55.4 36.6 56.4 36.6 65.8 27.7 68.7"></polygon>
              <polygon id="Path" points="51.2 68.6 42.3 65.7 42.3 56.3 43.5 55.4 56.3 46.1 62.6 48.2 65.2 49 65.2 58.5"></polygon>
            </g>
          </g>
        </svg>
      <div>
    `

    if (!(payload.errors?.length > 0)) {
      setTimeout(() => {
        window.__bud.toast.style.opacity = 0
      }, 2000)
    }
  })
})()

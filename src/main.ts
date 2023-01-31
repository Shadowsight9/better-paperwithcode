import { createApp } from 'vue'
import App from './App.vue'

function main() {
  const content = document.querySelector('body > div.container.content.content-buffer') as HTMLDivElement | null
  if (content)
    Object.assign(content.style, { 'max-width': 'unset', 'padding-left': '100px', 'padding-right': '100px' })

  const paperTable = document.querySelector('#papers') as HTMLDivElement | null
  if (paperTable) {
    const scriptStr = paperTable.lastElementChild?.innerHTML
    if (!scriptStr)
      return

    const regex = /DATATABLE_PAPERS_FILTER_NAME = '(.*)';\n.*DATATABLE_PAPERS_FILTER_VALUE = '(.*)'/gm
    const m = regex.exec(scriptStr)

    if (!m || !m[0])
      return

    const filterName = m[1]
    const filterValue = m[2]

    paperTable.innerHTML = ''
    const mountElement = paperTable.appendChild(document.createElement('div'))
    createApp(App, { filterName, filterValue }).mount(mountElement)
  }
}

main()

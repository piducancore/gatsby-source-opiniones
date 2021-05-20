const jsdom = require("jsdom")
const { JSDOM } = jsdom

exports.sourceNodes = async (gatsby, options) => {
  const { actions, createNodeId, createContentDigest } = gatsby
  const { createNode } = actions
  try {
    // const url = `https://www.tusclasesparticulares.cl/profesores/${options.username}/opiniones`
    const url = `https://www.tusclasesparticulares.cl/partialview/reviewslist.aspx?p=${options.username}`
    const selector = ".review-item"
    const { window } = await JSDOM.fromURL(url, {
      runScripts: "dangerously",
      resources: "usable",
    })
    const nodes = await new Promise(resolve => {
      window.addEventListener("load", () => {
        const nodeList = [...window.document.querySelectorAll(selector)]
        resolve(nodeList)
      })
    })
    const opiniones = nodes.map(item => {
      return {
        name: item.querySelector(".review-name").textContent,
        image: item.querySelector(".review-header")?.querySelector("img")?.src,
        score: [...item.querySelector(".review-score").children].reduce(
          (acc, star) => (star.classList.contains("star_y") ? (acc += 1) : acc),
          0
        ),
        text: item.querySelector(".reviewtxt").textContent,
      }
    })

    opiniones.map((metadata, idx) => {
      const nodeData = {
        ...metadata,
        id: createNodeId(`opinion-${idx}`),
        parent: null,
        internal: {
          type: `Opinion`,
          content: JSON.stringify(metadata),
          contentDigest: createContentDigest(metadata),
        },
      }
      createNode(nodeData) // That's it
    })

    return
  } catch (e) {
    console.error(e)
  }
}

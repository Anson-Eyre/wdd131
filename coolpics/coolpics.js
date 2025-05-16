const menuBtn = document.getElementById("menu-btn")
const menu = document.getElementById("menu")
const gallery = document.querySelector(".gallery")

menuBtn.addEventListener("click", () => {
	menu.classList.toggle("hide")
})

function onResize() {
	if (window.innerWidth < 1000) {
		menu.classList.add("hide")
	} else {
		menu.classList.remove("hide")
	}
}

onResize()
window.addEventListener("resize", onResize)

function closeViewer() {
	document.querySelector(".viewer").remove()
}

gallery.addEventListener("click", (e) => {
	// Had to do it this way because my Github user name is "anson-eyre" (notice the dash) and so the URL got messed up
	const src = e.target.src.split("-")
	src.pop()

	document.body.insertAdjacentHTML(
		"afterbegin",
		`<div class="viewer">
            <img src="${src.join("-")}-full.jpeg" alt="${e.target.alt}">
            <button class="close-viewer">X</button> 
        </div>`
	)
	const closeBtn = document.querySelector(".close-viewer")
	closeBtn.addEventListener("click", closeViewer)
	const viewer = document.querySelector(".viewer")
	viewer.addEventListener("click", (e) => {
		if (e.target === viewer) {
			// if the click is directly on the viewer (not the image)
			closeViewer()
		}
	})
})

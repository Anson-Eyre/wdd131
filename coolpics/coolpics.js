const menuBtn = document.getElementById("menu-btn")
const menu = document.getElementById("menu")
const gallery = document.querySelector(".gallery")

menuBtn.addEventListener("click", () => {
	menu.classList.toggle("hide")
})

function onResize() {
	if (window.innerWidth < 1000) {
		menu.classList.remove("hide")
	} else {
		menu.classList.add("hide")
	}
}

onResize()
window.addEventListener("resize", onResize)

function closeViewer() {
	document.querySelector(".viewer").remove()
}

gallery.addEventListener("click", (e) => {
	document.body.insertAdjacentHTML(
		"afterbegin",
		`<div class="viewer">
            <img src="${e.target.src.split("-")[0]}-full.jpeg" alt="picture" />
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

let participants = 1

const participant1HTML = document.querySelector(".participant1").outerHTML
const addBtn = document.querySelector("#add")
addBtn.addEventListener("click", () => {
	participants++
	addBtn.insertAdjacentHTML("beforebegin", participant1HTML.replaceAll("1", participants))
})

const form = document.querySelector("form")
form.addEventListener("submit", (e) => {
	e.preventDefault()

	const totalFees = [...document.querySelectorAll("[id^=fee]")].reduce((acc, cur) => acc + parseFloat(cur.value), 0)
	const adultName = document.querySelector("#adult_name").value

	form.style.display = "none"

	document.querySelector("#summary").innerHTML = `
        Thank you ${adultName} for registering. You have registered ${participants} participants and owe $${totalFees} in Fees.
    `
})

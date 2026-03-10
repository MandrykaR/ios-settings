const renderData = data => {
	const deviceBrand = document.querySelector('.device-card__brand')
	const deviceModel = document.querySelector('.device-card__model')
	const deviceStatus = document.querySelector('.device-card__result')
	const deviceType = document.querySelector('.device__title')
	const deviceDescription = document.querySelector('.device__subtitle')
	const btnActions = document.querySelector('.optimize__button')
	const notificationText = document.querySelector('.notification__text')

	const alertTitle = document.querySelector('.alert__title')
	const alertSubtitle = document.querySelector('.alert__subtitle')
	const alertButton = document.querySelector('.alert__button')

	deviceBrand.textContent = data.device.brand
	deviceModel.textContent = data.device.model
	deviceStatus.textContent = `Result: ${data.device.status}`
	deviceType.textContent = data.device_info.type
	deviceDescription.textContent = data.device_info.description
	btnActions.textContent = data.actions.primary

	alertTitle.textContent = data.optimization_status.message
	alertSubtitle.textContent = data.optimization_status.submessage
	alertButton.textContent = data.actions.secondary

	notificationText.textContent = data.status_summary.recommendation
}

const renderList = data => {
	const settingsMenu = document.querySelector('.settings-menu')
	const settingsList = document.querySelector('.settings-list__items')
	const num = [14, 6, 8, 2]

	settingsList.innerHTML = data.action_required.items
		.map((item, index) => {
			return `
		<li class="settings-list__item">
			<img
				class="settings-list__icon"
				src="./img/list Icon.svg"
				alt=""
			/>
			<div class="settings-list__content">
				<p class="settings-list__title">${item.name}</p>
				<span>${num[index]}</span>
			</div>
		</li>
		`
		})
		.join('')

	settingsMenu.innerHTML = data.personal_info_sections
		.map(item => {
			return `
				<button class="settings-menu__item">
					<span class="settings-menu__label">
						${item.name}
					</span>
					${item.content ? `<span class="settings-menu__value">${item.content}</span>` : ''}
					<span class="settings-menu__arrow">
						<img src="./img/list row.svg" alt="Arrow" />
					</span>
				</button>
			`
		})
		.join('')
}

const fetchData = async () => {
	try {
		const res = await fetch('./data/mobile.json')
		const data = await res.json()
		renderData(data)
		renderList(data)
		return data
	} catch (error) {
		console.error(error)
	}
}

fetchData()

const alertModal = document.getElementById('alert-info')
const alertOverlay = document.querySelector('.alert__overlay')
const btnCloseModal = document.querySelector('.alert__button')
const btnOpenModal = document.querySelector('.optimize__button')

const notificationInfo = document.getElementById('notification')

const openAlert = () => {
	alertModal.classList.remove('hidden')
}

const closeAlert = () => {
	alertModal.classList.add('hidden')
}

btnCloseModal.addEventListener('click', e => {
	e.preventDefault()
	closeAlert(e)
})

btnOpenModal.addEventListener('click', e => {
	e.preventDefault()
	openAlert(e)
})

alertOverlay.addEventListener('click', e => {
	if (e.target === alertOverlay) {
		closeAlert()
	}
})

const showNotification = () => {
	notificationInfo.classList.add('notification--active')
}

const hideNotification = () => {
	notificationInfo.classList.remove('notification--active')
}

setTimeout(() => {
	showNotification()
	setTimeout(() => {
		hideNotification()
		openAlert()
	}, 4000)
}, 3000)

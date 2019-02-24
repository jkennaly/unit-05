// js/scripts.js

/******************

	Construct user cards


********************/

const nameString = nameObject => nameObject.first + ' ' + nameObject.last
const locationString = locationObject => locationObject.city + ', ' + locationObject.state


//exception to spec: no id attribute applied, because it is not needed and
//is a deviation from the html standard to have multiple non-unique ids
//in one page
const nameEl = ({name}) => $("<h3></h3>")
    .addClass("card-name cap")
    .html(nameString(name))

const emailEl = ({email}) => $("<p></p>")
    .addClass("card-text")
    .html(email)

const locationEl = ({location}) => $("<p></p>")
    .addClass("card-text cap")
    .html(locationString(location))

const infoContainerEl = user => $("<div></div>")
    .addClass("card-info-container")
    .append(nameEl(user))
    .append(emailEl(user))
    .append(locationEl(user))

const imgEl = ({picture}) => $("<img>")
    .addClass("card-img")
    .attr("alt", "profile picture")
    .attr("src", picture.medium)

const imgContainerEl = user => $("<div></div>")
    .addClass("card-img-container")
    .append(imgEl(user))


//create the user card, with a data-index attribute to pull
//the correct data when populating the modal
const userToCard = (user, index) => $('<div></div>')
    .addClass("card")
    .attr('data-index', index)
    .append(imgContainerEl(user))
    .append(infoContainerEl(user))

/******************

	Construct modal and populate data


********************/

const $imgElModal = $("<img>")
    .addClass("modal-img")
    .attr("alt", "profile picture")

const $nameElModal = $("<h3></h3>")
    .addClass("modal-name cap")
    //.html(nameString(name))
const $emailElModal = $("<p></p>")
    .addClass("modal-text")

const $cityElModal = $("<p></p>")
    .addClass("modal-text cap")

const $phoneElModal = $("<p></p>")
    .addClass("modal-text")

const $addressElModal = $("<p></p>")
    .addClass("modal-text cap")

const $birthdayElModal = $("<p></p>")
    .addClass("modal-text")

const $infoContainerElModal = $("<div></div>")
    .addClass("modal-info-container")
    .append($imgElModal)
    .append($nameElModal)
    .append($emailElModal)
    .append($cityElModal)
    .append('<hr>')
    .append($phoneElModal)
    .append($addressElModal)
    .append($birthdayElModal)

const $btnCloseElModal = $('<button></button>', {
	type: 'button',
	id: 'modal-close-btn',
	class: 'modal-close-btn'
})
	.append($('<strong></strong>').text('X'))

const $btnPrevElModal = $('<button><-</button>', {
	type: 'button',
	id: 'modal-prev',
	class: 'modal-prev btn'
})

const $btnNextElModal = $('<button>-></button>', {
	type: 'button',
	id: 'modal-next',
	class: 'modal-next btn'
})

const $modalBtnContainerElModal = $("<div></div>")
    .addClass("modal-btn-container")
    .append($btnPrevElModal)
    .append($btnNextElModal)


const $modal = $("<div></div>")
    .addClass("modal")
    .append($btnCloseElModal)
    .append($infoContainerElModal)
    .append($modalBtnContainerElModal)

//append the modal to the body already hidden
const $modalContainer = $("<div></div>")
    .addClass("modal-container")
    .append($modal)
    .hide()

//append the modal to the body
$('body').append($modalContainer)

//event handle for modal close button
$btnCloseElModal.on('click', e => {
	$modalContainer.hide()
})



const populateModal = (user, userIndex) => {
	$imgElModal.attr('src', user.picture.large)
	$nameElModal.html(nameString(user.name))
	$emailElModal.html(user.email)
	$cityElModal.html(user.location.city)
	$phoneElModal.html(user.cell)
	$addressElModal.html(
		`${user.location.street}, ${user.location.city}, ${user.location.state} ${user.location.postcode}`
	)
	//remove everything but the date for dob then reformat
	//note: the sample data contains a time all the way to a second.
	//i would love to see the form that says "Please specify the moment
	//of your birth to the nearest second:"
	$birthdayElModal.html(`Birthday: ${
		user.dob.date
			//get just the date
			.replace(/T.*$/, '')
			//reformat YYYY-MM-DD to MM-DD-YY
			.replace(/(\d{2})(\d{2})-(\d{2})-(\d{2})/, '$3/$4/$2')
	}`)
	$btnPrevElModal.attr('data-index', userIndex)
	$btnNextElModal.attr('data-index', userIndex)

}

/******************

	Search bar


********************/

//name added to ease access to value from within event handler
const $searchTextEl = $("<input>", {
	type: 'search',
	id: 'search-input',
	class: 'search-input',
	placeholder: 'Search...',
	name: 'search-input'
})

//exception to spec: id attribute value set to search-submit
//instead of serach-submit
const $searchSubmitEl = $("<input>", {
	type: 'submit',
	value: String.fromCodePoint(0x1F50D),
	id: 'search-submit',
	class: 'search-submit'
})

const $searchFormEl = $("<form></form>")
	.attr('action', '#')
    .attr("method", 'get')
    .append($searchTextEl)
    .append($searchSubmitEl)
    .appendTo('.search-container')


/******************

	Utility functions for prev/next buttons


********************/


//find the first visible user
const firstIndexReduce = (firstIndex, $card, i) => {
	//once we found the first index, stop looking
	if(firstIndex >= 0) {
		return firstIndex
	}
	//return either the index or -1, depending on card visiblibilty
	return $card.is(':visible') ? i : -1

}
//find the last visible user
const lastIndexReduce = (lastIndex, $card, i) => {
	//return either the index or the last index, depending on card visiblibilty
	return $card.is(':visible') ? i : lastIndex

}

const nextIndexReduce = currentUserIndex => (nextIndex, $card, i) => {
	//stop once we found the next index, and don't start until
	//we are past the currentIndex
	if(nextIndex >= 0 || i <= currentUserIndex) {
		return nextIndex
	}
	return $card.is(':visible') ? i : nextIndex

}

const prevIndexReduce = currentUserIndex => (prevIndex, $card, i) => {
	//stop once we reach the currentIndex
	if(i >= currentUserIndex) {
		return prevIndex
	}
	return $card.is(':visible') ? i : prevIndex
}


$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us',
  dataType: 'json',
  success: function(data) {
  	//append the cards to the gallery
  	const gallery = $('#gallery')
  	const users = data.results
  	const user$Cards = users.map(userToCard)
  	user$Cards.forEach(card => gallery.append(card))
  	

  	//event handler to open a modal fore each user
  	$('#gallery > .card').on('click', function(e) {
  		//the data-index is set when the card is created
  		const userIndex = $(this).attr('data-index')
  		populateModal(users[userIndex], userIndex)
  		$modalContainer.show()
  	})

  	//event handler on submit of search form
  	$searchFormEl.on('submit', function(e) {
  		e.preventDefault()
  		const searchString = $(this).serialize().replace('search-input=', '')
  		const searchRegex = new RegExp(searchString, 'i')
  		//if there is a searchString, get the user indexes that match it
  		user$Cards.forEach(($card, index) => {
  			const noSearch = !searchString.length
  			const userName = nameString(users[index].name)
  			const showCard = noSearch || searchRegex.test(userName)
  			if(showCard) {
  				$card.show()
  			} else {
  				$card.hide()
  			}
  		})
  	})

	  	//event handler on prev/next buttons

	//event handle for next button
	$btnNextElModal.on('click', {cards: user$Cards}, e => {
		const currentUserIndex = $btnNextElModal.attr('data-index')
	  	const firstVisibleUserIndex = e.data.cards.reduce(firstIndexReduce, -1)
	  	const lastVisibleUserIndex = e.data.cards.reduce(lastIndexReduce, -1)
	  	//if we are at or past the last visible user, populate the first
	  	if(currentUserIndex >= lastVisibleUserIndex) {
	  		populateModal(users[firstVisibleUserIndex], firstVisibleUserIndex)
	  	} else{
	  		const nextVisibleIndex = e.data.cards
	  			.reduce(nextIndexReduce(currentUserIndex), -1)
	  		populateModal(users[nextVisibleIndex], nextVisibleIndex)
	  	}
	})

	//event handle for next button
	$btnPrevElModal.on('click', {cards: user$Cards}, e => {
		const currentUserIndex = $btnPrevElModal.attr('data-index')
	  	const firstVisibleUserIndex = e.data.cards.reduce(firstIndexReduce, -1)
	  	const lastVisibleUserIndex = e.data.cards.reduce(lastIndexReduce, -1)
	  	//if we are at or past the first visible user, populate the last
	  	if(currentUserIndex <= firstVisibleUserIndex) {
	  		populateModal(users[lastVisibleUserIndex], lastVisibleUserIndex)
	  	} else{
	  		const prevVisibleIndex = e.data.cards
	  			.reduce(prevIndexReduce(currentUserIndex), -1)
	  		populateModal(users[prevVisibleIndex], prevVisibleIndex)
	  	}
	})


  }
});
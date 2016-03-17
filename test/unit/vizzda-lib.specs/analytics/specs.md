### Google Analytics service

* Should be defined

* ProfileId is NOT defined
	* Should warn a user when a profile id is not defined
	* Should not send tracking events

* ProfileId is defined
	* Should not warn a user when a profile id is defined

	* Should send tracking events with Category, Action, and Label
	* Should send tracking events with Category, Action
	* Should not send tracking events with only Category
	* Should send tracking events with custom properties

	* Should send pageviews
	* Should send pageviews with custom properties

### Analytics wrapper service

* Should be defined
* Should register listeners to specific events
* Should call all registered functions when an event is triggered
* Should call all registered functions with a supplied AnalyticsEvent

### Analytics track click directive

* Should call a registered event when its element is clicked
* Should call a registered event with a provided AnalyticsEvent object
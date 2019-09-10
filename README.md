### [Airbnb Price Sort](https://github.com/warren-bank/crx-airbnb-pricesort)

Chrome extension for Airbnb website to enable sorting search results for "stays" by final price

#### UI:

* adds a button to the top menu bar: "Sort by Final Price"
  * click will trigger a re-sort of the already visible search results

#### Limitations:

* search results are paginated
  * this little utility only works on the client side
  * each time a new page of search results is loaded:
    * you will want to click the button to trigger a re-sort
    * these results are independent of results on other pages
      * previous results are no-longer available
      * future results are not-yet available

#### Legal:

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)

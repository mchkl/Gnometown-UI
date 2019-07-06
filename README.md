# Brastlewark

This is a test project aimed to provide a UI to display profiles of citizens of Brastlewark using ReactJS. After the first render a user
will see a set of cards with photo and name of gnomes. Upon clicking on one of the cards a modal is being shown providing more information
on each gnome. A user can search for names and filter gnomes by their age, weight and height.

*Update:

- You can now add/remove friends to/from your friends' list thanks to Redux.

## Running the project

- Fork this project at https://github.com/mchkl/Gnometown-UI.
- Install all the project dependencies with 'npm install'.
- Run the project using 'npm start'.

### Prerequisites

- Npm or yarn installed

## Running the tests

The tests are made using Jest and Enzyme

### Tests break down

Standard jest test that checks if the App component is rendered.

```
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
```

Shallow rendering of a GnomeCard component with enzyme and checking if it's rendered.

```
describe('GnomeCard Component', () => {
    it('should render without throwing an error', () => {
        let data = {thumbnail: ''}
        expect(shallow(<GnomeCard data />).find('#gnome-card').exists()).toBe(true)
    })
})
```

Chcecking if Navbar component is rendered and checking if the function is called upon clicking on the search button.

```
describe('Navbar Component', () => {
    it('should render without throwing an error', () => {
        const f = jest.fn();
        expect(shallow(<Navbar handleCheck={f}
                               handleSearch={f}
                               handleSearchInput={f}
                               handleSortDropdown={f} />).find('#navbar').exists()).toBe(true)
    })

    it('should call a function after clicking on the "search" button', () => {
        const f = jest.fn();
        let wrapper = shallow(<Navbar handleCheck={f}
                               handleSearch={f}
                               handleSearchInput={f}
                               handleSortDropdown={f} />);
        wrapper.find('#search-btn').simulate('click');
        expect(f).toBeCalled();
    });

})
```

### Comments

The project is using React hooks, redux, arrow functions, images lazy loading, axios API, emotion.sh CSS library and jest/enzyme testing.

## Authors

* **Mykhailo Kolesnyk** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)
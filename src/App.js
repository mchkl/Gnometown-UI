import React from 'react';
import './App.css';
//Axios is used for fetching data from the server
import axios from "axios";
//Reactstrap is used for responsive layout
import { Container, Row, Col } from 'reactstrap';
//Emotion & React-emotion are used for styling
import { injectGlobal, css } from "emotion";
import styled from "react-emotion";
import COA from "./img/COA.png";
import COA2 from "./img/COA2.png";
import SortIcon from "./img/sortIcon.svg";
import UpIcon from "./img/upIcon.svg";
import DownIcon from "./img/downIcon.svg";
import SortGrayIcon from "./img/downIconGray.svg";
//Lodash is used for higher order functions
var _ = require('lodash');

injectGlobal`
    *{
        font-family: Almendra;
    }
    
    body{
        width: 100vw;
        height: 100%;
        overflow-x: hidden;
    }
    
    ul{
        padding-left: 30px;
    }
`;

const Background = styled('div')`
    width: 100%;
    background: #e4e1e1;
    min-height: 100vh;
`;

const COAImg = styled('div')`
    width: 300px;
    height: 300px;
    background-image: url(${COA});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    position: fixed;
    bottom: 0;
    opacity: 0.4;
`;

const COAImg2 = styled('div')`
    width: 300px;
    height: 300px;
    background-image: url(${COA2});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    position: fixed;
    top: 55px;
    right: 0;
    opacity: 0.4;
`;

const Table1 = styled('table')`
    margin: auto;
    margin-top: 0px;
    background: white;
    padding: 15px;
    padding-top: 30px;
    box-shadow: 0 0 20px #00000054;
`;

const GnomePic = styled('div')`
    width: 50px;
    height: 50px;
    background-image: url(${props => props.img});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

const GnomesWrapperDiv = styled('div')`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 60px;
`;

const PlaceholderDiv = styled('div')`
    width: 25%;
    height: 160px;
    background-color: gray;
    margin: 10px;
    box-shadow: 0 1px 5px #00000029;
`;

const GnomeCardDiv = styled('div')`
    width: 25%;
    display: inline-block;
    background: white;
    margin: 10px;
    height: fit-content;
    box-shadow: 0 1px 5px #00000029;
    transition: width 0.5s;
    
    h3{
        font-size: 17px;
    }
    
    :hover{
        cursor: pointer;
    }
    
    @media(max-width: 768px){
        width: 40%;
    }
`;

const GnomeProfilePicDiv = styled('div')`
    width: 100%;
    background-image: url(${props => props.img});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 160px;
`;

const GnomeNameH3 = styled('h3')`
    margin: 0;
    text-align: center;
`;

const GnomeInfoBoxDiv = styled('div')`
    width: 100%;
    padding: 10px;
`;

const gnomeInfoBoxFlex = css`
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const GnomeInfoTitleP = styled('p')``;

const GnomeInfoP = styled('p')`
    margin-bottom: 2px;
`;

const NavBarDiv = styled('div')`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-shadow: 0 1px 10px #00000029;
    z-index: 9;
    
    h1{
        font-size: 30px;
        position: absolute;
        left: 20px;
        
        @media(max-width: 568px){
            font-size: 24px;
        }
    }
`;

const SortBtnDiv = styled('div')`
    width: 15px;
    height: 15px;
    background-image: url(${SortIcon});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    display: inline-block;
    position: absolute;
    right: 20px;
    
    :hover{
        cursor: pointer;
    }
`;

const CheckBoxWrapperDiv = styled('div')`
    display: inline-block;
    position: absolute;
    top: 50px;
    background: white;
    width: 100%;
    text-align: right;
    padding-right: 20px;
    box-shadow: 0 4px 8px #00000029;
    z-index: 9;
`;

const CheckBoxDiv = styled('div')`
    width: 15px;
    height: 15px;
    background-image: url(${props => props.checked === 1 ? DownIcon : props.checked === 2 ? UpIcon : SortGrayIcon});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    display: inline-block;
    
    :hover{
        cursor: pointer;
    }
`;

const CheckBoxLabel = styled('label')`
    margin-right: 15px;
    
    :hover{
        cursor: pointer;
    }
`;

const CheckBoxSelect = styled('select')`
    border: none;
    width: fit-content;
    border-bottom: 1px solid #9091a2;
    margin-right: 15px;
    border-top: 1px solid #9091a2;
    
    :focus{
        outline: none;
    }
`;

const SearchWrapperDiv = styled('div')`
    display: inline-block; 
    margin-right: 20px;
    display: flex;
    align-items: center;
`;

const SearchInput = styled('input')`
    display: inline-block;
    padding-left: 5px;
    margin-left: 5px;
    
    border-top: 1px solid #9091a2;
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;
        border-bottom: 1px solid #9091a2;
        
        :focus{
            outline: none;
        }
    
    @media(max-width: 568px){
        width: 120px;
    }
`;

const SearchBtnDiv = styled('div')`
    display: inline-block;
    
    p{
        margin-bottom: 0;
    }
    :hover{
        cursor: pointer;
    }
`;

const BlackScreenDiv = styled('div')`
    visibility: hidden;
    opacity: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5882352941176471);
    position: fixed;
    z-index: 10;
    height: 100%;
    top: 0;
    left: 0;
    transition: opacity 1s, visibility 1s;
    
    :hover{
        cursor: pointer;
    }
`;

const GnomeCardModalDiv = styled('div')`
    visibility: hidden;
    opacity: 0;
    background-color: white;
    z-index: 11;
    position: fixed;
    top: 0;
    transform: translateX(-200%);
    height: 100%;
    width: 40%;
    transition: transform 1s, visibility 1s, opacity 1s;
    box-shadow: 2px 0 5px #00000061;
    
    @media(max-width: 768px){
        width: 100%;
    }
`;
const profilePicModal = css`
    height: 200px;
`;

const gnomeInfoBoxModal = css`
    overflow-y: auto;
    heigth: 100%
`;

const FlexBoxDiv = styled('div')`
    display: flex;
`;

const GnomeInfoHalfDiv = styled('div')`
    width 50%;
    display: inline-block;
`;

const PaginationUl = styled('ul')`
    text-align: center;
    margin-top: 30px;
    margin-bottom: 30px;
    padding-left: 0;
`;

const PagerButtonLi = styled('li')`
    display: inline-block;
    margin-left: 10px;
    margin-right: 10px;
    
    :hover{
        cursor: pointer;
    }
`;

const disabled = css`
    opacity: 0.7;
    :hover{
        cursor: not-allowed;
    }
`;

const active = css`
    color: #7d71de;
    border-bottom: 1px solid #7d71de;
    
    :hover{
        cursor: default;
    }
`;

const defaultProps = {
    initialPage: 1
}

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }

    componentDidMount() {
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        var items = this.props.items;
        var pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        pager = this.getPager(items.length, page);

        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        this.setState({ pager: pager });

        this.props.onChangePage(pageOfItems);
    }

    getPager(totalItems, currentPage, pageSize) {
        currentPage = currentPage || 1;

        pageSize = pageSize || 24;

        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;
        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        var pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            return null;
        }

        return (
            <PaginationUl>
                <PagerButtonLi className={pager.currentPage === 1 ? disabled : ''}>
                    <a onClick={() => this.setPage(1)}>First</a>
                </PagerButtonLi>
                <PagerButtonLi className={pager.currentPage === 1 ? disabled : ''}>
                    <a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
                </PagerButtonLi>
                {pager.pages.map((page, index) =>
                    <PagerButtonLi key={index} className={pager.currentPage === page ? active : ''}>
                        <a onClick={() => this.setPage(page)}>{page}</a>
                    </PagerButtonLi>
                )}
                <PagerButtonLi className={pager.currentPage === pager.totalPages ? disabled : ''}>
                    <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
                </PagerButtonLi>
                <PagerButtonLi className={pager.currentPage === pager.totalPages ? disabled : ''}>
                    <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
                </PagerButtonLi>
            </PaginationUl>
        );
    }
}

class GnomeCardModalElement extends React.Component {
    constructor(props){
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(){
        this.props.handleClose();
    }

    render(){
        return(
            <React.Fragment>
                <BlackScreenDiv style={this.props.showMore ? {opacity : 1, visibility: "visible"} : null} onClick={this.handleClose}/>
                <GnomeCardModalDiv style={this.props.showMore ?
                    this.props.windowWidth > 768 ?
                        {opacity : 1, visibility: "visible", transform: "translateX(-77.3%)"} :
                        {opacity : 1, visibility: "visible", transform: "translateX(0%)"} :
                    null}
                    onClick={this.props.windowWidth > 768 ? null : this.handleClose}
                >
                    <GnomeProfilePicDiv img={this.props.data.thumbnail} className={profilePicModal}/>
                    <GnomeInfoBoxDiv className={gnomeInfoBoxModal}>
                        <GnomeNameH3>{this.props.data.name}</GnomeNameH3>
                        <hr/>
                        <FlexBoxDiv>
                            <GnomeInfoHalfDiv>
                                <GnomeInfoTitleP>Profession:</GnomeInfoTitleP>
                                <ul>
                                    {this.props.data.professions.length > 0 ?
                                        this.props.data.professions.map((profession, index) => (
                                            <li key={index}>
                                                <GnomeInfoP>{profession}</GnomeInfoP>
                                            </li>
                                        ))
                                        :
                                        <p>This gnome has no job :(</p>
                                    }
                                </ul>
                            </GnomeInfoHalfDiv>
                            <GnomeInfoHalfDiv>
                                <GnomeInfoTitleP>Info:</GnomeInfoTitleP>
                                <ul>
                                    <li>
                                        <GnomeInfoP>Age: {this.props.data.age} y/o</GnomeInfoP>
                                    </li>
                                    <li>
                                        <GnomeInfoP>Height: {(this.props.data.height/100).toFixed(2)} m</GnomeInfoP>
                                    </li>
                                    <li>
                                        <GnomeInfoP>Weight: {this.props.data.weight.toFixed(2)} kg</GnomeInfoP>
                                    </li>
                                    <li>
                                        <GnomeInfoP>Hair color: {this.props.data.hair_color}</GnomeInfoP>
                                    </li>
                                </ul>
                            </GnomeInfoHalfDiv>
                        </FlexBoxDiv>
                        <hr/>
                        <GnomeInfoTitleP>Friends:</GnomeInfoTitleP>
                        {this.props.data.friends.length > 0 ? (
                            <ul>
                                {this.props.data.friends.map((friend, index) => (
                                    <li key={index}>
                                        <GnomeInfoP>{friend}</GnomeInfoP>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>This gnome is too busy to have friends :(</p>
                        )}
                    </GnomeInfoBoxDiv>
                </GnomeCardModalDiv>
            </React.Fragment>
        )
    }
}


class GnomeCardElement extends React.PureComponent {
    constructor(props){
        super(props);

        this.state = {
            showMore: false
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick(){
        this.setState({
            showMore: true
        })
    };

    handleClose(){
        this.setState({
            showMore: false
        })
    };

    render(){
        return(
            <React.Fragment>
                <GnomeCardModalElement data={this.props.data}
                                       showMore={this.state.showMore}
                                       handleClose={this.handleClose}
                                       windowWidth={this.props.windowWidth}
                />
                <GnomeCardDiv onClick={this.handleClick}>
                    <GnomeProfilePicDiv img={this.props.data.thumbnail}/>
                    <GnomeInfoBoxDiv className={gnomeInfoBoxFlex}>
                        <GnomeNameH3>{this.props.data.name}</GnomeNameH3>
                    </GnomeInfoBoxDiv>
                </GnomeCardDiv>
            </React.Fragment>
        )
    }
}

class NavBarElement extends React.PureComponent{
    constructor(props){
        super(props);

        this.state = {
            searchSelect: "name"
        }

    }

    handleSelect(e){
        this.setState({
            searchSelect: e.target.value
        })
    }

    render(){
        return(
            <NavBarDiv>
                <h1>Brastlewark</h1>
                {this.props.showSorting ? (
                    <CheckBoxWrapperDiv>
                        <CheckBoxLabel>Search by </CheckBoxLabel>
                        <CheckBoxSelect onChange={this.handleSelect.bind(this)}>
                            <option value="name">name</option>
                            <option value="profession">profession</option>
                        </CheckBoxSelect>
                        <CheckBoxDiv checked={this.props.check} onClick={this.props.handleCheck}/>
                        <CheckBoxLabel onClick={this.props.handleCheck}>
                            Age
                        </CheckBoxLabel>
                        <CheckBoxDiv checked={this.props.check2} onClick={this.props.handleCheck2}/>
                        <CheckBoxLabel onClick={this.props.handleCheck2}>
                            Height
                        </CheckBoxLabel>
                        <CheckBoxDiv checked={this.props.check3} onClick={this.props.handleCheck3}/>
                        <CheckBoxLabel onClick={this.props.handleCheck3}>
                            Weight
                        </CheckBoxLabel>
                    </CheckBoxWrapperDiv>
                ) : null}
                <SearchWrapperDiv>
                    <SearchBtnDiv onClick={this.props.handleSearch.bind(this,this.state.searchSelect)}><p>Search</p></SearchBtnDiv>
                    <SearchInput placeholder={this.state.searchSelect.charAt(0).toUpperCase() + this.state.searchSelect.slice(1,this.state.searchSelect.length)}
                                 type="text"
                                 onChange={this.props.handleSearchInput}></SearchInput>
                </SearchWrapperDiv>
                <SortBtnDiv onClick={this.props.handleSortDropDown}/>
            </NavBarDiv>
        )
    }
}

class App extends React.Component {
    constructor(props){
        super(props);


        this.state = {
            width: window.innerWidth,
            loading: true,
            cityData: [],
            displayItems: [],
            searchInputText: "",
            searchInputTextProfession: "",
            check: 0,
            check2: 0,
            check3: 0,
            showSorting: false,
            previous:[null],
            next:[null],
            pageOfItems: []
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.handleSearchInputProfession = this.handleSearchInputProfession.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleCheck2 = this.handleCheck2.bind(this);
        this.handleCheck3 = this.handleCheck3.bind(this);
        this.handleSearchProfession = this.handleSearchProfession.bind(this);
        this.handleSortDropDown = this.handleSortDropDown.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    handleSortDropDown(){
        this.setState({showSorting: !this.state.showSorting})
    }

    updateDimensions() {
        this.setState({
            width: window.innerWidth
        });
    }

    async componentDidMount(){
        window.addEventListener("resize", this.updateDimensions);

        try {
            const response = await axios.get('https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json');
            const { data } = await response;
            this.setState({
                cityData: data.Brastlewark,
                displayItems: data.Brastlewark,
                loading: false
            })
        } catch (error) {
            console.error(error);
        }
    }

    handleCheck(){
        this.setState({
            check: (this.state.check + 1) % 3
        })

        if(this.state.check === 0){
            const ageSorted = _.sortBy(this.state.cityData,['age']);
            this.setState({displayItems: ageSorted})
        }
        else if(this.state.check === 1){
            const ageSorted = _.reverse(_.sortBy(this.state.cityData,['age']));
            this.setState({displayItems: ageSorted})
        } else this.setState({displayItems: this.state.cityData});
    }

    handleCheck2(){
        this.setState({
            check2: (this.state.check2 + 1) % 3
        })

        if(this.state.check2 === 0){
            const ageSorted = _.sortBy(this.state.cityData,['height']);
            this.setState({displayItems: ageSorted})
        }
        else if(this.state.check2 === 1){
            const ageSorted = _.reverse(_.sortBy(this.state.cityData,['height']));
            this.setState({displayItems: ageSorted})
        } else this.setState({displayItems: this.state.cityData});
    }

    handleCheck3(){
        this.setState({
            check3: (this.state.check3 + 1) % 3
        })

        if(this.state.check3 === 0){
            const ageSorted = _.sortBy(this.state.cityData,['weight']);
            this.setState({displayItems: ageSorted})
        }
        else if(this.state.check3 === 1){
            const ageSorted = _.reverse(_.sortBy(this.state.cityData,['weight']));
            this.setState({displayItems: ageSorted})
        } else this.setState({displayItems: this.state.cityData});
    }

    handleSearch(value){
        let found = [];
        if(value === "name"){
            found = this.state.cityData.filter(x => _.includes(x.name, this.state.searchInputText))
        }else found = this.state.cityData.filter(x => _.includes(x.professions, this.state.searchInputText))

        this.setState({
            displayItems: found,
            check: false,
            check2: false,
            check3: false
        })
    }
    handleSearchProfession(){
        const found = this.state.cityData.filter(x => _.includes(x.professions, this.state.searchInputTextProfession))
        this.setState({
            displayItems: found,
            check: false
        })
    }

    handleSearchInput(e){
        this.setState({
            searchInputText: e.target.value
        })
    }

    handleSearchInputProfession(e){
        this.setState({
            searchInputTextProfession: e.target.value
        })
    }

    render() {
        return (
            <Background>
                <COAImg/>
                <COAImg2/>
                <Container fluid>
                    <Row>
                        <Col sm="1" md="2"></Col>
                        <Col sm="9" md="8">
                            <NavBarElement {... this.state}
                                           handleCheck={this.handleCheck}
                                           handleCheck2={this.handleCheck2}
                                           handleCheck3={this.handleCheck3}
                                           handleSearch={this.handleSearch}
                                           handleSearchProfession={this.handleSearchProfession}
                                           handleSearchInput={this.handleSearchInput}
                                           handleSortDropDown={this.handleSortDropDown}  />
                            <GnomesWrapperDiv>
                                {this.state.loading ?
                                    <React.Fragment>
                                        <PlaceholderDiv/>
                                        <PlaceholderDiv/>
                                        <PlaceholderDiv/>
                                        <PlaceholderDiv/>
                                        <PlaceholderDiv/>
                                        <PlaceholderDiv/>
                                        <PlaceholderDiv/>
                                        <PlaceholderDiv/>
                                        <PlaceholderDiv/>
                                    </React.Fragment>
                                    :
                                    this.state.pageOfItems.map((gnome, index) => (
                                        <GnomeCardElement data={gnome}
                                                          showMore={this.state.showMore}
                                                          id={index}
                                                          onClick={this.handleCardClick}
                                                          key={index}
                                                          windowWidth={this.state.width}
                                        />
                                    ))
                                }
                            </GnomesWrapperDiv>
                            <Pagination items={this.state.displayItems} onChangePage={this.onChangePage} />
                        </Col>
                        <Col sm="1" md="2"></Col>
                    </Row>
                </Container>
            </Background>
        );
    }
}

export default App;

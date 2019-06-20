import React from 'react';
//Axios is used for fetching data from the server
import axios from "axios";
//Reactstrap is used for responsive layout
import { Container, Row, Col } from 'reactstrap';
//Emotion & React-emotion are used for styling
import { withTheme } from 'emotion-theming';
import { injectGlobal, css } from "emotion";
import styled from "react-emotion";
import COA from "./img/COA.png";
import COA2 from "./img/COA2.png";
import RollingSVG from "./img/rollingSVG.svg";
//Local components
import GlobalCSS from "./components/GlobalCSS";
import Navbar from './components/Navbar';
import GnomeCard from './components/GnomeCard';
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

const PreloadImg = styled('img')`
    opacity: 0;
    visibility: hidden;
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

const GnomesWrapperDiv = styled('div')`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 60px;
`;

const PlaceholderDiv = styled('div')`
    width: 25%;
    height: 200px;
    background-color: gray;
    margin: 10px;
    box-shadow: 0 1px 5px #00000029;
    
    @media(max-width: 768px){
        width: 40%;
    }
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
        let items = this.props.items;
        let pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        pager = this.getPager(items.length, page);

        let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        this.setState({ pager: pager });

        this.props.onChangePage(pageOfItems);
    }

    getPager(totalItems, currentPage, pageSize) {
        currentPage = currentPage || 1;

        pageSize = pageSize || 24;

        let totalPages = Math.ceil(totalItems / pageSize);

        let startPage, endPage;
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

        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        let pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

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
        let pager = this.state.pager;

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



class App extends React.Component {
    constructor(props){
        super(props);


        this.state = {
            loading: true,
            cityData: [],
            displayItems: [],
            searchInputText: "",
            searchInputTextProfession: "",
            age: 0,
            height: 0,
            weight: 0,
            showSorting: false,
            previous:[null],
            next:[null],
            //''s are placeholders
            pageOfItems: ['','','','','','','','']
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleSortDropdown = this.handleSortDropdown.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    handleSortDropdown(){
        this.setState({showSorting: !this.state.showSorting})
    }

    async componentDidMount(){
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

    handleCheck(filter){
        //Filter gnomes
        let checkOption = 0;
        switch(filter){
            case 'age':
                checkOption = (this.state.age + 1) % 3;
                let ageSorted =  _.sortBy(this.state.cityData,['age']);
                this.setState({
                    age: checkOption,
                    displayItems: checkOption === 0 ? ageSorted
                        : checkOption === 1 ? _.reverse(ageSorted)
                        : this.state.cityData
                })
                break;
            case 'height':
                checkOption = (this.state.height + 1) % 3;
                let heightSorted =  _.sortBy(this.state.cityData,['height']);
                this.setState({
                    height: checkOption,
                    displayItems: checkOption === 0 ? heightSorted
                        : checkOption === 1 ? _.reverse(heightSorted)
                            : this.state.cityData
                })
                break;
                break;
            case 'weight':
                checkOption = (this.state.weight + 1) % 3;
                let weightSorted =  _.sortBy(this.state.cityData,['weight']);
                this.setState({
                    weight: checkOption,
                    displayItems: checkOption === 0 ? weightSorted
                        : checkOption === 1 ? _.reverse(weightSorted)
                            : this.state.cityData
                })
                break;
            default:
                break;
        }
    }

    handleSearch(value){
        let found = [];
        if(value === "name"){
            found = this.state.cityData.filter(x => _.includes(x.name.toLowerCase(), this.state.searchInputText.toLowerCase()))
        }else found = this.state.cityData.filter(x =>
            {
                return x.professions.filter(y =>
                    {
                     return _.includes(y.toLowerCase(), this.state.searchInputText.toLowerCase())
                    }
                )
            }
        )

        this.setState({
            displayItems: found,
            age: false,
            height: false,
            weight: false
        })
    }

    handleSearchInput(e){
        this.setState({
            searchInputText: e.target.value
        })
    }

    render() {
        return (
            <Background>
                <GlobalCSS theme={this.props.theme}/>
                <PreloadImg src={RollingSVG}/>
                <COAImg/>
                <COAImg2/>
                <Container fluid>
                    <Row>
                        <Col sm="1" md="2"></Col>
                        <Col sm="9" md="8">
                            <Navbar {... this.state}
                                handleCheck={this.handleCheck}
                                handleSearch={this.handleSearch}
                                handleSearchInput={this.handleSearchInput}
                                handleSortDropdown={this.handleSortDropdown}  />
                            <GnomesWrapperDiv>
                                {
                                    this.state.pageOfItems.map((gnome, index) => (
                                        this.state.loading || gnome === "" ? (
                                            <PlaceholderDiv key={index}/>
                                            ) : (
                                            <GnomeCard data={gnome}
                                                showMore={this.state.showMore}
                                                id={index}
                                                onClick={this.handleCardClick}
                                                key={index}
                                            />
                                            )

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

export default withTheme(App);

import React, { useState, useEffect } from 'react';
//Axios is used for fetching data from the server
import axios from "axios";
//Reactstrap is used for responsive layout
import { Container, Row, Col } from 'reactstrap';
//Emotion & React-emotion are used for styling
import { withTheme } from 'emotion-theming';
import styled from "@emotion/styled";
//Local components
import GlobalCSS from "./components/GlobalCSS";
import Navbar from './components/Navbar';
import GnomeCard from './components/GnomeCard';
import Pagination from './components/Pagination';
import Friends from './components/Friends';
//Redux
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";
//Images
import COA from "./img/COA.png";
import COA2 from "./img/COA2.png";
import RollingSVG from "./img/rollingSVG.svg";
import SortIcon from "./img/sortIcon.svg";
import UpIcon from "./img/upIcon.svg";
import DownIcon from "./img/downIcon.svg";
import SortGrayIcon from "./img/downIconGray.svg";
//Lodash is used for higher order functions
var _ = require('lodash');

const Background = styled.div`
    width: 100%;
    background: #e4e1e1;
    min-height: 100vh;
    overflow: scroll;
`;

const PreloadImg = styled.img`
    opacity: 0;
    visibility: hidden;
`;

const COAImg = styled.div`
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

const COAImg2 = styled.div`
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

const GnomesWrapperDiv = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 60px;
`;

const PlaceholderDiv = styled.div`
    width: 25%;
    height: 200px;
    background-color: gray;
    margin: 10px;
    box-shadow: 0 1px 5px #00000029;
    
    @media(max-width: 768px){
        width: 40%;
    }
`;

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

const App = (props) => {
    const [loading, setLoading] = useState(true);
    const [cityData, setCityData] = useState([]);
    const [displayItems, setDisplayItems] = useState([]);
    const [pageOfItems, setPageOfItems] = useState(['','','','','','','','','']);
    const [age, setAge] = useState(0);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get('https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json');
                const { data } = await response;

                console.log(data);

                setCityData(data.Brastlewark);
                setDisplayItems(data.Brastlewark);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const onChangePage = (pageOfItemsProp) => {
        // update state with new page of items
        return setPageOfItems(pageOfItemsProp)
    };

    const setFilters = (age, weight, height) => {
        setAge(age);
        setWeight(weight);
        setHeight(height);
    }

    const handleCheck = (filter) =>{
        //Filter gnomes
        let checkOption = 0;
        switch(filter){
            case 'age':
                checkOption = (age + 1) % 3;
                let ageSorted =  _.sortBy(cityData,['age']);

                setFilters(checkOption,0,0)
                setDisplayItems(
                    checkOption === 0 ? ageSorted
                    : checkOption === 1 ? _.reverse(ageSorted)
                    : cityData);
                break;

            case 'height':
                checkOption = (height + 1) % 3;
                let heightSorted =  _.sortBy(cityData,['height']);

                setFilters(0,0,checkOption)
                setDisplayItems(
                    checkOption === 0 ? heightSorted
                    : checkOption === 1 ? _.reverse(heightSorted)
                    : cityData
                );
                break;

            case 'weight':
                checkOption = (weight + 1) % 3;
                let weightSorted =  _.sortBy(cityData,['weight']);

                setFilters(0,checkOption,0)
                setDisplayItems(
                    checkOption === 0 ? weightSorted
                    : checkOption === 1 ? _.reverse(weightSorted)
                    : cityData
                );
                break;

            default:
                break;
        }
    };

    const handleSearch = (value) => {
        let found = cityData.filter(x => _.includes(x.name.toLowerCase(), value.toLowerCase()))

        setDisplayItems(found);
        setAge(false);
        setHeight(false);
        setWeight(false);
    };

    return(
        <ReduxProvider store={reduxStore}>
            <Background>
                <GlobalCSS theme={props.theme}/>
                <PreloadImg src={RollingSVG}/>
                <PreloadImg src={SortIcon}/>
                <PreloadImg src={UpIcon}/>
                <PreloadImg src={DownIcon}/>
                <PreloadImg src={SortGrayIcon}/>
                <COAImg/>
                <COAImg2/>
                <Container fluid>
                    <Row>
                        <Col sm="1" md="2"></Col>
                        <Col sm="10" md="8">
                            <Navbar
                                    age={age} weight={weight} height={height}
                                    handleCheck={handleCheck}
                                    handleSearch={handleSearch}  />
                            <GnomesWrapperDiv>
                                {
                                    pageOfItems.map((gnome, index) => (
                                        loading || gnome === "" ? (
                                            <PlaceholderDiv key={index}/>
                                        ) : (
                                            <GnomeCard data={gnome}
                                                       id={index}
                                                       key={index}
                                            />
                                        )

                                    ))
                                }
                            </GnomesWrapperDiv>
                            <Pagination items={displayItems} onChangePage={onChangePage} />
                            <Friends />
                        </Col>
                        <Col sm="1" md="2"></Col>
                    </Row>
                </Container>
            </Background>
        </ReduxProvider>
    );
}

export default withTheme(App);

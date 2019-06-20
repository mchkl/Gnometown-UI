import React from "react";
import styled from "@emotion/styled";
//Import media
import SortIcon from "../img/sortIcon.svg";
import UpIcon from "../img/upIcon.svg";
import DownIcon from "../img/downIcon.svg";
import SortGrayIcon from "../img/downIconGray.svg";

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

const CheckBoxSectionWrapperDiv = styled('div')`
    display: inline-block;
    position: absolute;
    top: 50px;
    background: white;
    width: 100%;
    text-align: right;
    padding-right: 20px;
    box-shadow: 0 4px 8px #00000029;
    z-index: 9;
    max-height: ${props => props.visible ? '50px' : '0px'};
    overflow: hidden;
    transition: max-height 0.25s;
    
    @media(max-width: 500px){
        padding-right: 0;
    }
`;

const CheckBoxWrapperDiv = styled.div`
    display: inline-block;
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
`;

const CheckBoxSelect = styled('select')`
    border: none;
    width: fit-content;
    border-bottom: 1px solid #9091a2;
    margin-right: 15px;
    border-top: 1px solid #9091a2;
      
    :hover{
        cursor: pointer;
    }
    
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

export default class Navbar extends React.PureComponent{
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
            <NavBarDiv id='navbar'>
                <h1>Brastlewark</h1>
                    <CheckBoxSectionWrapperDiv visible={this.props.showSorting}>
                        <CheckBoxLabel>Search by </CheckBoxLabel>
                        <CheckBoxSelect data-test="selectTab1" id='select-box' onChange={this.handleSelect.bind(this)}>
                            <option value="name">name</option>
                            <option value="profession">profession</option>
                        </CheckBoxSelect>
                        <CheckBoxWrapperDiv onClick={() => this.props.handleCheck('age')}>
                            <CheckBoxDiv checked={this.props.age}/>
                            <CheckBoxLabel>
                                Age
                            </CheckBoxLabel>
                        </CheckBoxWrapperDiv>
                        <CheckBoxWrapperDiv onClick={() => this.props.handleCheck('height')}>
                            <CheckBoxDiv checked={this.props.height}/>
                            <CheckBoxLabel>
                                Height
                            </CheckBoxLabel>
                        </CheckBoxWrapperDiv>
                        <CheckBoxWrapperDiv onClick={() => this.props.handleCheck('weight')}>
                            <CheckBoxDiv checked={this.props.weight}/>
                            <CheckBoxLabel>
                                Weight
                            </CheckBoxLabel>
                        </CheckBoxWrapperDiv>
                    </CheckBoxSectionWrapperDiv>
                <SearchWrapperDiv>
                    <SearchBtnDiv onClick={this.props.handleSearch.bind(this,this.state.searchSelect)}><p>Search</p></SearchBtnDiv>
                    <SearchInput placeholder={this.state.searchSelect.charAt(0).toUpperCase() + this.state.searchSelect.slice(1,this.state.searchSelect.length)}
                                 type="text"
                                 onChange={this.props.handleSearchInput}></SearchInput>
                </SearchWrapperDiv>
                <SortBtnDiv onClick={this.props.handleSortDropdown}/>
            </NavBarDiv>
        )
    }
}
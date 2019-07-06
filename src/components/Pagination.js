import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";

const PaginationUl = styled.ul`
    text-align: center;
    margin-top: 30px;
    margin-bottom: 30px;
    padding-left: 0;
`;

const PagerButtonLi = styled.li`
    display: inline-block;
    margin-left: 10px;
    margin-right: 10px;
    color: ${props => props.active ? "#7d71de" : ""};
    border-bottom: ${props => props.active ? '1px solid #7d71de' : ""};
    opacity: ${props => props.disabled ? 0.7 : 1};
    :hover{
        cursor: not-allowed;
    }
    
    :hover{
        cursor: ${props => props.disabled ? 'not-allowed' : props.active ? 'default' : 'pointer'};
    }
`;

const Pagination = (props) => {
    const [pager, handleSetPage] = useState({});

    useEffect(() => {
        if (props.items && props.items.length) {
            setPage(props.initialPage);
        }
    }, [props.items]);

    const setPage = (page) => {
        let items = props.items;
        let pagerVar = pager;

        if (page < 1 || page > pagerVar.totalPages) {
            return;
        }

        pagerVar = getPager(items.length, page);

        let pageOfItemsVar = items.slice(pagerVar.startIndex, pagerVar.endIndex + 1);

        handleSetPage(pagerVar);

        props.onChangePage(pageOfItemsVar);
    };

    const getPager = (totalItems, currentPage, pageSize) => {
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

    if (!pager.pages || pager.pages.length <= 1) {
        return null;
    }

    return (
        <PaginationUl>
            <PagerButtonLi disabled={pager.currentPage === 1}>
                <a onClick={() => setPage(1)}>First</a>
            </PagerButtonLi>
            <PagerButtonLi disabled={pager.currentPage === 1}>
                <a onClick={() => setPage(pager.currentPage - 1)}>Previous</a>
            </PagerButtonLi>
            {pager.pages.map((page, index) =>
                <PagerButtonLi key={index} active={pager.currentPage === page}>
                    <a onClick={() => setPage(page)}>{page}</a>
                </PagerButtonLi>
            )}
            <PagerButtonLi disabled={pager.currentPage === pager.totalPages}>
                <a onClick={() => setPage(pager.currentPage + 1)}>Next</a>
            </PagerButtonLi>
            <PagerButtonLi disabled={pager.currentPage === pager.totalPages}>
                <a onClick={() => setPage(pager.totalPages)}>Last</a>
            </PagerButtonLi>
        </PaginationUl>
    );
}

export default Pagination;
import React from "react";
import { Global } from '@emotion/core';

export default function GlobalCSS(props){
    return(
        <Global styles={{
            '*':{
                fontFamily: 'Almendra'
            },

            'body':{
                width: '100vw',
                height: '100%',
                overflowX: 'hidden'
            },

            'ul':{
                paddingLeft: '30px'
            },

            "h1,h2,h3,h4,h5,p":{
                color: props.theme.darkBlue,
                marginBottom: 0
            },

            html:{
                fontSize: "16px",
                color: props.theme.darkBlue,
                scrollBehavior: 'smooth'
            },

            h1:{
                fontSize: "30px"
            },

            h3:{
                fontSize: "28px",
            },

            //    FONT WEIGHT

            ".thin":{
                fontWeight: "300"
            },

            ".regular":{
                fontWeight: "400"
            },

            ".bold":{
                fontWeight: "500"
            },

            ".x-bold":{
                fontWeight: "600"
            },

            //    END FONT WEIGHT

            //    DECORATE & ALIGN TEXT

            ".capitalize": {
                textTransform: "capitalize"
            },

            ".uppercase": {
                textTransform: "uppercase"
            },

            ".align-center": {
                textAlign: "center"
            },

            ".align-left":{
                textAlign: "left"
            },

            ".align-right":{
                textAlign: "right"
            }
        }}/>
    )
}
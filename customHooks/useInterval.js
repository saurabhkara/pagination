import {  useEffect, useRef } from "react";

export function useInterval(func,delay){

    const savedCallback = useRef();

    useEffect(()=>{
        savedCallback.current= func;
    },[func])
    
    useEffect(()=>{

        function apiPoll(){
            savedCallback.current();
        }

        if(delay !==null){
            let id = setInterval(apiPoll,delay);
            return ()=>{
                clearInterval(id);
            }
        }

    },[delay])
}
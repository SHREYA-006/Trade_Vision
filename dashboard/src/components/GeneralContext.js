import React,{useState} from "react"
import BuyActionWindow from './BuyActionWindow';
import { use } from "react";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
    openBuyWindow : (uid) =>{},
    closeBuyWindow : () =>{},
    openSellWindow: (uid)=>{},
    closeSellWindow: ()=>{}
})

export const GeneralContextProvider = (props)=>{
    const [isBuyWindowOpen,setIsBuyWindowOpen] = useState(false);
    const [isSellWindowOpen,setIsSellWindowOpen] = useState(false);
    const [selectedStockId,setSelectedStockId] = useState("");

    const handleOpenBuyWindow = (uid)=>{
        setIsSellWindowOpen(false);
        setIsBuyWindowOpen(true);
        setSelectedStockId(uid);
    }

    const handleCloseBuyWindow = () =>{
        setIsBuyWindowOpen(false);
        setSelectedStockId("");
    }

    const handleOpenSellWindow =(uid)=>{
        setIsBuyWindowOpen(false);
        setIsSellWindowOpen(true);
        setSelectedStockId(uid)
    }

    const handleCloseSellWindow =()=>{
        setIsSellWindowOpen(false);
        setSelectedStockId("");
    }

    return(
        <GeneralContext.Provider
            value = {{
                openBuyWindow: handleOpenBuyWindow,
                closeBuyWindow : handleCloseBuyWindow,
                openSellWindow: handleOpenSellWindow,
                closeSellWindow: handleCloseSellWindow,
            }}
        >
            {props.children}
            {isBuyWindowOpen && <BuyActionWindow uid = {selectedStockId}/> }
            {isSellWindowOpen && <SellActionWindow uid={selectedStockId}/>}
        </GeneralContext.Provider>
    );
}

export default GeneralContext;
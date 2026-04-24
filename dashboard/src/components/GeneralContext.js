import React,{useState} from "react"
import BuyActionWindow from './BuyActionWindow';

const GeneralContext = React.createContext({
    openBuyWindow : (uid) =>{},
    closeBuyWindow : () =>{}
})

export const GeneralContextProvider = (props)=>{
    const [isBuyWindowOpen,setIsBuyWindowOpen] = useState(false);
    const [selectedStockId,setSelectedStockId] = useState("");

    const handleOpenBuyWindow = (uid)=>{
        setIsBuyWindowOpen(true);
        setSelectedStockId(uid);
    }

    const handleCloseBuyWindow = () =>{
        setIsBuyWindowOpen(false);
        setSelectedStockId("");
    }

    return(
        <GeneralContext.Provider
            value = {{
                openBuyWindow: handleOpenBuyWindow,
                closeBuyWindow : handleCloseBuyWindow,
            }}
        >
            {props.children}
            {isBuyWindowOpen && <BuyActionWindow uid = {selectedStockId}/> }
        </GeneralContext.Provider>
    );
}

export default GeneralContext;
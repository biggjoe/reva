import React from "react";
import {
  Slide,
  DialogContent,
  Dialog,
  Divider,
  Collapse,
} from "@mui/material";

import ConnectWalletButton from "../../components/ConnectWalletButton";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FontAwesome from "react-fontawesome";
import HttpService from "../../services/HttpService";
import Link from "next/link";
import CopyText from "../../services/CopyText";
import LogPay from "../LogPay";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const PayInvoice = (props) => {
  const modal = props.data;
  console.log("invoice data:: ", modal);
  const contract_address = process.env.NEXT_PUBLIC_CONTRACT_LIVE_ADDRESS;
  const contract_network = process.env.NEXT_PUBLIC_CONTRACT_LIVE_NETWORK;
  const [expanded, setExpanded] = React.useState(false);

  const handleChange =
    (panel) => (event,isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
const [fill_form,setFill]=React.useState(false);
const toggleFill = ()=> setFill(!fill_form);

const [sent,setSent]=React.useState({status:0,message:"",ran:0});
const [pay,setPay]=React.useState({currency:modal.currency});
const handleInput = 
  (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setPay({...pay,[name]:val});
    console.log(pay)
  };


  const [loading,setLoading]=React.useState(false);
  const [loaded,setLoaded]=React.useState(false);
const sendPay = ()=>{
console.log(":::",pay)
setLoading(true);
setLoaded(false)
setSent({...sent,ran:0});
  HttpService.logPayment(pay).then((res)=>{
console.log("result::",res)

  setSent({...pay,status:res.status,message:res?.message,ran:1})

  },(error)=>{
    console.log("error::",error)
  }).finally(()=>{
    
setLoading(false);
setLoaded(true)
  });
}

const closePay = ()=> setLog({...log,onopen:false,onclose:closePay});
const [log,setLog]=React.useState({onopen:false,onclose:closePay,currency:modal.currency})
const launchLogPay = ()=>{
  setLog({...log,onopen:true,onclose:closePay}); 
}

return (
    <React.Fragment>
      <Dialog
        fullScreen={false}
        TransitionComponent={Transition}
        open={modal.onopen}
        onClose={modal.onclose}
        scroll={"paper"}
        aria-labelledby={"Me"}
      >
        <DialogContent sx={{ p: "0", m: "0" }}>
        <div className="login-pane px0 py0">
            <div className="flex align-items-center px10 py10" style={{backgroundColor:"#ededed"}}>
                  <FontAwesome name={`file`} style={{ fontSize: "20px" }} />
                  <h3 className="py5 my0 pl10" style={{ color: "#444" }}>
                 BUY $XRV TOKEN
                  </h3>
                  <span className="spacer"></span>
                  <button
                    className="button-link"
                    onClick={() => modal.onclose()}
                  >
                    <FontAwesome
                      name={`close`}
                      style={{ fontSize: "20px" }}
                      className="color-red"
                    />
                  </button>
          </div>
          <div className="flex flex-row px20 py10">
          <div className="flex flex-col spacer">
                <span className="grayed txt-sm">AMOUNT DUE</span>
                  <h3 className="mb0 pb0">{modal.amount} {(modal.currency).toUpperCase()}</h3>
          </div>
          <div className="flex flex-col">
                <span className="grayed txt-sm">NETWORK</span>
                  <h3 className="mb0 pb0">{contract_network}</h3>
          </div>
          </div>
                <Divider/>
                <div className="flex flex-row px20 py10">
          <div className="flex flex-col spacer">
                <span className="grayed txt-sm mb5">PAYMENT ADDRESS</span>
                <CopyText text={contract_address}/>
             {/*      <h3 className="mb0 pb0">{}</h3> */}
                </div>
                </div>
                <Divider/>
                <div className="nbx">

                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        ><h4 className="flex ">PAY WITH CRYPTO WALLET</h4></AccordionSummary>
        <Divider/>
        <AccordionDetails>
        <div className="btn-div" style={{opacity:1}} onClick={()=>modal.onclose()}>
           <ConnectWalletButton /></div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
         
        >
         <h4 className="flex ">PAY MANUALLY</h4>
        </AccordionSummary>    <Divider/>
        <AccordionDetails>
    
        <div className="pxy10 break-word">
          <p>Please make a deposit of <strong>{modal.amount} {(modal.currency).toUpperCase()}</strong> into  our presale address above and the click on the <strong>&quot;I HAVE PAID&quot;</strong> button below to register your payment.</p>
            <p>You can still register your payment when you login to your
               <Link href="/account/tranactions">user dahsboard</Link> under <strong>&quot;Transactions&quot;</strong></p>
        </div>
        <div className="btn-div" style={{opacity:1}}>
              <button onClick={launchLogPay} className="buy_token_button">I HAVE PAID</button>
            </div>
        </AccordionDetails>
      </Accordion>
                  </div>



              </div>
        </DialogContent>
      </Dialog>
     {log.onopen &&<LogPay data={log}/>} 
    </React.Fragment>
  );
};
export default React.memo(PayInvoice);

import React from "react";
import {
  Slide,
  DialogContent,
  Dialog,
  Divider,
} from "@mui/material";
import FontAwesome from "react-fontawesome";
import HttpService from "../../../services/HttpService";
import Link from "next/link";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const LogPay = (props) => {
  const modal = props.data;
  console.log("invoice data:: ", modal);
  const contract_address = process.env.NEXT_PUBLIC_CONTRACT_LIVE_ADDRESS;
  const contract_network = process.env.NEXT_PUBLIC_CONTRACT_LIVE_NETWORK;
  
const [fill_form,setFill]=React.useState(false);
const toggleFill = ()=> setFill(!fill_form);

const [sent,setSent]=React.useState({status:0,message:"",ran:0});
const [pay,setPay]=React.useState({});
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
               LOG PAYMENT
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
          
           
           
                <Divider/>

                <div className="px20 pt20 break-word">
          <p>Please initiate a payment from our <Link href="/purchase">purchase</Link> and make a deposit into  our presale address: <strong>{contract_address}</strong> 
            and then fill the form below to log your payment</p>
        </div>
<Divider/>
<div className="px20 pt10 pb20">

      {sent.ran===1 &&(
     <div className={`input-form-control flex flex-col ${sent.status===1 ? "success-input-border":"error-input-border"}`}>
        <span className={`text-center ${sent.status===1 ? "color-success":"color-error"}`}> {sent.message}</span>
        
        
        <span className="spacer"></span>
        <div className="text-center">
        {sent.status===0 && <button className="button-link pt10" onClick={()=>{toggleFill();setSent({...sent,ran:0})}} >Try again</button>}
        <button className="button-link color-red pt10" onClick={()=>modal.onclose()} >Exit</button>
        </div></div>
    )}   
    

    
       <div className="pt10">{sent.ran ===0 &&(<>
          <div className="input togger">
            <label>Payment address</label>
            <input name="address" disabled={loading ||  (sent.status===1)} onChange={handleInput} placeholder="Enter payment address" className="input-form-control buy-input" />
          </div>
          <div className="input togger">
            <label>Exact Amount Paid</label>
            <input name="amount" disabled={loading || (sent.status===1)} onChange={handleInput} placeholder="Enter exact amount paid" className="input-form-control buy-input" />
          </div>
          <div className="btn-div" style={{opacity:1}}>
          <button onClick={sendPay} 
          disabled={loading || (sent.status===1)} 
          className="buy_token_button">{loading ? "Logging...":"Submit Payment"}</button>
            </div>
            
          </>)}
          </div>
          </div>
          </div>

        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
export default React.memo(LogPay);

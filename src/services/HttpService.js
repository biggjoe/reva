import axios from "axios";
import authHeader from "./authHeaders";

const SERVER_API_URL = process.env.NEXT_PUBLIC_SERVER_DOMAIN_API;
const API_SECRET = process.env.NEXT_PUBLIC_API_SECRET;
/* const Token =()=>{
 const { this.AuthToken } = authHeader();
  return this.AuthToken;
}*/
let AuthT = authHeader();
class HttpServiceFunc {
  AuthToken = "";
  constructor() {
    authHeader().then((res) => {
      console.log(res);
      this.AuthToken = res;
    });
  }

  fetchPay() {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "fetchpay?secret=" + API_SECRET;
      console.log("fetching pay::: ", url, { headers: this.AuthToken });
      return axios.get(url, { headers: this.AuthToken }).then((response) => {
        console.log(response);
        return response.data;
      });
    });
  }
  logPayment(data) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "log_payment?secret=" + API_SECRET;
      console.log("log_payment::: ", url, { headers: this.AuthToken });
      return axios
        .post(url, data, { headers: this.AuthToken })
        .then((response) => {
          return response.data;
        });
    });
  }
  fetchAffiliate() {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "affiliate_home?secret=" + API_SECRET;
      console.log("fetching affiliate_home::: ", url, {
        headers: this.AuthToken,
      });
      return axios.get(url, { headers: this.AuthToken }).then((response) => {
        console.log(response);
        return response.data;
      });
    });
  }
  fetchReferral() {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "referral_home?secret=" + API_SECRET;
      console.log("fetching referral_home::: ", url, {
        headers: this.AuthToken,
      });
      return axios.get(url, { headers: this.AuthToken }).then((response) => {
        console.log(response);
        return response.data;
      });
    });
  }
  fetchTransactions() {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "transactions_home?secret=" + API_SECRET;
      console.log("fetching transactions::: ", url, {
        headers: this.AuthToken,
      });
      return axios.get(url, { headers: this.AuthToken }).then((response) => {
        console.log("fetched_transactions::", response);
        return response.data;
      });
    });
  }

  fetchTransactionDetails(id) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "transaction_details?secret=" + API_SECRET;
      console.log("fetching transaction details::: ", { id: id }, url, {
        headers: this.AuthToken,
      });
      return axios
        .post(url, { id: id }, { headers: this.AuthToken })
        .then((response) => {
          console.log("transaction_details::", response);
          return response.data;
        });
    });
  }
  applyAffiliate(load) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "apply_affiliate?secret=" + API_SECRET;
      console.log("applying affiliate::: ", url, { headers: this.AuthToken });
      return axios
        .post(url, load, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }
  createBonusCode(load) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "create_code?secret=" + API_SECRET;
      console.log("creating ::: ", url, { headers: this.AuthToken });
      return axios
        .post(url, load, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }
  requestWithdraw(load) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "request_withdraw?secret=" + API_SECRET;
      console.log("withdrawing ::: ", url, { headers: this.AuthToken });
      return axios
        .post(url, load, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }
  fetchCodeDetails(code) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "code_details?secret=" + API_SECRET;
      console.log("fetching code details::: ", url, {
        headers: this.AuthToken,
      });
      return axios
        .post(url, { code: code }, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }
  fetchWithdrawalRequestDetails(id) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url =
        SERVER_API_URL + "withdrawal_request_details?secret=" + API_SECRET;
      console.log("fetching withdrawal_request_details::: ", url, {
        headers: this.AuthToken,
      });
      return axios
        .post(url, { id: id }, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }

  fetchCountries() {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "fetch_countries?secret=" + API_SECRET;
      console.log("fetching countries::: ", url, { headers: this.AuthToken });
      return axios.get(url, { headers: this.AuthToken }).then((response) => {
        console.log(response);
        return response.data;
      });
    });
  }

  fetchDashboard() {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "dashboard?secret=" + API_SECRET;
      console.log("fetching dashboard::: ", url, { headers: this.AuthToken });
      return axios.get(url, { headers: this.AuthToken }).then((response) => {
        console.log(response);
        return response.data;
      });
    });
  }

  contactMessage(data) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "contact_message?secret=" + API_SECRET;
      console.log("sending message::: ", url, data, {
        headers: this.AuthToken,
      });
      return axios
        .post(url, data, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }
  getPage(page) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "get_page?secret=" + API_SECRET;
      console.log("fetching page::: ", url, page, { headers: this.AuthToken });
      return axios
        .post(url, { slug: page }, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }
  listFaq() {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "list_faq?secret=" + API_SECRET;
      console.log("listing faqs::: ", url, { headers: this.AuthToken });
      return axios.post(url, { headers: this.AuthToken }).then((response) => {
        console.log(response);
        return response.data;
      });
    });
  }
  getFaqDetails(id) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "get_faq_details?secret=" + API_SECRET;
      console.log("fetching faq details::: ", url, id, {
        headers: this.AuthToken,
      });
      return axios
        .post(url, { id: id }, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }

  createFaq(data) {
    return authHeader().then((res) => {
      this.AuthToken = res;
      const url = SERVER_API_URL + "create_faq?secret=" + API_SECRET;
      console.log("adding faq details::: ", url, data, {
        headers: this.AuthToken,
      });
      return axios
        .post(url, data, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }
  editFaq(data) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "edit_faq?secret=" + API_SECRET;
      console.log("editing details::: ", url, data, {
        headers: this.AuthToken,
      });
      return axios
        .post(url, data, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }
  removeFaq(id) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "remove_faq?secret=" + API_SECRET;
      console.log("removing details::: ", url, id, { headers: this.AuthToken });
      return axios
        .post(url, { id: id }, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }

  //

  listPages() {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "list_pages?secret=" + API_SECRET;
      console.log("listing pages::: ", url, { headers: this.AuthToken });
      return axios.post(url, { headers: this.AuthToken }).then((response) => {
        console.log(response);
        return response.data;
      });
    });
  }
  getPagesDetails(id) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "get_pages_details?secret=" + API_SECRET;
      console.log("fetching pages details::: ", url, id, {
        headers: this.AuthToken,
      });
      return axios
        .post(url, { id: id }, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }

  createPages(data) {
    return authHeader().then((res) => {
      this.AuthToken = res;
      const url = SERVER_API_URL + "create_pages?secret=" + API_SECRET;
      console.log("adding page::: ", url, data, {
        headers: this.AuthToken,
      });
      return axios
        .post(url, data, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }
  editPages(data) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "edit_pages?secret=" + API_SECRET;
      console.log("editing page::: ", url, data, { headers: this.AuthToken });
      return axios
        .post(url, data, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }
  removePages(id) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "remove_pages?secret=" + API_SECRET;
      console.log("removing page::: ", url, id, { headers: this.AuthToken });
      return axios
        .post(url, { id: id }, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }

  //

  //

  listSettings() {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "list_settings?secret=" + API_SECRET;
      console.log("listing settings::: ", url, { headers: this.AuthToken });
      return axios.post(url, { headers: this.AuthToken }).then((response) => {
        console.log(response);
        return response.data;
      });
    });
  }

  getSettings(id) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "get_settings?secret=" + API_SECRET;
      console.log("geting settings::: ", url, { headers: this.AuthToken });
      return axios
        .post(url, { id: id }, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }
  editSetting(data) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "edit_settings?secret=" + API_SECRET;
      console.log("editing settings::: ", url, { headers: this.AuthToken });
      return axios
        .post(url, data, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }

  //Whitepaper

  listWhitepaper() {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "list_whitepaper?secret=" + API_SECRET;
      console.log("listing whitepaper::: ", url, { headers: this.AuthToken });
      return axios.post(url, { headers: this.AuthToken }).then((response) => {
        console.log(response);
        return response.data;
      });
    });
  }

  listWhitepaperCategories() {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url =
        SERVER_API_URL + "list_whitepaper_categories?secret=" + API_SECRET;
      console.log("listing whitepaper categories::: ", url, {
        headers: this.AuthToken,
      });
      return axios.post(url, { headers: this.AuthToken }).then((response) => {
        console.log(response);
        return response.data;
      });
    });
  }

  getWhitepaperDetails(id) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url =
        SERVER_API_URL + "get_whitepaper_details?secret=" + API_SECRET;
      console.log("fetching whitepaper details::: ", url, id, {
        headers: this.AuthToken,
      });
      return axios
        .post(url, { id: id }, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }

  createWhitepaper(data) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const objh = { "content-type": "multipart/form-data" };
      const hrs = { ...this.AuthToken, ...objh };
      const url = SERVER_API_URL + "create_whitepaper?secret=" + API_SECRET;
      console.log("adding whitepaper::: ", url, data, { headers: hrs });
      return axios.post(url, data, { headers: hrs }).then((response) => {
        console.log(response);
        return response.data;
      });
    });
  }
  editWhitepaper(data) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const objh = { "content-type": "multipart/form-data" };
      const hrs = { ...this.AuthToken, ...objh };
      const url = SERVER_API_URL + "edit_whitepaper?secret=" + API_SECRET;
      console.log("editing paper::: ", url, data, { headers: hrs });
      return axios.post(url, data, { headers: hrs }).then((response) => {
        console.log(response);
        return response.data;
      });
    });
  }

  getWhitepaperPage(data) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "get_whitepaper_page?secret=" + API_SECRET;
      console.log("get_whitepaper_page::: ", url, data, {
        headers: this.AuthToken,
      });
      return axios
        .post(url, data, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }

  removeWhitepaper(id) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "remove_whitepaper?secret=" + API_SECRET;
      console.log("removing whitepaper::: ", url, id, {
        headers: this.AuthToken,
      });
      return axios
        .post(url, { id: id }, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }

  verifyRegistration(params) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "verify_registration?secret=" + API_SECRET;
      console.log("verifying_registration::: ", url, {
        headers: this.AuthToken,
      });
      return axios
        .post(url, params, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }

  confirmPasswordReset(params) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url =
        SERVER_API_URL + "confirm_password_reset?secret=" + API_SECRET;
      console.log("confirm_password_reset::: ", url, params, {
        headers: this.AuthToken,
      });
      return axios
        .post(url, params, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }

  updateProfile(usr) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "update_profile?secret=" + API_SECRET;
      console.log("updating_profile::: ", url, {
        headers: this.AuthToken,
      });
      return axios
        .post(url, usr, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }
  queryTransaction(load) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "query_transaction?secret=" + API_SECRET;
      console.log("query_transaction::: ", url, {
        headers: this.AuthToken,
      });
      return axios
        .post(url, load, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }

  changePassword(usr) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "change_password?secret=" + API_SECRET;
      console.log("change_password::: ", url, {
        headers: this.AuthToken,
      });
      return axios
        .post(url, usr, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }

  fetchmethods() {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "fetchmethods?secret=" + API_SECRET;
      console.log("fetching methods::: ", url, { headers: this.AuthToken });
      return axios.get(url, { headers: this.AuthToken }).then((response) => {
        console.log(response);
        return response.data;
      });
    });
  }

  payPaystack(load) {
    return authHeader().then((res) => {
      this.AuthToken = res;
      const url = SERVER_API_URL + "pay_paystack?secret=" + API_SECRET;
      console.log("posting paystack::: ", load, url);
      return axios
        .post(url, load, { headers: this.AuthToken })
        .then((response) => {
          return response.data;
        });
    });
  }
  payFlutterwave(load) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "pay_flutterwave?secret=" + API_SECRET;
      console.log("posting flutterwave::: ", load, url);
      return axios
        .post(url, load, { headers: this.AuthToken })
        .then((response) => {
          return response.data;
        });
    });
  }

  initiatePay() {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "initiatepay?secret=" + API_SECRET;
      console.log("initiating pay::: ", url, { headers: this.AuthToken });
      return axios
        .post(url, {}, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }
  fetchBonus(code) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "fetchbonus?secret=" + API_SECRET;
      console.log("fetching bonus::: ", `${url}&code=${code}`, {
        headers: this.AuthToken,
      });

      return axios
        .post(`${url}`, { code: code }, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }

  fetchReferee(id) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + "fetchreferee?secret=" + API_SECRET;
      console.log("fetching referee::: ", `${url}&id=${id}`, {
        headers: this.AuthToken,
      });

      return axios
        .post(`${url}`, { id: id }, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }

  callApiPost(endpoint, load = {}) {
    return authHeader().then((res) => {
      this.AuthToken = res;

      const url = SERVER_API_URL + endpoint + "?secret=" + API_SECRET;
      console.log("calling api post ::: ", `${url}`, {
        headers: this.AuthToken,
      });
      return axios
        .post(`${url}`, load, { headers: this.AuthToken })
        .then((response) => {
          console.log(response);
          return response.data;
        });
    });
  }

  markCryptoPayment(load) {
    const url = SERVER_API_URL + "mark-crypto-payment?secret=" + API_SECRET;
    console.log("marking::: ", url);
    return axios.post(url, load).then((response) => {
      return response.data;
    });
  }

  findAccount(load) {
    const url = SERVER_API_URL + "/auth";
    return axios.post(url, load).then((response) => {
      return response.data;
    });
  }
  registerUser(load) {
    const url = SERVER_API_URL + "register-user?secret=" + API_SECRET;
    console.log("registering::: ", url);
    return axios.post(url, load).then((response) => {
      console.log(response);
      return response.data;
    });
  }
  resendVerify(load) {
    console.log(load);
    const url = SERVER_API_URL + "resend-verify?secret=" + API_SECRET;
    console.log("resending::: ", url);
    return axios.post(url, load).then((response) => {
      console.log(response);
      return response.data;
    });
  }
  forgotReset(load) {
    const url = SERVER_API_URL + "forgot-reset?secret=" + API_SECRET;
    console.log("resending::: ", url);
    return axios.post(url, load).then((response) => {
      console.log(response);
      return response.data;
    });
  }
  loginUser(load) {
    const url = SERVER_API_URL + "auth-login?secret=" + API_SECRET;
    console.log("fetching::: ", url);
    return axios.post(url, load).then((response) => {
      console.log(response);
      return response.data;
    });
  }
  checkSession() {
    return authHeader().then((res) => {
      this.AuthToken = res;
      console.log("authToken::", this.AuthToken);
      const url = SERVER_API_URL + "check-session?secret=" + API_SECRET;
      return axios.get(url, { headers: this.AuthToken }).then((response) => {
        console.log("checkSession::", response.data);
        let resp = response.data;
        return resp;
      });
    });
  }

  post(data, endpoint) {
    const url = SERVER_API_URL + endpoint + "?secret=" + API_SECRET;
    return axios.post(url, data).then((response) => {
      return response.data;
    });
  }
  get(endpoint) {
    const url = SERVER_API_URL + endpoint + "?secret=" + API_SECRET;
    return axios.post(url).then((response) => {
      return response.data;
    });
  }
  postHeader(endpoint, data) {
    return authHeader().then((res) => {
      this.AuthToken = res;
      const url = SERVER_API_URL + endpoint + "?secret=" + API_SECRET;
      return axios
        .post(url, data, { headers: this.AuthToken })
        .then((response) => {
          return response.data;
        });
    });
  }
  postExtraHeader(endpoint, data, extraHeaders) {
    return authHeader().then((res) => {
      this.AuthToken = res;
      const url = SERVER_API_URL + endpoint + "?secret=" + API_SECRET;
      return axios
        .post(url, data, { headers: { ...this.AuthToken, ...extraHeaders } })
        .then((response) => {
          return response.data;
        });
    });
  }
  postForm(endpoint, data) {
    const obh = { "content-type": "multipart/form-data" };
    const url = SERVER_API_URL + endpoint + "?secret=" + API_SECRET;
    return axios.post(url, data, { headers: obh }).then((response) => {
      return response.data;
    });
  }
  postFormHeader(endpoint, data) {
    return authHeader().then((res) => {
      this.AuthToken = res;
      const objh = { "content-type": "multipart/form-data" };
      const hrs = { ...this.AuthToken, ...objh };
      const url = SERVER_API_URL + endpoint + "?secret=" + API_SECRET;
      return axios.post(url, data, { headers: hrs }).then((response) => {
        return response.data;
      });
    });
  }
  getHeader(endpoint) {
    return authHeader().then((res) => {
      this.AuthToken = res;
      const url = SERVER_API_URL + endpoint + "?secret=" + API_SECRET;
      return axios.get(url, { headers: this.AuthToken }).then((response) => {
        let resp = response.data;
        return resp;
      });
    });
  }
}

const HttpService = new HttpServiceFunc();
export default HttpService;

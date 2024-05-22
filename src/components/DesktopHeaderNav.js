import Link from "next/link";

const DesktopHeaderNav = (props) => {
  const { isLogged, doLogout } = props;
  return (
    <nav className="header-nav">
      <ul className="nav-items">
        <li>
                <Link  href="/purchase">
              Buy $XRV  Tokens
                </Link>
              </li>
        <li>
          <Link href="./#features">Products</Link>
          <ul>
            <li>
              <Link href="./#startups">Startups</Link>
            </li>
            <li>
              <Link href="./#robo-advisors">Robo Advisors</Link>
            </li>
            <li>
              <Link href="./#real-estate">Real Estate</Link>
            </li>
            <li>
              <Link href="./#crypto">Crypto</Link>
            </li>
            <li>
              <Link href="./#social-investing">Social Investing</Link>
            </li>
            <li>
              <Link href="./#stocks">Stock & ETF</Link>
            </li>
            <li>
              <Link href="./#reva-pay">Reva Pay</Link>
            </li>
            <li>
              <Link href="./#tokenized-assets">Tokenized Assets</Link>
            </li>
          </ul>
        </li>

        <li>
          <Link href="./#learn">Learn</Link>
          <ul>
            <li>
              <Link href="./#academy">Academy</Link>
            </li>
            <li>
              <Link href="./#roadmap">Roadmap</Link>
            </li>
            <li>
              <Link href="./#faq">FAQ</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href="./#tokenomics">Tokenomics</Link>
        </li>
        <li>
          <Link href="/whitepaper">Whitepaper</Link>
        </li>
      </ul>
      <span className="auth-buttons">
        {!isLogged && (
          <>
            <Link href="/login" className="login">
              Login
            </Link>
            <Link href="/register" className="register">
              Register
            </Link>
          </>
        )}
        {isLogged && (
          <>
            <Link className="register" href="/account/dashboard">
              Dashboard
            </Link>
            <Link href={"./#"} className="logout" onClick={() => doLogout()}>
              Log&nbsp;Out
            </Link>
          </>
        )}
      </span>
    </nav>
  );
};

export default DesktopHeaderNav;

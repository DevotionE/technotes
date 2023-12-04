import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Niggi Driz Repairs </span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Located in Elegant Palm City, Niggi Driz Repairs Well Trained Workers
          Available At Any Time To Meet Your Tech Needs.
        </p>
        <address className="public__addr">
          Niggi Driz Repairs
          <br />
          66 Palm avenue
          <br />
          Palm City, Edo 56789
          <br />
          <a href="tel:+234">(234) 7053931576</a>
        </address>
        <br />
        <p>Founder: Niggi Drizzy</p>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );
  return content;
};
export default Public;

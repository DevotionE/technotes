import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Welcome = () => {
  const { username, isManager, isAdmin } = useAuth();

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-Ng", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="Welcome">
      <p>{today}</p>

      <h1>welcome Home {username}!!</h1>

      <p>
        <Link to="/dash/notes">View techNotes</Link>
      </p>
      <p>
        <Link to="/dash/notes/new">Add New techNote</Link>
      </p>

      {(isManager || isAdmin) && (
        <p>
          <Link to="dash/users">View User Setting</Link>
        </p>
      )}
      {(isManager || isAdmin) && (
        <p>
          <Link to="/dash/users/new">Add New Users</Link>
        </p>
      )}
    </section>
  );
  return content;
};
export default Welcome;

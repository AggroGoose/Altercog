import { signIn, getCsrfToken, getProviders } from "next-auth/react";
import { ImFacebook2, ImGithub } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

export default function SignIn({ providers, csrfToken }) {
  const [email, setEmail] = useState("");

  return (
    <div className="signin">
      <div className="signin__container">
        <div className="signin__info">
          <h2>Sign Into Altercog</h2>
          <p>Please sign in with your email address or social media account.</p>
        </div>
        <form
          className="signin__email"
          method="post"
          action="/api/auth/signin/email"
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <input
            className="signin__email--field"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="signin__email--button" type="submit">
            Sign in
          </button>
        </form>

        <div className="signin__providers">
          <button
            className="signin__providers--button"
            onClick={() => signIn(providers.facebook.id)}
          >
            <div className="signin__providers--button--content">
              <ImFacebook2 /> <p>Sign in with Facebook</p>
            </div>
          </button>
          <button
            className="signin__providers--button"
            onClick={() => signIn(providers.google.id)}
          >
            <div className="signin__providers--button--content">
              <FcGoogle /> <p>Sign in with Google</p>
            </div>
          </button>
          <button
            className="signin__providers--button"
            onClick={() => signIn(providers.github.id)}
          >
            <div className="signin__providers--button--content">
              <ImGithub /> <p>Sign in with Github</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: { providers, csrfToken },
  };
}

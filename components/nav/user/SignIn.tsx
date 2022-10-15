const SignIn = ({ signIn }: { signIn: () => void }) => {
  return (
    <button className="header__right--button" onClick={signIn}>
      Login
    </button>
  );
};

export default SignIn;

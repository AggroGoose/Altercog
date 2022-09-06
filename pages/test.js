import { useSession, signIn, signOut } from "next-auth/react";

const Test = () => {
  const { data: session, status } = useSession();

  session
    ? console.log("User is signed in", session)
    : console.log("User is not signed in");
  return (
    <div style={{ backgroundColor: "#000", height: "100vh" }}>
      {session ? (
        <>
          <h1>You are signed in</h1>
          <button onClick={signOut}>Sign Out</button>
        </>
      ) : (
        <>
          <h1>You are not signed in</h1>
          <button onClick={signIn}>Sign In</button>
        </>
      )}
    </div>
  );
};

export default Test;

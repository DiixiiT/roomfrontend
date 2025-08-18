const LandingPage = () => {
  return (
    <div>
      <div className="h-screen flex flex-col items-center justify-center align-center px-24 text-center">
        <h1 className="text-6xl max-w-4xl leading-relaxed">
          Speak <span className="text-blue-500">freely</span>. Decide{" "}
          <span className="text-blue-500">quickly</span>.
        </h1>
        <h1 className="text-xl max-w-4xl leading-relaxed">
          Anonymous time-boxed group chat for honest collaboration. Candid
          feedback, trip planning, no pressure, just a private space for real
          talk.
        </h1>

        <button className="bg-black text-white rounded-full px-6 py-3 hover:bg-gray-800 transition-colors mt-8">
          Sign in with google to create room
        </button>
      </div>
    </div>
  );
};

export default LandingPage;

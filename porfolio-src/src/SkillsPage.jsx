export default function SkillsPage({ SkillObj, Index }) {
  return (
    <>
      <div className="w-full text-white h-screen flex relative items-center justify-center">
        <div
          className={`border-white p-5 border w-[25rem] relative ${
            Index % 2 === 0
              ? "top-[15vh] left-[20rem]"
              : "top-[15vh] left-[-20rem]"
          }`}
        >
          <div className="flex justify-center flex-col">
            <span className="w-full">
              <img
                className="w-[13rem] animate-spin-slow mx-auto"
                src={SkillObj.Image}
                alt="err"
                width="200"
                height="200"
              />
            </span>
            <span className="font-extrabold text-lg my-3">{SkillObj.name}</span>
            <span className="mb-3">{SkillObj.description}</span>
            {SkillObj.Links ? (
              <span>
                <a
                  href={SkillObj.Links}
                  target="_blank"
                  className="p-2 rounded-md bg-white text-black"
                >
                  @ {SkillObj.LinksName}
                </a>
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

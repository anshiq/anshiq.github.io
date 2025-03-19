
import Anshik from "./assets/anshik.jpeg";
import { useEffect, useState } from "react";
import RocketSvg from "./RocketSvg";
import RocketIconButton from "./RocketIconButton";
import SkillsPage from "./SkillsPage";
import Skills from "./SkillsList.js";
import { AirPlaneSvg, GearSvg } from "./assets/Svgs";
export default function Home() {
  const [startRocket, setStartRocket] = useState(false);
  const [remoteButtons, setRemoteButtons] = useState(true);
  const [flightMode, setFlightMode] = useState("");
  const [autoStart, setAutoStart] = useState(true);
  const [mannulPosition, setMannualPosition] = useState(0);
  const [isreached, setisReached] = useState(false);
  // useEffect(() => {
  //   const handleKeyPress = (event: any) => {
  //     if (event.keyCode === 87) {
  //       console.log("W key pressed");
  //       handleScrollManual("+");
  //     }
  //     if (event.keyCode === 83) {
  //       console.log("S key pressed");
  //       handleScrollManual("-");
  //     }
  //   };
  //   window.addEventListener("keydown", handleKeyPress);
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, []);
  useEffect(() => {
    const bottomMarker = document.getElementById("bottomMarker");
    bottomMarker.scrollIntoView();
    document.body.style.overflow = "hidden";
  }, []);
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 700) {
        alert("This app is best viewed on a larger screen.");
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);
  const handleScrollManual = (symbol) => {
    const uniElement = document.querySelector(".uni-mannual");
    // const height100vh: any = document.getElementById("100vhtell");
    const rocketElement = document.getElementById("rocket");
    const uniElementHeight = uniElement.offsetHeight;
    uniElement.style.transform = `translateY(${mannulPosition}px)`;
    rocketElement?.scrollIntoView();
    if (symbol === "-" && mannulPosition === 0) {
      uniElement.style.transform = `translateY(0px)`;
      rocketElement?.classList.add("rocket-down");
      setisReached(false);
    }
    if (symbol === "+") {
      rocketElement?.classList.remove("rocket-down");
      rocketElement?.classList.add("rocket-up");
      if (mannulPosition < uniElementHeight) {
        setMannualPosition((prev) => {
          return prev + 300;
        });
      } else {
        alert("reached");
        setisReached(true);
      }
    } else {
      if (mannulPosition > 0) {
        if (mannulPosition < 500) {
          setMannualPosition(mannulPosition - 100);
          return;
        }
        setMannualPosition(mannulPosition - 300);
      } else {
        setMannualPosition(0);
        setFlightMode("");
      }
    }
  };
  const handleScrollAuto = (symbol) => {
    if (symbol === "+") {
      setAutoStart(!autoStart);
    }
    const uniElement = document.querySelector(".uni");
    //    const height100vh: any = document.getElementById("100vhtell");
    // height100vh?.offsetHeight
    const rocketElement = document.getElementById("rocket");
    const uniElementHeight = uniElement.offsetHeight;
    if (symbol === "+") {
      uniElement.style.transform = `translateY(${uniElementHeight}px)`;
      rocketElement?.classList.add("rocket-up");
    } else {
      rocketElement?.classList.add("rocket-down");
      uniElement.style.transform = `translateY(${0}px)`;
      // setFlightMode("");
    }
  };
  return (
    <>
     {flightMode === "auto" ? (
  !autoStart ? (
    <button
      onClick={() => {
        handleScrollAuto("-");
      }}
      className="fixed py-3 px-6 z-30 bg-transparent text-white rounded-md border border-white hover:text-yellow-600 hover:border-red-400 transition duration-300 right-14 top-14 flex items-center"
    >
      <span className="mr-2">Return</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 7V11H5.83L9.41 7.41L8 6L2 12L8 18L9.41 16.59L5.83 13H21V7H19Z" fill="currentColor" />
      </svg>
    </button>
  ) : (
    <button
      onClick={() => {
        handleScrollAuto("+");
      }}
      className="fixed py-3 px-6 z-30 bg-transparent text-white rounded-md border border-white hover:text-yellow-600 hover:border-red-400 transition duration-300 left-14 top-14 flex items-center"
    >
      <span className="mr-2">Start</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
      </svg>
    </button>
  )
) : (
  <></>
)}
      <div className="w-screen bg-black flex item-center justify-center  h-screen overflow-x-hidden ">
        <div className="w-[73rem] ">
          <div
            className={`${
              flightMode === "auto" ? "uni" : "uni-mannual"
            }  overflow-x-hidden  sky w-full`}
          >
            {Skills.map((each, index) => {
              return <SkillsPage key={index} Index={index} SkillObj={each} />;
            })}
          </div>
          {flightMode ? (
            <div
              id="rocket"
              className={`flex  w-[73rem] items-center justify-center`}
            >
              <div className="relative animate-vibration">
                <RocketSvg />
              </div>

              {flightMode === "manual" ? (
                <>
                  {!isreached ? (
                    <button
                      onClick={() => {
                        handleScrollManual("+");
                      }}
                      className="py-3 px-6 bg-transparent text-white rounded-md border border-white hover:text-yellow-600 hover:border-red-400 transition duration-300 mx-2 flex items-center"
                    >
                      <span className="mr-2">Up</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 4L4 12H9V20H15V12H20L12 4Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleScrollManual("-");
                      }}
                      className="py-3 px-6 bg-transparent text-white rounded-md border border-white hover:text-yellow-600 hover:border-red-400 transition duration-300 mx-2 flex items-center"
                    >
                      <span className="mr-2">Down</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 20L4 12H9V4H15V12H20L12 20Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}

          {flightMode ? (
            <></>
          ) : (
            <>
              <div
                className={`${
                  flightMode
                    ? "translate-y-[-40vh] absolute bottom-0"
                    : "translate-y-0"
                } w-full  h-[13rem] bg-transparent transition-transform duration-[2000ms] overflow-hidden flex items-center justify-center`}
              >
                <button
                  onClick={() => {
                    setRemoteButtons(!remoteButtons);
                    setFlightMode("manual");
                  }}
                  className={
                    startRocket && remoteButtons
                      ? "block py-3 px-6 bg-transparent text-white rounded-md border border-white hover:text-yellow-600 hover:border-red-400 transition duration-300 "
                      : "invisible"
                  }
                >
                  <span className="flex items-center justify-center flex-row">
                    {" "}
                    <span className=" mr-5">Manually Control</span>
                    <GearSvg />
                  </span>
                </button>
                <div
                  className={`relative transition-transform duration-1000 ${
                    startRocket ? "" : "translate-y-[5.2rem]"
                  }`}
                >
                  <div>
                    <RocketSvg />
                  </div>
                </div>
                <button
                  onClick={() => {
                    setRemoteButtons(!remoteButtons);
                    setFlightMode("auto");
                  }}
                  className={
                    startRocket && remoteButtons
                      ? "block py-3 px-6 bg-transparent text-white rounded-md border border-white hover:text-yellow-600 hover:border-red-400 transition duration-300  "
                      : "invisible"
                  }
                >
                  {" "}
                  <span className="flex items-center justify-center flex-row ">
                    <span className="mr-5">Auto Pilot</span>
                    <AirPlaneSvg />
                  </span>
                </button>
              </div>
              <div
                className={` ${
                  startRocket ? "" : "border-t-[12px] border-gray-700"
                } w-full   p-16 h-[60vh]`}
              >
                <div className="w-full flex flex-row items-center justify-center rounded-lg border border-white shadow-lg">
                  <img
                    className="w-[40%] ml-[0.1rem] rounded-l-lg"
                    src={Anshik}
                    height={400}
                    width={400}
                    alt="Profile"
                  />
                  <div className="w-[60%] p-8">
                    <h2 className="text-3xl text-white font-semibold mb-4">
                      Crafting Digital Experiences.
                    </h2>{" "}
                    <p className="text-lg text-white leading-relaxed">
                      Hello! I&apos;m a full-stack web developer with a knack
                      for crafting user-friendly solutions. Proficient in the
                      MERN stack and cloud tech, I build scalable applications.
                      Git/GitHub? It&apos;s my version control superpower.
                    </p>
                    <button
                      onClick={() => {
                        setStartRocket(!startRocket);
                        setMannualPosition(0);
                        setRemoteButtons(true);
                        setFlightMode("");
                        setisReached(false);
                      }}
                      className="mt-8 flex items-center justify-center py-3 px-6 bg-transparent text-white rounded-md border border-white hover:text-yellow-600 hover:border-red-400 transition duration-300"
                    >
                      <span className="mr-2">Explore More</span>
                      <RocketIconButton />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          <div id="bottomMarker" className="h-0 w-0 ">
            {" "}
          </div>
        </div>
      </div>
    </>
  );
}

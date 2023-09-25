import { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsChevronRight } from "react-icons/bs";
import { FaPlus, FaTiktok, FaTimes, FaUser } from "react-icons/fa";
import { IoMdRose } from "react-icons/io";
import { MdOutlineLiveTv } from "react-icons/md";
import { PiHandWavingLight, PiShareFatLight } from "react-icons/pi";
import { IconFloating } from "./components/icon-floating";

function App() {
  const [isLiveOpen, setIsLiveOpen] = useState(false);

  const [currentVideo, setCurrentVideo] = useState("main");
  const mainVideoRef = useRef(null);
  const substituteVideoRef = useRef(null);

  const handleButtonClick = () => {
    if (currentVideo === "main") {
      if (mainVideoRef.current) {
        mainVideoRef.current.pause();
      }
      setCurrentVideo("substitute");
      if (substituteVideoRef.current) {
        substituteVideoRef.current.play();
      }
    }
  };

  const handleSubstituteVideoEnded = () => {
    if (substituteVideoRef.current) {
      substituteVideoRef.current.pause();
    }
    setCurrentVideo("main");
    if (mainVideoRef.current) {
      mainVideoRef.current.play();
    }
  };

  const [contador, setContador] = useState(0);

  const iniciarContador = () => {
    setContador(45 * 60);
  };

  const executarFuncao = () => {
    setRoses(0);
    iniciarContador();
  };

  useEffect(() => {
    iniciarContador();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (contador > 0) {
        setContador(contador - 1);
      } else {
        clearInterval(timer);
        executarFuncao();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [contador]);

  const [roses, setRoses] = useState(1);
  const [reactionVideo, setReactionVideo] = useState("/video-2.mp4");

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddRose = (video) => {
    handleButtonClick();
    setReactionVideo(video);
    if (roses < 100) {
      setRoses(roses + 1);
    } else {
      setRoses(0);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const newComment = inputValue;

      setChat((prevChat) => [
        ...prevChat,
        {
          id: prevChat.length + 1,
          username: "filipeleonelbatista",
          comentario: newComment,
        },
      ]);

      setInputValue("");
    }
  };

  const [chat, setChat] = useState([
    {
      id: 1,
      username: "diego3g",
      comentario: "Não acredito que ensinei tailwind pra isso!",
    },
    {
      id: 2,
      username: "filipedeschamps",
      comentario: "#delicinha!",
    },
    {
      id: 3,
      username: "rodrigorgtic",
      comentario: "É Diegão, criamos um monstro!",
    },
    {
      id: 4,
      username: "maykbrito",
      comentario: "Olha quanta experiência massa temos aqui!",
    },
    {
      id: 4,
      username: "maykbrito",
      comentario: "Com certeza esse aí fez o discovery!",
    },
    {
      id: 5,
      username: "rocketseat-education",
      comentario: "Esse aí na trilha de IA da Rocketseat iria fazer loucuras!",
    },
    {
      id: 6,
      username: "diego3g",
      comentario: "Com certeza rocketseat!",
    },
  ]);

  const handleNavigatorShare = async () => {
    window.open("https://filipeleonelbatista.vercel.app/links", "_blank");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setChat((prevChat) => {
        const updatedChat = [...prevChat];

        const firstComment = updatedChat.shift();
        updatedChat.push(firstComment);

        return updatedChat;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="p-4 h-screen w-full flex justify-center">
      <div className="overflow-hidden relative h-full w-auto aspect-[9/16] rounded border flex flex-col justify-between">
        {currentVideo === "main" ? (
          <video
            className="h-auto w-full"
            ref={mainVideoRef}
            src="/video-1.mp4"
            controls={false}
            autoPlay
            muted
            loop
          />
        ) : (
          <video
            className="h-auto w-full"
            ref={substituteVideoRef}
            src={reactionVideo}
            controls={false}
            autoPlay
            muted={false}
            volume={0.5}
            onEnded={handleSubstituteVideoEnded}
          />
        )}

        <div className="absolute w-full h-full aspect-[9/16] z-10 flex flex-col justify-between">
          {!isLiveOpen ? (
            <div
              className="w-auto h-full  aspect-[9/16] flex flex-col justify-between"
              onClick={() => {
                setIsLiveOpen(true);
              }}
            >
              <div className="flex w-full justify-between items-center px-4">
                <MdOutlineLiveTv className="w-8 h-8" />
                <div className="flex w-full justify-center gap-4 font-semibold items-center p-4">
                  <p className="flex text-white/80 font-normal relative pb-1">
                    Seguindo
                    <span className="w-2 h-2 rounded-full bg-red-600"></span>
                  </p>
                  <p className="flex text-white/90 border-b-2 border-white/90 pb-1">
                    Para você
                  </p>
                </div>
                <BiSearch className="w-8 h-8" />
              </div>
              <div className="flex flex-col w-full gap-2 p-4">
                <div className="flex w-full justify-between items-center">
                  <div className="w-10 h-[1px] bg-white/60"></div>
                  <p className="flex font-semibold text-white/90 pb-1">
                    Toque para assistir à LIVE
                  </p>
                  <div className="w-10 h-[1px] bg-white/60"></div>
                </div>
                <div className="px-1 py-1 bg-red-700 rounded text-xs font-semibold w-fit">
                  Em transmissão ao vivo agora
                </div>
                <div className="flex font-semibold text-white/90 pb-1">
                  NPC Automatizado...
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-2 py-2">
                <div className="flex justify-between gap-1 items-center px-2">
                  <div
                    onClick={handleNavigatorShare}
                    className="flex cursor-pointer gap-1 items-center bg-zinc-900/30 w-fit p-1 rounded-full"
                  >
                    <img
                      src="https://github.com/filipeleonelbatista.png"
                      alt="Meu canal"
                      className="w-6 h-6 object-cover rounded-full"
                    />
                    <div className="flex flex-col">
                      <p className="text-[8px] font-semibold text-white/90">
                        filipeleonelbatista
                      </p>
                      <p className="text-[8px] text-white/90">1.32M Curtidas</p>
                    </div>
                    <button className="text-[8px] h-4 font-semibold text-white/90 flex rounded-full bg-pink-700 px-2 items-center gap-1">
                      <FaPlus />
                      Seguir
                    </button>
                  </div>
                  <div className="flex gap-1 items-center">
                    <img
                      src="https://github.com/filipeleonelbatista.png"
                      alt="Meu canal"
                      className="w-6 h-6 object-cover rounded-full"
                    />
                    <img
                      src="https://github.com/filipeleonelbatista.png"
                      alt="Meu canal"
                      className="w-6 h-6 object-cover rounded-full"
                    />
                    <div className="flex gap-2 items-center bg-zinc-900/30 w-fit p-1 rounded-full text-[10px] font-semibold text-white/90">
                      <FaUser /> 321k
                    </div>
                  </div>

                  <div
                    onClick={() => setIsLiveOpen(false)}
                    className="flex cursor-pointer items-center bg-zinc-900/30 w-4 h-4 p-1 rounded-full text-[10px] text-white/90"
                  >
                    <FaTimes />
                  </div>
                </div>
                <div className="flex px-2">
                  <div className="flex gap-2">
                    <div
                      onClick={handleNavigatorShare}
                      className="flex cursor-pointer px-4 gap-2 items-center bg-zinc-900/30 w-fit p-1 rounded-full text-[10px] font-semibold text-white/90"
                    >
                      <FaUser /> NPC
                    </div>
                    <div
                      onClick={handleNavigatorShare}
                      className="flex cursor-pointer px-4 gap-2 items-center bg-zinc-900/30 w-fit p-1 rounded-full text-[10px] font-semibold text-white/90"
                    >
                      <FaUser /> Apelação
                    </div>
                  </div>
                  <div
                    onClick={handleNavigatorShare}
                    className="flex cursor-pointer gap-2 px-4 ml-auto items-center bg-zinc-900/30 w-fit p-1 rounded-full text-[10px] font-semibold text-white/90"
                  >
                    <BiSearch /> Explorar <BsChevronRight />
                  </div>
                </div>
                <div className="flex flex-row-reverse px-2 gap-2 ">
                  <div
                    onClick={handleNavigatorShare}
                    className="flex cursor-pointer items-center gap-2 bg-zinc-900/60 rounded w-fit p-2 "
                  >
                    <div className="flex flex-col items-center">
                      <p className="text-[10px]">Entre em contato</p>
                      <p className="text-[10px]">Desenvolva seu aplicativo</p>
                    </div>
                    <FaTiktok />
                  </div>
                  <div className="flex items-center gap-4 bg-zinc-900/30 rounded w-fit p-2 relative">
                    <div className="text-[10px]">
                      <span className="text-yellow-400">{roses}</span>/100
                    </div>
                    <IoMdRose className="w-6 h-6 text-pink-600" />
                    <span className="bg-black rounded-full text-[8px] px-[4px] absolute bottom-[-4px] right-1">
                      {Math.floor((contador % 3600) / 60)}m{contador % 60}s
                    </span>
                    <div className="absolute bottom-0 left-0 w-[35px] bg-gray-200 rounded-full h-1 dark:bg-gray-700">
                      <div
                        className="bg-yellow-400 h-1 rounded-full"
                        style={{ width: `${roses}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col justify-end w-4/5 h-44 gap-1 px-2 overflow-hidden">
                  {chat.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-2 items-center w-full p-1 rounded-full"
                    >
                      <img
                        src={`https://github.com/${item.username}.png`}
                        alt="Meu canal"
                        className="w-6 h-6 object-cover rounded-full"
                      />
                      <div className="flex flex-col">
                        <p className="text-[8px] font-semibold text-white/90">
                          {item.username}
                        </p>
                        <p className="text-[10px] text-white/90">
                          {item.comentario}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex px-3 gap-2 items-center w-full p-1 rounded-full">
                  <span className="flex p-2 bg-zinc-200/30 rounded-full">
                    <PiHandWavingLight className="w-3 h-3" />
                  </span>
                  <p className="text-[10px] font-semibold text-white/90">
                    {chat[0].username + " "}
                    <b>Entrou</b> na LIVE
                  </p>
                </div>
                <div className="flex px-2 gap-2 items-center w-full pb-2">
                  <input
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Adicionar comentário..."
                    onKeyPress={handleKeyPress}
                    className="w-4/5 h-8 bg-zinc-900/60 px-2 py-1 rounded-full placeholder-white text-sm"
                  />
                  <IconFloating
                    handleAddRose={() => handleAddRose("/video-2.mp4")}
                    icon="rose"
                  />
                  <IconFloating
                    handleAddRose={() => handleAddRose("/video-3.mp4")}
                    icon="corn"
                  />

                  <button
                    onClick={handleNavigatorShare}
                    className="flex items-center justify-center bg-zinc-900/60 w-8 h-8 p-1 rounded-full"
                  >
                    <PiShareFatLight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

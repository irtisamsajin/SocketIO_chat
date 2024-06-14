import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./App.css";
import { socket } from "./socket";

const App = () => {
  const [inputmsg, setInputmsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<string[]>([]);
  const [room, setRoom] = useState<string>("");
  const [currentRoom, setCurrentRoom] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsLoading(true);
    socket.emit("newMessage", { currentRoom, inputmsg });
    setInputmsg("");
    setIsLoading(false);
  };

  const handleRoomSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentRoom != "") socket.emit("leaveRoom", currentRoom);
    socket.emit("joinRoom", room);
    setCurrentRoom(room);
    setRoom("");
    setMessages([]);
    setIsLoading(false);
  };

  useEffect(() => {
    const addMessage = (newMessage: string) => {
      setMessages([...messages, newMessage]);
    };
    socket.on("messageBroadcast", addMessage);

    return () => {
      socket.off("messageBroadcast", addMessage);
    };
  });

  return (
    <>
      <form onSubmit={handleRoomSubmit}>
        <input
          type="text"
          value={room}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setRoom(e.target.value);
          }}
        ></input>
        <button type="submit">Submit</button>
      </form>
      <form onSubmit={handleSubmit}>
        <h4>{currentRoom}</h4>
        <input
          type="text"
          value={inputmsg}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputmsg(e.target.value);
          }}
        ></input>
        <button type="submit" disabled={isLoading}>
          Submit
        </button>
      </form>
      <h2>Messages:</h2>
      <ul>
        {messages.map((item: string, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </>
  );
};
export default App;

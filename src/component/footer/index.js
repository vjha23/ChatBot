import React, { useState, useEffect } from "react";
import '../../css/footer.scss'
import { MdKeyboardVoice} from "react-icons/md";

function Footer(props) {
  const [inputText, setInputText] = useState("");

  const handleReset = (e) => {
    if (e.key === "Enter") {
      props.handleSendMessage(inputText);
      setInputText("");
    }
  };
  return (
    <div className="footerContainer">
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message here"
          onKeyDown={(e) => handleReset(e)}
        />
        <MdKeyboardVoice style={{fontSize:'2.2rem'}}/>
    </div>
  );
}

export default Footer;

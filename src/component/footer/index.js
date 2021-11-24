import React, { useState, useEffect } from "react";
import '../../css/footer.scss'

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
          placeholder="Please Type Something.."
          onKeyDown={(e) => handleReset(e)}
        />
    </div>
  );
}

export default Footer;

import { useState, useEffect } from 'react';
const MAX_LIMIT = 100;
function CharacterCounter() {
  const [text, setText] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [isLimitExceeded, setIsLimitExceeded] = useState(false);
  useEffect(() => {
    const characters = text.length;
    const words = text
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0).length;
    setCharCount(characters);
    setWordCount(words);
    setIsLimitExceeded(characters > MAX_LIMIT);
  }, [text]);
  return (
    <div style={styles.container}>
      <h2>Live Character Counter</h2>

      <textarea
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          ...styles.textarea,
          borderColor: isLimitExceeded ? "red" : "#ccc"
        }}
      />
      <div style={styles.info}>
        <p>Characters: {charCount}</p>
        <p>Words: {wordCount}</p>
        <p>Limit: {MAX_LIMIT}</p>
      </div>
      {isLimitExceeded && (
        <p style={styles.warning}>
          ⚠ Character limit exceeded!
        </p>
      )}
      
    </div>
  
  );
}
export default CharacterCounter;

import { useState } from 'react';
import styles from './ChatBot.module.css';

interface Message {
  text: string;
  isUser: boolean;
  options?: string[];
}

function Chatbot() {
  const initialOptions = [
    { text: 'Consulta de propiedades', subOptions: ['Ver todas'], isOpen: false },
    { text: 'Precios de alquileres', subOptions: ['Todos'], isOpen: false },
    { text: 'Formas de pago', subOptions: ['pago'], isOpen: false },
  ];

  const [options, setOptions] = useState(initialOptions);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const toggleOption = (index: number) => {
    setOptions((prev) =>
      prev.map((opt, i) => (i === index ? { ...opt, isOpen: !opt.isOpen } : opt))
    );
  };

  const handleSubOptionClick = async (option: string) => {
    setMessages([...messages, { text: option, isUser: true }]);

    const response = await fetch('http://localhost:3001/chatbot/response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ option }),
    });
    const data = await response.json();

    // Si el usuario selecciona "Volver al Menú", restablecemos los mensajes y las opciones principales
    if (option === 'Volver al Menú') {
      setMessages([]);
      setOptions(initialOptions);
    } else {
      setMessages((prev) => [
        ...prev,
        { text: data.text, isUser: false, options: data.options },
      ]);
    }
  };

  return (
    <>
      <button onClick={toggleChat} className={styles.chatIcon}>
        💬
      </button>
      {isOpen && (
        <div className={styles.chatbotContainer}>
          <h2 className={styles.header}>¿En qué puedo ayudarte?</h2>
          {options.map((option, index) => (
            <div key={index} className={styles.optionContainer}>
              <button onClick={() => toggleOption(index)} className={styles.mainOptionButton}>
                {option.text}
              </button>
              {option.isOpen && (
                <div className={styles.subOptions}>
                  {option.subOptions.map((subOption, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSubOptionClick(subOption)}
                      className={styles.subOptionButton}
                    >
                      {subOption}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className={styles.chatMessages}>
            {messages.map((msg, index) => (
              <div key={index} className={`${styles.message} ${msg.isUser ? styles.userMessage : styles.botMessage}`}>
                {msg.text}
                {/* Renderizar las opciones que devuelve el chatbot */}
                {msg.options && (
                  <div className={styles.subOptions}>
                    {msg.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSubOptionClick(opt)}
                        className={styles.subOptionButton}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;

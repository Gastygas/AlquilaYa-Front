import { useState, useRef, useEffect } from 'react';
import styles from './ChatBot.module.css';

interface Message {
  text: string[];
  isUser: boolean;
  options?: string[];
}

function Chatbot() {
  const initialOptions = [
    { text: 'Consulta de propiedades', subOptions: ['Ver todas'], isOpen: false },
    { text: 'Precios de alquileres', subOptions: ['Todos'], isOpen: false },
    { text: '¿Cuáles son las opciones de pago disponibles?', subOptions: ['Ver forma de pago'], isOpen: false },
    { text: '¿Puedo cancelar una reserva?', subOptions: ['Intrucciones para cancelar una reserva'], isOpen: false },
    { text: '¿Las propiedades están amuebladas?', subOptions: ['Las propiedades pueden tener o no los siguientes items'], isOpen: false },
  ];

  
  const [options, setOptions] = useState(initialOptions);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  
  const toggleChat = () => setIsOpen(!isOpen);
  
  const toggleOption = (index: number) => {
    setOptions((prev) =>
      prev.map((opt, i) => (i === index ? { ...opt, isOpen: !opt.isOpen } : opt))
  );
};

// const noBackendOptions = ['Instrucciones para cancelar una reserva'];
  const handleSubOptionClick = async (option: string) => {
    setMessages([...messages, { text: [option], isUser: true }]);

    if (option === 'Instrucciones para cancelar una reserva') {
      setMessages((prev) => [
        ...prev,        
        { text: ['Para cancelar una reserva, por favor sigue los pasos indicados en tu perfil o contáctanos directamente.'], isUser: false }
      ]);
      console.log('messages: ', messages);
      
      return; 
    }
    
    const url =  'alquila-back-latest.onrender.com';
    const response = await fetch(`${url}/chatbot/response`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ option }),
    });
    const data = await response.json();

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

  // Función para desplazarse hacia abajo cuando cambia el estado de `messages`
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
              <div
                key={index}
                className={`${styles.message} ${msg.isUser ? styles.userMessage : styles.botMessage}`}
              >
                {/* Mostrar cada línea de texto en un párrafo separado */}
                {msg.text.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
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
            {/* Div vacío al final para referenciar el scroll */}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;

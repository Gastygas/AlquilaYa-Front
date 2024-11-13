"use client"
import React, { useState } from 'react';
import './Faq.css';

const faqs = [
  {
    question: "¿Cómo puedo reservar una propiedad?",
    answer: "Para reservar una propiedad, primero busca la que más te interese, selecciona las fechas de tu estadía y sigue los pasos de pago.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer: "Aceptamos tarjetas de crédito, transferencias bancarias y pagos a través de plataformas como PayPal.",
  },
  {
    question: "¿Es posible cancelar una reserva?",
    answer: "Sí, las reservas pueden cancelarse. Las políticas de cancelación varían según la propiedad y se indican en la página de cada anuncio.",
  },
  {
    question: "¿Cómo contacto con el anfitrión?",
    answer: "Una vez realizada la reserva, podrás comunicarte directamente con el anfitrión desde la sección de tus reservas.",
  },
  {
    question: "¿Qué hago si tengo un problema durante mi estancia?",
    answer: "Si surge algún problema, puedes contactar a nuestro equipo de soporte disponible las 24 horas para ayudarte.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container padding-section">
      <h2 className="faq-title text-4xl text-center mb-8">Preguntas Frecuentes</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button className="faq-question text-2xl" onClick={() => toggleFaq(index)}>
              {faq.question}
            </button>
            {openIndex === index && <p className="faq-answer mt-2">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;

import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/+918319039381"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 left-4 bg-green-500 hover:bg-green-600 text-white p-5 rounded-full shadow-lg z-50"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={32} />
    </a>
  );
};

export default WhatsAppButton;

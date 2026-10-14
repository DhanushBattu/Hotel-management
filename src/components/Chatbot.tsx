import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, X } from 'lucide-react';
import { Button } from './ui/Button';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

type RestaurantFAQ = {
  question: string;
  answer: string;
  keywords: string[];
};

const FAQ: RestaurantFAQ[] = [
  // Orders
  {
    question: "How do I create a new order?",
    answer: "To create a new order:\n1. Go to the 'Waiter POS' section\n2. Click 'New Order'\n3. Select order type (Dine-in/Takeaway/Delivery)\n4. Add menu items and quantities\n5. Apply any special requests\n6. Click 'Submit Order' to send to kitchen",
    keywords: ["create", "new", "order", "add", "place"]
  },
  {
    question: "How do I modify an order?",
    answer: "To modify an order:\n1. Go to 'Active Orders'\n2. Select the order to modify\n3. Click 'Modify Order'\n4. Add/remove items or change quantities\n5. Add notes if needed\n6. Click 'Update Order' to save changes",
    keywords: ["modify", "change", "update", "edit", "cancel"]
  },
  
  // Payments
  {
    question: "How do I process a payment?",
    answer: "To process a payment:\n1. Go to 'Billing'\n2. Select the order to pay\n3. Verify order details\n4. Select payment method (Cash/Card/UPI/Split)\n5. Enter payment details\n6. Click 'Process Payment'\n7. Print or email receipt",
    keywords: ["payment", "pay", "bill", "checkout", "cash", "card", "upi"]
  },
  {
    question: "How do I apply a discount?",
    answer: "To apply a discount:\n1. Open the order in Billing\n2. Click 'Apply Discount'\n3. Select discount type (% or fixed amount)\n4. Enter discount value\n5. Add reason if required\n6. Click 'Apply'\nNote: Some discounts may require manager approval.",
    keywords: ["discount", "coupon", "promo", "voucher"]
  },
  
  // Inventory
  {
    question: "How do I check inventory levels?",
    answer: "To check inventory:\n1. Go to 'Inventory'\n2. View current stock levels\n3. Use filters to find specific items\n4. Check reorder levels (red = low stock)\n5. Click on an item for detailed history\n\nYou can also use the search bar to find specific items quickly.",
    keywords: ["inventory", "stock", "items", "check", "quantity"]
  },
  {
    question: "How to add new inventory items?",
    answer: "To add new inventory items:\n1. Go to 'Inventory' > 'Items'\n2. Click 'Add New Item'\n3. Fill in item details (name, category, unit, etc.)\n4. Set initial stock level and reorder point\n5. Add supplier information\n6. Click 'Save'\n\nNote: You need inventory manager or admin access.",
    keywords: ["add", "new", "item", "inventory", "create"]
  },
  
  // Tables
  {
    question: "How do I manage tables?",
    answer: "Table management:\n\n• Available: White (ready for customers)\n• Occupied: Green (customers seated)\n• Needs Cleaning: Yellow (recently vacated)\n• Reserved: Blue (reserved for later)\n\nTo manage:\n1. Click on a table to view details\n2. Select 'Start New Order' or 'View Order'\n3. For cleaning, mark as 'Clean' when done",
    keywords: ["table", "floor", "plan", "manage", "clean", "reserve"]
  },
  
  // Reports
  {
    question: "How do I view sales reports?",
    answer: "To view sales reports:\n1. Go to 'Reports' > 'Sales'\n2. Select date range\n3. Choose report type (Daily/Weekly/Monthly)\n4. Apply filters (payment type, category, etc.)\n5. View results or click 'Export' to download\n\nAvailable reports:\n• Sales Summary\n• Item-wise Sales\n• Category-wise Sales\n• Payment Methods\n• Tax Reports",
    keywords: ["report", "sales", "analytics", "export", "revenue", "profit"]
  },
  
  // Settings
  {
    question: "How do I change my password?",
    answer: "To change your password:\n1. Click your profile picture in top-right\n2. Select 'Account Settings'\n3. Click 'Change Password'\n4. Enter current password\n5. Enter new password (minimum 8 characters)\n6. Confirm new password\n7. Click 'Update Password'\n\nNote: You'll be logged out after changing your password.",
    keywords: ["password", "change", "reset", "account", "security"]
  },
  
  // Help
  {
    question: "How do I get help?",
    answer: "For assistance:\n\n• Browse the 'Help' section in Settings\n• Contact support: support@restaurant.com\n• Call: +1-555-123-4567 (24/7)\n• Check our knowledge base for guides\n\nFor urgent issues, please call our support line for immediate assistance.",
    keywords: ["help", "support", "contact", "assistance", "problem", "issue"]
  }
];

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your restaurant assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase().trim();
    
    // Check for greeting
    if (/^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening))[!?.]?$/i.test(lowerInput)) {
      const greetings = [
        'Hello! How can I assist you with the restaurant management system today?',
        'Hi there! What can I help you with?',
        'Good day! How may I assist you with the restaurant system?',
        'Hello! What would you like to know about the restaurant management system?'
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Check for help
    if (/^(help|support|what can you do|what do you do|how can you help)[?]?$/i.test(lowerInput)) {
      const helpResponses = [
        'I can help you with various tasks in the restaurant management system, including:\n• Creating and managing orders\n• Processing payments\n• Checking inventory levels\n• Managing tables and reservations\n• Generating reports\n\nWhat would you like to know more about?',
        'I\'m here to help with:\n• Order management (create, modify, cancel)\n• Billing and payments\n• Inventory tracking\n• Table management\n• Sales reports\n\nWhat do you need help with today?',
        'I can assist with:\n• Taking new orders\n• Processing payments and discounts\n• Checking stock levels\n• Managing table statuses\n• Viewing sales analytics\n\nHow can I help you?'
      ];
      return helpResponses[Math.floor(Math.random() * helpResponses.length)];
    }

    // Check for thank you
    if (/^(thank|thanks|appreciate|cheers|thx)[s]?[!?.]?$/i.test(lowerInput)) {
      const thanksResponses = [
        'You\'re welcome! Is there anything else I can help you with?',
        'Happy to help! Let me know if you need anything else.',
        'Anytime! What else can I assist you with today?',
        'You\'re welcome! Feel free to ask if you have more questions.'
      ];
      return thanksResponses[Math.floor(Math.random() * thanksResponses.length)];
    }

    // Check for goodbye
    if (/^(bye|goodbye|see you|take care|farewell)[!?.]?$/i.test(lowerInput)) {
      const goodbyeResponses = [
        'Goodbye! Have a great day!',
        'See you later! Feel free to come back if you need more help.',
        'Take care! Remember, I\'m here whenever you need assistance.',
        'Goodbye! Happy to help anytime.'
      ];
      return goodbyeResponses[Math.floor(Math.random() * goodbyeResponses.length)];
    }

    // Check FAQ with better matching
    const matchedFAQs = FAQ.filter(faq => {
      // Check if any keyword matches
      const keywordMatch = faq.keywords.some(keyword => 
        new RegExp(`\\b${keyword}\\b`, 'i').test(lowerInput)
      );
      
      // Check if question is similar to input
      const questionWords = faq.question.toLowerCase().split(/\s+/);
      const questionMatch = questionWords.some(word => 
        word.length > 3 && lowerInput.includes(word)
      );
      
      return keywordMatch || questionMatch;
    });

    // If we have matches, return the best one
    if (matchedFAQs.length > 0) {
      // Sort by number of matching keywords (most matches first)
      matchedFAQs.sort((a, b) => {
        const aMatches = a.keywords.filter(k => lowerInput.includes(k.toLowerCase())).length;
        const bMatches = b.keywords.filter(k => lowerInput.includes(k.toLowerCase())).length;
        return bMatches - aMatches;
      });
      return matchedFAQs[0].answer;
    }

    // Try to understand the intent
    if (/(how|what|where|when|why|can you|how to|how do|help with)/i.test(lowerInput)) {
      if (/(order|bill|payment|checkout)/i.test(lowerInput)) {
        return FAQ.find(f => f.keywords.includes('payment'))?.answer || "I can help with payments. Please go to the Billing section, select the order, and choose your payment method.";
      }
      if (/(inventory|stock|item|product)/i.test(lowerInput)) {
        return FAQ.find(f => f.keywords.includes('inventory'))?.answer || "You can check inventory levels in the Inventory section. It shows current stock levels and reorder points.";
      }
      if (/(table|reservation|seat)/i.test(lowerInput)) {
        return FAQ.find(f => f.keywords.includes('table'))?.answer || "Table management is available in the Floor Plan section. You can view table statuses and manage reservations there.";
      }
    }

    // Default response with suggestions
    const defaultResponses = [
      'I\'m not sure I understand. Could you rephrase your question? Here are some things I can help with:\n• Creating or modifying orders\n• Processing payments\n• Checking inventory\n• Managing tables\n• Viewing reports',
      'I want to help, but I didn\'t quite get that. Could you try asking in a different way? For example:\n• "How do I create a new order?"\n• "Where can I check inventory levels?"\n• "How do I process a payment?"',
      'I\'m still learning! Could you try asking your question differently? I can help with order management, payments, inventory, and more.'
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold">Restaurant Assistant</h3>
            <button 
              onClick={toggleChatbot}
              className="text-white hover:text-gray-200"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs mt-1 opacity-60">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                autoFocus
              />
              <Button type="submit" size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                <Send size={16} />
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={toggleChatbot}
          className="w-14 h-14 rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition-colors flex items-center justify-center"
          aria-label="Open chat"
        >
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
};

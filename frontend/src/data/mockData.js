export const LEARN_SKILLS = [
  { id: 1, name: 'Carpentry', category: 'Farming', duration: '7-day', earning: '₹4,000', requested: 24, color: 'bg-amber-100 text-amber-700' },
  { id: 2, name: 'Organic Farming', category: 'Farming', duration: '15-day', earning: '₹3,500', requested: 31, color: 'bg-green-100 text-green-700' },
  { id: 3, name: 'Sewing & Stitching', category: 'Home-Based', duration: '7-day', earning: '₹2,500', requested: 18, color: 'bg-pink-100 text-pink-700' },
  { id: 4, name: 'CNC Machine Basics', category: 'Technical', duration: '15-day', earning: '₹5,000', requested: 12, color: 'bg-blue-100 text-blue-700' },
  { id: 5, name: 'WhatsApp Business', category: 'Digital', duration: '3-day', earning: '₹1,800', requested: 44, color: 'bg-teal-100 text-teal-700' },
  { id: 6, name: 'AI Tools for Farming', category: 'AI', duration: '7-day', earning: '₹6,000', requested: 9, color: 'bg-violet-100 text-violet-700' },
  { id: 7, name: 'Drone Spraying', category: 'Farming', duration: '15-day', earning: '₹6,000', requested: 7, color: 'bg-sky-100 text-sky-700' },
  { id: 8, name: 'Embroidery', category: 'Home-Based', duration: '7-day', earning: '₹2,000', requested: 22, color: 'bg-rose-100 text-rose-700' },
  { id: 9, name: 'Solar Panel Repair', category: 'Technical', duration: '30-day', earning: '₹8,000', requested: 5, color: 'bg-orange-100 text-orange-700' },
  { id: 10, name: 'Digital Marketing', category: 'Digital', duration: '7-day', earning: '₹3,000', requested: 38, color: 'bg-cyan-100 text-cyan-700' },
  { id: 11, name: 'Plumbing', category: 'Technical', duration: '15-day', earning: '₹4,500', requested: 14, color: 'bg-slate-100 text-slate-700' },
  { id: 12, name: 'Basic Computer', category: 'Digital', duration: '7-day', earning: '₹2,200', requested: 29, color: 'bg-indigo-100 text-indigo-700' },
];

export const TRAINERS = [
  { id: 1, name: 'Ramesh Kumar', specialty: 'Carpentry + CNC', location: 'Sambhal, UP', rating: 4.8, trained: 142, availability: 'Available', availColor: 'bg-green-100 text-green-700', initials: 'RK', avatarColor: 'bg-green-500' },
  { id: 2, name: 'Salma Fatima', specialty: 'Sewing + Embroidery', location: 'Moradabad, UP', rating: 4.9, trained: 89, availability: 'Available', availColor: 'bg-green-100 text-green-700', initials: 'SF', avatarColor: 'bg-pink-500' },
  { id: 3, name: 'Amit Verma', specialty: 'Digital + AI Tools', location: 'Online', rating: 4.7, trained: 210, availability: 'Always Online', availColor: 'bg-blue-100 text-blue-700', initials: 'AV', avatarColor: 'bg-blue-500' },
  { id: 4, name: 'Dinesh Patel', specialty: 'Farming + Drone', location: 'Agra, UP', rating: 4.6, trained: 67, availability: 'Available next week', availColor: 'bg-yellow-100 text-yellow-700', initials: 'DP', avatarColor: 'bg-amber-500' },
  { id: 5, name: 'Meena Devi', specialty: 'Home Skills + Food', location: 'Bareilly, UP', rating: 4.8, trained: 55, availability: 'Available', availColor: 'bg-green-100 text-green-700', initials: 'MD', avatarColor: 'bg-rose-500' },
];

export const TRAINING_SLOTS = [
  { id: 1, skill: 'Carpentry', trainer: 'Ramesh Kumar', duration: '7-day', joined: 8, max: 10, startDate: '20 Jan 2025', fee: 200, status: 'Open' },
  { id: 2, skill: 'WhatsApp Business', trainer: 'Amit Verma', duration: '3-day', joined: 10, max: 10, startDate: '18 Jan 2025', fee: 200, status: 'Full' },
  { id: 3, skill: 'Organic Farming', trainer: 'Dinesh Patel', duration: '15-day', joined: 6, max: 10, startDate: '25 Jan 2025', fee: 350, status: 'Open' },
  { id: 4, skill: 'Sewing & Stitching', trainer: 'Salma Fatima', duration: '7-day', joined: 9, max: 10, startDate: '19 Jan 2025', fee: 200, status: 'Starting Soon' },
  { id: 5, skill: 'Solar Panel Repair', trainer: 'Ramesh Kumar', duration: '30-day', joined: 3, max: 10, startDate: '01 Feb 2025', fee: 500, status: 'Open' },
  { id: 6, skill: 'AI Tools for Farming', trainer: 'Amit Verma', duration: '7-day', joined: 7, max: 10, startDate: '22 Jan 2025', fee: 350, status: 'Open' },
];

export const MICRO_GROUPS = [
  { id: 1, name: 'Carpentry Group', members: 8, area: 'Sambhal area', suggestion: 'Furniture making', incomeMin: 8000, incomeMax: 15000, icon: '🪚' },
  { id: 2, name: 'Sewing Group', members: 6, area: 'Moradabad', suggestion: 'Uniform stitching', incomeMin: 5000, incomeMax: 10000, icon: '🧵' },
  { id: 3, name: 'Farming Group', members: 10, area: 'Agra', suggestion: 'Collective organic farming', incomeMin: 6000, incomeMax: 12000, icon: '🌾' },
];

export const PENDING_ORDERS = [
  { id: 1, product: 'Wooden Chairs (Set of 6)', quantity: '50 sets', buyer: 'Delhi NCR', advance: '₹15,000', deadline: '30 Jan 2025' },
  { id: 2, product: 'School Uniforms', quantity: '200 pieces', buyer: 'Lucknow', advance: '₹8,000', deadline: '15 Feb 2025' },
  { id: 3, product: 'Organic Vegetables Box', quantity: '100 boxes/week', buyer: 'Noida', advance: '₹5,000', deadline: 'Ongoing' },
];

export const AI_TOPICS = [
  { id: 1, title: 'What is AI?', titleHi: 'AI क्या है?', desc: 'Artificial Intelligence means computers doing human-like thinking and learning tasks.', icon: '🤖' },
  { id: 2, title: 'AI in Farming', titleHi: 'खेती में AI', desc: 'Drones and sensors help monitor crops, predict weather, and reduce pesticide use.', icon: '🌾' },
  { id: 3, title: 'AI in Business', titleHi: 'व्यापार में AI', desc: 'Tools like ChatGPT help small shops write ads, manage customers, and track orders.', icon: '🏪' },
  { id: 4, title: 'AI for Women', titleHi: 'महिलाओं के लिए AI', desc: 'Design tools and pattern generators help women create unique embroidery and clothing.', icon: '👩' },
  { id: 5, title: 'AI Safety', titleHi: 'AI सुरक्षा', desc: 'Learn what to trust and what to verify — AI can be wrong or misused.', icon: '🛡️' },
  { id: 6, title: 'Future of AI', titleHi: 'AI का भविष्य', desc: 'AI will create new jobs in rural areas: drone operators, data entry, digital trainers.', icon: '🚀' },
];

export const SAFETY_TIPS = [
  { id: 1, title: 'Fraud Detection', titleHi: 'धोखाधड़ी पहचानें', color: 'bg-red-50 border-red-200', iconColor: 'text-red-500', tips: ['Never pay money to "get a job"', 'Verify caller identity before sharing info', 'If offer sounds too good, it is likely fake'] },
  { id: 2, title: 'Safe OTP Use', titleHi: 'OTP सुरक्षा', color: 'bg-orange-50 border-orange-200', iconColor: 'text-orange-500', tips: ['Never share OTP with anyone — even bank staff', 'OTP expires in 30 seconds — enter immediately', 'Bank will never call to ask for OTP'] },
  { id: 3, title: 'Fake Links', titleHi: 'नकली लिंक', color: 'bg-yellow-50 border-yellow-200', iconColor: 'text-yellow-600', tips: ['Check URL carefully before clicking', 'Govt websites end in .gov.in', 'Do not click links received in SMS from unknowns'] },
  { id: 4, title: 'Bank Safety', titleHi: 'बैंक सुरक्षा', color: 'bg-green-50 border-green-200', iconColor: 'text-green-600', tips: ['Change your PIN every 3 months', 'Always cover keypad when entering PIN', 'Check mini-statement regularly'] },
  { id: 5, title: 'Personal Data', titleHi: 'निजी डेटा', color: 'bg-blue-50 border-blue-200', iconColor: 'text-blue-600', tips: ['Do not share Aadhaar photos on WhatsApp', 'Set strong password — mix numbers + letters', 'Use fingerprint lock on your phone'] },
];

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli',
  'Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh',
  'Lakshadweep', 'Puducherry',
];

export const SKILL_CATEGORIES = ['Farming', 'Carpentry', 'Sewing', 'Digital', 'Business', 'AI', 'Safety', 'Other'];

export const MOCK_JOB_SEEKERS = [
  { id: 1, name: 'Rajesh Yadav', skill: 'Carpentry', location: 'Sambhal, UP', experience: '3 years', rating: 4.5, initials: 'RY', color: 'bg-amber-500' },
  { id: 2, name: 'Priya Sharma', skill: 'Sewing & Stitching', location: 'Moradabad, UP', experience: '2 years', rating: 4.8, initials: 'PS', color: 'bg-pink-500' },
  { id: 3, name: 'Suresh Babu', skill: 'Organic Farming', location: 'Agra, UP', experience: '5 years', rating: 4.6, initials: 'SB', color: 'bg-green-500' },
  { id: 4, name: 'Kavita Singh', skill: 'Digital Marketing', location: 'Online', experience: '1 year', rating: 4.3, initials: 'KS', color: 'bg-blue-500' },
];

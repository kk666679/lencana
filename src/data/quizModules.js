export const quizModules = [
  {
    id: 'badge-exploration',
    title: 'Badge Exploration Mastery',
    description: 'Test your understanding of the badge system and exploration features',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'How many unique badges are available in the Lencana Malaysia platform?',
        options: ['4 badges', '6 badges', '8 badges', '10 badges'],
        correct: 1,
        explanation: 'The platform features 6 unique badges: Knowledge Seeker, Collaborator, Innovator, Community Leader, Mentor, and Achiever.'
      },
      {
        id: 2,
        type: 'true-false',
        question: 'All badges in the platform have the same point value.',
        correct: false,
        explanation: 'Badges have different point values based on their rarity: Common (100-150 points), Rare (200-250 points), Epic (300 points), and Legendary (500 points).'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'Which badge represents the highest level of national service?',
        options: ['Collaborator', 'Datuk Seri Maharaja Lela', 'Innovator', 'Mentor'],
        correct: 1,
        explanation: 'Datuk Seri Maharaja Lela represents the pinnacle of national service and is classified as a Legendary badge worth 500 Merdeka Points.'
      },
      {
        id: 4,
        type: 'scenario',
        question: 'A student wants to earn the Community Leader badge. What type of activities should they focus on?',
        options: ['Individual academic achievements', 'Leading community service projects', 'Completing online quizzes', 'Reading textbooks'],
        correct: 1,
        explanation: 'The Community Leader badge requires leading community service projects, mentoring peers, organizing events, and demonstrating consistent leadership qualities.'
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'What is the currency system used in the platform?',
        options: ['Learning Points', 'Merdeka Points', 'Achievement Coins', 'Badge Tokens'],
        correct: 1,
        explanation: 'Merdeka Points are the gamified point system used throughout the platform, earned through badge completion, quizzes, and various learning activities.'
      }
    ]
  },
  {
    id: 'filtering-mastery',
    title: 'Smart Filtering System',
    description: 'Master the art of finding badges using our advanced filtering system',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'Which filtering options are available in the badge explorer?',
        options: ['Name search only', 'Category and rarity only', 'Name search, category, and rarity', 'Date and difficulty only'],
        correct: 2,
        explanation: 'The smart filtering system allows users to search by name, filter by category (National Identity, Teamwork, Innovation, etc.), and filter by rarity level.'
      },
      {
        id: 2,
        type: 'true-false',
        question: 'You can search for badges by typing keywords in their descriptions.',
        correct: true,
        explanation: 'The search function looks through both badge names and descriptions to help users find relevant badges based on keywords.'
      },
      {
        id: 3,
        type: 'scenario',
        question: 'A teacher wants to find all badges related to teamwork. What should they do?',
        options: ['Search for "team" in the search box', 'Filter by "Teamwork" category', 'Both search and filter options work', 'Contact support'],
        correct: 2,
        explanation: 'Teachers can either search for "team" keywords or use the category filter to select "Teamwork" - both methods will help find collaboration-related badges.'
      },
      {
        id: 4,
        type: 'multiple-choice',
        question: 'What happens when you click "Clear filters"?',
        options: ['Deletes all badges', 'Resets to show all badges', 'Logs you out', 'Opens help menu'],
        correct: 1,
        explanation: 'The "Clear filters" button resets all filter selections (search, category, rarity) to show all available badges in the platform.'
      },
      {
        id: 5,
        type: 'true-false',
        question: 'The filter summary shows how many badges match your current filters.',
        correct: true,
        explanation: 'The filter summary displays "Showing X badges" to help users understand how many badges match their current search and filter criteria.'
      }
    ]
  },
  {
    id: 'impact-understanding',
    title: 'Educational Impact & Malaysian Values',
    description: 'Understand how the platform aligns with Malaysian educational values and curriculum',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'Which Malaysian curriculum standards does the platform align with?',
        options: ['KSSR only', 'KSSM only', 'Both KSSR and KSSM', 'International standards only'],
        correct: 2,
        explanation: 'Lencana Malaysia is fully aligned with both KSSR (primary) and KSSM (secondary) curriculum standards, covering 14 subjects across education levels.'
      },
      {
        id: 2,
        type: 'multiple-choice',
        question: 'What are the three core Malaysian educational values emphasized by the platform?',
        options: ['Reading, Writing, Arithmetic', 'Collaboration, Innovation, Lifelong Learning', 'Science, Technology, Math', 'History, Geography, Civics'],
        correct: 1,
        explanation: 'The platform emphasizes Collaboration (teamwork and peer learning), Innovation (creative problem-solving), and Lifelong Learning (continuous educational growth).'
      },
      {
        id: 3,
        type: 'true-false',
        question: 'The platform covers all 14 subjects in the Malaysian curriculum.',
        correct: true,
        explanation: 'The cross-curricular approach integrates all 14 subjects including Bahasa Malaysia, English, History, Civic Education, Science, Mathematics, ICT, and more.'
      },
      {
        id: 4,
        type: 'scenario',
        question: 'How does the platform promote Rukun Negara principles?',
        options: ['Through memorization exercises', 'Via cross-curricular projects on national identity', 'Only in history lessons', 'Through competitive gaming'],
        correct: 1,
        explanation: 'The platform integrates Rukun Negara principles through cross-curricular projects, national identity badges, and values-based learning activities across subjects.'
      },
      {
        id: 5,
        type: 'short-answer',
        question: 'Name two ways the platform modernizes heritage education.',
        sampleAnswer: '3D interactive badge visualization and gamified learning experiences',
        explanation: 'The platform modernizes heritage education through 3D GLB badge models for immersive visualization and gamification elements like points, levels, and achievements to engage students.'
      },
      {
        id: 6,
        type: 'multiple-choice',
        question: 'What is the primary goal of the cross-curricular approach?',
        options: ['Reduce teaching time', 'Foster connections between subjects', 'Eliminate traditional subjects', 'Focus only on technology'],
        correct: 1,
        explanation: 'The cross-curricular approach aims to foster connections between History, Languages, Science, and Moral Education, showing students how knowledge areas interconnect.'
      }
    ]
  },
  {
    id: 'platform-navigation',
    title: 'Platform Navigation & Features',
    description: 'Master the navigation and key features of the Lencana Malaysia platform',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What information is displayed in the level progress section?',
        options: ['Only current level', 'Current level and title only', 'Level, title, and XP progress', 'Just XP points'],
        correct: 2,
        explanation: 'The level progress section shows your current level number, level title (Rookie to History Scholar), and XP progress toward the next level.'
      },
      {
        id: 2,
        type: 'true-false',
        question: 'Students progress from "Rookie" to "History Scholar" through the level system.',
        correct: true,
        explanation: 'The level progression goes: Rookie → Badge Collector → Cultural Explorer → Heritage Expert → History Scholar, based on XP earned through activities.'
      },
      {
        id: 3,
        type: 'scenario',
        question: 'A student has earned 750 XP. What level are they likely to be?',
        options: ['Level 1 (Rookie)', 'Level 2 (Badge Collector)', 'Level 3 (Cultural Explorer)', 'Cannot determine'],
        correct: 1,
        explanation: 'Students level up every 500 XP, so 750 XP would put them at Level 2 (Badge Collector) with 250 XP toward Level 3.'
      },
      {
        id: 4,
        type: 'multiple-choice',
        question: 'What happens when you click on a badge card?',
        options: ['Automatically earns the badge', 'Opens detailed modal with earning criteria', 'Starts a quiz immediately', 'Downloads the badge image'],
        correct: 1,
        explanation: 'Clicking a badge card opens a detailed modal showing comprehensive information, earning criteria, curriculum alignment, and the option to take a quiz.'
      },
      {
        id: 5,
        type: 'true-false',
        question: 'The statistics dashboard shows both earned and available badges.',
        correct: true,
        explanation: 'The comprehensive statistics dashboard displays badges earned, total Merdeka Points, completion percentage, quizzes completed, and total available badges.'
      }
    ]
  }
];

export const getQuizModule = (moduleId) => {
  return quizModules.find(module => module.id === moduleId);
};

export const getAllQuizModules = () => {
  return quizModules;
};
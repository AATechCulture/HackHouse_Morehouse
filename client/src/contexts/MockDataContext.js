// MockDataContext.js

import React, { createContext, useContext, useState } from 'react';

const MockDataContext = createContext();

// sample user credentials
export const sampleLogins = {
  corporate: [
    { email: 'tech@example.com', name: 'Tech Innovators Inc.', id: 1 },
    { email: 'green@example.com', name: 'Green Energy Solutions', id: 2 },
    { email: 'health@example.com', name: 'HealthCare Plus', id: 3 }
  ],
  nonprofit: [
    { email: 'education@example.com', name: 'Education First', id: 1 },
    { email: 'green@nonprofit.com', name: 'Green Earth Initiative', id: 2 },
    { email: 'tech4all@example.com', name: 'Tech4All', id: 3 },
    { email: 'health@nonprofit.com', name: 'Community Health Network', id: 4 }
  ],
  individual: [
    { 
      email: 'john@example.com', 
      name: 'John Smith', 
      id: 1,
      volunteerEvents: [1, 3]
    },
    { 
      email: 'sarah@example.com', 
      name: 'Sarah Johnson', 
      id: 2,
      volunteerEvents: [2, 4]
    }
  ]
};

export const mockCompanies = [
  {
    id: 1,
    name: "Tech Innovators Inc.",
    email: "tech@example.com",
    type: "corporate",
    industry: "Technology",
    description: "Leading technology company focused on digital innovation and sustainability",
    focusAreas: ["Education", "Digital Inclusion", "Environmental Sustainability"],
    location: "San Francisco, CA",
    employeeCount: 5000,
    contributionHistory: [
      { amount: 500000, year: 2023, cause: "Education" },
      { amount: 300000, year: 2023, cause: "Environment" }
    ]
  },
  {
    id: 2,
    name: "Green Energy Solutions",
    type: "corporate",
    industry: "Energy",
    description: "Renewable energy company committed to environmental sustainability",
    focusAreas: ["Climate Action", "Community Development", "Clean Energy"],
    location: "Austin, TX",
    employeeCount: 2000,
    contributionHistory: [
      { amount: 250000, year: 2023, cause: "Climate Action" },
      { amount: 150000, year: 2023, cause: "Community" }
    ]
  },
  {
    id: 3,
    name: "HealthCare Plus",
    type: "corporate",
    industry: "Healthcare",
    description: "Healthcare provider focused on community health and wellness",
    focusAreas: ["Healthcare", "Community Wellness", "Youth Development"],
    location: "Boston, MA",
    employeeCount: 3500,
    contributionHistory: [
      { amount: 400000, year: 2023, cause: "Healthcare" },
      { amount: 200000, year: 2023, cause: "Youth" }
    ]
  }
];

export const mockNonprofits = [
  {
    id: 1,
    name: "Education First",
    email: "education@example.com",
    type: "nonprofit",
    mission: "Providing quality education to underprivileged communities",
    focusAreas: ["Education", "Youth Development", "Digital Literacy"],
    location: "National",
    impact: {
      peopleHelped: 10000,
      programsLaunched: 15,
      communitiesServed: 25
    }
  },
  {
    id: 2,
    name: "Green Earth Initiative",
    type: "nonprofit",
    mission: "Promoting environmental sustainability and climate action",
    focusAreas: ["Environmental", "Climate Action", "Community Development"],
    location: "Global",
    impact: {
      treesPlanted: 50000,
      emissionsReduced: "500 tons",
      communitiesServed: 30
    }
  },
  {
    id: 3,
    name: "Tech4All",
    type: "nonprofit",
    mission: "Bridging the digital divide through technology education",
    focusAreas: ["Digital Inclusion", "Education", "Workforce Development"],
    location: "Multiple Cities",
    impact: {
      peopleTrained: 5000,
      coursesOffered: 20,
      jobPlacements: 1000
    }
  },
  {
    id: 4,
    name: "Community Health Network",
    type: "nonprofit",
    mission: "Providing healthcare access to underserved communities",
    focusAreas: ["Healthcare", "Community Wellness", "Medical Education"],
    location: "Regional",
    impact: {
      patientsServed: 15000,
      clinicsSupported: 10,
      healthWorkersTrained: 500
    }
  }
];

export const mockEvents = [
  {
    id: 1,
    nonprofitId: 1,
    nonprofitName: "Education First",
    title: "Back to School Drive 2024",
    description: "Annual school supply drive for underprivileged students",
    tags: ["Education", "Youth", "Community"],
    donationGoal: 50000,
    currentDonations: 35000,
    eventDate: "2024-08-15",
    location: "Multiple Cities",
    volunteers: [],
    useOfFunds: [
      { category: "School Supplies", percentage: 60 },
      { category: "Distribution", percentage: 25 },
      { category: "Administration", percentage: 15 }
    ],
    topDonors: [
      { name: "Tech Innovators Inc.", amount: 20000 },
      { name: "Anonymous", amount: 10000 },
      { name: "Community Bank", amount: 5000 }
    ]
  },
  {
    id: 2,
    nonprofitId: 2,
    nonprofitName: "Green Earth Initiative",
    title: "Climate Action Summit 2024",
    description: "Annual conference bringing together environmental leaders and activists",
    tags: ["Environmental", "Climate Action", "Education"],
    donationGoal: 75000,
    currentDonations: 45000,
    eventDate: "2024-09-20",
    location: "Virtual",
    volunteers: [],
    useOfFunds: [
      { category: "Platform and Technology", percentage: 40 },
      { category: "Speakers and Content", percentage: 35 },
      { category: "Marketing", percentage: 25 }
    ],
    topDonors: [
      { name: "Green Energy Solutions", amount: 25000 },
      { name: "Tech Innovators Inc.", amount: 15000 }
    ]
  },
  {
    id: 3,
    nonprofitId: 3,
    nonprofitName: "Tech4All",
    title: "Digital Skills Bootcamp",
    description: "Intensive 12-week program teaching essential digital skills",
    tags: ["Education", "Technology", "Workforce Development"],
    donationGoal: 100000,
    currentDonations: 65000,
    eventDate: "2024-07-01",
    location: "Multiple Cities",
    volunteers: [],
    useOfFunds: [
      { category: "Equipment and Software", percentage: 45 },
      { category: "Instructors", percentage: 35 },
      { category: "Materials", percentage: 20 }
    ],
    topDonors: [
      { name: "Tech Innovators Inc.", amount: 30000 },
      { name: "HealthCare Plus", amount: 20000 }
    ]
  },
  {
    id: 4,
    nonprofitId: 4,
    nonprofitName: "Community Health Network",
    title: "Mobile Health Clinic Initiative",
    description: "Bringing healthcare services to underserved communities",
    tags: ["Healthcare", "Community", "Medical Services"],
    donationGoal: 150000,
    currentDonations: 85000,
    eventDate: "2024-10-01",
    location: "Regional",
    volunteers: [],
    useOfFunds: [
      { category: "Medical Equipment", percentage: 50 },
      { category: "Staff", percentage: 30 },
      { category: "Transportation", percentage: 20 }
    ],
    topDonors: [
      { name: "HealthCare Plus", amount: 50000 },
      { name: "Green Energy Solutions", amount: 25000 }
    ]
  }
];

const initialChats = {
  messages: [],
  chatRooms: {}
};

export function MockDataProvider({ children }) {
  const [companies] = useState(mockCompanies);
  const [nonprofits] = useState(mockNonprofits);
  const [events, setEvents] = useState(mockEvents);
  const [chats, setChats] = useState(initialChats);

  const addMessage = (fromId, toId, content) => {
    const roomId = [fromId, toId].sort().join('-');
    const message = {
      id: Date.now(),
      fromId,
      toId,
      content,
      timestamp: new Date().toISOString(),
    };

    setChats(prevChats => ({
      ...prevChats,
      chatRooms: {
        ...prevChats.chatRooms,
        [roomId]: [...(prevChats.chatRooms[roomId] || []), message],
      },
    }));
  };


  const addVolunteer = (eventId, user) => {
    setEvents(prevEvents => prevEvents.map(event => {
      if (event.id === eventId) {
        if (event.volunteers?.some(v => v.userId === user.id)) {
          return event;
        }

        const updatedEvent = {
          ...event,
          volunteers: [
            ...(event.volunteers || []),
            {
              userId: user.id,
              name: user.name,
              signupDate: new Date().toISOString()
            }
          ]
        };
        return updatedEvent;
      }
      return event;
    }));
  };

  const removeVolunteer = (eventId, userId) => {
    setEvents(prevEvents => prevEvents.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          volunteers: event.volunteers?.filter(v => v.userId !== userId) || []
        };
      }
      return event;
    }));
  };

  return (
    <MockDataContext.Provider value={{ 
      companies, 
      nonprofits, 
      events, 
      chats,
      addVolunteer,
      removeVolunteer,
      addMessage
    }}>
      {children}
    </MockDataContext.Provider>
  );
}

export const useMockData = () => {
  const { companies, nonprofits, events, chats, addVolunteer, removeVolunteer, addMessage } = useContext(MockDataContext);
  return { companies, nonprofits, events, chats, addVolunteer, removeVolunteer, addMessage };
};
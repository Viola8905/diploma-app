import img from "../src/assets/img.jpeg";
export const userMock = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  password: "password123",
};

export const data = {logo: { src: img, alt: "site logo" }};

export const eventMock = {
  id: 101,
  title: "Tech Conference 2024",
  description:
    "Annual tech conference focusing on software development trends and innovations.",
  startDate: "2024-05-15T09:00:00Z",
  endDate: "2024-05-17T18:00:00Z",
  creator: userMock, // Referencing the User mock object
  QRByVisitor: false,
  ScannerByVistior: true,
  ParticipantsToVisit: [
    {
      user: {
        ...userMock,
      },
      joined: true,
      joinedTime: "2024-05-15T09:15:00Z",
    },
    {
      user: {
        ...userMock,
      },
      joined: false,
      joinedTime: "",
    },
  ],
  FreeVisitors: [
    {
      user: {
        ...userMock,
        id: 3,
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@example.com",
        password: "password789",
      },
      joined: false,
      joinedTime: null,
    },
  ],
};

export const eventsMock = [
    // In Progress Event
    {
      id: 201,
      title: "Global Tech Symposium",
      description: "A gathering of the brightest minds in technology to discuss future innovations.",
      startDate: "2024-04-01T09:00:00Z",
      endDate: "2024-04-05T18:00:00Z",
      creator: userMock,
      QRByVisitor: true,
      ScanByVisitor: true,
      ParticipantsToVisit: [],
      FreeVisitors: []
    },
    // Upcoming Event
    {
      id: 202,
      title: "Future of AI Conference",
      description: "An in-depth look into the future trends and technologies in artificial intelligence.",
      startDate: "2024-06-15T09:00:00Z",
      endDate: "2024-06-17T18:00:00Z",
      creator: userMock,
      QRByVisitor: false,
      ScanByVisitor: true,
      ParticipantsToVisit: [],
      FreeVisitors: []
    },
    // Finished Event
    {
      id: 203,
      title: "Annual Developers Meetup",
      description: "A yearly event where developers from various backgrounds share knowledge and experiences.",
      startDate: "2024-03-20T09:00:00Z",
      endDate: "2024-03-22T18:00:00Z",
      creator: userMock,
      QRByVisitor: false,
      ScanByVisitor: false,
      ParticipantsToVisit: [],
      FreeVisitors: []
    }
  ];
  

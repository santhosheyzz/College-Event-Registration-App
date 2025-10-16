export interface Event {
  id: string;
  title: string;
  type: 'technical' | 'cultural' | 'sports';
  date: string;
  time: string;
  venue: string;
  description: string;
  image: string;
  totalSeats: number;
  seatsLeft: number;
  status: 'open' | 'closed' | 'upcoming';
  departments: string[];
}

export const departments = [
  'Computer Science',
  'Electronics',
  'Mechanical',
  'Civil',
  'Electrical',
  'Information Technology'
];

export const events: Event[] = [
  {
    id: 'tech-1',
    title: 'HackFest 2025',
    type: 'technical',
    date: '2025-10-20',
    time: '09:00 AM',
    venue: 'Computer Lab A',
    description: '24-hour coding marathon. Build innovative solutions and compete for prizes.',
    image: 'https://d64gsuwffb70l.cloudfront.net/68f0c298a081e76a1f05f8b6_1760609049086_55cf03e5.webp',
    totalSeats: 100,
    seatsLeft: 23,
    status: 'open',
    departments: ['Computer Science', 'Information Technology']
  },
  {
    id: 'tech-2',
    title: 'RoboWars Championship',
    type: 'technical',
    date: '2025-10-22',
    time: '10:00 AM',
    venue: 'Main Arena',
    description: 'Battle of the bots! Design and compete with your custom-built robots.',
    image: 'https://d64gsuwffb70l.cloudfront.net/68f0c298a081e76a1f05f8b6_1760609049848_80f3fc5a.webp',
    totalSeats: 80,
    seatsLeft: 8,
    status: 'open',
    departments: ['Mechanical', 'Electronics', 'Electrical']
  },
  {
    id: 'tech-3',
    title: 'Web Dev Workshop',
    type: 'technical',
    date: '2025-10-25',
    time: '02:00 PM',
    venue: 'Seminar Hall 2',
    description: 'Learn modern web development with React, Node.js, and cloud deployment.',
    image: 'https://d64gsuwffb70l.cloudfront.net/68f0c298a081e76a1f05f8b6_1760609050624_1c6551fe.webp',
    totalSeats: 120,
    seatsLeft: 45,
    status: 'open',
    departments: ['Computer Science', 'Information Technology']
  },
  {
    id: 'tech-4',
    title: 'AI & ML Summit',
    type: 'technical',
    date: '2025-11-05',
    time: '11:00 AM',
    venue: 'Auditorium',
    description: 'Explore the future of artificial intelligence and machine learning applications.',
    image: 'https://d64gsuwffb70l.cloudfront.net/68f0c298a081e76a1f05f8b6_1760609051654_6938c9ef.webp',
    totalSeats: 200,
    seatsLeft: 200,
    status: 'upcoming',
    departments: ['Computer Science', 'Electronics', 'Information Technology']
  },
  {
    id: 'cult-1',
    title: 'Natyanjali Dance Fest',
    type: 'cultural',
    date: '2025-10-21',
    time: '06:00 PM',
    venue: 'Open Air Theatre',
    description: 'Celebrate Indian classical and folk dance traditions with mesmerizing performances.',
    image: 'https://d64gsuwffb70l.cloudfront.net/68f0c298a081e76a1f05f8b6_1760609059913_16109920.webp',
    totalSeats: 150,
    seatsLeft: 67,
    status: 'open',
    departments: ['All Departments']
  },
  {
    id: 'cult-2',
    title: 'Battle of Bands',
    type: 'cultural',
    date: '2025-10-23',
    time: '07:00 PM',
    venue: 'Main Stage',
    description: 'Rock the campus! College bands compete for the ultimate music championship.',
    image: 'https://d64gsuwffb70l.cloudfront.net/68f0c298a081e76a1f05f8b6_1760609060751_d6d82280.webp',
    totalSeats: 300,
    seatsLeft: 89,
    status: 'open',
    departments: ['All Departments']
  },
  {
    id: 'cult-3',
    title: 'Drama Nights',
    type: 'cultural',
    date: '2025-10-26',
    time: '05:30 PM',
    venue: 'College Theater',
    description: 'Experience powerful storytelling through theatrical performances by student actors.',
    image: 'https://d64gsuwffb70l.cloudfront.net/68f0c298a081e76a1f05f8b6_1760609061520_47688111.webp',
    totalSeats: 100,
    seatsLeft: 0,
    status: 'closed',
    departments: ['All Departments']
  },
  {
    id: 'cult-4',
    title: 'Art Expo 2025',
    type: 'cultural',
    date: '2025-11-02',
    time: '10:00 AM',
    venue: 'Art Gallery',
    description: 'Showcase of student artwork including paintings, sculptures, and digital art.',
    image: 'https://d64gsuwffb70l.cloudfront.net/68f0c298a081e76a1f05f8b6_1760609062274_0aea5853.webp',
    totalSeats: 80,
    seatsLeft: 80,
    status: 'upcoming',
    departments: ['All Departments']
  },
  {
    id: 'sport-1',
    title: 'Inter-Dept Cricket',
    type: 'sports',
    date: '2025-10-19',
    time: '08:00 AM',
    venue: 'Cricket Ground',
    description: 'Department teams clash in an exciting cricket tournament. May the best team win!',
    image: 'https://d64gsuwffb70l.cloudfront.net/68f0c298a081e76a1f05f8b6_1760609072025_fe9fae4d.webp',
    totalSeats: 60,
    seatsLeft: 12,
    status: 'open',
    departments: ['All Departments']
  },
  {
    id: 'sport-2',
    title: 'Basketball League',
    type: 'sports',
    date: '2025-10-24',
    time: '04:00 PM',
    venue: 'Indoor Court',
    description: 'Fast-paced basketball action. Register your team and compete for glory.',
    image: 'https://d64gsuwffb70l.cloudfront.net/68f0c298a081e76a1f05f8b6_1760609072802_d9a5f2d7.webp',
    totalSeats: 50,
    seatsLeft: 18,
    status: 'open',
    departments: ['All Departments']
  },
  {
    id: 'sport-3',
    title: 'Athletics Meet',
    type: 'sports',
    date: '2025-10-27',
    time: '07:00 AM',
    venue: 'Sports Complex',
    description: 'Track and field events including sprints, relays, long jump, and more.',
    image: 'https://d64gsuwffb70l.cloudfront.net/68f0c298a081e76a1f05f8b6_1760609073559_5cf3c3e4.webp',
    totalSeats: 100,
    seatsLeft: 34,
    status: 'open',
    departments: ['All Departments']
  },
  {
    id: 'sport-4',
    title: 'Football Championship',
    type: 'sports',
    date: '2025-11-08',
    time: '03:00 PM',
    venue: 'Football Field',
    description: 'The ultimate showdown on the field. Register your squad for intense matches.',
    image: 'https://d64gsuwffb70l.cloudfront.net/68f0c298a081e76a1f05f8b6_1760609074326_3787e1bd.webp',
    totalSeats: 70,
    seatsLeft: 70,
    status: 'upcoming',
    departments: ['All Departments']
  }
];

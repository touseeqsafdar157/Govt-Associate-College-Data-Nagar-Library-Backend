export type UserRole = 'student' | 'teacher' | 'librarian' | 'admin';

export interface Almari {
  id: string;
  almariCode: string;
  name: string;
  department: string;
  locationDesc: string;
  shelves: string[];
}

export interface Book {
  id: string;
  accessionNo: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  department: string;
  almariNo: string;
  shelfNo: string;
  publisher: string;
  edition: string;
  year: number;
  totalCopies: number;
  availableCopies: number;
  language: 'English' | 'Urdu' | 'Arabic' | 'Other';
  condition: 'Brand New' | 'Good' | 'Fair' | 'Under Repair';
  isReferenceOnly: boolean;
  coverUrl: string;
  description: string;
  priceRs: number;
  callNumber: string;
}

export interface Member {
  id: string;
  rollNo: string;
  name: string;
  fatherName?: string;
  role: 'student' | 'teacher';
  email: string;
  phone: string;
  classGrade: string;
  section: string;
  shift: 'Morning' | 'Evening';
  department: string;
  status: 'Active' | 'Blocked' | 'Graduated';
  issuedBooksCount: number;
  maxAllowedBooks: number;
  joinedDate: string;
  libraryCardNo: string;
}

export interface BorrowTransaction {
  id: string;
  transactionNo: string;
  bookId: string;
  bookTitle: string;
  bookAccessionNo: string;
  almariLocation: string;
  memberId: string;
  memberRollNo: string;
  memberName: string;
  memberClass: string;
  memberSection: string;
  memberRole: 'student' | 'teacher';
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'Active' | 'Returned' | 'Overdue';
  fineAmount: number;
  fineStatus: 'None' | 'Pending' | 'Paid' | 'Waived';
  issuedByStaff: string;
  renewCount: number;
}

export interface ReadingRoomSeat {
  id: number;
  seatNumber: string;
  zone: 'Window Side' | 'Quiet Study Zone' | 'Discussion Corner' | 'Digital Research';
  status: 'Available' | 'Occupied' | 'Reserved';
  currentOccupantRollNo?: string;
  currentOccupantName?: string;
  bookedUntil?: string;
}

export interface DigitalResource {
  id: string;
  title: string;
  type: 'Past Paper' | 'E-Book' | 'Lecture Notes' | 'Syllabus' | 'Model Paper';
  subject: string;
  classGrade: string;
  boardOrUniversity: string;
  year: string;
  pages: number;
  fileSizeMb: number;
  downloadUrl: string;
  viewsCount: number;
}

export interface LibraryAnnouncement {
  id: string;
  title: string;
  date: string;
  category: 'Notice' | 'Timing' | 'New Arrivals' | 'Exam Preparation' | 'Holiday';
  content: string;
  isUrgent: boolean;
}

export interface BookSuggestion {
  id: string;
  title: string;
  author: string;
  suggestedByRollNo: string;
  suggestedByName: string;
  studentClass: string;
  department: string;
  reason: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Procured' | 'Rejected';
}

export interface Feedback {
  id: string;
  name: string;
  rollNo?: string;
  userType: string;
  rating: number;
  category: string;
  message: string;
  createdAt: string;
}

export interface UserAccount {
  id: string;
  username: string;
  passwordHash: string;
  name: string;
  role: UserRole;
  email: string;
}

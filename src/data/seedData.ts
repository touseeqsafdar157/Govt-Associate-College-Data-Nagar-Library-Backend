import { Book, Member, BorrowTransaction, ReadingRoomSeat, DigitalResource, LibraryAnnouncement, BookSuggestion, Almari, UserAccount } from '../types';

export const INITIAL_USERS: UserAccount[] = [
  {
    id: 'user-admin',
    username: 'admin2025',
    passwordHash: 'admin@punjab',
    name: 'Prof. Dr. Tariq Bashir (Principal)',
    role: 'admin',
    email: 'principal@gacdn.edu.pk'
  },
  {
    id: 'user-librarian',
    username: 'lib2025',
    passwordHash: 'library@123',
    name: 'Rashid Mahmood (Chief Librarian)',
    role: 'librarian',
    email: 'library@gacdn.edu.pk'
  },
  {
    id: 'user-teacher',
    username: 'FAC-CS-04',
    passwordHash: 'teacher123',
    name: 'Prof. Naveed Asghar',
    role: 'teacher',
    email: 'naveed.asghar@gacdn.edu.pk'
  },
  {
    id: 'user-student',
    username: '2024-ICS-042',
    passwordHash: 'student123',
    name: 'Muhammad Ahmad Khan',
    role: 'student',
    email: 'ahmad.ics042@gacdn.edu.pk'
  }
];

export const INITIAL_BOOKS: Book[] = [
  {
    id: 'b-1',
    accessionNo: 'ACC-04101',
    title: 'Introduction to Algorithms (CLRS)',
    author: 'Thomas H. Cormen, Charles E. Leiserson',
    isbn: '978-0262033848',
    category: 'Computer Science',
    department: 'Computer Science',
    almariNo: 'Almari #04 (CS & IT Cabinet)',
    shelfNo: 'Shelf 2 (Middle Rack)',
    publisher: 'MIT Press',
    edition: '3rd Edition',
    year: 2021,
    totalCopies: 5,
    availableCopies: 2,
    language: 'English',
    condition: 'Good',
    isReferenceOnly: false,
    coverUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60',
    description: 'The standard comprehensive textbook on computer algorithms, data structures, dynamic programming, and complexity theory used across universities and colleges.',
    priceRs: 3200,
    callNumber: '005.13 COR'
  },
  {
    id: 'b-2',
    accessionNo: 'ACC-04102',
    title: 'Computer Science for Class 11 (ICS Part-I Punjab Board)',
    author: 'Prof. Waqar Ahmad & Tariq Mehmood',
    isbn: '978-9694123456',
    category: 'Computer Science',
    department: 'Computer Science',
    almariNo: 'Almari #04 (CS & IT Cabinet)',
    shelfNo: 'Shelf 1 (Top Rack - Inter Section)',
    publisher: 'Punjab Curriculum and Textbook Board (PCTB)',
    edition: 'Revised 2023',
    year: 2023,
    totalCopies: 18,
    availableCopies: 6,
    language: 'English',
    condition: 'Brand New',
    isReferenceOnly: false,
    coverUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?w=500&auto=format&fit=crop&q=60',
    description: 'Official syllabus book for Intermediate Part 1 (ICS) covering Basics of Information Technology, Hardware, Software, MS Word, and MS Excel.',
    priceRs: 450,
    callNumber: '004 WAQ'
  },
  {
    id: 'b-3',
    accessionNo: 'ACC-02105',
    title: 'Kulliyat-e-Iqbal (کلیاتِ اقبال - اردو)',
    author: 'Allama Muhammad Iqbal (علامہ اقبال)',
    isbn: '978-9693501234',
    category: 'Urdu Literature',
    department: 'Urdu',
    almariNo: 'Almari #02 (Urdu Adab & Iqbaliat)',
    shelfNo: 'Shelf 3 (Golden Section)',
    publisher: 'Iqbal Academy Pakistan',
    edition: 'Standard Collector Edition',
    year: 2020,
    totalCopies: 8,
    availableCopies: 5,
    language: 'Urdu',
    condition: 'Good',
    isReferenceOnly: false,
    coverUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&auto=format&fit=crop&q=60',
    description: 'مکمل مجموعہ کلام: بانگ درا، بال جبریل، ضرب کلیم اور ارمغان حجاز۔ اردو اور کالج طلبہ کے لیے لازمی نصابی و ادبی خزانہ۔',
    priceRs: 1800,
    callNumber: '891.439 IQB'
  },
  {
    id: 'b-4',
    accessionNo: 'ACC-07101',
    title: 'Calculus and Analytic Geometry (FSc Part 2)',
    author: 'Prof. Muhammad Amin & Ch. Asghar Ali',
    isbn: '978-9694129988',
    category: 'Mathematics',
    department: 'Mathematics',
    almariNo: 'Almari #07 (Mathematics & Calculus)',
    shelfNo: 'Shelf 2 (Inter 2nd Year Row)',
    publisher: 'Ilmi Kitab Khana Lahore',
    edition: '14th Edition',
    year: 2023,
    totalCopies: 12,
    availableCopies: 4,
    language: 'English',
    condition: 'Good',
    isReferenceOnly: false,
    coverUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&auto=format&fit=crop&q=60',
    description: 'Comprehensive mathematics guide for intermediate 2nd year students covering functions, limits, differentiation, and integration.',
    priceRs: 650,
    callNumber: '515.15 AMI'
  },
  {
    id: 'b-5',
    accessionNo: 'ACC-05102',
    title: 'University Physics with Modern Physics',
    author: 'Hugh D. Young, Roger A. Freedman',
    isbn: '978-0133978049',
    category: 'Physics',
    department: 'Physics',
    almariNo: 'Almari #05 (Physics & Mechanics)',
    shelfNo: 'Shelf 1 (BS & Degree Level)',
    publisher: 'Pearson Education',
    edition: '14th International Edition',
    year: 2019,
    totalCopies: 4,
    availableCopies: 1,
    language: 'English',
    condition: 'Good',
    isReferenceOnly: false,
    coverUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=500&auto=format&fit=crop&q=60',
    description: 'World-renowned physics textbook emphasizing foundational mechanics, electromagnetism, optics, thermodynamics, and quantum mechanics.',
    priceRs: 4800,
    callNumber: '530 YOU'
  },
  {
    id: 'b-6',
    accessionNo: 'ACC-01103',
    title: 'Seerat-un-Nabi (سیرت النبی ﷺ - مکمل ۶ جلدیں)',
    author: 'Allama Shibli Nomani & Syed Sulaiman Nadvi',
    isbn: '978-9695001239',
    category: 'Islamiat',
    department: 'Islamic Studies',
    almariNo: 'Almari #01 (Islamiat & Quranic Studies)',
    shelfNo: 'Shelf 2 (Seerat & Hadith Row)',
    publisher: 'Dar-ul-Ishaat Lahore',
    edition: 'Deluxe Edition',
    year: 2022,
    totalCopies: 6,
    availableCopies: 6,
    language: 'Urdu',
    condition: 'Brand New',
    isReferenceOnly: false,
    coverUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=500&auto=format&fit=crop&q=60',
    description: 'اردو زبان میں نبی کریم حضرت محمد مصطفیٰ ﷺ کی مستند اور جامع ترین سیرت مبارکہ، اسلامک اسٹڈیز اور عمومی مطالعہ کے لیے۔',
    priceRs: 5500,
    callNumber: '297.63 NOM'
  },
  {
    id: 'b-7',
    accessionNo: 'ACC-10101',
    title: 'Encyclopaedia Britannica (Complete Reference Volume 1-12)',
    author: 'Britannica Editorial Board',
    isbn: '978-1593392925',
    category: 'Reference Section',
    department: 'Central Reference',
    almariNo: 'Almari #10 (Reference Section - Non Issuable)',
    shelfNo: 'Shelf 1 & 2 (Entire Row)',
    publisher: 'Encyclopaedia Britannica, Inc.',
    edition: '15th Edition Standard',
    year: 2018,
    totalCopies: 2,
    availableCopies: 2,
    language: 'English',
    condition: 'Good',
    isReferenceOnly: true,
    coverUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&auto=format&fit=crop&q=60',
    description: 'Reference only. Not issued to students for home. Available strictly inside the reading room for academic research and quotation verification.',
    priceRs: 35000,
    callNumber: 'REF 032 BRI'
  },
  {
    id: 'b-8',
    accessionNo: 'ACC-04108',
    title: 'Python Crash Course: A Hands-On Project-Based Intro',
    author: 'Eric Matthes',
    isbn: '978-1593279288',
    category: 'Computer Science',
    department: 'Computer Science',
    almariNo: 'Almari #04 (CS & IT Cabinet)',
    shelfNo: 'Shelf 3 (Programming & Coding)',
    publisher: 'No Starch Press',
    edition: '2nd Edition',
    year: 2022,
    totalCopies: 6,
    availableCopies: 3,
    language: 'English',
    condition: 'Good',
    isReferenceOnly: false,
    coverUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60',
    description: 'Fast-paced, thorough introduction to programming with Python that will have you writing programs, solving problems, and making things work in no time.',
    priceRs: 2400,
    callNumber: '005.133 PYT'
  },
  {
    id: 'b-9',
    accessionNo: 'ACC-08101',
    title: 'Principles of Accounting (I.Com Part-I)',
    author: 'M. Arif & Sohail Afzal',
    isbn: '978-9694901122',
    category: 'Commerce',
    department: 'Commerce',
    almariNo: 'Almari #08 (Commerce & Accounting)',
    shelfNo: 'Shelf 1 (I.Com Row)',
    publisher: 'Azeem Academy Lahore',
    edition: '2023 Revised',
    year: 2023,
    totalCopies: 14,
    availableCopies: 7,
    language: 'English',
    condition: 'Good',
    isReferenceOnly: false,
    coverUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&auto=format&fit=crop&q=60',
    description: 'Standard textbook for intermediate commerce students covering Journal, Ledger, Trial Balance, Bank Reconciliation, and Final Accounts.',
    priceRs: 520,
    callNumber: '657 AFZ'
  },
  {
    id: 'b-10',
    accessionNo: 'ACC-09101',
    title: 'Jahangir World Times General Knowledge Encyclopedia',
    author: 'JWT Editorial Board',
    isbn: '978-9696001144',
    category: 'Competitive Exams',
    department: 'General Studies',
    almariNo: 'Almari #09 (CSS/PMS & Competitive Exams)',
    shelfNo: 'Shelf 2 (Current Affairs & GK)',
    publisher: 'Jahangir World Times Publishers Lahore',
    edition: '2024 Edition',
    year: 2024,
    totalCopies: 10,
    availableCopies: 4,
    language: 'English',
    condition: 'Brand New',
    isReferenceOnly: false,
    coverUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&auto=format&fit=crop&q=60',
    description: 'Comprehensive general knowledge, Pakistan Affairs, Current Affairs, and everyday science for college students preparing for PPSC, FPSC, and higher studies.',
    priceRs: 1600,
    callNumber: '030 JWT'
  },
  {
    id: 'b-11',
    accessionNo: 'ACC-06103',
    title: 'Organic Chemistry for BS & FSc Students',
    author: 'Dr. M. Younas',
    isbn: '978-9694128877',
    category: 'Chemistry',
    department: 'Chemistry',
    almariNo: 'Almari #06 (Chemistry & Organic Studies)',
    shelfNo: 'Shelf 2 (Organic Section)',
    publisher: 'Ilmi Kitab Khana Lahore',
    edition: '9th Edition',
    year: 2021,
    totalCopies: 8,
    availableCopies: 3,
    language: 'English',
    condition: 'Good',
    isReferenceOnly: false,
    coverUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&auto=format&fit=crop&q=60',
    description: 'Essential textbook covering reaction mechanisms, stereochemistry, hydrocarbons, functional groups, and spectroscopy.',
    priceRs: 850,
    callNumber: '547 YOU'
  },
  {
    id: 'b-12',
    accessionNo: 'ACC-03104',
    title: 'A Tale of Two Cities & Great Expectations',
    author: 'Charles Dickens',
    isbn: '978-0141439600',
    category: 'English Literature',
    department: 'English',
    almariNo: 'Almari #03 (English Literature & Novels)',
    shelfNo: 'Shelf 2 (Classics Row)',
    publisher: 'Penguin Classics',
    edition: 'Reprints',
    year: 2020,
    totalCopies: 7,
    availableCopies: 5,
    language: 'English',
    condition: 'Good',
    isReferenceOnly: false,
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60',
    description: 'Classic Victorian English literature recommended for Intermediate Arts and BS English undergraduate students.',
    priceRs: 950,
    callNumber: '823.8 DIC'
  }
];

export const INITIAL_ALMARIS: Almari[] = [
  {
    id: 'alm-1',
    almariCode: 'Almari #01',
    name: 'Islamiat & Quranic Studies',
    department: 'Islamiat',
    locationDesc: 'Main Hall - Section A (East Wing)',
    shelves: ['Shelf 1 (Top Rack - Quran & Tafseer)', 'Shelf 2 (Hadith & Seerat)', 'Shelf 3 (Islamic History & Ethics)']
  },
  {
    id: 'alm-2',
    almariCode: 'Almari #02',
    name: 'Urdu Adab & Iqbaliat',
    department: 'Urdu',
    locationDesc: 'Main Hall - Section B (East Wing)',
    shelves: ['Shelf 1 (Urdu Poetry)', 'Shelf 2 (Novels & Afsane)', 'Shelf 3 (Golden Section - Iqbaliat)', 'Shelf 4 (Criticism & Research)']
  },
  {
    id: 'alm-3',
    almariCode: 'Almari #03',
    name: 'English Literature & Novels',
    department: 'English',
    locationDesc: 'Main Hall - Section C (North Wing)',
    shelves: ['Shelf 1 (Classic Fiction & Drama)', 'Shelf 2 (Modern Poetry & Essays)', 'Shelf 3 (Grammar & Linguistics)']
  },
  {
    id: 'alm-4',
    almariCode: 'Almari #04',
    name: 'CS & IT Cabinet',
    department: 'Computer Science',
    locationDesc: 'IT & Digital Corner - Almari 4',
    shelves: ['Shelf 1 (Top Rack - Inter Section)', 'Shelf 2 (Middle Rack - Algorithms & DB)', 'Shelf 3 (Web & Software Engineering)']
  },
  {
    id: 'alm-5',
    almariCode: 'Almari #05',
    name: 'Physics & Mechanics',
    department: 'Physics',
    locationDesc: 'Science Wing - Row 1',
    shelves: ['Shelf 1 (Mechanics & Waves)', 'Shelf 2 (Electromagnetism & Modern Physics)', 'Shelf 3 (Lab Manuals & Practical)']
  },
  {
    id: 'alm-6',
    almariCode: 'Almari #06',
    name: 'Chemistry & Organic Studies',
    department: 'Chemistry',
    locationDesc: 'Science Wing - Row 2',
    shelves: ['Shelf 1 (Inorganic Chemistry)', 'Shelf 2 (Organic Chemistry)', 'Shelf 3 (Physical & Analytical)']
  },
  {
    id: 'alm-7',
    almariCode: 'Almari #07',
    name: 'Mathematics & Calculus',
    department: 'Mathematics',
    locationDesc: 'Science Wing - Row 3',
    shelves: ['Shelf 1 (Algebra & Trigonometry)', 'Shelf 2 (Calculus & Analytical Geometry)', 'Shelf 3 (Statistics & Probability)']
  },
  {
    id: 'alm-8',
    almariCode: 'Almari #08',
    name: 'Commerce & Accounting',
    department: 'Commerce',
    locationDesc: 'Commerce Wing - Row 1',
    shelves: ['Shelf 1 (Principles of Accounting)', 'Shelf 2 (Banking & Finance)', 'Shelf 3 (Business Math & Economics)']
  },
  {
    id: 'alm-9',
    almariCode: 'Almari #09',
    name: 'CSS/PMS & Competitive Exams',
    department: 'General Studies',
    locationDesc: 'Reference & Competitive Section',
    shelves: ['Shelf 1 (Pakistan Affairs & Current Affairs)', 'Shelf 2 (General Knowledge & Essays)', 'Shelf 3 (English Precis & Comp)']
  },
  {
    id: 'alm-10',
    almariCode: 'Almari #10',
    name: 'Reference Section - Non Issuable',
    department: 'Reference',
    locationDesc: 'Restricted Counter - Behind Librarian Desk',
    shelves: ['Shelf 1 (Encyclopedias & Dictionaries)', 'Shelf 2 (Gazetteers & Yearbooks)', 'Shelf 3 (Rare Manuscript Archives)']
  },
  {
    id: 'alm-11',
    almariCode: 'Almari #11',
    name: 'College Archive & Periodicals',
    department: 'General',
    locationDesc: 'Periodical Section - Left Bay',
    shelves: ['Shelf 1 (College Magazines & Gazettes)', 'Shelf 2 (Research Journals)', 'Shelf 3 (Annual Reports)']
  }
];

export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'm-1',
    rollNo: '2024-ICS-042',
    name: 'Muhammad Ahmad Khan',
    fatherName: 'Tariq Mahmood Khan',
    role: 'student',
    email: 'ahmad.ics042@gacdn.edu.pk',
    phone: '0301-4567891',
    classGrade: '1st Year (ICS)',
    section: 'Section A',
    shift: 'Morning',
    department: 'Computer Science',
    status: 'Active',
    issuedBooksCount: 2,
    maxAllowedBooks: 2,
    joinedDate: '2024-09-01',
    libraryCardNo: 'LIB-DN-8491'
  },
  {
    id: 'm-2',
    rollNo: '2024-FSC-108',
    name: 'Hamza Ali Butt',
    fatherName: 'Muhammad Ali Butt',
    role: 'student',
    email: 'hamza.fsc108@gacdn.edu.pk',
    phone: '0321-9876543',
    classGrade: '1st Year (FSc Pre-Engineering)',
    section: 'Section B',
    shift: 'Morning',
    department: 'Physics',
    status: 'Active',
    issuedBooksCount: 1,
    maxAllowedBooks: 2,
    joinedDate: '2024-09-01',
    libraryCardNo: 'LIB-DN-8492'
  },
  {
    id: 'm-3',
    rollNo: '2023-BSCS-015',
    name: 'Zubair Rafiq',
    fatherName: 'Muhammad Rafiq',
    role: 'student',
    email: 'zubair.bscs15@gacdn.edu.pk',
    phone: '0313-5551234',
    classGrade: 'BS Computer Science (3rd Sem)',
    section: 'Section A',
    shift: 'Morning',
    department: 'Computer Science',
    status: 'Active',
    issuedBooksCount: 1,
    maxAllowedBooks: 3,
    joinedDate: '2023-09-15',
    libraryCardNo: 'LIB-DN-7104'
  },
  {
    id: 'm-4',
    rollNo: '2024-FA-077',
    name: 'Usman Ghani',
    fatherName: 'Abdul Ghani',
    role: 'student',
    email: 'usman.fa77@gacdn.edu.pk',
    phone: '0333-8889900',
    classGrade: '1st Year (FA)',
    section: 'Section C',
    shift: 'Morning',
    department: 'Urdu',
    status: 'Active',
    issuedBooksCount: 0,
    maxAllowedBooks: 2,
    joinedDate: '2024-09-05',
    libraryCardNo: 'LIB-DN-8503'
  },
  {
    id: 'm-5',
    rollNo: '2024-ICOM-031',
    name: 'Bilal Tariq',
    fatherName: 'Tariq Javed',
    role: 'student',
    email: 'bilal.icom31@gacdn.edu.pk',
    phone: '0345-1234567',
    classGrade: '1st Year (I.Com)',
    section: 'Section A',
    shift: 'Morning',
    department: 'Commerce',
    status: 'Blocked',
    issuedBooksCount: 1,
    maxAllowedBooks: 2,
    joinedDate: '2024-09-02',
    libraryCardNo: 'LIB-DN-8519'
  },
  {
    id: 'm-6',
    rollNo: 'FAC-CS-04',
    name: 'Prof. Naveed Asghar',
    role: 'teacher',
    email: 'naveed.asghar@gacdn.edu.pk',
    phone: '0300-8484123',
    classGrade: 'Faculty - Associate Professor',
    section: 'Department of Computer Science',
    shift: 'Morning',
    department: 'Computer Science',
    status: 'Active',
    issuedBooksCount: 3,
    maxAllowedBooks: 5,
    joinedDate: '2018-03-01',
    libraryCardNo: 'LIB-FAC-104'
  }
];

export const INITIAL_TRANSACTIONS: BorrowTransaction[] = [
  {
    id: 'tx-1',
    transactionNo: 'TRX-2024-0891',
    bookId: 'b-1',
    bookTitle: 'Introduction to Algorithms (CLRS)',
    bookAccessionNo: 'ACC-04101',
    almariLocation: 'Almari #04 (CS & IT Cabinet) - Shelf 2',
    memberId: 'm-1',
    memberRollNo: '2024-ICS-042',
    memberName: 'Muhammad Ahmad Khan',
    memberClass: '1st Year (ICS)',
    memberSection: 'Section A',
    memberRole: 'student',
    issueDate: '2025-02-15',
    dueDate: '2025-03-01',
    status: 'Overdue',
    fineAmount: 25,
    fineStatus: 'Pending',
    issuedByStaff: 'Rashid Mahmood (Librarian)',
    renewCount: 0
  },
  {
    id: 'tx-2',
    transactionNo: 'TRX-2024-0892',
    bookId: 'b-2',
    bookTitle: 'Computer Science for Class 11 (ICS Part-I)',
    bookAccessionNo: 'ACC-04102',
    almariLocation: 'Almari #04 (CS & IT Cabinet) - Shelf 1',
    memberId: 'm-1',
    memberRollNo: '2024-ICS-042',
    memberName: 'Muhammad Ahmad Khan',
    memberClass: '1st Year (ICS)',
    memberSection: 'Section A',
    memberRole: 'student',
    issueDate: '2025-02-24',
    dueDate: '2025-03-10',
    status: 'Active',
    fineAmount: 0,
    fineStatus: 'None',
    issuedByStaff: 'Rashid Mahmood (Librarian)',
    renewCount: 0
  },
  {
    id: 'tx-3',
    transactionNo: 'TRX-2024-0893',
    bookId: 'b-4',
    bookTitle: 'Calculus and Analytic Geometry (FSc Part 2)',
    bookAccessionNo: 'ACC-07101',
    almariLocation: 'Almari #07 (Mathematics & Calculus) - Shelf 2',
    memberId: 'm-2',
    memberRollNo: '2024-FSC-108',
    memberName: 'Hamza Ali Butt',
    memberClass: '1st Year (FSc Pre-Engineering)',
    memberSection: 'Section B',
    memberRole: 'student',
    issueDate: '2025-02-26',
    dueDate: '2025-03-12',
    status: 'Active',
    fineAmount: 0,
    fineStatus: 'None',
    issuedByStaff: 'Rashid Mahmood (Librarian)',
    renewCount: 0
  },
  {
    id: 'tx-4',
    transactionNo: 'TRX-2024-0894',
    bookId: 'b-9',
    bookTitle: 'Principles of Accounting (I.Com Part-I)',
    bookAccessionNo: 'ACC-08101',
    almariLocation: 'Almari #08 (Commerce & Accounting) - Shelf 1',
    memberId: 'm-5',
    memberRollNo: '2024-ICOM-031',
    memberName: 'Bilal Tariq',
    memberClass: '1st Year (I.Com)',
    memberSection: 'Section A',
    memberRole: 'student',
    issueDate: '2025-02-05',
    dueDate: '2025-02-19',
    status: 'Overdue',
    fineAmount: 75,
    fineStatus: 'Pending',
    issuedByStaff: 'Rashid Mahmood (Librarian)',
    renewCount: 1
  },
  {
    id: 'tx-5',
    transactionNo: 'TRX-2024-0870',
    bookId: 'b-3',
    bookTitle: 'Kulliyat-e-Iqbal (کلیاتِ اقبال)',
    bookAccessionNo: 'ACC-02105',
    almariLocation: 'Almari #02 (Urdu Adab & Iqbaliat) - Shelf 3',
    memberId: 'm-3',
    memberRollNo: '2023-BSCS-015',
    memberName: 'Zubair Rafiq',
    memberClass: 'BS Computer Science (3rd Sem)',
    memberSection: 'Section A',
    memberRole: 'student',
    issueDate: '2025-02-01',
    dueDate: '2025-02-15',
    returnDate: '2025-02-14',
    status: 'Returned',
    fineAmount: 0,
    fineStatus: 'None',
    issuedByStaff: 'Rashid Mahmood (Librarian)',
    renewCount: 0
  }
];

export const INITIAL_DIGITAL_RESOURCES: DigitalResource[] = [
  {
    id: 'dr-1',
    title: 'BISE Lahore Past Papers (Computer Science 1st Year ICS 2018-2024)',
    type: 'Past Paper',
    subject: 'Computer Science',
    classGrade: '1st Year (ICS)',
    boardOrUniversity: 'BISE Lahore',
    year: '2024 Compilation',
    pages: 48,
    fileSizeMb: 6.4,
    downloadUrl: '#',
    viewsCount: 1240
  },
  {
    id: 'dr-2',
    title: 'Lahore Board Physics Part-1 Solved Numerical Problems & Key Points',
    type: 'Lecture Notes',
    subject: 'Physics',
    classGrade: '1st Year (FSc)',
    boardOrUniversity: 'BISE Lahore',
    year: '2024',
    pages: 64,
    fileSizeMb: 8.1,
    downloadUrl: '#',
    viewsCount: 980
  },
  {
    id: 'dr-3',
    title: 'Urdu Lazmi (اردو لازمی) Khulasa Jaat & Ashar Tashreeh (1st Year)',
    type: 'Lecture Notes',
    subject: 'Urdu',
    classGrade: '1st Year (All Groups)',
    boardOrUniversity: 'Govt Associate College Faculty',
    year: '2024',
    pages: 52,
    fileSizeMb: 4.8,
    downloadUrl: '#',
    viewsCount: 1540
  },
  {
    id: 'dr-4',
    title: 'Calculus & Analytical Geometry 2nd Year Smart Syllabus & Formula Sheet',
    type: 'Syllabus',
    subject: 'Mathematics',
    classGrade: '2nd Year (FSc / ICS)',
    boardOrUniversity: 'Punjab Curriculum Board',
    year: '2024-25',
    pages: 28,
    fileSizeMb: 3.2,
    downloadUrl: '#',
    viewsCount: 860
  },
  {
    id: 'dr-5',
    title: 'English Grammar, Pair of Words & Letter Writing Guide (Intermediate)',
    type: 'E-Book',
    subject: 'English',
    classGrade: '1st & 2nd Year',
    boardOrUniversity: 'Department of English GACDN',
    year: '2023',
    pages: 94,
    fileSizeMb: 11.2,
    downloadUrl: '#',
    viewsCount: 2150
  },
  {
    id: 'dr-6',
    title: 'Principles of Accounting 5-Year Past Papers with Solutions (I.Com Part-1)',
    type: 'Past Paper',
    subject: 'Commerce',
    classGrade: '1st Year (I.Com)',
    boardOrUniversity: 'BISE Lahore',
    year: '2019-2024',
    pages: 56,
    fileSizeMb: 5.7,
    downloadUrl: '#',
    viewsCount: 720
  }
];

export const INITIAL_ANNOUNCEMENTS: LibraryAnnouncement[] = [
  {
    id: 'ann-1',
    title: 'Urgent: Clear Library Dues for 1st Year Intermediate Board Roll Number Slips',
    date: 'March 02, 2025',
    category: 'Notice',
    content: 'All intermediate students (ICS, FSc, FA, I.Com) are directed to clear their pending books and library dues before receiving BISE Lahore examination roll number slips from college administration.',
    isUrgent: true
  },
  {
    id: 'ann-2',
    title: 'New Books Arrival: Latest 2025 Computer Science & Artificial Intelligence Shelf',
    date: 'February 28, 2025',
    category: 'New Arrivals',
    content: '150 new titles have been added in Almari #04 for Computer Science & Programming enthusiasts including Python, Web Technologies, and C++ textbooks.',
    isUrgent: false
  },
  {
    id: 'ann-3',
    title: 'Library Working Hours & Reading Hall Schedule',
    date: 'February 10, 2025',
    category: 'Timing',
    content: 'Central Library timings are Monday to Saturday: 8:00 AM to 4:00 PM. Reading hall AC study zone is open for all enrolled students.',
    isUrgent: false
  }
];

export const INITIAL_SUGGESTIONS: BookSuggestion[] = [
  {
    id: 'sug-1',
    title: 'Head First Design Patterns',
    author: 'Eric Freeman',
    suggestedByRollNo: '2024-ICS-042',
    suggestedByName: 'Muhammad Ahmad Khan',
    studentClass: '1st Year (ICS - Sec A)',
    department: 'Computer Science',
    reason: 'Helps tremendously in understanding Object Oriented Programming concepts for BS CS foundation.',
    date: '2025-02-20',
    status: 'Approved'
  },
  {
    id: 'sug-2',
    title: 'PPSC General Knowledge One Paper MCQs Guide',
    author: 'Imtiaz Shahid',
    suggestedByRollNo: '2024-FA-077',
    suggestedByName: 'Usman Ghani',
    studentClass: '1st Year (FA - Sec C)',
    department: 'Urdu / General',
    reason: 'Essential for competitive test preparations and general aptitude.',
    date: '2025-02-25',
    status: 'Pending'
  }
];

export const INITIAL_SEATS: ReadingRoomSeat[] = Array.from({ length: 60 }, (_, i) => {
  const seatNum = `S-${String(i + 1).padStart(2, '0')}`;
  let zone: ReadingRoomSeat['zone'] = 'Quiet Study Zone';
  if (i < 15) zone = 'Window Side';
  else if (i >= 15 && i < 35) zone = 'Quiet Study Zone';
  else if (i >= 35 && i < 48) zone = 'Discussion Corner';
  else zone = 'Digital Research';

  const isOccupied = [3, 7, 12, 18, 22, 29, 36, 42, 51].includes(i + 1);
  const isReserved = [9, 25, 45].includes(i + 1);

  return {
    id: i + 1,
    seatNumber: seatNum,
    zone,
    status: isOccupied ? 'Occupied' : isReserved ? 'Reserved' : 'Available',
    currentOccupantRollNo: isOccupied ? `2024-ICS-${100 + i}` : undefined,
    currentOccupantName: isOccupied ? `Student ${seatNum}` : undefined,
    bookedUntil: isOccupied ? '02:30 PM' : undefined
  };
});

export const INITIAL_SETTINGS = {
  finePerDay: 5,
  maxBorrowDaysStudent: 14,
  maxBorrowDaysTeacher: 30,
  maxBooksStudent: 2,
  maxBooksTeacher: 5,
  timings: 'Mon–Sat: 8:00 AM – 4:00 PM',
  location: 'Data Nagar, Badami Bagh, Lahore',
  collegeName: 'Govt Associate College Data Nagar Lahore',
  contactPhone: '042-99001122',
  contactEmail: 'library@gacdn.edu.pk',
  staffMembers: [
    {
      name: 'Mr. Rashid Mahmood',
      designation: 'Chief College Librarian (BS-17)',
      shift: 'Morning (8:00 AM – 3:30 PM)',
      desk: 'Circulation & Acquisition Desk',
      phone: '0300-8484123',
      email: 'rashid.librarian@gacdn.edu.pk'
    },
    {
      name: 'Mr. Muhammad Imran',
      designation: 'Assistant Librarian (Cataloging & IT)',
      shift: 'Morning (8:30 AM – 4:00 PM)',
      desk: 'E-Library & Classification',
      phone: '0321-7788990',
      email: 'imran.library@gacdn.edu.pk'
    },
    {
      name: 'Mr. Asif Ali',
      designation: 'Library Attendant / Book Binder',
      shift: 'Morning (8:00 AM – 3:30 PM)',
      desk: 'Almari Shelf Maintenance & Reading Room Discipline',
      phone: '0313-4455667',
      email: 'asif.library@gacdn.edu.pk'
    }
  ],
  libraryRules: [
    {
      title: '1. Strict Silence & Decorum',
      desc: 'Complete silence must be observed inside the library reading hall. Discussions, group chatter, and loud activities are strictly restricted to the outdoor corridor.'
    },
    {
      title: '2. Library Card Mandatory',
      desc: 'No book shall be issued without a valid College Library Card. Borrowing on another student’s card or roll number is strictly forbidden and subject to card confiscation.'
    },
    {
      title: '3. Student Borrowing Quota (2 Books)',
      desc: 'Regular enrolled students (ICS, FSc, FA, I.Com, BS) are entitled to borrow a maximum of 2 books simultaneously. Teaching faculty may borrow up to 5 books.'
    },
    {
      title: '4. 14-Day Issuance & Reading Period',
      desc: 'Books are issued for 14 calendar days. A book may be renewed once for an additional 7 days provided no other student has placed a reservation on it.'
    },
    {
      title: '5. Overdue Fine Rate (Rs. 5 / Day)',
      desc: 'A fine of Rs. 5 per day per book is levied after the due date. Examination roll number slips and clearance certificates will not be issued until all library dues are settled.'
    },
    {
      title: '6. Damage, Marking & Loss Policy',
      desc: 'Underlining with pen, dog-earing pages, tearing, or water damage is considered destruction of college property. Lost or damaged books must be replaced with the current edition or paid for at market replacement cost.'
    },
    {
      title: '7. Reference Section & Newspapers',
      desc: 'Encyclopedias, dictionaries, atlases, current newspapers, and uncataloged journals are strictly for in-library reading and cannot be taken outside the library hall.'
    },
    {
      title: '8. Mobile Phone Policy',
      desc: 'Cellular phones must be switched to silent mode before entering the library. Answering calls inside the reading hall will lead to immediate ejection.'
    }
  ],
  faqs: [
    {
      question: 'How do I get my College Library Card?',
      answer: 'Library cards are issued free of charge to all enrolled 1st Year, 2nd Year, and BS students upon showing their college admission fee challan and one passport-size photograph at the Librarian Circulation Desk.'
    },
    {
      question: 'What happens if my book is overdue?',
      answer: 'A standard fine accumulates on each overdue book daily. You can view your current pending fine on the "My Borrowed Books" page by entering your Roll Number. Fines can be paid directly at the circulation counter.'
    },
    {
      question: 'Can I read Reference books at home?',
      answer: 'No. Encyclopedias, rare historical manuscripts, and dictionaries in Almari #10 are non-issuable. They must be read exclusively in the air-conditioned reading room.'
    }
  ]
};


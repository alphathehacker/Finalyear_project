import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';

import CollegeHero from './components/CollegeHero';
import TabNavigation from './components/TabNavigation';
import OverviewTab from './components/OverviewTab';
import CoursesTab from './components/CoursesTab';
import CutoffsTab from './components/CutoffsTab';
import FeesTab from './components/FeesTab';
import PlacementsTab from './components/PlacementsTab';
import ReviewsTab from './components/ReviewsTab';
import ComparisonView from './components/ComparisonView';
import RelatedColleges from './components/RelatedColleges';
import StickyActionBar from './components/StickyActionBar';

const CollegeDetailsComparison = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comparisonColleges, setComparisonColleges] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  const collegeId = searchParams?.get('id') || '1';
  const compareIds = searchParams?.get('compare')?.split(',') || [];

  // Mock college data
  const mockCollegeData = {
    id: collegeId,
    name: "Indian Institute of Technology Delhi",
    shortName: "IIT Delhi",
    location: "New Delhi, Delhi",
    type: "Government",
    established: 1961,
    heroImage: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=400&fit=crop",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
    fullAddress: "Hauz Khas, New Delhi, Delhi 110016, India",
    coordinates: { lat: 28.5449, lng: 77.1928 },
    rankings: { nirf: 2, qs: 185, times: 401 },
    overallRating: 4.3,
    description: `IIT Delhi is one of the premier engineering institutions in India, known for its excellence in technical education and research. Established in 1961, it has consistently maintained its position among the top engineering colleges in the country.`,
    additionalInfo: `The institute offers undergraduate, postgraduate, and doctoral programs in various fields of engineering, science, and technology. With state-of-the-art facilities and world-class faculty, IIT Delhi continues to produce leaders in technology and innovation.`,
    stats: {
      totalStudents: 8500,
      faculty: 450,
      campusSize: "325 acres",
      courses: 25
    },
    campusImages: [
      { url: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop", caption: "Main Academic Block" },
      { url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop", caption: "Library" },
      { url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop", caption: "Sports Complex" }
    ],
    accreditations: [
      { name: "NAAC", grade: "A++" },
      { name: "NBA", grade: "Accredited" },
      { name: "NIRF", grade: "Rank 2" }
    ],
    facilities: [
      { name: "Central Library", icon: "BookOpen" },
      { name: "Hostels", icon: "Home" },
      { name: "Sports Complex", icon: "Trophy" },
      { name: "Medical Center", icon: "Heart" },
      { name: "Cafeteria", icon: "Coffee" },
      { name: "Wi-Fi Campus", icon: "Wifi" },
      { name: "Labs", icon: "Microscope" },
      { name: "Auditorium", icon: "Music" }
    ],
    courseCategories: [
      {
        name: "B.Tech",
        duration: "4 Years",
        description: "Undergraduate engineering programs",
        branchCount: 12,
        totalSeats: 900,
        icon: "Cpu"
      },
      {
        name: "M.Tech",
        duration: "2 Years", 
        description: "Postgraduate engineering programs",
        branchCount: 15,
        totalSeats: 400,
        icon: "GraduationCap"
      },
      {
        name: "Ph.D",
        duration: "3-5 Years",
        description: "Doctoral research programs",
        branchCount: 20,
        totalSeats: 200,
        icon: "BookOpen"
      }
    ],
    branches: [
      {
        id: 1,
        name: "Computer Science and Engineering",
        code: "CSE",
        duration: "4 Years",
        totalSeats: 120,
        availableSeats: 15,
        seatDistribution: { general: 60, obc: 32, sc: 18, st: 10 },
        eligibility: [
          "JEE Advanced qualified",
          "Minimum 75% in Class XII",
          "Physics, Chemistry, Mathematics mandatory"
        ],
        curriculumHighlights: ["AI/ML", "Data Structures", "Software Engineering", "Computer Networks"]
      },
      {
        id: 2,
        name: "Electrical Engineering",
        code: "EE",
        duration: "4 Years",
        totalSeats: 100,
        availableSeats: 25,
        seatDistribution: { general: 50, obc: 27, sc: 15, st: 8 },
        eligibility: [
          "JEE Advanced qualified",
          "Minimum 75% in Class XII",
          "Physics, Chemistry, Mathematics mandatory"
        ],
        curriculumHighlights: ["Power Systems", "Electronics", "Control Systems", "Signal Processing"]
      }
    ],
    admissionProcess: [
      { title: "JEE Advanced", description: "Qualify JEE Advanced exam" },
      { title: "Counseling", description: "Participate in JoSAA counseling" },
      { title: "Seat Allotment", description: "Get seat based on rank & choice" },
      { title: "Admission", description: "Complete admission formalities" }
    ],
    cutoffs: {
      "jee-main": {
        general: [
          { branch: "Computer Science Engineering", code: "CSE", openingRank: 150, closingRank: 164, totalSeats: 120 },
          { branch: "Electrical Engineering", code: "EE", openingRank: 200, closingRank: 250, totalSeats: 100 },
          { branch: "Mechanical Engineering", code: "ME", openingRank: 280, closingRank: 320, totalSeats: 110 }
        ],
        obc: [
          { branch: "Computer Science Engineering", code: "CSE", openingRank: 100, closingRank: 118, totalSeats: 32 },
          { branch: "Electrical Engineering", code: "EE", openingRank: 140, closingRank: 180, totalSeats: 27 }
        ]
      }
    },
    cutoffTrends: {
      "jee-main": {
        general: [
          { year: "2020", cutoffRank: 180 },
          { year: "2021", cutoffRank: 170 },
          { year: "2022", cutoffRank: 165 },
          { year: "2023", cutoffRank: 160 },
          { year: "2024", cutoffRank: 164 }
        ]
      }
    },
    feeStructure: {
      btech: {
        academic: [
          { component: "Tuition Fee", amount: 200000 },
          { component: "Development Fee", amount: 15000 },
          { component: "Laboratory Fee", amount: 10000 },
          { component: "Library Fee", amount: 5000 }
        ],
        hostel: [
          { component: "Room Rent", amount: 25000 },
          { component: "Mess Fee", amount: 36000 },
          { component: "Electricity", amount: 8000 }
        ]
      }
    },
    scholarships: [
      {
        name: "Merit Scholarship",
        description: "For top 10% students based on JEE Advanced rank",
        amount: "₹50,000/year",
        eligibility: "Top 10% JEE Advanced"
      },
      {
        name: "Need-based Scholarship", 
        description: "For economically weaker sections",
        amount: "₹1,00,000/year",
        eligibility: "Family income < ₹5 LPA"
      }
    ],
    paymentMethods: [
      "Online Payment (Credit/Debit Card)",
      "Net Banking",
      "UPI Payment",
      "Demand Draft",
      "Bank Transfer"
    ],
    feeDeadlines: [
      { event: "First Installment", date: "July 15, 2024" },
      { event: "Second Installment", date: "December 15, 2024" },
      { event: "Final Payment", date: "March 15, 2025" }
    ],
    placementStats: {
      "2024": {
        placementRate: 95,
        averagePackage: 18,
        highestPackage: 55,
        companiesVisited: 150,
        branchWise: [
          { branch: "CSE", averagePackage: 25 },
          { branch: "EE", averagePackage: 18 },
          { branch: "ME", averagePackage: 15 },
          { branch: "CE", averagePackage: 12 }
        ],
        sectorWise: [
          { name: "IT/Software", percentage: 45 },
          { name: "Core Engineering", percentage: 25 },
          { name: "Consulting", percentage: 15 },
          { name: "Finance", percentage: 10 },
          { name: "Others", percentage: 5 }
        ],
        packageRanges: [
          { range: "Above ₹30L", percentage: 25 },
          { range: "₹20-30L", percentage: 35 },
          { range: "₹10-20L", percentage: 30 },
          { range: "Below ₹10L", percentage: 10 }
        ]
      }
    },
    topRecruiters: [
      { name: "Google", logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop", sector: "Technology" },
      { name: "Microsoft", logo: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=100&h=100&fit=crop", sector: "Technology" },
      { name: "Amazon", logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100&h=100&fit=crop", sector: "E-commerce" },
      { name: "Goldman Sachs", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop", sector: "Finance" },
      { name: "McKinsey", logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop", sector: "Consulting" },
      { name: "Flipkart", logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop", sector: "E-commerce" }
    ],
    placementProcess: [
      { title: "Pre-placement", description: "Company presentations", timeline: "August-September", icon: "Presentation" },
      { title: "Applications", description: "Student applications", timeline: "September-October", icon: "FileText" },
      { title: "Screening", description: "Resume shortlisting", timeline: "October-November", icon: "Filter" },
      { title: "Interviews", description: "Final selection", timeline: "December-February", icon: "Users" }
    ],
    alumniStories: [
      {
        name: "Rajesh Kumar",
        position: "Senior Software Engineer",
        company: "Google",
        branch: "Computer Science",
        batch: "2020",
        photo: "https://randomuser.me/api/portraits/men/32.jpg",
        quote: "IIT Delhi provided me with the perfect foundation for my career in technology."
      },
      {
        name: "Priya Sharma",
        position: "Product Manager",
        company: "Microsoft",
        branch: "Electrical Engineering",
        batch: "2019",
        photo: "https://randomuser.me/api/portraits/women/44.jpg",
        quote: "The diverse opportunities and excellent faculty shaped my professional journey."
      }
    ],
    placementSupport: [
      { title: "Career Counseling", description: "One-on-one guidance sessions", icon: "Users" },
      { title: "Resume Building", description: "Professional resume workshops", icon: "FileText" },
      { title: "Interview Preparation", description: "Mock interviews and training", icon: "MessageCircle" },
      { title: "Skill Development", description: "Technical and soft skills training", icon: "TrendingUp" }
    ],
    reviews: [
      {
        id: 1,
        author: {
          name: "Amit Verma",
          course: "B.Tech CSE",
          batch: "2020-2024",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg"
        },
        rating: 5,
        category: "academics",
        title: "Excellent Academic Environment",
        content: `The academic environment at IIT Delhi is truly exceptional. The faculty members are highly qualified and always ready to help students. The curriculum is well-designed and keeps pace with industry requirements.`,
        pros: ["World-class faculty", "Updated curriculum", "Research opportunities"],
        cons: ["High competition", "Heavy workload"],
        date: "2024-01-15",
        helpfulCount: 24
      },
      {
        id: 2,
        author: {
          name: "Sneha Patel",
          course: "B.Tech EE",
          batch: "2019-2023",
          avatar: "https://randomuser.me/api/portraits/women/2.jpg"
        },
        rating: 4,
        category: "infrastructure",
        title: "Great Infrastructure and Facilities",
        content: `The campus infrastructure is impressive with modern labs, well-equipped library, and good hostel facilities. The Wi-Fi connectivity is excellent throughout the campus.`,
        pros: ["Modern facilities", "Good hostel accommodation", "Excellent library"],
        cons: ["Limited parking space", "Crowded mess during peak hours"],
        date: "2024-01-10",
        helpfulCount: 18
      }
    ],
    ratingBreakdown: [
      { category: "Academics", rating: 4.5 },
      { category: "Infrastructure", rating: 4.2 },
      { category: "Placements", rating: 4.7 },
      { category: "Campus Life", rating: 4.0 },
      { category: "Faculty", rating: 4.4 }
    ]
  };

  const relatedColleges = [
    {
      id: 2,
      name: "Indian Institute of Technology Bombay",
      location: "Mumbai, Maharashtra",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
      ranking: 1,
      cutoff: 144,
      avgPackage: 20
    },
    {
      id: 3,
      name: "Indian Institute of Technology Madras",
      location: "Chennai, Tamil Nadu", 
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
      ranking: 3,
      cutoff: 178,
      avgPackage: 17
    },
    {
      id: 4,
      name: "Indian Institute of Technology Kanpur",
      location: "Kanpur, Uttar Pradesh",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
      ranking: 4,
      cutoff: 201,
      avgPackage: 16
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCollege(mockCollegeData);
      setLoading(false);
    }, 1000);
  }, [collegeId]);

  useEffect(() => {
    if (compareIds?.length > 0) {
      // Load comparison colleges
      const comparisonData = compareIds?.map(id => ({
        ...mockCollegeData,
        id: id,
        name: `College ${id}`,
        shortName: `College ${id}`
      }));
      setComparisonColleges([mockCollegeData, ...comparisonData]);
      setShowComparison(true);
    }
  }, [compareIds]);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: college?.name,
        text: `Check out ${college?.name} details`,
        url: window.location?.href
      });
    }
  };

  const handleAddToComparison = () => {
    // Add current college to comparison
    const currentUrl = new URL(window.location);
    const existingCompare = currentUrl?.searchParams?.get('compare');
    const compareList = existingCompare ? existingCompare?.split(',') : [];
    
    if (!compareList?.includes(collegeId)) {
      compareList?.push(collegeId);
      currentUrl?.searchParams?.set('compare', compareList?.join(','));
      window.history?.pushState({}, '', currentUrl);
      
      setComparisonColleges([college, ...comparisonColleges]);
      setShowComparison(true);
    }
  };

  const handleRemoveFromComparison = (id) => {
    const updatedColleges = comparisonColleges?.filter(c => c?.id !== id);
    setComparisonColleges(updatedColleges);
    
    if (updatedColleges?.length <= 1) {
      setShowComparison(false);
      const currentUrl = new URL(window.location);
      currentUrl?.searchParams?.delete('compare');
      window.history?.pushState({}, '', currentUrl);
    }
  };

  const handleApplyNow = () => {
    window.open('https://josaa.nic.in/', '_blank');
  };

  const handleContact = () => {
    window.open('tel:+911126591785');
  };

  const handleCollegeSelect = (id) => {
    navigate(`/college-details-comparison?id=${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 pb-20 md:pb-6">
          <div className="flex items-center justify-center h-96">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-muted-foreground">Loading college details...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showComparison && comparisonColleges?.length > 1) {
    return (
      <ComparisonView
        colleges={comparisonColleges}
        onRemoveCollege={handleRemoveFromComparison}
        onClose={() => setShowComparison(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 pb-20 md:pb-6">
        {/* Breadcrumb */}
        <div className="bg-muted border-b border-border px-4 py-3">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center space-x-2 text-sm">
              <button 
                onClick={() => navigate('/student-dashboard')}
                className="text-muted-foreground hover:text-foreground transition-smooth"
              >
                Dashboard
              </button>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              <button 
                onClick={() => navigate('/college-search-filter')}
                className="text-muted-foreground hover:text-foreground transition-smooth"
              >
                College Search
              </button>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              <span className="text-foreground font-medium">{college?.shortName}</span>
            </nav>
          </div>
        </div>

        {/* College Hero Section */}
        <CollegeHero
          college={college}
          onBookmark={handleBookmark}
          onShare={handleShare}
          onAddToComparison={handleAddToComparison}
          isBookmarked={isBookmarked}
        />

        {/* Tab Navigation */}
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          {activeTab === 'overview' && <OverviewTab college={college} />}
          {activeTab === 'courses' && <CoursesTab college={college} />}
          {activeTab === 'cutoffs' && <CutoffsTab college={college} />}
          {activeTab === 'fees' && <FeesTab college={college} />}
          {activeTab === 'placements' && <PlacementsTab college={college} />}
          {activeTab === 'reviews' && <ReviewsTab college={college} />}
        </div>

        {/* Related Colleges */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <RelatedColleges
            colleges={relatedColleges}
            onCollegeSelect={handleCollegeSelect}
          />
        </div>

        {/* Sticky Action Bar (Mobile) */}
        <StickyActionBar
          college={college}
          onApplyNow={handleApplyNow}
          onContact={handleContact}
          onShare={handleShare}
          isBookmarked={isBookmarked}
          onBookmark={handleBookmark}
        />
      </div>
    </div>
  );
};

export default CollegeDetailsComparison;
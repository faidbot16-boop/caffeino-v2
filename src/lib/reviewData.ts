export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  source: string;
  avatar?: string;
}

export const reviews: Review[] = [
  {
    id: "1",
    name: "Abdullah Alzaabi",
    rating: 5,
    text: "One of the best cafés that I always go to. The coconut cake is amazing and the breakfast is top notch. Also, the Spanish latte — cold or hot — is the best in every sense of the word, and the Costa Rican coffee they have is something that is not normal. Highly recommend!",
    date: "2 weeks ago",
    source: "Google Reviews",
  },
  {
    id: "2",
    name: "Ibtihal",
    rating: 5,
    text: "From a long time I'm looking for a coffee shop that has lactose free milk and found it. They also have oat milk and almond milk. I tried the Spanish latte and it was perfect, the taste of sugar is balanced. Highly recommended.",
    date: "1 month ago",
    source: "Google Reviews",
  },
  {
    id: "3",
    name: "Mohammed Al Mansouri",
    rating: 5,
    text: "Best breakfast spot in Abu Dhabi hands down. The shakshuka is to die for and their freshly baked croissants are the flakiest I've ever had. The Marina location has the best waterfront views.",
    date: "3 weeks ago",
    source: "Google Reviews",
  },
  {
    id: "4",
    name: "Sarah Johnson",
    rating: 5,
    text: "As a digital nomad, I need good WiFi and great coffee. Caffeino delivers both perfectly. The staff is incredibly friendly and the atmosphere is perfect for focused work. The V60 pour-over is a must-try.",
    date: "1 week ago",
    source: "Google Reviews",
  },
  {
    id: "5",
    name: "Fatima Al Rashid",
    rating: 5,
    text: "Took my family here for brunch and everyone loved it. The kids enjoyed the French toast while my husband raved about the Eggs Benedict. Beautiful interior design and the outdoor seating area is perfect for Abu Dhabi winters.",
    date: "5 days ago",
    source: "Google Reviews",
  },
  {
    id: "6",
    name: "Omar Khalid",
    rating: 4,
    text: "Great coffee and even better atmosphere. The pistachio croissant is addictive. Only reason for 4 stars is the wait time on weekends, but it's worth it. Make sure to try their specialty cold brew.",
    date: "2 days ago",
    source: "Google Reviews",
  },
  {
    id: "7",
    name: "Layla Hassan",
    rating: 5,
    text: "The food truck came to our office building and now I'm hooked. The acai bowl is my go-to healthy breakfast. Delivery via Talabat is always fast and the packaging keeps everything fresh.",
    date: "1 week ago",
    source: "Google Reviews",
  },
  {
    id: "8",
    name: "Rashid Al Nuaimi",
    rating: 5,
    text: "Authentic specialty coffee experience in Abu Dhabi. You can tell they care about the beans they source. The baristas are knowledgeable and always happy to explain the different origins. The Ethiopian single origin is my favorite.",
    date: "3 days ago",
    source: "Google Reviews",
  },
];

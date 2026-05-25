import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, DollarSign, Send, CheckCircle } from "lucide-react";

const jobs = [
  {
    id: 1,
    title: "Barista",
    location: "All Branches",
    type: "Full-time",
    salary: "AED 3,500 - 4,500",
    description: "We're looking for passionate baristas who love coffee and customer service. Experience preferred but training provided.",
    requirements: ["Passion for coffee", "Customer service skills", "Ability to work in a fast-paced environment", "Team player"],
  },
  {
    id: 2,
    title: "Head Chef",
    location: "Marina Al Bateen",
    type: "Full-time",
    salary: "AED 8,000 - 12,000",
    description: "Lead our kitchen team in creating exceptional breakfast and brunch dishes. Creative mindset required.",
    requirements: ["5+ years kitchen experience", "Breakfast/brunch expertise", "Leadership skills", "Food safety certification"],
  },
  {
    id: 3,
    title: "Shift Supervisor",
    location: "All Branches",
    type: "Full-time",
    salary: "AED 5,000 - 6,500",
    description: "Manage daily operations, lead the team, and ensure exceptional guest experiences.",
    requirements: ["2+ years supervisory experience", "Hospitality background", "Problem-solving skills", "Fluent in English"],
  },
  {
    id: 4,
    title: "Marketing Coordinator",
    location: "Head Office",
    type: "Full-time",
    salary: "AED 6,000 - 8,000",
    description: "Drive our brand presence across digital and physical channels. Creative and data-driven mindset.",
    requirements: ["Marketing degree or equivalent", "Social media expertise", "Content creation skills", "Analytics knowledge"],
  },
];

export default function Careers() {
  const [appliedJob, setAppliedJob] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
      setAppliedJob(null);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-16"
    >
      <div className="section-padding max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            Join the Team
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-primary mb-4">
            Careers at Caffeino
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Be part of Abu Dhabi's most passionate coffee community.
          </p>
        </motion.div>

        {!showForm ? (
          <div className="space-y-6">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-xl p-8 hover:border-accent/50 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-text-primary text-xl font-medium mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-text-muted">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" /> {job.salary}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setAppliedJob(job.id);
                      setShowForm(true);
                    }}
                    className="btn-primary text-sm whitespace-nowrap"
                  >
                    Apply Now
                  </button>
                </div>
                
                <p className="text-text-secondary text-sm mb-4">{job.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {job.requirements.map((req) => (
                    <span
                      key={req}
                      className="px-3 py-1 rounded-full bg-bg-elevated text-text-secondary text-xs"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl p-8"
          >
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-text-primary text-xl font-medium mb-2">Application Sent!</h3>
                <p className="text-text-secondary">We'll get back to you within 5 business days.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-text-primary text-xl font-medium">
                      Apply for {jobs.find((j) => j.id === appliedJob)?.title}
                    </h3>
                    <p className="text-text-muted text-sm">Fill out the form below</p>
                  </div>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-text-muted hover:text-text-primary transition-colors"
                  >
                    Back to Jobs
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-text-secondary text-sm mb-2">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-bg-elevated border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-text-secondary text-sm mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-bg-elevated border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-text-secondary text-sm mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-bg-elevated border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                      placeholder="+971 XX XXX XXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-text-secondary text-sm mb-2">Why do you want to join?</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-bg-elevated border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  <button type="submit" className="btn-primary inline-flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Submit Application
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

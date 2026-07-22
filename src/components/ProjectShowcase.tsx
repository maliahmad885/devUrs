'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ExternalLink, 
  Github, 
  Play, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Target, 
  Users, 
  Clock, 
  Code, 
  Star, 
  Shield, 
  Rocket, 
  Database, 
  Workflow,
  TrendingUp,
  Globe,
  Cpu,
  Palette,
  Layers
} from 'lucide-react'

// Custom icon components
const Smartphone = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
)

interface Project {
  id: number
  title: string
  description: string
  category: string
  results: string
  technologies: string[]
  client: string
  duration: string
  team: string
  color: string
  gradient: string
  liveUrl?: string
  githubUrl?: string
  demoUrl?: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  impact: 'High' | 'Medium' | 'Low'
  icon: string
  image: string
  tags: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "MYSMSF",
    description: "SMSF property, crypto, and gold administration platform with payments, accounting, and CRM sync.",
    category: "Fintech / Admin",
    results: "Stripe · Xero · Brevo integrations",
    technologies: ["Ruby on Rails", "Angular", "Stripe", "Xero", "Brevo"],
    client: "MYSMSF",
    duration: "Ongoing platform work",
    team: "Full-stack contribution",
    color: "from-green-500 to-emerald-600",
    gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
    liveUrl: "https://mysmsfproperty.com.au",
    difficulty: "Hard",
    impact: "High",
    icon: "🏠",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&crop=center",
    tags: ["Rails", "Angular", "Stripe", "Xero"]
  },
  {
    id: 2,
    title: "iRevise",
    description: "Study platform for students and teachers with Stripe billing, Zapier automation, and Sidekiq jobs.",
    category: "EdTech",
    results: "Billing + automation pipelines",
    technologies: ["Ruby on Rails", "Stripe", "Zapier", "Sidekiq"],
    client: "iRevise",
    duration: "Platform development",
    team: "Full-stack contribution",
    color: "from-blue-500 to-cyan-600",
    gradient: "bg-gradient-to-br from-blue-500 to-cyan-600",
    liveUrl: "https://irevise.com",
    difficulty: "Medium",
    impact: "High",
    icon: "📚",
    image: "https://images.unsplash.com/photo-1456513080880-7d36d38a2140?w=600&h=400&fit=crop&crop=center",
    tags: ["Rails", "Stripe", "Zapier", "Sidekiq"]
  },
  {
    id: 3,
    title: "Teleport / Radiangen",
    description: "3D modeling and design platform with Craftcloud API integration. Solo backend and DevOps ownership.",
    category: "3D / Design",
    results: "Craftcloud API · Solo backend/DevOps",
    technologies: ["Backend", "Craftcloud API", "DevOps"],
    client: "Teleport / Radiangen",
    duration: "Platform development",
    team: "Solo backend & DevOps",
    color: "from-orange-500 to-red-600",
    gradient: "bg-gradient-to-br from-orange-500 to-red-600",
    difficulty: "Hard",
    impact: "High",
    icon: "🎨",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop&crop=center",
    tags: ["3D", "API", "DevOps"]
  },
  {
    id: 4,
    title: "AirAsia (Vidi)",
    description: "Travel-tech activity booking platform — Rails, React, MySQL, and AWS CI/CD.",
    category: "Travel-Tech",
    results: "Activity booking platform",
    technologies: ["Ruby on Rails", "React", "MySQL", "AWS CI/CD"],
    client: "AirAsia (Vidi)",
    duration: "Platform development",
    team: "Full-stack contribution",
    color: "from-red-500 to-orange-600",
    gradient: "bg-gradient-to-br from-red-500 to-orange-600",
    liveUrl: "https://airasia.com",
    difficulty: "Hard",
    impact: "High",
    icon: "✈️",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop&crop=center",
    tags: ["Rails", "React", "AWS", "Travel"]
  },
  {
    id: 5,
    title: "Intocities",
    description: "360° virtual tour platform for German cities, built with Rails, Vue.js, and AWS.",
    category: "Virtual Tours",
    results: "360° city tour experiences",
    technologies: ["Ruby on Rails", "Vue.js", "AWS"],
    client: "Intocities",
    duration: "Platform development",
    team: "Full-stack contribution",
    color: "from-indigo-500 to-purple-600",
    gradient: "bg-gradient-to-br from-indigo-500 to-purple-600",
    liveUrl: "https://intocities.com",
    difficulty: "Medium",
    impact: "High",
    icon: "🗺️",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=400&fit=crop&crop=center",
    tags: ["Rails", "Vue.js", "AWS", "360°"]
  },
  {
    id: 6,
    title: "Dear Brightly",
    description: "Teledermatology platform — Django-to-Rails migration and React frontend.",
    category: "Healthtech",
    results: "Django → Rails migration",
    technologies: ["Ruby on Rails", "React", "Django"],
    client: "Dear Brightly",
    duration: "Migration & frontend",
    team: "Full-stack contribution",
    color: "from-pink-500 to-rose-600",
    gradient: "bg-gradient-to-br from-pink-500 to-rose-600",
    liveUrl: "https://dearbrightly.com",
    difficulty: "Hard",
    impact: "High",
    icon: "💊",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop&crop=center",
    tags: ["Rails", "React", "Migration", "Health"]
  },
  {
    id: 7,
    title: "KitchenConnection",
    description: "Live cooking class community built with Rails, React, and Shopify.",
    category: "Community / Commerce",
    results: "Live classes + Shopify",
    technologies: ["Ruby on Rails", "React", "Shopify"],
    client: "KitchenConnection",
    duration: "Platform development",
    team: "Full-stack contribution",
    color: "from-amber-500 to-orange-600",
    gradient: "bg-gradient-to-br from-amber-500 to-orange-600",
    liveUrl: "https://kitchenconnection.org",
    difficulty: "Medium",
    impact: "Medium",
    icon: "👨‍🍳",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop&crop=center",
    tags: ["Rails", "React", "Shopify"]
  },
  {
    id: 8,
    title: "Simply Made Local",
    description: "Handmade goods marketplace built with Ruby on Rails and NGINX.",
    category: "Marketplace",
    results: "Handmade goods marketplace",
    technologies: ["Ruby on Rails", "NGINX"],
    client: "Simply Made Local",
    duration: "Platform development",
    team: "Full-stack contribution",
    color: "from-teal-500 to-blue-600",
    gradient: "bg-gradient-to-br from-teal-500 to-blue-600",
    liveUrl: "https://simplymadelocal.com",
    difficulty: "Medium",
    impact: "Medium",
    icon: "🛍️",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&crop=center",
    tags: ["Rails", "NGINX", "Marketplace"]
  }
]

const categories = [
  { name: "All", icon: Globe, color: "from-gray-500 to-gray-600" },
  { name: "Fintech / Admin", icon: Database, color: "from-green-500 to-emerald-600" },
  { name: "EdTech", icon: Layers, color: "from-blue-500 to-cyan-600" },
  { name: "3D / Design", icon: Palette, color: "from-orange-500 to-red-600" },
  { name: "Travel-Tech", icon: Rocket, color: "from-red-500 to-orange-600" },
  { name: "Virtual Tours", icon: Globe, color: "from-indigo-500 to-purple-600" },
  { name: "Healthtech", icon: Shield, color: "from-pink-500 to-rose-600" },
  { name: "Community / Commerce", icon: Users, color: "from-amber-500 to-orange-600" },
  { name: "Marketplace", icon: TrendingUp, color: "from-teal-500 to-blue-600" }
]

export default function ProjectShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const filteredProjects = projects.filter(project => 
    selectedCategory === 'All' || project.category === selectedCategory
  )

  const openProjectModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeProjectModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20'
      case 'Medium': return 'text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/20'
      case 'Hard': return 'text-[#1E40AF] bg-[#1E40AF]/10 border-[#1E40AF]/20'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-[#059669] bg-[#059669]/10 border-[#059669]/20'
      case 'Medium': return 'text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/20'
      case 'Low': return 'text-gray-600 bg-gray-100 border-gray-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  return (
    <div className="relative overflow-hidden">
      {/* Wall-E GIF - Floating in background */}
      <motion.div 
        className="absolute top-10 left-8 w-20 h-20 sm:w-28 sm:h-28 opacity-50"
        animate={{ 
          x: [0, 10, -10, 0],
          y: [0, -15, 0],
          rotate: [0, -3, 3, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <img 
          src="/images/wall-e-unscreen.gif" 
          alt="Wall-E AI Robot" 
          className="w-full h-full object-contain"
          style={{
            imageRendering: 'crisp-edges',
            filter: 'drop-shadow(0 0 8px rgba(118, 97, 251, 0.2))'
          }}
        />
      </motion.div>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <motion.button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`group flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === category.name
                ? 'bg-gradient-to-r from-[#F85B5D] to-[#7661FB] text-white shadow-lg'
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-gray-900 border border-gray-200 hover:border-[#F85B5D]/30 hover:shadow-md'
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <category.icon className="w-4 h-4" />
            {category.name}
          </motion.button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              className="group relative"
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              {/* Project Card */}
              <motion.div
                className="relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 h-full flex flex-col"
                whileHover={{ y: -8 }}
                onClick={() => openProjectModal(project)}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#10B981] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                      {project.icon} {project.category}
                    </span>
                  </div>

                  {/* Difficulty & Impact Badges */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(project.difficulty)}`}>
                      {project.difficulty}
                    </span>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getImpactColor(project.impact)}`}>
                      {project.impact}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4 text-gray-700" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Play className="w-4 h-4 text-white" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#3B82F6] transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                    {project.description}
                  </p>

                  {/* Key Results */}
                  <div className="mb-4 p-3 bg-gradient-to-r from-[#3B82F6]/10 to-[#10B981]/10 rounded-xl border border-[#3B82F6]/20">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#F85B5D]" />
                      <span className="text-sm font-semibold text-[#3B82F6]">
                        {project.results}
                      </span>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gradient-to-r from-[#3B82F6]/10 to-[#10B981]/10 text-[#3B82F6] text-xs font-medium rounded-lg border border-[#3B82F6]/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gradient-to-r from-[#10B981]/10 to-[#3B82F6]/10 text-[#10B981] text-xs font-medium rounded-lg border border-[#10B981]/20">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Project Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                    <span>{project.duration}</span>
                    <span>{project.team}</span>
                  </div>
                </div>

                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeProjectModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative h-64 overflow-hidden rounded-t-3xl">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                <button
                  onClick={closeProjectModal}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300"
                >
                  <span className="text-2xl">×</span>
                </button>

                <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
                  <p className="text-lg opacity-90">{selectedProject.description}</p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Project Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Project Overview</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Target className="w-5 h-5 text-purple-600" />
                          <span className="text-gray-600">Client: <strong>{selectedProject.client}</strong></span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <span className="text-gray-600">Duration: <strong>{selectedProject.duration}</strong></span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-green-600" />
                          <span className="text-gray-600">Team: <strong>{selectedProject.team}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-2 bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 text-sm font-medium rounded-lg border border-purple-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project Results & Actions */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Results</h3>
                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                            <Zap className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <span className="text-2xl font-bold text-green-700">
                              {selectedProject.results}
                            </span>
                            <p className="text-green-600">Achievement</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Project Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
                        >
                          <ExternalLink className="w-4 h-4 inline mr-2" />
                          Live Demo
                        </a>
                      )}
                      {selectedProject.githubUrl && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold text-center hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                        >
                          <Github className="w-4 h-4 inline mr-2" />
                          View Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 
'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import { motion } from 'framer-motion'
import { 
  Users, 
  Target, 
  Award, 
  Globe, 
  Zap, 
  Shield, 
  Heart, 
  Lightbulb,
  TrendingUp,
  Star,
  ArrowRight,
  Send
} from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section id="home" className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <Hero />
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About Nexus Bloom
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing how businesses connect, automate, and grow through intelligent integration solutions.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2023, Nexus Bloom emerged from a simple observation: businesses were drowning in disconnected tools and manual processes. Our founders, veterans in both enterprise software and startup ecosystems, recognized that the future belonged to those who could seamlessly connect their digital world.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                What started as a small team of integration enthusiasts has grown into a powerhouse of automation experts, serving thousands of businesses worldwide.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">500+ Integrations</p>
                  <p className="text-sm text-gray-500">And counting every day</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Users className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">10,000+</h3>
                    <p className="text-sm text-gray-600">Happy Customers</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Globe className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">50+</h3>
                    <p className="text-sm text-gray-600">Countries Served</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <TrendingUp className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">99.9%</h3>
                    <p className="text-sm text-gray-600">Uptime</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Award className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">15+</h3>
                    <p className="text-sm text-gray-600">Industry Awards</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-white to-gray-50">
        <Features />
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive integration solutions to connect your entire tech stack.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Workflow Automation",
                description: "Automate repetitive tasks and streamline your business processes with intelligent workflows.",
                color: "from-purple-500 to-blue-600"
              },
              {
                icon: Globe,
                title: "App Integration",
                description: "Connect 500+ applications seamlessly with our robust integration platform.",
                color: "from-blue-500 to-cyan-600"
              },
              {
                icon: Shield,
                title: "Data Security",
                description: "Enterprise-grade security with SOC 2 compliance and end-to-end encryption.",
                color: "from-green-500 to-emerald-600"
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Powerful Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for developers and business users alike.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Visual Workflow Builder", icon: "🎨" },
              { name: "REST API", icon: "🔌" },
              { name: "Webhook Manager", icon: "🪝" },
              { name: "Data Mapper", icon: "🗺️" },
              { name: "Scheduler", icon: "⏰" },
              { name: "Error Handler", icon: "⚠️" },
              { name: "Analytics Dashboard", icon: "📊" },
              { name: "Team Collaboration", icon: "👥" }
            ].map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
              >
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="font-semibold text-gray-900">{tool.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how we've helped businesses transform their operations with our integration solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-commerce Automation",
                description: "Streamlined order processing and inventory management for a leading retail chain, reducing manual work by 80%.",
                image: "🛒",
                category: "E-commerce",
                results: "80% time savings"
              },
              {
                title: "CRM Integration Hub",
                description: "Connected 15+ business tools for a SaaS company, improving customer data accuracy and team productivity.",
                image: "📊",
                category: "SaaS",
                results: "15+ tools connected"
              },
              {
                title: "Marketing Workflow",
                description: "Automated lead nurturing and campaign management for a B2B company, increasing conversion rates by 45%.",
                image: "📈",
                category: "Marketing",
                results: "45% conversion increase"
              },
              {
                title: "Financial Automation",
                description: "Automated invoice processing and expense tracking for a fintech startup, reducing errors by 95%.",
                image: "💰",
                category: "Fintech",
                results: "95% error reduction"
              },
              {
                title: "Healthcare Integration",
                description: "Connected patient management systems for a healthcare network, improving care coordination and efficiency.",
                image: "🏥",
                category: "Healthcare",
                results: "Improved care coordination"
              },
              {
                title: "Education Platform",
                description: "Integrated learning management systems for an edtech company, enhancing student engagement and outcomes.",
                image: "🎓",
                category: "Education",
                results: "Enhanced student engagement"
              }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
              >
                <div className="p-6">
                  <div className="text-6xl mb-4 text-center">{project.image}</div>
                  <div className="mb-4">
                    <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-green-600">
                      {project.results}
                    </span>
                    <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm group-hover:translate-x-1 transition-all duration-300">
                      View Case Study →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section id="blogs" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Latest Insights & Updates
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest trends, tips, and insights in automation and integration.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "The Future of Workflow Automation in 2024",
                excerpt: "Discover the emerging trends and technologies that will shape the future of business automation.",
                image: "🚀",
                category: "Trends",
                readTime: "5 min read",
                date: "Dec 15, 2024"
              },
              {
                title: "How to Choose the Right Integration Platform",
                excerpt: "A comprehensive guide to selecting the perfect integration solution for your business needs.",
                image: "🔍",
                category: "Guide",
                readTime: "8 min read",
                date: "Dec 12, 2024"
              },
              {
                title: "Top 10 Automation Mistakes to Avoid",
                excerpt: "Learn from common pitfalls and ensure your automation projects succeed from the start.",
                image: "⚠️",
                category: "Tips",
                readTime: "6 min read",
                date: "Dec 10, 2024"
              },
              {
                title: "Building Scalable Integration Architecture",
                excerpt: "Best practices for designing integration systems that grow with your business.",
                image: "🏗️",
                category: "Technical",
                readTime: "10 min read",
                date: "Dec 8, 2024"
              },
              {
                title: "AI-Powered Workflows: What's Next?",
                excerpt: "Exploring the cutting-edge developments in AI-driven automation and decision making.",
                image: "🤖",
                category: "AI",
                readTime: "7 min read",
                date: "Dec 5, 2024"
              },
              {
                title: "Customer Success Stories: Real Results",
                excerpt: "Inspiring stories from businesses that transformed their operations with Nexus Bloom.",
                image: "📖",
                category: "Case Study",
                readTime: "4 min read",
                date: "Dec 3, 2024"
              }
            ].map((blog, index) => (
              <motion.div
                key={blog.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
              >
                <div className="p-6">
                  <div className="text-6xl mb-4 text-center">{blog.image}</div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {blog.category}
                    </span>
                    <span className="text-sm text-gray-500">{blog.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{blog.date}</span>
                    <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm group-hover:translate-x-1 transition-all duration-300">
                      Read More →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to transform your business? Let's start a conversation about how Nexus Bloom can help.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300"
                    placeholder="Your last name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300"
                  placeholder="your.email@company.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300 resize-none"
                  placeholder="Tell us about your integration needs..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

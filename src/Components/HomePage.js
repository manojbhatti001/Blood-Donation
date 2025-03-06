import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Heart, Users, Calendar, AlertCircle, Info, BookOpen, Activity, X } from "lucide-react"
import { motion } from "framer-motion"

function useCountUp(end, duration = 4000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  // Improved easing function for smoother animation
  const easeOutExpo = (t) => {
    return t === 1 ? 1 : 1 - Math.pow(2, -6 * t);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setCount(0);
          startTimeRef.current = null;
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
          }
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const animate = (currentTime) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }
      
      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      if (progress < 1) {
        const easedProgress = easeOutExpo(progress);
        setCount(Math.floor(end * easedProgress));
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return [count, ref];
}

export default function HomePage() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div>
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* Placeholder image while video loads */}
          {!isVideoLoaded && (
            <div className="absolute inset-0 bg-gray-900">
              <img
                src="/images/logo2.png"
                // alt="Blood Donation Logo"
                className="w-full h-full object-contain opacity-70"
              />
            </div>
          )}
          
          <video
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src="/images/blood-donation-video1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Overlay */}
          <div className="absolute inset-0  bg-black/50" />
        </div>
        
        <div className="container px-4 mx-auto text-center relative z-10 text-white">
          <div className="flex justify-center items-center mb-4"> {/* Reduced margin from mb-12 to mb-4 */}
            <img src="/images/logo2.png" alt="Blood Donation Logo" className="w-40 h-40 object-contain" /> {/* Reduced size from w-48 h-48 to w-40 h-40 */}
          </div>
          <h1 className="text-5xl font-bold mb-3"> {/* Reduced margin from mb-4 to mb-3 */}
            Every Drop <span className="text-red-500">Saves Lives</span>
          </h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto"> {/* Reduced margin from mb-8 to mb-6 */}
            Your blood donation can save up to three lives. Join our community of donors today.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/volunteer" className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Donate Blood
            </Link>
            <Link to="/emergency-blood" className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white/10">
              Find Blood
            </Link>
          </div>
        </div>
      </section>

      {/* Information Cards */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-red-600 font-semibold text-lg mb-4 block"
            >
              Make a Difference
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800"
            >
              Why Donate Blood?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 max-w-3xl mx-auto text-lg mb-4"
            >
              Your decision to donate blood can make a life-changing difference. Every donation contributes to saving lives and strengthening our community's health infrastructure.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center gap-2 items-center text-red-600"
            >
              <Heart className="w-5 h-5" />
              <span className="font-medium">Join thousands of donors making a difference</span>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InfoCard
              title="Save Multiple Lives"
              description="One donation can save up to three lives! Your single donation can help accident victims, surgery patients, and those fighting cancer. Every drop of your blood can be separated into red blood cells, plasma, and platelets to help different patients in need."
              image="/images/donor1.jpg"
              icon={<Heart className="w-6 h-6 text-red-500" />}
              link="/learn"
              stats={["3 Lives", "45 Minutes", "500ml Donation"]}
            />
            <InfoCard
              title="Health Benefits"
              description="Regular blood donation offers numerous health benefits: reduced risk of heart disease, enhanced blood cell production, calorie burn, free health screening, reduced iron storage diseases, and lower risk of certain cancers. It's a win-win for donors and recipients!"
              image="/images/donor2.jpg_large"
              icon={<Activity className="w-6 h-6 text-red-500" />}
              link="/eligibility"
              stats={["Heart Health", "Free Checkup", "Weight Management"]}
            />
            <InfoCard
              title="Community Impact"
              description="Be a local hero! Your donation directly helps people in your community. Support local hospitals, emergency services, and ensure a stable blood supply. Join our network of lifesavers and make a lasting difference in someone's life today."
              image="/images/donor3.jpg"
              icon={<Users className="w-6 h-6 text-red-500" />}
              link="/stories"
              stats={["Local Impact", "24/7 Support", "Verified Donors"]}
            />
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 ">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StatCard 
              number="10,000+" 
              label="Active Donors" 
              icon={<Users className="w-8 h-8" />} 
              className="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] transition-all duration-300"
            />
            <StatCard 
              number="15,000+" 
              label="Lives Saved" 
              icon={<Heart className="w-8 h-8" />}
              className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300"
            />
            <StatCard 
              number="1,000+" 
              label="Monthly Donations" 
              icon={<Calendar className="w-8 h-8" />}
              className="bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300"
            />
            <StatCard 
              number="24/7" 
              label="Emergency Support" 
              icon={<AlertCircle className="w-8 h-8" />}
              className="bg-gradient-to-br from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-300"
            />
          </div>
        </div>
      </section>

      {/* Blood Types */}
      <section className="py-16 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="container px-4 mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Blood Types</h2>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">Understanding blood types is crucial for donation. Find out which blood types are compatible with yours.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {bloodTypes.map(type => (
              <motion.div 
                key={type.group}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-xl border border-gray-700 hover:border-red-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-4xl font-bold text-red-500">{type.group}</h3>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold">
                    {type.group}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Can Give To:</p>
                    <div className="flex flex-wrap gap-2">
                      {type.canGiveTo.map(recipient => (
                        <span 
                          key={recipient}
                          className="px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-sm font-medium"
                        >
                          {recipient}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Can Receive From:</p>
                    <div className="flex flex-wrap gap-2">
                      {type.canReceiveFrom.map(donor => (
                        <span 
                          key={donor}
                          className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm font-medium"
                        >
                          {donor}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container px-4 mx-auto relative">
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-red-600 font-semibold text-lg mb-4 block"
            >
              Our Gallery
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
            >
              Blood Donation Gallery
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 max-w-2xl mx-auto text-lg"
            >
              Witness the impact of blood donation through these powerful moments captured at our donation drives and centers.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Gallery Item 1 */}
            <motion.div 
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-red-100">
                <img 
                  src="/images/Blood_donation_process.jpg" 
                  alt="Blood Donation Process" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-bold text-xl text-white mb-2">Donation Process</h3>
                  <p className="text-gray-200 text-sm">Safe and comfortable donation environment with state-of-the-art facilities.</p>
                </div>
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-all duration-500 delay-100">
                  View Details
                </div>
              </div>
            </motion.div>

            {/* Gallery Item 2 */}
            <motion.div 
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-red-100">
                <img 
                  src="/images/Community.jpg" 
                  alt="Community Drive" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-bold text-xl text-white mb-2">Community Drive</h3>
                  <p className="text-gray-200 text-sm">Bringing communities together to save lives through regular donation drives.</p>
                </div>
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-all duration-500 delay-100">
                  View Details
                </div>
              </div>
            </motion.div>

            {/* Gallery Item 3 */}
            <motion.div 
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-red-100">
                <img 
                  src="/images/medical_team.jpg" 
                  alt="Medical Team" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-bold text-xl text-white mb-2">Expert Care</h3>
                  <p className="text-gray-200 text-sm">Professional medical staff ensuring safety and comfort during donation.</p>
                </div>
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-all duration-500 delay-100">
                  View Details
                </div>
              </div>
            </motion.div>

            {/* Gallery Item 4 */}
            <motion.div 
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-red-100">
                <img 
                  src="/images/blood_testing.jpg" 
                  alt="Blood Testing" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-bold text-xl text-white mb-2">Quality Testing</h3>
                  <p className="text-gray-200 text-sm">Advanced testing procedures ensuring the highest standards of blood safety.</p>
                </div>
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-all duration-500 delay-100">
                  View Details
                </div>
              </div>
            </motion.div>

            {/* Gallery Item 5 */}
            <motion.div 
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-red-100">
                <img 
                  src="/images/young_donoer.jpg" 
                  alt="Young Donors" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-bold text-xl text-white mb-2">Youth Participation</h3>
                  <p className="text-gray-200 text-sm">Young donors leading the way in community blood donation initiatives.</p>
                </div>
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-all duration-500 delay-100">
                  View Details
                </div>
              </div>
            </motion.div>

            {/* Gallery Item 6 */}
            <motion.div 
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-red-100">
                <img 
                  src="/images/blood_storage.jpg" 
                  alt="Blood Storage" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-bold text-xl text-white mb-2">Modern Storage</h3>
                  <p className="text-gray-200 text-sm">State-of-the-art facilities ensuring safe blood storage and management.</p>
                </div>
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-all duration-500 delay-100">
                  View Details
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-24 bg-gradient-to-br from-red-600 to-red-700 text-white relative overflow-hidden">
        {/* Background Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent"></div>
        
        {/* Main Content */}
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-8"
              >
                <AlertCircle className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              >
                Need Blood <br className="hidden sm:block" />
                <span className="text-red-200">Urgently?</span>
              </motion.h2>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-red-100 max-w-2xl mx-auto"
              >
                Our emergency response team is available 24/7. We ensure quick assistance for all critical situations.
              </motion.p>
            </div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <Link 
                to="/emergency-blood"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-red-600 rounded-2xl hover:bg-red-50 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                onClick={() => window.scrollTo(0, 0)}
              >
                <AlertCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Request Emergency Blood</span>
              </Link>
{/*               
              <Link 
                to="/contact"
                className="flex items-center justify-center gap-3 px-8 py-4 border-2 border-white/50 hover:border-white rounded-2xl hover:bg-white/10 transition-all duration-300 font-semibold text-lg"
              >
                <Users className="w-6 h-6" />
                <span>Contact Support Team</span>
              </Link> */}
            </motion.div>

            {/* Features Grid */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300">
                <h3 className="text-xl font-bold mb-3">Quick Response</h3>
                <p className="text-red-100">Immediate attention to all emergency requests</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300">
                <h3 className="text-xl font-bold mb-3">24/7 Available</h3>
                <p className="text-red-100">Round-the-clock emergency support</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300">
                <h3 className="text-xl font-bold mb-3">Verified Donors</h3>
                <p className="text-red-100">Access to screened blood donors</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Video Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">How Blood Donation Works</h2>
          <div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-xl">
            <video
              controls
              poster="/images/video-thumbnail.jpg"
              className="w-full"
            >
              <source src="/images/donation-process.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
    </div>
  )
}

// Info Card Component
function InfoCard({ title, description, image, icon, link, stats }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add more detailed information for each card
  const additionalInfo = {
    benefits: [
      "Helps save up to 3 lives with one donation",
      "Regular health screening included",
      "Reduces risk of heart diseases",
      "Helps burn calories",
      "Improves blood flow"
    ],
    requirements: [
      "Age between 18-65 years",
      "Weight above 50kg",
      "Hemoglobin level ≥ 12.5g/dl",
      "No major surgery in last 6 months",
      "No tattoo/piercing in last 12 months"
    ],
    process: [
      "Registration & Basic Check",
      "Medical Screening",
      "Blood Donation (15-20 mins)",
      "Refreshments & Rest",
      "Certificate of Appreciation"
    ]
  };

  return (
    <>
      <div onClick={() => setIsModalOpen(true)}>
      <motion.div 
          className="rounded-2xl overflow-hidden shadow-lg bg-white cursor-pointer hover:shadow-xl transition-all duration-300"
        whileHover={{ y: -5 }}
      >
          {/* Image Section */}
        <div className="aspect-video relative">
          <img 
            src={image} 
            alt={title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90" />
          </div>

          {/* Title Section */}
          <div className="p-6 bg-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-600 rounded-lg">
                {React.cloneElement(icon, { className: "w-6 h-6 text-white" })}
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4">
              {description}
            </p>

            {/* Stats */}
            {stats && (
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                {stats.map((stat, index) => (
                  <span 
                    key={index}
                    className="text-sm font-medium text-red-600"
                  >
                    {stat}
                  </span>
                ))}
              </div>
            )}

            {/* Learn More Button */}
            <div className="mt-4">
              <span className="inline-flex items-center text-red-600 font-medium">
                Learn More
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
        </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b z-10">
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-600 rounded-xl">
                    {React.cloneElement(icon, { className: "w-8 h-8 text-white" })}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">{title}</h3>
                    <p className="text-red-600 font-medium">Learn more about blood donation</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Hero Image */}
              <div className="aspect-video relative rounded-xl overflow-hidden mb-8">
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex gap-4">
                    {stats.map((stat, index) => (
                      <div 
                        key={index}
                        className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg"
                      >
                        <span className="block text-lg font-semibold text-red-600">{stat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">About</h4>
                  <p className="text-gray-600 mb-8">{description}</p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h4>
                  <ul className="space-y-3 mb-8">
                    {additionalInfo.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-600">
                        <div className="w-2 h-2 rounded-full bg-red-600" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Column */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h4>
                  <ul className="space-y-3 mb-8">
                    {additionalInfo.requirements.map((req, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-600">
                        <div className="w-2 h-2 rounded-full bg-red-600" />
                        {req}
                      </li>
                    ))}
                  </ul>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Process</h4>
                  <div className="space-y-4">
                    {additionalInfo.process.map((step, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-semibold">
                          {index + 1}
                        </div>
                        <span className="text-gray-600">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row gap-4">
                <Link 
                  to={link}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold"
                  onClick={() => setIsModalOpen(false)}
                >
                  Learn More About {title}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 sm:flex-none px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

// Fix for the StatCard component
function StatCard({ number, label, icon, className }) {
  const [count, ref] = useCountUp(parseInt(number.replace(/[^0-9]/g, '')));
  // Fix the template literal syntax
  const displayNumber = number === "24/7" ? number : (number.includes('+') ? `${count}+` : count);

  return (
    <motion.div 
      ref={number !== "24/7" ? ref : null}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      whileHover={{ 
        scale: 1.05,
        y: -10,
        transition: { duration: 0.4 }
      }}
      // Fix the template literal syntax for className
      className={`text-center p-8 rounded-2xl shadow-lg backdrop-blur-sm ${className} text-white cursor-pointer relative overflow-hidden group`}
    >
      {/* Hover effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      
      {/* Icon with animation */}
      <motion.div 
        className="text-white/90 mb-4 flex justify-center"
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        whileHover={{ 
          scale: 1.2,
          rotate: 360,
          transition: { duration: 0.7 }
        }}
      >
        {icon}
      </motion.div>

      {/* Number with improved animation */}
      <motion.div 
        className="text-4xl font-bold mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-block">
          {displayNumber}
        </span>
      </motion.div>

      {/* Label with hover effect */}
      <motion.div 
        className="text-white/90 font-medium tracking-wide"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        whileHover={{ 
          scale: 1.1,
          transition: { duration: 0.3 }
        }}
      >
        {label}
      </motion.div>

      {/* Hover border effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-400" />
    </motion.div>
  );
}

// Data
const bloodTypes = [
  {
    group: "A+",
    canGiveTo: ["A+", "AB+"],
    canReceiveFrom: ["A+", "A-", "O+", "O-"]
  },
  {
    group: "O-",
    canGiveTo: ["All Types"],
    canReceiveFrom: ["O-"]
  },
  {
    group: "B+",
    canGiveTo: ["B+", "AB+"],
    canReceiveFrom: ["B+", "B-", "O+", "O-"]
  },
  {
    group: "AB+",
    canGiveTo: ["AB+"],
    canReceiveFrom: ["All Types"]
  }
]
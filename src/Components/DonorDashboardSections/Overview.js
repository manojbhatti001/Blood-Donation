import React, { useState } from 'react';
import { Heart, TrendingUp, Users, Star, Search, Share2, Phone, Award, Shield, Calendar, Clock, Activity, Lock, X, Droplet, MapPin } from 'react-feather';
import { toast } from 'react-hot-toast';

const Overview = ({ profileData, donationHistory }) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = async () => {
    try {
      if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
        toast.error('All password fields are required');
        return;
      }
      
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        toast.error('New passwords do not match');
        return;
      }

      // Here you would typically make an API call to update the password
      // Add your API call here
      
      toast.success('Password updated successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordModal(false);
    } catch (error) {
      toast.error('Failed to update password');
    }
  };

  // Calculate next eligible date
  const calculateNextEligibleDate = (lastDonationDate) => {
    const date = new Date(lastDonationDate);
    date.setMonth(date.getMonth() + 3);
    return date.toLocaleDateString();
  };

  // Calculate donation streak
  const calculateStreak = () => {
    return profileData.donationStreak || 3;
  };

  const renderOverview = () => {
    // Sample data - Replace with actual data from your API/state
    const donationStats = {
      monthlyDonations: [4, 3, 5, 2, 4, 3, 5, 4, 3, 5, 4, 6], // Last 12 months
      upcomingAppointments: [
        { date: '2024-03-15', hospital: 'City General Hospital', time: '10:00 AM' },
        { date: '2024-04-20', hospital: 'Medical Center East', time: '2:30 PM' }
      ],
      recentAchievements: [
        { title: 'Platinum Donor', date: '2024-02-01', description: 'Completed 20 donations' },
        { title: 'Life Saver Elite', date: '2024-01-15', description: 'Helped save 50 lives' }
      ],
      impactMetrics: {
        hospitalsServed: 8,
        citiesReached: 3,
        totalLivesSaved: profileData.totalDonations * 3,
        donationSuccessRate: '98%'
      }
    };

    return (
      <div className="space-y-8">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Existing stats cards with enhanced information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Donations</p>
                <h3 className="text-2xl font-bold text-gray-900">{profileData.totalDonations}</h3>
                <p className="text-xs text-gray-600 mt-1">Lifetime contributions</p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>12% more than last year</span>
              </div>
            </div>
          </div>

          {/* Enhanced Lives Impacted Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Lives Impacted</p>
                <h3 className="text-2xl font-bold text-gray-900">{donationStats.impactMetrics.totalLivesSaved}</h3>
                <p className="text-xs text-gray-600 mt-1">Across {donationStats.impactMetrics.hospitalsServed} hospitals</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-blue-600">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{donationStats.impactMetrics.citiesReached} cities reached</span>
              </div>
            </div>
          </div>

          {/* Enhanced Next Eligible Date Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Next Eligible Date</p>
                <h3 className="text-xl font-bold text-gray-900">
                  {new Date(new Date(profileData.lastDonation).setMonth(new Date(profileData.lastDonation).getMonth() + 3)).toLocaleDateString()}
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  {donationStats.upcomingAppointments.length > 0 ? 'Appointment scheduled' : 'No appointment yet'}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                <span>Based on last donation</span>
              </div>
            </div>
          </div>

          {/* Enhanced Donation Streak Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Success Rate</p>
                <h3 className="text-2xl font-bold text-gray-900">{donationStats.impactMetrics.donationSuccessRate}</h3>
                <p className="text-xs text-gray-600 mt-1">Successful donations</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-purple-600">
                <Award className="w-4 h-4 mr-1" />
                <span>Top performer badge</span>
              </div>
            </div>
          </div>
        </div>

        {/* Donation History Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation History</h3>
          <div className="h-64">
            {/* Add your preferred charting library here */}
            <div className="grid grid-cols-12 gap-2 h-40">
              {donationStats.monthlyDonations.map((count, index) => (
                <div key={index} className="flex items-end h-full">
                  <div 
                    className="w-full bg-red-200 rounded-t"
                    style={{ height: `${(count/Math.max(...donationStats.monthlyDonations))*100}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
              <span>Jan</span>
              <span>Feb</span>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
            <div className="space-y-4">
              {donationStats.upcomingAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{appointment.hospital}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
            <div className="space-y-4">
              {donationStats.recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium">{achievement.title}</p>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                    <p className="text-xs text-gray-400">{new Date(achievement.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Donations */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Donations</p>
              <h3 className="text-2xl font-bold text-gray-900">{profileData?.totalDonations || 0}</h3>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>12% more than last year</span>
            </div>
          </div>
        </div>

        {/* Lives Impacted */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Lives Impacted</p>
              <h3 className="text-2xl font-bold text-gray-900">{(profileData?.totalDonations || 0) * 3}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-blue-600">
              <Star className="w-4 h-4 mr-1" />
              <span>Each donation helps 3 lives</span>
            </div>
          </div>
        </div>

        {/* Next Eligible Date */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Next Eligible Date</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {calculateNextEligibleDate(profileData?.lastDonation)}
              </h3>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              <span>Based on last donation date</span>
            </div>
          </div>
        </div>

        {/* Donation Streak */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Current Streak</p>
              <h3 className="text-2xl font-bold text-gray-900">{calculateStreak()} months</h3>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-purple-600">
              <Award className="w-4 h-4 mr-1" />
              <span>Consistent donor badge earned</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              {
                id: 1,
                type: 'donation',
                location: 'City General Hospital',
                date: '2024-03-15',
                bloodGroup: 'A+',
                status: 'Completed',
                recipientType: 'Emergency Surgery',
                impact: '3 lives saved'
              },
              {
                id: 2,
                type: 'appointment',
                location: 'Apollo Hospital',
                date: '2024-03-25',
                bloodGroup: 'A+',
                status: 'Scheduled',
                time: '10:30 AM'
              },
              {
                id: 3,
                type: 'achievement',
                title: 'Silver Donor Badge',
                date: '2024-03-10',
                description: 'Completed 5 successful donations'
              },
              {
                id: 4,
                type: 'donation',
                location: 'Red Cross Blood Bank',
                date: '2024-02-20',
                bloodGroup: 'A+',
                status: 'Completed',
                recipientType: 'Blood Bank Storage',
                impact: '3 lives potentially saved'
              },
              {
                id: 5,
                type: 'health_check',
                date: '2024-02-15',
                result: 'Passed',
                nextCheckDue: '2024-05-15',
                metrics: 'Hemoglobin: 14.5g/dL'
              }
            ].map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 ${
                  activity.type === 'donation' ? 'bg-red-100' :
                  activity.type === 'appointment' ? 'bg-blue-100' :
                  activity.type === 'achievement' ? 'bg-yellow-100' :
                  'bg-green-100'
                } rounded-full flex items-center justify-center`}>
                  {activity.type === 'donation' && <Heart className="w-5 h-5 text-red-600" />}
                  {activity.type === 'appointment' && <Calendar className="w-5 h-5 text-blue-600" />}
                  {activity.type === 'achievement' && <Award className="w-5 h-5 text-yellow-600" />}
                  {activity.type === 'health_check' && <Activity className="w-5 h-5 text-green-600" />}
                </div>
                <div className="flex-1">
                  {activity.type === 'donation' && (
                    <>
                      <p className="text-sm font-medium text-gray-900">Donated at {activity.location}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.date).toLocaleDateString()} • {activity.recipientType}
                      </p>
                      <p className="text-xs text-green-600 mt-1">{activity.impact}</p>
                    </>
                  )}
                  {activity.type === 'appointment' && (
                    <>
                      <p className="text-sm font-medium text-gray-900">Upcoming Donation at {activity.location}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.date).toLocaleDateString()} • {activity.time}
                      </p>
                    </>
                  )}
                  {activity.type === 'achievement' && (
                    <>
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.description}</p>
                    </>
                  )}
                  {activity.type === 'health_check' && (
                    <>
                      <p className="text-sm font-medium text-gray-900">Health Check Completed</p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.date).toLocaleDateString()} • {activity.metrics}
                      </p>
                      <p className="text-xs text-blue-600 mt-1">Next check due: {new Date(activity.nextCheckDue).toLocaleDateString()}</p>
                    </>
                  )}
                </div>
                {activity.bloodGroup && (
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {activity.bloodGroup}
                    </span>
                  </div>
                )}
                {activity.status && (
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 ${
                      activity.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      activity.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    } text-xs rounded-full`}>
                      {activity.status}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
              <div className="flex flex-col items-center text-center">
                <Search className="w-6 h-6 text-red-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Find Requests</span>
              </div>
            </button>
            <button className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <div className="flex flex-col items-center text-center">
                <Share2 className="w-6 h-6 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Share Profile</span>
              </div>
            </button>
            <button 
              onClick={() => setShowPasswordModal(true)}
              className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
            >
              <div className="flex flex-col items-center text-center">
                <Lock className="w-6 h-6 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Change Password</span>
              </div>
            </button>
            <button className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
              <div className="flex flex-col items-center text-center">
                <Phone className="w-6 h-6 text-green-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Contact Support</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Shield className="w-5 h-5 text-red-500" />
            <span className="text-sm font-medium">Regular Donor Badge</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Award className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium">Life Saver - 5 Donations</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium">Consistent Donor 2024</span>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Change Password</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePasswordChange}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
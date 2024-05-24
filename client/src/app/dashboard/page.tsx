"use client";

import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeader from '../components/dashboard/dashboardHeader';
import StatCard from '../components/dashboard/statCard';
import BookingCard from '../components/dashboard/bookingCard';
import EventCard from '../components/dashboard/eventCard';
import DiscussionCard from '../components/dashboard/discussionCard';

const Dashboard = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, []);
  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Members onsite" value="26/88" />
          <StatCard title="Unpaid Invoices" value="4" />
          <StatCard title="Unread Messages" value="2" />
          <StatCard title="Your Tickets" value="6" />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">Upcoming bookings</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
            <BookingCard
              title="HDMI Room"
              roomType="Small meeting room"
              startTime="29 Nov 2023, 03:50pm"
              endTime="29 Nov 2023, 05:30pm"
              status="This booking has not been confirmed"
            />
            <BookingCard
              title="RJ-45 Room"
              roomType="Boardroom"
              startTime="29 Nov 2023, 07:05pm"
              endTime="29 Nov 2023, 07:00pm"
              status="Confirmed"
            />
            <BookingCard
              title="HJ-11 Hot Desk"
              roomType="Hot Desk"
              startTime="29 Nov 2023, 03:50pm"
              endTime="29 Nov 2023, 05:30pm"
              status="Confirmed"
            />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">Upcoming events</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-4">
            <EventCard
              title="Design Update #20"
              description="Talking with Damon Heart"
              startTime="29 Nov 2023, 03:50pm"
              price="50.00"
            />
            <EventCard
              title="Company meetup - Project Management Workshop #1"
              description=""
              startTime="01 Jan 2024, 08:30am"
              price="20.00"
            />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">Hottest discussion boards</h2>
          <DiscussionCard
            author="Michelle Walton"
            content="I think we need to integrate an outdoor pool in our backyard lounge area..."
            likes="89"
            replies="27"
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
